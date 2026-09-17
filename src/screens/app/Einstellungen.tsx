import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import AppShell from '../../components/AppShell'
import { EASE, Label } from '../../components/ui'
import { navigate } from '../../lib/router'
import { useDemo } from '../../lib/store'

/* ── Navigation der Einstellungen ──────────────────────────────────────── */

const L = (d: string) => (
  <svg width="15" height="15" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
    <path d={d} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GRUPPEN: Array<{ titel: string; punkte: Array<{ label: string; icon: React.ReactNode; zahl?: string; pfad?: string }> }> = [
  {
    titel: 'PERSÖNLICH',
    punkte: [
      { label: 'Profil und Arbeitsweise', icon: L('M11 5.6a3 3 0 11-6 0 3 3 0 016 0zM2.6 14a5.4 5.4 0 0110.8 0'), pfad: '/app/einstellungen' },
      { label: 'Benachrichtigungen', icon: L('M12.4 6.4a4.4 4.4 0 10-8.8 0c0 4.4-1.8 5.6-1.8 5.6h12.4s-1.8-1.2-1.8-5.6M9.2 14a1.4 1.4 0 01-2.4 0') },
      { label: 'Schreibstil und Anrede', icon: L('M10.8 2.6l2.6 2.6L6 12.6 2.8 13.2l.6-3.2z') },
    ],
  },
  {
    titel: 'IHRE ARBEITSWEISE',
    punkte: [
      { label: 'Projektvorlagen', icon: L('M2.4 3.6h11.2v9.2H2.4zM2.4 6.6h11.2M6 6.6v6.2'), zahl: '8', pfad: '/app/einstellungen/vorlagen' },
      { label: 'Unterlagen-Listen', icon: L('M4 2h5l3 3v9H4zM9 2v3h3'), zahl: '9' },
      { label: 'Fristenregeln', icon: L('M8 2.6a5.4 5.4 0 100 10.8A5.4 5.4 0 008 2.6M8 5.6V8l1.8 1.2'), zahl: '7' },
      { label: 'Schreibvorlagen', icon: L('M2 3.6h12v8.8H2zM2.4 4.4L8 8.6l5.6-4.2'), zahl: '12' },
    ],
  },
  {
    titel: 'ENSERA',
    punkte: [
      { label: 'Autonomie', icon: L('M8 1.8l1.7 3.5 3.8.5-2.8 2.7.7 3.8L8 10.4l-3.4 1.8.7-3.8L2.5 5.8l3.8-.5z') },
      { label: 'Grenzen und Sicherungen', icon: L('M4.4 7.2V5.4a3.6 3.6 0 017.2 0v1.8M3.4 7.2h9.2v6.2H3.4z') },
      { label: 'Freigaben', icon: L('M8 2.6a5.4 5.4 0 100 10.8A5.4 5.4 0 008 2.6M5.6 8.2l1.6 1.6 3.2-3.6'), zahl: '2' },
      { label: 'Protokoll', icon: L('M2.6 4h10.8M2.6 8h10.8M2.6 12h6.4') },
      { label: 'Wissen und Quellen', icon: L('M2.6 3.4h4.1c.7 0 1.3.5 1.3 1.2v8.6c0-.5-.6-.9-1.3-.9H2.6zM13.4 3.4H9.3c-.7 0-1.3.5-1.3 1.2v8.6c0-.5.6-.9 1.3-.9h4.1z') },
    ],
  },
  {
    titel: 'BÜRO',
    punkte: [
      { label: 'Büro und Team', icon: L('M2.4 13.6h11.2M3.6 13.6V7.2M12.4 13.6V7.2M2 7.2 8 3.2l6 4z'), zahl: '3' },
      { label: 'Anbindungen', icon: L('M6.6 9.4a2.6 2.6 0 003.8 0l2-2a2.7 2.7 0 00-3.8-3.8L7.4 4.8M9.4 6.6a2.6 2.6 0 00-3.8 0l-2 2a2.7 2.7 0 003.8 3.8l1.2-1.2'), zahl: '4' },
      { label: 'Abrechnung', icon: L('M2 4.6h12v6.8H2zM2 7h12') },
    ],
  },
]

function Nav({ aktiv }: { aktiv: string }) {
  return (
    <div className="flex w-rail shrink-0 flex-col self-stretch border-r px-[20px] pt-[20px] pb-md [background-color:var(--color-surface)] [border-color:var(--color-border)]">
      <div className="flex items-center justify-between px-xs pb-md">
        <Label>EINSTELLUNGEN</Label>
        <button onClick={() => navigate('/app/ueberblick')} className="[color:var(--color-fg-subtle)] hover:[color:var(--color-fg)]" aria-label="Zurück">
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M8.8 2.8L4.6 7l4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="flex h-[38px] shrink-0 items-center gap-xs rounded-md border px-[10px] [background-color:var(--color-surface)] [border-color:var(--color-border)]">
        <svg width="15" height="15" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
          <circle cx="7.2" cy="7.2" r="4.5" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" />
          <path d="M10.6 10.6L13.6 13.6" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <input placeholder="Einstellung suchen" className="grow text-sm leading-md outline-none placeholder:[color:var(--color-fg-subtle)]" />
      </div>

      <div className="scrollbar-none flex-1 overflow-y-auto pt-md">
        {GRUPPEN.map((g, gi) => (
          <div key={g.titel} className={gi > 0 ? 'pt-lg' : ''}>
            <div className="px-xs pb-xs"><Label>{g.titel}</Label></div>
            {g.punkte.map((p) => {
              const an = p.pfad === aktiv
              return (
                <button
                  key={p.label}
                  onClick={() => (p.pfad ? navigate(p.pfad) : undefined)}
                  className="relative flex h-[34px] w-full shrink-0 items-center gap-sm rounded-md px-[10px]"
                >
                  {an && (
                    <motion.span
                      layoutId="einst-aktiv"
                      transition={{ type: 'spring', stiffness: 520, damping: 42 }}
                      className="absolute inset-0 rounded-md border shadow-[#12161B0F_0px_1px_2px] [background-color:var(--color-surface)] [border-color:var(--color-border)]"
                    />
                  )}
                  <span className="relative" style={{ color: an ? 'var(--color-fg)' : 'var(--color-fg-subtle)' }}>{p.icon}</span>
                  <span
                    className="relative grow basis-0 text-left text-[14px] leading-[18px]"
                    style={{ color: an ? 'var(--color-fg)' : 'var(--color-fg-muted)', fontWeight: an ? 500 : 400 }}
                  >
                    {p.label}
                  </span>
                  {p.zahl && (
                    <span className="relative shrink-0 [font-family:var(--font-mono)] text-2xs [color:var(--color-fg-subtle)]">{p.zahl}</span>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Zeilen-Bausteine ──────────────────────────────────────────────────── */

function Zeile({
  titel,
  text,
  rechts,
  letzte,
}: {
  titel: string
  text: string
  rechts: React.ReactNode
  letzte?: boolean
}) {
  return (
    <div className={'flex items-center gap-lg px-[20px] py-md' + (letzte ? '' : ' border-b [border-color:var(--color-border-subtle)]')}>
      <div className="flex grow basis-0 flex-col gap-[3px]">
        <div className="text-[15px] font-medium leading-[19px] [color:var(--color-fg)]">{titel}</div>
        <div className="text-[13px] leading-[18px] [color:var(--color-fg-muted)]">{text}</div>
      </div>
      <div className="flex shrink-0 items-center gap-sm">{rechts}</div>
    </div>
  )
}

function Auswahl({ wert, optionen }: { wert: string; optionen: string[] }) {
  const [v, setV] = useState(wert)
  return (
    <div className="relative">
      <select
        value={v}
        onChange={(e) => setV(e.target.value)}
        className="h-xl appearance-none rounded-md border pl-sm pr-[28px] text-[14px] font-medium outline-none transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border)] [color:var(--color-fg)] hover:[border-color:var(--color-border-strong)]"
      >
        {optionen.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <svg width="12" height="12" viewBox="0 0 14 14" className="pointer-events-none absolute right-sm top-1/2 -translate-y-1/2">
        <path d="M4.6 5.6L7 3.2l2.4 2.4M4.6 8.4L7 10.8l2.4-2.4" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function Marke({ children, ton = 'grau' }: { children: React.ReactNode; ton?: 'grau' | 'gruen' | 'brand' }) {
  const s = {
    grau: { bg: 'var(--color-surface-sunken)', ink: 'var(--color-fg-muted)' },
    gruen: { bg: 'var(--color-accent-green-wash)', ink: 'var(--color-accent-green-ink)' },
    brand: { bg: 'var(--color-brand-surface)', ink: 'var(--color-brand)' },
  }[ton]
  return (
    <span className="inline-flex h-lg items-center rounded-full px-sm text-xs font-medium" style={{ backgroundColor: s.bg, color: s.ink }}>
      {children}
    </span>
  )
}

const Stift = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" style={{ flexShrink: 0, color: 'var(--color-fg-subtle)' }}>
    <path d="M10.8 2.6l2.6 2.6L6 12.6 2.8 13.2l.6-3.2z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)

/* ── Profil und Arbeitsweise ───────────────────────────────────────────── */

function Profil() {
  return (
    <div className="mx-auto w-[816px] pt-[36px] pb-[40px]">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="[font-family:var(--font-display)] text-[26px] font-semibold leading-[34px] tracking-tight [color:var(--color-fg)]"
      >
        Profil und Arbeitsweise
      </motion.div>
      <div className="pt-[6px] text-[16px] leading-[22px] [color:var(--color-fg-muted)]">
        Wie Sie arbeiten — und woran ENSERA sich in jedem Fall ausrichtet.
      </div>

      <div className="flex items-baseline justify-between pt-[30px] pb-sm">
        <div className="text-md font-semibold leading-[22px] tracking-tight [color:var(--color-fg)]">Profil</div>
        <Label>SICHTBAR FÜR IHRE KUNDSCHAFT</Label>
      </div>
      <div className="overflow-clip rounded-lg border [background-color:var(--color-surface)] [border-color:var(--color-border)]">
        <Zeile
          titel="Foto"
          text="Erscheint im Klientenportal und auf jedem Beratungsbericht"
          rechts={<img src="./assets/katrin-portal.jpg" alt="" className="size-[38px] rounded-full object-cover" />}
        />
        <Zeile
          titel="Name und Titel"
          text="So unterzeichnet ENSERA Schreiben in Ihrem Namen"
          rechts={
            <>
              <span className="text-[15px] [color:var(--color-fg)]">Katrin Held, Dipl.-Ing. (FH)</span>
              <Stift />
            </>
          }
        />
        <Zeile
          titel="Energie-Effizienz-Experten-Nummer"
          text="Wird in jeden Förderantrag und jede Bestätigung übernommen"
          rechts={
            <>
              <span className="text-[15px] [color:var(--color-fg)]">EEE 184 992</span>
              <Marke ton="gruen">GÜLTIG BIS 03/2027</Marke>
            </>
          }
        />
        <Zeile
          titel="Eintragungen in der Expertenliste"
          text="ENSERA schlägt nur Förderwege vor, für die Sie gelistet sind"
          letzte
          rechts={
            <>
              <Marke>Wohngebäude</Marke>
              <Marke>Einzelmaßnahmen</Marke>
              <Marke>Heizungstechnik</Marke>
            </>
          }
        />
      </div>

      <div className="flex items-baseline justify-between pt-[30px] pb-sm">
        <div className="text-md font-semibold leading-[22px] tracking-tight [color:var(--color-fg)]">Arbeitsweise</div>
        <Label>VORGABE FÜR JEDEN NEUEN FALL</Label>
      </div>
      <div className="overflow-clip rounded-lg border [background-color:var(--color-surface)] [border-color:var(--color-border)]">
        <Zeile
          titel="Standard-Projektvorlage"
          text="Schritte, Fristen und Pflichtunterlagen eines neuen Falls kommen daraus"
          rechts={<Auswahl wert="iSFP · Ein- und Zweifamilienhaus" optionen={['iSFP · Ein- und Zweifamilienhaus', 'Einzelmaßnahme Heizung', 'Mehrfamilienhaus · WEG', 'Nichtwohngebäude']} />}
        />
        <Zeile
          titel="Arbeitszeiten"
          text="ENSERA verschickt ausserhalb dieser Zeiten nichts — Entwürfe warten bis zum nächsten Morgen"
          rechts={<Auswahl wert="Mo – Fr · 08:00 – 17:00" optionen={['Mo – Fr · 08:00 – 17:00', 'Mo – Fr · 07:00 – 15:00', 'Mo – Sa · 09:00 – 18:00', 'Jederzeit']} />}
        />
        <Zeile
          titel="Fallkapazität"
          text="Darüber meldet ENSERA neue Anfragen nur noch, statt sie vorzubereiten"
          rechts={<Auswahl wert="14 aktive Fälle" optionen={['10 aktive Fälle', '14 aktive Fälle', '20 aktive Fälle', 'Ohne Grenze']} />}
        />
        <Zeile
          titel="Beratungsgebiet"
          text="Anfragen ausserhalb werden gemeldet, aber nicht vorbereitet"
          rechts={
            <>
              <Marke ton="brand">Region Hannover</Marke>
              <Marke>LK Hildesheim</Marke>
              <Label>BIS 60 KM</Label>
            </>
          }
        />
        <Zeile
          titel="Honorarsatz und Fahrtkosten"
          text="Grundlage für Angebote, Honorarrechnungen und die Förderquote im Angebot"
          rechts={
            <>
              <span className="text-[15px] [color:var(--color-fg)]">145,00 € / h</span>
              <span className="text-[15px] [color:var(--color-fg-subtle)]">0,42 € / km</span>
              <Stift />
            </>
          }
        />
        <Zeile
          titel="Rückmeldefrist gegenüber Kundschaft"
          text="Bleibt eine Frage länger offen, hebt ENSERA sie auf „Heute relevant“"
          letzte
          rechts={<Auswahl wert="2 Werktage" optionen={['1 Werktag', '2 Werktage', '3 Werktage', '5 Werktage']} />}
        />
      </div>

      <div className="flex items-center gap-xs pt-lg">
        <svg width="14" height="14" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="6.2" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.2" />
          <path d="M8 7.2v4M8 4.9v.1" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <div className="text-[14px] [color:var(--color-fg-muted)]">
          Änderungen gelten ab dem nächsten neuen Fall. Laufende Fälle behalten die Vorlage, mit der sie angelegt wurden.
        </div>
      </div>
    </div>
  )
}

/* ── Projektvorlagen ───────────────────────────────────────────────────── */

interface Vorlage {
  id: string
  name: string
  weg: string
  schritte: number
  unterlagen: number
  fristen: number
  faelle: number
  standard?: boolean
}

const VORLAGEN: Vorlage[] = [
  { id: 'v1', name: 'iSFP · Ein- und Zweifamilienhaus', weg: 'BAFA EBW · iSFP', schritte: 6, unterlagen: 9, fristen: 4, faelle: 5, standard: true },
  { id: 'v2', name: 'Einzelmaßnahme Heizung', weg: 'KfW 458', schritte: 8, unterlagen: 12, fristen: 6, faelle: 3 },
  { id: 'v3', name: 'Einzelmaßnahme Gebäudehülle', weg: 'BAFA BEG EM', schritte: 7, unterlagen: 10, fristen: 5, faelle: 2 },
  { id: 'v4', name: 'Mehrfamilienhaus · WEG', weg: 'KfW 261', schritte: 11, unterlagen: 18, fristen: 8, faelle: 1 },
  { id: 'v5', name: 'Nichtwohngebäude', weg: 'BAFA EBN', schritte: 9, unterlagen: 14, fristen: 6, faelle: 0 },
  { id: 'v6', name: 'Baubegleitung', weg: 'KfW 431', schritte: 5, unterlagen: 7, fristen: 3, faelle: 1 },
  { id: 'v7', name: 'Nur Erstberatung', weg: 'Ohne Förderung', schritte: 3, unterlagen: 3, fristen: 1, faelle: 0 },
  { id: 'v8', name: 'Verwendungsnachweis nachreichen', weg: 'KfW 458', schritte: 4, unterlagen: 5, fristen: 2, faelle: 0 },
]

const SCHRITTE_V1 = [
  { nr: '01', titel: 'Erstgespräch', wer: 'GEMEINSAM', frist: 'Startdatum', pflicht: 0 },
  { nr: '02', titel: 'Vertrag und Vollmacht', wer: 'KUNDSCHAFT', frist: '+3 Werktage', pflicht: 2 },
  { nr: '03', titel: 'Unterlagen', wer: 'KUNDSCHAFT', frist: '+21 Tage', pflicht: 9 },
  { nr: '04', titel: 'Vor-Ort-Termin', wer: 'GEMEINSAM', frist: 'nach Unterlagen', pflicht: 1 },
  { nr: '05', titel: 'Sanierungsfahrplan', wer: 'SIE', frist: '+21 Tage', pflicht: 3 },
  { nr: '06', titel: 'Ergebnisgespräch und Förderantrag', wer: 'GEMEINSAM', frist: '+7 Tage', pflicht: 4 },
]

function Vorlagen() {
  const { toast } = useDemo()
  const [offen, setOffen] = useState<string | null>('v1')

  return (
    <div className="mx-auto w-[816px] pt-[36px] pb-[40px]">
      <div className="flex items-start justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="[font-family:var(--font-display)] text-[26px] font-semibold leading-[34px] tracking-tight [color:var(--color-fg)]"
          >
            Projektvorlagen
          </motion.div>
          <div className="pt-[6px] text-[16px] leading-[22px] [color:var(--color-fg-muted)]">
            Jeder neue Fall entsteht aus einer Vorlage — Schritte, Fristen und Pflichtunterlagen kommen daraus.
          </div>
        </div>
        <button
          onClick={() => toast({ title: 'Neue Vorlage angelegt', body: 'ENSERA hat die Standardschritte vorgeschlagen.' })}
          className="flex h-[36px] shrink-0 items-center gap-xs rounded-full px-md text-sm font-semibold transition-colors [background-color:var(--color-brand)] [color:var(--color-brand-fg)] hover:[background-color:var(--color-brand-hover)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M7 2.4v9.2M2.4 7h9.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Vorlage anlegen
        </button>
      </div>

      <div className="flex items-center gap-md pt-[30px] pb-xs">
        <div className="grow basis-0"><Label>VORLAGE</Label></div>
        <div className="w-[150px] shrink-0"><Label>FÖRDERWEG</Label></div>
        <div className="w-[190px] shrink-0"><Label>UMFANG</Label></div>
        <div className="w-[90px] shrink-0 text-right"><Label>IN NUTZUNG</Label></div>
        <div className="w-[16px] shrink-0" />
      </div>

      <div className="overflow-clip rounded-lg border [background-color:var(--color-surface)] [border-color:var(--color-border)]">
        {VORLAGEN.map((v, i) => {
          const auf = offen === v.id
          return (
            <div key={v.id} className={i < VORLAGEN.length - 1 ? 'border-b [border-color:var(--color-border-subtle)]' : ''}>
              <button
                onClick={() => setOffen(auf ? null : v.id)}
                className="flex w-full items-center gap-md px-md py-[14px] text-left transition-colors hover:[background-color:color-mix(in_oklab,var(--color-surface-sunken)_60%,transparent)]"
              >
                <div className="flex grow basis-0 items-center gap-sm">
                  <div className="text-[15px] leading-[20px] [color:var(--color-fg)]">{v.name}</div>
                  {v.standard && <Marke ton="brand">STANDARD</Marke>}
                </div>
                <div className="w-[150px] shrink-0 text-[14px] [color:var(--color-fg-muted)]">{v.weg}</div>
                <div className="w-[190px] shrink-0">
                  <Label>{v.schritte} SCHRITTE · {v.unterlagen} UNTERLAGEN · {v.fristen} FRISTEN</Label>
                </div>
                <div className="w-[90px] shrink-0 text-right text-[14px] [color:var(--color-fg-muted)]">
                  {v.faelle > 0 ? v.faelle + ' Fälle' : '—'}
                </div>
                <motion.div animate={{ rotate: auf ? 180 : 0 }} transition={{ duration: 0.25 }} className="w-[16px] shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <path d="M3.2 5.2L7 9l3.8-3.8" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {auf && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: EASE }}
                    className="overflow-hidden [background-color:var(--color-surface-sunken)]"
                  >
                    <div className="px-md pt-sm pb-md">
                      <div className="flex items-center justify-between pb-xs">
                        <Label>SCHRITTE DIESER VORLAGE</Label>
                        <button
                          onClick={() => toast({ title: 'Vorlage bearbeitet', body: 'Änderungen gelten für neue Fälle.' })}
                          className="text-sm font-medium [color:var(--color-brand)] hover:underline"
                        >
                          Schritte bearbeiten
                        </button>
                      </div>
                      <div className="overflow-clip rounded-md border [background-color:var(--color-surface)] [border-color:var(--color-border)]">
                        {SCHRITTE_V1.slice(0, v.schritte).map((s, k) => (
                          <div
                            key={s.nr}
                            className={'flex items-center gap-md px-sm py-[10px]' + (k < Math.min(v.schritte, SCHRITTE_V1.length) - 1 ? ' border-b [border-color:var(--color-border-subtle)]' : '')}
                          >
                            <div className="w-lg shrink-0 [font-family:var(--font-mono)] text-xs [color:var(--color-fg-subtle)]">{s.nr}</div>
                            <div className="grow basis-0 text-[14px] leading-[18px] [color:var(--color-fg)]">{s.titel}</div>
                            <div className="w-[120px] shrink-0"><Label>{s.wer}</Label></div>
                            <div className="w-[130px] shrink-0 text-[13px] [color:var(--color-fg-muted)]">{s.frist}</div>
                            <div className="w-[110px] shrink-0 text-right">
                              <Label>{s.pflicht > 0 ? s.pflicht + ' PFLICHTUNTERLAGEN' : 'OHNE UNTERLAGEN'}</Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-xs pt-lg">
        <svg width="14" height="14" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="6.2" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.2" />
          <path d="M8 7.2v4M8 4.9v.1" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <div className="text-[14px] [color:var(--color-fg-muted)]">
          Laufende Fälle behalten ihre Vorlage. Wer nachziehen soll, lässt sich im Fall einzeln umstellen.
        </div>
      </div>
    </div>
  )
}

/* ── Bildschirm ────────────────────────────────────────────────────────── */

export default function Einstellungen({ ansicht }: { ansicht: 'profil' | 'vorlagen' }) {
  return (
    <AppShell>
      <Nav aktiv={ansicht === 'vorlagen' ? '/app/einstellungen/vorlagen' : '/app/einstellungen'} />
      <div className="scrollbar-slim flex-1 overflow-y-auto [background-color:var(--color-surface)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={ansicht} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: EASE }}>
            {ansicht === 'profil' ? <Profil /> : <Vorlagen />}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  )
}
