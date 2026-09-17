import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import MailFenster from '../components/MailFenster'
import type { MailEintrag } from '../components/MailFenster'
import { EASE } from '../components/ui'
import { navigate } from '../lib/router'
import { useDemo } from '../lib/store'

const HN = "'Helvetica Neue', system-ui, sans-serif"

const UNTERLAGEN_LINKS = ['Grundriss', 'Heizkostenabrechnung 2022', 'Heizkostenabrechnung 2023', 'Heizkostenabrechnung 2024', 'Fotos der Heizung']
const UNTERLAGEN_RECHTS = ['Energieausweis, falls vorhanden', 'Grundbuchauszug', 'Wohnflächenberechnung', 'Vollmacht Ihres Bruders']

function Titel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="[font-family:var(--font-display)] text-xl font-semibold leading-[30px] tracking-tight [color:var(--color-fg)]"
    >
      {children}
    </motion.div>
  )
}

function Absatz({ children }: { children: React.ReactNode }) {
  return <div className="text-base leading-lg [color:var(--color-fg)]">{children}</div>
}

function Signatur() {
  return (
    <>
      <div className="pt-sm text-base leading-lg whitespace-pre-wrap [color:var(--color-fg)]">{'Freundliche Grüße\nKatrin Held'}</div>
      <div className="pt-sm [font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-fg-subtle)]">
        ENERGIEBERATUNG HELD · 31224 PEINE · EEE 184 992
      </div>
    </>
  )
}

function WegKarten({ zweiterLabel = 'Per Mail antworten', text1, text2 }: { zweiterLabel?: string; text1: string; text2: string }) {
  const { setKanal, setPortalFrei, toast } = useDemo()
  return (
    <div className="flex w-[640px] gap-md pt-[26px]">
      {[
        {
          label: 'WEG 1 · IM PORTAL',
          text: text1,
          cta: 'Zu Ihrem Bereich',
          primaer: true,
          onClick: () => {
            setKanal('portal')
            setPortalFrei(true)
            navigate('/portal')
          },
        },
        {
          label: 'WEG 2 · PER MAIL',
          text: text2,
          cta: zweiterLabel,
          primaer: false,
          onClick: () => {
            setKanal('mail')
            toast({ title: 'Antwort wird verfasst', body: 'Kein Konto, kein Passwort — die Mail genügt.' })
            navigate('/mail/antwort')
          },
        },
      ].map((w, i) => (
        <motion.div
          key={w.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: EASE }}
          whileHover={{ y: -3, boxShadow: '0 12px 28px rgba(18,22,27,0.08)' }}
          className="flex grow basis-0 flex-col gap-[10px] rounded-lg border p-[20px] [border-color:var(--color-border)]"
        >
          <div className="[font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-fg-subtle)]">{w.label}</div>
          <div className="text-[14px] leading-[21px] [color:var(--color-fg)]">{w.text}</div>
          <button
            onClick={w.onClick}
            className={
              'mt-2xs flex h-[40px] shrink-0 items-center justify-center rounded-md text-[14px] font-medium leading-[18px] transition-colors ' +
              (w.primaer
                ? '[background-color:var(--color-brand)] [color:var(--color-brand-fg)] hover:[background-color:var(--color-brand-hover)]'
                : 'border [border-color:var(--color-border-strong)] [color:var(--color-fg)] hover:[background-color:var(--color-surface-sunken)]')
            }
          >
            {w.cta}
          </button>
        </motion.div>
      ))}
    </div>
  )
}

/* ── Postfach-Listen je Zeitpunkt ──────────────────────────────────────── */

function listeFuer(art: string, anrede: string): MailEintrag[] {
  const herr = anrede
  const zugang = {
    von: 'Energieberatung Held',
    zeit: '09:38',
    betreff: 'Ihre Anfrage passt — so geht es weiter',
    vorschau: `Guten Tag ${herr}, ich habe mir Ihre Anfrage angesehen. Das passt gut zu dem, was ich mache …`,
  }
  const rest: MailEintrag[] = [
    { von: 'Stadtwerke Peine', zeit: 'Gestern', betreff: 'Ihre Jahresabrechnung 2023', vorschau: `Sehr geehrter ${herr}, Ihre Abrechnung für das Jahr 2023 steht jetzt zum Download bereit …` },
    { von: 'Jens Sander', zeit: 'Gestern', betreff: 'Re: Das mit dem Dach', vorschau: 'Klingt gut. Ich schaue am Wochenende in die Unterlagen und melde mich dann bei dir …' },
    { von: 'Elternrat Grundschule', zeit: 'Montag', betreff: 'Sommerfest — Helfer gesucht', vorschau: 'Liebe Eltern, für das Sommerfest am 12. Juli suchen wir noch Helfer für den Kuchenstand …' },
    { von: 'DHL', zeit: 'Montag', betreff: 'Ihre Sendung ist unterwegs', vorschau: 'Ihre Sendung mit der Nummer 00340434 1234 5678 90 wird voraussichtlich morgen …' },
  ]
  if (art === 'zugang' || art === 'antwort') return [zugang, ...rest]
  if (art === 'bestaetigt')
    return [
      { von: 'Energieberatung Held', zeit: '14:12', betreff: 'Angekommen — 7 von 9 Unterlagen', vorschau: `Guten Tag ${herr}, Ihre fünf Dateien sind da und geprüft. Damit habe ich sieben von neun …` },
      zugang,
      ...rest.slice(0, 3),
    ]
  return [
    { von: 'Energieberatung Held', zeit: '08:30', betreff: 'Zwei Unterlagen fehlen noch — Frist Freitag', vorschau: `Guten Tag ${herr}, kurze Erinnerung: bis Freitag brauche ich noch zwei Sachen von Ihnen …` },
    { von: 'Energieberatung Held', zeit: '21.07.', betreff: 'Angekommen — 7 von 9 Unterlagen', vorschau: `Guten Tag ${herr}, Ihre fünf Dateien sind da und geprüft. Damit habe ich sieben von neun …` },
    { ...zugang, zeit: '21.07.' },
    { ...rest[0], zeit: '05.08.' },
    { ...rest[1], zeit: '02.08.' },
  ]
}

/* ── Bildschirm ────────────────────────────────────────────────────────── */

export default function Mail({ art }: { art: 'zugang' | 'antwort' | 'bestaetigt' | 'erinnerung' }) {
  const { anfrage } = useDemo()
  const liste = listeFuer(art, anfrage.anrede)

  const meta = {
    zugang: { uhrzeit: 'Di 21. Juli 09:41', datum: '21. Juli 2026, 09:38' },
    antwort: { uhrzeit: 'Di 21. Juli 10:04', datum: '21. Juli 2026, 09:38' },
    bestaetigt: { uhrzeit: 'Di 21. Juli 14:12', datum: '21. Juli 2026, 14:12' },
    erinnerung: { uhrzeit: 'Do 13. August 08:30', datum: '13. August 2026, 08:30' },
  }[art]

  return (
    <MailFenster
      uhrzeit={meta.uhrzeit}
      liste={liste}
      an={anfrage.name}
      datum={meta.datum}
      overlay={art === 'antwort' ? <Antwortfenster /> : undefined}
    >
      {art === 'zugang' && <Zugang />}
      {art === 'antwort' && <Zugang />}
      {art === 'bestaetigt' && <Bestaetigt />}
      {art === 'erinnerung' && <Erinnerung />}
    </MailFenster>
  )
}

function Zugang() {
  const { anfrage } = useDemo()
  return (
    <>
      <div className="flex w-[640px] flex-col gap-md">
        <Titel>Ihre Anfrage passt — so geht es weiter</Titel>
        <Absatz>Guten Tag {anfrage.anrede},</Absatz>
        <Absatz>ich habe mir Ihre Anfrage angesehen das passt gut zu dem, was ich mache. Ich übernehme das gern.</Absatz>
        <Absatz>
          Als Nächstes brauche ich neun Unterlagen von Ihnen. Dafür haben Sie zwei Wege. Beide landen bei mir am selben Ort — nehmen Sie den, der Ihnen
          lieber ist.
        </Absatz>
      </div>
      <WegKarten
        text1="Dateien hochladen und jederzeit sehen, was noch fehlt. Einfach und schnell."
        text2="Auf diese Mail antworten und die Dateien anhängen."
      />
      <div className="flex w-[640px] flex-col gap-sm pt-[28px]">
        <div className="[font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-fg-subtle)]">
          DAS BRAUCHE ICH · NEUN UNTERLAGEN
        </div>
        <div className="flex gap-[40px]">
          <div className="grow basis-0 whitespace-pre-wrap text-[14px] leading-lg [color:var(--color-fg-muted)]">{UNTERLAGEN_LINKS.join('\n')}</div>
          <div className="grow basis-0 whitespace-pre-wrap text-[14px] leading-lg [color:var(--color-fg-muted)]">{UNTERLAGEN_RECHTS.join('\n')}</div>
        </div>
        <Signatur />
      </div>
    </>
  )
}

function Bestaetigt() {
  const { anfrage } = useDemo()
  return (
    <>
      <div className="flex w-[640px] flex-col gap-md">
        <Titel>Angekommen — sieben von neun</Titel>
        <Absatz>Guten Tag {anfrage.anrede},</Absatz>
        <Absatz>Ihre fünf Dateien sind da und geprüft. Damit habe ich sieben von neun Unterlagen beisammen.</Absatz>
        <Absatz>Sie müssen dafür nichts weiter tun — ich habe alles übernommen.</Absatz>
      </div>

      <div className="w-[640px] pt-[26px]">
        <div className="flex items-baseline justify-between">
          <div className="[font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-fg-subtle)]">STAND IHRER UNTERLAGEN</div>
          <div className="[font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-fg-muted)]">7 / 9</div>
        </div>
        <div className="mt-sm flex gap-[9px]">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.05, ease: EASE }}
              className="h-[5px] grow origin-left rounded-full"
              style={{ backgroundColor: i < 7 ? 'var(--color-fg)' : 'var(--color-border)' }}
            />
          ))}
        </div>
        <div className="mt-md text-[14px] leading-[23px] [color:var(--color-fg-muted)]">
          Da sind: Grundriss · Heizkosten 2022 · Heizkosten 2023 · Fotos der Heizung · Wohnflächenberechnung · Grundbuchauszug · Energieausweis
        </div>
      </div>

      <div className="mt-[22px] w-[640px] rounded-lg px-[20px] py-[18px] [background-color:var(--color-surface-sunken)]">
        <div className="[font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-fg-subtle)]">
          ES FEHLEN NOCH ZWEI · BIS FR 15. AUGUST
        </div>
        <div className="mt-sm flex flex-col gap-sm">
          {[
            'Heizkostenabrechnung 2024 — für die Förderung brauche ich drei zusammenhängende Jahre. Schicken Sie sie gern nach, wenn sie im Februar kommt.',
            'Vollmacht Ihres Bruders — ohne die kann der Förderantrag nicht raus.',
          ].map((t) => (
            <div key={t} className="flex items-start gap-sm">
              <svg width="14" height="14" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 4 }}>
                <path d="M8 10.6V2.2M4.8 5.4L8 2.2l3.2 3.2M2.6 11.6v1.2a1.4 1.4 0 001.4 1.4h8a1.4 1.4 0 001.4-1.4v-1.2" fill="none" stroke="var(--color-feedback-error)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="grow text-[14px] leading-[23px] [color:var(--color-fg)]">{t}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[640px] pt-[26px]">
        <div className="text-base leading-lg whitespace-pre-wrap [color:var(--color-fg)]">{'Freundliche Grüße\nKatrin Held'}</div>
        <div className="mt-lg border-t pt-sm [border-color:var(--color-border)] [font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-fg-subtle)]">
          ENSERA HAT DIESE MAIL VORBEREITET · KATRIN HELD HAT SIE FREIGEGEBEN
        </div>
      </div>
    </>
  )
}

function Erinnerung() {
  const { anfrage } = useDemo()
  return (
    <>
      <div className="flex w-[640px] flex-col gap-md">
        <Titel>Zwei Unterlagen fehlen noch</Titel>
        <Absatz>Guten Tag {anfrage.anrede},</Absatz>
        <Absatz>kurze Erinnerung: bis Freitag, 15. August brauche ich noch zwei Sachen von Ihnen. Danach kann ich den Förderantrag fertig machen.</Absatz>
      </div>

      <div className="mt-[22px] w-[640px] rounded-lg px-[20px] py-[18px] [background-color:var(--color-surface-sunken)]">
        <div className="[font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-fg-subtle)]">
          NOCH ZWEI TAGE · FRIST FR 15. AUGUST
        </div>
        <div className="mt-sm flex flex-col gap-sm">
          {[
            'Heizkostenabrechnung 2024 — falls sie noch nicht da ist, sagen Sie mir kurz Bescheid. Dann verschiebe ich die Frist.',
            'Vollmacht Ihres Bruders — ein Foto der unterschriebenen Seite genügt.',
          ].map((t) => (
            <div key={t} className="flex items-start gap-sm">
              <svg width="14" height="14" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 4 }}>
                <path d="M8 10.6V2.2M4.8 5.4L8 2.2l3.2 3.2M2.6 11.6v1.2a1.4 1.4 0 001.4 1.4h8a1.4 1.4 0 001.4-1.4v-1.2" fill="none" stroke="var(--color-feedback-error)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="grow text-[14px] leading-[23px] [color:var(--color-fg)]">{t}</div>
            </div>
          ))}
        </div>
      </div>

      <WegKarten
        zweiterLabel="Einfach antworten"
        text1="Dateien hochladen und jederzeit sehen, was noch fehlt."
        text2="Auf diese Mail antworten und die Dateien anhängen."
      />

      <div className="w-[640px] pt-[26px]">
        <div className="text-base leading-lg whitespace-pre-wrap [color:var(--color-fg)]">{'Freundliche Grüße\nKatrin Held'}</div>
        <div className="mt-lg border-t pt-sm [border-color:var(--color-border)] [font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps [color:var(--color-fg-subtle)]">
          ENSERA HAT DIESE MAIL VORBEREITET · KATRIN HELD HAT SIE FREIGEGEBEN
        </div>
      </div>
      <div className="pt-lg">
        <div className="text-[13px] [color:var(--color-fg-subtle)]">
          Der Verlauf dieser Fristen liegt auch im Fall — Katrin Held sieht dort, dass zweimal erinnert wurde.
        </div>
      </div>
    </>
  )
}

/* ── Antwortfenster ────────────────────────────────────────────────────── */

const ANHAENGE = [
  ['Grundriss.pdf', '1,8 MB'],
  ['Heizkosten 2022.pdf', '0,4 MB'],
  ['Heizkosten 2023.pdf', '0,4 MB'],
  ['Heizung_Foto.jpg', '2,6 MB'],
  ['Wohnfläche.pdf', '0,3 MB'],
]

function Antwortfenster() {
  const { anfrage, setMailBeantwortet, toast } = useDemo()
  const [gesendet, setGesendet] = useState(false)
  const [text, setText] = useState(
    `Guten Tag Frau Held,\n\nanbei erst mal alles, was wir gefunden haben. Die Heizkostenabrechnung für 2024 kommt erst im Februar von den Stadtwerken — die reiche ich nach.\n\nWegen der Vollmacht spreche ich am Wochenende mit meinem Bruder.\n\nViele Grüße\n${anfrage.name}`,
  )

  function senden() {
    setGesendet(true)
    setMailBeantwortet(true)
    toast({ title: 'Antwort gesendet · 5 Anhänge', body: 'ENSERA ordnet die Dateien automatisch dem Fall zu.', tone: 'success' })
    window.setTimeout(() => navigate('/mail/bestaetigt'), 1100)
  }

  return (
    <div className="absolute inset-0 flex items-start justify-center bg-[rgba(18,22,27,0.18)] pt-[128px] backdrop-blur-[1px]">
      <AnimatePresence>
        {!gesendet && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -260, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="flex h-[620px] w-[840px] flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_28px_70px_rgba(18,22,27,0.28)]"
            style={{ fontFamily: HN }}
          >
            {/* Titelzeile */}
            <div className="flex h-[46px] shrink-0 items-center border-b border-[#DCDCDC] bg-[#F5F5F5] px-md">
              <div className="flex w-[110px] shrink-0 items-center gap-xs">
                <div className="size-sm rounded-full bg-[#FF5F57]" />
                <div className="size-sm rounded-full bg-[#FEBC2E]" />
                <div className="size-sm rounded-full bg-[#28C840]" />
              </div>
              <div className="grow text-center text-[14px] font-bold leading-[17px] text-[#1D1D1F]">Re: Ihre Anfrage passt — so geht es weiter</div>
              <div className="flex w-[110px] shrink-0 items-center justify-end gap-md">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M12.6 7.4l-5 5a3 3 0 01-4.2-4.2l5.4-5.4a2 2 0 012.8 2.8l-5.4 5.4a1 1 0 01-1.4-1.4l4.8-4.8" fill="none" stroke="#4B4B4F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <button onClick={senden} aria-label="Senden">
                  <svg width="18" height="18" viewBox="0 0 20 20">
                    <path d="M17.6 2.4L2.4 8.4l5.4 2.2 2.2 5.4z" fill="none" stroke="#0B69F0" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex h-[40px] shrink-0 items-center gap-md border-b border-[#EDEDED] px-lg">
              <div className="w-[52px] shrink-0 text-[13px] text-[#86868B]">An:</div>
              <div className="rounded-[4px] bg-[#E6EEFC] px-xs py-[3px] text-[13px] text-[#0B69F0]">Energieberatung Held</div>
            </div>
            <div className="flex h-[40px] shrink-0 items-center gap-md border-b border-[#EDEDED] px-lg">
              <div className="w-[52px] shrink-0 text-[13px] text-[#86868B]">Betreff:</div>
              <div className="text-[13px] text-[#1D1D1F]">Re: Ihre Anfrage passt — so geht es weiter</div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="scrollbar-slim grow resize-none px-lg py-lg text-[15px] leading-[26px] text-[#1D1D1F] outline-none"
              style={{ fontFamily: HN }}
            />

            <div className="flex shrink-0 flex-wrap gap-xs px-lg pb-md">
              {ANHAENGE.map(([n, g], i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + i * 0.06, type: 'spring', stiffness: 400, damping: 24 }}
                  className="flex items-center gap-xs rounded-[6px] bg-[#F1F1F3] px-sm py-[7px]"
                >
                  <svg width="13" height="13" viewBox="0 0 14 14">
                    <path d="M3.4 2.2h4.4l2.8 2.8v6.8H3.4z" fill="none" stroke="#5B5B5F" strokeWidth="1.1" strokeLinejoin="round" />
                    <path d="M7.8 2.2v2.8h2.8" fill="none" stroke="#5B5B5F" strokeWidth="1.1" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[13px] text-[#1D1D1F]">{n}</span>
                  <span className="text-[12px] text-[#86868B]">{g}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex h-[52px] shrink-0 items-center gap-xs border-t border-[#EDEDED] bg-[#FAFAFA] px-lg">
              <svg width="14" height="14" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6.2" fill="none" stroke="#86868B" strokeWidth="1.2" />
                <path d="M8 7.2v4M8 4.9v.1" fill="none" stroke="#86868B" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <div className="text-[13px] text-[#86868B]">
                5 Anhänge · 5,5 MB. Sie brauchen kein Konto und kein Passwort — die Antwort genügt.
              </div>
              <div className="grow" />
              <button
                onClick={senden}
                className="flex h-[30px] items-center rounded-[6px] bg-[#0B69F0] px-md text-[13px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Senden
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
