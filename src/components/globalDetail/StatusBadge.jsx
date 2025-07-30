import { motion } from "framer-motion";
import { Crown, Star } from "lucide-react";

function StatusBadge({ isLegendary, isMythical, isDark, fade, showIcon = false }) {
  if (!isLegendary && !isMythical) return null;
  const gradient = isLegendary
    ? showIcon
      ? "from-amber-400 to-yellow-200/40"
      : "from-yellow-400 to-yellow-600 text-slate-900"
    : showIcon
    ? "from-pink-400 to-pink-600/40"
    : "from-pink-400 to-pink-600 text-white";
  return (
    <motion.div
      className={`absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-bold uppercase z-10 bg-gradient-to-r ${gradient}`}
      {...(showIcon && fade ? fade(0.3) : {})}
    >
      {showIcon && isLegendary && (
        <Crown className={`w-5 h-5 ${isDark ? "text-yellow-300" : "text-yellow-700"} animate-pulse`} />
      )}
      {showIcon && isMythical && (
        <Star className={`w-5 h-5 ${isDark ? "text-pink-300" : "text-pink-700"} animate-pulse`} />
      )}
      {isLegendary ? "Legendary" : "Mythical"}
    </motion.div>
  );
}

export default StatusBadge;