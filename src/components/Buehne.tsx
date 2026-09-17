import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

/* Der Entwurf ist auf 1440 px gezeichnet. Ist weniger Platz da, wird die
   ganze Bühne herunterskaliert, statt das Layout zu stauchen. Ist mehr
   Platz da, darf die App ihn nutzen. */

const ENTWURF = 1440

export default function Buehne({ breite, children }: { breite: number; children: ReactNode }) {
  const [hoehe, setHoehe] = useState(() => window.innerHeight)

  useEffect(() => {
    const auf = () => setHoehe(window.innerHeight)
    window.addEventListener('resize', auf)
    return () => window.removeEventListener('resize', auf)
  }, [])

  const skala = breite >= ENTWURF ? 1 : breite / ENTWURF
  const innen = breite >= ENTWURF ? breite : ENTWURF

  return (
    <div
      style={{
        width: breite,
        height: hoehe,
        /* clip statt hidden: die Bühne ist gestaucht, also glaubt der Browser,
           der Inhalt rage heraus — mit `hidden` liesse er sich wegscrollen. */
        overflow: 'clip',
      }}
    >
      <div
        style={{
          width: innen,
          height: hoehe / skala,
          transform: skala === 1 ? undefined : `scale(${skala})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}
