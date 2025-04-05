import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="navbar-logo">⚙</span> Imperium Maledictum
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/augmetics">
                Augmetics
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/talents">
                Character
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Combat">
                Combat
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/equipment">
                Equipment
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/protection">
                Protection
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/psy">
                Psykers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/weapons">
                Weapons
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/criticalwounds">
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
