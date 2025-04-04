import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Weapons from "./pages/Weapons";
import Protection from "./pages/Protection";
import Equipment from "./pages/Equipment";
import Augmetics from "./pages/Augmetics";
import Services from "./pages/Services";
import Psy from "./pages/Psy";
import Combat from "./pages/Combat";
import Talents from "./pages/Talents";
import CriticalWounds from "./pages/CriticalWounds";
import Footer from "./components/Footer";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter basename="/Imperium-Maledictum-Quickref">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weapons" element={<Weapons />} />
        <Route path="/protection" element={<Protection />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/augmetics" element={<Augmetics />} />
        <Route path="/services" element={<Services />} />
        <Route path="/psy" element={<Psy />} />
        <Route path="/combat" element={<Combat />} />
        <Route path="/talents" element={<Talents />} />
        <Route path="/criticalwounds" element={<CriticalWounds />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
