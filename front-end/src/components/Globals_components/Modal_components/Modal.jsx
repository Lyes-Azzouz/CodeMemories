// Importation du style
import "./modal__style.scss";
// Importation des hooks React
import { useState, useRef, useEffect } from "react";
// Importation des icônes React
import { IoCloseSharp, IoAddOutline } from "react-icons/io5";
import { GiMove } from "react-icons/gi";
// Importation de la librairie uuid pour générer des identifiants uniques
import { v4 as uuidv4 } from "uuid";

// Création du composant Modal
export function Modal(props) {
  const [isDragging, setIsDragging] = useState(false);
  const [textAreas, setTextAreas] = useState([
    { id: uuidv4(), value: "", language: "" },
  ]);
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 200,
    y: window.innerHeight / 2 - 150,
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);
  // Envoie des donnée au serveur
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData
    const formData = new FormData();

    // Ajoute les données du formulaire avec le fichier image téléchargé
    formData.append("title", props.title);
    formData.append("technos", JSON.stringify(props.textAreas));
    formData.append("imageUrl", props.imageFile); // Utilise la prop imageFile

    console.log("Données à envoyer au serveur :", formData);

    try {
      const response = await fetch("/api/data", {
        method: "POST",
        body: formData, // Utilisez formData comme corps de la requête
      });

      if (response.ok) {
        console.log("Données envoyées avec succès");
        onClose();
        if (specificCallback) specificCallback();
      } else {
        console.error("Erreur lors de l'envoi des données");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
    }
  };

  const handleMouseDown = (e) => {
    const modalRect = modalRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - modalRect.left, y: e.clientY - modalRect.top });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging)
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

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

  const addNewTextArea = () => {
    setTextAreas([...textAreas, { id: uuidv4(), value: "", language: "" }]);
  };

  const removeTextArea = (id) => {
    setTextAreas(textAreas.filter((textArea) => textArea.id !== id));
  };

  const handleTextAreaChange = (id, value) => {
    setTextAreas((prev) =>
      prev.map((textArea) =>
        textArea.id === id ? { ...textArea, value } : textArea
      )
    );
  };

  const handleLanguageChange = (id, language) => {
    setTextAreas((prev) =>
      prev.map((textArea) =>
        textArea.id === id ? { ...textArea, language } : textArea
      )
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    props.onImageUrlChange(URL.createObjectURL(file));
    props.onImageFileChange(file);
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
              <input type="file" onChange={props.handleImageChange} required />
            </label>
          )}
          {}
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
