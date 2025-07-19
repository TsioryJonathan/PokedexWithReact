import { X } from "lucide-react";
import GlobalDetail from "./GlobalDetail";
import { useEffect } from "react";
import { Button } from "./ui/button";
import EvolutionChain from "./EvolutionChain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import PokeAbout from "./PokeAbout";

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
      className="fixed inset-0 z-50  backdrop-blur-xl flex items-start pt-2 justify-center"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-[90vw] max-h-[90vh] rounded-xl overflow-y-auto "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 z-99 text-white bg-transparent rounded-lg cursor-pointer hover:bg-gray-700 p-2 w-fit h-fit"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>

        <div className="flex flex-col gap-6">
          <GlobalDetail name={pokemonName} />

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="bg-transparent w-full border-b-1 rounded-none">
              {[
                { label: "About", value: "about" },
                { label: "Base stats", value: "stat" },
                { label: "Evolution", value: "evolution" },
                { label: "Moves", value: "moves" },
              ].map(({ label, value }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="pb-5 data-[state=active]:bg-transparent! data-[state=active]:border-none! 
                   data-[state=active]:shadow-none! rounded-none  text-lg font-semibold cursor-pointer"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="evolution">
              <EvolutionChain pokemonName={pokemonName} />
            </TabsContent>
            <TabsContent value="about">
              <PokeAbout pokemonName={pokemonName} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default PokeDetailModal;
