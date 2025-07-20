// utils/getTypeAccent.js
const typeAccents = {
    fire:    { grad: "from-orange-400 via-red-500 to-rose-500", ring: "ring-orange-400/40" },
    water:   { grad: "from-sky-400 via-blue-500 to-indigo-500", ring: "ring-sky-400/40" },
    grass:   { grad: "from-emerald-400 via-emerald-500 to-lime-500", ring: "ring-emerald-400/40" },
    electric:{ grad: "from-yellow-300 via-amber-400 to-orange-500", ring: "ring-amber-300/40" },
    psychic: { grad: "from-fuchsia-400 via-pink-500 to-rose-500", ring: "ring-fuchsia-400/40" },
    dark:    { grad: "from-slate-600 via-slate-700 to-slate-900", ring: "ring-slate-500/40" },
    dragon:  { grad: "from-indigo-400 via-purple-500 to-fuchsia-600", ring: "ring-purple-400/40" },
    ice:     { grad: "from-cyan-300 via-cyan-400 to-sky-500", ring: "ring-cyan-300/40" },
    ghost:   { grad: "from-violet-500 via-indigo-600 to-slate-800", ring: "ring-violet-400/40" },
    poison:  { grad: "from-violet-400 via-purple-500 to-fuchsia-500", ring: "ring-violet-400/40" },
    fighting:{ grad: "from-rose-400 via-red-500 to-orange-500", ring: "ring-rose-400/40" },
    rock:    { grad: "from-amber-500 via-yellow-600 to-stone-600", ring: "ring-amber-400/40" },
    ground:  { grad: "from-amber-400 via-amber-600 to-orange-700", ring: "ring-amber-400/40" },
    steel:   { grad: "from-slate-300 via-slate-400 to-slate-500", ring: "ring-slate-300/40" },
    fairy:   { grad: "from-pink-300 via-pink-400 to-rose-400", ring: "ring-pink-300/40" },
    bug:     { grad: "from-lime-400 via-lime-500 to-emerald-600", ring: "ring-lime-400/40" },
    normal:  { grad: "from-zinc-300 via-zinc-400 to-zinc-500", ring: "ring-zinc-300/40" },
    default: { grad: "from-slate-500 via-slate-600 to-slate-800", ring: "ring-slate-500/40" },
  };
  export default function getTypeAccent(type){
    return typeAccents[type?.toLowerCase()] || typeAccents.default;
  }
  