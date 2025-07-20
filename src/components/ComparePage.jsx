import React, { useState } from "react";
import { Autocomplete, Skeleton, TextField } from "@mui/material";
import usePokemonList from "../hooks/usePokemonList";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import PokemonMiniCard from "./PokemonMiniCard";
import StatComparison from "./StatComparison";

const ComparePage = () => {
  const [selectedName1, setSelectedName1] = useState("");
  const [selectedName2, setSelectedName2] = useState("");
  const { pokemonList } = usePokemonList();
  const { pokemon: p1, loading: l1 } = usePokemonDetails(selectedName1);
  const { pokemon: p2, loading: l2 } = usePokemonDetails(selectedName2);
  const options = pokemonList.map((p) => p.name);
  return (
    <div className="max-w-4xl mx-auto p-4 overflow-visible">
      <h1 className="text-3xl font-bold text-center mb-8">
        Comparer des Pokémon
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((num) => (
          <div key={num} className="relative">
            <Autocomplete
              options={options}
              value={num === 1 ? selectedName1 : selectedName2}
              onChange={(_, v) =>
                num === 1
                  ? setSelectedName1(v || "")
                  : setSelectedName2(v || "")
              }
              disableClearable
              fullWidth
              autoHighlight
              // popupIcon={null}
              slotProps={{
                paper: {
                  sx: {
                    bgcolor: "var(--card)",
                    color: "var(--card-foreground)",
                    border: "1px solid var(--border)",
                    "& .MuiAutocomplete-option": {
                      '&[aria-selected="true"]': {
                        bgcolor: "var(--primary)",
                        color: "var(--primary-foreground)",
                      },
                      "&.Mui-focused": {
                        bgcolor: "var(--accent)",
                        color: "var(--accent-foreground)",
                      },
                    },
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Rechercher un Pokémon..."
                  InputLabelProps={{
                    style: { color: "var(--accent-foreground)" },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    style: {
                      backgroundColor: "var(--input)",
                      color: "var(--foreground)",
                      borderRadius: "0.5rem",
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--border)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--ring)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--primary)",
                    },
                  }}
                />
              )}
            />

            <div className="mt-4">
              {l1 || l2 ? (
                <div className="h-40 w-full rounded-lg !bg-[var(--accent)] animate-pulse"></div>
              ) : (
                <PokemonMiniCard pokemon={num === 1 ? p1 : p2} />
              )}
            </div>
          </div>
        ))}
      </div>
      {l1 || l2 ? (
        <div className="mt-4 h-40 w-full rounded-lg !bg-[var(--accent)] animate-pulse"></div>
      ) : (
        <StatComparison pokemon1={p1} pokemon2={p2} />
      )}
    </div>
  );
};

export default ComparePage;
