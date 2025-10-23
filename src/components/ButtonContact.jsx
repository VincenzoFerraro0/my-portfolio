export default function Button() {
  return (
    <button
      className="
        group relative overflow-hidden rounded-full px-6 py-2 font-medium text-white 
        transition-transform duration-300 active:scale-95
        bg-gradient-to-r from-[rgb(94,103,230)] to-[rgb(142,94,230)]
        dark:from-[rgb(208,255,113)] dark:to-[rgb(123,207,67)] dark:text-black
      "
    >
      <span className="relative z-10">Contact</span>
      
      {/* Overlay animato come ::before */}
      <span
        className="
          absolute inset-0 -left-[10%] w-[120%] skew-x-[30deg] 
          bg-gray-800 dark:bg-gray-200 
          transform translate-x-0 
          transition-transform duration-500 ease-[cubic-bezier(0.3,1,0.8,1)]
          group-hover:translate-x-full
        "
      />
    </button>
  );
}
