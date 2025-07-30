import { motion } from "framer-motion";

function PokemonImage({ pokemon, isDark, fadeIn }) {
  return (
    <motion.div
      className="relative md:w-1/3 flex justify-center items-center"
      {...fadeIn(0.2)}
    >
      <div
        className={`absolute h-60 w-60 ${isDark ? "bg-white/20" : "bg-black/20"} blur-2xl rounded-full`}
      />
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="relative h-60 w-60 object-contain drop-shadow-lg"
        loading="lazy"
      />
      <span
        className={`absolute -top-2 -left-2 text-sm font-bold px-2 py-1 rounded-md ${
          isDark ? "bg-white/90 text-slate-900" : "bg-black/40 text-white"
        }`}
      >
        #{String(pokemon.id).padStart(3, "0")}
      </span>
    </motion.div>
  );
}

export default PokemonImage;