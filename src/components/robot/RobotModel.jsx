import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
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

// Frazione del frame occupata dal robot. La bounding box su cui si calcola è
// quella reale della clip in corso, quindi qui serve solo aria estetica.
const FILL = 0.9
// Pose campionate per clip per ricavarne l'ingombro massimo.
const POSE_SAMPLES = 16
// Costanti di tempo (secondi) dell'adattamento dell'inquadratura. Allargare è
// molto più rapido di richiudere: una posa che sbuca (Jump sale del 36% sopra
// la sagoma a riposo) è già dentro al frame prima dell'apice, e il ritorno
// resta morbido invece di scattare.
const ZOOM_OUT_TAU = 0.12
const ZOOM_IN_TAU = 0.4

// Ingombro massimo di una clip: campiono la posa a intervalli regolari e
// unisco le bounding box. Sulle skinned mesh computeBoundingBox() applica le
// trasformazioni delle ossa, quindi la box segue davvero la deformazione —
// senza, si misurerebbe sempre e solo la posa a riposo.
//
// Il risultato è nello spazio di `root`, cioè al netto di scala e posizione
// che il framing stesso applica: altrimenti il calcolo si morderebbe la coda.
function measureClipBounds(root, meshes, mixer, clip) {
  const box = new THREE.Box3()
  const meshBox = new THREE.Box3()
  const meshToRoot = new THREE.Matrix4()
  const rootInverse = new THREE.Matrix4()

  mixer.stopAllAction()
  const action = mixer.clipAction(clip)
  action.reset().play()
  action.paused = true

  for (let i = 0; i < POSE_SAMPLES; i++) {
    action.time = clip.duration * (i / (POSE_SAMPLES - 1))
    mixer.update(0)
    root.updateMatrixWorld(true)
    rootInverse.copy(root.matrixWorld).invert()

    for (const mesh of meshes) {
      if (mesh.isSkinnedMesh) {
        mesh.computeBoundingBox()
        meshBox.copy(mesh.boundingBox)
      } else {
        if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox()
        meshBox.copy(mesh.geometry.boundingBox)
      }
      meshToRoot.multiplyMatrices(rootInverse, mesh.matrixWorld)
      box.union(meshBox.applyMatrix4(meshToRoot))
    }
  }

  mixer.stopAllAction()
  return box
}

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

  const camera = useThree((s) => s.camera)
  const viewport = useThree((s) => s.size)

  // Clip su cui è calcolata l'inquadratura: non è sempre `state`, perché
  // durante un'emote comanda l'emote.
  const [framedClip, setFramedClip] = useState(state)

  const meshes = useMemo(() => {
    const found = []
    scene.traverse((obj) => {
      if (obj.isMesh) found.push(obj)
    })
    return found
  }, [scene])

  // Mixer dedicato alla misura: mettendo in posa il modello con quello di
  // rendering gli sballerei tempi e fade delle clip in corso.
  const measureMixer = useMemo(() => new THREE.AnimationMixer(scene), [scene])

  // Misurare costa una passata sui vertici, quindi lo faccio una volta per
  // clip e solo quando quella clip serve davvero.
  const boundsCache = useRef(new Map())
  const getClipBounds = useCallback(
    (name) => {
      const cached = boundsCache.current.get(name)
      if (cached) return cached
      const clip = THREE.AnimationClip.findByName(animations, name)
      if (!clip || !group.current) return null
      const box = measureClipBounds(group.current, meshes, measureMixer, clip)
      boundsCache.current.set(name, box)
      return box
    },
    [animations, meshes, measureMixer],
  )

  // Inquadratura di destinazione, riletta a ogni frame dal lerp qui sotto.
  const framing = useRef(null)
  const framed = useRef(false)

  // Fit-to-frame: calcolo quanto è grande il frame alla distanza del robot e
  // scalo il modello perché lo riempia. Vince il lato che stringe di più, così
  // il robot resta grande quanto lo spazio concede senza mai uscire.
  // Lo centro sull'ORIGINE, dove punta la camera (vedi CameraLookAt).
  useLayoutEffect(() => {
    const box = getClipBounds(framedClip)
    if (!box) return

    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    if (size.x <= 0 || size.y <= 0) return

    // Estensione del frame sul piano che passa per l'origine.
    const distance = camera.position.length()
    const frameH = 2 * distance * Math.tan((camera.fov * Math.PI) / 360)
    const frameW = frameH * (viewport.width / viewport.height)

    const scale = Math.min((frameH * FILL) / size.y, (frameW * FILL) / size.x)
    const position = new THREE.Vector3(-center.x, -center.y, -center.z).multiplyScalar(scale)
    framing.current = { scale, position }

    // Al primo montaggio niente transizione: si parte già inquadrati.
    if (!framed.current && group.current) {
      group.current.scale.setScalar(scale)
      group.current.position.copy(position)
      framed.current = true
    }
  }, [getClipBounds, framedClip, camera, viewport])

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

  // Helper: crossfade verso una clip qualsiasi. Il framing segue la clip, così
  // pose ingombranti come Jump o Death allargano l'inquadratura invece di
  // uscirne tagliate.
  const fadeTo = (name, duration) => {
    if (!actions) return
    const next = actions[name]
    if (!next) return
    const prev = activeActionRef.current
    if (prev && prev !== next) prev.fadeOut(duration)
    next.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play()
    activeActionRef.current = next
    setFramedClip(name)
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

  useFrame((_, delta) => {
    // Inquadratura: avvicinamento esponenziale al target, indipendente dal
    // frame rate.
    const g = group.current
    const target = framing.current
    if (g && target) {
      const tau = target.scale < g.scale.x ? ZOOM_OUT_TAU : ZOOM_IN_TAU
      const k = 1 - Math.exp(-delta / tau)
      g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, target.scale, k))
      g.position.lerp(target.position, k)
    }

    // Applica i valori degli slider espressioni ai morph target.
    // Scrive su tutti i mesh che hanno almeno una morph rilevante.
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
    <group ref={group}>
      {/* La rotazione sta su un gruppo interno: quello esterno porta solo
          scala e posizione del framing, che vengono misurate al netto suo. */}
      <group rotation={[0, -0.35, 0]}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

useGLTF.preload(MODEL_URL)
