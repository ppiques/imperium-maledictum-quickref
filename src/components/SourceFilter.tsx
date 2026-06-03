import { SOURCE_BOOKS } from "../contexts/SourceFilterContext";
import { useSourceFilter } from "../contexts/SourceFilterContext";
import "./SourceFilter.css";

export default function SourceFilter() {
  const { activeSources, toggleSource, toggleAll, isAllActive } = useSourceFilter();

  return (
    <div className="source-filter">
      <div className="source-filter-row">
        <span className="source-filter-label">Sources</span>
        <div className="source-filter-buttons">
          {SOURCE_BOOKS.map((book) => {
            const isActive = activeSources.includes(book.id);
            return (
              <button
                key={book.id}
                className={`source-btn ${isActive ? "active" : "inactive"}`}
                onClick={() => toggleSource(book.id)}
                title={book.label}
              >
                <span className="source-btn-indicator" />
                <span className="source-btn-label">{book.short}</span>
              </button>
            );
          })}
        </div>
        <button
          className={`source-filter-toggle-all ${isAllActive ? "on" : "off"}`}
          onClick={toggleAll}
          title={isAllActive ? "Disable all sources" : "Enable all sources"}
        >
          {isAllActive ? "All On" : "All Off"}
        </button>
        {!isAllActive && (
          <span className="source-filter-count">
            {activeSources.length}/{SOURCE_BOOKS.length}
          </span>
        )}
      </div>
    </div>
  );
}
