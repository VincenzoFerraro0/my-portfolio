import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { EXPRESSIONS, useRobotControls } from './RobotControlsContext'

// Un solo .glb per entrambi i temi. La vecchia variante `pkgrobot_viola.glb`
// era esportata con un rig diverso (le clip animavano anche i nodi mesh, non
// solo le ossa) e in light mode il robot si deformava. Qui carichiamo sempre
// il modello buono e cambiamo a runtime solo il colore del materiale accent.
const MODEL_URL = '/models/pkgrobot.glb'

// Accent per tema: lime in dark (è il colore nativo del modello), indigo in
// light — la stessa coppia usata nel resto del sito.
const ACCENT_DARK = '#aaff00'
const ACCENT_LIGHT = '#5e67e6'
// Rapporto emissive/base del materiale originale: replicandolo, la variante
// indigo conserva lo stesso "glow" di quella lime.
const EMISSIVE_RATIO = 0.15
// Nome del materiale colorato dentro il .glb (gli altri sono grigio e nero).
const ACCENT_MATERIAL = 'Main'

// Osserva la classe `dark` su document.documentElement e ritorna lo stato.
function useIsDark() {
  const [isDark, setIsDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'),
  )
  useEffect(() => {
    const el = document.documentElement
    const update = () => setIsDark(el.classList.contains('dark'))
    update()
    const obs = new MutationObserver(update)
    obs.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return isDark
}

// Le emote partono al click, vanno in fade-out e tornano allo state base.
const ONE_SHOT_EMOTES = new Set(['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'])
// Gli stati "terminali" si fermano sull'ultimo frame e restano in posa
// (Death=robot disteso, Sitting=seduto, Standing=in piedi). Senza questi flag
// la clip andrebbe in loop e l'animazione ripartirebbe da capo all'infinito.
const TERMINAL_STATES = new Set(['Death', 'Sitting', 'Standing'])

export default function RobotModel() {
  const group = useRef(null)
  const isDark = useIsDark()
  const { scene, animations } = useGLTF(MODEL_URL)
  const { actions } = useAnimations(animations, group)

  const { state, emoteSignal, expressions } = useRobotControls()

  // Framing deterministico: misuro la bounding box reale del modello, lo riscalo
  // a un'altezza target (TARGET_H unità di mondo) e lo centro sull'ORIGINE del
  // mondo. La camera guarda (0,0,0) (vedi ResponsiveCamera in HeroScene), quindi
  // centrando la bbox sull'origine il robot è centrato nel frame e la testa non
  // viene mai tagliata, qualunque sia la viewport.
  //
  // Frame visibile (peggior caso fov 28 @ distanza 11): ~5.48u in altezza →
  // TARGET_H 4.4 lascia margine sopra/sotto su tutti i breakpoint.
  const { scale, position } = useMemo(() => {
    const TARGET_H = 4.4
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const s = size.y > 0 ? TARGET_H / size.y : 1
    // Compenso il centro della bbox così, dopo la scala, finisce sull'origine.
    // La rotazione attorno a Y non altera la quota; x/z del centro sono ~0.
    return { scale: s, position: [-s * center.x, -s * center.y, -s * center.z] }
  }, [scene])

  // Action attiva corrente (per gestire le crossfade).
  const activeActionRef = useRef(null)
  // Stato base aggiornato via ref: serve dentro listener "finished" delle emote
  // per tornare allo state corretto senza dipendenze rinnovate.
  const baseStateRef = useRef(state)
  baseStateRef.current = state

  // Mesh (uno o più) con i morph target delle espressioni — il modello custom
  // ha le morph sul mesh "Head", ma potrebbe averne su più mesh figli a seconda
  // dell'esportazione, quindi raccogliamo tutti i candidati.
  const faceMeshesRef = useRef([])

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
    const collected = []
    scene.traverse((obj) => {
      const m = obj
      const dict = m.morphTargetDictionary
      if (!dict || !m.morphTargetInfluences) return
      const found = {}
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
    if (import.meta.env.DEV) {
      console.log('[RobotModel] morph targets trovati su:', collected.map((c) => c.mesh.name))
    }
  }, [scene])

  // Tint del materiale accent in base al tema. Il materiale è condiviso tra
  // più mesh, quindi lo tocco una volta sola (dedup per uuid).
  useEffect(() => {
    const color = new THREE.Color(isDark ? ACCENT_DARK : ACCENT_LIGHT)
    const seen = new Set()
    scene.traverse((obj) => {
      const mats = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : []
      for (const mat of mats) {
        if (mat.name !== ACCENT_MATERIAL || seen.has(mat.uuid)) continue
        seen.add(mat.uuid)
        mat.color.copy(color)
        if (mat.emissive) mat.emissive.copy(color).multiplyScalar(EMISSIVE_RATIO)
      }
    })
  }, [scene, isDark])

  // Helper: crossfade verso una clip qualsiasi.
  const fadeTo = (name, duration) => {
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
