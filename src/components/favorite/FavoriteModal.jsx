import React from "react";
import { useFavorites } from "../../contexts/FavoritesContext";
import PokemonCard from "../PokemonCard";
import ModalBase from "../ui/ModalBase";

export default function FavoriteModal({ open, onClose }) {
  const { favorites } = useFavorites();
  return (
    <ModalBase open={open} onClose={onClose} title="Favorites Pokemons">
      {favorites.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No favorites yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {favorites.map((name) => (
            <PokemonCard key={name} pokemonName={name} />
          ))}
        </div>
      )}
    </ModalBase>
  );
}


// another way to create a modal 

// import React from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import { useFavorites } from "../../contexts/FavoritesContext";
// import PokemonCard from "../PokemonCard";

// export default function FavoriteModal({ open, onClose }) {
//   const { favorites } = useFavorites();

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
//       <DialogTitle>
//         Favoris Pokémons
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{ position: "absolute", right: 8, top: 8 }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent dividers>
//         {favorites.length === 0 ? (
//           <div className="text-center text-gray-500 py-8">Aucun favori pour l'instant.</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//             {favorites.map((name) => (
//               <PokemonCard key={name} pokemonName={name} />
//             ))}
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }
