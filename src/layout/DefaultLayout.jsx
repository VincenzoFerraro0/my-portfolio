import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../Footer"; // controlla che il path sia corretto
import ToggleSwitch from "../components/ToggleSwitch()";

export default function Layout() {
  return (
    <>
      <Navbar />

      {/* Contenuto principale */}
      <main className="flex-1 ">
        <Outlet />
      </main>
      <ToggleSwitch/>
      <Footer />
    </>
  );
}
