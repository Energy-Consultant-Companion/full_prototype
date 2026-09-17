import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useDemo } from '../lib/store'

const P = (d: string) => <path d={d} fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
const I = ({ children }: { children: React.ReactNode }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>{children}</svg>
)

interface Eintrag {
  gruppe: string
  label: string
  icon: React.ReactNode
  hinweis?: string
}

const EINTRAEGE: Eintrag[] = [
  { gruppe: 'SCHREIBEN', label: 'Notiz schreiben', icon: <I>{P('M10.8 2.6l2.6 2.6L6 12.6 2.8 13.2l.6-3.2z')}</I> },
  { gruppe: 'SCHREIBEN', label: 'Gesprächsprotokoll anlegen', icon: <I>{P('M4 2h5l3 3v9H4z')}{P('M9 2v3h3M6 9h4M6 11.4h2.6')}</I> },
  { gruppe: 'SCHREIBEN', label: 'E-Mail an die Kundschaft entwerfen', icon: <I><rect x="2" y="3.6" width="12" height="8.8" rx="1.4" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" />{P('M2.4 4.4L8 8.6l5.6-4.2')}</I> },
  { gruppe: 'SCHREIBEN', label: 'Korrektur an den Handwerker entwerfen', icon: <I>{P('M8 2.4l6 10.4H2z')}{P('M8 6.4v3M8 11.2v.1')}</I> },
  { gruppe: 'PRÜFEN', label: 'Förderweg prüfen', icon: <I>{P('M8 1.8l4.8 1.7v4c0 3-2 5.4-4.8 6.7C5.2 12.9 3.2 10.5 3.2 7.5v-4z')}{P('M5.9 7.8l1.5 1.5 2.8-3')}</I> },
  { gruppe: 'PRÜFEN', label: 'Unterlagen auf Vollständigkeit prüfen', icon: <I>{P('M4 2h5l3 3v9H4z')}{P('M9 2v3h3M5.9 9.6l1.4 1.4 2.8-2.8')}</I> },
  { gruppe: 'PRÜFEN', label: 'Rechnung prüfen', icon: <I><rect x="2.4" y="2.6" width="11.2" height="10.8" rx="1.4" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" />{P('M2.4 6h11.2M6 6v7.4')}</I> },
  { gruppe: 'FRAGEN', label: '„Was fehlt in diesem Fall?“', icon: <I>{P('M14 8.6c0 2.8-2.7 5-6 5-.7 0-1.4-.1-2-.3L2.2 14.2l1-2.6C2.4 10.8 2 9.7 2 8.6c0-2.8 2.7-5 6-5s6 2.2 6 5z')}</I> },
  { gruppe: 'FRAGEN', label: '„Welche Förderung passt hier?“', icon: <I>{P('M14 8.6c0 2.8-2.7 5-6 5-.7 0-1.4-.1-2-.3L2.2 14.2l1-2.6C2.4 10.8 2 9.7 2 8.6c0-2.8 2.7-5 6-5s6 2.2 6 5z')}</I> },
  { gruppe: 'FRAGEN', label: '„Fasse die letzte Kommunikation zusammen.“', icon: <I>{P('M14 8.6c0 2.8-2.7 5-6 5-.7 0-1.4-.1-2-.3L2.2 14.2l1-2.6C2.4 10.8 2 9.7 2 8.6c0-2.8 2.7-5 6-5s6 2.2 6 5z')}</I> },
]

export default function Aktionsmenue({
  offen,
  onSchliessen,
  kontext,
}: {
  offen: boolean
  onSchliessen: () => void
  kontext?: string
}) {
  const { toast } = useDemo()
  const [suche, setSuche] = useState('')
  const [zeiger, setZeiger] = useState(0)

  const treffer = useMemo(() => {
    const q = suche.trim().toLowerCase()
    return q ? EINTRAEGE.filter((e) => e.label.toLowerCase().includes(q)) : EINTRAEGE
  }, [suche])

  useEffect(() => setZeiger(0), [suche])

  useEffect(() => {
    if (!offen) {
      setSuche('')
      return
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onSchliessen()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setZeiger((z) => Math.min(z + 1, treffer.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setZeiger((z) => Math.max(z - 1, 0))
      }
      if (e.key === 'Enter' && treffer[zeiger]) {
        e.preventDefault()
        ausloesen(treffer[zeiger])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function ausloesen(e: Eintrag) {
    onSchliessen()
    toast({
      title: e.label.replace(/„|“/g, ''),
      body: e.gruppe === 'FRAGEN' ? 'ENSERA sucht die Antwort im Fall und legt sie in den Verlauf.' : 'Entwurf liegt im Fall — Sie geben ihn frei.',
      tone: 'brand',
    })
  }

  let letzteGruppe = ''

  return (
    <AnimatePresence>
      {offen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onSchliessen}
          className="absolute inset-0 z-40 flex items-start justify-center bg-[rgba(244,246,248,0.72)] pt-[120px] backdrop-blur-[3px]"
        >
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="flex w-[680px] flex-col overflow-hidden rounded-xl border shadow-[0_24px_60px_rgba(18,22,27,0.16)] [background-color:var(--color-surface)] [border-color:var(--color-border)]"
          >
            <div className="flex h-[60px] shrink-0 items-center gap-sm border-b px-[20px] [border-color:var(--color-border-subtle)]">
              <svg width="17" height="17" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                <circle cx="7.2" cy="7.2" r="4.5" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" />
                <path d="M10.6 10.6L13.6 13.6" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <input
                autoFocus
                value={suche}
                onChange={(e) => setSuche(e.target.value)}
                placeholder="Schreiben, fragen oder prüfen …"
                className="grow text-[16px] leading-[20px] outline-none placeholder:[color:var(--color-fg-subtle)]"
              />
              {kontext && (
                <div className="shrink-0 [font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-fg-subtle)]">
                  {kontext}
                </div>
              )}
            </div>

            <div className="scrollbar-slim max-h-[560px] overflow-y-auto py-xs">
              {treffer.map((e, i) => {
                const neueGruppe = e.gruppe !== letzteGruppe
                letzteGruppe = e.gruppe
                return (
                  <div key={e.label}>
                    {neueGruppe && (
                      <div className="px-[20px] pt-sm pb-[6px] [font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-fg-subtle)]">
                        {e.gruppe}
                      </div>
                    )}
                    <button
                      onMouseEnter={() => setZeiger(i)}
                      onClick={() => ausloesen(e)}
                      className="relative flex h-[42px] w-full items-center gap-sm px-sm"
                    >
                      {zeiger === i && (
                        <motion.span
                          layoutId="menue-aktiv"
                          transition={{ type: 'spring', stiffness: 700, damping: 50 }}
                          className="absolute inset-x-xs inset-y-0 rounded-md [background-color:var(--color-surface-sunken)]"
                        />
                      )}
                      <span className="relative ml-[10px] shrink-0">{e.icon}</span>
                      <span className="relative grow text-left text-base leading-[20px] [color:var(--color-fg)]">{e.label}</span>
                      {zeiger === i && (
                        <span className="relative mr-[10px] shrink-0 [font-family:var(--font-mono)] text-xs [color:var(--color-fg-subtle)]">↵</span>
                      )}
                    </button>
                  </div>
                )
              })}
              {treffer.length === 0 && (
                <div className="px-[20px] py-[26px] text-sm [color:var(--color-fg-muted)]">
                  Nichts gefunden. ENSERA kann die Frage trotzdem beantworten — Eingabe drücken.
                </div>
              )}
            </div>

            <div className="flex h-[40px] shrink-0 items-center gap-lg border-t px-[20px] [border-color:var(--color-border-subtle)] [background-color:var(--color-surface-sunken)]">
              {[
                ['↑↓', 'AUSWÄHLEN'],
                ['↵', 'ÖFFNEN'],
                ['ESC', 'SCHLIESSEN'],
              ].map(([t, l]) => (
                <div key={l} className="flex items-center gap-[6px]">
                  <span className="[font-family:var(--font-mono)] text-[11px] [color:var(--color-fg-muted)]">{t}</span>
                  <span className="[font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-fg-subtle)]">{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
