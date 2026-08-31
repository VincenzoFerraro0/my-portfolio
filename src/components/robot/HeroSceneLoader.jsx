import { lazy, Suspense } from 'react'
import { RobotControlsProvider, useRobotControls } from './RobotControlsContext'
import RobotControls from './RobotControls'

// Lazy load del Canvas: il bundle three.js è pesante, lo carichiamo solo quando
// la sezione viene montata. Il Provider sta sopra Canvas + pannello così
// entrambi condividono lo stato.
const HeroScene = lazy(() => import('./HeroScene'))

// Altezza del box. Sul bottom sheet il box CRESCE dell'altezza del pannello
// (h-56 = 14rem) invece di comprimere il canvas: il robot resta grande uguale e
// il pannello si aggiunge sotto. Sul dock laterale l'altezza non cambia — lì si
// restringe solo la larghezza, e il fit-to-frame di RobotModel se ne occupa.
const BOX_CLOSED = 'h-[440px] @md:h-[500px]'
const BOX_OPEN = 'h-[664px] @md:h-[500px]'

// Spazio riservato al pannello dentro il box. Sono le stesse misure usate in
// RobotControls: viewport e pannello si spartiscono il box senza sovrapporsi.
const VIEWPORT_OPEN = 'bottom-56 @md:bottom-0 @md:right-60'

function RobotViewport() {
  const { panelOpen } = useRobotControls()

  return (
    <div
      className={`absolute inset-0 transition-[inset] duration-300 ease-out ${panelOpen ? VIEWPORT_OPEN : ''}`}
    >
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </div>
  )
}

function HeroBox() {
  const { panelOpen } = useRobotControls()

  return (
    <div className={`relative w-full transition-[height] duration-300 ease-out ${panelOpen ? BOX_OPEN : BOX_CLOSED}`}>
      <RobotViewport />
      <RobotControls />
    </div>
  )
}

export default function HeroSceneLoader() {
  return (
    <RobotControlsProvider>
      <HeroBox />
    </RobotControlsProvider>
  )
}
