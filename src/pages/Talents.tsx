import { useState } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import talents from "../data/talents.json";
import skills from "../data/skills.json";
import "../styles/Talents.css";

function Talents() {
  const talentsHeaders = ["Name", "Requirement", "Description", "Source"];
  const skillsHeaders = ["Skill", "Characteristic", "Specialisations"];
  // État pour la recherche
  const [query, setQuery] = useState("");

  const filteredTalents = talents.filter((talent) =>
    talentsHeaders.some((header) =>
      talent[header as keyof typeof talent]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  const filteredSkills = skills.filter((skill) =>
    skillsHeaders.some((header) =>
      skill[header as keyof typeof skill]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  return (
    <div className="talents-page">
      <h2>Character</h2>
      <div className="talents-info">
        <p>
          Each new Talent costs <strong>100 XP</strong>.
        </p>
      </div>
      <SearchBar
        placeholder="Search talents & skills..."
        onSearch={(searchQuery) => setQuery(searchQuery)}
      />
      <h3>Talents</h3>
      <Table headers={talentsHeaders} data={filteredTalents} />
      <h3>Skills</h3>
      <Table headers={skillsHeaders} data={filteredSkills} />
    </div>
  );
}

export default Talents;
