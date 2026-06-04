import React, { useState, useEffect, useRef } from "react";
import "./Tooltip.css";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

const MARGIN = 50;

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (event: React.MouseEvent) => {
    setVisible(true);
    setPosition({ x: event.clientX + 15, y: event.clientY + 15 });
  };

  const handleMouseLeave = () => {
    setVisible(false);
    setPosition(null);
  };

  /* Repositionnement automatique si débordement du viewport */
  useEffect(() => {
    if (!visible || !position || !tooltipRef.current) return;

    const rect = tooltipRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (rect.right > vw - MARGIN) {
      setPosition((prev) => {
        if (!prev) return null;
        return { ...prev, x: prev.x - (rect.right - vw) - MARGIN };
      });
    }

    if (rect.bottom > vh - MARGIN) {
      setPosition((prev) => {
        if (!prev) return null;
        return { ...prev, y: prev.y - (rect.bottom - vh) - MARGIN };
      });
    }
  }, [visible, position]);

  return (
    <span
      className="tooltip-trigger"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && position && (
        <div
          ref={tooltipRef}
          className="tooltip"
          style={{
            position: "fixed",
            top: position.y,
            left: position.x,
          }}
        >
          {content}
        </div>
      )}
    </span>
  );
};

export default Tooltip;
