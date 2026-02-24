// components/espace-mpme/CarteStatut.tsx
import React from "react";
import { Link } from "react-router-dom";

interface CarteStatutProps {
  title: string;
  value: string;
  status?: string;
  link: string;
  linkText: string;
  icon: string;
  color: "primary" | "success" | "warning" | "info" | "danger";
}

const CarteStatut: React.FC<CarteStatutProps> = ({
  title,
  value,
  status,
  link,
  linkText,
  icon,
  color,
}) => {
  const colorMap = {
    primary: "bg-theme-SkinColor",
    success: "bg-success",
    warning: "bg-warning",
    info: "bg-info",
    danger: "bg-danger",
  };

  return (
    <div className="featured-icon-box style5">
      <div className={`featured-icon ${colorMap[color]}`}>
        <div className="ttm-icon ttm-icon_element-onlytxt">
          <i className={`fa ${icon}`} />
        </div>
      </div>
      <div className="featured-content">
        <div className="featured-title">
          <h3>{title}</h3>
        </div>
        <div className="featured-desc">
          <p>
            <strong>{value}</strong>{" "}
            {status && <span className="status-badge">{status}</span>}
          </p>
          <Link
            to={link}
            className="ttm-btn btn-inline ttm-btn-color-skincolor"
          >
            {linkText} <i className="fa fa-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarteStatut;
