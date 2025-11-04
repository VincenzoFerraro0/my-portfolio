import { FaLinkedin, FaGithub, FaCertificate } from 'react-icons/fa';
import Memoji from "../assets/img/memoji-Trasparente.png";
import Certificato from "../assets/img/certificatoBoolean.png";

export default function AboutMeSection() {
  return (
    <section
      id="about"
      className="min-h-screen text-gray-800 dark:text-gray-200 flex flex-col items-center justify-center px-8 pt-18 gap-12"
    >
      {/* Top Section: About + Memoji */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-6xl gap-12">
        {/* Left Text Section */}
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight uppercase">
            chi sono
          </h2>

          <h1 className="text-2xl font-semibold mb-4 uppercase">
            vincenzo ferraro
          </h1>

          <p className="leading-relaxed mb-4">
            Ciao! Sono Vincenzo, un appassionato di programmazione nato dalla curiosità di capire come funziona il web.
          </p>

          <p className="leading-relaxed mb-4">
            Dopo i primi esperimenti con FreeCodeCamp, Shopify e WordPress, ho iniziato a creare progetti da zero per dare vita alle mie idee.
          </p>

          <p className="leading-relaxed">
            Oggi continuo a imparare e costruire, guidato dalla voglia di capire, crescere e soprattutto creare.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start space-x-5 text-neutral-400 text-2xl mt-8">
            <a
              href="https://www.linkedin.com/in/vincenzo-ferraro-567a60380"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/VincenzoFerraro0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Right Image Section (Memoji “fluttuante”) */}
        <div className="w-full md:w-auto flex justify-center bg-transparent relative">
          <img
            src={Memoji}
            alt="Memoji di Vincenzo Ferraro"
            className="w-full max-w-xs md:max-w-sm h-auto object-contain drop-shadow-2xl animate-float"
          />
        </div>
      </div>

      {/* Certificate Section - spostata sotto */}
      <div className="w-full flex flex-col items-center text-center mt-5">
        <h3 className="text-2xl font-semibold mb-2 flex items-center gap-q justify-center">
          <FaCertificate className="text-yellow-500 text-2xl" />
          Certificato Web Development
        </h3>

        <a
          href="https://credsverse.com/credentials/5b86ad31-f998-4dc9-87aa-2040f4301632"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mb-6"
        >
          Visualizza certificato su Credsverse
        </a>

        <img
          src={Certificato}
          alt="Certificato di Vincenzo Ferraro - Web Development"
          className="w-full max-w-lg rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
}
