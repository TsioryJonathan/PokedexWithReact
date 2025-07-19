import { X } from "lucide-react";
import GlobalDetail from "./GlobalDetail";
import { useEffect } from "react";
import { Button } from "./ui/button";
import EvolutionChain from "./EvolutionChain";

function PokeDetailModal({ pokemonName, setIsOpen }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
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
      className="fixed top-0 left-0 z-99 min-w-screen min-h-screen bg-black/50 flex items-start justify-center backdrop-blur-xl"
      onClick={() => setIsOpen(false)}
    >
      <div className="w-[80vw] h-fit flex flex-col items-center mt-5" onClick={(e) => e.stopPropagation()}>
        <Button
          className="absolute top-5 right-5 text-white cursor-pointer bg-transparent hover:bg-gray-700 transition-colors duration-300"
          onClick={() => setIsOpen(false)}
        >
          <X />
        </Button>
        <GlobalDetail name={pokemonName} />
        <EvolutionChain pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default PokeDetailModal;
