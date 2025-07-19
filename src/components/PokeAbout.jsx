import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import pokemonColors from "@/utils/pokemonColors";
import {
  Ruler,
  Weight,
  Globe,
  Heart,
  Sparkles,
  Egg,
  BarChart,
  Puzzle,
  Shapes,
} from "lucide-react";
import { FaMars, FaVenus, FaGenderless } from "react-icons/fa";

function PokeAbout({ pokemonName }) {
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);
  const genderRate = pokemon?.gender_rate || -1;
  const bgColor = pokemonColors[pokemon?.color] || pokemonColors.default;
  if (loading) return <div className="">Loading</div>;
  if (error || !pokemon) return <div className="">Error</div>;

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-md px-5 py-3"
      style={{ backgroundColor: bgColor }}
    >
      {/* Height & Weight */}
      <div className="flex items-center gap-4">
        <Ruler className="text-white" />
        <div>
          <p className="text-sm text-muted-foreground">Height</p>
          <p className="font-semibold">{pokemon.height / 10} m</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Weight className="text-yellow-500" />
        <div>
          <p className="text-sm text-muted-foreground">Weight</p>
          <p className="font-semibold">{pokemon.weight / 10} kg</p>
        </div>
      </div>

      {/* Abilities */}
      <div className="flex items-center gap-4">
        <Sparkles className="text-yellow-400" />
        <div>
          <p className="text-sm text-muted-foreground">Abilities</p>
          <p className="font-semibold capitalize">
            {pokemon.abilities
              .map((a) => `${a.name}${a.is_hidden ? " (Hidden)" : ""}`)
              .join(", ")}
          </p>
        </div>
      </div>

      {/* Gender */}
      <div className="flex items-center gap-4">
        <Heart className="text-red-500" />
        <div>
          <p className="text-sm text-muted-foreground">Gender</p>
          <p className="font-semibold">
            {genderRate === -1 ? (
              <>
                <FaGenderless className="inline mr-1" /> Genderless
              </>
            ) : (
              <>
                <FaMars className="inline text-blue-500 mr-1" />
                {((8 - genderRate) / 8) * 100}%{" "}
                <FaVenus className="inline text-pink-500 mx-1" />
                {(genderRate / 8) * 100}%
              </>
            )}
          </p>
        </div>
      </div>

      {/* Habitat */}
      <div className="flex items-center gap-4">
        <Globe className="text-amber-700" />
        <div>
          <p className="text-sm text-muted-foreground">Habitat</p>
          <p className="font-semibold capitalize">{pokemon.habitat}</p>
        </div>
      </div>

      {/* Growth Rate */}
      <div className="flex items-center gap-4">
        <BarChart className="text-green-200" />
        <div>
          <p className="text-sm text-muted-foreground">Growth Rate</p>
          <p className="font-semibold capitalize">{pokemon.growth_rate}</p>
        </div>
      </div>

      {/* Egg Groups */}
      <div className="flex items-center gap-4">
        <Egg className="text-white" />
        <div>
          <p className="text-sm text-muted-foreground">Egg Groups</p>
          <p className="font-semibold capitalize">
            {pokemon.egg_groups.join(", ")}
          </p>
        </div>
      </div>

      {/* Shape */}
      <div className="flex items-center gap-4">
        <Shapes className="text-white" />
        <div>
          <p className="text-sm text-muted-foreground">Body Shape</p>
          <p className="font-semibold capitalize">{pokemon.shape}</p>
        </div>
      </div>
    </div>
  );
}

export default PokeAbout;
