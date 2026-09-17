import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import AppShell from '../../components/AppShell'
import { Label, EASE } from '../../components/ui'
import { navigate } from '../../lib/router'
import { useDemo } from '../../lib/store'

const Haken = ({ c = 'var(--color-fg)', s = 13 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
    <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Uhr = ({ c = 'var(--color-fg-muted)' }) => (
  <svg width="12" height="12" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
    <circle cx="7" cy="7" r="5.3" fill="none" stroke={c} strokeWidth="1.4" />
    <path d="M7 4.2V7l2 1.4" fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Kreuz = ({ c = 'var(--color-fg-subtle)' }) => (
  <svg width="12" height="12" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
    <path d="M3.4 3.4l7.2 7.2M10.6 3.4l-7.2 7.2" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const Warn = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
    <path d="M7 1.9l5.1 8.8H1.9z" fill="none" stroke="var(--color-feedback-error)" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M7 5.4v2.1M7 9.2v.1" fill="none" stroke="var(--color-feedback-error)" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)
const Frage = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
    <circle cx="7" cy="7" r="5.3" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.4" />
    <path d="M5.6 5.6a1.5 1.5 0 012.8.7c-.3.5-1.1.7-1.3 1.4M7 10v.1" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const ERLEDIGT = [
  { icon: <Haken c="var(--color-fg-muted)" s={12} />, name: 'Kai Ostermann', datum: '08.08.', status: 'ANGENOMMEN · ZUGANG RAUS', gedimmt: false },
  { icon: <Uhr />, name: 'Renate Fischbach', datum: '06.08.', status: 'NACHGEFRAGT · WARTET SEIT 4 TAGEN', gedimmt: false },
  { icon: <Kreuz />, name: 'Bauträger Nordhorn GmbH', datum: '04.08.', status: 'ABGESAGT · NICHT IHR ZUSCHNITT', gedimmt: true },
]

const REGELN_LINKS = ['Ein- oder Zweifamilienhaus', 'kein Gewerbe', 'kein Neubau — Baujahr 1972 aus dem Text']
const REGELN_RECHTS = ['kein MFH', 'keine größere Sanierung']

export default function Anfragen() {
  const { anfrage, status, setStatus, toast } = useDemo()
  const [gewaehlt, setGewaehlt] = useState<'sander' | 'deibel'>('sander')
  const angenommen = status === 'angenommen'

  function annehmen() {
    setStatus('angenommen')
    toast({
      title: 'Zugang an ' + anfrage.mail + ' gesendet',
      body: 'Fall „Sander, Peine“ angelegt · Schritt 1 von 10 · Erstgespräch',
      tone: 'success',
    })
  }

  return (
    <AppShell>
      {/* ── Liste ──────────────────────────────────────── */}
      <div className="flex w-[400px] shrink-0 flex-col border-r px-[20px] pt-[26px] pb-[20px] [background-color:var(--color-surface-sunken)] [border-color:var(--color-border)]">
        <div className="flex items-baseline justify-between px-2xs pb-[18px]">
          <div className="[font-family:var(--font-display)] text-lg font-semibold leading-lg tracking-tight [color:var(--color-fg)]">Anfragen</div>
        </div>

        <motion.button
          layout
          onClick={() => setGewaehlt('sander')}
          className="flex flex-col gap-xs rounded-lg border p-md text-left shadow-[#12161B0F_0px_1px_2px] transition-shadow [background-color:var(--color-surface)]"
          style={{ borderColor: gewaehlt === 'sander' ? 'var(--color-brand-border)' : 'var(--color-border)' }}
        >
          <div className="flex items-center justify-between">
            <div className="text-[14px] font-semibold leading-[18px] [color:var(--color-fg)]">{anfrage.name}</div>
            <div className="[font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-brand)]">HEUTE · 09:12</div>
          </div>
          <div className="text-[14px] leading-[22px] [color:var(--color-fg-muted)]">Ölheizung von 1998, will auf Wärmepumpe wechseln</div>
          <div className="flex items-center gap-xs pt-3xs">
            {angenommen ? <Haken c="var(--color-accent-green-ink)" s={12} /> : <Haken c="var(--color-brand)" s={12} />}
            <div
              className="[font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps"
              style={{ color: angenommen ? 'var(--color-accent-green-ink)' : 'var(--color-fg-muted)' }}
            >
              {angenommen ? 'ANGENOMMEN · ZUGANG RAUS' : 'EFH · PEINE · ALLE REGELN ERFÜLLT'}
            </div>
          </div>
        </motion.button>

        <button onClick={() => setGewaehlt('deibel')} className="mt-xs flex flex-col gap-xs border-t p-md text-left [border-color:var(--color-border)]">
          <div className="flex items-center justify-between">
            <div className="text-[14px] font-semibold leading-[18px] [color:var(--color-fg-muted)]">Marion Deibel</div>
            <Label>GESTERN · 17:40</Label>
          </div>
          <div className="text-[14px] leading-[22px] [color:var(--color-fg-muted)]">Mehrfamilienhaus mit sechs Wohnungen, Dach und Heizung</div>
          <div className="flex items-center gap-xs pt-3xs">
            <Warn />
            <Label tone="error">MFH · AUSSERHALB IHRES ZUSCHNITTS</Label>
          </div>
        </button>

        <div className="mt-[40px] flex flex-col px-2xs">
          <div className="flex items-center gap-sm pb-[6px]">
            <Label>ERLEDIGT</Label>
            <div className="h-px grow [background-color:var(--color-border)]" />
            <Label>{3 + (angenommen ? 1 : 0)}</Label>
          </div>
          {ERLEDIGT.map((e, i) => (
            <div key={e.name} className={'flex items-start gap-[10px] py-sm' + (i < 2 ? ' border-b [border-color:var(--color-border-subtle)]' : '')}>
              <div className="flex w-[14px] shrink-0 justify-center pt-[3px]">{e.icon}</div>
              <div className="flex grow basis-0 flex-col gap-2xs">
                <div className="flex items-baseline justify-between gap-xs">
                  <div
                    className="text-sm font-medium leading-[17px]"
                    style={{ color: e.gedimmt ? 'var(--color-fg-subtle)' : 'var(--color-fg-muted)' }}
                  >
                    {e.name}
                  </div>
                  <Label>{e.datum}</Label>
                </div>
                <Label>{e.status}</Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Detail ─────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-y-auto scrollbar-slim px-[40px] pt-[30px] pb-lg [background-color:var(--color-surface)]">
        {gewaehlt === 'deibel' ? <Deibel /> : (
          <>
            <div className="flex items-start justify-between pb-[22px]">
              <div className="flex flex-col gap-xs">
                <div className="[font-family:var(--font-display)] text-[26px] font-semibold leading-xl tracking-tight [color:var(--color-fg)]">
                  {anfrage.name}
                </div>
                <div className="text-[14px] leading-[18px] [color:var(--color-fg-muted)]">{anfrage.ort}</div>
              </div>
            </div>

            <div className="flex border-y py-md [border-color:var(--color-border)]">
              {[
                ['GEBÄUDE', anfrage.gebaeude],
                ['VORHABEN', anfrage.vorhaben],
                ['ZEITRAUM', anfrage.zeitpunkt.replace('In drei bis sechs Monaten', '3 bis 6 Monate')],
              ].map(([k, v]) => (
                <div key={k} className="flex grow basis-0 flex-col gap-[6px]">
                  <Label>{k}</Label>
                  <div className="text-[16px] font-medium leading-[20px] [color:var(--color-fg)]">{v}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-md pt-[20px] pb-[22px]">
              <div className="w-3xs shrink-0 [background-color:var(--color-border-strong)]" />
              <div className="grow basis-0 text-[16px] leading-[27px] [color:var(--color-fg)]">„{anfrage.text}“</div>
            </div>

            {/* Regelprüfung */}
            <div className="flex flex-col rounded-xl px-lg py-[22px] [background-color:var(--color-surface-sunken)]">
              <div className="flex items-center justify-between pb-[14px]">
                <div className="flex items-center gap-[11px]">
                  <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                    <path d="M8 1.8l4.8 1.7v4c0 3-2 5.4-4.8 6.7C5.2 12.9 3.2 10.5 3.2 7.5v-4z" fill="none" stroke="var(--color-fg)" strokeWidth="1.3" strokeLinejoin="round" />
                    <path d="M5.9 7.8l1.5 1.5 2.8-3" fill="none" stroke="var(--color-fg)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="[font-family:var(--font-mono)] text-2xs leading-[14px] tracking-caps [color:var(--color-fg)]">
                    GEGEN IHRE SECHS REGELN GEPRÜFT
                  </div>
                </div>
                <div className="[font-family:var(--font-mono)] text-2xs leading-[14px] tracking-caps [color:var(--color-fg-muted)]">5 KLAR · 1 OFFEN</div>
              </div>
              <div className="flex gap-lg border-t pt-[14px] [border-color:var(--color-border)]">
                <div className="flex w-[330px] shrink-0 flex-col gap-[9px]">
                  {REGELN_LINKS.map((r, i) => (
                    <motion.div
                      key={r}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * i, ease: EASE }}
                      className="flex items-center gap-[11px]"
                    >
                      <Haken />
                      <div className="grow basis-0 text-[14px] leading-[18px] [color:var(--color-fg-muted)]">{r}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex grow basis-0 flex-col gap-[9px]">
                  {REGELN_RECHTS.map((r, i) => (
                    <motion.div
                      key={r}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * i, ease: EASE }}
                      className="flex items-center gap-[11px]"
                    >
                      <Haken />
                      <div className="grow basis-0 text-[14px] leading-[18px] [color:var(--color-fg-muted)]">{r}</div>
                    </motion.div>
                  ))}
                  <div className="flex items-center gap-[11px]">
                    <div className="flex size-[13px] shrink-0 items-center justify-center">
                      <Frage />
                    </div>
                    <div className="grow basis-0 text-[14px] leading-[18px] [color:var(--color-fg)]">Denkmalschutz nicht beantwortet</div>
                  </div>
                </div>
              </div>
              <div className="mt-md flex items-start gap-[11px] border-t pt-md [border-color:var(--color-border)]">
                <svg width="13" height="13" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 4 }}>
                  <path d="M6.2 13.2h3.6M6.6 11.2c0-1.6-2.2-2.4-2.2-4.7a3.6 3.6 0 017.2 0c0 2.3-2.2 3.1-2.2 4.7z" fill="none" stroke="var(--color-brand)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="grow basis-0 text-[14px] leading-[22px] [color:var(--color-fg-muted)]">
                  Vorschlag: iSFP zuerst, dann KfW 458 — mit Fahrplan gibt es auf den Heizungstausch fünf Prozent mehr. Denkmalschutz klären Sie im
                  Erstgespräch, dafür ist es kein Hindernis.
                </div>
              </div>
            </div>

            {/* Aktionen */}
            <div className="mt-auto flex flex-col gap-md pt-[26px]">
              <AnimatePresence mode="wait" initial={false}>
                {!angenommen ? (
                  <motion.div
                    key="offen"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="flex items-center gap-sm"
                  >
                    <button
                      onClick={annehmen}
                      className="flex h-[46px] shrink-0 items-center gap-[9px] rounded-full px-[22px] transition-all duration-200 active:scale-[0.98] [background-color:var(--color-brand)] hover:[background-color:var(--color-brand-hover)]"
                    >
                      <span className="text-base font-semibold leading-[18px] tracking-tight [color:var(--color-brand-fg)]">
                        Annehmen und Zugang senden
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        setStatus('nachgefragt')
                        toast({ title: 'Rückfrage gesendet', body: 'Denkmalschutz — Antwort geht direkt in die Anfrage.' })
                      }}
                      className="flex h-[46px] shrink-0 items-center rounded-full border px-[20px] text-[14px] font-medium leading-[18px] transition-colors [border-color:var(--color-border-strong)] [color:var(--color-fg)] hover:[background-color:var(--color-surface-sunken)]"
                    >
                      Erst nachfragen
                    </button>
                    <div className="grow basis-0" />
                    <button
                      onClick={() => {
                        setStatus('abgesagt')
                        toast({ title: 'Absage gesendet', body: 'Mit Hinweis auf zwei Kolleginnen in der Region.' })
                      }}
                      className="flex h-[46px] shrink-0 items-center rounded-full border px-[20px] text-[14px] leading-[18px] transition-colors [border-color:var(--color-border)] [color:var(--color-fg-muted)] hover:[background-color:var(--color-surface-sunken)]"
                    >
                      Absagen
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="zu"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex items-center gap-md rounded-xl border p-md"
                    style={{ backgroundColor: 'var(--color-accent-green-wash)', borderColor: 'var(--color-accent-green-line)' }}
                  >
                    <motion.svg
                      width="22" height="22" viewBox="0 0 24 24"
                      initial={{ scale: 0.5 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 16 }}
                    >
                      <circle cx="12" cy="12" r="10" fill="none" stroke="var(--color-accent-green-ink)" strokeWidth="1.5" />
                      <motion.path
                        d="M7.4 12.2 10.4 15.2 16.8 8.4" fill="none" stroke="var(--color-accent-green-ink)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.15 }}
                      />
                    </motion.svg>
                    <div className="grow">
                      <div className="text-[14px] font-semibold leading-[18px]" style={{ color: 'var(--color-accent-green-ink)' }}>
                        Angenommen · Zugang ist raus
                      </div>
                      <div className="mt-[3px] text-sm leading-[18px] [color:var(--color-fg-muted)]">
                        Fall „{anfrage.name.split(' ')[1]}, Peine“ angelegt. Die Mail liegt bei {anfrage.mail} im Postfach.
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/mail/zugang')}
                      className="flex h-[38px] shrink-0 items-center rounded-full px-[18px] text-sm font-semibold transition-colors [background-color:var(--color-fg)] [color:var(--color-fg-inverse)] hover:opacity-90"
                    >
                      Mail ansehen
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </AppShell>
  )
}

function Deibel() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-xs pb-[22px]">
        <div className="[font-family:var(--font-display)] text-[26px] font-semibold leading-xl tracking-tight [color:var(--color-fg)]">Marion Deibel</div>
        <div className="text-[14px] leading-[18px] [color:var(--color-fg-muted)]">38159 Vechelde</div>
      </div>
      <div className="flex border-y py-md [border-color:var(--color-border)]">
        {[
          ['GEBÄUDE', 'Mehrfamilienhaus'],
          ['VORHABEN', 'Dach und Heizung'],
          ['ZEITRAUM', 'Erst mal informieren'],
        ].map(([k, v]) => (
          <div key={k} className="flex grow basis-0 flex-col gap-[6px]">
            <Label>{k}</Label>
            <div className="text-[16px] font-medium leading-[20px] [color:var(--color-fg)]">{v}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-md pt-[20px] pb-[22px]">
        <div className="w-3xs shrink-0 [background-color:var(--color-border-strong)]" />
        <div className="grow basis-0 text-[16px] leading-[27px] [color:var(--color-fg)]">
          „Wir sind eine Eigentümergemeinschaft mit sechs Parteien. Das Dach muss neu, und die Gasheizung von 2004 läuft auch nicht mehr rund.“
        </div>
      </div>
      <div
        className="flex items-start gap-[11px] rounded-xl p-md"
        style={{ backgroundColor: 'var(--color-feedback-error-surface)', border: '1px solid var(--color-feedback-error-border)' }}
      >
        <Warn />
        <div className="grow text-[14px] leading-[22px]" style={{ color: 'var(--color-feedback-error)' }}>
          Regel 3 verletzt: Mehrfamilienhaus mit Eigentümergemeinschaft. ENSERA schlägt eine freundliche Absage mit zwei Kolleginnen aus der Region vor —
          Sie prüfen den Text, bevor er rausgeht.
        </div>
      </div>
    </div>
  )
}
