# Remaining work

> **Developer notes, not for users and not for the agent that runs a job search** (see `dev/README.md`).

The next AI session starts with `NEXT_SESSION.md` (an ordered to-do list and the working rules).

This file is for the person who builds the project. It is not for users, and the web pages do not repeat it. What is finished is described on the Roadmap page; the history of releases is in `CHANGELOG.md` (technical) and `HISTORY.md` (plain words).

## Needs real people, real accounts or real services

These cannot be done by simulation. Until they are done, the matching rows of `ACCEPTANCE_TESTS.md` stay `NOT RUN`.

1. **Instruction files in the real agents.** A dry run on three made-up people was done with a Claude agent in a sandbox (`examples/simulation/SIMULATION_REPORT.md`); it is not a run in Codex or in the user's own Claude Code. Run `AGENTS.md`, `CLAUDE.md` and `TODO_FOR_AI.md` in Codex and in Claude Code with three real starting points: a person who prepared nothing, a person who filled the folders, and a voice interview. Correct what the agents misunderstand.
2. **Gmail.** Connect Gmail (the approved connector or the built-in browser), check the exact setup, reading of all pages, SENT and Scheduled proof, scheduled sending with attachments, and the manual fallback.
3. **Acceptance scenarios by hand.** Perform the rows of `ACCEPTANCE_TESTS.md` in a chat on synthetic data and record each result in the log.
4. **Full user acceptance.** One real user, the whole path: agent, Gmail, document preparation, schedule, daily check, report.
5. **Word.** Open the generated DOCX files in Microsoft Word and check them page by page (only LibreOffice has been used so far).
6. **Native-speaker review.** The English, German and Ukrainian texts have not been read by native speakers. The translation audit is the next stage.
7. **Vacancy and route sources.** Choose real sources and read their terms of use; check capture of vacancy requirements from live pages.
8. **Scheduled agent runs.** Check the daily 16:00 task and the monthly reminder where the agent offers a scheduler; manual resumption must work on its own.
9. **Rights check.** Check the rights to every included material before a release (fonts: IBM Plex, SIL OFL 1.1; templates; images).

## Release and tooling

10. **Release / personal-data gate.** Done as `.github/workflows/privacy-gate.yml`, tested locally and running on GitHub (first runs passed, for example https://github.com/HomenSAI/homensai-jobpilot/actions/runs/38063183306). Adjust the allowed lists if it ever reports a false positive.
11. **Claude Code setup.** A complete, verified setup of Claude Code for this folder (permissions limited to the project folder).

## Found by the dry runs, not yet fixed

12. **German and Russian templates.** The neutral CV, cover-letter and report templates exist only in English and Ukrainian (`examples/templates/`).
13. **Empty lock file.** Done in 1.22.0: the lock is created with its content in one command, and an empty or unreadable lock follows the stale-lock procedure (ARCHITECTURE.md §4b).
14. **Flexible hours.** `employment_type` has no place for “part-time or flexible”; decide on a field or a free note.
15. **Repeat the dry run** with Codex and with the user's own Claude Code, and with real people.

## Open decisions for the owner

- Minutes per application used by the statistics page (example values 10/8/3/4/3/2, 30 minutes in all, are accepted only for now).
- Approval cadence values and the journal segment size rule.
- `CLAUDE.md` exists only at the root; whether it needs language editions is not decided.
- The Author page: the owner is deciding whether to keep it, shorten it, or replace it with the contact page of homensai.com.
