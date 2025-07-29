import useIsDarkTheme from "@/hooks/useIsDarkTheme";

const InfoRow = ({ icon, label, value }) => {
  const isDark = useIsDarkTheme();

  return (
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-md ${isDark ? 'bg-white/10' : 'bg-black/10'} flex items-center justify-center`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className={`text-xs uppercase tracking-wide ${isDark ? 'text-white/60' : 'text-black/60'}`}>{label}</p>
        <p className="font-semibold capitalize text-sm">{value || "—"}</p>
      </div>
    </div>
  );
};

export default InfoRow;