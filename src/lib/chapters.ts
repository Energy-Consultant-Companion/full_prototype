export interface Step {
  label: string
  path: string
  hint?: string
}

export interface Chapter {
  title: string
  note: string
  accent: string
  steps: Step[]
}

export const CHAPTERS: Chapter[] = [
  {
    title: 'Kundschaft',
    note: 'Von der Website bis zur abgeschickten Anfrage',
    accent: 'var(--color-accent-sky)',
    steps: [
      { label: 'Website der Beraterin', path: '/website' },
      { label: 'Erstanfrage · Gebäude', path: '/anfrage/gebaeude' },
      { label: 'Erstanfrage · Vorhaben', path: '/anfrage/vorhaben' },
      { label: 'Erstanfrage · Zeitpunkt', path: '/anfrage/zeitpunkt' },
      { label: 'Erstanfrage · Anliegen', path: '/anfrage/anliegen' },
      { label: 'Anfrage gesendet', path: '/anfrage/gesendet' },
    ],
  },
  {
    title: 'Anfrage annehmen',
    note: 'Die Beraterin prüft und sendet den Zugang',
    accent: 'var(--color-accent-sky)',
    steps: [
      { label: 'Anfragen-Eingang', path: '/app/anfragen' },
      { label: 'Zugangsmail', path: '/mail/zugang' },
    ],
  },
  {
    title: 'Weg A · Alles per Mail',
    note: 'Antworten, ohne sich je einzuloggen',
    accent: 'var(--color-accent-green)',
    steps: [
      { label: 'Antwort per Mail', path: '/mail/antwort' },
      { label: 'Bestätigung', path: '/mail/bestaetigt' },
      { label: 'Erinnerung', path: '/mail/erinnerung' },
    ],
  },
  {
    title: 'Weg B · Klientenportal',
    note: 'Derselbe Fall, im Browser',
    accent: 'var(--color-accent-teal)',
    steps: [
      { label: 'Klientenportal', path: '/portal' },
      { label: 'Informationen ergänzen', path: '/portal/informationen' },
    ],
  },
  {
    title: 'Arbeitsplatz',
    note: 'Überblick und alle Fälle',
    accent: 'var(--color-accent-brand)',
    steps: [
      { label: 'Überblick', path: '/app/ueberblick' },
      { label: 'Fälle', path: '/app/faelle' },
      { label: 'Fall anlegen · Aus Unterlagen', path: '/app/faelle/neu-unterlagen' },
      { label: 'Fall anlegen · Projekt übernehmen', path: '/app/faelle/neu-projekt' },
    ],
  },
  {
    title: 'Aus dem Überblick',
    note: 'Jede Aktion springt direkt an die Arbeit, nicht auf eine Übersicht',
    accent: 'var(--color-accent-brand)',
    steps: [
      { label: 'Erstgespräch terminieren', path: '/app/fall/sander/kundschaft/termin' },
      { label: 'Unterlagen gegenzeichnen', path: '/app/unterlagen/gegenpruefen' },
      { label: 'Fehlende Unterlagen nachtragen', path: '/app/fall/yildirim/unterlagen/fehlend' },
      { label: 'Regel auf die Fälle anwenden', path: '/app/regulierungen/aenderungen' },
      { label: 'Nachfassen per Mail', path: '/app/fall/bauer/kundschaft/nachfassen' },
      { label: 'Frage beantworten', path: '/app/fragen/antwort/brendel' },
    ],
  },
  {
    title: 'Der Fall',
    note: 'Fallübersicht, Schritte, Verlauf, Unterlagen',
    accent: 'var(--color-accent-green)',
    steps: [
      { label: 'Fallübersicht', path: '/app/fall/reuter' },
      { label: 'Schritte', path: '/app/fall/reuter/schritte' },
      { label: 'Verlauf', path: '/app/fall/reuter/verlauf' },
      { label: 'Aktionen', path: '/app/fall/reuter/aktionen' },
      { label: 'Unterlagen · Ordner', path: '/app/fall/reuter/unterlagen' },
      { label: 'Ordner geöffnet', path: '/app/fall/reuter/unterlagen/ordner' },
      { label: 'Fehlende Unterlagen', path: '/app/fall/reuter/unterlagen/fehlend' },
    ],
  },
  {
    title: 'Schritte & Fragen',
    note: 'Was als Nächstes ansteht, und wer noch antworten muss',
    accent: 'var(--color-accent-amber)',
    steps: [
      { label: 'Nächste Schritte', path: '/app/schritte' },
      { label: 'Fragen', path: '/app/fragen' },
      { label: 'Antwort freigeben', path: '/app/fragen/antwort' },
      { label: 'Frage stellen', path: '/app/fragen/neu' },
    ],
  },
  {
    title: 'Suche',
    note: 'Global — oder auf einen Fall eingegrenzt',
    accent: 'var(--color-fg-muted)',
    steps: [
      { label: 'Globale Suche', path: '/app/suche' },
      { label: 'Auf Fall eingegrenzt', path: '/app/suche/fall' },
    ],
  },
  {
    title: 'Unterlagen prüfen',
    note: 'Eingang, automatische Prüfung, Gegenprüfen',
    accent: 'var(--color-accent-pink)',
    steps: [
      { label: 'Eingang', path: '/app/unterlagen' },
      { label: 'Prüfung', path: '/app/unterlagen/pruefung' },
      { label: 'Gegenprüfen', path: '/app/unterlagen/gegenpruefen' },
    ],
  },
  {
    title: 'Förderung',
    note: 'Förderwege durchrechnen und in den Fall übernehmen',
    accent: 'var(--color-accent-violet)',
    steps: [
      { label: 'Prüfung starten', path: '/app/foerderung' },
      { label: 'Ergebnisse', path: '/app/foerderung/ergebnisse' },
      { label: 'Programm im Detail', path: '/app/foerderung/programm' },
    ],
  },
  {
    title: 'Regulierungen',
    note: 'Fragen ans Regelwerk und Änderungen mit Fallbezug',
    accent: '#96602F',
    steps: [
      { label: 'Frage stellen', path: '/app/regulierungen' },
      { label: 'Antwort', path: '/app/regulierungen/antwort' },
      { label: 'Änderungen', path: '/app/regulierungen/aenderungen' },
    ],
  },
  {
    title: 'Einstellungen',
    note: 'Arbeitsweise und Vorlagen anpassen',
    accent: 'var(--color-fg-muted)',
    steps: [
      { label: 'Profil und Arbeitsweise', path: '/app/einstellungen' },
      { label: 'Projektvorlagen', path: '/app/einstellungen/vorlagen' },
    ],
  },
]

export const FLAT_STEPS: Array<Step & { chapter: string }> = CHAPTERS.flatMap((c) =>
  c.steps.map((s) => ({ ...s, chapter: c.title })),
)
