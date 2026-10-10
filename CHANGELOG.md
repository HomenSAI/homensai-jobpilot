# Changelog

[English](CHANGELOG.md) | [Русский](docs/ru/CHANGELOG.md)

The project version is in the file [VERSION](VERSION). The project is an AI-agent workflow package, not a standalone job-search or mail-sending application. Its local statistics view contains HTML/CSS/JavaScript for displaying and sorting a snapshot.

Rules: `MAJOR.MINOR.PATCH`. MAJOR changes when data formats or rules change so that old data no longer fits. MINOR is a new feature or a new part of the documentation. PATCH is a fix or a wording change without new capabilities. Every change to `main` adds a line here; the number is raised when a release is made. Each release gets a git tag `vX.Y.Z`. Each entry is written in Russian first, with the English text directly below it. The same entry appears in both language files.

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
