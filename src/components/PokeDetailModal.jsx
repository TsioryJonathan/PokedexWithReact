import React from "react";
import GlobalDetail from "./GlobalDetail";
import EvolutionChain from "./EvolutionChain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import PokeAbout from "./PokeAbout";
import BaseStatsContent from "./BaseStatsContent";
import PokemonMoves from "./PokemonMoves";
import ModalBase from "./ui/ModalBase";
import { Info, BarChart2, GitBranch, Zap } from "lucide-react";

const tabs = [
  { value: "about", label: "About", Icon: Info },
  { value: "stat", label: "Base stats", Icon: BarChart2 },
  { value: "evolution", label: "Evolution", Icon: GitBranch },
  { value: "moves", label: "Moves", Icon: Zap },
];

export default function PokeDetailModal({ pokemonName, open, onClose }) {
  return (
    <ModalBase open={open} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <GlobalDetail name={pokemonName} />

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="bg-transparent w-full border-b-1 rounded-none">
            {tabs.map(({ value, label, Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center gap-2 pb-5 data-[state=active]:bg-transparent! data-[state=active]:border-none! data-[state=active]:shadow-none! rounded-none text-lg font-semibold cursor-pointer text-white"
              >
                <Icon className="w-5 h-5 text-slate-400 data-[state=active]:text-white" />
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
}
