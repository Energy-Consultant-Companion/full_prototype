import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE } from '../components/ui'
import { navigate } from '../lib/router'
import { useDemo } from '../lib/store'

/* ── kleine Bausteine ──────────────────────────────────────────────────── */

const Haken = ({ c = 'var(--color-fg)', s = 14 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
    <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const UhrBrand = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
    <circle cx="7" cy="7" r="5.3" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" />
    <path d="M7 4.2V7l2 1.4" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const KreisOffen = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
    <circle cx="7" cy="7" r="5.3" fill="none" stroke="var(--color-border-strong)" strokeWidth="1.5" strokeDasharray="2.2 2.2" />
  </svg>
)
const Hoch = ({ c = 'var(--color-feedback-error)', s = 15 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
    <path d="M8 10.6V2.2M4.8 5.4L8 2.2l3.2 3.2M2.6 11.6v1.2a1.4 1.4 0 001.4 1.4h8a1.4 1.4 0 001.4-1.4v-1.2" fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Datei = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
    <path d="M4.3 1.9h4.4l3.4 3.4v8.4a1.4 1.4 0 0 1-1.4 1.4H4.3a1.4 1.4 0 0 1-1.4-1.4V3.3a1.4 1.4 0 0 1 1.4-1.4z" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M8.6 2.1v2.7a1 1 0 0 0 1 1h2.4" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Mono = ({ children, c = 'var(--color-fg-subtle)', className = '' }: { children: React.ReactNode; c?: string; className?: string }) => (
  <div className={'[font-family:var(--font-mono)] text-[10px] leading-[13px] tracking-caps ' + className} style={{ color: c }}>
    {children}
  </div>
)

/* ── Ordner-Symbole ────────────────────────────────────────────────────── */

const OrdnerGebaeude = (
  <svg width="38" height="38" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path d="M4.2 10.6 12 4.4l7.8 6.2v8.4a2.2 2.2 0 0 1-2.2 2.2H6.4a2.2 2.2 0 0 1-2.2-2.2z" fill="var(--color-accent-sky-soft)" />
    <path d="M1.9 11.1 11.1 3.4a1.4 1.4 0 0 1 1.8 0l9.2 7.7a1.1 1.1 0 0 1-.7 1.9H2.6a1.1 1.1 0 0 1-.7-1.9z" fill="var(--color-accent-sky)" />
    <rect x="10.4" y="14.6" width="4.6" height="6.6" rx="1.4" fill="var(--color-accent-sky)" />
    <rect x="6.4" y="14.6" width="2.6" height="2.6" rx="1.3" fill="var(--color-accent-sky)" />
  </svg>
)
const OrdnerAbrechnungen = (
  <svg width="38" height="38" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <rect x="4.2" y="2.6" width="15.6" height="18.8" rx="2.8" fill="var(--color-accent-pink-soft)" />
    <rect x="7.2" y="6" width="9.6" height="1.9" rx="0.95" fill="var(--color-accent-pink)" />
    <rect x="7.2" y="10" width="9.6" height="1.9" rx="0.95" fill="var(--color-accent-pink)" />
    <rect x="7.2" y="14" width="5.6" height="1.9" rx="0.95" fill="var(--color-accent-pink)" />
  </svg>
)
const OrdnerVollmachten = (
  <svg width="38" height="38" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <rect x="4.4" y="2.6" width="15.2" height="18.8" rx="2.8" fill="var(--color-accent-amber-soft)" />
    <rect x="7.4" y="6.2" width="9.2" height="1.8" rx="0.9" fill="var(--color-accent-amber)" />
    <rect x="7.4" y="9.8" width="6" height="1.8" rx="0.9" fill="var(--color-accent-amber)" />
    <path d="M7.4 17.2c1.8-3 2.8-4.6 3.6-4.6s.8 3.4 1.6 3.4 1.2-1.2 2-2.4" fill="none" stroke="var(--color-accent-amber)" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)
const OrdnerHeld = (
  <svg width="38" height="38" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <rect x="6.2" y="2.4" width="14.4" height="17.4" rx="2.6" fill="var(--color-accent-brand-soft)" />
    <path d="M3.4 5.6a2.6 2.6 0 012.6-2.6v16.6a2.6 2.6 0 002.6 2.6H6a2.6 2.6 0 01-2.6-2.6z" fill="var(--color-accent-brand)" />
    <rect x="9.4" y="6.4" width="8.2" height="1.9" rx="0.95" fill="var(--color-accent-brand)" />
    <rect x="9.4" y="10.2" width="8.2" height="1.9" rx="0.95" fill="var(--color-accent-brand)" />
    <rect x="9.4" y="14" width="4.8" height="1.9" rx="0.95" fill="var(--color-accent-brand)" />
  </svg>
)
const OrdnerHandwerk = (
  <svg width="38" height="38" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <rect x="2.8" y="6.4" width="18.4" height="13.6" rx="2.8" fill="var(--color-accent-violet-soft)" />
    <path d="M8.6 6.4V5a2 2 0 012-2h2.8a2 2 0 012 2v1.4" fill="none" stroke="var(--color-accent-violet)" strokeWidth="1.9" strokeLinecap="round" />
    <rect x="2.8" y="11" width="18.4" height="2.2" fill="var(--color-accent-violet)" />
    <rect x="10.4" y="9.8" width="3.2" height="4.6" rx="1.1" fill="var(--color-accent-violet)" />
  </svg>
)
const OrdnerAmt = (
  <svg width="38" height="38" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path d="M12 2.8l8.4 3.4v5.4c0 4.6-3.4 8.6-8.4 10.1-5-1.5-8.4-5.5-8.4-10.1V6.2z" fill="var(--color-accent-green-soft)" />
    <path d="M8.2 12.2l2.6 2.6 5-5.4" fill="none" stroke="var(--color-accent-green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ── Daten ─────────────────────────────────────────────────────────────── */

const SCHRITTE = [
  { nr: '01', stand: 'fertig', datum: '21. Juli', titel: 'Erstgespräch', info: 'Erledigt — bei Ihnen zu Hause', wer: 'GEMEINSAM' },
  { nr: '02', stand: 'fertig', datum: '24. Juli', titel: 'Vertrag und Vollmacht', info: 'Erledigt — digital unterschrieben', wer: 'SIE' },
  { nr: '03', stand: 'laeuft', datum: 'bis 15. August', titel: 'Unterlagen', info: '7 von 9 da · 2 fehlen bis Fr 15.08.', wer: 'SIE SIND DRAN' },
  { nr: '04', stand: 'offen', datum: '19. August, 10:00', titel: 'Vor-Ort-Termin', info: 'Fest vereinbart · rund zwei Stunden', wer: 'GEMEINSAM' },
  { nr: '05', stand: 'offen', datum: 'ca. 9. September', titel: 'Ihr Sanierungsfahrplan', info: 'Berechnung und Bericht · ca. drei Wochen', wer: 'FRAU HELD' },
  { nr: '06', stand: 'offen', datum: 'ca. 16. September', titel: 'Ergebnisgespräch und Förderantrag', info: 'Erst das Gespräch, dann der Antrag', wer: 'GEMEINSAM' },
]

const ORDNER = [
  { icon: OrdnerGebaeude, name: 'Ihr Gebäude', info: '5 DATEIEN · 62 MB', fehlt: 0 },
  { icon: OrdnerAbrechnungen, name: 'Abrechnungen', info: '3 DATEIEN', fehlt: 1 },
  { icon: OrdnerVollmachten, name: 'Vollmachten', info: '1 DATEI', fehlt: 1 },
  { icon: OrdnerHeld, name: 'Von Frau Held', info: '4 DATEIEN · 18 MB', fehlt: 0 },
  { icon: OrdnerHandwerk, name: 'Angebote Handwerk', info: '2 DATEIEN · 6 MB', fehlt: 0 },
  { icon: OrdnerAmt, name: 'Vom Amt', info: '1 DATEI · 0,4 MB', fehlt: 0 },
]

const FRAGEN_START = [
  {
    frage: 'Wann kommt Frau Held zum Termin?',
    zeit: 'GESTERN · 19:41',
    antwort: 'Am Mittwoch, 19. August um 10:00 Uhr bei Ihnen. Eingeplant sind rund zwei Stunden. Sie brauchen dafür Zugang zu Keller und Dachboden.',
  },
  {
    frage: 'Lohnt sich bei uns eine Wärmepumpe überhaupt?',
    zeit: '05.08. · 09:02',
    antwort:
      'Das kann ich Ihnen erst nach dem Vor-Ort-Termin seriös sagen — die Heizlast Ihres Hauses hängt an der Dämmung, und die habe ich noch nicht gesehen. Ich bringe die Zahlen zum Termin mit.',
  },
  {
    frage: 'Können wir die Fenster schon im Herbst tauschen lassen?',
    zeit: 'HEUTE · 08:12',
    antwort:
      'Diese Frage habe ich nicht selbst beantwortet: Wenn Sie vor dem Förderantrag mit den Arbeiten beginnen, kann die Förderung entfallen. Das muss Frau Held Ihnen sagen, nicht ich.',
  },
]

/* ── Bildschirm ────────────────────────────────────────────────────────── */

export default function Portal() {
  const { anfrage, toast } = useDemo()
  const [offen, setOffen] = useState<string | null>('03')
  const [hochgeladen, setHochgeladen] = useState<string[]>([])
  const [laedt, setLaedt] = useState(false)
  const [fragen, setFragen] = useState(FRAGEN_START)
  const [entwurf, setEntwurf] = useState('')
  const abschnitte = useRef<Record<string, HTMLDivElement | null>>({})

  const fehlend = ['Heizkostenabrechnung 2024', 'Vollmacht Ihres Bruders'].filter((f) => !hochgeladen.includes(f))
  const daCount = 7 + hochgeladen.length

  function hochladen(name?: string) {
    const ziel = name ?? fehlend[0]
    if (!ziel) return
    setLaedt(true)
    window.setTimeout(() => {
      setLaedt(false)
      setHochgeladen((h) => [...h, ziel])
      toast({ title: ziel + ' hochgeladen', body: 'ENSERA hat die Datei geprüft und einsortiert.', tone: 'success' })
    }, 1300)
  }

  function fragen_stellen() {
    if (!entwurf.trim()) return
    const q = entwurf.trim()
    setEntwurf('')
    setFragen((f) => [{ frage: q, zeit: 'GERADE EBEN', antwort: '…' }, ...f])
    window.setTimeout(() => {
      setFragen((f) =>
        f.map((x, i) =>
          i === 0
            ? {
                ...x,
                antwort:
                  'ENSERA hat Ihre Frage an Katrin Held weitergegeben und einen Antwortentwurf vorbereitet. Sobald Frau Held ihn freigibt, steht die Antwort hier — meist noch am selben Werktag.',
              }
            : x,
        ),
      )
    }, 1600)
  }

  function scrollZu(k: string) {
    abschnitte.current[k]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="scrollbar-slim h-full overflow-y-auto [background-color:var(--color-surface)]">
      {/* Kopfleiste */}
      <div className="sticky top-0 z-20 flex h-[72px] shrink-0 items-center justify-between border-b px-[80px] backdrop-blur-md [background-color:color-mix(in_oklab,var(--color-surface)_88%,transparent)] [border-color:var(--color-border)]">
        <div className="flex items-center gap-sm">
          <div className="flex size-lg shrink-0 items-center justify-center rounded-md [background-color:var(--color-fg)]">
            <div className="size-xs shrink-0 rounded-[2px] [background-color:var(--color-fg-inverse)]" />
          </div>
          <div className="[font-family:var(--font-display)] text-base font-semibold leading-[18px] tracking-tight [color:var(--color-fg)]">
            Energieberatung Held
          </div>
        </div>
        <div className="flex h-[34px] w-[479px] shrink-0 items-center rounded-full pl-[22px] pr-lg shadow-[#00000033_0px_2px_3px] outline outline-[#EDEDED] [background-color:var(--color-surface)]">
          <div className="flex grow basis-0 items-center justify-center gap-[38px]">
            {['Status', 'Schritte', 'Ablage', 'Fragen'].map((t) => (
              <button
                key={t}
                onClick={() => scrollZu(t)}
                className="text-sm font-medium leading-[38px] tracking-tight transition-colors [color:var(--color-fg)] hover:[color:var(--color-brand)]"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="text-[14px] leading-[18px] [color:var(--color-fg-muted)]">{anfrage.name}</div>
        </div>
      </div>

      {/* Stand */}
      <div ref={(el) => { abschnitte.current.Status = el }} className="flex items-start justify-between px-[80px] pt-[72px] pb-3xl">
        <div className="flex w-[760px] shrink-0 flex-col">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="w-[700px] [font-family:var(--font-display)] text-[44px] font-semibold leading-2xl tracking-tighter [color:var(--color-fg)]"
          >
            Guten Tag {anfrage.name}
          </motion.div>
          <div className="w-[620px] pt-[18px] text-md leading-[28px] [color:var(--color-fg-muted)]">
            Hier sehen Sie den aktuellen Stand Ihres Vorhabens, welche Unterlagen schon da sind und können jederzeit Ihre Fragen stellen.
          </div>
        </div>
        <div className="flex w-[300px] shrink-0 flex-col pt-[6px]">
          <div className="flex items-baseline justify-between border-b py-[11px] [border-color:var(--color-border-subtle)]">
            <Mono className="!tracking-caps">FÖRDERUNG</Mono>
            <div className="text-[14px] font-medium leading-[18px] [color:var(--color-fg)]">BAFA EBW · iSFP</div>
          </div>
          <div className="flex items-baseline justify-between border-b pt-[19px] pb-[11px] [border-color:var(--color-border-subtle)]">
            <Mono>IHRE BERATERIN</Mono>
            <div className="flex items-center gap-xs">
              <img src="./assets/katrin-portal.jpg" alt="" className="size-[25px] shrink-0 rounded-full object-cover" />
              <div className="text-[14px] font-medium leading-[18px] [color:var(--color-fg)]">Katrin Held</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wer ist dran */}
      <div className="flex flex-col px-[80px] pb-[88px]">
        <div className="flex w-[760px] flex-col py-2xl">
          <div className="[font-family:var(--font-display)] text-[26px] font-semibold leading-xl tracking-tight [color:var(--color-fg)]">
            Derzeitiger Status
          </div>
        </div>
        <div className="flex gap-lg">
          {/* Aufgaben */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-1 flex-col rounded-xl border px-[28px] pt-[28px] pb-lg shadow-[#12161B14_0px_8px_24px,#12161B0F_0px_1px_2px] [background-color:var(--color-surface)] [border-color:var(--color-border)]"
          >
            <div className="flex items-center justify-between pb-[18px]">
              <div className="[font-family:var(--font-mono)] text-2xs leading-[14px] tracking-caps [color:var(--color-fg)]">IHRE AUFGABEN</div>
              <div className="[font-family:var(--font-mono)] text-2xs leading-[14px] tracking-caps" style={{ color: fehlend.length ? 'var(--color-feedback-error)' : 'var(--color-accent-green-ink)' }}>
                {fehlend.length ? 'FRIST FR 15.08.' : 'ALLES ERLEDIGT'}
              </div>
            </div>
            <AnimatePresence initial={false} mode="popLayout">
              {[
                {
                  titel: 'Heizkostenabrechnung 2024',
                  text: '2022 und 2023 liegen vor. Für die Förderung brauchen wir drei zusammenhängende Jahre.',
                  cta: 'Hochladen',
                  icon: <Hoch />,
                  wash: 'var(--color-feedback-error-surface)',
                },
                {
                  titel: 'Unterschrift Ihres Bruders',
                  text: 'Das Haus gehört Ihnen beiden. Ohne seine Vollmacht kann der Antrag nicht raus.',
                  cta: 'Weiterleiten',
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                      <path d="M10.6 2.2l3.2 3.2-7 7-3.9.7.7-3.9z" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.35" strokeLinejoin="round" />
                      <path d="M9 3.8l3.2 3.2" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.35" strokeLinecap="round" />
                    </svg>
                  ),
                  wash: 'var(--color-surface-sunken)',
                },
              ]
                .filter((_a, i) => (i === 0 ? fehlend.includes('Heizkostenabrechnung 2024') : fehlend.includes('Vollmacht Ihres Bruders')))
                .map((a) => (
                  <motion.div
                    key={a.titel}
                    layout
                    exit={{ opacity: 0, x: 24, height: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex items-start gap-md border-t py-[18px] [border-color:var(--color-border-subtle)]"
                  >
                    <div className="mt-px flex size-[26px] shrink-0 items-center justify-center rounded-md" style={{ backgroundColor: a.wash }}>
                      {a.icon}
                    </div>
                    <div className="flex grow basis-0 flex-col gap-[5px]">
                      <div className="text-[16px] font-medium leading-[20px] [color:var(--color-fg)]">{a.titel}</div>
                      <div className="text-[14px] leading-[22px] [color:var(--color-fg-muted)]">{a.text}</div>
                    </div>
                    <button
                      onClick={() =>
                        a.cta === 'Hochladen'
                          ? hochladen('Heizkostenabrechnung 2024')
                          : toast({ title: 'Link an Ihren Bruder geschickt', body: 'Er kann direkt unterschreiben — ohne Konto.' })
                      }
                      className="mt-px flex h-xl shrink-0 items-center rounded-full border px-[14px] text-sm font-medium leading-md transition-colors [border-color:var(--color-border-strong)] [color:var(--color-fg)] hover:[background-color:var(--color-surface-sunken)]"
                    >
                      {a.cta}
                    </button>
                  </motion.div>
                ))}
            </AnimatePresence>
            {fehlend.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-sm border-t py-[26px] [border-color:var(--color-border-subtle)]">
                <Haken c="var(--color-accent-green-ink)" />
                <div className="text-[16px] leading-[22px] [color:var(--color-fg-muted)]">
                  Alles da. Frau Held meldet sich, sobald sie durchgesehen hat.
                </div>
              </motion.div>
            )}
            <div className="mt-auto flex items-center justify-between border-t pt-[22px] [border-color:var(--color-border-subtle)]">
              <button
                onClick={() => hochladen()}
                disabled={!fehlend.length || laedt}
                className="flex h-[44px] items-center gap-[9px] rounded-full px-[22px] text-base font-semibold leading-[18px] tracking-tight transition-all active:scale-[0.98] disabled:opacity-40 [background-color:var(--color-brand)] [color:var(--color-brand-fg)] hover:[background-color:var(--color-brand-hover)]"
              >
                {laedt ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                      className="block size-[14px] rounded-full border-2 border-white/30 border-t-white"
                    />
                    Wird geprüft …
                  </>
                ) : (
                  'Unterlagen hochladen'
                )}
              </button>
              <button onClick={() => navigate('/portal/informationen')} className="text-sm font-medium [color:var(--color-brand)]">
                Angaben zum Gebäude ergänzen →
              </button>
            </div>
          </motion.div>

          {/* Zeitstrahl */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            className="flex flex-1 flex-col rounded-xl border px-[28px] pt-[28px] pb-lg [background-color:var(--color-surface-sunken)] [border-color:var(--color-border)]"
          >
            <div className="flex items-center gap-md pb-[20px]">
              <img src="./assets/katrin-portal.jpg" alt="" className="size-[56px] shrink-0 rounded-full object-cover" />
              <div className="flex grow basis-0 flex-col gap-[5px]">
                <div className="text-[16px] font-medium leading-[20px] [color:var(--color-fg)]">Katrin Held</div>
                <Mono c="var(--color-fg-muted)">IHRE ENERGIEBERATERIN</Mono>
              </div>
            </div>
            <div className="pb-[20px] [font-family:var(--font-display)] text-[22px] font-semibold leading-[30px] tracking-tight [color:var(--color-fg)]">
              Termin am 19. August wird vorbereitet.
            </div>
            {[
              { zeit: '04.08.', text: 'Ihre sieben Unterlagen gelesen und die Werte übernommen', stand: 'fertig' },
              { zeit: 'LÄUFT', text: 'Aufmaß-Unterlagen und Fragenliste für den Termin am 19.08.', stand: 'laeuft' },
              { zeit: 'AB 20.08.', text: 'Berechnung und Ihr Sanierungsfahrplan — rund drei Wochen Arbeit', stand: 'offen' },
            ].map((z) => (
              <div key={z.zeit} className="flex items-start gap-md border-t py-[14px] [border-color:var(--color-border)]">
                <div
                  className="w-[78px] shrink-0 [font-family:var(--font-mono)] text-2xs leading-[22px] tracking-caps"
                  style={{ color: z.stand === 'laeuft' ? 'var(--color-fg)' : 'var(--color-fg-subtle)' }}
                >
                  {z.zeit}
                </div>
                <div
                  className="grow basis-0 text-base leading-[22px]"
                  style={{ color: z.stand === 'laeuft' ? 'var(--color-fg)' : 'var(--color-fg-muted)' }}
                >
                  {z.text}
                </div>
                <div className="mt-2xs shrink-0">
                  {z.stand === 'fertig' ? <Haken /> : z.stand === 'laeuft' ? <UhrBrand /> : <KreisOffen />}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Alle Schritte */}
      <div ref={(el) => { abschnitte.current.Schritte = el }} className="flex flex-col px-[80px] pt-[72px] pb-[80px] [background-color:var(--color-surface-sunken)]">
        <div className="flex items-end justify-between pb-[36px]">
          <div className="flex flex-col gap-[14px]">
            <Mono className="!text-2xs !leading-[14px]">ABLAUF UND UNTERLAGEN</Mono>
            <div className="[font-family:var(--font-display)] text-[26px] font-semibold leading-xl tracking-tight [color:var(--color-fg)]">
              Alle Schritte
            </div>
          </div>
        </div>
        <div className="flex flex-col border-t [border-color:var(--color-border)]">
          {SCHRITTE.map((s) => {
            const aktiv = s.stand === 'laeuft'
            const auf = offen === s.nr
            return (
              <div key={s.nr}>
                <button
                  onClick={() => setOffen(auf ? null : s.nr)}
                  className="flex w-full items-center gap-lg border-b py-[18px] text-left transition-colors [border-color:var(--color-border)] hover:[background-color:color-mix(in_oklab,var(--color-surface)_60%,transparent)]"
                >
                  <div
                    className="w-lg shrink-0 [font-family:var(--font-mono)] text-xs leading-md tracking-mono"
                    style={{ color: aktiv ? 'var(--color-fg)' : 'var(--color-fg-subtle)' }}
                  >
                    {s.nr}
                  </div>
                  <div className="flex w-[14px] shrink-0 items-center justify-center">
                    {s.stand === 'fertig' ? <Haken /> : s.stand === 'laeuft' ? <UhrBrand /> : <KreisOffen />}
                  </div>
                  <div
                    className="w-[200px] shrink-0 [font-family:var(--font-display)] text-md leading-[22px] tracking-tight"
                    style={{ color: aktiv ? 'var(--color-brand)' : s.stand === 'fertig' ? 'var(--color-fg-muted)' : 'var(--color-fg)', fontWeight: aktiv ? 700 : 600 }}
                  >
                    {s.datum}
                  </div>
                  <div
                    className="grow basis-0 leading-[20px]"
                    style={{
                      color: s.stand === 'fertig' ? 'var(--color-fg-muted)' : 'var(--color-fg)',
                      fontSize: aktiv ? 17 : 16,
                      fontWeight: aktiv ? 600 : 500,
                    }}
                  >
                    {s.titel}
                  </div>
                  <div className="w-[300px] shrink-0 text-[14px] leading-[18px]" style={{ color: aktiv ? 'var(--color-fg-muted)' : 'var(--color-fg-subtle)' }}>
                    {aktiv ? `${daCount} von 9 da · ${fehlend.length} fehlen bis Fr 15.08.` : s.info}
                  </div>
                  <div
                    className="flex w-[150px] shrink-0 flex-wrap justify-end text-right [font-family:var(--font-mono)] text-2xs leading-[14px] tracking-caps"
                    style={{ color: aktiv ? 'var(--color-fg)' : 'var(--color-fg-subtle)' }}
                  >
                    {s.wer}
                  </div>
                  <motion.div animate={{ rotate: auf ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex size-md shrink-0 items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 14 14">
                      <path d="M2.6 5.2L7 9.4l4.4-4.2" fill="none" stroke={aktiv ? 'var(--color-fg)' : 'var(--color-border-strong)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {auf && s.nr === '03' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden border-b [border-color:var(--color-border)] [background-color:var(--color-surface)]"
                    >
                      <div className="flex flex-col px-lg pt-[22px] pb-lg">
                        <div className="flex items-center justify-between pb-md">
                          <Mono className="!text-2xs !leading-[14px]">{fehlend.length ? `${fehlend.length} fehlen noch` : 'Alles vollständig'}</Mono>
                          <button
                            onClick={() => hochladen()}
                            disabled={!fehlend.length}
                            className="flex h-[34px] shrink-0 items-center rounded-full px-md text-sm font-semibold leading-md transition-colors disabled:opacity-40 [background-color:var(--color-brand)] [color:var(--color-brand-fg)] hover:[background-color:var(--color-brand-hover)]"
                          >
                            Hochladen
                          </button>
                        </div>
                        <div className="flex gap-[40px]">
                          {[
                            ['Heizkostenabrechnung 2024', 'Vollmacht Ihres Bruders', 'Grundriss'],
                            ['Fotos der Heizung', 'Energieausweis', 'Heizkostenabrechnung 2022'],
                            ['Grundbuchauszug', 'Wohnflächenberechnung', 'Heizkostenabrechnung 2023'],
                          ].map((spalte, si) => (
                            <div key={si} className="flex flex-1 flex-col">
                              {spalte.map((u) => {
                                const fehltJetzt = fehlend.includes(u)
                                const gradeDa = hochgeladen.includes(u)
                                return (
                                  <motion.div key={u} layout className="flex items-center gap-[14px] border-t py-[14px] [border-color:var(--color-border)]">
                                    <div className="flex size-[14px] shrink-0 items-center justify-center">
                                      {fehltJetzt ? <Hoch s={14} /> : u === 'Energieausweis' ? <UhrBrand /> : <Haken />}
                                    </div>
                                    <div
                                      className="grow basis-0 text-base leading-[18px] [color:var(--color-fg)]"
                                      style={{ fontWeight: fehltJetzt ? 500 : 400 }}
                                    >
                                      {u}
                                    </div>
                                    {fehltJetzt && (
                                      <div className="w-[110px] shrink-0 text-right [font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-feedback-error)]">
                                        FEHLT
                                      </div>
                                    )}
                                    {gradeDa && (
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="w-[110px] shrink-0 text-right [font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps"
                                        style={{ color: 'var(--color-accent-green-ink)' }}
                                      >
                                        GERADE DA
                                      </motion.div>
                                    )}
                                  </motion.div>
                                )
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {auf && s.nr !== '03' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden border-b [border-color:var(--color-border)] [background-color:var(--color-surface)]"
                    >
                      <div className="px-lg py-lg text-base leading-[25px] [color:var(--color-fg-muted)]">{s.info}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      {/* Unterlagen */}
      <div ref={(el) => { abschnitte.current.Ablage = el }} className="flex flex-col pl-[90px] pr-[80px] pt-3xl pb-[72px]">
        <div className="flex items-end justify-between gap-xl pb-[26px]">
          <div className="[font-family:var(--font-display)] text-[26px] font-semibold leading-xl tracking-tight [color:var(--color-fg)]">Unterlagen</div>
        </div>
        <div className="flex gap-[10px] pb-[26px]">
          <div className="flex h-[40px] grow basis-0 items-center gap-[10px] rounded-md border px-[14px] [background-color:var(--color-surface)] [border-color:var(--color-border)]">
            <svg width="15" height="15" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
              <circle cx="7.1" cy="7.1" r="4.5" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.4" />
              <path d="M10.4 10.4l3 3" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input placeholder="In Ihren Unterlagen suchen" className="grow basis-0 text-[14px] leading-[18px] outline-none placeholder:[color:var(--color-fg-subtle)]" />
            <Mono>{14 + hochgeladen.length + 2} UNTERLAGEN</Mono>
          </div>
          <button
            onClick={() => hochladen()}
            className="flex h-[40px] shrink-0 items-center gap-xs rounded-md px-md transition-opacity hover:opacity-90 [background-color:var(--color-surface-inverse)]"
          >
            <Hoch c="var(--color-fg-inverse)" s={14} />
            <div className="text-sm font-medium leading-md [color:var(--color-fg-inverse)]">Hochladen</div>
          </button>
        </div>

        <div className="flex flex-col gap-sm">
          <div className="flex items-center gap-[14px]">
            <Mono>ORDNER</Mono>
            <div className="h-px grow [background-color:var(--color-border)]" />
            <Mono>ENSERA SORTIERT NEUE UNTERLAGEN EIN</Mono>
          </div>
          <div className="grid grid-cols-3 gap-sm">
            {ORDNER.map((o, i) => {
              const fehltNoch = o.name === 'Abrechnungen' ? (fehlend.includes('Heizkostenabrechnung 2024') ? 1 : 0) : o.name === 'Vollmachten' ? (fehlend.includes('Vollmacht Ihres Bruders') ? 1 : 0) : 0
              return (
                <motion.div
                  key={o.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
                  whileHover={{ y: -4, backgroundColor: 'var(--color-surface)', boxShadow: '0 10px 26px rgba(18,22,27,0.08)' }}
                  className="flex h-[128px] cursor-pointer flex-col rounded-lg border border-transparent p-[17px] [background-color:var(--color-surface-sunken)]"
                >
                  {o.icon}
                  <div className="grow basis-0" />
                  <div className="text-base font-medium leading-[20px] tracking-tight [color:var(--color-fg)]">{o.name}</div>
                  <div className="flex items-center gap-[5px] pt-2xs">
                    <Mono>{o.info}</Mono>
                    {fehltNoch > 0 && (
                      <>
                        <span className="[font-family:var(--font-mono)] text-[10px] leading-[13px] [color:var(--color-border-strong)]">·</span>
                        <Mono c="var(--color-feedback-error)">1 FEHLT</Mono>
                      </>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col pt-[36px]">
          <div className="flex items-center gap-[14px] pb-[10px]">
            <Mono>ZULETZT</Mono>
            <div className="h-px grow [background-color:var(--color-border)]" />
            <div className="shrink-0 text-sm leading-[17px] [color:var(--color-brand)]">Alle 16 ansehen →</div>
          </div>
          <div className="flex items-center gap-md px-xs pb-xs">
            <div className="w-md shrink-0" />
            <Mono className="grow basis-0">UNTERLAGE</Mono>
            <div className="w-[150px] shrink-0"><Mono>ORDNER</Mono></div>
            <div className="w-[140px] shrink-0"><Mono>VON</Mono></div>
            <div className="flex w-3xl shrink-0 justify-end"><Mono>DATUM</Mono></div>
          </div>
          <div className="flex flex-col">
            {[
              { n: 'Heizkostenabrechnung 2024', o: 'Abrechnungen', of: 'var(--color-accent-pink)', v: 'Sie', d: 'FEHLT', fehlt: true },
              { n: 'Vollmacht Ihres Bruders', o: 'Vollmachten', of: 'var(--color-accent-amber)', v: 'Jörg Sander', d: 'FEHLT', fehlt: true },
              { n: 'Angebot Wärmepumpe · Osterloh', o: 'Angebote Handwerk', of: 'var(--color-accent-violet)', v: 'Osterloh GmbH', d: '12.08.', kuerzel: 'O' },
              { n: 'Foto Heizungsraum · Südseite', o: 'Ihr Gebäude', of: 'var(--color-accent-sky)', v: 'Sie', d: '11.08.', kuerzel: 'S', dunkel: true },
              { n: 'Zwischenstand Ihrer Berechnung', o: 'Von Frau Held', of: 'var(--color-accent-brand)', v: 'Katrin Held', d: '07.08.', bild: true },
              { n: 'BAFA Eingangsbestätigung', o: 'Vom Amt', of: 'var(--color-accent-green)', v: 'BAFA', d: '05.08.', kuerzel: 'B' },
              { n: 'Wohnflächenberechnung', o: 'Ihr Gebäude', of: 'var(--color-accent-sky)', v: 'Sie', d: '04.08.', kuerzel: 'S', dunkel: true },
            ].map((z) => {
              const nochFehlend = z.fehlt && fehlend.includes(z.n)
              const jetztDa = z.fehlt && !nochFehlend
              return (
                <motion.div
                  key={z.n}
                  layout
                  animate={{ backgroundColor: nochFehlend ? 'var(--color-feedback-error-surface)' : jetztDa ? 'var(--color-accent-green-wash)' : 'rgba(0,0,0,0)' }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-md rounded-sm border-b px-xs py-[9px] [border-color:var(--color-border-subtle)]"
                >
                  {nochFehlend ? <Hoch s={16} /> : <Datei />}
                  <div className="grow basis-0 text-[14px] leading-[18px] [color:var(--color-fg)]">{z.n}</div>
                  <div className="flex w-[150px] shrink-0 items-center gap-xs">
                    <div className="size-[7px] shrink-0 rounded-full" style={{ backgroundColor: z.of }} />
                    <div className="text-sm leading-[17px] [color:var(--color-fg-muted)]">{z.o}</div>
                  </div>
                  <div className="flex w-[140px] shrink-0 items-center gap-[9px]">
                    {z.bild ? (
                      <img src="./assets/katrin-portal.jpg" alt="" className="size-[20px] shrink-0 rounded-full object-cover" />
                    ) : z.kuerzel ? (
                      <div
                        className="flex size-[20px] shrink-0 items-center justify-center rounded-full border"
                        style={{
                          backgroundColor: z.dunkel ? 'var(--color-surface-inverse)' : 'var(--color-surface-sunken)',
                          borderColor: z.dunkel ? 'transparent' : 'var(--color-border)',
                        }}
                      >
                        <div
                          className="[font-family:var(--font-mono)] text-[9px] font-semibold leading-[11px]"
                          style={{ color: z.dunkel ? 'var(--color-fg-inverse)' : 'var(--color-fg-muted)' }}
                        >
                          {z.kuerzel}
                        </div>
                      </div>
                    ) : null}
                    <div className="text-sm leading-[17px]" style={{ color: z.dunkel ? 'var(--color-fg)' : 'var(--color-fg-muted)' }}>{z.v}</div>
                  </div>
                  <div className="flex w-3xl shrink-0 justify-end text-right">
                    <Mono c={nochFehlend ? 'var(--color-feedback-error)' : jetztDa ? 'var(--color-accent-green-ink)' : 'var(--color-fg-subtle)'}>
                      {nochFehlend ? 'FEHLT' : jetztDa ? 'HEUTE' : z.d}
                    </Mono>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Fragen */}
      <div ref={(el) => { abschnitte.current.Fragen = el }} className="flex flex-col px-[80px] pt-[72px] pb-[88px] [background-color:var(--color-surface-sunken)]">
        <div className="flex items-end justify-between pb-[28px]">
          <div className="flex flex-col gap-[14px]">
            <Mono className="!text-2xs !leading-[14px]">IHRE FRAGEN</Mono>
            <div className="[font-family:var(--font-display)] text-[26px] font-semibold leading-xl tracking-tight [color:var(--color-fg)]">
              Fragen Sie doch einfach.
            </div>
          </div>
        </div>
        <div className="flex h-[60px] shrink-0 items-center gap-[14px] rounded-full border pl-[18px] pr-sm transition-shadow focus-within:shadow-[0_0_0_4px_rgba(31,70,216,0.08)] [background-color:var(--color-surface)] [border-color:var(--color-border-strong)]">
          <svg width="18" height="18" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
            <circle cx="7.2" cy="7.2" r="4.5" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" />
            <path d="M10.6 10.6L13.6 13.6" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input
            value={entwurf}
            onChange={(e) => setEntwurf(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fragen_stellen()}
            placeholder="Frage zu Ihrem Vorhaben …"
            className="grow basis-0 text-[16px] leading-[20px] outline-none placeholder:[color:var(--color-fg-subtle)]"
          />
          <button
            onClick={fragen_stellen}
            className="flex size-[40px] shrink-0 items-center justify-center rounded-full transition-colors [background-color:var(--color-brand)] hover:[background-color:var(--color-brand-hover)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M8 13V3M4 7l4-4 4 4" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col pt-[40px]">
          <AnimatePresence initial={false}>
            {fragen.map((f) => (
              <motion.div
                key={f.frage}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-[10px] border-t py-lg [border-color:var(--color-border)]"
              >
                <div className="flex items-baseline justify-between">
                  <div className="text-md font-semibold leading-[22px] [color:var(--color-fg)]">{f.frage}</div>
                  <Mono className="!text-2xs !leading-[14px] shrink-0">{f.zeit}</Mono>
                </div>
                <div className="w-[900px] text-base leading-[25px] [color:var(--color-fg-muted)]">
                  {f.antwort === '…' ? (
                    <span className="flex items-center gap-xs">
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                        className="text-sm [color:var(--color-fg-subtle)]"
                      >
                        ENSERA sieht sich Ihre Frage an …
                      </motion.span>
                    </span>
                  ) : (
                    f.antwort
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Fußleiste */}
      <div className="flex items-center justify-between border-t px-[80px] py-[28px] [background-color:var(--color-surface)] [border-color:var(--color-border)]">
        <div className="flex items-center gap-[22px]">
          <div className="text-sm font-medium leading-md [color:var(--color-fg)]">Energieberatung Held</div>
          {['Impressum', 'Datenschutz', 'Zugang beenden'].map((l) => (
            <div key={l} className="text-sm leading-md [color:var(--color-fg-muted)]">{l}</div>
          ))}
        </div>
        <div className="text-sm leading-md [color:var(--color-fg-muted)]">Ihre Daten liegen in Deutschland.</div>
      </div>
    </div>
  )
}
