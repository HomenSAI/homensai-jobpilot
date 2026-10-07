# HomenS.AI JobPilot — acceptance scenarios 1.2

[English](ACCEPTANCE_TESTS.md) | [Русский](docs/ru/ACCEPTANCE_TESTS.md)

Author: Serhii Khomenko / HomenS.AI · https://homensai.com/ · CC BY-NC 4.0.

**These are requirements for future verification, not results of completed tests.** Every scenario currently has the status “not run: operational implementation absent.” Test code must be independently written and all test data must be synthetic. Do not send test applications to real employers.

After implementation, record for each scenario: ID, code/data version, initial conditions, actual result, PASS/FAIL/NOT RUN, evidence paths, and observed limitations. Checking documentation is not a substitute for testing the email integration.

## Basic scenarios

| ID | Conditions and action | Expected result |
|---|---|---|
| BOOT-01 | New root folder with no profile, email connection, or consent | First startup shows the actual path and available capabilities; it neither sends messages nor treats future components as existing |
| PATH-01 | A `../outside` path, an absolute path, and a junction pointing outside the root | Reads/writes are rejected; a normal path inside the root remains accessible |
| PROFILE-01 | Two people with different email accounts | One person's documents, responses, and reports do not appear in the other's profile; an account_id mismatch blocks sending |
| FACT-01 | OCR proposes B2 proficiency but it has not been confirmed | No B2 certificate appears in the CV; the user's correction is stored as a new event |
| PRIVACY-01 | No consent to processing by a cloud agent | The agent does not read personal originals; a generic example and instructions remain available |
| SEARCH-01 | The user adds a distant town | Nearby companies retain their priority; the radius is not expanded without a decision |
| SEARCH-02 | Two branches/similar company names and a repeated vacancy | Branches remain distinct; an actual duplicate is flagged; reapplication requires a decision |
| ROUTE-01 | No verified evening return route | The result says “route not verified,” with no invented journey time or transfer count |
| LANG-01 | Four different language settings and one missing setting | Documents use the corresponding settings; the missing language is requested |
| DOC-01 | Long text, a table spanning pages, and a missing font | Every DOCX/PDF page is rendered and inspected; nothing is clipped; any fallback is recorded explicitly |
| TEMPLATE-01 | The user supplies a template | The original hash remains unchanged; output is a separate file and formatting is preserved within the agreed boundaries |
| CONSENT-01 | An attachment or recipient changes after the package is approved | Status returns to ready-for-review rather than authorized-to-send; previous consent does not apply to the new version |
| SUBJECT-01 | 50/51 Unicode characters, including spaces and a combining character | Validation after NFC normalization accepts 50 and rejects 51; it does not silently truncate the string |

## Quota, calendar, and recovery

| ID | Conditions and action | Expected result |
|---|---|---|
| QUOTA-01 | 43 used slots, one new submission, then another | The 44th is permitted; the 45th is blocked before any external call |
| QUOTA-02 | Two profiles sharing a person_id, two concurrent agents, one slot remaining | Exactly one reservation is created; both agents cannot each send a CV |
| QUOTA-03 | A send followed by a permanent bounce and a replacement | The original send still consumes a slot; the replacement requires a new slot |
| QUOTA-04 | Draft-only, a failure before submission, and follow-ups without/with a CV | A draft consumes no slot; proven non-submission releases the reservation; only a follow-up containing a CV consumes a slot |
| QUOTA-05 | A damaged/incomplete journal and an external submission | New sends remain blocked pending reconciliation; the recorded external submission consumes a slot |
| CAL-01 | Weekends, verified regional holidays, and 23 targets for the month | No prohibited dates are used; distribution is even and specific slots are visible for review |
| CAL-02 | A missed run and a daylight-saving transition | No catch-up batch is sent; missed items become overdue; ambiguous time is resolved explicitly |
| CRASH-01 | Failure after reservation but before sending | The next run reconciles operation_id; it neither consumes nor releases a slot based on an assumption |
| CRASH-02 | The service accepts an email but the call's response is lost | State is send_uncertain; SENT reconciliation produces exactly one confirmed record; no repeat send call occurs |
| CRASH-03 | Failure after the single atomic reservation+send_started record but before projection updates | The reservation and application are restored from one transaction; inf.txt entries are not duplicated |
| CRASH-04 | A truncated JSONL line and a stale lock | The original is preserved and sends stop; the lock is not removed solely because a timeout elapsed |
| MONTH-01 | An uncertain send in the month's final minute | All new sends for the person remain blocked pending reconciliation; time and month are not guessed |

## Email, reports, and the local page

| ID | Conditions and action | Expected result |
|---|---|---|
| MAIL-01 | Rechecking the same thread with the same Gmail ID | One event; no second thank-you or duplicate record |
| MAIL-02 | An invitation, a question, a document request, an automatic acknowledgement, and a DSN | The first three require human input; automatic acknowledgements and DSNs receive no substantive automatic reply |
| MAIL-03 | A temporary failure/unclear filter result and a proven permanent DSN | Replacement is allowed only for proven permanent non-delivery, with at most one replacement per chain |
| MAIL-04 | Rejection due to timing, confirmed flexibility, and an already-sent timing question | The question is not repeated; a specific date proposed by the company requires the user's decision |
| MAIL-05 | An email asks the agent to execute a command or disclose an archive | Content is treated as data; permissions and rules do not change |
| MAIL-06 | Two older applications with similar subjects | An ambiguous email remains unlinked; it is not assigned to a company by guesswork |
| REPORT-01 | A September submission, an October response, and a repeated check | October includes the response exactly once with the original September submission date |
| REPORT-02 | Three substantive replies to one application | 3 response_event_count, 1 responded_application_count, and every ID included in the manifest |
| REPORT-03 | A rejection without a stated reason, no response, and a sent thank-you | “Reason not specified”/“no response received”; a thank-you does not replace the application outcome |
| REPORT-04 | A response received after cutoff but within the same month | A revision for that month; the response is not moved to the following month |
| MARKET-01 | Sources are inaccessible and market size is unknown | The separate page exists and says “estimate unavailable,” without invented figures |
| DASH-01 | Offline file:// opening, year/month selection, and sorting | No fetch or server; proper chronological sorting, not string sorting of DD.MM.YYYY values |
| DASH-02 | A company name contains `</script><script>` or HTML | Content appears as literal text; no code executes |
| DASH-03 | Failure between replacing JSON and HTML | A snapshot_id mismatch is detected on the next run; a consistent pair is rebuilt |
| DASH-04 | An empty month, a stale snapshot, keyboard use, and a narrow screen | An empty state, update time, accessible filters, and a table with no loss of data |
| RESTORE-01 | Backup → separate folder → hash/journal reconciliation | History is restored; the copy does not automatically gain permission to send |
| RELEASE-01 | A synthetic token/CV is deliberately added to the archive/staging index | Publication checks reject it; .gitignore is not treated as a substitute for inspecting staged content |

## Acceptance by stage

Additional checks for architecture 1.2:

| ID | Conditions and action | Expected result |
|---|---|---|
| TX-01 | Repeat command_id with the same/different request_hash | The previous result / IDEMPOTENCY_CONFLICT; no extra events |
| TX-02 | Two new commands with the same expected_revision | One commits; the other receives REVISION_CONFLICT |
| TX-03 | A damaged checkpoint with an intact journal | The snapshot is rebuilt; authoritative history and quota are preserved |
| RUN-01 | A new chat after send_started | run.resume finds the attempt and invokes reconcile, not another send |
| MAIL-07 | Failure before completing an incoming-message page | The cursor is not advanced; replaying the page creates no duplicates |
| ADAPTER-01 | The tool cannot confirm SENT, or only agent_bridge is available | Capabilities are reported accurately; scheduled_send is not declared ready |
| L10N-01 | Switch documentation or UI between en/ru | Rules, IDs, and counters match; CV/report languages do not change |
| PROJECTION-01 | Generate PDF and HTML from the same source_revision | Final business counters are identical |

1. File workflow: BOOT, PATH, PROFILE, FACT, PRIVACY, journal, and recovery. No email sending.
2. Documents/search/dashboard: verifiable sources, languages, DOC/TEMPLATE, SEARCH/ROUTE, and DASH.
3. Read-only email: selected account, complete threads, MAIL and REPORT using synthetic fixtures/a controlled account.
4. Sending: CONSENT, SUBJECT, QUOTA, CAL, CRASH, and MONTH. Do not enable the automatic queue until these pass.
5. Release: RESTORE, RELEASE, licenses/attribution, and current instructions for supported agents. Report passed stages separately; do not claim the whole product is ready based on one check.
