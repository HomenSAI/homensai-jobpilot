# Release checklist

Author and developer: Serhii Khomenko / HomenS.AI  
Applies to: HomenS.AI JobPilot source and documentation releases.

This is a manual pre-release control. The current GitHub workflow creates a release when VERSION changes on main; it does not enforce this checklist automatically. The maintainer must complete it before the version bump is pushed.

## Before publishing

- [ ] Confirm repository, branch, parent commit and intended version.
- [ ] Inspect every changed file and the final public file list.
- [ ] Confirm `Локальные_данные/`, real CVs, certificates, mailbox data, credentials, browser sessions, backups and private QA fixtures are absent from the commit and release archive.
- [ ] Check the Git index / release tree directly. `.gitignore` alone does not protect files that are already tracked.
- [ ] Scan for tokens, passwords, real addresses and private sample content. Automated scanning is a check, not proof that every personal detail is absent.
- [ ] Check `LICENSE`, `LICENSE-DOCS` and `NOTICE`; retain the PolyForm required notices, CC BY-NC link and the IBM Plex SIL OFL notices.
- [ ] Confirm all new project-authored instructions and UI strings preserve attribution to Serhii Khomenko / HomenS.AI.
- [ ] Check the current README and both language editions; describe the statistics page as HTML/CSS/JavaScript and do not claim a complete agent/Gmail acceptance.
- [ ] Run the authorized statistics checks and record exact results. Do not treat them as full agent, Gmail, scheduled-send or browser acceptance.
- [ ] Confirm `VERSION` and both changelogs match the scope. A VERSION change on main triggers the existing release workflow.
- [ ] Verify local links and inspect updated HTML in a browser. For Word/PDF output, separately render and visually inspect every page before saying it passed.

## Release status for 1.5.0

- Statistics page regression checks: 18/18 passed in an isolated JavaScript VM against synthetic data.
- Full browser visual check: not run.
- Full Codex agent acceptance, Gmail connector/browser, real Scheduled verification and DOCX/LibreOffice report cycle: not run.
- The release workflow has no automated fail-closed privacy allowlist; this checklist is manual and must be completed by the maintainer.

A release must not be described as fully accepted while any required workflow remains NOT RUN.
