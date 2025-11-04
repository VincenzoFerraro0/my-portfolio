import sitoFerraroPreview from '../assets/projects/sito-ferraro-preview.png';

// FRONTEND ICONS
import javascriptIcon from '../assets/icons/javascript.svg';
import typescriptIcon from '../assets/icons/typescript.svg';
import reactIcon from '../assets/icons/react.svg';
import bootstrapIcon from '../assets/icons/bootstrap.svg';
import tailwindIcon from '../assets/icons/tailwindcss.svg';

// TOOLS ICON
import trello from '../assets/icons/trello.svg';
import gitHub from '../assets/icons/github.svg';
import gitHubDark from '../assets/icons/github-dark.svg';

// BACKEND ICONS
import nodeIcon from '../assets/icons/nodejs.svg';
import expressIcon from '../assets/icons/express.svg';
import expressIconDark from '../assets/icons/express-dark.svg';
import mysqlIcon from '../assets/icons/mysql.svg';
import mongoDB from '../assets/icons/mongodb.svg'


// TOOLS ICON
export const toolsSkills = [
  { name: 'GitHub', iconLight: gitHub, iconDark: gitHubDark },
  { name: 'Trello', iconLight: trello, iconDark: trello }, // stessa icona per dark/light
];

// FRONTEND ICONS
export const frontendSkills = [
  { name: 'JavaScript', iconLight: javascriptIcon, iconDark: javascriptIcon },
  { name: 'TypeScript', iconLight: typescriptIcon, iconDark: typescriptIcon },
  { name: 'React', iconLight: reactIcon, iconDark: reactIcon },
  { name: 'Bootstrap', iconLight: bootstrapIcon, iconDark: bootstrapIcon },
  { name: 'Tailwind CSS', iconLight: tailwindIcon, iconDark: tailwindIcon },
];

// BACKEND ICONS
export const backendSkills = [
  { name: 'Node.js', iconLight: nodeIcon, iconDark: nodeIcon },
  { name: 'Express', iconLight: expressIcon, iconDark: expressIconDark },
  { name: 'MySQL', iconLight: mysqlIcon, iconDark: mysqlIcon },
  { name: 'MongoDB', iconLight: mongoDB, iconDark: mongoDB },
];

// MENU ITEMS
export const menuItems = [
  { name: 'About', to: 'about' },
  { name: 'Projects', to: 'projects' },
  { name: 'Skills', to: 'skills' },
];

// PROJECTS

export const projects = [
  {
    title: 'Sito - Ferraro S.R.L.S',
    description: 'Sito web aziendale per Ferraro S.R.L.S., realizzato con stack moderno React e ottimizzato per performance, accessibilità e facilità di manutenzione.',
    tech: ['React', 'TailwindCSS', 'EmailJS', 'Elfsight'],
    link: 'https://www.ferrarosrls.com',
    image: sitoFerraroPreview,
  }
];
