# HomenS.AI JobPilot — step-by-step user guide

[English](USER_GUIDE.md) | [Русский](docs/ru/USER_GUIDE.md)

**Version 1.5.1 · 2026-10-09** · The same guide is available as a web page with a menu: [overview_install.html](overview_install.html).
**For:** Windows and ChatGPT Desktop with Codex. Claude Code is an alternative; its full step-by-step setup is not written yet.

The setup takes about 30–40 minutes. Do the steps in order. Every step says what you should see on the screen, so you always know whether it worked. No Git, Python or other developer tools are needed on your computer.

## What comes first: the agent or the archive?

First the agent, then the archive, then you connect the two. The agent comes first because its availability depends on your account: it is better to find out now than after you have prepared everything else. The archive is only a folder of files; it becomes useful when the agent opens it.

| Step | What to do | How to do it | Why |
|---|---|---|---|
| 1 | Set up the AI agent | Install ChatGPT Desktop, sign in and verify that your current plan gives access to Codex; check current terms and price on the official site | The agent carries out the written workflow |
| 2 | Download the project | Download the current ZIP from the official HomenSAI repository/release page and extract it into a new local folder | The project instructions and templates need a stable folder |
| 3 | Open the local project | In Codex, create/open a local project and select the extracted root folder | A chat with only a pasted path cannot read or update the folder |
| 4 | Start setup | Create a setup chat (for example, “Job Search”) and ask the agent to read the project instructions | The agent will explain the next steps and ask for missing choices |
| 5 | Allow only the project folder | Grant the necessary folder access; keep unrelated folders and broad computer permissions disabled | The agent should work only in the intended workspace |
| 6 | Add your personal information | Copy documents into the named folders, or give the agent one selected document and use the document-review prompt; confirm facts before they enter your profile | The CV and letter must rely on facts you have checked |
| 7 | Set your search and languages | Choose role, location, radius, transport, travel limits and the language of the CV, cover letter, email and report | The agent needs your actual search boundaries |
| 8 | Consider a dedicated Gmail | The author recommends a separate job-search account, for example `first.last.job@gmail.com`; this is optional | It keeps job correspondence separate from personal mail |
| 9 | Connect Gmail, if wanted | Choose an existing approved connector or the built-in browser, sign in yourself, confirm the active address and test reading access before separately enabling sending | The agent must use the intended account; login alone is not consent to send |
| 10 | Prepare the monthly plan | At the beginning of each month, answer whether to prepare the month's search, packages and schedule | Searching and preparing ahead prevents last-minute work |
| 11 | Review every package | Read the recipient, subject (maximum 50 characters), email text, CV, cover letter and attachments; explicitly approve the exact package and slot | Your approval applies only to the reviewed version |
| 12 | Choose scheduled or manual mail | Verify each approved message in Gmail Scheduled; if the browser cannot attach files, use `EMAIL_TO_SEND.txt` and attach them yourself | A prepared local plan is not proof that Gmail saved a scheduled email |
| 13 | Enable daily monitoring | Default check: every day at 16:00 in your time zone; confirm that the installed agent really registered the recurring task | New replies and delivery notices need regular review |
| 14 | Configure report delivery | Optionally approve a daily snapshot to your address or the same connected Gmail; choose report language and content | You can check progress while away from the computer |
| 15 | Check readiness and keep backups | Open the local readiness and statistics pages; after mail operations, verify that a private archive was created | You can see missing setup items and recover local history |

> **Package status.** This is an experimental documentation-and-agent workflow. Statistics-page checks do not prove the complete Gmail/agent cycle. Verify the repository and release version before downloading: [HomenSAI/homensai-jobpilot](https://github.com/HomenSAI/homensai-jobpilot).


## What you need

- A Windows computer with internet access.
- ChatGPT Desktop with Codex available. The project recommends a paid ChatGPT plan for regular use, but access and usage limits change; check the official plan information before purchase. As checked on 9 October 2026, Codex is included on ChatGPT Free/Go as well, with plan-dependent limits; Plus is listed at $20/month in the US.
- A ZIP archive from the official HomenS.AI JobPilot repository.
- A dedicated local folder for extraction and subsequent work.
- Your CV, diplomas and certificates in any format, if you have them (see “Prepare your materials” below) — or just your voice: you can tell the agent about yourself and it writes everything down.
- Your chosen languages for application documents and reports.
- A Gmail connection through a tool supported by your installed Codex version, if you want email tracking.

Local file access requires a **local Codex project** opened on your computer. An ordinary cloud ChatGPT project does not by itself provide access to a folder on your computer.

Current official information: [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan) · [ChatGPT Plus](https://help.openai.com/en/articles/6950777-what-is-chatgpt-free-plan). API usage is billed separately. Recheck these pages because availability, limits and prices can change.

## Prepare your materials — you can do it first

The project ZIP contains a ready folder `Локальные_данные\Положите_сюда` (“put here”) with three subfolders. It is the only place where you have to put anything by hand. Fill it right after step 2, or gather the files now and copy them later. If you prepare nothing, the agent asks you everything itself (step 7).

| Folder | What to put there |
|---|---|
| `1_Мои_документы` (my documents) | CVs of any version, diplomas, certificates, references, official letters, a portfolio, samples of your own letters. PDF, DOCX, TXT, photos and scans. No sorting or renaming needed |
| `2_Рассказ_о_себе` (my story) | Your story in your own words: a transcript of a voice recording, notes, answers to the questions in `Вопросы_для_рассказа.md` (it lies in this folder) |
| `3_Шаблон_отчёта` (report template) | Only if you have your own report sample. Otherwise leave it empty |

Two more folders, next to `Положите_сюда`, hold your **templates**:
- `Локальные_данные\Resume` — your resume. Put a Word (.docx) or PDF file here. A PDF is converted by the agent into a Word file saved in the same folder. No file yet? The agent creates a neutral resume during the first setup.
- `Локальные_данные\CoverLetter` — your cover letter, in the same design as the resume. The same rules apply.

Every application the agent prepares gets its own folder, `Локальные_данные\Applications\<year>\<NN_Month>\<NNN_Company_City_Role>`, with the company data, the resume and letter, the e-mail text and a status file (`Status.txt`) that records each step: prepared, sent, waiting, rejected, invited.

**Tell your story by voice.** (1) Open a chat with Claude or ChatGPT and switch on voice mode (the microphone icon). (2) Say: “I will tell you about myself for my CV. Ask me questions one topic at a time. At the end write down my story word for word, adding nothing, as a text file.” You can paste the questions from `Вопросы_для_рассказа.md`. (3) Talk as long as you want, in parts, on different days, in any order; if you do not remember something, say so. (4) Save the text file into `2_Рассказ_о_себе`. **Or prepare nothing:** at step 6 start the agent in your project folder and say that you want to tell about yourself, by voice or in text; it asks the questions one topic at a time, saves your answers word for word and writes your knowledge base from them.

The agent only reads these folders; it never changes, moves or deletes your files. Everything stays on your computer and is not published (the folder `Локальные_данные` is excluded from Git). From your files and your story the agent writes your **knowledge base**: one file with your whole life story as facts (`Локальные_данные\persons\<your id>\База_знаний\Жизнеописание.md`). It shows you every fact for confirmation, and CVs and letters use only confirmed facts.

## Part 1 · The agent

### 1. Install ChatGPT Desktop and sign in

1. Open the [official ChatGPT download page](https://chatgpt.com/download/).
2. Download and install the Windows version.
3. Launch the application and sign in to your ChatGPT account.
4. Choose **Codex** in the mode selector. Do not select a cloud ChatGPT project or Work for this workflow: it requires an open local folder.

If Codex does not appear in the interface, check whether the feature is available for your account and organization. Do not install unofficial builds. OpenAI describes installation and first launch in its [Quickstart](https://learn.chatgpt.com/docs/quickstart).

**You should see:** the main window with your account name and a mode selector that includes Codex.

## Part 2 · The project folder

### 2. Download and extract the project ZIP

1. Open the project repository on GitHub in your browser: <https://github.com/HomenSAI/homensai-jobpilot>. Use the release archive offered there once the first release is published.
2. On the repository page, choose **Code → Download ZIP**.
3. In File Explorer, create a folder such as `Documents\HomenSAI-JobPilot`.
4. Extract the ZIP into that folder. Check that it contains `README.md`, `USER_GUIDE.md`, `AI_BUILD_SPEC.md`, `AGENTS.md`, `CLAUDE.md`, `TODO_FOR_AI.md`, and `dashboard_template`.
5. Do not extract the archive into a Windows system folder. If you move the working folder after setup, update its path in Codex.

The extracted folder will hold both project instructions and local working data. Personal profiles, CVs, emails, OAuth tokens, and user statistics must not be published on GitHub.

**You should see:** in the folder itself, not inside another folder: `README.md`, `USER_GUIDE.md`, `AI_BUILD_SPEC.md`, `AGENTS.md`, `CLAUDE.md`, `TODO_FOR_AI.md`, `dashboard_template` and the folder `Локальные_данные\Положите_сюда` with three subfolders.

## Part 3 · Connect the agent to the folder and start

### 3. Create a local project and select its root folder

1. Open **Projects** in Codex.
2. Choose the command for adding a local project or folder, such as **Add local project** or **Open folder**. Its exact name depends on the application version.
3. Select the full path to the extracted project folder, for example `C:\Users\YourName\Documents\HomenSAI-JobPilot`.
4. If you have already created a project, open its menu → **Edit project → Add folder**, select the extracted folder, and choose **Make primary**.
5. Name the project, for example **Job search**.
6. Confirm that the primary folder is the folder containing the JobPilot files, not an individual file or a parent folder containing unrelated data.

Simply telling the chat “work at path `…`” is not enough. The folder must actually be opened or attached as the project's local folder. Do not create only an ordinary ChatGPT Project without an attached local folder. See the official instructions for [local projects and adding folders](https://learn.chatgpt.com/docs/projects).

**You should see:** the project in the list, with the folder that contains `README.md` as its primary folder.

### 4. Create a dedicated setup chat

1. Open your new local project.
2. Choose **New chat** inside the project.
3. Check that **Codex** and the local computer environment (**Local / This computer**) are selected, rather than Cloud or Worktree.
4. Name the chat, for example **Initial JobPilot setup**.

You can use separate chats for setup, searching, daily checks, and monthly reports. The project's file database and journal preserve state across chats; do not rely solely on one conversation's history.

**You should see:** a chat inside the project with “Local” shown next to the message box.

### 5. Configure Codex permissions

1. Open the permissions menu below the message composer.
2. Select **Ask for approval**. This mode gives the agent access to the current working folder and requests permission when an action crosses the configured boundary.
3. If the setting is unavailable, check **Settings → General → Permissions**. The approval mode is generally available; enable other modes only if needed.
4. Do not select **Full access**, run ChatGPT Desktop as administrator, or give the agent access to the entire drive.
5. If Codex requests access outside the project folder, pause and check whether that access is necessary. Grant only a narrowly scoped, one-time permission after understanding the action.
6. Web search, file access, email, and screen control are separate capabilities. Permission for one does not automatically enable the others.

Before working with local files, check the project name and primary folder again. Official explanations: [permission modes](https://learn.chatgpt.com/docs/permission-modes) and [sandboxing and access boundaries](https://learn.chatgpt.com/docs/sandboxing).

**You should see:** “Ask for approval” (or the equivalent) in the permissions menu, and the project folder as the working folder.

### 6. Make the first safe start

Type this into the new chat (or simply “Start”):

```text
Start. Read AGENTS.md and TODO_FOR_AI.md and lead me through the first run.
```

The agent loads its rules by itself (Codex reads `AGENTS.md`, Claude Code reads `CLAUDE.md`). It introduces itself, confirms the working folder, checks its tools and then asks you, one question at a time: your name and the language you prefer. Then it asks for your consent to read your personal materials and starts the first setup (step 7). Answer in your own words, by voice if your app has the microphone button.

**You should see:** the agent names the correct folder, explains in a few lines what will happen, says that it works in draft-only mode and asks its first question.

If the agent does not know what to do, or says that `AGENTS.md` or `TODO_FOR_AI.md` is missing: the folder is the wrong one or the archive is incomplete. Check steps 2 and 3. Do not ask the agent to invent the missing files.

## Part 4 · Your data, mail and the first queue

### 7. The first setup: the agent asks, you answer

From here the agent leads. There is no form: it asks one question at a time and saves every answer to files. The order is always the same:

1. **Consent.** Before it reads anything personal, it explains that a cloud agent may pass what it reads to its provider, and asks your consent. “Stored locally” does not mean “processed offline”. You can say no and start with an anonymized example.
2. **Your story.** It tells you where your story belongs: the folder `Локальные_данные\Положите_сюда\2_Рассказ_о_себе`. If you have none, it offers to prepare it right now, completely by voice: switch on the microphone and talk about your whole life. It does not interrupt and saves every word.
3. **Your documents.** It asks whether you have a CV, diplomas, certificates, course records or references. Put all of them into `1_Мои_документы` (photos and scans are fine) and say “ready”. No documents? Say so, and you continue.
4. **Analysis.** It reads everything and writes your knowledge base. Then it asks about what is missing, one topic at a time: certificates, courses, language levels, skills, real situations, the driving licence and a car.
5. **Confirmation.** It shows the facts section by section. For each say: *right*, *correct it* or *wrong*. It never invents experience, dates, certificates or language levels. A fact without a document stays valid, marked “self-reported”.
6. **The search.** It asks what we are looking for (job, Ausbildung, internship, Probearbeit, temporary work), which roles and industries, where you live, the radius in kilometres, how you get there (car, train, bus or tram, bicycle, on foot — any combination), how long the way may take, transfers, walking and the evening return, preferred towns, the languages of the CV, the letter, the email and the report (separately), how to spread the applications, and whether you have a report template (`3_Шаблон_отчёта`).
7. **Saved.** It repeats all your answers; you say “right”. The first setup is finished, and from now on it works from these saved files.

Never put passwords, one-time codes or OAuth tokens into any file. Private notes stay marked as sensitive and never go into a CV without your explicit choice. Check that `Локальные_данные/` is excluded from publication. Several search directions of one person share one limit of 44 submissions per month.

**You should see:** the file `Локальные_данные\persons\<your id>\База_знаний\Жизнеописание.md` with your life story as facts, each marked `confirmed` or `self-reported`, and the file `Локальные_данные\profiles\<direction>\profile.json` with your search settings. You can open and read both in any text editor.

### 8. Connect Gmail through an approved connector or the built-in browser

1. Ask the agent to list the mail options actually available in your Codex installation. Choose an existing official, approved Gmail connector or the built-in Browser; do not add an arbitrary server.
2. For a connector, follow its official sign-in flow. For Browser, ask: “Open https://mail.google.com in the built-in browser. Do not read or send anything yet; I will sign in myself.” Sign in to the Gmail account you chose for job search and complete Google verification yourself.
3. Click the Gmail profile icon and check the exact email address. Tell the agent which profile should use it.
4. For Browser, open **Settings → Browser → Agent permissions** and review access for mail.google.com. If your Codex version requires Computer Use, open **Codex → Plugins → Computer Use**, install/enable it if offered, and allow only the browser you need. Verify current menu names in the official [built-in browser](https://help.openai.com/en/articles/20001277-using-the-built-in-browser-in-the-chatgpt-desktop-app) and [Computer Use](https://learn.chatgpt.com/docs/computer-use) instructions. For a connector, verify the account and separate read/send permissions.
5. Start with reading only. Sending and Gmail Schedule send need separate approval. Do not allow deleting, Gmail-archiving, moving messages or changing labels.
6. The built-in browser cannot automate file uploads. A connector may support them, but verify this for your account. If not, attach the approved files yourself, check the visible attachment list and verify the final message in Gmail Scheduled or SENT. Never treat a click as proof.

If neither approved connector nor Browser can complete an action, use the manual fallback: open Gmail in a browser you choose, open File Explorer to the application's folder, then copy the recipient, subject and body from the package's `EMAIL_TO_SEND.txt` and attach the listed CV and cover letter. The agent does not store Gmail tokens or passwords in the project. Browser sessions can expire, so the account must be checked again when access is lost.

**You should see:** the Gmail address you intended in the profile menu. The agent starts in read-only/draft mode until you separately approve a specific package and schedule.

### 9. Prepare and review your first queue

1. Ask the agent to find companies/vacancies within your chosen radius and collect sources, contacts, requirements, and verification dates.
2. Review the records, duplicates, addresses, and whether the vacancies are current. Check actual routes for your selected mode of transport.
3. Ask for a tailored document package in the selected language, then check every date, fact, recipient, and attachment.
4. Review the queue and confirm dates/intervals. Do not enable bulk emailing.
5. The system allows no more than 44 actual CV submissions per person per calendar month. If the remaining allowance cannot be reliably verified, the agent must stop.
6. Use draft mode before sending anything. Sending is permitted only after the approved profile has been configured and the specific message checked; email service confirmations must not be bypassed.

If the agent reports “sending outcome unknown,” do not simply ask it to send again: first reconcile the attempt with SENT or the portal's confirmation. Changing an attachment or recipient requires a fresh review of a previously checked message. The default subject limit is 50 characters including spaces; this is a product rule, not an email service limit.

**You should see:** drafts in the month folders, and a queue with exact dates and a counter of remaining slots.

## Part 5 · Optional features and daily work

### 10. Enable screen control only if needed

Searching and managing local files do not normally require mouse control. If a particular task needs interaction with a browser or another window:

1. In ChatGPT Desktop, open **Codex → Plugins → Computer Use** and install/enable the component if it is available in your version.
2. Open **Settings → Computer Use** and allow only the necessary application.
3. On Windows, keep the controlled window visible on the active desktop.
4. Approve only actions you understand. Computer Use does not replace OAuth, folder access, or consent to send email.

The current official procedure is described under [Computer Use](https://learn.chatgpt.com/docs/computer-use). This capability is optional for the basic workflow.

**You should see:** the application you allowed in Settings → Computer Use, and nothing else.

### 11. Daily work and scheduling

For a manual check, open the local project, create a **Daily check** chat, and ask the agent to read the rules and perform the current safe plan item. Default check time is 16:00 local time. The agent updates the files and journal, then refreshes statistics and readiness. At the beginning of a new month it asks once whether to prepare that month's plan.

If your application supports scheduled tasks for a local project, verify a manual run first, then ask Codex to create a recurring task with the required time and time zone. Review its text and first result. For local files, the computer must be on, the application running, and the folder accessible. If scheduling is unavailable or unreliable, run the check manually. Current limitations are described in [Scheduled tasks](https://learn.chatgpt.com/docs/automations).

The task must use the same primary folder and journal, not a separate copy or new worktree without local data. Missed submissions are recorded separately and rescheduled; they are not automatically sent in a catch-up batch when the computer starts.

**You should see:** after a check, an updated journal, a last-check timestamp and refreshed statistics/readiness pages. If the recurring task is unavailable, the agent says that the check must be started manually.

### 12. Open your statistics and generate a report

1. After a check, open `Локальные_данные\dashboard\index.html`, the local profile menu. Each profile links to its Statistics page and Readiness page. No server is needed.
2. The page shows years, months and days. Sort by date or by result (successful or unsuccessful first), filter by outcome and search by company or role. The page is read-only; the agent updates the underlying data.
3. At the end of the reporting period, ask the agent to prepare DOCX/PDF files in the selected language and template, if provided. Without your own template, a neutral monthly table is used. The DOCX must be rendered and every page inspected before the matching PDF is exported.
4. Check your surname, first name, reporting period, application rows, and the date and brief substance of each reply. Applications without a reply must use the appropriate translation of “no response received.”
5. The report is saved locally and is not emailed to an employer or authority without a separate instruction. Daily email delivery to you is a separate opt-in setting.

Statistics distinguish the number of response messages from the number of applications that received a response. A reply to an older application is counted in the month it was actually received. If it arrives after a report has been generated but in the same month, the agent will prepare a new revision for that month. If no rejection reason is given, the report says “reason not specified.”

A separate PDF page contains a market recommendation with its date, search radius, transport mode, verified sources, and coverage. Unavailable estimates are marked explicitly; the size of the discovered sample is not presented as the exact size of the market. Your profile's reports are stored in `Локальные_данные\profiles\<profile_id>\reports\<YYYY-MM>\`.

**You should see:** the statistics page with years, months and days. You can try it now with sample data: [dashboard_template/index.html](dashboard_template/index.html).

### 13. Update the package and back up your data

After each confirmed send/scheduling or incoming-mail processing, the agent creates a private versioned archive. Before updating, make a separate backup of `Локальные_данные/`. Download the new ZIP into a new folder and never publish personal data. If local archives are lost, pause new external actions and ask the agent to reconcile Gmail history; Gmail cannot restore unsent local-only documents.

**You should see:** a backup folder with a copy of `Локальные_данные/` made before the update.

## What is not implemented — and what remains your responsibility

HomenS.AI JobPilot is not a standalone job-search application, mail server, or autonomous sending service. Its search, document preparation, email handling, scheduling, archiving and reporting workflows are described as prepared prompts, checklists and written instructions for an AI agent. They are not guaranteed software mechanisms, and this package does not itself connect Gmail or an AI service. The only program code in the package is the local statistics view: HTML/CSS/JavaScript that displays an agent-prepared snapshot and provides sorting/filtering. It does not search for jobs, send or schedule messages, or change files.

The AI agent is an external service whose behavior, capabilities, permissions, availability and results can change. The instructions have not been proven to work end-to-end on every supported agent or account. You decide whether to use this experimental workflow. Before any external action, check the facts, employer, address, recipient, subject, email text, CV, cover letter, attachments and timing yourself. A prompt is editable text: if you change it, you are responsible for reviewing the new wording and its effect. The agent can make mistakes; it cannot guarantee accurate vacancy information, delivery, a reply or employment. Do not treat a described step as completed until you have verified its result in the relevant account or file.

There is no independent SMTP service, background mail daemon, database server, hard technical 44-message lock, or universal scheduler in this package. Gmail Scheduled, a Codex recurring task, local archive creation and report delivery only work if the selected agent/account supports them and the user verifies them. If a feature is unavailable, use the stated manual fallback or leave it disabled; never assume it ran.

## Troubleshooting

- **The agent cannot see the files:** check that a local project is open and its primary folder is the extracted project root. Providing a path in a message is not enough.
- **The agent cannot save a result:** check the selected permissions mode and access to the project root; do not enable access to the entire drive.
- **Gmail will not connect:** check whether the approved connector is available and signed into the intended account, or whether the built-in Browser/Computer Use permissions are enabled. If neither route works, use the manual fallback. Do not paste credentials into the chat.
- **The browser cannot attach a file or verify Scheduled:** use the approved `EMAIL_TO_SEND.txt`, create the message yourself and attach the listed documents; do not mark it sent until it is verified in SENT.
- **The TODO, rules, or dashboard template is missing:** the archive may be incomplete or still a conceptual build. Do not ask the agent to invent missing files.
- **Statistics will not open:** check that the agent generated your `dashboard/profiles/<profile_id>/index.html`; the clean template does not contain your data.

## Official OpenAI pages

- [Download ChatGPT Desktop](https://chatgpt.com/download/)
- [Quickstart: installation and first launch](https://learn.chatgpt.com/docs/quickstart)
- [Codex: projects and local folders](https://learn.chatgpt.com/docs/projects)
- [Codex: permission modes](https://learn.chatgpt.com/docs/permission-modes)
- [Codex: sandboxing and access boundaries](https://learn.chatgpt.com/docs/sandboxing)
- [Codex: MCP and OAuth](https://learn.chatgpt.com/docs/extend/mcp)
- [Codex: Computer Use](https://learn.chatgpt.com/docs/computer-use)
- [Codex: Scheduled tasks](https://learn.chatgpt.com/docs/automations)

Menu names and feature availability can change. Before public release, verify links and interface screenshots against the current documentation.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com · [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
