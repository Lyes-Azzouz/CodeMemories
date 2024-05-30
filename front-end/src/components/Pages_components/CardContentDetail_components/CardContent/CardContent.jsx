// Style
import "./card-content__style.scss";
// Libs
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { useEffect } from "react";

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

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="card-content_container">
      <div className="card-content_top-text">
        <h3>{title}</h3>
      </div>
      <div className="card-content_image">
        <img src={imageUrl} alt={title} />
      </div>{" "}
      <span>{technos && technos.join(", ")} </span>
      <div className="card-content_code">
        {textAreas &&
          textAreas.map((text, index) => (
            <pre key={index}>
              <code className="code">{text} </code>
            </pre>
          ))}
      </div>
    </div>
  );
}
