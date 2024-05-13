// Import modules react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Style
import "../src/App.scss";
// Pages
import { Home } from "./pages/Home/Home.jsx";

// Application
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
