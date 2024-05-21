// Style
import "./container.scss";
// Components
import { Title } from "./Title/Title";
import { CodeCards } from "./CodeCards/CodeCards";
import { FilterBar } from "../../Globals_components/FilterBar_components/FilterBar";
import { NewitemButton } from "./NewItem_button_components/NewItemButton";
import { Modal } from "../../Globals_components/Modal_components/Modal";
// Hooks
import { useState, useEffect } from "react";

/**
 * Composant Container
 * @returns {JSX.Element} Le composant Container.
 */
export function Container() {
  // Initialisation des états locaux
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [technos, setTechnos] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effet pour charger les données initiales
  useEffect(() => {
    fetch("http://localhost:3000/api/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // Formater les données pour inclure l'ID
        const formattedData = data.map((doc) => ({
          ...doc,
          id: doc.id,
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("Erreur lors du fetch des données: ", error);
      });
  }, []);

  // Fonction pour supprimer une card
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/data/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Données supprimées avec succès");
        // Mettre à jour l'état local pour retirer la carte supprimée
        setData((prevData) => prevData.filter((card) => card.id !== id));
      } else {
        console.error("Erreur lors de la suppression des données");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression des données:", error);
    }
  };

  // Fonctions pour gérer les changements des champs de saisies
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTechnosChange = (newTechnos) => setTechnos(newTechnos);
  const handleImageUrlChange = (url) => setImageUrl(url);
  const handleImageFileChange = (file) => setImageFile(file);
  const handleModalClose = () => setIsModalOpen(false);
  const handleNewItemClick = () => setIsModalOpen(true);

  // Fonction pour ajouter une nouvelle carte
  const handleAddCard = (newCard) => {
    setData((prevData) => [...prevData, newCard]);
  };

  // Rendu JSX du composant Container
  return (
    <div className="container">
      {/* Éléments du haut */}
      <div className="top-elements">
        <div className="title">
          {/* Composant Title */}
          <Title />
        </div>
        <div className="right-elements">
          <div className="filter-bar">
            {/* Composant FilterBar */}
            <FilterBar />
          </div>
          <div className="add-btn">
            {/* Composant NewitemButton */}
            <NewitemButton onClick={handleNewItemClick} />
          </div>
        </div>
      </div>

      {/* Composant CodeCards pour afficher les card */}
      <CodeCards data={data} onDelete={handleDelete} />

      {/* Composant Modal pour créer une nouvelle card */}
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
        onAddCard={handleAddCard}
      />
    </div>
  );
}
