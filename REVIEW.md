# HomenS.AI JobPilot — Project Review

[English](REVIEW.md) | [Русский](docs/ru/REVIEW.md)

**7 October 2026 · documentation 1.0 → 1.1 → 1.2**  
Author of the idea and developer: Serhii Khomenko / HomenS.AI · https://homensai.com/ · CC BY-NC 4.0.

## Scope

Revision 1.2 adds ARCHITECTURE.md and a bilingual layout: English at the root, Russian in docs/ru. Quota and application events now share one transactional person journal. The design defines local modules, command_id/expected_revision, the outbox, run.resume, adapter capabilities and a shared report/HTML calculation. Command examples and verification scenarios have been added. This improves the design; the executable system has not been built yet.

The review covered AI_BUILD_SPEC.md, PROJECT_OVERVIEW.html and USER_GUIDE.md in this project folder. Personal archives, Gmail and existing applications were not modified. Code from reviewed GitHub alternatives was not used. The work examines project consistency, rather than conducting a fresh external-service or labor-market audit.

## Findings and changes

| Gap | Improvement |
|---|---|
| No entry README; startup immediately required missing files | README now lists actual contents and distinguishes the documentation build from the future release |
| Database format deferred | JSON/JSONL chosen without SQL; DATA_CONTRACT defines IDs, paths, authoritative records and projections |
| Specification shared reports/logs while HTML placed them inside profiles | Reports and logs are profile-specific; quota belongs to the person |
| “Atomic quota” without a mechanism | Exclusive writer lock, pre-call reservation, operation IDs and recovery were specified; 1.2 unifies primary records |
| An uncertain send could trigger a duplicate | send_uncertain retains the reservation and requires evidence reconciliation instead of blind retry |
| Reply, delivery and thank-you could collapse into one status | Submission, delivery, outcome and follow-up actions have separate states |
| “Replies” could mean messages or applications | Separate event and distinct-application counters, including late replies |
| A report created on the last workday could miss later replies | Manifests, revisions and allocation by actual receipt month |
| Market analysis had become optional despite the main request | Required separate page restored; unavailable sources yield “assessment unavailable” |
| Local storage could be mistaken for no cloud transfer | Consent precedes reading personal originals through a cloud agent; questionnaire export is explicit |
| A static file appeared able to detect a later failed check | Snapshot IDs, last-update times and achievable stale-data behavior clarified |
| Public documents included private historical permission examples | Replaced with a general import policy that does not activate permissions automatically |
| HTML showed different versions and filename placeholders parsed as tags | Version 1.1 was synchronized, placeholders escaped and navigation added |
| Readiness was expressed only as broad intentions | Concrete acceptance scenarios with inputs and expected outcomes added |

## Decisions retained

Following the review, the user confirmed **HomenS.AI JobPilot**. The specification, README, guide and HTML overview record it as the chosen product name, with `homensai-jobpilot` as the planned GitHub repository name. This does not mean the repository has been created or published.

Authorship and visual identity remain in place. The agent and folder are required; Docker is cancelled; HTML is display-only; the limit is 44. Nearby targets have priority, CVs/letters are personalized, languages are independent, reports are neutral, mail actions require their own consent, and code from reviewed alternatives is not reused.

## Remaining stages — not implemented capabilities

- Working tools, questionnaire, static dashboard and document generator.
- AGENTS.md, CLAUDE.md and TODO_FOR_AI.md after approval of the implementation stage.
- Selection and verification of a specific Gmail connection and its exact setup parameters.
- A complete Claude Code user walkthrough; USER_GUIDE currently details Codex on Windows.
- Execution of acceptance scenarios, mail recovery checks and shared quota tests.
- LICENSE, LICENSE-DOCS, NOTICE, release-file rights checks and a real repository link.
- Video production: only the walkthrough script exists, not an MP4.

The added .gitignore and JSON example are useful now but do not demonstrate that the future system works. Test scenarios are not marked PASS without implementation and evidence.

## Historical documentation checks for 1.1

On 7 October 2026, a local check using Python's standard HTMLParser and JSON parser found:

- Nine files in the package; local Markdown links resolved to existing files.
- Nine file links and six section links in HTML resolved; no duplicate HTML IDs.
- No embedded remote resources in HTML; filename placeholders were not interpreted as tags.
- Valid JSON with checked defaults: draft_only, quota 44, subject 50, required market page, weekends, unverified holidays, and no mail account/consent.
- Version 1.1 in the main documents; local-data/credential/token exclusions in .gitignore; no institution names in Markdown.

Those checks found no errors. They covered document structure and the settings example. Browser visual review, remote URL checks and future product functionality were not tested in that revision.
