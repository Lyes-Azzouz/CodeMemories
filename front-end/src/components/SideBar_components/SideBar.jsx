// React icons
import { IoIosCodeWorking } from "react-icons/io";
import { SlNote } from "react-icons/sl";
import { GrResources } from "react-icons/gr";
// Components
import { Tabs } from "./Tabs/Tabs.jsx";
import { Login } from "./login/Login.jsx";
// Hooks
import { useState } from "react";
// Style
import "./sidebar.scss";
// Parent component : SideBar
export function SideBar() {
  const [tabIsActive, setTabIsActive] = useState("");

  const handleClickTab = (tabName) => {
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
