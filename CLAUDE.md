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
## Required preflight and prompt caching (owner instruction, 2026-11-12, updated with measurements)
Read **all of AGENTS.md** and its AI context/caching policy before substantive work. Inventory the project and current state; fully trace task-relevant code/docs; reuse a compact context map; targeted reads, trimmed tool output (`head`/`tail`/`cut`), no pasting of whole repositories, logs or JSON.
**Prompt caching is the main cost lever, always on.** Claude Code: user settings `~/.claude/settings.json` must contain `"promptCacheTtl": "1h"` and `"subagentPromptCacheTtl": "1h"` (documented settings; subagents otherwise get 5 min and every wait > 5 min rewrites their whole context). Do not switch model, effort or fast mode mid-session; continue a running agent (SendMessage) or fork instead of starting a fresh one; long commands in the background. Direct Claude Messages API: stable shared material first with `cache_control` at the end of it, the changing question after; cache only when the prefix is read again (1 task: no marks; 2+ tasks starting together: 5m + one `max_tokens: 0` pre-warm; 3+ queued: 1h); every report states **with cache $X vs old way $Y, saved $Z, ×K** from `cache_creation_input_tokens` / `cache_read_input_tokens`. Respect every existing project safety and release rule. Full policy: https://github.com/HomenSAI/homensai-core/blob/main/docs/AI_CONTEXT_EFFICIENCY_POLICY.md
<!-- HSAI-CLAUDE-CONTEXT-PREFLIGHT:END -->
