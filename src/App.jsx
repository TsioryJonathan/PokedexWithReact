import React, { lazy, Suspense } from "react";
import FullScreenLoader from "./components/Loader/FullScreenLoader";
import { CompareButton } from "./components/compare/CompareButton";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import FavoriteModalButton from "./components/favorite/FavoriteModalButton";
import { ToastProvider } from "./components/ui/ToastContext";
import NetworkStatusNotifier from "./components/ui/NetworkStatusNotifier";

const HeroSection = lazy(() => import("./components/HeroSection"));
const Home = lazy(() => import("./components/Home"));

function App() {
  return (
    <ToastProvider>
      <NetworkStatusNotifier />
      <FavoritesProvider>
        <Suspense fallback={<FullScreenLoader />}>
          <HeroSection />
          <Home />
          <CompareButton />
          <FavoriteModalButton />
        </Suspense>
      </FavoritesProvider>
    </ToastProvider>
  );
}

export default App;
