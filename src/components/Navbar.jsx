import { useState } from 'react';
// 1. Importa motion e AnimatePresence
import { motion, AnimatePresence } from 'framer-motion';
import fotoProfilo from '../assets/img/foto-profilo.png';
import ButtonContact from '../components/ButtonContact';
import { Menu, X } from 'lucide-react';

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

const pulseVariants = {
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
    }
  }
}
// -----------------


/**
 * 🟢 NUOVO Componente per l'indicatore di stato (Testo + Punto Luce a destra)
 * Sarà visibile sia su desktop che su mobile.
 */
const OnlineStatusIndicator = () => (
  <div className="lg:hidden flex items-center text-gray-800 dark:text-gray-200 gap-2 ">
      
      {/* Testo di stato */}
      <p className=''>
          Disponibile per lavorare
      </p>
      
      {/* Punto Luce (Dot) - A DESTRA DEL TESTO */}
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-[rgb(39,217,116)]"
        variants={pulseVariants}
        animate="pulse" 
      >
        {/* Effetto 'ping' */}
        <span className="absolute inline-flex h-full w-full rounded-full 
                         bg-[rgb(208,255,113)] opacity-75 animate-ping"></span>
      </motion.span>
  </div>
);


/**
 * Componente per l'avatar nel modale mobile (non contiene lo stato, che è nella navbar)
 */
const MobileProfileStatus = () => (
  <div className="flex items-center">
    
    {/* Avatar */}
    <img
      src={fotoProfilo}
      alt="Portfolio Avatar"
      className="w-10 h-10 rounded-full object-cover"
    />
    
  </div>
);


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ===== NAVBAR DESKTOP/MOBILE BASE ===== */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center 
                      justify-between  w-[70%] lg:max-w-[500px] max-w-[350px] px-3 py-2 rounded-4xl border
                    border-gray-200 bg-white/80 z-50 dark:bg-[rgba(15,15,15,0.9)]"
      >
        
        {/* Contenitore Sinistro (Avatar + Status) */}
        <div className="flex items-center space-x-3">
            {/* Avatar */}
            <img
              src={fotoProfilo}
              alt="Portfolio Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
        </div>
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
        <div className="lg:hidden text-gray-800 dark:text-gray-200">
          <button onClick={() => setIsOpen(true)} className="p-2">
            <MenuIcon />
          </button>
        </div>
      </nav>
      
      {/* ⚠️ NOTA: Ho aumentato max-w-[700px] per accogliere il nuovo Status ⚠️ */}
      {/* Se la navbar è troppo stretta, l'indicatore spingerà gli altri elementi */}

      {/* ===== MENU OVERLAY MOBILE con AnimatePresence (invariato) ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (invariato) */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
              onClick={() => setIsOpen(false)}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            />

            {/* Modale Menu (invariato) */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 
                         w-[90vw] max-w-sm h-auto min-h-[50vh] max-h-[550px]
                         bg-[#1C1C1C] rounded-3xl z-[100]
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
                    {/* 🚩 2. MobileProfileStatus ORA CONTIENE SOLO L'AVATAR 🚩 */}
                    <MobileProfileStatus /> 
                    
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