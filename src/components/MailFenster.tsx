import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { EASE } from './ui'

/* Nachbau von macOS Mail — der Rahmen für alle vier Mail-Bildschirme */

const HN = "'Helvetica Neue', system-ui, sans-serif"
const grau = '#86868B'
const ink = '#1D1D1F'

export interface MailEintrag {
  von: string
  zeit: string
  betreff: string
  vorschau: string
}

const MENU = ['Ablage', 'Bearbeiten', 'Darstellung', 'Postfach', 'E-Mail', 'Format', 'Fenster', 'Hilfe']

const FAVORITEN = [
  { label: 'Posteingang', zahl: '1', aktiv: true, icon: <path d="M2 8.8h3l1 1.8h4l1-1.8h3M2 8.8l1.6-5.2h8.8L14 8.8v3.4a1.3 1.3 0 01-1.3 1.3H3.3A1.3 1.3 0 012 12.2z" fill="none" stroke="#5B5B5F" strokeWidth="1.3" strokeLinejoin="round" /> },
  { label: 'VIP', zahl: '', aktiv: false, icon: <path d="M8 2l1.8 3.8 4.2.6-3 3 .7 4.2L8 11.6l-3.7 2 .7-4.2-3-3 4.2-.6z" fill="none" stroke="#5B5B5F" strokeWidth="1.3" strokeLinejoin="round" /> },
  { label: 'Gesendet', zahl: '', aktiv: false, icon: <path d="M14.2 2L1.8 7.2l4.4 1.8 1.8 4.4z" fill="none" stroke="#5B5B5F" strokeWidth="1.3" strokeLinejoin="round" /> },
  { label: 'Entwürfe', zahl: '2', aktiv: false, icon: <><path d="M4 2h5l3 3v9H4z" fill="none" stroke="#5B5B5F" strokeWidth="1.3" strokeLinejoin="round" /><path d="M9 2v3h3" fill="none" stroke="#5B5B5F" strokeWidth="1.3" strokeLinejoin="round" /></> },
  { label: 'Markiert', zahl: '', aktiv: false, icon: <path d="M4 14.4V2.4h8.4l-1.7 3 1.7 3H4" fill="none" stroke="#5B5B5F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /> },
]

const POSTFAECHER = [
  { label: 'Heute', icon: <><circle cx="8" cy="8" r="6" fill="none" stroke="#5B5B5F" strokeWidth="1.3" /><path d="M8 4.6V8l2.4 1.6" fill="none" stroke="#5B5B5F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></> },
  { label: 'Anhänge', icon: <path d="M12.6 7.4l-5 5a3 3 0 01-4.2-4.2l5.4-5.4a2 2 0 012.8 2.8l-5.4 5.4a1 1 0 01-1.4-1.4l4.8-4.8" fill="none" stroke="#5B5B5F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /> },
]

const TAGS = [
  { label: 'Energieberatung', farbe: '#34C759' },
  { label: 'Privat', farbe: '#FF9500' },
  { label: 'Haus', farbe: '#007AFF' },
  { label: 'Alle Tags …', farbe: '' },
]

const ToolIcon = ({ d }: { d: ReactNode }) => (
  <svg width="17" height="17" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>{d}</svg>
)

export default function MailFenster({
  uhrzeit,
  liste,
  an,
  datum,
  children,
  overlay,
}: {
  uhrzeit: string
  liste: MailEintrag[]
  an: string
  datum: string
  children: ReactNode
  overlay?: ReactNode
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white">
      {/* Menüleiste */}
      <div className="flex h-[26px] shrink-0 items-center gap-[22px] border-b border-[#DCDCDC] bg-[#F3F3F3] px-[14px]" style={{ fontFamily: HN }}>
        <svg width="14" height="14" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
          <path d="M11.2 8.5c0-1.5 1.2-2.2 1.3-2.3-.7-1-1.8-1.2-2.2-1.2-1-.1-1.9.6-2.4.6s-1.2-.6-2-.6c-1 0-2 .6-2.5 1.5-1.1 1.9-.3 4.6.8 6.1.5.7 1.1 1.5 1.9 1.5.8 0 1-.5 2-.5s1.1.5 2 .5c.8 0 1.3-.7 1.8-1.4.6-.8.8-1.6.8-1.6s-1.5-.6-1.5-2.6zM9.6 3.9c.4-.5.7-1.2.6-1.9-.6 0-1.4.4-1.8.9-.4.5-.7 1.2-.6 1.9.7.1 1.4-.3 1.8-.9z" fill={ink} />
        </svg>
        <div className="text-sm font-bold leading-md" style={{ color: ink }}>Mail</div>
        {MENU.map((m) => (
          <div key={m} className="text-sm leading-md" style={{ color: ink }}>{m}</div>
        ))}
        <div className="grow basis-0" />
        <div className="text-sm leading-md" style={{ color: ink }}>{uhrzeit}</div>
      </div>

      {/* Werkzeugleiste */}
      <div className="flex h-[52px] shrink-0 items-center border-b border-[#DCDCDC] bg-[#F5F5F5]" style={{ fontFamily: HN }}>
        <div className="flex w-[220px] shrink-0 items-center gap-xs pl-md">
          <div className="size-sm shrink-0 rounded-full bg-[#FF5F57]" />
          <div className="size-sm shrink-0 rounded-full bg-[#FEBC2E]" />
          <div className="size-sm shrink-0 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex grow basis-0 items-center gap-[22px] px-[20px]">
          <div className="flex w-[220px] shrink-0 flex-col gap-3xs">
            <div className="text-[14px] font-bold leading-[17px]" style={{ color: ink }}>Posteingang</div>
            <div className="text-2xs leading-[13px]" style={{ color: grau }}>24 Nachrichten</div>
          </div>
          <ToolIcon d={<><rect x="2" y="4.5" width="16" height="11" rx="2" fill="none" stroke="#4B4B4F" strokeWidth="1.4" /><path d="M2.6 5.6L10 10.8l7.4-5.2" fill="none" stroke="#4B4B4F" strokeWidth="1.4" strokeLinejoin="round" /></>} />
          <ToolIcon d={<><rect x="2.2" y="3.4" width="15.6" height="3.6" rx="1" fill="none" stroke="#4B4B4F" strokeWidth="1.4" /><path d="M3.6 7v8.2a1.4 1.4 0 001.4 1.4h10a1.4 1.4 0 001.4-1.4V7M8 10.4h4" fill="none" stroke="#4B4B4F" strokeWidth="1.4" strokeLinecap="round" /></>} />
          <ToolIcon d={<path d="M3.4 5.4h13.2M8 5.4V3.6h4v1.8M5.2 5.4l.8 11a1.4 1.4 0 001.4 1.3h5.2a1.4 1.4 0 001.4-1.3l.8-11" fill="none" stroke="#4B4B4F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />} />
          <ToolIcon d={<path d="M7.6 5.2L3 9.8l4.6 4.6M3.4 9.8h7.8a5.4 5.4 0 015.4 5.4v1" fill="none" stroke="#4B4B4F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />} />
          <ToolIcon d={<path d="M10.4 4.2L14 7.8l-3.6 3.6M14 7.8H8a5 5 0 00-5 5v2.6" fill="none" stroke="#4B4B4F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />} />
          <ToolIcon d={<path d="M4.6 17V3.6h10.8l-2.2 3.8 2.2 3.8H4.6" fill="none" stroke="#4B4B4F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />} />
          <div className="grow basis-0" />
          <div className="flex h-[28px] w-[270px] shrink-0 items-center gap-xs rounded-[6px] bg-[#EAEAEA] px-[10px]">
            <svg width="13" height="13" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
              <circle cx="7.2" cy="7.2" r="4.5" fill="none" stroke={grau} strokeWidth="1.4" />
              <path d="M10.6 10.6L13.6 13.6" fill="none" stroke={grau} strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <div className="text-sm leading-md" style={{ color: grau }}>Suchen</div>
          </div>
        </div>
      </div>

      <div className="flex grow basis-0 overflow-hidden">
        {/* Postfächer */}
        <div className="flex w-[220px] shrink-0 flex-col border-r border-[#DCDCDC] bg-[#F5F5F5] px-[10px] py-sm" style={{ fontFamily: HN }}>
          <div className="flex flex-col gap-px">
            <div className="px-[10px] py-[6px] text-2xs font-bold leading-[13px]" style={{ color: grau }}>Favoriten</div>
            {FAVORITEN.map((f) => (
              <div key={f.label} className={'flex h-[28px] shrink-0 items-center gap-[10px] rounded-[6px] px-[10px]' + (f.aktiv ? ' bg-[#DFDFDF]' : '')}>
                <svg width="15" height="15" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>{f.icon}</svg>
                <div className="grow basis-0 text-sm leading-md" style={{ color: ink }}>{f.label}</div>
                <div className="text-xs leading-[15px]" style={{ color: grau }}>{f.zahl}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-px pt-[14px]">
            <div className="px-[10px] py-[6px] text-2xs font-bold leading-[13px]" style={{ color: grau }}>Intelligente Postfächer</div>
            {POSTFAECHER.map((f) => (
              <div key={f.label} className="flex h-[28px] shrink-0 items-center gap-[10px] rounded-[6px] px-[10px]">
                <svg width="15" height="15" viewBox="0 0 16 16" style={{ flexShrink: 0 }}>{f.icon}</svg>
                <div className="grow basis-0 text-sm leading-md" style={{ color: ink }}>{f.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-px pt-[14px]">
            <div className="px-[10px] py-[6px] text-2xs font-bold leading-[13px]" style={{ color: grau }}>Tags</div>
            {TAGS.map((t) => (
              <div key={t.label} className="flex h-[28px] shrink-0 items-center gap-[10px] rounded-[6px] px-[10px]">
                <div
                  className="size-[11px] shrink-0 rounded-full"
                  style={t.farbe ? { backgroundColor: t.farbe } : { border: '1.3px solid #B4B4B8' }}
                />
                <div className="grow basis-0 text-sm leading-md" style={{ color: ink }}>{t.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Nachrichtenliste */}
        <div className="flex w-[330px] shrink-0 flex-col border-r border-[#DCDCDC] bg-white" style={{ fontFamily: HN }}>
          <div className="flex h-xl shrink-0 items-center justify-end gap-[6px] border-b border-[#E8E8E8] px-md">
            <div className="text-xs leading-[15px]" style={{ color: grau }}>Sortieren nach Datum</div>
            <svg width="10" height="10" viewBox="0 0 12 12" style={{ flexShrink: 0 }}>
              <path d="M3 4.6L6 7.6l3-3" fill="none" stroke={grau} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {liste.map((m, i) => {
            const aktiv = i === 0
            return (
              <motion.div
                key={m.betreff + i}
                initial={i === 0 ? { backgroundColor: '#FFFFFF' } : false}
                animate={{ backgroundColor: aktiv ? '#0B69F0' : '#FFFFFF' }}
                transition={{ duration: 0.35, ease: EASE }}
                className={'flex shrink-0 flex-col gap-[3px] px-md pt-[11px] pb-[13px]' + (i > 0 ? ' border-t border-[#E8E8E8]' : '')}
              >
                <div className="flex items-baseline gap-xs">
                  <div className="grow basis-0 text-sm font-bold leading-[17px]" style={{ color: aktiv ? '#FFFFFF' : ink }}>{m.von}</div>
                  <div className="shrink-0 text-xs leading-[15px]" style={{ color: aktiv ? '#FFFFFFD1' : grau }}>{m.zeit}</div>
                </div>
                <div className="text-sm leading-[17px]" style={{ color: aktiv ? '#FFFFFF' : ink }}>{m.betreff}</div>
                <div className="text-xs leading-md" style={{ color: aktiv ? '#FFFFFFD1' : grau }}>{m.vorschau}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Nachricht */}
        <div className="scrollbar-slim flex grow basis-0 flex-col overflow-y-auto bg-white">
          <div className="flex shrink-0 items-start gap-[14px] border-b border-[#E8E8E8] px-[40px] pt-[22px] pb-[18px]" style={{ fontFamily: HN }}>
            <div className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[#12161B]">
              <div className="text-sm font-medium leading-md text-white">KH</div>
            </div>
            <div className="flex grow basis-0 flex-col gap-[3px]">
              <div className="text-base font-bold leading-[19px]" style={{ color: ink }}>Energieberatung Held</div>
              <div className="text-xs leading-md" style={{ color: grau }}>An: {an}</div>
            </div>
            <div className="flex shrink-0 items-center gap-md">
              <ToolIcon d={<path d="M7.6 5.2L3 9.8l4.6 4.6M3.4 9.8h7.8a5.4 5.4 0 015.4 5.4v1" fill="none" stroke="#4B4B4F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />} />
              <ToolIcon d={<path d="M10.4 4.2L14 7.8l-3.6 3.6M14 7.8H8a5 5 0 00-5 5v2.6" fill="none" stroke="#4B4B4F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />} />
              <div className="text-xs leading-md" style={{ color: grau }}>{datum}</div>
            </div>
          </div>
          <div className="flex grow basis-0 flex-col px-[40px] pt-[30px] pb-[40px]">{children}</div>
        </div>
      </div>

      {overlay}
    </div>
  )
}
