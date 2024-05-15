// Style
import "./modal__style.scss";
// React icons
import { IoCloseSharp } from "react-icons/io5";

// Création du composant modal
export function Modal(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // onSubmit();
  };

  if (!props.isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={props.onClose}>
          <IoCloseSharp />
        </span>
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
            <input type="placeholder" className="code-ph" />
          </label>
          <button type="submit">Créer</button>
        </form>
      </div>
    </div>
  );
}
