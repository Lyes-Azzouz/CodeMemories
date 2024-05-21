import "./container.scss";
import { Title } from "./Title/Title";
import { CodeCards } from "./CodeCards/CodeCards";
import { FilterBar } from "../../Globals_components/FilterBar_components/FilterBar";
import { NewitemButton } from "./NewItem_button_components/NewItemButton";
import { Modal } from "../../Globals_components/Modal_components/Modal";
import { useState, useEffect } from "react";

export function Container() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [technos, setTechnos] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Erreur lors du fetch des données: ", error);
      });
  }, []);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTechnosChange = (newTechnos) => setTechnos(newTechnos);
  const handleImageUrlChange = (url) => setImageUrl(url);
  const handleImageFileChange = (file) => setImageFile(file);
  const handleModalClose = () => setIsModalOpen(false);
  const handleNewItemClick = () => setIsModalOpen(true);

  return (
    <div className="container">
      <div className="top-elements">
        <div className="title">
          <Title />
        </div>
        <div className="right-elements">
          <div className="filter-bar">
            <FilterBar />
          </div>
          <div className="add-btn">
            <NewitemButton onClick={handleNewItemClick} />
          </div>
        </div>
      </div>

      <CodeCards data={data} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={title}
        onTitleChange={handleTitleChange}
        technos={technos}
        onTechnosChange={handleTechnosChange}
        imageFile={imageFile}
        onImageFileChange={handleImageFileChange}
        imageUrl={imageUrl}
        onImageUrlChange={handleImageUrlChange}
        showImageInput={true}
        showLangageInput={true}
      />
    </div>
  );
}
