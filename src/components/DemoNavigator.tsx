import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CHAPTERS, FLAT_STEPS } from '../lib/chapters'
import { navigate, useRoute } from '../lib/router'
import { useDemo } from '../lib/store'
import { IconChevronRight, IconGrid } from './icons'

const spring = { type: 'spring' as const, stiffness: 420, damping: 38, mass: 0.9 }

export default function DemoNavigator() {
  const path = useRoute()
  const { navOffen, setNavOffen } = useDemo()
  const [openChapter, setOpenChapter] = useState<string | null>(null)

  const index = useMemo(() => FLAT_STEPS.findIndex((s) => s.path === path), [path])
  const current = index >= 0 ? FLAT_STEPS[index] : null

  useEffect(() => {
    if (current) setOpenChapter(current.chapter)
  }, [current?.chapter]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowRight' && e.metaKey) {
        e.preventDefault()
        step(1)
      }
      if (e.key === 'ArrowLeft' && e.metaKey) {
        e.preventDefault()
        step(-1)
      }
      if (e.key.toLowerCase() === 'd' && e.metaKey) {
        e.preventDefault()
        setNavOffen(!navOffen)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function step(delta: number) {
    const next = Math.min(Math.max(index + delta, 0), FLAT_STEPS.length - 1)
    if (next !== index) navigate(FLAT_STEPS[next].path)
  }

  return (
    <>
      <AnimatePresence initial={false}>
        {!navOffen && (
          <motion.button
            key="opener"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={spring}
            onClick={() => setNavOffen(true)}
            className="fixed right-lg bottom-lg z-50 flex items-center gap-xs rounded-full py-[10px] pr-[18px] pl-md text-sm font-medium shadow-[0_8px_28px_rgba(18,22,27,0.22)] [background-color:var(--color-surface-inverse)] [color:var(--color-fg-inverse)]"
          >
            <IconGrid style={{ width: 14, height: 14 }} />
            Demo-Führung
            <span className="[font-family:var(--font-mono)] text-2xs [color:var(--color-fg-inverse-muted)]">⌘D</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {navOffen && (
          <motion.aside
            key="panel"
            initial={{ x: 340, opacity: 0.4 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 340, opacity: 0.4 }}
            transition={spring}
            className="fixed right-0 top-0 z-50 flex h-screen w-[312px] flex-col [background-color:var(--color-surface-inverse)] [color:var(--color-fg-inverse)]"
          >
            {/* Kopf */}
            <div className="flex items-start justify-between px-lg pt-lg pb-md">
              <div>
                <div className="[font-family:var(--font-mono)] text-2xs tracking-caps [color:var(--color-fg-inverse-muted)]">
                  ENSERA · PROTOTYP
                </div>
                <div className="mt-[6px] text-md font-semibold tracking-tight">Demo-Führung</div>
              </div>
              <button
                onClick={() => setNavOffen(false)}
                aria-label="Führung ausblenden"
                className="mt-[2px] flex size-lg items-center justify-center rounded-md [background-color:var(--color-surface-inverse-raised)] transition-colors hover:[background-color:var(--color-surface-inverse-active)]"
              >
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path d="M4.6 2.8 8.8 7l-4.2 4.2" fill="none" stroke="var(--color-fg-inverse-muted)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Fortschritt */}
            <div className="px-lg pb-md">
              <div className="flex items-center justify-between [font-family:var(--font-mono)] text-2xs tracking-wide [color:var(--color-fg-inverse-muted)]">
                <span>{current ? current.chapter : 'Freies Klicken'}</span>
                <span>
                  {index >= 0 ? index + 1 : '–'} / {FLAT_STEPS.length}
                </span>
              </div>
              <div className="mt-xs h-[3px] w-full overflow-hidden rounded-full [background-color:var(--color-surface-inverse-raised)]">
                <motion.div
                  className="h-full rounded-full [background-color:var(--color-brand-inverse)]"
                  animate={{ width: `${index >= 0 ? ((index + 1) / FLAT_STEPS.length) * 100 : 0}%` }}
                  transition={spring}
                />
              </div>
            </div>

            {/* Kapitel */}
            <div className="scrollbar-none flex-1 overflow-y-auto px-sm pb-md">
              {CHAPTERS.map((c) => {
                const open = openChapter === c.title
                return (
                  <div key={c.title} className="mb-[2px]">
                    <button
                      onClick={() => setOpenChapter(open ? null : c.title)}
                      className="flex w-full items-center gap-[10px] rounded-md px-sm py-[9px] transition-colors hover:[background-color:var(--color-surface-inverse-raised)]"
                    >
                      <span className="size-[7px] shrink-0 rounded-full" style={{ backgroundColor: c.accent }} />
                      <span className="flex-1 text-sm font-medium tracking-tight">{c.title}</span>
                      <motion.span animate={{ rotate: open ? 90 : 0 }} transition={spring} className="[color:var(--color-fg-inverse-muted)]">
                        <IconChevronRight />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-[2px] pb-xs pl-[22px]">
                            <div className="mb-xs pl-sm pr-sm text-xs leading-[17px] [color:var(--color-fg-inverse-muted)]">{c.note}</div>
                            {c.steps.map((s) => {
                              const active = s.path === path
                              return (
                                <button
                                  key={s.path}
                                  onClick={() => navigate(s.path)}
                                  className="relative flex w-full items-center gap-xs rounded-sm py-[7px] pl-sm pr-xs text-left transition-colors"
                                  style={{
                                    backgroundColor: active ? 'var(--color-surface-inverse-active)' : undefined,
                                  }}
                                >
                                  {active && (
                                    <motion.span
                                      layoutId="nav-dot"
                                      transition={spring}
                                      className="absolute left-[-10px] size-[5px] rounded-full [background-color:var(--color-brand-inverse)]"
                                    />
                                  )}
                                  <span
                                    className="flex-1 text-sm leading-[18px]"
                                    style={{ color: active ? 'var(--color-fg-inverse)' : 'var(--color-fg-inverse-muted)' }}
                                  >
                                    {s.label}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Fuß */}
            <div className="flex items-center justify-between border-t px-lg pt-sm pb-3xs [border-color:var(--color-border-inverse)]">
              <span className="whitespace-nowrap [font-family:var(--font-mono)] text-2xs tracking-caps [color:var(--color-fg-inverse-muted)]">
                ⌘←→ BLÄTTERN
              </span>
              <button
                onClick={() => {
                  window.location.hash = '#/website'
                  window.location.reload()
                }}
                className="whitespace-nowrap [font-family:var(--font-mono)] text-2xs tracking-caps transition-colors [color:var(--color-fg-inverse-muted)] hover:[color:var(--color-fg-inverse)]"
              >
                ZURÜCKSETZEN
              </button>
            </div>
            <div className="flex items-center gap-xs px-lg pt-sm pb-md">
              <button
                onClick={() => step(-1)}
                disabled={index <= 0}
                className="flex h-[34px] flex-1 items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-35 [background-color:var(--color-surface-inverse-raised)] hover:[background-color:var(--color-surface-inverse-active)]"
              >
                Zurück
              </button>
              <button
                onClick={() => step(1)}
                disabled={index >= FLAT_STEPS.length - 1}
                className="flex h-[34px] flex-[1.4] items-center justify-center gap-[6px] rounded-md text-sm font-semibold transition-colors disabled:opacity-35 [background-color:var(--color-brand)] [color:var(--color-brand-fg)] hover:[background-color:var(--color-brand-hover)]"
              >
                Weiter
                <IconChevronRight />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
