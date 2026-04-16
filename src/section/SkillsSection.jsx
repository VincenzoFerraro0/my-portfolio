import { motion } from 'framer-motion';
import { frontendSkills, backendSkills, toolsSkills } from '../lib/data';
import { useEffect, useState } from 'react';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
};

export default function SkillsSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Imposta lo stato iniziale
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    // Observer per aggiornare lo stato live quando cambia la classe 'dark'
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="min-h-screen px-6 lg:px-16 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-white/40 to-transparent dark:via-[#111]/60  mt-18"
    >
      {/* Titolo */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-12 text-center"
      >
        Le mie <span className="text-indigo-500 dark:text-[rgb(208,255,113)]">Skills</span>
      </motion.h2>

      {/* Frontend */}
      <SkillCategory title="Frontend" skills={frontendSkills} columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-5" isDarkMode={isDarkMode} />

      {/* Backend */}
      <SkillCategory title="Backend" skills={backendSkills} columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-4" isDarkMode={isDarkMode} />

      {/* Tools */}
      <SkillCategory title="Tools" skills={toolsSkills} columns="grid-cols-2 sm:grid-cols-3 md:grid-cols-4" isDarkMode={isDarkMode} />
    </section>
  );
}

function SkillCategory({ title, skills, columns, isDarkMode }) {
  return (
    <motion.div
      className="w-full max-w-6xl mb-12"
      initial="hidden"
      whileInView="visible"
      variants={container}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">{title}</h3>
      <div className={`grid ${columns} gap-6`}>
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-3xl bg-white/60 dark:bg-[rgba(15,15,15,0.8)] shadow-lg p-5 flex flex-col items-center justify-center"
          >
            <img
              src={isDarkMode ? skill.iconDark : skill.iconLight}
              alt={skill.name}
              width="64"
              height="64"
              className="w-16 h-16 mb-3 transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
            <span className="text-gray-900 dark:text-gray-100 font-medium">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
