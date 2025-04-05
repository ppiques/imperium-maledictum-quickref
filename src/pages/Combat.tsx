import { useState } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import combatActions from "../data/combatActions.json";
import traits from "../data/traits.json";
import conditions from "../data/conditions.json";
import environmentalTraits from "../data/environmentalTraits.json";
import hitLocations from "../data/hitLocations.json";
import fumbles from "../data/fumbles.json";
import "../styles/Combat.css";

function Combat() {
  const traitsArray = Object.entries(traits).map(([name, description]) => ({
    Name: name,
    Description: description,
  }));
  const conditionsArray = Object.entries(conditions).map(
    ([name, description]) => ({
      Name: name,
      Description: description,
    })
  );

  // Définir les en-têtes du tableau
  const combatActionsHeaders = ["Name", "Description"];
  const traitsHeaders = ["Name", "Description"];
  const conditionsHeaders = ["Name", "Description"];
  const environmentalTraitsHeaders = ["Name", "Description"];
  const hitLocationsHeaders = ["Units Result", "Location"];
  const fumblesHeaders = ["Roll", "Result"];

  // État pour la recherche
  const [query, setQuery] = useState("");

  // Filtrer les traits en fonction de la recherche
  const filteredCombatActions = combatActions.filter((combatActions) =>
    combatActionsHeaders.some((header) =>
      combatActions[header as keyof typeof combatActions]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  const filteredEnvironmentalTraits = environmentalTraits.filter(
    (environmentalTraits) =>
      combatActionsHeaders.some((header) =>
        environmentalTraits[header as keyof typeof environmentalTraits]
          ?.toString()
          .toLowerCase()
          .includes(query.toLowerCase())
      )
  );

  const filteredTraits = traitsArray.filter((traits) =>
    traitsHeaders.some((header) =>
      traits[header as keyof typeof traits]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  const filteredConditions = conditionsArray.filter((conditions) =>
    traitsHeaders.some((header) =>
      conditions[header as keyof typeof conditions]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  const filteredHitLocations = hitLocations.filter((hitLocations) =>
    hitLocationsHeaders.some((header) =>
      hitLocations[header as keyof typeof hitLocations]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  const filteredFumbles = fumbles.filter((fumbles) =>
    fumblesHeaders.some((header) =>
      fumbles[header as keyof typeof fumbles]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  return (
    <div className="combat-page">
      <h2>Combat</h2>
      <div className="talents-info">
        <p>
          On your turn, your character can <strong>Move</strong> and take an{" "}
          <strong>Action</strong>.
        </p>
      </div>
      <SearchBar
        placeholder="Search feature..."
        onSearch={(searchQuery) => setQuery(searchQuery)}
      />
      <h3>Combat Actions</h3>
      <Table headers={combatActionsHeaders} data={filteredCombatActions} />
      <h3>Traits</h3>
      <Table headers={traitsHeaders} data={filteredTraits} />
      <h3>Conditions</h3>
      <Table headers={conditionsHeaders} data={filteredConditions} />
      <h3>Environmental Traits</h3>
      <Table
        headers={environmentalTraitsHeaders}
        data={filteredEnvironmentalTraits}
      />
      <h3>Hit Locations</h3>
      <Table
        headers={hitLocationsHeaders}
        data={filteredHitLocations}
        disableSorting={true}
        defaultSort="unsorted"
      />
      <h3>Fumbles</h3>
      <Table
        headers={fumblesHeaders}
        data={filteredFumbles}
        disableSorting={true}
        defaultSort="unsorted"
      />
    </div>
  );
}

export default Combat;
