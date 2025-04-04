import React, { useState } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import talents from "../data/talents.json";
import "../styles/Talents.css";

function Talents() {
  const talentsHeaders = ["Name", "Requirement", "Description", "Source"];

  // État pour la recherche
  const [query, setQuery] = useState("");

  // Filtrage des équipements
  const filteredTalents = talents.filter((talent) =>
    talentsHeaders.some((header) =>
      talent[header]?.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div className="talents-page">
      <h2>Talents</h2>
      <div className="talents-info">
        <p>
          Each new Talent costs <strong>100 XP</strong>.
        </p>
      </div>
      <SearchBar
        placeholder="Search talents..."
        onSearch={(searchQuery) => setQuery(searchQuery)}
      />
      <Table headers={talentsHeaders} data={filteredTalents} />
    </div>
  );
}

export default Talents;
