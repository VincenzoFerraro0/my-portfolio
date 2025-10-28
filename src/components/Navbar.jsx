import { useState } from 'react';
// 1. Importa motion e AnimatePresence
import { motion, AnimatePresence } from 'framer-motion';
import fotoProfilo from '../assets/img/foto-profilo.png';
import ButtonContact from '../components/ButtonContact';
import { Menu, X } from 'lucide-react';
import OnlineStatusIndicator from './OnlineStatusIndicator';

// --- Icone SVG (invariate) ---
const MenuIcon = Menu

const XIcon = X
// -----------------

// --- Varianti Framer Motion (invariate) ---
const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  exit: { opacity: 0 }
};

const modalVariants = {
  hidden: {
    scale: 0.9,
    opacity: 0,
    y: "-40%"
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: "-50%",
    transition: { type: "spring", damping: 20, stiffness: 200 }
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    y: "-40%",
    transition: { duration: 0.2 }
  }
};

const staggerContainerVariants = {
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.08
    }
  },
};


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ===== NAVBAR DESKTOP/MOBILE BASE ===== */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center 
                      justify-between  w-[70%] lg:max-w-[500px] max-w-[350px] px-3 py-2 rounded-4xl border
                    border-gray-200 bg-white/80 z-50 dark:bg-[rgba(15,15,15,0.9)]"
      >

        {/* Avatar */}
        <img
          src={fotoProfilo}
          alt="Portfolio Avatar"
          className="lg:w-10 lg:h-10 h-9 w-9 rounded-full object-cover"
        />

        <OnlineStatusIndicator />


        {/* Links Desktop */}
        <div className="hidden lg:flex space-x-6 font-medium text-gray-800 dark:text-gray-200">
          <a href="/" className="hover:text-indigo-500 dark:hover:text-[rgb(208,255,113)] transition">Home</a>
          <a href="/about" className="hover:text-indigo-500 dark:hover:text-[rgb(208,255,113)] transition">About</a>
          <a href="/projects" className="hover:text-indigo-500 dark:hover:text-[rgb(208,255,113)] transition">Projects</a>
          <a href="/blogs" className="hover:text-indigo-500 dark:hover:text-[rgb(208,255,113)] transition">Blogs</a>
        </div>

        {/* Contact Button Desktop */}
        <div className='hidden lg:block'>
          <ButtonContact />
        </div>

        {/* Bottone Toggle Menu Mobile */}
        <div className=" lg:hidden text-white bg-indigo-500  dark:bg-[rgb(208,255,113)] dark:text-black rounded-full">
          <button onClick={() => setIsOpen(true)} className="p-2 flex align-items-center items-center ">
            <MenuIcon className='w-5 h-5' />
          </button>
        </div>
      </nav>

      {/* ===== MENU OVERLAY MOBILE con AnimatePresence (invariato) ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* EFFETTO SFOCATO */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-90"
              onClick={() => setIsOpen(false)}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            />

            {/* MODALE MENU */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 
                         w-[90vw] max-w-sm h-auto min-h-[50vh] max-h-[550px]
                         dark:bg-[#1C1C1C] bg-white/30 rounded-3xl z-100
                         flex flex-col justify-between p-6 overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="flex flex-col justify-between h-full"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Sezione Superiore: Avatar (senza stato) e Tasto Chiudi */}
                <div className=" flex justify-between items-center ">

                  {/* Avatar */}
                  <img
                    src={fotoProfilo}
                    alt="Portfolio Avatar"
                    className="lg:w-10 lg:h-10 h-9 w-9 rounded-full object-cover"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-[rgb(208,255,113)] rounded-full p-2 flex items-center justify-center transition-transform active:scale-90"
                  >
                    <XIcon />
                  </button>
                </div>

                {/* Sezione Centrale: Link Navigazione (invariati) */}
                <div className="flex flex-col items-center space-y-6 text-3xl text-white font-medium my-10">
                  <a href="/" onClick={() => setIsOpen(false)} className="hover:text-[rgb(208,255,113)] transition">Home</a>
                  <a href="/about" onClick={() => setIsOpen(false)} className="hover:text-[rgb(208,255,113)] transition">About</a>
                  <a href="/projects" onClick={() => setIsOpen(false)} className="hover:text-[rgb(208,255,113)] transition">Projects</a>
                  <a href="/blogs" onClick={() => setIsOpen(false)} className="hover:text-[rgb(208,255,113)] transition">Blogs</a>
                </div>

                {/* Sezione Inferiore: Bottone Contact (invariato) */}
                <motion.div className="flex justify-center">
                  <ButtonContact />
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}