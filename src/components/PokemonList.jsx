import * as React from "react";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { PokeCardDisplayer } from "./PokeCardDisplayer";
import usePokemonList from "@/hooks/usePokemonList";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  gap: "0.5rem",
  justifyContent: "center",
});

export function PokemonList() {
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 12;
  const { pokemonList, loading, error } = usePokemonList();
  const count = pokemonList ? Math.ceil(pokemonList.length / itemsPerPage) : 0;

  const { items } = usePagination({
    count: count || 1,
    page,
    onChange: (_, newPage) => setPage(newPage),
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon data</div>;

  return (
    <div className="flex flex-col items-center gap-8">
      <PokeCardDisplayer
        page={page}
        itemsPerPage={itemsPerPage}
        pokemonList={pokemonList}
      />

      <nav className="py-2 w-140 bg-gray-200 rounded-full shadow-xl flex items-center justify-center align-center">
        <List>
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null;

            if (type === "start-ellipsis" || type === "end-ellipsis") {
              children = "...";
            } else if (type === "page") {
              children = (
                <button
                  type="button"
                  className={`py-1 px-3 mx-2 rounded-full cursor-pointer items-center ${
                    selected ? "bg-red-400 text-white shadow-lg border-r-1 border-r-gray-900" : "bg-red-100 border-l-2 border-r-2 border-r-red-400 border-l-gray-100 shadow-lg"
                  }`}
                  {...item}
                >
                  {page}
                </button>
              );
            } else {
              let icon = type === "next" ? <ArrowForward /> : <ArrowBack />;
              children = (
                <button
                  type="button"
                  className="mx-3 p-2 hover:bg-gray-400 rounded-full cursor-pointer"
                  {...item}
                >
                  {icon}
                </button>
              );
            }
            return <li key={index}>{children}</li>;
          })}
        </List>
      </nav>
    </div>
  );
}
