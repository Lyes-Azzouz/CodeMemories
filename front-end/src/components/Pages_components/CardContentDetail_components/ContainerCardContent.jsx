import "./container-card-content__style.scss";
// Components
import { CodeCardContent } from "./CardContent/CodeCardContent/CodeCardContent";
import { NotesCardContent } from "./CardContent/NotesCardContent/NotesCardContent";
// Hooks
import { useContext } from "react";
// Context
import { CardsContentSelectContext } from "../../../context/CardsContentSelectContext";

export function ContainerCardContent() {
  const { selectedCard } = useContext(CardsContentSelectContext);

  console.log("Selected Card:", selectedCard);

  if (!selectedCard) {
    return <div>Erreur lors de l'affichage des détails de la carte</div>;
  }

  return (
    <div className="container-card-content">
      {selectedCard.type === "code" ? (
        <CodeCardContent
          title={selectedCard.title}
          technos={selectedCard.technos}
          imageUrl={selectedCard.imageUrl}
          subtitles={selectedCard.subtitles}
          textAreas={selectedCard.textAreas}
        />
      ) : selectedCard.type === "notes" ? (
        <NotesCardContent
          title={selectedCard.title}
          subtitles={selectedCard.subtitles}
          textAreas={selectedCard.textAreas}
        />
      ) : (
        <div> Ici mettre RessourceCardContent </div>
      )}
    </div>
  );
}
