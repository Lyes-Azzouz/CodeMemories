// Style
import "./title.scss";

// Affiche le titre du container "Container.jsx"
/**
 * @param {String} Title
 * @returns
 */
export function Title({ title }) {
  return (
    <>
      <h1 className="title">{title}</h1>
    </>
  );
}
