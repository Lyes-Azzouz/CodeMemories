// Components
import { Logo } from "./logo/Logo.jsx";
import { SearchBar } from "./search_bar/SearchBar.jsx";
import { PanelProfil } from "./panel_profil/PanelProfil.jsx";
// Style
import "./navbar.scss";
// Parent component : Navbar
// Affiche la barre de navigation de l'application.
export function NavBar() {
  return (
    <div className="nav-bar">
      <Logo />
      <SearchBar />
      <PanelProfil />
    </div>
  );
}
