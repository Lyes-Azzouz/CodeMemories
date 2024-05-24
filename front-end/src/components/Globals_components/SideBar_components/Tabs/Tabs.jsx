// Style
import "./tabs__style.scss";

// Onglets de navigation dans la barre latérale
/**
 * @param {String} textContent // Le texte à afficher en bas de l'icône.
 * @param {ReactIcon} icon // L'icône de chaque onglet.
 * @param {Boolean} isActive // Si isActive est vrai alors ajoute la class active
 * @param {Function} onActive // La fonction à appeler lors de l'événement click.
 * @returns {JSX.Element}
 */

// Affiche les onglets de navigation dans la Side Bar
export function Tabs({ textContent, icon, isActive, onActive }) {
  return (
    <div
      className={`tabs-container ${isActive ? "active" : ""}`}
      onClick={onActive}
    >
      <div className="tabs-background"></div>
      <span className="icon">{icon}</span>
      <span className="name">{textContent}</span>
    </div>
  );
}
