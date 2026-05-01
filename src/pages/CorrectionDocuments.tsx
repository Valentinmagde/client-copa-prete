import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PageHeader from "../components/layout/PageHeader";
import BeneficiaryService from "@/services/beneficiary/beneficiary.service";
import DocumentService from "@/services/document/document.service";
import { getUser } from "@/utils/storage";
import { DOCUMENT_TYPE_MAPPING } from "@/constants/document-mapping";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DocConfig {
  key: string;
  labelKey: string;
  typeId: number;
  required: boolean;
}

// ─── Documents requis selon le type d'entreprise ──────────────────────────────

const DOCS_BY_TYPE: Record<string, DocConfig[]> = {
  formal: [
    { key: "idCard",           labelKey: "doc_idCard_formal",      typeId: DOCUMENT_TYPE_MAPPING.idCard,           required: true },
    { key: "commerceRegister", labelKey: "doc_commerceRegister",   typeId: DOCUMENT_TYPE_MAPPING.commerceRegister, required: true },
    { key: "bankStatements",   labelKey: "doc_bankStatements",     typeId: DOCUMENT_TYPE_MAPPING.bankStatements,   required: true },
  ],
  informal: [
    { key: "idCard",              labelKey: "doc_idCard_informal",    typeId: DOCUMENT_TYPE_MAPPING.idCard,              required: true },
    { key: "communalAttestation", labelKey: "doc_communalAttestation", typeId: DOCUMENT_TYPE_MAPPING.communalAttestation, required: true },
    { key: "bankStatements",      labelKey: "doc_bankStatements",     typeId: DOCUMENT_TYPE_MAPPING.bankStatements,      required: true },
  ],
};

// ─── FileUploadRow ─────────────────────────────────────────────────────────────

const FileUploadRow: React.FC<{
  doc: DocConfig;
  file: File | null;
  error?: string;
  onChange: (key: string, file: File | null) => void;
}> = ({ doc, file, error, onChange }) => {
  const { t } = useTranslation();
  const [drag, setDrag] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const isImage = file?.type.startsWith("image/") ?? false;
  const isPdf   = file?.type === "application/pdf";

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const pick = (f?: File | null) => { if (f) onChange(doc.key, f); };

  return (
    <>
      <div className="col-12" style={{ marginBottom: 24 }}>
        <p style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
          {t(doc.labelKey)}
          {doc.required && <span style={{ color: "#dc3545", marginLeft: 4 }}>*</span>}
        </p>

        {file ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#fff", border: "1px solid rgba(119,119,119,.18)", borderRadius: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {isImage && previewUrl ? (
                <button type="button" onClick={() => setLightbox(true)} style={{ width: 34, height: 34, padding: 0, border: "1px solid #ddd", borderRadius: 4, overflow: "hidden", cursor: "zoom-in", background: "none", flexShrink: 0 }}>
                  <img src={previewUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </button>
              ) : (
                <i className="ti ti-files" style={{ fontSize: 18, flexShrink: 0 }} />
              )}
              <div>
                <p style={{ fontSize: 13, margin: 0 }}>
                  {file.name.length > 64 ? file.name.slice(0, 60) + "…" : file.name}
                </p>
                <p style={{ fontSize: 11, color: "#aaa", margin: 0, marginTop: 2 }}>
                  {file.size < 1_048_576 ? `${(file.size / 1024).toFixed(0)} Ko` : `${(file.size / 1_048_576).toFixed(1)} Mo`}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, borderLeft: "1px solid rgba(119,119,119,.18)", paddingLeft: 12, marginLeft: 8 }}>
              {isPdf && previewUrl && (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", textDecoration: "none", transition: "background .15s, color .15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(29,106,229,.1)"; (e.currentTarget as HTMLElement).style.color = "#1d6ae5"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#bbb"; }}
                >
                  <i className="ti ti-eye" style={{ fontSize: 15 }} />
                </a>
              )}
              <button
                type="button"
                onClick={() => onChange(doc.key, null)}
                title="Supprimer"
                style={{ width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "none", cursor: "pointer", color: "#bbb", fontSize: 15, padding: 0, transition: "background .15s, color .15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,53,69,.1)"; e.currentTarget.style.color = "#dc3545"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#bbb"; }}
              >
                <i className="ti ti-trash" />
              </button>
            </div>
          </div>
        ) : (
          <label style={{ cursor: "pointer", display: "block", margin: 0 }} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); pick(e.dataTransfer.files?.[0]); }}>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ""; }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", border: `1.5px dashed ${drag ? "var(--skin-color,#4caf50)" : "rgba(119,119,119,.25)"}`, borderRadius: 6, background: "#fff", transition: "border-color .2s" }}>
              <i className="ti ti-cloud-up" style={{ fontSize: 17, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: "#777" }}>
                {t("dragAndDropOrClick")}
                <span style={{ display: "block", fontSize: 12, color: "#aaa", marginTop: 5 }}>
                  PDF, JPG, PNG — max 5 Mo
                </span>
              </span>
            </div>
          </label>
        )}
        {error && <span style={{ color: "#dc3545", fontSize: 12, display: "block", marginTop: 4 }}>{error}</span>}
      </div>

      {lightbox && isImage && previewUrl && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setLightbox(false)}>
          <div style={{ position: "relative", background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.3)", maxWidth: "88vw", maxHeight: "88vh" }} onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setLightbox(false)} style={{ position: "absolute", top: 10, right: 10, width: 26, height: 26, borderRadius: "50%", background: "rgba(0,0,0,.45)", border: "none", color: "#fff", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className="ti ti-close" style={{ fontSize: 11 }} />
            </button>
            <img src={previewUrl} alt={file?.name} style={{ maxWidth: "80vw", maxHeight: "80vh", objectFit: "contain", display: "block" }} />
          </div>
        </div>
      )}
    </>
  );
};

// ─── Page principale ───────────────────────────────────────────────────────────

const CorrectionDocuments: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const user = getUser();
  const navigate = useNavigate();

  const [beneficiary, setBeneficiary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user?.id) { navigate("/login"); return; }
    BeneficiaryService.getByUserId(user.id, lang)
      .then((res: any) => setBeneficiary(res))
      .catch(() => toast.error(t("errorLoadingProfile")))
      .finally(() => setLoading(false));
  }, [user?.id, lang, navigate, t]);

  const handleChange = useCallback((key: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }, []);

  const companyType = beneficiary?.company?.companyType ?? beneficiary?.companyType ?? "informal";
  const docList: DocConfig[] = DOCS_BY_TYPE[companyType] ?? DOCS_BY_TYPE.informal;
  const sectionTitle = companyType === "formal" ? t("documentsForFormal") : t("documentsForInformal");
  const sectionInfo  = companyType === "formal" ? t("documentsInfoFormal") : t("documentsInfoInformal");

  const validate = () => {
    const errs: Record<string, string> = {};
    docList.forEach((doc) => {
      if (doc.required && !files[doc.key]) errs[doc.key] = t("required");
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) { toast.error(t("required")); return; }
    setSaving(true);

    const results = await Promise.allSettled(
      docList
        .filter((doc) => files[doc.key])
        .map((doc) =>
          DocumentService.uploadFormDocument(files[doc.key]!, {
            entityId: beneficiary.id,
            entityType: "beneficiary",
            documentKey: doc.key,
            documentTypeId: doc.typeId,
            formStep: "CORRECTION",
          }).then(() => ({ key: doc.key, ok: true, message: "" }))
           .catch((err: any) => ({ key: doc.key, ok: false, message: typeof err === "string" ? err : t("errorSavingStep") }))
        )
    );

    const failed = results
      .map((r) => (r.status === "fulfilled" ? r.value : null))
      .filter((r) => r && !r.ok);

    if (failed.length > 0) {
      const errs: Record<string, string> = {};
      failed.forEach((r) => { errs[r!.key] = r!.message; });
      setErrors(errs);
      toast.error(failed[0]!.message);
      setSaving(false);
    } else {
      try {
        await BeneficiaryService.submitCorrection(beneficiary.id);
      } catch {
        // continue even if the flag update fails
      }
      toast.success(t("registrationSuccess"));
      navigate("/application-submitted");
    }
  };

  // ── État de chargement ───────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="site-main">
        <Header />
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="spinner-border text-success" role="status" />
        </div>
        <Footer />
      </div>
    );
  }

  // ── Non autorisé ─────────────────────────────────────────────────────────────

  if (!beneficiary?.documentCorrectionAllowed) {
    return (
      <div className="site-main">
        <Header />
        <PageHeader title={t("documentsInfoTitle")} breadcrumb={t("documentsInfoTitle")} />
        <div className="ttm-row register-section clearfix">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 text-center py-60">
                <i className="ti ti-shield-x" style={{ fontSize: 52, color: "#ccc", display: "block", marginBottom: 16 }} />
                <h4>Accès non autorisé</h4>
                <p className="text-muted">Vous n'êtes pas concerné par la correction de documents.</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── Formulaire ───────────────────────────────────────────────────────────────

  return (
    <div className="site-main">
      <Header />
      <PageHeader title={t("documentsInfoTitle")} breadcrumb={t("documentsInfoTitle")} />

      <div className="ttm-row login-section clearfix">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="bg-theme-GreyColor ttm-col-bgcolor-yes ttm-bg rounded p-50 p-lg-20">
                <div className="layer-content">

                  {/* Message d'information */}
                  <div style={{ background: "#fff8e1", border: "1px solid #ffe082", borderRadius: 8, padding: "16px 20px", marginBottom: 32, display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <i className="ti ti-info-circle" style={{ fontSize: 20, color: "#f59e0b", flexShrink: 0, marginTop: 2 }} />
                    <p style={{ margin: 0, fontSize: 14, color: "#666" }}>{sectionInfo}</p>
                  </div>

                  {/* Formulaire d'upload */}
                  <div>
                    <h5 style={{ marginBottom: 24 }}>{sectionTitle}</h5>
                    <div className="row">
                      {docList.map((doc) => (
                        <FileUploadRow
                          key={doc.key}
                          doc={doc}
                          file={files[doc.key] ?? null}
                          error={errors[doc.key]}
                          onChange={handleChange}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bouton de soumission */}
                  <div style={{ marginTop: 32, textAlign: "right" }}>
                    <button
                      onClick={handleSubmit}
                      disabled={saving}
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-square ttm-btn-style-fill ttm-btn-color-skincolor"
                      style={{ minWidth: 180 }}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" />
                          {t("saving")}
                        </>
                      ) : (
                        <>
                          <i className="ti ti-send me-2" />
                          {t("submit")}
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CorrectionDocuments;
