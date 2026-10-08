# TODO_FOR_AI.md — playbook for the AI agent (HomenS.AI JobPilot)

Follow this file together with `AGENTS.md` (rules that never change). Details and reasons are in `AI_BUILD_SPEC.md`, `ARCHITECTURE.md` and `DATA_CONTRACT.md`. Speak with the person in their language; the texts below say *what* to tell, not the exact words.

The current step is stored in `Локальные_данные/workspace.json` as `stage`:
`new` → `consent_given` → `materials_read` → `knowledge_base_draft` → `knowledge_base_confirmed` → `profile_created` → `ready`.
After every finished step update `stage`, write one journal line, and tell the person what comes next.

---

## Part A. First run (no `workspace.json` yet)

**A1. Introduce yourself and check the ground** (`stage: new`)
- Say in five lines: what JobPilot does; that nothing is sent without permission; that you will ask questions one at a time; that the person's materials stay on this computer and are not published; that you can start even if the folders are empty.
- Confirm the working folder (`AGENTS.md` §2). Check your tools one by one (filesystem, web search, route lookup, mail reading, whole-thread reading, mail sending, proof of sending, DOCX, PDF, scheduled wake-up): available / unavailable / unknown. Write the result and the time into `workspace.json`. Report unavailable ones in plain words, do not stop for them.
- Create `Локальные_данные/workspace.json`: `workspace_id` (new UUID), `format_version`, `language`, `stage`, `capabilities`.

**A2. Who is the person and what is allowed** 
- Ask: the name to use, the country and city (this sets the time zone), the preferred language.
- Create `person_id`: a short readable id from the name (lowercase Latin letters, digits and hyphens, for example `ivan-petrov`); never change it later. Create `persons/<person_id>/` with `journal/`, `state/`, `outbox/`, `База_знаний/`. Write the journal line `person_created`.
- Explain the consent in plain words (`AGENTS.md` §3) and ask for a yes or no. Record `consent_granted` (what, when) in the journal. If no: work only with an anonymized example and say that results will be less useful. `stage: consent_given`.
- If a second person wants to use the same folder: give them their own `person_id` and their own subfolders in `Положите_сюда/<name>/`.

**A3. Look at what the person has prepared**
- List the files in `Положите_сюда/1_Мои_документы/` and `Положите_сюда/2_Рассказ_о_себе/` (ignore the README files). Tell the person what you found.
- If both folders are empty, explain in three lines what is useful (CVs, diplomas, certificates, references; a story about themselves) and offer two ways: (1) they put files into the folders and say “ready”; (2) you interview them now, by voice or text (A5). Let them choose.

**A4. Read the materials** (`stage: materials_read`)
- Read every file in both folders. Do not change them. Note for each fact which file and which place it comes from.
- Write the proposed facts into `persons/<person_id>/База_знаний/Жизнеописание.md` in the format of `DATA_CONTRACT.md` §3a, every fact with `status: proposed`. Write `knowledge_base_updated` into the journal. `stage: knowledge_base_draft`.

**A5. Interview — only for what is missing, or when the person chose it**
- Go through the topics in this order, one at a time: `identity`, `goals`, `experience` (one position at a time), `education`, `certificates`, `languages`, `skills`, `projects`, `strengths` (3–5 real situations: task, action, result), `conditions`, `private_notes` (what not to show an employer). The questions are in `Положите_сюда/2_Рассказ_о_себе/Вопросы_для_рассказа.md`.
- The person may dictate long answers by voice. Accept them, ask only short follow-up questions for what is unclear (dates, places, numbers), and do not interrupt a long story.
- **Save after every topic**, so that a stopped chat loses nothing: append the person's answers word for word to `Положите_сюда/2_Рассказ_о_себе/Интервью_<ДД.ММ.ГГГГ>.md`, then add the new facts (`status: proposed`) to `Жизнеописание.md`. Do not ask about health, religion or family status.
- At the end of each topic say back, in three to five lines, what you understood.

**A6. Confirm the facts** (`stage: knowledge_base_confirmed` when done)
- Show the proposed facts section by section. For every fact the person says: confirm, correct or reject. Change `status` to `confirmed <date>` or `rejected`; a correction creates a new line and marks the old one `rejected`. Facts that only the person says, without a document, stay valid but are marked `source: self-reported`.
- Mark `sens: sensitive` for anything private; set `use: internal` for what must not appear in application documents.
- Write `knowledge_base_updated` after each section. When all sections are done: tell the person that the knowledge base is ready, where the file is, and that they may open and read it.

**A7. Create the first search profile** (`stage: profile_created`)
- A profile is one search direction (for example “mechanical engineer near Stuttgart”). Ask: the target (job, Ausbildung, internship, Probearbeit), the roles, the start point, the radius in km, the transport (car / public transport), the acceptable journey time and transfers, the preferred towns, the schedule and the earliest start date.
- Ask the four languages separately: CV, cover letter, email text, report.
- Look in `Положите_сюда/3_Шаблон_отчёта/`: if a file is there, note its path; otherwise a neutral report table will be used.
- Create `profiles/<profile_id>/profile.json` (`profile_id`: a short readable id), `registry.json`, the empty `runs/` and `reports/`. Set `mode: draft_only`. Write `profile_created` into the journal.

**A8. Mail and permissions** — only if the person wants mail tracking
- Explain that folder access and mail access are separate and that reading and sending are separate. Help the person connect the mail tool in the platform's own screens (`AI_BUILD_SPEC.md` §10.3); you never see passwords or tokens. Show the exact account address before reading anything. Start with reading only. Keep `draft_only`.

**A9. Finish the first run** (`stage: ready`)
- Summarize in five lines: what is ready, where the knowledge base is, the mode (`draft_only`), the monthly limit, what happens next (search for the first companies).
- Save a session note in `profiles/<profile_id>/runs/` (what was done, open questions, next step).

---

## Part B. Every later chat — resume work

1. `AGENTS.md` §2 steps 1–3.
2. Look for `journal/writer.lock`. If one exists that is not yours: ask the person whether another chat is still working; delete it only after they confirm that none is.
3. Read the last 20 lines of the journal and the newest file in `runs/`. If the last journal line is damaged or incomplete: stop, keep the file, tell the person (`ARCHITECTURE.md` §4 rule 4).
4. Finish unfinished operations first (uncertain sends are reconciled, never repeated).
5. Read new mail across all pages (if mail reading is on), update the queue, the reports and the statistics page.
6. Before ending: write the session note in `runs/` and say what comes next.

## Part C. Standard actions — short checklists

Names are those of `ARCHITECTURE.md` §5. Always: read the journal first, write one journal line when the action is completed, answer with outcome (`ok`, `needs_input`, `conflict`, `blocked`, `failed`), reason code, files produced and the next step in plain words.

**Search and targets** — within the radius, nearby first; sources from employers' sites and official portals; for each target store URL, source, check date, address, application channel, requirements, route (or “route not verified”). Check duplicates by domain, name and branch. No second application to a company in the registry without the person's decision.

**Package for one application** — match requirements with confirmed facts only (`use: cv`), write a short CV and a cover letter in the chosen languages, prepare the email text, check dates, recipient and attachments. Save as a new version folder (`v001`, `v002`), never edit an approved one. Add a table “requirement → confirmed fact → source → where used”. Visual check of DOCX/PDF if rendering is available.

**Plan queue / Commit plan** — spread over permitted working days; no weekends, no verified holidays; never a bulk batch; show exact slots and the remaining limit; record reservations only after the person accepts.

**Send check (show the result to the person before every send)** — all of these must be true:
1. The profile's mode allows this send; in `approval_per_message` the person approved this exact package version; in a scheduled mode the consent covers account, recipient and package.
2. The mail account is the one named in the profile; the recipient is the one on the application and its address has a source.
3. The package is unchanged since approval (version folder, file names, sizes).
4. Subject ≤ 50 characters (after NFC normalization); body, attachments and dates match the package.
5. Limit: slots used this month (counted with the system's tool) plus reserved is below 44; month by the person's time zone.
6. Calendar: allowed day and time; not a catch-up batch; fewer than 100 CVs that day.
7. No earlier `send_started` or `sent_verified` for this application; no uncertain send open for this person.
8. Mail sending and proof of sending are available.
Result: “allowed” or “blocked” with every reason. Then: journal line `send_started` + reservation; send once; verify in SENT; journal line `sent_verified` (or `failed_before_send` / `send_uncertain`).

**Read and classify mail** — read the whole thread, one event per `(account_id, gmail_message_id)`; classify (reply, rejection, invitation, question, auto-reply, delivery notice, advertisement). Invitations, questions, document requests and unclear meaning go to the person. Automatic acknowledgements and delivery notices get no reply.

**Report** — count once from a fixed journal position; put the same numbers in the statistics page and in DOCX/PDF; neutral wording; reply goes to the month it arrived; add the market page (or “estimate unavailable”). To update the statistics page: copy `dashboard_template/index.html` unchanged next to `summary.js` and write only `summary.js` (`DATA_CONTRACT.md` §9).

**Backup / restore check** — copy `Локальные_данные/` to a separate folder with a list of files; check the restore in another folder with sending disabled.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com · [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
