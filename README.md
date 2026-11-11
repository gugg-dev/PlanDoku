# PlanDoku – Fotodokumentation auf Plänen (Studio F)

Web-App (PWA) für iPad, iPhone und Windows-PC. Kein Build nötig – die Dateien so wie sie sind veröffentlichen.

## Inhalt
- `index.html` – die App
- `sw.js`, `manifest.json`, `icon-*.png` – Offline-Betrieb und Home-Bildschirm
- `lib/` – pdf.js, jsPDF, JSZip (lokal, damit die App auch auf der Baustelle ohne Netz läuft)

## Veröffentlichen auf GitHub Pages (wie die Gutachten-App)
1. Auf github.com ein neues Repository anlegen, z. B. `gugg-dev/PlanDoku`.
2. „Add file → Upload files“ → den gesamten Inhalt dieses Ordners hochladen (inkl. Ordner `lib`).
3. Settings → Pages → Branch `main`, Ordner `/ (root)` → Save.
4. Nach ca. 1 Minute erreichbar unter `https://gugg-dev.github.io/PlanDoku/`.

## Installation auf iPad / iPhone
Adresse in **Safari** öffnen → Teilen-Symbol → **„Zum Home-Bildschirm“**.
Wichtig: Nur als installierte App bleiben die Daten dauerhaft gespeichert (Safari löscht sonst Website-Daten nach längerer Nichtnutzung).

## Ablauf
1. Projekt anlegen → Pläne als PDF oder Bild hinzufügen (mehrseitige PDFs → je Seite ein Plan).
2. Plan öffnen → „Fotopunkt setzen“ → auf die Aufnahmeposition tippen → Raum, Blickrichtung, Fotos (Kamera oder Mediathek).
3. Je Foto: Aufnahmedatum (aus EXIF übernommen, änderbar), Kategorie, Anmerkung, Aufgenommen von.
4. Mehrere Fotos am selben Punkt (z. B. Bestand → Rohbau → Ausbau) werden als 12.1, 12.2 … nummeriert.
5. Bericht: Tab „Bericht“ → nach Zeitraum, Plan, Raum, Kategorie, Stichwort filtern – oder in der Fotoliste einzelne Fotos markieren → PDF (Deckblatt, Übersichtsplan je Plan, je Foto Planausschnitt mit Punkt und Blickrichtung).

## Austausch im Büro (3 Personen)
Daten liegen lokal am Gerät. Austausch über Projekt-ZIP:
Tab „Projekt“ → „Projekt exportieren“ → in OneDrive/Google Drive sichern → am anderen Gerät „Projektstand importieren“.
Beim Import wird zusammengeführt: pro Eintrag gewinnt der neuere Stand, Löschungen werden übernommen. Der Export dient zugleich als Sicherung.

## Update der App
Neue `index.html` hochladen und in `sw.js` die Versionsnummer (`VERSION`) erhöhen. Die Geräte laden die neue Version beim nächsten Öffnen mit Netz.
