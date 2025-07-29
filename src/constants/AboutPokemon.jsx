import { Ruler, Weight, Sparkles, Egg, BarChart, Globe } from "lucide-react";
import { prettyName as pretty } from "./SummaryStats";

export function ratioGender(gender_rate) {
  if (gender_rate === -1) return { male: null, female: null };
  const female = (gender_rate / 8) * 100;
  const male = 100 - female;
  return { male, female };
}


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