# HomenS.AI JobPilot — Data Contract 1.5

[English](DATA_CONTRACT.md) | [Русский](docs/ru/DATA_CONTRACT.md)

A contract for the files and procedures that the AI agent follows. The journal, quota, consent and mail procedures are not enforced by a separate application. The statistics page has code only to validate and display a snapshot; it does not perform the contracted actions. The agent follows this contract and the user checks it with the acceptance scenarios. Supplements AI_BUILD_SPEC.md; the parts of the system are described in [ARCHITECTURE.md](ARCHITECTURE.md) and the operating procedures in [OPERATING_REQUIREMENTS.md](OPERATING_REQUIREMENTS.md). This document does not authorize sending email.

Author: Serhii Khomenko / HomenS.AI · https://homensai.com/ · documentation: CC BY-NC 4.0.

## 1. File-based database and source of truth

The first version uses UTF-8 JSON for configuration and records, and JSONL for events. No SQL, servers, scripts or external libraries. Every record has a `schema_version` (the record format, now `1.2`); incompatible versions must not be rewritten automatically. `format_version` in `workspace.json` is the documentation line (now `1.4`), a different thing. `consent_id` in a consent event is the `event_id` of that event; `default_language` and `ui_language` both hold the language of the conversation; `holidays_verified` is true only when the holidays were checked with a source named in `holiday_source`.

| Path relative to the root | Role |
|---|---|
| `Локальные_данные/persons/<person_id>/state/person.json` | Projection of the person's identity, quota time zone, and permitted profile_id values |
| `Локальные_данные/workspace.json` | Workspace id, format version (`major.minor` of the documentation, now `1.5`), language, `stage` of the first run, `person_ids`, per-person readiness progress and results of capability checks (`examples/workspace.example.json`) |
| `Локальные_данные/Положите_сюда/1_Мои_документы`, `2_Рассказ_о_себе`, `3_Шаблон_отчёта` | The person's originals, story and optional report template; the agent only reads them and never changes them |
| `Локальные_данные/persons/<person_id>/База_знаний/Жизнеописание.md` | The knowledge base: the master source of confirmed facts, see §3a |
| `Локальные_данные/persons/<person_id>/journal/transactions.jsonl` | The only primary journal: applications, profiles, messages, consent, and the shared quota |
| `Локальные_данные/persons/<person_id>/journal/writer.lock` | A marker file that exists only while one chat is writing; a convention, not an authorization mechanism |
| `Локальные_данные/persons/<person_id>/state/quota.json` | Rebuildable projection of consumed and reserved slots (`examples/quota.example.json`); missing or different from the journal means “rebuild” |
| `Локальные_данные/profiles/<profile_id>/profile.json` | Projection of confirmed objectives, facts, account, languages, and consent |
| `Локальные_данные/profiles/<profile_id>/registry.json` | Rebuildable projection of companies, vacancies, applications, and the queue |
| Application folders `Applications/<YYYY>/<MM_Month>/<NNN_…>/`: `Company.md` | Company data from public sources with the source and the check date; a correction is recorded in the journal (`company_updated`) |
| Application folders: `Status.txt` | Append-only, human-readable status history: one line per action with the time in the person's time zone and the `event_id`; existing lines are never rewritten |
| `Локальные_данные/Resume/`, `CoverLetter/` | The person's resume and cover letter templates (Word; a PDF is converted to Word here); the originals are never changed, versions are new files |

New events are first durably recorded in the journal, then projections are updated. The line format, the event names and the counting rules are in §3c. (Exception: a file that the agent creates as a whole, such as `profile.json`, a package or `summary.js`, is written and checked first, and its event is recorded right after, because the journal records completed actions.) Changing a projection without an event is prohibited. Correcting a fact or classification requires a new event with `supersedes_event_id`, not an edit to the past. Rebuilding a projection must not duplicate Status.txt lines: check event_id and the mail dedup_key.

A failure between writing a journal line and updating registry/Status.txt is resolved by rebuilding the views from the journal. Quota and application changes belong to one primary journal line, not to two independent journals. Each complete line is one completed action containing `sequence`, `action_id`, `events` and a short `result`. The write and check order is defined in ARCHITECTURE.md §4. Artifacts are saved as immutable versions first, then registered in the journal by reference (file names, sizes and, where available, a checksum).

## 2. Identifiers, paths, and time

- `person_id` is immutable for one person. Multiple profiles/accounts belonging to that person share one quota. Separate copies of the package do not automatically share a counter: external submissions must be reconciled; the first version does not promise distributed synchronization.
- `person_id` and `profile_id` are short readable identifiers (lowercase Latin letters, digits and hyphens, for example `ivan-petrov`) because they are folder names; they are chosen once and never changed. `company_id`, `branch_id`, `vacancy_id`, `application_id`, `event_id`, `operation_id`, and `send_attempt_id` are stable UUIDs. A company or application folder name is only a label, not a record key.
- An application links exactly one profile to one specific target. `vacancy_id = null` is allowed for an unsolicited application; such an application must not be presented as a published vacancy.
- Deduplication considers the normalized domain, organization, branch, and history. Different vacancies at one company are stored separately, but a repeat application requires an explicit decision under the profile policy.
- Paths are relative. After canonicalization, reject paths that escape the root, including `..`, absolute paths, and redirecting junctions/symlinks. Folder names must omit Windows characters `<>:"/\\|?*`, trailing dots/spaces, and reserved names; append a short ID to resolve a collision. Do not move an existing folder because its planned date changes.
- Store event timestamps in ISO 8601 UTC, such as `2026-10-07T08:00:00Z`, with a separate `timezone`, such as `Europe/Berlin`. A plan contains both the UTC timestamp and the original local time. Ambiguous or nonexistent times during clock changes require a choice, not a guess.
- `occurred_at` is the actual timestamp from the source; `recorded_at` is when the agent records it. The response month is determined by the former, not the mail-check date. A planned date does not replace the actual submission date.
- Mail deduplication uses `(account_id, gmail_message_id)`. Store `rfc_message_id` and thread_id separately; the same thread_id does not imply the same message. The same `rfc_message_id` with a different `gmail_message_id` is the same message delivered twice: it is recorded once.

## 3. Minimum record fields

| Record | Required semantic fields |
|---|---|
| Fact awaiting confirmation | fact_id, value, source_ref, status proposed/confirmed/rejected, confirmed_at/by, sensitivity, disclosure_allowed |
| Source | source_id, URL or relative path, checked_at, concise verifiable fact, verification level |
| Company/branch | IDs, name, branch city/address, domain, application channels, source_refs; missing contacts are null |
| Vacancy | ID, company_id/branch_id, role, factual requirements, source_refs, checked_at, deadline or null, current validity |
| Route | start_ref, mode, distance_km, travel_minutes, transfers, walk_minutes, evening_return, checked_at, source_ref, verified |
| Application | application_id, profile_id/person_id, target IDs, package_version, relative_path, state, planned_at, sent_at, channel, consent_ref |
| Package | CV/letter/email, languages, relative paths, SHA-256 hashes of files and text, fact_ids, source_refs, qa_checked_at |
| Event | schema_version, event_id, operation_id, profile_id/person_id, application_id, type, occurred_at, recorded_at, source_ref, payload |
| Mail event | account_id, gmail_message_id, rfc_message_id, thread_id, From/To, date, classification, linked_application_id or null |
| Consent | consent_id, scope, mode, account_id, conditions, granted_at, revoked_at or null, association with package_hash for a one-time send |

An unknown value is `null` with a reason/status, not a fabricated string. Do not store passwords, tokens, or complete message bodies in ordinary logs. If the relationship between a message and an application is ambiguous, store an unlinked event; do not choose a company merely because its name looks similar.

## 3a. The knowledge base: the person's life story

The knowledge base is **one Markdown file per person**: `Локальные_данные/persons/<person_id>/База_знаний/Жизнеописание.md`. It holds everything the person has told or documented about themselves, in the person's own language. It is the master source of facts; a CV is only a projection of it for one vacancy. A person can open, read and correct the file in any text editor. At the start of every chat the agent checks whether the file was changed by hand: every changed or new line without a status is treated as `proposed` and shown to the person for confirmation.

The file has a fixed set of sections. The heading is written in the person's language, followed by the section id in braces:

`identity` (name, place, time zone, contact details the person allows) · `goals` · `experience` (one `###` subsection per position) · `education` · `certificates` · `languages` · `skills` · `projects` · `strengths` (real situations: task, action, result) · `conditions` (radius, transport, schedule, start date) · `private_notes` (what must not be shown to an employer).

Every fact is **one line** in this form:

```text
- [F012] Mechanical engineer at Muster GmbH, Stuttgart, 2012–2016; commissioning of packaging lines | source: Zeugnis_Muster.pdf p.2 | status: confirmed 2026-10-07 | use: cv | sens: normal
```

| Part | Meaning |
|---|---|
| `[F012]` | `fact_id`: F plus a running number, never reused |
| text | the fact in the person's language; one fact per line |
| `source:` | a file in `Положите_сюда/` with the place, or `interview 07.10.2026`, or `self-reported` (the person says so, no document) |
| `status:` | `proposed`, `confirmed <date>` or `rejected` (these words are always English so that any agent can read them); a replaced fact reads `rejected (replaced by F031)` |
| `use:` | `cv` (may appear in application documents) or `internal` (only for the agent's understanding) |
| `sens:` | `normal` or `sensitive` (sensitive facts never go into documents without the person's explicit choice) |

Rules: a fact is never deleted; a correction adds a new line and marks the old one `rejected`. Only `confirmed` facts with `use: cv` may be used in a CV or letter. The raw words of the person are kept separately and unchanged in `Положите_сюда/2_Рассказ_о_себе/` (for example `Интервью_<date>.md`). Each change of the file is recorded in the journal as `knowledge_base_updated` (file, section, fact ids).

## 3b. `profile.json`: the settings of one search direction (the first setup)

`profiles/<profile_id>/profile.json` is written by the agent at the end of the first setup (TODO_FOR_AI.md, A7) from the person's answers. Its structure is `examples/settings.example.json`; the example also lists the allowed values (`_allowed_values`). Nothing is asked twice: what the person says once is saved here.

| Group | Fields | Where the value comes from |
|---|---|---|
| Identity | `person_id`, `profile_id`, `timezone` | ids chosen at the first run; the time zone is derived from the place where the person lives |
| Languages | `languages.cv_language`, `cover_letter_language`, `email_language`, `report_language`; `localization.ui_language` | asked: four separate answers; the language of the conversation is the preferred language from A2 |
| What is searched | `search.goal_types` (`job`, `ausbildung`, `internship`, `probearbeit`, `temporary_work`), `roles`, `industries`, `excluded`, `employment_type`, `earliest_start_date` | asked |
| Where and how | `search.start_location` (the place where the person lives, used only for routes), `radius_km`, `transport_modes` (`car`, `train`, `bus_tram`, `bicycle`, `walk`: any combination), `max_travel_minutes`, `max_transfers`, `max_walk_minutes`, `evening_return_required`, `priority_cities` | asked |
| Rhythm | `schedule.prepare_month_at_start`, `schedule.cadence` (`immediate`, `allowed_workdays`, `every_second_allowed_workday`, `every_n_calendar_days`, `every_n_allowed_workdays`, `selected_weekdays`), `interval_days`, ISO weekdays, `local_send_times`, `max_per_run`, `inter_message_delay_minutes`, `daily_check_time`, `holiday_region`, `excluded_dates`, `holidays_verified`, `missed_send_policy` | cadence, batch size, spacing and time asked; default daily check is 16:00 local; holiday region is proposed from the place and verified with a source |
| Mail | `mail.connection_mode` (`approved_connector`, `built_in_browser` or `manual_fallback`; null until selected), account_id, `mail.mode`, thank-you/period-question/replacement rules | the user selects a currently available path; secrets and browser tokens are never stored in the project |
| Safe defaults | `quota` (44 per person per month), `mail.mode` = `draft_only`, `subject_max_unicode_characters` = 50, `thank_you_enabled` = false, `period_question_enabled` = false, `replacement_auto_send_enabled` = false, `privacy.include_sensitive_facts` = false, `report.market_appendix_required` = true, `report.daily_email_enabled` = false | not asked; the person changes them only later and on purpose |
| Consents | `privacy.cloud_processing_consent_ref`, `mail.consent_ref` | the id of the journal line that records the consent (A2, A8) |
| Report | `report.template_relative_path`, `report.daily_email_to` | a user template path or null; daily report recipient is set only with separate consent |

The knowledge base (§3a) belongs to the person and is shared by all profiles of that person; `profile.json` holds only the settings of this search direction. A value that is not yet known stays `null` or an empty list; it is never filled with a guess.

## 3c. The journal: line format, event types, counting

**A journal line** is one JSON object on one line, written compactly (no spaces after `:` and `,`), keys in this order: `schema_version`, `sequence`, `action_id`, `person_id`, `recorded_at`, `events`, `result`. Each event has `event_id`, `type`, `occurred_at` and the fields of its type. `action_id` and `event_id` are UUIDs; `person_id`, `profile_id`, `application_id` and `send_attempt_id` are the readable ids of §2. The first line of a new journal has `sequence` 1. A full example of a send is `examples/journal.example.jsonl`; `examples/quota.example.json` shows the quota view and `examples/workspace.example.json` the workspace file.

**Event types.** Only these names are used; fields in bold are mandatory.

| Type | Fields | Written when |
|---|---|---|
| `person_created` | **display_name**, **timezone** (may be null until the search setup) | the person's folder is created (A2) |
| `consent_granted` / `consent_revoked` | **consent_id**, **scope** (`cloud_processing`, `mail_reading`, `mail_sending_profile`, `send_once`), profile_id, account_id, package_manifest_sha256 (for `send_once`), text_shown | the person says yes / withdraws |
| `story_saved` | **file** | the story is saved (A3) |
| `documents_listed` | **count**, **files** | the documents folder is read (A4); an empty folder gives count 0 |
| `knowledge_base_updated` | **file**, **section**, **fact_ids**, **sha256** (of the file after the agent's write) | after each write to `Жизнеописание.md` |
| `profile_created` / `profile_changed` | **profile_id**, **file**, changed_fields | `profile.json` is written |
| `target_registered` / `target_changed` | **profile_id**, **target_id**, **file**, **source_revision**, changed_fields | a company/vacancy card is added or changed in the registry |
| `route_checked` | **profile_id**, **target_id**, **checked_at**, **mode** (car/public_transport), result, source_url or `route_unverified` | a commute is checked or explicitly left unverified |
| `package_registered` | **application_id**, **package_version**, **relative_path**, **manifest** (list of `{name,size,sha256}`), **recipient**, **recipient_source** (`vacancy_page`, `company_site`, `person_statement`, with URL or date), **channel**, **subject** | a package is saved |
| `package_approved` | **application_id**, **package_version**, **manifest_sha256**, **mode**, consent_id | the person approves this exact package; in `draft_only` it means “checked, the person may send it by hand” |
| `approval_revoked` | **application_id**, **reason** (for example `PACKAGE_CHANGED`) | a file of an approved package differs from its manifest; the application returns to `ready_for_review` |
| `plan_committed` / `plan_changed` / `plan_cancelled` | **profile_id**, **plan_id**, **plan_version**, **file**, changed_fields, affected_attempt_ids | the person approves, changes or cancels the monthly schedule; reservations change in the same action |
| `quota_reserved` | **application_id**, **send_attempt_id**, **reserved_month** | a slot is reserved (together with `send_started`, or when a plan is committed) |
| `send_started` | **application_id**, **send_attempt_id**, **account_id**, **recipient**, **quota_applies** (true for a CV; false for a thank-you or a question), outbox | before the external call |
| `sent_verified` | **application_id**, **send_attempt_id**, **gmail_message_id**, **thread_id**, **recipient**, company, city, role, channel | the message is found in SENT |
| `gmail_scheduled_verified` | **application_id**, **send_attempt_id**, **account_id**, **recipient**, **scheduled_at**, **time_zone**, **subject**, locator or remote id, manifest_sha256 | the exact message is found in Gmail Scheduled; not a sent event |
| `schedule_changed` / `schedule_cancelled` / `schedule_uncertain` | **application_id**, **send_attempt_id**, **evidence**, prior_slot, new_slot | a verified reschedule/cancel or unresolved result is recorded |
| `failed_before_send` / `send_uncertain` | **application_id**, **send_attempt_id**, **evidence** | proven non-send / unknown outcome |
| `quota_consumed` | **application_id**, **send_attempt_id**, **consumed_month**, reservation_closed_month | together with `sent_verified` (also for a submission the person reports from outside: then `source`=`person_reported`) |
| `quota_released` | **application_id**, **send_attempt_id**, **released_month**, reservation_closed_month | together with `failed_before_send` |
| `send_blocked` | **application_id**, **reason_codes** | a requested send was refused by the send check (an allowed check writes nothing by itself; `send_started` follows) |
| `mail_received` | **gmail_message_id** (null only when `source`=`person_reported`), rfc_message_id, thread_id, **classification** (`substantive_response`, `auto_ack`, `delivery_notice`, `advertisement`, `unlinked`), linked_application_id or null, outcome (`positive`, `rejected`, `needs_user`, `ambiguous`), delivery (`permanent_bounce`, `temporary_failure`), source, snippet (at most 200 characters) | a new message is read |
| `mail_checked` | **coverage** (`complete` or `incomplete`), **position** | a mail scan is saved |
| `thank_you_sent` / `period_question_sent` | the fields of `send_started` + `sent_verified`, **reply_to_gmail_message_id** | follow-ups; they never consume quota |
| `replacement_prepared` | **application_id**, **replaces_application_id**, **replacement_chain_id** | after a confirmed bounce |
| `statistics_updated` | **profile_id**, **snapshot_id**, **source_revision**, **file** | `summary.js` is written; the file is written first, then this line (it records a completed action) |
| `backup_created` / `backup_failed` | **snapshot_id** or **operation_id**, **source_revision**, **manifest**, evidence | a local archive is verified or an archive attempt fails |
| `restore_started` / `restore_completed` | **restore_id**, **source_snapshot_ids**, **result**, **missing_items** | recovery runs in a separate copy with external actions disabled |
| `report_built` / `daily_report_sent` | **profile_id**, **period**, **revision**, **files**, recipient and message id for a verified email | a report is created or a permitted user report is found in SENT |
| `status_recorded` | **application_id**, **status** (a code of §4), **status_at**, **source** (`mailbox` or `person_reported`), gmail_message_id (or null); for `meeting_invited` also **meeting_type** and meeting_at | the status of an application changes: after a read reply or a reply the person reports; one line in `Status.txt` follows |
| `company_updated` | **application_id**, **field**, **source**, **checked_at** | a data field in `Company.md` is added or corrected |

Month fields are the **local month of the person** (`person.json`, `timezone`) at `occurred_at` of the event, written as `YYYY-MM` by the agent when it writes the line. This is what makes counting simple and independent of time-zone conversions.

**Counting.** The agent never counts by eye and never converts months of old lines.
- used(M) = number of events with `"consumed_month":"M"`
- reserved(M) = number of `"reserved_month":"M"` minus the number of events (`quota_consumed`, `quota_released`) with `"reservation_closed_month":"M"`
- remaining(M) = limit − used(M) − reserved(M)
These counts are read with the system's own text search (ARCHITECTURE.md §4a), tolerant of spaces around `:`; if there are several matches in one line, every match counts. An uncertain send (`send_uncertain`) stays reserved. `quota.json` (see the example) is rebuilt from these counts whenever it is missing or differs.

**Reason codes** of a refused send: `ACCOUNT_MISMATCH`, `APPROVAL_MISSING` (no `package_approved` event for this version), `PACKAGE_CHANGED`, `MODE_DRAFT_ONLY`, `MODE_NOT_ALLOWED`, `CONSENT_MISSING`, `RECIPIENT_UNSOURCED`, `RECIPIENT_MISMATCH`, `SUBJECT_TOO_LONG`, `QUOTA_EXHAUSTED`, `DAILY_LIMIT`, `CALENDAR_NOT_ALLOWED`, `SEND_UNCERTAIN` (also for a send that was started and has no result), `LOCK_HELD`, `JOURNAL_DAMAGED`, `CAPABILITY_MISSING`.

**Which actions write a line.** Every action that changes a personal file or contacts the outside writes one line (events above), including company/vacancy registration, route checks, plan changes, Gmail scheduling, backup and reports. Read-only actions (resume, inspect, a send check that ends “allowed”, reading mail with nothing new) write nothing; a refused send writes `send_blocked`. A person's statement that something happened outside (“Muster rejected me”) is recorded as `mail_received` with `source` = `person_reported`: the agent asks which application it concerns (it shows the candidates, it never links by similarity of names), when the message arrived, and whether the person can show it; `occurred_at` is the date the person names; the message is matched with the mailbox at the next scan.

**The lock file.** `journal/writer.lock` is one line: `{"run_id":"<UUID>","created_at":"<UTC time>"}`. The agent creates its `run_id` at the start of the chat and writes it into the first line of its session note in `runs/`, so that after a restart it recognizes its own lock. After the person confirms that another chat is no longer working, and before removing a foreign lock, the agent checks: the last line is valid JSON, `sequence` has no gaps, and no `send_started` lacks `sent_verified` / `failed_before_send` (such a send is `send_uncertain`); unfinished outbox folders are reconciled. While a `send_started` has no result, no new send is allowed for that person, by any chat.

**The send card.** Before any send in `approval_per_message` the agent shows: recipient and where its address comes from, subject, the whole body, attachment names, the account, slots used and remaining. The person then answers “send” in a new message. An approval given earlier, before the card, does not count; a refused send records no approval; after the fix the person is asked again. In `scheduled_send_with_profile_consent` the same card is part of the plan that the person accepted.

## 4. Application state and outcome are separate dimensions

```text
discovered → drafting → ready_for_review → approved → scheduled
                                                   ↓
                                 sending → sent_verified
                                     ├─→ send_uncertain
                                     └─→ failed_before_send
```

- `approved` is a `package_approved` event tied to one reviewed package version (its manifest of file names, sizes and checksums) or to an active, limited profile consent. In `draft_only` it means “checked; the person may send it by hand”, never an automatic send. Changing the recipient/text/attachment/material dates returns the application to ready_for_review.
- `sending` is permitted only after checking the account, quota, calendar, and consent. This transition is prohibited in draft_only.
- `sent_verified` requires external evidence of submission. For Gmail, this means a SENT record/ID/recipient/time; for a portal, submission confirmation, not merely clicking a button.
- `send_uncertain`: the service response was lost or the evidence is contradictory. Do not repeat the operation or release the slot after a timeout.
- `failed_before_send`: it is confirmed that no external submission occurred. Only then is the reservation released.
- `overdue`, `paused`, and `cancelled` apply to the queue; they do not turn a prepared application into a sent one. Rescheduling does not change the original actual date.

Separate dimensions:

- Delivery: `unknown / permanent_bounce / temporary_failure` — SENT does not mean delivered.
- Outcome: `no_response / rejected / positive / needs_user / ambiguous`.
- Incoming event: substantive_response, auto_ack, delivery_notice, advertisement, unlinked.
- Actions: thank_you_sent, period_question_sent, and other follow-ups are not application outcomes.

A new substantive message may change the outcome. Previous responses remain in the history; reports must retain second and third responses. A rejection without an explanation is described as “reason not provided”; unclear meaning must not be classified as positive.

### Statuses shown to the person

Every application has exactly one current status. The codes are stored in English; the statistics page shows the label in the chosen language (en, ru or de), so no language is mixed inside one page or one file.

| Code | Meaning | Group in the statistics |
|---|---|---|
| `prepared` | the package is ready, not yet approved or planned | not sent |
| `scheduled` | approved and planned for a date (`planned_at`) | not sent |
| `not_sent` | sending did not happen; the reason is in `Status.txt` | not sent |
| `sent_waiting` | sent, no reply yet; the days without reply are counted from `sent_at` to the snapshot time | waiting |
| `email_not_found` | the address does not exist (a permanent bounce) | address error |
| `documents_requested` | the employer asked for a CV, certificates or other documents | successful |
| `meeting_invited` | an interview was offered; `meeting_type` is `in_person`, `video` or `phone`; `meeting_at` if known | successful |
| `rejected_vacancy_unavailable` | the employer says the vacancy is no longer available | rejected |
| `rejected_cv_mismatch` | the employer says the CV does not fit the vacancy | rejected |
| `rejected_qualification_mismatch` | the employer says the qualifications do not fit | rejected |
| `rejected_no_reason` | a rejection without a stated reason; the agent never guesses one | rejected |

- `thank_you_sent_at` is set when a thank-you was sent to an employer who answered (also after a rejection). The thank-you does not change the status.
- Percentages use every sent application (all groups except “not sent”) as the base.
- A status changes only after the agent has read the whole thread and recorded `status_recorded`. A message whose meaning is unclear keeps the status and goes to the person as `needs_user`.

## 5. The 44-submission quota and send recovery

The limit applies to the managed JobPilot workflow; it is not a Gmail limit. All managed submissions must pass through the same written send check and slot reservation; a send that skips them is outside the authorized workflow. There is no independent quota/send engine, so the limit is procedural and depends on the agent following this contract. The statistics page may detect a missing shared total and show it as unavailable; it must not infer a person's quota from the currently displayed profile rows. Fully automatic sending is off by default and is enabled only for a profile whose user has accepted this limitation and after the sending scenarios of ACCEPTANCE_TESTS.md have been checked in that user's environment. Manual submissions or submissions made from an independent copy are counted only when the user enters or reconciles them; the system does not claim to see actions it does not know about.

The file contract assumes **one writer per person at any moment**. All changes to that person's profiles and quota are written under the same `journal/writer.lock`. Before writing, the agent creates the file with its run_id and the time; if the file already exists and is not its own, it stops and asks the user whether another chat is still working. The lock covers only the short moment of writing; searching, rendering and external calls happen after it is removed. A second chat must not start sending while the lock exists. A lock is not removed because of its age alone: the user first confirms that its owner is no longer working, and unfinished operations are reconciled. The lock is a convention and protects only if every chat follows it.

Actual sending follows this order:

1. Check active consent, exact account/recipient, package_hash, target validity, and time. Assign operation_id/send_attempt_id.
2. Under the lock, reread quota and history. A reservation is consumed/released only by an event. `consumed + reserved <= configured_limit <= 44` (counted as in §3c). A 45th submission is refused at planning and again at the send check; no package is prepared for sending.
3. Record the reservation (or transition a planned reservation to in-flight) and send_started in one transaction; durably persist it **before** calling the external service, then release the lock. Each attempt_id has one executor; a repeated run only reconciles that attempt.
4. Make one external call. Verify success against evidence, then record quota_consumed and sent_verified with linked IDs; update projections.
5. If non-submission is proven, record failed_before_send and quota_released. If the outcome is unknown, keep pending/send_uncertain and block retries.
6. The next session first recovers pending operations by reconciling mail/portal evidence. If the outcome cannot be proven, request a human decision; issuing another send request is prohibited.

There is no promise of exactly-once delivery from Gmail. Checking the journal before sending and evidence-based recovery prevent blind retries but do not create a remote transaction. The protection is procedural: the agent must follow the order above, and the user is told so.

A CV actually sent and subsequently bounced consumes a slot. Preparation/planning does not consume a slot, but active reservations reduce availability. Ordinary replies without a CV do not consume quota; attaching the CV again consumes a new slot. A replacement is a new application with `replaces_application_id` and a shared `replacement_chain_id`; at most one replacement is permitted per chain.

After quota_consumed or quota_released, the corresponding reservation is no longer active; it must not be counted in both used and reserved. A plan may reserve slots for a future month separately, but does not consume the current month's quota. Consent to a sending mode does not waive the remaining-quota check.

At a month boundary, check the actual time and reserve a slot in the new month again before the external call. If an operation remains uncertain across the boundary, block new submissions for that person until its time/outcome is established; do not move the reservation and resend the message. Changing the person's time zone requires recalculating/checking history and does not reset the quota. Limit changes are allowed only downward.

## 6. Writes, recovery, and backups

Write each view file completely: write a temporary file next to the target, read it back to check it, then replace the target. Add a journal line as a whole while holding `writer.lock`. A truncated final line is a failure to be diagnosed: keep the original, stop sending, and recover from the last complete line and the evidence. Duplicate IDs with different content are conflicts. Repeating an `action_id` returns the stored result; if the journal has moved on since the agent read it (a new line was added), the agent rereads it before continuing.

Quota reservations and profile events are written in one journal line. The views are rebuilt from the journal in order of `sequence`. A damaged or incomplete primary history puts the system in preparation mode until reconciliation. The two-journal format of version 1.1 needs an explicit migration into a copy; formats are never mixed automatically.

Create backups with no active writers or as a consistent snapshot. Keep a file/hash manifest; test restoration in a separate folder with sending disabled. A restored copy does not become a second active sender. Importing old archives preserves an old path → application_id mapping, leaves originals unchanged, and does not activate another person's consent.

## 7. Calendar and search

Settings store `timezone`, cadence, interval (when selected), permitted weekdays, `local_send_times`, `max_per_run`, `inter_message_delay_minutes`, excluded dates/weekdays, holiday region, report language and report cutoff. Default daily mail check is 16:00 local. Verify holidays for the selected country/region and year, with a source; an empty list means “not checked yet,” not “there are no holidays.”

**Calendar check at the send check.** An allowed day is a selected weekday that is not in `excluded_dates` or a verified holiday. Use the exact approved local slot(s); do not round by an hour. If `holidays_verified` is false, scheduled sending is refused (`CALENDAR_NOT_ALLOWED`, “holidays not verified”); in `approval_per_message` the person explicitly confirms the date/time after the send card, and the card shows a warning. Multiple sends in one run are separate personalized operations, each with its own approved package and slot. Their count and spacing must match `max_per_run` and `inter_message_delay_minutes`; the monthly limit of 44 remains controlling. A missed slot is not a catch-up batch.

To distribute N applications evenly over D permitted days, allocate floor(N/D) per day and spread the remainder across the month, minimizing differences between daily counts. When N>D, multiple submissions on one day are allowed only as separate personalized operations; show the exact times to the user rather than running a bulk mailing. Planned reservations count toward monthly availability. Do not catch up on missed days without an accepted new plan.

Expanding the radius is an explicit, recorded change to the user's criteria, not a silent addition of distant targets. Search results retain the sources/queries, date, checked area, unique targets found, and exclusion reasons. “Nearby options exhausted” means the checked sample has been exhausted, not proof that no other companies exist.

## 8. Statistics and reports

For month M in the person's time zone:

- `sent_count`: actual CV submissions that occurred in M, not the number of folders/plans.
- `response_event_count`: new substantive incoming messages in M, including responses to older applications. Automatic replies/DSNs are excluded.
- `responded_application_count`: unique applications with such responses; three responses to one application mean 3 events and 1 application.
- `prior_month_response_event_count`: the subset of response_event_count linked to submissions before M.
- `rejected_application_count / positive_application_count`: unique applications with a response in M, classified by the latest substantive outcome at cutoff. A transition from “rejection → invitation” is not counted as two final statuses; the events remain visible.
- `waiting_application_count`: applications sent in M with no substantive response at cutoff and no confirmed permanent delivery failure. This is not the total historical waiting count; show the historical backlog separately.
- `delivery_error_application_count`: unique applications with a new confirmed permanent bounce in M; show these separately, not as employer rejections.
- `quota_used / quota_reserved / quota_remaining`: the person's shared quota, not just the displayed profile's quota. `remaining = limit - used - reserved`.

Two dashboard tables: **submissions this month** and **response events this month**. Their counts must not be added together as one application total. If a report combines both sets, display one row per application with its new events and dates; if there are several new responses, retain all IDs in the manifest. Follow-ups sent without a CV are separate and do not increase sent_count.

Report: `profiles/<profile_id>/reports/<YYYY-MM>/Report_YYYY-MM_r001.docx/.pdf` + `manifest_r001.json`. The manifest contains period/timezone/cutoff/revision/source_revision, application_ids, and response keys. Each response belongs to the month when it was actually received. Regenerating the same month saves new revisions; it is not a new response event. A new response with a different ID to an old application belongs to the new month.

The market section is a separate PDF page and a corresponding DOCX section: occupation, radius, transport, research date, sources, unique companies/vacancies found, targets already used/not yet used within the checked sample, and recommendations. Unknown figures are labeled “estimate unavailable.” State the coverage for every figure; the size of a found sample must not become an exact market-size claim.

## 9. Static HTML contract

`dashboard/profiles/<profile_id>/summary.js` holds the text `window.JP_DATA = ` followed by one JSON object (schema_version `1.4`):

- `snapshot_id` (`<profile_id>-s<N>`), `source_revision` (the journal `sequence` at which the numbers were counted), `generated_at` (UTC), `timezone`, `profile_id`, `default_language` (`en`, `ru` or `de`), `last_mail_check_at` (or null), and `demo` (`true` only for the synthetic sample).
- `quota`: `limit` (44), and `used` and `reserved` per month `YYYY-MM` for the whole person, all profiles together.
- `minutes_per_application`: the estimate of minutes that one application would take by hand in Word: `cv_adapting`, `cover_letter`, `email_text`, `attachments_and_sending`, `date_and_text_checks`, `reply_tracking`. The values come from the person's settings.
- `applications`: `id`, `company`, `city`, `role`, `channel` (`email`, `web_form`, `portal` or `other`), `planned_at`, `sent_at`, `status` (a code of §4), `status_at`, `meeting_type`, `meeting_at`, `thank_you_sent_at`, `note` (the text as recorded; it is never translated). Unknown values are `null` and are shown as a dash.

The page reads only this file and shows: the shares of successful, waiting, rejected and address-error applications; the reasons for rejection; the monthly limit; the time saved (sent applications × minutes per application, labelled as an estimate with its assumptions); the years, months and days as nested blocks; sorting by date or by result; filters by year, month, result group and text; the days without reply, counted from `sent_at` to `generated_at`; and a freshness marker that warns when the snapshot is two or more days old. The page has three interface languages (en, ru, de), makes no network request, reads no mail and writes nothing.

The agent writes the file as a whole (a temporary file, a read-back check, then replacement). The page file itself is an unchanged copy of the template. An invalid file shows the reason in a message instead of a half-filled page.

The sample in the repository is synthetic. The button “Clear sample data” removes it for the browser in use only; it is shown only when `demo` is `true`. A real snapshot has `demo: false` and is never cleared by the page.

## 10. Readiness boundary

The agent-maintained readiness page is a static view generated from verified setup state. Keep system readiness separate from person/profile document readiness. Each item records applicability, status, evidence time, next action and safe relative link. Compute percentage only from applicable required items; do not mark complete because a path merely exists. The page is read-only, contains no personal documents itself and does not send mail or edit the journal. Validate links stay within the person's permitted folder. Local links do not work remotely on a phone; email reports must include only the approved snapshot and not expose the local path as a usable remote link.

This contract describes files and procedures; it is not a technical protection of locks, the journal, the quota or Gmail. Before sending for real, pass the scenarios of ACCEPTANCE_TESTS.md by hand using synthetic data, separately confirm the mail tool, and check recovery. A rule that only the agent follows is described as a procedure, never as technical protection.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com · [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
