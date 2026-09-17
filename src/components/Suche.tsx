import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Label } from './ui'
import { IconAnfragen, IconFaelle, IconFragen, IconSchritte } from './icons'
import { navigate } from '../lib/router'

interface Treffer {
  gruppe: string
  label: string
  rechts?: string
  rechtsWarn?: boolean
  icon: React.ReactNode
  ziel?: string
  frage?: boolean
}

const Sym = ({ d }: { d: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
    <path d={d} fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Person = <Sym d="M10.6 5.6a2.6 2.6 0 11-5.2 0 2.6 2.6 0 015.2 0zM2.8 13.6a5.2 5.2 0 0110.4 0" />
const Haus = <Sym d="M2.4 13.6h11.2M3.6 13.6V7.2M6.4 13.6V7.2M9.6 13.6V7.2M12.4 13.6V7.2M2 7.2 8 3.2l6 4z" />
const DateiSym = <Sym d="M4 2h5l3 3v9H4zM9 2v3h3" />
const SchildSym = <Sym d="M8 1.8l4.8 1.7v4c0 3-2 5.4-4.8 6.7C5.2 12.9 3.2 10.5 3.2 7.5v-4z" />
const ChatSym = <Sym d="M14 8.6c0 2.8-2.7 5-6 5-.7 0-1.4-.1-2-.3L2.2 14.2l1-2.6C2.4 10.8 2 9.7 2 8.6c0-2.8 2.7-5 6-5s6 2.2 6 5z" />

const GLOBAL: Treffer[] = [
  { gruppe: 'WECHSELN ZU', label: 'Anfragen', rechts: '2 NEU', icon: <IconAnfragen width={17} height={17} />, ziel: '/app/anfragen' },
  { gruppe: 'WECHSELN ZU', label: 'Kundschaft', rechts: '12 FÄLLE', icon: <IconFaelle width={17} height={17} />, ziel: '/app/faelle' },
  { gruppe: 'WECHSELN ZU', label: 'Nächste Schritte', rechts: '3 JETZT', icon: <IconSchritte width={17} height={17} />, ziel: '/app/schritte' },
  { gruppe: 'WECHSELN ZU', label: 'Fragen', rechts: '3 OFFEN', icon: <IconFragen width={17} height={17} />, ziel: '/app/fragen' },
  { gruppe: 'KUNDSCHAFT', label: 'Familie Reuter', rechts: 'BUCHENWEG 14 · BAFA EBW', icon: Person, ziel: '/app/fall/reuter' },
  { gruppe: 'KUNDSCHAFT', label: 'Hans-Jürgen Brendel', rechts: '08.08. ÜBERFÄLLIG', rechtsWarn: true, icon: Person, ziel: '/app/fall/brendel' },
  { gruppe: 'KUNDSCHAFT', label: 'Wohnbau Peine eG', rechts: '22 WOHNEINHEITEN', icon: Haus, ziel: '/app/fall/wohnbau' },
  { gruppe: 'UNTERLAGEN', label: 'Rechnung Heizungsbau Knop', rechts: 'YILDIRIM · 04.08.', icon: DateiSym, ziel: '/app/unterlagen/pruefung' },
  { gruppe: 'UNTERLAGEN', label: 'Heizkostenabrechnung 2023', rechts: 'REUTER · 28.07.', icon: DateiSym, ziel: '/app/fall/reuter/unterlagen' },
  { gruppe: 'FRAGEN AN ENSERA', label: '„Welche Fälle trifft die neue EBW-Regel?“', icon: ChatSym, frage: true, ziel: '/app/regulierungen/antwort' },
  { gruppe: 'FRAGEN AN ENSERA', label: '„Was ist diese Woche überfällig?“', icon: ChatSym, frage: true, ziel: '/app/schritte' },
]

const IM_FALL: Treffer[] = [
  { gruppe: '3 TREFFER IM FALL', label: '„Können wir die Fenster schon im Herbst tauschen lassen?“', rechts: 'OFFENE FRAGE', icon: ChatSym, ziel: '/app/fragen/antwort' },
  { gruppe: '3 TREFFER IM FALL', label: 'Fenster 1998 erneuert — aus dem Erstgespräch', rechts: 'PROTOKOLL · 28.07.', icon: DateiSym, ziel: '/app/fall/reuter/verlauf' },
  { gruppe: '3 TREFFER IM FALL', label: 'Vorhabenbeginn vor Antragstellung', rechts: 'REGEL · EBW 2.4', icon: SchildSym, ziel: '/app/regulierungen/antwort' },
  { gruppe: 'FRAGEN ZU DIESEM FALL', label: '„Darf vor dem Förderantrag gebaut werden?“', icon: ChatSym, frage: true, ziel: '/app/regulierungen/antwort' },
  { gruppe: 'FRAGEN ZU DIESEM FALL', label: '„Was fehlt hier noch bis zum Antrag?“', icon: ChatSym, frage: true, ziel: '/app/fall/reuter/unterlagen/fehlend' },
]

export default function Suche({ offen, onSchliessen, imFall }: { offen: boolean; onSchliessen: () => void; imFall?: boolean }) {
  const [kontext, setKontext] = useState<string | null>(imFall ? 'Familie Reuter' : null)
  const [text, setText] = useState(imFall ? 'fenster' : '')
  const [zeiger, setZeiger] = useState(0)

  useEffect(() => {
    setKontext(imFall ? 'Familie Reuter' : null)
    setText(imFall ? 'fenster' : '')
  }, [imFall, offen])

  const quelle = kontext ? IM_FALL : GLOBAL
  const treffer = useMemo(() => {
    const q = text.trim().toLowerCase()
    if (!q || (imFall && q === 'fenster')) return quelle
    return quelle.filter((t) => t.label.toLowerCase().includes(q) || (t.rechts ?? '').toLowerCase().includes(q))
  }, [text, quelle, imFall])

  useEffect(() => setZeiger(0), [text, kontext])

  useEffect(() => {
    if (!offen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onSchliessen()
      if (e.key === 'ArrowDown') { e.preventDefault(); setZeiger((z) => Math.min(z + 1, treffer.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setZeiger((z) => Math.max(z - 1, 0)) }
      if (e.key === 'Tab') { e.preventDefault(); setKontext(kontext ? null : 'Familie Reuter') }
      if (e.key === 'Enter' && treffer[zeiger]?.ziel) { e.preventDefault(); onSchliessen(); navigate(treffer[zeiger].ziel!) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  let letzte = ''

  return (
    <AnimatePresence>
      {offen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onSchliessen}
          className="absolute inset-0 z-40 flex items-start justify-center bg-[rgba(244,246,248,0.7)] pt-[90px] backdrop-blur-[3px]"
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="flex w-[680px] flex-col overflow-hidden rounded-xl border shadow-[0_24px_60px_rgba(18,22,27,0.16)] [background-color:var(--color-surface)] [border-color:var(--color-border)]"
          >
            {/* Eingabe */}
            <div className="flex h-[64px] shrink-0 items-center gap-sm border-b px-[20px] [border-color:var(--color-border-subtle)]">
              <svg width="17" height="17" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                <circle cx="7.2" cy="7.2" r="4.5" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" />
                <path d="M10.6 10.6L13.6 13.6" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <AnimatePresence initial={false}>
                {kontext && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, width: 0 }}
                    animate={{ opacity: 1, scale: 1, width: 'auto' }}
                    exit={{ opacity: 0, scale: 0.9, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-lg shrink-0 items-center gap-[6px] overflow-hidden rounded-[6px] px-xs [background-color:var(--color-brand-surface)]"
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                      <path d="M10.6 5.6a2.6 2.6 0 11-5.2 0 2.6 2.6 0 015.2 0zM2.8 13.6a5.2 5.2 0 0110.4 0" fill="none" stroke="var(--color-brand)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="whitespace-nowrap text-sm font-medium [color:var(--color-brand)]">{kontext}</span>
                    <button onClick={() => setKontext(null)} className="shrink-0" aria-label="Kontext entfernen">
                      <svg width="11" height="11" viewBox="0 0 14 14">
                        <path d="M3.4 3.4l7.2 7.2M10.6 3.4l-7.2 7.2" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              <input
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Suchen oder fragen …"
                className="grow text-[16px] leading-[20px] outline-none placeholder:[color:var(--color-fg-subtle)]"
              />
              {kontext ? (
                <button
                  onClick={() => setKontext(null)}
                  className="flex size-xl shrink-0 items-center justify-center rounded-full transition-colors [background-color:var(--color-surface-sunken)] hover:[background-color:var(--color-border)]"
                  aria-label="Kontext aufheben"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <path d="M7 2.4v9.2M2.4 7h9.2" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => setKontext('Familie Reuter')}
                  className="flex h-xl shrink-0 items-center gap-[6px] rounded-full px-[12px] text-xs font-medium transition-colors [background-color:var(--color-surface-inverse)] [color:var(--color-fg-inverse)] hover:opacity-90"
                >
                  <svg width="11" height="11" viewBox="0 0 14 14">
                    <path d="M7 2.4v9.2M2.4 7h9.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  KONTEXT
                </button>
              )}
            </div>

            {/* Treffer */}
            <div className="scrollbar-slim max-h-[440px] overflow-y-auto pb-xs">
              {treffer.map((t, i) => {
                const neu = t.gruppe !== letzte
                letzte = t.gruppe
                const an = zeiger === i
                return (
                  <div key={t.label}>
                    {neu && (
                      <div className="px-[20px] pt-md pb-[6px]">
                        <Label>{t.gruppe}</Label>
                      </div>
                    )}
                    <button
                      onMouseEnter={() => setZeiger(i)}
                      onClick={() => {
                        onSchliessen()
                        if (t.ziel) navigate(t.ziel)
                      }}
                      className="relative flex h-[42px] w-full items-center gap-sm px-sm"
                    >
                      {an && (
                        <motion.span
                          layoutId="suche-aktiv"
                          transition={{ type: 'spring', stiffness: 700, damping: 50 }}
                          className="absolute inset-x-xs inset-y-0 rounded-md [background-color:var(--color-surface-sunken)]"
                        />
                      )}
                      <span className="relative ml-[10px] shrink-0">{t.icon}</span>
                      <span className="relative grow truncate text-left text-base leading-[20px] [color:var(--color-fg)]">{t.label}</span>
                      {t.rechts && (
                        <span className="relative shrink-0">
                          <Label tone={t.rechtsWarn ? 'error' : 'subtle'}>{t.rechts}</Label>
                        </span>
                      )}
                      {an && <span className="relative mr-[10px] shrink-0 [font-family:var(--font-mono)] text-xs [color:var(--color-fg-subtle)]">↵</span>}
                    </button>
                  </div>
                )
              })}
              {treffer.length === 0 && (
                <div className="px-[20px] py-[26px] text-sm [color:var(--color-fg-muted)]">
                  Kein Treffer. Eingabe drücken — ENSERA beantwortet die Frage trotzdem.
                </div>
              )}
            </div>

            {/* Fuß */}
            <div className="flex h-[40px] shrink-0 items-center gap-lg border-t px-[20px] [background-color:var(--color-surface-sunken)] [border-color:var(--color-border-subtle)]">
              {[
                ['↑↓', 'AUSWÄHLEN'],
                ['↵', 'ÖFFNEN'],
                ['TAB', kontext ? 'KONTEXT LÖSCHEN' : 'KONTEXT SETZEN'],
              ].map(([t, l]) => (
                <div key={l} className="flex items-center gap-[6px]">
                  <span className="[font-family:var(--font-mono)] text-[11px] [color:var(--color-fg-muted)]">{t}</span>
                  <Label>{l}</Label>
                </div>
              ))}
              <div className="grow" />
              <Label>{kontext ? 'NUR ' + kontext.toUpperCase() : 'ALLE FÄLLE'}</Label>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
