/* Ordner- und Schrittsymbole aus dem Entwurf */

const S = ({ children, size = 36 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    {children}
  </svg>
)

export const OrdnerKundendaten = (p: { size?: number }) => (
  <S {...p}>
    <rect x="2.6" y="4.4" width="18.8" height="15.2" rx="3.2" fill="var(--color-accent-green-soft)" />
    <circle cx="8.6" cy="10.4" r="2.9" fill="var(--color-accent-green)" />
    <path d="M5.2 16.8a3.4 3.4 0 0 1 6.8 0z" fill="var(--color-accent-green)" />
    <rect x="13.8" y="9" width="5.4" height="2.2" rx="1.1" fill="var(--color-accent-green)" />
    <rect x="13.8" y="12.8" width="3.4" height="2.2" rx="1.1" fill="var(--color-accent-green)" />
  </S>
)

export const OrdnerGebaeude = (p: { size?: number }) => (
  <S {...p}>
    <path d="M4.2 10.6 12 4.4l7.8 6.2v8.4a2.2 2.2 0 0 1-2.2 2.2H6.4a2.2 2.2 0 0 1-2.2-2.2z" fill="var(--color-accent-sky-soft)" />
    <path d="M1.9 11.1 11.1 3.4a1.4 1.4 0 0 1 1.8 0l9.2 7.7a1.1 1.1 0 0 1-.7 1.9H2.6a1.1 1.1 0 0 1-.7-1.9z" fill="var(--color-accent-sky)" />
    <rect x="10.4" y="14.6" width="4.6" height="6.6" rx="1.4" fill="var(--color-accent-sky)" />
    <rect x="6.4" y="14.6" width="2.6" height="2.6" rx="1.3" fill="var(--color-accent-sky)" />
  </S>
)

export const OrdnerBerechnungen = (p: { size?: number }) => (
  <S {...p}>
    <rect x="3.6" y="2.8" width="16.8" height="18.4" rx="3.2" fill="var(--color-accent-brand-soft)" />
    <rect x="6.4" y="5.6" width="11.2" height="4.2" rx="1.4" fill="var(--color-accent-brand)" />
    <circle cx="8" cy="13.4" r="1.5" fill="var(--color-accent-brand)" />
    <circle cx="12" cy="13.4" r="1.5" fill="var(--color-accent-brand)" />
    <circle cx="8" cy="17.6" r="1.5" fill="var(--color-accent-brand)" />
    <circle cx="12" cy="17.6" r="1.5" fill="var(--color-accent-brand)" />
    <rect x="14.6" y="11.9" width="3" height="7.2" rx="1.5" fill="var(--color-accent-brand)" />
  </S>
)

export const OrdnerFoerderweg = (p: { size?: number }) => (
  <S {...p}>
    <path d="M5.6 4.8h7.8a3.7 3.7 0 0 1 0 7.4H8.4a3.5 3.5 0 0 0 0 7h9.4" fill="none" stroke="var(--color-accent-violet-soft)" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="5.6" cy="4.8" r="2.8" fill="var(--color-accent-violet)" />
    <circle cx="17.8" cy="19.2" r="3.4" fill="var(--color-accent-violet)" />
  </S>
)

export const OrdnerKommunikation = (p: { size?: number }) => (
  <S {...p}>
    <rect x="2.2" y="5.2" width="19.6" height="14.4" rx="3.2" fill="var(--color-accent-teal-soft)" />
    <path d="M4.6 7.8 11 12.6a1.7 1.7 0 0 0 2 0l6.4-4.8" fill="none" stroke="var(--color-accent-teal)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="19.4" cy="5.4" r="3.4" fill="var(--color-accent-teal)" />
    <rect x="5.4" y="15.2" width="8" height="2.2" rx="1.1" fill="var(--color-accent-teal)" />
  </S>
)

export const OrdnerWeiteres = (p: { size?: number }) => (
  <S {...p}>
    <path d="M3.6 9.4h16.8v9.4a2.6 2.6 0 0 1-2.6 2.6H6.2a2.6 2.6 0 0 1-2.6-2.6z" fill="var(--color-accent-amber-soft)" />
    <rect x="2" y="3.6" width="20" height="5.8" rx="2" fill="var(--color-accent-amber)" />
    <rect x="8.6" y="12.6" width="6.8" height="2.6" rx="1.3" fill="var(--color-accent-amber)" />
  </S>
)

/* ── Schritte im Fortschrittsband ──────────────────────────────────────── */

export const SchrittGespraech = (
  <S size={19}>
    <rect x="7.2" y="2.2" width="14.8" height="11.8" rx="4.4" fill="var(--color-accent-teal)" />
    <path d="M6.5 8.4H12.7A4.6 4.6 0 0 1 17.3 13V15.2A4.6 4.6 0 0 1 12.7 19.8H9.9L5.8 22.6V19.5A4.6 4.6 0 0 1 1.9 15V13A4.6 4.6 0 0 1 6.5 8.4Z" fill="var(--color-accent-teal-soft)" stroke="var(--color-accent-teal-wash)" strokeWidth="1.8" strokeLinejoin="round" />
  </S>
)

export const SchrittVertrag = (
  <S size={19}>
    <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="5.8" fill="var(--color-accent-sky-soft)" />
    <path d="M6.2 16c2.3-7 3.8-6.8 4.6-2.6.6 3.3 1.9 3.7 3.1 1.5" fill="none" stroke="var(--color-accent-sky)" strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="17.6" cy="15.2" r="1.8" fill="var(--color-accent-sky)" />
  </S>
)

export const SchrittUnterlagen = (
  <S size={19}>
    <path d="M4 5.6a3 3 0 0 1 3-3h6.6v4.5a2.4 2.4 0 0 0 2.4 2.4H20v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="var(--color-accent-pink-soft)" />
    <path d="M14.2 2.7 20.1 8.6a1 1 0 0 1-.7 1.7h-3a2.4 2.4 0 0 1-2.4-2.4V3.4a1 1 0 0 1 .2-.7z" fill="var(--color-accent-pink)" />
    <rect x="7.4" y="12.4" width="9" height="2.4" rx="1.2" fill="var(--color-accent-pink)" />
    <rect x="7.4" y="16.3" width="5.8" height="2.4" rx="1.2" fill="var(--color-accent-pink)" />
  </S>
)

export const SchrittTermin = (
  <S size={19}>
    <path d="M4.6 10.2h14.8v8.6a2.4 2.4 0 0 1-2.4 2.4H7a2.4 2.4 0 0 1-2.4-2.4z" fill="var(--color-border-strong)" />
    <path d="M12 2.8 21.3 9.6a1.2 1.2 0 0 1-.7 2.2H3.4a1.2 1.2 0 0 1-.7-2.2z" fill="var(--color-fg-subtle)" />
    <rect x="9.8" y="14.6" width="4.4" height="6.6" rx="1.4" fill="var(--color-fg-subtle)" />
  </S>
)

export const SchrittFahrplan = (
  <S size={19}>
    <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="5.8" fill="var(--color-border-strong)" />
    <path d="M6.8 17.2 10.6 12.2 14 14.4 17.4 8.4" fill="none" stroke="var(--color-fg-subtle)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="17.4" cy="8.4" r="2.2" fill="var(--color-fg-subtle)" />
  </S>
)

export const SchrittErgebnis = (
  <S size={19}>
    <path d="M12 2.9 20.2 6.1v6.1c0 4.3-3.2 7.8-8.2 9-5-1.2-8.2-4.7-8.2-9V6.1z" fill="var(--color-border-strong)" stroke="var(--color-border-strong)" strokeWidth="2.6" strokeLinejoin="round" />
    <path d="M12 7.6 16.6 9.4v3.1c0 2.4-1.8 4.4-4.6 5.1-2.8-.7-4.6-2.7-4.6-5.1V9.4z" fill="var(--color-fg-subtle)" stroke="var(--color-fg-subtle)" strokeWidth="2.2" strokeLinejoin="round" />
  </S>
)
