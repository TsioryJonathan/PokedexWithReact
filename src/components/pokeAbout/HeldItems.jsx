import { Star } from "lucide-react";
import Label from "../Label";

function HeldItems({ heldItems, pretty }) {
  if (!heldItems?.length) return null;
  return (
    <div>
      <Label icon={<Star className="text-yellow-300" />} text="Held Items" />
      <p className="text-sm mt-1 capitalize">{heldItems.map(pretty).join(", ")}</p>
    </div>
  );
}

export default HeldItems;