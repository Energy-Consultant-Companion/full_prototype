import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { navigate, useRoute } from '../lib/router'
import { useDemo } from '../lib/store'
import {
  IconAnfragen, IconChevronUpDown, IconFaelle, IconFoerderung, IconFragen, IconGear,
  IconRegulierungen, IconSchritte, IconSearch, IconPanel, IconUeberblick, IconUnterlagen,
} from './icons'

export interface QuickAction {
  icon: ReactNode
  label: string
  shortcut?: string
  onClick?: () => void
  divider?: boolean
}

interface NavItem {
  icon: ReactNode
  label: string
  path: string
  count?: number
  badge?: number
}

function gruppen(faelle: number, anfragen: number): Array<{ title: string; items: NavItem[] }> {
  return [
  {
    title: 'ARBEIT',
    items: [
      { icon: <IconUeberblick />, label: 'Überblick', path: '/app/ueberblick' },
      { icon: <IconFaelle />, label: 'Fälle', path: '/app/faelle', count: faelle },
      { icon: <IconSchritte />, label: 'Nächste Schritte', path: '/app/schritte', count: 3 },
    ],
  },
  {
    title: 'PRÜFEN',
    items: [
      { icon: <IconUnterlagen />, label: 'Unterlagen', path: '/app/unterlagen', count: 5 },
      { icon: <IconFoerderung />, label: 'Förderung', path: '/app/foerderung', badge: 2 },
      { icon: <IconRegulierungen />, label: 'Regulierungen', path: '/app/regulierungen', count: 9 },
    ],
  },
  {
    title: 'KONTAKT',
    items: [
      { icon: <IconAnfragen />, label: 'Anfragen', path: '/app/anfragen', badge: anfragen },
      { icon: <IconFragen />, label: 'Fragen', path: '/app/fragen', badge: 3 },
    ],
  },
  ]
}

export default function Sidebar({ quickActions }: { quickActions?: QuickAction[] }) {
  const path = useRoute()
  const { status } = useDemo()
  const GROUPS = gruppen(status === 'angenommen' ? 13 : 12, status === 'offen' ? 2 : 1)

  return (
    <div className="flex w-rail shrink-0 flex-col self-stretch border-r px-md pt-[20px] pb-md [background-color:var(--color-surface-sunken)] [border-color:var(--color-border)]">
      {/* Marke */}
      <div className="flex items-center justify-between px-xs pb-[18px]">
        <div className="flex items-center gap-[10px]">
          <div className="[font-family:var(--font-display)] text-base font-semibold leading-[18px] tracking-tight [color:var(--color-fg)]">
            ENSERA
          </div>
        </div>
        <IconPanel />
      </div>

      {/* Suche */}
      <button
        onClick={() => navigate('/app/suche')}
        className="flex h-[38px] shrink-0 items-center gap-xs rounded-md border px-[10px] shadow-[#12161B0F_0px_1px_2px] transition-shadow [background-color:var(--color-surface)] [border-color:var(--color-border)] hover:shadow-[#12161B1A_0px_2px_6px]"
      >
        <IconSearch />
        <div className="grow basis-0 text-left text-sm leading-md [color:var(--color-fg-subtle)]">Suchen oder fragen</div>
        <div className="shrink-0 [font-family:var(--font-mono)] text-2xs leading-[14px] [color:var(--color-fg-subtle)]">⌘K</div>
      </button>

      {/* Navigation */}
      <div className="flex flex-col gap-3xs pt-md">
        {GROUPS.map((g, gi) => (
          <div key={g.title} className={'flex flex-col gap-3xs' + (gi > 0 ? ' pt-[14px]' : '')}>
            <div className="px-xs pb-[6px]">
              <div className="[font-family:var(--font-mono)] text-2xs leading-[14px] tracking-caps [color:var(--color-fg-subtle)]">
                {g.title}
              </div>
            </div>
            {g.items.map((it) => {
              const active = path === it.path || path.startsWith(it.path + '/')
              return (
                <button
                  key={it.path}
                  onClick={() => navigate(it.path)}
                  className="relative flex h-[36px] shrink-0 items-center gap-sm rounded-md px-[10px]"
                >
                  {active && (
                    <motion.span
                      layoutId="rail-active"
                      transition={{ type: 'spring', stiffness: 520, damping: 42 }}
                      className="absolute inset-0 rounded-md border shadow-[#12161B0F_0px_1px_2px] [background-color:var(--color-surface)] [border-color:var(--color-border)]"
                    />
                  )}
                  <span className="relative">{it.icon}</span>
                  <div
                    className="relative grow basis-0 text-left text-[14px] leading-[18px]"
                    style={{
                      color: active ? 'var(--color-fg)' : 'var(--color-fg-muted)',
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    {it.label}
                  </div>
                  {it.badge !== undefined ? (
                    <div className="relative flex h-[18px] w-lg shrink-0 items-center justify-center rounded-xs [background-color:var(--color-brand)]">
                      <div className="[font-family:var(--font-mono)] text-2xs leading-[14px] [color:var(--color-brand-fg)]">{it.badge}</div>
                    </div>
                  ) : (
                    <div
                      className="relative flex w-lg shrink-0 flex-wrap justify-end text-right [font-family:var(--font-mono)] text-2xs leading-[14px]"
                      style={{ color: active ? 'var(--color-fg-muted)' : 'var(--color-fg-subtle)' }}
                    >
                      {it.count ?? ''}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Kontextaktionen */}
      {quickActions && quickActions.length > 0 && (
        <div className="flex flex-col items-center justify-end gap-3xs pt-[50px]">
          <div className="h-[22px] self-stretch px-[10px] pb-[10px]" />
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={a.onClick}
              className={
                'flex h-[34px] shrink-0 items-center gap-sm self-stretch rounded-md px-[10px] transition-colors hover:[background-color:var(--color-surface)]' +
                (a.divider ? ' mt-[6px] border-t [border-color:var(--color-border)]' : '')
              }
            >
              <div className="flex w-md shrink-0 justify-center">{a.icon}</div>
              <div className="grow basis-0 text-left text-[14px] leading-[18px] [color:var(--color-fg)]">{a.label}</div>
              {a.shortcut && (
                <div className="shrink-0 [font-family:var(--font-mono)] text-2xs leading-[14px] [color:var(--color-fg-subtle)]">{a.shortcut}</div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Werkzeuge */}
      <div className="mt-auto flex items-center gap-[6px] px-2xs">
        <button
          onClick={() => navigate('/app/einstellungen')}
          className="flex size-xl shrink-0 items-center justify-center rounded-md transition-colors hover:[background-color:var(--color-surface)]"
          aria-label="Einstellungen"
        >
          <IconGear />
        </button>
      </div>

      {/* Nutzerkarte */}
      <div className="mt-[14px] flex h-[52px] shrink-0 items-center gap-2xs rounded-lg border px-sm shadow-[#12161B0F_0px_1px_2px] [background-color:var(--color-surface)] [border-color:var(--color-border)]">
        <div className="flex size-[28px] shrink-0 items-center justify-center overflow-hidden rounded-full [background-color:var(--color-fg)]">
          <img src="./assets/katrin.jpg" alt="" className="size-full object-cover" />
        </div>
        <div className="flex grow basis-0 flex-col gap-px px-[5px]">
          <div className="text-sm font-medium leading-md [color:var(--color-fg)]">Katrin Held</div>
        </div>
        <IconChevronUpDown />
      </div>
    </div>
  )
}
