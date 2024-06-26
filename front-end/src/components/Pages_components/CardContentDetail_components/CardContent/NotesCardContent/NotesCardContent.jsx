// Style
import "./notes-card-content_style.scss";
// Libs
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
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
export function NotesCardContent({
  title,

  textAreas,

  subtitles,
}) {
  // Test afin de voir si les données en props sont bien récupérées
  // console.log("Title:", title);
  // console.log("Technos:", technos);
  // console.log("TextAreas:", textAreas);
  // console.log("ImageURL:", imageUrl);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="notes-content_container">
      <div className="notes-top-content">
        <div className="notes-content_top-text">
          <h3>{title}</h3>
        </div>
        <span>{subtitles && subtitles.join(" - ")} </span>
      </div>

      <div className="notes-content_text">
        {textAreas &&
          textAreas.map((text, index) => <p className="notes">{text} </p>)}
      </div>
    </div>
  );
}
