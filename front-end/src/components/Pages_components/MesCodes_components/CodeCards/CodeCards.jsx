// Style
import "./codecards.scss";

// Affiche les cards pour chaque sauvegarde de code dans l'application
// Projette les données de la constante data dans Container.jsx
export function CodeCards(props) {
  return (
    <div className="cards_container">
      {props.data.map((card, index) => {
        return (
          <div className="card" key={index}>
            <h3>{card.title} </h3>
            <span>{card.description} </span>
          </div>
        );
      })}
    </div>
  );
}
