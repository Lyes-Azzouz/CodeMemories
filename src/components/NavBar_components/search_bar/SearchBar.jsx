import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import "./search_bar__style.scss";

// Affiche la barre de recherche de la navbar qui permet à l'utilisateur de chercher par mot-clé
export function SearchBar() {
  return (
    <div className="search_bar-container">
      <span className="magnify_glass">
        <HiMiniMagnifyingGlass />
      </span>
      <input
        className="search_bar"
        type="search"
        placeholder="Recherche par mots clés (exemple : css , carousel , react.js ...)"
      />
    </div>
  );
}
