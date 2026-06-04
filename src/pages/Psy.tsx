import { useState } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import psyPowers from "../data/psyPowers.json";
import psychicPhenomena from "../data/psychicPhenomena.json";
import perilsOfTheWarp from "../data/perilsOfTheWarp.json";
import psyDetailProfilesRaw from "../data/psyDetailProfiles.json";
import type { DetailProfile } from "../components/DetailProfileRenderer";
const psyDetailProfiles = psyDetailProfilesRaw as DetailProfile[];
import "../styles/Psy.css";
import { useProfileLinks } from "../hooks/useProfileLinks";

function Psy() {
  const psyPowersHeaders = [
    "Name",
    "Warp Rating",
    "Difficulty",
    "Range",
    "Target",
    "Duration",
    "Effect",
    "Discipline",
    "Source",
  ];
  const psychicPhenomenaHeaders = ["1d100", "Phenomenon", "Lingering"];
  const perilsOfTheWarpHeaders = ["1d100", "Corruption", "Peril"];

  // État pour la recherche
  const [query, setQuery] = useState("");

  // Hook utilitaire — détecte les références à des profils dans le champ Effect
  // et les enveloppe automatiquement dans des <Tooltip>
  const renderProfileLinks = useProfileLinks(psyDetailProfiles);

  // Filtrage
  const filteredPsyPowers = psyPowers
    .filter((power) =>
      psyPowersHeaders.some((header) =>
        power[header as keyof typeof power]
          ?.toString()
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    )
    .map((power) => ({
      ...power,
      Effect: renderProfileLinks(power.Effect),
    }));

  // Filtrage des phénomènes psychiques
  const filteredPsychicPhenomena = psychicPhenomena.filter((phenomenon) =>
    psychicPhenomenaHeaders.some((header) =>
      phenomenon[header as keyof typeof phenomenon]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase()),
    ),
  );

  // Filtrage des périls du Warp
  const filteredPerilsOfTheWarp = perilsOfTheWarp.filter((peril) =>
    perilsOfTheWarpHeaders.some((header) =>
      peril[header as keyof typeof peril]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase()),
    ),
  );

  return (
    <div className="psy-page">
      <h2>Psykers</h2>
      <div className="psy-info">
        <p>
          Each new Psychic Power costs <strong>100 XP</strong>. Minor Psychic
          Powers costs <strong>60 XP</strong>. <br /> Powers noted with an {"*"}{" "}
          are <strong>Overt</strong>.
        </p>
      </div>
      <SearchBar
        placeholder="Search the warp..."
        onSearch={(searchQuery) => setQuery(searchQuery)}
      />
      <h3>Psychic Powers</h3>
      <Table
        headers={psyPowersHeaders}
        data={filteredPsyPowers}
        defaultSort={{ key: "Discipline", direction: "asc" }}
      />
      <h3>Psychic Phenomena</h3>
      <Table
        headers={psychicPhenomenaHeaders}
        data={filteredPsychicPhenomena}
        disableSorting={true}
        defaultSort="unsorted"
      />
      <h3>Perils of the Warp</h3>
      <Table
        headers={perilsOfTheWarpHeaders}
        data={filteredPerilsOfTheWarp}
        disableSorting={true}
        defaultSort="unsorted"
      />
    </div>
  );
}

export default Psy;
