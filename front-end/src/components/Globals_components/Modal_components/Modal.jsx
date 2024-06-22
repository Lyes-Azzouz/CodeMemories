import "./modal__style.scss";
import { useState, useRef, useEffect } from "react";
import { IoCloseSharp, IoAddOutline } from "react-icons/io5";
import { GiMove } from "react-icons/gi";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";

export function Modal({
  isOpen,
  title,
  onTitleChange,
  onClose,
  onAddCard,
  showImageInput,
  textAreaValue,
  onTextAreaChange,
  technos,
  onTechnosChange,
  imageFile,
  onImageFileChange,
  containerType,
  subtitles,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardId = uuidv4();
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
      // Changement d'URL pour chaque container différent.
      let url = "";
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
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
        onClose();
      } else {
        console.error("Error sending data");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleMouseDown = (e) => {
    const modalRect = modalRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - modalRect.left, y: e.clientY - modalRect.top });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
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

  if (!isOpen) return null;

  const addNewTextArea = () => {
    setTextAreas([
      ...textAreas,
      { id: uuidv4(), language: "", value: "", subtitle: "" },
    ]);
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

  const handleSubtitleChange = (id, subtitle) => {
    setTextAreas((prev) =>
      prev.map((textArea) =>
        textArea.id === id ? { ...textArea, subtitle } : textArea
      )
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
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

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-top-content">
            <input
              type="text"
              value={title}
              onChange={onTitleChange}
              placeholder="Titre de la carte"
              className="modal-title"
            />

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

          {textAreas.map((textArea) => (
            <div key={textArea.id} className="modal-textarea-container">
              <button
                type="button"
                onClick={() => removeTextArea(textArea.id)}
                className="remove-textarea"
              >
                <IoCloseSharp />
              </button>
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
              <textarea
                value={textArea.value}
                onChange={(e) =>
                  handleTextAreaChange(textArea.id, e.target.value)
                }
                placeholder="Ajouter le code à sauvegarder ici"
                className="modal-text-area"
              ></textarea>
            </div>
          ))}

          <button
            type="button"
            onClick={addNewTextArea}
            className="add-textarea"
          >
            <IoAddOutline />
          </button>

          <button type="submit" className="modal-submit">
            Ajouter la carte
          </button>
        </form>
      </div>
    </div>
  );
}
