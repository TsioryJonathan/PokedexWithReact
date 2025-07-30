import { motion } from "framer-motion";
import { Zap, Info } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

const getHue = (str) =>
  str.split("").reduce((h, c) => h + c.charCodeAt(0), 0) % 360;

function MoveList({ moves, onMoveClick }) {
  return (
    <motion.ul
      className="grid grid-cols-2 md:grid-cols-3 gap-5 p-4 bg-slate-800 rounded-2xl shadow-inner max-h-[30rem] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
    >
      {moves.map((move) => {
        const formatted = move.name.replace(/-/g, " ");
        const hue = getHue(move.name);
        return (
          <motion.li
            key={move.name}
            variants={fade}
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative overflow-hidden flex items-center justify-between gap-2 px-4 py-3 text-white text-sm font-semibold rounded-xl border border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.2)] cursor-pointer"
            style={{
              background: `linear-gradient(135deg, hsl(${hue}, 70%, 45%), hsl(${
                (hue + 40) % 360
              }, 70%, 50%))`,
            }}
            title={formatted}
            onClick={() => onMoveClick(move.name)}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="truncate capitalize tracking-wide text-sm">
                {formatted}
              </span>
            </div>
            <Info className="w-4 h-4 text-white/80 group-hover:text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white/70 animate-pulse" />
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

export default MoveList;