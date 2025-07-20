export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#05070d]">
      <div className="relative w-44 h-44">
        
        <div className="absolute inset-0 rounded-full border-[10px] border-white/10 animate-[spin_12s_linear_infinite]"></div>

        
        <div className="pokeball-shadow absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full rounded-full overflow-hidden border-[10px] border-black shadow-[0_0_25px_rgba(255,255,255,0.12),0_0_60px_rgba(255,0,0,0.2)] animate-float">
            <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-red-500 to-red-600" />
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-white to-slate-100" />
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_60%)] mix-blend-overlay" />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[10px] bg-black" />
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-white to-slate-100 border-[10px] border-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.9)]">
              <div className="absolute inset-0 rounded-full animate-ping-once bg-white/40" />
              <div className="w-6 h-6 rounded-full bg-white shadow-inner shadow-white/60" />
            </div>
          </div>
        </div>

       
        <div className="pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="absolute block w-2 h-2 rounded-full bg-amber-400/70 animate-particle"
              style={{
                top: `${50 + Math.sin(i) * 40}%`,
                left: `${50 + Math.cos(i * 1.7) * 40}%`,
                animationDelay: `${i * 0.22}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-14 text-center font-semibold tracking-wide text-slate-300 text-sm">
        Loading <span className="text-amber-400">Pokédex</span> data…
        <div className="mt-3 flex gap-2 justify-center">
          <span className="loader-dot" />
          <span className="loader-dot animation-delay-200" />
          <span className="loader-dot animation-delay-400" />
        </div>
      </div>
    </div>
  );
}
