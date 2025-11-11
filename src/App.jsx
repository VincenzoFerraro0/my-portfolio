import Navbar from "./components/Navbar"
import ToggleSwitch from "./components/ToggleSwitch"
import AboutMeSection from "./section/AboutMeSection"
import ContactForm from "./section/ContactForm"
import ProjectsSection from "./section/ProjectsSection"
import SkillsSection from "./section/SkillsSection"

function App() {


  return (
    <>
      <Navbar />
      {/* Contenuto principale */}
      <main className="">
        <AboutMeSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactForm />
        {/* Footer */}
        <div data-footer className="w-full mt-20 py-6 flex items-center justify-center backdrop-blur-lg bg-white/60 dark:bg-[rgba(15,15,15,0.8)] border-t border-gray-200 dark:border-gray-700 shadow-inner">
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            &#xa9; 2025 <span className="font-semibold text-indigo-600 dark:text-[rgb(208,255,113)]">Vincenzo Ferraro</span>. Tutti i diritti riservati.
          </p>
        </div>

      </main>
      <ToggleSwitch />

    </>


  )
}

export default App
