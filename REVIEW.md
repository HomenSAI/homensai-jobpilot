# HomenS.AI JobPilot — review and status

[English](REVIEW.md) | [Русский](docs/ru/REVIEW.md)

7 October 2026 · Author of the idea and developer: Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · CC BY-NC 4.0

## Where the project stands

**Finished:** the specification, architecture, data contract and acceptance scenarios (English and Russian); the illustrated overview with a menu and the step-by-step installation page; the statistics page with years, months and days, sorting by date and result, and filters (it works with sample data); a neutral settings example; the license for the code.

**Not built yet:** the local commands and the single JSONL journal; the agent's builder that fills the statistics page with real data; Gmail reading and controlled sending; the questionnaire; the document generators; passing the acceptance scenarios.

Version 1.2 added ARCHITECTURE.md, the bilingual layout (English at the root, Russian in `docs/ru`), one transactional journal per person for quota and application events, and a shared calculation for reports and HTML. This improves the design; the executable system is not built.

The review covered AI_BUILD_SPEC.md, the HTML overview and the user guide. Personal archives, Gmail and existing applications were not touched. Code from the reviewed GitHub alternatives was not used. The review checks the consistency of the project; it is not an audit of external services or of the labour market.

## Findings and fixes

| Gap | Fix |
|---|---|
| No entry README; the start required files that did not exist | README lists the files that really exist and separates the documentation build from the future release |
| The database format was left open | JSON/JSONL without SQL; DATA_CONTRACT defines identifiers, paths, the authoritative records and the projections |
| The specification shared reports and logs, while the HTML kept them inside profiles | Reports and logs belong to a profile; the quota belongs to the person |
| “Atomic quota” had no mechanism | Exclusive writer lock, reservation before the call, operation identifiers and recovery; 1.2 puts all primary records into one journal |
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

## Remaining stages (none of them is a working feature yet)

- Working tools, the questionnaire, the builder of the statistics snapshot and the document generator.
- AGENTS.md, CLAUDE.md and TODO_FOR_AI.md, after the implementation stage is approved.
- Choice and verification of a specific Gmail connection and its exact setup parameters.
- A complete step-by-step setup for Claude Code; the installation guide currently details Codex on Windows.
- Running the acceptance scenarios, mail recovery checks and shared-limit tests.
- LICENSE-DOCS, NOTICE and a rights check of all release files.

The `.gitignore`, the JSON example and the statistics template are usable now, but they do not show that the future system works. Test scenarios are not marked PASS without an implementation and evidence.

## Checks performed

On 7 October 2026 the Markdown links, the HTML pages and the JSON example were checked with local tools (HTML and JSON parsers, a headless browser): links between documents resolve, there are no duplicate HTML identifiers, the pages load no remote resources, and the example settings are valid JSON with the expected defaults (`draft_only`, limit 44, subject limit 50, required market page, weekends excluded, holidays unverified, no mail account or consent). The statistics page was opened in a browser at desktop and phone width: sorting, filters, both languages, the light and dark themes and the “Top” button work, and the page makes no network requests. These checks cover document structure and the statistics page. Remote URLs and the future product functionality were not tested.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com
