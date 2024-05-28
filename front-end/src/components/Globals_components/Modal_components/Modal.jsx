// Style
import "./modal__style.scss";
// Hooks
import { useState, useRef, useEffect } from "react";
// React Icons
import { IoCloseSharp, IoAddOutline } from "react-icons/io5";
import { GiMove } from "react-icons/gi";
// Libs
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth"; // Importer la fonction getAuth depuis firebase/auth

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
 * @param {Array} props.textAreaValue - La valeur de la zone de texte.
 * @param {Function} props.onTextAreaChange - Fonction de changement de la zone de texte.
 * @param {Array} props.technos - Les technologies de la carte.
 * @param {Function} props.onTechnosChange - Fonction de changement des technologies.
 * @param {File} props.imageFile - Le fichier image de la carte.
 * @param {Function} props.onImageFileChange - Fonction de changement du fichier image.
 * @returns {JSX.Element} Le composant Modal.
 */
export function Modal(props) {
  // États locaux du composant
  const [isDragging, setIsDragging] = useState(false); // État pour le déplacement de la modal
  const [textAreas, setTextAreas] = useState([
    { id: uuidv4(), language: "", value: "" },
  ]); // État pour les zones de texte

  const [position, setPosition] = useState({
    // État pour la position de la modal
    x: window.innerWidth / 2 - 200,
    y: window.innerHeight / 2 - 220,
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // État pour le décalage lors du déplacement
  const modalRef = useRef(null); // Référence à la modal
  const [selectedImageFile, setSelectedImageFile] = useState(null); // État pour le fichier image sélectionné

  // Fonction pour soumettre le formulaire
  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardId = uuidv4();
    const formData = new FormData();
    formData.append("id", cardId);
    formData.append("title", props.title);
    formData.append(
      "technos",
      JSON.stringify(textAreas.map((area) => area.language))
    );
    formData.append(
      "textAreas",
      JSON.stringify(textAreas.map((area) => area.value))
    );

    if (selectedImageFile) {
      formData.append("imageFile", selectedImageFile);
    }

    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
      const response = await fetch("http://localhost:3000/api/data", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Données envoyées avec succès");
        props.onClose();
        props.onAddCard({
          id: cardId,
          title: props.title,
          technos: textAreas.map((area) => area.language),
          imageUrl: props.imageUrl,
          textAreas: textAreas.map((area) => area.value),
        });
      } else {
        console.error("Erreur lors de l'envoi des données");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
    }
  };

  // Fonction pour gérer le clic sur la modal
  const handleMouseDown = (e) => {
    const modalRect = modalRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - modalRect.left, y: e.clientY - modalRect.top });
    setIsDragging(true);
  };

  // Fonction pour gérer le mouvement de la modal
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  // Fonction pour gérer le relâchement du clic de la souris
  const handleMouseUp = () => setIsDragging(false);

  // Effet pour ajouter et retirer les écouteurs d'événements lors du déplacement de la modal
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

  // Si la modal n'est pas ouverte, ne rien afficher
  if (!props.isOpen) return null;

  // Fonction pour ajouter une nouvelle zone de texte
  const addNewTextArea = () => {
    setTextAreas([...textAreas, { id: uuidv4(), language: "", value: "" }]);
  };

  // Fonction pour supprimer une zone de texte
  const removeTextArea = (id) => {
    setTextAreas(textAreas.filter((textArea) => textArea.id !== id));
  };
  // Fonction pour gérer le changement de texte dans une zone de texte
  const handleTextAreaChange = (id, value) => {
    // const updatedTextAreas = textAreasValue.map((textarea) => {
    //   if (textarea.id === id) {
    //     return { ...textarea, value };
    //   }
    //   return textarea;
    // });
    // setTextAreasValue(updatedTextAreas);
    setTextAreas((prev) =>
      prev.map((textAreas) =>
        textAreas.id === id ? { ...textAreas, value } : textAreas
      )
    );
  };

  // Fonction pour gérer le changement de langage dans une zone de texte
  const handleLanguageChange = (id, language) => {
    setTextAreas((prev) =>
      prev.map((textArea) =>
        textArea.id === id ? { ...textArea, language } : textArea
      )
    );
  };

  // Fonction pour gérer le changement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    props.onImageUrlChange(URL.createObjectURL(file));
    setSelectedImageFile(file);
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
