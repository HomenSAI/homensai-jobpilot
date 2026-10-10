Deutsche Fassung. Maßgeblich ist die englische Fassung (Datei im Hauptverzeichnis).

# Freigabe-Checkliste

[English](../../RELEASE_CHECKLIST.md) | [Русский](../ru/RELEASE_CHECKLIST.md) | [Deutsch](RELEASE_CHECKLIST.md)

Autor und Entwickler: Serhii Khomenko / HomenS.AI  
Gilt für: Quell- und Dokumentationsfreigaben von HomenS.AI JobPilot.

Dies ist eine manuelle Kontrolle vor der Freigabe (F10). Der Freigabe-Workflow (`.github/workflows/release.yml`) läuft, wenn `CHANGELOG.md` oder `VERSION` auf `main` geändert werden. Er liest die Version aus dem neuesten Abschnitt von `CHANGELOG.md`, committet `VERSION` zurück nach `main` und erstellt das GitHub-Release. Er prüft weder die öffentliche Dateiliste noch persönliche Daten oder Geheimnisse. Der Maintainer führt diese Checkliste **vor** der Änderung auf `main` durch, weil der Workflow automatisch veröffentlicht.

Führen Sie diese Prüfungen mit synthetischen Testdaten und an einem Kandidaten-Release-Archiv durch. Führen Sie kein echtes Release aus, nur um die Prüfungen zu testen.

## 1. Allowlist der öffentlichen Dateien (im Zweifel gesperrt)

Das öffentliche Release darf nur die unten genannten Dateien enthalten. Jede andere Datei stoppt das Release, bis sie entfernt oder die Liste in einem geprüften Commit geändert wurde.

- Dokumente im Hauptverzeichnis: `README.md`, `USER_GUIDE.md`, `OPERATING_REQUIREMENTS.md`, `AGENTS.md`, `CLAUDE.md`, `TODO_FOR_AI.md`, `AI_BUILD_SPEC.md`, `ARCHITECTURE.md`, `DATA_CONTRACT.md`, `ACCEPTANCE_TESTS.md`, `REVIEW.md`, `RELEASE_CHECKLIST.md`, `CHANGELOG.md`, `VERSION`, `LICENSE`, `LICENSE-DOCS`, `NOTICE`, `PROJECT_OVERVIEW.html`, `overview_*.html`, `.gitignore`.
- Ordner: `docs/` (russische und deutsche Fassung und ihre Dateien), `dashboard_template/` (saubere Vorlagen und die Beispieldatei `summary.js`), `examples/` (nur neutrale Beispiele), `assets/` (gemeinsame Stile, Skripte und IBM-Plex-Schriften), `.github/workflows/`.
- Unter `Локальные_данные/`: nur die leeren Eingangsordner und ihre `README.md`-Dateien sowie `Вопросы_для_рассказа.md`, soweit `.gitignore` es zulässt. Keine andere Datei und kein Datenunterordner.

## 2. Prüfung von Archiv und Git-Index

- Erstellen Sie das Kandidaten-Archiv in einem neuen, leeren Ordner. Listen Sie seine Dateien auf und vergleichen Sie sie mit Abschnitt 1. Führen Sie keine Skripte aus dem entpackten Archiv aus und entpacken Sie es nicht in den Arbeitsordner.
- Prüfen Sie den Git-Index des Release-Commits gegen dieselbe Liste. `.gitignore` nimmt bereits in Git enthaltene Dateien nicht aus der Verfolgung heraus.
- Keine verschachtelten Archive (`.zip`, `.tar`, `.7z`, `.rar`), keine Sicherungen, Sperrdateien, Logs oder Journale.
- Keine Datei- oder Ordnernamen, die persönliche Daten, Namen von Bewerbungen oder Firmen, Bewerbungsdaten, Kennungen von Personen oder Profilen oder Namen von Arbeitsdaten tragen: `persons/`, `profiles/`, `journal/`, `runs/`, `outbox/`, `Applications/`, `dashboard/` (erzeugte Seiten), `writer.lock`, `workspace.json`, `transactions-*.jsonl` sowie jede Datei in `Resume/` oder `CoverLetter/` außer `README.md`.
- Keine Datei mit Lebenslauf, Zeugnis, Diplom, Referenz, Scan, Foto, PDF, DOCX oder persönlicher JSON-Datei. Die einzigen erlaubten Binärdateien sind die eigenen Bilder des Projekts und die IBM-Plex-Schriften in `assets/`.

## 3. Inhaltsprüfungen

Führen Sie die Prüfungen von Hand durch. Ein automatischer Scanner kann helfen, ist aber nur eine Prüfung unter mehreren.

- **Persönliche Daten.** Keine echten Personennamen außer der öffentlichen Autorenangabe, keine persönliche E-Mail-Adresse, keine Telefonnummer, keine Wohnadresse, kein Geburtsdatum, keine Ausweis- oder Kontonummer. Die einzigen erlaubten Adressen sind die öffentliche Kontaktadresse des Autors und offensichtliche Platzhalter wie `first.last.job@gmail.com`, das ein Muster und keine echte Adresse ist. Verwenden Sie keine echte Adresse einer Person als Beispiel.
- **Echt wirkende Daten.** Keine realistischen Lebensläufe, Diplome, Zeugnisse, Referenzen, Anschreiben, Stellenangebotsdatensätze, Firmenkontakte oder Auszüge aus E-Mails. Beispiele müssen offensichtlich synthetisch sein, eckige Platzhalter oder klar erfundene Namen verwenden und dürfen nicht als Kontakt eines echten Arbeitgebers auftreten.
- **Geheimnisse.** Keine Tokens, Passwörter, Einmalcodes, OAuth- oder Sitzungswerte, Cookies, API-Schlüssel oder privaten Schlüssel. Suchen Sie nach gängigen Mustern (zum Beispiel `BEGIN PRIVATE KEY`, `ghp_`, `AKIA`, `ya29.`, `sk-`, `Bearer `, `password`, `token`, `cookie`) und prüfen Sie jeden Treffer von Hand.
- **Private Materialien.** Keine private Prüfvorlage, kein echter E-Mail-Text, kein echter Stellenangebotstext, keine Statistik einer echten Person, kein Screenshot mit persönlichen Daten und keine Kopie des Arbeitsordners.
- Halten Sie fest, welche Suchen durchgeführt und was von Hand geprüft wurde. Ein sauberes Suchergebnis ist kein Beweis, dass keine persönlichen Daten vorhanden sind.

## 4. Lizenzen und Namensnennung

- Prüfen Sie `LICENSE` (Hinweise zu PolyForm Noncommercial 1.0.0), `LICENSE-DOCS` (Link zu CC BY-NC 4.0) und `NOTICE` (Hinweise des Autors und Hinweise zu IBM Plex SIL OFL 1.1).
- Neue vom Projekt verfasste Anweisungen und Oberflächentexte behalten die Namensnennung für Serhii Khomenko / HomenS.AI.
- Die englische Primärfassung sowie die russische und die deutsche Fassung beschreiben dieselben Regeln. Eine Abweichung wird in allen Fassungen korrigiert.

## 5. Aussagen und Status

- README, USER_GUIDE und REVIEW kennzeichnen jede Fähigkeit mit **verified in tests**, **described, not tested in practice** oder **not available** (R09). Schreiben Sie nicht, dass Gmail-Versand, Gmail-Terminversand, DOCX-Rendering oder ein vollständiger Agenten-Zyklus geprüft sei, solange kein aufgezeichneter Lauf dies belegt.
- Codex ist die einzige Umgebung, in der das Projekt geprüft wurde. Die Kompatibilität mit Anthropic / Claude Code ist **nicht bestätigt**.
- Preise und Tarifnamen tragen ein Prüfdatum und eine offizielle Quelle. Geben Sie einen Preis nicht als aktuell an, ohne ihn neu geprüft zu haben.

## 6. Version und Changelog

- `CHANGELOG.md` hat einen neuen obersten Abschnitt mit Version und Datum. Nach dem Lauf des Workflows entspricht `VERSION` dieser Version.
- Jede Änderung an `CHANGELOG.md` oder `VERSION` auf `main` startet den Release-Workflow. Schieben Sie eine solche Änderung erst, wenn die Abschnitte 1 bis 5 vollständig sind.

## 7. Links und Darstellung

- Prüfen Sie lokale Links und öffnen Sie die geänderten HTML-Seiten im Browser (Statistikseite, Bereitschaftsvorlage, Übersichtsseiten).
- Für Word- oder PDF-Ausgaben rendern Sie jede DOCX-Datei in Word oder LibreOffice, prüfen Sie jede Seite und exportieren Sie die PDF-Datei aus der geprüften DOCX-Datei. Behaupten Sie keine visuelle Prüfung, die nicht durchgeführt wurde.

## 8. Protokoll dieser Prüfung

Halten Sie Datum, Repository, Branch, Commit, SHA-256-Wert des Archivs, Prüfer und das Ergebnis jedes Abschnitts als PASS, FAIL, PARTIAL oder NOT RUN mit Nachweis fest. Das Protokoll enthält keine persönlichen Daten und wird außerhalb des Release-Archivs aufbewahrt.

## Freigabestatus für 1.5.1 (historisch)

- Regressionsprüfungen der Statistikseite: 18/18 bestanden in einer isolierten JavaScript-VM mit synthetischen Daten.
- Vollständige visuelle Browserprüfung: nicht durchgeführt.
- Vollständige Abnahme des Codex-Agenten, Gmail-Connector/Browser, echte Prüfung von Scheduled und der DOCX-/LibreOffice-Berichtsablauf: nicht durchgeführt.
- Der Release-Workflow hat keine automatische Allowlist für den Datenschutz mit Ausfallsicherung (fail closed); diese Checkliste ist manuell und muss vom Maintainer durchgeführt werden.

## Status des aktuellen Pakets

- Dokumentationsänderungen wurden vorbereitet. Die Abschnitte 1 bis 8 wurden an keinem Kandidaten-Release-Archiv durchgeführt.
- Automatische Allowlist mit Ausfallsicherung und Datenschutzscan: NOT RUN. Ein solches Gate ist nicht Teil dieses Pakets, und es wird kein Skript hinzugefügt.
- Prüfungen der Statistik-VM: für 1.6.0 in diesem Durchgang nicht wiederholt.
- Vollständige Prüfungen von Browser, Agent, Gmail, Gmail Scheduled und DOCX/LibreOffice: NOT RUN.

Ein Release darf nicht als vollständig abgenommen beschrieben werden, solange eine erforderliche Prüfung NOT RUN ist.

## Version auf main

`CHANGELOG.md` ist die Quelle der Release-Version. Bei jedem Push auf `main` oder manuellen Release-Lauf liest GitHub Actions die neueste Überschrift `MAJOR.MINOR.PATCH` und schreibt bei Bedarf `VERSION` automatisch. Wiederholungen erhalten bestehende Releases/Tags. Ungültige, doppelte, falsch geordnete oder herabstufende Versionen stoppen die Veröffentlichung. Ein normaler Git-Push überschreibt kein neueres main; bei zwischenzeitlicher Änderung den Workflow erneut ausführen. Aktuelle Dokumentlabels verlinken `VERSION`, statt eigene Zahlen zu führen. Eine SHA bezeichnet einen Commit; `VERSION` bezeichnet den Paketrelease, nicht jeden Commit. GitHub Actions dient nur der Veröffentlichung und ergänzt keinen Maildienst auf dem Rechner der Person.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com · [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
