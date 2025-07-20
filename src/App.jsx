import React, { lazy, Suspense } from "react";
import FullScreenLoader from "./components/Loader/FullScreenLoader";

const HeroSection = lazy(() => import("./components/HeroSection"));
const Home = lazy(() => import("./components/Home"));

function App() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <HeroSection />
      <Home />
    </Suspense>
  );
}

export default App;
