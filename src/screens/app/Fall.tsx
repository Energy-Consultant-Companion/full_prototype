import { AnimatePresence, motion } from 'motion/react'
import AppShell from '../../components/AppShell'
import FallRail from '../../components/FallRail'
import { EASE, Label } from '../../components/ui'
import { IconDoc, IconGrid, IconMail, IconPencil, IconUpload } from '../../components/icons'
import {
  SchrittErgebnis, SchrittFahrplan, SchrittGespraech, SchrittTermin, SchrittUnterlagen, SchrittVertrag,
} from '../../components/fallIcons'
import { ENTWUERFE, FAELLE, KOMM_JE_FALL, ZAEHLER_JE_FALL } from '../../lib/daten'
import { navigate } from '../../lib/router'
import { useDemo } from '../../lib/store'
import FallUnterlagen from './FallUnterlagen'
import FallSchritte from './FallSchritte'
import FallVerlauf from './FallVerlauf'
import Nachrichtenentwurf from '../../components/Nachrichtenentwurf'

/* ── Fortschrittsband ──────────────────────────────────────────────────── */

const BAND = [
  { titel: 'Erstgespräch', icon: SchrittGespraech, wash: 'var(--color-accent-teal-wash)', stand: 'fertig' },
  { titel: 'Vertrag &\nVollmacht', icon: SchrittVertrag, wash: 'var(--color-accent-sky-wash)', stand: 'fertig' },
  { titel: 'Unterlagen', icon: SchrittUnterlagen, wash: 'var(--color-accent-pink-wash)', stand: 'jetzt', datum: 'BIS 15. AUGUST' },
  { titel: 'Vor-Ort-Termin', icon: SchrittTermin, wash: 'var(--color-surface-sunken)', stand: 'offen', datum: '19. AUGUST' },
  { titel: 'Sanierungsfahrplan', icon: SchrittFahrplan, wash: 'var(--color-surface-sunken)', stand: 'offen', datum: 'CA. 9. SEPTEMBER' },
  { titel: 'Ergebnis und Förderantrag', icon: SchrittErgebnis, wash: 'var(--color-surface-sunken)', stand: 'offen', datum: 'CA. 16. SEPTEMBER' },
]

function Schrittband({ onAlle }: { onAlle: () => void }) {
  return (
    <div className="flex shrink-0 flex-col gap-sm self-stretch rounded-lg border px-[20px] pt-[13px] pb-[14px] shadow-[#12161B0D_0px_1px_2px] [background-color:var(--color-surface)] [border-color:var(--color-border)]">
      <div className="flex items-center justify-between gap-md self-stretch">
        <div className="[font-family:var(--font-mono)] text-[10px] font-medium leading-sm tracking-caps [color:var(--color-fg)]">
          SCHRITT 3 VON 10 · UNTERLAGEN
        </div>
      </div>
      <div className="flex items-start self-stretch pt-3xs">
        {BAND.map((s, i) => (
          <motion.div
            key={s.titel}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
            className="flex grow basis-0 flex-col gap-[10px]"
          >
            <div className="flex items-center gap-xs self-stretch">
              <div
                className="flex size-[34px] shrink-0 items-center justify-center rounded-full"
                style={
                  s.stand === 'jetzt'
                    ? {
                        backgroundColor: 'var(--color-surface)',
                        border: '1.5px solid var(--color-accent-pink)',
                        boxShadow: '0 0 0 4px var(--color-accent-pink-wash)',
                      }
                    : { backgroundColor: s.wash }
                }
              >
                {s.icon}
              </div>
              {i === BAND.length - 1 ? (
                <>
                  <div className="h-3xs w-[41px] shrink-0 rounded-full [background-color:var(--color-border)]" />
                  <div className="h-3xs w-[5px] shrink-0 rounded-full [background-color:var(--color-border)]" />
                  <div className="h-3xs w-[5px] shrink-0 rounded-full [background-color:var(--color-border)]" />
                  <div className="h-3xs w-[5px] shrink-0 rounded-full [background-color:var(--color-border)]" />
                </>
              ) : (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: EASE }}
                  className="h-3xs grow origin-left rounded-full"
                  style={{ backgroundColor: s.stand === 'fertig' ? 'var(--color-fg)' : 'var(--color-border)' }}
                />
              )}
            </div>
            <div className="flex flex-col gap-[3px] pr-md">
              <div
                className="h-xl shrink-0 whitespace-pre-wrap text-[12.5px] leading-md"
                style={{
                  color: s.stand === 'jetzt' ? 'var(--color-fg)' : s.stand === 'fertig' ? 'var(--color-fg-muted)' : 'var(--color-fg-subtle)',
                  fontWeight: s.stand === 'jetzt' ? 600 : 400,
                }}
              >
                {s.titel}
              </div>
              {s.datum && (
                <div
                  className="[font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps"
                  style={{ color: s.stand === 'jetzt' ? 'var(--color-feedback-error)' : 'var(--color-fg-subtle)', fontWeight: s.stand === 'jetzt' ? 500 : 400 }}
                >
                  {s.datum}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-3xs flex shrink-0 items-center justify-end gap-sm self-stretch border-t pt-[10px] [border-color:var(--color-border-subtle)]">
        <button onClick={onAlle} className="text-[12.5px] font-medium leading-[17px] [color:var(--color-brand)] hover:underline">
          Alle zwölf Schritte →
        </button>
      </div>
    </div>
  )
}

/* ── Schnellaktionen ───────────────────────────────────────────────────── */

const KACHELN = [
  { titel: 'Unterlagen hochladen', zahl: '4', rand: '#F8D3E4', innen: '#F6C7DC', verlauf: 'linear-gradient(155deg,#FDEDF4 0%,#FEF5F9 55%,#FFFCFD 100%)', icon: SchrittUnterlagen, ziel: 'unterlagen' },
  { titel: 'Unterlagen prüfen', zahl: '3', rand: '#F8D3E4', innen: '#F6C7DC', verlauf: 'linear-gradient(155deg,#FDEDF4 0%,#FEF5F9 55%,#FFFCFD 100%)', icon: SchrittUnterlagen, ziel: 'unterlagen/fehlend' },
  {
    titel: 'Prüfe iSFP', zahl: '2', rand: '#DED4FB', innen: '#D5C9F9', verlauf: 'linear-gradient(155deg,#F3EEFE 0%,#F8F5FE 55%,#FDFCFF 100%)',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
        <path d="M12 2.9 20.2 6.1v6.1c0 4.3-3.2 7.8-8.2 9-5-1.2-8.2-4.7-8.2-9V6.1z" fill="#CFBCFA" stroke="#CFBCFA" strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M12 7.6 16.6 9.4v3.1c0 2.4-1.8 4.4-4.6 5.1-2.8-.7-4.6-2.7-4.6-5.1V9.4z" fill="#8B5CF0" stroke="#8B5CF0" strokeWidth="2.2" strokeLinejoin="round" />
      </svg>
    ),
    ziel: 'foerderung',
  },
  {
    titel: 'Beantworte Frage', zahl: '1', rand: '#C9E9E8', innen: '#BCE4E3', verlauf: 'linear-gradient(155deg,#E6F7F7 0%,#F1FBFB 55%,#FBFEFE 100%)',
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
        <rect x="7.2" y="2.2" width="14.8" height="11.8" rx="4.4" fill="#17B3B0" />
        <path d="M6.5 8.4H12.7A4.6 4.6 0 0 1 17.3 13V15.2A4.6 4.6 0 0 1 12.7 19.8H9.9L5.8 22.6V19.5A4.6 4.6 0 0 1 1.9 15V13A4.6 4.6 0 0 1 6.5 8.4Z" fill="#A6E4E3" stroke="#FFFFFF" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
    ziel: 'fragen',
  },
]

/* ── Übersicht ─────────────────────────────────────────────────────────── */

const ZUSAMMENFASSUNG = [
  ['ZIEL', 'Heizkosten senken, Dach dämmen. Weg: BAFA EBW mit iSFP.'],
  ['GEBÄUDE', 'Einfamilienhaus 1968, 148,2 m², Gas-Brennwert von 2004.'],
  ['ENTSCHIEDEN', 'iSFP statt Einzelmaßnahme; Dach zuerst, Heizung später.'],
  ['STAND', 'Sieben Unterlagen geprüft, zwei fehlen. Verbrauch 2024 offen.'],
]

function Uebersicht({ fallId, aufMenue }: { fallId: string; aufMenue: () => void }) {
  return (
    <div className="flex flex-col gap-[18px] px-[40px] pt-[34px] pb-[30px]">
      <Schrittband onAlle={() => navigate('/app/fall/' + fallId + '/schritte')} />

      <div className="flex shrink-0 flex-col self-stretch rounded-lg border p-[18px] [background-color:var(--color-surface)] [border-color:var(--color-border)]">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col gap-[3px]">
            <div className="[font-family:var(--font-display)] text-[18px] font-semibold leading-[23px] tracking-tight [color:var(--color-fg)]">
              Nächsten Aktionen
            </div>
            <div className="text-[12.5px] leading-md [color:var(--color-fg-muted)]">Öffnen sie direkt die wichtigsten Funktionen mit einem Klick.</div>
          </div>
          <button
            onClick={aufMenue}
            className="flex h-lg w-[28px] shrink-0 items-center justify-center gap-[3px] rounded-sm transition-colors [background-color:var(--color-surface-sunken)] hover:[background-color:var(--color-border)]"
          >
            {[0, 1, 2].map((i) => (
              <div key={i} className="size-[3px] shrink-0 rounded-full [background-color:var(--color-fg-muted)]" />
            ))}
          </button>
        </div>
        <div className="h-[14px] shrink-0" />
        <div className="flex w-full gap-sm">
          {KACHELN.map((k, i) => (
            <motion.button
              key={k.titel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: EASE }}
              whileHover={{ y: -3, boxShadow: '0 10px 24px rgba(18,22,27,0.08)' }}
              onClick={() => (k.ziel === 'fragen' ? navigate('/app/fragen') : k.ziel === 'foerderung' ? navigate('/app/foerderung') : navigate('/app/fall/' + fallId + '/' + k.ziel))}
              className="flex h-[112px] min-w-0 grow basis-0 flex-col rounded-md border px-[13px] pt-[13px] pb-[14px] text-left"
              style={{ borderColor: k.rand, backgroundImage: k.verlauf }}
            >
              <div className="flex size-xl shrink-0 items-center justify-center rounded-sm border [background-color:var(--color-surface)]" style={{ borderColor: k.innen }}>
                {k.icon}
              </div>
              <div className="grow basis-0" />
              <div className="text-[14px] font-bold leading-[18px] tracking-[-0.005em] [color:var(--color-fg)]">{k.titel}</div>
              <div className="h-[3px] shrink-0" />
              <div className="text-xs leading-[15px] [color:var(--color-fg-muted)]">{k.zahl}</div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex flex-col overflow-clip rounded-lg border shadow-[#12161B0D_0px_1px_2px] [background-color:var(--color-surface)] [border-color:var(--color-border)]">
        <div className="flex items-center gap-sm px-[18px] pt-sm pb-xs">
          <div className="flex grow basis-0 flex-col gap-[3px]">
            <div className="[font-family:var(--font-display)] text-md font-semibold leading-[22px] tracking-tight [color:var(--color-fg)]">
              Zusammenfassung
            </div>
          </div>
        </div>
        <div className="flex flex-col px-[18px] pt-3xs pb-[10px]">
          {ZUSAMMENFASSUNG.map(([k, v]) => (
            <div key={k} className="flex items-start gap-[14px] border-t py-2xs [border-color:var(--color-border-subtle)]">
              <div className="w-[86px] shrink-0 [font-family:var(--font-mono)] text-[10px] leading-[19px] tracking-caps [color:var(--color-fg-subtle)]">{k}</div>
              <div className="grow basis-0 text-[13.5px] leading-[19px] [color:var(--color-fg)]">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Fristen ───────────────────────────────────────────────────────────── */

const FRISTEN = [
  { titel: 'Unterlagen vollständig', datum: 'Fr 15. August', rest: 'in 5 Tagen', wer: 'Kundschaft', warn: true, was: 'Heizkostenabrechnung 2024 und Vollmacht von Jens Reuter fehlen noch.' },
  { titel: 'Vor-Ort-Termin', datum: 'Di 19. August, 10:00', rest: 'in 9 Tagen', wer: 'Gemeinsam', warn: false, was: 'Rund zwei Stunden. Zugang zu Keller und Dachboden nötig.' },
]

function Fristen() {
  return (
    <div className="flex flex-col gap-sm px-[40px] pt-[34px] pb-[30px]">
      <div className="flex items-center gap-[14px] pb-xs">
        <Label>ZWEI FRISTEN IM FALL</Label>
        <div className="h-px grow [background-color:var(--color-border)]" />
      </div>
      {FRISTEN.map((f, i) => (
        <motion.div
          key={f.titel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
          className="flex items-start gap-md rounded-lg border p-[18px] [background-color:var(--color-surface)] [border-color:var(--color-border)]"
        >
          <div
            className="mt-[2px] flex size-[34px] shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: f.warn ? 'var(--color-feedback-error-surface)' : 'var(--color-surface-sunken)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="6" fill="none" stroke={f.warn ? 'var(--color-feedback-error)' : 'var(--color-fg-muted)'} strokeWidth="1.4" />
              <path d="M8 4.6V8l2.4 1.6" fill="none" stroke={f.warn ? 'var(--color-feedback-error)' : 'var(--color-fg-muted)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex grow flex-col gap-[5px]">
            <div className="text-[16px] font-medium leading-[20px] [color:var(--color-fg)]">{f.titel}</div>
            <div className="text-[14px] leading-[22px] [color:var(--color-fg-muted)]">{f.was}</div>
          </div>
          <div className="flex w-[180px] shrink-0 flex-col items-end gap-[5px]">
            <div className="text-[14px] font-medium leading-[18px]" style={{ color: f.warn ? 'var(--color-feedback-error)' : 'var(--color-fg)' }}>
              {f.datum}
            </div>
            <Label>{f.rest.toUpperCase()} · {f.wer.toUpperCase()}</Label>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ── Kommunikation ─────────────────────────────────────────────────────── */

function Kommunikation({ fallId, art, entwurfId }: { fallId: string; art: 'kundschaft' | 'handwerk' | 'behoerde'; entwurfId?: string }) {
  const entwurf = entwurfId ? ENTWUERFE[entwurfId] : undefined
  const eintraege = KOMM_JE_FALL[fallId]?.[art] ?? KOMM_JE_FALL.reuter[art]
  const gesamt = { kundschaft: 21, handwerk: 8, behoerde: 5 }[art]

  return (
    <div className="flex flex-col px-[40px] pt-[34px] pb-[30px]">
      {entwurf && <Nachrichtenentwurf entwurf={entwurf} onFertig={() => navigate('/app/fall/' + fallId + '/' + art)} />}

      <div className="flex items-center gap-[14px] pb-md">
        <Label>{art === 'kundschaft' ? 'MIT DER KUNDSCHAFT' : art === 'handwerk' ? 'MIT DEM HANDWERK' : 'MIT DER BEHÖRDE'}</Label>
        <div className="h-px grow [background-color:var(--color-border)]" />
        <Label>{eintraege.length} VON {gesamt}</Label>
      </div>
      {eintraege.length === 0 ? (
        <div className="py-[30px] text-[15px] [color:var(--color-fg-muted)]">Hier liegt noch nichts. Der erste Kontakt steht als Aufgabe im Fall.</div>
      ) : (
        <div className="flex flex-col gap-sm">
          {eintraege.map((e, i) => (
            <motion.div
              key={e.zeit + e.von}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: EASE }}
              className="flex gap-sm"
              style={{ flexDirection: e.eigen ? 'row-reverse' : 'row' }}
            >
              <div
                className="max-w-[600px] rounded-lg border px-md py-sm"
                style={{
                  backgroundColor: e.eigen ? 'var(--color-brand-surface)' : 'var(--color-surface)',
                  borderColor: e.eigen ? 'var(--color-brand-border)' : 'var(--color-border)',
                }}
              >
                <div className="flex items-baseline justify-between gap-lg pb-[5px]">
                  <div className="text-sm font-semibold [color:var(--color-fg)]">{e.von}</div>
                  <Label>{e.zeit.toUpperCase()}</Label>
                </div>
                <div className="text-[14px] leading-[22px] [color:var(--color-fg-muted)]">{e.text}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Bildschirm ────────────────────────────────────────────────────────── */

export default function Fall({ fallId, tab }: { fallId: string; tab: string }) {
  const { toast, setMenueOffen, anfrage } = useDemo()

  const fall = FAELLE.find((f) => f.id === fallId)
  const name = fallId === 'sander' ? anfrage.name : (fall?.kundschaft ?? 'Familie Reuter')
  const ort = fallId === 'sander' ? anfrage.ort.replace(/^\d+\s/, '') : (fall?.ort ?? 'Peine')
  const adresse = fallId === 'reuter' ? 'Buchenweg 14, Peine' : name + ', ' + ort
  const foerderweg = fallId === 'sander' ? 'Noch offen' : (fall?.foerderweg || 'Noch offen')

  const reiter = tab.split('/')[0]
  const unterpfad = tab.split('/')[1]

  const aktionen = [
    { icon: <IconUpload />, label: 'Unterlagen hochladen', onClick: () => navigate('/app/fall/' + fallId + '/unterlagen') },
    { icon: <IconPencil />, label: 'Notiz schreiben', onClick: () => toast({ title: 'Notiz angelegt', body: 'Liegt im Verlauf des Falls.' }) },
    { icon: <IconDoc />, label: 'Protokoll anlegen', onClick: () => toast({ title: 'Gesprächsprotokoll angelegt', body: 'ENSERA hat die letzten Notizen vorgeschlagen.' }) },
    { icon: <IconMail />, label: 'E-Mail entwerfen', onClick: () => navigate('/mail/erinnerung') },
    { icon: <IconGrid />, label: 'Alle Aktionen', shortcut: '⌘P', divider: true, onClick: () => setMenueOffen(true) },
  ]

  return (
    <AppShell quickActions={aktionen}>
      <div className="scrollbar-slim relative flex-1 overflow-y-auto [background-color:var(--color-surface-sunken)]">
        {/* Fallkopf */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-xl px-[40px] pt-[34px] pb-[14px] backdrop-blur-md [background-color:color-mix(in_oklab,var(--color-surface-sunken)_86%,transparent)]">
          <div className="flex flex-col gap-[9px]">
            <Label>KUNDSCHAFT · {name.toUpperCase()}</Label>
            <div className="[font-family:var(--font-display)] text-[26px] font-semibold leading-[36px] tracking-tight [color:var(--color-fg)]">
              {adresse}
            </div>
            {tab !== '' && <Label>{foerderweg + ' · ' + (ZAEHLER_JE_FALL[fallId] ?? ZAEHLER_JE_FALL.reuter).seit}</Label>}
          </div>
        </div>
        <div className="mx-[40px] h-px [background-color:var(--color-border)]" />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: EASE }}
          >
            {tab === '' && <Uebersicht fallId={fallId} aufMenue={() => setMenueOffen(true)} />}
            {tab === 'schritte' && <FallSchritte />}
            {tab === 'fristen' && <Fristen />}
            {tab.startsWith('unterlagen') && (
              <FallUnterlagen fallId={fallId} fehlend={tab.endsWith('fehlend')} ordner={tab === 'unterlagen/ordner' ? 'gebaeude' : null} />
            )}
            {tab.startsWith('verlauf') && <FallVerlauf art={tab.split('/')[1] ?? 'alles'} />}
            {['kundschaft', 'handwerk', 'behoerde'].includes(reiter) && (
              <Kommunikation fallId={fallId} art={reiter as 'kundschaft' | 'handwerk' | 'behoerde'} entwurfId={unterpfad} />
            )}
            {tab === 'aktionen' && <Uebersicht fallId={fallId} aufMenue={() => setMenueOffen(true)} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <FallRail fallId={fallId} />
    </AppShell>
  )
}
