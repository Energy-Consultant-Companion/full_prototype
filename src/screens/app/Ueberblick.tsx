import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import AppShell from '../../components/AppShell'
import AktionsZeile from '../../components/AktionsZeile'
import { EASE, Label } from '../../components/ui'
import { AKTIONEN, REGELN } from '../../lib/daten'
import type { Aktion } from '../../lib/daten'
import { navigate } from '../../lib/router'
import { useDemo } from '../../lib/store'

export default function Ueberblick() {
  const { status, anfrage } = useDemo()
  const [offen, setOffen] = useState<string | null>('a1')
  const [regelOffen, setRegelOffen] = useState<string | null>('r1')

  const neueAktion: Aktion = {
    id: 'neu',
    titel: 'Erstgespräch mit ' + anfrage.name + ' terminieren',
    meta: (anfrage.name + ' · ZUGANG HEUTE VERSCHICKT').toUpperCase(),
    bereich: 'Kommunikation',
    ausfuehrung: 'selbst',
    fall: anfrage.name,
    icon: 'send',
    frist: 'Heute',
    gepruefte:
      'Der Zugang ist raus. Drei freie Termine aus Ihrem Kalender stehen schon in einer Mail — Sie müssen sie nur noch abschicken.',
    belege: ['Drei Termine frei', 'Anfahrt 18 km'],
    ziel: '/app/fall/sander/kundschaft/termin',
    knopf: 'Mail öffnen',
  }

  const aktionen: Aktion[] = status === 'angenommen' ? [neueAktion, ...AKTIONEN] : AKTIONEN

  return (
    <AppShell>
      <div className="scrollbar-slim flex-1 overflow-y-auto px-[40px] pt-[36px] pb-[28px] [background-color:var(--color-surface)]">
        <div className="flex items-end justify-between gap-[40px] pb-[26px]">
          <div className="flex flex-col">
            <Label>
              MONTAG, 10. AUGUST 2026 · {aktionen.length === 6 ? 'SECHS' : 'FÜNF'} AKTIONEN, DREI REGELÄNDERUNGEN
            </Label>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="[font-family:var(--font-display)] text-[26px] font-semibold leading-[42px] tracking-tighter [color:var(--color-fg)]"
            >
              Überblick
            </motion.div>
          </div>
          <button className="relative flex size-[34px] shrink-0 items-center justify-center rounded-md border transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border)] hover:[background-color:var(--color-surface-sunken)]">
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" fill="none" stroke="var(--color-fg)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.7 21a2 2 0 01-3.4 0" fill="none" stroke="var(--color-fg)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute right-[7px] top-[6px] size-[6px] rounded-full border-[1.5px] [background-color:var(--color-feedback-error)] [border-color:var(--color-surface)]" />
          </button>
        </div>

        <div className="flex items-start gap-lg">
          {/* Aktionen */}
          <div className="flex min-w-0 grow flex-col gap-sm">
            <div className="flex items-baseline justify-between gap-md px-3xs pb-3xs">
              <div className="[font-family:var(--font-display)] text-lg font-semibold leading-[26px] tracking-tight [color:var(--color-fg)]">Aktionen</div>
              <Label>FÜNF OFFEN · DREI BRAUCHEN IHRE FREIGABE</Label>
            </div>
            <div className="flex flex-col overflow-clip rounded-lg border [background-color:var(--color-surface)] [border-color:var(--color-border)]">
              <div className="flex h-[42px] shrink-0 items-center gap-sm border-b px-md [background-color:var(--color-surface-sunken)] [border-color:var(--color-border)]">
                <div className="w-[20px] shrink-0" />
                <div className="grow basis-0 text-sm font-medium leading-[17px] [color:var(--color-fg-muted)]">Aktion</div>
                <div className="w-4xl shrink-0 text-sm font-medium leading-[17px] [color:var(--color-fg-muted)]">Bereich</div>
                <div className="w-[140px] shrink-0 text-sm font-medium leading-[17px] [color:var(--color-fg-muted)]">Ausführung</div>
                <div className="flex w-4xl shrink-0 justify-end text-right text-sm font-medium leading-[17px] [color:var(--color-fg-muted)]">Öffnen</div>
                <div className="w-[20px] shrink-0" />
              </div>
              {aktionen.map((a, i) => (
                <AktionsZeile
                  key={a.id}
                  a={a}
                  offen={offen === a.id}
                  onToggle={() => setOffen(offen === a.id ? null : a.id)}
                  onOeffnen={() => navigate(a.ziel)}
                  letzte={i === aktionen.length - 1}
                />
              ))}
              <button
                onClick={() => navigate('/app/schritte')}
                className="flex h-[44px] shrink-0 items-center justify-between gap-sm border-t px-md transition-colors [border-color:var(--color-border-subtle)] hover:[background-color:var(--color-surface-sunken)]"
              >
                <div className="text-sm font-medium leading-[17px] [color:var(--color-brand)]">Alle nächsten Schritte</div>
                <Label>VIER WEITERE DIESE WOCHE</Label>
              </button>
            </div>
          </div>

          {/* Regulierungen */}
          <div className="flex w-[288px] shrink-0 flex-col gap-sm">
            <div className="flex items-baseline justify-between gap-sm px-3xs pb-3xs">
              <div className="[font-family:var(--font-display)] text-lg font-semibold leading-[26px] tracking-tight [color:var(--color-fg)]">
                Regulierungen
              </div>
              <Label>3 VON 9</Label>
            </div>
            <div className="flex flex-col overflow-clip rounded-lg border [background-color:var(--color-surface)] [border-color:var(--color-border)]">
              <div className="flex h-[42px] shrink-0 items-center gap-[10px] border-b px-md [background-color:var(--color-surface-sunken)] [border-color:var(--color-border)]">
                <div className="grow basis-0 text-sm font-medium leading-[17px] [color:var(--color-fg-muted)]">Änderung</div>
                <div className="flex w-[36px] shrink-0 justify-end text-sm font-medium leading-[17px] [color:var(--color-fg-muted)]">Fälle</div>
                <div className="w-[20px] shrink-0" />
              </div>
              {REGELN.map((r, i) => {
                const auf = regelOffen === r.id
                return (
                  <div key={r.id} className={'flex flex-col' + (i < REGELN.length - 1 ? ' border-b [border-color:var(--color-border-subtle)]' : '')}>
                    <div
                      onClick={() => setRegelOffen(auf ? null : r.id)}
                      className="flex cursor-pointer items-start gap-[10px] p-md transition-colors hover:[background-color:color-mix(in_oklab,var(--color-surface-sunken)_60%,transparent)]"
                    >
                      <div className="flex grow basis-0 flex-col gap-2xs">
                        <Label>{r.datum} · {r.quelle}</Label>
                        <div className="text-[14px] leading-[19px] tracking-mono [color:var(--color-fg)]">{r.titel}</div>
                      </div>
                      <div className="flex w-[36px] shrink-0 justify-end pt-[9px] text-[14px] font-medium leading-[18px] [color:var(--color-fg)]">
                        {r.faelle}
                      </div>
                      <motion.div animate={{ rotate: auf ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex w-[20px] shrink-0 justify-center pt-[10px]">
                        <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                          <path d="M4.4 6.2L8 9.8l3.6-3.6" fill="none" stroke={auf ? 'var(--color-fg)' : 'var(--color-fg-subtle)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    </div>
                    <AnimatePresence initial={false}>
                      {auf && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-sm px-md pt-3xs pb-md">
                            <div className="flex flex-col gap-xs border-l-2 pl-[14px]" style={{ borderColor: 'var(--color-brand-border)' }}>
                              <Label>WAS SICH ÄNDERT</Label>
                              <div className="text-sm leading-[20px] [color:var(--color-fg-muted)]">{r.aendert}</div>
                            </div>
                            <div className="flex items-center gap-[10px] pl-md">
                              <button
                                onClick={() => navigate('/app/regulierungen/aenderungen')}
                                className="flex h-xl w-[88px] shrink-0 items-center justify-center rounded-md border px-[14px] text-sm font-medium leading-[17px] transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border-strong)] [color:var(--color-fg)] hover:[background-color:var(--color-surface-sunken)]"
                              >
                                Ansehen
                              </button>
                              <Label>{r.hinweis}</Label>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
              <button
                onClick={() => navigate('/app/regulierungen/aenderungen')}
                className="flex h-[42px] shrink-0 items-center justify-between gap-sm px-md transition-colors hover:[background-color:var(--color-surface-sunken)]"
              >
                <div className="text-sm font-medium leading-[17px] [color:var(--color-brand)]">Alle neun Änderungen</div>
                <Label>SEIT 1. JULI</Label>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
