import { useState } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import criticalWounds from "../data/criticalWounds.json";
import injuries from "../data/injuries.json";
import "../styles/CriticalWounds.css";

type CriticalWound = {
  Roll: string;
  Description: string;
  Effect: string;
  Treatment: string;
};

type Injury = {
  Location: string;
  Minor: string;
  Major: string;
};

function CriticalWounds() {
  const criticalWoundsHeaders = ["Roll", "Description", "Effect", "Treatment"];
  const injuriesHeaders = ["Location", "Minor", "Major"];

  // État pour la recherche
  const [query, setQuery] = useState("");

  // Filtrage des données pour chaque partie du corps
  const filterData = (data: CriticalWound[]) =>
    data.filter((item: CriticalWound) =>
      criticalWoundsHeaders.some((header) =>
        item[header as keyof CriticalWound]
          ?.toString()
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    );

  const filteredInjuries = injuries.filter((injuries) =>
    injuriesHeaders.some((header) =>
      injuries[header as keyof typeof injuries]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  const headWounds = filterData(criticalWounds?.CriticalWounds?.Head || []);
  const armWounds = filterData(criticalWounds?.CriticalWounds?.Arm || []);
  const bodyWounds = filterData(criticalWounds?.CriticalWounds?.Body || []);
  const legWounds = filterData(criticalWounds?.CriticalWounds?.Leg || []);

  return (
    <div className="critical-wounds-page">
      <h2>Wounds & Injuries</h2>
      <div className="talents-info">
        <p>
          When exceeding your Maximum Wounds, roll{" "}
          <strong>1d10 + the excess damage</strong> and consult the appropriate{" "}
          <strong>Critical Wound Table</strong> for the Hit Location.
        </p>
      </div>
      <SearchBar
        placeholder="Search wounds..."
        onSearch={(searchQuery) => setQuery(searchQuery)}
      />

      <h3>Head Wounds</h3>
      <Table
        headers={criticalWoundsHeaders}
        data={headWounds}
        disableSorting={true}
        defaultSort={"unsorted"}
      />

      <h3>Arm Wounds</h3>
      <Table
        headers={criticalWoundsHeaders}
        data={armWounds}
        disableSorting={true}
        defaultSort={"unsorted"}
      />

      <h3>Body Wounds</h3>
      <Table
        headers={criticalWoundsHeaders}
        data={bodyWounds}
        disableSorting={true}
        defaultSort={"unsorted"}
      />

      <h3>Leg Wounds</h3>
      <Table
        headers={criticalWoundsHeaders}
        data={legWounds}
        disableSorting={true}
        defaultSort={"unsorted"}
      />

      <h3>Injuries</h3>
      <Table headers={injuriesHeaders} data={filteredInjuries} />
    </div>
  );
}

export default CriticalWounds;
