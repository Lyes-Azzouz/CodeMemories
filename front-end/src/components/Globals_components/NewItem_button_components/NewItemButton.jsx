//Style
import "./new_item_button__style.scss";
// React Icon
import { IoAddOutline } from "react-icons/io5";

export function NewitemButton() {
  return (
    <>
      <button className="button-new" title="Créer une nouvelle card">
        Nouveau <IoAddOutline className="plus" />
      </button>
    </>
  );
}
