// components/espace-mpme/ChecklistSoumission.tsx
import React from "react";
import { useTranslation } from "react-i18next";

interface ChecklistSoumissionProps {
  data: {
    profilComplete: boolean;
    formationsTerminees: boolean;
    planRempli: boolean;
    documentsTelecharges: boolean;
  } | null;
}

const ChecklistSoumission: React.FC<ChecklistSoumissionProps> = ({ data }) => {
  const { t } = useTranslation();

  const items = [
    { key: "profilComplete", label: t("checklist.profileComplete") },
    { key: "formationsTerminees", label: t("checklist.formationsCompleted") },
    { key: "planRempli", label: t("checklist.planFilled") },
    { key: "documentsTelecharges", label: t("checklist.documentsUploaded") },
  ];

  return (
    <div className="checklist-container">
      <ul className="checklist">
        {items.map((item) => {
          const completed = data?.[item.key as keyof typeof data] || false;
          return (
            <li key={item.key} className={completed ? "completed" : "pending"}>
              <span className="check-icon">
                {completed ? (
                  <i className="fa fa-check-circle" />
                ) : (
                  <i className="fa fa-circle-o" />
                )}
              </span>
              <span className="check-label">{item.label}</span>
              <span className="check-status">
                {completed ? t("checklist.completed") : t("checklist.pending")}
              </span>
            </li>
          );
        })}
      </ul>

      <style>{`
        .checklist-container { margin: 20px 0; }
        .checklist {
          list-style: none; padding: 0; margin: 0;
        }
        .checklist li {
          display: flex; align-items: center; padding: 15px;
          border-bottom: 1px solid #dee2e6;
        }
        .checklist li:last-child { border-bottom: none; }
        .checklist li.completed { background-color: #f8f9fa; }
        .check-icon { width: 30px; color: #6c757d; }
        .completed .check-icon { color: #28a745; }
        .check-label { flex: 1; font-weight: 500; }
        .check-status {
          padding: 3px 10px; border-radius: 20px; font-size: 12px;
        }
        .completed .check-status {
          background: #d4edda; color: #155724;
        }
        .pending .check-status {
          background: #fff3cd; color: #856404;
        }
      `}</style>
    </div>
  );
};

export default ChecklistSoumission;