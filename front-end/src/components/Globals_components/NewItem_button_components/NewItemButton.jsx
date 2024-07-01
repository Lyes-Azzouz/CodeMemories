import { IoAddOutline } from "react-icons/io5";
import "./new_item_button__style.scss";
export function NewItemButton({ onClick, containerType }) {
  if (containerType == "ContainerCode") {
    return (
      <button
        className="button-new"
        title="Créer une nouvelle card"
        onClick={onClick} // Utilisez onClick pour gérer l'événement
      >
        Snippet <IoAddOutline className="plus" />
      </button>
    );
  }

  if (containerType == "ContainerNotes") {
    return (
      <button
        className="button-new"
        title="Créer une nouvelle card"
        onClick={onClick} // Utilisez onClick pour gérer l'événement
      >
        Note <IoAddOutline className="plus" />
      </button>
    );
  }
}
