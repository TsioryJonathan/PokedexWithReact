const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 rounded-md bg-white/10 flex items-center justify-center">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-xs uppercase tracking-wide text-white/60">{label}</p>
      <p className="font-semibold capitalize text-sm">{value || "—"}</p>
    </div>
  </div>
);
export default InfoRow;
