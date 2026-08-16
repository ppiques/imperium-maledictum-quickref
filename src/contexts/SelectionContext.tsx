import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface SelectedItem {
  id: string; // Unique identifier: "{category}-{name}" or "{category}-{index}"
  name: string;
  category: string;
  data: Record<string, string | number | null | React.ReactNode>; // The full row data
}

interface SelectionContextType {
  selections: Map<string, SelectedItem>;
  addSelection: (item: SelectedItem) => void;
  removeSelection: (id: string) => void;
  toggleSelection: (item: SelectedItem) => void;
  clearAll: () => void;
  getSelectionsByCategory: (category: string) => SelectedItem[];
  getAllSelectionsByCategory: () => Record<string, SelectedItem[]>;
  isSelected: (id: string) => boolean;
  getSelectionCount: () => number;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

const STORAGE_KEY = "imperium-selections";

// Helper function to serialize Map to JSON
function serializeSelections(selections: Map<string, SelectedItem>): string {
  return JSON.stringify(Array.from(selections.values()));
}

// Helper function to deserialize JSON to Map
function deserializeSelections(json: string): Map<string, SelectedItem> {
  try {
    const items: SelectedItem[] = JSON.parse(json);
    return new Map(items.map((item) => [item.id, item]));
  } catch {
    return new Map();
  }
}

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<Map<string, SelectedItem>>(() => {
    // Load from localStorage on initialization
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return deserializeSelections(stored);
      }
    }
    return new Map();
  });

  // Persist selections to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, serializeSelections(selections));
    }
  }, [selections]);

  const addSelection = (item: SelectedItem) => {
    setSelections((prev) => new Map(prev).set(item.id, item));
  };

  const removeSelection = (id: string) => {
    setSelections((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  };

  const toggleSelection = (item: SelectedItem) => {
    setSelections((prev) => {
      const next = new Map(prev);
      if (next.has(item.id)) {
        next.delete(item.id);
      } else {
        next.set(item.id, item);
      }
      return next;
    });
  };

  const clearAll = () => {
    setSelections(new Map());
  };

  const getSelectionsByCategory = (category: string): SelectedItem[] => {
    return Array.from(selections.values()).filter(
      (item) => item.category === category
    );
  };

  const getAllSelectionsByCategory = (): Record<string, SelectedItem[]> => {
    const grouped: Record<string, SelectedItem[]> = {};
    selections.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  };

  const isSelected = (id: string): boolean => {
    return selections.has(id);
  };

  const getSelectionCount = (): number => {
    return selections.size;
  };

  return (
    <SelectionContext.Provider
      value={{
        selections,
        addSelection,
        removeSelection,
        toggleSelection,
        clearAll,
        getSelectionsByCategory,
        getAllSelectionsByCategory,
        isSelected,
        getSelectionCount,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
}
