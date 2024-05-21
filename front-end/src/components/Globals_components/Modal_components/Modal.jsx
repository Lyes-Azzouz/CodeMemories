// Style
import "./modal__style.scss";
// Hooks
import { useState, useRef, useEffect } from "react";
import { IoCloseSharp, IoAddOutline } from "react-icons/io5";
// React Icons
import { GiMove } from "react-icons/gi";
// Libs
import { v4 as uuidv4 } from "uuid";

/**
 * Composant Modal
 * @param {Object} props - Les propriétés passées au composant.
 * @param {boolean} props.isOpen - Indique si la modal est ouverte.
 * @param {string} props.title - Le titre de la carte.
 * @param {Function} props.onTitleChange - Fonction de changement du titre.
 * @param {Function} props.onClose - Fonction de fermeture de la modal.
 * @param {Function} props.onAddCard - Fonction d'ajout de la carte.
 * @param {boolean} props.showImageInput - Affiche ou cache l'entrée d'image.
 * @param {Function} props.onImageUrlChange - Fonction de changement d'URL de l'image.
 * @param {boolean} props.showLangageInput - Affiche ou cache l'entrée de langage.
 */
export function Modal(props) {
  const [isDragging, setIsDragging] = useState(false); // État pour le déplacement de la modal
  const [textAreas, setTextAreas] = useState([{ id: uuidv4(), language: "" }]); // État pour les champs de texte
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 200,
    y: window.innerHeight / 2 - 220,
  }); // Position de la modal
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Offset pour le déplacement de la modal
  const modalRef = useRef(null); // Référence à la modal
  const [selectedImageFile, setSelectedImageFile] = useState(null); // Fichier image sélectionné

  /**
   * Gère la soumission du formulaire.
   * @param {Event} e - L'événement de soumission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardId = uuidv4(); // Générer un ID unique pour la carte
    const formData = new FormData();
    formData.append("id", cardId); // Ajouter l'ID au formulaire
    formData.append("title", props.title);
    formData.append(
      "technos",
      JSON.stringify(textAreas.map((area) => area.language))
    );
    if (selectedImageFile) {
      formData.append("imageFile", selectedImageFile);
    }

    try {
      const response = await fetch("http://localhost:3000/api/data", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Données envoyées avec succès");
        props.onClose();
        props.onAddCard({
          id: cardId,
          title: props.title,
          technos: textAreas.map((area) => area.language),
          imageUrl: props.imageUrl,
        });
      } else {
        console.error("Erreur lors de l'envoi des données");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
    }
  };

  /**
   * Gère le début du déplacement de la modal.
   * @param {Event} e - L'événement de la souris.
   */
  const handleMouseDown = (e) => {
    const modalRect = modalRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - modalRect.left, y: e.clientY - modalRect.top });
    setIsDragging(true);
  };

  /**
   * Gère le déplacement de la modal.
   * @param {Event} e - L'événement de la souris.
   */
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  /**
   * Gère la fin du déplacement de la modal.
   */
  const handleMouseUp = () => setIsDragging(false);

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

  if (!props.isOpen) return null;

  /**
   * Ajoute un nouveau champ de texte.
   */
  const addNewTextArea = () => {
    setTextAreas([...textAreas, { id: uuidv4(), value: "", language: "" }]);
  };

  /**
   * Supprime un champ de texte.
   * @param {string} id - L'ID du champ de texte à supprimer.
   */
  const removeTextArea = (id) => {
    setTextAreas(textAreas.filter((textArea) => textArea.id !== id));
  };

  /**
   * Gère le changement de texte dans un champ de texte.
   * @param {string} id - L'ID du champ de texte.
   * @param {string} value - Le nouveau texte.
   */
  const handleTextAreaChange = (id, value) => {
    setTextAreas((prev) =>
      prev.map((textArea) =>
        textArea.id === id ? { ...textArea, value } : textArea
      )
    );
  };

  /**
   * Gère le changement de langage dans un champ de texte.
   * @param {string} id - L'ID du champ de texte.
   * @param {string} language - Le nouveau langage.
   */
  const handleLanguageChange = (id, language) => {
    setTextAreas((prev) =>
      prev.map((textArea) =>
        textArea.id === id ? { ...textArea, language } : textArea
      )
    );
  };

  /**
   * Gère le changement de fichier image.
   * @param {Event} e - L'événement de changement.
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    props.onImageUrlChange(URL.createObjectURL(file));
    setSelectedImageFile(file); // Met à jour selectedImageFile avec le fichier sélectionné
  };

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
        <div className="modal-buttons">
          <span className="close" onClick={props.onClose}>
            <IoCloseSharp />
          </span>
          <span
            className="deplace"
            onMouseDown={handleMouseDown}
            onClick={(e) => e.stopPropagation()}
            title="Déplacer la fenêtre"
          >
            <GiMove />
          </span>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="modal-title">
            Title :
            <input
              type="text"
              value={props.title}
              onChange={props.onTitleChange}
              required
            />
          </label>
          {props.showImageInput && (
            <label className="modal-image">
              Image :
              <input type="file" onChange={handleImageChange} required />
            </label>
          )}
          <label className="modal-code">
            Ajoutez votre code à sauvegarder :
            {textAreas.map((textArea) => (
              <div key={textArea.id} className="modal-text-area">
                {props.showLangageInput && (
                  <input
                    type="text"
                    className="input-langage"
                    placeholder="Langage du code (ex : 'javascript')"
                    value={textArea.language}
                    onChange={(e) =>
                      handleLanguageChange(textArea.id, e.target.value)
                    }
                  />
                )}

                <div className="code-area-content">
                  <textarea
                    className="code-area"
                    value={textArea.value}
                    onChange={(e) =>
                      handleTextAreaChange(textArea.id, e.target.value)
                    }
                    rows="10"
                    cols="30"
                  />
                  <button
                    className="btn-remove-text-area"
                    type="button"
                    onClick={() => removeTextArea(textArea.id)}
                  >
                    <IoCloseSharp />
                  </button>
                </div>
              </div>
            ))}
          </label>
          <button
            type="button"
            className="btn-add-text-area"
            onClick={addNewTextArea}
          >
            <IoAddOutline /> Nouveau champ
          </button>
          <button className="button-create" type="submit">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
