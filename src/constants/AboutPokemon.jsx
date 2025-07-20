import { Ruler, Weight, Sparkles, Egg, BarChart, Globe } from "lucide-react";
export function ratioGender(gender_rate) {
  if (gender_rate === -1) return { male: null, female: null };
  const female = (gender_rate / 8) * 100;
  const male = 100 - female;
  return { male, female };
}

export const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 rounded-md bg-white/10 flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-xs uppercase tracking-wide text-white/60">{label}</p>
      <p className="font-semibold capitalize text-sm">{value || "—"}</p>
    </div>
  </div>
);

export const MiniStat = ({ label, value, hint }) => (
  <div className="bg-white/10 rounded p-2 flex flex-col">
    <span className="text-[14px] font-bold uppercase tracking-wide text-white">
      {label}
    </span>
    <span className="text-sm font-semibold text-white/50">{value ?? "—"}</span>
    {hint && <span className="text-[10px] text-white/40">{hint}</span>}
  </div>
);

export const Label = ({ icon, text }) => (
  <div className="flex items-center gap-2 font-semibold">
    <span className="p-1 bg-white/10 rounded">{icon}</span>
    <span className="text-sm uppercase tracking-wide text-white/70">
      {text}
    </span>
  </div>
);

export const aboutPokemon = (pokemon) => {
  if (!pokemon) return [];
  return [
    {
      icon: <Ruler />,
      label: "Height",
      value: `${pokemon.height / 10} m`,
    },
    {
      icon: <Weight />,
      label: "Weight",
      value: `${pokemon.weight / 10} kg`,
    },
    {
      icon: <Sparkles className="text-yellow-300" />,
      label: "Abilities",
      value: Array.isArray(pokemon.abilities)
        ? pokemon.abilities
            .map((a) => `${a.name}${a.is_hidden ? " (Hidden)" : ""}`)
            .join(", ")
        : "—",
    },
    {
      icon: <Egg />,
      label: "Egg Groups",
      value: Array.isArray(pokemon.egg_groups)
        ? pokemon.egg_groups.map(pretty).join(", ")
        : "—",
    },
    {
      icon: <BarChart />,
      label: "Growth Rate",
      value: pokemon.growth_rate ? pretty(pokemon.growth_rate) : "—",
    },
    {
      icon: <Globe />,
      label: "Habitat",
      value: pokemon.habitat ? pretty(pokemon.habitat) : "—",
    },
  ];
};