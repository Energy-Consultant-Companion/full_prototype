import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE, Label } from './ui'
import { navigate } from '../lib/router'
import { useDemo } from '../lib/store'

type Quelle = 'leer' | 'unterlagen' | 'projekt'

const QUELLEN: Array<{ id: Quelle; titel: string; text: string; icon: React.ReactNode }> = [
  {
    id: 'leer',
    titel: 'Leer beginnen',
    text: 'Angaben selbst eintragen',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <rect x="2.4" y="2.4" width="11.2" height="11.2" rx="2.4" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" />
        <path d="M8 5.6v4.8M5.6 8h4.8" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'unterlagen',
    titel: 'Aus Unterlagen lesen',
    text: 'Ensera liest PDF, Foto, ZIP',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path d="M4 2h5l3 3v9H4z" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M9 2v3h3M6.2 9.4h3.6M6.2 11.4h2.2" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'projekt',
    titel: 'Projekt übernehmen',
    text: 'Anfrage, Fall oder ZIP-Export',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path d="M1.8 4a1.8 1.8 0 011.8-1.8h2.1c.4 0 .8.2 1 .5L7.6 4h4.6A1.8 1.8 0 0114 5.8v6A1.8 1.8 0 0112.2 13.6H3.6A1.8 1.8 0 011.8 11.8z" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M8 6.8v3.6M6.4 8.8L8 10.4l1.6-1.6" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const DATEIEN = [
  { name: 'Energieausweis_Knop.pdf', meta: '1,2 MB · 8 Seiten', stand: 'fertig', info: '9 Felder gelesen' },
  { name: 'Grundbuchauszug_Knop.pdf', meta: '640 KB · 3 Seiten', stand: 'laeuft', info: 'Wird gelesen …' },
  { name: 'Angebot_Heizung_Mertens.pdf', meta: '2,4 MB · 4 Seiten', stand: 'fertig', info: '4 Felder gelesen' },
]

const ANFRAGEN = [
  { name: 'Erstanfrage · Eheleute Knop', meta: 'Peine · 14.08. · über Ihre Website', info: '12 Angaben' },
  { name: 'Erstanfrage · Familie Dombrowski', meta: 'Ilsede · 13.08. · über Ihre Website', info: '11 Angaben' },
  { name: 'Projekt-Export · GEG-Tools', meta: 'ZIP · 09.08. · 18 Dateien', info: '31 Angaben' },
]

const FELDER = [
  { feld: 'Kundschaft', wert: 'Eheleute Knop', quelle: 'Energieausweis · S. 1', status: 'Übernommen', ton: 'gruen' },
  { feld: 'Adresse', wert: 'Lindenweg 14, 31226 Peine', quelle: 'Energieausweis · S. 1', status: 'Übernommen', ton: 'gruen' },
  { feld: 'Baujahr', wert: '1974 · saniert 2009', quelle: 'Energieausweis · S. 2', status: 'Übernommen', ton: 'gruen' },
  { feld: 'Beheizte Wohnfläche', wert: '168 m²', quelle: 'Angebot nennt 172 m²', quelleWarn: true, status: 'Abweichung', ton: 'amber' },
  { feld: 'Eigentümer:in im Grundbuch', wert: 'Nicht gefunden', wertLeer: true, quelle: 'Grundbuchauszug läuft', status: 'Offen', ton: 'grau' },
]

const TON: Record<string, { bg: string; ink: string }> = {
  gruen: { bg: 'var(--color-accent-green-wash)', ink: 'var(--color-accent-green-ink)' },
  amber: { bg: 'var(--color-accent-amber-wash)', ink: 'var(--color-accent-amber-ink)' },
  grau: { bg: 'var(--color-surface-sunken)', ink: 'var(--color-fg-muted)' },
}

export default function FallAnlegen({ offen, quelleStart }: { offen: boolean; quelleStart: Quelle }) {
  const { toast } = useDemo()
  const [quelle, setQuelle] = useState<Quelle>(quelleStart)
  const [einladen, setEinladen] = useState(true)

  useEffect(() => setQuelle(quelleStart), [quelleStart, offen])

  function schliessen() {
    navigate('/app/faelle')
  }

  return (
    <AnimatePresence>
      {offen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={schliessen}
          className="absolute inset-0 z-40 flex items-start justify-center bg-[rgba(244,246,248,0.72)] pt-[28px] backdrop-blur-[3px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="flex w-[840px] flex-col overflow-hidden rounded-xl border shadow-[0_28px_70px_rgba(18,22,27,0.18)] [background-color:var(--color-surface)] [border-color:var(--color-border)]"
          >
            {/* Kopf */}
            <div className="flex h-[58px] shrink-0 items-center gap-md border-b px-lg [border-color:var(--color-border-subtle)]">
              <div className="flex h-lg items-center rounded-[6px] border px-[10px] text-[11px] font-medium tracking-caps [border-color:var(--color-border-strong)] [color:var(--color-fg)]">
                FALL ANLEGEN
              </div>
              <div className="grow" />
              <Label>SCHRITT 1 VON 3</Label>
              <div className="flex items-center gap-2xs">
                {[0, 1].map((d) => (
                  <button key={d} className="flex size-xl items-center justify-center rounded-md transition-colors hover:[background-color:var(--color-surface-sunken)]">
                    <svg width="14" height="14" viewBox="0 0 14 14" style={{ transform: d === 0 ? 'scaleX(-1)' : undefined }}>
                      <path d="M5.2 2.8L9.4 7l-4.2 4.2" fill="none" stroke={d === 0 ? 'var(--color-border-strong)' : 'var(--color-fg)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
              </div>
              <div className="h-[18px] w-px [background-color:var(--color-border)]" />
              <button onClick={schliessen} className="flex size-xl items-center justify-center rounded-md transition-colors hover:[background-color:var(--color-surface-sunken)]" aria-label="Schließen">
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path d="M3.4 3.4l7.2 7.2M10.6 3.4l-7.2 7.2" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Hinweis */}
            <button
              onClick={() => navigate('/app/anfragen')}
              className="flex h-[42px] shrink-0 items-center gap-sm border-b px-lg text-left [background-color:var(--color-brand-surface)] [border-color:var(--color-brand-border)]"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                <rect x="2" y="3.6" width="12" height="8.8" rx="1.4" fill="none" stroke="var(--color-brand)" strokeWidth="1.3" />
                <path d="M2.4 4.4L8 8.6l5.6-4.2" fill="none" stroke="var(--color-brand)" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
              <div className="grow text-[14px] leading-[18px] [color:var(--color-fg)]">
                Zwei Erstanfragen warten auf Übernahme — daraus wird ein Fall ohne Abtippen.
              </div>
              <div className="shrink-0 [font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-brand)]">ANFRAGEN ANSEHEN →</div>
            </button>

            {/* Quellen */}
            <div className="px-lg pt-lg">
              <div className="flex items-baseline justify-between pb-sm">
                <div className="text-md font-semibold leading-[22px] tracking-tight [color:var(--color-fg)]">Womit beginnen?</div>
                <Label>QUELLE FÜR DIESEN FALL</Label>
              </div>
              <div className="flex gap-sm">
                {QUELLEN.map((q) => {
                  const an = quelle === q.id
                  return (
                    <button
                      key={q.id}
                      onClick={() => setQuelle(q.id)}
                      className="flex grow basis-0 flex-col gap-[10px] rounded-lg p-md text-left transition-all"
                      style={{
                        border: an ? '1.5px solid var(--color-brand)' : '1px solid var(--color-border)',
                        backgroundColor: an ? 'var(--color-brand-surface)' : 'var(--color-surface)',
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex size-xl items-center justify-center rounded-md border [background-color:var(--color-surface)] [border-color:var(--color-border)]">
                          {q.icon}
                        </div>
                        <div
                          className="flex size-md items-center justify-center rounded-full border"
                          style={{ backgroundColor: an ? 'var(--color-brand)' : 'transparent', borderColor: an ? 'var(--color-brand)' : 'var(--color-border-strong)' }}
                        >
                          {an && (
                            <svg width="9" height="9" viewBox="0 0 14 14">
                              <path d="M2.4 7.2l3 3 6.2-6.6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-base font-medium leading-[20px] [color:var(--color-fg)]">{q.titel}</div>
                        <div className="pt-[3px] text-sm leading-[17px] [color:var(--color-fg-muted)]">{q.text}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Eingabebereich */}
            <div className="px-lg pt-md">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={quelle}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="flex gap-lg rounded-lg border p-md [border-color:var(--color-border)]"
                >
                  <div className="flex h-[148px] w-[288px] shrink-0 flex-col items-center justify-center gap-xs rounded-md border border-dashed [background-color:var(--color-surface-sunken)] [border-color:var(--color-border-strong)]">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      {quelle === 'projekt' ? (
                        <path d="M3 7.2a2.6 2.6 0 012.6-2.6h3l2 2.4h8A2.6 2.6 0 0121 9.6v7.8A2.6 2.6 0 0118.4 20H5.6A2.6 2.6 0 013 17.4zM12 10.4v5M9.6 13l2.4 2.4 2.4-2.4" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      ) : (
                        <path d="M12 16V5M8 9l4-4 4 4M4 17v1.6A2.4 2.4 0 006.4 21h11.2A2.4 2.4 0 0020 18.6V17" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      )}
                    </svg>
                    <div className="pt-2xs text-base font-medium leading-[20px] [color:var(--color-fg)]">
                      {quelle === 'projekt' ? 'Projekt-Export ablegen' : quelle === 'leer' ? 'Nichts nötig' : 'Unterlagen hier ablegen'}
                    </div>
                    <Label>{quelle === 'projekt' ? 'ZIP · ENSERA · GEG-TOOLS' : quelle === 'leer' ? 'SIE TIPPEN ALLES SELBST' : 'PDF · JPG · ZIP · MAX 25 MB'}</Label>
                    {quelle !== 'leer' && (
                      <button className="mt-xs flex h-xl items-center rounded-md border px-md text-sm font-medium transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface)]">
                        {quelle === 'projekt' ? 'Datei wählen' : 'Dateien wählen'}
                      </button>
                    )}
                  </div>

                  <div className="flex grow flex-col justify-center">
                    {quelle === 'leer' && (
                      <div className="text-[14px] leading-[22px] [color:var(--color-fg-muted)]">
                        Sie legen einen leeren Fall an und tragen Kundschaft, Adresse und Gebäudedaten selbst ein. ENSERA ergänzt später aus den
                        Unterlagen, die dazukommen.
                      </div>
                    )}
                    {quelle === 'unterlagen' &&
                      DATEIEN.map((d, i) => (
                        <div key={d.name} className={'flex items-center gap-sm py-[10px]' + (i < DATEIEN.length - 1 ? ' border-b [border-color:var(--color-border-subtle)]' : '')}>
                          <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                            <path d="M4 2h5l3 3v9H4z" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinejoin="round" />
                            <path d="M9 2v3h3" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinejoin="round" />
                          </svg>
                          <div className="flex grow flex-col gap-[2px]">
                            <div className="text-[14px] font-medium leading-[18px] [color:var(--color-fg)]">{d.name}</div>
                            <div className="text-xs leading-[15px] [color:var(--color-fg-subtle)]">{d.meta}</div>
                          </div>
                          <div className="flex shrink-0 items-center gap-[6px]">
                            {d.stand === 'fertig' ? (
                              <svg width="13" height="13" viewBox="0 0 14 14">
                                <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke="var(--color-accent-green-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            ) : (
                              <motion.svg width="13" height="13" viewBox="0 0 14 14" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}>
                                <path d="M7 1.6a5.4 5.4 0 105.4 5.4" fill="none" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" />
                              </motion.svg>
                            )}
                            <div className="text-[13px] font-medium" style={{ color: d.stand === 'fertig' ? 'var(--color-accent-green-ink)' : 'var(--color-brand)' }}>
                              {d.info}
                            </div>
                          </div>
                          <button className="shrink-0 pl-xs [color:var(--color-fg-subtle)]" aria-label="Entfernen">
                            <svg width="13" height="13" viewBox="0 0 14 14">
                              <path d="M3.4 3.4l7.2 7.2M10.6 3.4l-7.2 7.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    {quelle === 'projekt' &&
                      ANFRAGEN.map((a, i) => (
                        <div key={a.name} className={'flex items-center gap-sm py-[10px]' + (i < ANFRAGEN.length - 1 ? ' border-b [border-color:var(--color-border-subtle)]' : '')}>
                          <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                            <rect x="2" y="3.6" width="12" height="8.8" rx="1.4" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" />
                            <path d="M2.4 4.4L8 8.6l5.6-4.2" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinejoin="round" />
                          </svg>
                          <div className="flex grow flex-col gap-[2px]">
                            <div className="text-[14px] font-medium leading-[18px] [color:var(--color-fg)]">{a.name}</div>
                            <div className="text-xs leading-[15px] [color:var(--color-fg-subtle)]">{a.meta}</div>
                          </div>
                          <div className="shrink-0 text-[13px] [color:var(--color-fg-muted)]">{a.info}</div>
                          <div className="flex size-md shrink-0 items-center justify-center rounded-full [background-color:var(--color-brand)]">
                            <svg width="9" height="9" viewBox="0 0 14 14">
                              <path d="M2.4 7.2l3 3 6.2-6.6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                      ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Erkannte Angaben */}
            <div className="px-lg pt-lg">
              <div className="flex items-center gap-sm pb-sm">
                <div className="text-md font-semibold leading-[22px] tracking-tight [color:var(--color-fg)]">Erkannte Angaben</div>
                <Label>13 FELDER · 11 ÜBERNOMMEN</Label>
                <div className="grow" />
                <button className="flex h-xl items-center rounded-md border px-md text-sm font-medium transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]">
                  Mit Anfrage abgleichen
                </button>
                <button className="flex h-xl items-center gap-xs rounded-md border px-md text-sm font-medium transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]">
                  <svg width="13" height="13" viewBox="0 0 14 14">
                    <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke="var(--color-fg)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Alle übernehmen
                </button>
              </div>

              <div className="flex items-center gap-md border-b pb-xs [border-color:var(--color-border)]">
                <div className="w-[196px] shrink-0"><Label>FELD</Label></div>
                <div className="grow basis-0"><Label>GELESENER WERT</Label></div>
                <div className="w-[176px] shrink-0"><Label>FUNDSTELLE</Label></div>
                <div className="w-[136px] shrink-0"><Label>STATUS</Label></div>
                <div className="w-[20px] shrink-0" />
              </div>
              <div className="scrollbar-slim max-h-[280px] overflow-y-auto">
                {FELDER.map((f) => (
                  <div key={f.feld} className="flex items-center gap-md border-b py-[13px] [border-color:var(--color-border-subtle)]">
                    <div className="w-[196px] shrink-0 text-[14px] leading-[18px] [color:var(--color-fg)]">{f.feld}</div>
                    <div
                      className="grow basis-0 text-[15px] font-medium leading-[19px]"
                      style={{ color: f.wertLeer ? 'var(--color-fg-subtle)' : 'var(--color-fg)', fontWeight: f.wertLeer ? 400 : 500 }}
                    >
                      {f.wert}
                    </div>
                    <div
                      className="w-[176px] shrink-0 text-[13px] leading-[17px]"
                      style={{ color: f.quelleWarn ? 'var(--color-accent-amber-ink)' : 'var(--color-fg-muted)' }}
                    >
                      {f.quelle}
                    </div>
                    <div className="w-[136px] shrink-0">
                      <span
                        className="inline-flex h-lg items-center gap-[5px] rounded-full px-[10px] text-xs font-medium"
                        style={{ backgroundColor: TON[f.ton].bg, color: TON[f.ton].ink }}
                      >
                        <svg width="11" height="11" viewBox="0 0 14 14">
                          {f.ton === 'gruen' && <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />}
                          {f.ton === 'amber' && (
                            <>
                              <circle cx="7" cy="7" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                              <path d="M7 4.2v3.4M7 9.6v.1" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                            </>
                          )}
                          {f.ton === 'grau' && (
                            <>
                              <circle cx="7" cy="7" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                              <path d="M7 4.2V7l2.1 1.3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            </>
                          )}
                        </svg>
                        {f.status}
                      </span>
                    </div>
                    <button className="flex w-[20px] shrink-0 justify-center [color:var(--color-fg-subtle)]">
                      <svg width="14" height="14" viewBox="0 0 14 14">
                        <circle cx="7" cy="2.8" r="1.1" fill="currentColor" />
                        <circle cx="7" cy="7" r="1.1" fill="currentColor" />
                        <circle cx="7" cy="11.2" r="1.1" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Fuß */}
            <div className="mt-lg flex h-[72px] shrink-0 items-center gap-md border-t px-lg [background-color:var(--color-surface-sunken)] [border-color:var(--color-border)]">
              <button onClick={() => setEinladen(!einladen)} className="flex items-center gap-sm">
                <div
                  className="flex size-[18px] items-center justify-center rounded-[4px] border transition-colors"
                  style={{ backgroundColor: einladen ? 'var(--color-brand)' : 'var(--color-surface)', borderColor: einladen ? 'var(--color-brand)' : 'var(--color-border-strong)' }}
                >
                  {einladen && (
                    <svg width="11" height="11" viewBox="0 0 14 14">
                      <path d="M2.4 7.2l3 3 6.2-6.6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className="text-[14px] leading-[18px] [color:var(--color-fg)]">Kundschaft einladen und fehlende Unterlagen anfragen</div>
              </button>
              <div className="grow" />
              <button onClick={schliessen} className="px-sm text-[14px] [color:var(--color-fg-muted)] hover:[color:var(--color-fg)]">
                Verwerfen
              </button>
              <button
                onClick={() => {
                  toast({
                    title: 'Fall „Eheleute Knop, Peine“ angelegt',
                    body: einladen ? 'Zugang verschickt · drei Unterlagen angefragt' : 'Ohne Einladung angelegt.',
                    tone: 'success',
                  })
                  navigate('/app/faelle')
                }}
                className="flex h-[38px] items-center gap-xs rounded-md px-[18px] text-[15px] font-semibold transition-colors [background-color:var(--color-brand)] [color:var(--color-brand-fg)] hover:[background-color:var(--color-brand-hover)]"
              >
                <svg width="15" height="15" viewBox="0 0 16 16">
                  <path d="M1.8 4a1.8 1.8 0 011.8-1.8h2.1c.4 0 .8.2 1 .5L7.6 4h4.6A1.8 1.8 0 0114 5.8v6A1.8 1.8 0 0112.2 13.6H3.6A1.8 1.8 0 011.8 11.8z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
                Fall anlegen
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
