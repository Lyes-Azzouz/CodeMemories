import React from "react";
import PropTypes from "prop-types";
import { ButtonsCard } from "../../../Globals_components/ButtonsCard_components/ButtonsCard";
import "./notes-array__style.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CardsContentSelectContext } from "../../../../context/CardsContentSelectContext";

/**
 * Composant NotesCard
 * @param {Object} props - Les propriétés passées au composant.
 * @param {Array} props.notescards - Les données des cartes à afficher.
 * @param {Function} props.onDelete - La fonction de suppression d'une carte.
 * @param {Function} props.onSelectCard - La fonction de sélection d'une carte.
 */
export function NotesCards({ notescards = [], onDelete, onSelectCard }) {
  const navigate = useNavigate();
  const { setSelectedCard } = useContext(CardsContentSelectContext);

  console.log("Données reçues:", notescards);
  console.log("setSelectedCard:", setSelectedCard); // Ajout de log pour vérifier le contexte

  const handleOpen = (cardId) => {
    console.log("handleOpen called with cardId:", cardId);
    const card = notescards.find((card) => card.id === cardId);
    if (card) {
      console.log("Carte trouvée:", card);
      setSelectedCard({ ...card, type: "notes" });
      navigate("/Mes_notes/detail");
    } else {
      console.error("Carte non trouvée:", cardId);
    }
  };

  if (!Array.isArray(notescards)) {
    console.error("notescards n'est pas un tableau:", notescards);
    return <div>Erreur: notescards n'est pas un tableau</div>;
  }

  return (
    <div className="cards_container">
      {notescards
        .slice()
        .reverse()
        .map((card, index) => (
          <div
            className="notes-card"
            key={index}
            style={{ order: notescards.length - index }}
          >
            <div className="notes-card-elements">
              <div className="top-contain-notes">
                <h3>{card.title}</h3>
                <div className="buttons">
                  <ButtonsCard
                    cardId={card.id}
                    onDelete={onDelete}
                    onOpen={() => handleOpen(card.id)}
                  />
                </div>
              </div>
              <div className="bottom-contain-notes">
                {card.subtitles.map((subtitle, i) => (
                  <div key={i}>
                    <h4>{subtitle}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default NotesCards;
