import { Puzzle } from "lucide-react";
import Label from "../Label";

function Abilities({ abilities, pretty }) {
  if (!abilities?.length) return null;
  return (
    <div>
      <Label icon={<Puzzle className="text-purple-300" />} text="Abilities" />
      <ul className="mt-2 flex flex-wrap gap-2 text-sm">
        {abilities.map((ability) => (
          <li
            key={ability.name}
            className="bg-white/15 text-white/90 px-3 py-1 rounded-full capitalize tracking-wide font-medium shadow-sm backdrop-blur-sm"
          >
            {pretty(ability.name)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Abilities;