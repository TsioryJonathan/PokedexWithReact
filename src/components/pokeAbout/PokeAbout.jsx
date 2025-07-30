import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import pokemonColors from "@/utils/pokemonColors";
import { ratioGender } from "@/constants/AboutPokemon";
import { prettyName as pretty, getStatColor } from "@/constants/SummaryStats";
import Badges from "./Badges";
import InfoColumn from "./InfoColumn";
import GenderRatio from "./GenderRatio";
import StatsGrid from "./StatsGrid";
import EVYields from "./EVYields";
import HeldItems from "./HeldItems";
import Abilities from "./Abilities";
import TotalStats from "./TotalStats";

function PokeAbout({ pokemonName }) {
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);
  const bgColor = pokemonColors[pokemon?.color] || pokemonColors.default;

  if (loading) return <div className="text-center py-8">Loading…</div>;
  if (error || !pokemon) return <div className="text-center text-red-500">Error</div>;

  const { male, female } = ratioGender(pokemon.gender_rate);
  const hatchSteps = `${pokemon.hatch_counter * 255}-${pokemon.hatch_counter * 257}`;
  const capturePercent = ((pokemon.capture_rate / 255) * 100).toFixed(1);
  const totalStats = pokemon.stats.reduce((a, s) => a + s.value, 0);
  const avgStat = (totalStats / pokemon.stats.length).toFixed(1);

  return (
    <div className="rounded-lg p-6 space-y-6 text-white" style={{ backgroundColor: bgColor }}>
      <Badges pokemon={pokemon} pretty={pretty} />
      <div className="grid md:grid-cols-2 gap-6">
        <InfoColumn pokemon={pokemon} />
        <div className="space-y-6">
          <GenderRatio male={male} female={female} />
          <StatsGrid
            captureRate={`${pokemon.capture_rate} (${capturePercent}%)`}
            baseHappiness={pokemon.base_happiness}
            baseExp={pokemon.base_experience}
            hatchSteps={hatchSteps}
            hatchCycles={pokemon.hatch_counter}
          />
          <EVYields evYields={pokemon.ev_yields} pretty={pretty} getStatColor={getStatColor} />
          <HeldItems heldItems={pokemon.held_items} pretty={pretty} />
          <Abilities abilities={pokemon.abilities} pretty={pretty} />
          <TotalStats stats={pokemon.stats} totalStats={totalStats} avgStat={avgStat} getStatColor={getStatColor} />
        </div>
      </div>
    </div>
  );
}

export default PokeAbout;