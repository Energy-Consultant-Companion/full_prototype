import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import AppShell from '../../components/AppShell'
import { EASE, Label } from '../../components/ui'
import { navigate } from '../../lib/router'
import { useDemo } from '../../lib/store'

/* ── Prüfung starten ───────────────────────────────────────────────────── */

function Marke({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-lg items-center rounded-[5px] px-xs text-[13px] font-medium [background-color:var(--color-surface-sunken)] [color:var(--color-fg-muted)]">
      {children}
    </span>
  )
}

function Chip({ text, onWeg }: { text: string; onWeg?: () => void }) {
  return (
    <span className="inline-flex h-lg items-center gap-xs rounded-full border px-sm text-[14px] font-medium [background-color:var(--color-surface)] [border-color:var(--color-border-strong)] [color:var(--color-fg)]">
      {text}
      {onWeg && (
        <button onClick={onWeg} className="[color:var(--color-fg-subtle)] hover:[color:var(--color-fg)]" aria-label="Entfernen">
          <svg width="10" height="10" viewBox="0 0 14 14">
            <path d="M3.4 3.4l7.2 7.2M10.6 3.4l-7.2 7.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  )
}

function Start() {
  const [massnahmen, setMassnahmen] = useState(['Dach dämmen', 'Heizung tauschen'])
  const [laeuft, setLaeuft] = useState(false)

  const zeilen: Array<{ label: string; rechts: string; inhalt: React.ReactNode }> = [
    {
      label: 'Fall',
      rechts: 'BAFA EBW · ISFP',
      inhalt: (
        <button className="flex h-xl items-center gap-xs rounded-md border px-sm transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border)] hover:[background-color:var(--color-surface-sunken)]">
          <svg width="15" height="15" viewBox="0 0 24 24">
            <path d="M2.4 6.2a3.2 3.2 0 0 1 3.2-3.2h3.7a2.1 2.1 0 0 1 1.63.78l1.57 1.94h6.3a3.2 3.2 0 0 1 3.2 3.2v9.3a3.2 3.2 0 0 1-3.2 3.2H5.6a3.2 3.2 0 0 1-3.2-3.2z" fill="var(--color-section-faelle)" />
            <path d="M2.4 15.2a3.2 3.2 0 0 1 3.2-3.2h12.8a3.2 3.2 0 0 1 3.2 3.2v3a3.2 3.2 0 0 1-3.2 3.2H5.6a3.2 3.2 0 0 1-3.2-3.2z" fill="var(--color-section-faelle-soft)" stroke="var(--color-surface)" strokeWidth="1.8" />
          </svg>
          <span className="text-[16px] font-medium [color:var(--color-fg)]">Buchenweg 14, Peine</span>
          <span className="[font-family:var(--font-mono)] text-[11px] tracking-caps [color:var(--color-fg-subtle)]">FAMILIE REUTER</span>
          <svg width="13" height="13" viewBox="0 0 14 14">
            <path d="M3.2 5.2L7 9l3.8-3.8" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ),
    },
    {
      label: 'Gebäude',
      rechts: 'AUS DEM FALL',
      inhalt: (
        <div className="flex items-center gap-sm">
          <span className="text-[16px] [color:var(--color-fg)]">Einfamilienhaus, Baujahr 1968</span>
          <Marke>148,2 m²</Marke>
          <Marke>GAS 2004</Marke>
        </div>
      ),
    },
    {
      label: 'Maßnahme',
      rechts: 'LAUT ISFP',
      inhalt: (
        <div className="flex items-center gap-xs">
          {massnahmen.map((m) => (
            <Chip key={m} text={m} onWeg={() => setMassnahmen(massnahmen.filter((x) => x !== m))} />
          ))}
          <button
            onClick={() => setMassnahmen([...massnahmen, 'Fenster tauschen'].slice(0, 3))}
            className="flex h-lg items-center rounded-full border border-dashed px-sm text-[14px] [border-color:var(--color-border-strong)] [color:var(--color-fg-muted)] hover:[color:var(--color-fg)]"
          >
            + Weitere
          </button>
        </div>
      ),
    },
    {
      label: 'Kosten brutto',
      rechts: '2 ANGEBOTE',
      inhalt: (
        <div className="flex items-center gap-sm">
          <Marke>48.600 €</Marke>
          <span className="text-[16px] [color:var(--color-fg-muted)]">geschätzt aus Angebot Knop</span>
        </div>
      ),
    },
    {
      label: 'Antragsteller',
      rechts: 'SELBSTAUSKUNFT',
      inhalt: (
        <div className="flex items-center gap-sm">
          <span className="text-[16px] [color:var(--color-fg)]">Selbstnutzend seit 1998</span>
          <Marke>zvE &lt; 40.000 €</Marke>
        </div>
      ),
    },
  ]

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-[40px] py-[60px]">
      <div className="w-[640px]">
        <div className="flex items-center gap-xs">
          <div className="size-[7px] rounded-full [background-color:var(--color-accent-violet)]" />
          <Label tone="muted">FÖRDERPRÜFUNG</Label>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="pt-sm [font-family:var(--font-display)] text-[44px] font-semibold leading-[52px] tracking-tighter [color:var(--color-fg)]"
        >
          Welche Förderung passt?
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
          className="mt-[30px] overflow-clip rounded-lg border [background-color:var(--color-surface)] [border-color:var(--color-border)]"
        >
          {zeilen.map((z, i) => (
            <div key={z.label} className={'flex items-center gap-lg px-lg py-md' + (i > 0 ? ' border-t [border-color:var(--color-border-subtle)]' : '')}>
              <div className="w-[116px] shrink-0 text-[14px] leading-[18px] [color:var(--color-fg-muted)]">{z.label}</div>
              <div className="grow">{z.inhalt}</div>
              <div className="shrink-0"><Label>{z.rechts}</Label></div>
            </div>
          ))}
        </motion.div>

        <div className="flex items-center justify-between pt-lg">
          <Label>REGELSTAND 2026-01 · 14 PROGRAMME AKTIV</Label>
          <button
            onClick={() => {
              setLaeuft(true)
              window.setTimeout(() => navigate('/app/foerderung/ergebnisse'), 1200)
            }}
            className="flex h-[42px] items-center gap-xs rounded-full px-[22px] text-base font-semibold transition-colors [background-color:var(--color-brand)] [color:var(--color-brand-fg)] hover:[background-color:var(--color-brand-hover)]"
          >
            {laeuft ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                  className="block size-[14px] rounded-full border-2 border-white/30 border-t-white"
                />
                14 Programme werden geprüft …
              </>
            ) : (
              <>
                Förderung prüfen
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path d="M4.5 12h14.5M13 6.2 19 12l-6 5.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Ergebnisse ────────────────────────────────────────────────────────── */

const WEITERE = [
  {
    titel: 'Gebäudehülle · Dachdämmung',
    meta: 'BAFA BEG EM · NR. 5.1 · ANTRAG VOR AUFTRAGSVERGABE',
    betrag: '3.720 €',
    unten: '20 % INKL. ISFP',
    status: 'Wahrscheinlich förderfähig',
    ton: 'gruen',
  },
  {
    titel: 'Energieberatung für Wohngebäude',
    meta: 'BAFA EBW · QUOTE SEIT 07.08. 50 % STATT 80 %',
    betrag: 'bis 1.300 €',
    unten: '50 % · GEDECKELT',
    status: 'Prüfung nötig',
    ton: 'amber',
  },
  {
    titel: 'Effizienzhaus-Kredit mit Tilgungszuschuss',
    meta: 'KFW 261 · SCHLIESST EINZELMASSNAHMEN AM DACH AUS',
    betrag: '—',
    unten: '',
    status: 'Nicht förderfähig',
    ton: 'grau',
  },
]

const TON: Record<string, { bg: string; ink: string; line: string }> = {
  gruen: { bg: 'var(--color-accent-green-wash)', ink: 'var(--color-accent-green-ink)', line: 'var(--color-accent-green-line)' },
  amber: { bg: 'var(--color-accent-amber-wash)', ink: 'var(--color-accent-amber-ink)', line: 'var(--color-accent-amber-line)' },
  grau: { bg: 'var(--color-surface-sunken)', ink: 'var(--color-fg-muted)', line: 'var(--color-border)' },
}

function Ergebnisse() {
  return (
    <div className="mx-auto w-[880px] pt-[36px] pb-[40px]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-xs">
            <div className="size-[7px] rounded-full [background-color:var(--color-accent-violet)]" />
            <Label tone="muted">FÖRDERPRÜFUNG · BUCHENWEG 14, PEINE</Label>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="pt-[6px] [font-family:var(--font-display)] text-[30px] font-semibold leading-[38px] tracking-tight [color:var(--color-fg)]"
          >
            Förderwege
          </motion.div>
        </div>
        <button
          onClick={() => navigate('/app/foerderung')}
          className="flex h-[36px] items-center gap-xs rounded-full border px-md text-sm font-medium transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]"
        >
          <svg width="14" height="14" viewBox="0 0 16 16">
            <path d="M10.8 2.6l2.6 2.6L6 12.6 2.8 13.2l.6-3.2z" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
          Angaben ändern
        </button>
      </div>

      {/* Empfehlung */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mt-lg overflow-clip rounded-xl border shadow-[0_8px_28px_rgba(18,22,27,0.07)] [background-color:var(--color-surface)] [border-color:var(--color-border)]"
      >
        <div className="flex items-start justify-between gap-lg px-lg pt-lg pb-md">
          <div>
            <div
              className="inline-flex h-lg items-center rounded-[5px] px-xs text-[11px] font-medium tracking-caps"
              style={{ backgroundColor: 'var(--color-accent-violet-wash)', color: 'var(--color-accent-violet-ink)' }}
            >
              EMPFOHLENER WEG
            </div>
            <div className="flex items-baseline gap-sm pt-sm">
              <div className="[font-family:var(--font-display)] text-[22px] font-semibold leading-[28px] tracking-tight [color:var(--color-fg)]">
                Heizungsförderung für Wohngebäude
              </div>
              <Label>KFW 458</Label>
            </div>
            <div className="max-w-[640px] pt-[10px] text-[15px] leading-[23px] [color:var(--color-fg-muted)]">
              Wärmepumpe statt Gas-Brennwert, die Dachdämmung läuft parallel als Einzelmaßnahme über die BAFA.
            </div>
          </div>
          <span
            className="flex h-lg shrink-0 items-center gap-xs rounded-full px-sm text-xs font-medium"
            style={{ backgroundColor: 'var(--color-accent-green-wash)', color: 'var(--color-accent-green-ink)' }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14">
              <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Wahrscheinlich förderfähig
          </span>
        </div>

        <div className="flex border-t [border-color:var(--color-border-subtle)]">
          {[
            ['Zuschuss geschätzt', '21.000 €'],
            ['Förderquote', '70 %'],
            ['Höchstbetrag', '30.000 €'],
            ['Antrag bis', '31.12.2026'],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: EASE }}
              className={'flex grow basis-0 flex-col gap-xs px-lg py-md' + (i > 0 ? ' border-l [border-color:var(--color-border-subtle)]' : '')}
            >
              <div className="text-[14px] leading-[18px] [color:var(--color-fg-muted)]">{k}</div>
              <div className="[font-family:var(--font-display)] text-[22px] font-semibold leading-[26px] tracking-tight [color:var(--color-fg)]">{v}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-lg border-t px-lg py-md [background-color:var(--color-surface-sunken)] [border-color:var(--color-border-subtle)]">
          <div className="grow">
            <div className="text-[15px] leading-[20px] [color:var(--color-fg)]">
              Warum: Gas-Brennwert von 2004 wird ersetzt, zvE unter 40.000 € löst den Einkommens-Bonus aus.
            </div>
            <div className="pt-[5px]"><Label>KFW 458 · NR. 3.1 UND 4.2 · REGELSTAND 2026-01</Label></div>
          </div>
          <button
            onClick={() => navigate('/app/foerderung/programm')}
            className="flex h-[36px] shrink-0 items-center gap-xs rounded-md border px-md text-sm font-medium transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface)]"
          >
            Prüfung ansehen
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M2.4 7h9.2M8 3.4L11.6 7 8 10.6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Weitere */}
      <div className="flex items-baseline justify-between pt-[30px] pb-sm">
        <Label tone="muted">WEITERE PROGRAMME</Label>
        <Label>14 GEPRÜFT · 3 RELEVANT</Label>
      </div>
      {WEITERE.map((w, i) => {
        const t = TON[w.ton]
        return (
          <motion.button
            key={w.titel}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 + i * 0.07, ease: EASE }}
            onClick={() => navigate('/app/foerderung/programm')}
            className="flex w-full items-center gap-lg border-b py-md text-left transition-colors [border-color:var(--color-border-subtle)] hover:[background-color:var(--color-surface-sunken)]"
          >
            <div className="flex size-xl shrink-0 items-center justify-center rounded-md [background-color:var(--color-surface-sunken)]">
              <svg width="17" height="17" viewBox="0 0 16 16">
                <path d="M2.6 7.4 8 2.8l5.4 4.6v5.2a1.4 1.4 0 01-1.4 1.4H4a1.4 1.4 0 01-1.4-1.4z" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex grow flex-col gap-[4px]">
              <div className="text-[16px] leading-[20px]" style={{ color: w.ton === 'grau' ? 'var(--color-fg-subtle)' : 'var(--color-fg)' }}>
                {w.titel}
              </div>
              <Label>{w.meta}</Label>
            </div>
            <div className="w-[120px] shrink-0 text-right">
              <div className="text-[17px] font-semibold leading-[22px]" style={{ color: w.ton === 'grau' ? 'var(--color-fg-subtle)' : 'var(--color-fg)' }}>
                {w.betrag}
              </div>
              {w.unten && <div className="pt-[3px]"><Label>{w.unten}</Label></div>}
            </div>
            <div className="flex w-[210px] shrink-0 justify-end">
              <span
                className="flex h-lg items-center gap-xs rounded-full border px-sm text-xs font-medium"
                style={{ backgroundColor: t.bg, borderColor: t.line, color: t.ink }}
              >
                <svg width="12" height="12" viewBox="0 0 14 14">
                  {w.ton === 'gruen' && <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
                  {w.ton === 'amber' && (
                    <>
                      <circle cx="7" cy="7" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M7 4.2V7l2.1 1.3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  )}
                  {w.ton === 'grau' && <path d="M3.4 3.4l7.2 7.2M10.6 3.4l-7.2 7.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
                </svg>
                {w.status}
              </span>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
              <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )
      })}

      <div className="flex items-center gap-xs pt-lg">
        <svg width="14" height="14" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="6.2" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.2" />
          <path d="M8 7.2v4M8 4.9v.1" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <div className="text-[14px] [color:var(--color-fg-muted)]">
          Beträge sind Schätzungen auf Basis der hinterlegten Angaben. Verbindlich ist erst der Zuwendungsbescheid.
        </div>
      </div>
    </div>
  )
}

/* ── Programm im Detail ────────────────────────────────────────────────── */

const VORAUSSETZUNGEN = [
  { v: 'Heizung älter als 20 Jahre', n: 'Schornsteinfegerprotokoll', f: 'Nr. 3.1', g: '12.08.', s: 'Erfüllt', ton: 'gruen' },
  { v: 'zvE unter 40.000 € im Vorjahr', n: 'Einkommensteuerbescheid', f: 'Nr. 4.2', g: '—', s: 'Fehlt', ton: 'amber', nWarn: true },
  { v: 'Selbstnutzung seit mehr als 6 Monaten', n: 'Meldebescheinigung', f: 'Nr. 2.4', g: '21.07.', s: 'Erfüllt', ton: 'gruen' },
  { v: 'Kein Liefervertrag vor Antragsdatum', n: 'Vertragsdatum Knop', f: 'Nr. 6.1', g: '—', s: 'Zu prüfen', ton: 'grau' },
]

function Programm() {
  const { toast } = useDemo()
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.16 }}
        onClick={() => navigate('/app/foerderung/ergebnisse')}
        className="absolute inset-0 z-40 flex items-start justify-center bg-[rgba(244,246,248,0.72)] pt-[36px] backdrop-blur-[3px]"
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="flex w-[840px] flex-col overflow-hidden rounded-xl border shadow-[0_28px_70px_rgba(18,22,27,0.18)] [background-color:var(--color-surface)] [border-color:var(--color-border)]"
        >
          <div className="flex h-[58px] shrink-0 items-center gap-md border-b px-lg [border-color:var(--color-border-subtle)]">
            <div className="flex h-lg items-center rounded-[6px] border px-[10px] text-[11px] font-medium tracking-caps [border-color:var(--color-border-strong)] [color:var(--color-fg)]">
              FÖRDERPROGRAMM · PRÜFUNG
            </div>
            <div className="grow" />
            <Label>PROGRAMM 1 VON 3</Label>
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
            <button
              onClick={() => navigate('/app/foerderung/ergebnisse')}
              className="flex size-xl items-center justify-center rounded-md transition-colors hover:[background-color:var(--color-surface-sunken)]"
              aria-label="Schließen"
            >
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M3.4 3.4l7.2 7.2M10.6 3.4l-7.2 7.2" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => navigate('/app/regulierungen/aenderungen')}
            className="flex h-[42px] shrink-0 items-center gap-sm border-b px-lg text-left"
            style={{ backgroundColor: 'var(--color-accent-amber-wash)', borderColor: 'var(--color-accent-amber-line)' }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
              <path d="M8 2.2l5.8 10.2H2.2z" fill="none" stroke="var(--color-accent-amber-ink)" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M8 6.4v2.6M8 10.9v.1" fill="none" stroke="var(--color-accent-amber-ink)" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <div className="grow text-[14px] leading-[18px] [color:var(--color-fg)]">
              Seit 07.08. zählt der Steuerbescheid des Vorvorjahres — der Fall führt noch 2024.
            </div>
            <div className="shrink-0 [font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps" style={{ color: 'var(--color-accent-amber-ink)' }}>
              ÄNDERUNG ANSEHEN →
            </div>
          </button>

          <div className="flex gap-lg px-lg pt-lg">
            <div className="flex w-[376px] shrink-0 flex-col rounded-lg border p-md [border-color:var(--color-border)]">
              <div className="flex items-center gap-md pb-md">
                <div className="grow" />
                {[
                  'M8 4.4a3.6 3.6 0 100 7.2 3.6 3.6 0 000-7.2M6.6 7h2.8M6.6 9h2.8',
                  'M4 2h5l3 3v9H4zM9 2v3h3',
                  'M8 2.6a5.4 5.4 0 100 10.8A5.4 5.4 0 008 2.6M8 5.6V8l1.8 1.2',
                ].map((d) => (
                  <svg key={d} width="15" height="15" viewBox="0 0 16 16">
                    <path d={d} fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                ))}
                <button className="flex h-xl items-center rounded-md border px-sm text-sm font-medium transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]">
                  Merkblatt öffnen
                </button>
              </div>
              <div className="flex size-[48px] items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--color-accent-violet-wash)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24">
                  <path d="M12 2.9 20.2 6.1v6.1c0 4.3-3.2 7.8-8.2 9-5-1.2-8.2-4.7-8.2-9V6.1z" fill="var(--color-accent-violet-soft)" />
                  <path d="M9.2 12.2l2 2 3.8-4.2" fill="none" stroke="var(--color-accent-violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex items-center gap-xs pt-md">
                <Label>KFW-458-2026</Label>
                <svg width="12" height="12" viewBox="0 0 16 16">
                  <rect x="5" y="5" width="8.4" height="8.4" rx="1.5" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.2" />
                  <path d="M11 5V4a1.5 1.5 0 00-1.5-1.5H4A1.5 1.5 0 002.5 4v5.5A1.5 1.5 0 004 11h1" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.2" />
                </svg>
              </div>
              <div className="flex items-baseline gap-sm pt-2xs">
                <div className="[font-family:var(--font-display)] text-[22px] font-semibold leading-[28px] tracking-tight [color:var(--color-fg)]">
                  Heizungsförderung
                </div>
                <span className="flex items-center gap-[4px] text-sm font-medium" style={{ color: 'var(--color-accent-green-ink)' }}>
                  <svg width="12" height="12" viewBox="0 0 14 14">
                    <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Aktiv
                </span>
              </div>
              <div className="pt-[5px] text-[14px] leading-[19px] [color:var(--color-fg-muted)]">
                Bundesförderung effiziente Gebäude · Wohngebäude
              </div>
            </div>

            <div className="flex grow flex-col justify-center gap-[10px]">
              {[
                ['Träger', 'KfW Bankengruppe', false, 'M2.4 13.6h11.2M3.6 13.6V7.2M6.4 13.6V7.2M9.6 13.6V7.2M12.4 13.6V7.2M2 7.2 8 3.2l6 4z'],
                ['Form', 'Investitionszuschuss', false, 'M4 2h5l3 3v9H4zM9 2v3h3M6 9.4h4M6 11.6h2.4'],
                ['Antrag', 'Vor Lieferungsvertrag', false, 'M2.4 3.6h11.2v10H2.4zM2.4 6.6h11.2M5.6 2.4v2.4M10.4 2.4v2.4'],
                ['Ø Bearbeitung', '6–8 Wochen', true, 'M8 2.6a5.4 5.4 0 100 10.8A5.4 5.4 0 008 2.6M8 5.6V8l1.8 1.2'],
                ['Zweckbindung', '10 Jahre', true, 'M4.4 7.2V5.4a3.6 3.6 0 017.2 0v1.8M3.4 7.2h9.2v6.2H3.4z'],
              ].map(([k, v, marke, d]) => (
                <div key={k as string} className="flex items-center gap-sm">
                  <svg width="15" height="15" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                    <path d={d as string} fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="grow text-[14px] leading-[18px] [color:var(--color-fg-muted)]">{k as string}</div>
                  {marke ? <Marke>{v as string}</Marke> : <div className="text-[15px] font-medium leading-[20px] [color:var(--color-fg)]">{v as string}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="px-lg pt-lg">
            <div className="flex items-baseline justify-between pb-sm">
              <div className="text-md font-semibold leading-[22px] tracking-tight [color:var(--color-fg)]">Rechnung für diesen Fall</div>
              <Label>BASIS: ANGEBOT KNOP 12.08.</Label>
            </div>
            <div className="flex overflow-clip rounded-lg border [border-color:var(--color-border)]">
              {[
                ['Bemessungsgrundlage', '30.000 €', 'GRENZE 1. WOHNEINHEIT'],
                ['Förderquote', '70 %', 'GEKAPPT VON 80 %', true],
                ['Zuschuss', '21.000 €', 'NACH NACHWEIS'],
                ['Eigenanteil Heizung', '9.000 €', 'DACH: 14.880 €'],
              ].map(([k, v, u, warn], i) => (
                <div key={k as string} className={'flex grow basis-0 flex-col gap-[6px] p-md' + (i > 0 ? ' border-l [border-color:var(--color-border-subtle)]' : '')}>
                  <div className="text-[14px] leading-[18px] [color:var(--color-fg-muted)]">{k as string}</div>
                  <div className="[font-family:var(--font-display)] text-[20px] font-semibold leading-[24px] tracking-tight [color:var(--color-fg)]">{v as string}</div>
                  <Label tone={warn ? 'error' : 'subtle'}>{u as string}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="px-lg pt-lg">
            <div className="flex items-center gap-sm pb-sm">
              <div className="text-md font-semibold leading-[22px] tracking-tight [color:var(--color-fg)]">Vor Antragstellung</div>
              <div className="flex items-center gap-2xs">
                {[0, 1].map((d) => (
                  <button key={d} className="flex size-md items-center justify-center rounded-sm transition-colors hover:[background-color:var(--color-surface-sunken)]">
                    <svg width="12" height="12" viewBox="0 0 14 14" style={{ transform: d === 0 ? 'scaleX(-1)' : undefined }}>
                      <path d="M5.2 2.8L9.4 7l-4.2 4.2" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
              </div>
              <Label>PHASE 1 VON 3</Label>
              <div className="grow" />
              <button
                onClick={() => toast({ title: 'Nachweise angefordert', body: 'Familie Reuter bekommt eine Mail mit den zwei offenen Punkten.', tone: 'success' })}
                className="flex h-xl items-center gap-xs rounded-md border px-md text-sm font-medium transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]"
              >
                Nachweise anfordern
                <svg width="13" height="13" viewBox="0 0 16 16">
                  <rect x="2" y="3.6" width="12" height="8.8" rx="1.4" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" />
                  <path d="M2.4 4.4L8 8.6l5.6-4.2" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="flex h-xl items-center gap-xs rounded-md border px-md text-sm font-medium transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]">
                <svg width="13" height="13" viewBox="0 0 14 14">
                  <path d="M1.8 3.2h10.4L8.2 7.6v4l-2.4-1.2V7.6z" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
                Filter
              </button>
            </div>

            <div className="flex items-center gap-md border-b pb-xs [border-color:var(--color-border)]">
              <div className="grow basis-0"><Label>VORAUSSETZUNG</Label></div>
              <div className="w-[176px] shrink-0"><Label>NACHWEIS</Label></div>
              <div className="w-[92px] shrink-0"><Label>FUNDSTELLE</Label></div>
              <div className="w-[76px] shrink-0"><Label>GEPRÜFT</Label></div>
              <div className="w-[104px] shrink-0"><Label>STATUS</Label></div>
              <div className="w-[20px] shrink-0" />
            </div>
            {VORAUSSETZUNGEN.map((z, i) => {
              const t = TON[z.ton]
              return (
                <motion.div
                  key={z.v}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05, ease: EASE }}
                  className="flex items-center gap-md border-b py-[13px] [border-color:var(--color-border-subtle)]"
                >
                  <div className="grow basis-0 text-[15px] leading-[20px] [color:var(--color-fg)]">{z.v}</div>
                  <div className="w-[176px] shrink-0 text-[14px] leading-[18px]" style={{ color: z.nWarn ? 'var(--color-accent-amber-ink)' : 'var(--color-fg-muted)' }}>
                    {z.n}
                  </div>
                  <div className="w-[92px] shrink-0 text-[13px] [color:var(--color-fg-subtle)]">{z.f}</div>
                  <div className="w-[76px] shrink-0 text-[13px] [color:var(--color-fg-subtle)]">{z.g}</div>
                  <div className="w-[104px] shrink-0">
                    <span className="inline-flex h-lg items-center gap-xs rounded-full px-[10px] text-xs font-medium" style={{ backgroundColor: t.bg, color: t.ink }}>
                      <svg width="11" height="11" viewBox="0 0 14 14">
                        {z.ton === 'gruen' && <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
                        {z.ton !== 'gruen' && (
                          <>
                            <circle cx="7" cy="7" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                            <path d="M7 4.2v3.4M7 9.6v.1" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                          </>
                        )}
                      </svg>
                      {z.s}
                    </span>
                  </div>
                  <button className="flex w-[20px] shrink-0 justify-center [color:var(--color-fg-subtle)]">
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <circle cx="7" cy="2.8" r="1.1" fill="currentColor" />
                      <circle cx="7" cy="7" r="1.1" fill="currentColor" />
                      <circle cx="7" cy="11.2" r="1.1" fill="currentColor" />
                    </svg>
                  </button>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-lg flex h-[72px] shrink-0 items-center justify-end gap-md border-t px-lg [background-color:var(--color-surface-sunken)] [border-color:var(--color-border)]">
            <button onClick={() => navigate('/app/foerderung/ergebnisse')} className="px-sm text-[14px] [color:var(--color-fg-muted)] hover:[color:var(--color-fg)]">
              Verwerfen
            </button>
            <button
              onClick={() => {
                toast({ title: 'Förderweg im Fall übernommen', body: 'KfW 458 · Zuschuss 21.000 € · vier Voraussetzungen als Aufgaben angelegt.', tone: 'success' })
                navigate('/app/fall/reuter')
              }}
              className="flex h-[38px] items-center gap-xs rounded-md px-[18px] text-[15px] font-semibold transition-colors [background-color:var(--color-brand)] [color:var(--color-brand-fg)] hover:[background-color:var(--color-brand-hover)]"
            >
              <svg width="15" height="15" viewBox="0 0 14 14">
                <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Für diesen Fall übernehmen
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Bildschirm ────────────────────────────────────────────────────────── */

export default function Foerderung({ ansicht }: { ansicht: 'start' | 'ergebnisse' | 'programm' }) {
  return (
    <AppShell>
      <div className="scrollbar-slim relative flex-1 overflow-y-auto [background-color:var(--color-surface)]">
        {ansicht === 'start' && <Start />}
        {ansicht !== 'start' && <Ergebnisse />}
        {ansicht === 'programm' && <Programm />}
      </div>
    </AppShell>
  )
}
