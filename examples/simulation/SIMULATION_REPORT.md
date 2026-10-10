# Simulation report — model run of the rules

**EXAMPLE ONLY: all people, companies, addresses and messages here are made up. Nothing was sent. No real Gmail, Codex or Claude account was used.**

## What this is

The written rules (`DATA_CONTRACT.md`, `ARCHITECTURE.md`, `TODO_FOR_AI.md`) were implemented as an executable model by the tester (a throw-away audit tool, not part of the package: the package contains no scripts). The model has a simulated mailbox and follows the rules step by step: journal append with read-back, writer lock by exclusive create, send check with reason codes, the order of an external action, reconciliation against SENT, reading mail page by page, classification, saving every reply in full into `Replies.txt`, statuses and the quota counts.

It shows that the rules are consistent and can be followed. It is **not** a run by an AI agent in a chat and **not** a test of Gmail, so it changes no acceptance status (see `ACCEPTANCE_TESTS.md`).

## The main scenario: five applications

| Application | What happened | Result |
|---|---|---|
| Alpha | sent, then an invitation with an attachment and a different Reply-To | status `meeting_invited`, outcome `needs_user`, reply saved in full |
| Beta | sent, then a rejection without a reason | `rejected_no_reason`; one thank-you under the follow-up consent; no quota used |
| Gamma | sent, then only an automatic receipt confirmation | stays `sent_waiting` |
| Delta | sent, then a delivery failure (address does not exist) | `email_not_found`; the slot stays used; a replacement is only a draft |
| Epsilon | the mail page failed after the click and nothing reached SENT | `failed_before_send`, the slot is released |

Quota after the scenario: used 4, reserved 0, remaining 40. The files produced are in `examples/simulation/`: the journal (`journal-2026-10.sample.jsonl`), the quota view, and for each application `Company.md`, `Status.txt` and `Replies.txt`.

## All checks

| ID | Check | Expected | Result |
|---|---|---|---|
| S1-01 | four applications sent and verified in SENT | 4 x sent_verified | PASS |
| S1-02 | mail error: page fails after click, nothing in SENT | failed_before_send, slot released | PASS |
| S1-03 | quota after 4 sent + 1 proven failure | used 4, reserved 0, remaining 40 | PASS |
| S1-04 | all pages read, scan complete | pages=2 (5 messages, 3 per page), complete | PASS |
| S1-05 | statuses after the reply scan | A meeting_invited, B rejected_no_reason, C sent_waiting, D email_not_found | PASS |
| S1-06 | Replies.txt holds sender, IP, headers, time with zone, full text, attachment | all fields present | PASS |
| S1-07 | missing header is stated, not guessed | Sending IP: not provided by the mail tool | PASS |
| S1-08 | second scan adds no duplicate block and no duplicate event | 0 new; one block per message | PASS |
| S1-09 | mail_received carries file path and checksums; newsletter stays unlinked/advertisement | replies_file+sha256 on linked; none on advertisement | PASS |
| S1-10 | meeting invitation and document request go to the person | needs_user, no automatic answer | PASS |
| S1-11 | thank-you after rejection: own event, no quota | thank_you_sent, used stays 4 | PASS |
| S1-12 | second thank-you to the same message is blocked | DUPLICATE_KEY | PASS |
| S1-13 | bounce: slot stays used, replacement is only a draft | used 4, replacement not approved | PASS |
| S1-14 | journal audit: unbroken sequence, unique ids | sequence 1..N | PASS |
| S1-15 | quota view rebuilt from journal equals structured and text-search counts | source_revision == last sequence | PASS |
| S1-16 | report numbers: shares over all sent applications | 4 sent: 25% each | PASS |
| S2-01 | response lost but message is in SENT: found by reconciliation, not repeated | sent_verified, gmail calls = 1, used 1 | PASS |
| S2-02 | SENT unreadable: send_uncertain, reservation stays | send_uncertain, reserved 1 | PASS |
| S2-03 | an uncertain send blocks every new send for the person | SEND_UNCERTAIN, no new call | PASS |
| S2-04 | after proof of absence the slot is released and sending is possible again | failed_before_send, reserved 0 | PASS |
| S3-01 | chat dies after the intent line, before the call | intent open, no mail sent | PASS |
| S3-02 | new chat reconciles the open intent first: proven absent | failed_before_send, no new call | PASS |
| S3-03 | crash after the call: message found in SENT, recorded once, no second call | sent_verified, used 1, calls = 1 | PASS |
| S3-04 | hard gate: the intent line cannot be written | no external call, lock kept | PASS |
| S3-05 | two chats: the second cannot take the lock | LOCK_HELD, nothing written | PASS |
| S3-06 | half-written last line | stop with JOURNAL_DAMAGED, file kept | PASS |
| S4-01 | two consecutive CV submissions to the same address | RECIPIENT_CONSECUTIVE | PASS |
| S4-02 | different address after that is allowed | sent_verified | PASS |
| S4-03 | daily cap 2: the third CV of the day is refused | DAILY_LIMIT | PASS |
| S4-04 | next local day it can go | sent_verified | PASS |
| S4-05 | not approved | APPROVAL_MISSING | PASS |
| S4-06 | attachment changed after approval | PACKAGE_CHANGED | PASS |
| S4-07 | subject over 50 characters | SUBJECT_TOO_LONG | PASS |
| S4-08 | address only from a catalogue | RECIPIENT_UNSOURCED | PASS |
| S4-09 | mail tool signed in to another account | ACCOUNT_MISMATCH | PASS |
| S4-10 | draft_only profile | MODE_DRAFT_ONLY | PASS |
| S4-11 | thank-you without a follow_up consent | CONSENT_MISSING | PASS |
| S4-12 | every refusal is recorded as send_blocked | >= 8 lines | PASS |
| S5-01 | the 44th submission is allowed | sent_verified, used 44 | PASS |
| S5-02 | the 45th is refused before any reservation | QUOTA_EXHAUSTED | PASS |
| S6-01 | line recorded 2026-11-30T23:30Z belongs to December (Europe/Berlin) | transactions-2026-12.jsonl | PASS |
| S6-02 | the 501st line opens part 2, sequence continues, audit clean | -p2 segment, sequence 501 | PASS |
| S6-03 | scan stops while a next token is still returned | coverage incomplete, never 'no changes' | PASS |
| S7-01 | request for documents mixed with commands aimed at the agent | needs_user, documents_requested, not advertisement, nothing sent | PASS |
| S7-02 | legitimate part and the whole text are kept in Replies.txt | body verbatim | PASS |
| S7-03 | same rfc_message_id under another gmail id is the same message | recorded once | PASS |

## What the model run found in the rules

Two inconsistencies, both fixed in version 1.17.1 in all four editions:

1. `TODO_FOR_AI.md` said a refused send is recorded as `send_blocked` “if the person asked for it”, while `DATA_CONTRACT.md` says a refused send always writes it. The playbook now follows the contract.
2. The line `send_started` of a thank-you or an ordinary reply did not carry the incoming message id, so an interrupted attempt could not be matched to its repeat key. It now carries `reply_to_gmail_message_id`.

Points the rules leave open (decided in the model as written below; to be confirmed by the owner):

- After `failed_before_send`, a new attempt for the same package version is allowed (the model does not treat the proven-failed attempt as a used repeat key).
- A `failed_before_send` attempt does not count as “the last managed CV recipient” for `RECIPIENT_CONSECUTIVE`.
- A failed attempt does count towards the daily cap (`DAILY_LIMIT`), as `TODO_FOR_AI.md` says; with a daily cap of 1, a failed send blocks a retry on the same local day.

## What this does not show

Gmail itself (reading, SENT and Scheduled proof, attachments), the behaviour of a real AI agent, Word rendering, real employers' mail, and scheduled runs. These are listed in `REMAINING_WORK.md`.
