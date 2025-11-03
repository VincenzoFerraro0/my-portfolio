import Navbar from "./components/Navbar"
import ToggleSwitch from "./components/ToggleSwitch"
import AboutMeSection from "./section/AboutMeSection"
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
        <SkillsSection/>

      </main>
      <ToggleSwitch />

    </>


  )
}

export default App
