import { useState } from "react";
import "./notes-array__style.scss";
export function NotesArray() {
  const [notes, setNotes] = useState(["je test"]);

  return (
    <div className="array-area">
      <div className="array_one">
        <table>
          <thead>
            <tr>
              <th>
                Notes par <strong>cartes</strong>
              </th>
            </tr>
          </thead>
          /** Test données fictives **/
          <tbody>
            {notes.map((note, index) => (
              <tr key={index}>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="array_two">
        <table>
          <thead>
            <tr>
              <th>
                Notes par <strong>ressources</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={index}>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="array_three">
        <table>
          <thead>
            <tr>
              <th>
                Notes <strong>diverses</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr key={index}>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
                <td>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
    </div>
  );
}
