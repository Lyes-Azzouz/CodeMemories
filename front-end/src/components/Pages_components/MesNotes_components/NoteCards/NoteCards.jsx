import React from "react";
import PropTypes from "prop-types";
// Style
import "./notes-array__style.scss";

/**
 * Composant NotesCard
 * @param {Object} props - Les propriétés passées au composant.
 * @param {string} props.title - Le titre de la carte.
 * @param {Array} props.textAreas - Les zones de texte de la carte.
 * @param {Array} props.subtitles - Les sous-titres des zones de texte.
 * @returns {JSX.Element} Le composant NotesCard.
 */
function NotesCard({ title, textAreas, subtitles }) {
  return (
    <div className="notes-card">
      <h3>{title}</h3>
      {textAreas.map((text, index) => (
        <div key={index} className="notes-card-textarea">
          <h4>{subtitles[index]}</h4>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}

NotesCard.propTypes = {
  title: PropTypes.string.isRequired,
  textAreas: PropTypes.arrayOf(PropTypes.string).isRequired,
  subtitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NotesCard;
