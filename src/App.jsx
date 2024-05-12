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
  return (
    <div className="side-bar">
      <Tabs textContent="Mes codes" icon={<IoIosCodeWorking />} />
      <Tabs textContent="Mes notes" icon={<SlNote />} />
      <Tabs textContent="Ressources" icon={<GrResources />} />
      <div className="line"></div>
      <Login />
    </div>
  );
}

export default App;
