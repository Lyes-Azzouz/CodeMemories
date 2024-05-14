// Style
import "./codecards.scss";
// Components
import { ButtonsCard } from "../ButtonsCard/ButtonsCard";

// Affiche les cards pour chaque sauvegarde de code dans l'application
// Projette les données de la constante data dans Container.jsx
export function CodeCards(props) {
  return (
    <div className="cards_container">
      {props.data.map((card, index) => {
        return (
          <div className="card" key={index}>
            <div className="content">
              <div className="title_and_image">
                <h3>{card.title} </h3>
                <img src={card.imageUrl} alt={card.title} />{" "}
                <div className="buttons">
                  <ButtonsCard />
                </div>
              </div>{" "}
              <div className="technos">
                {card.technos.map((technos, index) => {
                  return <p key={index}>{technos} </p>;
                })}{" "}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
