import { motion } from 'framer-motion';
import {
  Code,
  Server,


  PackageCheck,
  Database,
  Terminal,
  Zap,

  Mail,
  CreditCard,
} from 'lucide-react';

// Mapping tra skill e icona
const skillIcons = {
  React: <Code className="w-4 h-4 inline-block mr-1" />,
  'Next.js': <Code className="w-4 h-4 inline-block mr-1" />,
  TailwindCSS: <Zap className="w-4 h-4 inline-block mr-1" />,
  TypeScript: <Code className="w-4 h-4 inline-block mr-1" />,
  HTML: <Code className="w-4 h-4 inline-block mr-1" />,
  CSS: <Zap className="w-4 h-4 inline-block mr-1" />,
  'Framer Motion': <PackageCheck className="w-4 h-4 inline-block mr-1" />,
  'Node.js': <Server className="w-4 h-4 inline-block mr-1" />,
  Express: <Server className="w-4 h-4 inline-block mr-1" />,
  MongoDB: <Database className="w-4 h-4 inline-block mr-1" />,
  'REST APIs': <Terminal className="w-4 h-4 inline-block mr-1" />,
  'OpenAI API': <Zap className="w-4 h-4 inline-block mr-1" />,
  Vercel: <Code className="w-4 h-4 inline-block mr-1" />,
  EmailJS: <Mail className="w-4 h-4 inline-block mr-1" />,
  'Stripe API': <CreditCard className="w-4 h-4 inline-block mr-1" />,
};

const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TailwindCSS', 'TypeScript', 'HTML', 'CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'OpenAI API'],
  },
  {
    category: 'Tools & Others',
    items: ['Git', 'GitHub', 'Figma', 'Vercel', 'EmailJS', 'Stripe API'],
  },
];

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

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="min-h-screen py-24 px-6 lg:px-16 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-white/40 to-transparent dark:via-[#111]/60"
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

      {/* Cards container */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skills.map((skillGroup, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-3xl bg-white/60 dark:bg-[rgba(15,15,15,0.8)] shadow-lg overflow-hidden flex flex-col p-5"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((item, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-[rgb(208,255,113,0.15)] dark:text-[rgb(208,255,113)] border border-indigo-200 dark:border-[rgb(208,255,113,0.4)] flex items-center"
                >
                  {skillIcons[item]} {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
