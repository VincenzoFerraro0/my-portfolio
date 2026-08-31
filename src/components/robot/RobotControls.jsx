import { useState } from 'react'
import {
  EMOTES,
  EXPRESSIONS,
  STATES,
  useRobotControls,
} from './RobotControlsContext'

// Pannello di controllo del robot, in stile lil-gui ma con la palette del sito.
//
// Non si sovrappone mai al robot: quando è aperto il viewport 3D si restringe
// (vedi RobotViewport in HeroSceneLoader) e il pannello occupa lo spazio
// liberato — bottom sheet su box stretti, colonna a destra su box larghi.
// Le misure qui sotto devono restare allineate a VIEWPORT_OPEN.
const PANEL_BOX =
  'inset-x-0 bottom-0 h-56' +
  // Su box largo il pannello è una card in alto a destra dimensionata sul
  // contenuto (con le tab, una colonna a tutta altezza resterebbe mezza vuota).
  ' @md:inset-x-auto @md:right-0 @md:top-0 @md:bottom-auto @md:h-auto @md:max-h-full @md:w-60'

// Sfondo/bordo/testo condivisi da pannello e toggle, con varianti per tema.
const SURFACE =
  'bg-white/90 dark:bg-black/90 backdrop-blur-sm border-black/10 dark:border-white/15 text-gray-800 dark:text-white'
// Accent: indigo in light, acid in dark.
const ACCENT_HOVER =
  'hover:border-indigo-500 hover:text-indigo-500 dark:hover:border-acid dark:hover:text-acid'
const ACCENT_TEXT = 'text-indigo-500 dark:text-acid'

// Un gruppo per volta invece dell'accordion con tutte le sezioni aperte: su
// bottom sheet quello significava ~440px di contenuto dentro 190px di finestra,
// cioè scroll annidato dentro una pagina che già scrolla. Con le tab il gruppo
// attivo ci sta tutto senza scorrere, a ogni larghezza.
// `label` è corta per stare nella colonna da 240px; `name` è quella estesa
// letta dagli screen reader.
const TABS = [
  { id: 'state', label: 'State', name: 'States' },
  { id: 'emotes', label: 'Emotes', name: 'Emotes' },
  { id: 'face', label: 'Face', name: 'Expressions' },
]

export default function RobotControls() {
  const { state, setState, triggerEmote, expressions, setExpression, panelOpen, setPanelOpen } =
    useRobotControls()
  const [tab, setTab] = useState(TABS[0].id)

  return (
    <>
      {/* Toggle: visibile solo a pannello chiuso — da aperto la chiusura sta
          nella barra delle tab, così i due non si sovrappongono mai. */}
      {!panelOpen && (
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          aria-label="Apri pannello controlli"
          aria-expanded={false}
          aria-controls="robot-controls-panel"
          className={`absolute top-3 right-3 z-40 flex items-center gap-2 border font-mono text-[10px] uppercase tracking-widest px-3 min-h-11 transition-colors ${SURFACE} ${ACCENT_HOVER}`}
        >
          <SlidersIcon />
          <span className="hidden @xs:inline">Controls</span>
        </button>
      )}

      {panelOpen && (
        <div
          id="robot-controls-panel"
          role="dialog"
          aria-label="Pannello controlli robot"
          className={`absolute z-30 flex flex-col border-t @md:border-t-0 @md:border-b @md:border-l font-mono text-[11px] select-none shadow-2xl ${PANEL_BOX} ${SURFACE}`}
        >
          {/* Barra tab + chiusura: una riga sola, così anche sul bottom sheet
              resta il massimo spazio per i controlli veri. */}
          <div
            role="tablist"
            aria-label="Gruppi di controlli"
            className="flex shrink-0 items-stretch border-b border-black/10 dark:border-white/10"
          >
            {TABS.map((t) => {
              const active = tab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`robot-tab-${t.id}`}
                  aria-selected={active}
                  aria-controls={`robot-tabpanel-${t.id}`}
                  aria-label={t.name}
                  onClick={() => setTab(t.id)}
                  className={`flex-1 min-h-11 px-1 uppercase tracking-widest border-b-2 transition-colors ${
                    active
                      ? `${ACCENT_TEXT} border-indigo-500 dark:border-acid`
                      : `text-gray-500 dark:text-white/60 border-transparent ${ACCENT_HOVER}`
                  }`}
                >
                  {t.label}
                </button>
              )
            })}
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              aria-label="Chiudi pannello controlli"
              aria-expanded
              aria-controls="robot-controls-panel"
              className={`shrink-0 flex items-center justify-center px-3 min-h-11 text-gray-500 dark:text-white/60 border-l border-black/10 dark:border-white/10 transition-colors ${ACCENT_HOVER}`}
            >
              <CloseIcon />
            </button>
          </div>

          {/* min-h-0: senza, il figlio flex non si accorcia e overflow-y non parte. */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {tab === 'state' && (
              <TabPanel id="state">
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="robot-state" className="text-gray-600 dark:text-white/80">
                    state
                  </label>
                  <select
                    id="robot-state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={`bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 px-2 py-2 outline-none cursor-pointer min-h-11 @md:min-h-0 @md:py-1 focus:border-indigo-500 dark:focus:border-acid ${ACCENT_HOVER}`}
                  >
                    {STATES.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className="bg-white text-gray-800 dark:bg-black dark:text-white"
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </TabPanel>
            )}

            {tab === 'emotes' && (
              <TabPanel id="emotes">
                <div className="grid grid-cols-3 @md:grid-cols-1 gap-1">
                  {EMOTES.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => triggerEmote(e)}
                      className={`bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 py-2 @md:py-1.5 text-gray-700 dark:text-white/90 active:bg-indigo-500/10 dark:active:bg-acid/10 transition-colors min-h-11 @md:min-h-0 ${ACCENT_HOVER}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </TabPanel>
            )}

            {tab === 'face' && (
              <TabPanel id="face">
                <div className="space-y-1 @md:space-y-2">
                  {EXPRESSIONS.map((ex) => (
                    <div key={ex} className="flex items-center gap-2 min-h-11 @md:min-h-0">
                      <span className="w-20 text-gray-600 dark:text-white/80">{ex}</span>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={expressions[ex]}
                        onChange={(e) => setExpression(ex, parseFloat(e.target.value))}
                        className="flex-1 min-w-0 accent-indigo-500 dark:accent-acid h-2 @md:h-1 cursor-pointer touch-pan-y"
                        aria-label={ex}
                      />
                      <span className="w-8 text-right text-gray-400 dark:text-white/50 tabular-nums">
                        {expressions[ex].toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </TabPanel>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function TabPanel({ id, children }) {
  return (
    <div
      role="tabpanel"
      id={`robot-tabpanel-${id}`}
      aria-labelledby={`robot-tab-${id}`}
      className="px-3 py-3"
    >
      {children}
    </div>
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
