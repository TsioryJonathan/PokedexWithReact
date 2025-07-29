// components/TrendingBadge.jsx
import { Flame } from "lucide-react";
import clsx from "clsx";
import useDarkTheme from "@/hooks/useDarkTheme";

export default function TrendingBadge({
  className = "",
  rotate = -12,
  label = "Trending Pokémon",
}) {
  const isDark = useDarkTheme();
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-1.5 px-5 py-3 w-fit",
        "select-none",
        "text-[12px] font-bold tracking-[0.25em] uppercase",
        "border border-amber-300/50",
        `${isDark ? "text-amber-100" : "text-amber-900"} drop-shadow`,
        `${
          isDark
            ? "shadow-[0_4px_18px_-4px_rgba(36,72,251,0.55)]"
            : "shadow-[0_4px_18px_-4px_rgba(251,191,36,0.55)]"
        }`,
        "backdrop-blur-md rounded-full",

        "z-[99]",
        className
      )}
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <Flame
        size={20}
        className={`${
          isDark ? "text-amber-200" : "text-amber-700"
        } drop-shadow-[0_0_6px_rgba(255,200,80,0.8)]
                   animate-[flameFlicker_2.8s_ease-in-out_infinite]`}
      />
      <span className="pr-0.5">{label}</span>
    </div>
  );
}
