# HomenS.AI JobPilot · Jobsuchmaschine und Bewerbungsmanager

[English](AI_BUILD_SPEC.md) | [Русский](docs/ru/AI_BUILD_SPEC.md)

**Project specification for Codex / Claude Code — [VERSION](VERSION), 10 October 2026**

**Status:** project specification and experimental agent workflow. There is no separate job-search or mail-sending application; the only code is the statistics view, which validates, sorts, filters and displays the agent-written snapshot. This text does not claim that the workflow has passed acceptance and gives no permission to connect mail or send applications.

This file describes the product for people and developers: why it exists, its design, licences, sources and alternatives. The agent works from `AGENTS.md`, [TODO_FOR_AI.md](TODO_FOR_AI.md) and [OPERATING_REQUIREMENTS.md](OPERATING_REQUIREMENTS.md), with [ARCHITECTURE.md](ARCHITECTURE.md) and [DATA_CONTRACT.md](DATA_CONTRACT.md) as reference; nothing operational lives only here. Start with [README.md](README.md); installation: [USER_GUIDE.md](USER_GUIDE.md) and [overview_install.html](overview_install.html); tests: [ACCEPTANCE_TESTS.md](ACCEPTANCE_TESTS.md).

Four editions: English at the root (primary), Russian in `docs/ru`, German in `docs/de`, Ukrainian in `docs/uk`, with the same identifiers, rules and examples; a rule change updates all four.

**Authorship and independent development.** Serhii Khomenko is the author of the idea and the developer of the system. The concept, scenario and requirements come from the author's own workflow, and the system was designed independently. The GitHub projects of section 14 were looked at only as an overview of the market: their code, components, templates, design, architecture and prompts were not used, copied, adapted or forked.

**Author of the idea and developer:** Serhii Khomenko  
**Website:** https://homensai.com/  
**GitHub:** https://github.com/HomenSAI  
**LinkedIn:** https://www.linkedin.com/in/serhii-khomenko-homensai/  
**ORCID:** https://orcid.org/0009-0009-5371-9717  
**Book / Zenodo:** https://zenodo.org/records/23160031  
**Contact:** info@homensai.com  
The public details were checked against the website archive `deploy_ver_2.21.zip` on 7 October 2026 and are checked again before a release. The personal website is not presented as a registered company.

### Visual identity and links to the author

- The brand is **HomenS.AI**, the product **HomenS.AI JobPilot**, the repository **`homensai-jobpilot`** (https://github.com/HomenSAI/homensai-jobpilot); the German descriptor is **Jobsuchmaschine und Bewerbungsmanager** (“job search and application management”). The name was not checked against trademarks or domains.
- The logo is the official SVG mark of the website, not redrawn. The site header shows the wordmark `HomenS.A Inc.` while its metadata says `HomenS.AI`; the wordmark is only a visual caption, not a claim of legal registration. Project materials use “HomenS.AI · Serhii Khomenko”.
- **One look everywhere.** All HTML pages follow homensai.com and the HomenS.AI Core client (`frontend/app/styles.css`): the “Nordic” palette, a thin grid, a top bar with logo, menu and EN/RU switch, a light/dark switch (dark follows the system), a “Top” button and a footer with links to the author.
- Palette (light): background `#edf1f4`, surface `#f9fbfc`, text `#14212e`, secondary `#44525f`, lines `#d9e0e6`, blue `#1e4f8a`, teal `#147283`, gold `#7d5f16`; states: green `#1f7a46`, amber `#9a5b00`, red `#b3261e`; the logo keeps `#2bb3c4` and `#c9a24a`.
- Fonts: IBM Plex Sans and IBM Plex Mono, unmodified in `assets/fonts` with `OFL.txt` and `NOTICE.txt` (SIL Open Font License 1.1); without them the pages use system fonts.
- Every HTML page and Markdown document links to `homensai.com`, GitHub `github.com/HomenSAI`, LinkedIn, ORCID, the Zenodo DOI and `info@homensai.com`. Contact links of design version 2.21 (checked against https://homensai.com/contact.html on 7 October 2026): LinkedIn `linkedin.com/in/serhii-khomenko-homensai`, ORCID `0009-0009-5371-9717`, the GitHub projects RTX 3080 local AI benchmarks and `two-worlds-one-mind`, Zenodo `10.5281/zenodo.23160031`. Links and brand-file rights are checked again before publication.

## 1. Why the project exists

**HomenS.AI JobPilot** is a self-contained package: the person downloads it from GitHub and opens it as a local folder in Codex or Claude Code. The AI agent in the chat does the work: it asks for missing information and permissions, searches for companies and vacancies, keeps the records, writes documents, checks mail within the connections given and prepares reports. It is not a web service or a server.

The idea is to show that a fairly complex workflow can run on written procedures, local files and an existing cloud AI agent, without a separate application. The author ran such a workflow for himself for about two months; when acquaintances described the same burden, he standardized it. These are origin details, not proof of acceptance.

The 44-submission limit, the no-repeat rule and the one-writer rule are procedures the agent follows, not technical locks. The safest mode is the default, and every external action needs the person's approval of the exact package and schedule. All data stays in the extracted folder; secrets stay with the operating system or the provider. The key idea of the profile: the agent keeps the person's whole confirmed life story, not a short old CV, and writes each CV and Anschreiben from confirmed facts only.

## 2. Experience of existing working folders

Early users' folders had useful but uneven practices: month directories and numbered employer folders, **Company.md**, **Status.txt** and **Replies.txt** (every reply in full), e-mail texts and planned dates, different document names (Anschreiben, Lebenslauf/CV, PDF/DOCX) and separate prompts. They cannot simply be merged, so the system has one data format, a configuration per person and a read-only import of old folders, which are never renamed, moved or rewritten.

## 3. Architecture: a local folder and an AI agent

The person opens exactly this folder in Codex or Claude Code and says “start”. The agent loads its rules file (`AGENTS.md` for Codex, `CLAUDE.md` for Claude Code) and follows `TODO_FOR_AI.md`: first setup, resuming in a later chat, and a checklist per standard action. It keeps its position in `workspace.json` (`stage`) and in the journal. Downloading Markdown files gives no one access to Gmail or the computer.

~~~text
GitHub ZIP → extracted folder → open it locally in Codex / Claude Code
                                            ↓
                              new project / chat / task
                                            ↓
            README + AGENTS.md/CLAUDE.md + TODO_FOR_AI.md
                                            ↓
AI agent ↔ allowed project folder (the single source of data)
  ├─ materials in Положите_сюда + interview → knowledge base (confirmed facts) → profiles
  ├─ search → verified companies/vacancies/routes → unique records
  ├─ documents and plan → CV/Anschreiben → preparation / permitted sending
  ├─ mail → replies/DSN → journal → daily and monthly report
  ├─ updating local data and generating the statistics page from the template
  └─ a question to the user when new data / a decision / access is needed
                                            ↓
                  local read-only HTML page
                  (year → month → day; sorting by date and result)
~~~

### Component boundaries

1. **The agent** searches, keeps records, prepares documents and reports and performs permitted mail actions, visibly in its chat.
2. **The folder** is the only data store: one JSONL journal per person in monthly segments holds the events, including the shared quota; JSON files are views rebuilt from it (ARCHITECTURE.md, DATA_CONTRACT.md).
3. **Instructions**: `README.md` for the person, `AGENTS.md`, `CLAUDE.md` and `TODO_FOR_AI.md` for the agent, which never assumes an earlier chat is available.
4. **The knowledge base**: one Markdown file per person, `База_знаний/Жизнеописание.md` (section 4.6), readable and correctable by the person.
5. **The statistics page**: a template copied unchanged per profile; the agent writes only its data file (section 10.5).
6. **Scheduling**: a scheduled task of the agent, if offered, or a new chat; the page never starts the agent.
7. **Access**: folder, web search, Gmail and Computer Use are switched on separately and only when needed.

## 4. The person's profile: the knowledge base and the interview

### 4.1 Import and confirmation

The person fills the five intake folders (section 4.6) or is interviewed. Every extracted fact is written as proposed, with its file and place; the person accepts, corrects or rejects it. A self-assessment is never shown as a certificate.

### 4.2 Questionnaire sections

The questionnaire is an interview in the chat, one topic at a time, spoken or typed; any topic can be skipped. Topics: contacts and what may appear in a CV; languages of the materials (`cv_language`, `cover_letter_language`, `email_language`, `report_language`, each chosen separately, never guessed); an optional report template; goals (job, Ausbildung, Praktikum, Probearbeit, temporary work); each position held; education, courses, licences and certificates; languages with levels; skills; projects; strengths as real situations; conditions (home, radius, transport, journey limits, start date); cover-letter motivation; and which files and references may be used. Answers are saved after every topic (TODO_FOR_AI.md, Part A, A3–A6).

### 4.3 Safety of biographical data

Religion, family status, health, nationality, age and photos are not asked for; if offered, they are marked sensitive and kept out of CVs unless the person chooses otherwise (DATA_CONTRACT.md §3a, §5). Local storage is not offline processing: a cloud agent's provider may see what it reads, so consent comes before the first reading of personal originals. Everything written starts as `proposed`; only the person's confirmation makes it `confirmed`.

### 4.4 How the CV is built

A CV is a projection of the knowledge base for one vacancy: requirements are matched to confirmed facts (“requirement → confirmed fact → source → where used”), gaps are shown, and nothing is invented. A photo is optional.

### 4.5 Basis for the content of the interview

Europass is one reference for completeness: education, experience, languages, digital skills, projects, achievements, plus tasks and results per position, tools, evidence and STAR examples. It is a reference, not a form.

### 4.6 Where the person puts materials, and the knowledge base file

The package contains a ready folder `Локальные_данные/Положите_сюда/` (“put here”) with five subfolders and a short README in each. It is the only place where the person has to put anything by hand:

| Folder | What the person puts there |
|---|---|
| `1_Мои_документы` (my documents) | CVs of any version, diplomas, certificates, references, official letters, a portfolio, samples of own letters; PDF, DOCX, TXT, photos and scans; no sorting or renaming |
| `2_Рассказ_о_себе` (my story) | The person's story in their own words: a transcript of a voice recording, notes, answers to the questions of `Вопросы_для_рассказа.md` (shipped in this folder); the agent also saves interviews here word for word as `Интервью_<date>.md` |
| `3_Шаблон_отчёта` (report template) | Only if the person has their own report sample |
| `4_Шаблон_резюме` (CV material) | Everything about the person's CVs in any format, current and old; read only; the agent prepares drafts from it and the template the person names |
| `5_Шаблон_сопроводительного_письма` (cover letter material) | Everything about the person's cover letters in any format; read only; the same rule as folder 4 |

The folders can be filled before the first run or left empty; the agent only reads them. A second person gets a subfolder with their name in `Положите_сюда`, with the same five subfolders.

**Preparing the story by voice.** Either outside the project, in any Claude or ChatGPT voice chat using `Вопросы_для_рассказа.md` and asking for a word-for-word text file for `2_Рассказ_о_себе`, or inside the project, where the agent holds the interview and saves every answer word for word.

**The knowledge base.** From the folders and the interview the agent writes `Локальные_данные/persons/<person_id>/База_знаний/Жизнеописание.md` in a fixed format (DATA_CONTRACT.md §3a), shown section by section for confirmation. It is in the person's language and is the single source for all of that person's search profiles.

**The first setup in order** — story, documents, knowledge base, gaps, confirmation, search settings (`profiles/<profile_id>/profile.json`), mail if wanted — is in TODO_FOR_AI.md, Part A. Templates: the sources stay unchanged and a checked Word working copy is used only after approval ([Application templates](OPERATING_REQUIREMENTS.md#application-templates)).

## 5. Geographic search and the shared database

The person chooses the starting point, the radius, the means of travel (car, train, bus / tram, bicycle, on foot; “public transport” means train and bus / tram), journey time, transfers, walking, evening return and priority towns. Straight-line distance and the real route are both shown. Nearby comes first: journey time only filters out unsuitable options and never pushes a closer company down for a distant town; the area is widened only after the nearby zone is checked.

Sources are employers' websites, official job portals and services whose terms allow it; each result keeps its URL, source, check time, branch, application channel and confidence. A list is never claimed to be complete. Duplicates are found by domain, legal name, branch and parent company; a company already in the register is not applied to again without the person's decision. The company card `Company.md` keeps contacts, requirements, the route (or “route not verified”) and the history, each with source and date (TODO_FOR_AI.md, Part C, “Search and targets”).

## 6. Folders and the application package

All working data stays inside the extracted folder, in `Локальные_данные/`, which Git ignores; the full tree is in ARCHITECTURE.md §3. The package root holds `README.md`, `USER_GUIDE.md`, `AGENTS.md`, `CLAUDE.md`, `TODO_FOR_AI.md`, `OPERATING_REQUIREMENTS.md`, `AI_BUILD_SPEC.md`, `ARCHITECTURE.md`, `DATA_CONTRACT.md`, `ACCEPTANCE_TESTS.md`, `PROJECT_OVERVIEW.html`, the `overview_*.html` pages, `docs/`, `assets/`, `dashboard_template/`, `examples/` and `.gitignore`.

Each application has its own folder `Applications/<YYYY>/<MM_Month>/<NNN_Company_City_Role>/` with `Company.md`, the CV and cover letter as DOCX and PDF (`Resume_v001`, `CoverLetter_v001`), `EmailText_<language>.txt`, `EMAIL_TO_SEND.txt`, an optional `ReviewTranslation_<language>.txt` (“not for the employer”), `Status.txt` and `Replies.txt`. The folder is not moved when the plan changes; paths stay relative and inside the root (DATA_CONTRACT.md §2). A non-e-mail vacancy gets a package for its channel; no address is ever invented.

**Cover letter (R12).** Every application has its own cover letter, attached as a PDF with the CV: TODO_FOR_AI.md, Part C, “Cover letter (R12)”.

**E-mail text and languages (R13).** The vacancy's language decides the language of the e-mail, CV and letter; the person reviews a full translation in `languages.review_language`: TODO_FOR_AI.md, Part C, “E-mail text (R13)”.

**Dates (R07).** The plan is the only source of the send date: TODO_FOR_AI.md, Part C, “Dates (R07)”, and DATA_CONTRACT.md §16.

**EMAIL_TO_SEND.txt (R20).** The UTF-8 manual-send file of every ready package, generated from the approved e-mail text: TODO_FOR_AI.md, Part C, “Manual email fallback (R20)”.

## 7. Scheduling, Gmail and control of sending

### 7.1 The queue

The agent keeps the queue as data in the folder. JobPilot sends at most **44 CV submissions per person per calendar month**, shared by all of that person's profiles; only JobPilot-managed submissions count, and a package sent by hand through `EMAIL_TO_SEND.txt` still counts. The person states in their own words how the month is spread (`sending_rule_statement`); from it comes the daily cap `max_per_day`, 1 to 44. A CV submission is refused with `DAILY_LIMIT` when the `cv_submission` sends already started that local day (failed attempts included) have reached `max_per_day`; for a Gmail scheduled message the day of its slot counts, so a whole month can be scheduled in one session. Every profile starts in `draft_only`; sending needs `approval_per_message` or `scheduled_send_with_profile_consent`, switched on by the person. When the month's slots are used up, the remaining targets wait; before they move to the next month, each vacancy is checked again and the person agrees. Details: DATA_CONTRACT.md §4, §5 and §13. A cap does not guarantee that a provider will not treat mail as spam; tests use synthetic mail only.

### 7.2 Gmail through an approved connector or the built-in browser

The person chooses, after the agent has checked what works: an official, approved Gmail connector (its own sign-in, read and send permissions checked separately) or the built-in browser of ChatGPT Desktop / Codex, where the person signs in personally. Nothing else is installed, and secrets are never stored. See the official help on the [built-in browser](https://help.openai.com/en/articles/20001277-using-the-built-in-browser-in-the-chatgpt-desktop-app) and [Computer Use](https://learn.chatgpt.com/docs/computer-use). The built-in browser cannot upload files (OPERATING_REQUIREMENTS.md §4), so the person attaches the files or uses the **manual fallback**: copying `EMAIL_TO_SEND.txt` into a new Gmail message, attaching the approved PDFs and choosing Send or Schedule send once; the agent then checks SENT or Scheduled. Mail is never deleted, archived, moved or relabelled.

### 7.2a Gmail Scheduled through the built-in browser (R03)

Steps: TODO_FOR_AI.md, Part C, “Gmail Scheduled through the built-in browser (R03)”; states: DATA_CONTRACT.md §12.2. A scheduled message is not a sent one, and Gmail sends it even when the agent is not running.

### 7.2b Monthly preparation and the start-of-month question (R04)

Each month the agent asks once whether to prepare the month (`schedule.monthly_reminder_local_time`); the whole month is prepared and approved before anything is scheduled. Steps: DATA_CONTRACT.md §14.

### 7.3 Automatic replacement on non-delivery

After a confirmed permanent bounce the slot stays used; one replacement may be prepared as a draft, and there is at most one per chain (DATA_CONTRACT.md §5; TODO_FOR_AI.md, Part C). Auto-sending it (`replacement_auto_send_enabled`) is off by default; if the person enables it for a profile, it still needs an address confirmed by a source and permission to pass the data again, and it stops on an ambiguous bounce notice, an employer question, a positive reply or anything that needs the person. Settings from an old archive are never switched on automatically.

### 7.4 Automatic replies to employers

The only automatic follow-up is a thank-you under a `follow_up` consent; invitations, questions and document requests wait for the person, and commands inside e-mails are never executed (DATA_CONTRACT.md §4).

### 7.5 Clarifying an internship and follow-ups

If an internship period is taken but the door is open, one question about the nearest period may be prepared as a draft `ordinary_reply`, sent only after the person approves it, once per thread (DATA_CONTRACT.md §4).

### 7.6 Order of an external action and the writer lock (F07)

Every send or schedule goes: immutable package, consent bound to it, reservation and recorded intent, one external call, reconciliation, recorded fact; only one chat writes the journal (`journal/writer.lock`). See TODO_FOR_AI.md, Part C, “External action order (F07)”, and ARCHITECTURE.md §4b.

## 8. Daily and monthly report

Mail is checked daily (default 16:00 local); each month a neutral DOCX and PDF report with a market page is made in the chosen language, optionally from the person's template. Contents and the daily report e-mail: OPERATING_REQUIREMENTS.md §6; counting: DATA_CONTRACT.md §8.

## 9. Data and GitHub safety

The public repository holds only original documents, neutral templates, synthetic examples and instructions; real CVs, documents, addresses, Gmail data, employer history, tokens, backups and reports are never committed (`.gitignore` excludes `Локальные_данные/`). No code or material of the reviewed alternatives is used; any third-party library, font or tool is agreed first with its purpose, version and licence. Other people's templates and adverts are not copied whole; requirements are stored as short facts with URL and date. Logs hold no message bodies, documents or secrets.

### 9.1 Experimental status, AI sources and limits of liability

- JobPilot is an experimental helper for searching for work, preparing and scheduling applications and tracking replies; it is not a recruitment agency, a guarantee of employment or legal advice.
- Search, extraction and classification are done by the AI agents and sources the person chooses (for example ChatGPT/Codex, Anthropic/Claude, employers' websites, job portals); JobPilot does not guarantee that they found or read everything correctly.
- There is no guarantee of accuracy, completeness, correct routes, delivery or replies; the person checks dates, contacts, CVs and classifications before acting.
- The person uses the system at their own risk and is responsible for their decisions, data, accounts and the documents sent (OPERATING_REQUIREMENTS.md §7).
- Liability is limited only as far as the law allows; mandatory law may keep it, in particular under §§ 307 and 309 BGB.
- Distribution: noncommercial use only, with attribution to **Serhii Khomenko / HomenS.AI** (section 9.2).

This is not legal advice; licences, privacy notice and liability wording are checked with a lawyer before a public release.

### 9.2 License model and mandatory attribution

For the project's original materials a separate standard license is chosen by type of work:

- **Source code, including HTML/CSS/JavaScript, interface markup / scripts and original software components:** PolyForm Noncommercial License 1.0.0. It gives the right to use, modify and distribute copies for noncommercial purposes, observing its terms and notices. Commercial use needs separate written permission of the author.
- **Text documentation, the specification, instructions and other original materials that are not code:** Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0). On distribution the attribution, the link to the license and the information about changes are kept. Creative Commons recommends not applying CC licenses to software, which is why code is separated from documentation.
- **The name HomenS.AI, the logo, brand marks and the website:** are not included in a permission to rename someone else's product or to create the impression of an official version or of the author's approval. Reuse of brand materials is defined by a separate policy; the absence of a registered trademark is not assumed either way.

This is a public **noncommercial source-available project**, not open source in the sense of the Open Source Definition: a ban on commercial use is incompatible with the OSI criterion of freedom to use in any field of endeavour. Publishing the source on GitHub does not lift this restriction.

Mandatory attribution measures:

1. Every source file written for the project starts with a readable notice of the author, the project, the year and the link to its license; it is not removed when copying or reworking. HTML pages also show a visible link to the author in the footer or an “About” section. If one file combines code and documentation text (for example an HTML page), the header states which license applies to each.
2. The repository root holds `LICENSE` for code, `LICENSE-DOCS` for documentation, `NOTICE` with the author's details and a short `THIRD_PARTY_NOTICES` only when separately agreed dependencies appear.
3. `LICENSE` includes the mandatory PolyForm line `Required Notice: Copyright (c) 2026 Serhii Khomenko. HomenS.AI JobPilot. https://homensai.com/`, and a copy of the license or its official URL is passed with this line to every recipient of a copy. `NOTICE` keeps the same information.
4. Published modifications keep the original author and license, mark the fact and the author of the changes, and are not presented as an official HomenS.AI build. Removing or replacing authorship is not allowed.

Before a GitHub release the author checks the coverage of files and the ownership of rights, approves the exact license files and checks that all logos, fonts, dependencies and other materials have compatible rights. The licenses are not applied to other people's materials or to user data.

## 10. Installation and the role of the AI assistant

The step-by-step guide exists as `USER_GUIDE.md` and `overview_install.html` (Russian: `docs/ru/overview_install.html`), with the same content, updated together in every release. It assumes a clean Windows without Git, Python or Node: the archive comes from **Code → Download ZIP**, and every step has one action, what should appear on the screen and what to do on an error. The agent's first instruction is `TODO_FOR_AI.md`. Public instructions forbid using code from the projects of section 14; any third-party dependency is first proposed to the author with its purpose, version and licence.

### 10.1 Installation order: the agent, then the archive, then the connection

1. **The agent.** Install ChatGPT Desktop, sign in and check that Codex is available. The basic configuration is a paid ChatGPT Plus plan or a suitable higher plan with Codex; Codex is also listed for the Free and Go plans, but work on those plans is not confirmed here. At the check of 8 October 2026 the official [pricing page](https://learn.chatgpt.com/docs/pricing) showed 20 USD per month for Plus; prices, limits and access change, so check them and [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan) before paying. Claude Code compatibility is not confirmed.
2. **The project folder.** Extract the ZIP into its own folder; `README.md`, `AGENTS.md`, `TODO_FOR_AI.md`, `dashboard_template` and `Локальные_данные\Положите_сюда` must lie directly in it.
3. **Connection and the first start.** Open the folder as a local project, create a chat in the local environment, switch on `Ask for approval` and run the starting prompt in draft-only mode.

A cloud ChatGPT Project is not a local project: a path written in a chat gives no file access. Codex and Claude Code are alternatives with their own permission and mail settings; links and menu names are checked before every release. An agent guiding the installation names the step and the expected result, waits for confirmation, and never proposes installing development tools.

### 10.2 Codex permissions and folder access

Access is granted only to the extracted root, with `Ask for approval` or an equivalent safe mode; never administrator rights or the whole disk. All data goes into `Локальные_данные/`; if write access is missing, the agent names the narrow permission it needs. Network, accounts, files and computer control are separate permissions, checked in the interface or with `/status`.

### 10.3 Connect Gmail through an approved connector or the built-in browser

The person connects Gmail personally in the platform's own screens (section 7.2); the agent records only the account address, starts with reading only, and checks attachment and Scheduled capabilities. Reading permission is not permission to send. Steps: USER_GUIDE.md; the agent's part: TODO_FOR_AI.md, A8.

### 10.4 Daily and monthly schedule

The daily mail check (default 16:00 local) and the monthly reminder are real scheduled tasks of the agent, verified at setup (DATA_CONTRACT.md §14, §15). Without them, or with the computer asleep, the person starts the check by hand; Claude Code scheduling is unverified. See [Scheduled tasks](https://learn.chatgpt.com/docs/automations). Gmail scheduled messages still send without the agent.

### 10.5 The mandatory static statistics page

`dashboard_template/index.html` ships with a synthetic `summary.js` (a demo), so it opens with a double click. For a real profile the agent copies the page **unchanged** next to a `summary.js` it writes (`window.JP_DATA = {…}`, `demo: false`), so a data mistake cannot break the page; the menu `Локальные_данные/dashboard/index.html` links to `dashboard/profiles/<profile_id>/index.html`. The page needs no server or external library and reports a missing or damaged data file instead of showing wrong numbers. It shows **year → month → day** with summaries (sent, replies, results, delivery errors, quota “used / reserved / left out of 44”) and daily event tables, sorts by date or result using real timestamps (not `DD.MM.YYYY` strings), filters by year, month, result, company, city and role, and switches language with the switch or `?lang=ru`. It saves nothing but the theme, sends nothing and changes no records; no message bodies, CVs or addresses go into it. Format and write procedure: DATA_CONTRACT.md §9.

### 10.6 Computer Use

Computer Use is enabled only when a task needs the screen, and only for the needed application (on Windows the window must be visible); never to bypass sign-in, Gmail confirmations, the sandbox or consent. Before the first working cycle the person checks: the right folder is open, permissions are minimal, the Gmail account is right, no secrets are in the folder, sending matches the mode, tests use synthetic data, and they know what is passed to a cloud model.

## 11. Safe readiness criteria

- It is impossible to open another profile's document or mail by accident; this is confirmed by negative scenarios checked by hand.
- The source, the date of checking, the confirmation status and the version are linked to every significant fact.
- An employer duplicate and a branch are checked; a repeated application is not created without a reason.
- The dates and text of the package match; DOCX/PDF render without clipping and with correct fonts.
- The import of source archives is read-only first and provides a mapping / error report.
- Gmail does not change labels / archive / deletion; deduplication is checked by a repeated run.
- The static `Локальные_данные/dashboard/index.html` opens with a double click without a server and network; sorting by years / dates / results, month and day groups, the stale-data marker and the absence of writes and network requests are verified.
- No real email is sent in tests; sending needs an approved profile mode, the exact recipient and attachments.
- An automatic reply to a rejection and automatic preparation of a replacement do not fire on automatic, temporary or ambiguous messages.
- All events and report results can be linked to the original Gmail Message-ID and to the vacancy sources.
- The limit of 44 actual submissions with a CV per person per calendar month cannot be bypassed through a second profile / chat, a new address, a replacement after a bounce or another channel; the 45th sending is blocked and the queue does not create a batch mailing. The shared quota under parallel tasks and a safe stop when the journal is unavailable are checked.
- A backup can be restored; the GitHub repository is scanned for personal data and secrets.

For every criterion the corresponding scenarios of ACCEPTANCE_TESTS.md are run and the evidence is kept. Until a scenario is performed by hand, its status is NOT RUN; checking links in the documentation does not mean the mail or the protective mechanism is ready.

## 12. Stages of work

The open work is listed in [dev/REMAINING_WORK.md](dev/REMAINING_WORK.md). Readiness is shown only by the hand-run scenarios of [ACCEPTANCE_TESTS.md](ACCEPTANCE_TESTS.md), first on synthetic data and only then with Gmail in read mode. Sending is enabled only after those checks.

## 13. Sources for the profile and platform requirements

Checked on 7 October 2026. These sources confirm the requirements and tools; they are checked again before a release.

- PolyForm Noncommercial License 1.0.0, the official text for software code: https://polyformproject.org/licenses/noncommercial/1.0.0
- Creative Commons Attribution-NonCommercial 4.0 International, the official text for documentation: https://creativecommons.org/licenses/by-nc/4.0/
- Open Source Initiative, Open Source Definition, criterion no. 6: https://opensource.org/osd
- Creative Commons FAQ, why CC licenses are not recommended for software: https://creativecommons.org/faq/#can-i-apply-a-creative-commons-license-to-software

- Europass, sections of a personal profile: education, experience, languages, digital skills, projects, achievements and other skills: https://europass.europa.eu/en/how-complete-my-europass-profile
- Europass, a profile as the source for several relevant CVs; tailoring a CV to a vacancy: https://europass.europa.eu/en/create-europass-cv
- Make it in Germany, the federal portal: https://www.make-it-in-germany.com/en/working-in-germany/job/application
- OpenAI, downloading ChatGPT Desktop / Codex: https://chatgpt.com/download/
- OpenAI Learn, Quickstart: installation and first launch of Desktop: https://learn.chatgpt.com/docs/quickstart
- OpenAI, the split of Chat/Work/Codex and local permissions: https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex
- OpenAI Learn, Codex projects and adding a local folder: https://learn.chatgpt.com/docs/projects
- OpenAI Learn, permission modes and Ask for approval: https://learn.chatgpt.com/docs/permission-modes
- OpenAI Learn, sandbox / approval mode, writable roots and the `/status` check: https://learn.chatgpt.com/docs/sandboxing ; https://learn.chatgpt.com/docs/config-file/config-reference
- OpenAI Learn, Windows sandbox: https://learn.chatgpt.com/docs/windows/windows-sandbox
- OpenAI Learn, Computer Use: installation, allowing applications and Windows foreground limits: https://learn.chatgpt.com/docs/computer-use
- OpenAI Learn, MCP setup and OAuth in Codex Desktop: https://learn.chatgpt.com/docs/extend/mcp
- OpenAI Learn, Codex Local / Worktree / Cloud environments: https://learn.chatgpt.com/docs/environments/modes
- OpenAI Learn, scheduled tasks; local project requirements and sandbox behavior: https://learn.chatgpt.com/docs/automations
- OpenAI Learn, plugins / connectors and app action permissions: https://learn.chatgpt.com/docs/enterprise/apps-and-connectors
- Anthropic, Claude Code for Windows and installation: https://code.claude.com/docs/en/getting-started
- Google Gmail API, overview and mail actions: https://developers.google.com/workspace/gmail/api/guides
- Google Gmail API, OAuth scopes: https://developers.google.com/workspace/gmail/api/auth/scopes
- Google Gmail API, OAuth flow: https://developers.google.com/workspace/gmail/api/auth/web-server
- Google Gmail API, reading threads: https://developers.google.com/workspace/gmail/api/guides/threads
- Google OAuth verification: https://support.google.com/cloud/answer/13463073?hl=en
- German Civil Code (BGB), § 307 control of standard terms: https://www.gesetze-im-internet.de/bgb/__307.html
- German Civil Code (BGB), § 309 prohibited liability exclusions in standard terms: https://www.gesetze-im-internet.de/bgb/__309.html
- German Copyright Act (UrhG), § 31 grant of rights of use: https://www.gesetze-im-internet.de/urhg/__31.html
- The author's website and GitHub profile (to be checked for currency before publication): https://homensai.com/ ; https://github.com/HomenSAI

## 14. GitHub alternatives — market research only, not sources of code

Checked on 7 October 2026 against public pages and READMEs. This is a short comparison of declared functions, not an audit of security, performance or operability. The search is not exhaustive. The repositories were not downloaded or run; their source code was not used. The list is given only to understand the market and is not a list of candidates for forking, integration or choosing a base code.

| Project | What already overlaps with the idea | Important limit for our scenario |
|---|---|---|
| [Career OS](https://github.com/Shanupower/career-os) | Local-first discovery, scoring, tailoring, outreach and application CRM; the repository states AGPL-3.0. Close in the breadth of the described process. | The public description does not separately confirm German routes, per-profile Gmail and Message-ID history. Only a market reference; no code is used. |
| [CareerPulse](https://github.com/tcpsyn/CareerPulse) | Self-hosted discovery across several declared job boards, AI matching, profiles, CV and Anschreiben DOCX/PDF, a scheduler and a queue with approval. | The public description does not confirm rules for cold approaches to companies, German reporting and Gmail history. Only a market reference; no code is used. |
| [JobSync](https://github.com/Gsync/jobsync) | A self-hosted tracker, CV import, AI review / match, vacancy discovery, contacts and integration with agents; the repository states MIT. | The public description does not confirm the needed Gmail-thread loop and neutral monthly reporting. Only a market reference; no code is used. |
| [ApplyTrail](https://github.com/rutuu/ApplyTrail) | A local Gmail tracker: reading mail, classifying replies / interviews / rejections, manual correction and CSV; the repository states MIT. | The public description concentrates on the mail journal. Only a market reference; no code is used. |
| [ApplyKit](https://github.com/wihlarkop/applykit) | Local-first profile import, CV / cover letter per vacancy, evidence match and application history; the repository states MIT. | The public description does not claim the whole company registry and geo-routes. Only a market reference; no code is used. |
| [SimplyApply](https://github.com/artbyjazi/simply-apply) | Local search / CV adaptation, DOCX/PDF and checks against unconfirmed facts; the repository states AGPL-3.0. | The public description stresses CV tailoring and the apply link. Only a market reference; no code is used. |

### Conclusion on the alternatives

In the reviewed sample there are tools with similar separate functions. This does not mean that the idea or the implementation of this project was taken from them: the description of the product and the requirements were formulated by Serhii Khomenko from the author's own workflow. The overview is limited to public descriptions and does not claim to prove the legal uniqueness of the idea.

The decision is fixed: Serhii Khomenko develops the system independently, from scratch, from the author's own specification. The listed projects are not used as a code base; their sources, components, templates, design, architecture and prompts are not forked, integrated or adapted. These materials remain only a comparative market study. Ordinary dependencies of the implementation are agreed separately and openly and are not borrowing from the listed projects.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com · [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
