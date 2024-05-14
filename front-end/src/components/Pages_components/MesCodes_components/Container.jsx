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
      title: "test 1",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus sint quaerat omnis quisquam! Repudiandae ratione ipsa maiores atque dolorem quae maxime ea quaerat delectus nisi doloribus quas nam eum, recusandae hic? Eaque ad, voluptas nostrum doloremque harum quae minima necessitatibus.",
    },
    {
      title: "test 2",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus sint quaerat omnis quisquam! Repudiandae ratione ipsa maiores atque dolorem quae maxime ea quaerat delectus nisi doloribus quas nam eum, recusandae hic? Eaque ad, voluptas nostrum doloremque harum quae minima necessitatibus.",
    },
    {
      title: "test 3",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus sint quaerat omnis quisquam! Repudiandae ratione ipsa maiores atque dolorem quae maxime ea quaerat delectus nisi doloribus quas nam eum, recusandae hic? Eaque ad, voluptas nostrum doloremque harum quae minima necessitatibus.",
    },
    {
      title: "test 3",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus sint quaerat omnis quisquam! Repudiandae ratione ipsa maiores atque dolorem quae maxime ea quaerat delectus nisi doloribus quas nam eum, recusandae hic? Eaque ad, voluptas nostrum doloremque harum quae minima necessitatibus.",
    },
    {
      title: "test 3",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus sint quaerat omnis quisquam! Repudiandae ratione ipsa maiores atque dolorem quae maxime ea quaerat delectus nisi doloribus quas nam eum, recusandae hic? Eaque ad, voluptas nostrum doloremque harum quae minima necessitatibus.",
    },
    {
      title: "test 3",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus sint quaerat omnis quisquam! Repudiandae ratione ipsa maiores atque dolorem quae maxime ea quaerat delectus nisi doloribus quas nam eum, recusandae hic? Eaque ad, voluptas nostrum doloremque harum quae minima necessitatibus.",
    },
    {
      title: "test 3",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus sint quaerat omnis quisquam! Repudiandae ratione ipsa maiores atque dolorem quae maxime ea quaerat delectus nisi doloribus quas nam eum, recusandae hic? Eaque ad, voluptas nostrum doloremque harum quae minima necessitatibus.",
    },
    {
      title: "test 3",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus sint quaerat omnis quisquam! Repudiandae ratione ipsa maiores atque dolorem quae maxime ea quaerat delectus nisi doloribus quas nam eum, recusandae hic? Eaque ad, voluptas nostrum doloremque harum quae minima necessitatibus.",
    },
  ];

  return (
    <div className="container">
      <Title title="Ma collection de code" />
      <CodeCards data={data} />
    </div>
  );
}
