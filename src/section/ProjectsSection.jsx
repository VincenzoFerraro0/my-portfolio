import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects } from '../lib/data';


const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen px-6 lg:px-16 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-white/40 to-transparent dark:via-[#111]/60 lg:mt-18 mt-10">

      {/* Titolo */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-12 text-center"
      >
        I miei <span className="text-indigo-500 dark:text-[rgb(208,255,113)]">Progetti</span>
      </motion.h2>

      {/* Cards container */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-3xl bg-white/60 dark:bg-[rgba(15,15,15,0.8)] shadow-lg overflow-hidden flex flex-col"
          >
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            <div className="p-5 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-[rgb(208,255,113,0.15)] dark:text-[rgb(208,255,113)] border border-indigo-200 dark:border-[rgb(208,255,113,0.4)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center text-indigo-600 dark:text-[rgb(208,255,113)] hover:underline text-sm font-medium"
              >
                Visita il progetto <ExternalLink className="ml-1 w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
