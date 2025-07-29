import React, { useCallback } from "react";
import useDarkTheme from "@/hooks/useDarkTheme";

export default function ScrollToDexButton({ targetId = "pokemon-list" }) {
  const isDark = useDarkTheme();
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
      className={`
        absolute bottom-5 cursor-pointer left-1/2 transform -translate-x-1/2
        flex flex-col items-center gap-2
        transition-colors z-10
        ${
          isDark
            ? "text-slate-300 hover:text-white focus:ring-indigo-500"
            : "text-black/70 hover:text-black focus:ring-amber-400"
        }
        focus:outline-none
      `}
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
