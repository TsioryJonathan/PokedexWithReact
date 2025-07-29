import { Volume2 } from "lucide-react";
import React from "react";

function CryButton({ pokemon, className }) {
  return (
    <button
      onClick={() => new Audio(pokemon.cries).play()}
      className={`group relative inline-flex items-center gap-2 cursor-pointer w-fit mt-2 
             rounded-xl bg-gradient-to-r from-indigo-500/70 to-pink-500/70 
             px-4 py-2 text-sm font-medium text-white shadow 
             hover:from-indigo-500 hover:to-pink-500 transition
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/60 ${className}`}
    >
      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition">
        <Volume2 className="w-3 h-3" />
      </span>
      Cry
    </button>
  );
}

export default CryButton;
