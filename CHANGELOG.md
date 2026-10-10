# Changelog

[English](CHANGELOG.md) | [Русский](docs/ru/CHANGELOG.md)

The project version is in the file [VERSION](VERSION). The project is an AI-agent workflow package, not a standalone job-search or mail-sending application. Its local statistics view contains HTML/CSS/JavaScript for displaying and sorting a snapshot.

Rules: `MAJOR.MINOR.PATCH`. MAJOR changes when data formats or rules change so that old data no longer fits. MINOR is a new feature or a new part of the documentation. PATCH is a fix or a wording change without new capabilities. Every change to `main` adds a line here; the number is raised when a release is made. Each release gets a git tag `vX.Y.Z`. **Language rule (from 1.22.0, for all HomenS.AI repositories):** every entry is written in English first, and the same text in Russian directly below it (`**English.**` block, then `**Русский.**` block, each with its own bullet list). The GitHub release notes are taken from this section, so every release reads English first, Russian below. The same bilingual entry appears in `CHANGELOG.md` and `docs/ru/CHANGELOG.md`. Entries before 1.22.0 are kept as they were written.

## 1.23.0 — 10 October 2026

**English.** All folders now have English names, so that they are the same on every computer and for every agent: `Local_Data` (was `Локальные_данные`), `Put_Here` (`Положите_сюда`), `1_My_Documents`, `2_My_Story`, `3_Report_Template`, `4_CV_Templates`, `5_Cover_Letter_Templates`, `Knowledge_Base/Life_Story.md`, `Story_Questions.md` and the interview file `Interview_<YYYY-MM-DD>.md`. A table with the meaning of every folder in Russian, German and Ukrainian is in the README of each edition, on the installation page and in `Local_Data/Put_Here/README.md`; the agent also gives the meaning in the person's language when it names a folder. All documents, pages, examples, `.gitignore` and the privacy gate follow the new names. This changes the folder layout, so the minor number is raised; a folder made with an earlier version is renamed by hand to the new names.

- **Files:** the folder tree under `Local_Data/`; every instruction file, guide and page in four languages; `.gitignore`; `.github/workflows/privacy-gate.yml`; `examples/`.

**Русский.** Все папки теперь называются по-английски, чтобы на любом компьютере и для любого агента они были одинаковыми: `Local_Data` (было `Локальные_данные`), `Put_Here` (`Положите_сюда`), `1_My_Documents`, `2_My_Story`, `3_Report_Template`, `4_CV_Templates`, `5_Cover_Letter_Templates`, `Knowledge_Base/Life_Story.md`, `Story_Questions.md` и файл интервью `Interview_<YYYY-MM-DD>.md`. Таблица со значением каждой папки на русском, немецком и украинском есть в README каждой редакции, на странице установки и в `Local_Data/Put_Here/README.md`; называя папку, агент тоже говорит её значение на языке человека. Все документы, страницы, примеры, `.gitignore` и проверка личных данных переведены на новые названия. Это изменение структуры папок, поэтому повышен минорный номер; папку, созданную прежней версией, нужно переименовать вручную.

- **Файлы:** дерево папок в `Local_Data/`; все файлы инструкций, руководства и страницы на четырёх языках; `.gitignore`; `.github/workflows/privacy-gate.yml`; `examples/`.

## 1.22.3 — 10 October 2026

**English.** Preparation for opening the repository to the public. The developer's working notes moved into the new folder `dev/` with a note that they are not for users and not for the agent that runs a job search. `NOTICE` and the README now give an additional permission: any person may use JobPilot for their own job search, also for paid work; offering it to others as a paid service still needs the author's permission. The guide says plainly that the developer uses this way of working for his own job search and it works well for him, while the standardized package is new and not yet tested with other people's accounts. Two releases can no longer run at the same time on GitHub.

- **Files:** `dev/README.md`, `dev/NEXT_SESSION.md`, `dev/REMAINING_WORK.md`, `NOTICE`, README and USER_GUIDE in four languages, `AI_BUILD_SPEC.md` links, `index.html`, `.github/workflows/release.yml`.

**Русский.** Подготовка к открытию репозитория для всех. Рабочие заметки разработчика перенесены в новую папку `dev/` с пометкой, что они не для пользователей и не для агента, который ведёт поиск работы. В `NOTICE` и README добавлено дополнительное разрешение: любой человек может использовать JobPilot для собственного поиска работы, в том числе оплачиваемой; предлагать его другим как платную услугу по-прежнему можно только с разрешения автора. Руководство прямо говорит, что разработчик сам ищет работу таким способом и у него это работает хорошо, а стандартный пакет новый и с чужими аккаунтами ещё не проверялся. Два выпуска на GitHub больше не могут идти одновременно.

- **Файлы:** `dev/README.md`, `dev/NEXT_SESSION.md`, `dev/REMAINING_WORK.md`, `NOTICE`, README и USER_GUIDE на четырёх языках, ссылки в `AI_BUILD_SPEC.md`, `index.html`, `.github/workflows/release.yml`.

## 1.22.2 — 10 October 2026

**English.** The author page shows the author's robot from the HomenS.AI style core to the right of the heading: the gear of the logo turns into a robot head and winks, and the word “HomenS.AI” appears under it; a button replays the animation. On a phone the robot stands above the heading; with “reduce motion” it is shown at once. The robot code is the author's own and is copied unchanged from the style core. Four languages. A page change, so the patch number is raised.

- **Files:** `assets/robot.js`, `assets/logo-word.js`, `assets/author-robot.js`, `assets/site.css`, `overview_author.html` in four languages.

**Русский.** На странице автора справа от заголовка появился робот автора из единого ядра стиля HomenS.AI: шестерёнка логотипа превращается в голову робота и подмигивает, под ним появляется надпись «HomenS.AI»; кнопка повторяет анимацию. На телефоне робот стоит над заголовком; при настройке «меньше движения» он показан сразу. Код робота — собственный код автора, скопирован из ядра стиля без изменений. Четыре языка. Это изменение страницы, поэтому повышен номер исправления.

- **Файлы:** `assets/robot.js`, `assets/logo-word.js`, `assets/author-robot.js`, `assets/site.css`, `overview_author.html` на четырёх языках.

## 1.22.1 — 10 October 2026

**English.** The Russian, German and Ukrainian editions of the six instruction files are translated anew from the shorter 1.22.0 English text (same headings, tables and technical names in all four languages). Several overview pages are rewritten in plain words for people who are not programmers: the CV and cover-letter templates (steps, two cards and a short explanation of every link), the rules for the facts of the knowledge base, the monthly report and the journal. No rule changed, so the patch number is raised.

- **Translations:** `docs/ru|de|uk`: AGENTS, TODO_FOR_AI, OPERATING_REQUIREMENTS, DATA_CONTRACT, ARCHITECTURE, AI_BUILD_SPEC; links to the templates section point to the translated headings.
- **Pages:** `overview_install.html`, `overview_profile.html`, `overview_architecture.html`; four languages.

**Русский.** Русская, немецкая и украинская редакции шести файлов инструкций переведены заново с короткого английского текста 1.22.0 (те же заголовки, таблицы и технические названия на всех четырёх языках). Несколько страниц обзора переписаны простыми словами для людей, которые не программисты: шаблоны резюме и сопроводительного письма (шаги, две карточки и короткое пояснение к каждой ссылке), правила для фактов базы знаний, ежемесячный отчёт и журнал. Правила не менялись, поэтому повышен номер исправления.

- **Переводы:** `docs/ru|de|uk`: AGENTS, TODO_FOR_AI, OPERATING_REQUIREMENTS, DATA_CONTRACT, ARCHITECTURE, AI_BUILD_SPEC; ссылки на раздел о шаблонах ведут на переведённые заголовки.
- **Страницы:** `overview_install.html`, `overview_profile.html`, `overview_architecture.html`; четыре языка.

## 1.22.0 — 10 October 2026

**English.** The instructions for the agent are half as long and say each rule once. The six instruction files shrank from 423 KB to 242 KB: every rule now lives in one place, and other files point to it instead of repeating it in other words. The agent reads `AGENTS.md`, `TODO_FOR_AI.md` and `OPERATING_REQUIREMENTS.md` at the start (about 75 KB instead of the whole set); `DATA_CONTRACT.md` and `ARCHITECTURE.md` are its reference by section; `AI_BUILD_SPEC.md` is the description for people. No feature was removed. Errors found in the review are fixed at the same time:

- **Journal on every system:** the append is checked by the byte size and checksum of the file before the new line, with working commands for Windows PowerShell, macOS and Linux (`head -n -1` did not work on macOS and had no Windows form); files are UTF-8 without BOM with LF line ends; the lock file is created with its content in one command, and an empty lock is treated as someone else's.
- **Monthly limit:** reserved places were counted twice (slots of a plan and missed slots carried the same field); the plan slot field is now `slot_month`, and every count is one simple text search.
- **Daily limit:** one wording everywhere: a CV is refused when that local day has already reached `max_per_day`; for a Gmail scheduled message the day of sending counts, not the day of scheduling.
- **First setup:** an interrupted step A2 no longer creates the person twice; the story is saved after every message; one `profile_created` line after the confirmed read-back; the mail questions moved to A8; the monthly reminder task is created once (A9); the views are built after the last line of A9; the settings example has no pre-filled answers.
- **Other:** an unknown Gmail scheduling result is `send_uncertain`; a document added later is copied by the person into `1_Мои_документы`; text from vacancies is escaped on the statistics and readiness pages; a note for temporary cloud sessions; a new language rule for the changelog (English first, Russian below).
- **Not yet done:** the Russian, German and Ukrainian editions still describe 1.21.0 and will be rebuilt from the shorter English text after the owner approves it.

**Русский.** Инструкции для агента стали вдвое короче, и каждое правило записано один раз. Шесть файлов инструкций сократились с 423 КБ до 242 КБ: каждое правило теперь живёт в одном месте, а другие файлы ссылаются на него, а не пересказывают другими словами. В начале чата агент читает `AGENTS.md`, `TODO_FOR_AI.md` и `OPERATING_REQUIREMENTS.md` (около 75 КБ вместо всего набора); `DATA_CONTRACT.md` и `ARCHITECTURE.md` — справочник по разделам; `AI_BUILD_SPEC.md` — описание для людей. Ни одна функция не удалена. Заодно исправлены ошибки, найденные при проверке:

- **Журнал на любой системе:** дописывание проверяется по размеру в байтах и контрольной сумме файла до новой строки, с рабочими командами для Windows PowerShell, macOS и Linux (`head -n -1` не работал на macOS и не имел формы для Windows); файлы — UTF-8 без BOM с переводом строки LF; файл блокировки создаётся сразу с содержимым одной командой, а пустая блокировка считается чужой.
- **Месячный лимит:** резервы считались дважды (слоты плана и пропущенные слоты несли то же поле); поле слота теперь `slot_month`, и каждый подсчёт — один простой поиск по тексту.
- **Дневной лимит:** одна формулировка везде: резюме не отправляется, если в этот местный день уже достигнут `max_per_day`; для письма, запланированного в Gmail, считается день отправки, а не день планирования.
- **Первичная настройка:** прерванный шаг A2 больше не создаёт человека второй раз; рассказ сохраняется после каждого сообщения; одна строка `profile_created` после подтверждённого пересказа; вопросы о почте перенесены в A8; задача ежемесячного напоминания создаётся один раз (A9); представления строятся после последней строки A9; в примере настроек нет заранее заполненных ответов.
- **Другое:** неизвестный результат планирования в Gmail записывается как `send_uncertain`; документ, добавленный позже, человек сам копирует в `1_Мои_документы`; текст вакансий экранируется на страницах статистики и готовности; заметка о временных облачных сессиях; новое правило языков для changelog (сначала английский, ниже русский).
- **Ещё не сделано:** русская, немецкая и украинская редакции пока описывают 1.21.0; они будут пересобраны из короткого английского текста после одобрения владельцем.

## 1.21.0 — 10 October 2026

**English.** The way the 44 places of a month are spread is now the person's own choice: all on one day, a few a day, on chosen weekdays or any other rhythm. The person states this rule to the agent in their own words; it is saved word for word as `schedule.sending_rule_statement`, the agent never chooses it, and no plan is made without it. The daily maximum `max_per_day` is therefore 1 to 44 (44 = the whole month on one day; 0 and 45 or more are refused) and has no default value any more; a run may send more than two messages (`max_per_run` from 1 up to `max_per_day`, each at its own time or after an interval). The overview pages also move more: arrows between the steps, a line that joins the numbered steps, a reading-progress line at the top, a "scroll on" arrow under the title, blocks that appear while scrolling and cards that lift under the pointer; all of it stops when the system asks for reduced motion. The monthly limit of 44 is unchanged. This changes a rule, so the minor number is raised.

- **Rules:** AGENTS, TODO_FOR_AI (A7, R02, plan, send check), DATA_CONTRACT (§5, §13.1, §13.2), AI_BUILD_SPEC, ARCHITECTURE, ACCEPTANCE_TESTS (R02, CAD-02), USER_GUIDE (step 12), `examples/settings.example.json`; four editions.
- **Pages:** `assets/site.css`, `assets/site.js` (all overview pages); the overview "Schedule" step and the limits diagram on the architecture page; four editions.

## 1.20.0 — 10 October 2026

**English.** Preparation for the public release, after a consistency review of all texts and a cold read of the copy-paste prompts as a new ChatGPT/Codex agent would see them. There is now one start command (it names `AGENTS.md`, `TODO_FOR_AI.md` and `OPERATING_REQUIREMENTS.md`); the prompts for a stuck setup and for adding a document follow the rules (consent first, the setup stage, the agent never writes into `Положите_сюда`); three short prompts are added (Gmail for reading only, the check before sending, the next month). The status of the checks is stated once and honestly (model run, dry runs on made-up people, the statistics page in a headless browser, the privacy gate tested locally; nothing with real Gmail, Codex, the user's Claude Code, Word or real users). Claude Code is described as "compatibility not confirmed" everywhere; the refusal of the 45th application is described as a rule the agent follows, not a technical lock. "Four editions" and "five folders" are used throughout; the licence notices say "HomenS.AI" and point to the existing font licence files; the stage names of the first setup are listed in the data contract. The Russian, German and Ukrainian editions were brought in line with the English text, including the prompts. This changes what the user is told to do, so the minor number is raised.

- **Documents:** README, USER_GUIDE, REVIEW, RELEASE_CHECKLIST, AGENTS, AI_BUILD_SPEC, ARCHITECTURE, DATA_CONTRACT, TODO_FOR_AI; four editions.
- **Pages:** overview, install, profile, safety and architecture pages; four editions.
- **Notices:** NOTICE, LICENSE (Required Notice), the README of the materials folder.

## 1.19.2 — 10 October 2026

**English.** `NEXT_SESSION.md` is added: an ordered list of what to do next, the working rules and the open decisions, for the next AI session. The Russian, German and Ukrainian editions were edited in a consistency pass against the English text; the pass was cut short by a session limit, so it is not finished. This is a developer file, so the patch number is raised.

- **Files:** `NEXT_SESSION.md`, `REMAINING_WORK.md`, partial edits in `docs/ru|de|uk`.

## 1.19.1 — 10 October 2026

**English.** The value of the saved time on the statistics page now uses one rate, the German statutory minimum wage for 2026 (13.90 EUR gross per hour), for every month, and says so; the 2025 and 2027 rates are removed. The sources stay linked and the rate is not updated automatically. This is a simplification without new capabilities, so the patch number is raised.

- **Pages:** the statistics page (`dashboard_template/index.html`), four languages.

## 1.19.0 — 10 October 2026

**English.** The statistics page has a new block, “What the saved time is worth (Germany)”: the hours saved, multiplied by the statutory minimum wage in Germany (13.90 EUR gross per hour from 1 January 2026, 14.60 EUR from 1 January 2027, 12.82 EUR in 2025), shown as a total, for the latest month and for each year, as bars on the page and as a table by month with the rate used. It is marked with an asterisk as a rough estimate, not income. The rates were checked on 10 October 2026 against the BMAS press release of 27 June 2025 and the Fünfte Mindestlohnanpassungsverordnung (both linked on the page); they are not updated automatically. This is a new part of the page, so the minor number is raised.

- **Pages:** the statistics page (`dashboard_template/index.html`), four languages.

## 1.18.4 — 10 October 2026

**English.** On the statistics page, the monthly-limit bar now carries its own text: “used · reserved · left / limit” is written on the bar itself instead of beside it. The bar is taller to make room. This is a layout change without new capabilities, so the patch number is raised.

- **Pages:** the statistics page (`dashboard_template/index.html`).

## 1.18.3 — 10 October 2026

**English.** The time-saved estimate is recalculated: one application now takes 30 minutes in all, not 70 (the example values) or 100 (the sample on the statistics page). The six steps are 10, 8, 3, 4, 3 and 2 minutes. The sample statistics page now shows about 15.5 hours saved for 31 applications. The person's own numbers still replace these estimates. This changes example values only, so the patch number is raised.

- **Files:** `examples/settings.example.json`, `dashboard_template/summary.js`, the playbook question in `TODO_FOR_AI.md` (four editions), `REMAINING_WORK.md`.

## 1.18.2 — 10 October 2026

**English.** On the statistics page, the monthly-limit bars are now shorter and thinner, and the text next to each bar (“used … · reserved …”) takes the width it needs, so it no longer runs out of its card. This is a layout fix without new capabilities, so the patch number is raised.

- **Pages:** the statistics page (`dashboard_template/index.html`).

## 1.18.1 — 10 October 2026

**English.** The Safety page now links the author's name to his website, homensai.com, in the sentence about the visible author link on every page. This is a wording change without new capabilities, so the patch number is raised.

- **Pages:** the safety page (EN, RU, DE, UK).

## 1.18.0 — 10 October 2026

**English.** The instructions for the agent were tried on three made-up people (nothing prepared, folders filled, a long voice story) by an agent in a sandbox, and the rules were corrected from the findings, in all four editions. A fact the person does not confirm stays `proposed` and the stage does not advance; before the time zone is known the UTC month is used; a person-level session note is created at the start so that the lock is recognised; the readiness page starts at the end of the search setup and the template shows its row markup; holidays without a web search are named by the person; a person who declined mail tracking gets no daily mail check; the rules for templates (DOCX, Markdown and PDF sources, an unapproved working copy, the photo slot) are one; a contradiction between an attachment and the confirmed facts is shown to the person; the age counts as sensitive; recursive listing of the workspace before the consent is forbidden. Example settings gained `holiday_source` and `dst_rule`. The release workflow now updates the version badge on every page (it did not match badges with a `style` attribute, so pages showed an old version). The results of the simulation and the dry runs are in `examples/simulation/SIMULATION_REPORT.md`. The Roadmap page lists what is done and what is not in plain words. This is a change of rules, so the minor number is raised.

- **Rules:** TODO_FOR_AI.md (A1–A9, Part B and C), AGENTS.md, DATA_CONTRACT.md (§3a, §3c, §5, §10, §13.1), ARCHITECTURE.md (§4 rule 8, §4a), OPERATING_REQUIREMENTS.md (application templates); four editions.
- **Files:** `dashboard_template/readiness.html` (row markup), `examples/settings.example.json`, `examples/workspace.example.json`, the README of the materials folder, `examples/simulation/SIMULATION_REPORT.md`, `REMAINING_WORK.md`.
- **Release:** version badge pattern fixed in `release.yml`.

## 1.17.1 — 10 October 2026

**English.** Two inconsistencies in the rules are fixed: a refused send is always recorded as `send_blocked` (the playbook said “only if the person asked”, the data contract said “always”), and the line `send_started` of a thank-you or an ordinary reply now carries `reply_to_gmail_message_id`, so that an open attempt can be matched to its repeat key. A new workflow `privacy-gate.yml` stops a publication when private folders, secrets, foreign e-mail addresses or paths of a real computer are tracked; the release now waits for it. Synthetic output of a model run of the rules (journal, replies, statuses, quota) is added under `examples/simulation/`, and the acceptance document says that a model run is not an acceptance run. This is a fix and a new check without new user features, so the patch number is raised.

- **Rules:** TODO_FOR_AI.md (Part C, send check), DATA_CONTRACT.md (§3c `send_started`); all four editions.
- **Release:** `.github/workflows/privacy-gate.yml`; `release.yml` waits for it.
- **Examples:** `examples/simulation/` (synthetic, EXAMPLE ONLY).

## 1.17.0 — 10 October 2026

**English.** The Roadmap page is reorganised. The version history is now a short summary in plain words for each release, kept in `HISTORY.md` (one file per language) and turned into the page by the release workflow; the Ukrainian page is now updated by the workflow too. The “Finished” and “Not done yet” lists are rewritten without technical terms, and the section “What remains to be done” is removed from the page: the list for the developer is now the root file `REMAINING_WORK.md`, and the page points to GitHub for the extended description. The Author page loses its sections “Background” and “Projects” and gets a new introduction; the contact and licence sections stay. This is a new part of the documentation, so the minor number is raised.

- **Files:** `HISTORY.md`, `docs/ru/HISTORY.md`, `docs/de/HISTORY.md`, `docs/uk/HISTORY.md`, `REMAINING_WORK.md`; links in `index.html` and `README.md`.
- **Release:** the workflow reads `HISTORY.md` instead of `CHANGELOG.md` for the page, includes the Ukrainian page, and warns when `HISTORY.md` has no line for the newest version.
- **Pages:** roadmap and author pages (EN, RU, DE, UK).

## 1.16.3 — 10 October 2026

**English.** The note at the end of the “Authorship and license” section of the Safety page is removed in all four languages. It said that LICENSE-DOCS and NOTICE were still to be added, which is no longer true: both files are in the repository. This is a wording change without new capabilities, so the patch number is raised.

- **Pages:** the safety page (EN, RU, DE, UK).

## 1.16.2 — 10 October 2026

**English.** The Safety page now states plainly who answers for the data: JobPilot works only through a cloud AI agent that the person chooses; where the data goes after the agent reads it, and what the agent's provider does with it, is the responsibility of that agent and its provider. Anyone who is worried that their data may go on beyond their control should not use the product. This is a wording change without new capabilities, so the patch number is raised.

- **Pages:** the safety page (EN, RU, DE, UK), section “Privacy and confirmed facts”.

## 1.16.1 — 10 October 2026

**English.** The fourth diagram on the architecture page, “Journal segments”, is removed in all four languages. It showed how the internal journal is split into files, which means nothing to the person using JobPilot. The page now has three diagrams: the path of one application, the six checks before sending, and the daily and monthly limits. This is a text and layout change without new capabilities, so the patch number is raised.

- **Pages:** architecture page (EN, RU, DE, UK).

## 1.16.0 — 10 October 2026

**English.** Every employer reply is now saved in full into the application folder, in a new file `Replies.txt` («Ответы»). For each incoming message the agent writes the sender name and address, Reply-To, Message-ID, date and time with the time zone, the sending IP address and the Received chain, authentication results, subject, recipients, the full text verbatim, and the attachments (name, type, size) or “no attachments”. What the mail tool does not provide is written as “not provided by the mail tool”, nothing is guessed. Earlier blocks are never rewritten, and a message is added once. The journal line `mail_received` carries the file path and the checksums of the headers and of the text. This is a new capability, so the minor number is raised. On the architecture page, diagram 2 is renamed “Six checks before sending” and rewritten in plain words (what each check does and what happens when it fails), and diagram 3 now says that the daily maximum is only a ceiling, not a minimum number of sending days; all four languages.

- **Rules:** AGENTS.md, TODO_FOR_AI.md (“Read and classify mail”), DATA_CONTRACT.md (§1, §3c), ARCHITECTURE.md, AI_BUILD_SPEC.md; test RPL-01 in ACCEPTANCE_TESTS.md; all four language editions.
- **Pages:** architecture page (EN, RU, DE, UK), heading of diagram 2.

## 1.15.1 — 10 October 2026

**English.** The templates block in the Prepare section is redesigned in the site style: four numbered steps, two cards (“No template yet?” and “A photo on the CV”) and a note that the originals are never changed. The block is taken out of a nested card where it sat untidily. This is a layout change without new capabilities, so the patch number is raised.

- **Pages:** the install page (EN, RU, DE, UK), section “Prepare your materials”; styles in assets/site.css.

## 1.15.0 — 10 October 2026

**English.** An index page `index.html` is added at the root: all pages and documents in one place, with a block for each language edition (EN, RU, DE, UK). It is the page to open first, so it is clear where to start. This is a new part of the documentation, so the minor number is raised.

- **Page:** index.html (root); all links checked; version badge in the top-left corner.

## 1.14.5 — 10 October 2026

**English.** Every HTML page now shows a version badge in the top-left corner, for example `v1.14.5`, so a screenshot shows which version is open. The number comes from the VERSION file and is updated at every release by a step of the release workflow. This is a visible label without new capabilities, so the patch number is raised.

- **Pages:** overview, safety, install, roadmap, author page, PROJECT_OVERVIEW in four languages, and the statistics page (template).
- **Release:** a workflow step keeps the badge equal to VERSION.

## 1.14.4 — 10 October 2026

**English.** The Prepare section of the install page gets a block on the CV and cover-letter templates: what to put into folders 4 and 5, how the agent prepares drafts, how a template for mailings is chosen, what happens without a template, how a PDF is checked and when a photo appears. The block is in all four languages. This is a text change without new capabilities, so the patch number is raised.

- **Pages:** the install page (EN, RU, DE, UK), section “Prepare your materials”.

## 1.14.3 — 10 October 2026

**English.** The language switcher on the overview pages shows all four languages (EN, RU, DE, UK) without shrinking. The buttons no longer compress in a narrow row or get clipped on scaled screens. This is a visual fix without new capabilities, so the patch number is raised.

- **Styles:** assets/site.css, the language group.

## 1.14.2 — 10 October 2026

**English.** The four editions are brought to one structure: the Russian edition gets `AGENTS.md` and `TODO_FOR_AI.md`, and its missing table rows and identifiers are restored; the German data contract is re-translated from version 1.9.0; the Ukrainian edition gets the folders 4 and 5 in its tree, install page, profile page and rules. The README and the specification now name four editions. `CLAUDE.md` stays only at the root: it is the entry file for Claude Code, not a document. This is a structural alignment without new capabilities, so the patch number is raised.

- **Editions:** docs/ru (AGENTS, TODO_FOR_AI, acceptance rows), docs/de (data contract 1.9.0), docs/uk (tree, install page, profile page).
- **Root:** the README and the specification name four editions.

## 1.14.1 — 10 October 2026

**English.** The wording about the folders “4_Шаблон_резюме” and “5_Шаблон_сопроводительного_письма” is corrected: they hold all material about CVs and letters, and the Word working copy of the template the person names is made in “Resume” and “CoverLetter” after the page check. The old phrases “DOCX next to the PDF” and “converted in the same folder” are removed from the rules, the guide, the install page and the template README. This is a wording correction without new capabilities, so the patch number is raised.

- **Rules:** TODO_FOR_AI.md (application templates), AI_BUILD_SPEC.md (folder tree).
- **Documents:** USER_GUIDE.md, the install page, examples/templates/README.md.

## 1.14.0 — 10 October 2026

**English.** Ukrainian is added as a full package: the documents in `docs/uk` (rules, guide, specification, data contract, acceptance scenarios, overview pages), the statistics and readiness pages, neutral CV, letter and report templates in DOCX and PDF, and Ukrainian in the language lists of the settings. The translation has not yet been checked by a native speaker; the translation audit is the next stage. The folders “4_Шаблон_резюме” and “5_Шаблон_сопроводительного_письма” take all material about CVs and letters in any format, old versions included: the agent reads it, prepares drafts and asks you to check them. The template for mailings is the one you name; without a template the agent offers three layout variants or takes a template you send. Roadmap page: the version history is generated from this changelog at each release; the sentence about “three replies” is removed. This is a new part of the rules and the documentation, so the minor number is raised.

- **Languages:** `en`, `ru`, `de`, `uk` in the settings and on the pages; a link to the Ukrainian edition in the README.
- **Folders:** `4_Шаблон_резюме/`, `5_Шаблон_сопроводительного_письма/` (README in three languages); working `Resume/` and `CoverLetter/`.
- **Release:** the workflow step updates the version history on the roadmap page.
- **Acceptance:** RES-01, RES-03, RES-04 (status NOT RUN until a run is recorded).

## 1.13.0 — 10 October 2026

**English.** A photo rule is added for the CV. A photo goes into the CV only by the person's choice: the picture must be in `1_Мои_документы` and `templates.cv.photo_use` must be true. Then it is placed in the top-right corner of the first page at 30 × 40 mm by default; the person may choose another size, and the proportions of the picture are kept. A photo is never added to the cover letter. A CV with a photo counts as a sensitive attachment and passes the attachment check. This is a new rule for the CV, so the minor number is raised.

- **Rules:** AGENTS.md (the photo exception), TODO_FOR_AI.md (the profile question and the rule “Photo on the CV”), DATA_CONTRACT.md (row “CV photo”).
- **Settings:** `templates.cv.photo_use`, `photo_relative_path`, `photo_width_mm`, `photo_height_mm` in examples/settings.example.json.
- **Acceptance:** CV-PH-01 (status NOT RUN until a run is recorded).
- **Removed:** the market page (overview_market.html, EN, RU, DE) with its navigation links, the “Similar projects” card and the pager links; it compared other people’s projects and was not about this package.

## 1.12.0 — 10 October 2026

**English.** An author page (EN, RU, DE) is added with background, projects and contacts; the Author link is in the navigation of all overview pages. The links to the vendor documentation moved from the install page to the Safety page, each with a short purpose and its step number. Unsupported claims were fixed on the overview pages: a photo is not requested and enters documents only by the person's explicit choice; the German footer date and the list of languages in the roadmap were corrected. This is a new part of the documentation, so the minor number is raised.

- **Pages:** overview_author.html (EN, RU, DE); the “Official documentation” section on the Safety page.
- **Fixes:** the photo sentence in the profile; the date and the language list; the book DOI on the author page.
- **Left as is:** the market page and the version history in the roadmap — an owner decision.

## 1.11.0 — 10 October 2026

**Русский.** Страницы обзора получили иконку сайта — логотип HomenS.AI, который показывается во вкладке браузера. На странице архитектуры добавлены четыре интерактивные схемы: путь одной заявки, ворота отправки, дневной и месячный лимит, деление журнала на части. Схемы только показывают правила; ничего не отправляют и не меняют файлы. Это новая часть документации, поэтому номер минорной версии повышен.

- **Страницы:** иконка (`assets/logo.svg`) на всех страницах обзора в трёх языках; общие стили для интерактивных схем в `assets/site.css`.
- **Схемы:** интерактивный раздел 04 на странице архитектуры (EN, RU, DE).

**English.** The overview pages now show the site icon, the HomenS.AI logo, in the browser tab. The architecture page has four interactive diagrams: the path of one application, the send gate, the daily and monthly limits, and the split of the journal into parts. The diagrams only explain the rules; they send nothing and change no file. This is a new part of the documentation, so the minor number is raised.

- **Pages:** the icon (`assets/logo.svg`) on all overview pages in three languages; shared styles for the diagrams in `assets/site.css`.
- **Diagrams:** interactive section 04 on the architecture page (EN, RU, DE).

## 1.10.0 — 10.10.2026

**Русский.** Завершён выбор шаблонов и уточнена область квоты по указанию владельца. Самостоятельные отправки пользователя не занимают 44 CV-слота JobPilot; ручной запасной способ для пакета JobPilot учитывается. Две подряд управляемые CV-подачи на один нормализованный адрес запрещены; допустимые ответы без CV сохраняют собственные правила.

- Схема профиля 1.4 хранит выбранные источники CV/письма и пути редактируемых DOCX, хеши и время проверки. PDF сохраняется неизменным, конверсия требует сравнения страниц и утверждения; недоступная конвертация явно сообщается. Существующие нейтральные образцы DOCX/PDF и папки Resume/CoverLetter сохранены.
- Существующий Release проверяет каждый push main, записывает VERSION по новому допустимому заголовку changelog, отклоняет дубли/понижение и использует фиксированную SHA выпуска. Текущие подписи документов ссылаются на VERSION; второй workflow версий не добавляется.
- Немецкая инструкция журнала приведена к актуальным частям по 500 строк и процедуре дописывания/перечитывания. Три редакции используют общие правила шаблонов, квоты и адресатов.
- Добавлены сценарии конвертации/утверждения, независимой почты и ручного пакета JobPilot, повторного адресата и восстановления выпуска. Исполнение агентом/GitHub остаётся NOT RUN до фиксации доказательств. Реальная почта и работодатели в этой доработке не используются.

**English.** Completes application-template selection and clarifies the owner's quota scope. Independent user submissions do not consume JobPilot's 44 managed CV slots; a manual fallback for a JobPilot package does. Consecutive managed CV submissions to the same normalized recipient are refused; legitimate CV-free thread replies keep their own rules.

- Profile settings schema 1.4 stores selected CV/cover-letter sources and editable DOCX paths, hashes and verification times. PDF conversion preserves the original and requires page comparison and approval; unavailable conversion is reported. Existing neutral DOCX/PDF samples and the Resume/CoverLetter folder layout are retained.
- The existing Release workflow checks every main push, derives VERSION from the newest valid changelog heading, rejects duplicates/downgrades and uses an immutable release target. Current document version labels link to VERSION; no second version workflow is added.
- German journal append instructions now match the current 500-line monthly-part rule and anchored append/read-back procedure. Three language editions share template, quota and recipient rules.
- Adds acceptance scenarios for template failure/approval, independent mail versus managed fallback, consecutive recipients and release recovery. Their agent/GitHub execution status remains NOT RUN until evidence is recorded. No real Gmail or employer interaction is part of this change.

## 1.9.0 — 10 October 2026

**Русский.** Журнал ведётся помесячными сегментами, а месяц, который дошёл до 500 строк, продолжается в пронумерованных частях (`transactions-ГГГГ-ММ-p2.jsonl`, `-p3` и так далее). Закрытая часть никогда не редактируется. Пересборка, подсчёты и архивы читают части по порядку месяца и номера части, а не по имени файла. Это новое правило журнала, поэтому номер минорной версии повышен. Перенос существующих журналов не нужен: месяц меньше 500 строк остаётся одним файлом.

- **Журнал:** правило деления и порядок чтения (DATA_CONTRACT.md §3c, §3d; ARCHITECTURE.md §4, правило 8).
- **Приёмка:** добавлен JRN-01 (статус NOT RUN, пока прогон не записан).

**English.** The journal keeps monthly segments, and a month that reaches 500 lines continues in numbered parts (`transactions-YYYY-MM-p2.jsonl`, `-p3` and so on). A closed part is never edited. Replay, counts and archives read the parts in order of month and part number, not by file name. This is a new rule for the journal, so the minor number is raised. Existing journals need no migration: a month under 500 lines keeps its single file.

- **Journal:** the split rule and the reading order (DATA_CONTRACT.md §3c, §3d; ARCHITECTURE.md §4, rule 8).
- **Acceptance:** JRN-01 is added (status NOT RUN until a run is recorded).

## 1.8.0 — 10 October 2026

**Русский.** Дневной максимум заявок с CV теперь настраивается человеком: целое число от 1 до 43 вместо фиксированного значения 2. Значение 2 остаётся предлагаемым по умолчанию. Месячный лимит 44 не изменился и в чате не меняется. Изменение дневного значения действует с следующего местного дня и записывается с причиной. Это новая возможность в правилах, поэтому номер минорной версии повышен; перенос данных не нужен, так как для существующих профилей значение по умолчанию остаётся 2.

- **Настройки:** `schedule.max_per_day` — целое число от 1 до 43, выбирает человек; 0 и 44 и больше отклоняются при проверке.
- **Правила:** проверка отправки отклоняет заявку с CV, которая достигнет дневного значения (`DAILY_LIMIT`), во всех режимах; план никогда не ставит на один местный день больше заявок с CV, чем допускает значение; просьба в чате о большем числе предлагает изменить настройку, а не отправлять.
- **Приёмка:** CAD-02 переписан под настраиваемое значение (статус NOT RUN, пока прогон не записан).

**English.** The daily maximum of CV submissions is now a setting the person chooses, from 1 to 43, instead of a fixed value of 2. The value 2 remains the default proposal shown to the person. The monthly limit of 44 is unchanged and cannot be changed in chat. A change of the daily value takes effect from the next local day and is recorded with its reason. This is a new capability in the rules, so the minor number is raised; no data needs migration, because the default for an existing profile stays 2.

- **Settings:** `schedule.max_per_day` is an integer from 1 to 43 chosen by the person; 0 and 44 or more are refused at validation.
- **Rules:** the send check refuses a CV submission that would reach the daily value (`DAILY_LIMIT`) in every mode; the plan never places more CV submissions on one local day than the value allows; a chat request for more than the value leads to an offer to change the setting, not to a send.
- **Acceptance:** CAD-02 is rewritten for the configurable value (status NOT RUN until a run is recorded).

## 1.7.0 — 10 October 2026

The consolidated review of the earlier audit (items F01–F14 and R01–R20) is applied to the rules, the statistics page and the user documents. A German edition is added. No real data was in use, so the changes need no migration of real records; a legacy single journal file is migrated by the procedure in DATA_CONTRACT.md §3d.

- **Safety of external actions:** a hard gate before every external call (the intent line must be written and read back as the last journal line, otherwise no call is made); the order of external actions; a writer lock by exclusive creation; a defined append method for journal lines (anchored replace of the unique last line, read-back and checksum).
- **Journal:** monthly segments `journal/transactions-YYYY-MM.jsonl` with one global sequence; a migration procedure for a single file (`journal_migrated`).
- **Sending:** four kinds of send with their own repeat keys (`cv_submission`, `thank_you`, `ordinary_reply`, follow-up consent); at most two CV submissions per local day by default (an open decision for the owner); the `on_request` cadence for approval mode; `slot_missed` instead of a catch-up batch; a check of attachments for sensitive data before registration.
- **Statistics:** snapshot schema 1.4 with a status history per application, responses, claimed submissions counted as unverified; full validation before display; months without events are shown; rejections and address errors counted separately; no snapshot is written until the minutes per application are set.
- **Gmail:** scheduled sending through the agent's browser only where the upload of attachments is verified; a manual route with the file `EMAIL_TO_SEND.txt`.
- **Documents:** resume and cover-letter templates in `Resume/` and `CoverLetter/`; neutral templates (Word and PDF) in `examples/templates/`, rendered with LibreOffice and checked page by page. Word rendering is not tested.
- **German edition** in `docs/de/`: documents, rules, acceptance scenarios and overview pages, with the language switch EN | RU | DE.

Verified: the statistics page in a headless browser (47 checks, three languages, sorting, filters, reset of the sample, invalid data, mobile width). Simulated months: month 1 and month 2 completed and audited; month 3 stopped in January 2027 with an owner decision open.

Not verified: real Gmail sending or scheduling, Word rendering, capture of vacancy requirements from live pages, and the complete three-month run.

Open decisions for the owner: the daily maximum of CV submissions (default 2), the minutes per application for the statistics (examples 30/20/5/5/5/5), the approval cadence values, and the segment size rule.

## 1.6.0 — 9 October 2026

The application work has one folder structure, and the statistics page shows results as shares and time saved. No real data was in use yet, so no migration is needed.

- **Application folders:** `Applications/<year>/<NN_Month>/<NNN_Company_City_Role>/` with `Company.md` (company data with sources and check dates), the resume and the cover letter as Word and PDF, the e-mail text and `Status.txt` (the history of each application). Months are two-digit numbers with the English month name (`10_October`).
- **Templates:** `Resume/` and `CoverLetter/` hold the person's own Word or PDF samples. A PDF is converted into Word by the agent and the PDF stays unchanged. Without a template, a neutral one is created during the first setup.
- **Statuses:** prepared, scheduled, not sent, waiting for a reply (with the days since sending), address does not exist, documents requested, meeting invited (in person, video or phone), and rejection in four kinds (vacancy unavailable, CV does not match, qualifications do not match, no reason given). A thank-you to an employer who answered is recorded separately. New journal events `status_recorded` and `company_updated`.
- **Statistics page:** shares of successful, waiting, rejected and address-error applications; reasons for rejection; monthly limit; time saved (an estimate, with its assumptions shown); days without reply; sorting and filters; three interface languages (English, Russian, German); a button that clears the sample data. The `summary.js` schema is now 1.4.
- **Readiness page** and **reports** are available in English, Russian and German.
- **Versions are automatic:** `VERSION` is no longer edited by hand. The release workflow takes the version from the newest section of `CHANGELOG.md`, writes `VERSION` and creates the GitHub release.

## 1.5.1 — 9 October 2026

Documentation-only consistency fix after 1.5.0: Gmail troubleshooting now covers both the approved connector and the built-in browser, with the manual fallback if neither is available. No workflow code or behavior changed.

## 1.5.0 — 9 October 2026

The bilingual operating workflow and its limits are consolidated for monthly job-search use.

- Added explicit user procedures for monthly preparation, email-first target selection, per-vacancy CV/cover letter/email packages, a shared 44-submission monthly limit, cadence choices, daily 16:00 checks, Gmail Scheduled verification, local archives/recovery, daily reports and readiness tracking.
- Gmail access now supports either an existing approved connector or the built-in browser, selected only after checking actual capabilities; manual copy/paste remains the fallback. No arbitrary connector/server or stored credentials are introduced.
- Added a static readiness-page template and clarified that the monthly quota, approvals, scheduling, sending and archives are procedural rather than technically enforced.
- Added a user-facing “not implemented” section: no standalone search/sending application, SMTP service, background sender, database server or universal scheduler. The statistics view is the only HTML/CSS/JavaScript code exception and is limited to displaying, sorting and filtering an agent-prepared snapshot.
- Updated the data contract, agent playbooks, English/Russian user guides, overview pages, example settings, attribution and separate code/documentation license notices.
- Statistics-page checks cover malformed/duplicate data, historical cutoffs, empty months, missing shared quota totals and technical-error ordering. The local VM suite reports 18 targeted checks passing; full browser, AI-agent, Gmail and document-rendering acceptance remains unverified.

## 1.4.2 — 8 October 2026

Logic check of the whole package; contradictions removed.

- An interrupted first setup is resumed: `AGENTS.md` and `TODO_FOR_AI.md` now say what to do when `workspace.json` exists but `stage` is not `ready`, with a table “saved stage → next step” (before, the agent would have jumped to the daily work).
- Nothing is asked twice: the search setup first reads the story and the knowledge base, shows what is already known in the read-back and saves the answers also as confirmed facts in `goals` and `conditions`.
- The journal starts with the person's folder (step A2); every journal write in the first setup follows the lock procedure.
- Rhythm of sending: only the options that exist in the settings (every permitted working day, every second permitted working day); the “calendar day” question is gone.
- Send check: the limit wording is exact (this message makes at most 44). Counting rule: the month is the person's local month; lines near the UTC month boundary are checked by hand.
- Acceptance scenarios FIRST-09 and FIRST-10. Release date in README corrected.

## 1.4.1 — 8 October 2026

The first setup follows the order described by the author: the person's story first (by voice if nothing is written), then the documents, then the questions about the search.

- `TODO_FOR_AI.md` Part A rewritten in that order: consent, story (the agent says where it belongs and offers to record it now), documents, analysis and the knowledge base, interview about the gaps, confirmation, the search setup, mail, finish. New stages `story_ready` and `documents_ready`.
- The search setup is one table (what is asked, the options, where it is saved): kind of search, roles, where the person lives, radius, **means of travel (car, train, bus / tram, bicycle, on foot — any combination)**, limits of the journey, preferred towns, four languages, rhythm of sending. Nothing else is asked; the rest keeps safe defaults.
- `profile.json` is defined: DATA_CONTRACT.md §3b and `examples/settings.example.json` (new fields `goal_types`, `industries`, `excluded`, `employment_type`, `earliest_start_date`, `_allowed_values`; readable ids). The HTML install and profile pages, the guide and the specification use the same wording. Acceptance scenarios FIRST-06…08.

## 1.4.0 — 7 October 2026

The agent can now start by itself, and the person knows exactly where to put what.

- **Instruction files for the agent exist** as drafts: `AGENTS.md` (rules, loaded by Codex), `CLAUDE.md` (loaded by Claude Code, imports `AGENTS.md`) and `TODO_FOR_AI.md` (first run, resuming, checklists for the standard actions). The person only says “Start”; the agent introduces itself and asks one question at a time.
- **Ready folders for the person's materials:** `Локальные_данные/Положите_сюда/` with `1_Мои_документы`, `2_Рассказ_о_себе` and `3_Шаблон_отчёта` (each with a short README, and a list of questions for the story). They are part of the ZIP; the personal files inside are ignored by Git (`.gitignore` updated).
- **Knowledge base:** one Markdown file per person, `persons/<person_id>/База_знаний/Жизнеописание.md` — the whole life story as facts with source, status (`proposed` / `confirmed` / `rejected`), `use` and `sens`. Format in DATA_CONTRACT.md §3a. Facts need the person's confirmation; CVs use only confirmed facts.
- **Interview instead of a form:** the agent interviews the person topic by topic, by voice or text, saves answers word for word after every topic. Telling the story by voice in any Claude or ChatGPT chat beforehand is described too.
- **First run** is tracked in `workspace.json` (`stage`), so an interrupted first run continues where it stopped. `person_id` and `profile_id` are short readable ids.
- The HTML pages, USER_GUIDE.md, AI_BUILD_SPEC.md, ARCHITECTURE.md, DATA_CONTRACT.md and README were aligned: one story in the AI file and in the HTML. New acceptance scenarios FIRST-01…05 and KB-01…04.
- The questionnaire as an HTML form was dropped from the design; `source_documents/` and `templates/` per profile were replaced by the ready folders.

## 1.3.1 — 7 October 2026

- Statistics page: the data now lives in a separate file `summary.js` next to the page. For a real profile the agent copies `index.html` unchanged and writes only `summary.js`, so the page file is never edited and a mistake in the data cannot break it. If `summary.js` is missing or invalid, the page says so. `summary.json` and the data block inside the HTML are gone.
- Decision: no helper scripts. A script would need a runtime that a clean Windows does not have, an approval on every run, and it could not enforce anything the agent can skip; the counting is done with the system's own commands (see ARCHITECTURE.md) and the rest is plain files.
- Release automation: `.github/workflows/release.yml` creates the tag and the release on GitHub when `VERSION` changes. It runs only on GitHub's servers and is not part of the product.

## 1.3.0 — 7 October 2026

The project is now defined as rules and files only: **no program code**. The AI agent follows the written rules and keeps plain files.

- ARCHITECTURE.md rewritten: no local commands, scripts or modules; standard actions are checklists the agent performs; the journal has one line per completed action; the single-writer rule is a marker file.
- The safeguards (limit of 44, never sending twice, one writer at a time) are described openly as procedures, not technical locks. Fully automatic sending is off by default and needs the user's explicit acceptance of this limitation.
- DATA_CONTRACT.md: hash chain, `command_id`, `request_hash`, `expected_revision`, `fsync` and checkpoints removed; `action_id` and `sequence` kept. ACCEPTANCE_TESTS.md: scenarios are performed by hand in a chat on synthetic data and recorded in a log.
- AI_BUILD_SPEC.md: stages of work rewritten (Markdown instruction files instead of implementation); statements about code removed. The file `examples/command.example.json` was removed.
- Overview pages and README updated to match.

## 1.2.0 — 7 October 2026

First tagged release: the documentation and the statistics page.

- Illustrated overview split into short pages with a menu (overview, install, profile, architecture, safety, market, roadmap), in English and Russian, in the visual style of homensai.com and HomenS.AI Core: light and dark theme, language switch, “Top” button, links to the author on every page. IBM Plex fonts are bundled (SIL OFL 1.1).
- New statistics page `dashboard_template/index.html`: year → month → day, sorting by date and by result (successful / unsuccessful), filters, search, EN/RU. Shows synthetic sample data only.
- Installation order clarified: the agent first, then the project archive, then the connection. The step-by-step guide exists as a web page (`overview_install.html`) and as `USER_GUIDE.md`; the rules for the AI agent are in section 10.1 of `AI_BUILD_SPEC.md`.
- Wording: “author of the idea and developer” instead of “intended developer”; plain third-person language in README and REVIEW; the video walkthrough was removed.
- Root `AI_BUILD_SPEC.md` and `DATA_CONTRACT.md` are now the English text (they were Russian copies); the Russian edition is in `docs/ru`.
- `ARCHITECTURE.md`, `DATA_CONTRACT.md`, `ACCEPTANCE_TESTS.md`: statistics page contract and scenario DASH-05.
- Documentation 1.2 content (earlier): ARCHITECTURE.md, one transactional journal per person, bilingual layout.

## 1.0 – 1.1 — before 7 October 2026

Earlier drafts of the specification, overview and user guide, before the repository existed. Not tagged.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com
