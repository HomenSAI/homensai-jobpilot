# Changelog

[English](CHANGELOG.md) | [Русский](docs/ru/CHANGELOG.md)

The project version is in the file [VERSION](VERSION). The project is a documentation package that an AI agent follows; there is no separate program, so this is the version of the package (documents, examples and the statistics page).

Rules: `MAJOR.MINOR.PATCH`. MAJOR changes when data formats or rules change so that old data no longer fits. MINOR is a new feature or a new part of the documentation. PATCH is a fix or a wording change without new capabilities. Every change to `main` adds a line here; the number is raised when a release is made. Each release gets a git tag `vX.Y.Z`.

## 1.4.1 — 8 October 2026

The first setup follows the order described by the author: the person's story first (by voice if nothing is written), then the documents, then the questions about the search.

- `TODO_FOR_AI.md` Part A rewritten in that order: consent, story (the agent says where it belongs and offers to record it now), documents, analysis and the knowledge base, interview about the gaps, confirmation, the search setup, mail, finish. New stages `story_ready` and `documents_ready`.
- The search setup is one table (what is asked, the options, where it is saved): kind of search, roles, where the person lives, radius, **means of travel (car, train, bus / tram, bicycle, on foot — any combination)**, limits of the journey, preferred towns, four languages, rhythm of sending. Nothing else is asked; the rest keeps safe defaults.
- `profile.json` is defined: DATA_CONTRACT.md §3b and `examples/settings.example.json` (new fields `goal_types`, `industries`, `excluded`, `employment_type`, `earliest_start_date`, `_allowed_values`; readable ids). The HTML install and profile pages, the guide and the specification use the same wording. Acceptance scenarios FIRST-06…08.

## 1.4.0 — 7 October 2026

The agent can now start by itself, and the person knows exactly where to put what.

- **Instruction files for the agent exist** as drafts: `AGENTS.md` (rules, loaded by Codex), `CLAUDE.md` (loaded by Claude Code, imports `AGENTS.md`) and `TODO_FOR_AI.md` (first run, resuming, checklists for the standard actions). The person only says “Start”; the agent introduces itself and asks one question at a time.
- **Ready folders for the person's materials:** `Локальные_данные/Положите_сюда/` with `1_Мои_документы`, `2_Рассказ_о_себе` and `3_Шаблон_отчёта` (each with a short README, and a list of questions for the story). They are part of the ZIP; the personal files inside are ignored by Git (`.gitignore` updated).
- **Knowledge base:** one Markdown file per person, `persons/<person_id>/База_знаний/Жизнеописание.md` — the whole life story as facts with source, status (`proposed` / `confirmed` / `rejected`), `use` and `sens`. Format in DATA_CONTRACT.md §3a. Facts need the person's confirmation; CVs use only confirmed facts.
- **Interview instead of a form:** the agent interviews the person topic by topic, by voice or text, saves answers word for word after every topic. Telling the story by voice in any Claude or ChatGPT chat beforehand is described too.
- **First run** is tracked in `workspace.json` (`stage`), so an interrupted first run continues where it stopped. `person_id` and `profile_id` are short readable ids.
- The HTML pages, USER_GUIDE.md, AI_BUILD_SPEC.md, ARCHITECTURE.md, DATA_CONTRACT.md and README were aligned: one story in the AI file and in the HTML. New acceptance scenarios FIRST-01…05 and KB-01…04.
- The questionnaire as an HTML form was dropped from the design; `source_documents/` and `templates/` per profile were replaced by the ready folders.

## 1.3.1 — 7 October 2026

- Statistics page: the data now lives in a separate file `summary.js` next to the page. For a real profile the agent copies `index.html` unchanged and writes only `summary.js`, so the page file is never edited and a mistake in the data cannot break it. If `summary.js` is missing or invalid, the page says so. `summary.json` and the data block inside the HTML are gone.
- Decision: no helper scripts. A script would need a runtime that a clean Windows does not have, an approval on every run, and it could not enforce anything the agent can skip; the counting is done with the system's own commands (see ARCHITECTURE.md) and the rest is plain files.
- Release automation: `.github/workflows/release.yml` creates the tag and the release on GitHub when `VERSION` changes. It runs only on GitHub's servers and is not part of the product.

## 1.3.0 — 7 October 2026

The project is now defined as rules and files only: **no program code**. The AI agent follows the written rules and keeps plain files.

- ARCHITECTURE.md rewritten: no local commands, scripts or modules; standard actions are checklists the agent performs; the journal has one line per completed action; the single-writer rule is a marker file.
- The safeguards (limit of 44, never sending twice, one writer at a time) are described openly as procedures, not technical locks. Fully automatic sending is off by default and needs the user's explicit acceptance of this limitation.
- DATA_CONTRACT.md: hash chain, `command_id`, `request_hash`, `expected_revision`, `fsync` and checkpoints removed; `action_id` and `sequence` kept. ACCEPTANCE_TESTS.md: scenarios are performed by hand in a chat on synthetic data and recorded in a log.
- AI_BUILD_SPEC.md: stages of work rewritten (Markdown instruction files instead of implementation); statements about code removed. The file `examples/command.example.json` was removed.
- Overview pages and README updated to match.

## 1.2.0 — 7 October 2026

First tagged release: the documentation and the statistics page.

- Illustrated overview split into short pages with a menu (overview, install, profile, architecture, safety, market, roadmap), in English and Russian, in the visual style of homensai.com and HomenS.AI Core: light and dark theme, language switch, “Top” button, links to the author on every page. IBM Plex fonts are bundled (SIL OFL 1.1).
- New statistics page `dashboard_template/index.html`: year → month → day, sorting by date and by result (successful / unsuccessful), filters, search, EN/RU. Shows synthetic sample data only.
- Installation order clarified: the agent first, then the project archive, then the connection. The step-by-step guide exists as a web page (`overview_install.html`) and as `USER_GUIDE.md`; the rules for the AI agent are in section 10.1 of `AI_BUILD_SPEC.md`.
- Wording: “author of the idea and developer” instead of “intended developer”; plain third-person language in README and REVIEW; the video walkthrough was removed.
- Root `AI_BUILD_SPEC.md` and `DATA_CONTRACT.md` are now the English text (they were Russian copies); the Russian edition is in `docs/ru`.
- `ARCHITECTURE.md`, `DATA_CONTRACT.md`, `ACCEPTANCE_TESTS.md`: statistics page contract and scenario DASH-05.
- Documentation 1.2 content (earlier): ARCHITECTURE.md, one transactional journal per person, bilingual layout.

## 1.0 – 1.1 — before 7 October 2026

Earlier drafts of the specification, overview and user guide, before the repository existed. Not tagged.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com
