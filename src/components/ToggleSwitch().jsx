import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ToggleSwitch() {
    const [isOn, setIsOn] = useState(false);

    // Controlla la preferenza salvata al caricamento
    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        setIsOn(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Attiva/disattiva la dark mode
    const toggleDarkMode = () => {
        const newState = !isOn;
        setIsOn(newState);

        if (newState) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    };

    return (
        <div className="fixed z-50 flex items-center justify-center -translate-x-1/2 bottom-6 left-1/2">
            <div
                onClick={toggleDarkMode}
                className={`flex h-5 w-11 cursor-pointer items-center rounded-full px-1 transition-colors duration-300 ${isOn ? "bg-[rgb(208,255,113)]" : "bg-indigo-500"
                    }`}
            >
                <motion.div
                    className={`h-4 w-4 rounded-full ${isOn ? "bg-neutral-900" : "bg-white "
                        }`}
                    animate={{ x: isOn ? 21 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
}
