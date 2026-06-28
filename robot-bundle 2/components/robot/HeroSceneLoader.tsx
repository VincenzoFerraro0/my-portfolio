'use client'

import dynamic from 'next/dynamic'
import { RobotControlsProvider } from './RobotControlsContext'
import RobotControls from './RobotControls'

// Wrapper client-side: Next 16 non permette ssr:false in RSC.
// Il Provider sta sopra Canvas + pannello così entrambi condividono lo stato.
const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
})

export default function HeroSceneLoader() {
  return (
    <RobotControlsProvider>
      <HeroScene />
      <RobotControls />
    </RobotControlsProvider>
  )
}
