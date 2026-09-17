import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE, Label } from './ui'
import type { Entwurf } from '../lib/daten'
import { useDemo } from '../lib/store'

/* Der fertige Entwurf zur Aktion. Öffnet sich direkt aus dem Überblick —
   abschicken geht mit einem Klick, ändern auch. */

export default function Nachrichtenentwurf({ entwurf, onFertig }: { entwurf: Entwurf; onFertig: () => void }) {
  const { toast } = useDemo()
  const [text, setText] = useState(entwurf.text)
  const [betreff, setBetreff] = useState(entwurf.betreff)
  const [bearbeiten, setBearbeiten] = useState(false)
  const [gesendet, setGesendet] = useState(false)

  useEffect(() => {
    setText(entwurf.text)
    setBetreff(entwurf.betreff)
    setBearbeiten(false)
    setGesendet(false)
  }, [entwurf])

  function senden() {
    setGesendet(true)
    toast({ title: entwurf.bestaetigung.titel, body: entwurf.bestaetigung.body, tone: 'success' })
    window.setTimeout(onFertig, 1500)
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {gesendet ? (
        <motion.div
          key="weg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="mb-lg flex items-center gap-md rounded-lg border p-md"
          style={{ backgroundColor: 'var(--color-accent-green-wash)', borderColor: 'var(--color-accent-green-line)' }}
        >
          <motion.svg width="22" height="22" viewBox="0 0 24 24" initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 16 }}>
            <circle cx="12" cy="12" r="10" fill="none" stroke="var(--color-accent-green-ink)" strokeWidth="1.5" />
            <motion.path
              d="M7.4 12.2 10.4 15.2 16.8 8.4"
              fill="none"
              stroke="var(--color-accent-green-ink)"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
            />
          </motion.svg>
          <div className="grow">
            <div className="text-[15px] font-semibold leading-[19px]" style={{ color: 'var(--color-accent-green-ink)' }}>
              {entwurf.bestaetigung.titel}
            </div>
            <div className="mt-[3px] text-[14px] leading-[19px] [color:var(--color-fg-muted)]">{entwurf.bestaetigung.body}</div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="entwurf"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -160, scale: 0.96 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mb-lg overflow-clip rounded-lg border shadow-[0_8px_28px_rgba(18,22,27,0.08)] [background-color:var(--color-surface)] [border-color:var(--color-brand-border)]"
        >
          {/* Kopf */}
          <div
            className="flex items-center gap-sm border-b px-lg py-sm"
            style={{ backgroundColor: 'var(--color-brand-surface)', borderColor: 'var(--color-brand-border)' }}
          >
            <svg width="15" height="15" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
              <path d="M7 1.4l1.25 3.35L11.6 6 8.25 7.25 7 10.6 5.75 7.25 2.4 6l3.35-1.25z" fill="var(--color-brand)" />
            </svg>
            <div className="[font-family:var(--font-mono)] text-[10px] font-medium leading-sm tracking-caps [color:var(--color-brand)]">
              ENTWURF · {entwurf.anlass}
            </div>
            <div className="grow" />
            <button onClick={onFertig} className="[color:var(--color-brand)] hover:opacity-70" aria-label="Entwurf verwerfen">
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M3.4 3.4l7.2 7.2M10.6 3.4l-7.2 7.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Kopfzeilen */}
          <div className="flex items-center gap-md border-b px-lg py-[11px] [border-color:var(--color-border-subtle)]">
            <div className="w-[56px] shrink-0"><Label>AN</Label></div>
            <div className="flex grow items-center gap-sm">
              <span className="text-[15px] font-medium [color:var(--color-fg)]">{entwurf.an}</span>
              <Label>{entwurf.anRolle}</Label>
            </div>
          </div>
          <div className="flex items-center gap-md border-b px-lg py-[11px] [border-color:var(--color-border-subtle)]">
            <div className="w-[56px] shrink-0"><Label>BETREFF</Label></div>
            {bearbeiten ? (
              <input
                value={betreff}
                onChange={(e) => setBetreff(e.target.value)}
                className="grow rounded-sm text-[15px] outline-none [color:var(--color-fg)]"
              />
            ) : (
              <div className="grow text-[15px] [color:var(--color-fg)]">{betreff}</div>
            )}
          </div>

          {/* Text */}
          <div className="px-lg py-md">
            {bearbeiten ? (
              <textarea
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="scrollbar-slim h-[320px] w-full resize-none rounded-md border p-md text-[15px] leading-[25px] outline-none [border-color:var(--color-brand-border)] [color:var(--color-fg)] focus:[border-color:var(--color-brand)]"
              />
            ) : (
              <div className="whitespace-pre-wrap text-[15px] leading-[25px] [color:var(--color-fg)]">{text}</div>
            )}
            {entwurf.chips && (
              <div className="flex items-center gap-xs pt-md">
                {entwurf.chips.map((c) => (
                  <span
                    key={c}
                    className="inline-flex h-[26px] items-center gap-[6px] rounded-full border px-[10px] text-xs font-medium [background-color:var(--color-evidence-surface)] [border-color:var(--color-border)] [color:var(--color-fg-muted)]"
                  >
                    <svg width="11" height="11" viewBox="0 0 14 14">
                      <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Fuß */}
          <div className="flex items-center gap-sm border-t px-lg py-md [background-color:var(--color-surface-sunken)] [border-color:var(--color-border-subtle)]">
            <button
              onClick={senden}
              className="flex h-[38px] shrink-0 items-center gap-xs rounded-md px-[18px] text-[15px] font-semibold transition-colors [background-color:var(--color-brand)] [color:var(--color-brand-fg)] hover:[background-color:var(--color-brand-hover)]"
            >
              <svg width="15" height="15" viewBox="0 0 16 16">
                <path d="M14 2L7.2 9M14 2l-4.4 12-2.4-5-5-2.4z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
              Senden
            </button>
            <button
              onClick={() => setBearbeiten(!bearbeiten)}
              className="flex h-[38px] shrink-0 items-center rounded-md border px-[16px] text-[15px] font-medium transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]"
            >
              {bearbeiten ? 'Fertig' : 'Bearbeiten'}
            </button>
            <button onClick={onFertig} className="shrink-0 px-xs text-[15px] [color:var(--color-fg-subtle)] hover:[color:var(--color-fg-muted)]">
              Verwerfen
            </button>
            <div className="grow" />
            <Label>{entwurf.hinweis}</Label>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
