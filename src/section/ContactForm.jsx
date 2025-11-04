import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";

export default function ContactSection() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Messaggio inviato con successo! ✅");
          e.target.reset();
        },
        (error) => {
          console.error("Errore nell'invio:", error.text);
          alert("Si è verificato un errore. Riprova più tardi ❌");
        }
      );
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center text-gray-800 dark:text-white px-8 pt-20 pb-20"
    >
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* === TEXT AREA === */}
        <div className="flex-1 max-w-xl text-center lg:text-left">
          <h2 className="text-indigo-500 dark:text-[rgb(208,255,113)] text-4xl md:text-7xl font-extrabold mb-6 tracking-tight uppercase">
            restiamo in contatto
          </h2>

          <p className="text-lg leading-relaxed mb-4">
            Sono sempre aperto a nuove opportunità e collaborazioni.  
            Non esitare a contattarmi per discutere di progetti interessanti,  
            condividere idee o semplicemente per fare una chiacchierata sul mondo dello sviluppo web!
          </p>

          <p className="leading-relaxed">
            Che si tratti di un nuovo progetto, un consiglio tecnico o una collaborazione creativa,  
            sarò felice di ascoltarti e costruire qualcosa di straordinario insieme.  
            La passione per la tecnologia, il design e la crescita continua  
            mi spinge a dare sempre il massimo in ogni sfida.
          </p>

          {/* === SOCIAL ICONS === */}
          <div className="flex justify-center lg:justify-start space-x-6 text-neutral-400 text-3xl mt-8">
            <a
              href="https://www.linkedin.com/in/vincenzo-ferraro-567a60380"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://github.com/VincenzoFerraro0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-gray-300 transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* === FORM AREA === */}
        <div className="flex-1 w-full max-w-lg">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-col space-y-6 bg-white/70 dark:bg-[rgba(28,28,28,0.9)] 
                       rounded-3xl shadow-xl p-8"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[rgb(208,255,113)] outline-none"
                placeholder="Il tuo nome"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="user_email"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[rgb(208,255,113)] outline-none"
                placeholder="La tua email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Messaggio</label>
              <textarea
                name="message"
                rows="5"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[rgb(208,255,113)] outline-none resize-none"
                placeholder="Scrivi qui il tuo messaggio..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-linear-to-r from-[rgb(94,103,230)] to-[rgb(142,94,230)]
                         dark:from-[rgb(208,255,113)] dark:to-[rgb(123,207,67)] 
                         text-white dark:text-black font-semibold py-3 px-6 rounded-full 
                         hover:scale-105 transition-transform duration-300"
            >
              <FaPaperPlane />
              Invia Messaggio
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
