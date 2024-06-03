// React icons
import { IoIosCodeWorking } from "react-icons/io";
import { SlNote } from "react-icons/sl";
import { GrResources } from "react-icons/gr";
// Components
import { Tabs } from "./Tabs/Tabs.jsx";
import { Login } from "./login/Login.jsx";
// Hooks
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Style
import "./sidebar.scss";
// Parent component : SideBar
/**
 *
 * @param {String} tabIsActive // Etat initialisé en string vide pour vérifer les Tabs correspondante (Mes codes etc...)
 * @returns {JSX.Element}
 */

export function SideBar({ tabIsActive, setTabIsActive }) {
  useEffect(() => {
    if (location.pathname === "/") {
      setTabIsActive("Mes codes");
    }
  }, [location, setTabIsActive]);

  const handleClickTab = (tabName) => {
    setTabIsActive(tabName);
  };

  return (
    <div className="side-bar">
      <Link to="Mes_codes" onClick={() => setTabIsActive("Mes codes")}>
        <Tabs
          textContent="Collection"
          icon={<IoIosCodeWorking />}
          isActive={tabIsActive === "Mes codes"}
          onActive={() => handleClickTab("Mes codes")}
        />
      </Link>

      <Link to="Mes_notes" onClick={() => setTabIsActive("Mes notes")}>
        <Tabs
          textContent="Notes"
          icon={<SlNote />}
          isActive={tabIsActive === "Mes notes"}
          onActive={() => handleClickTab("Mes notes")}
        />
      </Link>
      <Link to="Ressources" onClick={() => setTabIsActive("Ressources")}>
        <Tabs
          textContent="Ressources"
          icon={<GrResources />}
          isActive={tabIsActive === "Ressources"}
          onActive={() => handleClickTab("Ressources")}
        />
      </Link>

      <div className="line"></div>
      <Login />
    </div>
  );
}
