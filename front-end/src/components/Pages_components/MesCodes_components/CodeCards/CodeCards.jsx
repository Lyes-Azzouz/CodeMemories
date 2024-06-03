// CodeCards.js
import "./codecards.scss";
// Components
import { ButtonsCard } from "../../../Globals_components/ButtonsCard_components/ButtonsCard";
// Hooks
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// Custom Hooks
import { CardsContentSelectContext } from "../../../../context/CardsContentSelectContext";

/**
 * Composant CodeCards
 * @param {Object} props - Les propriétés passées au composant.
 * @param {Array} props.data - Les données des card à afficher.
 * @param {Function} props.onDelete - La fonction de suppression d'une card.
 * @param {Function} props.onSelectCard - La fonction de sélection d'une card.
 */
export function CodeCards({ data, onDelete, onSelectCard }) {
  const navigate = useNavigate();
  const { setSelectedCard } = useContext(CardsContentSelectContext);

  console.log("Data received:", data);

  const handleOpen = (cardId) => {
    const card = data.find((card) => card.id === cardId);
    setSelectedCard(card);
    navigate("/Mes_codes/detail"); // Redirige vers la pages "Mes_codes" lorsque l'utilisateur se connecte.
  };

  return (
    <div className="cards_container">
      {[...data.reverse()].map((card, index) => (
        <div
          className="card"
          key={index}
          style={{ order: data.length - index }}
        >
          <div className="content">
            <div className="title_and_image">
              <h3>{card.title}</h3>
              <img src={card.imageUrl} alt={card.title} />
              <div className="buttons">
                <ButtonsCard
                  cardId={card.id}
                  onDelete={onDelete}
                  onOpen={handleOpen} // Passe handleOpen à ButtonsCard pour le bouton "Ouvrir"
                />
              </div>
            </div>
            <div className="technos">
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
