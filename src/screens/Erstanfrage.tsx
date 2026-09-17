import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { navigate } from '../lib/router'
import { useDemo } from '../lib/store'

/* ── Schritt-Symbole (40px) ────────────────────────────────────────────── */

const HeaderHaus = (
  <svg width="40" height="40" viewBox="0 0 40 40">
    <path d="M5.5 17.8 20 6.2l14.5 11.6" fill="none" stroke="var(--color-accent-sky)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.4 20.6v13.2h21.2V20.6" fill="none" stroke="var(--color-accent-sky)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.4 33.8v-8.6h7.2v8.6" fill="none" stroke="var(--color-accent-sky)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const HeaderKlemmbrett = (
  <svg width="40" height="40" viewBox="0 0 40 40">
    <path d="M14.6 7.8h-4.2a2.6 2.6 0 0 0-2.6 2.6v21.4a2.6 2.6 0 0 0 2.6 2.6h19.2a2.6 2.6 0 0 0 2.6-2.6V10.4a2.6 2.6 0 0 0-2.6-2.6h-4.2" fill="none" stroke="var(--color-accent-amber)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="14.6" y="4.8" width="10.8" height="6" rx="2" fill="none" stroke="var(--color-accent-amber)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 19.6h12M14 25.4h8.4" fill="none" stroke="var(--color-accent-amber)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const HeaderKalender = (
  <svg width="40" height="40" viewBox="0 0 40 40">
    <rect x="5.5" y="8.6" width="29" height="25.4" rx="3.2" fill="none" stroke="var(--color-accent-violet)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.5 16.4h29" fill="none" stroke="var(--color-accent-violet)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.4 5.4v6M26.6 5.4v6" fill="none" stroke="var(--color-accent-violet)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.6 23.4h3.2M13.6 28.8h3.2M23.2 23.4h3.2" fill="none" stroke="var(--color-accent-violet)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const HeaderBrief = (
  <svg width="40" height="40" viewBox="0 0 40 40">
    <rect x="4.6" y="9.2" width="30.8" height="21.6" rx="3.2" fill="none" stroke="var(--color-accent-green)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.8 11.4 20 21.6l14.2-10.2" fill="none" stroke="var(--color-accent-green)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ── Options-Symbole (22px) ────────────────────────────────────────────── */

const sky = 'var(--color-accent-sky)'
const amber = 'var(--color-accent-amber)'
const violet = 'var(--color-accent-violet)'
const O = { fill: 'none', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
const O8 = { ...O, strokeWidth: 1.8 }

const Opt = ({ children }: { children: React.ReactNode }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    {children}
  </svg>
)

const GEBAEUDE = [
  {
    titel: 'Einfamilienhaus',
    text: 'Eine Wohneinheit, freistehend oder Reihenhaus',
    icon: (
      <Opt>
        <path d="M3.4 10.3 12 3.5l8.6 6.8" stroke={sky} {...O} />
        <path d="M5.8 12.1v8.4h12.4v-8.4" stroke={sky} {...O} />
        <path d="M9.9 20.5v-5.2h4.2v5.2" stroke={sky} {...O} />
      </Opt>
    ),
  },
  {
    titel: 'Zweifamilienhaus',
    text: 'Zwei Wohneinheiten, etwa mit Einliegerwohnung',
    icon: (
      <Opt>
        <path d="M3.4 10.3 12 3.5l8.6 6.8" stroke={sky} {...O} />
        <path d="M5.8 12.1v8.4h12.4v-8.4" stroke={sky} {...O} />
        <path d="M12 20.5v-8.4" stroke={sky} {...O} />
      </Opt>
    ),
  },
  {
    titel: 'Mehrfamilienhaus',
    text: 'Ab drei Wohneinheiten, auch mit Eigentümergemeinschaft',
    icon: (
      <Opt>
        <path d="M5.4 20.5V4.6h13.2v15.9" stroke={sky} {...O} />
        <path d="M3 20.5h18" stroke={sky} {...O} />
        <path d="M8.6 8.4h1.6M13.8 8.4h1.6M8.6 12.4h1.6M13.8 12.4h1.6" stroke={sky} {...O} />
        <path d="M10.2 20.5v-3.6h3.6v3.6" stroke={sky} {...O} />
      </Opt>
    ),
  },
  {
    titel: 'Gewerbe',
    text: 'Nichtwohngebäude — eigene Förderkulisse',
    icon: (
      <Opt>
        <path d="M3.6 9.4 5.3 4.4h13.4l1.7 5" stroke={sky} {...O} />
        <path d="M5.8 9.4v11.1h12.4V9.4" stroke={sky} {...O} />
        <path d="M3.6 9.4h16.8" stroke={sky} {...O} />
        <path d="M9.4 20.5v-6.4h5.2v6.4" stroke={sky} {...O} />
      </Opt>
    ),
  },
]

const VORHABEN = [
  {
    titel: 'Sanierungsfahrplan',
    text: 'Der ganze Weg in Etappen, mit Förderung für jeden Schritt',
    icon: (
      <Opt>
        <path d="M6.2 3.6h7.6l4.6 4.6v12.2H6.2z" stroke={amber} {...O8} />
        <path d="M13.6 3.6v4.8h4.8" stroke={amber} {...O8} />
        <path d="M9.2 13h6M9.2 16.6h4" stroke={amber} {...O8} />
      </Opt>
    ),
  },
  {
    titel: 'Einzelne Maßnahme',
    text: 'Ein konkretes Vorhaben — Dach, Fenster oder Fassade',
    icon: (
      <Opt>
        <circle cx="12" cy="12" r="8.4" stroke={amber} {...O8} />
        <circle cx="12" cy="12" r="3.9" stroke={amber} {...O8} />
        <circle cx="12" cy="12" r="0.6" fill={amber} stroke={amber} strokeWidth="1.8" />
      </Opt>
    ),
  },
  {
    titel: 'Heizung tauschen',
    text: 'Alte Anlage raus, neue rein — meist die größte Förderung',
    icon: (
      <Opt>
        <path d="M12 3.2s5.6 4.7 5.6 9.5A5.6 5.6 0 0 1 12 20.6a5.6 5.6 0 0 1-5.6-7.9C6.4 8 12 3.2 12 3.2Z" stroke={amber} {...O8} />
        <path d="M12 20.6a2.7 2.7 0 0 0 2.7-2.7c0-2-2.7-3.8-2.7-3.8s-2.7 1.8-2.7 3.8A2.7 2.7 0 0 0 12 20.6Z" stroke={amber} {...O8} />
      </Opt>
    ),
  },
  {
    titel: 'Weiß ich noch nicht',
    text: 'Dann sortieren wir das im Erstgespräch gemeinsam',
    icon: (
      <Opt>
        <circle cx="12" cy="12" r="8.6" stroke={amber} {...O8} />
        <path d="M9.5 9.4a2.6 2.6 0 0 1 5 1c0 1.8-2.5 2.2-2.5 3.9" stroke={amber} {...O8} />
        <path d="M12 17.4h0.01" stroke={amber} {...O8} />
      </Opt>
    ),
  },
]

const ZEITPUNKT = [
  {
    titel: 'So schnell wie möglich',
    text: 'Kaputte Anlage oder laufende Frist — ich melde mich heute',
    icon: (
      <Opt>
        <path d="M13.4 2.8 5.2 13.4h6.1l-.7 7.8 8.2-10.6h-6.1z" stroke={violet} {...O8} />
      </Opt>
    ),
  },
  {
    titel: 'In drei bis sechs Monaten',
    text: 'Genug Vorlauf für Antrag, Angebote und Handwerkertermine',
    icon: (
      <Opt>
        <rect x="3.4" y="5.2" width="17.2" height="15.4" rx="2.2" stroke={violet} {...O8} />
        <path d="M3.4 9.8h17.2" stroke={violet} {...O8} />
        <path d="M8.2 3.2v3.8M15.8 3.2v3.8" stroke={violet} {...O8} />
        <path d="M11 14.2h2.4" stroke={violet} {...O8} />
      </Opt>
    ),
  },
  {
    titel: 'Erst mal nur informieren',
    text: 'Kein Druck — Sie bekommen trotzdem eine ehrliche Einschätzung',
    icon: (
      <Opt>
        <path d="M1.9 12S5.8 5.6 12 5.6 22.1 12 22.1 12 18.2 18.4 12 18.4 1.9 12 1.9 12Z" stroke={violet} {...O8} />
        <circle cx="12" cy="12" r="3.1" stroke={violet} {...O8} />
      </Opt>
    ),
  },
]

/* ── Bausteine ─────────────────────────────────────────────────────────── */

const SCHRITTE = ['gebaeude', 'vorhaben', 'zeitpunkt', 'anliegen'] as const
type SchrittName = (typeof SCHRITTE)[number]

function Marke() {
  return (
    <div className="absolute left-[40px] top-[36px] flex items-center gap-[9px]">
      <div className="flex size-[20px] shrink-0 items-center justify-center rounded-[6px] [background-color:var(--color-fg)]">
        <div className="size-[7px] shrink-0 rounded-[2px] [background-color:var(--color-canvas)]" />
      </div>
      <div className="text-[14px] font-semibold leading-[18px] tracking-mono [color:var(--color-fg)]">Energieberatung Held</div>
    </div>
  )
}

function Fuss() {
  return (
    <div className="absolute inset-x-0 bottom-[40px] flex items-center justify-center gap-[7px]">
      <svg width="13" height="13" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
        <path d="M5.5 10.5h13v10h-13z" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.6 10.5V7.4a3.4 3.4 0 0 1 6.8 0v3.1" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="text-sm leading-md [color:var(--color-fg-subtle)]">Verschlüsselt übertragen · kein Konto nötig · jederzeit abbrechbar</div>
    </div>
  )
}

function Zurueck({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Zurück"
      className="absolute left-[396px] top-[166px] flex size-xl items-center justify-center rounded-full border transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border)] hover:[background-color:var(--color-surface-sunken)]"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
        <path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="var(--color-fg-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

function Balken({ aktiv }: { aktiv: number }) {
  return (
    <div className="mt-[20px] flex gap-[5px]">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="h-[3px] w-[40px] shrink-0 rounded-full"
          animate={{ backgroundColor: i <= aktiv ? '#12161B' : '#E4E8EC' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  )
}

function Auswahl({
  optionen,
  wert,
  onWaehle,
}: {
  optionen: Array<{ titel: string; text: string; icon: React.ReactNode }>
  wert: string
  onWaehle: (t: string) => void
}) {
  return (
    <div className="mt-[28px] flex w-[520px] flex-col gap-xs">
      {optionen.map((o, i) => {
        const aktiv = o.titel === wert
        return (
          <motion.button
            key={o.titel}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onWaehle(o.titel)}
            className="flex w-[520px] items-center gap-[14px] rounded-[10px] px-md py-[15px] text-left transition-shadow [background-color:var(--color-surface)]"
            style={{
              border: aktiv ? '1.5px solid var(--color-brand)' : '1px solid var(--color-border)',
              padding: aktiv ? '14.5px 15.5px' : '15px 16px',
              boxShadow: aktiv ? '0 0 0 3px rgba(31,70,216,0.08)' : 'none',
            }}
          >
            <div className="flex size-lg shrink-0 items-center justify-center">{o.icon}</div>
            <div className="flex grow flex-col">
              <div className="text-base font-semibold leading-[21px] tracking-mono [color:var(--color-fg)]">{o.titel}</div>
              <div className="mt-px text-sm leading-[18px] [color:var(--color-fg-muted)]">{o.text}</div>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}

function Weiter({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group mt-[28px] flex h-[42px] w-[520px] shrink-0 items-center justify-center gap-xs rounded-[10px] transition-colors [background-color:var(--color-brand)] hover:[background-color:var(--color-brand-hover)]"
    >
      <span className="text-base font-semibold leading-[18px] tracking-[-0.005em] [color:var(--color-brand-fg)]">{label}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-[3px]">
        <svg width="15" height="15" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
          <path d="M4.5 12h14.5" fill="none" stroke="var(--color-brand-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 6.2 19 12l-6 5.8" fill="none" stroke="var(--color-brand-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  )
}

/* ── Bildschirm ────────────────────────────────────────────────────────── */

export default function Erstanfrage({ schritt }: { schritt: SchrittName | 'gesendet' }) {
  const { anfrage, setAnfrage, sendeAnfrage, toast } = useDemo()
  const [richtung, setRichtung] = useState(1)

  const idx = SCHRITTE.indexOf(schritt as SchrittName)

  const geh = (zu: SchrittName | 'gesendet', dir: number) => {
    setRichtung(dir)
    navigate('/anfrage/' + zu)
  }

  const inhalt = useMemo(() => {
    switch (schritt) {
      case 'gebaeude':
        return {
          kopf: HeaderHaus,
          titel: 'Um welches Gebäude geht es?',
          unter: 'Damit ich weiß, welche Förderung überhaupt in Frage kommt.',
          body: <Auswahl optionen={GEBAEUDE} wert={anfrage.gebaeude} onWaehle={(t) => setAnfrage({ gebaeude: t })} />,
          cta: 'Weiter',
          next: () => geh('vorhaben', 1),
          back: null,
        }
      case 'vorhaben':
        return {
          kopf: HeaderKlemmbrett,
          titel: 'Was steht bei Ihnen an?',
          unter: 'Noch nichts entschieden? Das letzte Feld ist eine völlig normale Antwort.',
          body: <Auswahl optionen={VORHABEN} wert={anfrage.vorhaben} onWaehle={(t) => setAnfrage({ vorhaben: t })} />,
          cta: 'Weiter',
          next: () => geh('zeitpunkt', 1),
          back: () => geh('gebaeude', -1),
        }
      case 'zeitpunkt':
        return {
          kopf: HeaderKalender,
          titel: 'Wann soll es losgehen?',
          unter: 'Förderanträge brauchen Vorlauf — danach plane ich Ihren Termin.',
          body: <Auswahl optionen={ZEITPUNKT} wert={anfrage.zeitpunkt} onWaehle={(t) => setAnfrage({ zeitpunkt: t })} />,
          cta: 'Weiter',
          next: () => geh('anliegen', 1),
          back: () => geh('vorhaben', -1),
        }
      default:
        return {
          kopf: HeaderBrief,
          titel: 'Erzählen Sie kurz, worum es geht.',
          unter: 'Zwei Sätze genügen. Was stört, was Sie vorhaben, was Sie schon wissen.',
          body: <Anliegen />,
          cta: 'Anfrage senden',
          next: () => {
            sendeAnfrage()
            toast({ title: 'Anfrage übermittelt', body: 'Katrin Held hat Ihre Anfrage erhalten.', tone: 'success' })
            geh('gesendet', 1)
          },
          back: () => geh('zeitpunkt', -1),
        }
    }
  }, [schritt, anfrage]) // eslint-disable-line react-hooks/exhaustive-deps

  function Anliegen() {
    return (
      <div className="mt-[28px] flex w-[520px] flex-col gap-[22px]">
        <div className="flex w-[520px] flex-col items-end">
          <textarea
            value={anfrage.text}
            onChange={(e) => setAnfrage({ text: e.target.value })}
            className="scrollbar-slim h-[132px] w-[520px] shrink-0 resize-none rounded-[10px] border px-md py-[14px] text-base leading-[23px] outline-none transition-shadow [background-color:var(--color-surface)] [border-color:var(--color-border)] [color:var(--color-fg)] focus:[border-color:var(--color-brand)] focus:shadow-[0_0_0_3px_rgba(31,70,216,0.08)]"
          />
          <div className="mt-[7px] [font-family:var(--font-mono)] text-2xs leading-[14px] tracking-wide [color:var(--color-fg-subtle)]">
            {anfrage.text.length} Zeichen
          </div>
        </div>
        <div className="flex w-[520px] flex-col gap-sm">
          <div className="text-base font-semibold leading-[18px] tracking-mono [color:var(--color-fg)]">Wohin schicke ich die Antwort?</div>
          <div className="flex w-[520px] gap-[10px]">
            <input
              value={anfrage.name}
              onChange={(e) => setAnfrage({ name: e.target.value })}
              className="h-[44px] w-[255px] shrink-0 rounded-[10px] border px-[14px] text-base leading-[18px] outline-none transition-shadow [background-color:var(--color-surface)] [border-color:var(--color-border)] focus:[border-color:var(--color-brand)] focus:shadow-[0_0_0_3px_rgba(31,70,216,0.08)]"
            />
            <input
              value={anfrage.ort}
              onChange={(e) => setAnfrage({ ort: e.target.value })}
              className="h-[44px] w-[255px] shrink-0 rounded-[10px] border px-[14px] text-base leading-[18px] outline-none transition-shadow [background-color:var(--color-surface)] [border-color:var(--color-border)] focus:[border-color:var(--color-brand)] focus:shadow-[0_0_0_3px_rgba(31,70,216,0.08)]"
            />
          </div>
          <div className="flex h-[44px] w-[520px] shrink-0 items-center gap-[10px] rounded-[10px] border px-[14px] [background-color:var(--color-surface)] [border-color:var(--color-border)] focus-within:[border-color:var(--color-brand)]">
            <svg width="17" height="17" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <rect x="2.8" y="5.4" width="18.4" height="13.2" rx="2" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.6 6.8 12 13l8.4-6.2" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              value={anfrage.mail}
              onChange={(e) => setAnfrage({ mail: e.target.value })}
              className="grow text-base leading-[18px] outline-none [color:var(--color-fg)]"
            />
            <div className="shrink-0 text-xs font-medium leading-md [color:var(--color-fg-subtle)]">Hierhin geht der Zugang</div>
          </div>
        </div>
      </div>
    )
  }

  if (schritt === 'gesendet') return <Gesendet />

  return (
    <div className="relative flex h-full min-h-full flex-col items-center overflow-clip pt-[162px] [background-color:var(--color-canvas)]">
      <Marke />
      {inhalt.back && <Zurueck onClick={inhalt.back} />}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={schritt}
          initial={{ opacity: 0, x: richtung * 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: richtung * -28 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex w-[520px] flex-col items-start"
        >
          <div className="size-[40px] shrink-0">{inhalt.kopf}</div>
          <Balken aktiv={idx} />
          <div className="mt-[26px] flex w-[520px] flex-col">
            <div className="[font-family:var(--font-display)] text-2xl font-semibold leading-[36px] tracking-[-0.025em] [color:var(--color-fg)]">
              {inhalt.titel}
            </div>
            <div className="mt-[7px] text-base leading-[22px] [color:var(--color-fg-muted)]">{inhalt.unter}</div>
          </div>
          {inhalt.body}
          <Weiter label={inhalt.cta} onClick={inhalt.next} />
        </motion.div>
      </AnimatePresence>
      <Fuss />
    </div>
  )
}

/* ── Bestätigung ───────────────────────────────────────────────────────── */

function Gesendet() {
  const { anfrage } = useDemo()
  return (
    <div className="relative flex h-full min-h-full flex-col items-center overflow-clip pt-[186px] [background-color:var(--color-canvas)]">
      <Marke />
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-[520px] flex-col items-start"
      >
        <motion.svg
          width="40" height="40" viewBox="0 0 40 40"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
        >
          <circle cx="20" cy="20" r="17" fill="none" stroke="var(--color-accent-green)" strokeWidth="1.9" />
          <motion.path
            d="M12.6 20.4 17.6 25.4 27.6 14.8"
            fill="none"
            stroke="var(--color-accent-green)"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          />
        </motion.svg>
        <div className="mt-[26px] [font-family:var(--font-display)] text-2xl font-semibold leading-[36px] tracking-[-0.025em] [color:var(--color-fg)]">
          Danke — Ihre Anfrage ist da.
        </div>
        <div className="mt-[7px] w-[520px] text-base leading-[22px] [color:var(--color-fg-muted)]">
          Katrin Held sieht sie in ihrem Eingang. Sie meldet sich in der Regel am selben Werktag. Eine Bestätigung ist an {anfrage.mail} unterwegs.
        </div>

        <div className="mt-[28px] w-[520px] rounded-[10px] border p-md [background-color:var(--color-surface-sunken)] [border-color:var(--color-border)]">
          <div className="[font-family:var(--font-mono)] text-2xs leading-[14px] tracking-caps [color:var(--color-fg-subtle)]">WAS SIE GESCHICKT HABEN</div>
          <div className="mt-sm flex flex-col gap-xs">
            {[
              ['Gebäude', anfrage.gebaeude],
              ['Vorhaben', anfrage.vorhaben],
              ['Zeitraum', anfrage.zeitpunkt],
              ['Antwort an', anfrage.mail],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-md">
                <div className="w-[96px] shrink-0 text-sm leading-[18px] [color:var(--color-fg-subtle)]">{k}</div>
                <div className="grow text-sm leading-[18px] [color:var(--color-fg)]">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/app/anfragen')}
          className="group mt-[28px] flex h-[42px] w-[520px] items-center justify-center gap-xs rounded-[10px] border transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]"
        >
          <span className="text-base font-semibold leading-[18px] [color:var(--color-fg)]">Weiter zur Sicht der Beraterin</span>
          <span className="transition-transform duration-300 group-hover:translate-x-[3px]">
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path d="M4.5 12h14.5" fill="none" stroke="var(--color-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 6.2 19 12l-6 5.8" fill="none" stroke="var(--color-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </motion.div>
      <Fuss />
    </div>
  )
}
