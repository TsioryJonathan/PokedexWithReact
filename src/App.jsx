import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import { PokemonCards } from "./components/PokemonCards"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PokemonCards/>} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </>
  );
}

export default App;
