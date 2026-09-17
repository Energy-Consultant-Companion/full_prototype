/* Gemeinsame Beispieldaten für den Arbeitsplatz der Beraterin */

export type Ausfuehrung = 'freigabe' | 'selbst' | 'laeuft'

export interface Aktion {
  id: string
  titel: string
  meta: string
  bereich: string
  ausfuehrung: Ausfuehrung
  fall: string
  gepruefte?: string
  belege?: string[]
  weitere?: string
  frist?: string
  icon: 'doc-check' | 'doc-minus' | 'book' | 'send' | 'chat'
  /* Wohin „Ansehen“ springt — direkt an die Arbeit, nicht auf eine Übersicht */
  ziel: string
  knopf: string
}

export const AKTIONEN: Aktion[] = [
  {
    id: 'a1',
    titel: 'Vorgeprüfte Unterlagen gegenzeichnen',
    meta: 'FAMILIE REUTER · NEUN UNTERLAGEN GEPRÜFT',
    bereich: 'Unterlagen',
    ausfuehrung: 'freigabe',
    fall: 'Familie Reuter',
    icon: 'doc-check',
    frist: 'Heute',
    gepruefte:
      'Alle neun Unterlagen sind vollständig und konsistent. Zwei Werte weichen leicht von der Erstaufnahme ab — Wohnfläche 148 statt 146 m² und Baujahr 1974 statt 1973. Beide Abweichungen ändern die Förderhöhe nicht.',
    belege: ['Wohnflächenberechnung', 'Grundbuchauszug'],
    weitere: 'Sieben weitere',
    ziel: '/app/unterlagen/gegenpruefen',
    knopf: 'Gegenprüfen',
  },
  {
    id: 'a2',
    titel: 'Zwei fehlende Unterlagen nachtragen',
    meta: 'MERT YILDIRIM · BLOCKIERT DEN ANTRAG KFW 458',
    bereich: 'Unterlagen',
    ausfuehrung: 'selbst',
    fall: 'Mert Yildirim',
    icon: 'doc-minus',
    frist: 'Bis 31. Aug',
    gepruefte:
      'Heizlastberechnung und Fachunternehmererklärung fehlen. Ohne beide lehnt die KfW den Antrag formal ab. Der Handwerksbetrieb ist bereits zweimal erinnert worden.',
    belege: ['Angebot Osterloh GmbH'],
    weitere: 'Zwei weitere',
    ziel: '/app/fall/yildirim/unterlagen/fehlend',
    knopf: 'Nachtragen',
  },
  {
    id: 'a3',
    titel: 'Neue EBW-Regel auf den Fall anwenden',
    meta: 'LENA KOWALSKI · HONORAR NEU KALKULIERT, 80 → 50 %',
    bereich: 'Regulierung',
    ausfuehrung: 'freigabe',
    fall: 'Lena Kowalski',
    icon: 'book',
    frist: 'Vor der Rechnung',
    gepruefte:
      'Der Zuschuss auf die Beratung fällt zum 07.08. von 80 auf 50 Prozent. Das Honorar ist neu gerechnet: 1.300 € Höchstbetrag bleibt, Ihr Eigenanteil steigt um 390 €. Der Entwurf für die Kundschaft liegt bereit.',
    belege: ['BAFA EBW Nr. 3.2'],
    ziel: '/app/regulierungen/aenderungen',
    knopf: 'Regel öffnen',
  },
  {
    id: 'a4',
    titel: 'Bei Familie Bauer nachfassen',
    meta: 'FAMILIE BAUER · HEIZLAST OFFEN · 21 TAGE STILL',
    bereich: 'Kommunikation',
    ausfuehrung: 'selbst',
    fall: 'Dr. Ellen Bauer',
    icon: 'send',
    frist: 'Seit 21 Tagen',
    gepruefte:
      'Seit dem 20. Juli keine Antwort. Zwei automatische Erinnerungen sind raus. Ein Anruf ist jetzt der wirksamste Schritt — bei stillen Fällen nach drei Wochen die Regel.',
    ziel: '/app/fall/bauer/kundschaft/nachfassen',
    knopf: 'Nachfassen',
  },
  {
    id: 'a5',
    titel: 'Frage von Hans-Jürgen Brendel beantworten',
    meta: 'HANS-JÜRGEN BRENDEL · ENTWURF LIEGT BEREIT',
    bereich: 'Kommunikation',
    ausfuehrung: 'freigabe',
    fall: 'Hans-Jürgen Brendel',
    icon: 'chat',
    frist: 'Seit gestern',
    gepruefte:
      'Gefragt war, ob der Förderantrag vor dem Angebot gestellt werden darf. Der Entwurf ist geschrieben und die Stelle in der BAFA-Richtlinie zitiert — Sie müssen nur noch freigeben.',
    belege: ['BAFA EBW Nr. 2.1'],
    ziel: '/app/fragen/antwort/brendel',
    knopf: 'Antwort ansehen',
  },
]

export interface Regel {
  id: string
  datum: string
  quelle: string
  titel: string
  faelle: number
  aendert: string
  hinweis: string
  betroffene: string[]
}

export const REGELN: Regel[] = [
  {
    id: 'r1',
    datum: '07.08.',
    quelle: 'BAFA EBW NR. 3.2',
    titel: 'Zuschuss für die Beratung fällt von 80 auf 50 Prozent',
    faelle: 3,
    aendert:
      'Der Höchstbetrag bleibt bei 1.300 € je Beratung. Honorare, die noch mit 80 Prozent kalkuliert sind, müssen vor der nächsten Rechnung angepasst werden.',
    hinweis: 'DREI BERATUNGEN',
    betroffene: ['Lena Kowalski', 'Silke Petersen', 'Familie Novak'],
  },
  {
    id: 'r2',
    datum: '01.09.',
    quelle: 'KFW 458 NR. 2.3',
    titel: 'Heizlastberechnung wird vor Inbetriebnahme Pflicht',
    faelle: 2,
    aendert:
      'Ab dem 1. September muss die Heizlast nach DIN EN 12831 vor Inbetriebnahme vorliegen. Bei laufenden Anträgen zählt das Datum der Inbetriebnahme, nicht das Antragsdatum.',
    hinweis: 'ZWEI ANTRÄGE',
    betroffene: ['Mert Yildirim', 'Familie Novak'],
  },
  {
    id: 'r3',
    datum: '22.07.',
    quelle: 'BEG EM NR. 5.4',
    titel: 'Verwendungsnachweis binnen 36 statt 48 Monaten',
    faelle: 1,
    aendert:
      'Die Frist verkürzt sich für alle Zusagen ab dem 22. Juli. Für ältere Zusagen bleibt es bei 48 Monaten — beide Fristen werden getrennt geführt.',
    hinweis: 'EINE ZUSAGE',
    betroffene: ['Hans-Jürgen Brendel'],
  },
]

export type Akteur = 'sie' | 'kundschaft' | 'niemand' | 'handwerker' | 'fertig'
export type FallTon = 'rot' | 'brand' | 'amber' | 'gruen' | 'grau'

export interface Fall {
  id: string
  kundschaft: string
  ort: string
  foerderweg: string
  schritt: string
  frist: string
  fristWarn?: boolean
  fragen: number
  akteur: Akteur
  ton: FallTon
  aktion: string
}

export const FAELLE: Fall[] = [
  { id: 'brendel', kundschaft: 'Hans-Jürgen Brendel', ort: 'Peine', foerderweg: 'BAFA BEG EM', schritt: 'Förderantrag', frist: 'seit 5. Aug', fristWarn: true, fragen: 2, akteur: 'sie', ton: 'rot', aktion: 'Sie · BAFA-Antwort' },
  { id: 'bauer', kundschaft: 'Dr. Ellen Bauer', ort: 'Hannover', foerderweg: 'KfW 458', schritt: 'Förderantrag', frist: '18. Aug', fragen: 0, akteur: 'sie', ton: 'rot', aktion: 'Sie · Rechnung prüfen' },
  { id: 'kowalski', kundschaft: 'Anja Kowalski', ort: 'Ilsede', foerderweg: '', schritt: 'Unterlagen', frist: '20. Aug', fragen: 0, akteur: 'kundschaft', ton: 'amber', aktion: 'Kundschaft · Unterlagen' },
  { id: 'yildirim', kundschaft: 'Mert Yildirim', ort: 'Lengede', foerderweg: 'BAFA EBW · iSFP', schritt: 'Förderantrag', frist: '31. Aug', fragen: 0, akteur: 'sie', ton: 'brand', aktion: 'Sie · einreichen' },
  { id: 'voehrum', kundschaft: 'Gemeinde Vöhrum', ort: 'Vöhrum', foerderweg: '', schritt: 'Vertrag und Vollmacht', frist: '–', fragen: 0, akteur: 'sie', ton: 'brand', aktion: 'Sie · Vollmacht prüfen' },
  { id: 'petersen', kundschaft: 'Silke Petersen', ort: 'Vöhrum', foerderweg: 'BAFA EBW', schritt: 'Unterlagen', frist: '15. Aug', fragen: 0, akteur: 'kundschaft', ton: 'amber', aktion: 'Kundschaft · Unterlagen' },
  { id: 'reuter', kundschaft: 'Familie Reuter', ort: 'Peine', foerderweg: 'BAFA EBW · iSFP', schritt: 'Unterlagen', frist: '15. Aug', fragen: 1, akteur: 'kundschaft', ton: 'amber', aktion: 'Kundschaft · Unterlagen' },
  { id: 'wohnbau', kundschaft: 'Wohnbau Peine eG', ort: 'Peine', foerderweg: 'KfW 261', schritt: 'Unterlagen', frist: '29. Aug', fragen: 3, akteur: 'kundschaft', ton: 'amber', aktion: 'Kundschaft · Antwort' },
  { id: 'kraemer', kundschaft: 'Eheleute Krämer', ort: 'Ilsede', foerderweg: '', schritt: 'Vor-Ort-Termin', frist: '19. Aug', fragen: 1, akteur: 'kundschaft', ton: 'amber', aktion: 'Kundschaft · Freigabe' },
  { id: 'novak', kundschaft: 'Familie Novak', ort: 'Edemissen', foerderweg: 'KfW 458', schritt: 'Ergebnisgespräch', frist: '16. Sep', fragen: 0, akteur: 'niemand', ton: 'gruen', aktion: 'Niemand · Termin 16.09.' },
  { id: 'thiele', kundschaft: 'Jonas Thiele', ort: 'Gifhorn', foerderweg: '', schritt: 'Vor-Ort-Termin', frist: '–', fragen: 0, akteur: 'handwerker', ton: 'gruen', aktion: 'Handwerker · Umsetzung' },
  { id: 'okonkwo', kundschaft: 'Familie Okonkwo', ort: 'Sehnde', foerderweg: 'BAFA BEG EM', schritt: 'Alle sechs erledigt', frist: '–', fragen: 0, akteur: 'fertig', ton: 'grau', aktion: 'Abgeschlossen · 20.07.' },
]

/* ── Vorbereitete Mail-Entwürfe ───────────────────────────────────────────
   Jede Aktion im Überblick, die eine Nachricht braucht, öffnet direkt den
   fertigen Entwurf — Betreff, Text und Anhänge stehen schon.             */

export interface Entwurf {
  id: string
  fallId: string
  anlass: string
  an: string
  anRolle: string
  betreff: string
  text: string
  chips?: string[]
  hinweis: string
  bestaetigung: { titel: string; body: string }
}

export const ENTWUERFE: Record<string, Entwurf> = {
  termin: {
    id: 'termin',
    fallId: 'sander',
    anlass: 'ERSTGESPRÄCH TERMINIEREN',
    an: 'Tobias Sander',
    anRolle: 'KUNDSCHAFT · t.sander@posteo.de',
    betreff: 'Erstgespräch — drei Termine zur Auswahl',
    text: `Guten Tag Herr Sander,

danke für Ihre Anfrage. Für das Erstgespräch komme ich zu Ihnen — rund eine Stunde, danach weiß ich, welcher Förderweg zu Ihrem Haus passt.

Drei Termine habe ich frei:

· Mittwoch, 12. August, 10:00
· Donnerstag, 13. August, 14:30
· Montag, 17. August, 09:00

Sagen Sie mir einfach, welcher passt — oder nennen Sie mir einen anderen. Bringen Sie, wenn möglich, die letzten drei Heizkostenabrechnungen bereit; dann kann ich vor Ort schon rechnen.

Freundliche Grüße
Katrin Held`,
    chips: ['Drei Termine aus Ihrem Kalender', 'Anfahrt 18 km'],
    hinweis: 'DIE FREIEN ZEITEN KOMMEN AUS IHREM KALENDER',
    bestaetigung: { titel: 'Terminvorschläge gesendet', body: 'Sobald Herr Sander zusagt, liegt der Termin im Fall und in Ihrem Kalender.' },
  },
  nachfassen: {
    id: 'nachfassen',
    fallId: 'bauer',
    anlass: 'NACHFASSEN · 21 TAGE STILL',
    an: 'Dr. Ellen Bauer',
    anRolle: 'KUNDSCHAFT · e.bauer@hannover-mail.de',
    betreff: 'Kurze Erinnerung — Heizlastberechnung für Ihren Antrag',
    text: `Guten Tag Frau Dr. Bauer,

seit dem 20. Juli warte ich noch auf die Heizlastberechnung Ihres Heizungsbauers. Ohne sie kann ich den Verwendungsnachweis bei der KfW nicht einreichen, und die Frist läuft am 18. August ab.

Zwei Wege, je nachdem was schneller geht:

· Ihr Heizungsbauer schickt mir die Berechnung direkt — ich schreibe ihn gern selbst an, wenn Sie mir den Kontakt geben.
· Oder Sie laden sie in Ihrem Bereich hoch, dann ist sie sofort im Antrag.

Falls es gerade nicht passt, sagen Sie mir kurz Bescheid — dann verschiebe ich die Frist und melde das der KfW.

Freundliche Grüße
Katrin Held`,
    chips: ['Frist 18. August', 'Zwei Erinnerungen gelaufen'],
    hinweis: 'ZWEIMAL AUTOMATISCH ERINNERT · JETZT SIND SIE DRAN',
    bestaetigung: { titel: 'Nachfassen gesendet', body: 'Kommt bis Freitag nichts, meldet sich der Fall von selbst wieder.' },
  },
}

/* ── Fehlende Unterlagen je Fall ──────────────────────────────────────── */

export interface FehlendeUnterlage {
  name: string
  grund: string
  von: string
  kuerzel: string
  frist: string
  fristWarn?: boolean
  aktion: 'Erinnern' | 'Nachfragen' | 'Läuft ohne Sie'
  ton: 'rot' | 'amber' | 'still'
}

export interface Wartend {
  rolle: string
  name: string
  info: string
  warn: boolean
  symbol: 'kunden' | 'weiteres' | 'gebaeude' | 'kommunikation'
}

export const FEHLEND_JE_FALL: Record<string, { kopf: string; wartend: Wartend[]; liste: FehlendeUnterlage[] }> = {
  reuter: {
    kopf: '5 OFFEN',
    wartend: [
      { rolle: 'KUNDSCHAFT', name: 'Familie Reuter', info: '2 FEHLEN · SEIT 14 TAGEN', warn: true, symbol: 'kunden' },
      { rolle: 'HANDWERK', name: 'Osterloh GmbH', info: '1 FEHLT · SEIT 3 TAGEN', warn: true, symbol: 'weiteres' },
      { rolle: 'HANDWERK', name: 'Schornsteinfeger', info: 'TERMIN AM 18.08.', warn: false, symbol: 'gebaeude' },
      { rolle: 'BEHÖRDE', name: 'BAFA', info: 'ANTWORT BIS CA. 02.09.', warn: false, symbol: 'kommunikation' },
    ],
    liste: [
      { name: 'Vollmacht von Jens Reuter', grund: 'Ohne den Miteigentümer kann der Antrag nicht raus.', von: 'Familie Reuter', kuerzel: 'R', frist: 'FR 15.08.', fristWarn: true, aktion: 'Erinnern', ton: 'rot' },
      { name: 'Heizkostenabrechnung 2024', grund: 'Die Förderung braucht drei zusammenhängende Jahre.', von: 'Familie Reuter', kuerzel: 'R', frist: 'FR 15.08.', fristWarn: true, aktion: 'Erinnern', ton: 'rot' },
      { name: 'Angebot mit Leistungszeitraum', grund: 'Zeitraum fehlt.', von: 'Osterloh GmbH', kuerzel: 'O', frist: 'DI 19.08.', aktion: 'Nachfragen', ton: 'amber' },
      { name: 'Feuerstättenbescheid', grund: 'Termin ist für den 18.08. bestätigt.', von: 'Schornsteinfeger', kuerzel: 'S', frist: 'MO 18.08.', aktion: 'Läuft ohne Sie', ton: 'still' },
      { name: 'Zuwendungsbescheid', grund: 'Das BAFA antwortet in der Regel in vier Wochen.', von: 'BAFA', kuerzel: 'B', frist: 'CA. 02.09.', aktion: 'Läuft ohne Sie', ton: 'still' },
    ],
  },
  yildirim: {
    kopf: '2 OFFEN · BLOCKIEREN DEN ANTRAG',
    wartend: [
      { rolle: 'HANDWERK', name: 'Heizung Yildirim', info: '2 FEHLEN · ZWEIMAL ERINNERT', warn: true, symbol: 'weiteres' },
      { rolle: 'KUNDSCHAFT', name: 'Mert Yildirim', info: 'ALLES ABGEGEBEN', warn: false, symbol: 'kunden' },
      { rolle: 'BEHÖRDE', name: 'KfW', info: 'ANTRAG NOCH NICHT EINGEREICHT', warn: false, symbol: 'kommunikation' },
    ],
    liste: [
      { name: 'Heizlastberechnung DIN EN 12831', grund: 'Ab 01.09. Pflicht vor Inbetriebnahme — ohne sie lehnt die KfW den Antrag formal ab.', von: 'Heizung Yildirim', kuerzel: 'H', frist: 'SO 31.08.', fristWarn: true, aktion: 'Nachfragen', ton: 'rot' },
      { name: 'Fachunternehmererklärung', grund: 'Muss vom ausführenden Betrieb unterschrieben sein, nicht von Ihnen.', von: 'Heizung Yildirim', kuerzel: 'H', frist: 'SO 31.08.', fristWarn: true, aktion: 'Nachfragen', ton: 'rot' },
    ],
  },
  sander: {
    kopf: '9 ANGEFRAGT',
    wartend: [
      { rolle: 'KUNDSCHAFT', name: 'Tobias Sander', info: '9 ANGEFRAGT · ZUGANG HEUTE RAUS', warn: false, symbol: 'kunden' },
    ],
    liste: [
      { name: 'Grundriss', grund: 'Grundlage für Aufmaß und Flächenberechnung.', von: 'Tobias Sander', kuerzel: 'S', frist: 'BIS ERSTGESPRÄCH', aktion: 'Erinnern', ton: 'amber' },
      { name: 'Heizkostenabrechnung 2022', grund: 'Erstes der drei zusammenhängenden Jahre.', von: 'Tobias Sander', kuerzel: 'S', frist: 'BIS ERSTGESPRÄCH', aktion: 'Erinnern', ton: 'amber' },
      { name: 'Heizkostenabrechnung 2023', grund: 'Zweites der drei zusammenhängenden Jahre.', von: 'Tobias Sander', kuerzel: 'S', frist: 'BIS ERSTGESPRÄCH', aktion: 'Erinnern', ton: 'amber' },
      { name: 'Heizkostenabrechnung 2024', grund: 'Drittes der drei zusammenhängenden Jahre.', von: 'Tobias Sander', kuerzel: 'S', frist: 'BIS ERSTGESPRÄCH', aktion: 'Erinnern', ton: 'amber' },
      { name: 'Fotos der Heizung', grund: 'Typenschild und Aufstellraum genügen.', von: 'Tobias Sander', kuerzel: 'S', frist: 'BIS ERSTGESPRÄCH', aktion: 'Erinnern', ton: 'amber' },
      { name: 'Energieausweis, falls vorhanden', grund: 'Nicht zwingend — spart aber einen Rechenschritt.', von: 'Tobias Sander', kuerzel: 'S', frist: 'OPTIONAL', aktion: 'Läuft ohne Sie', ton: 'still' },
      { name: 'Grundbuchauszug', grund: 'Weist die Eigentümerschaft für den Antrag nach.', von: 'Tobias Sander', kuerzel: 'S', frist: 'BIS ANTRAG', aktion: 'Läuft ohne Sie', ton: 'still' },
      { name: 'Wohnflächenberechnung', grund: 'Bestimmt die förderfähige Summe je Wohneinheit.', von: 'Tobias Sander', kuerzel: 'S', frist: 'BIS ANTRAG', aktion: 'Läuft ohne Sie', ton: 'still' },
      { name: 'Vollmacht der Miteigentümerin', grund: 'Nur nötig, wenn das Haus zu zweit gehört — klären wir im Erstgespräch.', von: 'Tobias Sander', kuerzel: 'S', frist: 'OFFEN', aktion: 'Läuft ohne Sie', ton: 'still' },
    ],
  },
  bauer: {
    kopf: '1 OFFEN',
    wartend: [
      { rolle: 'KUNDSCHAFT', name: 'Dr. Ellen Bauer', info: '1 FEHLT · 21 TAGE STILL', warn: true, symbol: 'kunden' },
      { rolle: 'BEHÖRDE', name: 'KfW', info: 'FRIST 18. AUGUST', warn: true, symbol: 'kommunikation' },
    ],
    liste: [
      { name: 'Heizlastberechnung', grund: 'Letzter Baustein für den Verwendungsnachweis.', von: 'Dr. Ellen Bauer', kuerzel: 'B', frist: 'MO 18.08.', fristWarn: true, aktion: 'Erinnern', ton: 'rot' },
    ],
  },
}

/* ── Kommunikationsverläufe je Fall ───────────────────────────────────── */

export interface Nachricht {
  von: string
  zeit: string
  text: string
  eigen?: boolean
}

export const KOMM_JE_FALL: Record<string, Record<string, Nachricht[]>> = {
  reuter: {
    kundschaft: [
      { von: 'Katrin Held', zeit: 'Heute · 09:14', text: 'Guten Tag Familie Reuter, zwei Unterlagen fehlen noch — ich habe Ihnen eben eine Erinnerung geschickt.', eigen: true },
      { von: 'Marlene Reuter', zeit: 'Gestern · 19:41', text: 'Wann kommen Sie noch mal zum Termin? Wir müssten das im Kalender eintragen.' },
      { von: 'ENSERA', zeit: '04.08. · 14:05', text: 'Sieben Unterlagen gelesen, Werte übernommen. Heizkostenabrechnung 2024 fehlt.' },
      { von: 'Marlene Reuter', zeit: '04.08. · 09:30', text: 'Anbei die Wohnflächenberechnung. Die Abrechnung für 2024 kommt erst im Februar.' },
    ],
    handwerk: [
      { von: 'Osterloh GmbH', zeit: '12.08. · 11:20', text: 'Angebot Wärmepumpe anbei. Leistungszeitraum tragen wir nach.' },
      { von: 'Katrin Held', zeit: '12.08. · 14:02', text: 'Danke — ohne Zeitraum kann ich das Angebot dem Antrag nicht beilegen.', eigen: true },
      { von: 'Schornsteinfeger Wendt', zeit: '02.08. · 08:10', text: 'Termin für die Feuerstättenschau steht: 18.08., 09:00.' },
    ],
    behoerde: [
      { von: 'BAFA', zeit: '05.08. · 06:00', text: 'Eingangsbestätigung zu Ihrem Antrag EBW-2026-41822. Bearbeitung in der Regel vier Wochen.' },
      { von: 'ENSERA', zeit: '05.08. · 06:02', text: 'Bestätigung im Ordner „Vom Amt“ abgelegt und Frist auf ca. 02.09. gesetzt.' },
    ],
  },
  bauer: {
    kundschaft: [
      { von: 'ENSERA', zeit: '03.08. · 08:00', text: 'Zweite Erinnerung an die Heizlastberechnung verschickt. Keine Antwort seit 20. Juli.' },
      { von: 'ENSERA', zeit: '27.07. · 08:00', text: 'Erste Erinnerung an die Heizlastberechnung verschickt.' },
      { von: 'Katrin Held', zeit: '20.07. · 16:30', text: 'Die Rechnung ist da und geprüft. Für den Verwendungsnachweis fehlt mir nur noch die Heizlastberechnung.', eigen: true },
      { von: 'Dr. Ellen Bauer', zeit: '20.07. · 09:12', text: 'Die Wärmepumpe läuft seit letzter Woche. Rechnung hänge ich an.' },
    ],
    handwerk: [
      { von: 'Katrin Held', zeit: '20.07. · 16:35', text: 'Könnten Sie mir die Heizlastberechnung zur Anlage schicken? Für die KfW brauche ich sie zum Nachweis.', eigen: true },
    ],
    behoerde: [
      { von: 'KfW', zeit: '12.06. · 07:00', text: 'Zusage zu Antrag 458-2026-77310. Verwendungsnachweis bis 18.08.2026 einreichen.' },
    ],
  },
  yildirim: {
    kundschaft: [
      { von: 'Mert Yildirim', zeit: '06.08. · 18:22', text: 'Alles hochgeladen. Sagen Sie mir Bescheid, wenn noch was fehlt.' },
      { von: 'Katrin Held', zeit: '06.08. · 19:04', text: 'Danke, bei Ihnen ist alles vollständig. Ich hake noch beim Heizungsbauer nach.', eigen: true },
    ],
    handwerk: [
      { von: 'ENSERA', zeit: '09.08. · 08:00', text: 'Zweite Erinnerung an Heizlastberechnung und Fachunternehmererklärung verschickt.' },
      { von: 'ENSERA', zeit: '04.08. · 08:00', text: 'Erste Erinnerung verschickt.' },
      { von: 'Heizung Yildirim', zeit: '31.07. · 15:40', text: 'Einbau ist durch. Papiere kommen nach.' },
    ],
    behoerde: [
      { von: 'ENSERA', zeit: '09.08. · 08:05', text: 'Antrag KfW 458 liegt fertig bereit — es fehlen nur die zwei Nachweise vom Handwerk.' },
    ],
  },
  sander: {
    kundschaft: [
      { von: 'Katrin Held', zeit: 'Heute · 09:38', text: 'Ihre Anfrage passt gut zu dem, was ich mache. Ich übernehme das gern — als Nächstes brauche ich neun Unterlagen von Ihnen.', eigen: true },
      { von: 'Tobias Sander', zeit: 'Heute · 09:12', text: 'Unsere Ölheizung ist von 1998 und war letzten Winter zweimal aus. Wir würden auf Wärmepumpe wechseln.' },
    ],
    handwerk: [],
    behoerde: [],
  },
}

/* ── Zähler und Startdatum je Fall, für den rechten Rand ──────────────── */

export interface FallZaehler {
  seit: string
  schritte: string
  fristen: string
  ablage: string
  fehlend: string
  kundschaft: string
  handwerk: string
  behoerde: string
  verlauf: string
  notizen: string
  entscheidungen: string
}

export const ZAEHLER_JE_FALL: Record<string, FallZaehler> = {
  reuter: { seit: 'SEIT 21.07.', schritte: '3/6', fristen: '2', ablage: '32', fehlend: '2', kundschaft: '21', handwerk: '8', behoerde: '5', verlauf: '26', notizen: '4', entscheidungen: '3' },
  yildirim: { seit: 'SEIT 02.06.', schritte: '7/10', fristen: '1', ablage: '18', fehlend: '2', kundschaft: '12', handwerk: '9', behoerde: '4', verlauf: '21', notizen: '2', entscheidungen: '2' },
  bauer: { seit: 'SEIT 14.04.', schritte: '9/10', fristen: '1', ablage: '24', fehlend: '1', kundschaft: '16', handwerk: '6', behoerde: '5', verlauf: '19', notizen: '3', entscheidungen: '2' },
  brendel: { seit: 'SEIT 11.03.', schritte: '7/10', fristen: '2', ablage: '27', fehlend: '1', kundschaft: '19', handwerk: '7', behoerde: '9', verlauf: '31', notizen: '5', entscheidungen: '4' },
  sander: { seit: 'SEIT HEUTE', schritte: '1/6', fristen: '1', ablage: '0', fehlend: '9', kundschaft: '2', handwerk: '0', behoerde: '0', verlauf: '3', notizen: '0', entscheidungen: '0' },
}
