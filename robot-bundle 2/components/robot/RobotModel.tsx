'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import type { Mesh } from 'three'
import { EXPRESSIONS, useRobotControls } from './RobotControlsContext'

const MODEL_URL = '/models/RobotExpressive_OPIA.glb'

// Le emote partono al click, vanno in fade-out e tornano allo state base.
const ONE_SHOT_EMOTES = new Set<string>(['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'])
// Gli stati "terminali" si fermano sull'ultimo frame e restano in posa
// (Death=robot disteso, Sitting=seduto, Standing=in piedi). Senza questi flag
// la clip andrebbe in loop e l'animazione ripartirebbe da capo all'infinito.
const TERMINAL_STATES = new Set<string>(['Death', 'Sitting', 'Standing'])

export default function RobotModel() {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(MODEL_URL)
  const { actions, mixer } = useAnimations(animations, group)
  const viewportWidth = useThree((state) => state.size.width)

  const { state, emoteSignal, expressions } = useRobotControls()

  // Layout responsive del robot: scala e posizione cambiano con la viewport.
  const { scale, position } = useMemo<{
    scale: number
    position: [number, number, number]
  }>(() => {
    if (viewportWidth < 640) return { scale: 0.42, position: [0, -2.4, 0] }
    if (viewportWidth < 768) return { scale: 0.5, position: [0.3, -2.3, 0] }
    if (viewportWidth < 1024) return { scale: 0.6, position: [1.1, -2.2, 0] }
    if (viewportWidth < 1536) return { scale: 0.7, position: [1.8, -2.1, 0] }
    return { scale: 0.8, position: [2.4, -2.0, 0] }
  }, [viewportWidth])

  // Action attiva corrente (per gestire le crossfade).
  const activeActionRef = useRef<THREE.AnimationAction | null>(null)
  // Stato base aggiornato via ref: serve dentro listener "finished" delle emote
  // per tornare allo state corretto senza dipendenze rinnovate.
  const baseStateRef = useRef(state)
  baseStateRef.current = state

  // Mesh (uno o più) con i morph target delle espressioni — il modello custom
  // ha le morph sul mesh "Head", ma potrebbe averne su più mesh figli a seconda
  // dell'esportazione, quindi raccogliamo tutti i candidati.
  const faceMeshesRef = useRef<Array<{ mesh: Mesh; idx: Partial<Record<string, number>> }>>([])

  // Setup clip one-shot e stati terminali (clamp sull'ultima posa).
  useEffect(() => {
    if (!actions) return
    for (const name of Object.keys(actions)) {
      const action = actions[name]
      if (!action) continue
      if (ONE_SHOT_EMOTES.has(name) || TERMINAL_STATES.has(name)) {
        action.clampWhenFinished = true
        action.loop = THREE.LoopOnce
      }
    }
  }, [actions])

  // Setup morph target — separato dalle clip così non si re-runna inutilmente.
  useEffect(() => {
    const collected: Array<{ mesh: Mesh; idx: Partial<Record<string, number>> }> = []
    scene.traverse((obj) => {
      const m = obj as Mesh
      const dict = m.morphTargetDictionary
      if (!dict || !m.morphTargetInfluences) return
      const found: Partial<Record<string, number>> = {}
      let hasAny = false
      for (const ex of EXPRESSIONS) {
        const i = dict[ex]
        if (typeof i === 'number') {
          found[ex] = i
          hasAny = true
        }
      }
      if (hasAny) collected.push({ mesh: m, idx: found })
    })
    faceMeshesRef.current = collected
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log('[RobotModel] morph targets trovati su:', collected.map((c) => c.mesh.name))
    }
  }, [scene])

  // Helper: crossfade verso una clip qualsiasi.
  const fadeTo = (name: string, duration: number) => {
    if (!actions) return
    const next = actions[name]
    if (!next) return
    const prev = activeActionRef.current
    if (prev && prev !== next) prev.fadeOut(duration)
    next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play()
    activeActionRef.current = next
  }

  // Cambio di stato base dal pannello → crossfade verso la nuova clip.
  // Per gli stati terminali la clip parte una volta sola e si congela
  // sull'ultimo frame grazie a clampWhenFinished impostato sopra.
  useEffect(() => {
    if (!actions) return
    fadeTo(state, 0.5)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, actions])

  // Trigger emote one-shot dal pannello → riproduci e poi torna allo state base.
  // Uso un timeout sulla durata della clip invece di un listener "finished"
  // globale: così non c'è il rischio che lo stato terminale Death (anch'esso
  // one-shot) faccia partire un fadeTo indesiderato a fine animazione.
  useEffect(() => {
    if (!actions || !emoteSignal.name) return
    const action = actions[emoteSignal.name]
    if (!action) return

    fadeTo(emoteSignal.name, 0.25)
    const ms = action.getClip().duration * 1000
    const t = setTimeout(() => fadeTo(baseStateRef.current, 0.3), ms)

    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emoteSignal.nonce, actions])

  // Applica i valori degli slider espressioni ai morph target ad ogni frame.
  // Scrive su tutti i mesh che hanno almeno una morph rilevante.
  useFrame(() => {
    for (const { mesh, idx } of faceMeshesRef.current) {
      const inf = mesh.morphTargetInfluences
      if (!inf) continue
      for (const ex of EXPRESSIONS) {
        const i = idx[ex]
        if (typeof i === 'number') inf[i] = expressions[ex]
      }
    }
  })

  return (
    <group ref={group} position={position} rotation={[0, -0.35, 0]} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload(MODEL_URL)
