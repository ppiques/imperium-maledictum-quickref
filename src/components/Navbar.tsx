import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
          <span className="navbar-logo">⚙</span> Imperium Maledictum
        </Link>
        <button
          className="navbar-toggler"
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
        <div
          className={`collapse navbar-collapse ${isOpen ? "active" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/augmetics"
                onClick={handleLinkClick}
              >
                Augmetics
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/talents"
                onClick={handleLinkClick}
              >
                Character
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/combat" onClick={handleLinkClick}>
                Combat
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/equipment"
                onClick={handleLinkClick}
              >
                Equipment
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/protection"
                onClick={handleLinkClick}
              >
                Protection
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/psy" onClick={handleLinkClick}>
                Psykers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/services"
                onClick={handleLinkClick}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/weapons"
                onClick={handleLinkClick}
              >
                Weapons
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/criticalwounds"
                onClick={handleLinkClick}
              >
                Wounds & Injuries
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
