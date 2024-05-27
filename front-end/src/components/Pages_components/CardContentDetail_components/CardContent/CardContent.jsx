// Style
import "./card-content__style.scss";

/**
 * Composant pour afficher le contenu détaillé d'une carte
 *
 * @param {Object} props - Les propriétés passées au composant
 * @param {string} props.title - Le titre de la card
 * @param {Array} props.technos - Les technologies associées à la card
 * @param {Array} props.textAreas - Les zone de texte à afficher
 * @param {string} props.imageUrl - L'URL de l'image à afficher
 */
export function CardContent({ title, technos, textAreas, imageUrl }) {
  // Test afin de voir si les données en props sont bien récupérées
  console.log("Title:", title);
  console.log("Technos:", technos);
  console.log("TextAreas:", textAreas);
  console.log("ImageURL:", imageUrl);

  return (
    <div className="card-content_container">
      <div className="card-content_top-text">
        <h3>{title}</h3>
        <p>test </p>
        <span>{technos && technos.join(", ")} </span>
      </div>
      <div className="card-content_image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="card-content_code">
        {/* Afficher les champs de texte si ils existent*/}
        {textAreas && textAreas.map((text, index) => <p key={index}>{text}</p>)}
      </div>
    </div>
  );
}
