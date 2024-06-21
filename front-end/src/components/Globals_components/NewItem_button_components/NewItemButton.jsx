import { IoAddOutline } from "react-icons/io5";

export function NewItemButton({ onClick }) {
  return (
    <button
      className="button-new"
      title="Créer une nouvelle card"
      onClick={onClick} // Utilisez onClick pour gérer l'événement
    >
      Nouveau <IoAddOutline className="plus" />
    </button>
  );
}
