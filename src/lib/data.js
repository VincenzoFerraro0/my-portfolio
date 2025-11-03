import sitoFerraroPreview from '../assets/projects/sito-ferraro-preview.png';



export const projects = [
  {
    title: 'Sito - Ferraro S.R.L.S',
    description: 'Sito web aziendale per Ferraro S.R.L.S., realizzato con stack moderno React e ottimizzato per performance, accessibilità e facilità di manutenzione.',
    tech: ['React','TailwindCSS','EmailJS', 'Elfsight'],
    link: 'https://www.ferrarosrls.com',
    image: sitoFerraroPreview,
  },
  {
    title: 'E-commerce UI',
    description: 'Prototipo moderno di interfaccia e-commerce con focus su UX e animazioni.',
    tech: ['Next.js', 'TypeScript', 'Stripe API'],
    link: 'https://ecommerce-demo.it',
    image: 'https://via.placeholder.com/600x400?text=E-commerce+UI',
  },
  {
    title: 'AI Chatbot',
    description: 'Assistente intelligente sviluppato con OpenAI API e Node.js.',
    tech: ['Node.js', 'OpenAI API', 'Express'],
    link: 'https://chatbot-demo.it',
    image: 'https://via.placeholder.com/600x400?text=AI+Chatbot',
  },
];


export const links = [
  { name: 'About', to: 'about' },
  { name: 'Projects', to: 'projects' },
  { name: 'Skills', to: 'skills' },
];