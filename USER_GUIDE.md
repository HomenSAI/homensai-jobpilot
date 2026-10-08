# HomenS.AI JobPilot — step-by-step user guide

[English](USER_GUIDE.md) | [Русский](docs/ru/USER_GUIDE.md)

**Draft 1.4 · 2026-10-07** · The same guide is available as a web page with a menu: [overview_install.html](overview_install.html).
**For:** Windows and ChatGPT Desktop with Codex. Claude Code is an alternative; its full step-by-step setup is not written yet.

The setup takes about 30–40 minutes. Do the steps in order. Every step says what you should see on the screen, so you always know whether it worked. No Git, Python or other developer tools are needed on your computer.

## What comes first: the agent or the archive?

First the agent, then the archive, then you connect the two. The agent comes first because its availability depends on your account: it is better to find out now than after you have prepared everything else. The archive is only a folder of files; it becomes useful when the agent opens it.

| Part | What you do | Steps |
|---|---|---|
| 1. The agent | Install ChatGPT Desktop, sign in, make sure Codex is available | 1 |
| 2. The project folder | Download the project archive from GitHub in your browser and extract it | 2 |
| 3. Connect and start | Open the folder as a local project, set permissions, make the first safe start | 3–6 |
| 4. Your data | Profile, Gmail (optional), the first queue | 7–9 |
| 5. Daily work | Screen control (optional), daily checks, statistics and reports, updates | 10–13 |

> **Package status.** This guide describes the finished release. The current folder holds design documents and draft instructions for the agent (`AGENTS.md`, `CLAUDE.md`, `TODO_FOR_AI.md`) that have not yet been tried in practice. Do not download an archive from a link you cannot verify. The repository is [HomenSAI/homensai-jobpilot](https://github.com/HomenSAI/homensai-jobpilot).


## What you need

- A Windows computer with internet access.
- ChatGPT Desktop with Codex available for your account.
- A ZIP archive from the official HomenS.AI JobPilot repository.
- A dedicated local folder for extraction and subsequent work.
- Your CV, diplomas and certificates in any format, if you have them (see “Prepare your materials” below) — or just your voice: you can tell the agent about yourself and it writes everything down.
- Your chosen languages for application documents and reports.
- A Gmail connection through a tool supported by your installed Codex version, if you want email tracking.

Local file access requires a **local Codex project** opened on your computer. An ordinary cloud ChatGPT project does not by itself provide access to a folder on your computer.

## Prepare your materials — you can do it first

The project ZIP contains a ready folder `Локальные_данные\Положите_сюда` (“put here”) with three subfolders. It is the only place where you have to put anything by hand. Fill it right after step 2, or gather the files now and copy them later. If you prepare nothing, the agent asks you everything itself (step 7).

| Folder | What to put there |
|---|---|
| `1_Мои_документы` (my documents) | CVs of any version, diplomas, certificates, references, official letters, a portfolio, samples of your own letters. PDF, DOCX, TXT, photos and scans. No sorting or renaming needed |
| `2_Рассказ_о_себе` (my story) | Your story in your own words: a transcript of a voice recording, notes, answers to the questions in `Вопросы_для_рассказа.md` (it lies in this folder) |
| `3_Шаблон_отчёта` (report template) | Only if you have your own report sample. Otherwise leave it empty |

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

The agent loads its rules by itself (Codex reads `AGENTS.md`, Claude Code reads `CLAUDE.md`). It introduces itself, confirms the working folder, checks its tools and then asks you, one question at a time: your name, your city, the language you prefer, and whether you agree that it reads your personal materials. Answer in your own words, by voice if your app has the microphone button.

**You should see:** the agent names the correct folder, explains in a few lines what will happen, says that it works in draft-only mode and asks its first question.

If the agent does not know what to do, or says that `AGENTS.md` or `TODO_FOR_AI.md` is missing: the folder is the wrong one or the archive is incomplete. Check steps 2 and 3. Do not ask the agent to invent the missing files.

## Part 4 · Your data, mail and the first queue

### 7. Tell the agent about yourself and confirm your facts

1. If you have not done it yet, put your files into `Локальные_данные\Положите_сюда\1_Мои_документы` and your recorded story into `2_Рассказ_о_себе` (see “Prepare your materials” above), then say “ready”. If you prepared nothing, say that you want to tell about yourself, by voice or in text.
2. **Before the agent reads your personal files it explains that a cloud agent may pass what it reads to its provider, and asks your consent.** “Stored locally” does not mean “processed offline”. You can say no and start with an anonymized example.
3. The agent reads everything, or interviews you topic by topic: who you are, what you want, every job, education, certificates, languages, skills, projects, real situations, conditions, what not to show. It saves your answers after every topic, so nothing is lost if the chat stops.
4. It then shows you the facts it wrote, section by section. For each fact say: *right*, *correct it* or *wrong*. The agent never invents experience, dates, certificates, language levels or achievements. A fact without a document stays valid but is marked “self-reported”.
5. Choose the language of the CV, the cover letter / email text and the report separately. A language is never guessed from your country, city or interface language.
6. Tell it your goal, starting place, radius in kilometres, transport (car and/or public transport), acceptable journey time, preferred towns, schedule and earliest start. For “every other day” say whether you mean calendar days or every second permitted working day. If you have a report template, put it into `3_Шаблон_отчёта`. Several search directions of one person share one limit of 44 per month.

Never put passwords, one-time codes or OAuth tokens into any file. Private notes stay marked as sensitive and never go into a CV without your explicit choice. Check that `Локальные_данные/` is excluded from publication.

**You should see:** the file `Локальные_данные\persons\<your id>\База_знаний\Жизнеописание.md` with your life story as facts, each marked `confirmed` or `self-reported`, and your search settings repeated back to you for approval. You can open and read the file in any text editor.

### 8. Connect Gmail separately if you need email tracking

1. First check that the published release specifies the exact name and address of the approved Gmail tool/server and its required permissions. Do not guess a URL or add an arbitrary server.
2. If the release uses an MCP server, open **Settings → MCP servers → Add server** in ChatGPT Desktop, enter only the parameters specified in the release, and save. If it uses a connected app, open the relevant Apps/Connectors page.
3. Choose **Authenticate/Connect**, use the official OAuth screen, and check the Gmail address before confirming.
4. Start with email reading/search. Enable sending separately only if needed. Do not authorize deletion, archiving, or label changes. The default sending mode remains `draft_only`.
5. If the system asks you to enter a password, one-time code, or token into a chat, file, or repository, refuse and stop setup.
6. If the requested permissions are broader than those described in the project rules, do not approve them; ask for an explanation of the limitation.

Local folder access and Gmail access are configured separately. If the required connector or its official parameters have not been published, the email integration is not ready for setup: do not substitute an arbitrary server. See Codex's official section on [MCP and connecting OAuth tools](https://learn.chatgpt.com/docs/extend/mcp).

**You should see:** the exact Gmail address you intended, and only the permissions you approved.

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

For a manual check, open the local project, create a **Daily check** chat, and ask the agent to read the rules and perform the current safe plan item. The agent will update the file database and journal, then generate or refresh the statistics.

If your application supports scheduled tasks for a local project, verify a manual run first, then ask Codex to create a recurring task with the required time and time zone. Review its text and first result. For local files, the computer must be on, the application running, and the folder accessible. If scheduling is unavailable or unreliable, run the check manually. Current limitations are described in [Scheduled tasks](https://learn.chatgpt.com/docs/automations).

The task must use the same primary folder and journal, not a separate copy or new worktree without local data. Missed submissions are recorded separately and rescheduled; they are not automatically sent in a catch-up batch when the computer starts.

**You should see:** after a check, updated files and journal and a refreshed statistics page.

### 12. Open your statistics and generate a report

1. After a check, open the generated `Локальные_данные\dashboard\profiles\<profile_id>\index.html` by double-clicking it or using your browser. The root `Локальные_данные\dashboard\index.html` is the profile selection menu. No server is needed.
2. The page shows years, months and days. Sort by date or by result (successful or unsuccessful first), filter by outcome and search by company or role. The page is read-only; the agent updates the underlying data.
3. At the end of the reporting period, ask the agent to prepare DOCX/PDF files in the selected language and template, if provided.
4. Check your surname, first name, reporting period, application rows, and the date and brief substance of each reply. Applications without a reply must use the appropriate translation of “no response received.”
5. The report is saved locally and is not automatically emailed.

Statistics distinguish the number of response messages from the number of applications that received a response. A reply to an older application is counted in the month it was actually received. If it arrives after a report has been generated but in the same month, the agent will prepare a new revision for that month. If no rejection reason is given, the report says “reason not specified.”

A separate PDF page contains a market recommendation with its date, search radius, transport mode, verified sources, and coverage. Unavailable estimates are marked explicitly; the size of the discovered sample is not presented as the exact size of the market. Your profile's reports are stored in `Локальные_данные\profiles\<profile_id>\reports\<YYYY-MM>\`.

**You should see:** the statistics page with years, months and days. You can try it now with sample data: [dashboard_template/index.html](dashboard_template/index.html).

### 13. Update the package and back up your data

Before updating, copy `Локальные_данные/` to a separate backup folder. Download the new ZIP into a new folder, compare versions and instructions, then ask the agent to migrate only confirmed user settings. Do not extract an update over personal data or publish `Локальные_данные/`.

**You should see:** a backup folder with a copy of `Локальные_данные/` made before the update.

## Troubleshooting

- **The agent cannot see the files:** check that a local project is open and its primary folder is the extracted project root. Providing a path in a message is not enough.
- **The agent cannot save a result:** check the selected permissions mode and access to the project root; do not enable access to the entire drive.
- **Gmail will not connect:** stop and check the availability and permissions of the official connector. Do not paste credentials into the chat.
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
