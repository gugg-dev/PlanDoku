# PlanDoku – Fotodokumentation auf Plänen (Studio F)

Web-App (PWA) für iPad, iPhone und Windows-PC. Kein Build nötig – die Dateien so wie sie sind veröffentlichen.

## Inhalt
- `index.html` – die App
- `sw.js`, `manifest.json`, `icon-*.png` – Offline-Betrieb und Home-Bildschirm
- `lib/` – pdf.js, jsPDF, JSZip, MSAL (Microsoft-Login) (lokal, damit die App auch auf der Baustelle ohne Netz läuft)

## Veröffentlichen auf GitHub Pages (wie die Gutachten-App)
1. Auf github.com ein neues Repository anlegen, z. B. `gugg-dev/PlanDoku`.
2. ZIP **entpacken**, dann „Add file → Upload files“ → den Inhalt des entpackten Ordners (inkl. Ordner `lib`) per Drag & Drop hochladen. `index.html` muss in der obersten Ebene liegen.
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

## Neu in Version 1.2
- **Scharfes Zoomen:** Bei PDF-Plänen wird das Original-PDF mitgespeichert; beim Hineinzoomen wird der sichtbare Ausschnitt gestochen scharf nachgezeichnet (bis 12-fach).
  Bereits importierte Pläne: Plan → „⋯“ → „Original-PDF verknüpfen“ (Fotopunkte bleiben erhalten).
- **Skizzen mit Apple Pencil (nur bei Bedarf):**
  - Fotopunkt → „✏︎ Skizze“: freie Skizze auf Karopapier, erscheint wie ein Foto (Nr. 12.3 usw.) inkl. Anmerkung und im Bericht.
  - Foto öffnen → „✏︎ Auf Foto zeichnen“: Markierungen direkt auf dem Foto; das Original bleibt unverändert, jederzeit wieder bearbeitbar.
  - Sobald der Stift erkannt wird, zeichnet nur noch der Stift (Handballen wird ignoriert). „✋ Finger“ schaltet Fingerzeichnen wieder ein.
  - Farben, 3 Strichstärken (druckempfindlich), Radierer, Zurück, Leeren, Raster ein/aus.

## Synchronisierung iPhone / iPad / PC über OneDrive (ab Version 1.1)
Daten werden in deinem OneDrive (Studio F, Microsoft 365) unter `Apps/PlanDoku` abgelegt und automatisch abgeglichen:
beim Öffnen der App, ca. 4 Sekunden nach jeder Änderung, jede Minute und sobald wieder Netz da ist. Offline wird normal weitergearbeitet, der Abgleich wird nachgeholt.
Bearbeiten beide Geräte gleichzeitig, wird zusammengeführt – je Eintrag gewinnt der neuere Stand. Löschungen werden übertragen.
Status: ☁︎ oben rechts (✓ aktuell, ⟳ läuft, ⚠︎ Fehler, „Anmelden“ = Login nötig).

### Einmalige Einrichtung (ca. 10 Minuten, kostenlos)
1. https://entra.microsoft.com mit dem Studio-F-Administratorkonto öffnen → Identität → Anwendungen → **App-Registrierungen** → **Neue Registrierung**.
2. Name: `PlanDoku` · Unterstützte Kontotypen: **Nur Konten in diesem Organisationsverzeichnis**.
3. Umleitungs-URI: Plattform **Single-Page-Anwendung (SPA)**, URI = Adresse der App mit Schrägstrich am Ende, z. B. `https://gugg-dev.github.io/PlanDoku/`
   (die exakte URI zeigt die App unter Einstellungen → Synchronisierung an).
4. Registrieren. Auf der Übersichtsseite **Anwendungs-ID (Client-ID)** und **Verzeichnis-ID (Mandanten-ID)** kopieren.
5. Links **API-Berechtigungen** → Berechtigung hinzufügen → Microsoft Graph → Delegierte Berechtigungen → `Files.ReadWrite` (User.Read ist schon da) → hinzufügen → **Administratorzustimmung für Studio F erteilen**.
6. In der App: ⚙︎ Einstellungen → beide IDs eintragen → **Bei Microsoft anmelden**. Auf jedem Gerät einmal.
   Alternativ die beiden IDs oben in `index.html` bei `DEFAULT_CLIENT_ID` / `DEFAULT_TENANT_ID` eintragen – dann entfällt das Eintippen auf den Geräten.

Hinweis: Wer schon Daten auf beiden Geräten hat, braucht nichts zu tun – nach der Anmeldung werden die Stände zusammengeführt.

## Austausch per Projekt-ZIP (zusätzlich, z. B. für Kollegen oder Sicherung)
Tab „Projekt“ → „Projekt exportieren“ → in OneDrive/Google Drive sichern → am anderen Gerät „Projektstand importieren“.
Beim Import wird zusammengeführt: pro Eintrag gewinnt der neuere Stand, Löschungen werden übernommen. Der Export dient zugleich als Sicherung.

## Update der App
Neue `index.html` hochladen und in `sw.js` die Versionsnummer (`VERSION`) erhöhen. Die Geräte laden die neue Version beim nächsten Öffnen mit Netz.
