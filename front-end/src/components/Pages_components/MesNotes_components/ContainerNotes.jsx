import { NewItemButton } from "../MesCodes_components/NewItem_button_components/NewItemButton";
import { FilterBar } from "../../Globals_components/FilterBar_components/FilterBar";
import { Modal } from "../../Globals_components/Modal_components/Modal";
import { useContext } from "react";
import { ModalContext } from "../../../context/ModalContext";
import { NotesArray } from "./notes_array/NotesArray";
import "./container._mesnotes.scss";
export function ContainerNotes() {
  const { isModalOpen, closeModal } = useContext(ModalContext);

  return (
    <div className="container-notes">
      <div className="title-notes">
        <h1>Mes notes</h1>
      </div>
      <div className="right-content_notes">
        <NewItemButton />
        <FilterBar />
      </div>
      <div className="notes-array">
        <NotesArray />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title=""
        onTitleChange={() => {}}
        technos={[]}
        onTechnosChange={() => {}}
        imageFile={null}
        onImageFileChange={() => {}}
        imageUrl=""
        onImageUrlChange={() => {}}
        showImageInput={true}
        showLangageInput={true}
        onAddCard={() => {}}
        textAreaValue={[]}
        onTextAreaChange={() => {}}
      />
    </div>
  );
}
