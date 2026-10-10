# HomenS.AI JobPilot · Jobsuchmaschine und Bewerbungsmanager

[English](AI_BUILD_SPEC.md) | [Русский](docs/ru/AI_BUILD_SPEC.md)

**Project specification for Codex / Claude Code — [VERSION](VERSION), 10 October 2026**

**Status:** project specification and experimental agent workflow. There is no separate job-search or mail-sending application. The statistics view is the exception: HTML/CSS/JavaScript validates, sorts, filters and displays the agent-written snapshot. It does not perform searches, send mail or modify records. This is not a claim that the complete agent workflow has passed acceptance, nor permission to connect email or send applications. The instructions remain experimental and require user review.

Start with [README.md](README.md). Operational procedures are in [OPERATING_REQUIREMENTS.md](OPERATING_REQUIREMENTS.md); architecture is in [ARCHITECTURE.md](ARCHITECTURE.md), file formats and recovery in [DATA_CONTRACT.md](DATA_CONTRACT.md), and test scenarios in [ACCEPTANCE_TESTS.md](ACCEPTANCE_TESTS.md). Step-by-step installation is available in [USER_GUIDE.md](USER_GUIDE.md) and [overview_install.html](overview_install.html). The agent performs the workflow; the statistics page only presents its local snapshot.

The project has three editions: English at the root, Russian in `docs/ru`, German in `docs/de`. English is primary; all three use identical technical identifiers, rules and examples. Document and report languages are selected separately. Rule changes update all editions.

**Authorship and independent development.** Serhii Khomenko is the author of the idea and the developer of the system. The concept, the scenario and the requirements were formulated by the author from their own experience and workflow, and the system itself was designed independently. The GitHub projects listed in section 14 were looked at only as an overview of existing solutions. Their source code, components, templates, design, architecture, prompts and other materials were not used in preparing these documents and are not the basis of the system: they are not copied, adapted or forked. The system is developed by Serhii Khomenko independently from this specification. The choice of libraries and development tools is agreed separately; it does not mean that code of the reviewed projects is used.

**Author of the idea and developer:** Serhii Khomenko  
**Website:** https://homensai.com/  
**GitHub:** https://github.com/HomenSAI  
**LinkedIn:** https://www.linkedin.com/in/serhii-khomenko-homensai/  
**ORCID:** https://orcid.org/0009-0009-5371-9717  
**Book / Zenodo:** https://zenodo.org/records/23160031  
**Contact:** info@homensai.com  
The public details were checked against the contact page and the website archive `deploy_ver_2.21.zip` on 7 October 2026; they are checked again before a GitHub release. The personal website is not presented as a registered company.

### Visual identity and links to the author

- The brand is **HomenS.AI**, the product is **HomenS.AI JobPilot**, the repository is **`homensai-jobpilot`** (https://github.com/HomenSAI/homensai-jobpilot). The German descriptor is **Jobsuchmaschine und Bewerbungsmanager** (“job search and application management”). The name was not checked against trademarks, domains or other products.
- The logo is the official SVG mark from the website, not redrawn. The website header shows the wordmark `HomenS.A Inc.` while its metadata says `HomenS.AI`; the wordmark is reproduced only as a visual caption of the site, not as a statement about legal registration. Project materials use “HomenS.AI · Serhii Khomenko”; no legal status of a company is claimed without separate confirmation.
- **One look everywhere.** All HTML pages of the project look like the website homensai.com and the client of the HomenS.AI Core platform (`frontend/app/styles.css`): the “Nordic” palette, a thin engineering grid, a top bar with the logo, a menu and an EN/RU language switch, a light/dark theme switch, a “Top” button in the lower right corner and a footer with links to the author. The dark theme follows the system setting and can be switched by hand.
- Palette (light): background `#edf1f4`, surface `#f9fbfc`, text `#14212e`, secondary `#44525f`, lines `#d9e0e6`, blue accent `#1e4f8a`, teal `#147283`, gold `#7d5f16`; states: green `#1f7a46`, amber `#9a5b00`, red `#b3261e`. The SVG logo keeps its own colours `#2bb3c4` and `#c9a24a`. Contrast stays accessible.
- Fonts are IBM Plex Sans (interface) and IBM Plex Mono (technical labels). Unmodified files are in `assets/fonts` with `OFL.txt` and `NOTICE.txt` (SIL Open Font License 1.1); there are no external addresses. Without the files the pages work on system fonts.
- **Links to the author's website are everywhere.** Every HTML page and every Markdown document has a line with links to `homensai.com`, GitHub `github.com/HomenSAI`, LinkedIn, ORCID, the Zenodo DOI and `info@homensai.com`, and HTML pages also carry a link in the top bar. Before publication the links, the current website and the right to use every brand file are checked again.
- The source of the design is `deploy_ver_2.21.zip`, checked against https://homensai.com/contact.html on 7 October 2026, and the client of HomenS.AI Core. Contact links in version 2.21: `info@homensai.com`, LinkedIn `linkedin.com/in/serhii-khomenko-homensai`, GitHub `github.com/HomenSAI`, ORCID `0009-0009-5371-9717`, the GitHub projects RTX 3080 local AI benchmarks and `two-worlds-one-mind`, Zenodo `10.5281/zenodo.23160031`.

## 1. Why the project exists

**HomenS.AI JobPilot** is a self-contained working package: the user downloads it from GitHub and opens it as a local folder in Codex or Claude Code. The AI agent in the chat is the executor: it reads the rules and the task queue, asks for missing information and permissions, searches for companies and vacancies, maintains the local database, produces documents, checks mail within the connections it has been given and prepares reports. The main product is not a web service and not a background server.

The idea is to demonstrate how a fairly complex workflow can be coordinated through prompts, written procedures, local files and an existing cloud AI agent such as Codex, without creating a separate full-scale job-search application. The author first assembled a personal workflow on his own computer from folders, documents and prompts in an informal way. When acquaintances described the same repetitive burden, he decided to standardize it. The earlier personal workflow was used for about two months; preparing the first standardized project documentation took about two working days, according to the author. These are origin details, not proof that the current package has passed full acceptance.

The agent follows the documented procedures, records completed actions in the journal and maintains other files. The 44-submission limit, no-repeat rule and one-writer rule are procedures, not independent technical locks. The statistics view contains the project's only operational JavaScript: it validates the snapshot and presents/sorts/filters the supplied data. It does not make external calls. The safest mode is the default, and any external action requires the user's explicit approval for the exact package and schedule.

The only working root is the extracted folder that the user has explicitly allowed. Inside it are the instructions, profiles, the master biography, source materials, the database of companies and vacancies, month folders, letters and application packages, the journal and the reports. No separate database on another disk and no central server is required. Required account secrets are not written into this folder: the OS or provider's protected storage is used, and the project keeps only a connection flag and non-secret metadata.

The locally opened project folder and one chosen AI agent (Codex or Claude Code) are required for the system to work. The package has a **static HTML statistics page**: the agent updates the local snapshot, and the user views its tables. Page code validates the snapshot and supports sorting/filtering; it does not search for companies, change the journal/queue or access Gmail. It is an ordinary local file, not a server: Docker, a backend and an internet connection are not needed to display a saved snapshot.

The key principle of the profile: the system keeps the person's complete confirmed biography and does not treat a short old CV as the complete history. The user puts CVs and other materials into the ready folders `Положите_сюда`, or simply tells the agent about themselves, by voice or in text, in an interview; the agent extracts and structures the facts with sources and confirmation. For each vacancy it produces short, relevant CVs and Anschreiben from confirmed facts only. This is an independent original work of Serhii Khomenko; no third-party code from the reviewed GitHub alternatives is used.

## 2. Experience of existing working folders

The working folders of several users already contain useful but unequal practices:

- month directories and numbered employer folders;
- **Company.md** and **Status.txt** in each application folder, email texts, planned dates and Gmail information;
- different sets of documents and file names: Anschreiben, Lebenslauf/CV, PDF/DOCX, sending details;
- separate prompts with different rules, personal data, Gmail and permissions.

Therefore the existing roots cannot simply be merged. The new system needs a common data format, a separate configuration for each user and a separate safe import of old folders. The import is read-only first: the source directories are not renamed, moved or rewritten.

## 3. Architecture: a local folder and an AI agent

The local AI agent and the extracted folder it can access are the required working parts of the system. The user chooses Codex or Claude Code, opens exactly this folder in it, creates a chat or task and says “start”: the agent loads its rules file by itself (`AGENTS.md` for Codex, `CLAUDE.md` for Claude Code) and follows `TODO_FOR_AI.md`. Without a working agent that has permission for this folder the system does not search, keep records or update statistics. The agent works inside the allowed folder, reflects progress in files and turns to the user when data is missing, a choice is needed or a new permission is required. It is not a system that gets access to Gmail or the computer by itself just because a Markdown file was downloaded.

`TODO_FOR_AI.md` is the step-by-step working plan: the first run — the first setup (introduction, check of the agent's tools, consent, the person's story, the person's documents, analysis and the knowledge base, confirmation of the facts, the search setup, mail), resuming in a later chat, and a checklist for every standard action. On the first run the agent leads the conversation itself: it says what it needs, asks one question at a time and performs the next safe step. It keeps its position in `workspace.json` (`stage`).

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

1. **The local AI agent** performs searching, source analysis, keeping data and journals, preparing documents and reports and the permitted mail actions. The whole process is visible in its chat; the user needs no separate system for everyday management.
2. **The project folder** is the only place for working data. JSON holds projections, one JSONL journal per person, kept in monthly segments, holds primary operational events, including the shared quota and profile events. The agent writes and checks these records by the written procedure. The statistics page has HTML/CSS/JavaScript only for snapshot validation and presentation; formats and business procedures remain in ARCHITECTURE.md and DATA_CONTRACT.md.
3. **Step-by-step instructions**: `README.md` for the human, `AGENTS.md` for Codex, `CLAUDE.md` for Claude Code and `TODO_FOR_AI.md` with the sequence of actions. In every session the agent relies on these files and the existing content, and does not assume that the previous chat is available.
4. **The profile and the knowledge base** are the master source of facts inside the folder. The knowledge base is one Markdown file per person, `База_знаний/Жизнеописание.md` (section 4.6, DATA_CONTRACT.md §3a). The agent writes it from the person's documents and from an interview held in the chat, by voice or in text; the questionnaire is that interview, not a form. The file stays readable and correctable by the person.
5. **The mandatory statistics page.** The package contains the ready template `dashboard_template/index.html` with the sample data file `summary.js` next to it. For every profile the agent copies `index.html` **unchanged** into `dashboard/profiles/<profile_id>/` and writes only the data file `summary.js` beside it; it also updates the local menu `Локальные_данные/dashboard/index.html`. The page reads its data from `summary.js` through an ordinary script tag, so it needs no fetch of local files and no network requests; it writes no data and does not change the queue. It is a frontend for displaying, filtering and sorting. The base language is en; ru is selected explicitly and does not change the data.
6. **Scheduling.** Daily or periodic actions are performed by a new run of a local Codex scheduled task, if this function is available and configured, or by a separate agent session following the instructions. The static page does not start the agent and does not update itself. No Windows service, web backend, Docker or server is needed. For scheduled local tasks the computer, the application and the folder must remain available; the exact conditions depend on the agent and its version.
7. **Access.** Rights for the local folder, web search, Gmail OAuth / connector and Computer Use are configured separately and only for the needed scenario. Authorization and sending are not switched on automatically by extracting the ZIP.

## 4. The person's profile: the knowledge base and the interview

### 4.1 Import and confirmation

During the first setup the person extracts the package and opens this folder locally in the chosen agent. The folder already contains three ready intake folders (section 4.6). The person may put existing CVs, diplomas, certificates, references and a portfolio into them beforehand, or leave them empty and let the agent conduct an interview. The agent uses only the provided working folder, writes the proposed facts into the knowledge base and shows which file and place each fact comes from.

The AI does not treat extracted text as confirmed automatically. The user accepts, corrects or rejects every proposed entry. For a fact the following is stored: the value, the source, the date or period of validity, the confirmation status, the original language and the limits on use. A self-assessment stays a self-assessment; it must not be presented as a certificate or a verified qualification.

### 4.2 Questionnaire sections

The questionnaire is an interview conducted by the agent in the chat, one topic at a time, in the order of the list below. Answers may be dictated by voice and may be long. Required answers are kept to a minimum; every topic can be skipped, and the agent says why a topic may be useful.

- Contacts and location: name, address / search region, permitted disclosure of contacts.
- Languages of the materials: the user chooses `cv_language`, `cover_letter_language`, `email_language` and `report_language` separately. The settings are not derived from each other and not detected automatically from the country or the vacancy; the language of one application can be overridden with the user's confirmation. If a language is not set, the user is asked before generation.
- Report: an optional template supplied by the user in `3_Шаблон_отчёта`; the original stays unchanged, the result is saved as a separate file.
- Goal: work, Ausbildung, internship / Praktikum, Probearbeit, temporary work; occupations and job titles; employment type, desired industries and exclusions.
- Experience for each position: employer, country / city, role, dates, tasks, equipment / tools / systems, team and area of responsibility, measurable results, achievements, transitions between roles.
- Education: school, vocational / higher education, specialty, periods of study and qualification; recognition of the diploma, if applicable.
- Courses, licenses and certificates: title, issuing organization, date, validity, level / number, evidence file.
- Languages: the language, separate levels of reading / writing / speaking / understanding, the declared CEFR level and the certificate / date, if there is one.
- Digital, technical and professional skills: skill groups, tool / technology, level, where and when it was applied, evidence and the date of last practice.
- Projects, volunteering, internships, informal learning, publications and portfolio.
- Strengths and examples of behaviour: concrete situations, actions and results (STAR), teamwork, communication, problem solving and learning.
- Preferences and availability: what is searched (job, Ausbildung, internship, Probearbeit, temporary work), where the person lives, the search radius, how the person gets there (car, train, bus / tram, bicycle, on foot — any combination), the acceptable journey time, transfers, walking distance, evening return, schedule, start date and preferred channels.
- Cover-letter questions: why this role, which tasks are interesting, what contribution the person wants to make, what they want to learn.
- Files and references: the user decides which originals / contacts to keep and which of them may be included in a particular application.

The interview accepts free text and long spoken answers, dates, repeated entries (one position after another) and skipping a topic. After every topic the agent saves the answers and the new facts, so that an interrupted chat loses nothing.

### 4.3 Safety of biographical data

By default the system does not collect religion, marital status, health / disability information, nationality, photographs or other sensitive or optional data. If the person adds such a fact themselves, it is marked as sensitive, not used in a CV without the user's explicit choice and not passed to a cloud model automatically.

Before anything goes to an external AI, the system shows which facts and documents will be passed. The preferred mode is to pass only the minimal set relevant to the vacancy, not the whole archive. Viewing, correction, export, deletion of the profile and withdrawal of mail access must be provided.

“Local storage” does not mean offline processing: information that a cloud agent reads with a tool may reach its provider. Consent to this processing must be obtained before the first reading of personal originals, not after the text is extracted. Without such consent the agent can work with an anonymized example and the general rules. Everything that the agent writes from documents or from the interview first has the status `proposed`; only the person's confirmation makes a fact `confirmed`.

### 4.4 How the CV is built

The master profile stores an extended history, but the CV is a target projection, not a copy of the whole dossier. The system matches the vacancy requirements to the profile facts and can show a table “requirement → confirmed fact → source → where included”. The user sees the gaps and decides what to clarify. The AI is forbidden to invent experience, employers, results, certificates, language level, dates and the right to work.

By default the language and layout are chosen separately for each application. The size and content of the CV adapt to the country, the employer and the channel; the extended full questionnaire stays the internal base. A photo is optional. All versions get a date, a version number, the profile ID and a list of source facts.

### 4.5 Basis for the content of the interview

The knowledge base must be wider than a ready CV and is built as an editable base of life and professional experience. Europass serves as one reference for the completeness of the master profile: education / training, experience, languages, digital skills, projects, achievements and other skills. The system stores the complete master biography locally and generates for output only the projection that is relevant to a specific vacancy and the language chosen by the user. Separate questions cover tasks and results in each position, tools / technologies, evidence, the date a skill was last current, the desired direction, mobility and STAR examples; sensitive data is not collected by default.

These recommendations are a reference, not a mandatory form. A photo and optional personal details are not required; they are included only at the user's choice and if a specific application justifies it.

### 4.6 Where the person puts materials, and the knowledge base file

The package contains a ready folder `Локальные_данные/Положите_сюда/` (“put here”) with three subfolders and a short README in each. It is the only place where the person has to put anything by hand:

| Folder | What the person puts there |
|---|---|
| `1_Мои_документы` (my documents) | CVs of any version, diplomas, certificates, references, official letters, a portfolio, samples of own letters; PDF, DOCX, TXT, photos and scans; no sorting or renaming |
| `2_Рассказ_о_себе` (my story) | The person's story in their own words: a transcript of a voice recording, notes, answers to the questions of `Вопросы_для_рассказа.md` (shipped in this folder); the agent also saves interviews here word for word as `Интервью_<date>.md` |
| `3_Шаблон_отчёта` (report template) | Only if the person has their own report sample |

The folders can be filled **before** the first run or left empty. The agent only reads them and never changes, moves, renames or deletes anything in them. For a second person who uses the same folder, a subfolder with the person's name is created in `Положите_сюда`, with the same three subfolders.

**Preparing the story by voice.** The person can prepare the story in advance, in two ways: (a) outside the project, in any chat of Claude or ChatGPT with voice mode: use the questions of `Вопросы_для_рассказа.md`, talk, then ask the assistant to write the story down word for word, without adding anything, as a text file, and save it to `2_Рассказ_о_себе`; (b) inside the project: tell the agent that they want to speak about themselves, and the agent conducts the interview (4.2), saving every answer word for word. Both ways give the same result.

**The knowledge base.** From both folders and the interview the agent writes `Локальные_данные/persons/<person_id>/База_знаний/Жизнеописание.md`: the person's whole life story as confirmed facts in a fixed format (DATA_CONTRACT.md §3a). The agent then shows the proposed facts section by section and the person confirms, corrects or rejects each of them. Applications and CVs use only confirmed facts. The file is in the person's language, is readable and correctable by hand, and is the single source for all search profiles of that person.

**The first setup in order.** The agent leads it, and the person only answers; there is no form. (1) Where the story belongs: if the person has a written story, it goes into `2_Рассказ_о_себе`; if not, the agent offers to prepare it right now, preferably by voice, and saves it word for word. (2) The agent asks the person to put diplomas, certificates and other documents into `1_Мои_документы`. (3) The agent analyses the story and the documents and writes the knowledge base. (4) It asks about the gaps one topic at a time, always including certificates, courses, licences, language levels and the driving licence and a car. (5) The person confirms the facts. (6) The agent asks what is searched and how: the kind of search, roles, where the person lives, the radius, the means of travel and the limits of the journey, preferred towns, the four languages, the rhythm of sending; the answers are saved as `profiles/<profile_id>/profile.json` (DATA_CONTRACT.md §3b). (7) Mail is connected only if the person wants it. After that the first setup is finished and everything works from the saved files. The exact steps and questions are in TODO_FOR_AI.md, Part A.

Template handling: keep the source unchanged, save a distinct editable DOCX beside a PDF, visually compare every page and approve the result before use. If conversion is unavailable, the agent reports it and asks for manual conversion or an approved reconstruction. Selected source/DOCX paths, hashes and verification times are stored per profile; each vacancy receives its own files. See [Application templates](OPERATING_REQUIREMENTS.md#application-templates).

## 5. Geographic search and the shared database

The user chooses the starting point (the place where they live), the radius in kilometres, the means of travel (car, train, bus / tram, bicycle, on foot — any combination; “public transport” means train and bus / tram), the acceptable journey time, the number of transfers, the maximum walking distance, the evening return and the priority towns. The system shows both the straight-line distance and the actual route; these are different values.

The order of priorities is stored separately for each profile and does not change when new towns are added. First the chosen radius and the criterion of proximity to the address / point are applied; the real journey time and the simplicity of the route help to filter out unsuitable options and to tell candidates apart, but must not artificially push down a closer company in favour of an added distant town. Expanding the geography is allowed after the nearby suitable zone has been checked. The list of towns is the user's own set, not a universal priority of the system.

Companies and published vacancies are searched through permitted sources: employers' websites, official job portals and APIs / search whose terms allow such use. For each result the URL, the source name, the date and time of checking, the local address / branch, the way to apply and the level of confidence are stored. The system does not claim that a list of “all companies” is exhaustive: it gives an estimate of coverage, of queries and of the sources found.

A duplicate is not just a repeated name: the domain, the legal name, the branch address and the relation of branches to the parent company are considered. Different branches are not merged. A company already marked in the registry is not applied to again without a separate decision of the user.

The recommended company card contains:

- the name of the organization and the branch, the address and the city;
- website, email, phone, contact person / position;
- the types of suitable roles and the channel for applying;
- the requirements of the vacancy / internship and the date they were current;
- the source of every contact and requirement, the date of checking, the confirmation status;
- distance, transport mode, time, transfers, walking part and the source of the route;
- the history of found vacancies, applications, replies and rejections.

If a route source is unavailable, “route not verified” is shown and is not replaced by a guess. For vacancies the publication period / deadline is stored and outdated offers are marked regularly.

## 6. Folders and the application package

The user downloads the GitHub ZIP, chooses a convenient place and extracts it. This folder is opened locally in Codex or Claude Code and the agent is explicitly allowed to work exactly in it. **All working materials and created data then stay inside the extracted folder**, in the data subdirectory excluded from Git. The agent does not create a parallel directory on another disk without explicit consent.

~~~text
<folder from the GitHub ZIP>\
  README.md
  USER_GUIDE.md                     # step-by-step installation and use
  AGENTS.md                         # rules for Codex
  CLAUDE.md                         # rules for Claude Code
  AI_BUILD_SPEC.md
  ARCHITECTURE.md                   # parts, journal rules and standard actions
  DATA_CONTRACT.md                  # shared data, states and recovery
  ACCEPTANCE_TESTS.md               # verifiable readiness scenarios
  PROJECT_OVERVIEW.html             # illustrated overview with a menu
  overview_*.html                   # overview pages: install, profile, architecture, safety, market, roadmap
  docs\ru\                          # Russian edition of documents and pages
  assets\                           # shared styles, scripts and fonts of the pages
  dashboard_template\index.html    # statistics page (source for generation)
  TODO_FOR_AI.md                    # the step-by-step playbook for the agent
  .gitignore                        # excludes the user's real data
  Локальные_данные\                  # stays only on the user's computer
    workspace.json                    # stage of the first run, language, capability checks
    Положите_сюда\                    # the ONLY place where the person puts things (the agent only reads it)
      1_Мои_документы\                # CVs, diplomas, certificates, references
      2_Рассказ_о_себе\               # the story: voice transcripts, notes, interviews, the questions
      3_Шаблон_отчёта\                # optional report template
    persons\<person_id>\
      База_знаний\Жизнеописание.md   # the knowledge base: the person's life story, confirmed facts
      journal\transactions-YYYY-MM.jsonl  # the person's single primary journal, one segment per month
      journal\writer.lock            # one local write lock
      state\quota.json               # derived counter by month
      outbox\                        # immutable packages of send attempts
    Resume\                           # resume template: your Word file, or a PDF converted to Word here
    CoverLetter\                      # cover letter template, same design as the resume
    profiles\<profile_id>\
      profile.json
      registry.json                   # targets, applications and the queue (projection)
      runs\                           # work sessions, resuming from a new chat
      reports\                        # reports of this profile (English, Russian or German)
    Applications\                     # all application work, one tree for all years
      2026\
        10_October\
          001_Muster-Maschinenbau_Stuttgart_Maintenance-technician\
            Company.md                # company data from public sources, with source and check date
            Resume_v001.docx
            Resume_v001.pdf
            CoverLetter_v001.docx
            CoverLetter_v001.pdf
            EmailText_de.txt          # the approved e-mail text in the sending language (EMAIL_TO_SEND.txt is built from it)
            EMAIL_TO_SEND.txt         # manual-send file: account, recipient, subject, body block, attachments, slot, status
            ReviewTranslation_ru.txt  # optional review translation; labelled "not for the employer", never attached
            Status.txt                # append-only history of this application
    dashboard\index.html             # menu of local profiles
    dashboard\profiles\<profile_id>\summary.js
    dashboard\profiles\<profile_id>\index.html  # snapshot of one profile
    dashboard\profiles\<profile_id>\readiness.html  # readiness page of one profile
~~~

The number starts at 001 in each month. The directory name does not replace the stable internal ID of the company / application. The master base of facts is the person's knowledge base file (section 4.6); the whole archive is not copied into each application. The person puts CVs and materials into `Положите_сюда`; they and the interview feed the one knowledge base. For current users a read-only import and a mapping table are proposed, but their old directories are not reorganized without confirmation. All personal data under `Локальные_данные/` is excluded from Git by default; publishing working files is forbidden.

The application directory is chosen by the month of preparation and is not moved when the plan changes. Reports group applications by the actual date of submission, regardless of the directory name. All paths in records are relative to the project root; after resolving, a path is checked to stay inside this root, including with junctions / symlinks. The end-to-end record structure and the Windows naming rules are in DATA_CONTRACT.md.

If the application is not by email, the package is built for the channel of the vacancy: web form, portal, paper, phone. A fictitious email address is not created for a vacancy.

**Cover letter (R12).** Every application has its own personal cover letter, which is part of the required package and is attached to the sent documents; a short e-mail text does not replace it. The letter names the correct employer, a contact person only when confirmed, the concrete position and the agreed date, and links the vacancy's requirements to confirmed facts (`use: cv`). It never carries the names, forms of address or requirements of another company, and it never invents qualifications, availability, salary or deadlines. A missing required detail is asked for, or the package stays not ready. The letter is kept as an editable DOCX and as a checked PDF. The attachments are the approved CV PDF and the approved letter PDF, or one agreed merged PDF that contains both in full; a DOCX or a draft is never attached by mistake. If an employer requires another format or refuses the letter, the requirement is recorded with its source and the exception is agreed with the person.

**E-mail text and languages (R13).** The vacancy's language decides the language of the sent e-mail, CV and cover letter. If the vacancy does not state it, the agent asks the person and proposes a reasoned choice; it does not guess from the city, the domain or the language of a page. The body follows the structure the person approved (greeting, the exact vacancy, a short relevant motivation, the attached documents named as they are, a clear request for a conversation or an appointment, the approved signature). The subject is at most 50 Unicode characters after NFC normalization. The body is never empty, contains no unfilled template fields and no other application's text, and does not claim an attachment that is missing. The person reviews the exact text and a full meaning translation into the review language (`languages.review_language`) before consent; the translation adds nothing and omits nothing material, and it is stored apart from the sent files. Changing the text or a language is a new version that needs new approval.

**Dates (R07).** The plan is the only source of the planned send date. The same date and time appear in the e-mail text, in any dated field of the documents, in `EMAIL_TO_SEND.txt`, in the manifest and in the Gmail Scheduled entry. The planned date and the date of a document are separate fields. A date given in the vacancy (start date, deadline) is checked against the vacancy source and the calendar before consent. A moved slot is a new plan version and a new package version; old versions are kept.

**EMAIL_TO_SEND.txt (R20).** Every ready package has this UTF-8 file, so that the person can send the application by hand when the automatic route is unavailable. It is generated from the approved e-mail text, not written as a second source. The structure below is a documentation example with placeholders only:

~~~text
SENDING ACCOUNT: [confirmed Gmail address]
RECIPIENT: [recipient from the vacancy or official site; source and check date]
SUBJECT: [approved subject, 50 characters or fewer]
PACKAGE VERSION: [application id, package version, manifest SHA256]
PLANNED SLOT: [date, local time, time zone]
ATTACHMENTS: [exact file names and local paths: CV PDF, cover letter PDF, or the agreed merged PDF]
STATUS: [prepared | send_uncertain | a confirmed status]

=== BODY: COPY ONLY THIS BLOCK ===
[the approved text in the vacancy's language, including the signature]
=== END OF BODY ===
~~~

The review translation is not in this file. The file contains no instructions inside the body and no claim that the message was sent.

## 7. Scheduling, Gmail and control of sending

### 7.1 The queue

The AI agent keeps the queue as data inside the project folder. The cadence is one of the values of `schedule.cadence` (see `examples/settings.example.json`): `immediate` (one send on each permitted day), `allowed_workdays`, `every_second_allowed_workday`, `every_n_calendar_days`, `every_n_allowed_workdays` or `selected_weekdays`. With `approval_per_message` the cadence is `on_request`: there is no fixed slot, and the send time is the moment of the person's answer to the send card. Calendar days and permitted working days are different things, and the person says which one is meant. In the scheduled cadences a run sends at most `max_per_run` messages (1 or 2). In every mode the number of CV submissions in one local day is capped by `max_per_day`, a profile setting that the person chooses as a whole number from 1 to 43 (the default proposal for a new profile is 2; 0 and 44 or more are refused). The monthly limit of 44 stays fixed and is not changed by this setting; a change of `max_per_day` takes effect from the next local day. With two, either a second exact local time is used (`local_send_times`) or the second send follows the first after `inter_message_delay_minutes`. Each message is a separate, personalized operation with its own package. The plan records the time zone, the holiday region and its verified calendar, the excluded dates, the daylight-saving rule (an ambiguous or missing local time is put to the person, or the rule agreed earlier is applied) and the missed-run policy. No holiday and no preference is invented. The calendar of exact slots is shown before the plan is accepted. The queue is not run by a web panel: the agent works it in its own chat or in a scheduled task whose existence it has verified. The date of creation and change of the plan, the preparation status and the result are stored. The user asks the agent in the chat to process the queue, or sets up a recurring run with the means of the agent application itself if it supports project schedules. The queue is not executed by a web panel.

JobPilot quota covers only applications managed by JobPilot: at most 44 CV-bearing submissions per person and calendar month across their JobPilot profiles. Independent submissions made by the user outside JobPilot are their own decision; the agent neither limits them nor imports them into the JobPilot quota merely because they appear in Gmail. Sending an approved JobPilot package manually through `EMAIL_TO_SEND.txt` remains a managed submission and consumes one slot. Replies and reports without a CV keep their separate rules. Only uncertain managed attempts affect the managed quota; unrelated personal mail does not.

A repeat, replacement after a bounce or CV-bearing follow-up managed by JobPilot uses a separate slot. A confirmed bounce does not refund a real send; proven non-submission may release a reservation.

The calendar month is determined by the person's time zone. All of the person's working profiles and queues use one shared quota journal; before sending a slot is reserved in the journal under the single-writer rule, so that parallel chats cannot exceed the limit. The sum of actual submissions and active reservations must never exceed 44, and the 45th application is blocked already at planning. The plan distributes submissions evenly over the permitted working days, excludes weekends and chosen holidays and does not create a bulk mailing. When the slots are used up, new sending of CVs is hard-blocked until the next calendar month; the remaining targets stay waiting and, before being carried over, need a fresh check that the vacancy is still current and the user's consent. The settings may lower the limit but cannot raise it above 44 without a change of the specification version by the author. Independent external submissions never consume the JobPilot quota. If the managed counter is incomplete or damaged, the agent stops its own sending until the managed allowance is reconciled.

The project limits CV-bearing submissions to **44 per person per calendar month**, shared across profiles. A common example is two separate personalized submissions on each of 22 working days; the actual schedule is selected by the user. A numerical cap or slower cadence does not guarantee that a provider will not classify an email as spam. Thank-yous and period questions without a CV use no CV slot, but follow separate consent, relevance and deduplication rules. Three kinds of send are kept apart: `cv_submission` (uses a slot), `thank_you` and `ordinary_reply` (they use no slot; a reply that carries a CV is a `cv_submission`). A period question is an `ordinary_reply`, sent only after the person approves it. Each kind has its own repeat key: a CV submission per application attempt; a thank-you per account + incoming Gmail Message-ID; an ordinary reply (including a period question) per account + incoming Gmail Message-ID, with one period question per thread. `thank_you_sent` is the only automatic follow-up. A thank-you may follow a CV that was already sent. An uncertain send blocks all new sends for that person until it is resolved.

The safe mode after installation is **prepare the project / draft only**. Sending is switched on only by a separate setting of a specific profile and a confirmed OAuth. The modes must be explicit: **draft_only**, **approval_per_message**, **scheduled_send_with_profile_consent**. A new user starts with draft_only; the settings of existing users are independent and are not part of the public repository. Consent is tied to the account, the recipients / channels, the package version and the conditions; a change of the recipient, text or attachment after the check cancels the readiness to send.

Before a real sending the profile and the Gmail account, the recipient, the subject (for profiles with such a rule, 50 characters at most), the body, the files, the dates, the permitted channel and the consent are checked. During development / tests synthetic mail and a test mode are used; test applications are never sent to employers.

For the first release the subject is limited to 50 Unicode characters after NFC normalization by default, including spaces and punctuation. A stricter limit of the user is kept. This is a product setting, not a declared Gmail limit. If “every second day” is not clarified, every second permitted working day is used; the calendar is shown before the plan is accepted. A missed sending is not performed retroactively and is not made up in a batch: it is marked as overdue and a new slot is agreed.

Before scheduling or sending a managed CV, compare the normalized recipient with the last managed CV recipient and with adjacent approved/scheduled JobPilot slots across this person's profiles. Trim whitespace, normalize Unicode and compare case-insensitively; do not remove plus-tags or dots or equate aliases without evidence. Two consecutive managed CV submissions to the same address are blocked with `RECIPIENT_CONSECUTIVE`, including different application IDs. Defer the duplicate and ask for a revised plan; never add a filler application to bypass this check. Existing same-application repeat keys and uncertain-send reconciliation still apply. Thank-yous and ordinary thread replies use their own keys and are not treated as new CV applications.

### 7.2 Gmail through an approved connector or the built-in browser

Gmail can be accessed through either an official, approved connector available in the installed agent or the built-in Browser in ChatGPT Desktop/Codex. At setup, inventory the capabilities that actually work and let the user choose. A connector follows its official sign-in flow and must identify the intended account and separate read/send permissions. For Browser, the user signs in personally; the agent uses that existing session only after checking the visible address and website permissions. Browser sessions are separate from the project folder and can expire. Never claim that a token is stored in the project or that access lasts indefinitely. Never request passwords or one-time codes in chat/files.

For Browser, enable Computer Use if the installed version requires it: Desktop → Codex → Plugins → Computer Use; Settings → Browser → Agent permissions. On Windows it operates a visible window on the active desktop and can take foreground input. Verify current setup in official [built-in browser](https://help.openai.com/en/articles/20001277-using-the-built-in-browser-in-the-chatgpt-desktop-app) and [Computer Use](https://learn.chatgpt.com/docs/computer-use) help. A connector may have a different capability set; verify rather than assume.

The agent reads the whole relevant thread before classification, records account ID, Gmail message ID, RFC Message-ID when available, thread ID, From/To, subject, time zone, package linkage and result. Search and deduplication do not delete, Gmail-archive, move or relabel mail. A reply to an older application is reported in the month it was received, once per Gmail Message-ID. SENT confirms sending, not delivery; silence does not prove a bounce.

The built-in browser cannot automate file uploads, according to its official documentation checked on 8 October 2026; the upload is therefore done by the person, or by a separately approved tool whose upload has actually been verified. A connector may support attachments, but this capability must be verified for the selected account. Scheduling through the browser is described in §7.2a and applies only where attachments can be verified. A CV email is not ready merely because its fields were filled: verify the attachment list and scheduled message. If the selected route cannot attach files, stop and use the manual fallback: `EMAIL_TO_SEND.txt` contains the exact account, recipient, subject, body, attachment paths and slot; the user creates the email, attaches files and chooses Gmail Schedule send. Do not claim an upload or Scheduled action completed without checking the result.

Do not install or configure an arbitrary connector or server. Use only an existing official connector explicitly approved for the profile or the built-in Browser. Verify whether the selected path can read whole threads, confirm SENT, handle attachments and place messages in Gmail Scheduled. Never change labels, Gmail-archive or delete messages.

### 7.2a Gmail Scheduled through the built-in browser (R03)

Scheduling in Gmail is an external action of its own, separate from sending and from the local queue. It is used only when the connection mode allows it, the person has signed in personally, and the upload of attachments has been verified in this installation (see the limit in §7.2). Otherwise the manual route of §6 applies. Each step is verified:

1. **Before.** Check the person, the active Gmail sender, the mode and the consent, the approved plan slot, the recipient, the subject (50 characters or fewer), the body and the attachments (SHA256 against the manifest).
2. **Reserve.** If the committed plan has not already reserved this slot, write `quota_reserved` for the month of the planned send; a slot is never reserved twice. Then write the durable intent (`send_started`, transport `gmail_scheduled`) before the first click that could save anything. The intent line is read back, and it must be the last line of the journal before the first click (hard gate, ARCHITECTURE.md §6, step 3).
3. Open a new message, fill in the approved fields only, attach only the approved files, and wait until every upload is complete.
4. Choose **Schedule send**, not Send. Set the exact date and local time and check the time zone.
5. **Verify in Scheduled.** Match the entry against the account, recipient, subject, body, attachments, date and time. A click or a notification is not proof.
6. Keep the remote identifier or the locator of the evidence that Gmail provides. No identifier is invented.
7. Record `gmail_scheduled_verified` and update the views and the archive. This is not a sent event.
8. **After the planned time.** Check SENT for the exact message and its actual send time. Record `sent_verified` once and turn the reservation into consumed quota.

The R03 state names are mapped onto the events of `DATA_CONTRACT.md` §3c: `local_planned` = `plan_committed`; `scheduling_started` = `send_started` with transport `gmail_scheduled`; `schedule_failed_before_commit` = `failed_before_send` with `quota_released` (proven absent); `schedule_uncertain` = `send_uncertain`; `gmail_scheduled_verified`; `sent_verified`; `schedule_changed` and `schedule_cancelled` only after a verified remote change.

**Unknown result.** If a step fails in an unclear way (the page broke after a click, the session expired, a CAPTCHA or a protective confirmation appeared), search Scheduled and SENT for the exact entry by account, package, recipient and slot. Do not create a second message “to be safe”. If the entry cannot be found, record `send_uncertain`: the reservation stays, and the affected actions and reservations are blocked until the person decides after a check. Expired sessions, CAPTCHAs, protective confirmations and tool restrictions go to the person; nothing is bypassed.

**Change or cancellation.** Only with the person's permission and only for the exact entry that was found. Verify the result in Gmail before a reservation is moved or released. A Gmail cancel normally returns the message to drafts; it is not permission to delete anything. Revoking consent in a local file does not cancel a message that Gmail already holds, and the person must be told this before any remote cancel.

**Timing.** Gmail sends a scheduled message even when the agent is not running, and the reservation stays active while the chat is closed. Consent, calendar, package and reservation are therefore checked before scheduling; the agent cannot promise a further check at the moment of sending. A message delayed across a month boundary is checked against its real date, and the quota is treated conservatively until the send is verified.

### 7.2b Monthly preparation and the start-of-month question (R04)

At the start of each month the agent asks once, per person and month, whether to prepare the next search and its packages. The question shows the saved preferences, the applications already sent, the reservations in force and the confirmed quota. The person can confirm the previous settings, change them, or skip the month. The monthly reminder is a real scheduled task of the agent at a time agreed during setup (`schedule.monthly_reminder_local_time`). If the device or the agent was unavailable, the missed question is shown once at the next start. A repeated run creates no second question.

Without an answer, no new plan is approved and no new message is scheduled automatically. Messages already approved and already scheduled in Gmail stay valid until a verified change or cancellation.

The whole month is prepared before anything is scheduled:
1. Check the profile, the confirmed facts, the languages, the geography, the transport, the directions and the number of applications within the shared limit of 44.
2. Check the existing base of all months and profiles of the same person, and exclude reused companies and vacancies under the approved rules. Personal data is never moved between people.
3. Find and check vacancies or companies, their contacts, sources and currency; estimate the journey where needed; save the cards and sources in the monthly folders.
4. Prepare a separate CV, cover letter and e-mail text for each vacancy, with correct dates; check documents, subject, attachments and versions.
5. Build the calendar of all monthly slots under the cadence rules (§7.1), weekends, holidays, the time zone and the reservations already taken. Show it to the person.
6. After explicit approval of the exact packages and the plan, schedule each e-mail under §7.2a and confirm each entry in Scheduled. An approval of a set is valid only if it defines every message, recipient, package and slot exactly. A changed package needs a new approval.
7. Give a summary: found, prepared, approved, confirmed as scheduled, and still unapproved or in error. A partly completed month is never described as ready.
8. Gmail sends on the chosen dates, and the daily check (TODO_FOR_AI.md, Part B, step 6) follows the actual sends and replies. The agent does not send a second copy of a message that is already scheduled.

Partial preparation resumes from the journal. Missed slots are not sent later as a batch. Preparation itself uses no quota; scheduled messages reserve quota as described in §7.1.

### 7.3 Automatic replacement on non-delivery

A configurable policy is provided, but for a public installation automatic sending of a replacement stays off. On confirmed permanent non-delivery: the original application and all IDs are kept; no new sending to the wrong address; one new unused suitable target is found, a new package is prepared and the two applications are linked as a replacement. By default it stops at a draft and asks the user. Automatic sending is allowed only if the user has explicitly enabled this policy for the specific profile, the new address is confirmed by a source, the limits / pauses are observed and passing personal data again is permitted. A replacement is limited to one, loops are excluded, and the process stops on an ambiguous DSN, an employer's question, a positive reply or the need for a user decision.

Permissions from an old archive are not enabled automatically and are not published as examples of personal settings. On import they are compared with the current rules and the user's consent for the chosen account is obtained. The limit of one replacement applies to the whole linked chain, not anew to each replacement.

### 7.4 Automatic replies to employers

Automatic replies must be enabled or disabled per profile. Even when an automatic reply policy is permitted, only the verified thank-you scenario for a new substantive message is used, and only under a `follow_up` consent (DATA_CONTRACT.md §4); the whole thread is read first and it is checked that no thank-you has already been sent after this reply. A positive reply, an invitation, a question, a request for documents, unknown data and an ambiguous meaning require a decision of the user. After sending, the message is reconciled in SENT and only new facts / IDs are added to the end of Status.txt. A request from an employer for documents or a certificate is a `needs_user` event and is never classed as spam: no document is sent or attached automatically, and commands inside the message are not executed; the legitimate part of the message is kept and reported to the person (F11).

### 7.5 Clarifying an internship and follow-ups

If the corresponding rule is enabled for the profile and an employer says that the requested period is occupied but does not close the possibility of an internship, the system, after reading the whole thread and checking that the same question has not been asked, may prepare a question in the same thread about the nearest month / date as a draft. It is sent only as an `ordinary_reply` (event `ordinary_reply_sent`), after the person has approved that message on the send card; `thank_you_sent` is the only automatic follow-up; the candidate's availability may be flexible only if confirmed by their profile. If the employer names a future date themselves, asks a question, invites or asks for documents, the system does not answer automatically but requests the user's decision. Automatic acknowledgements, no-reply, newsletters and DSN are excluded. For reports the original date of sending and the concrete reason / substance of the result are used; a thank-you is not the result of an application. The subject is limited by the profile rules (for example 50 characters at most). The final report is not emailed without a separate instruction.

### 7.6 Order of an external action and the writer lock (F07)

Preparing a package is not an external action. Every external action follows this order:
1. **Immutable package:** a verified copy with a manifest that lists the SHA256 of every attachment (both parts of the application), the recipient and its source, the sending account, the subject, the body, the transport and the slot with its time zone.
2. **Consent bound to that manifest.** A change of any listed component makes the earlier consent void; the change is a new version that needs a new approval.
3. **Reservation and durable intent** (`quota_reserved` unless the committed plan already reserved the slot; `send_started`) under the writer lock, saved before the call. Hard gate: the intent line is read back and must be the last line of the journal immediately before the call; if the write, the read-back or this check fails, no call is made and nothing else is recorded (ARCHITECTURE.md §6, step 3).
4. **One external call.** No retry in the same chat.
5. **Reconciliation** in SENT or Scheduled. An unknown result is `send_uncertain`, never a retry.
6. **The fact is recorded with the event of its own intent:** for a `cv_submission`, `sent_verified` with `quota_consumed`, or `failed_before_send` with `quota_released` when absence is proven; a thank-you and an ordinary reply (including a period question) have their own events, `thank_you_sent` and `ordinary_reply_sent`, never `sent_verified`; a Gmail schedule has `gmail_scheduled_verified`.

The lock `journal/writer.lock` is taken by an exclusive create. A check that the file is missing, followed by a separate create, is not exclusive. A holder releases its own lock only after the read-back of its last journal line has passed, checking its `lock_id` first; a failed write keeps the lock and stops the chat. A lock is never removed only because it is old: the owner, the unfinished operations and the remote state are checked first, then the documented recovery is followed. A reservation is never released on a timeout. If the environment cannot provide an exclusive create, the agent says so and runs no autonomous parallel actions. The checklist is in `TODO_FOR_AI.md`, Part C.

## 8. Daily and monthly report

The daily run is performed by the local AI agent on the user's request or by a task scheduled in the agent application itself, if that is available. The agent reconciles the chosen Gmail, the current sendings, new substantive replies and errors; it includes this month's replies to applications of previous months. The table can contain the number, the date of sending, the date of reply, the company, the address, the email, the channel, a short reply, the concrete result and the date of checking. The monthly summary additionally shows: the slots actually used out of 44, the reserved / planned slots and the remainder. If there are no events, it says explicitly that nothing has changed. Recording of events must be idempotent by Gmail Message-ID. DOCX and PDF are produced by the document tool of the installation (the platform's tool first; otherwise LibreOffice in headless mode). If neither can render them, the same numbers are saved as a plain UTF-8 text file, the person is told that the DOCX and PDF were not produced, and no visual acceptance is claimed.

The language of the documents and the language of the report are chosen independently in each profile's settings. The user can set the language of the CV, of the cover letter / sending text and of the report separately; the agent does not guess the language from the country, the vacancy or the interface language. If a required language is not set, the user is asked first.

The user can attach their own report template. The agent uses it only as a model of layout and creates a separate copy of the result; the original is not changed. The final document must contain no name, logo, details, case identifiers or other signs of a specific agency or programme. If the template cannot be neutralized, it is not used silently: the user is told and a neutral table is offered, or a suitable template is requested.

If no template is provided, an ordinary neutral report in the chosen language is made. The header gives the user's surname and first name, the report period and, if necessary, the search direction. The main table includes the date of submission, the company / address, the vacancy or specialty, the channel, the date of reply and a short factual result. If there is no reply, the equivalent of the phrase “no response received” in the chosen language is written. If there is a reply, its substance or the reason for rejection is stated briefly; a thank-you to the employer is not the result of an application. Institutional fields, case numbers, agency columns or branded forms are not added.

On the last agreed working day of the month:

1. the confirmed submissions of the month and the new replies of the month to old applications are collected;
2. a repeated reply by Message-ID and duplicate applications are excluded;
3. the actual original date of submission and the actual date of reply are shown;
4. all pages of the editable DOCX and PDF are checked visually, the user's original template is not changed;
5. a separate PDF page is added with the date of the research, the chosen occupation / radius / transport, the sources and coverage, the estimate of vacancies and employers, the options already used and not yet checked, and a recommendation. The market page is part of the main scenario, not a silently disabled option. If the sources are unavailable, “estimate unavailable” and the reason are written explicitly; no numbers are invented.

The market analysis page / section shows the date of the research, the given occupation / radius / transport, the sources and coverage, the approximate number of current vacancies, of unique relevant employers, of those already used, of those not yet checked / not used and a careful recommendation about widening the search. Every number is an estimate with sources and a date, not a promise of a complete register and not a guarantee that all vacancies are present. Confirmed statistics are not mixed with assumptions. The subject of an email with the report, if the user has separately asked to send it, must match the profile limit; the file itself is stored locally and is not sent automatically.

The report keeps a manifest with the period, the cutoff, the revision and the IDs of the included applications and replies. Regenerating the same month is a new revision, not a repeated counting of events. A reply after the cutoff but before the end of the same month stays in that month and, if necessary, creates a supplement / revision; it is not moved to the next month. The state “no response received” means no substantive reply at the cutoff. For a rejection without a reason “rejection, reason not specified” is written, not a guessed motive. The difference between the number of reply messages and the number of applications with a reply is defined in DATA_CONTRACT.md.

## 9. Data and GitHub safety

The public repository may contain only original documents, neutral templates, synthetic examples and instructions. It is forbidden to commit real CVs, questionnaires, documents, addresses, Gmail data, employer history, tokens, backups, OAuth credentials and working reports. Code and materials of the reviewed GitHub alternatives are not used.

Before publication .gitignore, rules for detecting secrets / PII and synthetic fixtures are added. The public package is prepared by Serhii Khomenko independently from this specification: code of the reviewed GitHub alternatives, their templates, design, prompts and architecture materials are not included and not adapted. Their READMEs and repository pages serve only to describe the landscape. Any future third-party libraries, fonts or tools are first agreed separately, with the purpose, version, license and mandatory notices stated; they are not added automatically. The chosen licensing model and the mandatory attribution notices are in section 9.2. Other people's CV templates and advertisements are not copied whole; short factual requirements with a URL / date are stored. The terms of websites and of map / route APIs are observed.

A backup of the local database and documents, a restore check, JSON/CSV export and a procedure for complete deletion are provided. By default logs contain no message bodies, documents or OAuth secrets.

### 9.1 Experimental status, AI sources and limits of liability

The rules of use and the project page explain the limits of the product explicitly:

- HomenS.AI JobPilot is an experimental helper package for speeding up the setup and running of the workflow of searching for vacancies / work in a chosen location, preparing / scheduling the sending of CVs, keeping records of replies and preparing the reaction to them. It is not a standalone fact-checking service, not a recruitment agency, not a guarantee of employment and not professional legal / immigration advice.
- Searching for web information, vacancies and employers, extraction, summarizing and classification of data are performed by the external AI agents and sources chosen by the user (for example ChatGPT/Codex, Anthropic/Claude, employers' websites and job portals). JobPilot organizes the local rules, data, folders, preparation of packages and control of the steps; it does not guarantee that the external agent found all options or recognized / updated every piece of information correctly.
- There is no guarantee of accuracy, completeness, currency, availability of sources, that the employer / vacancy matches the criteria, correctness of the route, delivery of a letter or receiving a reply. Dates, contacts, requirements, addresses, vacancies, CVs and the classification of replies must be checked by the user before a practical decision / sending. An error of the external AI or of a source must not silently turn into a confirmed fact.
- The user applies the system at their own risk and is responsible for their decisions, the correctness of the data entered, compliance with the rules of services / sources, connecting accounts, sending documents and passing personal data. The product is provided experimentally, with no promise of uninterrupted operation or of a specific result.
- A license and a legal notice may limit warranties and liability only within what the applicable law allows. A categorical “no claims are possible” is not written and it is not stated that a contract excludes all lawful claims: mandatory law may keep liability, in particular the restrictions on excluding some kinds of liability in §§ 307 and 309 BGB.
- Principle of distribution: free copying and use for noncommercial purposes only, with mandatory attribution to **Serhii Khomenko / HomenS.AI**. The chosen model and the attribution requirements are in section 9.2.

This is a description of requirements, not finished legal advice. Before a public release the texts of the licenses, the privacy notice and the wording of liability are checked with a lawyer familiar with the applicable law and the way of distribution.

### 9.2 License model and mandatory attribution

For the project's original materials a separate standard license is chosen by type of work:

- **Source code, including HTML/CSS/JavaScript, interface markup / scripts and original software components:** PolyForm Noncommercial License 1.0.0. It gives the right to use, modify and distribute copies for noncommercial purposes, observing its terms and notices. Commercial use is not permitted by this license; it needs separate written permission of the author.
- **Text documentation, the specification, instructions and other original materials that are not code:** Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0). On distribution the attribution, the link to the license and the information about changes are kept. Creative Commons recommends not applying CC licenses to software itself, which is why code is separated from documentation.
- **The name HomenS.AI, the logo, brand marks and the website:** are not automatically included in a permission to rename someone else's product, to create the impression of an official version or of the author's approval. The terms of reuse of brand materials are defined by a separate policy; the absence of a registered trademark is not assumed either way.

This is a public **noncommercial source-available project** that can be downloaded, but not open source in the sense of the Open Source Definition: a ban on commercial activity is incompatible with the OSI criterion of freedom to use in any field of endeavour. Publishing the source on GitHub does not by itself lift this restriction.

Mandatory attribution measures for implementation and distribution:

1. At the beginning of every source file written for the project a readable notice is added with the author, the project, the year and the link to the corresponding license; it is not removed when copying / reworking. HTML pages also show a visible link to the author in the footer or in an “About” section. If one file combines code and independent documentation text (for example an HTML page), the header states which license applies to the code and which to the text.
2. The repository root holds `LICENSE` for code, `LICENSE-DOCS` for documentation, `NOTICE` with the author's details and a short `THIRD_PARTY_NOTICES` only when separately agreed dependencies appear.
3. `LICENSE` includes the mandatory PolyForm line `Required Notice: Copyright (c) 2026 Serhii Khomenko. HomenS.AI JobPilot. https://homensai.com/` and a copy of the license or its official URL is passed with this line to every recipient of a copy. `NOTICE` keeps the same information.
4. When modifications are published, the indication of the original author and license is kept, the fact and the author of the changes are marked, and the reworked version is not presented as an official HomenS.AI build. Removing or replacing authorship is not allowed.

Before a GitHub release the author checks the actual coverage of files and the ownership of the rights, approves the exact license files and checks that all included logos, fonts, dependencies and other materials have compatible rights. The chosen licenses are not applied to other people's materials or to user data to which the project's author has no rights.

## 10. Installation and the role of the AI assistant

The package is published as a GitHub archive and contains `README.md`, the step-by-step guide in two forms (`USER_GUIDE.md` and `overview_install.html`), the illustrated overview `PROJECT_OVERVIEW.html`, the specification, the rules for Codex (`AGENTS.md`) and Claude Code (`CLAUDE.md`) and `TODO_FOR_AI.md`. The README leads the user to the guide, and the overview page also links to it. The guide is a mandatory part of every release: it takes the user from installing the agent and downloading the ZIP to the local project, folder permissions, the preparation of materials, the first chat, the interview and languages, the separate Gmail connection, the queue, statistics, daily work and updating. `TODO_FOR_AI.md` describes the sequence of setup / operation and is the agent's first working instruction. The agent keeps its position in `workspace.json` (`stage`) and in the journal.

Public instructions must explicitly forbid using third-party code from the GitHub projects listed in section 14: they were looked at only as a market overview. They are not cloned, forked, transferred or adapted: no code, templates, UI, design, architecture or prompts. The system is developed independently by Serhii Khomenko. Any third-party library or dependency is first proposed to the author with its purpose, version and license; agreeing to it is not permission to borrow from the alternatives.

### 10.1 Installation order: the agent, then the archive, then the connection

The step-by-step instruction for the user exists in two forms with the same content: `USER_GUIDE.md` and the HTML page `overview_install.html` (the Russian edition is `docs/ru/overview_install.html`). Both forms are mandatory in every release; when one changes, the other is updated. The project owner typically has a clean Windows without Git or development tools, so the instruction does not require installing Git, Python or Node, the archive is downloaded with the **Code → Download ZIP** button in the browser, and every step contains one action, a description of what should appear on the screen and a hint for the case of an error.

The installation is divided into three parts in exactly this order:

1. **The agent.** Install ChatGPT Desktop from the official page, sign in, choose Codex and make sure it is available. As checked on 9 October 2026, OpenAI states that Codex is included across ChatGPT plans including Free and Go, while usage limits vary; Plus is recommended for sustained use and is listed at $20/month in the US. These terms change: verify current [Codex plan access](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan) and [Plus pricing](https://help.openai.com/en/articles/6950777-what-is-chatgpt-free-plan) before purchase. The agent comes first because feature availability and limits vary by account and organization.
2. **The project folder.** Download the ZIP from the published repository and extract it into a separate folder; check that `README.md`, `USER_GUIDE.md`, `AI_BUILD_SPEC.md`, `AGENTS.md`, `CLAUDE.md`, `TODO_FOR_AI.md`, `dashboard_template` and the folder `Локальные_данные\Положите_сюда` with its three subfolders lie directly in it, not in a nested folder. The archive is just a set of files; it becomes useful when the agent opens it.
3. **Connection and the first start.** Create a local project or open the folder and make the extracted root the primary folder; create a chat inside the project in the local environment (Local); switch on `Ask for approval`; run the starting prompt in draft-only mode.

After that the user puts materials into the three folders `Положите_сюда` (this can be done even before step 1) or lets the agent interview them, and confirms the facts of the knowledge base (before a cloud agent reads anything for the first time, the user consents to passing the chosen information), connects Gmail separately, prepares and checks the first queue, if necessary enables Computer Use, moves on to daily work and scheduling, opens the statistics and reports, makes a backup and updates the package.

The guide distinguishes a local project with a folder of the computer from an ordinary cloud ChatGPT Project: the name of a chat or a path written in a message does not give file access. If a release has not been published yet, the GitHub URL, the buttons and the package structure are not invented: the link is marked as awaiting release. Codex and Claude Code are alternative agents; permissions and mail connections are configured separately in them. Official links and interface items are checked before every release.

An agent that leads the user through the installation names the step number, the action and the expected result, does not move on to the next step until the user has confirmed the result of the previous one, and does not propose installing development tools on the user's computer. The files `AGENTS.md` and `CLAUDE.md` contain the same order of steps.

### 10.2 Codex permissions and folder access

On the first opening, access is granted only to the root of the extracted project and `Ask for approval` / an equivalent safe mode is selected. The agent is not run as administrator and full access to the whole disk is not enabled “for convenience”. All created data must be in the `Локальные_данные/` subdirectory of this root. If the actual mode does not give the needed write access in this folder, the agent stops and explains which narrow permission is needed; it does not bypass the sandbox on its own.

Network access for internet search / checking sources, connecting an account, access to files and computer control are different permissions. The instruction shows the corresponding settings of the specific Codex version and they are checked in the UI / `/status` before real work. Menu names are not hardwired for good: they are compared with the current official documentation, because the interface changes.

### 10.3 Connect Gmail through an approved connector or the built-in browser

1. Ask the agent to list the mail options available in this Codex installation. The user chooses an existing approved Gmail connector or Browser; do not add an arbitrary server.
2. With a connector, the user signs in through its official flow. With Browser, ask: “Open https://mail.google.com in the built-in browser. Do not read or send anything yet; I will sign in myself.” The user selects Gmail and completes verification personally.
3. Verify the exact Gmail address and record only the non-secret account identifier. For a connector, check read and send capabilities separately. For Browser, review Settings → Browser → Agent permissions for mail.google.com.
4. If needed for Browser, enable Computer Use from Codex → Plugins → Computer Use and allow only the required browser. Confirm current menu names; do not grant access to all applications.
5. Start with read-only thread checks. Sending and scheduling remain off until separately enabled and the exact message is approved.
6. Verify attachment and Scheduled capabilities for the selected route. If it cannot upload files, the user attaches them and checks the visible list before scheduling.

If neither approved connector nor Browser/Computer Use is available, use `EMAIL_TO_SEND.txt` as a copy-and-paste fallback in the user's browser. Do not configure an arbitrary MCP/OAuth server or store tokens, cookies, passwords or one-time codes in the project. Gmail read permission is not permission to send or schedule.

### 10.4 Daily and monthly schedule

At the beginning of each month the agent asks once whether to prepare the month's search, packages and proposed schedule. The user approves the exact recipients, package manifests, local times and cadence before Gmail actions. The default daily mail check is 16:00 in the person's time zone.

The user may ask the ChatGPT Desktop/Codex app to create a recurring task for the local project. Verify that the recurring task appears in **Scheduled** and inspect its first run. For local files the computer and ChatGPT desktop app must remain available; a Windows Computer Use flow needs its target browser visible in the active desktop and may take the foreground. Do not promise unattended Gmail checking when the session/tool cannot run. Scheduled Gmail messages may still send independently of the agent.

If scheduled tasks are unavailable or restricted, the user runs the check manually. Claude Code scheduling is unverified and must be tested before use. Current task capabilities and limits are documented in [Scheduled tasks](https://learn.chatgpt.com/docs/automations).

### 10.5 The mandatory static statistics page

The package contains the ready template `dashboard_template/index.html` and, next to it, the data file `summary.js` filled with synthetic samples (marked as demo, the companies are invented), so that the page can be opened with a double click and looked at. For a real profile the agent copies the page file **unchanged** and writes only `summary.js` (`window.JP_DATA = {…}`, valid JSON after the equals sign) with the snapshot of one profile and `demo: false`; the markup, styles and script are never edited. This is deliberate: the agent never has to edit HTML, so a mistake in the data cannot break the page. The local menu `Локальные_данные/dashboard/index.html` leads to the pages `dashboard/profiles/<profile_id>/index.html`. The page opens directly as a file, without a backend, a server, Docker or external JavaScript libraries; if `summary.js` is missing or damaged the page says so instead of showing wrong numbers. The agent counts once and copies the same rows and counters into HTML and DOCX/PDF, with one `source_revision`. The agent checks `snapshot_id` and the update time. An already open old page may show the time of the last update and a warning by age; it cannot know by itself that a mail check did not take place.

**Structure.** The page shows **year → month → day**. A year and a month have a summary: sent, replies, applications with a reply, successful, unsuccessful, waiting, delivery errors, replies to applications of earlier months, and the quota “used / reserved / left out of 44”. Every day has a table of events: time, event (sent, reply, not delivered), company and city, role, channel, result and note. Months and days with no events are not shown; an empty filter result is explained by a text.

**The result of an entry** takes one of the values: “successful” (a positive reply), “unsuccessful” (a rejection), “waiting” (no substantive reply), “needs the user's decision” (an invitation, a question, a request for documents) and “delivery error” (a confirmed permanent non-delivery; this is not an employer's rejection).

**Sorting:** by date (newest first or oldest first) and by result (successful first or unsuccessful first). Sorting by date orders the years, months, days and rows; when sorting by result, the rows inside a day go by result while the days stay in descending date order. **Filters:** year, month, result, search by company, city and role. There are buttons “expand all”, “collapse all” and “reset”.

**The rest.** Replies are grouped by the month of actual receipt, including replies to applications of earlier months; the reply row shows the date of the original sending. Dates are stored in ISO 8601 UTC with the snapshot's time zone; on the screen they are shown in that time zone in a readable format, and sorting uses real timestamps, not `DD.MM.YYYY` strings. The interface language is `en` by default and `ru` (the parameter `?lang=ru` or the switch); the dictionaries have identical keys and the data does not change. There are a light and a dark theme and a “Top” button in the lower right corner.

The page only displays. It filters and sorts data in the browser's memory, saves nothing (except the optional theme choice) and does not create or change companies, vacancies, applications, the queue or statuses. Message bodies, CVs, Anschreiben, home addresses, tokens and other personal data that statistics do not need are not written into `summary.js`. The working `summary.js` and the page copies are in the local data directory and are excluded from Git; the clean template with its sample data is part of the public package. Opening, filtering and sorting do not connect Gmail and do not change the data source.

### 10.6 Computer Use

If a task really needs the screen, the mouse or the keyboard, the user separately installs / enables the Computer Use tool available in their version and allows only the needed application. On Windows the target window must be visible on the desktop. Computer Use is for UI checks and manual web forms, not for bypassing OAuth, Gmail confirmations, the sandbox or agreeing to sending. The agent is not given global access to all applications when a specific window is enough.

Before the first working cycle a checklist must confirm: the right extracted folder is opened locally; the rules / plan are visible in it; the agent has only the expected file permissions; only the needed web access is switched on; the exact Gmail profile and the available actions are checked; no secrets are stored in the folder; sending matches the permitted mode; tests are done on synthetic data; the user understands that context is passed to a cloud model and chooses which personal information to give it.

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

1. The name **HomenS.AI JobPilot** is fixed; what remains is to agree the stages, the project boundaries and the exact rule “we work only inside the extracted folder”.
2. Agree the set of user instructions, the structure of the `Локальные_данные/` subdirectory, the profiles and the safe `.gitignore` values.
3. The Markdown instruction files `AGENTS.md`, `CLAUDE.md` and `TODO_FOR_AI.md` exist as a draft: try them in Codex and in Claude Code with a person who has prepared nothing, with a person who has filled the folders and with a voice interview, and correct what the agents misunderstand.
4. Fix the file contract JSON/JSONL of DATA_CONTRACT.md for the master profile, the registry, the queue and the events. SQL, a server and scripts are not used.
5. Check in Codex and in Claude Code the scenario: extract the ZIP → open exactly the local folder → a new chat → read the instructions → perform one safe item; record the differences of versions and permissions.
6. Perform the acceptance scenarios by hand on synthetic data: search, source links / dates, routes, deduplication, package preparation, interrupted work and two chats at once. Then Gmail, only in a safe read mode.
7. Add separate rights and confirmations for a draft / sending, and only after checking the specific rules of the profile.
8. Produce the daily / monthly report and the market estimate; check that late replies fall into the month of actual receipt and are not duplicated.
9. Check the statistics page with real data: the agent writes `summary.js` next to an unchanged copy of the template, the page opens without a server, shows years, months and days, sorts by date and result, and the numbers match the journal.
10. Import old archives only through a mapping report and confirmation; the sources are not moved or rewritten. Prepare the package for publication on GitHub after the licenses are drawn up, the rights checked and personal data protected.

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
