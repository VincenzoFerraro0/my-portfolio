import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../Footer"


export default function () {
    return (
        <>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}