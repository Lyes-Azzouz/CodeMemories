import "./panel_profil_style.scss";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";

// Affiche le panneau de la navbar qui contient le bouton de notification ainsi que le profil
// Le bouton "edit_profil" permet de modifier le profil de l'utilisateur
export function PanelProfil() {
  return (
    <div className="panel_profil_container">
      <div className="panel_notification">
        <IoMdNotificationsOutline />
      </div>
      <div className="panel_profil">
        <div className="image_profil">
          <CgProfile className="image" />
        </div>
        <div className="profil">
          <div className="name_profil">John Doe </div>
          <button className="edit_profil">Modifier</button>
        </div>
      </div>
    </div>
  );
}
