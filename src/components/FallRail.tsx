import { motion } from 'motion/react'
import { ZAEHLER_JE_FALL } from '../lib/daten'
import { navigate, useRoute } from '../lib/router'

interface Eintrag {
  label: string
  tab: string
  zahl?: string
  warn?: boolean
}

function gruppen(fallId: string): Array<{ titel: string; eintraege: Eintrag[] }> {
  const z = ZAEHLER_JE_FALL[fallId] ?? ZAEHLER_JE_FALL.reuter
  return [
    {
      titel: 'Fall',
      eintraege: [
        { label: 'Übersicht', tab: '' },
        { label: 'Schritte', tab: 'schritte', zahl: z.schritte },
        { label: 'Fristen', tab: 'fristen', zahl: z.fristen },
      ],
    },
    {
      titel: 'Unterlagen',
      eintraege: [
        { label: 'Ablage', tab: 'unterlagen', zahl: z.ablage },
        { label: 'Fehlend', tab: 'unterlagen/fehlend', zahl: z.fehlend, warn: z.fehlend !== '0' },
      ],
    },
    {
      titel: 'Kommunikation',
      eintraege: [
        { label: 'Kundschaft', tab: 'kundschaft', zahl: z.kundschaft },
        { label: 'Handwerk', tab: 'handwerk', zahl: z.handwerk },
        { label: 'Behörde', tab: 'behoerde', zahl: z.behoerde },
      ],
    },
    {
      titel: 'Verlauf',
      eintraege: [
        { label: 'Alles', tab: 'verlauf', zahl: z.verlauf },
        { label: 'Notizen', tab: 'verlauf/notizen', zahl: z.notizen },
        { label: 'Entscheidungen', tab: 'verlauf/entscheidungen', zahl: z.entscheidungen },
      ],
    },
  ]
}

export default function FallRail({ fallId }: { fallId: string }) {
  const path = useRoute()
  const basis = '/app/fall/' + fallId
  const aktuell = path.startsWith(basis) ? path.slice(basis.length).replace(/^\//, '') : ''
  const GRUPPEN = gruppen(fallId)

  /* Der längste passende Reiter gewinnt — sonst leuchtet bei
     „unterlagen/fehlend“ auch „unterlagen“ auf. */
  const aktiverTab = GRUPPEN.flatMap((g) => g.eintraege.map((e) => e.tab))
    .filter((t) => aktuell === t || (t !== '' && aktuell.startsWith(t + '/')))
    .sort((a, b) => b.length - a.length)[0] ?? ''

  return (
    <div className="flex w-[248px] shrink-0 flex-col items-center self-stretch border-l px-[20px] pt-[136px] pb-lg [background-color:var(--color-surface)] [border-color:var(--color-border)]">
      {GRUPPEN.map((g, gi) => (
        <div key={g.titel} className={'flex flex-col self-stretch' + (gi > 0 ? ' pt-[22px]' : '')}>
          <div className="px-xs pb-xs text-xs leading-md [color:var(--color-fg-subtle)]">{g.titel}</div>
          <div className="relative flex flex-col">
            <div
              className="absolute left-[11px] top-[5px] w-px [background-color:var(--color-border)]"
              style={{ height: g.eintraege.length * 36 - 8 }}
            />
            {g.eintraege.map((e) => {
              const an = e.tab === aktiverTab
              return (
                <button
                  key={e.label}
                  onClick={() => navigate(basis + (e.tab ? '/' + e.tab : ''))}
                  className="relative flex h-[36px] shrink-0 items-center rounded-md pr-[10px]"
                >
                  {an && (
                    <motion.span
                      layoutId="fall-rail-aktiv"
                      transition={{ type: 'spring', stiffness: 520, damping: 42 }}
                      className="absolute inset-0 rounded-md [background-color:var(--color-surface-sunken)]"
                    />
                  )}
                  <div className="relative flex w-lg shrink-0 items-center justify-center">
                    {an ? (
                      <div className="size-[5px] shrink-0 rounded-full [background-color:var(--color-fg)]" />
                    ) : (
                      <div className="h-[11px] w-px shrink-0 [background-color:var(--color-border-strong)]" />
                    )}
                  </div>
                  <div
                    className="relative grow basis-0 text-left text-[14px] leading-[18px]"
                    style={{ color: an ? 'var(--color-fg)' : 'var(--color-fg-muted)', fontWeight: an ? 500 : 400 }}
                  >
                    {e.label}
                  </div>
                  {e.zahl && (
                    <div
                      className="relative shrink-0 [font-family:var(--font-mono)] text-2xs leading-[14px]"
                      style={{ color: e.warn ? 'var(--color-feedback-error)' : 'var(--color-fg-subtle)' }}
                    >
                      {e.zahl}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
