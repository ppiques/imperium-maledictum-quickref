import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-info">
        <p>
          Imperium Maledictum Quickref - A quick reference guide for players and
          GMs.
        </p>
        <div className="footer-legal">
          <p>
            This project is unofficial and not affiliated with Games Workshop or
            Cubicle 7.
          </p>
        </div>
        <p>
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </p>
      </div>
      <div className="footer-social">
        <a href="mailto:apple_the_apple@proton.me">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
