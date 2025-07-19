import { X } from "lucide-react";
import GlobalDetail from "./GlobalDetail";
import { useEffect } from "react";
import { Button } from "./ui/button";
import EvolutionChain from "./EvolutionChain";

function PokeDetailModal({ pokemonName, setIsOpen }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  return (
    <div
      className="fixed inset-0 z-50  backdrop-blur-xl flex items-center justify-center"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-[90vw] max-h-[90vh] rounded-xl overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className="absolute top-4 right-4 text-white bg-transparent hover:bg-gray-700 p-2"
          onClick={() => setIsOpen(false)}
        >
          <X />
        </Button>

        {/* Contenu scrollable */}
        <div className="flex flex-col gap-6">
          <GlobalDetail name={pokemonName} />
          <EvolutionChain pokemonName={pokemonName} />
        </div>
      </div>
    </div>
  );
}

export default PokeDetailModal;
