import { Suspense, useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Environment, Preload } from '@react-three/drei'
import * as THREE from 'three'
import RobotModel from './RobotModel'

// Hook minimale: rileva mobile via matchMedia. Sta fuori dal Canvas perché
// va valutato anche per scegliere i parametri del WebGL renderer.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px), (pointer: coarse)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isMobile
}

// Adatta la fov al rapporto d'aspetto: portrait → fov più ampia per non tagliare il robot.
// Valori abbassati: il modello RobotExpressive è alto ~4u, quindi una fov stretta lo
// faceva debordare dal frame (testa tagliata) — qui lasciamo aria sopra e sotto.
function ResponsiveCamera() {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return
    const aspect = size.width / size.height
    camera.fov = aspect < 1 ? 38 : aspect < 1.4 ? 32 : 28
    // Il robot è centrato sull'origine (vedi RobotModel): punto la camera lì
    // così il framing è deterministico e non dipende dal default di R3F.
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera, size])

  return null
}

export default function HeroScene() {
  const isMobile = useIsMobile()

  return (
    <Canvas
      camera={{ position: [0, 1.8, 11], fov: 28 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      // Antialias off su mobile: il MSAA WebGL è uno dei peggiori killer di FPS
      // su GPU integrate. La differenza visiva è quasi invisibile su display denso.
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
        // stencil/depth disabilitabili se non servono ombre/effetti — qui niente ombre.
        stencil: false,
      }}
      // Cap del DPR: mobile ad alta densità (3x) ucciderebbe il fillrate.
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      // R3F adaptive: scala la qualità sotto stress, performance.current va da 0 a 1.
      performance={{ min: 0.5 }}
      // Niente shadowMap (non lo usiamo) — risparmia un render pass.
      shadows={false}
    >
      <ResponsiveCamera />

      {/* Lighting calibrato sul tema dark + acid (#AAFF00). Su mobile rimuovo
          il point light colorato: una luce in meno = meno costo per-fragment. */}
      <ambientLight intensity={isMobile ? 0.4 : 0.25} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
      {!isMobile && <pointLight position={[-4, 2, -3]} intensity={2} color="#aaff00" />}

      <Suspense fallback={null}>
        <RobotModel />
        <Preload all />
      </Suspense>

      {/* Environment HDR: bellissimo ma pesante (genera PMREM per IBL).
          Su mobile lo skippo, l'illuminazione directional+ambient basta. */}
      {!isMobile && <Environment preset="night" />}

      {/* Auto-throttling: AdaptiveDpr abbassa il pixel ratio quando il frame
          rate cala, AdaptiveEvents downsamplea il raycasting durante il drag. */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  )
}
