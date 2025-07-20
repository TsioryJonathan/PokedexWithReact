import assets from "@/assets/assets";

export default function WinnerBadge() {
  return (
    <img
      src={assets.winnerBadge}
      alt="Winner"
      className="absolute -top-3 rotate-10 z-999 -left-5 w-16 h-16 object-contain"
    />
  );
}
