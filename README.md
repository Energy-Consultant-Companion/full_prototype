# ENSERA — interaktiver Prototyp

Klickbarer Frontend-Prototyp für ENSERA, gebaut aus dem Paper-Entwurf
*„Full Software · Ensera“*. Alle 41 Artboards sind als echte, bedienbare
Oberfläche umgesetzt — mit Zustand, Übergängen und Tastaturkürzeln, aber ohne
Backend. Nichts wird gespeichert; ein Neuladen setzt die Demo zurück.

## Starten

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # statisches Bundle in dist/
```

## Die Demo-Führung

Rechts liegt ein Panel mit zwölf Kapiteln und 41 Schritten. Es führt durch die
ganze Geschichte — von der Website der Beraterin bis zu den Einstellungen.

| Kürzel | Wirkung |
| --- | --- |
| `⌘→` / `⌘←` | einen Schritt vor oder zurück |
| `⌘D` | Führung aus- und einblenden |
| `⌘K` | globale Suche (mit `TAB` auf einen Fall eingrenzen) |
| `⌘P` | Aktionsmenü |
| `ESC` | Überlagerung schließen |

## Der Ablauf

**Kundschaft.** Website → vierstufige Erstanfrage → Bestätigung. Was hier
ausgewählt wird, taucht gleich im Eingang der Beraterin wieder auf.

**Anfrage annehmen.** Die Beraterin sieht die Anfrage gegen ihre sechs Regeln
geprüft. Mit *Annehmen und Zugang senden* entsteht ein Fall, und die Zugangsmail
ist direkt zu sehen — nachgebaut in macOS Mail.

**Zwei Wege.** Die Mail nennt beide: *Weg A* — auf die Mail antworten, Dateien
anhängen, alle Statusmeldungen kommen weiter per Mail (Bestätigung,
Erinnerung). *Weg B* — derselbe Fall im Klientenportal, mit Hochladen,
Schrittliste, Ablage und Fragen.

**Arbeitsplatz.** Überblick, alle Fälle, Fall anlegen (aus Unterlagen oder aus
einer übernommenen Anfrage).

**Aus dem Überblick heraus** führt *Ansehen* direkt an die Arbeit, nicht auf
eine Zwischenübersicht:

| Aktion | Landet bei |
| --- | --- |
| Erstgespräch terminieren | Kommunikation des Falls, fertige Mail mit drei Terminen — abschicken genügt |
| Vorgeprüfte Unterlagen gegenzeichnen | Gegenprüfen-Ansicht der betreffenden Rechnung |
| Zwei fehlende Unterlagen nachtragen | Fehlend-Ansicht im Fall Yildirim, mit Grund und Frist je Unterlage |
| Neue EBW-Regel anwenden | Regulierungsänderungen mit Fallbezug |
| Bei Familie Bauer nachfassen | Kommunikation des Falls, fertige Erinnerung |
| Frage beantworten | Antwortentwurf zu Brendels Frage, mit Fundstellen |

**Der Fall.** Fallübersicht mit Schrittband und Schnellaktionen, Schritte,
Fristen, Verlauf, Kommunikation je Gegenseite und die Unterlagen: Ordner
schließen und öffnen sich als weiche Layout-Animation, fehlende Unterlagen
haben eine eigene Ansicht mit Erinnern und Nachfragen.

**Prüfen, Förderung, Regulierungen.** Unterlageneingang mit automatischer
Prüfung und Gegenzeichnen, Förderwege durchrechnen und in den Fall übernehmen,
Fragen ans Regelwerk samt Fundstellen und Änderungen mit Fallbezug.

**Einstellungen.** Profil, Arbeitsweise und Projektvorlagen.

## Aufbau

```
src/
  index.css              Design-Tokens aus Paper als Tailwind-v4-Theme
  lib/
    router.tsx           Hash-Router (läuft unter jedem Unterpfad)
    store.tsx            Demo-Zustand: Anfrage, Annahme, Kanal, Toasts
    chapters.ts          Kapitel und Schritte der Demo-Führung
    daten.ts             Beispieldaten für Aktionen, Fälle, Regeländerungen
  components/            Bühne, Sidebar, Suche, Aktionsmenü, Mail-Rahmen, Icons
  screens/               Website, Erstanfrage, Mail, Portal
  screens/app/           Arbeitsplatz der Beraterin
```

`components/Buehne.tsx` ist die einzige Besonderheit: der Entwurf ist auf
1440 px gezeichnet, also wird die Oberfläche auf schmaleren Fenstern als Ganzes
skaliert, statt das Layout zu stauchen. Auf breiteren Fenstern nutzt sie den
Platz.

## Technik

Vite · React 19 · TypeScript · Tailwind CSS v4 · Motion. Kein Backend, keine
Abhängigkeit auf externe Dienste — die Bilder liegen unter `public/assets`.

## Hosting

`.github/workflows/pages.yml` baut bei jedem Push auf `main` und stellt das
Ergebnis auf GitHub Pages. Einmalig im Repository unter
*Settings → Pages → Source* „GitHub Actions“ auswählen.
