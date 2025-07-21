import React, { lazy, Suspense } from "react";
import FullScreenLoader from "./components/Loader/FullScreenLoader";
import { CompareButton } from "./components/compare/CompareButton";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import FavoriteModalButton from "./components/favorite/FavoriteModalButton";

const HeroSection = lazy(() => import("./components/HeroSection"));
const Home = lazy(() => import("./components/Home"));

function App() {
  return (
    <FavoritesProvider>
      <Suspense fallback={<FullScreenLoader />}>
        <HeroSection />
        <Home />
        <CompareButton />
        <FavoriteModalButton />
      </Suspense>
    </FavoritesProvider>
  );
}

export default App;
