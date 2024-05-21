// Style
import "./buttons_card.scss";
// React icons
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";

/**
 * Composant ButtonsCard
 * @param {Object} props - Les propriétés passées au composant.
 * @param {string} props.cardId - L'ID de la carte associée aux boutons.
 * @param {Function} props.onDelete - La fonction de suppression de la carte.
 */
export function ButtonsCard({ cardId, onDelete }) {
  return (
    <div className="btn-card__container">
      {/* Bouton de suppression */}
      <button id="btn-1" title="Supprimer" onClick={() => onDelete(cardId)}>
        <RiDeleteBin6Fill />
      </button>
      {/* Bouton d'ouverture */}
      <button id="btn-2" title="Ouvrir">
        <MdOpenInNew />
      </button>
      {/* Bouton de modification */}
      <button id="btn-3" title="Modifier">
        <BiSolidMessageSquareEdit />
      </button>
    </div>
  );
}
