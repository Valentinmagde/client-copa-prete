// components/espace-mpme/NavigationLaterale.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface NavigationLateraleProps {
  activePage: "informations" | "documents";
}

const NavigationLaterale: React.FC<NavigationLateraleProps> = ({ activePage }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    {
      id: "informations",
      label: t("profile.personalInfo"),
      icon: "fa-user",
      path: "/espace-mpme/mon-profil/informations",
    },
    {
      id: "documents",
      label: t("profile.documents"),
      icon: "fa-file",
      path: "/espace-mpme/mon-profil/documents",
    },
  ];

  return (
    <div className="profile-sidebar">
      <div className="widget-area">
        <div className="widget widget-nav-menu">
          <h3 className="widget-title">{t("profile.menu")}</h3>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={activePage === item.id ? "active" : ""}
                >
                  <i className={`fa ${item.icon}`} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="widget widget-download">
          <h3 className="widget-title">{t("profile.quickLinks")}</h3>
          <ul>
            <li>
              <Link to="/espace-mpme/tableau-de-bord">
                <i className="fa fa-dashboard" />
                <span className="download-caption">
                  <h6>{t("dashboard")}</h6>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <i className="fa fa-headset" />
                <span className="download-caption">
                  <h6>{t("contactSupport")}</h6>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        .profile-sidebar { position: sticky; top: 100px; }
        .widget-nav-menu ul li a {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 15px; border-radius: 5px;
        }
        .widget-nav-menu ul li a.active {
          background-color: var(--c-navy); color: white;
        }
        .widget-nav-menu ul li a i { width: 20px; }
        .widget-download ul li {
          border: none; padding: 0; margin-bottom: 10px;
        }
        .widget-download ul li a {
          display: flex; align-items: center; gap: 10px;
          padding: 15px; background: white; border-radius: 5px;
          transition: all 0.3s;
        }
        .widget-download ul li a:hover {
          transform: translateX(5px); box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .widget-download ul li a i {
          width: 30px; height: 30px; line-height: 30px;
          text-align: center; background: var(--c-navy);
          color: white; border-radius: 5px;
        }
        .download-caption h6 { margin: 0; font-size: 14px; }
      `}</style>
    </div>
  );
};

export default NavigationLaterale;