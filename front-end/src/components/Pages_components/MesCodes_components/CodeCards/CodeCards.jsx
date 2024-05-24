// Style
import "./codecards.scss";
// Components
import { ButtonsCard } from "../../../Globals_components/ButtonsCard_components/ButtonsCard";

/**
 * Composant CodeCards
 * @param {Object} props - Les propriétés passées au composant.
 * @param {Array} props.data - Les données des card à afficher.
 * @param {Function} props.onDelete - La fonction de suppression d'une card.
 */

export function CodeCards({ data, onDelete }) {
  console.log("Data received:", data);

  return (
    <div className="cards_container">
      {/* Mapping des données des cards */}
      {data.map((card, index) => (
        <div className="card" key={index}>
          <div className="content">
            {/* Titre et image de la card */}
            <div className="title_and_image">
              <h3>{card.title}</h3>
              <img src={card.imageUrl} alt={card.title} />
              {/* Boutons d'action pour la card */}
              <div className="buttons">
                {/* Composant ButtonsCard pour la gestion des actions sur la card */}
                <ButtonsCard cardId={card.id} onDelete={onDelete} />
              </div>
            </div>
            {/* Liste des technologies associées à la card */}
            <div className="technos">
              {/* Map des technos */}
              {card.technos.map((techno, index) => (
                <p key={index}>{techno}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
