import React, { useState } from "react";
import "./Tooltip.css";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const handleMouseEnter = (event: React.MouseEvent) => {
    setVisible(true);
    setPosition({ x: event.pageX, y: event.pageY });
  };

  const handleMouseLeave = () => {
    setVisible(false);
    setPosition(null);
  };

  return (
    <span
      className="tooltip-trigger"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && position && (
        <div
          className="tooltip"
          style={{
            top: position.y + 10,
            left: position.x + 10,
          }}
        >
          {content}
        </div>
      )}
    </span>
  );
};

export default Tooltip;
