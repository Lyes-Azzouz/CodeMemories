// React icons
import { IoIosCodeWorking } from "react-icons/io";
import { SlNote } from "react-icons/sl";
import { GrResources } from "react-icons/gr";
// Components
import { Tabs } from "./Tabs/Tabs.jsx";
import { Login } from "./login/Login.jsx";
// Hooks
import { useState } from "react";
import { Link } from "react-router-dom";
// Style
import "./sidebar.scss";
// Parent component : SideBar
export function SideBar({ tabIsActive, setTabIsActive }) {
  const handleClickTab = (tabName) => {
    setTabIsActive(tabName);
  };

  return (
    <div className="side-bar">
      <Link to="Mes_codes" onClick={() => setTabIsActive("Mes codes")}>
        <Tabs
          textContent="Mes codes"
          icon={<IoIosCodeWorking />}
          isActive={tabIsActive === "Mes codes"}
          onActive={() => handleClickTab("Mes codes")}
        />
      </Link>

      <Link to="Mes_notes" onClick={() => setTabIsActive("Mes notes")}>
        <Tabs
          textContent="Mes notes"
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
