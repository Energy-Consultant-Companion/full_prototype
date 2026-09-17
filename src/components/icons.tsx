import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

/* ── Navigation glyphs (full-colour, from the Paper system page) ───────── */

export const IconUeberblick = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <rect x="2.4" y="2.4" width="8.7" height="8.7" rx="3" fill="var(--color-section-ueberblick)" />
    <rect x="12.9" y="2.4" width="8.7" height="8.7" rx="3" fill="var(--color-section-ueberblick-soft)" />
    <rect x="2.4" y="12.9" width="8.7" height="8.7" rx="3" fill="var(--color-section-ueberblick-soft)" />
    <rect x="12.9" y="12.9" width="8.7" height="8.7" rx="3" fill="var(--color-section-ueberblick)" />
  </svg>
)

export const IconFaelle = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M2.4 6.2a3.2 3.2 0 0 1 3.2-3.2h3.7a2.1 2.1 0 0 1 1.63.78l1.57 1.94h6.3a3.2 3.2 0 0 1 3.2 3.2v9.3a3.2 3.2 0 0 1-3.2 3.2H5.6a3.2 3.2 0 0 1-3.2-3.2z" fill="var(--color-section-faelle)" />
    <path d="M2.4 15.2a3.2 3.2 0 0 1 3.2-3.2h12.8a3.2 3.2 0 0 1 3.2 3.2v3a3.2 3.2 0 0 1-3.2 3.2H5.6a3.2 3.2 0 0 1-3.2-3.2z" fill="var(--color-section-faelle-soft)" stroke="var(--color-surface)" strokeWidth="1.8" />
  </svg>
)

export const IconSchritte = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="5.8" fill="var(--color-section-schritte-soft)" />
    <path d="M6.9 12.2 10.3 15.5 17.1 7.9" fill="none" stroke="var(--color-section-schritte)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconUnterlagen = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M4 5.6a3 3 0 0 1 3-3h6.6v4.5a2.4 2.4 0 0 0 2.4 2.4H20v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="var(--color-section-unterlagen-soft)" />
    <path d="M14.2 2.7 20.1 8.6a1 1 0 0 1-.7 1.7h-3a2.4 2.4 0 0 1-2.4-2.4V3.4a1 1 0 0 1 .2-.7z" fill="var(--color-section-unterlagen)" />
    <rect x="7.4" y="12.4" width="9" height="2.4" rx="1.2" fill="var(--color-section-unterlagen)" />
    <rect x="7.4" y="16.3" width="5.8" height="2.4" rx="1.2" fill="var(--color-section-unterlagen)" />
  </svg>
)

export const IconFoerderung = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M12 2.9 20.2 6.1v6.1c0 4.3-3.2 7.8-8.2 9-5-1.2-8.2-4.7-8.2-9V6.1z" fill="var(--color-section-foerderung-soft)" stroke="var(--color-section-foerderung-soft)" strokeWidth="2.6" strokeLinejoin="round" />
    <path d="M12 7.6 16.6 9.4v3.1c0 2.4-1.8 4.4-4.6 5.1-2.8-.7-4.6-2.7-4.6-5.1V9.4z" fill="var(--color-section-foerderung)" stroke="var(--color-section-foerderung)" strokeWidth="2.2" strokeLinejoin="round" />
  </svg>
)

export const IconRegulierungen = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <rect x="3" y="2.8" width="18" height="18.4" rx="4.2" fill="#D9BE9C" />
    <path d="M3 7a4.2 4.2 0 0 1 4.2-4.2h2.6v18.4H7.2A4.2 4.2 0 0 1 3 17z" fill="#96602F" />
    <path d="M13 2.8h3.6v8.8l-1.8-1.7-1.8 1.7z" fill="#96602F" />
  </svg>
)

export const IconAnfragen = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <rect x="2.2" y="4.8" width="19.6" height="15" rx="4.4" fill="var(--color-section-anfragen-soft)" />
    <path d="M2.4 7.4A4.4 4.4 0 0 1 6.6 4.8h10.8a4.4 4.4 0 0 1 4.2 2.6l-7.8 5.9a3.6 3.6 0 0 1-3.6 0z" fill="var(--color-section-anfragen)" />
  </svg>
)

export const IconFragen = (p: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <rect x="7.2" y="2.2" width="14.8" height="11.8" rx="4.4" fill="var(--color-section-fragen)" />
    <path d="M6.5 8.4H12.7A4.6 4.6 0 0 1 17.3 13V15.2A4.6 4.6 0 0 1 12.7 19.8H9.9L5.8 22.6V19.5A4.6 4.6 0 0 1 1.9 15V13A4.6 4.6 0 0 1 6.5 8.4Z" fill="var(--color-section-fragen-soft)" stroke="var(--color-surface)" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
)

/* ── Line glyphs ───────────────────────────────────────────────────────── */

const S = 'var(--color-fg-muted)'

export const IconPanel = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <rect x="1.5" y="2.5" width="13" height="11" rx="2" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" />
    <path d="M10 2.5v11" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" />
  </svg>
)

export const IconSearch = (p: P) => (
  <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <circle cx="7.2" cy="7.2" r="4.5" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" />
    <path d="M10.6 10.6L13.6 13.6" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

export const IconUpload = (p: P) => (
  <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M8 10.6V2.2M4.8 5.4L8 2.2l3.2 3.2M2.6 11.6v1.2a1.4 1.4 0 001.4 1.4h8a1.4 1.4 0 001.4-1.4v-1.2" fill="none" stroke={S} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconPencil = (p: P) => (
  <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M10.8 2.6l2.6 2.6L6 12.6 2.8 13.2l.6-3.2z" fill="none" stroke={S} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)

export const IconDoc = (p: P) => (
  <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M4 2h5l3 3v9H4z" fill="none" stroke={S} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M9 2v3h3M6 9h4M6 11.4h2.6" fill="none" stroke={S} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconMail = (p: P) => (
  <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <rect x="2" y="3.6" width="12" height="8.8" rx="1.4" fill="none" stroke={S} strokeWidth="1.3" />
    <path d="M2.4 4.4L8 8.6l5.6-4.2" fill="none" stroke={S} strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)

export const IconGrid = (p: P) => (
  <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <circle cx="4.3" cy="4.3" r="1.5" fill={S} />
    <circle cx="11.7" cy="4.3" r="1.5" fill={S} />
    <circle cx="4.3" cy="11.7" r="1.5" fill={S} />
    <circle cx="11.7" cy="11.7" r="1.5" fill={S} />
  </svg>
)

export const IconGear = (p: P) => (
  <svg width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.8" />
  </svg>
)

export const IconChevronUpDown = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M4.6 5.6L7 3.2l2.4 2.4M4.6 8.4L7 10.8l2.4-2.4" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconChevronRight = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M5.2 2.8L9.4 7l-4.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconChevronDown = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M3.2 5.2L7 9l3.8-3.8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconArrowRight = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M2.4 7h9.2M8 3.4L11.6 7 8 10.6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconCheck = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M2.8 7.4L5.6 10.2 11.2 3.8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconCheckCircle = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <circle cx="7" cy="7" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4.6 7.1L6.3 8.8 9.5 5.2" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconClock = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <circle cx="7" cy="7" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M7 4.1V7.2l2.1 1.3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconWarning = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M7 1.9L12.8 11.8H1.2z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M7 5.6v2.6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="7" cy="10" r="0.7" fill="currentColor" />
  </svg>
)

export const IconX = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M3.4 3.4l7.2 7.2M10.6 3.4l-7.2 7.2" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

export const IconPlus = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M7 2.4v9.2M2.4 7h9.2" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

export const IconBell = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M8 2.2a3.8 3.8 0 0 1 3.8 3.8v2.4l1 2H3.2l1-2V6A3.8 3.8 0 0 1 8 2.2z" fill="none" stroke={S} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M6.4 12.2a1.7 1.7 0 0 0 3.2 0" fill="none" stroke={S} strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

export const IconShield = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M7 1.6l4.6 1.8v3.4c0 2.4-1.8 4.4-4.6 5.1-2.8-.7-4.6-2.7-4.6-5.1V3.4z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M5 7l1.5 1.5L9.2 5.4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconBulb = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M7 1.7a3.7 3.7 0 0 1 2.2 6.7c-.4.3-.6.7-.6 1.2H5.4c0-.5-.2-.9-.6-1.2A3.7 3.7 0 0 1 7 1.7z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M5.6 11.4h2.8M6.2 12.8h1.6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

export const IconSend = (p: P) => (
  <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M14 2L7.2 9M14 2l-4.4 12-2.4-5-5-2.4z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)

export const IconBook = (p: P) => (
  <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M2.2 3.2a1.4 1.4 0 0 1 1.4-1.4H7v11.6H3.6a1.4 1.4 0 0 0-1.4 1.4z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M13.8 3.2a1.4 1.4 0 0 0-1.4-1.4H9v11.6h3.4a1.4 1.4 0 0 1 1.4 1.4z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)

export const IconChat = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M2 4.2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3.6a2 2 0 0 1-2 2H6.2L3.4 12V9.8H4a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)

export const IconFolder = (p: P) => (
  <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M1.8 4a1.8 1.8 0 0 1 1.8-1.8h2.1c.4 0 .8.2 1 .5L7.6 4h4.6A1.8 1.8 0 0 1 14 5.8v6A1.8 1.8 0 0 1 12.2 13.6H3.6A1.8 1.8 0 0 1 1.8 11.8z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)

export const IconLink = (p: P) => (
  <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M6.6 9.4a2.6 2.6 0 0 0 3.8 0l2-2a2.7 2.7 0 0 0-3.8-3.8L7.4 4.8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M9.4 6.6a2.6 2.6 0 0 0-3.8 0l-2 2a2.7 2.7 0 0 0 3.8 3.8l1.2-1.2" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

export const IconCopy = (p: P) => (
  <svg width="15" height="15" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <rect x="5" y="5" width="8.4" height="8.4" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M11 5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5.5A1.5 1.5 0 0 0 4 11h1" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

export const IconSparkle = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M7 1.4l1.25 3.35L11.6 6 8.25 7.25 7 10.6 5.75 7.25 2.4 6l3.35-1.25z" fill="currentColor" />
    <path d="M11.4 9.2l.5 1.3 1.3.5-1.3.5-.5 1.3-.5-1.3-1.3-.5 1.3-.5z" fill="currentColor" />
  </svg>
)

export const IconPaperclip = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M11.3 6.6l-4.5 4.5a2.9 2.9 0 0 1-4.1-4.1l4.8-4.8a1.9 1.9 0 0 1 2.7 2.7l-4.8 4.8a.9.9 0 0 1-1.3-1.3l4.2-4.2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconFile = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M3.4 2.2h4.4l2.8 2.8v6.8H3.4z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M7.8 2.2v2.8h2.8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)

export const IconTrendUp = (p: P) => (
  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <path d="M2 10.2L5.4 6.6 7.8 9 12 4.4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.2 4.2H12v2.8" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconDots = (p: P) => (
  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} {...p}>
    <circle cx="3.6" cy="8" r="1.3" fill="currentColor" />
    <circle cx="8" cy="8" r="1.3" fill="currentColor" />
    <circle cx="12.4" cy="8" r="1.3" fill="currentColor" />
  </svg>
)
