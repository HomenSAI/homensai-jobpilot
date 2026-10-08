# Changelog

[English](CHANGELOG.md) | [Русский](docs/ru/CHANGELOG.md)

The project version is in the file [VERSION](VERSION). The project is a documentation package that an AI agent follows; there is no separate program, so this is the version of the package (documents, examples and the statistics page).

Rules: `MAJOR.MINOR.PATCH`. MAJOR changes when data formats or rules change so that old data no longer fits. MINOR is a new feature or a new part of the documentation. PATCH is a fix or a wording change without new capabilities. Every change to `main` adds a line here; the number is raised when a release is made. Each release gets a git tag `vX.Y.Z`.

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
