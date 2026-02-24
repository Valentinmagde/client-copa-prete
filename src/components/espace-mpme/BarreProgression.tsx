// components/espace-mpme/BarreProgression.tsx
import React from "react";

interface BarreProgressionProps {
  pourcentage: number;
  label?: string;
  showLabel?: boolean;
}

const BarreProgression: React.FC<BarreProgressionProps> = ({
  pourcentage,
  label,
  showLabel = true,
}) => {
  return (
    <div className="ttm-progress-bar">
      {label && showLabel && (
        <div className="progressbar-title">{label}</div>
      )}
      <div className="progress-bar">
        <div className="progress-bar-rect-wrap-container">
          <div className="progress-bar-rect-wrapper">
            <div
              className="inner-rect-bar addRectAnimate"
              style={{ width: `${pourcentage}%` }}
            />
          </div>
          <span className="rect-progress-bar-percent">{pourcentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default BarreProgression;