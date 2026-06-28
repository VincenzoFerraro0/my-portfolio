import { motion, AnimatePresence } from 'framer-motion';

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

export default function OnlineStatusIndicator() {
    return (
        <div className="lg:hidden flex items-center text-gray-800 dark:text-gray-200 gap-2 ">

            {/* Testo di stato */}
            <p className='text-sm sm:text-md md:text-lg'>
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
                         bg-[rgb(175,252,1)] opacity-75 animate-ping"></span>
            </motion.span>
        </div>
    )
}
