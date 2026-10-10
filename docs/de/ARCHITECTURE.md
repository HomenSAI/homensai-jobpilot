Deutsche Fassung. Maßgeblich ist die englische Fassung (DATA_CONTRACT.md bzw. ARCHITECTURE.md im Hauptverzeichnis).

# HomenS.AI JobPilot — Architektur

[English](../../ARCHITECTURE.md) | [Русский](../ru/ARCHITECTURE.md) | [Deutsch](ARCHITECTURE.md) | [Українська](../uk/ARCHITECTURE.md)

9. Oktober 2026 · Autor der Idee und Entwickler: Serhii Khomenko / HomenS.AI · https://homensai.com/ · Dokumentation: CC BY-NC 4.0.

Status: Entwurfs- und Betriebsspezifikation; ob jedes Verfahren ausprobiert wurde, hält ACCEPTANCE_TESTS.md fest. Keine Server, kein Docker, kein SQL.

## 1. Grundentscheidung: Regeln und Dateien

Das System besteht aus einem **KI-Agenten** (Codex oder Claude Code), **schriftlichen Regeln**, einem **Datenordner** und einer lokalen Statistikansicht. Der Agent recherchiert, schreibt Dokumente, spricht mit der Person und führt jeden Datensatz als lesbare Datei (JSON, JSONL, Markdown, Dokumente). Die HTML-Seite gibt keine Befehle; ihre Daten ändern sich nur, wenn der Agent arbeitet.

Die Schutzmaßnahmen (das Limit von 44, nie zweimal senden, ein Schreiber, nichts ohne Erlaubnis senden) sind *Verfahren, denen der Agent folgt*, keine technischen Sperren. Deshalb ist jede Regel eine Checkliste, die vor der Handlung abgearbeitet wird; nur Entwürfe ist der Standard; automatischer Versand braucht die schriftliche Bestätigung der Person, dass Limit und Dublettenschutz dann vom Agenten abhängen; und die Abnahmeszenarien (ACCEPTANCE_TESTS.md) werden vor jedem echten Versand von Hand mit synthetischen Daten geprüft.

## 2. Teile und Zuständigkeiten

| Teil | Was der Agent tut | Abgelegt in |
|---|---|---|
| Arbeitsbereich, Fähigkeiten | Ordner, Format, Person, Profil; testet jedes Werkzeug (Abschnitt 7) | `workspace.json` |
| Profil und Wissensbasis | Unterlagen und Interview → vorgeschlagene → bestätigte Fakten mit Quellen; das Suchprofil | `Life_Story.md`, `profile.json` |
| Suche, Planung | Zielfirmen (Dubletten, Aktualität, Radius, Wege); Slots, Reservierungen, Verschiebungen | `registry.json`, Journal |
| Dokumente | Pakete aus Anforderungen und bestätigten Fakten, Fassungen, Sichtprüfung | Bewerbungsordner |
| Post | Ganze Threads, Versandnachweis, Meldungen, Antworten | Journal, `Status.txt` |
| Berichte | Zählungen an einer festen Journalposition; DOCX/PDF/HTML mit denselben Zahlen | `reports/`, `dashboard/` |

Zustandsänderungen werden zuerst im Journal festgehalten. Welche Datei der Agent wann liest: `AGENTS.md`.

## 3. Die Buchungseinheit ist die Person

`person_id` fasst die Suchrichtungen einer Person zusammen. Jede Richtung hat ihre eigene `profile_id`, Dokumentsprachen, ihr Konto, ihre Dokumente und Einwilligungen. Kontingent und Prüfungen auf wiederholte Bewerbungen werden über `person_id` geteilt; verschiedene Personen haben getrennte Journale.

```text
Local_Data/
  workspace.json  # workspace_id, format, language, stage of the first run, capabilities
  Put_Here/  # the ONLY place where the person puts things; the agent only reads it
    1_My_Documents/  # CVs, diplomas, certificates, references (originals)
    2_My_Story/  # the person's story: transcripts, notes, interviews, the questions
    3_Report_Template/  # optional report template
    4_CV_Templates/  # everything about the CVs, any format; read only
    5_Cover_Letter_Templates/  # everything about the cover letters; read only
  persons/<person_id>/
    Knowledge_Base/Life_Story.md  # the knowledge base: confirmed facts of the life story
    journal/transactions-YYYY-MM.jsonl  # the only authoritative journal; monthly segments, -pN parts above 500 lines
    journal/writer.lock  # exists only while one chat is writing
    state/person.json  # person, profile list, setup_progress
    state/quota.json  # monthly counters, rebuilt from the journal
    outbox/<send_attempt_id>/  # prepared send package, never edited
    runs/  # person-level session notes (first setup)
    archives/  # local archives (DATA_CONTRACT.md §11)
  Resume/  # CV drafts and the Word copy of the template in use; one subfolder per person_id with several people
  CoverLetter/  # the same for cover letters
  profiles/<profile_id>/
    profile.json  # current confirmed configuration
    registry.json  # targets, applications, queue (projection)
    runs/  # session notes: plans, results, questions
    reports/<YYYY-MM>/  # report revisions and manifests
  Applications/<YYYY>/<MM_Month>/  # one tree for all years, e.g. 2026/10_October/
    001_Muster-Maschinenbau_Stuttgart_Maintenance-technician/  # number, company, city, role
      Company.md · Resume_v001.docx/.pdf · CoverLetter_v001.docx/.pdf · EmailText_de.txt · EMAIL_TO_SEND.txt
      Status.txt  # append-only history of this application
      Replies.txt  # every reply and delivery notice in full
  dashboard/
    index.html  # local menu: statistics and readiness per profile
    profiles/<profile_id>/summary.js · index.html · readiness.html  # data; unchanged template copy; readiness page
  Archive/<YYYY-MM-DD>_daily/  # daily full archive of Local_Data, for a USB stick (DATA_CONTRACT.md §11.9)
```

`Local_Data` ist in jeder Sprachfassung der technische Pfad; das Dashboard hat einen Pfad, `Local_Data/dashboard/`; Profilkennungen sind eindeutig. Jede Journalzeile trägt `person_id` und, wo zutreffend, ihr Profil; vor dem Handeln prüft der Agent, dass das Profil zur Person und zum Konto gehört.

**Trennung zwischen Personen und Profilen (Verfahren, F12).** Jede Person hat `persons/<person_id>/` und Originale in `Put_Here/<name>/`; der Agent öffnet nie die Originale, Wissensbasis, das Journal, den Zustand, den Postausgang, die Archive oder die Post einer anderen Person. Eine neue Person durchläuft TODO_FOR_AI.md Teil A ab A2 (A1, die Prüfung des Arbeitsbereichs, wird nicht wiederholt); ihr Fortschritt ist `setup_progress` in `persons/<person_id>/state/person.json` mit denselben Stufenwörtern, und `stage` in `workspace.json` beschreibt nur die Einrichtung des Arbeitsbereichs durch die erste Person. Einwilligungen, Kontingent, Konten und Ansichten je Person: DATA_CONTRACT.md §17. Das ist eine Trennung durch Verfahren, keine Grenze des Betriebssystems.

## 4. Eine Zeile pro abgeschlossene Aktion

Das Journal ist eine Reihe monatlicher Textdateien (Regel 8) mit einem JSON-Objekt pro Zeile. Eine Zeile wird geschrieben, wenn eine Aktion **abgeschlossen** ist: `schema_version`, `sequence` (1, 2, 3 … ohne Lücken), `action_id`, `person_id`, `recorded_at`; eine Liste `events`, jedes Ereignis mit seiner eigenen eindeutigen `event_id`; und ein kurzer Text `result`, der genügt, um die Antwort zu wiederholen, wenn dieselbe Aktion erneut verlangt wird.

Regeln für den Agenten:

1. **Nur anhängen.** Eine alte Zeile wird nie bearbeitet oder gelöscht; eine Korrektur ist eine neue Zeile, die das ersetzte Ereignis nennt (`supersedes_event_id`).
2. **Vor dem Schreiben:** die letzte Zeile lesen, die nächste `sequence` nehmen und prüfen, dass diese `action_id` in keinem Abschnitt vorkommt. Kommt sie vor, das frühere Ergebnis melden und sonst nichts tun.
3. **Die ganze Zeile auf einmal schreiben**, dann die Ansichten aktualisieren (Register, Warteschlange, `Status.txt`, `quota.json`, Statistik). Bricht der Chat dazwischen ab, baut der nächste Chat sie neu auf (6b).
4. **Eine beschädigte oder halb geschriebene letzte Zeile** wird nie stillschweigend repariert: anhalten, die Datei behalten, der Person Bescheid sagen, ab der letzten vollständigen Zeile und den Belegen aus dem Postfach wiederherstellen.
5. **Immer nur ein Schreiber** (4b). Eine fremde Sperre heißt: anhalten und fragen. Die Sperre schützt nur, wenn jeder Chat dem Protokoll folgt und exklusives Anlegen funktioniert; sonst arbeitet immer nur ein Chat.
6. Eine Entscheidung über Kontingent oder Versand liest das Journal immer neu; einer Zusammenfassung von früher im Chat wird nie vertraut.
7. **Mit dem Werkzeug des Systems zählen, nicht nach Augenmaß.** Verbrauchte, reservierte und unbestätigte Slots eines Monats werden durch Textsuche nach den Monatsfeldern der Kontingentereignisse in allen Abschnitten gezählt (Formeln: DATA_CONTRACT.md §3c, freie Anzahl: DATA_CONTRACT.md §5; Befehle: §4a). Der Agent zeigt die Zahl und wie sie ermittelt wurde und vergleicht sie mit `quota.json`; bei einer Abweichung oder fehlender Datei hat das Journal recht, und `quota.json` wird neu aufgebaut (`examples/quota.example.json`).
8. **Eine Zeile schreiben (eine Methode zum Anhängen, monatliche Abschnitte).** Der aktuelle Abschnitt ist `journal/transactions-YYYY-MM.jsonl` des lokalen Monats der Person oder sein Teil `journal/transactions-YYYY-MM-pN.jsonl`, sobald der Monat 500 Zeilen hat (DATA_CONTRACT.md §3c); ein geschlossener Abschnitt wird nie bearbeitet. Abschnitte, die Sperrdatei und JSON-Dateien sind UTF-8 ohne BOM, nur mit LF-Zeilenenden, und enden mit genau einem LF. JSON wird nicht von Hand zusammengesetzt; Text wird nicht mit Shell-Umleitung oder Heredocs geschrieben; die exakte Ersetzung des Dateiwerkzeugs wird nur für Schritt 3 verwendet.
   1. **Vorher.** Unter der Schreibersperre den aktuellen Abschnitt finden (bei 500 Zeilen ist der nächste Teil `-p2`, `-p3` … ein neuer Abschnitt). Seine letzte Zeile lesen, die vollständig sein muss; ist der Abschnitt neu oder leer, die letzte Zeile des neuesten früheren Abschnitts lesen (für die allererste Zeile ist `n` 0). `n` nehmen, ihre `sequence`; prüfen, dass die neue `action_id` in keinem Abschnitt vorkommt. In der Laufnotiz festhalten: die Zeilenzahl; die letzte Zeile `L` ohne ihren Zeilenumbruch (eindeutig: Sie trägt ihre `sequence` und `action_id`); `S0`, die Größe des Abschnitts in Bytes; und `C0`, die SHA-256 des ganzen Abschnitts (ein neuer Abschnitt: `S0` 0, `C0` die SHA-256 einer leeren Datei, `e3b0c442…b855`). Prüfen, dass die Datei mit LF endet, kein CR und kein BOM enthält.
   2. **Aufbauen** der neuen Zeile `N` in der Schlüsselreihenfolge aus DATA_CONTRACT.md §3c mit `sequence` n+1: ein JSON-Objekt auf einer Zeile, Kennungen wie in DATA_CONTRACT.md §2. Eine gescheiterte Prüfung hält an (Schritt 5).
   3. **Anhängen.** (a) Abschnitt mit Zeilen: `L` durch `L`, einen Zeilenumbruch und `N` ersetzen, mit der exakten Ersetzung des Dateiwerkzeugs (bei einer sehr langen `L` genügt ein eindeutiges Ende). Wird `L` nicht genau einmal gefunden, anhalten. (b) Neuer Abschnitt: prüfen, dass die Datei nicht existiert, dann mit dem Dateiwerkzeug anlegen, mit genau `N` und seinem Zeilenumbruch. (c) Ein Abschnitt unter 300 Zeilen darf stattdessen mit dem Dateiwerkzeug ganz geschrieben werden: die in Schritt 1 gelesenen Zeilen, dann `N` und sein Zeilenumbruch; das einzige Neuschreiben eines ganzen Abschnitts.
   4. **Zurücklesen.** (a) `N` lässt sich mit `sequence` n+1 lesen; die Zeile davor, falls vorhanden, ist byteweise gleich `L`. (b) Die Zeilenzahl ist um genau eins gestiegen. (c) Die SHA-256 der ersten `S0` Bytes ist gleich `C0` (kein früheres Byte geändert), und die neue Größe ist `S0` + die Bytes von `N` + 1. (d) Weiterhin LF am Ende, kein CR, kein BOM. Die Werte in der Laufnotiz festhalten.
   5. **Fehler.** Jede gescheiterte Prüfung stoppt das Schreiben: den Abschnitt behalten, keine Ansicht aktualisieren, keine externe Handlung ausführen, die Sperre behalten, der Person Bescheid sagen (Regel 4). Frühere Zeilen werden nie als Reparatur neu geschrieben.
   6. **Freigabe.** Erst nachdem Schritt 4 bestanden ist: die Sperre lesen, die `lock_id` dieses Chats prüfen, sie löschen (4b).

### 4a. Befehle, die der Agent verwenden darf

Nur Befehle, die das System schon hat, direkt eingegeben; kein Skript wird gespeichert, und Python ist nur das Prüfwerkzeug des Testers. Neben der Tabelle: Ordner auflisten und anlegen, nur lesendes `cmp` oder `diff` (zum Beispiel, um zu prüfen, dass eine Geschichte wortwörtlich gespeichert wurde) und eigene temporäre Dateien des Agenten. JSON- und Textdateien (Status.txt, Company.md, Laufnotizen, EMAIL_TO_SEND.txt) werden mit dem Dateiwerkzeug geschrieben, nie mit Shell-Umleitung, Heredocs, `sed` oder Ähnlichem; eine Journalzeile nur nach Regel 8. Ausnahmen: das Anlegen von `writer.lock`, das Kopieren nach `outbox/`, das Dokumentwerkzeug und die einmalige Aufteilung eines alten Journals (DATA_CONTRACT.md §3d), die Bytes nach Zeilenbereichen kopiert und per Prüfsumme zurückgelesen wird.

| Bedarf | Linux / macOS | Windows PowerShell |
|---|---|---|
| UTC-Zeit | `date -u +%Y-%m-%dT%H:%M:%SZ` | `(Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")` |
| UUID | Linux `cat /proc/sys/kernel/random/uuid`; macOS `uuidgen \| tr 'A-Z' 'a-z'` | `[guid]::NewGuid().ToString()` |
| Aktueller lokaler Monat | `TZ=Europe/Berlin date +%Y-%m` (die IANA-Zone der Person) | `[TimeZoneInfo]::ConvertTime([DateTimeOffset]::UtcNow,[TimeZoneInfo]::FindSystemTimeZoneById('W. Europe Standard Time')).ToString('yyyy-MM')` (IANA-Zone dem Windows-Namen zugeordnet) |
| Prüfsumme (`C0`) | Linux `sha256sum '<file>'`; macOS `shasum -a 256 '<file>'` | `(Get-FileHash -Algorithm SHA256 -LiteralPath '<file>').Hash.ToLower()` |
| Größe in Bytes (`S0`) | `wc -c < '<segment>'` | `(Get-Item -LiteralPath '<abs path>').Length` |
| Prüfsumme der ersten `S0` Bytes (Regel 8, 4c) | Linux `head -c <S0> '<segment>' \| sha256sum`; macOS `head -c <S0> '<segment>' \| shasum -a 256` | `$b=[IO.File]::ReadAllBytes('<abs path>'); -join ([Security.Cryptography.SHA256]::Create().ComputeHash($b,0,<S0>) \| ForEach-Object { $_.ToString('x2') })` |
| Bytes der letzten Zeile mit ihrem LF (4c) | `tail -n 1 '<segment>' \| wc -c` | `[Text.Encoding]::UTF8.GetByteCount((Get-Content -Encoding UTF8 -LiteralPath '<abs path>' -Tail 1)) + 1` |
| Endet mit LF, kein CR, kein BOM | `tail -c 1 '<segment>' \| od -An -c` zeigt `\n`; `tr -cd '\r' < '<segment>' \| wc -c` ist 0; `head -c 3 '<segment>' \| od -An -tx1` ist nicht `ef bb bf` | mit `$b` wie oben: `$b[-1] -eq 10; @($b -eq 13).Count -eq 0; -not ($b[0] -eq 0xEF -and $b[1] -eq 0xBB -and $b[2] -eq 0xBF)` |
| Letzte Zeilen, Zeilenzahl | `tail -n 1 '<segment>'`, `tail -n 2 '<segment>'`; `wc -l < '<segment>'` | `Get-Content -Encoding UTF8 -LiteralPath '<segment>' -Tail 1` (oder `-Tail 2`); `(Get-Content -Encoding UTF8 -LiteralPath '<segment>').Count` |
| Treffer eines Monats zählen (Regel 7) | `grep -oE '"consumed_month" *: *"2026-10"' <journal> \| wc -l` (nie `grep -c`: es zählt Zeilen, nicht Treffer) | `(Select-String -Encoding UTF8 -Path <journal> -Pattern '"consumed_month"\s*:\s*"2026-10"' -AllMatches \| ForEach-Object { $_.Matches.Count } \| Measure-Object -Sum).Sum` (leer bedeutet 0) |
| Jede Zeile ist gültiges JSON | Mit dem Dateiwerkzeug zurücklesen: ein Objekt pro Zeile; `jq empty '<segment>'` nur, wenn jq installiert ist | `Get-Content -Encoding UTF8 -LiteralPath '<segment>' \| ForEach-Object { $_ \| ConvertFrom-Json } \| Out-Null` |
| `writer.lock` mit Inhalt anlegen, scheitert, wenn sie existiert | `set -C; printf '%s\n' '<lock json>' > '<absolute path>/journal/writer.lock'` (bash oder zsh) | `` $f=[IO.File]::Open('<absolute path>','CreateNew','Write','None'); $w=New-Object IO.StreamWriter($f,(New-Object Text.UTF8Encoding($false))); $w.Write('<lock json>'+"`n"); $w.Close() `` |
| Kopieren nach `outbox/<send_attempt_id>/` | `cp '<source>' '<outbox folder>/'`, dann die Prüfsumme jeder Kopie | `Copy-Item -LiteralPath '<source>' -Destination '<outbox folder>'`, dann die Prüfsumme jeder Kopie |
| DOCX → PDF | Zuerst das Dokumentwerkzeug der Plattform; sonst `soffice --headless --convert-to pdf --outdir '<folder>' '<file.docx>'` | dasselbe |

`<journal>` ist jeder Abschnitt `journal/transactions-*.jsonl` der Person; `<segment>` ist der aktuelle. Pfade sind absolut und in Anführungszeichen. Der Zustand der Shell bleibt zwischen Befehlen nicht erhalten, daher sind `set -C` und das Anlegen der Sperre ein Befehl; das JSON der Sperre enthält keinen Apostroph. Die Linux-Formen wurden mit bash und GNU coreutils ausprobiert; die macOS-Formen sind ihre BSD-Entsprechungen. Die PowerShell-Formen wurden noch nicht auf einem echten Windows-Rechner ausprobiert; der erste Versuch gehört zu den Abnahmeprüfungen.

### 4b. Protokoll der Schreibersperre (F07)

**Geltungsbereich.** Eine Sperre je Person, `persons/<person_id>/journal/writer.lock`, für Journal-, Kontingent- und Profilereignisse dieser Person. Sie umfasst nur die Schreibschritte; Suche, Rendern und externe Aufrufe finden außerhalb statt. Die Sperre einer anderen Person blockiert die Schreibvorgänge dieser Person weder, noch erlaubt sie sie.

**Die Sperre nehmen.**

1. Legen Sie die Datei **mit ihrem Inhalt in einem Befehl** an, der scheitert, wenn die Datei existiert, mit absolutem Pfad (§4a). Zu prüfen, dass die Datei fehlt, und sie dann anzulegen, ist kein exklusives Anlegen.
2. Der Inhalt ist eine JSON-Zeile mit `lock_id`, `run_id`, `owner`, `person_id` und `created_at` (DATA_CONTRACT.md §3c, „Die Sperrdatei“ [The lock file]); die `run_id` steht auch in der Sitzungsnotiz des Chats.
3. Existiert die Datei, nichts schreiben und sie lesen. Ist ihre `run_id` die dieses Chats: weitermachen (ein neu gestarteter Chat erkennt seine Sperre an seiner Notiz). Andernfalls: anhalten, `LOCK_HELD` melden, die Person fragen. **Eine leere oder unlesbare Sperre** (der Besitzer hat zwischen Anlegen und Schreiben aufgehört) ist eine fremde Sperre: Es gilt das Verfahren für verwaiste Sperren.
4. Vor jedem Schreiben die Sperre erneut lesen und die `lock_id` bestätigen; ist sie verschwunden oder geändert, das Schreiben abbrechen und es melden.
5. `capabilities.writer_lock` in `workspace.json` hält fest, ob exklusives Anlegen funktioniert (`available`, `unavailable`, `unknown`). Cloud-synchronisierte Ordner (OneDrive, iCloud, Dropbox) bieten kein exklusives Anlegen über Geräte hinweg: `unavailable`. Wenn nicht `available`, beansprucht der Agent keine Exklusivität, führt kein selbstständiges paralleles Schreiben und keine externe Handlung aus und sagt der Person, dass nur ein Chat arbeiten darf.

**Die Sperre freigeben.** Nur der Inhaber, erst nachdem seine letzte Zeile das Zurücklesen aus Regel 8, Schritt 4, bestanden hat (ein Chat, der nichts geschrieben hat, gibt nach seiner letzten Prüfung frei): die Sperre lesen, die eigene `lock_id` bestätigen, sie als eigenen Schritt löschen. Ein fehlgeschlagenes Schreiben behält die Sperre und hält den Chat an; die Sperre wird nie im selben Befehl gelöscht wie ein Schreiben, das gescheitert sein kann. Nie wegen ihres Alters, durch einen anderen Chat oder nach einer Zeitüberschreitung; keine Journalzeile.

**Verwaiste Sperre.** Eine Sperre verfällt nie durch ihr Alter, und das Entfernen einer Sperre gibt nie eine Reservierung frei. Eine Sperre, die nicht diesem Chat gehört, wird erst entfernt, nachdem in dieser Reihenfolge: (a) die Person bestätigt, dass der besitzende Chat nicht mehr arbeitet; (b) die letzte Journalzeile vollständiges JSON ist und `sequence` keine Lücken hat (DATA_CONTRACT.md §3c); (c) jeder offene Versuch (`send_started` oder eine Terminierungsabsicht ohne Ergebnis) aufgelistet ist und zu `send_uncertain` wird, sofern er nicht mit SENT oder Scheduled abgeglichen ist, und Ordner im Postausgang ohne Ergebnis aufgelistet sind; (d) der Zustand auf der Gegenseite geprüft ist, soweit das Mail-Werkzeug es erlaubt; was sich nicht prüfen lässt, bleibt offen; (e) die Sperre gelöscht wird, vermerkt im Laufprotokoll und im `result` der nächsten Journalzeile (kein eigenes Ereignis). Solange ein offener Versuch existiert, ist für diese Person in keinem Chat ein neuer Versand oder eine neue Terminierung erlaubt.

**Fehlerpunkte.** Keiner davon führt zu einem zweiten externen Aufruf.

| Fehlerpunkt | Hinterlassen | Wiederherstellung |
|---|---|---|
| Bevor die Sperre angelegt ist | Nichts | Neu beginnen |
| Sperre angelegt (auch leer), keine Zeile geschrieben | Nur die Sperre | Prüfung auf verwaiste Sperre; kein externer Aufruf ist erfolgt; nach (a) entfernen |
| Während des Schreibens der Zeile | Möglicherweise eine abgeschnittene letzte Zeile | Anhalten, die Datei behalten (Regel 4); ab der letzten vollständigen Zeile untersuchen |
| Nach der Absichtszeile (`quota_reserved`, `send_started`): vor dem Aufruf, Antwort verloren oder vor der Ergebniszeile | Offener Versuch; der Aufruf kann erfolgt sein | SENT und Scheduled einmal abgleichen: bestätigt → `sent_verified` + `quota_consumed` (oder der Terminierungseintrag); nachweislich nicht vorhanden → `failed_before_send` + `quota_released`; sonst `send_uncertain`, Reservierung bleibt, die Person entscheidet. Nie erneut aufrufen |
| Nach der Ergebniszeile, vor den Ansichten | Ansichten veraltet | Replay (6b); keine externe Handlung |
| Zwei Chats wetteifern um den letzten Slot | Ein exklusives Anlegen gelingt | Der Verlierer schreibt nichts, `LOCK_HELD`; die Kontingentprüfung läuft, nachdem die Sperre genommen ist |
| Sperre während eines Schreibens von einem anderen Akteur gelöscht | Ein Schreiben kann mittendrin abbrechen | Schritt 4 stoppt das Schreiben; der nächste Chat folgt dem Verfahren für verwaiste Sperren |

Ohne exklusives Anlegen gelten diese Regeln weiterhin, und parallele Chats für eine Person werden überhaupt nicht unterstützt.

## 5. Standardaktionen

Der Agent führt benannte Aktionen aus, jede eine Checkliste in `TODO_FOR_AI.md` Teil C, und verwendet die Namen im Journal und in Nachrichten: Inspect workspace (Arbeitsbereich prüfen); Resume work (Arbeit fortsetzen); Propose / confirm profile (Profil vorschlagen / bestätigen); Import targets (Zielfirmen importieren); Register package (Paket registrieren); Plan queue (Warteschlange planen; nur eine Vorschau); Commit plan (Plan festschreiben; Plan und Reservierungen nach der Annahme); Send check (Versandprüfung; „erlaubt“ oder „blockiert“, nichts wird gesendet); Send (Senden; ein genehmigter Versand und sein Ergebnis); Read / classify / reconcile mail (Post lesen / einordnen / abgleichen; mit Nachweis, nie erneut senden); Replay / rebuild views (Ansichten neu aufbauen, 6b); Build report / statistics (Bericht / Statistik erstellen; dieselben Zahlen); Backup / restore check und Create local archive (Sicherung / Wiederherstellung prüfen, lokales Archiv anlegen; R01, Abschnitt 12); Schedule in Gmail (in Gmail terminieren; R03, 6a; noch nicht gesendet); Plan the month and cadence (Monat und Rhythmus planen; R02, R04; 8a, 8b); Daily check at 16:00 (tägliche Prüfung um 16:00; R05, 8c).

Jede Antwort nennt das Ergebnis (`ok`, `needs_input`, `conflict`, `blocked` oder `failed`), einen Begründungscode, die Journalposition, die Dateien und den nächsten Schritt. Begründungscodes und welche Aktionen eine Zeile schreiben: DATA_CONTRACT.md §3c (zum Beispiel `ACCOUNT_MISMATCH`, `QUOTA_EXHAUSTED`, `SEND_UNCERTAIN`, `PACKAGE_CHANGED`, `SUBJECT_TOO_LONG`, `MODE_DRAFT_ONLY`, `LOCK_HELD`). Eine bestandene Versandprüfung ist keine dauerhafte Erlaubnis: Send prüft Journalposition, Zeit, Zustimmung und Paket erneut.

## 6. Versand und Postausgang

Der Postausgang `outbox/<send_attempt_id>/` enthält für einen Versuch Kopien der anzuhängenden Dateien, `message.txt` (Empfänger, Betreff und Text genau wie gesendet) und `attempt.json` (`account_id`, `application_id`, `send_attempt_id`, `consent_id`, Prüfsummen der Kopien); keine Geheimnisse. Ein Versuch mit `send_started` und ohne Ergebnis ist offen.

Jede externe Mail-Aktion (Versand, Gmail-Terminierung, Umterminierung, Stornierung) folgt TODO_FOR_AI.md Teil C, „Reihenfolge externer Aktionen (F07)“: unveränderliches Paket → Zustimmung, gebunden an das Manifest → Reservierung und dauerhafte Absicht → ein externer Aufruf → Abgleich → festgehaltener Fakt. **Hartes Tor:** Die Absichtszeile (`quota_reserved` und `send_started`) wird unter der Sperre geschrieben, nach Regel 8 zurückgelesen und muss unmittelbar vor dem einen Aufruf noch die letzte Zeile des aktuellen Abschnitts sein, mit der `send_attempt_id` und der SHA-256 des Manifests der Freigabe. Scheitern Schreiben oder Zurücklesen: kein Aufruf, nichts anderes festgehalten, die Sperre behalten; scheitert nur diese Prüfung der letzten Zeile: kein Aufruf, und die offene Absicht wird abgeglichen (4b). Jede `send_attempt_id` hat einen Ausführenden; ein wiederholter Lauf gleicht den bestehenden Versuch ab. Ein Paket hat einen Transportweg (`agent_local_run`, `gmail_scheduled` oder `manual_by_person`, DATA_CONTRACT.md §12.1).

**Arten des Versands (F01).** `cv_submission`, `thank_you` und `ordinary_reply` (eine Zeitraumfrage eingeschlossen) haben jeweils ihren eigenen Wiederholungsschlüssel, geprüft in der Zeile, die den Versand beginnt: DATA_CONTRACT.md §4. Ein offener oder unsicherer Versuch blockiert eine Wiederholung seines Schlüssels und alle neuen Versände dieser Person.

Der externe Aufruf und der lokale Eintrag können nicht atomar sein: Nach `send_started` weiß niemand, ob der Mail-Dienst aufgerufen wurde. Eine vor `send_started` widerrufene Zustimmung blockiert den Versand; danach wird der Versand abgeglichen, nie als storniert versprochen. Das Fehlen in SENT bei einer unvollständigen Prüfung beweist nichts.

### 6a. Gmail Scheduled über den Browser des Agenten (R03)

**Bedingungen.** Der Modus erlaubt es, und die Person hat sich im Browser selbst im vorgesehenen Gmail-Konto angemeldet; der Agent erhält nie Passwörter, Einmalcodes oder Cookies, und eine Sitzung kann jederzeit ablaufen. Gmail sendet eine terminierte Nachricht auch, wenn der Agent nicht läuft; deshalb werden Zustimmung, Kalender, Paket und Reservierung vor dem Terminieren geprüft; eine Änderung an einem davon braucht eine neue Freigabe und, bei einem bereits terminierten Eintrag, zuerst eine geprüfte Änderung oder Stornierung.

**Grenze des eingebauten Browsers.** In der dokumentierten Version kann er keine Dateien hochladen. Kann diese Installation die freigegebenen Dateien nicht anhängen, hält der Agent vor dem Terminieren an und verwendet den manuellen Weg.

**Schritte und Zustände:** TODO_FOR_AI.md Teil C, „Gmail-Terminversand über den eingebauten Browser (R03)“, und DATA_CONTRACT.md §12.2. Ein unbekanntes Ergebnis ist das Ereignis `send_uncertain` (Transportweg `gmail_scheduled`); `schedule_uncertain` ist nur der Name dieses Zustands. Nie eine zweite Nachricht „zur Sicherheit“.

**Manueller Ersatzweg.** Ohne den Browser oder die Anmeldung, und wenn keine Absicht geschrieben ist, wird nichts terminiert, und die Bewerbung geht an TODO_FOR_AI.md Teil C, „Manueller E-Mail-Ersatzweg (R20)“ (`EMAIL_TO_SEND.txt`): Die Person sendet oder terminiert sie von Hand aus demselben Konto (`manual_by_person`) und meldet sich zurück; der Agent prüft sie in Scheduled oder SENT. Eine Absicht ohne geprüftes Ergebnis wird zuerst abgeglichen. Eine manuelle Terminierung verwendet dieselbe einzelne Reservierung.

### 6b. Replay: Neuaufbau der Ansichten (F04)

Jede abgeleitete Datei (`registry.json`, die Warteschlange, Einträge in `Status.txt`, `quota.json`, `summary.js`, Bereitschafts- und Berichtsdaten) lässt sich aus dem Journal und den unveränderlichen Dateien neu aufbauen; Quellereignisse und Idempotenz: DATA_CONTRACT.md §3d. Replay ändert nie das Journal.

1. Alle Journalabschnitte an einen Arbeitsort kopieren; nichts wird in das Journal der Person geschrieben.
2. Jede Zeile prüfen: Sie lässt sich lesen, `sequence` hat über die Abschnitte hinweg keine Lücken, keine `event_id` oder `action_id` wiederholt sich mit anderem Inhalt (`INTEGRITY_CONFLICT`). Eine beschädigte oder unvollständige Zeile stoppt das Replay (`JOURNAL_DAMAGED`); keine Ansicht wird geschrieben.
3. Die Ereignisse in der Reihenfolge von `sequence` anwenden (DATA_CONTRACT.md §3d): Firmen und Zielfirmen, Wege, Pakete, Pläne und Verschiebungen, Stornierungen, Reservierungen und Kontingent, Einwilligungen, Post und Antworten, Status, Archive.
4. Am Arbeitsort aufbauen: Register, Warteschlange, Einträge in `Status.txt`, `quota.json` (Regel 7) und `summary.js` mit seiner `source_revision`.
5. Eine Datei, deren SHA-256 von dem Ereignis abweicht, das sie nennt, markiert die abhängige Ansicht als `INTEGRITY_CONFLICT`. Replay ändert kein Kontingent und schreibt selbst kein `approval_revoked`; der Agent hält `approval_revoked` in einer neuen Zeile fest, wenn ein freigegebenes Paket betroffen ist.
6. Jede abweichende Ansicht ersetzen (temporäre Datei, Zurücklesen, Ersetzen). Eine Projektion, die sich nicht neu aufbauen lässt, wird als unvollständig gemeldet, nie erraten.
7. Ein zweites Replay aus derselben Revision ändert nichts und fügt keine Journal- oder `Status.txt`-Zeile für eine bereits festgehaltene `event_id` hinzu.

Pläne, Pakete, Kopien im Postausgang und Archive werden nie bearbeitet. Ein herausgegebener Bericht wird nie neu geschrieben: Geänderte Zahlen erhalten eine neue Revision (`report_built`). Eine fehlende Fassung wird als „Fassung fehlt“ gezeigt, nicht aus dem Gedächtnis neu erstellt; eine wiederhergestellte Kopie (Abschnitt 12) kann sie liefern, wenn ihre Prüfsumme passt. `quota.json` entsteht nur aus den Ereignissen; eine beschädigte oder fehlende Datei wird durch das Ergebnis des Replays ersetzt.

## 7. Fähigkeiten der Werkzeuge des Agenten

Nur die in ACCEPTANCE_TESTS.md genannten Plattformen gelten als getestet (Claude Code ist nicht bestätigt). Bei der Einrichtung testet der Agent jede Fähigkeit: Dateisystem, Websuche, Wegesuche, Lesen der Post, Lesen ganzer Threads, Senden von E-Mails, Versandnachweis (SENT), Bilder und Scans, Rendern von DOCX, Rendern von PDF, geplantes Aufwecken und die Schreibersperre (`examples/workspace.example.json`). Er hält verfügbar / nicht verfügbar / unbekannt, die Prüfzeit und in ihrer `note` eine nicht geheime Werkzeugversion, wo das Werkzeug eine meldet, in `workspace.json` fest; eine Zeile in einer Einstellungsdatei ist kein Nachweis. In jedem Chat, der senden darf, ermittelt der Agent das Postfachkonto, vergleicht es mit dem Profil und testet die Mail-Fähigkeiten erneut, wenn ihre Prüfung älter als 7 Tage ist.

| Nicht verfügbar | Arbeit, die weitergehen kann |
|---|---|
| Gmail | Recherche, Profil, lokale Pakete; Post-Statistik als ungeprüft markiert |
| Senden oder Nachweis in SENT | Entwürfe und Lesen; automatische externe Handlungen aus |
| Wege | Die Zielfirma bleibt `route_unverified`; keine Aussage über Fahrtbedingungen |
| Rendern | Entwürfe gespeichert; die Sichtprüfung nicht als angenommen markiert |
| Planung durch den Agenten | Die Person startet einen Chat von Hand; die Warteschlange bleibt in Dateien |

Für die Post muss der Agent das Konto ermitteln, Nachrichten seitenweise auflisten, einen ganzen Thread lesen, einmal senden und einen Versandnachweis finden können; er meldet, was seine Werkzeuge wirklich bieten. Nichts außer dem Agenten setzt das Monatslimit durch; daher ist terminierter automatischer Versand standardmäßig aus und wird nur für ein Profil eingeschaltet, dessen Person dem zugestimmt hat, nachdem die Versandszenarien in der Umgebung dieser Person geprüft wurden.

## 8. Neue Chats und der Tageszyklus

Das Journal hält den Zustand; ein Markdown-Kontrollkästchen beweist nichts. Ein Ordner ohne `workspace.json` ist neu: Die Ersteinrichtung ist TODO_FOR_AI.md Teil A, ihre Position ist `stage` in `workspace.json`. Jeder spätere Chat folgt TODO_FOR_AI.md Teil B und endet mit seinem Sitzungseintrag unter `runs/` (DATA_CONTRACT.md §18). Ein unterbrochener Chat ändert keinen Zustand: Unfertige Vorgänge bleiben im Journal, und der Status wird vor jeder externen Handlung neu gelesen.

Der Postdurchlauf ist die Schleife über das nächste Token aus TODO_FOR_AI.md Teil B, Schritt 5 (DATA_CONTRACT.md §15.3). Seine Position rückt erst vor, nachdem eine ganze verarbeitete Seite gespeichert ist (erneutes Lesen ist sicher: Nachrichten sind über `(account_id, gmail_message_id)` geschlüsselt); ein Werkzeug, das nicht fortsetzen kann, erhält einen begrenzten, überlappenden erneuten Durchlauf, der als unvollständig gemeldet wird. Ein Fehler bei einem Profil markiert kein anderes Profil als geprüft.

### 8a. Versandrhythmus (R02)

Werte des Rhythmus, `max_per_run`, `max_per_day`, `sending_rule_statement`, `inter_message_delay_minutes`, `dst_rule`, Transportwege, verpasste Slots (`slot_missed`) und Prüfung: DATA_CONTRACT.md §13 (Kalender: dort §7; Kontingent: dort §5). Wie gefragt wird: TODO_FOR_AI.md A7, „Regeln zum Rhythmus (R02)“.

### 8b. Monatliche Vorbereitung und Erinnerung (R04)

Monatsplan, Frage und Erinnerung (`schedule.monthly_reminder_local_time`), die Vorbereitungsschritte und der Fall ohne Antwort: DATA_CONTRACT.md §14. Die Vorbereitung verbraucht kein Kontingent; terminierte Nachrichten reservieren es.

### 8c. Tägliche Prüfung um 16:00 (R05)

Registrierung der Aufgabe, Vollständigkeit, seitenweises Lesen, verpasste Läufe und der Monatsbericht am letzten Arbeitstag: DATA_CONTRACT.md §15. Die Schritte jedes Laufs: TODO_FOR_AI.md Teil B, Schritt 6.

## 9. Snapshots, Berichte und Umfang

Ein Bericht wird einmal gezählt, an einer festen Journalposition; DOCX/PDF und die Statistikseite tragen dieselben Zahlen, `source_revision` und denselben Stichtag, und die Marktanalyse ändert keine Postzählung. Eine Profilseite zeigt ihre eigenen Bewerbungen und das gemeinsame Kontingent der Person. Der Agent schreibt nur `summary.js` (DATA_CONTRACT.md §9); die Seite ist eine unveränderte Kopie der Vorlage, die keine Befehle sendet und Gmail nicht abfragt. Indizes, Warteschlangen oder Worker sind nicht nötig.

## 10. Formatänderungen und Grenze der ersten Version

**Versionsbezeichnungen (jede Nummer hat eine Bedeutung; andere Dokumente verweisen auf diese Namen).**
- Die Version der Dokumentation legt [VERSION](../../VERSION) fest.
- `schema_version` eines Statistik-Snapshots (`summary.js`) ist 1.4 (DATA_CONTRACT.md §9.1).
- `schema_version` der Einstellungen (`profile.json`) ist 1.4 und von `workspace.json` 1.3 (`examples/settings.example.json`, `examples/workspace.example.json`); `schema_version` von `quota.json` ist 1.3 (`examples/quota.example.json`).
- `format_version` von `workspace.json` ist 1.4: der Aufbau der Datei des Arbeitsbereichs (DATA_CONTRACT.md §1).
- `schema_version` einer Journalzeile ist 1.2 (der Zeilenaufbau, DATA_CONTRACT.md §3c); `registry.json` verwendet ebenfalls 1.2.

Eine Nummer ändert sich nur mit ihrem eigenen Format; neue Ereignisnamen kommen hinzu, ohne andere zu ändern. Ordner der Nutzer werden nie überschrieben: Eine Migration arbeitet auf einer getrennten Kopie mit Bericht, behält alte Kennungen und Einträge und braucht die Zustimmung der Person (Journal in einer Datei: „Altjournal“ [Legacy journal], DATA_CONTRACT.md §3d). Öffentliche Beispiele sind synthetisch.

Der erste Versuch ist ein manueller Durchgang mit synthetischen Daten: Profil → Zielfirma → Paket → Plan → simulierte Antwort → Bericht und Offline-HTML; Lesen und Senden über Gmail kommen später, und die Tests für unterbrochene Arbeit und zwei parallele Chats kommen vor jedem terminierten Versand. Die Abnahme braucht festgehaltene Nachweise (ACCEPTANCE_TESTS.md).

## 11. Vier Sprachen, ein Projekt

Englisch ist maßgeblich; Russisch, Deutsch und Ukrainisch liegen in `docs/ru`, `docs/de` und `docs/uk`, mit einem Datenvertrag, denselben Ereignisnamen und demselben Verhalten; eine Regeländerung aktualisiert alle vier. Die Statistikoberfläche unterstützt `en`, `ru` und `de`; ein Umschalten ändert nur Beschriftungen, nicht Einträge oder die getrennt gewählten Sprachen für Lebenslauf, Anschreiben, E-Mail und Bericht.

## 12. Lokale Archive und Wiederherstellung (R01)

Lokale Archive sind Ordner unter `persons/<person_id>/archives/`, geschrieben nach jedem abgeschlossenen Vorgang, sobald sein Fakt im Journal steht und die Ansichten eine gemeinsame `source_revision` haben. Sie sind Sicherungen, nie Gmail-Archiv, und ändern nie die Post. Zeitpunkt, Aufbau, Manifest, Schreibschritte (`backup_created`, `backup_failed`), Aufbewahrung, Integritätsfehler (`ARCHIVE_INTEGRITY_FAILED`), Wiederherstellung in eine getrennte Kopie und Wiederherstellung aus Gmail nach Verlust aller Archive (`RECOVERY_MODE`): DATA_CONTRACT.md §11.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com · [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
