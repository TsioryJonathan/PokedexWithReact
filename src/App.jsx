import React, { lazy, Suspense } from "react";
import FullScreenLoader from "./components/Loader/FullScreenLoader";
import { CompareButton } from "./components/compare/CompareButton";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import FavoriteModalButton from "./components/favorite/FavoriteModalButton";
import { ToastProvider } from "./components/ui/ToastContext";
import NetworkStatusNotifier from "./components/ui/NetworkStatusNotifier";
import ThemeToggle from "./components/ThemeToggle";
import BackgroundImage from "./components/BackgroundImage";

const HeroSection = lazy(() => import("./components/HeroSection"));
const Home = lazy(() => import("./components/Home"));

function App() {
  return (
    <ToastProvider>
      <NetworkStatusNotifier />
      <FavoritesProvider>
        <Suspense fallback={<FullScreenLoader />}>
          <div className="relative min-h-screen">
            <BackgroundImage />
            <main className="relative z-10">
              <HeroSection />
              <Home />
              <CompareButton />
              <ThemeToggle />
              <FavoriteModalButton />
            </main>
          </div>
        </Suspense>
      </FavoritesProvider>
    </ToastProvider>
  );
}

export default App;
