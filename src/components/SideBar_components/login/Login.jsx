import "./login.scss";
import { CiLogin } from "react-icons/ci";

// Affiche le bouton de connexion à l'application
export function Login() {
  <div className="login-container">
    <span className="login-icon">
      <CiLogin />
    </span>
    <span className="login-text">Se connecter</span>
  </div>;
}