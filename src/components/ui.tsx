import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'motion/react'

export const EASE = [0.22, 1, 0.36, 1] as const
export const SPRING = { type: 'spring' as const, stiffness: 420, damping: 38 }

/* Beschriftung in Versalien, wie im Entwurf */
export function Label({ children, tone = 'subtle' }: { children: ReactNode; tone?: 'subtle' | 'muted' | 'fg' | 'brand' | 'error' }) {
  const color = {
    subtle: 'var(--color-fg-subtle)',
    muted: 'var(--color-fg-muted)',
    fg: 'var(--color-fg)',
    brand: 'var(--color-brand)',
    error: 'var(--color-feedback-error)',
  }[tone]
  return (
    <div className="[font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps" style={{ color }}>
      {children}
    </div>
  )
}

/* Weiße Karte mit feinem Rand, wie überall im System */
export function Karte({ children, className = '', style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={
        'rounded-lg border shadow-[#12161B0F_0px_1px_2px] [background-color:var(--color-surface)] [border-color:var(--color-border)] ' + className
      }
      style={style}
    >
      {children}
    </div>
  )
}

/* Scrollbarer Hauptbereich */
export function Main({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={'scrollbar-slim flex-1 overflow-y-auto ' + className}>{children}</div>
}

/* Seitentitel mit Kontextzeile darüber */
export function SeitenKopf({ ober, titel, rechts }: { ober?: string; titel: string; rechts?: ReactNode }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        {ober && <Label>{ober}</Label>}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className={'[font-family:var(--font-display)] text-[30px] font-semibold leading-[38px] tracking-tight [color:var(--color-fg)]' + (ober ? ' mt-xs' : '')}
        >
          {titel}
        </motion.h1>
      </div>
      {rechts}
    </div>
  )
}

const TONE = {
  brand: { bg: 'var(--color-brand-surface)', line: 'var(--color-brand-border)', ink: 'var(--color-brand)' },
  green: { bg: 'var(--color-accent-green-wash)', line: 'var(--color-accent-green-line)', ink: 'var(--color-accent-green-ink)' },
  amber: { bg: 'var(--color-accent-amber-wash)', line: 'var(--color-accent-amber-line)', ink: 'var(--color-accent-amber-ink)' },
  pink: { bg: 'var(--color-accent-pink-wash)', line: 'var(--color-accent-pink-line)', ink: 'var(--color-accent-pink-ink)' },
  violet: { bg: 'var(--color-accent-violet-wash)', line: 'var(--color-accent-violet-line)', ink: 'var(--color-accent-violet-ink)' },
  sky: { bg: 'var(--color-accent-sky-wash)', line: 'var(--color-accent-sky-line)', ink: 'var(--color-accent-sky-ink)' },
  teal: { bg: 'var(--color-accent-teal-wash)', line: 'var(--color-accent-teal-line)', ink: 'var(--color-accent-teal-ink)' },
  grau: { bg: 'var(--color-surface-sunken)', line: 'var(--color-border)', ink: 'var(--color-fg-muted)' },
  rot: { bg: 'var(--color-feedback-error-surface)', line: 'var(--color-feedback-error-border)', ink: 'var(--color-feedback-error)' },
}
export type Ton = keyof typeof TONE

/* Statuspille mit Rand — das Muster aus der Fallliste */
export function Pille({ ton = 'grau', icon, children }: { ton?: Ton; icon?: ReactNode; children: ReactNode }) {
  const t = TONE[ton]
  return (
    <span
      className="inline-flex h-[26px] items-center gap-[6px] rounded-full border px-[10px] text-xs font-medium leading-none"
      style={{ backgroundColor: t.bg, borderColor: t.line, color: t.ink }}
    >
      {icon}
      {children}
    </span>
  )
}

/* Knopf in den drei Stärken des Entwurfs */
export function Knopf({
  variante = 'sekundaer',
  gross,
  icon,
  onClick,
  children,
  className = '',
  disabled,
}: {
  variante?: 'primaer' | 'sekundaer' | 'leise'
  gross?: boolean
  icon?: ReactNode
  onClick?: () => void
  children: ReactNode
  className?: string
  disabled?: boolean
}) {
  const base =
    'inline-flex shrink-0 items-center justify-center gap-[9px] rounded-full transition-all duration-200 disabled:opacity-45 disabled:pointer-events-none ' +
    (gross ? 'h-[46px] px-[22px] text-base font-semibold tracking-tight ' : 'h-[34px] px-[16px] text-sm font-medium ')
  const styles = {
    primaer: '[background-color:var(--color-brand)] [color:var(--color-brand-fg)] hover:[background-color:var(--color-brand-hover)] active:scale-[0.98]',
    sekundaer:
      'border [border-color:var(--color-border-strong)] [color:var(--color-fg)] hover:[background-color:var(--color-surface-sunken)] active:scale-[0.98]',
    leise: 'border [border-color:var(--color-border)] [color:var(--color-fg-muted)] hover:[background-color:var(--color-surface-sunken)] active:scale-[0.98]',
  }[variante]
  return (
    <button onClick={onClick} disabled={disabled} className={base + styles + ' ' + className}>
      {icon}
      {children}
    </button>
  )
}

/* Tabellenzeile, die auf Hover leicht anhebt */
export function Zeile({ onClick, children, className = '' }: { onClick?: () => void; children: ReactNode; className?: string }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={onClick ? { backgroundColor: 'var(--color-surface-sunken)' } : undefined}
      transition={{ duration: 0.15 }}
      className={'border-b [border-color:var(--color-border-subtle)] ' + (onClick ? 'cursor-pointer ' : '') + className}
    >
      {children}
    </motion.div>
  )
}
