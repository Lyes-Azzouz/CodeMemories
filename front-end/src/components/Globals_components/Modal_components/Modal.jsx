// Style
import "./modal__style.scss";
// Hooks
import { useState, useRef, useEffect } from "react";
// React icons
import { IoCloseSharp } from "react-icons/io5";
import { GiMove } from "react-icons/gi";
// Libs
import { v4 as uuid } from "uuid";

// Création du composant modal
export function Modal(props) {
  // Mise en place de l'état de déplacement de la modal
  const [isDragging, setIsDragging] = useState(false);
  // Mise en place de l'état de positionnement initial de la modal
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 200,
    y: window.innerHeight / 2 - 150,
  });
  // Mise en place de l'état de de l'écart entre l'offest (le coin en haut a gauche de la modal) et le curseur
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // Initialise une référence au DOM de la modal
  const modalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // onSubmit();
  };

  /***********************Mise en place des fonctions de mouvement de la modale **********************/
  const handleMouseDown = (e) => {
    const modalRect = modalRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - modalRect.left,
      y: e.clientY - modalRect.top,
    });
    // Indique la modal bouge
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    // Condition : si la modale bouge
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    // Retour a false (la modal ne bouge plus : mouse up )
    setIsDragging(false);
  };
  /************************* Ecouteur d'évenemnt (mousemove,mouseup)********************************************/
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

  if (!props.isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div
        className="modal-content"
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
            Copier/Coller votre code à sauvegarder
            <textarea className="code-aera" />
          </label>
          <button className="button-create" type="submit">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
