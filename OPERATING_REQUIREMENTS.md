# Operating requirements — HomenS.AI JobPilot 1.5

Author of the idea and developer: Serhii Khomenko · https://homensai.com/  
Repository: https://github.com/HomenSAI/homensai-jobpilot

This document is the operational companion to `AGENTS.md`, `TODO_FOR_AI.md`, `AI_BUILD_SPEC.md`, `ARCHITECTURE.md` and `DATA_CONTRACT.md`. It describes the intended workflow; it is not evidence that an agent, mail connection, scheduler or document renderer has passed acceptance. The user confirms consequential actions and checks the documents.

## 1. Product boundary and limits

JobPilot is a local project folder operated by an AI agent such as Codex. The agent uses the user's permitted tools to research, prepare files, reconcile mail and write records. There is no separate application server, Docker service, SQL database or independent mass-mailing program. The statistics page is a static HTML/CSS/JavaScript view of an agent-written snapshot; its code only validates, sorts, filters and displays the data.

The agent is the operator; the folder is the durable workspace. Each person's identity, facts, profile, mailbox, consent, history, quota, archives and reports remain separated. User data is never placed in a public repository.

The project allows no more than **44 CV-bearing submissions per person per calendar month**, across that person's profiles and accounts. A replacement or resend with a CV consumes another slot. A CV-free thank-you or period question does not. Future scheduled submissions reserve their intended month's quota. The 45th is blocked before any external action. A written instruction is not an atomic technical lock: one active writer per person is required, and uncertain external outcomes are reconciled rather than retried.

The initial state is `draft_only`. Logging in to Gmail is not consent to send. Every outgoing package, exact recipient, subject, body, language, attachments and schedule must be shown for approval under the consent mode. Changed package contents invalidate its approval.

## 2. Initial setup and readiness

At setup, explain the current AI account and verify feature availability, permissions and plan limits. As checked on 9 October 2026, OpenAI says Codex is included across ChatGPT plans, including Free and Go, with usage limits varying by plan; ChatGPT Plus is recommended for sustained use, and the current US monthly price listed by OpenAI is $20. These terms can change; check the live [Codex plan guidance](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan) and [Plus details](https://help.openai.com/en/articles/6950777-what-is-chatgpt-free-plan) before purchase. API usage is billed separately. The project was prepared and locally checked with Codex. Claude Code/Anthropic compatibility is unverified; users of that environment should complete the mock acceptance checklist before enabling external actions.

Prefer a dedicated job-search Gmail account separate from the user's personal account. It is a recommendation, not a prerequisite. The user signs in personally through an available supported browser. Never ask for or store passwords, one-time codes, cookies or session tokens in chat or project files. Browser sessions can expire and capabilities differ by installation.

The agent asks one question at a time and records a setup checklist with: item, applicability, status, evidence time, next action and a safe local link. The completion percentage is based only on required, verified items in the selected mode. Missing items remain missing; the agent does not infer completion from file presence. The agent copies `dashboard_template/readiness.html` to `Локальные_данные/dashboard/profiles/<profile_id>/readiness.html` and replaces its placeholders with a static summary. It updates the percentage, gauge angle/colour, traffic-light state, checklist rows and links to each available personal file/certificate after every verified setup step. Keep separate blocks for system readiness and profile/document readiness. The page shows completed/pending counts and a 0–100% gauge, while clearly stating that completion does not prove Gmail sending or unattended scheduling is available. Document links open only inside the user's permitted local workspace.

### Adding personal documents

The user may copy documents into the indicated folders or provide one document to the agent for review. For an agent-provided document:

1. Read only the selected file inside the permitted project folder.
2. Extract proposed facts with source filename and page/section where available.
3. Show the extracted text and proposed knowledge-base entries to the user; distinguish confirmed text from interpretation, uncertain OCR and missing details.
4. Wait for the user's correction or confirmation before adding facts to the confirmed profile or using them in a CV.
5. Preserve the original unchanged. Save a separate copy in the appropriate private profile folder only after confirmation, avoid overwriting and report the destination and checksum.
6. Update setup progress and provide a working private link to view the saved document.

Suggested prompt:

> Review the document I selected in the project folder. Do not send, publish, rename, move or overwrite anything. Extract only facts relevant to my work profile, preserve exact names, dates and qualifications, and show each fact with its source page or section. Mark uncertain reading, conflicting information and missing data. Do not add anything to my confirmed profile yet. After I confirm or correct the proposed facts, append only those confirmed facts to my personal knowledge base, save an unchanged copy of the source in the correct private folder, and show me the paths and links. If the file cannot be read or safely saved, stop and explain why.

## 3. Search and monthly preparation

At the beginning of each month, ask the user whether to prepare a search and application plan for that month. Do not ask again if the user has already answered for that period. Record the chosen period, radius, location, transport (car or public transit), maximum journey time, days, times, interval, number per batch and report language.

Search nearby first, within the chosen radius. Assess travel time, transfers, evening return and the final walk when public transport is relevant. Expand the geography only after suitable nearer targets have been reviewed. Search results belong in one registry with source URL, date checked, company/branch, location, role, requirements, contact, application channel, duplicate status and outcome. Preserve firms without a usable address in the registry with the reason they are not ready for an email package.

For email applications, follow **email-first**: verify a suitable address from the employer's vacancy or official website before producing the full package. Do not guess an address from a domain. If no suitable address is found, retain the company and evidence in the registry, but do not create CV/letter/email attachments or reserve a slot.

For each selected target, make a separate, versioned package:
- tailored CV based only on confirmed facts;
- tailored cover letter for that role;
- email recipient, subject (maximum **50 Unicode characters** after normalization) and complete body;
- source and contact details, role, agreed plan date/time and time zone;
- immutable manifest of filenames, sizes and SHA-256 hashes.

The vacancy language determines the sent CV, cover letter and employer email language. The user may review a translation in a language they understand. Keep report and interface language independent. Show the user the complete email draft in the review language and the exact final sending language; wait for approval. Never invent experience, certificates, availability, contact names or reasons for an employer's decision.

Suggested neutral email body (user edits it for their own contact details):

> Dear Hiring Team,  
>   
> I am writing to apply for the [position / internship] at [company]. I have attached my CV and cover letter for your consideration. My experience in [confirmed skill or area] may be relevant to your requirements for [specific requirement from the vacancy].  
>   
> I would welcome the opportunity to discuss how I could contribute. Please let me know if you need any further information.  
>   
> Kind regards,  
> [First name Last name]  
> [Telephone] · [Email] · [City / region] · [optional professional link]

## 4. Schedules and Gmail

The user can choose once per day, every N days, selected working days, a local send time, a daily count, or two separate sends with a specified interval or second time. Distinguish calendar days from permitted working days. Confirm the time zone, holiday region, daylight-saving transition, excluded dates, missed-run policy and month boundary. Never turn a missed slot into a catch-up batch.

Present a calendar for the complete month, with each package, recipient, subject, attachments and local time. Reserve quota for the month in which each CV is intended to be sent. A plan, a local queue and a Gmail Scheduled message are distinct states.

If the user enables Gmail scheduling, first check which route is actually available: an existing official/approved Gmail connector or the built-in Browser/Computer Use. The user chooses the route; no arbitrary connector or server is installed.

1. For the browser route, the user signs in personally to the intended account. For a connector route, use only the connector the user has approved and verify its account and separate read/send permissions.
2. Before scheduling, verify the active From account, recipient, approved package manifest, subject, body, attachments and exact slot.
3. Choose Gmail **Schedule send**, not Send, when the selected route can perform that action.
4. Open **Scheduled** and verify the exact saved message and time. A click or toast is not proof.
5. Record `gmail_scheduled_verified`; do not count it as sent.
6. After the slot, verify the message in SENT and record the actual sending event once.

Do not claim the browser session token is stored in the project or lasts indefinitely. Do not bypass CAPTCHA, security prompts, file-upload limitations or missing capabilities. If the built-in Browser cannot attach a file, stop for the user's action; if an approved connector supports attachments, verify the visible/remote attachment list. If scheduling or proof cannot be verified, keep the state uncertain and do not create a second message.

Every prepared package also has a UTF-8 `EMAIL_TO_SEND.txt` with the exact To, From account, subject, body, approved attachment paths, package version and planned local time. If neither the approved connector nor browser can complete the process, the user can manually create the email, paste the approved fields and attach the named files. The manual path is not evidence of sending; the user or a later mail reconciliation confirms SENT.

## 5. Daily control, replies and local archives

The default mail check is **every day at 16:00 in the user's configured time zone**. Register it with an actual supported agent scheduler and report whether the task was truly created. If the installed agent has no persistent scheduler, explain that a manual run is required. The computer must remain on, awake, connected and signed in for local checks; Gmail Scheduled messages may still send independently.

Read the whole relevant thread and reconcile SENT, Scheduled, incoming messages and delivery notices. Check all pages and all months of source applications. Never delete, Gmail-archive or relabel messages as part of this workflow. Classify a substantive refusal, invitation, question, document request, automatic acknowledgement and bounce separately. A positive response, invitation, question or request for documents needs the user's decision. Do not automatically reply to automatic messages, advertisements or delivery notifications.

A personalized thank-you after a refusal is allowed only in the explicitly enabled mode, after reading the whole thread and verifying there is no thank-you to that incoming Gmail message already. A question about the nearest internship period is allowed only for an open-ended “not this period” response and only if the thread has no prior period question. It does not consume a CV slot. A different message ID on a later response is a new event, not permission to repeat an earlier action.

After each confirmed send/schedule operation, substantive incoming-message processing, delivery event, cancellation or reschedule, append the journal event and create a versioned local archive for the affected person/profile. Archives contain a manifest, source revision and SHA-256 values, the necessary journal/registry/package versions and no credentials or session tokens. Do not overwrite earlier snapshots or delete them without the user's explicit retention policy. An archive failure is recorded and shown; it never repeats the mail action.

If local archives are lost or damaged, suspend new sends and scheduling. Reconcile the connected Gmail accounts across SENT, Scheduled, available All Mail, Spam and Trash, without moving or deleting messages. Rebuild only the provable mail history and quota; list missing documents, original unsent packages and unavailable periods as unknown. Restore into a separate copy and keep sending disabled until records and quota have been reconciled. Gmail Scheduled can still send while recovery is underway.

## 6. Reports and delivery to the user

At the end of each month, create a neutral report in the user's selected language, using the user's supplied template when present. Preserve template layout; change only allowed data. Without a template, create a readable monthly table with the user's name, period, employer, address, email, application type, original send date, reply date, brief employer result/reason, current status and last verification. Show “no reply received” when applicable; do not use the thank-you as the employer's result.

Include confirmed submissions from the reporting month and new responses received in that month to older submissions, once per Gmail message ID. Use the true original send date. Separate event counts from the current status at the report cutoff. Add market recommendations on a separate page, based on dated, cited search sources; estimates are labelled as estimates.

Produce editable DOCX and matching PDF. Use 12 pt as the default table-cell font, allow rows to grow, repeat table headings, render the DOCX through Word or LibreOffice, inspect every page and export the PDF from that checked document. Do not claim a report is visually checked if it was not rendered.

A separate opt-in setting can email a daily report to the user's chosen address. If none is set, offer the same verified Gmail account connected to the profile and show the destination before enabling it. The email contains a standalone, readable report snapshot, not a local-drive link, private folder or full biography. A missing/partial mail check is reported as incomplete; it is never described as “no changes.” No monthly report is emailed to an employer or authority without a separate instruction.

## 7. Responsibility and support

Before every actual send, the developer recommends and requires in the workflow that the user read the complete CV, cover letter, email body, recipient, subject, dates and attachment list for every package. The user verifies vacancy facts, addresses, translations and the final files; approval is tied to the exact package and schedule. Reading/opening a link is not treated as proof of review. A project limit and careful cadence do not by themselves guarantee that an email provider will not classify a message as spam.

The project has been tested only in Codex workflows to the extent stated in the current QA report. Claude Code/Anthropic compatibility is not confirmed. Any broader acceptance status must be supported by scenario evidence; virtual helper checks are not proof of a full agent/mail cycle.

If a setup step is unclear, the user can paste this prompt into the current AI-agent chat:

> I am setting up HomenS.AI JobPilot. I am stuck at step [number/name]. My current screen or folder shows [describe it; attach a screenshot with personal data hidden if useful]. Please read the project guide, identify what is already complete and what is missing, explain the next action in simple steps, and tell me why it is needed. Work only in the permitted JobPilot folder. Do not send or schedule email, change Gmail, overwrite originals, or guess missing details. Ask me before any action that uses my personal documents or changes external state.

Do not share passwords, one-time codes, personal documents or actual employer email content in a public issue.
