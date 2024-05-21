// Style
import "./new_item_button__style.scss";
// React icons
import { IoAddOutline } from "react-icons/io5";

/**
 * Composant NewitemButton
 * @param {Object} props - Les propriétés passées au composant.
 * @param {Function} props.onClick - La fonction à exécuter lors du clic sur le bouton.
 */
export function NewitemButton({ onClick }) {
  return (
    <>
      {/* Bouton pour ajouter une nouvelle carte */}
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
