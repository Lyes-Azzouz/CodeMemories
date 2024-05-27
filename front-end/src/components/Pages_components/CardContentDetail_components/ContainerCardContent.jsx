// Style
import "./container-card-content__style.scss";
// Components
import { CardContent } from "./CardContent/CardContent";
// Hooks
import { useContext } from "react";
// Context
import { CardsContentSelectContext } from "../../../context/CardsContentSelectContext";

export function ContainerCardContent() {
  const { selectedCard } = useContext(CardsContentSelectContext);

  console.log("Selected Card:", selectedCard); // Ajoutez cette ligne pour vérifier selectedCard

  if (!selectedCard) {
    return <div>Erreur lors de l'affichage des détails de la card</div>;
  }

  return (
    <div className="container-card-content">
      <CardContent
        title={selectedCard.title}
        technos={selectedCard.technos}
        imageUrl={selectedCard.imageUrl}
        textAreas={selectedCard.textAreas}
      />
    </div>
  );
}
