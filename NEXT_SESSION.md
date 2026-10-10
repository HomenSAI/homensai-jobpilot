# Handoff for the next AI session

For the AI agent that continues the work on this repository. Written 10 October 2026, version 1.19.2. Not for users. Read `REMAINING_WORK.md` too. The owner reads Russian; report to the owner in Russian.

## Rules of work (from the owner)
- English root files are primary. Keep `docs/ru`, `docs/de`, `docs/uk` structurally identical (headings, table rows, backticked tokens). `CLAUDE.md` exists only at the root.
- Every change: bump `VERSION`; add the same bilingual entry to `CHANGELOG.md` and `docs/ru/CHANGELOG.md` — **English first, the same text in Russian directly below** (owner's rule for the release notes of all HomenS.AI repositories; GitHub release notes are cut from the `CHANGELOG.md` section); add one plain-language line to `HISTORY.md` in all four languages (`HISTORY.md`, `docs/ru|de|uk/HISTORY.md`). The roadmap pages are generated from `HISTORY.md` by `.github/workflows/release.yml`. Commit to `main`; `git pull --rebase` before pushing. Commit messages end with the Co-Authored-By line given by the session.
- User-facing text: plain words, no IT jargon, no internal file names where a person does not need them. The owner dislikes technical wording and explanatory "comment" notes on pages.
- The package has no scripts and no automatic updates (owner's decision, also for the minimum-wage rate). Personal data never goes into the repository (`.github/workflows/privacy-gate.yml` checks).
- Do not claim something was tested if it was not. Honest status: documentation plus plain files; nothing was tested with real Gmail, Codex, the owner's Claude Code, Word or real users.

## State at the end of this session
- Releases up to 1.19.2 pushed. Statistics page: new block "value of saved time" (one rate, German minimum wage 2026, 13.90 EUR gross per hour, sources linked); minutes per application total 30 (10/8/3/4/3/2); the monthly-limit bar carries its text.
- A consistency pass was running when the API session limit stopped it: three agents were comparing `docs/ru`, `docs/de`, `docs/uk` with the English root and editing the translations in place. Their edits are committed as they were left and may be incomplete or inconsistent. The English root files were NOT changed by that pass.
- Two review reports (English self-consistency, and a cold read of the copy-paste prompts as ChatGPT/Codex) found the problems listed below; none of them is fixed yet.

## Done after this file was first written (10 October 2026, later)
In the English root (commit "Английский оригинал: …"), and then mirrored into `docs/ru|de|uk` by agents (check that the mirror is complete):
- one start command in USER_GUIDE (step 5 and Part 3, step 6) and `overview_install.html`, naming `AGENTS.md`, `TODO_FOR_AI.md`, `OPERATING_REQUIREMENTS.md`;
- the "Setup is stuck" and "Add a document" prompts fixed (workspace.json and stage, consent first, never write into `Положите_сюда`, journal); three short prompts added (Gmail reading only, check before sending, next month);
- privacy gate described as "exists, tested locally, not yet run on GitHub" in README, USER_GUIDE, REVIEW, RELEASE_CHECKLIST; REVIEW verification section rewritten (model run, dry runs, headless Edge, what was not run);
- Claude Code "compatibility not confirmed" on the overview, install and safety pages; the 45th refusal and the PDF check worded as the agent's procedure;
- "four editions" and "five folders" in AGENTS, README, AI_BUILD_SPEC, RELEASE_CHECKLIST; README line about a later German edition removed;
- `TODO_FOR_AI.md` R03 notes that the built-in browser normally cannot attach files; the dashboard path got its `Локальные_данные/` prefix; the materials README mentions the interview file;
- NOTICE and LICENSE say "HomenS.AI"; NOTICE points to `assets/fonts/NOTICE.txt` and `OFL.txt` (both exist); `LICENSE-DOCS` already links the full CC BY-NC 4.0 legal code (fine as is); `THIRD_PARTY_NOTICES` in AI_BUILD_SPEC is conditional (fine);
- stage names listed in `DATA_CONTRACT.md` §1 (workspace.json row).
Released as 1.20.0; the editions were mirrored and the parity check (headings, table rows, tokens, links) is clean apart from known false positives (date lines counted as numbered items). Items 1, 2, 4, 5, 6, 7, 8 and 9 below are done; 3 is done in REVIEW (check the roadmap page wording once more); still open: 10 (step numbering of USER_GUIDE tables vs TODO order, schema-version table, one quota sentence), 11, 12.

Version 1.21.0 added: the sending rule stated by the person (1–44 per day) and motion on the overview pages (`assets/site.css`, `assets/site.js`: arrows, reveal on scroll, reading progress, scroll cue; reduced-motion respected). The statistics and readiness pages have their own styles and did not get the motion.

## Version 1.22.0 (shrink of the English instructions)
- The six English instruction files went from 423 KB to 242 KB: each rule has one owner file, other files point to it (plan of owners: see the 1.22.0 entry of CHANGELOG.md). The agent reads AGENTS, TODO_FOR_AI and OPERATING_REQUIREMENTS at the start; DATA_CONTRACT and ARCHITECTURE are its reference by section; AI_BUILD_SPEC is for people. All `##`/`###` section numbers were kept so that links from tests, guides and pages still resolve.
- Fixed at the same time: journal read-back by byte prefix with PowerShell/macOS/Linux commands, UTF-8 without BOM and LF, lock created with content, empty lock = foreign; `slot_month` and single-field quota counts (`claimed_month`, `evidence_month`, `corrected_used_month`, `corrected_unverified_month`); one daily-limit rule; `send_uncertain` for an unknown schedule result; first-setup fixes in A2, A3, A7–A9; settings example without pre-filled answers; escaping of untrusted text on the statistics and readiness pages.
- Done in 1.22.1: the `docs/ru|de|uk` editions of the six files are translated anew (parity of headings, tables and backticked tokens checked). Still open: the translated ACCEPTANCE_TESTS cite some section names in English or in their old wording; code blocks (folder trees, EMAIL_TO_SEND layout) keep English comments in all editions. The PowerShell forms in ARCHITECTURE §4a are not yet tried on Windows. `examples/simulation` still contains the inconsistencies listed in the 1.21.0 review (consent ids, five CVs in five minutes with `max_per_day` 2, missing `replies_file`).
- Changelog rule (owner, all repositories): every entry English first, the same text in Russian directly below; GitHub release notes are cut from the `CHANGELOG.md` section.

## Do next, in this order
1. **Edition sync.** Compare each file of `docs/ru|de|uk` with English (headings, table rows, backticked tokens, numbers). Fix leftovers: "three editions" must be four (AGENTS.md, README.md line ~70, AI_BUILD_SPEC.md line ~11 "all three"), "three folders" must be five folders `1_`..`5_` (README table, AI_BUILD_SPEC.md lines ~98 and ~456, installation texts), `docs/uk` missing from the German README and AI_BUILD_SPEC lists of editions, README row count differs by one, an extra link in `docs/de/overview_architecture.html`, one bullet in `docs/ru/AI_BUILD_SPEC.md`, one numbered item in `docs/de/ARCHITECTURE.md` and `docs/de/REVIEW.md`. Natural wording, one term per concept, no Russian words in the Ukrainian text.
2. **Privacy gate status.** README "Capability" table, REVIEW.md and RELEASE_CHECKLIST.md say it is not available; it exists (`privacy-gate.yml`) but has never run on GitHub. Use one wording: "exists, not yet run on GitHub". Check its first run in the Actions tab for false positives.
3. **One statement of what was verified.** REVIEW.md is stale (versions 1.5.1, 1.6.0, 1.9.0; 18/23/24 checks). Rewrite its verification section: executable model of the rules (`examples/simulation/SIMULATION_REPORT.md`, 46 checks passed); dry runs of the first setup by a Claude agent in a sandbox on three made-up people; the statistics page opened in headless Edge. Not done: Codex, the owner's Claude Code, real Gmail, Word, real users. The roadmap page and REMAINING_WORK.md must say the same.
4. **Claude Code wording.** `PROJECT_OVERVIEW.html` and `overview_safety.html` say Claude Code can be used instead of Codex; README, REVIEW and USER_GUIDE say compatibility is not confirmed. Use "not confirmed" everywhere (four languages).
5. **Promises on pages.** `PROJECT_OVERVIEW.html`: "the 45th is blocked before it is sent" and "checked visually as PDF" must say that it is the agent's procedure (no technical lock) and that rendering depends on the available tools.
6. **USER_GUIDE prompts** (four languages):
   - Two different start commands (guide line ~45 and ~281, and `overview_install.html`): make one text that names `AGENTS.md`, `TODO_FOR_AI.md` and `OPERATING_REQUIREMENTS.md` (Codex loads only `AGENTS.md` by itself); fix the step numbering (the start is step 4, 5 or 6 depending on the table).
   - "Add a document": it tells the agent to save the original into `Положите_сюда`, but the agent must not write there (the person copies the file); add: check that the cloud-processing consent is recorded; if the setup is not finished, continue at `TODO_FOR_AI.md` Part A; follow the journal rules; call the page "the readiness page".
   - "Setup is stuck": read `Локальные_данные/workspace.json` and its `stage` first; "do not install programs" becomes "ask first"; the placeholders may stay empty (the agent inspects the system itself); "attached instructions" becomes "the open project folder".
   - Add short prompts for connecting Gmail (read only, do not send), the check of documents before sending, and the monthly cycle (they point to `OPERATING_REQUIREMENTS.md` and `TODO_FOR_AI.md` Part B).
7. **Gmail.** `TODO_FOR_AI.md` (R03) says the built-in browser can attach files; USER_GUIDE says it cannot automate uploads. Align TODO with the guide (manual route).
8. **Small fixes.** `dashboard/profiles/<id>/` path without the `Локальные_данные/` prefix in `overview_install.html` (~line 198); `Локальные_данные/Положите_сюда/README.md` says the agent changes nothing, but it writes `Интервью_*.md` in `2_Рассказ_о_себе`; `RELEASE_CHECKLIST.md` allowlist calls `docs/` the "Russian edition"; the README sentence "The German edition of this section follows in a later phase".
9. **Licences before going public.** `LICENSE-DOCS` is only a pointer (add the CC BY-NC 4.0 legal text or a clear statement); the PolyForm "Required Notice" says "HomenSAI" while other lines say "HomenS.AI" (make one); `AI_BUILD_SPEC.md` §14 mentions a non-existent `THIRD_PARTY_NOTICES`; say once and everywhere that the project is source-available (PolyForm Noncommercial), not OSI open source; check that the font licence files NOTICE refers to (IBM Plex, SIL OFL 1.1, `assets/fonts`) exist.
10. **Consistency items.** Setup order differs between `TODO_FOR_AI.md` (story, documents, knowledge base, search setup A7, mail A8) and the numbered tables of USER_GUIDE and `overview_install.html` (Gmail is step 8, 9 or 10.1): use one numbering. The stage names (`story_ready`, `documents_ready`, `knowledge_base_draft`, `knowledge_base_confirmed`, `profile_created`, `ready`) are not defined in `DATA_CONTRACT.md`: add them. One table of schema versions (journal 1.2, quota 1.3, workspace 1.3 with format 1.4, settings 1.4, statistics 1.4). One sentence about the quota of 44 (only JobPilot-managed CV submissions count; independent mail is not limited) in OPERATING_REQUIREMENTS, README and AI_BUILD_SPEC (line ~519 says "another channel" cannot bypass it).
11. **Content still missing.** Neutral CV, letter and report templates in German and Russian (`examples/templates/` has English and Ukrainian only); do not imply four languages of templates until then. Native-speaker review of the English, German and Ukrainian texts. The sample dates in `examples/` run to 2026-10-20, later than the release date (harmless).
12. **Re-run the checks** after the edits: the parity/links audit, `privacy-gate.yml` logic (it ran clean locally), JSON validity of `examples/*.json`, headless Edge `--dump-dom` of `dashboard_template/index.html?lang=ru|de|uk|en`.

## Open decisions for the owner
- (Decided in 1.21.0: `max_per_day` 1 to 44, the person states the sending rule in their own words, `schedule.sending_rule_statement`.)
- Whether `CLAUDE.md` needs language editions.
- The Author page: keep, shorten, or replace by the contact page of homensai.com.

## Only the owner can do
Try the instruction files in Codex and in the owner's Claude Code; connect Gmail and test; real-user acceptance; Word rendering; real vacancy and route sources; the first run of `privacy-gate.yml` on GitHub.

## Useful facts
- Statistics page: `dashboard_template/index.html`, tested by opening it in headless Edge (`msedge --headless --dump-dom file:///…/index.html?lang=ru`). The sample data is `dashboard_template/summary.js`.
- Release workflow: `.github/workflows/release.yml` (version sync, history pages, version badge on every page) waits for `privacy-gate.yml`.
- Dry-run findings were applied in version 1.18.0; the list of what changed is in `examples/simulation/SIMULATION_REPORT.md`.
- Working tip: a `bash` heredoc with many quotes failed twice in this environment; write scripts to a file with the file tool and run them. On Windows, Python writes with the console codepage unless `encoding="utf-8"` is passed.
