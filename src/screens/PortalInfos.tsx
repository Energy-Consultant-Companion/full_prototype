import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE } from '../components/ui'
import { navigate } from '../lib/router'
import { useDemo } from '../lib/store'

/* Sechs kurze Schritte, mit denen die Kundschaft im Portal die
   Gebäudedaten ergänzt. Gleiches Muster wie die Erstanfrage. */

const sky = 'var(--color-accent-sky)'

const Haus40 = (
  <svg width="40" height="40" viewBox="0 0 40 40">
    <path d="M5.5 17.8 20 6.2l14.5 11.6" fill="none" stroke={sky} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.4 20.6v13.2h21.2V20.6" fill="none" stroke={sky} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.4 33.8v-8.6h7.2v8.6" fill="none" stroke={sky} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Flamme40 = (
  <svg width="40" height="40" viewBox="0 0 40 40">
    <path d="M20 5.4s9.4 7.8 9.4 15.8A9.4 9.4 0 0 1 20 34.6a9.4 9.4 0 0 1-9.4-13.4C10.6 13.2 20 5.4 20 5.4Z" fill="none" stroke={sky} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 34.6a4.5 4.5 0 0 0 4.5-4.5c0-3.4-4.5-6.4-4.5-6.4s-4.5 3-4.5 6.4A4.5 4.5 0 0 0 20 34.6Z" fill="none" stroke={sky} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Dach40 = (
  <svg width="40" height="40" viewBox="0 0 40 40">
    <path d="M4 20 20 6.6 36 20" fill="none" stroke={sky} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.8 24.2h22.4M8.8 29h22.4M8.8 33.8h22.4" fill="none" stroke={sky} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const Fenster40 = (
  <svg width="40" height="40" viewBox="0 0 40 40">
    <rect x="7" y="6.4" width="26" height="27.2" rx="2.6" fill="none" stroke={sky} strokeWidth="1.8" />
    <path d="M20 6.4v27.2M7 20h26" fill="none" stroke={sky} strokeWidth="1.5" />
  </svg>
)
const Kurve40 = (
  <svg width="40" height="40" viewBox="0 0 40 40">
    <path d="M6 32h28" fill="none" stroke={sky} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7.5 27.4 15 19l5.6 5.4L33 10" fill="none" stroke={sky} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M26.6 9.6H33v6.4" fill="none" stroke={sky} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Leute40 = (
  <svg width="40" height="40" viewBox="0 0 40 40">
    <circle cx="15.6" cy="14" r="5.2" fill="none" stroke={sky} strokeWidth="1.8" />
    <path d="M5.6 33.2a10 10 0 0 1 20 0" fill="none" stroke={sky} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M26 10.4a5 5 0 0 1 0 9.6M28.6 33.2a9.6 9.6 0 0 0-3.4-7.4" fill="none" stroke={sky} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

type Feld = { key: string; label: string; wert: string; suffix?: string }
type Wahl = { key: string; label: string; optionen: string[] }

interface Schritt {
  icon: React.ReactNode
  titel: string
  unter: string
  felder?: Feld[]
  wahlen?: Wahl[]
}

const SCHRITTE: Schritt[] = [
  {
    icon: Haus40,
    titel: 'Ein paar Eckdaten zum Haus.',
    unter: 'Aus Baujahr und Fläche ergibt sich fast alles Weitere.',
    felder: [
      { key: 'baujahr', label: 'Baujahr', wert: '1972' },
      { key: 'flaeche', label: 'Wohnfläche', wert: '148 m²' },
      { key: 'einheiten', label: 'Wohneinheiten', wert: '1' },
    ],
    wahlen: [{ key: 'denkmal', label: 'Steht das Haus unter Denkmalschutz?', optionen: ['Ja', 'Nein', 'Weiß ich nicht'] }],
  },
  {
    icon: Flamme40,
    titel: 'Was heizt gerade?',
    unter: 'Alter und Brennstoff entscheiden über die Förderhöhe.',
    felder: [
      { key: 'anlage', label: 'Baujahr der Anlage', wert: '1998' },
      { key: 'leistung', label: 'Leistung', wert: '24 kW' },
    ],
    wahlen: [
      { key: 'brennstoff', label: 'Brennstoff', optionen: ['Öl', 'Gas', 'Fernwärme', 'Strom'] },
      { key: 'warmwasser', label: 'Warmwasser', optionen: ['Über die Heizung', 'Elektrisch', 'Weiß ich nicht'] },
    ],
  },
  {
    icon: Dach40,
    titel: 'Dach und Außenwände.',
    unter: 'Wenn Sie es nicht sicher wissen, schaue ich es beim Termin an.',
    wahlen: [
      { key: 'dach', label: 'Dach gedämmt?', optionen: ['Ja, nachträglich', 'Nein', 'Weiß ich nicht'] },
      { key: 'wand', label: 'Außenwände gedämmt?', optionen: ['Ja', 'Nein', 'Weiß ich nicht'] },
      { key: 'keller', label: 'Kellerdecke gedämmt?', optionen: ['Ja', 'Nein', 'Weiß ich nicht'] },
    ],
  },
  {
    icon: Fenster40,
    titel: 'Die Fenster.',
    unter: 'Zweifach- oder Dreifachverglasung macht einen großen Unterschied.',
    felder: [{ key: 'fensterjahr', label: 'Eingebaut', wert: '1998' }],
    wahlen: [
      { key: 'verglasung', label: 'Verglasung', optionen: ['Einfach', 'Zweifach', 'Dreifach', 'Gemischt'] },
      { key: 'rollladen', label: 'Rollladenkästen gedämmt?', optionen: ['Ja', 'Nein', 'Weiß ich nicht'] },
    ],
  },
  {
    icon: Kurve40,
    titel: 'Ihr Verbrauch.',
    unter: 'Drei zusammenhängende Jahre brauche ich für den Nachweis.',
    felder: [
      { key: 'v22', label: 'Verbrauch 2022', wert: '2 840 l' },
      { key: 'v23', label: 'Verbrauch 2023', wert: '2 610 l' },
      { key: 'v24', label: 'Verbrauch 2024', wert: 'kommt im Februar' },
    ],
  },
  {
    icon: Leute40,
    titel: 'Wer wohnt im Haus?',
    unter: 'Die Personenzahl beeinflusst den Warmwasserbedarf.',
    felder: [
      { key: 'personen', label: 'Personen', wert: '4' },
      { key: 'seit', label: 'Im Haus seit', wert: '2009' },
    ],
    wahlen: [{ key: 'nutzung', label: 'Nutzung', optionen: ['Selbst bewohnt', 'Teilweise vermietet', 'Vollständig vermietet'] }],
  },
]

export default function PortalInfos() {
  const { anfrage, toast } = useDemo()
  const [i, setI] = useState(0)
  const [richtung, setRichtung] = useState(1)
  const [felder, setFelder] = useState<Record<string, string>>(() => {
    const o: Record<string, string> = {}
    SCHRITTE.forEach((s) => s.felder?.forEach((f) => (o[f.key] = f.wert)))
    return o
  })
  const [wahlen, setWahlen] = useState<Record<string, string>>({ denkmal: 'Nein', brennstoff: 'Öl', warmwasser: 'Über die Heizung', dach: 'Weiß ich nicht', wand: 'Nein', keller: 'Weiß ich nicht', verglasung: 'Zweifach', rollladen: 'Weiß ich nicht', nutzung: 'Selbst bewohnt' })

  const s = SCHRITTE[i]

  function weiter() {
    if (i === SCHRITTE.length - 1) {
      toast({ title: 'Angaben gespeichert', body: 'ENSERA hat die Werte in den Fall übernommen — Frau Held sieht sie sofort.', tone: 'success' })
      navigate('/portal')
      return
    }
    setRichtung(1)
    setI(i + 1)
  }

  return (
    <div className="relative flex h-full min-h-full flex-col items-center overflow-clip pt-[162px] [background-color:var(--color-canvas)]">
      <div className="absolute left-[40px] top-[36px] flex items-center gap-[9px]">
        <div className="flex size-[20px] shrink-0 items-center justify-center rounded-[6px] [background-color:var(--color-fg)]">
          <div className="size-[7px] shrink-0 rounded-[2px] [background-color:var(--color-canvas)]" />
        </div>
        <div className="text-[14px] font-semibold leading-[18px] tracking-mono [color:var(--color-fg)]">Energieberatung Held</div>
        <div className="mx-[6px] h-[14px] w-px [background-color:var(--color-border)]" />
        <div className="text-[14px] leading-[18px] [color:var(--color-fg-muted)]">Ringstraße 8, {anfrage.ort.split(' ')[1]}</div>
      </div>

      {i > 0 && (
        <button
          onClick={() => {
            setRichtung(-1)
            setI(i - 1)
          }}
          aria-label="Zurück"
          className="absolute left-[calc(50%-364px)] top-[166px] flex size-xl items-center justify-center rounded-full border transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border)] hover:[background-color:var(--color-surface-sunken)]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24">
            <path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="var(--color-fg-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={i}
          initial={{ opacity: 0, x: richtung * 26 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: richtung * -26 }}
          transition={{ duration: 0.32, ease: EASE }}
          className="flex w-[520px] flex-col items-start"
        >
          <div className="size-[40px] shrink-0">{s.icon}</div>
          <div className="mt-[20px] flex gap-[5px]">
            {SCHRITTE.map((_, k) => (
              <motion.div
                key={k}
                className="h-[3px] w-[24px] shrink-0 rounded-full"
                animate={{ backgroundColor: k <= i ? '#12161B' : '#E4E8EC' }}
                transition={{ duration: 0.35 }}
              />
            ))}
          </div>
          <div className="mt-[26px] flex w-[520px] flex-col">
            <div className="[font-family:var(--font-display)] text-2xl font-semibold leading-[36px] tracking-[-0.025em] [color:var(--color-fg)]">{s.titel}</div>
            <div className="mt-[7px] text-base leading-[22px] [color:var(--color-fg-muted)]">{s.unter}</div>
          </div>

          {s.felder && (
            <div className="mt-[26px] flex w-[520px] gap-md">
              {s.felder.map((f) => (
                <div key={f.key} className="flex flex-1 flex-col gap-xs">
                  <label className="text-[14px] leading-[18px] [color:var(--color-fg-muted)]">{f.label}</label>
                  <input
                    value={felder[f.key] ?? ''}
                    onChange={(e) => setFelder({ ...felder, [f.key]: e.target.value })}
                    className="h-[44px] rounded-[10px] border px-[14px] text-base leading-[18px] outline-none transition-shadow [background-color:var(--color-surface)] [border-color:var(--color-border)] focus:[border-color:var(--color-brand)] focus:shadow-[0_0_0_3px_rgba(31,70,216,0.08)]"
                  />
                </div>
              ))}
            </div>
          )}

          {s.wahlen?.map((w) => (
            <div key={w.key} className="mt-[22px] flex w-[520px] flex-col gap-xs">
              <div className="text-[14px] leading-[18px] [color:var(--color-fg-muted)]">{w.label}</div>
              <div className="flex gap-[10px]">
                {w.optionen.map((o) => {
                  const aktiv = wahlen[w.key] === o
                  return (
                    <button
                      key={o}
                      onClick={() => setWahlen({ ...wahlen, [w.key]: o })}
                      className="flex h-[44px] flex-1 items-center justify-center rounded-[10px] text-base leading-[18px] transition-all [background-color:var(--color-surface)]"
                      style={{
                        border: aktiv ? '1.5px solid var(--color-brand)' : '1px solid var(--color-border)',
                        color: aktiv ? 'var(--color-fg)' : 'var(--color-fg-muted)',
                        fontWeight: aktiv ? 500 : 400,
                        boxShadow: aktiv ? '0 0 0 3px rgba(31,70,216,0.08)' : 'none',
                      }}
                    >
                      {o}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          <button
            onClick={weiter}
            className="group mt-[28px] flex h-[42px] w-[520px] shrink-0 items-center justify-center gap-xs rounded-[10px] transition-colors [background-color:var(--color-brand)] hover:[background-color:var(--color-brand-hover)]"
          >
            <span className="text-base font-semibold leading-[18px] [color:var(--color-brand-fg)]">
              {i === SCHRITTE.length - 1 ? 'Angaben abschicken' : 'Weiter'}
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-[3px]">
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path d="M4.5 12h14.5" fill="none" stroke="var(--color-brand-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 6.2 19 12l-6 5.8" fill="none" stroke="var(--color-brand-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-[40px] flex items-center justify-center gap-[7px]">
        <svg width="13" height="13" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
          <circle cx="7" cy="7" r="5.4" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.2" />
          <path d="M4.6 7.1L6.3 8.8 9.5 5.2" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="text-sm leading-md [color:var(--color-fg-subtle)]">Automatisch gespeichert · Sie können jederzeit unterbrechen</div>
      </div>
    </div>
  )
}
