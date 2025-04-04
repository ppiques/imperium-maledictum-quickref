import React, { useState } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import cityHiveTravel from "../data/CityHiveTravel.json";
import planetaryTravel from "../data/planetaryTravel.json";
import systemTravel from "../data/systemTravel.json";
import interstellarTravel from "../data/interstellarTravel.json";
import "../styles/Services.css";

function Services() {
  const cityHiveTravelHeaders = ["Quality", "Cost", "Examples", "Source"];
  const planetaryTravelHeaders = ["Quality", "Cost", "Examples", "Source"];
  const systemTravelHeaders = ["Quality", "Cost", "Examples", "Source"];
  const interstellarTravelHeaders = ["Quality", "Cost", "Examples", "Source"];

  // État pour la recherche
  const [query, setQuery] = useState("");

  // Filtrage des équipements
  const filteredCityHiveTravel = cityHiveTravel.filter((item) =>
    cityHiveTravelHeaders.some((header) =>
      item[header]?.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  const filteredPlanetaryTravel = planetaryTravel.filter((item) =>
    planetaryTravelHeaders.some((header) =>
      item[header]?.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  const filteredSystemTravel = systemTravel.filter((item) =>
    systemTravelHeaders.some((header) =>
      item[header]?.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  const filteredInterstellarTravel = interstellarTravel.filter((item) =>
    interstellarTravelHeaders.some((header) =>
      item[header]?.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div className="services-page">
      <h2>Services</h2>
      <div className="talents-info">
        <p>
          Availability of <strong>Services</strong> depends on location.
        </p>
      </div>
      <SearchBar
        placeholder="Search services..."
        onSearch={(searchQuery) => setQuery(searchQuery)}
      />
      <h3>City/Hive Travel</h3>
      <Table
        headers={cityHiveTravelHeaders}
        data={filteredCityHiveTravel}
        disableSorting={true}
        defaultSort={null}
      />
      <h3>Planetary Travel</h3>
      <Table
        headers={planetaryTravelHeaders}
        data={filteredPlanetaryTravel}
        disableSorting={true}
        defaultSort={null}
      />
      <h3>System Travel</h3>
      <Table
        headers={systemTravelHeaders}
        data={filteredSystemTravel}
        disableSorting={true}
        defaultSort={null}
      />
      <h3>Interstellar Travel</h3>
      <Table
        headers={interstellarTravelHeaders}
        data={filteredInterstellarTravel}
        disableSorting={true}
        defaultSort={null}
      />
    </div>
  );
}

export default Services;
