import { createContext, useContext, useState, ReactNode } from "react";

// Liste des livres disponibles
export const SOURCE_BOOKS = [
  { id: "core", label: "Core Rulebook", short: "Core" },
  { id: "mechanicus", label: "Adeptus Mechanicus Player's Guide", short: "Mechanicus" },
  { id: "inquisitor", label: "Inquisitor Player's Guide", short: "Inquisitor" },
  { id: "macharian", label: "Macharian Requisition Guide", short: "Macharian" },
];

interface SourceFilterContextType {
  activeSources: string[];
  toggleSource: (sourceId: string) => void;
  toggleAll: () => void;
  isAllActive: boolean;
  filterData: <T extends { Source?: string }>(data: T[]) => T[];
}

const SourceFilterContext = createContext<SourceFilterContextType | undefined>(undefined);

// Mapping des IDs vers les noms de livre tels qu'ils apparaissent dans les JSON
const sourceLabelMap: Record<string, string> = {
  core: "Core Rulebook",
  mechanicus: "Adeptus Mechanicus Player's Guide",
  inquisitor: "Inquisitor Player's Guide",
  macharian: "Macharian Requisition Guide",
};

export function SourceFilterProvider({ children }: { children: ReactNode }) {
  const [activeSources, setActiveSources] = useState<string[]>(
    SOURCE_BOOKS.map((b) => b.id)
  );

  const toggleSource = (sourceId: string) => {
    setActiveSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((s) => s !== sourceId)
        : [...prev, sourceId]
    );
  };

  const toggleAll = () => {
    setActiveSources((prev) =>
      prev.length === SOURCE_BOOKS.length
        ? []
        : SOURCE_BOOKS.map((b) => b.id)
    );
  };

  const isAllActive = activeSources.length === SOURCE_BOOKS.length;

  // Fonction utilitaire pour filtrer un tableau de données
  const filterData = <T extends { Source?: string }>(data: T[]): T[] => {
    if (activeSources.length === SOURCE_BOOKS.length) return data;
    return data.filter((item) => {
      if (!item.Source) return true; // Pas de source → toujours affiché
      return activeSources.some(
        (id) => sourceLabelMap[id] === item.Source
      );
    });
  };

  return (
    <SourceFilterContext.Provider
      value={{ activeSources, toggleSource, toggleAll, isAllActive, filterData }}
    >
      {children}
    </SourceFilterContext.Provider>
  );
}

export function useSourceFilter() {
  const context = useContext(SourceFilterContext);
  if (!context) {
    throw new Error("useSourceFilter must be used within a SourceFilterProvider");
  }
  return context;
}
