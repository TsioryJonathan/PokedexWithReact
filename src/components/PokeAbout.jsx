import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import pokemonColors from "@/utils/pokemonColors";
import { Heart, Puzzle, Star } from "lucide-react";
import { aboutPokemon, ratioGender } from "@/constants/AboutPokemon";
import InfoRow from "./InfoRow";
import MiniStat from "./MiniStat";
import Label from "./Label";
import {
  FaMars,
  FaVenus,
  FaGenderless,
  FaCrown,
  FaBaby,
  FaDragon,
} from "react-icons/fa";
import { Badge } from "./ui/badge";
import {
  prettyName as pretty,
  getStatColor as progressColor,
} from "@/constants/SummaryStats";

function PokeAbout({ pokemonName }) {
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);

  const bgColor = pokemonColors[pokemon?.color] || pokemonColors.default;

  if (loading) return <div className="text-center py-8">Loading…</div>;
  if (error || !pokemon)
    return <div className="text-center text-red-500">Error</div>;

  const { male, female } = ratioGender(pokemon.gender_rate);
  const hatchMin = pokemon.hatch_counter * 255;
  const hatchMax = pokemon.hatch_counter * 257;
  const capturePercent = ((pokemon.capture_rate / 255) * 100).toFixed(1);

  const totalStats = pokemon.stats.reduce((a, s) => a + s.value, 0);
  const avgStat = (totalStats / pokemon.stats.length).toFixed(1);

  console.log(pokemon.abilities);

  return (
    <div
      className="rounded-lg p-6 space-y-6 text-white"
      style={{ backgroundColor: bgColor }}
    >
      {/* Header / Badges */}
      <div className="flex flex-wrap gap-2">
        {pokemon.is_legendary && (
          <Badge className="bg-yellow-500 text-black font-semibold flex items-center gap-1">
            <FaCrown /> Legendary
          </Badge>
        )}
        {pokemon.is_mythical && (
          <Badge className="bg-pink-500 text-white font-semibold flex items-center gap-1">
            <FaDragon /> Mythical
          </Badge>
        )}
        {pokemon.is_baby && (
          <Badge className="bg-teal-500 text-white font-semibold flex items-center gap-1">
            <FaBaby /> Baby
          </Badge>
        )}
        <Badge className="bg-white/20 font-semibold text-text ">
          {pretty(pokemon.generation)}
        </Badge>
        <Badge className="bg-white/10 font-semibold text-text ">
          {pretty(pokemon.shape)} Shape
        </Badge>
        <Badge className="bg-white/10 font-semibold text-text ">
          Color: {pretty(pokemon.color)}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Colonne 1 */}
        <div className="space-y-4">
          {aboutPokemon(pokemon).map((item) => (
            <InfoRow
              key={item.label}
              icon={item.icon}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <Label
              icon={<Heart className="text-red-400" />}
              text="Gender Ratio"
            />
            {male === null ? (
              <p className="text-sm mt-1 flex items-center gap-2">
                <FaGenderless /> Genderless
              </p>
            ) : (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center gap-1 text-blue-200">
                    <FaMars /> {male.toFixed(1)}%
                  </span>
                  <span className="flex items-center gap-1 text-pink-200">
                    <FaVenus /> {female.toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 w-full bg-white/10 rounded overflow-hidden flex">
                  <div className="bg-blue-500" style={{ width: `${male}%` }} />
                  <div
                    className="bg-pink-500"
                    style={{ width: `${female}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MiniStat
              label="Capture Rate"
              value={`${pokemon.capture_rate} (${capturePercent}%)`}
            />
            <MiniStat label="Base Happiness" value={pokemon.base_happiness} />
            <MiniStat label="Base Exp" value={pokemon.base_experience} />
            <MiniStat
              label="Hatch Steps"
              value={`${hatchMin}-${hatchMax}`}
              hint={`${pokemon.hatch_counter} cycles`}
            />
          </div>
          {/* EV Yields */}
          {pokemon.ev_yields?.length > 0 && (
            <div>
              <Label
                icon={<Puzzle className="text-green-300" />}
                text="EV Yields"
              />
              <ul className="mt-2 text-sm flex flex-wrap gap-2">
                {pokemon.ev_yields.map((ev) => (
                  <li
                    key={ev.stat}
                    className="bg-white/15 px-2 py-1 rounded-md flex items-center gap-2"
                  >
                    <span
                      className={`inline-block w-2.5 h-2.5 rounded-full ${progressColor(
                        ev.stat
                      )}`}
                    />
                    <span className="capitalize">
                      {ev.effort} {pretty(ev.stat)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Held Items */}
          {pokemon.held_items?.length > 0 && (
            <div>
              <Label
                icon={<Star className="text-yellow-300" />}
                text="Held Items"
              />
              <p className="text-sm mt-1 capitalize">
                {pokemon.held_items.map(pretty).join(", ")}
              </p>
            </div>
          )}
          Abilities
          {pokemon.abilities?.length > 0 && (
            <div>
              <Label
                icon={<Puzzle className="text-purple-300" />}
                text="Abilities"
              />
              <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                {pokemon.abilities.map((ability) => (
                  <li
                    key={ability.name}
                    className="bg-white/15 text-white/90 px-3 py-1 rounded-full capitalize tracking-wide font-medium shadow-sm backdrop-blur-sm"
                  >
                    {pretty(ability.name)}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="bg-white/10 rounded p-3 space-y-2">
            <div className="flex justify-between text-md text-white/70">
              <span>Total</span>
              <span>{totalStats}</span>
            </div>
            <div className="flex justify-between text-md text-white/70">
              <span>Average</span>
              <span>{avgStat}</span>
            </div>
            <div className="flex gap-2 flex-wrap mt-1">
              {pokemon.stats.map((s) => (
                <span
                  key={s.name}
                  className="text-[12px] tracking-wide bg-white/15 px-2 py-1 rounded uppercase flex items-center gap-1"
                >
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${progressColor(
                      s.name
                    )}`}
                  />
                  {s.value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokeAbout;
