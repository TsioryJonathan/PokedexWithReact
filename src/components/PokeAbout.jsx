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
  Star,
} from "lucide-react";
import {
  FaMars,
  FaVenus,
  FaGenderless,
  FaCrown,
  FaBaby,
  FaDragon,
} from "react-icons/fa";
import { Badge } from "./ui/badge";

const pretty = (s) =>
  s ? s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

function ratioGender(gender_rate) {
  if (gender_rate === -1) return { male: null, female: null };
  const female = (gender_rate / 8) * 100;
  const male = 100 - female;
  return { male, female };
}

function progressColor(statName) {
  switch (statName) {
    case "hp":
      return "bg-red-500";
    case "attack":
      return "bg-orange-500";
    case "defense":
      return "bg-yellow-500";
    case "special-attack":
      return "bg-purple-500";
    case "special-defense":
      return "bg-indigo-500";
    case "speed":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}

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
          <InfoRow
            icon={<Ruler />}
            label="Height"
            value={`${pokemon.height / 10} m`}
          />
          <InfoRow
            icon={<Weight />}
            label="Weight"
            value={`${pokemon.weight / 10} kg`}
          />
          <InfoRow
            icon={<Sparkles className="text-yellow-300" />}
            label="Abilities"
            value={pokemon.abilities
              .map((a) => `${a.name}${a.is_hidden ? " (Hidden)" : ""}`)
              .join(", ")}
          />
          <InfoRow
            icon={<Egg />}
            label="Egg Groups"
            value={pokemon.egg_groups.map(pretty).join(", ")}
          />
          <InfoRow
            icon={<BarChart />}
            label="Growth Rate"
            value={pretty(pokemon.growth_rate)}
          />
          <InfoRow
            icon={<Globe />}
            label="Habitat"
            value={pretty(pokemon.habitat)}
          />
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

const InfoRow = ({ icon, label, value }) => (
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

const MiniStat = ({ label, value, hint }) => (
  <div className="bg-white/10 rounded p-2 flex flex-col">
    <span className="text-[14px] font-bold uppercase tracking-wide text-white">
      {label}
    </span>
    <span className="text-sm font-semibold text-white/50">{value ?? "—"}</span>
    {hint && <span className="text-[10px] text-white/40">{hint}</span>}
  </div>
);

const Label = ({ icon, text }) => (
  <div className="flex items-center gap-2 font-semibold">
    <span className="p-1 bg-white/10 rounded">{icon}</span>
    <span className="text-sm uppercase tracking-wide text-white/70">
      {text}
    </span>
  </div>
);

export default PokeAbout;
