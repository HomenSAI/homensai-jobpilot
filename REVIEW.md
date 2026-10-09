# HomenS.AI JobPilot — review and status

[English](REVIEW.md) | [Русский](docs/ru/REVIEW.md)

9 October 2026 · Version 1.5.1 · Author of the idea and developer: Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · CC BY-NC 4.0

## Where the project stands

**In this release:** bilingual operating procedures; updated README, author story and separate code/documentation license notices; expanded journal and schedule contracts; and fixes to the statistics snapshot validation, historical counters, empty-month selector, shared quota display and result ordering.

**Verified in this work copy:** 18 targeted statistics-page VM checks passed, including malformed snapshots, duplicate response IDs, late replies, empty-month selection, missing shared quota totals and technical-error sorting. This is not a full browser test or an agent/Gmail acceptance cycle.

**Not done yet:** full manual acceptance of the agent workflow; real Codex or Claude Code onboarding; real Gmail scheduled-send and reply processing; DOCX rendering through Word/LibreOffice; the automated GitHub release/privacy gate. Gmail, employers and external AI APIs were not connected.

The workflow deliberately has no separate job-search or mail-sending application. The statistics view contains HTML/CSS/JavaScript for validating, sorting, filtering and displaying the agent-written snapshot. The safeguards for consent, quota and external mail remain procedures rather than technical locks. Versions 1.2–1.4 established the bilingual architecture, person-scoped journal and agent playbook; version 1.5 expands the monthly workflow, Gmail reconciliation, local archives, reporting, attribution files and statistics validation.

The review covered AI_BUILD_SPEC.md, the HTML overview and the user guide. Personal archives, Gmail and existing applications were not touched. Code from the reviewed GitHub alternatives was not used. The review checks the consistency of the project; it is not an audit of external services or of the labour market.

## Findings and fixes

| Gap | Fix |
|---|---|
| No entry README; the start required files that did not exist | README lists the files that really exist and separates the documentation build from the future release |
| The database format was left open | JSON/JSONL without SQL; DATA_CONTRACT defines identifiers, paths, the authoritative records and the projections |
| The specification shared reports and logs, while the HTML kept them inside profiles | Reports and logs belong to a profile; the quota belongs to the person |
| “Atomic quota” has no independent execution engine | The project documents a single-writer marker, reservation, action IDs and recovery; these remain procedural protections, not technical locks |
| An uncertain send could trigger a duplicate | `send_uncertain` keeps the reservation and requires reconciliation with evidence instead of a blind retry |
| Reply, delivery and thank-you could collapse into one status | Submission, delivery, outcome and follow-up actions have separate states |
| “Replies” could mean messages or applications | Separate counters for reply events and for applications with a reply, including late replies |
| A report made on the last workday could miss later replies | Manifests, revisions and allocation by the month of actual receipt |
| The market analysis had become optional | The separate market page is mandatory again; unavailable sources produce “estimate unavailable” |
| “Local” storage could be mistaken for “no cloud transfer” | Consent comes before a cloud agent reads personal originals; exporting the questionnaire is an explicit act |
| A static file seemed able to detect a later failed check | Snapshot identifiers, update times and what a stale page can really show are stated |
| Public documents contained private examples of earlier permissions | Replaced by a general import policy that never activates permissions automatically |
| The HTML showed different versions; file-name placeholders were parsed as tags | Versions synchronized, placeholders escaped, navigation added |
| The overview was one very long page | Split into short pages with a menu; the statistics page was added |
| The installation order (agent or archive first) was unclear | The guide explains the order: agent, then archive, then connection; every step says what should appear on the screen |
| Readiness was expressed only as broad intentions | Concrete acceptance scenarios with inputs and expected results |

## Fixed decisions

The product name is **HomenS.AI JobPilot** and the repository is `homensai-jobpilot` ([HomenSAI/homensai-jobpilot](https://github.com/HomenSAI/homensai-jobpilot)). Authorship and visual identity (the same as homensai.com and HomenS.AI Core) are kept. The agent and the folder are required; Docker is not used; the HTML page only displays; the limit is 44 submissions per person per month. Nearby targets come first, CVs and letters are personalized, languages are independent, reports are neutral, mail actions need their own consent, and code from reviewed alternatives is not reused.

## Work not yet verified or not implemented

- The workflow instructions have not been fully accepted with a real Codex or Claude Code user. The package remains experimental; scenarios are still to be run in chat with synthetic data.
- Gmail connector and built-in-browser capabilities must be checked separately on the user's installed account, including whole-thread reading, Gmail Scheduled, attachments, SENT proof, and interrupted-session recovery. No real Gmail account was connected for this review.
- DOCX/PDF creation and page-by-page rendering in Word or LibreOffice have not been exercised end-to-end by the agent.
- A complete step-by-step setup for Claude Code is not written; the detailed installation guide is for Codex on Windows.
- The automated GitHub release workflow and any fail-closed privacy gate still need an authorized post-publication verification. The manual release checklist is present; it is not a technical enforcement mechanism.
- The shared 44-per-person monthly quota, approvals, Gmail operations, scheduling, archives and report delivery are procedures, not hard locks or guaranteed background services.

The `.gitignore`, example settings and statistics template can be inspected locally, but they do not prove the agent workflow works. Agent scenarios are not marked PASS without a recorded manual check and evidence.

## Checks performed

On 9 October 2026: the local statistics-page VM regression set passed 18/18 targeted checks; `node --check` passed for `summary.js`; the three JSON examples and every JSONL example line parsed; local links/assets in 16 HTML files and local links in 23 Markdown files were checked with zero errors (the readiness template's intentional `{{...}}` link placeholders were excluded). This is not full browser, AI-agent, Gmail, scheduled-send or document-rendering acceptance. No external account or API was connected.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com
