// Style
import "./container.scss";
// Components
import { Title } from "./Title/Title";
import { CodeCards } from "./CodeCards/CodeCards";
import { FilterBar } from "../../Globals_components/FilterBar_components/FilterBar";
import { NewitemButton } from "../../Globals_components/NewItem_button_components/NewItemButton";
import { Modal } from "../../Globals_components/Modal_components/Modal";
// Affiche le composant principal de la page Mes codes
export function Container() {
  // Simulation de donnée pour tester si ça marche bien
  /**OK**/
  const data = [
    {
      title: "je suis un titre de test",
      imageUrl:
        "../../../../public/images/components/mescodes/codecards/css_carousel.gif",
      technos: ["HTML", "CSS", "JAVASCRIPT", "SASS", "NODEJS", "TAILWIND"],
    },
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/2.png",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/3.png",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/2.png",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/4.png",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
  ];

  return (
    <div className="container">
      <div className="top-content">
        <div className="title">
          <Title title="Ma collection de code" />
        </div>

        <div className="container_filter-bar_btn-new">
          <NewitemButton />
          <FilterBar />
        </div>
      </div>
      <Modal />
      <CodeCards data={data} />
    </div>
  );
}
