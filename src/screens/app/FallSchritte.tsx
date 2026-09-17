import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE, Label } from '../../components/ui'

interface Aufgabe {
  titel: string
  wer: string
  datum: string
  warn?: boolean
  erledigt: boolean
}

interface Schritt {
  nr: string
  datum: string
  titel: string
  wer: string
  stand: 'fertig' | 'jetzt' | 'offen'
  aufgaben?: Aufgabe[]
}

const SCHRITTE: Schritt[] = [
  { nr: '01', datum: '21. Juli', titel: 'Erstgespräch', wer: 'GEMEINSAM', stand: 'fertig' },
  { nr: '02', datum: '24. Juli', titel: 'Vertrag und Vollmacht', wer: 'KUNDSCHAFT', stand: 'fertig' },
  {
    nr: '03',
    datum: 'bis 15. August',
    titel: 'Unterlagen',
    wer: 'KUNDSCHAFT',
    stand: 'jetzt',
    aufgaben: [
      { titel: 'Sieben Unterlagen geprüft, Werte übernommen', wer: 'ENSERA · AUTOMATISCH', datum: '04.08.', erledigt: true },
      { titel: 'Grundbuchauszug angefordert', wer: 'SIE', datum: '30.07.', erledigt: true },
      { titel: 'Heizkostenabrechnung 2024 anfordern', wer: 'KUNDSCHAFT', datum: 'FR 15.08.', warn: true, erledigt: false },
      { titel: 'Vollmacht von Jens Reuter einholen', wer: 'KUNDSCHAFT', datum: 'FR 15.08.', warn: true, erledigt: false },
      { titel: 'Aufmaß-Checkliste vorbereiten', wer: 'SIE', datum: 'DI 18.08.', erledigt: false },
    ],
  },
  { nr: '04', datum: '19. August, 10:00', titel: 'Vor-Ort-Termin', wer: 'GEMEINSAM', stand: 'offen' },
  { nr: '05', datum: 'ca. 9. September', titel: 'Sanierungsfahrplan', wer: 'SIE', stand: 'offen' },
  { nr: '06', datum: 'ca. 16. September', titel: 'Ergebnisgespräch und Förderantrag', wer: 'GEMEINSAM', stand: 'offen' },
]

const Haken = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
    <path d="M2.2 7.3l3.1 3.1L11.8 3.6" fill="none" stroke="var(--color-fg)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Uhr = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
    <circle cx="7" cy="7" r="5.3" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" />
    <path d="M7 4.2V7l2 1.4" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Offen = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
    <circle cx="7" cy="7" r="5.3" fill="none" stroke="var(--color-border-strong)" strokeWidth="1.5" strokeDasharray="2.2 2.2" />
  </svg>
)

export default function FallSchritte() {
  const [offen, setOffen] = useState<string | null>('03')
  const [haken, setHaken] = useState<string[]>(['Sieben Unterlagen geprüft, Werte übernommen', 'Grundbuchauszug angefordert'])

  const schritt3 = SCHRITTE.find((s) => s.nr === '03')!
  const erledigt = schritt3.aufgaben!.filter((a) => haken.includes(a.titel)).length

  return (
    <div className="flex flex-col px-[40px] pt-[26px] pb-[40px]">
      <div className="pb-[10px]">
        <Label>SECHS SCHRITTE</Label>
      </div>

      {SCHRITTE.map((s) => {
        const auf = offen === s.nr
        return (
          <div key={s.nr}>
            <button
              onClick={() => setOffen(auf ? null : s.nr)}
              className="flex w-full items-center gap-md border-b py-[14px] text-left transition-colors [border-color:var(--color-border-subtle)] hover:[background-color:color-mix(in_oklab,var(--color-surface)_70%,transparent)]"
            >
              <div className="flex w-[14px] shrink-0 items-center justify-center">
                {s.stand === 'fertig' ? <Haken /> : s.stand === 'jetzt' ? <Uhr /> : <Offen />}
              </div>
              <div className="w-lg shrink-0 [font-family:var(--font-mono)] text-xs leading-md" style={{ color: s.stand === 'offen' ? 'var(--color-fg-subtle)' : 'var(--color-fg-muted)' }}>
                {s.nr}
              </div>
              <div
                className="w-[150px] shrink-0 text-[16px] leading-[20px]"
                style={{ color: s.stand === 'jetzt' ? 'var(--color-fg)' : s.stand === 'offen' ? 'var(--color-fg-subtle)' : 'var(--color-fg-muted)', fontWeight: s.stand === 'jetzt' ? 600 : 400 }}
              >
                {s.datum}
              </div>
              <div
                className="grow basis-0 text-[16px] leading-[20px]"
                style={{ color: s.stand === 'jetzt' ? 'var(--color-fg)' : s.stand === 'offen' ? 'var(--color-fg-subtle)' : 'var(--color-fg-muted)', fontWeight: s.stand === 'jetzt' ? 600 : 400 }}
              >
                {s.titel}
              </div>
              <div
                className="w-[130px] shrink-0 text-right [font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps"
                style={{ color: s.stand === 'jetzt' ? 'var(--color-brand)' : 'var(--color-fg-subtle)', fontWeight: s.stand === 'jetzt' ? 500 : 400 }}
              >
                {s.wer}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {auf && s.aufgaben && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="my-sm rounded-lg border [background-color:var(--color-surface)] [border-color:var(--color-border)]">
                    <div className="flex items-center justify-between border-b px-[20px] py-sm [border-color:var(--color-border-subtle)]">
                      <Label>AUFGABEN IN SCHRITT {s.nr}</Label>
                      <Label>{erledigt} VON {s.aufgaben.length} ERLEDIGT</Label>
                    </div>
                    {s.aufgaben.map((a, i) => {
                      const an = haken.includes(a.titel)
                      return (
                        <div
                          key={a.titel}
                          className={'flex items-center gap-sm px-[20px] py-[13px]' + (i < s.aufgaben!.length - 1 ? ' border-b [border-color:var(--color-border-subtle)]' : '')}
                        >
                          <button
                            onClick={() => setHaken(an ? haken.filter((h) => h !== a.titel) : [...haken, a.titel])}
                            className="flex size-[18px] shrink-0 items-center justify-center rounded-[4px] border transition-colors"
                            style={{
                              backgroundColor: an ? 'var(--color-fg)' : 'var(--color-surface)',
                              borderColor: an ? 'var(--color-fg)' : 'var(--color-border-strong)',
                            }}
                          >
                            {an && (
                              <motion.svg width="11" height="11" viewBox="0 0 14 14" initial={{ scale: 0.4 }} animate={{ scale: 1 }}>
                                <path d="M2.4 7.2l3 3 6.2-6.6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </motion.svg>
                            )}
                          </button>
                          <div
                            className="grow basis-0 text-[15px] leading-[20px]"
                            style={{ color: an ? 'var(--color-fg-muted)' : 'var(--color-fg)', textDecoration: an ? 'none' : undefined }}
                          >
                            {a.titel}
                          </div>
                          <div className="w-[190px] shrink-0 text-right"><Label>{a.wer}</Label></div>
                          <div className="w-[80px] shrink-0 text-right">
                            <Label tone={a.warn && !an ? 'error' : 'subtle'}>{a.datum}</Label>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
              {auf && !s.aufgaben && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="my-sm rounded-lg border px-[20px] py-md text-[14px] leading-[22px] [background-color:var(--color-surface)] [border-color:var(--color-border)] [color:var(--color-fg-muted)]">
                    {s.stand === 'fertig'
                      ? 'Abgeschlossen. ENSERA hat das Ergebnis im Verlauf abgelegt.'
                      : 'Noch keine Aufgaben. ENSERA legt sie an, sobald der vorherige Schritt fertig ist.'}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
