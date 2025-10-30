import { FaXTwitter, FaInstagram, FaBehance, FaDribbble } from "react-icons/fa6";

export default function AboutMe() {
  return (
    <section className="min-h-screen text-gray-800 dark:text-gray-200 flex flex-col md:flex-row items-center justify-center px-8 py-16 gap-12">
      {/* Left Text Section */}
      <div className="max-w-lg">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">ABOUT ME</h1>

        <h2 className="text-2xl font-semibold mb-4 uppercase">vincenzo ferraro</h2>

        <p className=" mb-4 leading-relaxed">
          I’m a digital designer and Framer developer passionate about crafting meaningful,
          user-centered experiences.
        </p>

        <p className="leading-relaxed">
          With a strong foundation in visual design and a deep understanding of interactive systems,
          I bring ideas to life through thoughtful design, smooth animations, and responsive layouts.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-5 text-neutral-400 text-2xl py-2">
          <a href="#" className="hover:text-white transition-colors"><FaXTwitter /></a>
          <a href="#" className="hover:text-white transition-colors"><FaInstagram /></a>
          <a href="#" className="hover:text-white transition-colors"><FaBehance /></a>
          <a href="#" className="hover:text-white transition-colors"><FaDribbble /></a>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="shrink-0">
        <img
          src="https://framerusercontent.com/images/qrxY8NagVO40NBrdhFEGgFR3PYY.jpg" // <-- sostituisci con il tuo percorso immagine
          alt="Profile"
          className="rounded-3xl w-80 md:w-96 object-cover shadow-lg"
        />
      </div>
    </section>
  );
}
