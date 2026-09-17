import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { navigate, useRoute } from './lib/router'
import Buehne from './components/Buehne'
import DemoNavigator from './components/DemoNavigator'
import Toasts from './components/Toasts'
import Platzhalter from './components/Platzhalter'
import Website from './screens/Website'
import Erstanfrage from './screens/Erstanfrage'
import Mail from './screens/Mail'
import Portal from './screens/Portal'
import PortalInfos from './screens/PortalInfos'
import Anfragen from './screens/app/Anfragen'
import Ueberblick from './screens/app/Ueberblick'
import Faelle from './screens/app/Faelle'
import Fall from './screens/app/Fall'
import NaechsteSchritte from './screens/app/NaechsteSchritte'
import Fragen from './screens/app/Fragen'
import Unterlagen from './screens/app/Unterlagen'
import Foerderung from './screens/app/Foerderung'
import Regulierungen from './screens/app/Regulierungen'
import Einstellungen from './screens/app/Einstellungen'
import Suche from './components/Suche'
import Aktionsmenue from './components/Aktionsmenue'
import FallAnlegen from './components/FallAnlegen'
import { useDemo } from './lib/store'

const NAV = 312

function Bildschirm({ path }: { path: string }) {
  if (path === '/website') return <Website />

  if (path.startsWith('/anfrage/')) {
    const s = path.split('/')[2] as 'gebaeude' | 'vorhaben' | 'zeitpunkt' | 'anliegen' | 'gesendet'
    return <Erstanfrage schritt={s} />
  }

  if (path.startsWith('/mail/')) {
    const s = path.split('/')[2] as 'zugang' | 'antwort' | 'bestaetigt' | 'erinnerung'
    return <Mail art={s} />
  }

  if (path === '/portal') return <Portal />
  if (path === '/portal/informationen') return <PortalInfos />

  if (path === '/app/anfragen') return <Anfragen />
  if (path === '/app/ueberblick') return <Ueberblick />
  if (path === '/app/faelle' || path.startsWith('/app/suche') || path.startsWith('/app/faelle/neu')) return <Faelle />

  if (path.startsWith('/app/fall/')) {
    const teile = path.split('/').filter(Boolean)
    const fallId = teile[2]
    const tab = teile.slice(3).join('/')
    return <Fall fallId={fallId} tab={tab} />
  }

  if (path === '/app/schritte') return <NaechsteSchritte />

  if (path.startsWith('/app/fragen')) {
    const t = path.split('/')[3]
    return <Fragen ansicht={t === 'antwort' ? 'antwort' : t === 'neu' ? 'neu' : 'liste'} frageId={path.split('/')[4] ?? 'reuter'} />
  }

  if (path.startsWith('/app/unterlagen')) {
    const t = path.split('/')[3]
    return <Unterlagen ansicht={t === 'pruefung' ? 'pruefung' : t === 'gegenpruefen' ? 'gegenpruefen' : 'eingang'} />
  }

  if (path.startsWith('/app/foerderung')) {
    const t = path.split('/')[3]
    return <Foerderung ansicht={t === 'ergebnisse' ? 'ergebnisse' : t === 'programm' ? 'programm' : 'start'} />
  }

  if (path.startsWith('/app/regulierungen')) {
    const t = path.split('/')[3]
    return <Regulierungen ansicht={t === 'antwort' ? 'antwort' : t === 'aenderungen' ? 'aenderungen' : 'frage'} />
  }

  if (path.startsWith('/app/einstellungen')) {
    return <Einstellungen ansicht={path.endsWith('vorlagen') ? 'vorlagen' : 'profil'} />
  }

  return <Platzhalter titel={path} />
}

/** Bildschirme, die beim Wechsel nicht komplett neu aufgebaut werden sollen */
function schluessel(path: string) {
  if (path.startsWith('/anfrage')) return '/anfrage'
  if (path.startsWith('/mail')) return '/mail'
  if (path.startsWith('/app/fall/')) return '/app/fall/' + path.split('/')[3]
  if (path.startsWith('/app/fragen')) return '/app/fragen'
  if (path.startsWith('/app/suche')) return '/app/faelle'
  if (path.startsWith('/app/faelle/neu')) return '/app/faelle'
  if (path === '/app/foerderung/programm') return '/app/foerderung/ergebnisse'
  if (path.startsWith('/app/regulierungen')) return '/app/regulierungen'
  if (path.startsWith('/app/einstellungen')) return '/app/einstellungen'
  return path
}

export default function App() {
  const path = useRoute()
  const { navOffen, sucheOffen, setSucheOffen, menueOffen, setMenueOffen } = useDemo()
  const [fenster, setFenster] = useState(() => window.innerWidth)

  useEffect(() => {
    const auf = () => setFenster(window.innerWidth)
    window.addEventListener('resize', auf)
    return () => window.removeEventListener('resize', auf)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && e.metaKey) {
        e.preventDefault()
        setSucheOffen(true)
      }
      if (e.key.toLowerCase() === 'p' && e.metaKey) {
        e.preventDefault()
        setMenueOffen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setSucheOffen, setMenueOffen])

  const breite = Math.max(640, fenster - (navOffen ? NAV : 0))

  return (
    <div className="relative h-screen overflow-hidden">
      <Buehne breite={breite}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={schluessel(path)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="relative h-full"
          >
            <Bildschirm path={path} />
            <FallAnlegen
              offen={path.startsWith('/app/faelle/neu')}
              quelleStart={path.endsWith('neu-projekt') ? 'projekt' : 'unterlagen'}
            />
            <Aktionsmenue
              offen={menueOffen || path.endsWith('/aktionen')}
              kontext={path.startsWith('/app/fall/reuter') ? 'BUCHENWEG 14' : undefined}
              onSchliessen={() => {
                setMenueOffen(false)
                if (path.endsWith('/aktionen')) navigate(path.replace(/\/aktionen$/, ''))
              }}
            />
            <Suche
              offen={sucheOffen || path.startsWith('/app/suche')}
              imFall={path === '/app/suche/fall'}
              onSchliessen={() => {
                setSucheOffen(false)
                if (path.startsWith('/app/suche')) navigate('/app/faelle')
              }}
            />
          </motion.div>
        </AnimatePresence>
      </Buehne>
      <Toasts />
      <DemoNavigator />
    </div>
  )
}
