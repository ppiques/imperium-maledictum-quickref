import React, { useState } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import armourData from "../data/armour.json";
import forceFields from "../data/forceFields.json";
import "../styles/Protection.css";

function Protection() {
  const armourHeaders = [
    "Name",
    "Locations",
    "Armour",
    "Encumbrance",
    "Cost",
    "Availability",
    "Traits",
    "Source",
  ];
  const forceFieldHeaders = [
    "Name",
    "Protection",
    "Overload",
    "Encumbrance",
    "Cost",
    "Availability",
    "Effect",
    "Source",
  ];

  // État pour la recherche
  const [query, setQuery] = useState("");
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleMouseEnterForceFields = (event: React.MouseEvent) => {
    const tooltipText =
      "Unless stated otherwise, a Force Field protects all locations and works against all attacks. They can be activated or deactivated as a Free Action. You can have only one field active at a time. When you would suffer Damage from an attack, roll the dice indicated for the field’s Protection value and reduce the Damage taken by that amount before applying Damage reduction from Armour. Should the incoming Damage equal or exceed the field’s Overload value, the Damage is still negated but the field collapses and is rendered non-functional until it is repaired. Unless otherwise stated, this is a Very Hard (−30) Tech Test that requires at least 8 hours of work.";
    setTooltip(tooltipText);
    setTooltipPosition({ x: event.pageX, y: event.pageY });
  };

  const handleMouseLeaveForceFields = () => {
    setTooltip(null);
    setTooltipPosition(null);
  };

  // Filtrage
  const filteredArmour = armourData.filter((armour) =>
    armourHeaders.some((header) =>
      armour[header as keyof typeof armour]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  const filteredForceFields = forceFields.filter((field) =>
    forceFieldHeaders.some((header) =>
      field[header as keyof typeof field]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  return (
    <div className="protection-page">
      <h2>Protection</h2>
      <div className="talents-info">
        <p>
          Two Armours can be worn at the same time as long as only one of them
          has the <strong>Subtle</strong> trait.
        </p>
      </div>
      <SearchBar
        placeholder="Search armour..."
        onSearch={(searchQuery) => setQuery(searchQuery)}
      />
      <h3>Armour</h3>
      <Table headers={armourHeaders} data={filteredArmour} />
      <h3
        onMouseEnter={handleMouseEnterForceFields}
        onMouseLeave={handleMouseLeaveForceFields}
      >
        Force Fields
      </h3>
      <Table headers={forceFieldHeaders} data={filteredForceFields} />
      {tooltip && tooltipPosition && (
        <div
          className="tooltip"
          style={{
            top: tooltipPosition.y + 10,
            left: tooltipPosition.x + 10,
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}

export default Protection;
