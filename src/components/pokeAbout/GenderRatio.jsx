import { Heart } from "lucide-react";
import { FaMars, FaVenus, FaGenderless } from "react-icons/fa";
import Label from "../Label";

function GenderRatio({ male, female }) {
  return (
    <div>
      <Label icon={<Heart className="text-red-400" />} text="Gender Ratio" />
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
            <div className="bg-pink-500" style={{ width: `${female}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default GenderRatio;