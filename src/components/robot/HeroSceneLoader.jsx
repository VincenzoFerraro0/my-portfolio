import { lazy, Suspense } from 'react'
import { RobotControlsProvider, useRobotControls } from './RobotControlsContext'
import RobotControls from './RobotControls'

// Lazy load del Canvas: il bundle three.js è pesante, lo carichiamo solo quando
// la sezione viene montata. Il Provider sta sopra Canvas + pannello così
// entrambi condividono lo stato.
const HeroScene = lazy(() => import('./HeroScene'))

// Larghezza/altezza riservate al pannello. Sono le stesse misure usate in
// RobotControls: viewport e pannello si spartiscono il box senza sovrapporsi.
// Container query (non media query): quello che conta è quanto è largo il box
// del robot, non la viewport — così il layout regge anche se la sezione cambia.
const VIEWPORT_OPEN = 'bottom-48 @md:bottom-0 @md:right-60'

// Il viewport 3D si restringe quando il pannello è aperto: la camera di
// HeroScene ricalcola la fov sul nuovo aspect ratio, quindi il robot resta
// interamente visibile invece di finire sotto al pannello.
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

export default function HeroSceneLoader() {
  return (
    <RobotControlsProvider>
      {/* `@container` rende il box il riferimento delle container query usate
          qui e nel pannello. */}
      <div className="@container absolute inset-0">
        <RobotViewport />
        <RobotControls />
      </div>
    </RobotControlsProvider>
  )
}
