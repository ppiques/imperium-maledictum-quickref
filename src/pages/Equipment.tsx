import { useState, useMemo } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import { useProfileLinks } from "../hooks/useProfileLinks";
import clothingAndPersonalGear from "../data/clothingAndPersonalGear.json";
import tools from "../data/tools.json";
import medicaeEquipment from "../data/medicaeEquipement.json";
import toolDetailProfilesRaw from "../data/toolDetailProfiles.json";
import type { DetailProfile } from "../components/DetailProfileRenderer";
const toolDetailProfiles = toolDetailProfilesRaw as DetailProfile[];
import "../styles/Equipment.css";

function Equipment() {
  const clothingAndPersonalGearHeaders = [
    "Name",
    "Cost",
    "Availability",
    "Encumbrance",
    "Effect",
    "Source",
  ];

  const toolsHeaders = [
    "Name",
    "Cost",
    "Availability",
    "Encumbrance",
    "Effect",
    "Source",
  ];

  const medicaeEquipmentHeaders = [
    "Name",
    "Cost",
    "Availability",
    "Encumbrance",
    "Effect",
    "Source",
  ];

  // État pour la recherche
  const [query, setQuery] = useState("");

  // Filtrage des équipements
  const filteredClothingAndPersonalGear = clothingAndPersonalGear.filter(
    (item) =>
      clothingAndPersonalGearHeaders.some((header) =>
        item[header as keyof typeof item]
          ?.toString()
          .toLowerCase()
          .includes(query.toLowerCase())
      )
  );

  const renderProfileLinks = useProfileLinks(toolDetailProfiles);

  const filteredTools = useMemo(() => {
    return tools
      .filter((item) =>
        toolsHeaders.some((header) =>
          item[header as keyof typeof item]
            ?.toString()
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      )
      .map((t) => ({ ...t, Effect: renderProfileLinks(t.Effect) }));
  }, [tools, query, renderProfileLinks]);

  const filteredMedicaeEquipment = medicaeEquipment.filter((item) =>
    medicaeEquipmentHeaders.some((header) =>
      item[header as keyof typeof item]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  return (
    <div className="equipment-page">
      <h2>Equipment</h2>
      <SearchBar
        placeholder="Search equipment..."
        onSearch={(searchQuery) => setQuery(searchQuery)}
      />
      <h3>Clothing and Personal Gear</h3>
      <Table
        headers={clothingAndPersonalGearHeaders}
        data={filteredClothingAndPersonalGear}
      />
      <h3>Tools</h3>
      <Table headers={toolsHeaders} data={filteredTools} />
      <h3>Medicae Equipment</h3>
      <Table
        headers={medicaeEquipmentHeaders}
        data={filteredMedicaeEquipment}
      />
    </div>
  );
}

export default Equipment;
