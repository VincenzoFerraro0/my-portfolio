import { FaXTwitter, FaInstagram, FaBehance, FaDribbble } from "react-icons/fa6";
import FotoProfilo from "../assets/img/foto-profilo.png";

export default function AboutMe() {
  return (
    <section className="min-h-screen text-gray-800 dark:text-gray-200 flex flex-col-reverse md:flex-row items-center justify-center px-8 pt-20 gap-12">
      {/* Left Text Section */}
      <div className="max-w-lg">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight uppercase">
          chi sono
        </h1>

        <h2 className="text-2xl font-semibold mb-4 uppercase">
          vincenzo ferraro
        </h2>

        <p className="leading-relaxed mb-4">
          👋 Ciao! Sono Vincenzo, un appassionato di programmazione nato dalla curiosità di capire come funziona il web.
        </p>

        <p className="leading-relaxed mb-4">
          Dopo i primi esperimenti con FreeCodeCamp, Shopify e WordPress, ho iniziato a creare progetti da zero per dare vita alle mie idee.
        </p>

        <p className="leading-relaxed">
          Oggi continuo a imparare e costruire, guidato dalla voglia di capire, crescere e soprattutto creare.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-5 text-neutral-400 text-2xl mt-8">
          <a href="#" className="hover:text-white transition-colors"><FaXTwitter /></a>
          <a href="#" className="hover:text-white transition-colors"><FaInstagram /></a>
          <a href="#" className="hover:text-white transition-colors"><FaBehance /></a>
          <a href="#" className="hover:text-white transition-colors"><FaDribbble /></a>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-auto flex justify-center">
        <img
          src={FotoProfilo}
          alt="Foto Profilo"
          className="w-full max-w-xs md:max-w-sm h-auto object-cover rounded-3xl shadow-lg"
        />
      </div>
    </section>
  );
}
