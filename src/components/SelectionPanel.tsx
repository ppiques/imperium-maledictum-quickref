import React from "react";
import { useSelection } from "../contexts/SelectionContext";
import { generateSelectionPDF } from "../utils/pdfGenerator";
import "./SelectionPanel.css";

const SelectionPanel: React.FC = () => {
  const selection = useSelection();
  const selectionsByCategory = selection.getAllSelectionsByCategory();
  const totalCount = selection.getSelectionCount();
  const categoryOrder = [
    "Talents",
    "Weapons",
    "Protection",
    "Equipment",
    "Augmetics",
    "Psy",
    "Services",
    "Combat",
  ];

  const sortedCategories = Object.keys(selectionsByCategory).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    const orderA = indexA === -1 ? 999 : indexA;
    const orderB = indexB === -1 ? 999 : indexB;
    return orderA - orderB;
  });

  const handlePrint = () => {
    if (totalCount === 0) {
      alert("No items selected for PDF export.");
      return;
    }
    generateSelectionPDF(selectionsByCategory);
  };

  return (
    <div className="selection-panel">
      <div className="selection-panel-header">
        <h2>Selection ({totalCount})</h2>
        <div className="selection-panel-controls">
          {totalCount > 0 && (
            <>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => selection.clearAll()}
              >
                Clear All
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={handlePrint}
              >
                Print PDF
              </button>
            </>
          )}
        </div>
      </div>

      {totalCount === 0 ? (
        <div className="selection-panel-empty">
          <p>No items selected. Select items from the tables to add them here.</p>
        </div>
      ) : (
        <div className="selection-panel-content">
          {sortedCategories.map((category) => (
            <div key={category} className="selection-category">
              <h3 className="selection-category-title">
                {category} ({selectionsByCategory[category].length})
              </h3>
              <ul className="selection-items">
                {selectionsByCategory[category].map((item) => (
                  <li key={item.id} className="selection-item">
                    <span className="selection-item-name">{item.name}</span>
                    <button
                      className="btn-remove"
                      onClick={() => selection.removeSelection(item.id)}
                      aria-label={`Remove ${item.name}`}
                      title="Remove from selection"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectionPanel;
