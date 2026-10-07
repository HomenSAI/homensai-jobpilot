# HomenS.AI JobPilot — Data Contract 1.3

[English](DATA_CONTRACT.md) | [Русский](docs/ru/DATA_CONTRACT.md)

A contract for the files and procedures that the AI agent follows. **There is no program: nothing described here is enforced technically.** The agent keeps to it, and the user checks it with the acceptance scenarios. Supplements AI_BUILD_SPEC.md; the parts of the system are described in [ARCHITECTURE.md](ARCHITECTURE.md). This document does not authorize sending email.

Author: Serhii Khomenko / HomenS.AI · https://homensai.com/ · documentation: CC BY-NC 4.0.

## 1. File-based database and source of truth

The first version uses UTF-8 JSON for configuration and records, and JSONL for events. No SQL, servers, scripts or external libraries. Every record has a `schema_version`; incompatible versions must not be rewritten automatically.

| Path relative to the root | Role |
|---|---|
| `Локальные_данные/persons/<person_id>/state/person.json` | Projection of the person's identity, quota time zone, and permitted profile_id values |
| `Локальные_данные/persons/<person_id>/journal/transactions.jsonl` | The only primary journal: applications, profiles, messages, consent, and the shared quota |
| `Локальные_данные/persons/<person_id>/journal/writer.lock` | A marker file that exists only while one chat is writing; a convention, not an authorization mechanism |
| `Локальные_данные/persons/<person_id>/state/quota.json` | Rebuildable projection of consumed and reserved slots |
| `Локальные_данные/profiles/<profile_id>/profile.json` | Projection of confirmed objectives, facts, account, languages, and consent |
| `Локальные_данные/profiles/<profile_id>/registry.json` | Rebuildable projection of companies, vacancies, applications, and the queue |
| Application directories: `firm.json`, `vacancy.json`, `schedule.json` | Readable projections of linked records; not independent sources of status |
| Application directories: `inf.txt` | Append-only, human-readable journal with event_id; existing text must not be rewritten |
| `profiles/<profile_id>/reports/<YYYY-MM>/` | Reports, manifests, and revisions for this profile only |
| `dashboard/profiles/<profile_id>/summary.js` and `index.html` | The data file of the selected profile and an unchanged copy of the page template; dashboard/index.html is the local menu |

New events are first durably recorded in the journal, then projections are updated. Changing a projection without an event is prohibited. Correcting a fact or classification requires a new event with `supersedes_event_id`, not an edit to the past. Rebuilding a projection must not duplicate inf.txt lines: check event_id and the mail dedup_key.

A failure between writing a journal line and updating registry/inf.txt is resolved by rebuilding the views from the journal. Quota and application changes belong to one primary journal line, not to two independent journals. Each complete line is one completed action containing `sequence`, `action_id`, `events` and a short `result`. The write and check order is defined in ARCHITECTURE.md §4. Artifacts are saved as immutable versions first, then registered in the journal by reference (file names, sizes and, where available, a checksum).

## 2. Identifiers, paths, and time

- `person_id` is immutable for one person. Multiple profiles/accounts belonging to that person share one quota. Separate copies of the package do not automatically share a counter: external submissions must be reconciled; the first version does not promise distributed synchronization.
- `profile_id`, `company_id`, `branch_id`, `vacancy_id`, `application_id`, `event_id`, `operation_id`, and `send_attempt_id` are stable UUIDs. A folder name is only a label, not a record key.
- An application links exactly one profile to one specific target. `vacancy_id = null` is allowed for an unsolicited application; such an application must not be presented as a published vacancy.
- Deduplication considers the normalized domain, organization, branch, and history. Different vacancies at one company are stored separately, but a repeat application requires an explicit decision under the profile policy.
- Paths are relative. After canonicalization, reject paths that escape the root, including `..`, absolute paths, and redirecting junctions/symlinks. Folder names must omit Windows characters `<>:"/\\|?*`, trailing dots/spaces, and reserved names; append a short ID to resolve a collision. Do not move an existing folder because its planned date changes.
- Store event timestamps in ISO 8601 UTC, such as `2026-10-07T08:00:00Z`, with a separate `timezone`, such as `Europe/Berlin`. A plan contains both the UTC timestamp and the original local time. Ambiguous or nonexistent times during clock changes require a choice, not a guess.
- `occurred_at` is the actual timestamp from the source; `recorded_at` is when the agent records it. The response month is determined by the former, not the mail-check date. A planned date does not replace the actual submission date.
- Mail deduplication uses `(account_id, gmail_message_id)`. Store `rfc_message_id` and thread_id separately; the same thread_id does not imply the same message.

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

## 4. Application state and outcome are separate dimensions

```text
discovered → drafting → ready_for_review → approved → scheduled
                                                   ↓
                                 sending → sent_verified
                                     ├─→ send_uncertain
                                     └─→ failed_before_send
```

- `approved` is tied to a reviewed package version or active, limited profile consent. Changing the recipient/text/attachment/material dates returns the application to ready_for_review.
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

## 5. The 44-submission quota and send recovery

The limit applies to the managed JobPilot workflow; it is not a Gmail limit. All managed submissions must pass through the same written send check and slot reservation; a send that skips them is outside the authorized workflow. Because there is no program, a technical restriction cannot be enforced: the limit is kept by the agent following this procedure. Fully automatic sending is therefore off by default and is switched on only for a profile whose user has accepted this limitation and after the sending scenarios of ACCEPTANCE_TESTS.md have been checked in that user's environment. Manual submissions or submissions made from an independent copy are counted only when the user enters or reconciles them; the system does not claim to see actions it does not know about.

The file contract assumes **one writer per person at any moment**. All changes to that person's profiles and quota are written under the same `journal/writer.lock`. Before writing, the agent creates the file with its run_id and the time; if the file already exists and is not its own, it stops and asks the user whether another chat is still working. The lock covers only the short moment of writing; searching, rendering and external calls happen after it is removed. A second chat must not start sending while the lock exists. A lock is not removed because of its age alone: the user first confirms that its owner is no longer working, and unfinished operations are reconciled. The lock is a convention and protects only if every chat follows it.

Actual sending follows this order:

1. Check active consent, exact account/recipient, package_hash, target validity, and time. Assign operation_id/send_attempt_id.
2. Under the lock, reread quota and history. A reservation is consumed/released only by an event. `consumed + reserved <= configured_limit <= 44`.
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

Settings store `timezone`, local_send_time, cadence, excluded_weekdays, holiday_region/excluded_dates, and report_cutoff_time. Verify holidays for the selected country/region and year, with a source; an empty list means “not checked yet,” not “there are no holidays.”

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

`dashboard/profiles/<profile_id>/summary.js` (the text `window.JP_DATA = ` followed by one JSON object) contains schema_version, source_revision, generated_at, last_mail_check_at, timezone, profile_id, person quota, and table rows. Every row contains only permitted statistical fields; no message bodies, home address, original CVs, or secrets. The statistics page (`dashboard_template/index.html`) reads two lists: `applications` (id, company, city, role, channel, `sent_at`, `outcome`, optional `bounce_at`) and `responses` (id, `application_id`, `received_at`, `kind`, note), plus `quota` (limit, reserved slots per month). `outcome` and `kind` use the values `positive`, `rejected`, `no_response`, `needs_user` and `delivery_error`. The page shows them as successful, unsuccessful, waiting, needs your decision and delivery error. Pages for different profiles do not mix data; dashboard/index.html is a local menu of links. One reporting calculation from a fixed sequence feeds HTML, DOCX, and PDF.

`summary.js` contains the same `snapshot_id` and `source_revision` as the reports of that snapshot. The agent writes the file as a whole (a temporary file, a check that it reads back as valid, then replacement); the page file `index.html` is a copy of the template and is not edited. If `summary.js` is missing or damaged, the page says so. An old file cannot know about a later failed check: it can show only its last update and an age-based warning. Do not promise that it will detect a missed check without an agent run.

Display values from vacancies/messages using textContent, not innerHTML. When embedding JSON in a script block, escape `<`, `>`, and `&` (in particular `</script>`); do not use eval. Allow links only with a validated protocol and path root. Make no network requests; external sources open only after an explicit user click. Sorting compares ISO/epoch dates, not DD.MM.YYYY strings. The page groups rows by year, month and day in the snapshot's time zone, sorts by date or by result (successful first or unsuccessful first), and filters by year, month, result and text. Provide keyboard support, element labels, table headers, empty states, printing, and a freshness marker.

## 10. Readiness boundary

This contract describes files and procedures; it is not a technical protection of locks, the journal, the quota or Gmail. Before sending for real, pass the scenarios of ACCEPTANCE_TESTS.md by hand using synthetic data, separately confirm the mail tool, and check recovery. A rule that only the agent follows is described as a procedure, never as technical protection.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com · [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
