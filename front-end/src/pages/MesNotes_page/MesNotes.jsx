// Style
import "./mes_notes__style.scss";
// Components
import ContainerNotes from "../../components/Pages_components/MesNotes_components/ContainerNotes";
// Affiche la Page "Mes Notes" (page qui doit apparaitre quand on séléctionne l'onglet "mes notes" dans la barre latérale)
export function MesNotes() {
  return (
    <div className="page_notes_container">
      <ContainerNotes />
    </div>
  );
}
