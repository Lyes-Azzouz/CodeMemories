import "./tabs_style.scss";

// Onglets de navigation dans la barre latérale
/**
 * @param {String} textContent // Le texte à afficher en bas de l'icône.
 * @param {ReactIcon} Icon // L'icône de chaque onglet.
 * @param {Boolean} IsActive // Compare le nom de l'onglet avec la valeur de l'état.
 * @param {Function} onActive // La fonction à appeler lors de l'événement click.
 * @returns {JSX.Element}
 */
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
