import { useState } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import cityHiveTravel from "../data/cityHiveTravel.json";
import planetaryTravel from "../data/planetaryTravel.json";
import systemTravel from "../data/systemTravel.json";
import interstellarTravel from "../data/interstellarTravel.json";
import accomodationsServices from "../data/accomodationsServices.json";
import medicalServices from "../data/medicalServices.json";
import provisionsServices from "../data/provisionsServices.json";
import "../styles/Services.css";

function Services() {
  const cityHiveTravelHeaders = ["Quality", "Cost", "Examples", "Source"];
  const planetaryTravelHeaders = ["Quality", "Cost", "Examples", "Source"];
  const systemTravelHeaders = ["Quality", "Cost", "Examples", "Source"];
  const interstellarTravelHeaders = ["Quality", "Cost", "Examples", "Source"];
  const accomodationsServicesHeaders = [
    "Quality",
    "Cost",
    "Examples",
    "Source",
  ];
  const medicalServicesHeaders = [
    "Quality",
    "Cost",
    "Medicae",
    "Additional Resources",
    "Examples",
    "Source",
  ];
  const provionsServicesHeaders = ["Quality", "Cost", "Examples", "Source"];

  // État pour la recherche
  const [query, setQuery] = useState("");

  // Filtrage des équipements
  const filteredCityHiveTravel = cityHiveTravel.filter((item) =>
    cityHiveTravelHeaders.some((header) =>
      item[header as keyof typeof item]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  const filteredPlanetaryTravel = planetaryTravel.filter((item) =>
    planetaryTravelHeaders.some((header) =>
      item[header as keyof typeof item]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  const filteredSystemTravel = systemTravel.filter((item) =>
    systemTravelHeaders.some((header) =>
      item[header as keyof typeof item]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  const filteredInterstellarTravel = interstellarTravel.filter((item) =>
    interstellarTravelHeaders.some((header) =>
      item[header as keyof typeof item]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  const filteredAccomodationsServices = accomodationsServices.filter((item) =>
    accomodationsServicesHeaders.some((header) =>
      item[header as keyof typeof item]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  const filteredMedicalServices = medicalServices.filter((item) =>
    medicalServicesHeaders.some((header) =>
      item[header as keyof typeof item]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  const filteredProvisionsServices = provisionsServices.filter((item) =>
    provionsServicesHeaders.some((header) =>
      item[header as keyof typeof item]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
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
        defaultSort="unsorted"
      />
      <h3>Planetary Travel</h3>
      <Table
        headers={planetaryTravelHeaders}
        data={filteredPlanetaryTravel}
        disableSorting={true}
        defaultSort="unsorted"
      />
      <h3>System Travel</h3>
      <Table
        headers={systemTravelHeaders}
        data={filteredSystemTravel}
        disableSorting={true}
        defaultSort="unsorted"
      />
      <h3>Interstellar Travel</h3>
      <Table
        headers={interstellarTravelHeaders}
        data={filteredInterstellarTravel}
        disableSorting={true}
        defaultSort="unsorted"
      />
      <h3>Accomodations and Lodgings</h3>
      <Table
        headers={accomodationsServicesHeaders}
        data={filteredAccomodationsServices}
        disableSorting={true}
        defaultSort="unsorted"
      />
      <h3>Provisions and Meals</h3>
      <Table
        headers={provionsServicesHeaders}
        data={filteredProvisionsServices}
        disableSorting={true}
        defaultSort="unsorted"
      />
      <h3>Medical Care</h3>
      <Table
        headers={medicalServicesHeaders}
        data={filteredMedicalServices}
        disableSorting={true}
        defaultSort="unsorted"
      />
    </div>
  );
}

export default Services;
