import { FaFileCode } from "react-icons/fa";
import "./logo__style.scss";

//Affiche le logo de la navbar "Devs Memorise"
export function Logo() {
  return (
    <div className="logo-container">
      <span className="logo">
        <FaFileCode />
      </span>
      <span className="name">Devs Memories</span>
    </div>
  );
}
