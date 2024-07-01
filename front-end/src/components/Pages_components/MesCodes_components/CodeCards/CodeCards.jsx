// Import des bibliothèques et des composants nécessaires
import { ButtonsCard } from "../../../Globals_components/ButtonsCard_components/ButtonsCard";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CardsContentSelectContext } from "../../../../context/CardsContentSelectContext";
import "./codecards.scss";
/**
 * Composant CodeCards
 * @param {Object} props - Les propriétés passées au composant.
 * @param {Array} props.codecards - Les données des card à afficher.
 * @param {Function} props.onDelete - La fonction de suppression d'une card.
 * @param {Function} props.onSelectCard - La fonction de sélection d'une card.
 */
export function CodeCards({ codecards = [], onDelete, onSelectCard }) {
  // Valeur par défaut pour codecards
  const navigate = useNavigate();
  const { setSelectedCard } = useContext(CardsContentSelectContext);

  console.log("Données reçues:", codecards);

  const handleOpen = (cardId) => {
    const card = codecards.find((card) => card.id === cardId);
    if (card) {
      setSelectedCard({ ...card, type: "code" });
      navigate("/Mes_codes/detail");
    } else {
      console.error("Carte non trouvée:", cardId);
    }
  };

  if (!Array.isArray(codecards)) {
    console.error("codecards n'est pas un tableau:", codecards);
    return <div>Erreur: codecards n'est pas un tableau</div>;
  }

  return (
    <div className="cards_container">
      {[...codecards].reverse().map((card, index) => (
        <div
          className="card"
          key={index}
          style={{ order: codecards.length - index }}
        >
          <div className="content">
            <div className="title_and_image">
              <h3>{card.title}</h3>
              <img src={card.imageUrl} alt={card.title} />
              <div className="buttons">
                <ButtonsCard
                  cardId={card.id}
                  onDelete={onDelete}
                  onOpen={() => handleOpen(card.id)}
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
