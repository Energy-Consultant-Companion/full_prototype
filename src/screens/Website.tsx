import { motion } from 'motion/react'
import { navigate } from '../lib/router'

const fade = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
}

function Pfeil({ stroke }: { stroke: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M3 7.5h9M8.5 4l3.5 3.5L8.5 11" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const SPALTEN = [
  {
    titel: 'Ihre Website bleibt gleich',
    text: 'Was Sie heute haben, bleibt bestehen. Ihre Texte, Preise und Fotos bleiben unverändert. ENSERA greift hier nicht ein und möchte es auch nicht.',
    fade: false,
  },
  {
    titel: 'Ein Link direkt zur Akquise',
    text: 'Ein Button „Anfrage erstellen“, der direkt auf Ihren Bereich verweist. Mehr ist für die Einbindung nicht erforderlich.',
    fade: false,
  },
  {
    titel: 'Danach Klientenportal',
    text: 'Anfragen prüfen, Zugänge verschicken, Unterlagen einsammeln, Fristen im Blick behalten und Fragen beantworten. Dies übernimmt ENSERA.',
    fade: true,
  },
]

const FAKTEN = [
  ['DENA-EXPERTENLISTE', 'EEE 184 992 · eingetragen seit 2016'],
  ['AUSBILDUNG', 'Dipl.-Ing. Bauingenieurwesen, TU Braunschweig'],
  ['ANTRAGSBERECHTIGT', 'BAFA EBW · BEG EM · KfW 458 und 261'],
  ['ERREICHBAR', '05171 · 40 22 88 — meist am selben Werktag'],
]

export default function Website() {
  const start = () => navigate('/anfrage/gebaeude')

  return (
    <div className="scrollbar-slim h-full overflow-y-auto [background-color:var(--color-surface)]">
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="relative flex h-[882px] shrink-0 flex-col overflow-clip [background-color:var(--color-surface-inverse)]">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(./assets/hero.jpg)' }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{ backgroundImage: 'linear-gradient(94deg, rgba(11,13,16,0.95) 0%, rgba(11,13,16,0.88) 32%, rgba(11,13,16,0.58) 62%, rgba(11,13,16,0.36) 100%)' }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[200px]"
          style={{ backgroundImage: 'linear-gradient(180deg, rgba(11,13,16,0.78) 0%, rgba(11,13,16,0.32) 60%, rgba(11,13,16,0) 100%)' }}
        />

        <div className="relative flex h-[92px] shrink-0 items-center justify-between px-[80px]">
          <div className="flex items-center gap-sm">
            <div className="flex size-[26px] shrink-0 items-center justify-center rounded-md [background-color:var(--color-surface)]">
              <div className="size-[9px] shrink-0 rounded-[2px] [background-color:var(--color-fg)]" />
            </div>
            <div className="[font-family:var(--font-display)] text-base font-semibold leading-[18px] tracking-tight [color:var(--color-fg-inverse)]">
              Energieberatung Held
            </div>
          </div>
          <button
            onClick={start}
            className="flex h-[36px] items-center rounded-full border px-[18px] text-sm font-medium leading-md transition-colors [border-color:var(--color-border-inverse-strong)] [color:var(--color-fg-inverse)] hover:[background-color:var(--color-surface-inverse-raised)]"
          >
            Anfrage erstellen
          </button>
        </div>

        <div className="relative flex grow basis-0 flex-col justify-end px-[80px] pb-[92px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-[540px] [font-family:var(--font-display)] text-[62px] font-semibold leading-[60px] tracking-tighter [color:var(--color-fg-inverse)]"
          >
            Exemplarische Website
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
            className="w-[560px] pt-lg text-md leading-[29px] text-[#FFFFFFD1]"
          >
            Diese verlinkt direkt zu ENSERA
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.34 }}
            className="flex items-center gap-[20px] pt-[40px]"
          >
            <button
              onClick={start}
              className="group flex h-[52px] shrink-0 items-center gap-[10px] rounded-full bg-white px-[26px] transition-transform duration-300 hover:scale-[1.02]"
            >
              <span className="text-base font-semibold leading-[18px] tracking-tight [color:var(--color-fg)]">Anfrage erstellen</span>
              <span className="transition-transform duration-300 group-hover:translate-x-[3px]">
                <Pfeil stroke="var(--color-fg)" />
              </span>
            </button>
          </motion.div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-[-92px] h-[74px]"
            style={{ backgroundImage: 'linear-gradient(180deg, rgba(11,13,16,0) 0%, rgba(11,13,16,0.55) 100%)' }}
          />
        </div>
      </div>

      {/* ── Überblick ────────────────────────────────────── */}
      <div className="flex px-[80px] pt-[104px] pb-4xl [background-color:var(--color-surface)]">
        <div className="flex grow basis-0 flex-col items-center justify-center">
          <motion.div {...fade} className="[font-family:var(--font-display)] text-3xl font-semibold leading-[44px] tracking-tight [color:var(--color-fg)]">
            Überblick
          </motion.div>
          <div className="flex w-[1000px] gap-[20px] pt-3xl">
            {SPALTEN.map((s, i) => (
              <motion.div
                key={s.titel}
                {...fade}
                transition={{ ...fade.transition, delay: i * 0.1 }}
                className="flex w-[320px] shrink-0 flex-col"
              >
                <div className="relative flex h-[10px] w-[320px] shrink-0 items-center">
                  <div
                    className="absolute left-0 top-[4.5px] h-px w-[320px]"
                    style={
                      s.fade
                        ? { backgroundImage: 'linear-gradient(90deg, #E4E8EC 0%, #E4E8EC 55%, rgba(228,232,236,0) 100%)' }
                        : { backgroundColor: 'var(--color-border)' }
                    }
                  />
                </div>
                <div className="h-[36px] pt-[22px]" />
                <div className="pt-sm [font-family:var(--font-display)] text-[22px] font-semibold leading-[28px] tracking-tight [color:var(--color-fg)]">
                  {s.titel}
                </div>
                <div className="w-[280px] pt-[10px] text-base leading-[25px] [color:var(--color-fg-muted)]">{s.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Wer ich bin ──────────────────────────────────── */}
      <div className="flex gap-[80px] px-[80px] py-[104px] [background-color:var(--color-surface-sunken)]">
        <div className="flex w-[200px] shrink-0 flex-col gap-[14px] pt-[6px]">
          <div className="[font-family:var(--font-mono)] text-2xs leading-[14px] tracking-caps [color:var(--color-fg-subtle)]">02 — WER ICH BIN</div>
          <div className="text-sm leading-[21px] [color:var(--color-fg-muted)]">Damit Sie wissen, wer bei Ihnen im Keller steht.</div>
        </div>
        <div className="flex grow basis-0 items-start gap-[40px]">
          <motion.div {...fade} className="flex w-[340px] shrink-0 flex-col">
            <div
              className="relative h-[420px] w-[340px] shrink-0 overflow-clip rounded-xl bg-cover bg-center"
              style={{ backgroundImage: 'url(./assets/portrait.jpg)' }}
            >
              <svg width="340" height="420" viewBox="0 0 340 420" className="absolute left-0 top-0">
                <defs>
                  <pattern id="raster" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M40 0H0V40" stroke="rgb(255 255 255 / 6%)" fill="none" />
                  </pattern>
                </defs>
                <rect width="340" height="420" fill="url(#raster)" />
              </svg>
            </div>
            <div className="flex flex-col gap-2xs pt-md">
              <div className="text-[14px] font-medium leading-[18px] [color:var(--color-fg)]">Katrin Held</div>
              <div className="text-sm leading-md [color:var(--color-fg-subtle)]">Exemplarische Energieberaterin</div>
            </div>
          </motion.div>
          <motion.div {...fade} transition={{ ...fade.transition, delay: 0.12 }} className="flex grow basis-0 flex-col">
            <div className="w-[600px] [font-family:var(--font-display)] text-3xl font-semibold leading-[44px] tracking-tight [color:var(--color-fg)]">
              Katrin Held, Exemplarische Energieberaterin für die Demo.
            </div>
            <div className="w-[600px] pt-[22px] text-[16px] leading-[28px] [color:var(--color-fg-muted)]">
              Ich habe Bauingenieurwesen studiert und zwölf Jahre in einem Planungsbüro Sanierungen begleitet, bevor ich 2016 mein eigenes Büro
              aufgemacht habe. Seitdem habe ich 142 Häuser zwischen Peine, Vechelde und Ilsede durchgerechnet — die meisten Baujahr 1950 bis 1980,
              viele mit einer Heizung, die ihre Zeit hinter sich hat.
            </div>
            <div className="w-[600px] pt-[18px] text-[16px] leading-[28px] [color:var(--color-fg-muted)]">
              Ich arbeite allein. Das heißt: von der ersten Frage bis zum Bescheid haben Sie dieselbe Ansprechpartnerin, unter derselben Nummer. Es
              heißt auch, dass ich im Jahr nur eine begrenzte Zahl Häuser annehmen kann — deshalb die kurze Anfrage vorweg.
            </div>
            <div className="mt-xl flex w-[600px] flex-col border-t pt-xl [border-color:var(--color-border)]">
              {FAKTEN.map(([k, v], i) => (
                <div
                  key={k}
                  className={'flex items-baseline gap-lg py-sm' + (i < FAKTEN.length - 1 ? ' border-b [border-color:var(--color-border)]' : '')}
                >
                  <div className="w-[190px] shrink-0 [font-family:var(--font-mono)] text-2xs leading-[14px] tracking-caps [color:var(--color-fg-subtle)]">
                    {k}
                  </div>
                  <div className="grow basis-0 text-base leading-[18px] [color:var(--color-fg)]">{v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Fuß ──────────────────────────────────────────── */}
      <div className="flex flex-col px-[80px] pt-[80px] pb-[56px] [background-color:var(--color-surface-inverse)]">
        <div className="flex items-end justify-between pb-[56px]">
          <div className="w-[620px] shrink-0 [font-family:var(--font-display)] text-2xl font-medium leading-[40px] tracking-tight [color:var(--color-fg-inverse)]">
            Bei Rückfragen können sie uns immer gerne telefonisch oder per Mail erreichen.
          </div>
          <button onClick={start} className="group flex shrink-0 items-center gap-[9px] pb-[6px]">
            <span className="text-base font-medium leading-[18px] [color:var(--color-brand-inverse)]">Anfrage erstellen</span>
            <span className="transition-transform duration-300 group-hover:translate-x-[3px]">
              <Pfeil stroke="var(--color-brand-inverse)" />
            </span>
          </button>
        </div>
        <div className="flex items-start justify-between border-t pt-xl [border-color:var(--color-border-inverse)]">
          <div className="flex flex-col gap-[14px]">
            <div className="[font-family:var(--font-display)] text-base font-semibold leading-[18px] tracking-tight [color:var(--color-fg-inverse)]">
              Energieberatung Held
            </div>
            <div className="flex items-center gap-[22px]">
              {['Impressum', 'Datenschutz', 'Widerrufsrecht', 'Kontakt'].map((l) => (
                <span key={l} className="cursor-default text-sm leading-md [color:var(--color-fg-inverse-muted)]">
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-sm">
            <div className="w-panel text-right text-sm leading-[21px] [color:var(--color-fg-inverse-muted)]">
              Ihre Anfrage wird in Deutschland gespeichert und nur von mir gelesen. Kein Newsletter, keine Weitergabe.
            </div>
            <div className="[font-family:var(--font-mono)] text-[10px] leading-sm tracking-caps text-[#FFFFFF61]">LÄUFT MIT ENSERA KONTAKT</div>
          </div>
        </div>
      </div>
    </div>
  )
}
