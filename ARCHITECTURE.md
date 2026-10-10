# HomenS.AI JobPilot — Architecture 1.8.0

[English](ARCHITECTURE.md) | [Русский](docs/ru/ARCHITECTURE.md)

9 October 2026 · Author of the idea and developer: Serhii Khomenko / HomenS.AI · https://homensai.com/ · Documentation: CC BY-NC 4.0.

Status: design and operating specification. The workflow has no separate job-search or mail-sending application; it consists of an AI agent, written procedures and local files. The statistics view contains HTML/CSS/JavaScript that validates, sorts, filters and displays a snapshot written by the agent. It does not perform research, send mail or modify the journal. This document supplements AI_BUILD_SPEC.md, DATA_CONTRACT.md and OPERATING_REQUIREMENTS.md. Servers, Docker and SQL are not used.

Sections 3 (isolation), 4b (writer lock), 6a (Gmail Scheduled), 6b (replay), 8a–8c (cadence, monthly preparation, daily check) and 12 (local archives and recovery) describe procedures added in the consolidated review (findings F04, F07, F12 and requirements R01–R05). They are written procedures only: none of them has been run yet. The status of each is recorded in ACCEPTANCE_TESTS.md, section "Consolidated review F01–F14 and R01–R20".

## 1. Core decision: rules and files

The system consists of an **AI agent** (Codex or Claude Code), **written rules**, a **data folder** and a local statistics view. The agent researches, interprets information, writes documents and talks to the user. It follows `AGENTS.md`, `CLAUDE.md`, `TODO_FOR_AI.md`, `OPERATING_REQUIREMENTS.md`, this document and DATA_CONTRACT.md; it maintains JSON, JSONL, Markdown and approved document files. The statistics view reads the agent's data snapshot and only presents it. Every record remains a readable file.

**What follows from this.** The safeguards of the system — the limit of 44 submissions, “never send twice”, “one writer at a time”, “nothing is sent without permission” — are *procedures that the agent must follow*, not technical locks. Nothing in the system can physically stop an agent that ignores a rule. For this reason:

- every rule is written as a short checklist the agent runs before the action and shows to the user when sending is involved;
- the safest mode is the default: drafts only, then approval of each message by the user in the chat;
- fully automatic sending is allowed only if the user has switched it on for a profile and has acknowledged in writing that the limit and duplicate protection then depend on the agent following the rules;
- the acceptance scenarios (ACCEPTANCE_TESTS.md) are checked by hand, in the chat, with synthetic data, before any real sending.

```mermaid
flowchart TD
    U[User] --> A[Chat with the agent: Codex or Claude Code]
    A --> R[Rules: AGENTS.md, TODO_FOR_AI.md, AI_BUILD_SPEC, DATA_CONTRACT]
    A --> J[Person journal: one line per completed action]
    J --> P[Views: records, queue, Status.txt, quota.json]
    A --> M[Gmail through the agent's own authorized connection]
    M --> A
    J --> B[Report and statistics: numbers copied from the journal]
    B --> H[Local HTML page: years, months, days; sorting by date and result]
    B --> F[DOCX and PDF with recommendations]
    H --> U
    F --> U
```

The HTML page does not give commands to anyone; data is updated only when the agent works.

## 2. Parts and responsibilities

| Part | What the agent does | Where it is kept |
|---|---|---|
| Workspace | Checks the folder, the format version, the selected person and profile; reports what it can really do | `workspace.json` |
| Profile and knowledge base | Materials from `Положите_сюда` and an interview in the chat → proposed facts → facts confirmed by the user, with the source of every fact; then the search profile (goals, radius, separate language settings) | `persons/<person_id>/База_знаний/Жизнеописание.md`, `profiles/<profile_id>/profile.json` |
| Discovery | Records research results as targets: duplicates, freshness, radius, route verification | `registry.json` |
| Documents | Builds the package from requirements and confirmed facts: versions, fact references, visual check status | application folder |
| Planning | Spreads packages over permitted workdays, reserves slots, reschedules, marks overdue entries | `registry.json`, journal |
| Mail | Reads whole threads, checks proof of sending, handles delivery notices and replies | journal, `Status.txt` |
| Reporting | Counts for a fixed journal position and period; produces DOCX/PDF/HTML with the same numbers; adds the market appendix | `reports/`, `dashboard/` |
| Capability check | Tests each tool it has (see section 7) and records the result | `workspace.json` |

The agent proposes recommendation text and mail classifications. Counting, de-duplication and state changes follow the written rules and are always recorded in the journal first.

Instruction files (Markdown, not code; drafts that have not yet been tried in practice): `AGENTS.md` for Codex, `CLAUDE.md` for Claude Code (it imports `AGENTS.md`), `TODO_FOR_AI.md` with the first-run flow and the step-by-step checklists. The agent loads its rules file by itself when the folder is opened, so the person only has to say “start”.

## 3. The accounting unit is a person

`person_id` groups one person's search directions. Each direction has its own profile_id, document languages, account, documents and consents. Quota accounting and repeat-application checks are shared by person_id. Different people have separate journals.

```text
Локальные_данные/
  workspace.json                    # workspace_id, format, language, stage of the first run, capability check results
  Положите_сюда/                    # the ONLY place where the person puts things (the agent only reads it)
    1_Мои_документы/                # CVs, diplomas, certificates, references (originals, never changed)
    2_Рассказ_о_себе/               # the person's story: voice transcripts, notes, interviews, the questions
    3_Шаблон_отчёта/                # optional report template
  persons/<person_id>/
    База_знаний/Жизнеописание.md    # the knowledge base: the person's life story as confirmed facts
    journal/transactions-YYYY-MM.jsonl  # sole authoritative journal, monthly segments; only the current month is written
    journal/writer.lock              # exists only while one chat is writing
    state/person.json               # person and profile-list view
    state/quota.json                # monthly counters, rebuilt from the journal
    outbox/<send_attempt_id>/            # prepared send package, never edited
  Resume/                              # resume template: your Word file, or a PDF converted to Word here
  CoverLetter/                         # cover letter template, same design as the resume
  profiles/<profile_id>/
    profile.json                    # current confirmed configuration
    registry.json                   # targets, applications and the queue (projection)
    runs/                           # work sessions: plans, results, questions
    reports/<YYYY-MM>/              # report revisions and manifests (in English, Russian or German)
  Applications/                       # ALL application work of the person, one tree for all years
    2026/                           # year
      10_October/                   # two-digit month number + English month name
        001_Muster-Maschinenbau_Stuttgart_Maintenance-technician/   # number, company, city, role
          Company.md                # company data from public sources, each with source and check date
          Resume_v001.docx          # versions are new files: Resume_v002.docx, ...
          Resume_v001.pdf
          CoverLetter_v001.docx
          CoverLetter_v001.pdf
          EmailText_de.txt          # the e-mail text in the chosen language
          Status.txt                # append-only history of this application
  dashboard/
    index.html                      # local menu: statistics and readiness per profile
    profiles/<profile_id>/
      summary.js                    # the data of this profile plus the person's shared quota
      index.html                    # an unchanged copy of dashboard_template/index.html
      readiness.html                # the readiness page of this profile
```

The `Локальные_данные` directory name is a shared technical path in both language versions. The dashboard has one path only, `Локальные_данные/dashboard/`, next to `persons/` and `profiles/`. Profile ids are unique across the workspace, so the pages of several persons do not collide.

Every journal line carries person_id and, where applicable, its profile; the shared quota has person scope. Before acting, the agent checks that the profile belongs to the person and the account. Isolation prevents routing mistakes in the rules; a different profile_id does not itself create an operating-system access boundary for the same computer user.

**Isolation between people and profiles (procedure, F12).** One folder can serve several people, and they are kept apart by procedure:

- Each person has `persons/<person_id>/` and, for originals, a personal subfolder `Положите_сюда/<name>/` with its own three subfolders (ACCEPTANCE_TESTS.md, KB-04). The agent never opens another person's originals, knowledge base, journal, state, outbox, archives or mail.
- A second person is added with a new `person_id`, and the whole first setup is run again for that person (Part A of TODO_FOR_AI.md). The progress of that setup is kept per person in `persons/<person_id>/state/person.json` (`setup_progress`). The `stage` in `workspace.json` describes only the folder and does not mean that a new person is ready.
- Consent is given per person (`consent_granted` carries that person's `person_id`). A refusal or a withdrawal by one person opens nothing of another person's.
- Before reading originals, opening mail or writing a journal line, the agent names the active person and checks that the profile and the account belong to that person. If the person is unclear, the agent asks before doing anything else.
- The monthly quota has person scope: every profile of one person shares it, and no profile of another person is counted. Quota is never moved between people.
- Reports, statistics snapshots and archives are made per person (and per profile where the profile is the subject). Adding a person does not change a snapshot already published for another person.

This is procedural isolation. It does not protect against another user of the same computer and is not an operating-system boundary.

## 4. One line per completed action

The journal is a set of text files, one per month (monthly segments, rule 8), with one JSON object per line. A line is written when an action is **completed**, and contains:

- `schema_version`, `sequence` (1, 2, 3 … without gaps), `action_id`, `person_id`, `recorded_at`;
- an `events` list, each event with its own unique `event_id` (quota reservation, send start, application change, and so on);
- a short `result` text that is enough to repeat the answer to the user if the same action is asked for again.

Rules for the agent:

1. **Append only.** An old line is never edited or deleted. A correction is a new line that names the earlier event it replaces (`supersedes_event_id`).
2. **Before writing:** read the last line of the current segment (of the newest segment if the current one is new), take the next `sequence`, and check that this `action_id` is not already in any segment. If it is, report the earlier result and do nothing else. This protects against an interrupted chat that is started again.
3. **Write the whole line at once**, then update the views (registry, queue, `Status.txt`, `quota.json`, statistics). If the chat stops between the two, the next chat rebuilds the views from the journal.
4. **A damaged or half-written last line** is not repaired silently. The agent stops, keeps the file as it is, tells the user and recovers from the last complete line and the mail evidence.
5. **One writer at a time.** Before writing a journal line, the agent takes `writer.lock` by exclusive creation, as described in section 4b. If the file belongs to another run, the agent stops and asks the user whether that chat is still working; it removes a foreign lock only after the checks in 4b. When the work is done, it deletes its own lock. The lock protects only if every chat follows this protocol and the environment provides exclusive creation; otherwise the user must keep one chat working at a time.
6. A quota or send decision always rereads the journal; a summary from an earlier part of the chat is never trusted.
7. **Count with the system's own tool, not by eye.** The slots used, reserved or unverified in a month are read from all journal segments by text search for the month fields of the quota events (formulas in DATA_CONTRACT.md §3c and the free count in §5; commands in §4a below). The agent shows the number and how it was found. It compares the result with `quota.json`; if they differ or the file is missing, the journal is right and `quota.json` is rebuilt (`examples/quota.example.json`). The same applies to checksums of files. No script is added to the package for this.
8. **Writing a line (one append method, monthly segments).** The journal is kept per month: the current segment is `journal/transactions-YYYY-MM.jsonl` (DATA_CONTRACT.md §3c). Only that segment is written; a closed segment is never edited. If no journal exists, the first line has `sequence` 1. Only the following method is used. JSON is not joined by hand, and text is not written with shell redirection or heredocs. The file tool's exact-replace operation is used for one purpose only: to append a line after the segment's last line, as steps 3 and 4 describe.
   1. Under the writer lock, determine the current local month M. Read the last line of the current segment, which must be a complete line. If the segment is new or empty, read the last line of the newest earlier segment instead; for the very first line there is none and `n` is 0. Take `n`, the `sequence` of that last journal line. Check that the new `action_id` is not in any segment (rule 2). Record in the run note: the line count of the segment; the last line `L` without its line break (it is unique, because it carries its own `sequence` and `action_id`); and `C0`, the SHA-256 of the whole segment file (for a new segment, the SHA-256 of an empty file, `e3b0c442…b855`). Check that the file ends with a line break.
   2. Build the new line in the key order of DATA_CONTRACT.md §3c with `sequence` n+1. Check that it is one JSON object on one line and that every identifier is a UUID in the UUID form. A failed check stops writing (step 5).
   3. Append. (a) If the segment has lines: with the file tool's exact replacement, replace `L` by `L`, a line break and `N`. If `L` is not found exactly once, stop (step 5). The file then ends with `N` and its line break. (b) If the segment is new: check that the file does not exist, then create it with the file tool, containing exactly `N` and its line break. (c) For a segment of fewer than 300 lines, the segment may instead be written whole with the file tool, from the text read in step 1: the same lines, then `N` with its line break. Variant (c) is the only whole-segment rewrite, and only for a small segment.
   4. Read back. (a) `N` parses as JSON with `sequence` n+1; the line before it, if there is one, is byte-identical to `L` and parses as JSON with `sequence` n. (b) The line count has grown by exactly one. (c) The SHA-256 of the segment without its last line equals `C0`, so every byte before `N` is unchanged (for example `head -n -1 <segment> | sha256sum`, section 4a). The read-back values are recorded in the run note.
   5. A failed check stops writing. The segment file is kept as it is, no view is updated, no external action is taken, the lock is kept and the person is told (rule 4). Nothing is repaired by rewriting earlier lines. The lock file has a fixed format (DATA_CONTRACT.md §3c). A check that no lock exists, followed by a separate creation, is not enough by itself (4b).
   6. Release. Only after step 4 has passed does the holder release the lock: it reads the lock file, checks that it carries its own `lock_id`, and deletes it (4b). A failed write never reaches this step.

### 4a. Commands the agent may use

The agent uses only commands that the person's operating system already has, typed inline in the chat; nothing is saved into the package as a script. Allowed uses: the current time, a new UUID, a file checksum, a text search with counting, a JSON validity check, a time-zone conversion for the current moment, a directory listing, creating folders, copying the approved files into an outbox folder (with a checksum read-back of each copy), creating DOCX and PDF files with the document tool named below, and copying or deleting the agent's own temporary files. The exceptions are named: the exclusive creation of `writer.lock`, the copy into `outbox/`, the document tool, and the one-time split of a legacy journal (DATA_CONTRACT.md §3d), which copies bytes by line ranges and is read back by checksum. JSON files and all other text files (Status.txt, Company.md, run notes, EMAIL_TO_SEND.txt) are written with the file tool, never with shell redirection, heredocs, `sed` or similar; a journal line is added only by the exact-replace append of rule 8. Python is not an operating tool of the agent: it is the tester's audit tool only. Counts, pagination and checksums in a chat are made with the operating system's own text search and checksum commands and with the file tool. The forms below are the Windows (PowerShell) forms; on macOS or Linux the agent uses the equivalents: `date -u +%Y-%m-%dT%H:%M:%SZ`, `uuidgen`, `sha256sum`, `grep -c` and `grep -o` (counts), `tail -n 1` and `tail -n 2`, `head -n -1` (a segment without its last line), `cp`, and `set -C` (noclobber) for the exclusive creation of `writer.lock`.

| Need | PowerShell |
|---|---|
| Current UTC time | `(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")` |
| New UUID | `[guid]::NewGuid().ToString()` |
| Checksum of a file | `(Get-FileHash -Algorithm SHA256 -LiteralPath <file>).Hash.ToLower()` |
| Local month of the person now | `[TimeZoneInfo]::ConvertTime([DateTimeOffset]::UtcNow,[TimeZoneInfo]::FindSystemTimeZoneById('W. Europe Standard Time')).ToString('yyyy-MM')` (the agent maps the person's IANA zone, for example `Europe/Berlin`, to the Windows name) |
| Count events of a month | `(Select-String -Path <journal> -Pattern '"consumed_month"\s*:\s*"2026-10"' -AllMatches \| ForEach-Object { $_.Matches.Count } \| Measure-Object -Sum).Sum` (empty result means 0) |
| Check that every journal line is valid JSON | `Get-Content <journal> \| ForEach-Object { $_ \| ConvertFrom-Json } \| Out-Null` (an error names the bad line) |
| Last journal line (current segment) | `Get-Content <current segment> -Tail 1` |
| Last two journal lines (read-back of an append, rule 8 of section 4) | `Get-Content <current segment> -Tail 2` |
| Checksum of a segment without its last line (append read-back, rule 8, step 4) | `head -n -1 <segment> \| sha256sum` on macOS or Linux; the PowerShell equivalent must be checked byte for byte before its first use |
| Exclusive creation of `writer.lock` (fails if the file exists) | `[System.IO.File]::Open('<lock>', 'CreateNew', 'Write', 'None').Close()`; the one JSON line is then written into this empty file with the file tool and read back. On macOS or Linux: `set -C` (noclobber) before the creation |
| Copy into `outbox/<send_attempt_id>/` | `Copy-Item -LiteralPath <source> -Destination <outbox folder>`, then the checksum row above for every copy |
| DOCX and PDF creation (document tool) | The platform's document tool when the installation has one; otherwise LibreOffice in headless mode: `soffice --headless --convert-to pdf --outdir <folder> <file.docx>` for the PDF of an approved DOCX |

In the table, `<journal>` is every segment `journal/transactions-*.jsonl` of the person, and `<current segment>` is the segment of the current month. Time-zone conversion of an old moment is not needed: months are written into the events when they happen. Text files are written with the agent's own file tool, not with shell redirection; the lock creation above and the one-time migration split (DATA_CONTRACT.md §3d) are the only exceptions. These forms have not yet been tried on a real Windows machine; the first trial is part of the acceptance checks.

Document packages are first prepared in a temporary folder and checked. They are then saved as a new, numbered version folder (`v001`, `v002`), and only then registered in the journal with file names, sizes and, where the system's own tools can provide it, a checksum. A package that was accepted is never changed in place: a change creates a new version and returns the application to review.

### 4b. Writer lock protocol (F07)

**Scope.** One lock per person: `persons/<person_id>/journal/writer.lock`. It protects that person's journal, quota and profile events. It covers the writing steps only; searching, rendering and external calls happen outside it. Another person's lock does not block this person's work, and this person's lock never allows writes for another person.

**Taking the lock.**

1. Create the file with one operation that fails if the file already exists: exclusive creation (a "create new" mode, an exclusive-open flag, or an equivalent that the environment documents). Checking that the file is absent and then creating it in a second step is not exclusive creation.
2. The content is one JSON line with `lock_id`, `run_id`, `owner` (a short label of the chat), `person_id` and `created_at` (UTC), as in DATA_CONTRACT.md §5, "Writer lock (F07)". The `run_id` is also written into the chat's session note.
3. If creation fails because the file exists, the agent writes nothing and reads the file. If its `run_id` is this chat's, the agent continues (a restarted chat recognizes its own lock through its note). Otherwise it stops, reports `LOCK_HELD` and asks the person; the stale-lock procedure below applies.
4. Before each write under the lock, the agent reads the lock again and confirms that it still carries its `lock_id`. If the lock has gone or changed, the write is abandoned and reported.
5. Whether exclusive creation works in this installation is recorded in `workspace.json` under `capabilities.writer_lock` (`available`, `unavailable` or `unknown`). If the result is `unavailable` or `unknown`, the agent claims no exclusivity and starts no autonomous parallel write or external action: only one chat acts for that person, and the person is told so.

**Releasing the lock.** Only the holder releases it, and only after the last journal line it wrote has passed the read-back of rule 8, step 4 (a chat that wrote no line releases after its last check). The holder reads the lock file, confirms that it carries its own `lock_id`, and deletes it, as a separate step. A failed write keeps the lock and stops the chat; the lock is never deleted in the same command as a write that may have failed. The next start retakes nothing on its own: it reads the lock, and a lock whose `lock_id` and `run_id` belong to this chat's note is continued after that check (step 3 above); any other lock follows the stale-lock procedure. Release is never triggered by age, by another chat or by a timeout. Releasing writes no journal line.

**Stale lock.** A lock never expires by age, and its expiry never releases a reservation. Before a lock that is not this chat's is removed, the following are needed, in this order:

- (a) the person confirms that the owner chat is no longer working (the agent cannot see other chats);
- (b) the last journal line is complete valid JSON, and `sequence` has no gaps (DATA_CONTRACT.md §3c);
- (c) every open attempt (`send_started`, or a schedule intent without a result) is listed; each one becomes `send_uncertain` unless it is reconciled with SENT or Scheduled (6a); outbox folders without a result are listed;
- (d) the remote state is checked where the mail tool allows it; what cannot be checked stays open;
- (e) only then the lock is deleted. The deletion is noted in the run record and in the `result` text of the next journal line; it is not a separate event.

While an open attempt exists, no new send or schedule is allowed for that person, in any chat.

**What happens at each transition.** None of the cases below makes a second external call. The table says what the next chat finds and what it does.

| Failure point | State left behind | Recovery |
|---|---|---|
| Before the lock file is created | Nothing | Start the operation again |
| Lock created, no journal line written yet | Lock file only; journal unchanged | Stale-lock check; no external call has happened; remove the lock after step (a) |
| While the journal line is being written | Possibly a truncated last line | Stop and keep the file (rule 4 of section 4); no external call has happened; diagnose from the last complete line |
| After the intent line (reservation and `send_started`), before the external call | Open attempt; the call may or may not have happened | Reconcile in SENT and Scheduled. Found: record the verified fact. Proven absent: `failed_before_send` and `quota_released`. Otherwise `send_uncertain`, reservation kept, the person decides. Never call again |
| During the external call, response lost | Same as above | Same. A lost response cannot be told apart from a call that never happened, so the attempt is `send_uncertain` unless absence is proven |
| After the response, before the result line | The chat knew the result; the journal does not show it | Reconcile the evidence once: verified → `sent_verified` and `quota_consumed` (or the schedule record); proven absent → `failed_before_send` and `quota_released`; otherwise `send_uncertain`. Never call again |
| After the result line, before the views are updated | Journal complete; views stale | Replay the views (6b). No external action |
| Two chats race for the last slot | Only one exclusive creation can succeed | The loser writes nothing and reports `LOCK_HELD`. The quota check runs after the lock is taken, not before |
| Another actor deletes the lock during a write | A write may stop midway | The re-check in step 4 stops the write; the next chat follows the stale-lock procedure |

If exclusive creation is unavailable, these rules still apply, but parallel chats for the same person are not supported at all.

## 5. Standard actions

Instead of programmed commands, the agent performs named actions. Each action is a checklist in `TODO_FOR_AI.md`; the names are used in the journal and in messages to the user.

| Action | Result |
|---|---|
| Inspect workspace | Inventory, format, available capabilities, selected person and profile |
| Resume work | Unfinished operations, next actions, questions |
| Propose / confirm profile | Proposed facts / a confirmed version |
| Import targets | Sourced target records or a list of conflicts |
| Register package | Document version, file list, check and review status |
| Plan queue | A preview of specific slots and quota availability |
| Commit plan | The plan and reservations are recorded after the user accepts |
| Send check | “Allowed” or “blocked” with exact reasons; nothing is sent |
| Send | One authorized send and a recorded outcome |
| Read / classify mail | Stored observations / a confirmed classification |
| Reconcile mail | Comparison with proof, without sending again |
| Replay / rebuild views | Records, `Status.txt`, queue, `quota.json` and statistics rebuilt from the journal and immutable versions (6b) |
| Build report / statistics | Report files and the statistics page with the same numbers |
| Backup / restore check | A consistent copy and a check in a separate folder (section 12) |
| Create local archive (R01) | A verified, versioned snapshot after a completed operation (section 12) |
| Schedule in Gmail (R03) | A scheduled item verified in Gmail Scheduled (6a); this is not yet a sent message |
| Plan the month and cadence (R02, R04) | A reviewed slot calendar and reservations for the month (8a, 8b) |
| Daily check at 16:00 (R05) | Reconciliation of Scheduled, SENT, replies and delivery notices (8c) |

The agent's answer for every action states: the outcome (`ok`, `needs_input`, `conflict`, `blocked` or `failed`), a reason code, the journal position, the files it produced, and the next step in ordinary language. Reason codes stay stable; the full list is in DATA_CONTRACT.md §3c (for example `ACCOUNT_MISMATCH`, `QUOTA_EXHAUSTED`, `SEND_UNCERTAIN`, `PACKAGE_CHANGED`, `SUBJECT_TOO_LONG`, `MODE_DRAFT_ONLY`, `LOCK_HELD`). Which actions write a journal line is also defined there.

“Plan queue” only previews. Reservations become active only after “Commit plan”; the journal determines the real remaining quota. A successful “Send check” is not permission that lasts: “Send” checks the current journal position, the time, the consent and the package again.

## 6. Sending and the outbox

The outbox is a prepared folder for one attempt, `outbox/<send_attempt_id>/`: copies of the package files that will be attached, `message.txt` (recipient, subject and body exactly as sent) and `attempt.json` (`account_id`, `application_id`, `send_attempt_id`, `consent_id`, the checksums of the copied files). It contains no secrets. It is not a separate mail server. An attempt with a `send_started` and no result is treated as open.

The order below is the external action order of DATA_CONTRACT.md §5 and TODO_FOR_AI.md, Part C (F07). It applies to every external mail action: a send, a Gmail schedule, a reschedule and a cancel. Preparing a package is not sending. Each step must succeed before the next one starts.

1. **Immutable package.** Create the `outbox/<send_attempt_id>/` copy of the exact files and a manifest with the SHA256 of every attachment, the recipient and the source of its address, the sending account, the subject, the body, the transport (`agent_local_run`, `gmail_scheduled` or `manual_by_person`; never two for one package) and the slot with its time zone. Read the copy back and check it against the approved package.
2. **Consent bound to the manifest.** The approval (`package_approved`, or the approved plan with its consent) carries the manifest SHA256. Every component in step 1 must still match it. A changed component makes the earlier consent void for the new version, which needs a new approval (`approval_revoked`, `PACKAGE_CHANGED`). Then the send check runs.
3. **Reservation and durable intent (hard gate).** Under the writer lock (4b), the chat rereads quota and history, then writes one journal line with `quota_reserved` and `send_started`. The line carries the intent, the transport, the `send_attempt_id` and the manifest SHA-256 (and the other fields of DATA_CONTRACT.md §3c). The chat reads it back under rule 8 of section 4, and releases the lock only after that read-back passes (rule 8, step 6). Immediately before step 4 it reads the last line of the journal once more: it must be this intent line, with the same `send_attempt_id` and manifest SHA-256 as the approval. **Gate:** if the write or its read-back fails, the chat stops before the lock is released, makes no external call, records nothing else and keeps the lock. If only the last-line check fails, the chat makes no external call, and the open intent is handled under 4b.
4. **One external call.** Exactly one, by the chat that wrote the intent. No retry in the same chat and no "second copy to be safe". Each `attempt_id` has one executor; a repeated run finds the existing attempt and reconciles it.
5. **Reconciliation.** Search SENT or Scheduled for the exact message (account, package, recipient, slot). Found: go to step 6. Proven absent: `failed_before_send` and `quota_released` in one line. Otherwise `send_uncertain`: the reservation stays, no new external call is made, and the person decides after a check.
6. **Record the fact.** For a `cv_submission`, `sent_verified` and `quota_consumed` in one line; a thank-you or an ordinary reply is recorded with `thank_you_sent` or `ordinary_reply_sent` (DATA_CONTRACT.md §4), never with `sent_verified`; `gmail_scheduled_verified` for a schedule (which is not a sent event). Then update the views (6b) and create the local archive (section 12).

Views and reports can be rebuilt later. Losing the HTML page or `registry.json` never causes a second email.

**Kinds of send and their repeat keys (F01).** Each kind of send has its own key, checked in the same journal line that starts it:

- `cv_submission` (uses a slot): the same application attempt cannot be repeated. A CV sent earlier to the employer does not block a permitted follow-up.
- `thank_you`: unique by account + incoming `gmail_message_id` + `thank_you`. A first thank-you after a sent CV is allowed; a second one for the same incoming message is not. It is recorded as `thank_you_sent` and needs a valid `follow_up` consent (DATA_CONTRACT.md §4).
- A period question is not a separate kind: it is an `ordinary_reply` (event `ordinary_reply_sent`), sent only after the person approves that message; it is unique by account + incoming Gmail Message-ID, and one period question is asked per thread (`thread_id`). `thank_you_sent` is the only automatic follow-up.
- `ordinary_reply`: a reply without a CV; it uses no slot and is checked against the same thread history before it is written.

An open or uncertain attempt blocks a retry of the same key and blocks all new sends for that person until it is resolved. An uncertain outcome never opens a path to a duplicate.

The external call and the local record cannot be made atomic. If the chat stops after `send_started`, nobody can know whether the mail service was called. Consent withdrawn before `send_started` blocks the send; after a recorded start the send may already be under way and must be reconciled, not promised cancelled. Not finding the message in SENT during an incomplete check does not prove that it was not sent.

De-duplication of thank-you messages uses: account_id + incoming gmail_message_id + intent (thank_you). The single question about the period uses: account_id + thread_id + intent (ordinary_reply). These keys are checked in the same journal line that starts the action, so that two chats cannot answer the same message twice.

### 6a. Gmail Scheduled through the agent's browser (R03)

**Conditions.** The mode allows it, and the person has signed in to the intended Gmail account in the browser profile personally. The agent never receives or stores passwords, one-time codes or cookies. A Gmail session belongs to that browser profile and may expire at any time. Gmail sends a scheduled message even when the agent is not running, so consent, calendar, package and reservation are checked before scheduling. A change to any of them needs a new approval and, for an item already scheduled, a verified change or cancellation first.

**Limit of the built-in browser.** In the documented version, the built-in browser cannot upload files automatically (the R03/R08 amendment of the consolidated plan). If this installation cannot attach the approved files, the agent stops before scheduling and uses the manual route below.

**Steps.** The order follows section 6.

1. **Before.** Check the person, the active Gmail sender (it must be the account in the profile, and the browser must show the same address), the mode and consent, the approved slot, the recipient and its source, the subject (50 characters at most after NFC normalization), the body, and every attachment (name, size and SHA256 against the manifest).
2. **Reserve.** Under the writer lock, record `quota_reserved` and `send_started` with transport `gmail_scheduled`, for the month of the planned send. Release the lock. This line is the durable intent.
3. **Compose.** Open a new message, fill in only the approved fields, attach only the approved files and wait until every upload is complete. If an attachment fails, stop: nothing has been scheduled yet.
4. **Schedule.** Choose **Schedule send**, not Send. Set the exact date and local time and check the time zone shown.
5. **Verify in Scheduled.** Open the Scheduled folder and match the entry with the account, recipient, subject, body, attachments and date and time. A click or a confirmation message is not proof.
6. **Keep the evidence.** Save the remote identifier or the locator of the evidence that Gmail gives. A Message-ID is never invented.
7. **Record.** Write `gmail_scheduled_verified` (with the manifest hash and the scheduled time), refresh the views and create a local archive (section 12). This is not `sent_verified`.
8. **After the planned time.** Check SENT for the exact message and its actual send time, and record `sent_verified` and `quota_consumed` once.

**States and journal events.** Follow DATA_CONTRACT.md §12.2; the event names are those of §3c.

| State | Evidence | Journal |
|---|---|---|
| `local_planned` | Plan approved; nothing sent to Gmail | `plan_committed` |
| `scheduling_started` | Reservation and intent written; not confirmed yet | `quota_reserved` and `send_started` (transport `gmail_scheduled`) |
| `gmail_scheduled_verified` | Exact entry found in Scheduled | `gmail_scheduled_verified` |
| `schedule_failed_before_commit` | Absence proven: Scheduled and SENT searched by account, package, recipient and slot | `failed_before_send` and `quota_released` |
| `schedule_uncertain` | Intent written; no verified result | `schedule_uncertain`; reservation kept |
| `sent_verified` | Exact entry found in SENT after its scheduled time | `sent_verified` and `quota_consumed` |
| moved (verified) | Exact entry moved, with permission; checked in Gmail | `schedule_changed`, and `reservation_moved` when the month changes |
| cancelled (verified) | Exact entry gone from Scheduled and present only as a draft, with permission | `schedule_cancelled` and `quota_released` (reason `schedule_cancelled_verified`) |

**Unknown result.** After a page failure, an expired session, a captcha or a protective confirmation, look for the exact entry in Scheduled and in SENT, by account, package, recipient and slot. Found: continue from the verified state. Not found in a complete check: `schedule_uncertain` or `send_uncertain`, which blocks the affected actions and reservations. Never create a second message "to be safe". Captchas, expired sessions and protective confirmations go to the person; nothing is bypassed.

**Change or cancel.** Only with the person's permission, and only for the exact entry found. In Gmail a cancelled scheduled message normally returns to Drafts. That is not a deletion and not permission to delete; deleting a scheduled message is a separate, confirmed action. The agent releases or moves a reservation only after it has seen the entry leave Scheduled (or change position). Withdrawing consent in a local file does not cancel a message that Gmail already holds. The person must be told this before any remote cancel, and cancellation is never reported as done without that check.

**Browser or login unavailable (manual fallback).** If the intent was not written, nothing is scheduled, and the application switches to the manual route (R20, `EMAIL_TO_SEND.txt`): the person opens Gmail in any browser, signs in to the same account, attaches the approved files and schedules the message by hand, then reports back (`manual_by_person`). The agent then verifies the entry in Scheduled or SENT. If an intent exists without a verified result, the state is `schedule_uncertain`: the person checks Scheduled and SENT first, and the agent reconciles before anything else. A manual schedule uses the same single reservation; it is not a second slot.

Daily reconciliation (R05) checks Scheduled and SENT: a scheduled message is not a sent one, a sent message is not a delivered one, and a delivery notice is a separate event.

### 6b. Replay: rebuilding the views (F04)

**Purpose.** Every derived file (`registry.json`, the queue, `Status.txt` entries, `quota.json`, `summary.js`, readiness data and report data) can be rebuilt from the journal and the immutable files. Replay follows DATA_CONTRACT.md §3d, which lists the source events and the idempotence rules. Replay never changes the journal.

**Steps.**

1. Copy all journal segments to a scratch location. Replay writes nothing into the person's journal.
2. Validate every line: it parses, `sequence` runs without gaps across all segments, and no `event_id` or `action_id` repeats with different content (`INTEGRITY_CONFLICT`). A damaged or incomplete line stops the replay (`JOURNAL_DAMAGED`); no view is written.
3. Apply the events in `sequence` order, as DATA_CONTRACT.md §3d defines them: companies and targets, routes, packages, plans and moves, cancellations, reservations and quota, consents, mail and responses, statuses, archives.
4. Build the views in the scratch location: registry, queue, `Status.txt` entries, `quota.json` (counts as in section 4, rule 7) and `summary.js` with its `source_revision`.
5. A file whose SHA-256 differs from the event that cites it marks the dependent view `INTEGRITY_CONFLICT`. Replay does not change the quota and does not write `approval_revoked` by itself; the agent records `approval_revoked` in a new line when the change affects an approved package.
6. Where a rebuilt view differs from the existing file, write the new file over the old one (temporary file, read-back check, then replacement). A projection that cannot be rebuilt from the journal and the immutable files is reported as incomplete; it is never filled with a guess.
7. Replay is idempotent: a second replay from the same revision changes nothing, adds no journal line and no `Status.txt` line for an `event_id` already recorded.

**Immutable versions and reports.** Plan files, package files, outbox copies and archives are never edited. An issued report is never rewritten: when the numbers of a month change after replay, the month gets a new report revision (`report_built`), and the old revision stays. A missing version (for example a deleted package folder) is shown as "version missing"; the agent does not rebuild it from memory. A restored copy (section 12) can supply it when its checksum matches.

**Quota.** `quota.json` is a projection. Its numbers come only from the events (section 4, rule 7); a damaged or missing file is replaced by the replay result.

## 7. Capabilities of the agent's tools

The written rules are the same for Codex and Claude Code, but only the platforms named in the verification record (ACCEPTANCE_TESTS.md) count as tested; Claude Code is not confirmed in this cycle. How a tool is called and how it signs in is the business of the agent's platform, not of these rules.

At setup the agent tests each capability separately: filesystem, web search, route lookup, mail reading, whole-thread reading, mail sending, proof of sending (SENT), reading of images and scans, DOCX rendering, PDF rendering and scheduled wake-up (structure: `examples/workspace.example.json`). At the start of every chat that may send, the agent calls the mail tool's “identify the account” function and compares the address with the profile; if the record of the mail capabilities is older than 7 days, it tests them again before sending. For each it records available / unavailable / unknown, the time of the check and a non-secret tool version in `workspace.json`. A line in a settings file is not evidence of a working capability.

| Unavailable capability | Work that can continue |
|---|---|
| Gmail | Research, profile work and local packages; mail statistics stay marked unverified |
| Sending or SENT verification | Drafts and reading; automatic external actions stay off |
| Routes | The target stays `route_unverified`; the agent does not claim it meets the travel requirements |
| Rendering | Draft documents are saved; visual check is not marked accepted |
| Agent scheduling | The user starts a new chat by hand; the queue stays in files |

For mail the agent needs five abilities: identify the account, list messages page by page, read a whole thread, send once, and find proof of a send. These are plain descriptions, not interface names; the agent reports what its tools really offer.

Because the agent's own mail tool is the only way to send, nothing separate exists that could enforce the monthly limit. Therefore scheduled automatic sending is not offered by default. It can be switched on only for a profile whose user has read and accepted this limitation, after the acceptance scenarios for sending have been checked in that user's own environment. Controlled reading and preparation can be used earlier.

## 8. New chats and the daily cycle

Instruction files define the rules; the journal holds the state. The to-do list describes stages, but a checkbox in Markdown is not proof of sending or of quota use.

**First run.** A folder without `workspace.json` is new. The agent then starts Part A of `TODO_FOR_AI.md` on its own: introduction, check of its tools, consent, the person's story (by voice if nothing is written), the person's documents, analysis and the knowledge base, confirmation of the facts, then the search setup (what is searched, where the person lives, radius, transport). Its position is kept in `workspace.json` as `stage` (`new`, `consent_given`, `story_ready`, `documents_ready`, `knowledge_base_draft`, `knowledge_base_confirmed`, `profile_created`, `ready`), so an interrupted first run continues where it stopped.

When resuming, the agent:

1. Checks workspace_id, format, the selected profile and the capabilities of its tools.
2. Performs “Resume work” and deals first with damage or uncertain sends.
3. Reads new mail across all required pages, including replies to older applications.
4. Applies the permitted actions and the queue, then updates reports and statistics.
5. Saves a session record under `runs` — run id, actual actions, evidence, questions and the next step — so that the next chat continues from there.

A context limit or an interrupted chat does not change the state: unfinished operations stay in the journal. Before every external action the agent rereads the relevant status. Session summaries are helpers, never the source of truth.

The mail scan is a loop: read a page, save its messages, ask for the next page with the next token, and repeat until the tool returns no next token (null). Only then is the scan complete (TODO_FOR_AI.md, Part B, step 5). The mail position is moved forward only after a whole processed page is saved. Reading a page again is safe because messages are matched by `(account_id, gmail_message_id)`. If the mail tool cannot continue from a position, the agent rescans a bounded, overlapping period and says explicitly that coverage is incomplete. An incomplete scan can never support “no new replies”. A failure for one profile does not mark other profiles as checked.

### 8a. Sending cadence (R02)

- **Cycles.** `schedule.cadence` is `immediate` (one message per permitted day), `allowed_workdays`, `every_second_allowed_workday`, `every_n_calendar_days`, `every_n_allowed_workdays` (a different count from calendar days, so the choice is confirmed with the person) or `selected_weekdays` (DATA_CONTRACT.md §13.1). With `approval_per_message` the cadence is `on_request`: there are no fixed slots, and each send happens at the moment the person answers the send card. `max_per_run` is one or two messages per run in the scheduled cadences. With two messages, the run has either two local times or one time plus an interval (`inter_message_delay_minutes`). In every mode the number of CV submissions in one local day is capped by `max_per_day`, a profile setting that the person chooses from 1 to 43 (DATA_CONTRACT.md §13.2; the default proposal for a new profile is 2; 0 and 44 or more are refused). A change takes effect from the next local day and never changes the monthly limit of 44. Each message is a separate operation with its own package, slot and key.
- **Calendar.** Before any external action the agent shows the exact slot calendar for the month: date, local time, weekday, the quota month and the excluded dates. It uses the person's time zone, the holiday calendar of the chosen region from a verified source ("not checked" is never read as "no holidays") and the dates the person excludes.
- **Daylight saving.** A local time that is missing or repeated on a clock change is not guessed. `dst_rule` is `ask` by default; `earlier`, `later` or `next_valid` apply only if the person chose one in advance and it is written into the profile.
- **Transport.** Each message has exactly one transport: `agent_local_run` (a local agent run at the set time), `gmail_scheduled` (Gmail Schedule send, section 6a) or `manual_by_person`. The same package is never sent by two transports.
- **Missed runs.** A missed run creates no catch-up batch. Overdue slots are recorded as `slot_missed` (DATA_CONTRACT.md §3c) and listed, and the person agrees new slots (`plan_changed`). The reservation of a missed slot stays until the new plan or a cancellation; nothing is sent later for that slot.
- **Quota.** Reservations are taken in the month of the actual send and count across all profiles of the person. A plan that crosses a month boundary moves its reservation only after the change in Scheduled is verified. At 44 used, reserved or unverified (DATA_CONTRACT.md §5), no new CV is planned. The person cannot override the monthly limit in chat; any new plan, and any change of the calendar, needs a new approval (DATA_CONTRACT.md §5 and §14).

### 8b. Monthly preparation and reminder (R04)

- **Reminder.** The reminder time is agreed at setup (`schedule.monthly_reminder_local_time`); no hour is assumed. The reminder is a real scheduled task of the agent, verified and recorded as in 8c. At the start of each month the agent asks once per person and month: prepare applications for this month? how many, which directions and conditions, which schedule? It shows the saved preferences, the applications already sent, the active reservations and the confirmed available quota. A repeated run creates no second question. A question missed while the device or agent was offline is shown once, at the next start.
- **No answer, or "skip".** No new monthly plan is treated as agreed, and nothing is scheduled in Gmail. Messages already approved and scheduled stay valid until a verified change or cancellation.
- **After "yes".** Check the profile, the confirmed facts, languages, geography, transport, directions and the number of applications within the shared 44. Check the registry of all months and profiles so that companies and vacancies are not reused against the approved rules; personal data is never moved between people. Find and verify vacancies, contacts and sources, and save each company card in the monthly folder. Prepare a CV, a cover letter and an e-mail text for each vacancy, with correct dates. Build the slot calendar (8a) and show it. After explicit approval of the exact packages and plan, schedule each message (6a) and verify it in Scheduled. Report: found, prepared, approved, verified as scheduled, still open or failed. A partly prepared month is never described as complete.
- **Resume.** Partial work resumes from the journal, not from memory. Preparation uses no quota; scheduled messages reserve it.

### 8c. Daily check at 16:00 (R05)

- **Registration.** At setup the agent creates one daily task at `schedule.daily_check_time` (default 16:00) in the person's time zone, confirmed at setup and not taken from server UTC; weekends included (DATA_CONTRACT.md §15.1). It records the task identifier, the schedule, the time zone, the scope (person and profile), the last run and its result. Setup repeated later updates the existing task and never creates a second one. If the agent platform has no persistent scheduler, or needs an open application or a running computer, the agent says so and offers the agreed manual start. A line in a configuration file is not evidence that a task runs.
- **Each run.**
  1. Check access to the allowed folder and to the selected mail account. Without access, record a failed check, do not write "no changes", and change no unknown status.
  2. Reconcile Scheduled and SENT with the plan. A send counts only with evidence; the reservation and the quota follow the journal.
  3. Read new replies and delivery notices on every page (the next-token loop of section 8, until no next token) and for every month, read whole threads and match them with their applications.
  4. Skip duplicates by stable message IDs. Record the original send date, the reply date, the sender, the link to the application, the evidence and a short reason.
  5. Take only permitted reactions. A thank-you or a period question happens only with consent and without repetition. Invitations, positive answers, questions and document requests go to the person. A delivery error is recorded apart from a rejection.
  6. Update the journal, the statistics and the report data. A reply to an old application counts in the month it was received; earlier cut-offs are not rewritten.
  7. Create local archives (section 12) for the processed operations. A repeated check with no new events creates none.
  8. Tell the person about a new result, an error or a decision that is needed. A clean check is recorded quietly.
- **Last working day of the month.** After the check, the monthly report is built with its cut-off and revision (AI_BUILD_SPEC.md §8). It is not e-mailed without separate permission.
- **Missed runs.** The next run shows the missed check once and names the period that was not checked. Expired sessions and a sleeping computer make the check incomplete, and it is recorded that way.

## 9. Snapshots, reports and scale

For a report the agent counts once, from a fixed journal position, and copies the same rows and counters into DOCX/PDF and into the statistics page; it never recounts the same numbers separately for each format. Both carry the same `source_revision` and cut-off. The market analysis has its own dates and sources and does not change verified mail counts.

`dashboard/index.html` is a local entry page that links to the separate profile snapshots. A profile page includes only its own applications and the person's shared quota. Adding a profile does not put its data into another person's open snapshot.

The statistics page reads its data from the file `summary.js` next to it, and contains the sorting, the filtering and the update time. The agent writes only `summary.js`; the page file is a copy of the template and is never edited, so a mistake in the data cannot break the page. The page does not send commands and does not query Gmail. The agent writes `summary.js` as a whole and compares its `snapshot_id` with the reports in the next session.

Local archives of completed operations are described in section 12. They are backups; they never change mail.

The journal grows by a few lines a day, which plain files handle easily. No indexes, queues or background workers are needed. The ability to rebuild every view from the full journal always remains.

## 10. Format changes and the first release boundary

**Version labels (each number has one meaning; other documents refer to these names).**
- The documentation version is the file `VERSION`: now 1.8.0.
- `schema_version` of a statistics snapshot (`summary.js`) is 1.4 (DATA_CONTRACT.md §9.1).
- `schema_version` of settings (`profile.json`) is 1.3, and of `workspace.json` 1.3 (`examples/settings.example.json`, `examples/workspace.example.json`); `schema_version` of `quota.json` is 1.3 (`examples/quota.example.json`).
- `format_version` of `workspace.json` is 1.4: the layout of the workspace file (DATA_CONTRACT.md §1).
- `schema_version` of a journal line is 1.2 (the line layout, DATA_CONTRACT.md §3c); `registry.json` uses 1.2 as well.

These numbers change only when their own format changes; a new documentation version does not change them by itself. The append-only journal keeps its 1.2 line layout; the added event names are additive. Existing user folders are never overwritten. A migration first makes a separate copy and a report, preserves old IDs and records, then asks the user to approve any changes. The one-time migration of a single-file journal is the procedure "Legacy journal" in DATA_CONTRACT.md §3d. Public examples contain synthetic data only.

The first trial is a full pass on synthetic data, done by hand in a chat: profile → one target → registered package → plan → simulated reply → neutral report and offline HTML. Reading Gmail and controlled sending are added separately. The checks for interrupted work and for two chats at once come before any scheduled sending. Automatic search never implies a complete or guaranteed view of the market.

The verification scenarios are in ACCEPTANCE_TESTS.md. Acceptance needs recorded evidence that the rules work in practice, not just the existence of this document.

## 11. Two languages, one project

English is the primary edition at the project root. The complete Russian edition lives in docs/ru; each page links to its counterpart. The same section structure, action names, examples and requirements apply to both. A wording difference is fixed in both editions against the user's requirement and the English base; it is not a second set of rules.

The statistics page uses `en` by default and supports `ru` and `de`. The label dictionaries have identical keys and are embedded in the page, so switching languages needs no network and no server. A missing translation falls back to English. Date formatting changes only the display; sorting uses the original timestamps. Company names and recorded evidence are not rewritten when the interface language changes. CV, cover letter, email and report languages stay separately selected and are not limited to en/ru by the documentation interface.

## 12. Local archives and recovery (R01)

The rules are in DATA_CONTRACT.md §11 (names, manifest, integrity failure, restore, loss of all archives). This section gives the procedure.

**When.** After each completed operation: a verified Scheduled item (`gmail_scheduled_verified`), a verified send or permitted follow-up (`sent_verified`, `thank_you_sent`, `ordinary_reply_sent`), a processed incoming message and its status change, a verified reschedule or cancellation, and a recorded uncertain outcome (`send_uncertain` or `schedule_uncertain`, which stays uncertain). The operation's fact is written first, the views are brought to one `source_revision`, and only then the archive is made. Each archive is keyed by its `operation_id`: reading an already processed message again, or rebuilding the statistics, creates no second archive. A batch archive lists every operation it contains and its result.

**Where and what.** Inside the person's private folder, never in the public package. Archives are folders, not compressed files, and a finished archive is never overwritten:

```text
persons/<person_id>/archives/
  <YYYY-MM-DD_HHmmss>_<UUID>/      # archive_id: one finished archive
    manifest.json                  # schema and product version, archive_id, operation_id list, run_id,
                                   # scope, local and UTC time, time zone, source_revision, files with
                                   # relative path, size and SHA-256, integrity result, referenced
                                   # immutable versions, missing_items
    journal/transactions-YYYY-MM.jsonl  # copies of all journal segments up to source_revision
    settings/                      # profile and person settings, without secrets
    registry/                      # companies, branches, vacancies and routes
    plans/                         # plan and reservation views
    packages/                      # package versions with their manifests (or references to them)
    applications/                  # Status.txt and Company.md of each application
    derived/                       # statistics summary.js and report manifests at this revision
  _tmp_<UUID>/                     # unfinished: marked incomplete and ignored by restores
```

Not stored: passwords, OAuth tokens, cookies, browser sessions, one-time codes, real `.env` files with secrets, and redundant full copies of messages; only the evidence the events need (identifiers, dates, recipients, short snippets) is kept. Hashes are integrity checks, not encryption; encryption, if wanted, is a separate decision. A reference instead of a copied package is allowed only when the referenced immutable version is available at restore time; otherwise the archive is incomplete and says so.

**How it is written.**

1. Fix the source revision: the last complete journal line (sequence n). Copy all journal segments while holding the writer lock (4b).
2. Write the temporary folder and compute the SHA-256 of every file with the system's own command (section 4a).
3. Write `manifest.json`.
4. Verify: read every file again and compare its checksum; parse every JSON and journal line; check that the copied segments end at the stated sequence, that their sequences have no gaps, and that every line belongs to this person.
5. Publish: rename `_tmp_` to the final `archive_id`, atomically where the system supports it. Where it does not, the final name is used only after the check has passed.
6. Record `backup_created` (archive_id, source revision, manifest hash). If any step fails, record `backup_failed` with the evidence and warn the person.

A full disk, a denied access or a compression failure records `backup_failed`. The archive may be created again; a message is never sent again. Working data is not deleted to make room.

**Integrity failure.** If an archive is missing or damaged, a hash differs, or the journal cannot be read in full, the agent records `ARCHIVE_INTEGRITY_FAILED` and suspends sending and scheduling for that person: no new `cv_submission`, `thank_you`, `ordinary_reply` or Gmail scheduling, until the restore or the recovery below is complete.

**Retention.** The person chooses: keep everything, the last N archives, a period, or another explicit rule. Until a choice is recorded, nothing is deleted automatically. Before any deletion the agent shows the consequences and keeps every version and link that the journal or another manifest needs. Deleting an archive never changes Gmail and never releases consumed or reserved quota.

**Restore.** Restore into a separate copy, never over the working folder, with `draft_only` and sending and scheduling disabled:

1. check every hash against the manifest, the schema version, and that the data belong to this person;
2. check that every referenced immutable version exists;
3. replay the journal copy (6b) in the restored copy, and compare the quota with the journal counts;
4. write `restore_started` and `restore_completed` (with `missing_items`) into the copy's journal; the working journal is not changed;
5. start no second mail executor: nothing is sent or scheduled from a restored copy.

**If all local archives are lost or damaged.** Gmail is the source of evidence, not a working copy. The procedure follows DATA_CONTRACT.md §11.8.

1. Keep the remaining journal, documents and views unchanged, and copy them to a separate place for reference. Enter recovery mode for that person (`RECOVERY_MODE`): no new send, no new Scheduled item and no new reservation until the reconciliation is complete. Read-only checks may run.
2. Get the person's access to every Gmail account used for applications, and check that each belongs to this person. Missing access to an account makes the recovery incomplete for that account, and this is reported.
3. Read the whole available history of applications, not only the current month: SENT, Scheduled, replies, delivery notices, complete threads, and related mail in All Mail, Spam and Trash where they are readable. Read every page. Move, delete and relabel nothing. Drafts, including those returned after a cancelled schedule, are not proof of sending.
4. For each application found, restore only what the evidence shows: recipient, sender, company, subject, body, actual dates, available message and thread IDs, replies and delivery status. Attachments are restored as recovered copies where the tool allows; a PDF found in Gmail is not presented as the original editable DOCX. Uncertain matches are not merged automatically.
5. Mark what Gmail cannot give back as unknown and ask the person for it: original biography documents, unsent packages, vacancy sources, routes, local plans, settings, the person's permissions, original document versions, and anything deleted permanently or sent through other services. A sent e-mail does not prove a current consent for future actions.
6. Build a new recovery journal in a separate copy, in which every fact has its origin (account, message ID or locator, check time, evidence). Remove duplicates by account and stable message ID. Do not repeat old thank-yous or period questions for threads already handled.
7. Restore the used quota from proven CV sends and the reservations from confirmed Scheduled items, across all accounts of the person. Thank-yous and ordinary replies are not CVs. An unclear message, an incomplete history or an unavailable account makes the quota "not confirmed", not zero. Monthly figures are rebuilt from event dates; current statuses are shown separately.
8. Report to the person: which accounts and periods were checked, how many applications, replies and plans were restored, which documents were extracted, what is unavailable and which conflicts remain. Then create a new verified archive.
9. Resume external actions only after the conflicts are settled, the quota is confirmed and a valid permission exists again. Scheduled items that already exist may send during the recovery; check them against SENT before finishing. Do not cancel them without permission, and do not promise to stop them with a local block.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com · [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
