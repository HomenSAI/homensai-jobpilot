# HomenS.AI JobPilot — Architecture

[English](ARCHITECTURE.md) | [Русский](docs/ru/ARCHITECTURE.md)

9 October 2026 · Author of the idea and developer: Serhii Khomenko / HomenS.AI · https://homensai.com/ · Documentation: CC BY-NC 4.0.

Status: design and operating specification; whether each procedure has been tried is recorded in ACCEPTANCE_TESTS.md. No servers, Docker or SQL.

## 1. Core decision: rules and files

The system is an **AI agent** (Codex or Claude Code), **written rules**, a **data folder** and a local statistics view. The agent researches, writes documents, talks to the person and keeps every record as a readable file (JSON, JSONL, Markdown, documents). The HTML page gives no commands; its data change only when the agent works.

The safeguards (the limit of 44, never send twice, one writer, nothing sent without permission) are *procedures the agent follows*, not technical locks. So every rule is a checklist run before the action; drafts only is the default; automatic sending needs the person's written acknowledgement that the limit and duplicate protection then depend on the agent; and the acceptance scenarios (ACCEPTANCE_TESTS.md) are checked by hand with synthetic data before any real sending.

## 2. Parts and responsibilities

| Part | What the agent does | Kept in |
|---|---|---|
| Workspace, capabilities | Folder, format, person, profile; tests each tool (section 7) | `workspace.json` |
| Profile and knowledge base | Materials and interview → proposed → confirmed facts with sources; the search profile | `Life_Story.md`, `profile.json` |
| Discovery, planning | Targets (duplicates, freshness, radius, routes); slots, reservations, moves | `registry.json`, journal |
| Documents | Packages from requirements and confirmed facts, versions, visual check | application folder |
| Mail | Whole threads, proof of sending, notices, replies | journal, `Status.txt` |
| Reporting | Counts at a fixed journal position; DOCX/PDF/HTML with the same numbers | `reports/`, `dashboard/` |

State changes are recorded in the journal first. Which file the agent reads when: `AGENTS.md`.

## 3. The accounting unit is a person

`person_id` groups one person's search directions. Each direction has its own `profile_id`, document languages, account, documents and consents. Quota and repeat-application checks are shared by `person_id`; different people have separate journals.

```text
Local_Data/
  workspace.json  # workspace_id, format, language, stage of the first run, capabilities
  Put_Here/  # the ONLY place where the person puts things; the agent only reads it
    1_My_Documents/  # CVs, diplomas, certificates, references (originals)
    2_My_Story/  # the person's story: transcripts, notes, interviews, the questions
    3_Report_Template/  # optional report template
    4_CV_Templates/  # everything about the CVs, any format; read only
    5_Cover_Letter_Templates/  # everything about the cover letters; read only
  persons/<person_id>/
    Knowledge_Base/Life_Story.md  # the knowledge base: confirmed facts of the life story
    journal/transactions-YYYY-MM.jsonl  # the only authoritative journal; monthly segments, -pN parts above 500 lines
    journal/writer.lock  # exists only while one chat is writing
    state/person.json  # person, profile list, setup_progress
    state/quota.json  # monthly counters, rebuilt from the journal
    outbox/<send_attempt_id>/  # prepared send package, never edited
    runs/  # person-level session notes (first setup)
    archives/  # local archives (DATA_CONTRACT.md §11)
  Resume/  # CV drafts and the Word copy of the template in use; one subfolder per person_id with several people
  CoverLetter/  # the same for cover letters
  profiles/<profile_id>/
    profile.json  # current confirmed configuration
    registry.json  # targets, applications, queue (projection)
    runs/  # session notes: plans, results, questions
    reports/<YYYY-MM>/  # report revisions and manifests
  Applications/<YYYY>/<MM_Month>/  # one tree for all years, e.g. 2026/10_October/
    001_Muster-Maschinenbau_Stuttgart_Maintenance-technician/  # number, company, city, role
      Company.md · Resume_v001.docx/.pdf · CoverLetter_v001.docx/.pdf · EmailText_de.txt · EMAIL_TO_SEND.txt
      Status.txt  # append-only history of this application
      Replies.txt  # every reply and delivery notice in full
  dashboard/
    index.html  # local menu: statistics and readiness per profile
    profiles/<profile_id>/summary.js · index.html · readiness.html  # data; unchanged template copy; readiness page
  Archive/<YYYY-MM-DD>_daily/  # daily full archive of Local_Data, for a USB stick (DATA_CONTRACT.md §11.9)
```

`Local_Data` is the technical path in every language edition; the dashboard has one path, `Local_Data/dashboard/`; profile ids are unique. Every journal line carries `person_id` and, where it applies, its profile; before acting, the agent checks that the profile belongs to the person and the account.

**Isolation between people and profiles (procedure, F12).** Each person has `persons/<person_id>/` and originals in `Put_Here/<name>/`; the agent never opens another person's originals, knowledge base, journal, state, outbox, archives or mail. A new person goes through TODO_FOR_AI.md Part A from A2 onward (A1, the workspace check, is not repeated); their progress is `setup_progress` in `persons/<person_id>/state/person.json` with the same stage words, and `stage` in `workspace.json` describes only the first person's setup of the workspace. Consents, quota, accounts and views per person: DATA_CONTRACT.md §17. This is procedural isolation, not an operating-system boundary.

## 4. One line per completed action

The journal is a set of monthly text files (rule 8) with one JSON object per line. A line is written when an action is **completed**: `schema_version`, `sequence` (1, 2, 3 … without gaps), `action_id`, `person_id`, `recorded_at`; an `events` list, each event with its own unique `event_id`; and a short `result` text that is enough to repeat the answer if the same action is asked for again.

Rules for the agent:

1. **Append only.** An old line is never edited or deleted; a correction is a new line naming the event it replaces (`supersedes_event_id`).
2. **Before writing:** read the last line, take the next `sequence`, and check that this `action_id` is in no segment. If it is, report the earlier result and do nothing else.
3. **Write the whole line at once**, then update the views (registry, queue, `Status.txt`, `quota.json`, statistics). If the chat stops in between, the next chat rebuilds them (6b).
4. **A damaged or half-written last line** is never repaired silently: stop, keep the file, tell the person, recover from the last complete line and the mail evidence.
5. **One writer at a time** (4b). A foreign lock means stop and ask. The lock protects only if every chat follows the protocol and exclusive creation works; otherwise one chat works at a time.
6. A quota or send decision always rereads the journal; a summary from earlier in the chat is never trusted.
7. **Count with the system's own tool, not by eye.** Used, reserved and unverified slots of a month are counted by text search for the month fields of the quota events in all segments (formulas: DATA_CONTRACT.md §3c, free count: DATA_CONTRACT.md §5; commands: §4a). The agent shows the number and how it was found and compares it with `quota.json`; on a difference or a missing file the journal is right and `quota.json` is rebuilt (`examples/quota.example.json`).
8. **Writing a line (one append method, monthly segments).** The current segment is `journal/transactions-YYYY-MM.jsonl` of the person's local month, or its part `journal/transactions-YYYY-MM-pN.jsonl` once the month has 500 lines (DATA_CONTRACT.md §3c); a closed segment is never edited. Segments, the lock file and JSON files are UTF-8 without BOM, with LF line endings only, ending with exactly one LF. JSON is not joined by hand; text is not written with shell redirection or heredocs; the file tool's exact replacement is used only for step 3.
   1. **Before.** Under the writer lock, find the current segment (at 500 lines the next part `-p2`, `-p3` … is a new segment). Read its last line, which must be complete; if the segment is new or empty, read the last line of the newest earlier segment (for the very first line `n` is 0). Take `n`, its `sequence`; check the new `action_id` is in no segment. Record in the run note: the line count; the last line `L` without its line break (unique: it carries its `sequence` and `action_id`); `S0`, the segment size in bytes; and `C0`, the SHA-256 of the whole segment (a new segment: `S0` 0, `C0` the SHA-256 of an empty file, `e3b0c442…b855`). Check that the file ends with LF, has no CR and no BOM.
   2. **Build** the new line `N` in the key order of DATA_CONTRACT.md §3c with `sequence` n+1: one JSON object on one line, identifiers as in DATA_CONTRACT.md §2. A failed check stops (step 5).
   3. **Append.** (a) Segment with lines: replace `L` by `L`, a line break and `N` with the file tool's exact replacement (for a very long `L` a unique tail is enough). If `L` is not found exactly once, stop. (b) New segment: check that the file does not exist, then create it with the file tool containing exactly `N` and its line break. (c) A segment under 300 lines may instead be written whole with the file tool: the lines read in step 1, then `N` and its line break; the only whole-segment rewrite.
   4. **Read back.** (a) `N` parses with `sequence` n+1; the line before it, if any, is byte-identical to `L`. (b) The line count grew by exactly one. (c) The SHA-256 of the first `S0` bytes equals `C0` (no earlier byte changed), and the new size is `S0` + the bytes of `N` + 1. (d) Still LF at the end, no CR, no BOM. Record the values in the run note.
   5. **Failure.** Any failed check stops writing: keep the segment, update no view, take no external action, keep the lock, tell the person (rule 4). Earlier lines are never rewritten as a repair.
   6. **Release.** Only after step 4 passed: read the lock, check this chat's `lock_id`, delete it (4b).

### 4a. Commands the agent may use

Only commands the system already has, typed inline; no script is saved, and Python is the tester's audit tool only. Besides the table: listing and creating folders, read-only `cmp` or `diff` (for example to check that a story was saved word for word), and the agent's own temporary files. JSON and text files (Status.txt, Company.md, run notes, EMAIL_TO_SEND.txt) are written with the file tool, never with shell redirection, heredocs, `sed` or similar; a journal line only by rule 8. Exceptions: creating `writer.lock`, copying into `outbox/`, the document tool, and the one-time legacy-journal split (DATA_CONTRACT.md §3d), which copies bytes by line ranges and is read back by checksum.

| Need | Linux / macOS | Windows PowerShell |
|---|---|---|
| UTC time | `date -u +%Y-%m-%dT%H:%M:%SZ` | `(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")` |
| UUID | Linux `cat /proc/sys/kernel/random/uuid`; macOS `uuidgen \| tr 'A-Z' 'a-z'` | `[guid]::NewGuid().ToString()` |
| Local month now | `TZ=Europe/Berlin date +%Y-%m` (the person's IANA zone) | `[TimeZoneInfo]::ConvertTime([DateTimeOffset]::UtcNow,[TimeZoneInfo]::FindSystemTimeZoneById('W. Europe Standard Time')).ToString('yyyy-MM')` (IANA zone mapped to the Windows name) |
| Checksum (`C0`) | Linux `sha256sum '<file>'`; macOS `shasum -a 256 '<file>'` | `(Get-FileHash -Algorithm SHA256 -LiteralPath '<file>').Hash.ToLower()` |
| Size in bytes (`S0`) | `wc -c < '<segment>'` | `(Get-Item -LiteralPath '<abs path>').Length` |
| Checksum of the first `S0` bytes (rule 8, 4c) | Linux `head -c <S0> '<segment>' \| sha256sum`; macOS `head -c <S0> '<segment>' \| shasum -a 256` | `$b=[IO.File]::ReadAllBytes('<abs path>'); -join ([Security.Cryptography.SHA256]::Create().ComputeHash($b,0,<S0>) \| ForEach-Object { $_.ToString('x2') })` |
| Bytes of the last line with its LF (4c) | `tail -n 1 '<segment>' \| wc -c` | `[Text.Encoding]::UTF8.GetByteCount((Get-Content -Encoding UTF8 -LiteralPath '<abs path>' -Tail 1)) + 1` |
| Ends with LF, no CR, no BOM | `tail -c 1 '<segment>' \| od -An -c` shows `\n`; `tr -cd '\r' < '<segment>' \| wc -c` is 0; `head -c 3 '<segment>' \| od -An -tx1` is not `ef bb bf` | with `$b` as above: `$b[-1] -eq 10; @($b -eq 13).Count -eq 0; -not ($b[0] -eq 0xEF -and $b[1] -eq 0xBB -and $b[2] -eq 0xBF)` |
| Last lines, line count | `tail -n 1 '<segment>'`, `tail -n 2 '<segment>'`; `wc -l < '<segment>'` | `Get-Content -Encoding UTF8 -LiteralPath '<segment>' -Tail 1` (or `-Tail 2`); `(Get-Content -Encoding UTF8 -LiteralPath '<segment>').Count` |
| Count matches of a month (rule 7) | `grep -oE '"consumed_month" *: *"2026-10"' <journal> \| wc -l` (never `grep -c`: it counts lines, not matches) | `(Select-String -Encoding UTF8 -Path <journal> -Pattern '"consumed_month"\s*:\s*"2026-10"' -AllMatches \| ForEach-Object { $_.Matches.Count } \| Measure-Object -Sum).Sum` (empty means 0) |
| Every line is valid JSON | Read back with the file tool: one object per line; `jq empty '<segment>'` only if jq is installed | `Get-Content -Encoding UTF8 -LiteralPath '<segment>' \| ForEach-Object { $_ \| ConvertFrom-Json } \| Out-Null` |
| Create `writer.lock` with its content, failing if it exists | `set -C; printf '%s\n' '<lock json>' > '<absolute path>/journal/writer.lock'` (bash or zsh) | `` $f=[IO.File]::Open('<absolute path>','CreateNew','Write','None'); $w=New-Object IO.StreamWriter($f,(New-Object Text.UTF8Encoding($false))); $w.Write('<lock json>'+"`n"); $w.Close() `` |
| Copy into `outbox/<send_attempt_id>/` | `cp '<source>' '<outbox folder>/'`, then the checksum of each copy | `Copy-Item -LiteralPath '<source>' -Destination '<outbox folder>'`, then the checksum of each copy |
| DOCX → PDF | The platform's document tool first; otherwise `soffice --headless --convert-to pdf --outdir '<folder>' '<file.docx>'` | the same |

`<journal>` is every segment `journal/transactions-*.jsonl` of the person; `<segment>` is the current one. Paths are absolute and quoted. The shell state does not persist between commands, so `set -C` and the lock creation are one command; the lock JSON contains no apostrophe. The Linux forms were tried with bash and GNU coreutils; the macOS forms are their BSD equivalents. The PowerShell forms have not yet been tried on a real Windows machine; the first trial is part of the acceptance checks.

### 4b. Writer lock protocol (F07)

**Scope.** One lock per person, `persons/<person_id>/journal/writer.lock`, for that person's journal, quota and profile events. It covers the writing steps only; searching, rendering and external calls happen outside it. Another person's lock neither blocks nor allows this person's writes.

**Taking the lock.**

1. Create the file **with its content in one command** that fails if the file exists, with an absolute path (§4a). Checking that the file is absent and then creating it is not exclusive creation.
2. The content is one JSON line with `lock_id`, `run_id`, `owner`, `person_id` and `created_at` (DATA_CONTRACT.md §3c, “The lock file”); the `run_id` is also in the chat's session note.
3. If the file exists, write nothing and read it. Its `run_id` is this chat's: continue (a restarted chat knows its lock from its note). Otherwise: stop, report `LOCK_HELD`, ask the person. **An empty or unreadable lock** (the owner stopped between creation and writing) is a foreign lock: the stale-lock procedure applies.
4. Before each write, read the lock again and confirm the `lock_id`; if it has gone or changed, abandon the write and report it.
5. `capabilities.writer_lock` in `workspace.json` records whether exclusive creation works (`available`, `unavailable`, `unknown`). Cloud-synced folders (OneDrive, iCloud, Dropbox) give no exclusive creation across devices: `unavailable`. If not `available`, the agent claims no exclusivity, runs no autonomous parallel write or external action, and tells the person that only one chat may work.

**Releasing the lock.** Only the holder, only after its last line passed the read-back of rule 8, step 4 (a chat that wrote nothing releases after its last check): read the lock, confirm the own `lock_id`, delete it as a separate step. A failed write keeps the lock and stops the chat; the lock is never deleted in the same command as a write that may have failed. Never by age, another chat or a timeout; no journal line.

**Stale lock.** A lock never expires by age, and removing one never releases a reservation. A lock that is not this chat's is removed only after, in this order: (a) the person confirms that the owner chat no longer works; (b) the last journal line is complete JSON and `sequence` has no gaps (DATA_CONTRACT.md §3c); (c) every open attempt (`send_started` or a schedule intent without a result) is listed and becomes `send_uncertain` unless reconciled with SENT or Scheduled, and outbox folders without a result are listed; (d) the remote state is checked where the mail tool allows; what cannot be checked stays open; (e) the lock is deleted, noted in the run record and in the `result` of the next journal line (not a separate event). While an open attempt exists, no new send or schedule is allowed for that person, in any chat.

**Failure points.** None makes a second external call.

| Failure point | Left behind | Recovery |
|---|---|---|
| Before the lock is created | Nothing | Start again |
| Lock created (also empty), no line written | Lock only | Stale-lock check; no external call happened; remove after (a) |
| During the line write | Possibly a truncated last line | Stop, keep the file (rule 4); diagnose from the last complete line |
| After the intent line (`quota_reserved`, `send_started`): before the call, response lost, or before the result line | Open attempt; the call may have happened | Reconcile SENT and Scheduled once: verified → `sent_verified` + `quota_consumed` (or the schedule record); proven absent → `failed_before_send` + `quota_released`; otherwise `send_uncertain`, reservation kept, the person decides. Never call again |
| After the result line, before the views | Views stale | Replay (6b); no external action |
| Two chats race for the last slot | One exclusive creation succeeds | The loser writes nothing, `LOCK_HELD`; the quota check runs after the lock is taken |
| Lock deleted by another actor during a write | A write may stop midway | Step 4 stops the write; the next chat follows the stale-lock procedure |

Without exclusive creation these rules still apply, and parallel chats for one person are not supported at all.

## 5. Standard actions

The agent performs named actions, each a checklist in `TODO_FOR_AI.md` Part C, and uses the names in the journal and in messages: Inspect workspace; Resume work; Propose / confirm profile; Import targets; Register package; Plan queue (a preview only); Commit plan (plan and reservations after acceptance); Send check (“allowed” or “blocked”, nothing sent); Send (one authorized send and its outcome); Read / classify / reconcile mail (with proof, never sending again); Replay / rebuild views (6b); Build report / statistics (the same numbers); Backup / restore check and Create local archive (R01, section 12); Schedule in Gmail (R03, 6a; not yet sent); Plan the month and cadence (R02, R04; 8a, 8b); Daily check at 16:00 (R05, 8c).

Every answer states the outcome (`ok`, `needs_input`, `conflict`, `blocked` or `failed`), a reason code, the journal position, the files and the next step. Reason codes and which actions write a line: DATA_CONTRACT.md §3c (for example `ACCOUNT_MISMATCH`, `QUOTA_EXHAUSTED`, `SEND_UNCERTAIN`, `PACKAGE_CHANGED`, `SUBJECT_TOO_LONG`, `MODE_DRAFT_ONLY`, `LOCK_HELD`). A passed Send check is not lasting permission: Send checks the journal position, the time, the consent and the package again.

## 6. Sending and the outbox

The outbox `outbox/<send_attempt_id>/` holds, for one attempt, copies of the files to attach, `message.txt` (recipient, subject and body exactly as sent) and `attempt.json` (`account_id`, `application_id`, `send_attempt_id`, `consent_id`, checksums of the copies); no secrets. An attempt with `send_started` and no result is open.

Every external mail action (send, Gmail schedule, reschedule, cancel) follows TODO_FOR_AI.md Part C, “External action order (F07)”: immutable package → consent bound to the manifest → reservation and durable intent → one external call → reconciliation → recorded fact. **Hard gate:** the intent line (`quota_reserved` and `send_started`) is written under the lock, read back by rule 8, and just before the single call must still be the last line of the current segment, with the `send_attempt_id` and manifest SHA-256 of the approval. If the write or read-back fails: no call, nothing else recorded, the lock kept; if only this last-line check fails: no call, and the open intent is reconciled (4b). Each `send_attempt_id` has one executor; a repeated run reconciles the existing attempt. A package has one transport (`agent_local_run`, `gmail_scheduled` or `manual_by_person`, DATA_CONTRACT.md §12.1).

**Kinds of send (F01).** `cv_submission`, `thank_you` and `ordinary_reply` (a period question included) each have their own repeat key, checked in the line that starts the send: DATA_CONTRACT.md §4. An open or uncertain attempt blocks a retry of its key and all new sends for that person.

The external call and the local record cannot be atomic: after `send_started` nobody knows whether the mail service was called. Consent withdrawn before `send_started` blocks the send; after it the send is reconciled, never promised cancelled. Absence from SENT in an incomplete check proves nothing.

### 6a. Gmail Scheduled through the agent's browser (R03)

**Conditions.** The mode allows it, and the person has signed in to the intended Gmail account in the browser personally; the agent never receives passwords, one-time codes or cookies, and a session may expire at any time. Gmail sends a scheduled message even when the agent is not running, so consent, calendar, package and reservation are checked before scheduling; a change to any of them needs a new approval and, for an entry already scheduled, a verified change or cancellation first.

**Limit of the built-in browser.** In the documented version it cannot upload files. If this installation cannot attach the approved files, the agent stops before scheduling and uses the manual route.

**Steps and states:** TODO_FOR_AI.md Part C, “Gmail Scheduled through the built-in browser (R03)”, and DATA_CONTRACT.md §12.2. An unknown result is the event `send_uncertain` (transport `gmail_scheduled`); `schedule_uncertain` is only the name of that state. Never a second message “to be safe”.

**Manual fallback.** Without the browser or the login, and with no intent written, nothing is scheduled and the application goes to TODO_FOR_AI.md Part C, “Manual email fallback (R20)” (`EMAIL_TO_SEND.txt`): the person sends or schedules it by hand from the same account (`manual_by_person`) and reports back; the agent verifies it in Scheduled or SENT. An intent without a verified result is reconciled first. A manual schedule uses the same single reservation.

### 6b. Replay: rebuilding the views (F04)

Every derived file (`registry.json`, the queue, `Status.txt` entries, `quota.json`, `summary.js`, readiness and report data) can be rebuilt from the journal and the immutable files; source events and idempotence: DATA_CONTRACT.md §3d. Replay never changes the journal.

1. Copy all journal segments to a scratch location; nothing is written into the person's journal.
2. Validate every line: it parses, `sequence` has no gaps across segments, no `event_id` or `action_id` repeats with different content (`INTEGRITY_CONFLICT`). A damaged or incomplete line stops the replay (`JOURNAL_DAMAGED`); no view is written.
3. Apply the events in `sequence` order (DATA_CONTRACT.md §3d): companies and targets, routes, packages, plans and moves, cancellations, reservations and quota, consents, mail and responses, statuses, archives.
4. Build in the scratch location: registry, queue, `Status.txt` entries, `quota.json` (rule 7) and `summary.js` with its `source_revision`.
5. A file whose SHA-256 differs from the event that cites it marks the dependent view `INTEGRITY_CONFLICT`. Replay changes no quota and writes no `approval_revoked` itself; the agent records `approval_revoked` in a new line when an approved package is affected.
6. Replace each view that differs (temporary file, read-back, replacement). A projection that cannot be rebuilt is reported as incomplete, never guessed.
7. A second replay from the same revision changes nothing and adds no journal or `Status.txt` line for an `event_id` already recorded.

Plans, packages, outbox copies and archives are never edited. An issued report is never rewritten: changed numbers get a new revision (`report_built`). A missing version is shown as “version missing”, not rebuilt from memory; a restored copy (section 12) can supply it when its checksum matches. `quota.json` comes only from the events; a damaged or missing file is replaced by the replay result.

## 7. Capabilities of the agent's tools

Only the platforms named in ACCEPTANCE_TESTS.md count as tested (Claude Code is not confirmed). At setup the agent tests each capability: filesystem, web search, route lookup, mail reading, whole-thread reading, mail sending, proof of sending (SENT), images and scans, DOCX rendering, PDF rendering, scheduled wake-up and the writer lock (`examples/workspace.example.json`). It records available / unavailable / unknown, the check time and, in its `note`, a non-secret tool version where the tool reports one, in `workspace.json`; a line in a settings file is no evidence. In every chat that may send, the agent identifies the mail account and compares it with the profile, and tests mail capabilities again if their check is older than 7 days.

| Unavailable | Work that can continue |
|---|---|
| Gmail | Research, profile, local packages; mail statistics marked unverified |
| Sending or SENT proof | Drafts and reading; automatic external actions off |
| Routes | The target stays `route_unverified`; no claim about travel requirements |
| Rendering | Drafts saved; the visual check not marked accepted |
| Agent scheduling | The person starts a chat by hand; the queue stays in files |

For mail the agent needs to identify the account, list messages page by page, read a whole thread, send once and find proof of a send; it reports what its tools really offer. Nothing but the agent enforces the monthly limit, so scheduled automatic sending is off by default and is switched on only for a profile whose person has accepted this, after the sending scenarios were checked in that person's environment.

## 8. New chats and the daily cycle

The journal holds the state; a Markdown checkbox proves nothing. A folder without `workspace.json` is new: first setup is TODO_FOR_AI.md Part A, its position is `stage` in `workspace.json`. Every later chat follows TODO_FOR_AI.md Part B and ends with its session record under `runs/` (DATA_CONTRACT.md §18). An interrupted chat changes no state: unfinished operations stay in the journal, and the status is reread before every external action.

The mail scan is the next-token loop of TODO_FOR_AI.md Part B, step 5 (DATA_CONTRACT.md §15.3). Its position moves only after a whole processed page is saved (rereading is safe: messages are keyed by `(account_id, gmail_message_id)`); a tool that cannot resume gets a bounded, overlapping rescan reported as incomplete. A failure for one profile marks no other profile as checked.

### 8a. Sending cadence (R02)

Cadence values, `max_per_run`, `max_per_day`, `sending_rule_statement`, `inter_message_delay_minutes`, `dst_rule`, transports, missed slots (`slot_missed`) and validation: DATA_CONTRACT.md §13 (calendar: its §7; quota: its §5). How to ask: TODO_FOR_AI.md A7, “Cadence rules (R02)”.

### 8b. Monthly preparation and reminder (R04)

The monthly plan, question and reminder (`schedule.monthly_reminder_local_time`), the preparation steps and the case without an answer: DATA_CONTRACT.md §14. Preparation uses no quota; scheduled messages reserve it.

### 8c. Daily check at 16:00 (R05)

Task registration, completeness, pagination, missed runs and the monthly report on the last working day: DATA_CONTRACT.md §15. The steps of each run: TODO_FOR_AI.md Part B, step 6.

## 9. Snapshots, reports and scale

A report is counted once, at a fixed journal position; DOCX/PDF and the statistics page carry the same numbers, `source_revision` and cut-off, and the market analysis changes no mail count. A profile page shows its own applications and the person's shared quota. The agent writes only `summary.js` (DATA_CONTRACT.md §9); the page is an unchanged template copy that sends no commands and does not query Gmail. No indexes, queues or workers are needed.

## 10. Format changes and the first release boundary

**Version labels (each number has one meaning; other documents refer to these names).**
- The documentation version is defined by [VERSION](VERSION).
- `schema_version` of a statistics snapshot (`summary.js`) is 1.4 (DATA_CONTRACT.md §9.1).
- `schema_version` of settings (`profile.json`) is 1.4, and of `workspace.json` 1.3 (`examples/settings.example.json`, `examples/workspace.example.json`); `schema_version` of `quota.json` is 1.3 (`examples/quota.example.json`).
- `format_version` of `workspace.json` is 1.4: the layout of the workspace file (DATA_CONTRACT.md §1).
- `schema_version` of a journal line is 1.2 (the line layout, DATA_CONTRACT.md §3c); `registry.json` uses 1.2 as well.

A number changes only with its own format; new event names are additive. User folders are never overwritten: a migration works on a separate copy with a report, keeps old IDs and records, and needs the person's approval (single-file journal: “Legacy journal”, DATA_CONTRACT.md §3d). Public examples are synthetic.

The first trial is a manual pass on synthetic data: profile → target → package → plan → simulated reply → report and offline HTML; Gmail reading and sending come later, and the tests for interrupted work and two parallel chats come before any scheduled sending. Acceptance needs recorded evidence (ACCEPTANCE_TESTS.md).

## 11. Four languages, one project

English is primary; Russian, German and Ukrainian are in `docs/ru`, `docs/de` and `docs/uk`, with one data contract, the same event names and behavior; a rule change updates all four. The statistics interface supports `en`, `ru` and `de`; switching changes labels only, not records or the separately chosen CV, letter, e-mail and report languages.

## 12. Local archives and recovery (R01)

Local archives are folders under `persons/<person_id>/archives/`, written after each completed operation once its fact is in the journal and the views share one `source_revision`. They are backups, never Gmail Archive, and never change mail. When, layout, manifest, write steps (`backup_created`, `backup_failed`), retention, integrity failure (`ARCHIVE_INTEGRITY_FAILED`), restore into a separate copy and recovery from Gmail after losing all archives (`RECOVERY_MODE`): DATA_CONTRACT.md §11.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com · [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
