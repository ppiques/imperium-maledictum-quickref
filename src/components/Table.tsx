import React, { useState } from "react";
import traitsDescriptions from "../data/traits.json";
import conditionsDescriptions from "../data/conditions.json";
import "./Table.css";

interface TableProps {
  headers: string[];
  data: { [key: string]: string | number | null | React.ReactNode }[];
  disableSorting?: boolean;
  defaultSort?: { key: string; direction: "asc" | "desc" } | "unsorted";
}
// Fonction pour normaliser les noms des traits
const normalizeTraitName = (trait: string): string => {
  return trait.replace(/\s*\(.*?\)/, "").trim(); // Supprime tout ce qui est entre parenthèses
};

// Helper function to parse requirement strings for logical sorting
const parseRequirement = (
  requirement: string
): { priority: number; value: number } => {
  if (requirement === "-") {
    return { priority: 0, value: 0 }; // No requirement always easiest
  }

  // Extract characteristic requirement (e.g., "Agility 45")
  const charMatch = requirement.match(/([A-Z]\w+)\s(\d+)/);
  const charValue = charMatch ? parseInt(charMatch[2]) : 0;

  // Extract advance requirement (e.g., "2 Advances", "3 Advances")
  const advanceMatch = requirement.match(/(\d+)\s+Advance/);
  const advanceCount = advanceMatch ? parseInt(advanceMatch[1]) : 0;

  // Determine priority: advances only easiest, characteristics harder, then special
  if (advanceCount > 0 && charValue === 0) {
    return { priority: 1, value: advanceCount }; // Priority 1: advances only
  } else if (charValue > 0) {
    return { priority: 2, value: charValue * 100 + advanceCount }; // Priority 2: characteristics (with possible advances)
  } else {
    return { priority: 3, value: 0 }; // Priority 3: special requirements
  }
};

const Table: React.FC<TableProps> = ({
  headers,
  data,
  disableSorting = false,
  defaultSort = { key: headers[0], direction: "asc" }, // Tri par défaut sur la première colonne
}) => {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Initialisation du tri avec la valeur par défaut
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(defaultSort === "unsorted" ? null : defaultSort);

  // Ordre personnalisé pour la colonne "Availability"
  const availabilityOrder = ["common", "scarce", "rare", "exotic"];
  const difficultyOrder = [
    "Easy (+40)",
    "Average (+20)",
    "Routine (+20)",
    "Challenging (+0)",
    "Difficult (-10)",
    "Hard (-20)",
    "Very Hard (-30)",
  ];

  const handleMouseEnter = (trait: string, event: React.MouseEvent) => {
    const conditionMatch = trait.match(/\((.*?)\)/); // Extrait le texte entre parenthèses
    const normalizedTrait = normalizeTraitName(trait);

    if (
      traitsDescriptions[normalizedTrait as keyof typeof traitsDescriptions]
    ) {
      let tooltipText =
        traitsDescriptions[normalizedTrait as keyof typeof traitsDescriptions];

      // Ajoute la description de la condition si elle existe
      if (normalizedTrait === "Inflict" && conditionMatch) {
        const conditionName = conditionMatch[1]; // Nom de la condition
        const conditionDescription =
          conditionsDescriptions[
            conditionName as keyof typeof conditionsDescriptions
          ];

        if (conditionDescription) {
          tooltipText += `<br /><br /><b>(${conditionName}: ${conditionDescription})</b>`; // Ajoute un saut de ligne et met la condition en italique
        } else {
          tooltipText += `<br /><i>(${conditionName})</i>`; // Ajoute un saut de ligne même si la description est absente
        }
      }
      setTooltip(tooltipText);
      setTooltipPosition({ x: event.pageX, y: event.pageY });
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
    setTooltipPosition(null);
  };

  const handleSort = (key: string) => {
    if (disableSorting) return;
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        return {
          key,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      let aValue = a[sortConfig.key] === "-" ? 0 : a[sortConfig.key];
      let bValue = b[sortConfig.key] === "-" ? 0 : b[sortConfig.key];

      // Gestion spéciale pour les colonnes string non triées par l'alphabétique
      if (sortConfig.key === "Availability") {
        const aString = typeof aValue === "string" ? aValue.toLowerCase() : "";
        const bString = typeof bValue === "string" ? bValue.toLowerCase() : "";

        const aIndex = availabilityOrder.indexOf(aString);
        const bIndex = availabilityOrder.indexOf(bString);

        const aFinalIndex = aIndex === -1 ? availabilityOrder.length : aIndex;
        const bFinalIndex = bIndex === -1 ? availabilityOrder.length : bIndex;

        return sortConfig.direction === "asc"
          ? aFinalIndex - bFinalIndex
          : bFinalIndex - aFinalIndex;
      }

      if (sortConfig.key === "Difficulty") {
        const normalizeDifficulty = (value: any): string => {
          if (typeof value === "string") {
            return value.toLowerCase().trim();
          }
          return "";
        };

        const aString = normalizeDifficulty(aValue);
        const bString = normalizeDifficulty(bValue);

        const aIndex = difficultyOrder
          .map((d) => d.toLowerCase())
          .indexOf(aString);
        const bIndex = difficultyOrder
          .map((d) => d.toLowerCase())
          .indexOf(bString);

        const aFinalIndex = aIndex === -1 ? difficultyOrder.length : aIndex;
        const bFinalIndex = bIndex === -1 ? difficultyOrder.length : bIndex;

        return sortConfig.direction === "asc"
          ? aFinalIndex - bFinalIndex
          : bFinalIndex - aFinalIndex;
      }

      if (sortConfig.key === "Requirement") {
        const aString = typeof aValue === "string" ? aValue : "";
        const bString = typeof bValue === "string" ? bValue : "";

        const aParsed = parseRequirement(aString);
        const bParsed = parseRequirement(bString);

        // Always put "-" requirements first regardless of sort direction
        const isDash = (p: { priority: number }) => p.priority === 0;
        if (isDash(aParsed) || isDash(bParsed)) {
          if (isDash(aParsed) && isDash(bParsed)) {
            return 0;
          }
          return isDash(aParsed) ? -1 : 1;
        }

        // Compare by priority (higher number = harder) respecting direction
        if (aParsed.priority !== bParsed.priority) {
          return sortConfig.direction === "asc"
            ? aParsed.priority - bParsed.priority
            : bParsed.priority - aParsed.priority;
        }

        // Then by value
        if (aParsed.value !== bParsed.value) {
          return sortConfig.direction === "asc"
            ? aParsed.value - bParsed.value
            : bParsed.value - aParsed.value;
        }

        // If equal, fallback to alphabetical
        return sortConfig.direction === "asc"
          ? aString.localeCompare(bString)
          : bString.localeCompare(aString);
      }

      // Gestion spéciale pour les colonnes numériques
      if (
        sortConfig.key === "Cost" ||
        sortConfig.key === "Cost (Mag)" ||
        sortConfig.key === "Encumbrance" ||
        sortConfig.key === "Armour" ||
        sortConfig.key === "Overload" ||
        sortConfig.key === "Warp Rating" ||
        sortConfig.key === "Damage" ||
        sortConfig.key === "Magazine"
      ) {
        const normalizeNumber = (value: any): number => {
          if (typeof value === "string") {
            if (value.includes("x")) {
              value = value.slice(1);
            }
            const parsed = parseFloat(value);
            return isNaN(parsed) ? 0 : parsed;
          }
          if (typeof value === "number") {
            return value;
          }
          return 0;
        };

        const aNumber = normalizeNumber(aValue);
        const bNumber = normalizeNumber(bValue);

        return sortConfig.direction === "asc"
          ? aNumber - bNumber
          : bNumber - aNumber;
      }

      // Comparaison générique
      if (aValue && bValue) {
        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
  }, [data, sortConfig]);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} onClick={() => handleSort(header)}>
                {header}
                {sortConfig?.key === header && (
                  <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => {
            const discipline = row["Discipline"]?.toString().toLowerCase(); // Récupère la discipline
            return (
              <tr
                key={rowIndex}
                className={discipline ? `discipline-${discipline}` : ""}
              >
                {headers.map((header, colIndex) => (
                  <td key={colIndex}>
                    {header === "Traits" && row[header]
                      ? (row[header] as string)
                          .split(", ")
                          .map((trait, traitIndex) => (
                            <span
                              key={traitIndex}
                              className="trait"
                              onMouseEnter={(e) => handleMouseEnter(trait, e)}
                              onMouseLeave={handleMouseLeave}
                            >
                              {trait}
                              {traitIndex <
                                (row[header] as string).split(", ").length -
                                  1 && ", "}
                            </span>
                          ))
                      : row[header]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Tooltip */}
      {tooltip && tooltipPosition && (
        <div
          className="tooltip"
          style={{
            top: tooltipPosition.y + 10,
            left: tooltipPosition.x + 10,
          }}
          dangerouslySetInnerHTML={{ __html: tooltip }}
        />
      )}
    </div>
  );
};

export default Table;
