import React from "react";
import HeroSection from "./components/HeroSection";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { useRandomPokemon } from "./hooks/useRandomPokemon";

function App() {
  const navigate = useNavigate();
  const getRandomRoute = useRandomPokemon();
  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
  }

  return (
    <>
      <Navbar
        onRandom={() => navigate(getRandomRoute())}
        onToggleTheme={toggleTheme}
        isDark={true}
      />
      <HeroSection />
      <Home />
    </>
  );
}

export default App;
