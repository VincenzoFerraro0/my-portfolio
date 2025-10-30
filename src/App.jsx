import { Routes, Route } from "react-router-dom"
import DefaultLayout from "./layout/DefaultLayout"
import Homepage from "./pages/Homepage"
import AboutMe from "./pages/AboutMe"
function App() {
  

  return (
  <Routes>
    <Route element={<DefaultLayout/>}>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/about" element={<AboutMe/>}/>
    </Route>
  </Routes>
     
  )
}

export default App
