import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import AppShell from '../../components/AppShell'
import { EASE, Label } from '../../components/ui'
import { OrdnerBerechnungen, OrdnerFoerderweg } from '../../components/fallIcons'
import { navigate } from '../../lib/router'
import { useDemo } from '../../lib/store'

/* ── Eingabefeld, in beiden Ansichten gleich ───────────────────────────── */

function Kontextchip({ text, art }: { text: string; art: 'fall' | 'datei' }) {
  return (
    <span className="inline-flex h-xl items-center gap-xs rounded-full border px-sm text-[14px] font-medium shadow-[0_1px_2px_rgba(18,22,27,0.05)] [background-color:var(--color-surface)] [border-color:var(--color-border)] [color:var(--color-fg)]">
      {art === 'fall' ? (
        <svg width="15" height="15" viewBox="0 0 24 24">
          <path d="M2.4 6.2a3.2 3.2 0 0 1 3.2-3.2h3.7a2.1 2.1 0 0 1 1.63.78l1.57 1.94h6.3a3.2 3.2 0 0 1 3.2 3.2v9.3a3.2 3.2 0 0 1-3.2 3.2H5.6a3.2 3.2 0 0 1-3.2-3.2z" fill="var(--color-section-faelle)" />
          <path d="M2.4 15.2a3.2 3.2 0 0 1 3.2-3.2h12.8a3.2 3.2 0 0 1 3.2 3.2v3a3.2 3.2 0 0 1-3.2 3.2H5.6a3.2 3.2 0 0 1-3.2-3.2z" fill="var(--color-section-faelle-soft)" stroke="var(--color-surface)" strokeWidth="1.8" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24">
          <path d="M4 5.6a3 3 0 0 1 3-3h6.6v4.5a2.4 2.4 0 0 0 2.4 2.4H20v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="var(--color-accent-pink-soft)" />
          <path d="M14.2 2.7 20.1 8.6a1 1 0 0 1-.7 1.7h-3a2.4 2.4 0 0 1-2.4-2.4V3.4a1 1 0 0 1 .2-.7z" fill="var(--color-accent-pink)" />
        </svg>
      )}
      {text}
      <svg width="10" height="10" viewBox="0 0 14 14" style={{ color: 'var(--color-fg-subtle)' }}>
        <path d="M3.4 3.4l7.2 7.2M10.6 3.4l-7.2 7.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function Eingabe({ chips, onSenden }: { chips: Array<{ text: string; art: 'fall' | 'datei' }>; onSenden: () => void }) {
  const [text, setText] = useState('')
  return (
    <div className="w-full">
      <div className="flex items-center gap-sm pb-sm">
        {chips.map((c) => (
          <Kontextchip key={c.text} {...c} />
        ))}
      </div>
      <div className="flex flex-col rounded-xl border p-md shadow-[0_2px_10px_rgba(18,22,27,0.05)] [background-color:var(--color-surface)] [border-color:var(--color-border)] focus-within:[border-color:var(--color-border-strong)]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              onSenden()
            }
          }}
          placeholder="Was gilt für diesen Fall?"
          rows={1}
          className="h-[46px] w-full resize-none text-[17px] leading-[24px] outline-none placeholder:[color:var(--color-fg-subtle)]"
        />
        <div className="flex items-center gap-sm">
          {[
            'M4 2h5l3 3v9H4zM9 2v3h3M8 8v3.6M6.4 10L8 11.6l1.6-1.6',
            'M1.8 4a1.8 1.8 0 011.8-1.8h2.1c.4 0 .8.2 1 .5L7.6 4h4.6A1.8 1.8 0 0114 5.8v6A1.8 1.8 0 0112.2 13.6H3.6A1.8 1.8 0 011.8 11.8zM8 7.2v3.6M6.4 9.2L8 10.8l1.6-1.6',
          ].map((d) => (
            <button key={d} className="[color:var(--color-fg-subtle)] transition-colors hover:[color:var(--color-fg)]">
              <svg width="17" height="17" viewBox="0 0 16 16">
                <path d={d} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
          <div className="grow" />
          <button className="flex items-center gap-xs text-[14px] font-medium [color:var(--color-fg)]">
            BAFA EBW
            <svg width="13" height="13" viewBox="0 0 14 14">
              <path d="M3.2 5.2L7 9l3.8-3.8" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={onSenden}
            className="flex size-xl shrink-0 items-center justify-center rounded-full transition-colors [background-color:var(--color-surface-sunken)] hover:[background-color:var(--color-border)]"
            aria-label="Fragen"
          >
            <svg width="15" height="15" viewBox="0 0 16 16">
              <path d="M8 13V3M4 7l4-4 4 4" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Frage stellen ─────────────────────────────────────────────────────── */

const ZULETZT = [
  { titel: 'Anschluss ans Wärmenetz', quelle: 'BAFA EBW', text: 'Zählt als Einzelmaßnahme — aber nur mit Nachweis des Netzbetreibers.', icon: 'reg' },
  { titel: 'Heizlastberechnung', quelle: 'KFW 458', text: 'Seit 01.09. vor Inbetriebnahme Pflicht — betrifft drei Ihrer Fälle.', icon: 'foe' },
  { titel: 'iSFP nachträglich', quelle: 'ISFP', text: 'Geht nicht. Der Plan muss vor dem Antrag vorliegen, sonst kein Bonus.', icon: 'unt' },
  { titel: 'Frist Verwendungsnachweis', quelle: 'BEG EM', text: '36 Monate ab Zusage. Für Yildirim endet sie am 14.11.', icon: 'schr' },
]

function Frage() {
  return (
    <div className="flex min-h-full flex-col items-center px-[40px] pt-[80px] pb-[60px]">
      <motion.button
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={() => navigate('/app/regulierungen/aenderungen')}
        className="flex h-[34px] items-center gap-sm rounded-full border px-md shadow-[0_1px_2px_rgba(18,22,27,0.05)] [background-color:var(--color-surface)] [border-color:var(--color-border)]"
      >
        <span className="text-[14px] [color:var(--color-fg-muted)]">Regelstand 2026-01</span>
        <span className="[color:var(--color-border-strong)]">·</span>
        <span className="text-[14px] font-medium [color:var(--color-brand)]">1 Änderung ansehen</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
        className="pt-[60px] [font-family:var(--font-display)] text-[54px] font-semibold leading-[60px] tracking-tighter [color:var(--color-fg)]"
      >
        Regulierungs AI
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
        className="w-[760px] pt-[40px]"
      >
        <Eingabe
          chips={[
            { text: 'Buchenweg 14, Peine', art: 'fall' },
            { text: 'Angebot Knop.pdf', art: 'datei' },
          ]}
          onSenden={() => navigate('/app/regulierungen/antwort')}
        />
      </motion.div>

      <div className="w-[760px] pt-[44px]">
        <Label>ZULETZT GEFRAGT</Label>
        <div className="grid grid-cols-2 gap-md pt-sm">
          {ZULETZT.map((z, i) => (
            <motion.button
              key={z.titel}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06, ease: EASE }}
              whileHover={{ y: -3, boxShadow: '0 10px 26px rgba(18,22,27,0.07)' }}
              onClick={() => navigate('/app/regulierungen/antwort')}
              className="flex items-start gap-sm rounded-lg border p-md text-left [background-color:var(--color-surface)] [border-color:var(--color-border)]"
            >
              <div
                className="flex size-xl shrink-0 items-center justify-center rounded-md"
                style={{
                  backgroundColor:
                    z.icon === 'reg' ? '#F4EBDF' : z.icon === 'foe' ? 'var(--color-accent-violet-wash)' : z.icon === 'unt' ? 'var(--color-accent-pink-wash)' : 'var(--color-accent-amber-wash)',
                }}
              >
                {z.icon === 'foe' ? <OrdnerFoerderweg size={17} /> : z.icon === 'unt' ? <OrdnerBerechnungen size={17} /> : (
                  <svg width="17" height="17" viewBox="0 0 24 24">
                    <rect x="3" y="2.8" width="18" height="18.4" rx="4.2" fill="#D9BE9C" />
                    <path d="M3 7a4.2 4.2 0 0 1 4.2-4.2h2.6v18.4H7.2A4.2 4.2 0 0 1 3 17z" fill="#96602F" />
                  </svg>
                )}
              </div>
              <div className="flex grow flex-col gap-[5px]">
                <div className="flex items-baseline justify-between gap-sm">
                  <div className="text-[16px] font-medium leading-[20px] [color:var(--color-fg)]">{z.titel}</div>
                  <Label>{z.quelle}</Label>
                </div>
                <div className="text-[14px] leading-[21px] [color:var(--color-fg-muted)]">{z.text}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Antwort ───────────────────────────────────────────────────────────── */

const PUNKTE = [
  {
    titel: 'Der Zuschuss für die Beratung fällt von 80 auf 50 Prozent.',
    text: 'Der Höchstbetrag ist gleich geblieben, nur der Prozentsatz nicht — beim Ein- und Zweifamilienhaus bleiben höchstens 1.300 € übrig. Wer die Honorarvereinbarung noch mit 80 Prozent kalkuliert hat, muss sie vor der nächsten Rechnung anpassen.',
  },
  {
    titel: 'Der iSFP-Bonus bleibt bei fünf Prozentpunkten — aber nicht für den Heizungstausch.',
    text: 'Für Hülle und Anlagentechnik gilt er unverändert. Der Heizungstausch läuft über die KfW und kennt diesen Bonus nicht — wer ihn dort einplant, rechnet der Kundschaft zu viel vor.',
  },
  {
    titel: 'Mit iSFP verdoppelt sich die förderfähige Summe je Wohneinheit.',
    text: 'Statt 30.000 € sind 60.000 € je Wohneinheit und Kalenderjahr ansetzbar. Das ist der eigentliche Hebel des Fahrplans: bei einer einzelnen Dachdämmung merkt man ihn nicht, bei Dach plus Fenster plus Lüftung sehr wohl.',
  },
  {
    titel: 'Die Zusatzvergütung für die Erläuterung in der Eigentümerversammlung ist gestrichen.',
    text: 'Das Gespräch bleibt Pflicht, wird aber nicht mehr eigens gefördert. Bei Wohnbau Peine mit 22 Einheiten gehört dieser Termin ab jetzt ins Honorar, nicht in den Antrag.',
  },
]

const FUNDSTELLEN = [
  { nr: '1', quelle: 'BAFA EBW · Nr. 3.2', stand: 'GEÄNDERT 07.08.', warn: true },
  { nr: '2', quelle: 'BEG EM · Nr. 5.4', stand: 'STAND 2026-01' },
  { nr: '3', quelle: 'BEG EM · Nr. 4.1', stand: 'STAND 2026-01' },
  { nr: '4', quelle: 'BAFA EBW · Nr. 3.5', stand: 'GEÄNDERT 07.08.', warn: true },
]

function Antwort() {
  const { toast } = useDemo()
  return (
    <div className="mx-auto flex w-[920px] pt-[36px] pb-[40px]">
      <div className="w-[700px] shrink-0">
        <div className="border-l-2 pl-md [border-color:var(--color-border-strong)]">
          <Label>IHRE FRAGE · HEUTE, 08:14</Label>
          <div className="pt-xs text-[17px] leading-[25px] [color:var(--color-fg)]">
            Beim iSFP hat sich zum Jahreswechsel etwas geändert. Was genau und was heißt das für die drei Beratungen, die bei uns laufen?
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="pt-lg [font-family:var(--font-display)] text-[26px] font-semibold leading-[34px] tracking-tight [color:var(--color-fg)]"
        >
          Vier Änderungen. Die wichtigste halbiert den Zuschuss für die Beratung.
        </motion.div>

        <div className="flex flex-col gap-md pt-lg">
          {PUNKTE.map((p, i) => (
            <motion.div
              key={p.titel}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: EASE }}
              className="flex gap-sm"
            >
              <div className="w-[16px] shrink-0 pt-[3px] text-right [font-family:var(--font-mono)] text-xs [color:var(--color-brand)]">{i + 1}</div>
              <div>
                <div className="text-[17px] font-semibold leading-[24px] [color:var(--color-fg)]">{p.titel}</div>
                <div className="pt-[6px] text-[16px] leading-[25px] [color:var(--color-fg-muted)]">{p.text}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-lg pt-lg">
          <button
            onClick={() => navigate('/app/regulierungen/aenderungen')}
            className="flex h-[36px] items-center gap-xs rounded-full border px-md text-[14px] font-medium transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path d="M2.4 6.2a3.2 3.2 0 0 1 3.2-3.2h3.7a2.1 2.1 0 0 1 1.63.78l1.57 1.94h6.3a3.2 3.2 0 0 1 3.2 3.2v9.3a3.2 3.2 0 0 1-3.2 3.2H5.6a3.2 3.2 0 0 1-3.2-3.2z" fill="var(--color-section-faelle)" />
              <path d="M2.4 15.2a3.2 3.2 0 0 1 3.2-3.2h12.8a3.2 3.2 0 0 1 3.2 3.2v3a3.2 3.2 0 0 1-3.2 3.2H5.6a3.2 3.2 0 0 1-3.2-3.2z" fill="var(--color-section-faelle-soft)" stroke="var(--color-surface)" strokeWidth="1.8" />
            </svg>
            Drei laufende Beratungen prüfen
          </button>
          <button
            onClick={() => toast({ title: 'Als Notiz angehängt', body: 'Liegt im Verlauf der drei betroffenen Fälle.' })}
            className="text-[14px] [color:var(--color-fg-muted)] hover:[color:var(--color-fg)]"
          >
            Als Notiz anhängen
          </button>
          <button
            onClick={() => toast({ title: 'Mit Fundstellen kopiert', body: 'Vier Punkte inklusive Quellenangaben in der Zwischenablage.' })}
            className="text-[14px] [color:var(--color-fg-muted)] hover:[color:var(--color-fg)]"
          >
            Mit Fundstellen kopieren
          </button>
        </div>

        <div className="pt-[56px]">
          <Eingabe
            chips={[
              { text: 'Wohnbau Peine eG', art: 'fall' },
              { text: 'EBW-Merkblatt 2026-01.pdf', art: 'datei' },
            ]}
            onSenden={() => navigate('/app/regulierungen/antwort')}
          />
        </div>
      </div>

      <div className="w-[190px] shrink-0 pl-xl pt-[240px]">
        <Label>FUNDSTELLEN</Label>
        <div className="flex flex-col gap-md pt-sm">
          {FUNDSTELLEN.map((f, i) => (
            <motion.div
              key={f.nr}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.08, ease: EASE }}
              className="flex gap-sm"
            >
              <div className="w-[10px] shrink-0 [font-family:var(--font-mono)] text-xs [color:var(--color-brand)]">{f.nr}</div>
              <div>
                <div className="text-[13px] leading-[17px] [color:var(--color-fg)]">{f.quelle}</div>
                <div className="pt-[3px]"><Label tone={f.warn ? 'error' : 'subtle'}>{f.stand}</Label></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Änderungen ────────────────────────────────────────────────────────── */

const BETRIFFT = [
  {
    datum: '07.08.',
    quelle: 'BAFA EBW NR. 3.2',
    art: 'GEÄNDERT',
    titel: 'Der Zuschuss für die Beratung fällt von 80 auf 50 Prozent.',
    text: 'Der Höchstbetrag bleibt bei 1.300 € je Beratung. Honorarvereinbarungen, die noch mit 80 Prozent kalkuliert sind, müssen vor der nächsten Rechnung angepasst werden.',
    faelle: 'Drei Beratungen',
  },
  {
    datum: '01.09.',
    quelle: 'KFW 458 NR. 2.3',
    art: 'NEU',
    titel: 'Die Heizlastberechnung wird vor Inbetriebnahme Pflicht.',
    text: 'Gilt für alle Anträge ab dem 1. September. Bei Yildirim und Bauer steht der Nachweis noch aus — beide Einbautermine liegen nach dem Stichtag.',
    faelle: 'Zwei Beratungen',
  },
  {
    datum: '22.07.',
    quelle: 'BEG EM NR. 5.4',
    art: 'FRIST',
    titel: 'Der Verwendungsnachweis muss binnen 36 statt 48 Monaten vorliegen.',
    text: 'Die verkürzte Frist gilt rückwirkend für Zusagen ab 2023. Bei Petersen endet sie dadurch schon am 14. November.',
    faelle: 'Eine Beratung',
  },
]

const KENNTNIS = [
  ['08.08.', 'Merkblatt Energieberatung für Wohngebäude in Fassung 2026-01 veröffentlicht', 'BAFA EBW'],
  ['04.08.', 'Zusatzvergütung für die Erläuterung in der Eigentümerversammlung gestrichen', 'BAFA EBW · NR. 3.5'],
  ['29.07.', 'Förderfähige Kosten mit iSFP bleiben bei 60.000 € je Wohneinheit und Jahr', 'BEG EM · NR. 4.1'],
  ['18.07.', 'Antragsformular um das Feld „Anschluss an ein Wärmenetz“ ergänzt', 'KFW 458'],
]

function Aenderungen() {
  const { toast } = useDemo()
  return (
    <div className="mx-auto w-[1096px] pt-[36px] pb-[40px]">
      <div className="flex items-start justify-between">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="[font-family:var(--font-display)] text-[30px] font-semibold leading-[38px] tracking-tight [color:var(--color-fg)]"
        >
          Regulierungsänderungen
        </motion.div>
        <div className="flex items-center gap-sm">
          {['Alle Regelwerke', 'Seit 1. Juli'].map((l) => (
            <button
              key={l}
              className="flex h-[36px] items-center gap-xs rounded-full border px-md text-[14px] font-medium transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]"
            >
              {l}
              <svg width="13" height="13" viewBox="0 0 14 14">
                <path d="M3.2 5.2L7 9l3.8-3.8" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-baseline justify-between pt-[30px] pb-xs">
        <Label>BETRIFFT IHRE FÄLLE</Label>
        <Label>3 VON 9</Label>
      </div>

      {BETRIFFT.map((b, i) => (
        <motion.div
          key={b.titel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
          className="flex items-start gap-lg border-b py-lg [border-color:var(--color-border-subtle)]"
        >
          <div className="grow basis-0">
            <div className="flex items-center gap-sm">
              <Label>{b.datum} · {b.quelle}</Label>
              <span className="[color:var(--color-border-strong)]">·</span>
              <div
                className="[font-family:var(--font-mono)] text-[10px] font-medium leading-sm tracking-caps"
                style={{ color: b.art === 'NEU' ? 'var(--color-brand)' : b.art === 'FRIST' ? 'var(--color-accent-amber-ink)' : 'var(--color-accent-violet-ink)' }}
              >
                {b.art}
              </div>
            </div>
            <div className="pt-[8px] text-[19px] font-semibold leading-[26px] tracking-tight [color:var(--color-fg)]">{b.titel}</div>
            <div className="max-w-[660px] pt-[6px] text-[16px] leading-[25px] [color:var(--color-fg-muted)]">{b.text}</div>
          </div>
          <button
            onClick={() => {
              toast({ title: b.faelle + ' geöffnet', body: 'ENSERA hat die betroffenen Fälle gefiltert.' })
              navigate('/app/faelle')
            }}
            className="flex h-[36px] shrink-0 items-center gap-xs rounded-full border px-md text-[14px] font-medium transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path d="M2.4 6.2a3.2 3.2 0 0 1 3.2-3.2h3.7a2.1 2.1 0 0 1 1.63.78l1.57 1.94h6.3a3.2 3.2 0 0 1 3.2 3.2v9.3a3.2 3.2 0 0 1-3.2 3.2H5.6a3.2 3.2 0 0 1-3.2-3.2z" fill="var(--color-section-faelle)" />
              <path d="M2.4 15.2a3.2 3.2 0 0 1 3.2-3.2h12.8a3.2 3.2 0 0 1 3.2 3.2v3a3.2 3.2 0 0 1-3.2 3.2H5.6a3.2 3.2 0 0 1-3.2-3.2z" fill="var(--color-section-faelle-soft)" stroke="var(--color-surface)" strokeWidth="1.8" />
            </svg>
            {b.faelle}
          </button>
        </motion.div>
      ))}

      <div className="flex items-baseline justify-between pt-[40px] pb-xs">
        <Label>ZUR KENNTNIS</Label>
        <Label>6 VON 9</Label>
      </div>
      {KENNTNIS.map(([d, t, q]) => (
        <div key={t} className="flex items-baseline gap-lg border-b py-[11px] [border-color:var(--color-border-subtle)]">
          <div className="w-[80px] shrink-0"><Label>{d}</Label></div>
          <div className="grow basis-0 text-[16px] leading-[22px] [color:var(--color-fg)]">{t}</div>
          <div className="shrink-0"><Label>{q}</Label></div>
        </div>
      ))}
      <div className="flex items-baseline gap-lg py-[11px]">
        <div className="w-[80px] shrink-0"><Label>ÄLTER</Label></div>
        <button className="text-[16px] leading-[22px] [color:var(--color-brand)] hover:underline">
          Zwei redaktionelle Korrekturen aus dem Juli ansehen
        </button>
      </div>
    </div>
  )
}

/* ── Bildschirm ────────────────────────────────────────────────────────── */

export default function Regulierungen({ ansicht }: { ansicht: 'frage' | 'antwort' | 'aenderungen' }) {
  return (
    <AppShell>
      <div className="scrollbar-slim relative flex-1 overflow-y-auto [background-color:var(--color-surface)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={ansicht} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            {ansicht === 'frage' && <Frage />}
            {ansicht === 'antwort' && <Antwort />}
            {ansicht === 'aenderungen' && <Aenderungen />}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  )
}
