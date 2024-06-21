import { useState, useEffect } from "react";
import NotesCard from "./NoteCards/NoteCards";
import { Modal } from "../../Globals_components/Modal_components/Modal";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { NewItemButton } from "../../Globals_components/NewItem_button_components/NewItemButton";
import { FilterBar } from "../../Globals_components/FilterBar_components/FilterBar";
import "./container_mesnotes.scss";

function ContainerNotes() {
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [newCardTextAreas, setNewCardTextAreas] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const auth = getAuth();
        const token = await auth.currentUser.getIdToken();
        const response = await fetch("http://localhost:3000/api/notescards", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCards(data);
        } else {
          console.error("Failed to fetch cards");
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTextAreasChange = (e) => setNewCardTextAreas(e.target.value);

  const handleAddCard = async (newCard) => {
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
      setCards([...cards, newCard]);
      handleCloseModal();
    } else {
      console.error("Failed to add card");
    }
  };

  const handleDeleteCard = async (cardId) => {
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
      setCards(cards.filter((card) => card.id !== cardId));
    } else {
      console.error("Failed to delete card");
    }
  };

  return (
    <div className="notes">
      <FilterBar />
      <div className="notes__container">
        {cards.map((card) => (
          <NotesCard
            key={card.id}
            id={card.id}
            title={card.title}
            subtitles={card.subtitles}
            textAreas={card.textAreas}
            onDelete={() => handleDeleteCard(card.id)}
          />
        ))}
        <NewItemButton onClick={handleOpenModal} />
        <Modal
          isOpen={isModalOpen}
          title={title}
          onTitleChange={handleTitleChange}
          textAreaValue={newCardTextAreas}
          onTextAreaChange={handleTextAreasChange}
          onClose={handleCloseModal}
          onAddCard={handleAddCard}
          containerType="ContainerNotes"
        />
      </div>
    </div>
  );
}

export default ContainerNotes;
