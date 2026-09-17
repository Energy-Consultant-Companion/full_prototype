import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Aktion, Ausfuehrung } from '../lib/daten'
import { EASE } from './ui'

const ICONS: Record<Aktion['icon'], React.ReactNode> = {
  'doc-check': (
    <>
      <path d="M4 2h5l3 3v9H4z" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M9 2v3h3M5.9 9.6l1.4 1.4 2.8-2.8" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'doc-minus': (
    <>
      <path d="M4 2h5l3 3v9H4z" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M9 2v3h3" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.2 10.2h3.6" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  book: (
    <>
      <path d="M2.6 3.4h4.1c.7 0 1.3.5 1.3 1.2v8.6c0-.5-.6-.9-1.3-.9H2.6z" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M13.4 3.4H9.3c-.7 0-1.3.5-1.3 1.2v8.6c0-.5.6-.9 1.3-.9h4.1z" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinejoin="round" />
    </>
  ),
  send: (
    <>
      <path d="M13.8 2.4L2.6 6.7l4.1 1.8 1.8 4.1z" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M13.8 2.4L6.7 8.5" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
  chat: (
    <>
      <path d="M14 8.6c0 2.8-2.7 5-6 5-.7 0-1.4-.1-2-.3L2.2 14.2l1-2.6C2.4 10.8 2 9.7 2 8.6c0-2.8 2.7-5 6-5s6 2.2 6 5z" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6.7 7.1c0-.8.6-1.3 1.4-1.3s1.3.5 1.3 1.2c0 .9-1.3 1-1.3 1.9M8 10.6v.1" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" />
    </>
  ),
}

export function Ausfuehrungspille({ art }: { art: Ausfuehrung }) {
  if (art === 'freigabe')
    return (
      <div
        className="flex h-lg w-[132px] shrink-0 items-center justify-center gap-[5px] rounded-full border px-[9px]"
        style={{ backgroundColor: 'var(--color-accent-amber-wash)', borderColor: 'var(--color-accent-amber)' }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
          <path d="M8 2.2a5.8 5.8 0 100 11.6A5.8 5.8 0 008 2.2z" fill="none" stroke="var(--color-accent-amber-ink)" strokeWidth="1.4" />
          <path d="M5.6 8.1l1.7 1.7 3.1-3.4" fill="none" stroke="var(--color-accent-amber-ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="text-xs font-medium leading-[15px]" style={{ color: 'var(--color-accent-amber-ink)' }}>Freigabe nötig</div>
      </div>
    )
  if (art === 'selbst')
    return (
      <div
        className="flex h-lg w-[132px] shrink-0 items-center justify-center gap-[5px] rounded-full border px-[9px]"
        style={{ backgroundColor: 'var(--color-accent-brand-wash)', borderColor: 'var(--color-accent-brand-line)' }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
          <path d="M11.4 3.1l1.5 1.5-7 7-2.1.6.6-2.1z" fill="none" stroke="var(--color-accent-brand)" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
        <div className="text-xs font-medium leading-[15px]" style={{ color: 'var(--color-accent-brand)' }}>Sie erledigen</div>
      </div>
    )
  return (
    <div className="flex h-lg w-[132px] shrink-0 items-center justify-center gap-[5px] rounded-full border px-[9px] [background-color:var(--color-surface-sunken)] [border-color:var(--color-border)]">
      <div className="text-xs font-medium leading-[15px] [color:var(--color-fg-muted)]">Läuft automatisch</div>
    </div>
  )
}

export default function AktionsZeile({
  a,
  offen,
  onToggle,
  onOeffnen,
  letzte,
}: {
  a: Aktion
  offen: boolean
  onToggle: () => void
  onOeffnen: () => void
  letzte?: boolean
}) {
  const [erledigt, setErledigt] = useState(false)

  return (
    <div className={'flex flex-col' + (letzte ? '' : ' border-b [border-color:var(--color-border-subtle)]')}>
      <div
        onClick={onToggle}
        className="flex cursor-pointer items-center gap-sm px-md py-[17px] transition-colors hover:[background-color:color-mix(in_oklab,var(--color-surface-sunken)_60%,transparent)]"
      >
        <div className="flex w-[20px] shrink-0 justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>{ICONS[a.icon]}</svg>
        </div>
        <div className="flex grow basis-0 flex-col gap-2xs">
          <div
            className="text-base leading-[20px] tracking-mono [color:var(--color-fg)]"
            style={erledigt ? { textDecoration: 'line-through', opacity: 0.45 } : undefined}
          >
            {a.titel}
          </div>
          <div className="[font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-fg-subtle)]">{a.meta}</div>
        </div>
        <div className="w-4xl shrink-0 text-sm leading-[17px] [color:var(--color-fg-muted)]">{a.bereich}</div>
        <div className="flex w-[140px] shrink-0">
          {erledigt ? (
            <div
              className="flex h-lg w-[132px] shrink-0 items-center justify-center gap-[5px] rounded-full border px-[9px]"
              style={{ backgroundColor: 'var(--color-accent-green-wash)', borderColor: 'var(--color-accent-green-line)' }}
            >
              <div className="text-xs font-medium leading-[15px]" style={{ color: 'var(--color-accent-green-ink)' }}>Freigegeben</div>
            </div>
          ) : (
            <Ausfuehrungspille art={a.ausfuehrung} />
          )}
        </div>
        <div className="flex w-4xl shrink-0 justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onOeffnen()
            }}
            className="flex h-xl w-[88px] shrink-0 items-center justify-center rounded-md border px-[14px] text-sm font-medium leading-[17px] transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border-strong)] [color:var(--color-fg)] hover:[background-color:var(--color-surface-sunken)]"
          >
            Ansehen
          </button>
        </div>
        <motion.div animate={{ rotate: offen ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex w-[20px] shrink-0 justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
            <path d="M4.4 6.2L8 9.8l3.6-3.6" fill="none" stroke={offen ? 'var(--color-fg)' : 'var(--color-fg-subtle)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {offen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-sm pt-3xs pr-md pb-md pl-2xl">
              <div className="border-l-2 pl-[14px]" style={{ borderColor: 'var(--color-brand-border)' }}>
                <div className="max-w-[600px] text-sm leading-[20px] [color:var(--color-fg-muted)]">{a.gepruefte}</div>
              </div>
              <div className="flex items-center gap-xs pl-md">
                {a.belege?.map((b) => (
                  <div
                    key={b}
                    className="flex h-[26px] shrink-0 items-center gap-[6px] rounded-full border px-[10px] [background-color:var(--color-evidence-surface)] [border-color:var(--color-border)]"
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                      <path d="M4 2h5l3 3v9H4z" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.4" strokeLinejoin="round" />
                    </svg>
                    <div className="text-xs font-medium leading-[15px] [color:var(--color-fg-muted)]">{b}</div>
                  </div>
                ))}
                {a.weitere && <div className="px-[10px] text-xs font-medium leading-[15px] [color:var(--color-brand)]">{a.weitere}</div>}
                <div className="grow" />
                {!erledigt && a.ausfuehrung === 'freigabe' && (
                  <button
                    onClick={() => setErledigt(true)}
                    className="flex h-xl shrink-0 items-center rounded-full px-[16px] text-sm font-semibold transition-colors [background-color:var(--color-brand)] [color:var(--color-brand-fg)] hover:[background-color:var(--color-brand-hover)]"
                  >
                    Freigeben
                  </button>
                )}
                {!erledigt && a.ausfuehrung === 'selbst' && (
                  <button
                    onClick={() => setErledigt(true)}
                    className="flex h-xl shrink-0 items-center rounded-full border px-[16px] text-sm font-medium transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]"
                  >
                    Als erledigt markieren
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
