import { Routes, Route } from "react-router-dom"
import DefaultLayout from "./layout/DefaultLayout"
import Homepage from "./pages/Homepage"
function App() {
  

  return (
  <Routes>
    <Route element={<DefaultLayout/>}>
        <Route path="/" element={<Homepage/>}/>
    </Route>
  </Routes>
     
  )
}

export default App
