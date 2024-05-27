// ContainerCardContent.js
import "./container-card-content__style.scss";
// Components
import { CardContent } from "./CardContent/CardContent";

/**
 * Composant ContainerCardContent
 * @param {Object} props - Les propriétés passées au composant.
 * @param {Object} props.card - La card à afficher.
 */
export function ContainerCardContent({ card }) {
  return (
    <div className="container-card-content">
      <CardContent
        title={card.title}
        technos={card.technos}
        imageUrl={card.imageUrl}
        textAreas={card.textAreas}
      />
    </div>
  );
}
