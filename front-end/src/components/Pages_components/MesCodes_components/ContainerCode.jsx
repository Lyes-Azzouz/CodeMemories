// Style
import "./container.scss";
// Components
import { Title } from "./Title/Title";
import { CodeCards } from "./CodeCards/CodeCards";
import { FilterBar } from "../../Globals_components/FilterBar_components/FilterBar";
import { NewItemButton } from "../MesCodes_components/NewItem_button_components/NewItemButton";
import { Modal } from "../../Globals_components/Modal_components/Modal";
// Hooks
import { useState, useEffect, useContext } from "react";
// Context
import { CardsContentSelectContext } from "../../../context/CardsContentSelectContext";
import { ModalContext } from "../../../context/ModalContext";
// Libs
import { getAuth } from "firebase/auth";

export function Container() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [technos, setTechnos] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [textArea, setTextArea] = useState([]);

  const { selectedCard, setSelectedCard } = useContext(
    CardsContentSelectContext
  );
  const { isModalOpen, closeModal, modalProps } = useContext(ModalContext);

  useEffect(() => {
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
        setData(formattedData);
      } catch (error) {
        console.error("Erreur lors du fetch des données: ", error);
      }
    };

    fetchData();
  }, []);

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
        setData((prevData) => prevData.filter((card) => card.id !== id));
      } else {
        console.error("Erreur lors de la suppression des données");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression des données:", error);
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTechnosChange = (newTechnos) => setTechnos(newTechnos);
  const handleTextAreaChange = (newTextArea) => setTextArea(newTextArea);
  const handleImageUrlChange = (url) => setImageUrl(url);
  const handleImageFileChange = (file) => setImageFile(file);
  const handleAddCard = (newCard) => {
    setData((prevData) => [...prevData, newCard]);
  };

  const handleSelectCard = (card) => {
    console.log("card selected : ", card);
    setSelectedCard(card);
  };

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
            <NewItemButton />
          </div>
        </div>
      </div>
      <CodeCards
        data={data}
        onDelete={handleDelete}
        onSelectCard={handleSelectCard}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
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
        {...modalProps} // Pass additional modal props from context
      />
    </div>
  );
}
