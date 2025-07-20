import React from "react";
import HeroSection from "./components/HeroSection";
import Home from "./pages/Home";
import { CompareButton } from "./components/compare/CompareButton";

function App() {
  return (
    <>
      <HeroSection/>
      <CompareButton />
      <Home />
    </>
  );
}

export default App;
