// Import modules react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Style
import "../src/App.scss";
// Components
import { SideBar } from "./components/Globals_components/SideBar_components/SideBar.jsx";
import { NavBar } from "./components/Globals_components/NavBar_components/NavBar.jsx";
// Pages
import { MesCodes } from "./pages/MesCodes_page/MesCodes.jsx";
import { MesNotes } from "./pages/MesNotes_page/MesNotes.jsx";
import { Ressources } from "./pages/Ressources_page/Ressources.jsx";
// Hooks
import { useState } from "react";

// Application
function App() {
  const [tabIsActive, setTabIsActive] = useState("");

  return (
    <Router>
      <NavBar />
      <SideBar tabIsActive={tabIsActive} setTabIsActive={setTabIsActive} />
      <Routes>
        <Route path="/Mes_codes" element={<MesCodes />} />
        <Route path="/Mes_notes" element={<MesNotes />} />
        <Route path="/Ressources" element={<Ressources />} />
      </Routes>
    </Router>
  );
}

export default App;
