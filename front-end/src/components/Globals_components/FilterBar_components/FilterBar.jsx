// Style
import "./filterbar__style.scss";
// React Icons
import { MdFilterList } from "react-icons/md";

// Mise en place de la barre de filtre
export function FilterBar() {
  return (
    <div className="filter-bar_container">
      <span className="icon">{<MdFilterList />}</span>
      <span className="text">Filtrer</span>
      <span className="number-filter">0</span>
    </div>
  );
}
