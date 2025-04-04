import { useState } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import rangedWeapons from "../data/rangedWeapons.json";
import meleeWeapons from "../data/meleeWeapons.json";
import customAmmunitions from "../data/customAmmunitions.json";
import explosiveWeapons from "../data/explosiveWeapons.json";
import weaponModifications from "../data/weaponModifications.json";
import "../styles/Weapons.css";

function Weapons() {
  const meleeHeaders = [
    "Name",
    "Specialisation",
    "Damage",
    "Encumbrance",
    "Cost",
    "Availability",
    "Traits",
    "Source",
  ];
  const rangedHeaders = [
    "Name",
    "Specialisation",
    "Damage",
    "Range",
    "Magazine",
    "Encumbrance",
    "Cost (Mag)",
    "Availability",
    "Traits",
    "Source",
  ];
  const ammunitionHeaders = [
    "Name",
    "Damage",
    "Cost",
    "Availability",
    "Used With",
    "Traits",
    "Source",
  ];
  const explosiveHeaders = [
    "Name",
    "Specialisation",
    "Damage",
    "Encumbrance",
    "Cost",
    "Availability",
    "Traits",
    "Source",
  ];
  const modificationHeaders = [
    "Name",
    "Cost",
    "Availability",
    "Type",
    "Used With",
    "Effects",
    "Source",
  ];
  // État pour la recherche
  const [query, setQuery] = useState("");

  // Filtrage des armes à distance
  const filteredRangedWeapons = rangedWeapons.filter((weapon) =>
    rangedHeaders.some((header) =>
      weapon[header]?.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  const filteredMeleeWeapons = meleeWeapons.filter((weapon) =>
    meleeHeaders.some((header) =>
      weapon[header]?.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  const filteredAmmunition = customAmmunitions.filter((ammo) =>
    ammunitionHeaders.some((header) =>
      ammo[header]?.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  const filteredExplosiveWeapons = explosiveWeapons.filter((weapon) =>
    explosiveHeaders.some((header) =>
      weapon[header]?.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  const filteredModifications = weaponModifications.filter((mod) =>
    modificationHeaders.some((header) =>
      mod[header]?.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div className="weapons-page">
      <h2>Weapons</h2>
      <SearchBar
        placeholder="Search weapons..."
        onSearch={(searchQuery) => setQuery(searchQuery)}
      />
      <h3>Ranged Weapons</h3>
      <Table headers={rangedHeaders} data={filteredRangedWeapons} />
      <h3>Melee Weapons</h3>
      <Table headers={meleeHeaders} data={filteredMeleeWeapons} />
      <h3>Grenades and Explosives</h3>
      <Table headers={explosiveHeaders} data={filteredExplosiveWeapons} />
      <h3>Custom Ammunition</h3>
      <Table headers={ammunitionHeaders} data={filteredAmmunition} />
      <h3>Weapon Modifications</h3>
      <Table headers={modificationHeaders} data={filteredModifications} />
    </div>
  );
}

export default Weapons;
