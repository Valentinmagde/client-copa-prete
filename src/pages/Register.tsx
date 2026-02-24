import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import type {
  Commune,
  Province,
  Sector,
} from "@/services/reference/reference.type";
import ReferenceService from "@/services/reference/reference.service";
import AuthService from "@/services/auth/auth.service";
import { toast } from "react-toastify";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  entrepreneurType: "burundian" | "refugee" | "";
  firstName: string;
  lastName: string;
  gender: "M" | "F" | "";
  birthDate: string;
  email: string;
  phone: string;
  provinceId: number | "";
  communeId: number | "";
  password: string;
  confirmPassword: string;
  companyStatus: "formal" | "informal" | "project" | "";
  companyName: string;
  nif: string;
  creationYear: number | "";
  sectorId: number | "";
  activityDescription: string;
  employeeCount: number | "";
  annualRevenue: number | "";
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  certifyAccuracy: boolean;
  acceptNotifications: boolean;
}

const INITIAL: FormData = {
  entrepreneurType: "",
  firstName: "",
  lastName: "",
  gender: "",
  birthDate: "",
  email: "",
  phone: "",
  provinceId: "",
  communeId: "",
  password: "",
  confirmPassword: "",
  companyStatus: "",
  companyName: "",
  nif: "",
  creationYear: "",
  sectorId: "",
  activityDescription: "",
  employeeCount: "",
  annualRevenue: "",
  acceptTerms: false,
  acceptPrivacy: false,
  certifyAccuracy: false,
  acceptNotifications: false,
};

const STEPS = [
  { num: 1, label: "Informations personnelles" },
  { num: 2, label: "Votre entreprise" },
  { num: 3, label: "Validation & envoi" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Register: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isKi = lang === "rn";

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loadProv, setLoadProv] = useState(false);
  const [loadComm, setLoadComm] = useState(false);
  const [loadSect, setLoadSect] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadProv(true);
      setLoadSect(true);
      try {
        setProvinces(await ReferenceService.getAllPovinces(lang));
      } finally {
        setLoadProv(false);
      }
      try {
        setSectors(await ReferenceService.getBusinessSectors(true, lang));
      } finally {
        setLoadSect(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!form.provinceId) {
      setCommunes([]);
      return;
    }
    (async () => {
      setLoadComm(true);
      try {
        const res: Commune[] = await ReferenceService.getCommunesByProvince(
          form.provinceId,
          lang,
        );
        setCommunes(res);
        if (form.communeId && !res.some((c) => c.id === form.communeId))
          upd("communeId", "");
      } finally {
        setLoadComm(false);
      }
    })();
  }, [form.provinceId]);

  const upd = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  // ── Validation ──
  const validateStep1 = () => {
    const e: typeof errors = {};
    if (!form.entrepreneurType) e.entrepreneurType = t("required");
    if (!form.firstName.trim()) e.firstName = t("required");
    if (!form.lastName.trim()) e.lastName = t("required");
    if (!form.gender) e.gender = t("required");
    if (!form.birthDate) e.birthDate = t("required");
    else if (
      new Date().getFullYear() - new Date(form.birthDate).getFullYear() <
      18
    )
      e.birthDate = t("birthDateInvalid");
    if (!form.email) e.email = t("required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = t("emailInvalid");
    if (!form.phone) e.phone = t("required");
    if (!form.provinceId) e.provinceId = t("required");
    if (!form.communeId) e.communeId = t("required");
    if (!form.password) e.password = t("required");
    else if (form.password.length < 8) e.password = t("passwordMinLength");
    else if (!/[A-Z]/.test(form.password)) e.password = t("passwordUppercase");
    else if (!/\d/.test(form.password)) e.password = t("passwordNumber");
    if (form.password !== form.confirmPassword)
      e.confirmPassword = t("passwordMismatch");
    setErrors(e);
    return !Object.keys(e).length;
  };

  const validateStep2 = () => {
    const e: typeof errors = {};
    if (!form.companyStatus) e.companyStatus = t("required");
    if (form.companyStatus === "formal" || form.companyStatus === "informal") {
      if (!form.companyName.trim()) e.companyName = t("required");
      if (!form.creationYear) e.creationYear = t("required");
      if (!form.sectorId) e.sectorId = t("required");
      if (!form.activityDescription.trim())
        e.activityDescription = t("required");
      else if (form.activityDescription.length < 20)
        e.activityDescription = t("descriptionMinLength");
      if (!form.employeeCount) e.employeeCount = t("required");
      if (form.nif && !/^\d{9,13}$/.test(form.nif)) e.nif = t("nifInvalid");
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const validateStep3 = () => {
    const e: typeof errors = {};
    if (!form.acceptTerms) e.acceptTerms = t("acceptTermsRequired");
    if (!form.acceptPrivacy) e.acceptPrivacy = t("acceptPrivacyRequired");
    if (!form.certifyAccuracy) e.certifyAccuracy = t("certifyRequired");
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleNext = async () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      window.scrollTo(0, 0);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      window.scrollTo(0, 0);
    } else if (step === 3 && validateStep3()) {
      setSubmitting(true);
      try {
        await AuthService.signup(
          {
            step1: {
              entrepreneurType: form.entrepreneurType,
              firstName: form.firstName,
              lastName: form.lastName,
              gender: form.gender,
              birthDate: form.birthDate,
              email: form.email,
              phone: form.phone,
              provinceId: form.provinceId,
              communeId: form.communeId,
              password: form.password,
              passwordConfirmation: form.confirmPassword,
            },
            step2: {
              companyStatus: form.companyStatus,
              companyExists: form.companyStatus !== "project" ? "yes" : "no",
              companyName: form.companyName,
              nif: form.nif,
              creationYear: form.creationYear,
              sectorId: form.sectorId,
              activityDescription: form.activityDescription,
              employeeCount: form.employeeCount,
              annualRevenue: form.annualRevenue,
            },
            step3: {
              acceptCGU: form.acceptTerms,
              acceptPrivacyPolicy: form.acceptPrivacy,
              certifyAccuracy: form.certifyAccuracy,
              optInNotifications: form.acceptNotifications,
            },
          },
          lang,
        );
        setSuccess(true);
      } catch (err) {
        toast.error(err);
        console.error(err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  // ─── Écran succès ─────────────────────────────────────────────────────────

  if (success)
    return (
      <div className="site-main">
        <Header />
        <PageHeader title={t("registration")} breadcrumb={t("registration")} />
        <div className="ttm-row clearfix">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8">
                <div className="p-50 p-lg-20 box-shadow text-center">
                  <div className="layer-content">
                    <div className="copa-verify-icon copa-verify-icon--success mx-auto">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-15">{t("registrationSuccessTitle")}</h3>
                    <p
                      className="mb-30"
                      style={{ fontSize: 14, color: "#777" }}
                    >
                      {t("registrationSuccessMessage").replace("{email}", form.email)}
                    </p>
                    <Link
                      to="/login"
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor me-2"
                    >
                      {t("signIn")}
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setForm(INITIAL);
                        setStep(1);
                        setSuccess(false);
                      }}
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
                    >
                      {t("createNewAccount")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );

  // ─── Rendu principal ──────────────────────────────────────────────────────

  return (
    <div className="site-main">
      <Header />
      <PageHeader
        title={t("creatingCopaAccount")}
        breadcrumb={t("registration")}
      />

      <div className="ttm-row clearfix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-9 col-md-11">
              {/* ── Stepper copa ── */}
              <div className="copa-stepper">
                {STEPS.map((s, i) => (
                  <React.Fragment key={s.num}>
                    <div
                      className={`copa-step ${step === s.num ? "is-active" : ""} ${step > s.num ? "is-done" : ""}`}
                    >
                      <div className="copa-step__dot">
                        {step > s.num ? (
                          <svg
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M2 6l3 3 5-5" strokeLinecap="round" />
                          </svg>
                        ) : step === s.num ? (
                          <span className="copa-dot-pulse" />
                        ) : (
                          <span>{s.num}</span>
                        )}
                      </div>
                      <span className="copa-step__label">{s.label}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`copa-step-line ${step > s.num ? "is-filled" : ""}`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* ── Carte ── */}
              <div className="bg-theme-GreyColor p-50 p-lg-20 box-shadow">
                <div className="layer-content">
                  {/* En-tête étape */}
                  <div className="d-flex justify-content-between align-items-center mb-30">
                    <div>
                      <p
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#999",
                          margin: "0 0 4px",
                        }}
                      >
                        Étape {step} sur 3
                      </p>
                      <h4 style={{ margin: 0 }}>{STEPS[step - 1].label}</h4>
                    </div>
                    {/* Anneau de progression */}
                    <svg
                      viewBox="0 0 44 44"
                      style={{ width: 44, height: 44, flexShrink: 0 }}
                    >
                      <circle
                        cx="22"
                        cy="22"
                        r="18"
                        fill="none"
                        stroke="#dde2ea"
                        strokeWidth="3.5"
                      />
                      <circle
                        cx="22"
                        cy="22"
                        r="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeDasharray={`${(step / 3) * 113} 113`}
                        strokeLinecap="round"
                        transform="rotate(-90 22 22)"
                        className="text-theme-SkinColor"
                        style={{ transition: "stroke-dasharray 0.5s ease" }}
                      />
                      <text
                        x="22"
                        y="27"
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="700"
                        fill="currentColor"
                        className="text-theme-SkinColor"
                      >
                        {Math.round((step / 3) * 100)}%
                      </text>
                    </svg>
                  </div>

                  {/* Formulaire — wrap-form register_form (framework) */}
                  <form
                    className="wrap-form register_form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleNext();
                    }}
                    noValidate
                  >
                    <div className="row">
                      {/* ════════ ÉTAPE 1 ════════ */}
                      {step === 1 && (
                        <>
                          <div className="col-12">
                            <label
                              className={
                                errors.entrepreneurType
                                  ? "copa-input-invalid"
                                  : ""
                              }
                            >
                              <i className="ti ti-id-badge" />
                              <select
                                value={form.entrepreneurType}
                                onChange={(e) =>
                                  upd("entrepreneurType", e.target.value as any)
                                }
                              >
                                <option value="">
                                  {t("selectYourStatus")}
                                </option>
                                <option value="burundian">
                                  {t("burundianEntrepreneur")}
                                </option>
                                <option value="refugee">
                                  {t("refugeeEntrepreneur")}
                                </option>
                              </select>
                            </label>
                            {errors.entrepreneurType && (
                              <span className="copa-error-msg">
                                {errors.entrepreneurType}
                              </span>
                            )}
                          </div>

                          <div className="col-lg-6">
                            <label
                              className={
                                errors.firstName ? "copa-input-invalid" : ""
                              }
                            >
                              <i className="ti ti-user" />
                              <input
                                type="text"
                                value={form.firstName}
                                onChange={(e) =>
                                  upd("firstName", e.target.value)
                                }
                                placeholder={t("firstName")}
                              />
                            </label>
                            {errors.firstName && (
                              <span className="copa-error-msg">
                                {errors.firstName}
                              </span>
                            )}
                          </div>

                          <div className="col-lg-6">
                            <label
                              className={
                                errors.lastName ? "copa-input-invalid" : ""
                              }
                            >
                              <i className="ti ti-user" />
                              <input
                                type="text"
                                value={form.lastName}
                                onChange={(e) =>
                                  upd("lastName", e.target.value)
                                }
                                placeholder={t("lastName")}
                              />
                            </label>
                            {errors.lastName && (
                              <span className="copa-error-msg">
                                {errors.lastName}
                              </span>
                            )}
                          </div>

                          <div className="col-lg-6">
                            <label
                              className={
                                errors.gender ? "copa-input-invalid" : ""
                              }
                            >
                              <i className="ti ti-anchor" />
                              <select
                                value={form.gender}
                                onChange={(e) =>
                                  upd("gender", e.target.value as any)
                                }
                              >
                                <option value="">
                                  {t("selectYourGender")}
                                </option>
                                <option value="M">{t("male")}</option>
                                <option value="F">{t("female")}</option>
                              </select>
                            </label>
                            {errors.gender && (
                              <span className="copa-error-msg">
                                {errors.gender}
                              </span>
                            )}
                          </div>

                          <div className="col-lg-6">
                            <label
                              className={
                                errors.birthDate ? "copa-input-invalid" : ""
                              }
                            >
                              <i className="ti ti-calendar" />
                              <input
                                type="date"
                                value={form.birthDate}
                                onChange={(e) =>
                                  upd("birthDate", e.target.value)
                                }
                                max={
                                  new Date(
                                    new Date().setFullYear(
                                      new Date().getFullYear() - 18,
                                    ),
                                  )
                                    .toISOString()
                                    .split("T")[0]
                                }
                              />
                            </label>
                            {errors.birthDate && (
                              <span className="copa-error-msg">
                                {errors.birthDate}
                              </span>
                            )}
                          </div>

                          <div className="col-lg-6">
                            <label
                              className={
                                errors.email ? "copa-input-invalid" : ""
                              }
                            >
                              <i className="ti ti-email" />
                              <input
                                type="email"
                                value={form.email}
                                onChange={(e) => upd("email", e.target.value)}
                                placeholder={t("email")}
                              />
                            </label>
                            {errors.email && (
                              <span className="copa-error-msg">
                                {errors.email}
                              </span>
                            )}
                          </div>

                          <div className="col-lg-6">
                            <label
                              className={
                                errors.phone ? "copa-input-invalid" : ""
                              }
                            >
                              <i className="ti ti-mobile" />
                              <input
                                type="tel"
                                value={form.phone}
                                onChange={(e) => upd("phone", e.target.value)}
                                placeholder={t("phoneNumber")}
                              />
                            </label>
                            {errors.phone && (
                              <span className="copa-error-msg">
                                {errors.phone}
                              </span>
                            )}
                          </div>

                          <div className="col-lg-6">
                            <label
                              className={
                                errors.provinceId ? "copa-input-invalid" : ""
                              }
                            >
                              <i className="ti ti-map" />
                              <select
                                value={String(form.provinceId)}
                                onChange={(e) =>
                                  upd(
                                    "provinceId",
                                    e.target.value ? +e.target.value : "",
                                  )
                                }
                              >
                                <option value="">
                                  {loadProv
                                    ? t("loading")
                                    : t("selectProvince")}
                                </option>
                                {provinces.map((p) => (
                                  <option key={p.id} value={p.id}>
                                    {p.name}
                                  </option>
                                ))}
                              </select>
                            </label>
                            {errors.provinceId && (
                              <span className="copa-error-msg">
                                {errors.provinceId}
                              </span>
                            )}
                          </div>

                          <div className="col-lg-6">
                            <label
                              className={
                                errors.communeId ? "copa-input-invalid" : ""
                              }
                            >
                              <i className="ti ti-map-alt" />
                              <select
                                value={String(form.communeId)}
                                onChange={(e) =>
                                  upd(
                                    "communeId",
                                    e.target.value ? +e.target.value : "",
                                  )
                                }
                                disabled={!form.provinceId}
                              >
                                <option value="">
                                  {loadComm
                                    ? t("loading")
                                    : !form.provinceId
                                      ? t("selectProvinceFirst")
                                      : t("selectCommune")}
                                </option>
                                {communes.map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {isKi && c.name_ki ? c.name_ki : c.name}
                                  </option>
                                ))}
                              </select>
                            </label>
                            {errors.communeId && (
                              <span className="copa-error-msg">
                                {errors.communeId}
                              </span>
                            )}
                          </div>

                          <div className="col-lg-6">
                            <label
                              className={
                                errors.password ? "copa-input-invalid" : ""
                              }
                            >
                              <i className="ti ti-lock" />
                              <input
                                type="password"
                                value={form.password}
                                onChange={(e) =>
                                  upd("password", e.target.value)
                                }
                                placeholder={t("password")}
                              />
                            </label>
                            {errors.password && (
                              <span className="copa-error-msg">
                                {errors.password}
                              </span>
                            )}
                          </div>

                          <div className="col-lg-6">
                            <label
                              className={
                                errors.confirmPassword
                                  ? "copa-input-invalid"
                                  : ""
                              }
                            >
                              <i className="ti ti-lock" />
                              <input
                                type="password"
                                value={form.confirmPassword}
                                onChange={(e) =>
                                  upd("confirmPassword", e.target.value)
                                }
                                placeholder={t("confirmPassword")}
                              />
                            </label>
                            {errors.confirmPassword && (
                              <span className="copa-error-msg">
                                {errors.confirmPassword}
                              </span>
                            )}
                          </div>
                        </>
                      )}

                      {/* ════════ ÉTAPE 2 ════════ */}
                      {step === 2 && (
                        <>
                          <div className="col-12">
                            <p
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#444",
                                marginBottom: 10,
                              }}
                            >
                              {t("haveCompany")}{" "}
                              <span style={{ color: "#dc3545" }}>*</span>
                            </p>
                            {/* Radio cards copa */}
                            <div className="copa-radio-cards">
                              {[
                                {
                                  value: "formal",
                                  icon: "ti-home",
                                  name: t("formalCompany"),
                                  desc: "Entreprise officielle enregistrée",
                                },
                                {
                                  value: "informal",
                                  icon: "ti-bag",
                                  name: t("informalCompany"),
                                  desc: "Activité non enregistrée",
                                },
                                {
                                  value: "project",
                                  icon: "ti-face-sad",
                                  name: t("projectCompany"),
                                  desc: "Projet en cours de création",
                                },
                              ].map((s) => (
                                <label
                                  key={s.value}
                                  className={`copa-radio-card ${form.companyStatus === s.value ? "is-selected" : ""}`}
                                >
                                  <input
                                    type="radio"
                                    name="status"
                                    value={s.value}
                                    checked={form.companyStatus === s.value}
                                    onChange={(e) =>
                                      upd(
                                        "companyStatus",
                                        e.target.value as any,
                                      )
                                    }
                                  />
                                  <span className="copa-radio-card__check">
                                    <svg
                                      viewBox="0 0 10 10"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2.5"
                                    >
                                      <path
                                        d="M1.5 5l2.5 2.5 5-5"
                                        strokeLinecap="round"
                                      />
                                    </svg>
                                  </span>
                                  <span className="copa-radio-card__icon">
                                    {/* <i className={`ti ${s.icon}`}></i> */}
                                  </span>
                                  <span className="copa-radio-card__name">
                                    {s.name}
                                  </span>
                                  <span className="copa-radio-card__desc">
                                    {s.desc}
                                  </span>
                                </label>
                              ))}
                            </div>
                            {errors.companyStatus && (
                              <span className="copa-error-msg">
                                {errors.companyStatus}
                              </span>
                            )}
                          </div>

                          {(form.companyStatus === "formal" ||
                            form.companyStatus === "informal") && (
                            <>
                              <div className="col-lg-6">
                                <label
                                  className={
                                    errors.companyName
                                      ? "copa-input-invalid"
                                      : ""
                                  }
                                >
                                  <i className="ti ti-briefcase" />
                                  <input
                                    type="text"
                                    value={form.companyName}
                                    onChange={(e) =>
                                      upd("companyName", e.target.value)
                                    }
                                    placeholder={t("companyName")}
                                  />
                                </label>
                                {errors.companyName && (
                                  <span className="copa-error-msg">
                                    {errors.companyName}
                                  </span>
                                )}
                              </div>

                              <div className="col-lg-6">
                                <label
                                  className={
                                    errors.nif ? "copa-input-invalid" : ""
                                  }
                                >
                                  <i className="ti ti-id-badge" />
                                  <input
                                    type="text"
                                    value={form.nif}
                                    onChange={(e) => upd("nif", e.target.value)}
                                    placeholder={t("nif")}
                                  />
                                </label>
                                {errors.nif && (
                                  <span className="copa-error-msg">
                                    {errors.nif}
                                  </span>
                                )}
                              </div>

                              <div className="col-lg-6">
                                <label
                                  className={
                                    errors.creationYear
                                      ? "copa-input-invalid"
                                      : ""
                                  }
                                >
                                  <i className="ti ti-calendar" />
                                  <input
                                    type="number"
                                    value={String(form.creationYear)}
                                    onChange={(e) =>
                                      upd(
                                        "creationYear",
                                        e.target.value ? +e.target.value : "",
                                      )
                                    }
                                    placeholder={t("creationYear")}
                                  />
                                </label>
                                {errors.creationYear && (
                                  <span className="copa-error-msg">
                                    {errors.creationYear}
                                  </span>
                                )}
                              </div>

                              <div className="col-lg-6">
                                <label
                                  className={
                                    errors.sectorId ? "copa-input-invalid" : ""
                                  }
                                >
                                  <i className="ti ti-briefcase" />
                                  <select
                                    value={String(form.sectorId)}
                                    onChange={(e) =>
                                      upd(
                                        "sectorId",
                                        e.target.value ? +e.target.value : "",
                                      )
                                    }
                                  >
                                    <option value="">
                                      {loadSect
                                        ? t("loading")
                                        : t("selectSector")}
                                    </option>
                                    {sectors.map((s) => (
                                      <option key={s.id} value={s.id}>
                                        {isKi && s.nameRn ? s.nameRn : s.nameFr}
                                      </option>
                                    ))}
                                  </select>
                                </label>
                                {errors.sectorId && (
                                  <span className="copa-error-msg">
                                    {errors.sectorId}
                                  </span>
                                )}
                              </div>

                              <div className="col-12">
                                <label
                                  className={
                                    errors.activityDescription
                                      ? "copa-input-invalid"
                                      : ""
                                  }
                                >
                                  <textarea
                                    rows={4}
                                    value={form.activityDescription}
                                    onChange={(e) =>
                                      upd("activityDescription", e.target.value)
                                    }
                                    placeholder={t("activityDescription")}
                                    style={{ paddingLeft: 15 }}
                                  />
                                </label>
                                {errors.activityDescription && (
                                  <span className="copa-error-msg">
                                    {errors.activityDescription}
                                  </span>
                                )}
                              </div>

                              <div className="col-lg-6">
                                <label
                                  className={
                                    errors.employeeCount
                                      ? "copa-input-invalid"
                                      : ""
                                  }
                                >
                                  <i className="fa fa-users" />
                                  <input
                                    type="number"
                                    value={String(form.employeeCount)}
                                    onChange={(e) =>
                                      upd(
                                        "employeeCount",
                                        e.target.value ? +e.target.value : "",
                                      )
                                    }
                                    placeholder={t("employeeCount")}
                                  />
                                </label>
                                {errors.employeeCount && (
                                  <span className="copa-error-msg">
                                    {errors.employeeCount}
                                  </span>
                                )}
                              </div>

                              <div className="col-lg-6">
                                <label>
                                  <i className="ti ti-money" />
                                  <input
                                    type="number"
                                    value={String(form.annualRevenue)}
                                    onChange={(e) =>
                                      upd(
                                        "annualRevenue",
                                        e.target.value ? +e.target.value : "",
                                      )
                                    }
                                    placeholder={t("annualRevenue")}
                                  />
                                </label>
                              </div>
                            </>
                          )}
                        </>
                      )}

                      {/* ════════ ÉTAPE 3 ════════ */}
                      {step === 3 && (
                        <>
                          <div className="col-12">
                            {/* Bannière info — copa */}
                            <div className="copa-validation-banner">
                              <svg
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <div>
                                <strong>
                                  Dernière étape — vérifiez vos informations
                                </strong>
                                <p>
                                  Lisez et cochez chaque case pour soumettre
                                  votre inscription.
                                </p>
                              </div>
                            </div>

                            {/* Checkboxes copa */}
                            <div className="copa-checklist">
                              {[
                                {
                                  key: "acceptTerms" as const,
                                  label: t("acceptTerms"),
                                  link: "/conditions-utilisation",
                                  required: true,
                                },
                                {
                                  key: "acceptPrivacy" as const,
                                  label: t("acceptPrivacy"),
                                  link: "/politique-confidentialite",
                                  required: true,
                                },
                                {
                                  key: "certifyAccuracy" as const,
                                  label: t("certifyAccuracy"),
                                  link: null,
                                  required: true,
                                },
                                {
                                  key: "acceptNotifications" as const,
                                  label: t("acceptNotifications"),
                                  link: null,
                                  required: false,
                                },
                              ].map((item) => (
                                <label
                                  key={item.key}
                                  className={`copa-check-row ${form[item.key] ? "is-checked" : ""} ${errors[item.key] ? "is-invalid" : ""}`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={form[item.key] as boolean}
                                    onChange={(e) =>
                                      upd(item.key, e.target.checked as any)
                                    }
                                  />
                                  <span className="copa-check-row__box">
                                    <svg
                                      viewBox="0 0 10 10"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2.5"
                                    >
                                      <path
                                        d="M1.5 5l2.5 2.5 5-5"
                                        strokeLinecap="round"
                                      />
                                    </svg>
                                  </span>
                                  <span className="copa-check-row__text">
                                    {item.label}
                                    {item.required && (
                                      <span style={{ color: "#dc3545" }}>
                                        {" "}
                                        *
                                      </span>
                                    )}
                                    {item.link && (
                                      <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="copa-check-row__link"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        Lire →
                                      </a>
                                    )}
                                    {errors[item.key] && (
                                      <span className="copa-check-row__error">
                                        {errors[item.key]}
                                      </span>
                                    )}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {/* ════════ Navigation ════════ */}
                      <div className="col-12 mt-25">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            {step === 1 && (
                              <p style={{ fontSize: 13, margin: 0 }}>
                                Déjà un compte ?{" "}
                                <Link
                                  to="/login"
                                  className="text-theme-SkinColor fw-bold"
                                >
                                  Se connecter
                                </Link>
                              </p>
                            )}
                          </div>
                          <div className="d-flex" style={{ gap: 10 }}>
                            {step > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  setStep(step - 1);
                                  window.scrollTo(0, 0);
                                }}
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
                              >
                                ← {t("previous")}
                              </button>
                            )}
                            <button
                              type="submit"
                              disabled={submitting}
                              className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                            >
                              {submitting ? (
                                <>
                                  <span className="copa-spinner" />
                                  Envoi en cours…
                                </>
                              ) : step === 3 ? (
                                `✓ ${t("createAccount")}`
                              ) : (
                                `${t("next")} →`
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
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

export default Register;
