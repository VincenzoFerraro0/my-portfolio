'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

// Lista clip e morph target esposti dal pannello — devono matchare i nomi nel .glb.
export const STATES = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'] as const
export const EMOTES = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'] as const
export const EXPRESSIONS = ['Angry', 'Surprised', 'Sad'] as const

export type RobotState = (typeof STATES)[number]
export type RobotEmote = (typeof EMOTES)[number]
export type RobotExpression = (typeof EXPRESSIONS)[number]

type Expressions = Record<RobotExpression, number>

type EmoteSignal = { name: RobotEmote | null; nonce: number }

type Ctx = {
  state: RobotState
  setState: (s: RobotState) => void
  triggerEmote: (e: RobotEmote) => void
  // L'incremento del nonce notifica al modello che è arrivato un nuovo trigger,
  // anche se l'emote selezionata è la stessa di prima.
  emoteSignal: EmoteSignal
  expressions: Expressions
  setExpression: (e: RobotExpression, v: number) => void
}

const RobotControlsContext = createContext<Ctx | null>(null)

// Default state: Dance per default, Idle se l'utente ha prefers-reduced-motion
// (clip statica = niente movimento percepito + meno lavoro skinning).
function pickInitialState(): RobotState {
  if (typeof window === 'undefined') return 'Dance'
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'Idle' : 'Dance'
  } catch {
    return 'Dance'
  }
}

export function RobotControlsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RobotState>(pickInitialState)
  const [emoteSignal, setEmoteSignal] = useState<EmoteSignal>({ name: null, nonce: 0 })
  const [expressions, setExpressions] = useState<Expressions>({ Angry: 0, Surprised: 0, Sad: 0 })

  const triggerEmote = useCallback((name: RobotEmote) => {
    setEmoteSignal((prev) => ({ name, nonce: prev.nonce + 1 }))
  }, [])

  const setExpression = useCallback((name: RobotExpression, value: number) => {
    setExpressions((prev) => ({ ...prev, [name]: value }))
  }, [])

  const value = useMemo<Ctx>(
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
