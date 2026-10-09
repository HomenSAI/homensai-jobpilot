Deutsche Fassung. Maßgeblich ist die englische Fassung (Datei im Hauptverzeichnis).

# HomenS.AI JobPilot — Prüfung und Status

[English](../../REVIEW.md) | [Русский](../ru/REVIEW.md) | [Deutsch](REVIEW.md)

9. Oktober 2026 · Version 1.6.0 (die Datei `VERSION`) · Autor der Idee und Entwickler: Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · CC BY-NC 4.0

## Stand des Projekts

**In dieser Freigabe:** zweisprachige Betriebsverfahren; aktualisierte README, Autorenbeschreibung und getrennte Lizenzhinweise für Code und Dokumentation; erweiterte Verträge für Journal und Terminplan; sowie Korrekturen bei der Prüfung des Statistik-Schnappschusses, bei historischen Zählern, bei der leeren Monatsauswahl, bei der Anzeige des gemeinsamen Kontingents und bei der Reihenfolge der Ergebnisse.

**Im aktuellen Arbeitsstand geprüft:** 18 gezielte VM-Prüfungen der Statistikseite bestanden, darunter fehlerhafte Schnappschüsse, doppelte Antwort-IDs, späte Antworten, Auswahl eines leeren Monats, fehlende Summen des gemeinsamen Kontingents und die Sortierung technischer Fehler. Das ist kein vollständiger Browsertest und kein Agenten- oder Gmail-Abnahmezyklus. Diese Prüfungen gehören zum Arbeitsstand 1.5.1; sie wurden für 1.6.0 nicht wiederholt.

**Entwicklungsumgebung:** Das Projekt wurde entwickelt, lokal geprüft und virtuell in der Umgebung **Codex** überprüft. **Anthropic / Claude Code wurde in diesem Zyklus nicht getestet**; seine Kompatibilität ist nicht bestätigt. Die Codex-Prüfungen sind keine vollständige Zertifizierung des Projekts, und die unabhängige vollständige Abnahme des Quell-Agenten bleibt unvollständig.

**Noch nicht erledigt:** vollständige manuelle Abnahme des Agenten-Ablaufs; echte Einrichtung mit Codex oder Claude Code; echter geplanter Gmail-Versand und Verarbeitung von Antworten; DOCX-Rendering über Word/LibreOffice; das automatische Freigabe- bzw. Datenschutz-Gate auf GitHub. Gmail, Arbeitgeber und externe KI-Schnittstellen wurden nicht angebunden.

Das Workflow verzichtet bewusst auf eine eigenständige Anwendung zur Stellensuche oder zum Versand von E-Mails. Die Statistikansicht enthält HTML/CSS/JavaScript zum Prüfen, Sortieren, Filtern und Anzeigen des vom Agenten geschriebenen Schnappschusses. Die Schutzmaßnahmen für Zustimmung, Kontingent und externe Post bleiben Verfahren und keine technischen Sperren. Die Versionen 1.2 bis 1.4 haben die zweisprachige Architektur, das personenbezogene Journal und das Agenten-Playbook festgelegt; Version 1.5 erweitert den Monatsablauf, die Abstimmung mit Gmail, lokale Archive, Berichte, Dateien zur Namensnennung und die Prüfung der Statistik-Schnappschüsse.

Die Prüfung umfasste AI_BUILD_SPEC.md, die HTML-Übersicht und das Benutzerhandbuch. Persönliche Archive, Gmail und bestehende Bewerbungen wurden nicht berührt. Code aus den geprüften GitHub-Alternativen wurde nicht verwendet. Die Prüfung betrifft die Konsistenz des Projekts; sie ist keine Prüfung externer Dienste oder des Arbeitsmarktes.

## Befunde und Korrekturen

| Lücke | Korrektur |
|---|---|
| Kein Einstiegs-README; der Start verlangte Dateien, die es nicht gab | README listet die tatsächlich vorhandenen Dateien auf und trennt den Dokumentationsstand von einer künftigen Freigabe |
| Das Datenbankformat war offen | JSON/JSONL ohne SQL; DATA_CONTRACT definiert Kennungen, Pfade, maßgebliche Datensätze und Projektionen |
| Die Spezifikation teilte Berichte und Logs, während die HTML-Seite sie in Profilen führte | Berichte und Logs gehören zu einem Profil; das Kontingent gehört zur Person |
| „Atomares Kontingent“ hat keine unabhängige Ausführungsschicht | Das Projekt beschreibt einen Einzel-Schreiber-Marker, Reservierung, Aktions-IDs und Wiederherstellung; diese bleiben verfahrensmäßige Schutzmaßnahmen und keine technischen Sperren |
| Ein unsicherer Versand könnte ein Duplikat auslösen | `send_uncertain` behält die Reservierung und verlangt eine Abstimmung mit Nachweisen statt eines blinden Wiederholungsversuchs |
| Antwort, Zustellung und Dank könnten zu einem Status verschmelzen | Einreichung, Zustellung, Ergebnis und Folgeaktionen haben getrennte Zustände |
| „Antworten“ könnten Nachrichten oder Bewerbungen meinen | Getrennte Zähler für Antwortereignisse und für Bewerbungen mit Antwort, einschließlich später Antworten |
| Ein am letzten Arbeitstag erstellter Bericht könnte spätere Antworten verpassen | Manifeste, Fassungen und Zuordnung nach dem Monat des tatsächlichen Eingangs |
| Die Marktanalyse war optional geworden | Die gesonderte Marktseite ist wieder verpflichtend; nicht verfügbare Quellen ergeben „estimate unavailable“ (Schätzung nicht verfügbar) |
| „Lokal“ könnte mit „keine Übertragung in die Cloud“ verwechselt werden | Die Zustimmung erfolgt, bevor ein Cloud-Agent Originale liest; das Exportieren des Fragebogens ist eine ausdrückliche Handlung |
| Eine statische Datei schien einen späteren fehlgeschlagenen Lauf erkennen zu können | Kennungen der Schnappschüsse, Aktualisierungszeiten und was eine veraltete Seite tatsächlich zeigen kann, sind angegeben |
| Öffentliche Dokumente enthielten private Beispiele früherer Berechtigungen | Ersetzt durch eine allgemeine Importregel, die Berechtigungen nie automatisch aktiviert |
| Die HTML-Seiten zeigten unterschiedliche Versionen; Dateinamen-Platzhalter wurden als Tags gelesen | Versionen synchronisiert, Platzhalter maskiert, Navigation ergänzt |
| Die Übersicht war eine sehr lange Seite | In kurze Seiten mit Menü aufgeteilt; die Statistikseite wurde ergänzt |
| Die Reihenfolge der Installation (Agent oder Archiv zuerst) war unklar | Die Anleitung erklärt die Reihenfolge: Agent, dann Archiv, dann Verbindung; jeder Schritt sagt, was auf dem Bildschirm erscheinen sollte |
| Bereitschaft war nur als allgemeine Absicht formuliert | Konkrete Abnahmeszenarien mit Eingaben und erwarteten Ergebnissen |

## Feste Entscheidungen

Der Produktname ist **HomenS.AI JobPilot**, das Repository heißt `homensai-jobpilot` ([HomenSAI/homensai-jobpilot](https://github.com/HomenSAI/homensai-jobpilot)). Urheberschaft und visuelle Identität (dieselbe wie auf homensai.com und in HomenS.AI Core) bleiben erhalten. Der Agent und der Ordner sind erforderlich; Docker wird nicht verwendet; die HTML-Seite zeigt nur an; das Limit lautet 44 Bewerbungen pro Person und Monat. Nahe Ziele kommen zuerst, Lebensläufe und Anschreiben sind personalisiert, Sprachen sind unabhängig, Berichte sind neutral, Aktionen mit Post brauchen eine eigene Zustimmung, und Code aus geprüften Alternativen wird nicht wiederverwendet.

## Status der Fähigkeiten (R09)

Jede Fähigkeit trägt eine von drei Kennzeichnungen: **verified in tests** [in Tests geprüft] (es gibt einen aufgezeichneten Test, und sein Umfang ist angegeben), **described, not tested in practice** [beschrieben, in der Praxis nicht getestet] (in den Anweisungen beschrieben, kein aufgezeichneter Lauf) oder **not available** [nicht verfügbar] (die Plattform oder das Paket bietet sie nicht). Keine Fähigkeit wird als in der Praxis geprüft markiert, solange kein aufgezeichneter Lauf vorliegt.

| Fähigkeit | Kennzeichnung | Hinweis |
|---|---|---|
| Statistikseite: Prüfung, Sortierung und Filterung eines Beispiel-Schnappschusses | verified in tests | 18 Prüfungen in einer isolierten JavaScript-VM mit synthetischen Daten (Arbeitsstand 1.5.1); kein Browsertest |
| Statistikseite in einem echten Browser (Layout, Tastatur, mobile Breite, Druck, offline) | described, not tested in practice | |
| Erste Einrichtung des Agenten, Interview, Wissensbasis und Sucheinstellungen | described, not tested in practice | Kein Agentenlauf aufgezeichnet |
| Monatliches Limit von 44 Lebensläufen und Zustimmung zum Versand | described, not tested in practice | Nur verfahrensmäßig; es gibt keine technische Sperre |
| Gmail-Lesen und Klassifizierung ganzer Verläufe | described, not tested in practice | Kein Gmail-Konto verbunden |
| Gmail-Terminversand und Prüfung in Scheduled | described, not tested in practice | Nicht geprüft; das Paket behauptet nicht, dass der Terminversand funktioniert |
| Gmail-Versand beliebiger Nachrichten auf beliebigem Weg | described, not tested in practice | Versand über Gmail ist nicht geprüft |
| Datei-Upload durch den integrierten Browser | not available | Die offizielle Browser-Dokumentation (geprüft am 8. Oktober 2026) besagt, dass der Agent dort Datei-Uploads nicht automatisieren kann |
| DOCX-/PDF-Erstellung und visuelles Rendering | described, not tested in practice | Kein Rendering in Word oder LibreOffice ausgeführt; kein DOCX wurde visuell geprüft |
| Tägliche Prüfung um 16:00 Uhr als registrierte wiederkehrende Aufgabe | described, not tested in practice | Hängt vom Terminplaner der Plattform ab; die Registrierung muss bei der Installation geprüft werden |
| Täglicher Bericht per Gmail an den Nutzer (R08) | described, not tested in practice | Braucht Zustimmung und Probetests vor der Nutzung |
| Bereitschaftsseite (statische, vom Agenten gefüllte Vorlage) | described, not tested in practice | Kein Browser- oder Datentest aufgezeichnet |
| Lokale Archive und Wiederherstellung (R01) | described, not tested in practice | |
| Dokumentenprüfung im Agenten-Chat (zweiter Weg, ein Dokument hinzuzufügen) | described, not tested in practice | |
| Freigabe-Datenschutzgate (automatische Allowlist) | not available | Nur die manuelle `RELEASE_CHECKLIST.md` ist vorhanden |
| Anthropic / Claude Code | described, not tested in practice | Kompatibilität nicht bestätigt |

## Noch nicht geprüfte oder nicht umgesetzte Arbeiten

- Die Anweisungen des Ablaufs wurden noch nicht vollständig mit einem echten Codex- oder Claude-Code-Nutzer abgenommen. Das Paket bleibt experimentell; Szenarien müssen noch im Chat mit synthetischen Daten durchlaufen werden.
- Die Fähigkeiten des Gmail-Connectors und des integrierten Browsers müssen am installierten Konto des Nutzers gesondert geprüft werden, einschließlich des Lesens ganzer Verläufe, Gmail Scheduled, Anhängen, SENT-Nachweis und Wiederherstellung nach unterbrochener Sitzung. Für diese Prüfung wurde kein echtes Gmail-Konto verbunden.
- DOCX-/PDF-Erstellung und seitenweises Rendering in Word oder LibreOffice wurden vom Agenten noch nicht durchgehend ausgeführt.
- Eine vollständige Schritt-für-Schritt-Einrichtung für Claude Code ist nicht geschrieben; die ausführliche Installationsanleitung gilt für Codex unter Windows.
- Der automatische GitHub-Freigabe-Workflow und jedes Datenschutzgate mit Ausfallsicherung brauchen weiterhin eine berechtigte Prüfung nach der Veröffentlichung. Die manuelle Freigabe-Checkliste liegt vor; sie ist keine technische Durchsetzung.
- Das gemeinsame Kontingent von 44 Bewerbungen pro Person und Monat, Freigaben, Gmail-Vorgänge, Terminplanung, Archive und Berichtszustellung sind Verfahren, keine harten Sperren oder garantierten Hintergrunddienste.
- Der tägliche Bericht per Gmail (R08), die Angaben zu Preisen und Tarifen (geprüft am 8. Oktober 2026 auf der offiziellen Preisseite; im Durchgang 1.6.0 nicht erneut geprüft, weil die offiziellen Seiten aus der Arbeitsumgebung nicht erreichbar waren) und die zweiseitige Dokumentenprüfung (R19) brauchen einen aufgezeichneten Lauf, bevor sie als geprüft gelten können.
- Die deutsche Fassung des Abschnitts zur Idee und der Beispiele folgt in einer späteren Phase. [Anmerkung: Diese Fassung liegt inzwischen vor; der Satz stammt aus der englischen Fassung.]

Die Dateien `.gitignore`, die Beispiel-Einstellungen und die Statistikvorlage können lokal angesehen werden, belegen aber nicht, dass der Agenten-Ablauf funktioniert. Agentenszenarien gelten nicht als PASS ohne ein aufgezeichnetes manuelles Prüfergebnis und einen Nachweis.

## Änderungen im Dokumentationsdurchgang 1.6.0

- Betriebsanforderungen: Formulierung der Einrichtung für den kostenpflichtigen Tarif und der Hinweis zu den Bedingungen (R10); zwei Wege, ein Dokument hinzuzufügen, und der Bestätigungsschritt (R19); täglicher Bericht per Gmail mit Zustimmung und Regeln für Duplikate (R08); Upload-Grenze des integrierten Browsers; Block zur Prüfung vor dem Versand (R18).
- Benutzerhandbuch: Menü „Wissen Sie nicht, wo Sie anfangen sollen?“ mit einfachen Schritten (R15); der Schritt zum kostenpflichtigen Tarif und den Bedingungen (R10); das Beispiel für den E-Mail-Text im Gmail-Fenster mit dem Hinweis, dass es ein Beispiel ist (R14); Hilfeblock und Prüfblock (R18); zwei Wege, ein Dokument hinzuzufügen (R19); die Kennzeichnungen der Fähigkeiten (R09).
- Abschnitt zur Idee (R11) im README in beiden Fassungen.
- Freigabe-Checkliste: Allowlist, Prüfung von Archiv und Index, Inhaltsprüfungen und Protokoll der Prüfung (F10).
- In diesem Durchgang wurde nichts ausgeführt: keine Prüfung von Agent, Gmail, Browser, Terminplaner oder Rendering und keine Statistikprüfung wurde wiederholt.

## Durchgeführte Prüfungen

Am 9. Oktober 2026: Der lokale VM-Regressionssatz der Statistikseite hat 18/18 gezielte Prüfungen bestanden; `node --check` war für `summary.js` erfolgreich; die drei JSON-Beispiele und jede JSONL-Beispielzeile wurden eingelesen; lokale Links und Dateien in 16 HTML-Dateien sowie lokale Links in 23 Markdown-Dateien wurden ohne Fehler geprüft (die absichtlichen `{{...}}`-Linkplatzhalter der Bereitschaftsvorlage waren ausgenommen). Das ist keine vollständige Abnahme im Browser, durch den KI-Agenten, über Gmail, beim geplanten Versand oder beim Rendering von Dokumenten. Es wurde kein externes Konto und keine externe Schnittstelle angebunden.

---

© 2026 Serhii Khomenko / HomenS.AI · [homensai.com](https://homensai.com/) · [GitHub](https://github.com/HomenSAI) · [LinkedIn](https://www.linkedin.com/in/serhii-khomenko-homensai/) · [ORCID](https://orcid.org/0009-0009-5371-9717) · [DOI](https://doi.org/10.5281/zenodo.23160031) · info@homensai.com
