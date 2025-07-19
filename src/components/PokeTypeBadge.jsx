import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import getTypeColor from "@/utils/getTypeColor";
import getTypeIcon from "@/utils/getTypeIcon";
function PokeTypeBadge({ type }) {
  const className = getTypeColor(type);
  const Icon = getTypeIcon(type);

  return (
    <Badge
      className={cn(
        "capitalize px-3 py-1 text-[12px] font-bold text-white flex items-center justify-center",
        className
      )}
    >
      <Icon className="text-white text-2xl" />
      {type.toUpperCase()}
    </Badge>
  );
}

export default PokeTypeBadge;
