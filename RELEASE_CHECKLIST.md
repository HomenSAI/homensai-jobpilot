# Release checklist

[English](RELEASE_CHECKLIST.md) | [Русский](docs/ru/RELEASE_CHECKLIST.md)

Author and developer: Serhii Khomenko / HomenS.AI  
Applies to: HomenS.AI JobPilot source and documentation releases.

This is a manual pre-release control (F10). The release workflow (`.github/workflows/release.yml`) runs on every push to `main`. It reads the version from the newest section of `CHANGELOG.md`, commits `VERSION` back to `main` and creates the GitHub release. It does not check the public file list, personal data or secrets. The maintainer completes this checklist **before** the change reaches `main`, because the workflow publishes automatically.

Run these checks on synthetic test data and on a candidate release archive. Do not run a real release to test the checks.

## 1. Public file allowlist (fail closed)

The public release may contain only the files below. Any other file stops the release until it is removed or the list is changed in a reviewed commit.

- Root documents: `README.md`, `USER_GUIDE.md`, `OPERATING_REQUIREMENTS.md`, `AGENTS.md`, `CLAUDE.md`, `TODO_FOR_AI.md`, `AI_BUILD_SPEC.md`, `ARCHITECTURE.md`, `DATA_CONTRACT.md`, `ACCEPTANCE_TESTS.md`, `REVIEW.md`, `RELEASE_CHECKLIST.md`, `CHANGELOG.md`, `VERSION`, `LICENSE`, `LICENSE-DOCS`, `NOTICE`, `PROJECT_OVERVIEW.html`, `overview_*.html`, `.gitignore`.
- Folders: `docs/` (the Russian, German and Ukrainian editions), `dashboard_template/` (clean templates and the sample `summary.js`), `examples/` (neutral examples only), `assets/` (shared styles, scripts and IBM Plex fonts), `.github/workflows/`.
- Under `Local_Data/`: only the empty intake folders and their `README.md` files, and `Story_Questions.md`, as `.gitignore` allows. No other file and no data subfolder.

## 2. Archive and Git index check

- Build the candidate archive in a new, empty folder. List its files and compare them with section 1. Do not run scripts from the unpacked archive and do not unpack it into the working folder.
- Check the Git index of the release commit against the same list. `.gitignore` does not untrack files that are already in Git.
- No nested archives (`.zip`, `.tar`, `.7z`, `.rar`), backups, lock files, logs or journals.
- No file or folder names that carry personal data, application or company names, application dates, person or profile identifiers, or working-data names: `persons/`, `profiles/`, `journal/`, `runs/`, `outbox/`, `Applications/`, `dashboard/` (generated pages), `writer.lock`, `workspace.json`, `transactions-*.jsonl`, and any file in `Resume/` or `CoverLetter/` other than `README.md`.
- No CV, certificate, diploma, reference, scan, photo, PDF, DOCX or personal JSON file. The only binary files allowed are the project's own images and the IBM Plex fonts in `assets/`.

## 3. Content checks

Run the checks by hand. An automated scanner may help, but it is only one check.

- **Personal data.** No real personal names other than the author's public byline, no personal e-mail address, no telephone number, no home address, no date of birth, no identity or account number. The only addresses allowed are the author's public contact and obvious placeholders such as `first.last.job@gmail.com`, which is a pattern, not a real address. Do not use a real person's address as an example.
- **Fake-looking real data.** No realistic CV, diploma, certificate, reference, cover letter, vacancy record, company contact or mail excerpt. Examples must be obviously synthetic, use bracketed placeholders or clearly invented names, and must not pose as a real employer's contact.
- **Secrets.** No token, password, one-time code, OAuth or session value, cookie, API key or private key. Search for common patterns (for example `BEGIN PRIVATE KEY`, `ghp_`, `AKIA`, `ya29.`, `sk-`, `Bearer `, `password`, `token`, `cookie`) and review every hit by hand.
- **Private material.** No private QA fixture, real mail text, real vacancy text, statistics from a real person, screenshot with personal data, or copy of the working folder.
- Record which searches were run and what was reviewed by hand. A clean search result is not proof that no personal data exists.

## 4. Licences and attribution

- Check `LICENSE` (PolyForm Noncommercial 1.0.0 notices), `LICENSE-DOCS` (CC BY-NC 4.0 link) and `NOTICE` (author notices and the IBM Plex SIL OFL 1.1 notices).
- New project-authored instructions and interface strings keep the attribution to Serhii Khomenko / HomenS.AI.
- The English primary text and the Russian, German and Ukrainian editions describe the same rules. A mismatch is fixed in every edition.

## 5. Claims and status

- README, USER_GUIDE and REVIEW label each capability as **verified in tests**, **described, not tested in practice** or **not available** (R09). Do not write that Gmail sending, Gmail Scheduled sending, DOCX rendering or a full agent cycle is verified unless a recorded run supports it.
- Codex is the only environment in which the project has been checked. Anthropic / Claude Code compatibility is **not confirmed**.
- Prices and plan names carry a check date and an official source. Do not state a price as current without a new check.

## 6. Version and changelog

- `CHANGELOG.md` has a new top section with the version and date. Its text is in English first and the same text in Russian directly below (`**English.**`, then `**Русский.**`); the same entry is in `docs/ru/CHANGELOG.md`. The GitHub release notes are taken from this section. After the workflow runs, `VERSION` equals that version.
- Every push to `main` starts the release workflow. Do not push such a change until sections 1 to 5 are complete.

## 7. Links and rendering

- Check local links and open the changed HTML pages in a browser (statistics page, readiness template, overview pages).
- For Word or PDF output, render each DOCX in Word or LibreOffice, inspect every page, and export the PDF from the checked DOCX. Do not claim a visual check that was not run.

## 8. Record of this check

Record the date, repository, branch, commit, archive SHA-256 value, reviewer, and the result of each section as PASS, FAIL, PARTIAL or NOT RUN with the evidence. The record contains no personal data and is kept outside the release archive.

## Release status for 1.5.1 (historical)

- Statistics page regression checks: 18/18 passed in an isolated JavaScript VM against synthetic data.
- Full browser visual check: not run.
- Full Codex agent acceptance, Gmail connector/browser, real Scheduled verification and DOCX/LibreOffice report cycle: not run.
- The release workflow has no automated fail-closed privacy allowlist; this checklist is manual and must be completed by the maintainer.

## Status for the current package

- Documentation changes were prepared. Sections 1 to 8 were not run on a candidate release archive.
- Automated privacy check: `.github/workflows/privacy-gate.yml` (GitHub automation, not part of the user's package); tested locally; it runs on GitHub on every push to `main` and before every release.
- Statistics VM checks: not repeated for 1.6.0 in this pass.
- Full browser, agent, Gmail, Gmail Scheduled, and DOCX/LibreOffice checks: NOT RUN.

A release must not be described as fully accepted while any required check remains NOT RUN.

## Version on main

`CHANGELOG.md` is the release-version source. On every push to `main` or manual Release run, GitHub Actions reads its newest `MAJOR.MINOR.PATCH` heading and writes `VERSION` automatically when needed. A repeated run keeps an existing release/tag. Invalid, duplicated, out-of-order or downgrade versions stop publication. A release uses exactly the commit that passed the privacy gate; when `main` has moved on, that run stops without publishing and the newer push releases. A normal Git push cannot overwrite a newer main; if it was rejected, start a manual Release run on `main`. Current document labels link to `VERSION` instead of carrying independent numbers. A commit SHA identifies a particular commit; `VERSION` identifies the package release, not each commit. GitHub Actions is release automation and adds no sender or background application to the user's package.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com · [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
