import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdCatchingPokemon } from "react-icons/md";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiSun,
  FiMoon,
  FiShuffle,
} from "react-icons/fi";
import clsx from "clsx";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Pokédex", to: "/pokedex" },
  { label: "Types", to: "/types" },
  { label: "Regions", to: "/regions" },
  { label: "Items", to: "/items" },
];

function Navbar({ onToggleTheme, isDark, onRandom }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (term) => {
    if (!term) return;
    navigate(`/pokemon/${term.toLowerCase().trim()}`);
    setSearchOpen(false);
    setOpen(false);
  };

  return (
    <header className="fixed w-screen top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-white/10">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <MdCatchingPokemon className="text-amber-400 text-3xl drop-shadow-[0_0_8px_rgba(255,193,7,0.5)] group-hover:scale-110 transition-transform" />
            <span className="absolute inset-0 blur-md opacity-40 bg-amber-400 rounded-full scale-75" />
          </div>
          <span className="text-lg font-bold tracking-wide text-white">
            Poke<span className="text-amber-400">dex</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  "relative text-sm font-medium transition",
                  "hover:text-amber-300 text-slate-300",
                  isActive && "text-white"
                )
              }
            >
              <span className="px-1">{item.label}</span>
              {/* Active underline */}
              {location.pathname === item.to && (
                <span className="absolute left-0 right-0 -bottom-1 h-[2px] bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 rounded-full" />
              )}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Search toggle */}
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((p) => !p)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition"
          >
            <FiSearch />
          </button>

          {/* Random */}
          <button
            aria-label="Random Pokémon"
            onClick={onRandom}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-amber-300 transition"
          >
            <FiShuffle />
          </button>

          {/* Theme */}
          <button
            aria-label="Toggle Theme"
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-amber-300 transition"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>

          {/* CTA */}
          <Link
            to="/pokedex"
            className="relative overflow-hidden group inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm
              bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600
              text-slate-900 shadow-lg shadow-amber-500/25 hover:brightness-110 transition"
          >
            Explore
            <span className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-white mix-blend-overlay transition" />
          </Link>
        </div>

        {/* Mobile Buttons */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((p) => !p)}
            className="p-2 rounded-md bg-white/5 text-slate-200 hover:bg-white/10 transition"
          >
            <FiSearch />
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((p) => !p)}
            className="p-2 rounded-md bg-white/5 text-slate-200 hover:bg-white/10 transition"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-slate-950/85 backdrop-blur-md px-6 pb-6 pt-4 space-y-4 animate-in fade-in slide-in-from-top">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    "px-3 py-2 rounded-md text-sm font-medium transition",
                    "hover:bg-white/10 text-slate-300",
                    isActive && "bg-white/10 text-white"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onRandom}
              className="flex-1 px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 text-slate-200 text-sm font-medium flex items-center justify-center gap-2"
            >
              <FiShuffle />
              Random
            </button>
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-md bg-white/10 hover:bg-white/15 text-slate-200"
            >
              {isDark ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div className="absolute left-0 right-0 top-full bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4">
          <SearchBar
            onSubmit={handleSearchSubmit}
            onClose={() => setSearchOpen(false)}
          />
        </div>
      )}
    </header>
  );
}

export default Navbar;

/* -------------------------------------------
   SearchBar (dans le même fichier ou séparé)
--------------------------------------------*/
function SearchBar({ onSubmit, onClose }) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
      className="flex items-center gap-3"
    >
      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          className="w-full rounded-lg bg-white/10 text-slate-100 placeholder:text-slate-400 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:bg-white/15 transition"
          placeholder="Search a Pokémon (e.g. pikachu)…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded-lg text-sm font-semibold bg-amber-400 text-slate-900 hover:brightness-110 transition"
      >
        Go
      </button>
      <button
        type="button"
        onClick={onClose}
        className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition"
      >
        Close
      </button>
    </form>
  );
}
