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
// Libs
import { getAuth } from "firebase/auth"; // Importer la fonction getAuth depuis firebase/auth

/**
 * Composant Container
 * @returns {JSX.Element} Le composant Container.
 */
export function Container() {
  // Déclare les états locaux du composant
  const [data, setData] = useState([]); // État pour stocker les données
  const [title, setTitle] = useState(""); // État pour stocker le titre
  const [technos, setTechnos] = useState([]); // État pour stocker les technologies
  const [imageFile, setImageFile] = useState(null); // État pour stocker le fichier image
  const [imageUrl, setImageUrl] = useState(""); // État pour stocker l'URL de l'image
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler l'ouverture du modal

  // Utilise useEffect pour effectuer un fetch des données lors du montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupère l'authentification actuelle de Firebase
        const auth = getAuth();
        const currentUser = auth.currentUser;
        // Vérifie si l'utilisateur est authentifié
        if (!currentUser) {
          console.warn("User is not authenticated"); // Affiche un avertissement si l'utilisateur n'est pas authentifié
          return;
        }
        // Récupère le token de l'utilisateur
        const token = await currentUser.getIdToken();
        // Effectue une requête pour récupérer les données
        const response = await fetch("http://localhost:3000/api/data", {
          headers: {
            Authorization: `Bearer ${token}`, // Ajoute le token dans les en-têtes de la requête
          },
        });

        // Vérifie si la réponse est correcte
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText); // Lance une erreur si la réponse n'est pas correcte
        }

        // Parse les données JSON de la réponse
        const data = await response.json();
        // Formate les données récupérées
        const formattedData = data.map((doc) => ({
          ...doc,
          id: doc.id,
        }));
        setData(formattedData); // Met à jour l'état des données
      } catch (error) {
        console.error("Erreur lors du fetch des données: ", error); // Affiche une erreur en cas de problème lors du fetch
      }
    };

    fetchData(); // Appelle la fonction fetchData
  }, []); // Dépendance vide pour n'exécuter qu'une seule fois au montage

  // Fonction pour gérer la suppression d'une carte
  const handleDelete = async (id) => {
    try {
      // Récupère l'authentification actuelle de Firebase
      const auth = getAuth();
      const currentUser = auth.currentUser;
      // Vérifie si l'utilisateur est authentifié
      if (!currentUser) {
        console.warn("User is not authenticated"); // Affiche un avertissement si l'utilisateur n'est pas authentifié
        return;
      }
      // Récupère le token de l'utilisateur
      const token = await currentUser.getIdToken();
      // Effectue une requête pour supprimer les données
      const response = await fetch(`http://localhost:3000/api/data/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Ajoute le token dans les en-têtes de la requête
        },
      });

      // Vérifie si la réponse est correcte
      if (response.ok) {
        console.log("Données supprimées avec succès"); // Affiche un message de succès
        setData((prevData) => prevData.filter((card) => card.id !== id)); // Met à jour l'état des données en filtrant la carte supprimée
      } else {
        console.error("Erreur lors de la suppression des données"); // Affiche une erreur si la suppression échoue
      }
    } catch (error) {
      console.error("Erreur lors de la suppression des données:", error); // Affiche une erreur en cas de problème lors de la suppression
    }
  };

  // Fonctions pour gérer les changements d'état
  const handleTitleChange = (e) => setTitle(e.target.value); // Met à jour l'état du titre
  const handleTechnosChange = (newTechnos) => setTechnos(newTechnos); // Met à jour l'état des technologies
  const handleImageUrlChange = (url) => setImageUrl(url); // Met à jour l'état de l'URL de l'image
  const handleImageFileChange = (file) => setImageFile(file); // Met à jour l'état du fichier image
  const handleModalClose = () => setIsModalOpen(false); // Ferme le modal
  const handleNewItemClick = () => setIsModalOpen(true); // Ouvre le modal
  const handleAddCard = (newCard) => {
    setData((prevData) => [...prevData, newCard]); // Ajoute une nouvelle carte à l'état des données
  };

  return (
    <div className="container">
      <div className="top-elements">
        <div className="title">
          <Title /> {/* Affiche le composant Title */}
        </div>
        <div className="right-elements">
          <div className="filter-bar">
            <FilterBar /> {/* Affiche le composant FilterBar */}
          </div>
          <div className="add-btn">
            <NewitemButton onClick={handleNewItemClick} />{" "}
            {/* Affiche le bouton pour ajouter un nouvel élément */}
          </div>
        </div>
      </div>
      <CodeCards data={data} onDelete={handleDelete} />{" "}
      {/* Affiche les cartes de code avec la possibilité de supprimer */}
      <Modal
        isOpen={isModalOpen} // Contrôle l'ouverture du modal
        onClose={handleModalClose} // Ferme le modal
        title={title} // Passe le titre au modal
        onTitleChange={handleTitleChange} // Gère le changement de titre
        technos={technos} // Passe les technologies au modal
        onTechnosChange={handleTechnosChange} // Gère le changement de technologies
        imageFile={imageFile} // Passe le fichier image au modal
        onImageFileChange={handleImageFileChange} // Gère le changement de fichier image
        imageUrl={imageUrl} // Passe l'URL de l'image au modal
        onImageUrlChange={handleImageUrlChange} // Gère le changement d'URL de l'image
        showImageInput={true} // Affiche l'entrée d'image
        showLangageInput={true} // Affiche l'entrée de langage
        onAddCard={handleAddCard} // Gère l'ajout d'une nouvelle carte
      />
    </div>
  );
}
