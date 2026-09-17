import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import AppShell from '../../components/AppShell'
import { EASE, Label } from '../../components/ui'
import { IconChat, IconGrid, IconPencil, IconSend, IconShield } from '../../components/icons'
import { navigate } from '../../lib/router'
import { useDemo } from '../../lib/store'

interface Frage {
  id: string
  von: string
  fall: string
  frage: string
  hinweis: string
  zeit: string
  art: 'entwurf' | 'gesperrt' | 'selbst'
}

const OFFEN: Frage[] = [
  {
    id: 'q1',
    von: 'Familie Reuter',
    fall: 'BUCHENWEG 14 · BAFA EBW',
    frage: '„Können wir die Fenster schon im Herbst tauschen lassen?“',
    hinweis: 'FÖRDERUNG IN GEFAHR · ENTWURF LIEGT ZUR FREIGABE BEREIT',
    zeit: 'SEIT 3 STD',
    art: 'entwurf',
  },
  {
    id: 'q2',
    von: 'Silke Petersen',
    fall: 'HAUPTSTRASSE 41 · KFW 458',
    frage: '„Muss ich den Zuschuss in der Steuererklärung angeben?“',
    hinweis: 'KEINE STEUERAUSKUNFT · ENSERA DARF DAS NICHT BEANTWORTEN',
    zeit: 'SEIT GESTERN',
    art: 'gesperrt',
  },
  {
    id: 'q3',
    von: 'Anja Kowalski',
    fall: 'AM WALL 27 · BAFA EBW',
    frage: '„Was passiert, wenn wir das Haus vorher verkaufen?“',
    hinweis: 'NICHT IM REGELWERK · KEIN ENTWURF — SIE SCHREIBEN SELBST',
    zeit: 'SEIT 2 TAGEN',
    art: 'selbst',
  },
]

const BEANTWORTET = [
  { von: 'Familie Reuter', frage: '„Wann kommt Frau Held zum Termin?“', wie: 'AUTOMATISCH BEANTWORTET', zeit: 'GESTERN · 19:41' },
  { von: 'Familie Reuter', frage: '„Lohnt sich bei uns eine Wärmepumpe überhaupt?“', wie: 'ENTWURF VON IHNEN FREIGEGEBEN', zeit: '05.08. · 09:02' },
  { von: 'Hans-Jürgen Brendel', frage: '„Warum braucht die BAFA noch eine Bestätigung von mir?“', wie: 'ENTWURF VON IHNEN BEARBEITET', zeit: '05.08. · 08:14' },
  { von: 'Mert Yildirim', frage: '„Wann kommt das Geld von der KfW?“', wie: 'AUTOMATISCH BEANTWORTET', zeit: '04.08. · 16:30' },
  { von: 'Anja Kowalski', frage: '„Dürfen wir das Dach selbst dämmen?“', wie: 'VON IHNEN SELBST GESCHRIEBEN', zeit: '01.08. · 11:20' },
]

interface Antwort {
  id: string
  kopf: string
  frage: string
  text: string
  quellen: Array<{ titel: string; quelle: string; schild: boolean }>
  fall: Array<[string, string, boolean]>
  bestaetigung: { titel: string; body: string }
}

const ANTWORTEN: Record<string, Antwort> = {
  reuter: {
    id: 'q1',
    kopf: 'FAMILIE REUTER · BUCHENWEG 14 · BAFA EBW · iSFP',
    frage: '„Können wir die Fenster schon im Herbst tauschen lassen?“',
    text: `Guten Tag Frau Reuter,

bitte warten Sie damit noch. Der Förderantrag muss bei der BAFA eingegangen sein, bevor der erste Handwerker anfängt. Wird vorher begonnen, ist die Förderung für die Fenster verloren — auch rückwirkend lässt sich das nicht heilen.

Nach unserem Termin am 19. August stelle ich den Antrag. Sie dürfen aber jetzt schon Angebote einholen und einen Termin reservieren — das gilt noch nicht als Vorhabenbeginn.

Freundliche Grüße
Katrin Held`,
    quellen: [
      { titel: 'Vorhabenbeginn vor Antragstellung', quelle: 'EBW 2.4 · REGELSTAND 2026-01', schild: true },
      { titel: 'Beratungsvertrag Reuter · Terminplan', quelle: 'S. 2 · ABSCHNITT 3', schild: false },
    ],
    fall: [
      ['TERMIN', 'Mi 19.08., 10:00 · Vor-Ort', false],
      ['ANTRAG', 'noch nicht gestellt', true],
      ['KANAL', 'Portal · Antwort geht auch per E-Mail raus', false],
    ],
    bestaetigung: { titel: 'Antwort freigegeben und gesendet', body: 'Familie Reuter bekommt sie im Portal und per E-Mail.' },
  },
  brendel: {
    id: 'q6',
    kopf: 'HANS-JÜRGEN BRENDEL · AM MÜHLENFELD 9 · BAFA BEG EM',
    frage: '„Darf der Förderantrag schon vor dem Angebot gestellt werden?“',
    text: `Guten Tag Herr Brendel,

ja — und in Ihrem Fall ist das sogar der richtige Weg. Für die BAFA genügt zur Antragstellung eine Kostenschätzung; das verbindliche Angebot reichen wir später mit dem Verwendungsnachweis nach.

Wichtig ist nur die Reihenfolge: erst der Antrag, dann der Auftrag an den Handwerker. Einen Auftrag dürfen Sie bereits vergeben, wenn er eine Bedingung enthält, die ihn bei einer Ablehnung der Förderung unwirksam macht. So einen Satz formuliere ich Ihnen gern.

Ich habe Ihren Antrag fertig vorbereitet und reiche ihn nach Ihrer Freigabe ein.

Freundliche Grüße
Katrin Held`,
    quellen: [
      { titel: 'Antragstellung vor Auftragsvergabe', quelle: 'BAFA EBW 2.1 · REGELSTAND 2026-01', schild: true },
      { titel: 'Kostenschätzung Heizungsbau Knop', quelle: 'S. 1 · POSITION 1–4', schild: false },
    ],
    fall: [
      ['SCHRITT', '7 von 10 · Förderantrag', false],
      ['FRIST', 'BAFA-Antwort überfällig seit 5. Aug', true],
      ['KANAL', 'E-Mail · Herr Brendel nutzt das Portal nicht', false],
    ],
    bestaetigung: { titel: 'Antwort freigegeben und gesendet', body: 'Geht per E-Mail raus — Herr Brendel nutzt das Portal nicht.' },
  },
}

export default function Fragen({ ansicht, frageId = 'reuter' }: { ansicht: 'liste' | 'antwort' | 'neu'; frageId?: string }) {
  const { toast } = useDemo()
  const [dialog, setDialog] = useState<'antwort' | 'neu' | null>(ansicht === 'liste' ? null : ansicht)
  const [freigegeben, setFreigegeben] = useState<string[]>([])

  useEffect(() => {
    setDialog(ansicht === 'liste' ? null : ansicht)
  }, [ansicht])

  const aktionen = [
    { icon: <IconChat />, label: 'Frage stellen', shortcut: '⌘N', onClick: () => navigate('/app/fragen/neu') },
    { icon: <IconSend />, label: 'Frage weiterleiten', onClick: () => toast({ title: 'Frage weitergeleitet', body: 'Osterloh GmbH bekommt die Frage mit Fallbezug.' }) },
    { icon: <IconPencil />, label: 'Antwortvorlage anlegen', onClick: () => navigate('/app/einstellungen/vorlagen') },
    { icon: <IconShield />, label: 'Automatik einstellen', onClick: () => navigate('/app/einstellungen') },
    { icon: <IconGrid />, label: 'Alle Aktionen', shortcut: '⌘P', divider: true, onClick: () => navigate('/app/fall/reuter/aktionen') },
  ]

  const offenSichtbar = OFFEN.filter((q) => !freigegeben.includes(q.id))

  return (
    <AppShell quickActions={aktionen}>
      <div className="scrollbar-slim relative flex-1 overflow-y-auto px-[40px] pt-[36px] pb-[40px] [background-color:var(--color-surface)]">
        <div className="flex items-start justify-between">
          <div>
            <Label>FRAGEN AUS PORTAL UND E-MAIL</Label>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="[font-family:var(--font-display)] text-[30px] font-semibold leading-[42px] tracking-tight [color:var(--color-fg)]"
            >
              {ansicht === 'antwort' ? 'Drei Antworten warten auf Sie.' : 'Fragen'}
            </motion.div>
          </div>
          <Label>{offenSichtbar.length} OFFEN · {BEANTWORTET.length + freigegeben.length} BEANTWORTET</Label>
        </div>

        <div className="pt-[26px] pb-xs"><Label>OFFEN</Label></div>
        <AnimatePresence initial={false}>
          {offenSichtbar.map((q) => (
            <motion.button
              key={q.id}
              layout
              exit={{ opacity: 0, x: 30, height: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={() => navigate(q.art === 'entwurf' ? '/app/fragen/antwort' : '/app/fragen/neu')}
              className="flex w-full items-center gap-lg border-b px-lg py-[18px] text-left transition-colors [border-color:var(--color-border-subtle)]"
              style={{ backgroundColor: q.art === 'entwurf' ? 'var(--color-brand-surface)' : undefined }}
            >
              <div className="flex w-[18px] shrink-0 justify-center">
                {q.art === 'entwurf' ? (
                  <svg width="15" height="15" viewBox="0 0 16 16">
                    <path d="M8 1.8l4.8 1.7v4c0 3-2 5.4-4.8 6.7C5.2 12.9 3.2 10.5 3.2 7.5v-4z" fill="none" stroke="var(--color-feedback-error)" strokeWidth="1.3" strokeLinejoin="round" />
                    <path d="M8 5.8v2.6M8 10.6v.1" fill="none" stroke="var(--color-feedback-error)" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 16 16">
                    <path d="M14 8.6c0 2.8-2.7 5-6 5-.7 0-1.4-.1-2-.3L2.2 14.2l1-2.6C2.4 10.8 2 9.7 2 8.6c0-2.8 2.7-5 6-5s6 2.2 6 5z" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className="flex w-[250px] shrink-0 flex-col gap-[5px]">
                <div className="text-[16px] font-medium leading-[20px] [color:var(--color-fg)]">{q.von}</div>
                <Label>{q.fall}</Label>
              </div>
              <div className="flex grow basis-0 flex-col gap-[6px]">
                <div className="text-[17px] leading-[22px] [color:var(--color-fg)]">{q.frage}</div>
                <Label tone={q.art === 'entwurf' ? 'error' : 'subtle'}>{q.hinweis}</Label>
              </div>
              <div className="w-[110px] shrink-0 text-right"><Label>{q.zeit}</Label></div>
              <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
                <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          ))}
        </AnimatePresence>

        <div className="pt-[40px] pb-xs"><Label>BEANTWORTET</Label></div>
        {[...freigegeben.map((id) => {
          const q = OFFEN.find((x) => x.id === id)!
          return { von: q.von, frage: q.frage, wie: 'ENTWURF VON IHNEN FREIGEGEBEN', zeit: 'GERADE EBEN' }
        }), ...BEANTWORTET].map((b) => (
          <motion.div
            key={b.frage}
            layout
            className="flex items-center gap-lg border-b px-lg py-[14px] [border-color:var(--color-border-subtle)]"
          >
            <div className="flex w-[18px] shrink-0 justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="w-[250px] shrink-0 text-[14px] leading-[18px] [color:var(--color-fg-muted)]">{b.von}</div>
            <div className="grow basis-0 text-[15px] leading-[20px] [color:var(--color-fg-muted)]">{b.frage}</div>
            <div className="w-[260px] shrink-0"><Label>{b.wie}</Label></div>
            <div className="w-[130px] shrink-0 text-right"><Label>{b.zeit}</Label></div>
            <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
              <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        ))}

        <AnimatePresence>
          {dialog === 'antwort' && (
            <AntwortDialog
              antwort={ANTWORTEN[frageId] ?? ANTWORTEN.reuter}
              onSchliessen={() => navigate('/app/fragen')}
              onFreigeben={() => {
                const a = ANTWORTEN[frageId] ?? ANTWORTEN.reuter
                setFreigegeben((f) => [...f, a.id])
                toast({ title: a.bestaetigung.titel, body: a.bestaetigung.body, tone: 'success' })
                navigate('/app/fragen')
              }}
            />
          )}
          {dialog === 'neu' && (
            <NeueFrageDialog
              onSchliessen={() => navigate('/app/fragen')}
              onSenden={() => {
                toast({ title: 'Frage an Familie Reuter gesendet', body: 'ENSERA hakt nach drei Tagen automatisch nach.', tone: 'success' })
                navigate('/app/fragen')
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  )
}

/* ── Dialoge ───────────────────────────────────────────────────────────── */

function Rahmen({ children, onSchliessen }: { children: React.ReactNode; onSchliessen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onSchliessen}
      className="fixed inset-0 z-40 flex items-start justify-center bg-[rgba(244,246,248,0.78)] pt-[90px] backdrop-blur-[3px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="flex w-[1038px] flex-col overflow-hidden rounded-xl border shadow-[0_28px_70px_rgba(18,22,27,0.18)] [background-color:var(--color-surface)] [border-color:var(--color-border)]"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

function SchliessKnopf({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex size-xl shrink-0 items-center justify-center rounded-md border transition-colors [border-color:var(--color-border)] hover:[background-color:var(--color-surface-sunken)]"
      aria-label="Schließen"
    >
      <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M3.4 3.4l7.2 7.2M10.6 3.4l-7.2 7.2" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </button>
  )
}

function AntwortDialog({ antwort, onSchliessen, onFreigeben }: { antwort: Antwort; onSchliessen: () => void; onFreigeben: () => void }) {
  const [text, setText] = useState(antwort.text)
  const [bearbeiten, setBearbeiten] = useState(false)

  useEffect(() => {
    setText(antwort.text)
    setBearbeiten(false)
  }, [antwort])

  return (
    <Rahmen onSchliessen={onSchliessen}>
      <div className="flex items-start justify-between gap-lg px-[36px] pt-[30px] pb-lg">
        <div className="flex flex-col gap-sm">
          <Label>{antwort.kopf}</Label>
          <div className="[font-family:var(--font-display)] text-[26px] font-semibold leading-[34px] tracking-tight [color:var(--color-fg)]">
            {antwort.frage}
          </div>
        </div>
        <SchliessKnopf onClick={onSchliessen} />
      </div>

      <div className="flex border-t [border-color:var(--color-border)]">
        <div className="flex grow basis-0 flex-col gap-md border-r px-[36px] py-[26px] [border-color:var(--color-border)]">
          <Label>ENTWURF VON ENSERA</Label>
          {bearbeiten ? (
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="scrollbar-slim h-[300px] w-full resize-none rounded-md border p-md text-[16px] leading-[26px] outline-none [border-color:var(--color-brand-border)] [color:var(--color-fg)] focus:[border-color:var(--color-brand)]"
            />
          ) : (
            <div className="whitespace-pre-wrap text-[16px] leading-[26px] [color:var(--color-fg)]">{text}</div>
          )}
        </div>
        <div className="flex w-[344px] shrink-0 flex-col gap-md px-[30px] py-[26px]">
          <Label>DER ENTWURF BASIERT AUF</Label>
          {antwort.quellen.map((b) => (
            <div key={b.titel} className="flex items-start gap-[10px] border-b pb-sm [border-color:var(--color-border-subtle)]">
              <svg width="14" height="14" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 3 }}>
                {b.schild ? (
                  <path d="M8 1.8l4.8 1.7v4c0 3-2 5.4-4.8 6.7C5.2 12.9 3.2 10.5 3.2 7.5v-4z" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinejoin="round" />
                ) : (
                  <path d="M4 2h5l3 3v9H4z" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.3" strokeLinejoin="round" />
                )}
              </svg>
              <div className="flex flex-col gap-[3px]">
                <div className="text-[14px] leading-[18px] [color:var(--color-fg)]">{b.titel}</div>
                <Label>{b.quelle}</Label>
              </div>
            </div>
          ))}
          <div className="pt-xs"><Label>AUS DEM FALL</Label></div>
          {antwort.fall.map(([k, v, warn]) => (
            <div key={k as string} className="flex items-start gap-md">
              <div className="w-[76px] shrink-0"><Label>{k as string}</Label></div>
              <div className="grow text-[14px] leading-[19px]" style={{ color: warn ? 'var(--color-feedback-error)' : 'var(--color-fg)' }}>
                {v as string}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-sm border-t px-[36px] py-lg [border-color:var(--color-border)]">
        <button
          onClick={onFreigeben}
          className="flex h-[42px] items-center rounded-md px-[20px] text-base font-semibold transition-colors [background-color:var(--color-brand)] [color:var(--color-brand-fg)] hover:[background-color:var(--color-brand-hover)]"
        >
          Freigeben und senden
        </button>
        <button
          onClick={() => setBearbeiten(!bearbeiten)}
          className="flex h-[42px] items-center rounded-md border px-[20px] text-base font-medium transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]"
        >
          {bearbeiten ? 'Fertig' : 'Bearbeiten'}
        </button>
        <button onClick={onSchliessen} className="px-[10px] text-base [color:var(--color-fg-subtle)] hover:[color:var(--color-fg-muted)]">
          Selbst schreiben
        </button>
      </div>
    </Rahmen>
  )
}

function NeueFrageDialog({ onSchliessen, onSenden }: { onSchliessen: () => void; onSenden: () => void }) {
  const [empfaenger, setEmpfaenger] = useState('reuter')
  const [text, setText] = useState(
    'Guten Tag Frau Reuter,\n\nfür den Sanierungsfahrplan fehlt mir noch Ihr Energieverbrauch aus 2024. Könnten Sie mir die Jahresabrechnung Ihres Gasversorgers schicken — oder mir einfach den Zählerstand vom 31.12.2024 durchgeben?\n\nWenn die Abrechnung noch nicht vorliegt, genügen mir vorerst die Abschlagszahlungen.\n\nFreundliche Grüße\nKatrin Held',
  )

  const EMPFAENGER = [
    { id: 'reuter', kuerzel: 'FR', name: 'Familie Reuter', rolle: 'KUNDSCHAFT · PORTAL + E-MAIL' },
    { id: 'yildirim', kuerzel: 'MY', name: 'Mert Yildirim', rolle: 'HANDWERK · HEIZUNG YILDIRIM' },
    { id: 'bafa', kuerzel: '', name: 'BAFA · Sachbearbeitung', rolle: 'BEHÖRDE · VORGANG 4471-2026' },
  ]

  return (
    <Rahmen onSchliessen={onSchliessen}>
      <div className="flex items-start justify-between gap-lg px-[36px] pt-[30px] pb-lg">
        <div className="flex flex-col gap-sm">
          <Label>NEUE FRAGE · BUCHENWEG 14 · BAFA EBW · iSFP</Label>
          <div className="[font-family:var(--font-display)] text-[26px] font-semibold leading-[34px] tracking-tight [color:var(--color-fg)]">
            Frage an {EMPFAENGER.find((e) => e.id === empfaenger)!.name}
          </div>
        </div>
        <SchliessKnopf onClick={onSchliessen} />
      </div>

      <div className="flex border-t [border-color:var(--color-border)]">
        <div className="flex grow basis-0 flex-col gap-md border-r px-[36px] py-[26px] [border-color:var(--color-border)]">
          <div className="flex items-center justify-between">
            <Label>IHRE FRAGE</Label>
            <div
              className="flex h-lg items-center gap-[6px] rounded-full px-[10px] text-xs font-medium"
              style={{ backgroundColor: 'var(--color-accent-teal-wash)', color: 'var(--color-accent-teal-ink)' }}
            >
              <svg width="11" height="11" viewBox="0 0 14 14">
                <path d="M7 1.4l1.25 3.35L11.6 6 8.25 7.25 7 10.6 5.75 7.25 2.4 6l3.35-1.25z" fill="currentColor" />
              </svg>
              VON ENSERA VORGESCHLAGEN
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="scrollbar-slim h-[210px] w-full resize-none rounded-md text-[16px] leading-[26px] outline-none [color:var(--color-fg)]"
          />
          <div className="rounded-lg border p-md [background-color:var(--color-surface-sunken)] [border-color:var(--color-border)]">
            <div className="flex items-center gap-xs pb-xs">
              <svg width="13" height="13" viewBox="0 0 14 14">
                <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke="var(--color-accent-green-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <Label tone="muted">ENSERA HAT DAZU SCHON EINE ANTWORT</Label>
            </div>
            <div className="text-[14px] leading-[22px] [color:var(--color-fg-muted)]">
              In der Abschlagsübersicht vom 14.07. steht ein Jahresverbrauch von 18.400 kWh Gas für 2024. Für den iSFP reicht das — die
              Jahresabrechnung brauchen Sie nur, wenn Sie den Wert belegen müssen.
            </div>
            <div className="flex items-center gap-sm pt-sm">
              <Label>QUELLE · ABSCHLAGSÜBERSICHT REUTER · S. 1</Label>
              <div className="h-[12px] w-px [background-color:var(--color-border-strong)]" />
              <button onClick={onSchliessen} className="text-sm font-medium [color:var(--color-brand)] hover:underline">
                Antwort übernehmen statt fragen
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-[344px] shrink-0 flex-col gap-sm px-[30px] py-[26px]">
          <Label>AN WEN GEHT DIE FRAGE</Label>
          {EMPFAENGER.map((e) => {
            const an = empfaenger === e.id
            return (
              <button
                key={e.id}
                onClick={() => setEmpfaenger(e.id)}
                className="flex items-center gap-sm rounded-lg border p-sm text-left transition-all"
                style={{
                  borderColor: an ? 'var(--color-fg)' : 'var(--color-border)',
                  borderWidth: an ? 1.5 : 1,
                  backgroundColor: an ? 'var(--color-surface)' : 'transparent',
                }}
              >
                <div
                  className="flex size-xl shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: e.kuerzel ? 'var(--color-accent-teal-wash)' : 'var(--color-surface-sunken)' }}
                >
                  {e.kuerzel ? (
                    <span className="[font-family:var(--font-mono)] text-[11px] font-semibold" style={{ color: 'var(--color-accent-teal-ink)' }}>{e.kuerzel}</span>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 16 16">
                      <path d="M2.4 13.6h11.2M3.6 13.6V7.2M6.4 13.6V7.2M9.6 13.6V7.2M12.4 13.6V7.2M2 7.2 8 3.2l6 4z" fill="none" stroke="var(--color-fg-muted)" strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className="flex grow flex-col gap-[2px]">
                  <div className="text-[14px] font-medium leading-[18px] [color:var(--color-fg)]">{e.name}</div>
                  <Label>{e.rolle}</Label>
                </div>
                <div
                  className="flex size-md shrink-0 items-center justify-center rounded-full border"
                  style={{ backgroundColor: an ? 'var(--color-fg)' : 'transparent', borderColor: an ? 'var(--color-fg)' : 'var(--color-border-strong)' }}
                >
                  {an && (
                    <svg width="9" height="9" viewBox="0 0 14 14">
                      <path d="M2.4 7.2l3 3 6.2-6.6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            )
          })}
          <button className="flex items-center gap-xs pt-2xs text-[14px] [color:var(--color-fg-muted)] hover:[color:var(--color-fg)]">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M7 2.4v9.2M2.4 7h9.2" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Andere Person suchen
          </button>

          <div className="pt-md"><Label>AUS DEM FALL</Label></div>
          {[
            ['SCHRITT', '3 von 10 · Unterlagen', false],
            ['FEHLT', 'Verbrauch 2024 · bis 15. August', true],
            ['KANAL', 'Portal · Frage geht auch per E-Mail raus', false],
            ['ERINNERUNG', 'Ensera hakt nach 3 Tagen nach', false],
          ].map(([k, v, warn]) => (
            <div key={k as string} className="flex items-start gap-md">
              <div className="w-[88px] shrink-0"><Label>{k as string}</Label></div>
              <div className="grow text-[14px] leading-[19px]" style={{ color: warn ? 'var(--color-feedback-error)' : 'var(--color-fg)' }}>
                {v as string}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-sm border-t px-[36px] py-lg [border-color:var(--color-border)]">
        <button
          onClick={onSenden}
          className="flex h-[42px] items-center rounded-md px-[20px] text-base font-semibold transition-colors [background-color:var(--color-brand)] [color:var(--color-brand-fg)] hover:[background-color:var(--color-brand-hover)]"
        >
          Frage senden
        </button>
        <button className="flex h-[42px] items-center rounded-md border px-[20px] text-base font-medium transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]">
          Bearbeiten
        </button>
        <button onClick={onSchliessen} className="px-[10px] text-base [color:var(--color-fg-subtle)] hover:[color:var(--color-fg-muted)]">
          Selbst schreiben
        </button>
        <div className="grow" />
        <Label>DIE ANTWORT LANDET AUTOMATISCH IM FALL</Label>
      </div>
    </Rahmen>
  )
}
