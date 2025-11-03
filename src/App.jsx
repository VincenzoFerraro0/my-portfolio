import Navbar from "./components/Navbar"
import ToggleSwitch from "./components/ToggleSwitch"
import AboutMeSection from "./section/AboutMeSection"
import ProjectsSection from "./section/ProjectsSection"

function App() {


  return (
    <>
      <Navbar />
      {/* Contenuto principale */}
      <main className="">
        <AboutMeSection />
        <ProjectsSection />

      </main>
      <ToggleSwitch />

    </>


  )
}

export default App
