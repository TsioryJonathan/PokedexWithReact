function CardOverlay() {
    return (
      <>
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.25),transparent_60%)] mix-blend-overlay"
        />
        <span
          className="pointer-events-none absolute -right-8 -top-8 w-24 h-24 rounded-full border border-white/15 opacity-30 group-hover:opacity-60 transition"
        />
        <span
          className="pointer-events-none absolute -left-10 bottom-0 w-28 h-28 rounded-full border border-white/10 opacity-20 group-hover:opacity-40 transition"
        />
        <span
          className="pointer-events-none absolute inset-0 rounded-xl ring-0 group-hover:ring-2 ring-yellow-400/30 transition"
        />
      </>
    );
  }
  
  export default CardOverlay;