import useDarkTheme from "@/hooks/useDarkTheme";

const Label = ({ icon, text }) => {
  const isDark = useDarkTheme();

  return (
    <div className="flex items-center gap-2 font-semibold">
      <span className={`p-1 ${isDark ? "bg-white/10" : "bg-black/10"} rounded`}>
        {icon}
      </span>
      <span
        className={`text-sm uppercase tracking-wide ${
          isDark ? "text-white/70" : "text-white"
        }`}
      >
        {text}
      </span>
    </div>
  );
};

export default Label;
