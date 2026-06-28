import { useState } from 'react'
import {
  EMOTES,
  EXPRESSIONS,
  STATES,
  useRobotControls,
} from './RobotControlsContext'

// Pannello di controllo del robot, in stile lil-gui ma con palette Opia.
// Su desktop (md+): aperto di default, posizionato top-right del hero.
// Su mobile: chiuso di default, si apre come bottom-sheet via toggle.
export default function RobotControls() {
  const { state, setState, triggerEmote, expressions, setExpression } = useRobotControls()
  // Parte chiuso su tutte le viewport: dentro il box embedded il robot deve
  // restare visibile; l'utente apre il pannello dal toggle quando vuole.
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Toggle: sempre visibile in top-right del hero. Cambia icona aperto/chiuso. */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Chiudi pannello controlli' : 'Apri pannello controlli'}
        aria-expanded={open}
        aria-controls="robot-controls-panel"
        className="absolute top-3 right-3 z-40 flex items-center gap-2 bg-black/85 backdrop-blur-sm border border-white/15 text-white font-mono text-[10px] uppercase tracking-widest px-3 min-h-11 hover:border-acid hover:text-acid transition-colors"
      >
        {open ? <CloseIcon /> : <SlidersIcon />}
        <span className="hidden sm:inline">{open ? 'Close' : 'Controls'}</span>
      </button>

      {open && (
        <div
          id="robot-controls-panel"
          role="dialog"
          aria-label="Pannello controlli robot"
          className="
            absolute z-30 inset-x-2 bottom-2 max-h-[78%] overflow-y-auto
            bg-black/90 backdrop-blur-sm border border-white/15
            text-white font-mono text-[11px] select-none shadow-2xl
          "
        >
          <div className="px-3 py-2 border-b border-white/10 uppercase tracking-widest text-white/60">
            Controls
          </div>

          <details open className="group border-b border-white/10">
            <summary className="cursor-pointer px-3 py-2 uppercase tracking-widest text-white/60 hover:text-acid list-none flex items-center gap-2 [&::-webkit-details-marker]:hidden min-h-11">
              <Caret /> States
            </summary>
            <div className="px-3 pb-3 pt-1 flex items-center justify-between gap-3">
              <label htmlFor="robot-state" className="text-white/80">
                state
              </label>
              <select
                id="robot-state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="bg-white/5 border border-white/15 px-2 py-2 hover:border-acid focus:border-acid outline-none cursor-pointer min-h-11 md:min-h-0 md:py-1"
              >
                {STATES.map((s) => (
                  <option key={s} value={s} className="bg-black text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </details>

          <details open className="group border-b border-white/10">
            <summary className="cursor-pointer px-3 py-2 uppercase tracking-widest text-white/60 hover:text-acid list-none flex items-center gap-2 [&::-webkit-details-marker]:hidden min-h-11">
              <Caret /> Emotes
            </summary>
            <div className="px-3 pb-3 pt-1 grid grid-cols-2 md:grid-cols-1 gap-1">
              {EMOTES.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => triggerEmote(e)}
                  className="bg-white/5 border border-white/10 py-2 md:py-1.5 text-white/90 hover:border-acid hover:text-acid active:bg-acid/10 transition-colors min-h-11 md:min-h-0"
                >
                  {e}
                </button>
              ))}
            </div>
          </details>

          <details open className="group">
            <summary className="cursor-pointer px-3 py-2 uppercase tracking-widest text-white/60 hover:text-acid list-none flex items-center gap-2 [&::-webkit-details-marker]:hidden min-h-11">
              <Caret /> Expressions
            </summary>
            <div className="px-3 pb-4 pt-1 space-y-3 md:space-y-2">
              {EXPRESSIONS.map((ex) => (
                <div key={ex} className="flex items-center gap-2">
                  <span className="w-20 text-white/80">{ex}</span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={expressions[ex]}
                    onChange={(e) => setExpression(ex, parseFloat(e.target.value))}
                    className="flex-1 accent-acid h-2 md:h-1 cursor-pointer touch-pan-y"
                    aria-label={ex}
                  />
                  <span className="w-8 text-right text-white/50 tabular-nums">
                    {expressions[ex].toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </>
  )
}

function Caret() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      className="transition-transform text-white/40 group-open:rotate-90"
      aria-hidden
    >
      <path d="M2 1l4 3-4 3z" fill="currentColor" />
    </svg>
  )
}

function SlidersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <line x1="2" y1="3.5" x2="8" y2="3.5" />
      <circle cx="10" cy="3.5" r="1.5" fill="currentColor" />
      <line x1="2" y1="7" x2="5" y2="7" />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" />
      <line x1="2" y1="10.5" x2="9" y2="10.5" />
      <circle cx="11" cy="10.5" r="1.5" fill="currentColor" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <line x1="3" y1="3" x2="11" y2="11" />
      <line x1="11" y1="3" x2="3" y2="11" />
    </svg>
  )
}
