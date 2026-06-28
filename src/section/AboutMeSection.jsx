import { FaLinkedin, FaGithub, FaAward } from "react-icons/fa";
import HeroSceneLoader from "../components/robot/HeroSceneLoader";
import certificato from "../assets/img/certificatoBoolean.webp";
import linkCV from "../assets/doc/cv-vincenzo-ferraro.pdf"
import { GrDocumentPdf } from "react-icons/gr";
import { Link } from "react-scroll";


export default function AboutMeSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center text-gray-800 dark:text-white px-8 pt-20 "
    >
      {/* Top Section: About + Memoji */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full  max-w-6xl  gap-12">
        {/* Left Text Section */}
        <div className="max-w-lg text-center md:text-left">
          <h2 className="text-indigo-500 dark:text-[rgb(208,255,113)]  text-6xl md:text-7xl font-extrabold mb-6 tracking-tight uppercase">
            chi sono
          </h2>

          <h1 className="text-2xl font-semibold mb-4 uppercase ">
            vincenzo ferraro
          </h1>

          <p className="leading-relaxed mb-4">
            Ciao! Sono Vincenzo, un appassionato di programmazione con la curiosità di capire come funziona il web.
          </p>

          <p className="leading-relaxed mb-4">
            Dopo i primi esperimenti con FreeCodeCamp, Shopify e WordPress, ho iniziato a creare progetti da zero per dare vita alle mie idee.
          </p>

          <p className="leading-relaxed">
            Oggi continuo a imparare e costruire, guidato dalla voglia di capire, crescere e soprattutto creare.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start space-x-5 text-neutral-400 text-2xl mt-6 mb-6">
            <Link
              href="https://www.linkedin.com/in/vincenzo-ferraro-567a60380"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition"
              aria-label="Link per la piattaforma linkedin"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="https://github.com/VincenzoFerraro0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
              aria-label="Link per la piattaforma github"
            >
              <FaGithub />
            </Link>
          </div>
        </div>

        {/* Right Section: Robot 3D animato (R3F) — sostituisce la memoji statica.
            Il contenitore deve essere relative e avere un'altezza definita:
            Canvas e pannello di controllo sono posizionati in absolute. */}
        <div className="relative w-full max-w-sm md:max-w-none md:flex-1 h-[440px] md:h-[500px] bg-transparent">
          <HeroSceneLoader />
        </div>
      </div>

      {/* Formazione + Certificato */}
      <div className="flex flex-col lg:flex-row-reverse items-center justify-between w-full max-w-6xl mx-auto gap-10 mt-5 px-4">
        {/* Left Text Section */}
        <div className="max-w-xl text-center lg:text-left">
          <h3 className="text-indigo-500 dark:text-[rgb(208,255,113)] text-5xl md:text-6xl font-extrabold mb-6 tracking-tight uppercase">
            formazione
          </h3>

          <p className="text-xl md:text-2xl font-semibold mb-4 uppercase">
            Master Full Stack Developer
          </p>

          <p className="leading-relaxed mb-4">
            Percorso di formazione full-time di 600 ore live durante le quali ho partecipato a lezioni teoriche e pratiche e ho appreso le basi della programmazione front-end, back-end e l'utilizzo di MySQL, così come i principali strumenti di sviluppo.
          </p>

          <p className="leading-relaxed">
            Un’esperienza immersiva che mi ha permesso di sviluppare un metodo di lavoro strutturato e collaborativo, migliorare le mie competenze tecniche e acquisire maggiore sicurezza nello sviluppo di progetti web completi.
          </p>

          {/* Icons link */}
          <div className="flex flex-col items-center lg:items-start mt-6 space-y-3">
            <p className="text-sm ">
              Puoi scaricare il mio CV o visualizzare la certificazione qui sotto:
            </p>

            <div className="flex justify-center lg:justify-start space-x-6 text-neutral-400 text-2xl">
              {/* Download CV */}
              <Link
                href={linkCV}
                download
                className="hover:text-[rgb(208,255,113)] transition"
                aria-label="Link per il download del curriculm "

              >
                <GrDocumentPdf />
              </Link>

              {/* Link alla certificazione ufficiale */}
              <Link
                href="https://credsverse.com/credentials/5b86ad31-f998-4dc9-87aa-2040f4301632"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-500 transition"
                aria-label="Link della certificazione"
              >
                <FaAward />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Image Section (Certificato “fluttuante”) */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={certificato}
            alt="Certificato Boolean di Vincenzo Ferraro"
            width="320"
            height="443"
            className="max-w-xs md:max-w-sm lg:max-w-md h-auto object-contain rounded-2xl shadow-2xl transition-transform duration-300"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}