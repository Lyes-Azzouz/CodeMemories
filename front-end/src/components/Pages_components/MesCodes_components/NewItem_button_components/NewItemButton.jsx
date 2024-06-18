// Style
import "./new_item_button__style.scss";
// React icons
import { IoAddOutline } from "react-icons/io5";
// Context
import { ModalContext } from "../../../../context/ModalContext";
// Hooks
import { useContext } from "react";

// /**
//  * Composant NewitemButton
//  * @param {Object} props - Les propriétés passées au composant.
//  * @param {Function} props.onClick - La fonction à exécuter lors du click sur le bouton.
//  */

export function NewItemButton() {
  const { openModal } = useContext(ModalContext);

  const handleClick = () => {
    openModal();
  };

  return (
    <button
      className="button-new"
      title="Créer une nouvelle card"
      onClick={handleClick}
    >
      Nouveau <IoAddOutline className="plus" />
    </button>
  );
}
