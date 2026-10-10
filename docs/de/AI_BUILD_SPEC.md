Deutsche Fassung. Maßgeblich ist die englische Fassung (Datei im Hauptverzeichnis).

# HomenS.AI JobPilot · Jobsuchmaschine und Bewerbungsmanager

[English](../../AI_BUILD_SPEC.md) | [Русский](../ru/AI_BUILD_SPEC.md) | [Deutsch](AI_BUILD_SPEC.md) | [Українська](../uk/AI_BUILD_SPEC.md)

**Projektspezifikation für Codex / Claude Code — [VERSION](../../VERSION), 10. Oktober 2026**

**Status:** Projektspezifikation und experimenteller Agenten-Ablauf. Es gibt keine eigene Anwendung für die Jobsuche oder den E-Mail-Versand; der einzige Code ist die Statistikansicht, die den vom Agenten geschriebenen Snapshot prüft, sortiert, filtert und anzeigt. Dieser Text behauptet nicht, dass der Ablauf die Abnahme bestanden hat, und gibt keine Erlaubnis, ein Postfach zu verbinden oder Bewerbungen zu versenden.

Diese Datei beschreibt das Produkt für Menschen und Entwickler: warum es existiert, sein Design, Lizenzen, Quellen und Alternativen. Der Agent arbeitet nach `AGENTS.md`, [TODO_FOR_AI.md](TODO_FOR_AI.md) und [OPERATING_REQUIREMENTS.md](OPERATING_REQUIREMENTS.md), mit [ARCHITECTURE.md](ARCHITECTURE.md) und [DATA_CONTRACT.md](DATA_CONTRACT.md) als Nachschlagewerk; nichts Betriebliches steht nur hier. Beginnen Sie mit [README.md](README.md); Installation: [USER_GUIDE.md](USER_GUIDE.md) und [overview_install.html](overview_install.html); Tests: [ACCEPTANCE_TESTS.md](ACCEPTANCE_TESTS.md).

Vier Fassungen: Englisch im Hauptverzeichnis (maßgeblich), Russisch in `docs/ru`, Deutsch in `docs/de`, Ukrainisch in `docs/uk`, mit denselben Kennungen, Regeln und Beispielen; eine Regeländerung aktualisiert alle vier.

**Urheberschaft und eigenständige Entwicklung.** Serhii Khomenko ist der Urheber der Idee und der Entwickler des Systems. Konzept, Szenario und Anforderungen stammen aus dem eigenen Arbeitsablauf des Autors, und das System wurde eigenständig entworfen. Die GitHub-Projekte aus Abschnitt 14 wurden nur als Marktüberblick betrachtet: Ihr Code, ihre Komponenten, Vorlagen, Gestaltung, Architektur und Prompts wurden nicht verwendet, kopiert, angepasst oder geforkt.

**Autor der Idee und Entwickler:** Serhii Khomenko  
**Website:** https://homensai.com/  
**GitHub:** https://github.com/HomenSAI  
**LinkedIn:** https://www.linkedin.com/in/serhii-khomenko-homensai/  
**ORCID:** https://orcid.org/0009-0009-5371-9717  
**Buch / Zenodo:** https://zenodo.org/records/23160031  
**Kontakt:** info@homensai.com  
Die öffentlichen Angaben wurden am 7. Oktober 2026 anhand des Website-Archivs `deploy_ver_2.21.zip` geprüft und werden vor einem Release erneut geprüft. Die persönliche Website wird nicht als eingetragenes Unternehmen dargestellt.

### Visuelle Identität und Links zum Autor

- Die Marke ist **HomenS.AI**, das Produkt **HomenS.AI JobPilot**, das Repository **`homensai-jobpilot`** (https://github.com/HomenSAI/homensai-jobpilot); die deutsche Bezeichnung lautet **Jobsuchmaschine und Bewerbungsmanager** („Jobsuche und Bewerbungsverwaltung“). Der Name wurde nicht auf Markenrechte oder Domains geprüft.
- Das Logo ist die offizielle SVG-Marke der Website, nicht nachgezeichnet. Der Website-Header zeigt die Wortmarke `HomenS.A Inc.`, während die Metadaten `HomenS.AI` nennen; die Wortmarke ist nur eine optische Beschriftung, keine Aussage über eine rechtliche Eintragung. Projektmaterialien verwenden „HomenS.AI · Serhii Khomenko“.
- **Ein Erscheinungsbild überall.** Alle HTML-Seiten folgen homensai.com und dem Client von HomenS.AI Core (`frontend/app/styles.css`): die Palette „Nordic“, ein dünnes Raster, eine obere Leiste mit Logo, Menü und Umschalter EN/RU, ein Umschalter hell/dunkel (dunkel folgt dem System), eine Schaltfläche „Top“ und eine Fußzeile mit Links zum Autor.
- Palette (hell): Hintergrund `#edf1f4`, Fläche `#f9fbfc`, Text `#14212e`, sekundär `#44525f`, Linien `#d9e0e6`, Blau `#1e4f8a`, Blaugrün `#147283`, Gold `#7d5f16`; Zustände: Grün `#1f7a46`, Bernstein `#9a5b00`, Rot `#b3261e`; das Logo behält `#2bb3c4` und `#c9a24a`.
- Schriften: IBM Plex Sans und IBM Plex Mono, unverändert in `assets/fonts` mit `OFL.txt` und `NOTICE.txt` (SIL Open Font License 1.1); ohne sie verwenden die Seiten Systemschriften.
- Jede HTML-Seite und jedes Markdown-Dokument verlinkt auf `homensai.com`, GitHub `github.com/HomenSAI`, LinkedIn, ORCID, den Zenodo-DOI und `info@homensai.com`. Kontaktlinks der Designversion 2.21 (geprüft gegen https://homensai.com/contact.html am 7. Oktober 2026): LinkedIn `linkedin.com/in/serhii-khomenko-homensai`, ORCID `0009-0009-5371-9717`, die GitHub-Projekte RTX 3080 local AI benchmarks und `two-worlds-one-mind`, Zenodo `10.5281/zenodo.23160031`. Links und Rechte an Markendateien werden vor der Veröffentlichung erneut geprüft.

## 1. Warum es das Projekt gibt

**HomenS.AI JobPilot** ist ein in sich geschlossenes Paket: Die Person lädt es von GitHub herunter und öffnet es als lokalen Ordner in Codex oder Claude Code. Der KI-Agent im Chat erledigt die Arbeit: Er fragt nach fehlenden Informationen und Berechtigungen, sucht Firmen und Stellen, führt die Aufzeichnungen, schreibt Dokumente, prüft die Post im Rahmen der erteilten Verbindungen und bereitet Berichte vor. Es ist weder ein Webdienst noch ein Server.

Die Idee ist zu zeigen, dass ein recht komplexer Arbeitsablauf mit schriftlichen Verfahren, lokalen Dateien und einem vorhandenen Cloud-KI-Agenten laufen kann, ohne eigene Anwendung. Der Autor hat einen solchen Ablauf etwa zwei Monate lang für sich selbst geführt; als Bekannte dieselbe Belastung beschrieben, hat er ihn vereinheitlicht. Das sind Angaben zur Entstehung, kein Nachweis einer Abnahme.

Das Limit von 44 Einreichungen, die Regel gegen Wiederholungen und die Ein-Schreiber-Regel sind Verfahren, denen der Agent folgt, keine technischen Sperren. Der sicherste Modus ist der Standard, und jede externe Handlung braucht die Freigabe der Person für das genaue Paket und den Zeitplan. Alle Daten bleiben im entpackten Ordner; Geheimnisse bleiben beim Betriebssystem oder beim Anbieter. Der Kerngedanke des Profils: Der Agent bewahrt die ganze bestätigte Lebensgeschichte der Person, nicht einen kurzen alten Lebenslauf, und schreibt jeden Lebenslauf und jedes Anschreiben nur aus bestätigten Fakten.

## 2. Erfahrungen aus bestehenden Arbeitsordnern

Die Ordner früher Nutzer zeigten nützliche, aber uneinheitliche Gewohnheiten: Monatsverzeichnisse und nummerierte Arbeitgeberordner, **Company.md**, **Status.txt** und **Replies.txt** (jede Antwort vollständig), E-Mail-Texte und geplante Termine, unterschiedliche Dokumentnamen (Anschreiben, Lebenslauf/CV, PDF/DOCX) und getrennte Prompts. Sie lassen sich nicht einfach zusammenführen; deshalb hat das System ein Datenformat, eine Konfiguration je Person und einen nur lesenden Import alter Ordner, die nie umbenannt, verschoben oder neu geschrieben werden.

## 3. Architektur: ein lokaler Ordner und ein KI-Agent

Die Person öffnet genau diesen Ordner in Codex oder Claude Code und sagt „start“. Der Agent lädt seine Regeldatei (`AGENTS.md` für Codex, `CLAUDE.md` für Claude Code) und folgt `TODO_FOR_AI.md`: Ersteinrichtung, Fortsetzen in einem späteren Chat und eine Checkliste je Standardaktion. Er hält seine Position in `workspace.json` (`stage`) und im Journal fest. Das Herunterladen von Markdown-Dateien gibt niemandem Zugriff auf Gmail oder den Computer.

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

### Abgrenzung der Komponenten

1. **Der Agent** sucht, führt Aufzeichnungen, bereitet Dokumente und Berichte vor und führt erlaubte Mail-Aktionen aus, sichtbar in seinem Chat.
2. **Der Ordner** ist der einzige Datenspeicher: Ein JSONL-Journal je Person in monatlichen Abschnitten hält die Ereignisse, einschließlich des gemeinsamen Kontingents; JSON-Dateien sind daraus neu aufgebaute Ansichten (ARCHITECTURE.md, DATA_CONTRACT.md).
3. **Anleitungen**: `README.md` für die Person, `AGENTS.md`, `CLAUDE.md` und `TODO_FOR_AI.md` für den Agenten, der nie annimmt, dass ein früherer Chat verfügbar ist.
4. **Die Wissensbasis**: eine Markdown-Datei je Person, `База_знаний/Жизнеописание.md` (Abschnitt 4.6), von der Person lesbar und korrigierbar.
5. **Die Statistikseite**: eine Vorlage, unverändert je Profil kopiert; der Agent schreibt nur ihre Datendatei (Abschnitt 10.5).
6. **Planung**: eine geplante Aufgabe des Agenten, falls angeboten, oder ein neuer Chat; die Seite startet den Agenten nie.
7. **Zugriff**: Ordner, Websuche, Gmail und Computer Use werden getrennt und nur bei Bedarf eingeschaltet.

## 4. Das Profil der Person: die Wissensbasis und das Interview

### 4.1 Import und Bestätigung

Die Person füllt die fünf Eingangsordner (Abschnitt 4.6) oder wird interviewt. Jeder entnommene Fakt wird als vorgeschlagen geschrieben, mit seiner Datei und Stelle; die Person nimmt ihn an, korrigiert oder lehnt ihn ab. Eine Selbsteinschätzung wird nie als Zertifikat dargestellt.

### 4.2 Abschnitte des Fragebogens

Der Fragebogen ist ein Interview im Chat, ein Thema nach dem anderen, gesprochen oder getippt; jedes Thema lässt sich überspringen. Themen: Kontaktdaten und was in einem Lebenslauf erscheinen darf; Sprachen der Materialien (`cv_language`, `cover_letter_language`, `email_language`, `report_language`, jeweils getrennt gewählt, nie geraten); eine optionale Berichtsvorlage; Ziele (Job, Ausbildung, Praktikum, Probearbeit, befristete Arbeit); jede bisherige Stelle; Ausbildung, Kurse, Lizenzen und Zertifikate; Sprachen mit Niveau; Fähigkeiten; Projekte; Stärken als echte Situationen; Bedingungen (Wohnort, Radius, Verkehrsmittel, Grenzen für den Weg, Startdatum); Motivation für das Anschreiben; und welche Dateien und Referenzen verwendet werden dürfen. Die Antworten werden nach jedem Thema gespeichert (TODO_FOR_AI.md, Teil A, A3–A6).

### 4.3 Schutz biografischer Daten

Nach Religion, Familienstand, Gesundheit, Staatsangehörigkeit, Alter und Fotos wird nicht gefragt; werden sie angeboten, werden sie als sensibel markiert und aus Lebensläufen herausgehalten, sofern die Person nicht anders entscheidet (DATA_CONTRACT.md §3a, §5). Lokale Speicherung ist keine Offline-Verarbeitung: Der Anbieter eines Cloud-Agenten kann sehen, was dieser liest, daher kommt die Zustimmung vor dem ersten Lesen persönlicher Originale. Alles Geschriebene beginnt als `proposed`; erst die Bestätigung der Person macht es `confirmed`.

### 4.4 Wie der Lebenslauf entsteht

Ein Lebenslauf ist eine Projektion der Wissensbasis für eine Stelle: Anforderungen werden bestätigten Fakten zugeordnet („Anforderung → bestätigter Fakt → Quelle → wo verwendet“), Lücken werden gezeigt, und nichts wird erfunden. Ein Foto ist optional.

### 4.5 Grundlage für den Inhalt des Interviews

Europass ist ein Bezugspunkt für Vollständigkeit: Ausbildung, Berufserfahrung, Sprachen, digitale Kompetenzen, Projekte, Erfolge, dazu Aufgaben und Ergebnisse je Stelle, Werkzeuge, Belege und STAR-Beispiele. Es ist ein Bezugspunkt, kein Formular.

### 4.6 Wohin die Person Materialien legt und die Datei der Wissensbasis

Das Paket enthält einen fertigen Ordner `Локальные_данные/Положите_сюда/` („hier ablegen“) mit fünf Unterordnern und einer kurzen README in jedem. Es ist der einzige Ort, an dem die Person etwas von Hand ablegen muss:

| Ordner | Was die Person dort ablegt |
|---|---|
| `1_Мои_документы` (meine Dokumente) | Lebensläufe in jeder Fassung, Diplome, Zertifikate, Referenzen, offizielle Schreiben, ein Portfolio, Muster eigener Schreiben; PDF, DOCX, TXT, Fotos und Scans; ohne Sortieren oder Umbenennen |
| `2_Рассказ_о_себе` (meine Geschichte) | Die Geschichte der Person in eigenen Worten: eine Abschrift einer Sprachaufnahme, Notizen, Antworten auf die Fragen aus `Вопросы_для_рассказа.md` (liegt in diesem Ordner bei); der Agent speichert Interviews hier außerdem wortwörtlich als `Интервью_<date>.md` |
| `3_Шаблон_отчёта` (Berichtsvorlage) | Nur, wenn die Person ein eigenes Berichtsmuster hat |
| `4_Шаблон_резюме` (Material zum Lebenslauf) | Alles zu den Lebensläufen der Person in jedem Format, aktuell und alt; nur lesen; der Agent bereitet daraus Entwürfe und die von der Person genannte Vorlage vor |
| `5_Шаблон_сопроводительного_письма` (Material zum Anschreiben) | Alles zu den Anschreiben der Person in jedem Format; nur lesen; dieselbe Regel wie für Ordner 4 |

Die Ordner können vor dem ersten Lauf gefüllt oder leer gelassen werden; der Agent liest sie nur. Eine zweite Person erhält in `Положите_сюда` einen Unterordner mit ihrem Namen, mit denselben fünf Unterordnern.

**Die Geschichte per Sprache vorbereiten.** Entweder außerhalb des Projekts, in einem beliebigen Sprachchat von Claude oder ChatGPT mit `Вопросы_для_рассказа.md`, mit der Bitte um eine wortwörtliche Textdatei für `2_Рассказ_о_себе`, oder innerhalb des Projekts, wo der Agent das Interview führt und jede Antwort wortwörtlich speichert.

**Die Wissensbasis.** Aus den Ordnern und dem Interview schreibt der Agent `Локальные_данные/persons/<person_id>/База_знаний/Жизнеописание.md` in einem festen Format (DATA_CONTRACT.md §3a), Abschnitt für Abschnitt zur Bestätigung gezeigt. Sie ist in der Sprache der Person und die einzige Quelle für alle Suchprofile dieser Person.

**Die Ersteinrichtung in Reihenfolge** — Geschichte, Unterlagen, Wissensbasis, Lücken, Bestätigung, Sucheinstellungen (`profiles/<profile_id>/profile.json`), E-Mail auf Wunsch — steht in TODO_FOR_AI.md, Teil A. Vorlagen: Die Quellen bleiben unverändert, und eine geprüfte Word-Arbeitskopie wird erst nach der Freigabe verwendet ([Vorlagen für Lebenslauf und Anschreiben](OPERATING_REQUIREMENTS.md#vorlagen-für-lebenslauf-und-anschreiben)).

## 5. Geografische Suche und die gemeinsame Datenbasis

Die Person wählt den Ausgangspunkt, den Radius, die Verkehrsmittel (Auto, Zug, Bus / Straßenbahn, Fahrrad, zu Fuß; „öffentliche Verkehrsmittel“ bedeutet Zug und Bus / Straßenbahn), Fahrzeit, Umstiege, Fußweg, Rückfahrt am Abend und bevorzugte Orte. Luftlinie und tatsächlicher Weg werden beide gezeigt. Nahes kommt zuerst: Die Fahrzeit filtert nur ungeeignete Möglichkeiten heraus und schiebt nie eine nähere Firma zugunsten eines entfernten Orts nach hinten; das Gebiet wird erst erweitert, nachdem die nahe Zone geprüft ist.

Quellen sind Websites der Arbeitgeber, offizielle Jobportale und Dienste, deren Bedingungen es erlauben; jedes Ergebnis behält URL, Quelle, Prüfzeit, Niederlassung, Bewerbungskanal und Verlässlichkeit. Eine Liste wird nie als vollständig ausgegeben. Dubletten werden über Domain, rechtlichen Namen, Niederlassung und Muttergesellschaft gefunden; bei einer Firma, die schon im Register steht, wird ohne Entscheidung der Person nicht erneut beworben. Die Firmenkarte `Company.md` enthält Kontaktdaten, Anforderungen, den Weg (oder „Weg nicht geprüft“) und den Verlauf, jeweils mit Quelle und Datum (TODO_FOR_AI.md, Teil C, „Suche und Zielfirmen“).

## 6. Ordner und das Bewerbungspaket

Alle Arbeitsdaten bleiben im entpackten Ordner, in `Локальные_данные/`, das Git ignoriert; der vollständige Baum steht in ARCHITECTURE.md §3. Das Hauptverzeichnis des Pakets enthält `README.md`, `USER_GUIDE.md`, `AGENTS.md`, `CLAUDE.md`, `TODO_FOR_AI.md`, `OPERATING_REQUIREMENTS.md`, `AI_BUILD_SPEC.md`, `ARCHITECTURE.md`, `DATA_CONTRACT.md`, `ACCEPTANCE_TESTS.md`, `PROJECT_OVERVIEW.html`, die Seiten `overview_*.html`, `docs/`, `assets/`, `dashboard_template/`, `examples/` und `.gitignore`.

Jede Bewerbung hat ihren eigenen Ordner `Applications/<YYYY>/<MM_Month>/<NNN_Company_City_Role>/` mit `Company.md`, Lebenslauf und Anschreiben als DOCX und PDF (`Resume_v001`, `CoverLetter_v001`), `EmailText_<language>.txt`, `EMAIL_TO_SEND.txt`, einer optionalen `ReviewTranslation_<language>.txt` („nicht für den Arbeitgeber“), `Status.txt` und `Replies.txt`. Der Ordner wird nicht verschoben, wenn sich der Plan ändert; Pfade bleiben relativ und innerhalb des Hauptverzeichnisses (DATA_CONTRACT.md §2). Eine Stelle ohne E-Mail-Bewerbung erhält ein Paket für ihren Kanal; eine Adresse wird nie erfunden.

**Anschreiben (R12).** Jede Bewerbung hat ihr eigenes Anschreiben, als PDF zusammen mit dem Lebenslauf angehängt: TODO_FOR_AI.md, Teil C, „Anschreiben (R12)“.

**E-Mail-Text und Sprachen (R13).** Die Sprache der Stelle bestimmt die Sprache von E-Mail, Lebenslauf und Anschreiben; die Person prüft eine vollständige Übersetzung in `languages.review_language`: TODO_FOR_AI.md, Teil C, „E-Mail-Text (R13)“.

**Termine (R07).** Der Plan ist die einzige Quelle des Versanddatums: TODO_FOR_AI.md, Teil C, „Termine (R07)“, und DATA_CONTRACT.md §16.

**EMAIL_TO_SEND.txt (R20).** Die UTF-8-Datei für den manuellen Versand jedes fertigen Pakets, erzeugt aus dem freigegebenen E-Mail-Text: TODO_FOR_AI.md, Teil C, „Manueller E-Mail-Ersatzweg (R20)“.

## 7. Planung, Gmail und Kontrolle des Versands

### 7.1 Die Warteschlange

Der Agent führt die Warteschlange als Daten im Ordner. JobPilot sendet höchstens **44 CV-Einreichungen pro Person und Kalendermonat**, gemeinsam für alle Profile dieser Person; nur von JobPilot verwaltete Einreichungen zählen, und ein von Hand über `EMAIL_TO_SEND.txt` gesendetes Paket zählt trotzdem. Die Person sagt in eigenen Worten, wie der Monat verteilt wird (`sending_rule_statement`); daraus ergibt sich die Tagesobergrenze `max_per_day`, 1 bis 44. Eine CV-Einreichung wird mit `DAILY_LIMIT` abgelehnt, wenn die an diesem lokalen Tag bereits begonnenen Versände vom Typ `cv_submission` (gescheiterte Versuche eingeschlossen) `max_per_day` erreicht haben; bei einer in Gmail terminierten Nachricht zählt der Tag ihres Slots, sodass ein ganzer Monat in einer Sitzung terminiert werden kann. Jedes Profil beginnt in `draft_only`; Versand braucht `approval_per_message` oder `scheduled_send_with_profile_consent`, von der Person eingeschaltet. Sind die Slots des Monats aufgebraucht, warten die übrigen Zielfirmen; bevor sie in den nächsten Monat wandern, wird jede Stelle erneut geprüft und die Person stimmt zu. Einzelheiten: DATA_CONTRACT.md §4, §5 und §13. Eine Obergrenze garantiert nicht, dass ein Anbieter E-Mails nicht als Spam behandelt; Tests verwenden nur synthetische E-Mails.

### 7.2 Gmail über einen freigegebenen Connector oder den eingebauten Browser

Die Person wählt, nachdem der Agent geprüft hat, was funktioniert: einen offiziellen, freigegebenen Gmail-Connector (eigene Anmeldung, Lese- und Sendeberechtigungen getrennt geprüft) oder den eingebauten Browser von ChatGPT Desktop / Codex, in dem sich die Person selbst anmeldet. Sonst wird nichts installiert, und Geheimnisse werden nie gespeichert. Siehe die offizielle Hilfe zum [eingebauten Browser](https://help.openai.com/en/articles/20001277-using-the-built-in-browser-in-the-chatgpt-desktop-app) und zu [Computer Use](https://learn.chatgpt.com/docs/computer-use). Der eingebaute Browser kann keine Dateien hochladen (OPERATING_REQUIREMENTS.md §4); daher hängt die Person die Dateien an oder nutzt den **manuellen Ersatzweg**: `EMAIL_TO_SEND.txt` in eine neue Gmail-Nachricht kopieren, die freigegebenen PDFs anhängen und einmal Send oder Schedule send wählen; der Agent prüft dann SENT oder Scheduled. Post wird nie gelöscht, archiviert, verschoben oder neu gekennzeichnet.

### 7.2a Gmail Scheduled über den eingebauten Browser (R03)

Schritte: TODO_FOR_AI.md, Teil C, „Gmail-Terminversand über den eingebauten Browser (R03)“; Zustände: DATA_CONTRACT.md §12.2. Eine terminierte Nachricht ist keine gesendete, und Gmail sendet sie auch, wenn der Agent nicht läuft.

### 7.2b Monatsvorbereitung und die Frage zu Monatsbeginn (R04)

Jeden Monat fragt der Agent einmal, ob er den Monat vorbereiten soll (`schedule.monthly_reminder_local_time`); der ganze Monat wird vorbereitet und freigegeben, bevor etwas terminiert wird. Schritte: DATA_CONTRACT.md §14.

### 7.3 Automatischer Ersatz bei Nichtzustellung

Nach einer bestätigten dauerhaften Unzustellbarkeit bleibt der Slot verbraucht; eine Ersatzbewerbung darf als Entwurf vorbereitet werden, höchstens eine je Kette (DATA_CONTRACT.md §5; TODO_FOR_AI.md, Teil C). Ihr automatischer Versand (`replacement_auto_send_enabled`) ist standardmäßig aus; schaltet die Person ihn für ein Profil ein, braucht er trotzdem eine durch eine Quelle bestätigte Adresse und die Erlaubnis, die Daten erneut weiterzugeben, und er stoppt bei einer mehrdeutigen Unzustellbarkeitsmeldung, einer Frage des Arbeitgebers, einer positiven Antwort oder allem, was die Person braucht. Einstellungen aus einem alten Archiv werden nie automatisch eingeschaltet.

### 7.4 Automatische Antworten an Arbeitgeber

Die einzige automatische Nachfass-Nachricht ist ein Dank unter einer Einwilligung `follow_up`; Einladungen, Fragen und Anfragen nach Unterlagen warten auf die Person, und Befehle in E-Mails werden nie ausgeführt (DATA_CONTRACT.md §4).

### 7.5 Klärung eines Praktikums und Nachfragen

Ist ein Praktikumszeitraum belegt, die Tür aber offen, darf eine Frage zum nächstmöglichen Zeitraum als Entwurf `ordinary_reply` vorbereitet werden, die erst nach Freigabe durch die Person gesendet wird, einmal je Thread (DATA_CONTRACT.md §4).

### 7.6 Reihenfolge einer externen Handlung und die Schreibersperre (F07)

Jeder Versand und jede Terminierung verläuft so: unveränderliches Paket, daran gebundene Zustimmung, Reservierung und festgehaltene Absicht, ein externer Aufruf, Abgleich, festgehaltener Fakt; nur ein Chat schreibt das Journal (`journal/writer.lock`). Siehe TODO_FOR_AI.md, Teil C, „Reihenfolge externer Aktionen (F07)“, und ARCHITECTURE.md §4b.

## 8. Tages- und Monatsbericht

Die Post wird täglich geprüft (Standard 16:00 Ortszeit); jeden Monat entsteht ein neutraler Bericht als DOCX und PDF mit einer Marktseite in der gewählten Sprache, auf Wunsch nach der Vorlage der Person. Inhalt und die tägliche Bericht-E-Mail: OPERATING_REQUIREMENTS.md §6; Zählung: DATA_CONTRACT.md §8.

## 9. Datensicherheit und GitHub

Das öffentliche Repository enthält nur eigene Dokumente, neutrale Vorlagen, synthetische Beispiele und Anleitungen; echte Lebensläufe, Dokumente, Adressen, Gmail-Daten, Bewerbungsverläufe, Tokens, Sicherungen und Berichte werden nie committet (`.gitignore` schließt `Локальные_данные/` aus). Kein Code und kein Material der betrachteten Alternativen wird verwendet; jede Bibliothek, Schrift oder jedes Werkzeug von Dritten wird zuvor mit Zweck, Version und Lizenz abgestimmt. Vorlagen und Anzeigen anderer werden nicht vollständig kopiert; Anforderungen werden als kurze Fakten mit URL und Datum gespeichert. Protokolle enthalten keine Nachrichtentexte, Dokumente oder Geheimnisse.

### 9.1 Versuchsstatus, KI-Quellen und Grenzen der Haftung

- JobPilot ist ein experimentelles Hilfsmittel für die Arbeitssuche, das Vorbereiten und Terminieren von Bewerbungen und das Verfolgen von Antworten; es ist keine Personalvermittlung, keine Beschäftigungsgarantie und keine Rechtsberatung.
- Suche, Entnahme und Einordnung erledigen die KI-Agenten und Quellen, die die Person wählt (zum Beispiel ChatGPT/Codex, Anthropic/Claude, Websites der Arbeitgeber, Jobportale); JobPilot garantiert nicht, dass sie alles gefunden oder richtig gelesen haben.
- Es gibt keine Garantie für Richtigkeit, Vollständigkeit, korrekte Wege, Zustellung oder Antworten; die Person prüft Daten, Kontakte, Lebensläufe und Einordnungen, bevor sie handelt.
- Die Person nutzt das System auf eigenes Risiko und ist für ihre Entscheidungen, Daten, Konten und die versendeten Dokumente verantwortlich (OPERATING_REQUIREMENTS.md §7).
- Die Haftung ist nur beschränkt, soweit das Gesetz es erlaubt; zwingendes Recht kann sie bestehen lassen, insbesondere nach §§ 307 und 309 BGB.
- Weitergabe: nur nicht kommerzielle Nutzung, mit Nennung von **Serhii Khomenko / HomenS.AI** (Abschnitt 9.2).

Dies ist keine Rechtsberatung; Lizenzen, Datenschutzhinweis und Haftungsformulierungen werden vor einer öffentlichen Veröffentlichung mit einer Anwältin oder einem Anwalt geprüft.

### 9.2 Lizenzmodell und Pflichtnennung

Für die eigenen Materialien des Projekts wird je nach Art des Werks eine eigene Standardlizenz gewählt:

- **Quellcode, einschließlich HTML/CSS/JavaScript, Oberflächen-Markup / Skripte und eigener Softwarekomponenten:** PolyForm Noncommercial License 1.0.0. Sie gibt das Recht, Kopien für nicht kommerzielle Zwecke zu nutzen, zu ändern und weiterzugeben, unter Beachtung ihrer Bedingungen und Hinweise. Kommerzielle Nutzung braucht eine gesonderte schriftliche Erlaubnis des Autors.
- **Textdokumentation, die Spezifikation, Anleitungen und andere eigene Materialien, die kein Code sind:** Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0). Bei der Weitergabe bleiben die Namensnennung, der Link zur Lizenz und die Angaben zu Änderungen erhalten. Creative Commons empfiehlt, CC-Lizenzen nicht auf Software anzuwenden; deshalb ist Code von der Dokumentation getrennt.
- **Der Name HomenS.AI, das Logo, Markenzeichen und die Website:** sind nicht in einer Erlaubnis enthalten, ein fremdes Produkt umzubenennen oder den Eindruck einer offiziellen Fassung oder einer Zustimmung des Autors zu erwecken. Die Wiederverwendung von Markenmaterialien regelt eine gesonderte Richtlinie; das Fehlen einer eingetragenen Marke wird in keine Richtung angenommen.

Dies ist ein öffentliches **nicht kommerzielles Projekt mit verfügbarem Quellcode**, nicht Open Source im Sinne der Open Source Definition: Ein Verbot kommerzieller Nutzung ist mit dem OSI-Kriterium der freien Nutzung in jedem Einsatzbereich unvereinbar. Die Veröffentlichung des Quellcodes auf GitHub hebt diese Einschränkung nicht auf.

Pflichtmaßnahmen zur Namensnennung:

1. Jede für das Projekt geschriebene Quelldatei beginnt mit einem lesbaren Hinweis auf den Autor, das Projekt, das Jahr und den Link zu ihrer Lizenz; er wird beim Kopieren oder Überarbeiten nicht entfernt. HTML-Seiten zeigen außerdem einen sichtbaren Link zum Autor in der Fußzeile oder einem Abschnitt „Über“. Vereint eine Datei Code und Dokumentationstext (zum Beispiel eine HTML-Seite), nennt der Kopf, welche Lizenz für welchen Teil gilt.
2. Das Hauptverzeichnis des Repositorys enthält `LICENSE` für Code, `LICENSE-DOCS` für Dokumentation, `NOTICE` mit den Angaben zum Autor und eine kurze `THIRD_PARTY_NOTICES` nur, wenn gesondert vereinbarte Abhängigkeiten hinzukommen.
3. `LICENSE` enthält die verpflichtende PolyForm-Zeile `Required Notice: Copyright (c) 2026 Serhii Khomenko. HomenS.AI JobPilot. https://homensai.com/`, und eine Kopie der Lizenz oder ihre offizielle URL wird mit dieser Zeile an jeden Empfänger einer Kopie weitergegeben. `NOTICE` enthält dieselben Angaben.
4. Veröffentlichte Änderungen behalten den ursprünglichen Autor und die Lizenz, kennzeichnen die Tatsache und den Autor der Änderungen und werden nicht als offizieller HomenS.AI-Build ausgegeben. Das Entfernen oder Ersetzen der Urheberschaft ist nicht erlaubt.

Vor einem GitHub-Release prüft der Autor, welche Dateien abgedeckt sind und wem die Rechte gehören, genehmigt die genauen Lizenzdateien und prüft, dass alle Logos, Schriften, Abhängigkeiten und anderen Materialien vereinbare Rechte haben. Die Lizenzen werden nicht auf Materialien anderer oder auf Nutzerdaten angewendet.

## 10. Installation und die Rolle des KI-Assistenten

Die Schritt-für-Schritt-Anleitung gibt es als `USER_GUIDE.md` und `overview_install.html` (Russisch: `docs/ru/overview_install.html`), mit demselben Inhalt, in jedem Release gemeinsam aktualisiert. Sie geht von einem frischen Windows ohne Git, Python oder Node aus: Das Archiv kommt über **Code → Download ZIP**, und jeder Schritt hat eine Handlung, was auf dem Bildschirm erscheinen soll und was bei einem Fehler zu tun ist. Die erste Anleitung des Agenten ist `TODO_FOR_AI.md`. Öffentliche Anleitungen verbieten, Code aus den Projekten in Abschnitt 14 zu verwenden; jede Abhängigkeit von Dritten wird dem Autor zuerst mit Zweck, Version und Lizenz vorgeschlagen.

### 10.1 Reihenfolge der Installation: der Agent, dann das Archiv, dann die Verbindung

1. **Der Agent.** Installieren Sie ChatGPT Desktop, melden Sie sich an und prüfen Sie, dass Codex verfügbar ist. Die Grundkonfiguration ist ein bezahlter Tarif ChatGPT Plus oder ein passender höherer Tarif mit Codex; Codex wird auch für die Tarife Free und Go angegeben, die Arbeit damit ist hier aber nicht bestätigt. Bei der Prüfung am 8. Oktober 2026 zeigte die offizielle [Preisseite](https://learn.chatgpt.com/docs/pricing) 20 USD pro Monat für Plus; Preise, Grenzen und Zugang ändern sich, prüfen Sie sie daher und [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan) vor dem Bezahlen. Die Kompatibilität mit Claude Code ist nicht bestätigt.
2. **Der Projektordner.** Entpacken Sie die ZIP-Datei in einen eigenen Ordner; `README.md`, `AGENTS.md`, `TODO_FOR_AI.md`, `dashboard_template` und `Локальные_данные\Положите_сюда` müssen direkt darin liegen.
3. **Verbindung und erster Start.** Öffnen Sie den Ordner als lokales Projekt, legen Sie einen Chat in der lokalen Umgebung an, schalten Sie `Ask for approval` ein und starten Sie die Startanweisung im Modus nur Entwürfe.

Ein ChatGPT-Projekt in der Cloud ist kein lokales Projekt: Ein in einen Chat geschriebener Pfad gibt keinen Dateizugriff. Codex und Claude Code sind Alternativen mit eigenen Berechtigungs- und Mail-Einstellungen; Links und Menünamen werden vor jedem Release geprüft. Ein Agent, der durch die Installation führt, nennt den Schritt und das erwartete Ergebnis, wartet auf Bestätigung und schlägt nie vor, Entwicklungswerkzeuge zu installieren.

### 10.2 Codex-Berechtigungen und Ordnerzugriff

Zugriff wird nur auf das entpackte Hauptverzeichnis gewährt, mit `Ask for approval` oder einem gleichwertigen sicheren Modus; nie Administratorrechte oder die ganze Festplatte. Alle Daten kommen nach `Локальные_данные/`; fehlt der Schreibzugriff, nennt der Agent die enge Berechtigung, die er braucht. Netzwerk, Konten, Dateien und Computersteuerung sind getrennte Berechtigungen, geprüft in der Oberfläche oder mit `/status`.

### 10.3 Gmail über einen freigegebenen Connector oder den eingebauten Browser verbinden

Die Person verbindet Gmail selbst auf den eigenen Bildschirmen der Plattform (Abschnitt 7.2); der Agent hält nur die Kontoadresse fest, beginnt nur mit Lesen und prüft die Fähigkeiten für Anhänge und Scheduled. Eine Leseberechtigung ist keine Sendeberechtigung. Schritte: USER_GUIDE.md; der Teil des Agenten: TODO_FOR_AI.md, A8.

### 10.4 Tages- und Monatsplan

Die tägliche Postfachprüfung (Standard 16:00 Ortszeit) und die monatliche Erinnerung sind echte geplante Aufgaben des Agenten, bei der Einrichtung geprüft (DATA_CONTRACT.md §14, §15). Ohne sie oder bei schlafendem Computer startet die Person die Prüfung von Hand; die Planung in Claude Code ist ungeprüft. Siehe [Scheduled tasks](https://learn.chatgpt.com/docs/automations). In Gmail terminierte Nachrichten werden trotzdem ohne den Agenten gesendet.

### 10.5 Die verbindliche statische Statistikseite

`dashboard_template/index.html` wird mit einer synthetischen `summary.js` (eine Demo) ausgeliefert und öffnet sich daher per Doppelklick. Für ein echtes Profil kopiert der Agent die Seite **unverändert** neben eine `summary.js`, die er schreibt (`window.JP_DATA = {…}`, `demo: false`), sodass ein Datenfehler die Seite nicht zerstören kann; das Menü `Локальные_данные/dashboard/index.html` verlinkt auf `dashboard/profiles/<profile_id>/index.html`. Die Seite braucht keinen Server und keine externe Bibliothek und meldet eine fehlende oder beschädigte Datendatei, statt falsche Zahlen zu zeigen. Sie zeigt **Jahr → Monat → Tag** mit Zusammenfassungen (gesendet, Antworten, Ergebnisse, Zustellfehler, Kontingent „verbraucht / reserviert / übrig von 44“) und Tabellen der Tagesereignisse, sortiert nach Datum oder Ergebnis anhand echter Zeitstempel (nicht nach Zeichenketten `DD.MM.YYYY`), filtert nach Jahr, Monat, Ergebnis, Firma, Ort und Beruf und wechselt die Sprache mit dem Umschalter oder `?lang=ru`. Sie speichert nichts außer dem Design, sendet nichts und ändert keine Einträge; keine Nachrichtentexte, Lebensläufe oder Adressen kommen hinein. Format und Schreibverfahren: DATA_CONTRACT.md §9.

### 10.6 Computer Use

Computer Use wird nur eingeschaltet, wenn eine Aufgabe den Bildschirm braucht, und nur für die nötige Anwendung (unter Windows muss das Fenster sichtbar sein); nie, um Anmeldung, Gmail-Bestätigungen, die Sandbox oder die Zustimmung zu umgehen. Vor dem ersten Arbeitszyklus prüft die Person: Der richtige Ordner ist offen, die Berechtigungen sind minimal, das Gmail-Konto stimmt, keine Geheimnisse liegen im Ordner, der Versand entspricht dem Modus, Tests verwenden synthetische Daten, und sie weiß, was an ein Cloud-Modell weitergegeben wird.

## 11. Kriterien für sichere Bereitschaft

- Es ist unmöglich, versehentlich ein Dokument oder die Post eines anderen Profils zu öffnen; das wird durch von Hand geprüfte Negativszenarien bestätigt.
- Mit jedem wesentlichen Fakt sind Quelle, Prüfdatum, Bestätigungsstatus und Fassung verknüpft.
- Eine Arbeitgeber-Dublette und eine Niederlassung werden geprüft; eine wiederholte Bewerbung wird nicht ohne Grund angelegt.
- Daten und Text des Pakets stimmen überein; DOCX/PDF werden ohne Abschneiden und mit korrekten Schriften gerendert.
- Der Import von Quellarchiven ist zunächst nur lesend und liefert eine Zuordnung / einen Fehlerbericht.
- Gmail ändert keine Labels / archiviert nicht / löscht nicht; die Dublettenvermeidung wird durch einen wiederholten Lauf geprüft.
- Die statische `Локальные_данные/dashboard/index.html` öffnet sich per Doppelklick ohne Server und Netzwerk; Sortierung nach Jahren / Daten / Ergebnissen, Monats- und Tagesgruppen, die Markierung veralteter Daten und das Fehlen von Schreibvorgängen und Netzwerkanfragen sind geprüft.
- In Tests wird keine echte E-Mail gesendet; Versand braucht einen freigegebenen Profilmodus, den genauen Empfänger und die Anhänge.
- Eine automatische Antwort auf eine Absage und die automatische Vorbereitung einer Ersatzbewerbung lösen bei automatischen, vorübergehenden oder mehrdeutigen Nachrichten nicht aus.
- Alle Ereignisse und Berichtsergebnisse lassen sich mit der ursprünglichen Gmail-Message-ID und den Quellen der Stellen verknüpfen.
- Das Limit von 44 tatsächlichen Einreichungen mit Lebenslauf je Person und Kalendermonat lässt sich nicht über ein zweites Profil / einen zweiten Chat, eine neue Adresse, eine Ersatzbewerbung nach einer Unzustellbarkeit oder einen anderen Kanal umgehen; der 45. Versand wird blockiert, und die Warteschlange erzeugt keinen Massenversand. Das gemeinsame Kontingent bei parallelen Aufgaben und ein sicherer Halt, wenn das Journal nicht verfügbar ist, werden geprüft.
- Eine Sicherung lässt sich wiederherstellen; das GitHub-Repository wird auf persönliche Daten und Geheimnisse durchsucht.

Für jedes Kriterium werden die entsprechenden Szenarien aus ACCEPTANCE_TESTS.md ausgeführt und die Nachweise aufbewahrt. Solange ein Szenario nicht von Hand durchgeführt wurde, ist sein Status NOT RUN; das Prüfen von Links in der Dokumentation bedeutet nicht, dass die Post oder der Schutzmechanismus bereit ist.

## 12. Arbeitsschritte

Die offenen Arbeiten stehen in [REMAINING_WORK.md](../../REMAINING_WORK.md). Bereitschaft zeigen nur die von Hand ausgeführten Szenarien aus [ACCEPTANCE_TESTS.md](ACCEPTANCE_TESTS.md), zuerst mit synthetischen Daten und erst dann mit Gmail im Lesemodus. Der Versand wird erst nach diesen Prüfungen eingeschaltet.

## 13. Quellen zu den Anforderungen an Profil und Plattform

Geprüft am 7. Oktober 2026. Diese Quellen bestätigen die Anforderungen und Werkzeuge; sie werden vor einem Release erneut geprüft.

- PolyForm Noncommercial License 1.0.0, der offizielle Text für Softwarecode: https://polyformproject.org/licenses/noncommercial/1.0.0
- Creative Commons Attribution-NonCommercial 4.0 International, der offizielle Text für die Dokumentation: https://creativecommons.org/licenses/by-nc/4.0/
- Open Source Initiative, Open Source Definition, Kriterium Nr. 6: https://opensource.org/osd
- Creative Commons FAQ, warum CC-Lizenzen für Software nicht empfohlen werden: https://creativecommons.org/faq/#can-i-apply-a-creative-commons-license-to-software

- Europass, Abschnitte eines persönlichen Profils: Ausbildung, Berufserfahrung, Sprachen, digitale Kompetenzen, Projekte, Erfolge und weitere Fähigkeiten: https://europass.europa.eu/en/how-complete-my-europass-profile
- Europass, ein Profil als Quelle für mehrere passende Lebensläufe; einen Lebenslauf auf eine Stelle zuschneiden: https://europass.europa.eu/en/create-europass-cv
- Make it in Germany, das Portal der Bundesregierung: https://www.make-it-in-germany.com/en/working-in-germany/job/application
- OpenAI, ChatGPT Desktop / Codex herunterladen: https://chatgpt.com/download/
- OpenAI Learn, Quickstart: Installation und erster Start von Desktop: https://learn.chatgpt.com/docs/quickstart
- OpenAI, die Aufteilung von Chat/Work/Codex und lokale Berechtigungen: https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex
- OpenAI Learn, Codex-Projekte und das Hinzufügen eines lokalen Ordners: https://learn.chatgpt.com/docs/projects
- OpenAI Learn, Berechtigungsmodi und Ask for approval: https://learn.chatgpt.com/docs/permission-modes
- OpenAI Learn, Sandbox / Freigabemodus, beschreibbare Wurzelverzeichnisse und die Prüfung mit `/status`: https://learn.chatgpt.com/docs/sandboxing ; https://learn.chatgpt.com/docs/config-file/config-reference
- OpenAI Learn, Windows-Sandbox: https://learn.chatgpt.com/docs/windows/windows-sandbox
- OpenAI Learn, Computer Use: Installation, Zulassen von Anwendungen und Grenzen für den Vordergrund unter Windows: https://learn.chatgpt.com/docs/computer-use
- OpenAI Learn, MCP-Einrichtung und OAuth in Codex Desktop: https://learn.chatgpt.com/docs/extend/mcp
- OpenAI Learn, Codex-Umgebungen Local / Worktree / Cloud: https://learn.chatgpt.com/docs/environments/modes
- OpenAI Learn, geplante Aufgaben; Anforderungen an lokale Projekte und Verhalten der Sandbox: https://learn.chatgpt.com/docs/automations
- OpenAI Learn, Plugins / Connectoren und Berechtigungen für App-Aktionen: https://learn.chatgpt.com/docs/enterprise/apps-and-connectors
- Anthropic, Claude Code für Windows und Installation: https://code.claude.com/docs/en/getting-started
- Google Gmail API, Überblick und Mail-Aktionen: https://developers.google.com/workspace/gmail/api/guides
- Google Gmail API, OAuth-Bereiche: https://developers.google.com/workspace/gmail/api/auth/scopes
- Google Gmail API, OAuth-Ablauf: https://developers.google.com/workspace/gmail/api/auth/web-server
- Google Gmail API, Threads lesen: https://developers.google.com/workspace/gmail/api/guides/threads
- Google OAuth-Verifizierung: https://support.google.com/cloud/answer/13463073?hl=en
- Bürgerliches Gesetzbuch (BGB), § 307 Inhaltskontrolle von AGB: https://www.gesetze-im-internet.de/bgb/__307.html
- Bürgerliches Gesetzbuch (BGB), § 309 Klauselverbote ohne Wertungsmöglichkeit (Haftungsausschlüsse in AGB): https://www.gesetze-im-internet.de/bgb/__309.html
- Urheberrechtsgesetz (UrhG), § 31 Einräumung von Nutzungsrechten: https://www.gesetze-im-internet.de/urhg/__31.html
- Die Website und das GitHub-Profil des Autors (vor der Veröffentlichung auf Aktualität zu prüfen): https://homensai.com/ ; https://github.com/HomenSAI

## 14. GitHub-Alternativen — nur Marktrecherche, keine Codequellen

Geprüft am 7. Oktober 2026 anhand öffentlicher Seiten und READMEs. Dies ist ein kurzer Vergleich angegebener Funktionen, keine Prüfung von Sicherheit, Leistung oder Funktionsfähigkeit. Die Suche ist nicht erschöpfend. Die Repositorys wurden weder heruntergeladen noch ausgeführt; ihr Quellcode wurde nicht verwendet. Die Liste dient nur dem Verständnis des Markts und ist keine Liste von Kandidaten für Fork, Integration oder die Wahl einer Codebasis.

| Projekt | Was sich bereits mit der Idee überschneidet | Wichtige Grenze für unser Szenario |
|---|---|---|
| [Career OS](https://github.com/Shanupower/career-os) | Local-first-Suche, Bewertung, Zuschnitt, Kontaktaufnahme und Bewerbungs-CRM; das Repository nennt AGPL-3.0. Nahe in der Breite des beschriebenen Ablaufs. | Die öffentliche Beschreibung bestätigt nicht gesondert deutsche Wege, Gmail je Profil und einen Verlauf nach Message-ID. Nur ein Marktbezug; kein Code wird verwendet. |
| [CareerPulse](https://github.com/tcpsyn/CareerPulse) | Selbst gehostete Suche über mehrere angegebene Jobbörsen, KI-Abgleich, Profile, Lebenslauf und Anschreiben als DOCX/PDF, ein Planer und eine Warteschlange mit Freigabe. | Die öffentliche Beschreibung bestätigt keine Regeln für Initiativansprachen an Firmen, deutsche Berichte und einen Gmail-Verlauf. Nur ein Marktbezug; kein Code wird verwendet. |
| [JobSync](https://github.com/Gsync/jobsync) | Ein selbst gehosteter Tracker, Import von Lebensläufen, KI-Prüfung / -Abgleich, Stellensuche, Kontakte und Integration mit Agenten; das Repository nennt MIT. | Die öffentliche Beschreibung bestätigt nicht die nötige Schleife über Gmail-Threads und neutrale Monatsberichte. Nur ein Marktbezug; kein Code wird verwendet. |
| [ApplyTrail](https://github.com/rutuu/ApplyTrail) | Ein lokaler Gmail-Tracker: Post lesen, Antworten / Interviews / Absagen einordnen, manuelle Korrektur und CSV; das Repository nennt MIT. | Die öffentliche Beschreibung konzentriert sich auf das Mail-Journal. Nur ein Marktbezug; kein Code wird verwendet. |
| [ApplyKit](https://github.com/wihlarkop/applykit) | Local-first-Profilimport, Lebenslauf / Anschreiben je Stelle, Abgleich mit Belegen und Bewerbungsverlauf; das Repository nennt MIT. | Die öffentliche Beschreibung beansprucht nicht das ganze Firmenregister und Geo-Wege. Nur ein Marktbezug; kein Code wird verwendet. |
| [SimplyApply](https://github.com/artbyjazi/simply-apply) | Lokale Suche / Anpassung des Lebenslaufs, DOCX/PDF und Prüfungen gegen unbestätigte Fakten; das Repository nennt AGPL-3.0. | Die öffentliche Beschreibung betont den Zuschnitt des Lebenslaufs und den Bewerbungslink. Nur ein Marktbezug; kein Code wird verwendet. |

### Schlussfolgerung zu den Alternativen

In der betrachteten Auswahl gibt es Werkzeuge mit ähnlichen einzelnen Funktionen. Das bedeutet nicht, dass die Idee oder die Umsetzung dieses Projekts von ihnen übernommen wurde: Die Beschreibung des Produkts und die Anforderungen hat Serhii Khomenko aus seinem eigenen Arbeitsablauf formuliert. Der Überblick beschränkt sich auf öffentliche Beschreibungen und beansprucht nicht, die rechtliche Einzigartigkeit der Idee zu beweisen.

Die Entscheidung steht fest: Serhii Khomenko entwickelt das System eigenständig, von Grund auf, nach seiner eigenen Spezifikation. Die aufgeführten Projekte werden nicht als Codebasis verwendet; ihre Quellen, Komponenten, Vorlagen, Gestaltung, Architektur und Prompts werden nicht geforkt, integriert oder angepasst. Diese Materialien bleiben nur eine vergleichende Marktstudie. Übliche Abhängigkeiten der Umsetzung werden gesondert und offen vereinbart und sind keine Übernahme aus den aufgeführten Projekten.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com · [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
