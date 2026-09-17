import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE, Label } from '../../components/ui'
import {
  OrdnerBerechnungen, OrdnerFoerderweg, OrdnerGebaeude, OrdnerKommunikation, OrdnerKundendaten, OrdnerWeiteres,
} from '../../components/fallIcons'
import { FEHLEND_JE_FALL } from '../../lib/daten'
import { useDemo } from '../../lib/store'

/* ── Daten ─────────────────────────────────────────────────────────────── */

interface Ordner {
  id: string
  name: string
  icon: (p: { size?: number }) => React.ReactElement
  dateien: number
  groesse: string
  fehlt?: number
  ohne?: boolean
}

const ORDNER: Ordner[] = [
  { id: 'kunden', name: 'Kundendaten', icon: OrdnerKundendaten, dateien: 7, groesse: '12 MB', fehlt: 1 },
  { id: 'gebaeude', name: 'Gebäudedaten', icon: OrdnerGebaeude, dateien: 14, groesse: '96 MB' },
  { id: 'berechnungen', name: 'Berechnungen', icon: OrdnerBerechnungen, dateien: 6, groesse: '21 MB', fehlt: 1 },
  { id: 'foerderweg', name: 'Förderweg', icon: OrdnerFoerderweg, dateien: 9, groesse: '30 MB' },
  { id: 'kommunikation', name: 'Kommunikation', icon: OrdnerKommunikation, dateien: 10, groesse: '8 MB' },
  { id: 'weiteres', name: 'Weiteres', icon: OrdnerWeiteres, dateien: 2, groesse: '', ohne: true },
]

interface Datei {
  name: string
  ordner: string
  ordnerId: string
  farbe: string
  von: string
  kuerzel: string
  dunkel?: boolean
  datum: string
  art: string
  monat: string
}

const DATEIEN: Datei[] = [
  { name: 'Angebot Wärmepumpe · Osterloh', ordner: 'Förderweg', ordnerId: 'foerderweg', farbe: 'var(--color-accent-violet)', von: 'Osterloh GmbH', kuerzel: 'O', datum: '12.08.', art: 'Angebot', monat: 'DIESE WOCHE' },
  { name: 'Foto Heizungsraum · Südseite', ordner: 'Gebäudedaten', ordnerId: 'gebaeude', farbe: 'var(--color-accent-sky)', von: 'Familie Reuter', kuerzel: 'R', datum: '11.08.', art: 'Foto', monat: 'DIESE WOCHE' },
  { name: 'Foto Fassade · Ostseite', ordner: 'Gebäudedaten', ordnerId: 'gebaeude', farbe: 'var(--color-accent-sky)', von: 'Familie Reuter', kuerzel: 'R', datum: '11.08.', art: 'Foto', monat: 'DIESE WOCHE' },
  { name: 'Heizlastberechnung DIN 12831', ordner: 'Berechnungen', ordnerId: 'berechnungen', farbe: 'var(--color-accent-brand)', von: 'ENSERA', kuerzel: 'E', datum: '09.08.', art: 'Berechnung', monat: 'AUGUST' },
  { name: 'iSFP Entwurf · Fassung 2', ordner: 'Berechnungen', ordnerId: 'berechnungen', farbe: 'var(--color-accent-brand)', von: 'Katrin Held', kuerzel: 'K', dunkel: true, datum: '07.08.', art: 'Bericht', monat: 'AUGUST' },
  { name: 'BAFA Eingangsbestätigung', ordner: 'Kommunikation', ordnerId: 'kommunikation', farbe: 'var(--color-accent-teal)', von: 'BAFA', kuerzel: 'B', datum: '05.08.', art: 'Nachweis', monat: 'AUGUST' },
  { name: 'Wohnflächenberechnung', ordner: 'Gebäudedaten', ordnerId: 'gebaeude', farbe: 'var(--color-accent-sky)', von: 'ENSERA', kuerzel: 'E', datum: '04.08.', art: 'Berechnung', monat: 'AUGUST' },
  { name: 'Fotos Dachgeschoss · 6 Aufnahmen', ordner: 'Gebäudedaten', ordnerId: 'gebaeude', farbe: 'var(--color-accent-sky)', von: 'Familie Reuter', kuerzel: 'R', datum: '03.08.', art: 'Foto', monat: 'AUGUST' },
  { name: 'Schornsteinfeger-Protokoll', ordner: 'Gebäudedaten', ordnerId: 'gebaeude', farbe: 'var(--color-accent-sky)', von: 'Familie Reuter', kuerzel: 'R', datum: '02.08.', art: 'Nachweis', monat: 'AUGUST' },
  { name: 'Kellerdecke · Aufmaß', ordner: 'Gebäudedaten', ordnerId: 'gebaeude', farbe: 'var(--color-accent-sky)', von: 'Katrin Held', kuerzel: 'K', dunkel: true, datum: '01.08.', art: 'Aufmaß', monat: 'AUGUST' },
  { name: 'Grundriss EG und OG', ordner: 'Gebäudedaten', ordnerId: 'gebaeude', farbe: 'var(--color-accent-sky)', von: 'Familie Reuter', kuerzel: 'R', datum: '28.07.', art: 'Plan', monat: 'JULI' },
  { name: 'Bauakte · Baujahrnachweis', ordner: 'Gebäudedaten', ordnerId: 'gebaeude', farbe: 'var(--color-accent-sky)', von: 'Katrin Held', kuerzel: 'K', dunkel: true, datum: '24.07.', art: 'Nachweis', monat: 'JULI' },
  { name: 'Vollmacht Marlene Reuter', ordner: 'Kundendaten', ordnerId: 'kunden', farbe: 'var(--color-accent-green)', von: 'Familie Reuter', kuerzel: 'R', datum: '24.07.', art: 'Vollmacht', monat: 'JULI' },
  { name: 'Beratungsvertrag', ordner: 'Kundendaten', ordnerId: 'kunden', farbe: 'var(--color-accent-green)', von: 'Katrin Held', kuerzel: 'K', dunkel: true, datum: '24.07.', art: 'Vertrag', monat: 'JULI' },
]

/* ── Bausteine ─────────────────────────────────────────────────────────── */

const DateiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
    <path d="M4.3 1.9h4.4l3.4 3.4v8.4a1.4 1.4 0 0 1-1.4 1.4H4.3a1.4 1.4 0 0 1-1.4-1.4V3.3a1.4 1.4 0 0 1 1.4-1.4z" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M8.6 2.1v2.7a1 1 0 0 0 1 1h2.4" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Avatar({ k, dunkel }: { k: string; dunkel?: boolean }) {
  return (
    <div
      className="flex size-[20px] shrink-0 items-center justify-center rounded-full border"
      style={{
        backgroundColor: dunkel ? 'var(--color-surface-inverse)' : 'var(--color-surface-sunken)',
        borderColor: dunkel ? 'transparent' : 'var(--color-border)',
      }}
    >
      <div className="[font-family:var(--font-mono)] text-[9px] font-semibold leading-[11px]" style={{ color: dunkel ? 'var(--color-fg-inverse)' : 'var(--color-fg-muted)' }}>
        {k}
      </div>
    </div>
  )
}

function Werkzeugleiste({ platzhalter, zahl, sortieren }: { platzhalter: string; zahl: string; sortieren: string }) {
  return (
    <div className="flex gap-sm pb-lg">
      <div className="flex h-[38px] grow items-center gap-[10px] rounded-md border px-[14px] [background-color:var(--color-surface)] [border-color:var(--color-border)]">
        <svg width="15" height="15" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
          <circle cx="7.1" cy="7.1" r="4.5" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.4" />
          <path d="M10.4 10.4l3 3" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input placeholder={platzhalter} className="grow text-[14px] leading-[18px] outline-none placeholder:[color:var(--color-fg-subtle)]" />
        <Label>{zahl}</Label>
      </div>
      {[
        { label: sortieren, icon: <path d="M2.4 4h9.2M2.4 7h6M2.4 10h3.2" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinecap="round" /> },
        { label: 'Filter', icon: <path d="M1.8 3.2h10.4L8.2 7.6v4l-2.4-1.2V7.6z" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinejoin="round" /> },
      ].map((b) => (
        <button
          key={b.label}
          className="flex h-[38px] shrink-0 items-center gap-xs rounded-md border px-md text-sm font-medium leading-[17px] transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border)] [color:var(--color-fg)] hover:[background-color:var(--color-surface-sunken)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>{b.icon}</svg>
          {b.label}
        </button>
      ))}
    </div>
  )
}

/* ── Bildschirm ────────────────────────────────────────────────────────── */

export default function FallUnterlagen({ fallId, fehlend, ordner }: { fallId: string; fehlend: boolean; ordner?: string | null }) {
  const { toast } = useDemo()
  const [offen, setOffen] = useState<string | null>(ordner ?? null)

  useEffect(() => {
    setOffen(ordner ?? null)
  }, [ordner])
  const [erinnert, setErinnert] = useState<string[]>([])

  if (fehlend) return <Fehlt fallId={fallId} erinnert={erinnert} setErinnert={setErinnert} toast={toast} />

  const gewaehlt = ORDNER.find((o) => o.id === offen)
  const liste = gewaehlt ? DATEIEN.filter((d) => d.ordnerId === gewaehlt.id) : DATEIEN.slice(0, 6)
  const monate = [...new Set(liste.map((d) => d.monat))]

  return (
    <div className="flex flex-col px-[40px] pt-[26px] pb-[40px]">
      <Werkzeugleiste
        platzhalter={gewaehlt ? `In ${gewaehlt.name} suchen` : 'In diesem Fall suchen'}
        zahl={gewaehlt ? `${gewaehlt.dateien} UNTERLAGEN` : '48 UNTERLAGEN'}
        sortieren="Neueste zuerst"
      />

      <div className="flex items-center gap-[14px] pb-sm">
        <Label>ORDNER</Label>
        <div className="h-px grow [background-color:var(--color-border)]" />
        <Label>{gewaehlt ? 'ZURÜCK MIT KLICK AUF DEN ORDNER' : 'ENSERA SORTIERT NEUE UNTERLAGEN EIN'}</Label>
      </div>

      {/* Ordner — geschlossen als Raster, geöffnet als schmale Leiste */}
      <motion.div layout transition={{ duration: 0.42, ease: EASE }} className={gewaehlt ? 'flex gap-[10px]' : 'grid grid-cols-3 gap-[14px]'}>
        {ORDNER.map((o) => {
          const an = gewaehlt?.id === o.id
          const Icon = o.icon
          return (
            <motion.button
              layout
              key={o.id}
              onClick={() => setOffen(an ? null : o.id)}
              transition={{ layout: { duration: 0.42, ease: EASE } }}
              whileHover={{ y: -2 }}
              className="flex flex-col rounded-lg border text-left"
              style={{
                height: gewaehlt ? 92 : 132,
                flex: gewaehlt ? '1 1 0' : undefined,
                padding: gewaehlt ? 14 : 18,
                backgroundColor: an ? 'var(--color-surface)' : 'var(--color-surface-sunken)',
                borderColor: an ? 'var(--color-brand-border)' : 'transparent',
                boxShadow: an ? '0 6px 18px rgba(31,70,216,0.10)' : 'none',
              }}
            >
              <motion.div layout="position">
                <Icon size={gewaehlt ? 22 : 36} />
              </motion.div>
              <div className="grow basis-0" />
              <motion.div
                layout="position"
                className="truncate font-medium leading-[20px] tracking-tight [color:var(--color-fg)]"
                style={{ fontSize: gewaehlt ? 13 : 15 }}
              >
                {o.name}
              </motion.div>
              <motion.div layout="position" className="flex items-center gap-[5px] pt-2xs">
                <Label>{o.dateien} DATEIEN{!gewaehlt && o.groesse ? ' · ' + o.groesse : ''}</Label>
                {!gewaehlt && o.fehlt && (
                  <>
                    <span className="[font-family:var(--font-mono)] text-[10px] leading-[13px] [color:var(--color-border-strong)]">·</span>
                    <Label tone="error">{o.fehlt} FEHLT</Label>
                  </>
                )}
                {!gewaehlt && o.ohne && (
                  <>
                    <span className="[font-family:var(--font-mono)] text-[10px] leading-[13px] [color:var(--color-border-strong)]">·</span>
                    <Label tone="muted">OHNE ZUORDNUNG</Label>
                  </>
                )}
              </motion.div>
            </motion.button>
          )
        })}
      </motion.div>

      {/* Dateien */}
      <motion.div layout transition={{ duration: 0.42, ease: EASE }} className="pt-[26px]">
        <div className="flex items-center gap-md px-xs pb-xs">
          <div className="w-md shrink-0" />
          <div className="grow basis-0"><Label>UNTERLAGE</Label></div>
          <div className="w-[150px] shrink-0"><Label>{gewaehlt ? 'ART' : 'ORDNER'}</Label></div>
          <div className="w-[140px] shrink-0"><Label>VON</Label></div>
          <div className="flex w-3xl shrink-0 justify-end"><Label>DATUM</Label></div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={gewaehlt?.id ?? 'alle'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            {gewaehlt
              ? monate.map((m) => (
                  <div key={m}>
                    <div className="flex items-center justify-between px-xs pt-md pb-xs">
                      <Label>{m}</Label>
                      <Label>{liste.filter((d) => d.monat === m).length}</Label>
                    </div>
                    {liste
                      .filter((d) => d.monat === m)
                      .map((d) => (
                        <Zeile key={d.name} d={d} art />
                      ))}
                  </div>
                ))
              : liste.map((d) => <Zeile key={d.name} d={d} />)}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function Zeile({ d, art }: { d: Datei; art?: boolean }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'var(--color-surface)' }}
      className="flex items-center gap-md rounded-sm border-b px-xs py-[9px] [border-color:var(--color-border-subtle)]"
    >
      <DateiIcon />
      <div className="grow basis-0 text-[14px] leading-[18px] [color:var(--color-fg)]">{d.name}</div>
      <div className="flex w-[150px] shrink-0 items-center gap-xs">
        {!art && <div className="size-[7px] shrink-0 rounded-full" style={{ backgroundColor: d.farbe }} />}
        <div className="text-sm leading-[17px] [color:var(--color-fg-muted)]">{art ? d.art : d.ordner}</div>
      </div>
      <div className="flex w-[140px] shrink-0 items-center gap-[9px]">
        <Avatar k={d.kuerzel} dunkel={d.dunkel} />
        <div className="text-sm leading-[17px] [color:var(--color-fg-muted)]">{d.von}</div>
      </div>
      <div className="flex w-3xl shrink-0 justify-end"><Label>{d.datum}</Label></div>
    </motion.div>
  )
}

/* ── Fehlend ───────────────────────────────────────────────────────────── */

const SYMBOLE = {
  kunden: OrdnerKundendaten,
  weiteres: OrdnerWeiteres,
  gebaeude: OrdnerGebaeude,
  kommunikation: OrdnerKommunikation,
}

function Fehlt({
  fallId,
  erinnert,
  setErinnert,
  toast,
}: {
  fallId: string
  erinnert: string[]
  setErinnert: (v: string[]) => void
  toast: (t: { title: string; body?: string; tone?: 'neutral' | 'brand' | 'success' | 'error' }) => void
}) {
  const daten = FEHLEND_JE_FALL[fallId] ?? FEHLEND_JE_FALL.reuter
  const WARTEN = daten.wartend
  const FEHLT = daten.liste

  return (
    <div className="flex flex-col px-[40px] pt-[26px] pb-[40px]">
      <Werkzeugleiste platzhalter="In diesem Fall suchen" zahl={daten.kopf} sortieren="Nach Frist" />

      <div className="flex items-center gap-[14px] pb-sm">
        <Label>WORAUF SIE WARTEN</Label>
        <div className="h-px grow [background-color:var(--color-border)]" />
      </div>

      <div className="grid gap-[14px]" style={{ gridTemplateColumns: `repeat(${Math.min(WARTEN.length, 4)}, minmax(0, 1fr))` }}>
        {WARTEN.map((w, i) => {
          const Icon = SYMBOLE[w.symbol]
          return (
            <motion.div
              key={w.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: EASE }}
              className="flex h-[132px] flex-col rounded-lg p-[18px] [background-color:var(--color-surface-sunken)]"
            >
              <Icon size={30} />
              <div className="grow basis-0" />
              <Label>{w.rolle}</Label>
              <div className="pt-[3px] text-base font-medium leading-[20px] tracking-tight [color:var(--color-fg)]">{w.name}</div>
              <div className="pt-2xs">
                <Label tone={w.warn ? 'error' : 'subtle'}>{w.info}</Label>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="flex items-center gap-[14px] pt-[30px] pb-xs">
        <Label>FEHLT NOCH</Label>
        <div className="h-px grow [background-color:var(--color-border)]" />
      </div>
      <div className="flex items-center gap-md px-xs pb-xs">
        <div className="grow basis-0"><Label>UNTERLAGE</Label></div>
        <div className="w-[180px] shrink-0"><Label>VON</Label></div>
        <div className="w-[90px] shrink-0 text-right"><Label>FRIST</Label></div>
        <div className="w-[130px] shrink-0 text-right"><Label>AKTION</Label></div>
      </div>

      {FEHLT.map((f, i) => {
        const fertig = erinnert.includes(f.name)
        return (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05, ease: EASE }}
            className="flex items-center gap-md border-b px-xs py-[14px] [border-color:var(--color-border-subtle)]"
          >
            <div className="flex grow basis-0 flex-col gap-[3px]">
              <div className="text-[15px] leading-[20px] [color:var(--color-fg)]">{f.name}</div>
              <div className="text-[13px] leading-[18px] [color:var(--color-fg-muted)]">{f.grund}</div>
            </div>
            <div className="flex w-[180px] shrink-0 items-center gap-[9px]">
              <Avatar k={f.kuerzel} />
              <div className="text-sm leading-[17px] [color:var(--color-fg-muted)]">{f.von}</div>
            </div>
            <div className="w-[90px] shrink-0 text-right">
              <Label tone={f.fristWarn ? 'error' : 'subtle'}>{f.frist}</Label>
            </div>
            <div className="flex w-[130px] shrink-0 justify-end">
              {f.ton === 'still' ? (
                <Label>LÄUFT OHNE SIE</Label>
              ) : fertig ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <Label tone="muted">ERINNERT · HEUTE</Label>
                </motion.div>
              ) : (
                <button
                  onClick={() => {
                    setErinnert([...erinnert, f.name])
                    toast({
                      title: f.aktion === 'Erinnern' ? 'Erinnerung gesendet' : 'Nachfrage gesendet',
                      body: f.name + ' — ' + f.von + ' bekommt eine Mail mit Direktlink.',
                      tone: 'success',
                    })
                  }}
                  className="flex h-[32px] items-center rounded-md px-[14px] text-sm font-medium transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: f.ton === 'rot' ? 'var(--color-feedback-error-surface)' : 'var(--color-accent-amber-wash)',
                    color: f.ton === 'rot' ? 'var(--color-feedback-error)' : 'var(--color-accent-amber-ink)',
                  }}
                >
                  {f.aktion}
                </button>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
