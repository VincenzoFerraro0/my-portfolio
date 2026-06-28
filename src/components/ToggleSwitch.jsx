import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ToggleSwitch() {
    const [isOn, setIsOn] = useState(false);
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const footerRef = useRef(null);

    // Controlla la preferenza salvata al caricamento
    useEffect(() => {
        const isDark = localStorage.getItem("darkMode") === "true";
        setIsOn(isDark);
        if (isDark) document.documentElement.classList.add("dark");
    }, []);

    // Osserva il footer
    useEffect(() => {
        const footer = document.querySelector("footer, [data-footer]");
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    // Attiva/disattiva la dark mode
    const toggleDarkMode = () => {
        const newState = !isOn;
        setIsOn(newState);
        if (newState) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("darkMode", "true");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("darkMode", "false");
        }
    };

    return (
        <AnimatePresence>
            {!isFooterVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed z-50 flex items-center justify-center -translate-x-1/2 bottom-6 left-1/2"
                >
                    <div
                        onClick={toggleDarkMode}
                        className={`flex h-5 w-11 cursor-pointer items-center rounded-full px-1 transition-colors duration-300 ${isOn ? "bg-[rgb(175,252,1)]" : "bg-indigo-500"
                            }`}
                    >
                        <motion.div
                            className={`h-4 w-4 rounded-full ${isOn ? "bg-neutral-900" : "bg-white"
                                }`}
                            animate={{ x: isOn ? 21 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
