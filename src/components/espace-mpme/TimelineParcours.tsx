// components/espace-mpme/TimelineParcours.tsx
import React from "react";
import { useTranslation } from "react-i18next";

const TimelineParcours: React.FC = () => {
  const { t } = useTranslation();

  const etapes = [
    { id: 1, nom: "inscription", statut: "complete" },
    { id: 2, nom: "profil", statut: "en-cours" },
    { id: 3, nom: "formations", statut: "en-cours" },
    { id: 4, nom: "plan", statut: "en-cours" },
    { id: 5, nom: "evaluation", statut: "pending" },
    { id: 6, nom: "subvention", statut: "pending" },
  ];

  return (
    <div className="timeline parcours-timeline">
      {etapes.map((etape, index) => (
        <div key={etape.id} className="timeline-panel">
          <div className="timeline-shape">
            <span className={`shape-circle ${etape.statut}`}>
              {etape.statut === "complete" && <i className="fa fa-check" />}
            </span>
          </div>
          <div className="timeline-body">
            <h4 className="title">{t(`etapes.${etape.nom}`)}</h4>
            <span className={`statut-badge statut-${etape.statut}`}>
              {t(`statuts.${etape.statut}`)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineParcours;
