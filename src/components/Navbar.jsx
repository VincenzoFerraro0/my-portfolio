import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import fotoProfilo from '../assets/img/foto-profilo.webp';
import ButtonContact from '../components/ButtonContact';
import { Menu, X } from 'lucide-react';
import OnlineStatusIndicator from './OnlineStatusIndicator';
import { menuItems } from '../lib/data';

const MenuIcon = Menu;
const XIcon = X;

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
  exit: { opacity: 0 }
};

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0, y: "-40%" },
  visible: {
    scale: 1, opacity: 1, y: "-50%",
    transition: { type: "spring", damping: 20, stiffness: 200 }
  },
  exit: { scale: 0.9, opacity: 0, y: "-40%", transition: { duration: 0.2 } }
};

const staggerContainerVariants = {
  visible: {
    transition: { delayChildren: 0.1, staggerChildren: 0.08 }
  },
};


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center 
                      justify-between w-[70%] lg:max-w-[500px] max-w-[350px] px-3 py-2 
                      rounded-4xl border border-gray-200 bg-white/80 z-50 
                      dark:bg-[rgba(15,15,15,0.9)]">

        <img
          src={fotoProfilo}
          alt="Portfolio Avatar"
          width="40"
          height="40"
          className="object-cover rounded-full lg:w-10 lg:h-10 h-9 w-9"
          loading="lazy"
        />
        <OnlineStatusIndicator />

        {/* Links Desktop */}
        <div className="hidden space-x-8 font-medium text-gray-800 lg:flex  dark:text-gray-200">
          {menuItems.map((link) => (
            <motion.div
              key={link.name}
              className="relative cursor-pointer"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <Link
                to={link.to}
                smooth={true}
                duration={600}
                offset={-100} // per compensare la navbar fissa
                spy={true}
                className="cursor-pointer"
              >
                {link.name}
              </Link>
              <motion.span
                className="absolute left-0 bottom-0 h-[2px] w-full bg-indigo-500 dark:bg-[rgb(175,252,1)] origin-left scale-x-0"
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>

        <div className="hidden lg:block">
          <ButtonContact />
        </div>

        <div className="lg:hidden text-white bg-indigo-500 dark:bg-[rgb(175,252,1)] dark:text-black rounded-full">
          <button
            aria-label="Apri il menu di navigazione"
            onClick={() => setIsOpen(true)} className="flex items-center p-2 align-items-center cursor-pointer"
           >
          <MenuIcon className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* ===== MENU MOBILE ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-90"
              onClick={() => setIsOpen(false)}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            />

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
                <div className="flex items-center justify-between">
                  <img
                    src={fotoProfilo}
                    alt="Portfolio Avatar"
                    width="40"
                    height="40"
                    className="object-cover rounded-full lg:w-10 lg:h-10 h-9 w-9"
                    loading="lazy"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white dark:text-black bg-indigo-500 dark:bg-[rgb(175,252,1)] rounded-full p-2 flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
                    aria-label= "Chiudi il menu di navigazione"
                  >
                    <XIcon />
                  </button>
                </div>

                <div className="flex flex-col items-center my-10 space-y-6 text-3xl font-medium text-white">
                  {menuItems.map((link) => (
                    <Link
                      key={link.name}
                      to={link.to}
                      smooth={true}
                      duration={600}
                      offset={-100}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-[rgb(175,252,1)] transition cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <motion.div className="flex justify-center">
                  <ButtonContact staticGradient onClick={() => setIsOpen(false)} />
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
