const MiniStat = ({ label, value, hint }) => (
  <div className="bg-white/10 rounded p-2 flex flex-col">
    <span className="text-[14px] font-bold uppercase tracking-wide text-white">
      {label}
    </span>
    <span className="text-sm font-semibold text-white/50">{value ?? "—"}</span>
    {hint && <span className="text-[10px] text-white/40">{hint}</span>}
  </div>
);

export default MiniStat;