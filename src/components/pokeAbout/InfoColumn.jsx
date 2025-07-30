import { aboutPokemon } from "@/constants/AboutPokemon";
import InfoRow from "../InfoRow";

function InfoColumn({ pokemon }) {
  return (
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
  );
}

export default InfoColumn;