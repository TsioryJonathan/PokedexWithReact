import React, { lazy, Suspense, useEffect, useState } from "react";
import FullScreenLoader from "./components/Loader/FullScreenLoader";
import { CompareButton } from "./components/compare/CompareButton";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import FavoriteModalButton from "./components/favorite/FavoriteModalButton";
import { ToastProvider } from "./components/ui/ToastContext";
import NetworkStatusNotifier from "./components/ui/NetworkStatusNotifier";
import ThemeToggle from "./components/ThemeToggle";
import BackgroundImage from "./components/BackgroundImage";
import { Route, Routes } from "react-router-dom";
import MyPokemon from "./pages/MyPokemon";
import CreatePokemonModal from "./components/create-pokemon/CreatePokemonModal";
import CreateNewPokemonButton from "./components/create-pokemon/CreateNewPokemonButton";
import RedirectToMyPokemon from "./components/create-pokemon/RedirectToMyPokemon";

const HeroSection = lazy(() => import("./components/HeroSection"));
const Home = lazy(() => import("./components/Home"));
const FIXED_IMAGE_URL = "https://api.dicebear.com/9.x/pixel-art/svg";

function App() {
  const [openNewPokemonModal, setOpenNewPokemonModal] = useState(false);
  const [newPokemon, setNewPokemon] = useState({
    id: "",
    image: FIXED_IMAGE_URL,
    name: "",
    type: "",
    genus: "",
    description: "",
    height: 0,
    weight: 0,
    hp: 0,
    attack: 0,
    defense: 0,
  });
  const [savedPokemons, setSavedPokemons] = useState([]);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("my_pokemon");
      saved ? setSavedPokemons(JSON.parse(saved)) : [];
    } catch (error) {
      console.error(error);
    }
  }, []);
  const addPokemon = (newPokemon) => {
    const newList = [...savedPokemons, newPokemon];
    setSavedPokemons(newList);
    localStorage.setItem("my_pokemon", JSON.stringify(newList));
    window.dispatchEvent(new Event("my_pokemon_updated"));
  };
  const clearField = () => {
    setNewPokemon({
      id: "",
      image: FIXED_IMAGE_URL,
      name: "",
      type: "",
      genus: "",
      description: "",
      height: 0,
      weight: 0,
      hp: 0,
      attack: 0,
      defense: 0,
    });
  };
  const onSave = (toSave) => {
    addPokemon(toSave);
    clearField();
  };

  return (
    <ToastProvider>
      <NetworkStatusNotifier />
      <FavoritesProvider>
        <Suspense fallback={<FullScreenLoader />}>
          <div className="relative min-h-screen">
            <BackgroundImage />
            <RedirectToMyPokemon />
            <main className="relative z-10">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <HeroSection />
                      <Home />
                    </>
                  }
                />
                <Route path="/my-pokemon" element={<MyPokemon />} />
              </Routes>
              {/* Button */}
              <CompareButton />
              <ThemeToggle />
              <FavoriteModalButton />
              <CreateNewPokemonButton setOpen={setOpenNewPokemonModal} />

              {/* New Pokemon Modal */}
              {openNewPokemonModal ? (
                <CreatePokemonModal
                  open={openNewPokemonModal}
                  setOpen={setOpenNewPokemonModal}
                  newPokemon={newPokemon}
                  setNewPokemon={setNewPokemon}
                  onSave={onSave}
                />
              ) : null}
            </main>
          </div>
        </Suspense>
      </FavoritesProvider>
    </ToastProvider>
  );
}

export default App;
