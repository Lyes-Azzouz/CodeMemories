// Style
import "./buttons_card.scss";
// React icons
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";

export function ButtonsCard() {
  return (
    <div className="btn-card__container">
      <button id="btn-1">{<RiDeleteBin6Fill />} </button>
      <button id="btn-2">{<MdOpenInNew />} </button>
      <button id="btn-3">{<BiSolidMessageSquareEdit />} </button>
    </div>
  );
}
