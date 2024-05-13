//Hooks
import { useState } from "react";
//Style
import "./App.scss";
// Components
import { Logo } from "./components/NavBar_components/logo/Logo.jsx";
import { SearchBar } from "./components/NavBar_components/search_bar/SearchBar.jsx";
import { PanelProfil } from "./components/NavBar_components/panel_profil/PanelProfil.jsx";
import { Tabs } from "./components/SideBar_components/Tabs/Tabs.jsx";
import { Login } from "./components/SideBar_components/login/Login.jsx";
// React icons
import { IoIosCodeWorking } from "react-icons/io";
import { SlNote } from "react-icons/sl";
import { GrResources } from "react-icons/gr";

// Application :
function App() {
  return (
    <>
      <NavBar />
      <SideBar />
    </>
  );
}

// Parent component : Navbar
// Affiche la barre de navigation de l'application
function NavBar() {
  return (
    <div className="nav-bar">
      <Logo />
      <SearchBar />
      <PanelProfil />
    </div>
  );
}

// Parent component : SideBar
// Affiche la barre latérale gauche de l'application
function SideBar() {
  // État pour suivre l'onglet actuellement actif
  const [tabIsActive, setTabIsActive] = useState("");
  // Fonction pour gérer le clic sur un onglet
  const handleClickTab = (tabName) => {
    // Passe la nom de l'onglet (par exemple : Mes Codes) à la variable d'état "tabIsActive"
    setTabIsActive(tabName);
  };

  return (
    <div className="side-bar">
      <Tabs
        textContent="Mes codes"
        icon={<IoIosCodeWorking />}
        isActive={tabIsActive === "Mes codes"}
        onActive={() => handleClickTab("Mes codes")}
      />
      <Tabs
        textContent="Mes notes"
        icon={<SlNote />}
        isActive={tabIsActive === "Mes notes"}
        onActive={() => handleClickTab("Mes notes")}
      />
      <Tabs
        textContent="Ressources"
        icon={<GrResources />}
        isActive={tabIsActive === "Ressources"}
        onActive={() => handleClickTab("Ressources")}
      />
      <div className="line"></div>
      <Login />
    </div>
  );
}

export default App;
