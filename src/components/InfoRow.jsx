import useDarkTheme from "@/hooks/useDarkTheme";

const InfoRow = ({ icon, label, value }) => {
  const isDark = useDarkTheme();

  return (
    <div className="flex items-start gap-3">
      <div
        className={`p-2 rounded-md ${
          isDark ? "bg-white/10" : "bg-black/10"
        } flex items-center justify-center`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p
          className={`text-sm font-bold uppercase tracking-wide ${
            isDark ? "text-white/80" : "text-white"
          }`}
        >
          {label}
        </p>
        <p className="font-normal capitalize text-sm text-white">{value || "—"}</p>
      </div>
    </div>
  );
};

export default InfoRow;
