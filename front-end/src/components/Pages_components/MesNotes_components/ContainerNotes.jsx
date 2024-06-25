import { useState, useEffect } from "react";
import NotesCard from "./NoteCards/NoteCards"; // Composant pour afficher les cartes de notes
import { Modal } from "../../Globals_components/Modal_components/Modal"; // Composant de modal pour ajouter une nouvelle note
import { getAuth } from "firebase/auth"; // Fonction d'authentification Firebase
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Fonctions Firestore pour l'ajout de données
import { NewItemButton } from "../../Globals_components/NewItem_button_components/NewItemButton"; // Bouton pour ajouter une nouvelle note
import { FilterBar } from "../../Globals_components/FilterBar_components/FilterBar"; // Barre de filtre pour les notes
import { Title } from "./Title/Title"; // Composant de titre pour la page
import "./container_mesnotes.scss"; // Styles spécifiques pour ce composant

function ContainerNotes() {
  // États locaux pour gérer les données des notes et l'état du modal
  const [cards, setCards] = useState([]); // Liste des notes
  const [title, setTitle] = useState(""); // Titre de la nouvelle note
  const [newCardTextAreas, setNewCardTextAreas] = useState(""); // Zones de texte de la nouvelle note
  const [isModalOpen, setIsModalOpen] = useState(false); // État du modal (ouvert ou fermé)

  // Effet de chargement initial pour récupérer les notes depuis l'API

  const fetchCardsNotes = async () => {
    const auth = getAuth();
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch("http://localhost:3000/api/notescards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCards(data); // Met à jour la liste des notes avec les données récupérées
      } else {
        console.error("Failed to fetch cards");
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };
  useEffect(() => {
    fetchCardsNotes();
  }, []);

  // Fonction pour ouvrir le modal d'ajout de note
  const handleOpenModal = () => setIsModalOpen(true);

  // Fonction pour fermer le modal d'ajout de note
  const handleCloseModal = () => setIsModalOpen(false);

  // Gestionnaire de changement pour le titre de la nouvelle note
  const handleTitleChange = (e) => setTitle(e.target.value);

  // Gestionnaire de changement pour les zones de texte de la nouvelle note
  const handleTextAreasChange = (e) => setNewCardTextAreas(e.target.value);

  // Fonction pour ajouter une nouvelle note
  const handleAddCard = async (newCard) => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      const response = await fetch("http://localhost:3000/api/notescards", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });

      if (response.ok) {
        // Ajoute la nouvelle note à la liste actuelle
        setCards([...cards, newCard]);
        handleCloseModal(); // Ferme le modal une fois la note ajoutée avec succès
      } else {
        console.error("Failed to add card");
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  // Fonction pour supprimer une note existante
  const handleDeleteCard = async (cardId) => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(
        `http://localhost:3000/api/notescards/${cardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Met à jour la liste des notes en filtrant celle qui vient d'être supprimée
        setCards(cards.filter((card) => card.id !== cardId));
      } else {
        console.error("Failed to delete card");
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  // Rendu du composant ContainerNotes avec tous les éléments nécessaires
  return (
    <div className="container-notes">
      <div className="top-content-notes">
        <Title /> {/* Affiche le titre de la page */}
        <div className="right-elements">
          <NewItemButton onClick={handleOpenModal} />{" "}
          {/* Bouton pour ajouter une nouvelle note */}
          <FilterBar /> {/* Barre de filtre pour les notes */}
        </div>
      </div>

      <div className="notes__container-content">
        <NotesCard
          notescards={cards} // Propriété pour passer les données des notes au composant NotesCard
          onDelete={handleDeleteCard} // Fonction de suppression de note
          onSelectCard={(card) => console.log("Card selected:", card)} // Fonction appelée lors de la sélection d'une note (ici, elle affiche juste un message)
        />

        <Modal
          isOpen={isModalOpen} // Propriété pour contrôler l'ouverture du modal
          title={title} // Propriété pour passer le titre au modal
          onTitleChange={handleTitleChange} // Fonction de changement de titre du modal
          textAreaValue={newCardTextAreas} // Propriété pour passer les zones de texte au modal
          onTextAreaChange={handleTextAreasChange} // Fonction de changement de zones de texte du modal
          onClose={handleCloseModal} // Fonction pour fermer le modal
          onAddCard={handleAddCard} // Fonction pour ajouter une note
          containerType="ContainerNotes" // Type de conteneur pour le modal
          fetchCardsNotes={fetchCardsNotes}
        />
      </div>
    </div>
  );
}

export default ContainerNotes;
