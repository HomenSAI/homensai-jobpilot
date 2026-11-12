# CLAUDE.md — HomenS.AI JobPilot

@AGENTS.md
@TODO_FOR_AI.md

Notes for Claude Code:

- The two files above are your instructions. Follow them from the first message, even if the person only says “hello” or “start”.
- There is no separate job-search or mail-sending application. Do not create a backend, scheduler service, mail sender or unrelated scripts. The statistics page is the one code-bearing feature: its HTML/CSS/JavaScript validates, sorts, filters and displays the agent-written snapshot. For other work, use the written procedures and plain files. Follow `OPERATING_REQUIREMENTS.md` and the available system commands listed in `ARCHITECTURE.md` §4a.
- Ask for permissions the normal way and only for this folder. Do not ask for access to the whole disk.
- Claude Code on the web runs in a temporary cloud container: follow `AGENTS.md` §2, step 1 (say so at A1; synthetic example only unless the person moves to a local installation).
- If voice input is available in the person's app, they can answer by voice; treat the transcript as their own words and save it word for word where `TODO_FOR_AI.md` says so.

<!-- HSAI-CLAUDE-CONTEXT-PREFLIGHT:BEGIN -->
## Required preflight: project understanding and maximum justified token savings (2026-11-12)
Read **all of AGENTS.md** and its AI context/caching policy before substantive work. Inventory the entire project and current state; fully trace task-relevant code/docs; reuse a compact context map. Audit stable context, tool definitions and recurring documents before choosing a cache strategy. In direct Claude Messages API calls use supported `cache_control` (automatic or stable-prefix breakpoints, TTL 5m by default), then verify cache reads/writes, costs, latency and answer quality. Avoid duplicate retrieval and oversized prompts. Claude Code subscription limits are **not** changed by API cache settings. Respect every existing project safety and release rule. Full policy: https://github.com/HomenSAI/homensai-core/blob/main/docs/AI_CONTEXT_EFFICIENCY_POLICY.md
<!-- HSAI-CLAUDE-CONTEXT-PREFLIGHT:END -->
