import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../Footer"; // controlla che il path sia corretto

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-noise-dark text-white">
      <Navbar />

      {/* Contenuto principale */}
      <main className="flex-1  bg-black/60">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
