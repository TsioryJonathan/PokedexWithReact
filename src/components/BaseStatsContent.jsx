import React from "react";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import pokemonColors from "@/utils/pokemonColors";
import {
  STAT_ORDER,
  statIcons,
  prettyName,
  getStatColor,
} from "@/constants/SummaryStats";
import { SummaryStats } from "./SummaryStats";
import StatCircle from "./StatCircle";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useIsDarkTheme from "@/hooks/useIsDarkTheme";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function BaseStatsContent({ pokemonName }) {
  const { pokemon, loading, error } = usePokemonDetails(pokemonName);
  const bgColor = pokemonColors[pokemon?.color] || pokemonColors.default;
  const isDark = useIsDarkTheme();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-gray-500" size={32} />
      </div>
    );
  }
  if (error || !pokemon) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  // Prepare stats
  const stats = STAT_ORDER.map((key) =>
    pokemon.stats.find((s) => s.name === key)
  ).filter(Boolean);
  const total = stats.reduce((acc, s) => acc + s.value, 0);
  const average = (total / stats.length).toFixed(1);

  return (
    <Card style={{ backgroundColor: bgColor }} className="text-foreground">
      <CardHeader className="mb-4">
        <CardTitle className="flex items-center justify-between">
          <span>Base Stats</span>
          <span className="flex gap-4 text-sm font-mono">
            <b>Total:</b> {total} | <b>Avg:</b> {average}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Circle overview */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.name} variants={fadeUp}>
              <StatCircle value={stat.value} label={prettyName(stat.name)} />
            </motion.div>
          ))}
        </motion.div>

        {/* Horizontal bars */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {stats.map((stat) => {
            const percent = Math.min((stat.value / 255) * 100, 100);
            const colorClass = getStatColor(stat.name);
            return (
              <motion.div
                key={stat.name}
                className="flex flex-col"
                variants={fadeUp}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 font-semibold uppercase text-xs">
                    {statIcons[stat.name]}
                    {prettyName(stat.name)}
                  </div>
                  <div className="font-mono text-sm">{stat.value}</div>
                </div>
                <div className={`w-full h-3 ${ isDark ? 'bg-white/20' : 'bg-black/20'} rounded overflow-hidden`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className={`h-full ${colorClass}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Summary and extra */}
        <SummaryStats pokemon={pokemon} />
      </CardContent>
    </Card>
  );
}
