import { Pointer } from "lucide-react";
import { Link } from "react-scroll";

export default function ButtonContact({ staticGradient, onClick }) {
  return (
    <Link
      to="contact"        // <-- ID della sezione contatti
      smooth={true}       // scroll morbido
      duration={600}      // durata dell’animazione
      offset={-100}       // per compensare la navbar fissa
      spy={true}
      onClick={onClick} // <-- importante!

    >
      <button
        className={`
          group relative overflow-hidden rounded-full px-6 py-2 font-medium text-white 
          transition-transform duration-300 active:scale-95 cursor-pointer
          ${staticGradient
            ? "bg-linear-to-r from-[rgb(94,103,230)] to-[rgb(142,94,230)] dark:from-[rgb(208,255,113)] dark:to-[rgb(123,207,67)] dark:text-black"
            : "bg-linear-to-r from-[rgb(94,103,230)] to-[rgb(142,94,230)] dark:from-[rgb(208,255,113)] dark:to-[rgb(123,207,67)] dark:text-black"
          }
        `}
      >
        <span className="relative z-10">Contact</span>

        {/* Overlay animato SOLO se non staticGradient */}
        {!staticGradient && (
          <span
            className="
              absolute inset-0 -left-[10%] w-[120%] skew-x-30
              bg-gray-800 dark:bg-gray-200 
              transform translate-x-0 
              transition-transform duration-500 ease-[cubic-bezier(0.3,1,0.8,1)]
              group-hover:translate-x-full
            "
          />
        )}
      </button>
    </Link>
  );
}
