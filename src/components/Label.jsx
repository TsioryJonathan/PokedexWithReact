const Label = ({ icon, text }) => (
  <div className="flex items-center gap-2 font-semibold">
    <span className="p-1 bg-white/10 rounded">{icon}</span>
    <span className="text-sm uppercase tracking-wide text-white/70">
      {text}
    </span>
  </div>
);

export default Label;
