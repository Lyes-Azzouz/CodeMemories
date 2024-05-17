//Style
import "./new_item_button__style.scss";
// React Icon
import { IoAddOutline } from "react-icons/io5";

// Affiche le bouton d'ajout de nouvelle cards
export function NewitemButton({ onClick }) {
  return (
    <>
      <button
        className="button-new"
        title="Créer une nouvelle card"
        onClick={onClick}
      >
        Nouveau <IoAddOutline className="plus" />
      </button>
    </>
  );
}
