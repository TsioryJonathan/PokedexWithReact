import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

function PokemonImageTilt({ pokemon, isDark, fade, accent }) {
  const ref = useRef(null);
  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const rX = useTransform(mvy, [-55, 55], [12, -12]);
  const rY = useTransform(mvx, [-55, 55], [-12, 12]);

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mvx.set(e.clientX - (r.left + r.width / 2));
    mvy.set(e.clientY - (r.top + r.height / 2));
  };
  const onLeave = () => {
    mvx.set(0);
    mvy.set(0);
  };

  return (
    <motion.div
      {...fade(0.05)}
      className="relative flex items-center justify-center order-1 md:order-none"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rX, rotateY: rY }}
    >
      <div
        className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br ${accent.grad} opacity-25 blur-2xl`}
      />
      <div
        className={`absolute w-56 h-56 md:w-72 md:h-72 rounded-full ${
          isDark ? "bg-slate-950/50 border-white/10" : "bg-black/10 border-black/20"
        }`}
      />
      <motion.img
        src={pokemon.image}
        alt={pokemon.name}
        draggable="false"
        className="relative w-56 h-56 md:w-72 md:h-72 object-contain select-none drop-shadow-[0_10px_32px_rgba(0,0,0,0.55)]"
        whileHover={{ scale: 1.045 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
      />
      <div
        className={`absolute top-2 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-500/50 ${
          isDark ? "text-white/70" : "border-black/15 text-black/70"
        } backdrop-blur`}
      >
        #{pokemon.id.toString().padStart(4, "0")}
      </div>
    </motion.div>
  );
}

export default PokemonImageTilt;