# HomenS.AI JobPilot — Data Contract 1.2

[English](DATA_CONTRACT.md) | [Русский](docs/ru/DATA_CONTRACT.md)

A design contract for an independently developed implementation. **The mechanisms described here have not been implemented yet.** Supplements AI_BUILD_SPEC.md; module boundaries are described in [ARCHITECTURE.md](ARCHITECTURE.md). This document does not authorize sending email.

Author: Serhii Khomenko / HomenS.AI · https://homensai.com/ · documentation: CC BY-NC 4.0.

## 1. File-based database and source of truth

The first version uses UTF-8 JSON for configuration and records, and JSONL for events. No SQL, servers, or external libraries. Every record has a `schema_version`; incompatible versions must not be rewritten automatically.

| Path relative to the root | Role |
|---|---|
| `Локальные_данные/persons/<person_id>/state/person.json` | Projection of the person's identity, quota time zone, and permitted profile_id values |
| `Локальные_данные/persons/<person_id>/journal/transactions.jsonl` | The only primary journal: applications, profiles, messages, consent, and the shared quota |
| `Локальные_данные/persons/<person_id>/journal/writer.lock` | One writer per person; not an authorization mechanism |
| `Локальные_данные/persons/<person_id>/state/quota.json` | Rebuildable projection of consumed and reserved slots |
| `Локальные_данные/profiles/<profile_id>/profile.json` | Projection of confirmed objectives, facts, account, languages, and consent |
| `Локальные_данные/profiles/<profile_id>/registry.json` | Rebuildable projection of companies, vacancies, applications, and the queue |
| Application directories: `firm.json`, `vacancy.json`, `schedule.json` | Readable projections of linked records; not independent sources of status |
| Application directories: `inf.txt` | Append-only, human-readable journal with event_id; existing text must not be rewritten |
| `profiles/<profile_id>/reports/<YYYY-MM>/` | Reports, manifests, and revisions for this profile only |
| `dashboard/profiles/<profile_id>/summary.json` and `index.html` | Snapshot of the selected profile; dashboard/index.html is the local menu |

New events are first durably recorded in the journal, then projections are updated. Changing a projection without an event is prohibited. Correcting a fact or classification requires a new event with `supersedes_event_id`, not an edit to the past. Rebuilding a projection must not duplicate inf.txt lines: check event_id and the mail dedup_key.

A failure between committing a transaction and updating registry/inf.txt is resolved by rebuilding projections. Quota and application changes belong to one primary journal record, not two independent journals. Each complete line is a transaction containing sequence, command_id, request_hash, previous_record_hash, events, and record_hash. The exact write and validation order is defined in ARCHITECTURE.md §4. Artifacts are saved as immutable versions first, then registered in the journal by reference and hash.

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

The limit applies to the managed JobPilot workflow; it is not a Gmail limit. All managed submissions must pass through one verifiable preflight/reservation mechanism; a direct send that bypasses it is outside the authorized workflow. A prompt alone cannot enforce a technical restriction: do not enable operational automatic sending before the shared mechanism is implemented and tested. Manual submissions or submissions from an independent copy can be counted only when the user enters/reconciles them; the product does not claim to observe actions it does not know about.

The file contract assumes **one writer per person at any moment**. All changes to that person's profiles and quota acquire the same journal/writer.lock. Create the lock exclusively (`CreateNew` or equivalent), not by checking “file absent → write.” Store the owner/run_id and timestamp in the lock. It protects only a short local transaction; search, rendering, and external calls occur after release. A concurrent agent must not start sending while the lock is held. Do not delete a stale lock based on age alone: first establish that its owner is absent and reconcile pending operations.

Actual sending follows this order:

1. Check active consent, exact account/recipient, package_hash, target validity, and time. Assign operation_id/send_attempt_id.
2. Under the lock, reread quota and history. A reservation is consumed/released only by an event. `consumed + reserved <= configured_limit <= 44`.
3. Record the reservation (or transition a planned reservation to in-flight) and send_started in one transaction; durably persist it **before** calling the external service, then release the lock. Each attempt_id has one executor; a repeated run only reconciles that attempt.
4. Make one external call. Verify success against evidence, then record quota_consumed and sent_verified with linked IDs; update projections.
5. If non-submission is proven, record failed_before_send and quota_released. If the outcome is unknown, keep pending/send_uncertain and block retries.
6. The next session first recovers pending operations by reconciling mail/portal evidence. If the outcome cannot be proven, request a human decision; issuing another send request is prohibited.

There is no promise of exactly-once delivery from Gmail. Local journal idempotency and evidence-based recovery prevent blind retries, but do not create a remote transaction. Independently implemented, verifiable tools must handle this, not just a prompt.

A CV actually sent and subsequently bounced consumes a slot. Preparation/planning does not consume a slot, but active reservations reduce availability. Ordinary replies without a CV do not consume quota; attaching the CV again consumes a new slot. A replacement is a new application with `replaces_application_id` and a shared `replacement_chain_id`; at most one replacement is permitted per chain.

After quota_consumed or quota_released, the corresponding reservation is no longer active; it must not be counted in both used and reserved. A plan may reserve slots for a future month separately, but does not consume the current month's quota. Consent to a sending mode does not waive the remaining-quota check.

At a month boundary, check the actual time and reserve a slot in the new month again before the external call. If an operation remains uncertain across the boundary, block new submissions for that person until its time/outcome is established; do not move the reservation and resend the message. Changing the person's time zone requires recalculating/checking history and does not reset the quota. Limit changes are allowed only downward.

## 6. Writes, recovery, and backups

Save JSON projections to a temporary sibling file, validate them by reading, then atomically rename/replace within the same directory. Append JSONL as a complete transaction line under the lock with flush/fsync. A truncated final line is a diagnosable failure: preserve the original, stop sending, and recover from the last complete record/evidence. Duplicate IDs with different content are conflicts. Repeating command_id with the same request returns the stored result; a new command with a stale expected_revision receives REVISION_CONFLICT.

Shared quota reservations and profile events are committed in one transaction. Rebuild projection state from the journal sequence; after diagnosis, discard a damaged checkpoint and rebuild from the journal. Damaged/incomplete primary history puts the system in preparation mode until reconciliation. Version 1.1's two-journal format requires explicit migration into a copy; do not mix formats automatically.

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

`dashboard/profiles/<profile_id>/summary.json` contains schema_version, source_revision, generated_at, last_mail_check_at, timezone, profile_id, person quota, and table rows. Every row contains only permitted statistical fields; no message bodies, home address, original CVs, or secrets. Pages for different profiles do not mix data; dashboard/index.html is a local menu of links. One reporting calculation from a fixed sequence feeds HTML, DOCX, and PDF.

HTML contains the same snapshot_id/source_revision as summary.json. Generate both files from one snapshot; if a failure occurs between replacements, compare IDs and rebuild the pair. An old file cannot know about a later failure: it can show only its last update and an age-based warning. Do not promise that it will detect a missed check without an agent run.

Display values from vacancies/messages using textContent, not innerHTML. When embedding JSON in a script block, escape `<`, `>`, and `&` (in particular `</script>`); do not use eval. Allow links only with a validated protocol and path root. Make no network requests; external sources open only after an explicit user click. Sorting compares ISO/epoch dates, not DD.MM.YYYY strings. Provide keyboard support, element labels, table headers, empty states, printing, and a freshness marker.

## 10. Readiness boundary

This contract is not an implementation of locks, the journal, quota, or Gmail. Before operational sending, pass ACCEPTANCE_TESTS.md using synthetic data, separately confirm the mail tool, and verify recovery. Policies that are not technically enforced must be shown as “not implemented,” not as active protection.
