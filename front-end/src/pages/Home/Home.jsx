// Style
import "./home__style.scss";
// Components
import { NavBar } from "../../components/NavBar_components/NavBar";
import { SideBar } from "../../components/SideBar_components/SideBar";

// Page Home
export function Home() {
  return (
    <div className="home_page">
      <NavBar />
      <SideBar />
    </div>
  );
}
