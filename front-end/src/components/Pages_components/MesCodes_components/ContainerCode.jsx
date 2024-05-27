// Style
import "./container.scss";

// Components
import { Title } from "./Title/Title";
import { CodeCards } from "./CodeCards/CodeCards";
import { FilterBar } from "../../Globals_components/FilterBar_components/FilterBar";
import { NewitemButton } from "./NewItem_button_components/NewItemButton";
import { Modal } from "../../Globals_components/Modal_components/Modal";
import { ContainerCardContent } from "../CardContentDetail_components/ContainerCardContent";

// Hooks
import { useState, useEffect } from "react";

// Libs
import { getAuth } from "firebase/auth";

// Composant principal pour afficher les cartes et les détails des cartes sélectionnées
export function Container() {
  const [data, setData] = useState([]); // État pour stocker les données des card
  const [title, setTitle] = useState(""); // État pour stocker le titre de la nouvelle card
  const [technos, setTechnos] = useState([]); // État pour stocker les technologies de la nouvelle card
  const [imageFile, setImageFile] = useState(null); // État pour stocker le fichier image de la nouvelle card
  const [imageUrl, setImageUrl] = useState(""); // État pour stocker l'URL de l'image de la nouvelle card
  const [textArea, setTextArea] = useState(""); // État pour stocker le texte de la nouvelle card
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture du modal
  const [selectedCard, setSelectedCard] = useState(null); // État pour stocker la card sélectionnée

  useEffect(() => {
    // Fonction pour récupérer les données des card
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.warn("User is not authenticated");
          return;
        }
        const token = await currentUser.getIdToken();
        const response = await fetch("http://localhost:3000/api/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        const formattedData = data.map((doc) => ({
          ...doc,
          id: doc.id,
        }));
        setData(formattedData); // Met à jour l'état avec les données formatées
      } catch (error) {
        console.error("Erreur lors du fetch des données: ", error);
      }
    };

    fetchData();
  }, []);

  // Fonction pour supprimer une card
  const handleDelete = async (id) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.warn("User is not authenticated");
        return;
      }
      const token = await currentUser.getIdToken();
      const response = await fetch(`http://localhost:3000/api/data/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Données supprimées avec succès");
        setData((prevData) => prevData.filter((card) => card.id !== id)); // Met à jour l'état après suppression
      } else {
        console.error("Erreur lors de la suppression des données");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression des données:", error);
    }
  };

  // Fonctions de gestion des états pour les entrées du formulaire
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTechnosChange = (newTechnos) => setTechnos(newTechnos);
  const handleTextAreaChange = (e) => setTextArea(e.target.value);
  const handleImageUrlChange = (url) => setImageUrl(url);
  const handleImageFileChange = (file) => setImageFile(file);
  const handleModalClose = () => setIsModalOpen(false);
  const handleNewItemClick = () => setIsModalOpen(true);

  // Fonction pour ajouter une nouvelle card
  const handleAddCard = (newCard) => {
    setData((prevData) => [...prevData, newCard]);
  };

  // Fonction pour sélectionner une card
  const handleSelectCard = (card) => setSelectedCard(card);

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
      <CodeCards
        data={data}
        onDelete={handleDelete}
        onSelectCard={handleSelectCard}
      />
      {/* Afficher les détails de la card sélectionnée */}
      {selectedCard && <ContainerCardContent card={selectedCard} />}
      {/* Modal pour ajouter une nouvelle card */}
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
        textAreaValue={textArea}
        onTextAreaChange={handleTextAreaChange}
      />
    </div>
  );
}
