import { lazy, Suspense } from 'react'
import { RobotControlsProvider } from './RobotControlsContext'
import RobotControls from './RobotControls'

// Lazy load del Canvas: il bundle three.js è pesante, lo carichiamo solo quando
// la sezione viene montata. Il Provider sta sopra Canvas + pannello così
// entrambi condividono lo stato.
const HeroScene = lazy(() => import('./HeroScene'))

export default function HeroSceneLoader() {
  return (
    <RobotControlsProvider>
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
      <RobotControls />
    </RobotControlsProvider>
  )
}
