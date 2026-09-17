import { AnimatePresence, motion } from 'motion/react'
import { useDemo } from '../lib/store'
import { IconCheckCircle, IconMail, IconWarning, IconX } from './icons'

const TONE = {
  neutral: { fg: 'var(--color-fg)', icon: <IconMail /> },
  brand: { fg: 'var(--color-brand)', icon: <IconMail /> },
  success: { fg: 'var(--color-accent-green-ink)', icon: <IconCheckCircle /> },
  error: { fg: 'var(--color-feedback-error)', icon: <IconWarning /> },
}

export default function Toasts() {
  const { toasts, dismiss, navOffen } = useDemo()
  return (
    <div
      className="pointer-events-none fixed bottom-lg z-40 flex w-[360px] flex-col gap-xs transition-[right] duration-300"
      style={{ right: navOffen ? 336 : 24 }}
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => {
          const tone = TONE[t.tone ?? 'neutral']
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              className="pointer-events-auto flex items-start gap-sm rounded-lg border p-sm pr-[10px] shadow-[0_10px_30px_rgba(18,22,27,0.10)] [background-color:var(--color-surface)] [border-color:var(--color-border)]"
            >
              <span className="mt-[2px] shrink-0" style={{ color: tone.fg }}>
                {tone.icon}
              </span>
              <div className="flex-1">
                <div className="text-sm font-semibold tracking-tight [color:var(--color-fg)]">{t.title}</div>
                {t.body && <div className="mt-[3px] text-xs leading-[17px] [color:var(--color-fg-muted)]">{t.body}</div>}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="mt-[1px] shrink-0 rounded-sm p-[3px] [color:var(--color-fg-subtle)] transition-colors hover:[background-color:var(--color-surface-sunken)]"
                aria-label="Schließen"
              >
                <IconX />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
