const typeAccent = {
    fire:   { grad: "from-[#2a1a1a] via-[#3b2222] to-[#5c2520]", bar: "bg-red-500", glow: "shadow-[0_0_30px_-6px_rgba(239,68,68,0.55)]" },
    water:  { grad: "from-[#0f1f33] via-[#122c45] to-[#1c4c66]", bar: "bg-sky-500", glow: "shadow-[0_0_30px_-6px_rgba(56,189,248,0.55)]" },
    grass:  { grad: "from-[#0f241b] via-[#133527] to-[#1e5a3d]", bar: "bg-emerald-500", glow: "shadow-[0_0_30px_-6px_rgba(16,185,129,0.55)]" },
    electric:{ grad: "from-[#1c1c29] via-[#2c2e44] to-[#5b4b1d]", bar: "bg-amber-400", glow:"shadow-[0_0_30px_-6px_rgba(251,191,36,0.55)]" },
    ice:    { grad: "from-[#0d2029] via-[#123440] to-[#1c5c6e]", bar: "bg-cyan-300", glow:"shadow-[0_0_30px_-6px_rgba(103,232,249,0.5)]" },
    dragon: { grad: "from-[#14142a] via-[#20224a] to-[#3b3073]", bar: "bg-indigo-500", glow:"shadow-[0_0_30px_-6px_rgba(99,102,241,0.55)]" },
    psychic:{ grad: "from-[#22172c] via-[#352345] to-[#5a2d70]", bar: "bg-fuchsia-500", glow:"shadow-[0_0_30px_-6px_rgba(232,121,249,0.55)]" },
    ghost:  { grad: "from-[#181827] via-[#25243a] to-[#3f3560]", bar: "bg-violet-500", glow:"shadow-[0_0_30px_-6px_rgba(139,92,246,0.5)]" },
    dark:   { grad: "from-[#0d0d14] via-[#191b24] to-[#2d323c]", bar: "bg-slate-500", glow:"shadow-[0_0_30px_-6px_rgba(100,116,139,0.45)]" },
    steel:  { grad: "from-[#10171f] via-[#1d2731] to-[#32424f]", bar: "bg-slate-400", glow:"shadow-[0_0_30px_-6px_rgba(148,163,184,0.45)]" },
    fairy:  { grad: "from-[#231528] via-[#361d3c] to-[#5c2a62]", bar: "bg-pink-400", glow:"shadow-[0_0_30px_-6px_rgba(244,114,182,0.5)]" },
    default:{ grad: "from-[#141a24] via-[#1d2531] to-[#303d4e]", bar: "bg-blue-400", glow:"shadow-[0_0_30px_-6px_rgba(96,165,250,0.45)]" },
  };
  
  export default function getTypeAccent(type) {
    return typeAccent[(type || "").toLowerCase()] || typeAccent.default;
  }
  