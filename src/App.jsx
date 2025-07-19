import React from "react";
import HeroSection from "./components/HeroSection";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComparePage from "./components/ComparePage";

function App() {
  return (
    <>
      <HeroSection/>
      <Home />
      <Routes>
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </>
  );
}

export default App;
