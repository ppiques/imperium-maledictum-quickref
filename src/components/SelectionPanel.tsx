import React from "react";
import { useSelection } from "../contexts/SelectionContext";
import { generateSelectionPDF, getTileDetailsForPDF } from "../utils/pdfGenerator/pdfGenerator";
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
              <div className="selection-tiles-grid">
                {selectionsByCategory[category].map((item) => (
                  <div key={item.id} className="selection-tile">
                    <div className="selection-tile-content">
                      <h4 className="selection-tile-name">{item.name}</h4>
                      <div className="selection-tile-details">
                        {getTileDetailsForPDF(item.data, category).map((detail, idx) => (
                          <div key={idx} className="selection-tile-detail">
                            <span className="detail-label">{detail.label}:</span>
                            <span className="detail-value">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      className="selection-tile-remove"
                      onClick={() => selection.removeSelection(item.id)}
                      aria-label={`Remove ${item.name}`}
                      title="Remove from selection"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectionPanel;
