// Style
import "./buttons_card.scss";
// React icons
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";
// Pour l'instant je retire Link pour voir si le composant fonctionne.

/**
 * Components ButtonsCard.
 * @param {Object} props - Les propriété passées au composant.
 * @param {string} props.cardId - L'id de la carte associée aux boutons.
 * @param {Function} props.onDelete - La fonction de suppression de la carte.
 * @param {Function} props.onOpen - La fonction pour ouvrir la carte.
 */
export function ButtonsCard({ cardId, onDelete, onOpen }) {
  return (
    <div className="btn-card__container">
      {/* Bouton de suppression */}
      <button id="btn-1" title="Supprimer" onClick={() => onDelete(cardId)}>
        <RiDeleteBin6Fill />
      </button>
      {/* Bouton d'ouverture (Doit rediriger vers une autre page.) */}
      <button id="btn-2" title="Ouvrir" onClick={() => onOpen(cardId)}>
        <MdOpenInNew />
      </button>

      {/* Bouton de modification */}
      <button id="btn-3" title="Modifier">
        <BiSolidMessageSquareEdit />
      </button>
    </div>
  );
}
