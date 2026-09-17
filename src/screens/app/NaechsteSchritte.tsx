import { useState } from 'react'
import { motion } from 'motion/react'
import AppShell from '../../components/AppShell'
import { EASE, Label } from '../../components/ui'
import { navigate } from '../../lib/router'
import { useDemo } from '../../lib/store'

type Ton = 'ueber' | 'gleich' | 'offen' | 'auto' | 'kalender' | 'wartet' | 'spaeter'

interface Schritt {
  id: string
  titel: string
  meta: string
  bereich: string
  faellig: string
  status: string
  ton: Ton
  aktion?: string
  primaer?: boolean
  icon: 'shield' | 'chat' | 'phone' | 'doc' | 'kalender'
  gruppe: 'JETZT' | 'DIESE WOCHE' | 'SPÄTER'
  ziel?: string
}

const SCHRITTE: Schritt[] = [
  { id: 's1', titel: 'Neue EBW-Regel 2026-01 lesen und vier Fälle nachziehen', meta: 'GILT AB 01.09. · REUTER, KOWALSKI, BAUER, THIELE', bereich: 'Förderung', faellig: 'Seit 07.08.', status: '3 Tage über', ton: 'ueber', aktion: 'Regel öffnen', icon: 'shield', gruppe: 'JETZT', ziel: '/app/regulierungen/aenderungen' },
  { id: 's2', titel: 'Antwort an die BAFA freigeben', meta: 'HANS-JÜRGEN BRENDEL · ENTWURF LIEGT BEREIT', bereich: 'Kommunikation', faellig: 'Seit 08.08.', status: '2 Tage über', ton: 'ueber', aktion: 'Freigeben', primaer: true, icon: 'chat', gruppe: 'JETZT', ziel: '/app/fragen/antwort/brendel' },
  { id: 's3', titel: 'Rückruf Hans-Jürgen Brendel', meta: 'ZUGESAGT FÜR HEUTE VORMITTAG', bereich: 'Fall', faellig: 'Heute 11:00', status: 'In 20 Minuten', ton: 'gleich', aktion: 'Anrufen', icon: 'phone', gruppe: 'JETZT' },
  { id: 's4', titel: 'Rechnung Yildirim prüfen — Leistungszeitraum fehlt', meta: 'MERT YILDIRIM · KORREKTUR AN HANDWERKER NÖTIG', bereich: 'Unterlagen', faellig: 'Di 11.08.', status: 'Offen', ton: 'offen', aktion: 'Prüfen', icon: 'doc', gruppe: 'DIESE WOCHE', ziel: '/app/unterlagen/pruefung' },
  { id: 's5', titel: 'Unterlagen Reuter vollständig', meta: 'FAMILIE REUTER · 2 VON 9 FEHLEN NOCH', bereich: 'Unterlagen', faellig: 'Fr 15.08.', status: 'Läuft automatisch', ton: 'auto', icon: 'doc', gruppe: 'DIESE WOCHE', ziel: '/app/fall/reuter/unterlagen/fehlend' },
  { id: 's6', titel: 'Förderantrag KfW 458 einreichen', meta: 'MERT YILDIRIM · UNTERLAGEN VOLLSTÄNDIG', bereich: 'Förderung', faellig: 'Di 18.08.', status: 'Offen', ton: 'offen', aktion: 'Antrag öffnen', icon: 'shield', gruppe: 'DIESE WOCHE', ziel: '/app/foerderung/programm' },
  { id: 's7', titel: 'Vor-Ort-Termin Familie Reuter', meta: 'BUCHENWEG 14 · AUFMASS UND ANLAGENTECHNIK · 2 STD', bereich: 'Fall', faellig: 'Mi 19.08. 10:00', status: 'Steht im Kalender', ton: 'kalender', icon: 'kalender', gruppe: 'DIESE WOCHE', ziel: '/app/fall/reuter/fristen' },
  { id: 's8', titel: 'Unterlagen Kowalski — seit elf Tagen keine Reaktion', meta: 'AM WALL 27 · 5 VON 9 FEHLEN', bereich: 'Unterlagen', faellig: 'Sa 22.08.', status: 'Wartet', ton: 'wartet', icon: 'doc', gruppe: 'SPÄTER' },
  { id: 's9', titel: 'Verwendungsnachweis Petersen', meta: 'HAUPTSTRASSE 41 · KFW 458 · NACH FERTIGSTELLUNG', bereich: 'Förderung', faellig: 'Mi 02.09.', status: 'Noch drei Wochen', ton: 'spaeter', icon: 'shield', gruppe: 'SPÄTER' },
]

const TON: Record<Ton, { bg: string; line: string; ink: string; icon: 'warn' | 'clock' | 'plus' | 'check' | 'cal' | 'sand' }> = {
  ueber: { bg: 'var(--color-feedback-error-surface)', line: 'var(--color-feedback-error-border)', ink: 'var(--color-feedback-error)', icon: 'warn' },
  gleich: { bg: 'var(--color-accent-amber-wash)', line: 'var(--color-accent-amber-line)', ink: 'var(--color-accent-amber-ink)', icon: 'clock' },
  offen: { bg: 'var(--color-accent-brand-wash)', line: 'var(--color-accent-brand-line)', ink: 'var(--color-brand)', icon: 'plus' },
  auto: { bg: 'var(--color-accent-green-wash)', line: 'var(--color-accent-green-line)', ink: 'var(--color-accent-green-ink)', icon: 'check' },
  kalender: { bg: 'var(--color-surface-sunken)', line: 'var(--color-border)', ink: 'var(--color-fg-muted)', icon: 'cal' },
  wartet: { bg: 'var(--color-surface-sunken)', line: 'var(--color-border)', ink: 'var(--color-fg-muted)', icon: 'sand' },
  spaeter: { bg: 'var(--color-surface-sunken)', line: 'var(--color-border)', ink: 'var(--color-fg-muted)', icon: 'clock' },
}

function StatusIcon({ art, farbe }: { art: string; farbe: string }) {
  const s = { fill: 'none', stroke: farbe, strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
      {art === 'warn' && <><path d="M8 2.2l5.8 10.2H2.2z" {...s} /><path d="M8 6.4v2.6M8 10.9v.1" {...s} /></>}
      {art === 'clock' && <><circle cx="8" cy="8" r="5.8" {...s} /><path d="M8 5V8l2.2 1.4" {...s} /></>}
      {art === 'plus' && <><circle cx="8" cy="8" r="5.8" {...s} /><path d="M8 5.4v5.2M5.4 8h5.2" {...s} /></>}
      {art === 'check' && <path d="M3 8.4l3.2 3.2L13 4.4" {...s} />}
      {art === 'cal' && <><rect x="2.4" y="3.6" width="11.2" height="10" rx="1.6" {...s} /><path d="M2.4 6.6h11.2M5.6 2.4v2.4M10.4 2.4v2.4" {...s} /></>}
      {art === 'sand' && <><path d="M4.4 2.4h7.2M4.4 13.6h7.2" {...s} /><path d="M4.8 2.4c0 3 3.2 4.2 3.2 5.6s-3.2 2.6-3.2 5.6M11.2 2.4c0 3-3.2 4.2-3.2 5.6s3.2 2.6 3.2 5.6" {...s} /></>}
    </svg>
  )
}

function BereichIcon({ art }: { art: Schritt['icon'] }) {
  const s = { fill: 'none', stroke: 'var(--color-fg-subtle)', strokeWidth: 1.3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
      {art === 'shield' && <><path d="M8 1.8l4.8 1.7v4c0 3-2 5.4-4.8 6.7C5.2 12.9 3.2 10.5 3.2 7.5v-4z" {...s} /><path d="M5.9 7.8l1.5 1.5 2.8-3" {...s} /></>}
      {art === 'chat' && <path d="M14 8.6c0 2.8-2.7 5-6 5-.7 0-1.4-.1-2-.3L2.2 14.2l1-2.6C2.4 10.8 2 9.7 2 8.6c0-2.8 2.7-5 6-5s6 2.2 6 5z" {...s} />}
      {art === 'phone' && <path d="M5.4 2.6l1.6 2.6-1.4 1.4a7.6 7.6 0 003.8 3.8l1.4-1.4 2.6 1.6v2a1.4 1.4 0 01-1.6 1.4A11.6 11.6 0 012.2 4.2 1.4 1.4 0 013.6 2.6z" {...s} />}
      {art === 'doc' && <><path d="M4 2h5l3 3v9H4z" {...s} /><path d="M9 2v3h3M6 9.4h4M6 11.6h2.4" {...s} /></>}
      {art === 'kalender' && <><rect x="2.4" y="3.6" width="11.2" height="10" rx="1.6" {...s} /><path d="M2.4 6.6h11.2M5.6 2.4v2.4M10.4 2.4v2.4" {...s} /></>}
    </svg>
  )
}

export default function NaechsteSchritte() {
  const { toast } = useDemo()
  const [gewaehlt, setGewaehlt] = useState<string[]>([])
  const [erledigt, setErledigt] = useState<string[]>([])

  const gruppen: Array<Schritt['gruppe']> = ['JETZT', 'DIESE WOCHE', 'SPÄTER']

  return (
    <AppShell>
      <div className="scrollbar-slim flex-1 overflow-y-auto px-[40px] pt-[36px] pb-[40px] [background-color:var(--color-surface)]">
        <Label>MONTAG, 10. AUGUST 2026 · NEUN SCHRITTE</Label>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="[font-family:var(--font-display)] text-[30px] font-semibold leading-[42px] tracking-tight [color:var(--color-fg)]"
        >
          Nächste Schritte
        </motion.div>

        <div className="flex items-center justify-between pt-[22px] pb-md">
          <div className="flex items-center gap-[10px]">
            <button
              onClick={() => setGewaehlt(gewaehlt.length ? [] : SCHRITTE.map((s) => s.id))}
              className="flex size-[18px] items-center justify-center rounded-[4px] border transition-colors"
              style={{
                backgroundColor: gewaehlt.length ? 'var(--color-fg)' : 'var(--color-surface)',
                borderColor: gewaehlt.length ? 'var(--color-fg)' : 'var(--color-border-strong)',
              }}
            >
              {gewaehlt.length > 0 && (
                <svg width="11" height="11" viewBox="0 0 14 14">
                  <path d="M2.4 7.2l3 3 6.2-6.6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <div className="text-[14px] [color:var(--color-fg-muted)]">{gewaehlt.length} ausgewählt</div>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M3.2 5.2L7 9l3.8-3.8" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center gap-[10px]">
            {['Filter', 'Sortierung'].map((l) => (
              <button
                key={l}
                className="flex h-[36px] items-center gap-xs rounded-md border px-md text-sm font-medium transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border)] [color:var(--color-fg)] hover:[background-color:var(--color-surface-sunken)]"
              >
                <svg width="14" height="14" viewBox="0 0 14 14">
                  {l === 'Filter' ? (
                    <path d="M1.8 3.2h10.4L8.2 7.6v4l-2.4-1.2V7.6z" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinejoin="round" />
                  ) : (
                    <path d="M4 2.6v8.8M4 11.4L2.2 9.6M10 11.4V2.6M10 2.6l1.8 1.8" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                </svg>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-clip rounded-lg border [background-color:var(--color-surface)] [border-color:var(--color-border)]">
          <div className="flex h-[42px] items-center gap-sm border-b px-md [background-color:var(--color-surface-sunken)] [border-color:var(--color-border)]">
            <div className="w-[18px] shrink-0" />
            <div className="w-[20px] shrink-0" />
            <div className="grow basis-0 text-sm font-medium [color:var(--color-fg-muted)]">Schritt</div>
            <div className="w-[130px] shrink-0 text-sm font-medium [color:var(--color-fg-muted)]">Bereich</div>
            <div className="w-[120px] shrink-0 text-sm font-medium [color:var(--color-fg-muted)]">Fällig</div>
            <div className="w-[170px] shrink-0 text-sm font-medium [color:var(--color-fg-muted)]">Status</div>
            <div className="w-[130px] shrink-0 text-sm font-medium [color:var(--color-fg-muted)]">Aktion</div>
            <div className="w-[20px] shrink-0" />
          </div>

          {gruppen.map((g) => {
            const zeilen = SCHRITTE.filter((s) => s.gruppe === g)
            return (
              <div key={g}>
                <div className="flex items-center justify-between border-b px-md py-[7px] [background-color:var(--color-surface-sunken)] [border-color:var(--color-border-subtle)]">
                  <Label>{g}</Label>
                  <Label>{zeilen.length} SCHRITTE</Label>
                </div>
                {zeilen.map((s, i) => {
                  const t = TON[s.ton]
                  const an = gewaehlt.includes(s.id)
                  const fertig = erledigt.includes(s.id)
                  return (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.03, ease: EASE }}
                      className="flex items-center gap-sm border-b px-md py-md transition-colors [border-color:var(--color-border-subtle)] hover:[background-color:color-mix(in_oklab,var(--color-surface-sunken)_55%,transparent)]"
                    >
                      <button
                        onClick={() => setGewaehlt(an ? gewaehlt.filter((x) => x !== s.id) : [...gewaehlt, s.id])}
                        className="flex size-[18px] shrink-0 items-center justify-center rounded-[4px] border transition-colors"
                        style={{ backgroundColor: an ? 'var(--color-fg)' : 'var(--color-surface)', borderColor: an ? 'var(--color-fg)' : 'var(--color-border-strong)' }}
                      >
                        {an && (
                          <svg width="11" height="11" viewBox="0 0 14 14">
                            <path d="M2.4 7.2l3 3 6.2-6.6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                      <div className="flex w-[20px] shrink-0 justify-center"><BereichIcon art={s.icon} /></div>
                      <div className="flex grow basis-0 flex-col gap-2xs">
                        <div className="text-[16px] leading-[20px] [color:var(--color-fg)]" style={fertig ? { textDecoration: 'line-through', opacity: 0.45 } : undefined}>
                          {s.titel}
                        </div>
                        <Label>{s.meta}</Label>
                      </div>
                      <div className="w-[130px] shrink-0 text-sm [color:var(--color-fg-muted)]">{s.bereich}</div>
                      <div className="w-[120px] shrink-0 text-sm [color:var(--color-fg-muted)]">{s.faellig}</div>
                      <div className="w-[170px] shrink-0">
                        <span
                          className="inline-flex h-lg items-center gap-[5px] rounded-full border px-[9px] text-xs font-medium"
                          style={{ backgroundColor: fertig ? 'var(--color-accent-green-wash)' : t.bg, borderColor: fertig ? 'var(--color-accent-green-line)' : t.line, color: fertig ? 'var(--color-accent-green-ink)' : t.ink }}
                        >
                          <StatusIcon art={fertig ? 'check' : t.icon} farbe={fertig ? 'var(--color-accent-green-ink)' : t.ink} />
                          {fertig ? 'Erledigt' : s.status}
                        </span>
                      </div>
                      <div className="w-[130px] shrink-0">
                        {s.aktion && !fertig ? (
                          <button
                            onClick={() => {
                              if (s.ziel) navigate(s.ziel)
                              else {
                                setErledigt([...erledigt, s.id])
                                toast({ title: s.aktion + ' · ' + s.titel.split('—')[0].trim(), body: 'ENSERA hat den Schritt im Fall vermerkt.', tone: 'success' })
                              }
                            }}
                            className="flex h-xl w-[118px] items-center justify-center rounded-md border text-sm font-medium transition-colors"
                            style={
                              s.primaer
                                ? { backgroundColor: 'var(--color-brand)', borderColor: 'var(--color-brand)', color: 'var(--color-brand-fg)' }
                                : { backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-strong)', color: 'var(--color-fg)' }
                            }
                          >
                            {s.aktion}
                          </button>
                        ) : (
                          <div className="w-[118px] text-center text-sm [color:var(--color-fg-subtle)]">—</div>
                        )}
                      </div>
                      <button className="flex w-[20px] shrink-0 justify-center [color:var(--color-fg-subtle)]">
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <circle cx="8" cy="3.4" r="1.3" fill="currentColor" />
                          <circle cx="8" cy="8" r="1.3" fill="currentColor" />
                          <circle cx="8" cy="12.6" r="1.3" fill="currentColor" />
                        </svg>
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
