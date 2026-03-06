import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import About1 from "../assets/img/about/01.png";
import About2 from "../assets/img/about/07.png";
import SliderImg3 from "../assets/img/slider/03.png";

type ComplaintType =
  | "tech"
  | "selection"
  | "behavior"
  | "corruption"
  | "vbg"
  | "other";

interface ComplaintForm {
  anonymous: boolean;
  name: string;
  contact: string;
  type: ComplaintType | "";
  date: string;
  location: string;
  description: string;
  consent: boolean;
}

const COMPLAINT_META: Record<
  ComplaintType,
  { color: string; bg: string; priority: string }
> = {
  tech: { color: "#1A3A5C", bg: "#EBF3FF", priority: "standard" },
  selection: { color: "#C97B2E", bg: "#FDF3E7", priority: "high" },
  behavior: { color: "#C97B2E", bg: "#FDF3E7", priority: "high" },
  corruption: { color: "#C0392B", bg: "#FDECEA", priority: "urgent" },
  vbg: { color: "#C0392B", bg: "#FDECEA", priority: "priority" },
  other: { color: "#6B7A90", bg: "#F4F5F7", priority: "standard" },
};

const generateRef = () =>
  "COPA-" + Date.now().toString(36).toUpperCase().slice(-6);

const SubmitComplaint: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState<ComplaintForm>({
    anonymous: false,
    name: "",
    contact: "",
    type: "",
    date: "",
    location: "",
    description: "",
    consent: false,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");
  const [fieldError, setFieldError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const complaintTypes = t("submitComplaintPage.form.fields.type.options", {
    returnObjects: true,
  }) as Array<{ value: string; label: string; icon: string }>;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFieldError("");
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const filtered = selected.filter((f) => f.size <= 10 * 1024 * 1024);
    setFiles((prev) => [...prev, ...filtered].slice(0, 5));
  };

  const removeFile = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type) {
      setFieldError(t("submitComplaintPage.validation.selectType"));
      return;
    }
    if (!form.description.trim()) {
      setFieldError(t("submitComplaintPage.validation.describeFacts"));
      return;
    }
    if (!form.consent) {
      setFieldError(t("submitComplaintPage.validation.acceptTerms"));
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setRefNumber(generateRef());
    setSubmitted(true);
  };

  const selectedTypeMeta = form.type ? COMPLAINT_META[form.type] : null;

  if (submitted)
    return (
      <div className="site-main">
        <Header />
        <PageHeader
          title={t("submitComplaintPage.pageTitle")}
          breadcrumb={t("submitComplaintPage.breadcrumb")}
        />
        <section
          className="ttm-row bg-theme-GreyColor clearfix"
          style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div
                  className="ttm-col-bgcolor-yes ttm-bg bg-theme-WhiteColor p-50 text-center"
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(0,0,0,.08)",
                  }}
                >
                  <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                  <div className="layer-content">
                    <div style={{ fontSize: "56px", marginBottom: "16px" }}>
                      ✅
                    </div>
                    <h3 style={{ marginBottom: "10px" }}>
                      {t("submitComplaintPage.success.title")}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#555",
                        marginBottom: "20px",
                      }}
                    >
                      {t("submitComplaintPage.success.message")}
                    </p>
                    <div
                      style={{
                        display: "inline-block",
                        padding: "12px 24px",
                        background: "rgba(240,122,26,.08)",
                        borderRadius: "8px",
                        marginBottom: "24px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#888",
                          margin: "0 0 4px",
                          textTransform: "uppercase",
                          letterSpacing: ".6px",
                        }}
                      >
                        {t("submitComplaintPage.success.refNumber")}
                      </p>
                      <p
                        style={{
                          fontSize: "22px",
                          fontWeight: 800,
                          color: "var(--theme-SkinColor)",
                          margin: 0,
                          fontFamily: "monospace",
                          letterSpacing: "2px",
                        }}
                      >
                        {refNumber}
                      </p>
                    </div>
                    <div className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor text-left mb-25">
                      <ul>
                        {(t("submitComplaintPage.success.notifications", {
                          returnObjects: true,
                        }) as string[]).map((item, i) => (
                          <li key={i} className="pb-8">
                            <i className="far fa-check-circle"></i>
                            <div
                              className="ttm-list-li-content"
                              style={{ fontSize: "13px" }}
                            >
                              {item}
                            </div>
                          </li>
                        ))}
                        {form.type === "vbg" && (
                          <li className="pb-8">
                            <i className="far fa-check-circle"></i>
                            <div
                              className="ttm-list-li-content"
                              style={{ fontSize: "13px" }}
                            >
                              {t("submitComplaintPage.success.vbgNotification")}
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                    <Link
                      to="/"
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor mr-15"
                    >
                      {t("submitComplaintPage.success.buttons.home")}
                    </Link>
                    <Link
                      to="/contact"
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
                    >
                      {t("submitComplaintPage.success.buttons.contact")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );

  return (
    <div className="site-main">
      <Header />
      <PageHeader
        title={t("submitComplaintPage.pageTitle")}
        breadcrumb={t("submitComplaintPage.breadcrumb")}
      />
      <section className="ttm-row about-section clearfix bg-theme-WhiteColor">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-title">
                <div className="title-header">
                  <h3>
                    {t("submitComplaintPage.intro.highlight")}
                  </h3>
                  <h2 className="title">
                    {t("submitComplaintPage.intro.title")}
                  </h2>
                </div>
                <div className="title-desc">
                  <p>
                    {t("submitComplaintPage.intro.description")}
                  </p>
                  <p className="font-bold text-theme-SkinColor mt-20">
                    {t("submitComplaintPage.intro.complaintTypes")}
                  </p>
                </div>
                <div className="mb-35">
                  <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor text-theme-DarkColor">
                    {(t("submitComplaintPage.intro.types", {
                      returnObjects: true,
                    }) as string[]).map((type, i) => (
                      <li key={i}>
                        <i className="far fa-check-circle"></i>
                        <div className="ttm-list-li-content">{type}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-9 col-sm-10 col-12 mx-auto">
              <div className="mr-40 ml-20 pb-60 pt-lg-50">
                <div
                  className="d-flex justify-content-between"
                  style={{
                    backgroundImage: `url(${About1})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="pt-20 pr-20 bg-theme-WhiteColor ml_20 mb_60 mt-200">
                    <img
                      src={About2}
                      className="img-fluid"
                      alt="bgimage"
                      style={{
                        width: "300px",
                      }}
                    />
                  </div>
                  <div className="d-flex align-items-start h-100 mr_30 pt-40">
                    <div className="ttm-play-icon-btn p-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* form */}
      <section className="ttm-row padding_zero-section bg-layer-equal-height clearfix">
        <div className="container">
          <div className="row g-0">
            {/* Image panel */}
            <div className="col-lg-5">
              {/* col-img-img-six */}
              <div className="ttm-bg ttm-col-bgimage-yes col-bg-img-seven ttm-left-span">
                <div
                  className="ttm-col-wrapper-bg-layer ttm-bg-layer"
                  style={{ backgroundImage: `url(${SliderImg3})` }}
                ></div>
                <div className="layer-content"></div>
                <img
                  className="img-fluid col-bg-img-res"
                  src={SliderImg3}
                  alt="bgimage"
                />
              </div>
              {/* col-img-bg-img-six end */}
            </div>

            {/* Form panel */}
            <div className="col-lg-7">
              <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-GreyColor h-auto p-50 p-lg-30 mt-50 mb-50">
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                <div className="layer-content">
                  <div className="section-title title-style-center_text mb-30">
                    <div className="title-header">
                      <h3>
                        {t("submitComplaintPage.form.title")}
                      </h3>
                      <h2 className="title" style={{ fontSize: "22px" }}>
                        {t("submitComplaintPage.form.subtitle")}
                      </h2>
                    </div>
                  </div>

                  {fieldError && (
                    <div
                      style={{
                        padding: "10px 14px",
                        background: "#FDECEA",
                        border: "1px solid rgba(192,57,43,.2)",
                        borderRadius: "4px",
                        marginBottom: "16px",
                        fontSize: "13px",
                        color: "#C0392B",
                      }}
                    >
                      ⚠️ {fieldError}
                    </div>
                  )}

                  <form
                    className="contact_form wrap-form"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="row ttm-boxes-spacing-10px">
                      {/* Anonymat */}
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "12px",
                            padding: "14px 16px",
                            background: "#fff",
                            border: "1.5px solid rgba(119,119,119,.15)",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="checkbox"
                            name="anonymous"
                            checked={form.anonymous}
                            onChange={handleChange}
                            style={{
                              width: "auto",
                              height: "auto",
                              padding: 0,
                              margin: 0,
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ fontSize: "13.5px", fontWeight: 600 }}>
                            {t("submitComplaintPage.form.anonymous.label")}
                          </span>
                          {form.anonymous && (
                            <span
                              style={{
                                marginLeft: "auto",
                                padding: "2px 10px",
                                borderRadius: 20,
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#2E7D52",
                                background: "#E8F5EE",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {t("submitComplaintPage.form.anonymous.active")}
                            </span>
                          )}
                        </label>
                      </div>

                      {/* Identité conditionnelle */}
                      {!form.anonymous && (
                        <>
                          <div className="col-md-6 ttm-box-col-wrapper">
                            <label>
                              <input
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                placeholder={t("submitComplaintPage.form.fields.name.placeholder")}
                              />
                            </label>
                          </div>
                          <div className="col-md-6 ttm-box-col-wrapper">
                            <label>
                              <input
                                name="contact"
                                type="text"
                                value={form.contact}
                                onChange={handleChange}
                                placeholder={t("submitComplaintPage.form.fields.contact.placeholder")}
                              />
                            </label>
                          </div>
                        </>
                      )}

                      {/* Type de plainte */}
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            required
                          >
                            <option value="">{t("submitComplaintPage.form.fields.type.placeholder")}</option>
                            {complaintTypes.map((t) => (
                              <option key={t.value} value={t.value}>
                                {t.icon} {t.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        {form.type && selectedTypeMeta && (
                          <div
                            style={{
                              marginTop: "6px",
                              padding: "6px 12px",
                              borderRadius: "4px",
                              background: selectedTypeMeta.bg,
                              fontSize: "12px",
                              color: selectedTypeMeta.color,
                              fontWeight: 600,
                            }}
                          >
                            {t("submitComplaintPage.form.priority.label", {
                              priority: t(
                                `submitComplaintPage.form.priority.${selectedTypeMeta.priority}`
                              ),
                            })}
                            {form.type === "vbg" &&
                              t("submitComplaintPage.form.priority.vbgNote")}
                          </div>
                        )}
                      </div>

                      {/* Date et lieu */}
                      <div className="col-md-6 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="date"
                            type="date"
                            value={form.date}
                            onChange={handleChange}
                            placeholder={t("submitComplaintPage.form.fields.date.placeholder")}
                            max={new Date().toISOString().split("T")[0]}
                          />
                        </label>
                      </div>
                      <div className="col-md-6 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="location"
                            type="text"
                            value={form.location}
                            onChange={handleChange}
                            placeholder={t("submitComplaintPage.form.fields.location.placeholder")}
                          />
                        </label>
                      </div>

                      {/* Description */}
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <textarea
                            name="description"
                            rows={6}
                            value={form.description}
                            onChange={handleChange}
                            placeholder={t("submitComplaintPage.form.fields.description.placeholder")}
                            required
                          />
                        </label>
                        <p
                          style={{
                            fontSize: "11px",
                            color:
                              form.description.length < 30
                                ? "#C97B2E"
                                : "#2E7D52",
                            margin: "4px 0 0",
                            paddingLeft: "4px",
                          }}
                        >
                          {t("submitComplaintPage.form.fields.description.charCount", {
                            count: form.description.length,
                          })}{" "}
                          {form.description.length < 30
                            ? `(${t("submitComplaintPage.form.fields.description.minWarning")})`
                            : "✓"}
                        </p>
                      </div>

                      {/* Pièces jointes */}
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <input
                          type="file"
                          ref={fileRef}
                          onChange={handleFiles}
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          style={{ display: "none" }}
                        />
                        <div
                          onClick={() => fileRef.current?.click()}
                          style={{
                            border: "2px dashed rgba(119,119,119,.25)",
                            borderRadius: "6px",
                            padding: "20px",
                            textAlign: "center",
                            cursor: "pointer",
                            background: "#fff",
                            transition: "border .2s",
                          }}
                        >
                          <i
                            className="ti ti-upload"
                            style={{
                              fontSize: "24px",
                              color: "#bbb",
                              display: "block",
                              marginBottom: "6px",
                            }}
                          />
                          <p
                            style={{
                              fontSize: "13px",
                              color: "#888",
                              margin: 0,
                            }}
                          >
                            {t("submitComplaintPage.form.fields.files.upload")}
                          </p>
                          <p
                            style={{
                              fontSize: "11px",
                              color: "#bbb",
                              margin: "4px 0 0",
                            }}
                          >
                            {t("submitComplaintPage.form.fields.files.hint")}
                          </p>
                        </div>
                        {files.length > 0 && (
                          <div style={{ marginTop: "10px" }}>
                            {files.map((f, i) => (
                              <div
                                key={i}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  padding: "7px 12px",
                                  background: "#fff",
                                  borderRadius: "4px",
                                  border: "1px solid rgba(119,119,119,.12)",
                                  marginBottom: "6px",
                                }}
                              >
                                <i
                                  className="ti ti-files"
                                  style={{ color: "#777" }}
                                />
                                <span
                                  style={{
                                    flex: 1,
                                    fontSize: "12px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {f.name}
                                </span>
                                <span
                                  style={{ fontSize: "11px", color: "#aaa" }}
                                >
                                  {t("submitComplaintPage.form.fields.files.size", {
                                    size: (f.size / 1024).toFixed(0),
                                  })}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(i)}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    color: "#C0392B",
                                    cursor: "pointer",
                                    padding: "0 4px",
                                    fontSize: "16px",
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Consentement */}
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label
                          style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                            gap: "12px",
                            padding: "14px 16px",
                            border: "1.5px solid rgba(119,119,119,.15)",
                            borderRadius: "6px",
                            cursor: "pointer",
                            background: form.consent
                              ? "rgba(46,125,82,.04)"
                              : "#fff",
                            borderColor: form.consent
                              ? "rgba(46,125,82,.3)"
                              : "rgba(119,119,119,.15)",
                          }}
                        >
                          <input
                            type="checkbox"
                            name="consent"
                            checked={form.consent}
                            onChange={handleChange}
                            required
                            style={{
                              width: "auto",
                              height: "auto",
                              padding: 0,
                              margin: "3px 0 0",
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontSize: "13px",
                              color: "#555",
                              lineHeight: 1.5,
                            }}
                          >
                            {t("submitComplaintPage.form.fields.consent.label")}{" "}
                            <span style={{ color: "#dc3545" }}>*</span>
                          </span>
                        </label>
                      </div>

                      {/* Submit */}
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <button
                          className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100"
                          type="submit"
                          disabled={submitting}
                        >
                          {submitting
                            ? t("submitComplaintPage.form.submit.submitting")
                            : t("submitComplaintPage.form.submit.default")}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SubmitComplaint;