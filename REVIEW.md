# HomenS.AI JobPilot — review and status

[English](REVIEW.md) | [Русский](docs/ru/REVIEW.md)

10 October 2026 · Version [VERSION](VERSION) (the `VERSION` file) · Author of the idea and developer: Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · CC BY-NC 4.0

## Verification scope for this revision

The source was reviewed against GitHub main `0b183dda02fdaf7b4e3c13767990d4839bd11936` (release 1.9.0), preserving the newer folder structure, neutral document samples, daily limits and segmented journal. The revised change was prepared through GitHub source and in-memory checks; no Gmail or employer action was performed.

- 24 checks executed the existing statistics snapshot validator on GitHub source: PASS. These are validator checks, not a rendered-browser test.
- 23 specification/release-policy simulations: PASS. These model the written quota/recipient/version rules; they do not constitute a deterministic mail sender or live GitHub Actions execution.
- JSON/JSONL and relative document links were checked. Neutral DOCX/PDF binaries are unchanged from main; no new PDF-to-DOCX or Word/LibreOffice render was run in this revision.
- The revised Release workflow and real-agent acceptance remain NOT RUN until separately executed and recorded. Capability statements are limited to this evidence.

## Where the project stands

**In this release:** bilingual operating procedures; updated README, author story and separate code/documentation license notices; expanded journal and schedule contracts; and fixes to the statistics snapshot validation, historical counters, empty-month selector, shared quota display and result ordering.

**Verified in this work copy:** 18 targeted statistics-page VM checks passed, including malformed snapshots, duplicate response IDs, late replies, empty-month selection, missing shared quota totals and technical-error sorting. This is not a full browser test or an agent/Gmail acceptance cycle. These checks belong to the 1.5.1 work copy; they were not repeated for 1.6.0.

**Development environment:** the project was developed, audited locally and checked virtually in the **Codex** environment. **Anthropic / Claude Code was not tested in this cycle**; its compatibility is not confirmed. The Codex checks are not a full certification of the project, and the independent full acceptance of the source agent remains incomplete.

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

## Capability status (R09)

Each capability is marked with one of three labels: **verified in tests** (a recorded check exists, with its scope stated), **described, not tested in practice** (written in the instructions, no recorded run), or **not available** (the platform or the package does not provide it). No capability is marked as verified in practice unless a recorded run exists.

| Capability | Label | Note |
|---|---|---|
| Statistics page: validation, sorting and filtering of a sample snapshot | verified in tests | 18 checks in an isolated JavaScript VM on synthetic data (1.5.1 work copy); not a browser test |
| Statistics page in a real browser (layout, keyboard, mobile width, print, offline) | described, not tested in practice | |
| Agent first setup, interview, knowledge base and search settings | described, not tested in practice | No agent run recorded |
| Monthly limit of 44 CV submissions and send consent | described, not tested in practice | Procedural only; there is no technical lock |
| Gmail reading and classification of whole threads | described, not tested in practice | No Gmail account was connected |
| Gmail Schedule send and verification in Scheduled | described, not tested in practice | Not verified; the package does not claim that scheduled sending works |
| Gmail sending of any message, by any route | described, not tested in practice | Sending through Gmail is not verified |
| File upload by the built-in browser | not available | The official Browser documentation (checked 8 October 2026) says the agent cannot automate file uploads there |
| DOCX/PDF creation and visual rendering | described, not tested in practice | No Word or LibreOffice rendering was run; no DOCX has been visually checked |
| Daily 16:00 check as a registered recurring task | described, not tested in practice | Depends on the platform's scheduler; registration must be verified in the installation |
| Daily report by Gmail to the user (R08) | described, not tested in practice | Requires consent and mock tests before use |
| Readiness page (static template filled by the agent) | described, not tested in practice | No browser or data test recorded |
| Local archives and recovery (R01) | described, not tested in practice | |
| Document review in the agent chat (second way of adding a document) | described, not tested in practice | |
| Release privacy gate (automated allowlist) | not available | Only the manual `RELEASE_CHECKLIST.md` exists |
| Anthropic / Claude Code | described, not tested in practice | Compatibility not confirmed |

## Work not yet verified or not implemented

- The workflow instructions have not been fully accepted with a real Codex or Claude Code user. The package remains experimental; scenarios are still to be run in chat with synthetic data.
- Gmail connector and built-in-browser capabilities must be checked separately on the user's installed account, including whole-thread reading, Gmail Scheduled, attachments, SENT proof, and interrupted-session recovery. No real Gmail account was connected for this review.
- DOCX/PDF creation and page-by-page rendering in Word or LibreOffice have not been exercised end-to-end by the agent.
- A complete step-by-step setup for Claude Code is not written; the detailed installation guide is for Codex on Windows.
- The automated GitHub release workflow and any fail-closed privacy gate still need an authorized post-publication verification. The manual release checklist is present; it is not a technical enforcement mechanism.
- The shared 44-per-person monthly quota, approvals, Gmail operations, scheduling, archives and report delivery are procedures, not hard locks or guaranteed background services.
- The daily report by Gmail (R08), the price and plan statements (checked on 8 October 2026 from the official pricing page; not re-verified in the 1.6.0 pass, because the official sites could not be reached from the work environment), and the two-way document review (R19) need a recorded run before they can be called tested.
- The German edition of the idea section and of the examples follows in a later phase.

The `.gitignore`, example settings and statistics template can be inspected locally, but they do not prove the agent workflow works. Agent scenarios are not marked PASS without a recorded manual check and evidence.

## Changes in the 1.6.0 documentation pass

- Operating requirements: setup wording for the paid plan and the conditions disclaimer (R10); two ways to add a document and the confirmation step (R19); daily report by Gmail with its consent and duplicate rules (R08); built-in browser upload limit; review-before-sending block (R18).
- User guide: "Don't know where to start?" simple-steps menu (R15); the paid plan and conditions step (R10); the example email text for the Gmail window, with a note that it is an example (R14); help block and review block (R18); two ways to add a document (R19); the capability labels (R09).
- Idea section (R11) in README in both editions.
- Release checklist: allowlist, archive and index checks, content checks and the record of the check (F10).
- Nothing in this pass was run: no agent, Gmail, browser, scheduler or rendering check and no statistics check was repeated.

## Checks performed

On 9 October 2026: the local statistics-page VM regression set passed 18/18 targeted checks; `node --check` passed for `summary.js`; the three JSON examples and every JSONL example line parsed; local links/assets in 16 HTML files and local links in 23 Markdown files were checked with zero errors (the readiness template's intentional `{{...}}` link placeholders were excluded). This is not full browser, AI-agent, Gmail, scheduled-send or document-rendering acceptance. No external account or API was connected.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com
