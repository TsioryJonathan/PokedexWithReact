import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import SearchInput from "./SearchInput";
import PokeBallLogo from "./PokeBallLogo";

export default function FloatingSearchBar({ searchTerm, setSearchTerm }) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      const listSection = document.getElementById("pokedex-section");
      if (listSection) {
        listSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [searchTerm]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open, inputRef]);

  useEffect(() => {
    function handleClick(e) {
      if (open && inputRef.current && !inputRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, inputRef]);

  return (
    <div className="fixed top-7 right-8 z-50 flex items-center gap-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="bg-white/10 hover:bg-white/30 p-2 rounded-full transition cursor-pointer"
      >
        <PokeBallLogo className={"w-14 h-14"} />
      </button>

      {open && (
        <div className="w-64 transition-all duration-200 ease-in">
          <SearchInput
            ref={inputRef}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      )}
    </div>
  );
}
