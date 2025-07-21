import GlobalDetail from "./GlobalDetail";
import EvolutionChain from "./EvolutionChain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import PokeAbout from "./PokeAbout";
import BaseStatsContent from "./BaseStatsContent";
import PokemonMoves from "./PokemonMoves";
import ModalBase from "./ui/ModalBase";

const PokeDetailModal = ({ pokemonName, open, onClose }) => {
  return (
    <ModalBase open={open} onClose={onClose}>
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
    </ModalBase>
  );
};

export default PokeDetailModal;
