import "./modal__style.scss";
import { useState, useRef, useEffect } from "react";
import { IoCloseSharp, IoAddOutline } from "react-icons/io5";
import { GiMove } from "react-icons/gi";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";

/**
 * Composant Modal pour l'ajout de cartes.
 * @param {boolean} isOpen - Détermine si le modal est ouvert ou fermé.
 * @param {string} title - Titre de la carte à ajouter.
 * @param {function} onTitleChange - Fonction de gestion du changement de titre.
 * @param {function} onClose - Fonction pour fermer le modal.
 * @param {function} onAddCard - Fonction pour ajouter la carte.
 * @param {boolean} showImageInput - Indique si l'input pour l'image doit être affiché.
 * @param {string} textAreaValue - Valeur des zones de texte.
 * @param {function} onTextAreaChange - Fonction de gestion du changement dans les zones de texte.
 * @param {string} technos - Technologies liées à la carte.
 * @param {function} onTechnosChange - Fonction de gestion du changement des technologies.
 * @param {File} imageFile - Fichier image sélectionné.
 * @param {function} onImageFileChange - Fonction de gestion du changement de l'image.
 * @param {string} containerType - Type de container pour déterminer l'URL de l'API.
 * @param {array} subtitles - Sous-titres pour les textAreas.
 */
export function Modal({
  isOpen,
  title,
  onTitleChange,
  onClose,
  showImageInput,
  containerType,
  fetchCards,
  fetchCardsNotes,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [textAreas, setTextAreas] = useState([
    { id: uuidv4(), language: "", value: "", subtitle: "" },
  ]);
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 200,
    y: window.innerHeight / 2 - 220,
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  // Fonction pour soumettre le formulaire et ajouter la card
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardId = uuidv4();
    // Formdata , à voir si je test avec l'ajout des catégories
    const formData = new FormData();
    formData.append("id", cardId);
    formData.append("title", title);

    const languages = textAreas.map((area) => area.language);
    const subtitles = textAreas.map((area) => area.subtitle);
    const values = textAreas.map((area) => area.value);

    formData.append("technos", JSON.stringify(languages));
    formData.append("subtitles", JSON.stringify(subtitles));
    formData.append("textAreas", JSON.stringify(values));

    if (selectedImageFile) {
      formData.append("imageFile", selectedImageFile);
    }

    try {
      let url = "";
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();

      // Sélection de l'URL en fonction du type de container (api/ressourcescards à ajouter lorsque le Container pour les ressources sera coder)
      if (containerType === "ContainerCode") {
        url = "http://localhost:3000/api/codecards";
      } else if (containerType === "ContainerNotes") {
        url = "http://localhost:3000/api/notescards";
      }

      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Ferme la modal
        onClose();
        if (containerType == "ContainerCode") {
          await fetchCards();
        } else if (containerType == "ContainerNotes") {
          await fetchCardsNotes();
        }
      } else {
        console.error("Erreur d'envoie des données");
      }
    } catch (error) {
      console.error("Erreur d'envoie des données:", error);
    }
  };

  // Fonction pour gérer le début du déplacement du modal
  const handleMouseDown = (e) => {
    const modalRect = modalRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - modalRect.left, y: e.clientY - modalRect.top });
    setIsDragging(true);
  };

  // Fonction pour gérer le déplacement du modal en cours
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  // Fonction pour gérer la fin du déplacement du modal
  const handleMouseUp = () => setIsDragging(false);

  // Effet pour écouter le déplacement de la souris lors du déplacement du modal
  useEffect(() => {
    const mouseMoveListener = (e) => handleMouseMove(e);
    const mouseUpListener = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener("mousemove", mouseMoveListener);
      document.addEventListener("mouseup", mouseUpListener);
    } else {
      document.removeEventListener("mousemove", mouseMoveListener);
      document.removeEventListener("mouseup", mouseUpListener);
    }

    return () => {
      document.removeEventListener("mousemove", mouseMoveListener);
      document.removeEventListener("mouseup", mouseUpListener);
    };
  }, [isDragging, offset]);

  // Si le modal n'est pas ouvert, ne rien afficher
  if (!isOpen) return null;

  // Fonction pour ajouter une nouvelle zone de texte
  const addNewTextArea = () => {
    setTextAreas([
      ...textAreas,
      { id: uuidv4(), language: "", value: "", subtitle: "" },
    ]);
  };

  // Fonction pour supprimer une zone de texte spécifique
  const removeTextArea = (id) => {
    setTextAreas(textAreas.filter((textArea) => textArea.id !== id));
  };

  // Fonction pour gérer le changement de valeur dans une zone de texte spécifique
  const handleTextAreaChange = (id, value) => {
    setTextAreas((prev) =>
      prev.map((textArea) =>
        textArea.id === id ? { ...textArea, value } : textArea
      )
    );
  };

  // Fonction pour gérer le changement de langage dans une zone de texte spécifique
  const handleLanguageChange = (id, language) => {
    setTextAreas((prev) =>
      prev.map((textArea) =>
        textArea.id === id ? { ...textArea, language } : textArea
      )
    );
  };

  // Fonction pour gérer le changement de sous-titre dans une zone de texte spécifique
  const handleSubtitleChange = (id, subtitle) => {
    setTextAreas((prev) =>
      prev.map((textArea) =>
        textArea.id === id ? { ...textArea, subtitle } : textArea
      )
    );
  };

  // Fonction pour gérer le changement d'image sélectionnée
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImageFile(file);
  };

  // Rendu du composant Modal avec les éléments du formulaire
  return (
    <div className="modal">
      <div
        className={`modal-content ${isDragging ? "no-select" : ""}`}
        ref={modalRef}
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          position: "fixed",
        }}
      >
        {/* Boutons de contrôle du modal */}
        <div className="modal-buttons">
          <span className="close" onClick={onClose}>
            <IoCloseSharp />
          </span>
          <span
            className="deplace"
            onMouseDown={handleMouseDown}
            onClick={(e) => e.stopPropagation()}
            title="Déplacer"
          >
            <GiMove />
          </span>
        </div>

        {/* Formulaire pour ajouter une carte */}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-top-content">
            {/* Champ de saisie du titre */}
            <input
              type="text"
              value={title}
              onChange={onTitleChange}
              placeholder="Titre de la carte"
              className="modal-title"
            />

            {/* Sélection d'image, si activé */}
            {showImageInput && (
              <div className="modal-select-img">
                <label htmlFor="imageUpload" className="select-img-text">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="imageUpload"
                    className="input-image"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Zones de texte dynamiques */}
          {textAreas.map((textArea) => (
            <div key={textArea.id} className="modal-textarea-container">
              {/* Bouton pour supprimer une zone de texte */}
              <button
                type="button"
                onClick={() => removeTextArea(textArea.id)}
                className="remove-textarea"
              >
                <IoCloseSharp />
              </button>
              {/* Champ de saisie pour le langage ou le sous-titre */}
              {containerType === "ContainerCode" ? (
                <input
                  type="text"
                  value={textArea.language}
                  onChange={(e) =>
                    handleLanguageChange(textArea.id, e.target.value)
                  }
                  placeholder="Langage"
                  className="modal-input"
                />
              ) : (
                <input
                  type="text"
                  value={textArea.subtitle}
                  onChange={(e) =>
                    handleSubtitleChange(textArea.id, e.target.value)
                  }
                  placeholder="Sous-titre"
                  className="modal-input"
                />
              )}
              {/* Zone de texte pour le contenu de la carte */}
              <textarea
                value={textArea.value}
                onChange={(e) =>
                  handleTextAreaChange(textArea.id, e.target.value)
                }
                placeholder="Ajouter le contenu ici"
                className="modal-text-area"
              ></textarea>
            </div>
          ))}

          {/* Bouton pour ajouter une nouvelle zone de texte */}
          <button
            type="button"
            onClick={addNewTextArea}
            className="add-textarea"
          >
            <IoAddOutline />
          </button>

          {/* Bouton pour soumettre le formulaire */}
          <button type="submit" className="modal-submit">
            Ajouter la carte
          </button>
        </form>
      </div>
    </div>
  );
}
