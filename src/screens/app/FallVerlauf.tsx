import { motion } from 'motion/react'
import { EASE, Label } from '../../components/ui'

interface Eintrag {
  zeit: string
  art: string
  text: string
  kategorie: 'nachricht' | 'notiz' | 'entscheidung' | 'pruefung' | 'frage' | 'upload' | 'protokoll' | 'annahme'
}

const VERLAUF: Eintrag[] = [
  { zeit: 'HEUTE · 08:12', art: 'KUNDSCHAFT · FRAGE', kategorie: 'frage', text: '„Können wir die Fenster schon im Herbst tauschen lassen?“ — Entwurf liegt zur Freigabe bereit.' },
  { zeit: '04.08. · 16:40', art: 'ENSERA · ANNAHME', kategorie: 'annahme', text: 'Verbrauch als Mittel aus 2022/2023 angesetzt, bis 2024 vorliegt. Von Ihnen bestätigt.' },
  { zeit: '04.08. · 14:05', art: 'ENSERA · PRÜFUNG', kategorie: 'pruefung', text: 'Sieben Unterlagen gelesen, Werte übernommen. Heizkostenabrechnung 2024 fehlt.' },
  { zeit: '04.08. · 09:30', art: 'KUNDSCHAFT · UPLOAD', kategorie: 'upload', text: 'Wohnflächenberechnung hochgeladen.' },
  { zeit: '30.07. · 11:15', art: 'SIE · NACHRICHT', kategorie: 'nachricht', text: 'Grundbuchauszug beim Amt angefordert und der Kundschaft Bescheid gegeben.' },
  { zeit: '28.07. · 17:20', art: 'SIE · ENTSCHEIDUNG', kategorie: 'entscheidung', text: 'iSFP statt Einzelmaßnahme — Dach zuerst, Heizung später.' },
  { zeit: '28.07. · 16:00', art: 'SIE · PROTOKOLL', kategorie: 'protokoll', text: 'Erstgespräch vor Ort. Dach hat Priorität, Heizung soll noch drei bis vier Jahre halten.' },
  { zeit: '26.07. · 10:40', art: 'SIE · NOTIZ', kategorie: 'notiz', text: 'Miteigentümer Jens Reuter wohnt in Hamburg — Vollmacht nur digital möglich.' },
  { zeit: '24.07. · 09:05', art: 'SIE · ENTSCHEIDUNG', kategorie: 'entscheidung', text: 'Förderweg BAFA EBW festgelegt, KfW 458 als zweite Stufe vorgemerkt.' },
  { zeit: '22.07. · 15:30', art: 'SIE · NOTIZ', kategorie: 'notiz', text: 'Dachgeschoss ist ausgebaut, aber ungedämmt — Aufnahme beim Termin nötig.' },
]

const FILTER: Record<string, (e: Eintrag) => boolean> = {
  alles: () => true,
  notizen: (e) => e.kategorie === 'notiz' || e.kategorie === 'protokoll',
  entscheidungen: (e) => e.kategorie === 'entscheidung',
  nachrichten: (e) => e.kategorie === 'nachricht' || e.kategorie === 'frage',
}

export default function FallVerlauf({ art }: { art: string }) {
  const test = FILTER[art] ?? FILTER.alles
  const sichtbar = VERLAUF.filter(test)

  return (
    <div className="flex flex-col px-[40px] pt-[26px] pb-[40px]">
      {sichtbar.map((e, i) => (
        <motion.div
          key={e.zeit + e.text}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3), ease: EASE }}
          className="flex items-start gap-lg border-b py-[18px] [border-color:var(--color-border-subtle)]"
        >
          <div className="flex w-[150px] shrink-0 flex-col gap-[4px]">
            <Label tone="muted">{e.zeit}</Label>
            <Label>{e.art}</Label>
          </div>
          <div className="grow basis-0 text-[15px] leading-[24px] [color:var(--color-fg)]">{e.text}</div>
        </motion.div>
      ))}
      {sichtbar.length === 0 && (
        <div className="py-[40px] text-sm [color:var(--color-fg-muted)]">In dieser Ansicht liegt noch nichts.</div>
      )}
    </div>
  )
}
