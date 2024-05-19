// Style
import "./container.scss";
// Components
import { Title } from "./Title/Title";
import { CodeCards } from "./CodeCards/CodeCards";
import { FilterBar } from "../../Globals_components/FilterBar_components/FilterBar";
import { NewitemButton } from "./NewItem_button_components/NewItemButton";
import { Modal } from "../../Globals_components/Modal_components/Modal";
// Hooks
import { useState } from "react";
// Affiche le composant principal de la page Mes codes
export function Container() {
  // Logique pour la modal
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [technos, setTechnos] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    console.log(title);
    console.log(imageUrl);
    console.log(technos);
    setTitle("");
    setImageUrl("");
    setTechnos("");
    closeModal();
  };

  // Donnée fictive de test

  const data = [
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/5.jpg",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/5.jpg",
      technos: ["HTML", "CSS", "JAVASCRIPT"],
    },
    {
      title: "je suis un titre de test",
      imageUrl: "../../../../public/images/components/mescodes/codecards/5.jpg",
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
      <div className="top-content">
        <div className="title">
          <Title title="Ma collection de code" />
        </div>

        <div className="container-elements">
          <div className="column-elements">
            <NewitemButton onClick={openModal} />
            <div className="modal-element">
              <Modal
                isOpen={isOpen}
                onClose={closeModal}
                title={title}
                imageUrl={imageUrl}
                technos={technos}
                onTitleChange={(e) => setTitle(e.target.value)}
                onImageUrlChange={(e) => setImageUrl(e.target.value)}
                onImageFileChange={(file) => setImageFile(file)}
                onTechnosChange={(e) => setTechnos(e.target.value)}
                onSubmit={handleSubmit}
                showLangageInput={true}
                showImageInput={true}
              />
            </div>
          </div>

          <FilterBar />
        </div>
      </div>

      <CodeCards data={data} />
    </div>
  );
}
