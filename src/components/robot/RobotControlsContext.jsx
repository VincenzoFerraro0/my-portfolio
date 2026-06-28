import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// Lista clip e morph target esposti dal pannello — devono matchare i nomi nel .glb.
export const STATES = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing']
export const EMOTES = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp']
export const EXPRESSIONS = ['Angry', 'Surprised', 'Sad']

const RobotControlsContext = createContext(null)

// State base: Idle (postura calma). All'ingresso il robot fa un saluto (Wave)
// e poi torna a Idle — vedi l'effetto in RobotControlsProvider.
function pickInitialState() {
  return 'Idle'
}

export function RobotControlsProvider({ children }) {
  const [state, setState] = useState(pickInitialState)
  const [emoteSignal, setEmoteSignal] = useState({ name: null, nonce: 0 })
  const [expressions, setExpressions] = useState({ Angry: 0, Surprised: 0, Sad: 0 })

  const triggerEmote = useCallback((name) => {
    setEmoteSignal((prev) => ({ name, nonce: prev.nonce + 1 }))
  }, [])

  const setExpression = useCallback((name, value) => {
    setExpressions((prev) => ({ ...prev, [name]: value }))
  }, [])

  // Saluto all'ingresso: una volta al mount facciamo partire l'emote Wave.
  // Se il modello non è ancora pronto, RobotModel ribatte il trigger appena le
  // animazioni sono caricate (l'effetto là dipende anche da `actions`).
  // Saltato per chi ha prefers-reduced-motion.
  useEffect(() => {
    let reduce = false
    try {
      reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      reduce = false
    }
    if (reduce) return
    const t = setTimeout(() => triggerEmote('Wave'), 600)
    return () => clearTimeout(t)
  }, [triggerEmote])

  const value = useMemo(
    () => ({ state, setState, triggerEmote, emoteSignal, expressions, setExpression }),
    [state, triggerEmote, emoteSignal, expressions, setExpression],
  )

  return <RobotControlsContext.Provider value={value}>{children}</RobotControlsContext.Provider>
}

export function useRobotControls() {
  const ctx = useContext(RobotControlsContext)
  if (!ctx) throw new Error('useRobotControls deve essere usato dentro <RobotControlsProvider>')
  return ctx
}
