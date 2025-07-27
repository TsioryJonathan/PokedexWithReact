import React, { useCallback } from "react";

export default function ScrollToDexButton({ targetId = "pokemon-list" }) {
  const scrollToDex = useCallback(() => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetId]);

  return (
    <button
      type="button"
      onClick={scrollToDex}
      className="
        fixed bottom-15 left-1/2 transform -translate-x-1/2
        flex flex-col items-center gap-2
        text-slate-300 hover:text-white transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        
        z-99
      "
    >
      <span className="text-sm uppercase tracking-widest font-semibold">
        Scroll to Pokédex
      </span>
      <svg
        className="w-6 h-6 motion-safe:animate-bounce"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}
