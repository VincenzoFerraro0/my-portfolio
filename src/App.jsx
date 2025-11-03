import { Routes, Route } from "react-router-dom"
import DefaultLayout from "./layout/DefaultLayout"
import Homepage from "./pages/Homepage"
import AboutMePage from "./pages/AboutMePage"
function App() {
  

  return (
  <Routes>
    <Route element={<DefaultLayout/>}>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/about" element={<AboutMePage/>}/>
    </Route>
  </Routes>
     
  )
}

export default App
