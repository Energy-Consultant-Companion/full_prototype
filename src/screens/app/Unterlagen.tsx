import { useState } from 'react'
import { motion } from 'motion/react'
import AppShell from '../../components/AppShell'
import { EASE, Label } from '../../components/ui'
import { IconDoc, IconGrid, IconMail, IconUpload } from '../../components/icons'
import { navigate } from '../../lib/router'
import { useDemo } from '../../lib/store'

/* ── Eingang ───────────────────────────────────────────────────────────── */

interface Eintrag {
  name: string
  kundschaft: string
  weg: string
  befund: string
  befundWarn?: boolean
  gruppe: 'GEGENPRÜFEN' | 'SELBER PRÜFEN' | 'VALIDIERT'
  aktion?: 'gegen' | 'selber'
  erledigt?: string
  ziel?: string
}

const EINTRAEGE: Eintrag[] = [
  { name: 'Rechnung_Waermepumpe_Reuter.pdf', kundschaft: 'Familie Reuter', weg: 'KFW 458 · VERWENDUNGSNACHWEIS', befund: 'OHNE BEFUND', gruppe: 'GEGENPRÜFEN', aktion: 'gegen', ziel: '/app/unterlagen/gegenpruefen' },
  { name: 'Fachunternehmererklaerung_Kraemer.pdf', kundschaft: 'Eheleute Krämer', weg: 'BAFA EM · FENSTER', befund: 'OHNE BEFUND', gruppe: 'GEGENPRÜFEN', aktion: 'gegen', ziel: '/app/unterlagen/gegenpruefen' },
  { name: 'Grundbuchauszug_Yildirim.pdf', kundschaft: 'Mert Yildirim', weg: 'KFW 458 · ANTRAG', befund: 'OHNE BEFUND', gruppe: 'GEGENPRÜFEN', aktion: 'gegen', ziel: '/app/unterlagen/gegenpruefen' },
  { name: 'iSFP_Sanierungsfahrplan_Bauer.pdf', kundschaft: 'Dr. Ellen Bauer', weg: 'BAFA EM · HEIZUNG', befund: 'OHNE BEFUND', gruppe: 'GEGENPRÜFEN', aktion: 'gegen', ziel: '/app/unterlagen/gegenpruefen' },
  { name: 'Rechnung_Sanitaer_Brenner_2026-08.pdf', kundschaft: 'Mert Yildirim', weg: 'KFW 458 · VERWENDUNGSNACHWEIS', befund: 'LEISTUNGSZEITRAUM FEHLT', befundWarn: true, gruppe: 'SELBER PRÜFEN', aktion: 'selber', ziel: '/app/unterlagen/pruefung' },
  { name: 'Angebot_Fenster_Kraemer.pdf', kundschaft: 'Eheleute Krämer', weg: 'BAFA EM · FENSTER', befund: 'U-WERT 1,3 STATT 0,95', befundWarn: true, gruppe: 'SELBER PRÜFEN', aktion: 'selber', ziel: '/app/unterlagen/pruefung' },
  { name: 'Foerderantrag_KfW458_Yildirim.pdf', kundschaft: 'Mert Yildirim', weg: 'KFW 458 · ANTRAG', befund: '3 FELDER OFFEN', gruppe: 'SELBER PRÜFEN', aktion: 'selber', ziel: '/app/unterlagen/pruefung' },
  { name: 'Foto_Zaehlerstand_Reuter.jpg', kundschaft: 'Familie Reuter', weg: 'KFW 458 · VERWENDUNGSNACHWEIS', befund: 'NICHT LESBAR', gruppe: 'SELBER PRÜFEN', aktion: 'selber', ziel: '/app/unterlagen/pruefung' },
  { name: 'Vollmacht_Kraemer_unterschrieben.pdf', kundschaft: 'Eheleute Krämer', weg: 'BAFA EM · VOLLMACHT', befund: 'UNTERSCHRIFT AUF PAPIER', gruppe: 'SELBER PRÜFEN', aktion: 'selber', ziel: '/app/unterlagen/pruefung' },
  { name: 'Grundriss_EG_Reuter.pdf', kundschaft: 'Familie Reuter', weg: 'KFW 458 · ANTRAG', befund: 'OHNE BEFUND', gruppe: 'VALIDIERT', erledigt: '28.07. · VON IHNEN' },
  { name: 'Rechnung_Elektro_Wendt.pdf', kundschaft: 'Dr. Ellen Bauer', weg: 'BAFA EM · HEIZUNG', befund: 'KORREKTUR ANGEFORDERT', gruppe: 'VALIDIERT', erledigt: '05.08. · WARTET' },
]

const FILTER = [
  { label: 'Alle', n: 24 },
  { label: 'Gegenprüfen', n: 4 },
  { label: 'Selber prüfen', n: 5 },
  { label: 'Ohne Zuordnung', n: 3 },
  { label: 'Validiert', n: 15 },
]

function Eingang() {
  const { toast } = useDemo()
  const [filter, setFilter] = useState('Alle')
  const [fertig, setFertig] = useState<string[]>([])

  const gruppen: Array<Eintrag['gruppe']> = ['GEGENPRÜFEN', 'SELBER PRÜFEN', 'VALIDIERT']
  const sichtbar = EINTRAEGE.filter((e) => {
    if (filter === 'Alle') return true
    if (filter === 'Gegenprüfen') return e.gruppe === 'GEGENPRÜFEN'
    if (filter === 'Selber prüfen') return e.gruppe === 'SELBER PRÜFEN'
    if (filter === 'Validiert') return e.gruppe === 'VALIDIERT'
    return false
  })

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="px-[40px] pt-[36px] [font-family:var(--font-display)] text-[30px] font-semibold leading-[38px] tracking-tight [color:var(--color-fg)]"
      >
        Unterlagen
      </motion.div>

      <div className="flex items-center gap-xs px-[40px] pt-[26px]">
        {FILTER.map((f) => {
          const an = f.label === filter
          return (
            <button
              key={f.label}
              onClick={() => setFilter(f.label)}
              className="flex h-[30px] items-center gap-xs rounded-full border px-sm transition-colors"
              style={{ backgroundColor: an ? 'var(--color-fg)' : 'transparent', borderColor: an ? 'var(--color-fg)' : 'var(--color-border)' }}
            >
              <div className="text-sm leading-md" style={{ color: an ? 'var(--color-fg-inverse)' : 'var(--color-fg-muted)', fontWeight: an ? 500 : 400 }}>
                {f.label}
              </div>
              <div className="[font-family:var(--font-mono)] text-2xs leading-[14px]" style={{ color: an ? '#FFFFFF99' : 'var(--color-fg-subtle)' }}>
                {f.n}
              </div>
            </button>
          )
        })}
      </div>

      <div className="px-[40px] pt-[24px] pb-[40px]">
        <div className="flex items-center gap-lg border-b pb-[10px] [border-color:var(--color-border)]">
          <div className="grow basis-0"><Label>UNTERLAGE</Label></div>
          <div className="w-[180px] shrink-0"><Label>KUNDSCHAFT</Label></div>
          <div className="w-[190px] shrink-0"><Label>FÖRDERWEG</Label></div>
          <div className="w-[210px] shrink-0 text-right"><Label>BEFUND</Label></div>
          <div className="w-[150px] shrink-0 text-right"><Label>AKTION</Label></div>
        </div>

        {gruppen.map((g) => {
          const zeilen = sichtbar.filter((e) => e.gruppe === g)
          if (!zeilen.length) return null
          return (
            <div key={g}>
              <div className="pt-lg pb-xs"><Label>{g}</Label></div>
              {zeilen.map((e, i) => {
                const erledigt = fertig.includes(e.name)
                const aus = e.gruppe === 'VALIDIERT'
                return (
                  <motion.div
                    key={e.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03, ease: EASE }}
                    className="flex items-center gap-lg border-b py-[14px] [border-color:var(--color-border-subtle)]"
                  >
                    <div className="grow basis-0 truncate text-base leading-[20px]" style={{ color: aus ? 'var(--color-fg-subtle)' : 'var(--color-fg)' }}>
                      {e.name}
                    </div>
                    <div className="w-[180px] shrink-0 text-[15px] leading-[19px]" style={{ color: aus ? 'var(--color-fg-subtle)' : 'var(--color-fg)' }}>
                      {e.kundschaft}
                    </div>
                    <div className="w-[190px] shrink-0"><Label>{e.weg}</Label></div>
                    <div className="w-[210px] shrink-0 text-right">
                      <Label tone={e.befundWarn ? 'error' : 'subtle'}>{e.befund}</Label>
                    </div>
                    <div className="flex w-[150px] shrink-0 justify-end">
                      {e.aktion && !erledigt ? (
                        <button
                          onClick={() => (e.ziel ? navigate(e.ziel) : undefined)}
                          className="flex h-[34px] w-[132px] items-center justify-center rounded-md border text-sm font-medium transition-opacity hover:opacity-80"
                          style={
                            e.aktion === 'gegen'
                              ? { backgroundColor: 'var(--color-accent-green-wash)', borderColor: 'var(--color-accent-green-line)', color: 'var(--color-accent-green-ink)' }
                              : { backgroundColor: 'var(--color-accent-pink-wash)', borderColor: 'var(--color-accent-pink-line)', color: 'var(--color-accent-pink-ink)' }
                          }
                        >
                          {e.aktion === 'gegen' ? 'Gegenprüfen' : 'Selber prüfen'}
                        </button>
                      ) : erledigt ? (
                        <Label tone="muted">HEUTE · VON IHNEN</Label>
                      ) : (
                        <Label>{e.erledigt}</Label>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )
        })}
        <button
          onClick={() => {
            setFertig(EINTRAEGE.filter((e) => e.aktion === 'gegen').map((e) => e.name))
            toast({ title: 'Vier Unterlagen gegengezeichnet', body: 'ENSERA hat sie in die jeweiligen Fälle gelegt.', tone: 'success' })
          }}
          className="mt-lg flex h-[34px] items-center rounded-full border px-md text-sm font-medium transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]"
        >
          Alle vier ohne Befund gegenzeichnen
        </button>
      </div>
    </>
  )
}

/* ── Prüfansicht ───────────────────────────────────────────────────────── */

interface Position {
  text: string
  betrag: string
}

interface Wert {
  feld: string
  wert: string
  quelle: string
  fehlt?: boolean
}

function Rechnung({
  firma,
  adresse,
  nummer,
  datum,
  empfaenger,
  empfaengerAdresse,
  positionen,
  gesamt,
  fehler,
  gutZeile,
}: {
  firma: string
  adresse: string
  nummer: string
  datum: string
  empfaenger: string
  empfaengerAdresse: string
  positionen: Position[]
  gesamt: string
  fehler?: { titel: string; text: string }
  gutZeile?: string
}) {
  return (
    <div className="flex grow basis-0 flex-col rounded-lg p-lg [background-color:var(--color-surface-sunken)]">
      <div className="flex flex-col rounded-md border px-lg py-lg shadow-[0_1px_2px_rgba(18,22,27,0.06)] [background-color:var(--color-surface)] [border-color:var(--color-border)]">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-base font-semibold leading-[20px] [color:var(--color-fg)]">{firma}</div>
            <div className="pt-[3px] text-[11px] leading-[15px] [color:var(--color-fg-subtle)]">{adresse}</div>
          </div>
          <div className="text-right">
            <div className="text-xs leading-[16px] [color:var(--color-fg-muted)]">{nummer}</div>
            <div className="text-xs leading-[16px] [color:var(--color-fg-muted)]">{datum}</div>
          </div>
        </div>
        <div className="pt-lg text-[13px] leading-[18px] [color:var(--color-fg)]">{empfaenger}</div>
        <div className="text-[13px] leading-[18px] [color:var(--color-fg-muted)]">{empfaengerAdresse}</div>
        <div className="pt-md text-base font-semibold leading-[22px] [color:var(--color-fg)]">Rechnung — Einbau Luft/Wasser-Wärmepumpe</div>

        {gutZeile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-md flex items-center justify-between rounded-[4px] border px-sm py-[7px]"
            style={{ backgroundColor: 'var(--color-accent-green-wash)', borderColor: 'var(--color-accent-green-line)' }}
          >
            <div className="text-[13px] leading-[17px] [color:var(--color-fg)]">{gutZeile}</div>
            <Label tone="muted">VON ENSERA GELESEN</Label>
          </motion.div>
        )}

        <div className="flex items-baseline justify-between pt-md pb-xs">
          <Label>POSITION</Label>
          <Label>BETRAG</Label>
        </div>
        {positionen.map((p) => (
          <div key={p.text} className="flex items-baseline justify-between gap-lg border-t py-[9px] [border-color:var(--color-border-subtle)]">
            <div className="text-[13px] leading-[17px] [color:var(--color-fg-muted)]">{p.text}</div>
            <div className="shrink-0 text-[13px] leading-[17px] [color:var(--color-fg-muted)]">{p.betrag}</div>
          </div>
        ))}
        <div className="flex items-baseline justify-between border-t py-[9px] [border-color:var(--color-border)]">
          <div className="text-[13px] font-semibold leading-[17px] [color:var(--color-fg)]">Gesamt brutto</div>
          <div className="text-[13px] font-semibold leading-[17px] [color:var(--color-fg)]">{gesamt}</div>
        </div>

        {fehler && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-md rounded-[4px] border px-sm py-[10px]"
            style={{ backgroundColor: 'var(--color-feedback-error-surface)', borderColor: 'var(--color-feedback-error-border)' }}
          >
            <Label tone="error">{fehler.titel}</Label>
            <div className="pt-[3px] text-[13px] leading-[18px]" style={{ color: 'var(--color-feedback-error)' }}>{fehler.text}</div>
          </motion.div>
        )}

        <div className="pt-lg text-[11px] leading-[16px] [color:var(--color-fg-subtle)]">
          Zahlbar innerhalb von 14 Tagen ohne Abzug. Vielen Dank für Ihren Auftrag.
          <br />
          Sparkasse Hildesheim Goslar Peine · DE29 2595 0130 0004 4711 08
        </div>
      </div>
    </div>
  )
}

function Werte({ werte, kopfRechts }: { werte: Wert[]; kopfRechts: string }) {
  return (
    <>
      <div className="flex items-baseline justify-between pb-xs">
        <Label>WAS ENSERA GELESEN HAT</Label>
        <Label>{kopfRechts}</Label>
      </div>
      {werte.map((w, i) => (
        <motion.div
          key={w.feld}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.05 * i, ease: EASE }}
          className="flex items-baseline gap-md border-t py-[9px] [border-color:var(--color-border-subtle)]"
        >
          <div className="w-[156px] shrink-0 text-[14px] leading-[18px] [color:var(--color-fg-muted)]">{w.feld}</div>
          <div
            className="grow basis-0 text-[15px] leading-[20px]"
            style={{ color: w.fehlt ? 'var(--color-feedback-error)' : 'var(--color-fg)' }}
          >
            {w.wert}
          </div>
          <div className="shrink-0"><Label tone={w.fehlt ? 'error' : 'subtle'}>{w.quelle}</Label></div>
        </motion.div>
      ))}
    </>
  )
}

function Pruefung() {
  const { toast } = useDemo()
  return (
    <div className="px-[40px] pt-[30px] pb-[30px]">
      <div className="flex items-start justify-between gap-lg">
        <div>
          <Label>UNTERLAGEN · MERT YILDIRIM · KFW 458 · VERWENDUNGSNACHWEIS</Label>
          <div className="pt-[6px] [font-family:var(--font-display)] text-[30px] font-semibold leading-[38px] tracking-tight [color:var(--color-fg)]">
            Rechnung Sanitär Brenner, 4.812,00 €
          </div>
          <div className="pt-[8px]"><Label>PER MAIL AM 07.08. · ENSERA HAT 14 WERTE GELESEN · 2 BEFUNDE</Label></div>
        </div>
        <div
          className="flex h-xl shrink-0 items-center rounded-full px-md text-[11px] font-medium tracking-caps"
          style={{ backgroundColor: 'var(--color-feedback-error-surface)', color: 'var(--color-feedback-error)' }}
        >
          BLOCKIERT DEN VERWENDUNGSNACHWEIS
        </div>
      </div>

      <div className="flex gap-xl pt-lg">
        <Rechnung
          firma="Sanitär Brenner GmbH"
          adresse="Industriestraße 4 · 31224 Peine · USt-IdNr. DE 812 447 013"
          nummer="Nr. 2026-0814"
          datum="07.08.2026"
          empfaenger="Mert Yildirim"
          empfaengerAdresse="Hauptstraße 41, 31224 Peine"
          positionen={[
            { text: 'Wärmepumpe Vaillant aroTHERM plus VWL 75/6 A', betrag: '2.940,00' },
            { text: 'Hydraulischer Abgleich Verfahren B', betrag: '410,00' },
            { text: 'Montage, Inbetriebnahme, Entsorgung Altanlage', betrag: '694,29' },
          ]}
          gesamt="4.812,00"
          fehler={{ titel: 'HIER FEHLT DER LEISTUNGSZEITRAUM', text: 'Die Rechnung nennt kein Datum und keinen Zeitraum der Leistung.' }}
        />

        <div className="flex w-[536px] shrink-0 flex-col">
          <Werte
            kopfRechts="14 WERTE · 1 FEHLT"
            werte={[
              { feld: 'Rechnungsnummer', wert: '2026-0814', quelle: 'SEITE 1' },
              { feld: 'Rechnungsdatum', wert: '07.08.2026', quelle: 'SEITE 1' },
              { feld: 'Leistungszeitraum', wert: 'nicht gefunden', quelle: 'PFLICHTANGABE', fehlt: true },
              { feld: 'Betrag brutto', wert: '4.812,00 €', quelle: 'SEITE 1' },
              { feld: 'Anlage', wert: 'Vaillant aroTHERM plus VWL 75/6 A', quelle: 'BAFA-LISTE 08/26' },
              { feld: 'Hydraulischer Abgleich', wert: 'Verfahren B', quelle: 'SEITE 1' },
            ]}
          />

          <div className="flex items-baseline justify-between pt-lg pb-xs">
            <Label>BEFUNDE</Label>
            <Label>GEPRÜFT GEGEN BEG EM · STAND 2026-01</Label>
          </div>

          {[
            {
              schwere: 'BLOCKIEREND',
              regel: 'BEG EM · ANLAGE 1 · NR. 4',
              titel: 'Der Leistungszeitraum fehlt',
              text: 'Ohne Datum oder Zeitraum der Leistung erkennt die BAFA die Rechnung nicht als Nachweis an. Der Verwendungsnachweis kann so nicht eingereicht werden.',
              vorschlag: 'Korrektur beim Handwerksbetrieb anfordern — Entwurf liegt bereit',
              farbe: 'var(--color-feedback-error)',
            },
            {
              schwere: 'INKONSISTENT',
              regel: 'BEG EM · NR. 7.3',
              titel: 'Abgleich genannt, Protokoll fehlt',
              text: 'Die Position nennt Verfahren B, das Protokoll liegt dem Fall nicht bei. Ohne Protokoll kann die BAFA sie streichen.',
              vorschlag: 'Protokoll gleich mit anfordern',
              farbe: 'var(--color-fg)',
            },
          ].map((b, i) => (
            <motion.div
              key={b.titel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.1, ease: EASE }}
              className="mb-md border-l-2 pl-md"
              style={{ borderColor: b.farbe }}
            >
              <div className="flex items-baseline justify-between">
                <div className="[font-family:var(--font-mono)] text-[10px] font-medium leading-sm tracking-caps" style={{ color: b.farbe }}>
                  {b.schwere}
                </div>
                <Label>{b.regel}</Label>
              </div>
              <div className="pt-[6px] text-md font-semibold leading-[22px] [color:var(--color-fg)]">{b.titel}</div>
              <div className="pt-[6px] text-[14px] leading-[21px] [color:var(--color-fg-muted)]">{b.text}</div>
              <div className="mt-sm flex items-center gap-md rounded-md p-sm [background-color:var(--color-surface-sunken)]">
                <div className="grow">
                  <Label>ENSERA SCHLÄGT VOR</Label>
                  <div className="pt-[3px] text-[14px] leading-[19px] [color:var(--color-fg)]">{b.vorschlag}</div>
                </div>
                <button
                  onClick={() => toast({ title: 'Entwurf geöffnet', body: b.vorschlag })}
                  className="flex h-xl shrink-0 items-center rounded-md border px-md text-sm font-medium transition-colors [background-color:var(--color-surface)] [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]"
                >
                  Entwurf ansehen
                </button>
              </div>
            </motion.div>
          ))}

          <div className="flex items-center gap-sm pt-lg">
            <button
              onClick={() => {
                toast({ title: 'Korrektur angefordert', body: 'Sanitär Brenner GmbH bekommt die Mail mit beiden Punkten.', tone: 'success' })
                navigate('/app/unterlagen')
              }}
              className="flex h-[42px] items-center whitespace-nowrap rounded-md px-[16px] text-[15px] font-semibold transition-opacity hover:opacity-90 [background-color:var(--color-surface-inverse)] [color:var(--color-fg-inverse)]"
            >
              Korrektur anfordern
            </button>
            <button className="flex h-[42px] items-center whitespace-nowrap rounded-md border px-[16px] text-[15px] font-medium transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]">
              Freigeben
            </button>
            <button className="flex h-[42px] items-center whitespace-nowrap rounded-md border px-[16px] text-[15px] font-medium transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]">
              Werte bearbeiten
            </button>
            <button className="shrink-0 whitespace-nowrap px-xs text-[15px] [color:var(--color-fg-subtle)] hover:[color:var(--color-fg-muted)]">Ablehnen</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Gegenpruefen() {
  const { toast } = useDemo()
  return (
    <div className="px-[40px] pt-[30px] pb-[30px]">
      <div className="flex items-start justify-between gap-lg">
        <div>
          <Label>UNTERLAGEN · FAMILIE REUTER · KFW 458 · VERWENDUNGSNACHWEIS</Label>
          <div className="pt-[6px] [font-family:var(--font-display)] text-[30px] font-semibold leading-[38px] tracking-tight [color:var(--color-fg)]">
            Rechnung Wärmepumpe Reuter, 18.640,00 €
          </div>
          <div className="pt-[8px]"><Label>PER MAIL AM 11.08. · ENSERA HAT 16 VON 16 WERTEN GELESEN · KEINE BEFUNDE</Label></div>
        </div>
        <div
          className="flex h-xl shrink-0 items-center gap-xs rounded-full px-md text-[11px] font-medium tracking-caps"
          style={{ backgroundColor: 'var(--color-accent-green-wash)', color: 'var(--color-accent-green-ink)' }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14">
            <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          BEREIT ZUR ANNAHME
        </div>
      </div>

      <div className="flex gap-xl pt-lg">
        <Rechnung
          firma="Wärmetechnik Osterloh GmbH"
          adresse="Gewerbering 12 · 31226 Peine · USt-IdNr. DE 815 902 447"
          nummer="Nr. 2026-1142"
          datum="11.08.2026"
          empfaenger="Familie Reuter"
          empfaengerAdresse="Lindenweg 7, 31226 Peine"
          gutZeile="Leistungszeitraum 02.07.2026 – 06.08.2026"
          positionen={[
            { text: 'Wärmepumpe Vaillant aroTHERM plus VWL 105/6 A', betrag: '11.480,00' },
            { text: 'Pufferspeicher 300 l inkl. Anbindung', betrag: '1.960,00' },
            { text: 'Hydraulischer Abgleich Verfahren B inkl. Protokoll', betrag: '780,00' },
            { text: 'Montage, Inbetriebnahme, Entsorgung Altanlage', betrag: '4.420,00' },
          ]}
          gesamt="18.640,00"
        />

        <div className="flex w-[536px] shrink-0 flex-col">
          <Werte
            kopfRechts="16 WERTE · ALLE GEFUNDEN"
            werte={[
              { feld: 'Rechnungsnummer', wert: '2026-1142', quelle: 'SEITE 1' },
              { feld: 'Rechnungsdatum', wert: '11.08.2026', quelle: 'SEITE 1' },
              { feld: 'Leistungszeitraum', wert: '02.07. – 06.08.2026', quelle: 'SEITE 1' },
              { feld: 'Betrag brutto', wert: '18.640,00 €', quelle: 'SEITE 1' },
              { feld: 'Anlage', wert: 'Vaillant aroTHERM plus VWL 105/6 A', quelle: 'BAFA-LISTE 08/26' },
              { feld: 'Hydraulischer Abgleich', wert: 'Verfahren B · Protokoll liegt bei', quelle: 'SEITE 2' },
            ]}
          />

          <div className="flex items-baseline justify-between pt-lg pb-xs">
            <Label>PRÜFUNG</Label>
            <Label>GEPRÜFT GEGEN KFW 458 · STAND 2026-01</Label>
          </div>
          {[
            ['Alle 12 Pflichtangaben der KfW 458 sind enthalten', 'NR. 4'],
            ['Anlage steht auf der BAFA-Liste, Stand 08/26', 'NR. 6.1'],
            ['Leistungszeitraum liegt nach dem Bewilligungsdatum', 'NR. 7.3'],
            ['Betrag bleibt im Rahmen der Bewilligung, 18.640 von 24.000 €', 'NR. 9'],
          ].map(([t, r], i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.07, ease: EASE }}
              className="flex items-center gap-sm py-[7px]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
                <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke="var(--color-accent-green-ink)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="grow text-[15px] leading-[20px] [color:var(--color-fg)]">{t}</div>
              <Label>{r}</Label>
            </motion.div>
          ))}

          <div className="flex items-baseline justify-between pt-lg pb-xs">
            <Label>BEIM ANNEHMEN</Label>
            <Label>DREI SCHRITTE · AUTOMATISCH</Label>
          </div>
          {['Beleg wird im Fall Reuter abgelegt', 'Verwendungsnachweis steht bei 4 von 5 Belegen', 'Familie Reuter sieht den Beleg im Portal als angenommen'].map((t) => (
            <div key={t} className="flex items-center gap-sm py-[7px]">
              <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0 }}>
                <path d="M2.4 7h9.2M8 3.4L11.6 7 8 10.6" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="grow text-[15px] leading-[20px] [color:var(--color-fg-muted)]">{t}</div>
            </div>
          ))}

          <div className="flex items-center gap-sm pt-xl">
            <button
              onClick={() => {
                toast({ title: 'Angenommen und abgelegt', body: 'Verwendungsnachweis Reuter steht bei 4 von 5 Belegen.', tone: 'success' })
                navigate('/app/unterlagen')
              }}
              className="flex h-[42px] items-center gap-xs whitespace-nowrap rounded-md px-[16px] text-[15px] font-semibold transition-opacity hover:opacity-90 [background-color:var(--color-surface-inverse)] [color:var(--color-fg-inverse)]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M2.5 7.2l3 3 6-6.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Annehmen und ablegen
            </button>
            <button
              onClick={() => navigate('/app/unterlagen/pruefung')}
              className="flex h-[42px] items-center whitespace-nowrap rounded-md border px-[16px] text-[15px] font-medium transition-colors [border-color:var(--color-border-strong)] hover:[background-color:var(--color-surface-sunken)]"
            >
              Selber prüfen
            </button>
            <button className="shrink-0 whitespace-nowrap px-xs text-[15px] [color:var(--color-fg-subtle)] hover:[color:var(--color-fg-muted)]">Ablehnen</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Bildschirm ────────────────────────────────────────────────────────── */

export default function Unterlagen({ ansicht }: { ansicht: 'eingang' | 'pruefung' | 'gegenpruefen' }) {
  const { toast } = useDemo()
  const aktionen = [
    { icon: <IconUpload />, label: 'Unterlagen hochladen', onClick: () => toast({ title: 'Unterlagen hochgeladen', body: 'ENSERA liest sie und ordnet sie einem Fall zu.' }) },
    { icon: <IconMail />, label: 'Von Kundschaft anfordern', onClick: () => navigate('/mail/erinnerung') },
    { icon: <IconDoc />, label: 'Nachweis zusammenstellen', onClick: () => navigate('/app/unterlagen/gegenpruefen') },
    { icon: <IconGrid />, label: 'Alle Aktionen', shortcut: '⌘P', divider: true, onClick: () => navigate('/app/fall/reuter/aktionen') },
  ]

  return (
    <AppShell quickActions={aktionen}>
      <div className="scrollbar-slim flex-1 overflow-y-auto [background-color:var(--color-surface)]">
        {ansicht === 'eingang' && <Eingang />}
        {ansicht === 'pruefung' && <Pruefung />}
        {ansicht === 'gegenpruefen' && <Gegenpruefen />}
      </div>
    </AppShell>
  )
}
