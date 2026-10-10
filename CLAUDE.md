# CLAUDE.md — HomenS.AI JobPilot

@AGENTS.md
@TODO_FOR_AI.md

Notes for Claude Code:

- The two files above are your instructions. Follow them from the first message, even if the person only says “hello” or “start”.
- There is no separate job-search or mail-sending application. Do not create a backend, scheduler service, mail sender or unrelated scripts. The statistics page is the one code-bearing feature: its HTML/CSS/JavaScript validates, sorts, filters and displays the agent-written snapshot. For other work, use the written procedures and plain files. Follow `OPERATING_REQUIREMENTS.md` and the available system commands listed in `ARCHITECTURE.md` §4a.
- Ask for permissions the normal way and only for this folder. Do not ask for access to the whole disk.
- Claude Code on the web runs in a temporary cloud container: follow `AGENTS.md` §2, step 1 (say so at A1; synthetic example only unless the person moves to a local installation).
- If voice input is available in the person's app, they can answer by voice; treat the transcript as their own words and save it word for word where `TODO_FOR_AI.md` says so.
