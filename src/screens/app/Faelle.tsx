import { useState } from 'react'
import { motion } from 'motion/react'
import AppShell from '../../components/AppShell'
import { EASE, Label } from '../../components/ui'
import { IconFolder, IconCopy, IconLink, IconGrid } from '../../components/icons'
import { FAELLE } from '../../lib/daten'
import type { Fall, FallTon } from '../../lib/daten'
import { navigate } from '../../lib/router'
import { useDemo } from '../../lib/store'

const TON: Record<FallTon, { bg: string; line: string; ink: string }> = {
  rot: { bg: 'var(--color-feedback-error-surface)', line: 'var(--color-feedback-error)', ink: 'var(--color-feedback-error)' },
  brand: { bg: 'var(--color-accent-brand-wash)', line: 'var(--color-accent-brand-line)', ink: 'var(--color-brand)' },
  amber: { bg: 'var(--color-accent-amber-wash)', line: 'var(--color-accent-amber-line)', ink: 'var(--color-accent-amber-ink)' },
  gruen: { bg: 'var(--color-accent-green-wash)', line: 'var(--color-accent-green-line)', ink: 'var(--color-accent-green-ink)' },
  grau: { bg: 'var(--color-accent-green-wash)', line: 'var(--color-accent-green-line)', ink: 'var(--color-accent-green-ink)' },
}

function AkteurIcon({ akteur, farbe }: { akteur: Fall['akteur']; farbe: string }) {
  if (akteur === 'fertig')
    return (
      <svg width="15" height="15" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
        <circle cx="8" cy="8" r="6.5" fill="none" stroke={farbe} strokeWidth="1.3" />
        <path d="M5.2 8.2 7.2 10.2 11 5.9" fill="none" stroke={farbe} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  if (akteur === 'niemand' || akteur === 'handwerker')
    return (
      <svg width="15" height="15" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
        <circle cx="8" cy="8" r="6.5" fill="none" stroke={farbe} strokeWidth="1.3" />
        <path d="M8 4.6V8l2.4 1.6" fill="none" stroke={farbe} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="6.5" fill="none" stroke={farbe} strokeWidth="1.3" />
      <circle cx="8" cy="6.5" r="1.75" fill={farbe} />
      <path d="M4.75 12.9a3.45 3.45 0 0 1 6.5 0" fill="none" stroke={farbe} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

const FILTER = [
  { label: 'Alle', test: () => true },
  { label: 'Wartet auf Sie', test: (f: Fall) => f.akteur === 'sie' },
  { label: 'Wartet auf Kundschaft', test: (f: Fall) => f.akteur === 'kundschaft' },
  { label: 'Unabhängig', test: (f: Fall) => f.akteur === 'niemand' || f.akteur === 'handwerker' || f.akteur === 'fertig' },
]

export default function Faelle() {
  const { status, anfrage } = useDemo()
  const [filter, setFilter] = useState('Alle')

  const alle: Fall[] =
    status === 'angenommen'
      ? [
          {
            id: 'sander',
            kundschaft: anfrage.name,
            ort: anfrage.ort.replace(/^\d+\s/, ''),
            foerderweg: 'Noch offen',
            schritt: 'Erstgespräch',
            frist: 'heute',
            fragen: 0,
            akteur: 'sie',
            ton: 'brand',
            aktion: 'Sie · Termin abstimmen',
          },
          ...FAELLE,
        ]
      : FAELLE

  const aktiv = FILTER.find((f) => f.label === filter)!
  const sichtbar = alle.filter(aktiv.test)

  const aktionen = [
    { icon: <IconFolder />, label: 'Fall anlegen', onClick: () => navigate('/app/faelle/neu-unterlagen') },
    { icon: <IconCopy />, label: 'Vorlage anpassen', onClick: () => navigate('/app/einstellungen/vorlagen') },
    { icon: <IconLink />, label: 'Erstanfrage-Link senden', onClick: () => navigate('/website') },
    { icon: <IconGrid />, label: 'Alle Aktionen', shortcut: '⌘P', divider: true, onClick: () => navigate('/app/fall/reuter/aktionen') },
  ]

  return (
    <AppShell quickActions={aktionen}>
      <div className="scrollbar-slim flex-1 overflow-y-auto [background-color:var(--color-surface)]">
        <div className="px-[40px] pt-[36px]">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="[font-family:var(--font-display)] text-[30px] font-semibold leading-[38px] tracking-tight [color:var(--color-fg)]"
          >
            Fälle
          </motion.div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-xs px-[40px] pt-[26px]">
          {FILTER.map((f) => {
            const an = f.label === filter
            const n = alle.filter(f.test).length
            return (
              <button
                key={f.label}
                onClick={() => setFilter(f.label)}
                className="relative flex h-[30px] items-center gap-xs rounded-full border px-sm transition-colors"
                style={{
                  backgroundColor: an ? 'var(--color-fg)' : 'transparent',
                  borderColor: an ? 'var(--color-fg)' : 'var(--color-border)',
                }}
              >
                <div className="text-sm leading-md" style={{ color: an ? 'var(--color-fg-inverse)' : 'var(--color-fg-muted)', fontWeight: an ? 500 : 400 }}>
                  {f.label}
                </div>
                <div className="[font-family:var(--font-mono)] text-2xs leading-[14px]" style={{ color: an ? '#FFFFFF99' : 'var(--color-fg-subtle)' }}>
                  {n}
                </div>
              </button>
            )
          })}
        </div>

        {/* Tabelle */}
        <div className="px-[40px] pt-[24px] pb-[40px]">
          <div className="flex items-center gap-[18px] border-b pb-[10px] [border-color:var(--color-border)]">
            <div className="grow basis-0"><Label>KUNDSCHAFT</Label></div>
            <div className="w-[84px] shrink-0"><Label>ORT</Label></div>
            <div className="w-[132px] shrink-0"><Label>FÖRDERWEG</Label></div>
            <div className="w-[152px] shrink-0"><Label>DERZEITIGER SCHRITT</Label></div>
            <div className="w-[108px] shrink-0"><Label>FRISTEN</Label></div>
            <div className="w-2xl shrink-0"><Label>FRAGEN</Label></div>
            <div className="w-[230px] shrink-0"><Label>AKTEUR · AKTION</Label></div>
            <div className="w-md shrink-0" />
          </div>

          {sichtbar.map((f, i) => {
            const t = TON[f.ton]
            const aus = f.akteur === 'fertig'
            return (
              <motion.button
                key={f.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.025, 0.25), ease: EASE }}
                onClick={() => navigate('/app/fall/' + (f.id === 'reuter' ? 'reuter' : f.id))}
                className="flex h-[56px] w-full shrink-0 items-center gap-[18px] border-b text-left transition-colors [border-color:var(--color-border-subtle)] hover:[background-color:var(--color-surface-sunken)]"
              >
                <div
                  className="grow basis-0 truncate text-base font-medium leading-[18px]"
                  style={{ color: aus ? 'var(--color-fg-subtle)' : 'var(--color-fg)' }}
                >
                  {f.kundschaft}
                </div>
                <div className="w-[84px] shrink-0 text-sm leading-md" style={{ color: aus ? 'var(--color-fg-subtle)' : 'var(--color-fg-muted)' }}>
                  {f.ort}
                </div>
                <div
                  className="w-[132px] shrink-0 text-sm leading-md"
                  style={{ color: !f.foerderweg || f.foerderweg === 'Noch offen' ? 'var(--color-fg-subtle)' : aus ? 'var(--color-fg-subtle)' : 'var(--color-fg)' }}
                >
                  {f.foerderweg || 'Noch offen'}
                </div>
                <div className="w-[152px] shrink-0 text-sm leading-md" style={{ color: aus ? 'var(--color-fg-subtle)' : 'var(--color-fg)' }}>
                  {f.schritt}
                </div>
                <div
                  className="w-[108px] shrink-0 [font-family:var(--font-mono)] text-xs leading-md"
                  style={{ color: f.fristWarn ? 'var(--color-feedback-error)' : aus ? 'var(--color-fg-subtle)' : 'var(--color-fg-muted)' }}
                >
                  {f.frist}
                </div>
                <div className="flex w-2xl shrink-0 items-center gap-[7px]">
                  {f.fragen > 0 ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                        <path d="M14 8.6c0 2.8-2.7 5-6 5-.7 0-1.4-.1-2-.3L2.2 14.2l1-2.6C2.4 10.8 2 9.7 2 8.6c0-2.8 2.7-5 6-5s6 2.2 6 5z" fill="none" stroke="var(--color-section-fragen)" strokeWidth="1.4" strokeLinejoin="round" />
                      </svg>
                      <div className="[font-family:var(--font-mono)] text-xs leading-md [color:var(--color-fg)]">{f.fragen}</div>
                    </>
                  ) : (
                    <div className="[font-family:var(--font-mono)] text-xs leading-md [color:var(--color-fg-subtle)]">—</div>
                  )}
                </div>
                <div className="flex w-[230px] shrink-0 items-center">
                  <div
                    className="flex h-[26px] shrink-0 items-center gap-[7px] rounded-full border pl-[10px] pr-[14px]"
                    style={{ backgroundColor: t.bg, borderColor: t.line }}
                  >
                    <AkteurIcon akteur={f.akteur} farbe={t.ink} />
                    <div className="whitespace-nowrap text-[12.5px] font-medium leading-md" style={{ color: t.ink }}>
                      {f.aktion}
                    </div>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                  <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
