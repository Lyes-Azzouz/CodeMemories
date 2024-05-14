// Style
import "./container.scss";
// Components
import { Title } from "./Title/Title";
import { CodeCards } from "./CodeCards/CodeCards";

// Affiche le composant principal de la page Mes codes
export function Container() {
  // Simulation de donnée pour tester si ça marche bien
  /**OK**/
  const data = [
    {
      title: "je suis un titre de test",
      imageUrl:
        "../../../../public/images/components/mescodes/codecards/css_carousel.gif",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
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
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/2.png",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
    {
      title: "je suis un titre de test",
      imageUrl:
        "../../../../public/images/components/mescodes/codecards/css_carousel.gif",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
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
      imageUrl: "../../../../public/images/components/mescodes/codecards/5.jpg",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/3.png",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/3.png",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/5.jpg",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/4.png",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/2.png",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
    {
      title: "je suis un titre de test",
      imageUrl:
        "../../../../public/images/components/mescodes/codecards/css_carousel.gif",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/2.png",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/5.jpg",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
  ];

  return (
    <div className="container">
      <Title title="Ma collection de code" />
      <CodeCards data={data} />
    </div>
  );
}
