import { useState, useEffect } from "react";
import { CodeCards } from "./CodeCards/CodeCards";
import { Modal } from "../../Globals_components/Modal_components/Modal";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NewItemButton } from "../../Globals_components/NewItem_button_components/NewItemButton";
import { FilterBar } from "../../Globals_components/FilterBar_components/FilterBar";
import "../MesCodes_components/container.scss";
import { Title } from "./Title/Title";

function ContainerCode() {
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [newCardTechnos, setNewCardTechnos] = useState([]);
  const [newCardTextAreas, setNewCardTextAreas] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCards = async () => {
    const auth = getAuth();

    try {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch("http://localhost:3000/api/codecards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCards(data);
      } else {
        console.error("Échec de récupération des cards");
      }
    } catch (error) {
      console.error("Erreur de récupération des cards:", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTechnosChange = (e) => setNewCardTechnos(e.target.value);
  const handleTextAreasChange = (e) => setNewCardTextAreas(e.target.value);

  const handleAddCard = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      // Transformer technos et textAreas en tableaux si ce n'est pas déjà fait
      const newTechnos =
        newCardTechnos.length > 0 ? JSON.parse(newCardTechnos) : [];
      const newTextAreas =
        newCardTextAreas.length > 0
          ? JSON.parse(`["${newCardTextAreas}"]`)
          : [];

      const newCard = {
        title,
        technos: Array.isArray(newTechnos) ? newTechnos : [],
        textAreas: Array.isArray(newTextAreas) ? newTechnos : [],
        imageUrl: null, // Définir une valeur par défaut pour imageUrl si nécessaire
      };

      try {
        const response = await fetch("http://localhost:3000/api/codecards", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCard),
        });

        if (response.ok) {
          const addedCard = await response.json();
          console.log("Nouvelle carte ajoutée:", addedCard);

          // Vérifier si la carte ajoutée est valide avant de l'ajouter à cards
          if (
            addedCard.id &&
            addedCard.title &&
            Array.isArray(addedCard.technos) &&
            Array.isArray(addedCard.textAreas)
          ) {
            setCards([...cards, addedCard]);
          } else {
            console.warn("La carte ajoutée n'est pas valide:", addedCard);
          }

          handleCloseModal();
        } else {
          console.error("Échec d'ajout de la carte");
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de la carte:", error);
      }
    } else {
      console.error("Aucun utilisateur connecté");
    }
  };

  const handleDeleteCard = async (cardId) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      try {
        const response = await fetch(
          `http://localhost:3000/api/codecards/${cardId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setCards(cards.filter((card) => card.id !== cardId));
        } else {
          console.error("Échec de suppression de la carte");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la carte:", error);
      }
    } else {
      console.error("Aucun utilisateur connecté");
    }
  };

  if (isLoading) {
    return <span class="loader"></span>;
  }

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
            <NewItemButton
              onClick={handleOpenModal}
              containerType="ContainerCode"
            />
          </div>
        </div>
      </div>

      <CodeCards codecards={cards} onDelete={handleDeleteCard} />

      <Modal
        isOpen={isModalOpen}
        title={title}
        onTitleChange={handleTitleChange}
        technos={newCardTechnos}
        onTechnosChange={handleTechnosChange}
        textAreaValue={newCardTextAreas}
        onTextAreaChange={handleTextAreasChange}
        onClose={handleCloseModal}
        onAddCard={handleAddCard}
        showImageInput={true}
        containerType="ContainerCode"
        fetchCards={fetchCards}
      />
    </div>
  );
}

export default ContainerCode;
