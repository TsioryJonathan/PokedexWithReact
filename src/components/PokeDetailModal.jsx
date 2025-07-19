import { X } from "lucide-react";
import GlobalDetail from "./GlobalDetail";
import { useEffect } from "react";
import { motion } from "framer-motion";
import EvolutionChain from "./EvolutionChain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import PokeAbout from "./PokeAbout";
import BaseStatsContent from "./BaseStatsContent";
import PokemonMoves from "./PokemonMoves";

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
      className="fixed inset-0 z-50 backdrop-blur-xl flex items-start pt-2 justify-center "
      onClick={() => setIsOpen(false)}
    >
      <motion.div
        className="w-[80vw] max-h-[98vh] rounded-2xl 
                     border border-white/15 shadow-2xl bg-gradient-to-br 
                     from-slate-800/70 via-slate-900/80 to-slate-950/90 
                     flex flex-col overflow-y-auto p-10 "
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 48, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 32, scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
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

            <TabsContent value="evolution" className="w-full">
              <EvolutionChain pokemonName={pokemonName} />
            </TabsContent>
            <TabsContent value="about" className="w-full">
              <PokeAbout pokemonName={pokemonName} />
            </TabsContent>
            <TabsContent value="stat" className="w-full">
              <BaseStatsContent pokemonName={pokemonName} />
            </TabsContent>
            <TabsContent value="moves" className="w-full">
              <PokemonMoves pokemonName={pokemonName} />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}

export default PokeDetailModal;
