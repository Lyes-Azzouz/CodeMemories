// Style
import "./modal__style.scss";
// Hooks
import { useState, useRef, useEffect } from "react";
// React icons
import { IoCloseSharp } from "react-icons/io5";
import { GiMove } from "react-icons/gi";
import { IoAddOutline } from "react-icons/io5";
// Libs
import { v4 as uuidv4 } from "uuid";

// Création du composant modal
export function Modal(props) {
  // Mise en place de l'état de déplacement de la modal
  const [isDragging, setIsDragging] = useState(false);
  // Initialisation de l'état pour les zones de text, chaque zone a un ID unique généré par la lib uuidv4
  const [textAreas, setTextAreas] = useState([{ id: uuidv4(), value: "" }]);
  // Mise en place de l'état de positionnement initial de la modal (centré)
  const [position, setPosition] = useState({
    x: window.innerHeight - 300,
    y: window.innerHeight - 1000,
  });
  // Mise en place de l'état de l'écart entre l'offset (le coin en haut à gauche de la modal) et le curseur
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // Initialise une référence au DOM de la modal
  const modalRef = useRef(null);

  // Fonction pour gérer la soumission du formulaire (actuellement non implémentée)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // onSubmit();
  };

  /*********************** Mise en place des fonctions de mouvement de la modal **********************/
  const handleMouseDown = (e) => {
    // Récupère les dimensions et la position de la modal
    const modalRect = modalRef.current.getBoundingClientRect();
    // Calcule l'offset entre le curseur et le coin supérieur gauche de la modal
    setOffset({
      x: e.clientX - modalRect.left,
      y: e.clientY - modalRect.top,
    });
    // Indique que la modal est en train de bouger
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    // Si la modal est en train de bouger, met à jour sa position
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    // Arrête le déplacement de la modal
    setIsDragging(false);
  };

  /************************* Ecouteur d'événements (mousemove, mouseup) ********************************************/
  useEffect(() => {
    // Fonctions listeners pour les événements de souris
    const mouseMoveListener = (e) => handleMouseMove(e);
    const mouseUpListener = () => handleMouseUp();

    // Ajoute les listeners si la modal est en train de bouger
    if (isDragging) {
      document.addEventListener("mousemove", mouseMoveListener);
      document.addEventListener("mouseup", mouseUpListener);
    } else {
      // Retire les listeners quand la modal arrête de bouger
      document.removeEventListener("mousemove", mouseMoveListener);
      document.removeEventListener("mouseup", mouseUpListener);
    }

    // Nettoie les listeners à la fin du cycle de vie du composant ou lorsque isDragging ou offset change
    return () => {
      document.removeEventListener("mousemove", mouseMoveListener);
      document.removeEventListener("mouseup", mouseUpListener);
    };
  }, [isDragging, offset]); // Dépendances : isDragging et offset

  // Si la modal n'est pas ouverte, ne rien rendre
  if (!props.isOpen) {
    return null;
  }

  /** Supprimer ou ajouter une text area en fonction des besoins  */
  // Ajoute une nouvelle zone de texte avec un ID unique
  const addNewTextArea = () => {
    setTextAreas([...textAreas, { id: uuidv4(), value: "" }]);
  };

  // Supprime une zone de texte en fonction de son ID
  const removeTextArea = (id) => {
    setTextAreas(textAreas.filter((textArea) => textArea.id !== id));
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
          <label className="modal-image">
            Image :
            <input
              type="text"
              value={props.imageUrl}
              onChange={props.onImageUrlChange}
              required
            />
          </label>
          <label className="modal-technos">
            Technos/Languages :
            <input
              type="text"
              value={props.technos}
              onChange={props.onTechnosChange}
              required
            />
          </label>
          <label className="modal-code">
            Ajoutez votre code à sauvegarder :
            {textAreas.map((textArea) => (
              <div key={textArea.id} className="modal-text-area">
                <textarea
                  className="code-area"
                  value={textArea.value}
                  onChange={(e) =>
                    setTextAreas((prev) =>
                      prev.map((prevTextArea) =>
                        prevTextArea.id === textArea.id
                          ? { ...prevTextArea, value: e.target.value }
                          : prevTextArea
                      )
                    )
                  }
                />
                <button
                  className="btn-remove-text-area"
                  type="button"
                  onClick={() => removeTextArea(textArea.id)}
                >
                  <IoCloseSharp />
                </button>
              </div>
            ))}
          </label>
          <button
            type="button"
            className="btn-add-text-area"
            onClick={addNewTextArea}
          >
            <span className="modal-icon-add">
              <IoAddOutline />
            </span>
            Nouveau champ
          </button>
          <button className="button-create" type="submit">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
