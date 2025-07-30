import { Puzzle } from "lucide-react";
import Label from "../Label";

function EVYields({ evYields, pretty, getStatColor }) {
  if (!evYields?.length) return null;
  return (
    <div>
      <Label icon={<Puzzle className="text-green-300" />} text="EV Yields" />
      <ul className="mt-2 text-sm flex flex-wrap gap-2">
        {evYields.map((ev) => (
          <li
            key={ev.stat}
            className="bg-white/15 px-2 py-1 rounded-md flex items-center gap-2"
          >
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${getStatColor(ev.stat)}`} />
            <span className="capitalize">{ev.effort} {pretty(ev.stat)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EVYields;