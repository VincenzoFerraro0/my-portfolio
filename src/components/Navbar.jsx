import fotoProfilo from '../assets/img/foto-profilo.png';
import ButtonContact from '../components/ButtonContact';

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center justify-between w-[90%] max-w-[500px] px-3 py-2 rounded-4xl border border-gray-200 bg-white/80  z-50  dark:bg-[rgba(15,15,15,0.9)]">
      
      {/* Avatar */}
      <div className="flex items-center">
        <img
          src={fotoProfilo}
          alt="Portfolio Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      {/* Links */}
      <div className="flex space-x-6 font-medium text-gray-800 dark:text-gray-200">
        <a href="/" className="hover:text-indigo-500 dark:hover:text-[rgb(208,255,113)] transition">Home</a>
        <a href="/about" className="hover:text-indigo-500 dark:hover:text-[rgb(208,255,113)] transition">About</a>
        <a href="/projects" className="hover:text-indigo-500 dark:hover:text-[rgb(208,255,113)] transition">Projects</a>
        <a href="/blogs" className="hover:text-indigo-500 dark:hover:text-[rgb(208,255,113)] transition">Blogs</a>
      </div>

      {/* Contact Button */}
     <ButtonContact />
    </nav>
  );
}
