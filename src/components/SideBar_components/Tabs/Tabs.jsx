import "./tabs_style.scss";

// Onglets de navigation dans la barre latéralle
/**
 *
 * @param {String} textContent // props
 * @param {ReactIcon} ReactIcon // props
 * @returns {JSX.Element}
 */
export function Tabs({ textContent, icon }) {
  return (
    <div className="tabs-container">
      <span className="icon">{icon}</span>
      <span className="name">{textContent}</span>
    </div>
  );
}
