import Navbar from "./components/Navbar"
import ToggleSwitch from "./components/ToggleSwitch"
import Footer from "./Footer"
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
      </main>
      <ToggleSwitch />
      <Footer />
    </>


  )
}

export default App
