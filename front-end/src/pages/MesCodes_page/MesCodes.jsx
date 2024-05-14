// Style
import "./mes-codes__style.scss";
// Components
import { Container } from "../../components/Pages_components/MesCodes_components/Container";

// Affiche la Page "Mes Codes" (page qui doit apparaitre quand on séléctionne l'onglet mes codes dans la barre latérale)
export function MesCodes() {
  return (
    <div className="mes_codes_page__container">
      <Container />
    </div>
  );
}
