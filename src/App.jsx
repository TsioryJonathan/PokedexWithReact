import React, { lazy, Suspense } from "react";
import FullScreenLoader from "./components/Loader/FullScreenLoader";
import { CompareButton } from "./components/compare/CompareButton";

const HeroSection = lazy(() => import("./components/HeroSection"));
const Home = lazy(() => import("./components/Home"));

function App() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <HeroSection />
      <Home />
      <CompareButton />
    </Suspense>
  );
}

export default App;
