import { useState } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import augmetics from "../data/augmetics.json";
import "../styles/Augmetics.css";

function Augmetics() {
  const augmeticsHeaders = ["Name", "Cost", "Availability", "Effect", "Source"];

  // État pour la recherche
  const [query, setQuery] = useState("");

  // Filtrage des équipements
  const filteredAugmetics = augmetics.filter((item) =>
    augmeticsHeaders.some((header) =>
      item[header]?.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div className="augmetics-page">
      <h2>Augmetics</h2>
      <div className="talents-info">
        <p>
          Augmetics are usually installed via <strong>Medical Services</strong>,
          adding to the cost.
        </p>
      </div>
      <SearchBar
        placeholder="Search augmetics..."
        onSearch={(searchQuery) => setQuery(searchQuery)}
      />
      <h3>Strength in Steel</h3>
      <Table headers={augmeticsHeaders} data={filteredAugmetics} />
    </div>
  );
}

export default Augmetics;
