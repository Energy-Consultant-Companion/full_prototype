import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

export type Kanal = 'mail' | 'portal'
export type AnfrageStatus = 'offen' | 'angenommen' | 'nachgefragt' | 'abgesagt'

export interface Anfrage {
  gebaeude: string
  vorhaben: string
  zeitpunkt: string
  text: string
  name: string
  anrede: string
  ort: string
  mail: string
}

export interface Toast {
  id: number
  title: string
  body?: string
  tone?: 'neutral' | 'brand' | 'success' | 'error'
}

interface Demo {
  /* Erstanfrage der Kundschaft */
  anfrage: Anfrage
  setAnfrage: (patch: Partial<Anfrage>) => void
  anfrageGesendet: boolean
  sendeAnfrage: () => void

  /* Beraterinnen-Seite */
  status: AnfrageStatus
  setStatus: (s: AnfrageStatus) => void

  /* Kanalwahl der Kundschaft */
  kanal: Kanal | null
  setKanal: (k: Kanal | null) => void
  portalFrei: boolean
  setPortalFrei: (v: boolean) => void
  mailBeantwortet: boolean
  setMailBeantwortet: (v: boolean) => void

  /* Fall, der aus der Anfrage entsteht */
  neuerFall: boolean

  /* Toasts */
  toasts: Toast[]
  toast: (t: Omit<Toast, 'id'>) => void
  dismiss: (id: number) => void

  /* Demo-Navigator */
  navOffen: boolean
  setNavOffen: (v: boolean) => void

  /* Globale Suche */
  sucheOffen: boolean
  setSucheOffen: (v: boolean) => void

  /* Aktionsmenü (⌘P) */
  menueOffen: boolean
  setMenueOffen: (v: boolean) => void
}

const Ctx = createContext<Demo | null>(null)

const START: Anfrage = {
  gebaeude: 'Einfamilienhaus',
  vorhaben: 'Heizung tauschen',
  zeitpunkt: 'In drei bis sechs Monaten',
  text: 'Unsere Ölheizung ist von 1998 und war letzten Winter zweimal aus. Wir würden auf Wärmepumpe wechseln, wissen aber nicht, ob das Haus dafür überhaupt gedämmt genug ist. Baujahr 1972, wir haben 1998 neue Fenster einbauen lassen.',
  name: 'Tobias Sander',
  anrede: 'Herr Sander',
  ort: '31224 Peine',
  mail: 't.sander@posteo.de',
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [anfrage, setAnfrageState] = useState<Anfrage>(START)
  const [anfrageGesendet, setGesendet] = useState(false)
  const [status, setStatus] = useState<AnfrageStatus>('offen')
  const [kanal, setKanal] = useState<Kanal | null>(null)
  const [portalFrei, setPortalFrei] = useState(false)
  const [mailBeantwortet, setMailBeantwortet] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [navOffen, setNavOffen] = useState(true)
  const [sucheOffen, setSucheOffen] = useState(false)
  const [menueOffen, setMenueOffen] = useState(false)
  const seq = useRef(0)

  const setAnfrage = useCallback((patch: Partial<Anfrage>) => {
    setAnfrageState((a) => ({ ...a, ...patch }))
  }, [])

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const toast = useCallback(
    (t: Omit<Toast, 'id'>) => {
      const id = ++seq.current
      setToasts((prev) => [...prev, { ...t, id }])
      window.setTimeout(() => dismiss(id), 5200)
    },
    [dismiss],
  )

  const value = useMemo<Demo>(
    () => ({
      anfrage,
      setAnfrage,
      anfrageGesendet,
      sendeAnfrage: () => setGesendet(true),
      status,
      setStatus,
      kanal,
      setKanal,
      portalFrei,
      setPortalFrei,
      mailBeantwortet,
      setMailBeantwortet,
      neuerFall: status === 'angenommen',
      toasts,
      toast,
      dismiss,
      navOffen,
      setNavOffen,
      sucheOffen,
      setSucheOffen,
      menueOffen,
      setMenueOffen,
    }),
    [anfrage, setAnfrage, anfrageGesendet, status, kanal, portalFrei, mailBeantwortet, toasts, toast, dismiss, navOffen, sucheOffen, menueOffen],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useDemo() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useDemo muss innerhalb von DemoProvider benutzt werden')
  return v
}
