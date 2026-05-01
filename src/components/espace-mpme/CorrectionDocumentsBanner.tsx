import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BeneficiaryService from "@/services/beneficiary/beneficiary.service";
import { getUser } from "@/utils/storage";
import useCopaPhases from "@/hooks/useCopaPhases";

const CorrectionDocumentsBanner: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const user = getUser();

  const { isCandidatureSubmissionOpen, loading: phasesLoading } = useCopaPhases(lang);
  const [allowed, setAllowed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    BeneficiaryService.getByUserId(user.id, lang)
      .then((res: any) => setAllowed(!!res?.documentCorrectionAllowed))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [user?.id]);

  if (phasesLoading || !loaded) return null;
  if (!isCandidatureSubmissionOpen || !allowed) return null;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #fff8e1 0%, #fffde7 100%)",
        border: "1.5px solid #ffe082",
        borderLeft: "4px solid #f59e0b",
        borderRadius: 8,
        padding: "16px 20px",
        marginBottom: 24,
        display: "flex",
        gap: 16,
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flex: 1 }}>
        <i
          className="ti ti-alert-triangle"
          style={{ fontSize: 22, color: "#f59e0b", flexShrink: 0, marginTop: 1 }}
        />
        <div>
          <p style={{ fontWeight: 700, marginBottom: 4, color: "#92400e" }}>
            Action requise : correction de documents
          </p>
          <p style={{ color: "#78350f", fontSize: 14, margin: 0 }}>
            Votre dossier nécessite une correction de documents. Veuillez
            re-soumettre les pièces demandées avant la clôture de la période.
          </p>
        </div>
      </div>
      <Link
        to="/correction-documents"
        className="ttm-btn ttm-btn-size-sm ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor"
        style={{ flexShrink: 0, whiteSpace: "nowrap" }}
      >
        <i className="ti ti-send me-1" />
        Corriger mes documents
      </Link>
    </div>
  );
};

export default CorrectionDocumentsBanner;
