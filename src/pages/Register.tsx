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

interface StepProps {
  formData: FormData;
  updateFormData: <K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ) => void;
  errors: Partial<Record<keyof FormData, string>>;
  provinces?: Province[];
  communes?: Commune[];
  sectors?: Sector[];
  loading?: { provinces: boolean; communes: boolean; sectors: boolean };
}

const initialFormData: FormData = {
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

// ─── Main Component ───────────────────────────────────────────────────────────

const Register: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState({
    provinces: false,
    communes: false,
    sectors: false,
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading((p) => ({ ...p, provinces: true }));
      try {
        setProvinces(await ReferenceService.getAllPovinces(lang));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading((p) => ({ ...p, provinces: false }));
      }
    };
    const fetchSectors = async () => {
      setLoading((p) => ({ ...p, sectors: true }));
      try {
        setSectors(await ReferenceService.getBusinessSectors(true, lang));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading((p) => ({ ...p, sectors: false }));
      }
    };
    fetchProvinces();
    fetchSectors();
  }, []);

  useEffect(() => {
    const fetchCommunes = async () => {
      if (!formData.provinceId) {
        setCommunes([]);
        return;
      }
      setLoading((p) => ({ ...p, communes: true }));
      try {
        const res: Commune[] = await ReferenceService.getCommunesByProvince(
          formData.provinceId,
          lang,
        );
        setCommunes(res);
        if (
          formData.communeId &&
          !res.some((c: Commune) => c.id === formData.communeId)
        )
          updateFormData("communeId", "");
      } catch (e) {
        console.error(e);
      } finally {
        setLoading((p) => ({ ...p, communes: false }));
      }
    };
    fetchCommunes();
  }, [formData.provinceId]);

  const updateFormData = <K extends keyof FormData>(
    field: K,
    value: FormData[K],
  ) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validateStep1 = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!formData.entrepreneurType) e.entrepreneurType = t("required");
    if (!formData.firstName.trim()) e.firstName = t("required");
    if (!formData.lastName.trim()) e.lastName = t("required");
    if (!formData.gender) e.gender = t("required");
    if (!formData.birthDate) e.birthDate = t("required");
    else if (
      new Date().getFullYear() - new Date(formData.birthDate).getFullYear() <
      18
    )
      e.birthDate = t("birthDateInvalid");
    if (!formData.email) e.email = t("required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = t("emailInvalid");
    if (!formData.phone) e.phone = t("required");
    if (!formData.provinceId) e.provinceId = t("required");
    if (!formData.communeId) e.communeId = t("required");
    if (!formData.password) e.password = t("required");
    else if (formData.password.length < 8) e.password = t("passwordMinLength");
    else if (!/[A-Z]/.test(formData.password))
      e.password = t("passwordUppercase");
    else if (!/\d/.test(formData.password)) e.password = t("passwordNumber");
    if (formData.password !== formData.confirmPassword)
      e.confirmPassword = t("passwordMismatch");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!formData.companyStatus) e.companyStatus = t("required");
    if (
      formData.companyStatus === "formal" ||
      formData.companyStatus === "informal"
    ) {
      if (!formData.companyName.trim()) e.companyName = t("required");
      if (!formData.creationYear) e.creationYear = t("required");
      else if (
        formData.creationYear < 1900 ||
        formData.creationYear > new Date().getFullYear()
      )
        e.creationYear = t("creationYearInvalid");
      if (!formData.sectorId) e.sectorId = t("required");
      if (!formData.activityDescription.trim())
        e.activityDescription = t("required");
      else if (formData.activityDescription.length < 100)
        e.activityDescription = t("descriptionMinLength");
      if (!formData.employeeCount) e.employeeCount = t("required");
      if (formData.nif && !/^\d{9,13}$/.test(formData.nif))
        e.nif = t("nifInvalid");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!formData.acceptTerms) e.acceptTerms = t("acceptTermsRequired");
    if (!formData.acceptPrivacy) e.acceptPrivacy = t("acceptPrivacyRequired");
    if (!formData.certifyAccuracy) e.certifyAccuracy = t("certifyRequired");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo(0, 0);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      window.scrollTo(0, 0);
    } else if (currentStep === 3 && validateStep3()) {
      setIsSubmitting(true);
      try {
        await AuthService.signup(
          {
            step1: {
              entrepreneurType: formData.entrepreneurType,
              firstName: formData.firstName,
              lastName: formData.lastName,
              gender: formData.gender,
              birthDate: formData.birthDate,
              email: formData.email,
              phone: formData.phone,
              provinceId: formData.provinceId,
              communeId: formData.communeId,
              password: formData.password,
              passwordConfirmation: formData.confirmPassword,
            },
            step2: {
              companyStatus: formData.companyStatus,
              companyExists:
                formData.companyStatus !== "project" ? "yes" : "no",
              companyName: formData.companyName,
              nif: formData.nif,
              creationYear: formData.creationYear,
              sectorId: formData.sectorId,
              activityDescription: formData.activityDescription,
              employeeCount: formData.employeeCount,
              annualRevenue: formData.annualRevenue,
            },
            step3: {
              acceptCGU: formData.acceptTerms,
              acceptPrivacyPolicy: formData.acceptPrivacy,
              certifyAccuracy: formData.certifyAccuracy,
              optInNotifications: formData.acceptNotifications,
            },
          },
          lang,
        );
        setIsSuccess(true);
        toast.success(t("registrationSuccessMessage"));
        resetForm();
      } catch (err) {
        toast.error(err as string);
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setIsSuccess(false);
    setErrors({});
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setIsSuccess(false);
    setErrors({});
  };

  const stepsMeta = [
    { num: 1, label: t("basicInformation") },
    { num: 2, label: t("companyInformation") },
    { num: 3, label: t("validation") },
  ];

  // if (isSuccess) {
  //   return (
  //     <div className="site-main">
  //       <Header />
  //       <PageHeader title={t("creatingCopaAccount")} breadcrumb={t("registration")} />
  //       <section className="rg-section">
  //         <div className="rg-container rg-container--narrow">
  //           <div className="rg-success">
  //             <div className="rg-success__ring">
  //               <svg
  //                 viewBox="0 0 24 24"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 strokeWidth="2.5"
  //               >
  //                 <path
  //                   d="M20 6L9 17l-5-5"
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                 />
  //               </svg>
  //             </div>
  //             <h2>{t("successTitle")}</h2>
  //             <p>{t("successMessage").replace("{email}", formData.email)}</p>
  //             <div className="rg-success__actions">
  //               <Link to="/login" className="rg-btn rg-btn--primary">
  //                 {t("signIn")}
  //               </Link>
  //               <button onClick={handleReset} className="rg-btn rg-btn--ghost">
  //                 {t("createNewAccount")}
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //       <Footer />
  //       <Styles />
  //     </div>
  //   );
  // }

  return (
    <div className="site-main">
      <Header />
      <PageHeader title={t("creatingCopaAccount")} breadcrumb={t("registration")} />
      <section className="rg-section">
        <div className="rg-container container">
          {/* ── Stepper ── */}
          <div className="rg-stepper">
            {stepsMeta.map((s, i) => (
              <React.Fragment key={s.num}>
                <div
                  className={`rg-step ${currentStep === s.num ? "is-active" : ""} ${currentStep > s.num ? "is-done" : ""}`}
                >
                  <div className="rg-step__dot">
                    {currentStep > s.num ? (
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <span>{s.num}</span>
                    )}
                  </div>
                  <span className="rg-step__label">{s.label}</span>
                </div>
                {i < stepsMeta.length - 1 && (
                  <div
                    className={`rg-step__line ${currentStep > s.num ? "is-filled" : ""}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* ── Card ── */}
          <div className="rg-card">
            <div className="rg-card__head">
              <div className="rg-card__head-left">
                <p className="rg-card__eyebrow">Étape {currentStep} sur 3</p>
                <h2 className="rg-card__title">
                  {stepsMeta[currentStep - 1].label}
                </h2>
              </div>
              <div className="rg-card__progress-ring">
                <svg viewBox="0 0 44 44">
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="#EEF0F4"
                    strokeWidth="3.5"
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="#1A3A5C"
                    strokeWidth="3.5"
                    strokeDasharray={`${(currentStep / 3) * 113} 113`}
                    strokeLinecap="round"
                    transform="rotate(-90 22 22)"
                    style={{ transition: "stroke-dasharray 0.5s ease" }}
                  />
                  <text
                    x="22"
                    y="27"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#1A3A5C"
                  >
                    {Math.round((currentStep / 3) * 100)}%
                  </text>
                </svg>
              </div>
            </div>

            <div className="rg-divider" />

            <form onSubmit={handleSubmit} noValidate className="rg-card__body">
              {currentStep === 1 && (
                <Step1
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                  provinces={provinces}
                  communes={communes}
                  loading={loading}
                />
              )}
              {currentStep === 2 && (
                <Step2
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                  sectors={sectors}
                />
              )}
              {currentStep === 3 && (
                <Step3
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                />
              )}
            </form>

            <div className="rg-divider" />

            <div className="rg-card__foot">
              <div className="rg-card__foot-left">
                {currentStep === 1 && (
                  <p className="rg-card__login-hint">
                    {t("alreadyHaveAccount")}{" "}
                    <Link to="/login" className="rg-link">
                      {t("signIn")}
                    </Link>
                  </p>
                )}
              </div>
              <div className="rg-card__foot-right">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="rg-btn rg-btn--ghost"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M10 3L5 8l5 5" strokeLinecap="round" />
                    </svg>
                    {t("previous")}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rg-btn rg-btn--primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="rg-spinner" />
                  ) : currentStep === 3 ? (
                    <>
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M2 8l4 4 8-8" strokeLinecap="round" />
                      </svg>
                      {t("createAccount")}
                    </>
                  ) : (
                    <>
                      {t("next")}
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 3l5 5-5 5" strokeLinecap="round" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Styles />
    </div>
  );
};

// ─── Step 1 ───────────────────────────────────────────────────────────────────

const Step1: React.FC<StepProps> = ({
  formData,
  updateFormData,
  errors,
  provinces,
  communes,
  loading,
}) => {
  const { t, i18n } = useTranslation();
  const isKirundi = i18n.language === "rn";

  return (
    <div className="rg-grid">
      <Field label={t("youAre")} error={errors.entrepreneurType} required>
        <Sel
          value={formData.entrepreneurType}
          onChange={(v) => updateFormData("entrepreneurType", v as any)}
          invalid={!!errors.entrepreneurType}
          placeholder={t("selectYourStatus")}
          options={[
            { value: "burundian", label: t("burundianEntrepreneur") },
            { value: "refugee", label: t("refugeeEntrepreneur") },
          ]}
        />
      </Field>

      <Field label={t("firstName")} error={errors.firstName} required>
        <Inp
          type="text"
          value={formData.firstName}
          onChange={(v) => updateFormData("firstName", v)}
          invalid={!!errors.firstName}
          placeholder={t("firstName")}
          icon="user"
        />
      </Field>

      <Field label={t("lastName")} error={errors.lastName} required>
        <Inp
          type="text"
          value={formData.lastName}
          onChange={(v) => updateFormData("lastName", v)}
          invalid={!!errors.lastName}
          placeholder={t("lastName")}
          icon="user"
        />
      </Field>

      <Field label={t("gender")} error={errors.gender} required>
        <Sel
          value={formData.gender}
          onChange={(v) => updateFormData("gender", v as any)}
          invalid={!!errors.gender}
          placeholder={t("selectYourGender")}
          options={[
            { value: "M", label: t("male") },
            { value: "F", label: t("female") },
          ]}
        />
      </Field>

      <Field label={t("birthDate")} error={errors.birthDate} required>
        <Inp
          type="date"
          value={formData.birthDate}
          onChange={(v) => updateFormData("birthDate", v)}
          invalid={!!errors.birthDate}
          max={
            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              .toISOString()
              .split("T")[0]
          }
          icon="calendar"
        />
      </Field>

      <Field label={t("email")} error={errors.email} required>
        <Inp
          type="email"
          value={formData.email}
          onChange={(v) => updateFormData("email", v)}
          invalid={!!errors.email}
          placeholder={t("email")}
          icon="mail"
        />
      </Field>

          <div className="rg-col-full">
      <Field label={t("phoneNumber")} error={errors.phone} required>
        <Inp
          type="tel"
          value={formData.phone}
          onChange={(v) => updateFormData("phone", v)}
          invalid={!!errors.phone}
          placeholder={t("phoneNumber")}
          icon="phone"
        />
      </Field></div>

      <Field label={t("selectProvince")} error={errors.provinceId} required>
        <Sel
          value={String(formData.provinceId)}
          onChange={(v) => updateFormData("provinceId", v ? parseInt(v) : "")}
          invalid={!!errors.provinceId}
          placeholder={loading?.provinces ? t("loading") : t("selectProvince")}
          options={
            provinces?.map((p) => ({ value: String(p.id), label: p.name })) ||
            []
          }
        />
      </Field>

      <Field label={t("selectCommune")} error={errors.communeId} required>
        <Sel
          value={String(formData.communeId)}
          onChange={(v) => updateFormData("communeId", v ? parseInt(v) : "")}
          invalid={!!errors.communeId}
          disabled={!formData.provinceId}
          placeholder={
            loading?.communes
              ? t("loading")
              : !formData.provinceId
                ? t("selectProvinceFirst")
                : t("selectCommune")
          }
          options={
            communes?.map((c) => ({
              value: String(c.id),
              label: isKirundi && c.name_ki ? c.name_ki : c.name,
            })) || []
          }
        />
      </Field>

      <Field
        label={t("password")}
        error={errors.password}
        required
        hint={t("passwordHint")}
      >
        <Inp
          type="password"
          value={formData.password}
          onChange={(v) => updateFormData("password", v)}
          invalid={!!errors.password}
          placeholder={t("password")}
          icon="lock"
        />
      </Field>

      <Field
        label={t("confirmPassword")}
        error={errors.confirmPassword}
        required
      >
        <Inp
          type="password"
          value={formData.confirmPassword}
          onChange={(v) => updateFormData("confirmPassword", v)}
          invalid={!!errors.confirmPassword}
          placeholder={t("confirmPassword")}
          icon="lock"
        />
      </Field>
    </div>
  );
};

// ─── Step 2 ───────────────────────────────────────────────────────────────────

const Step2: React.FC<StepProps> = ({
  formData,
  updateFormData,
  errors,
  sectors,
}) => {
  const { t, i18n } = useTranslation();
  const isKirundi = i18n.language === "rn";
  const hasCompany =
    formData.companyStatus === "formal" ||
    formData.companyStatus === "informal";

  const statuses = [
    {
      value: "formal",
      label: t("formalCompany"),
      icon: "🏛️",
      desc: "Entreprise officielle enregistrée",
    },
    {
      value: "informal",
      label: t("informalCompany"),
      icon: "🤝",
      desc: "Activité non enregistrée",
    },
    {
      value: "project",
      label: t("projectCompany"),
      icon: "💡",
      desc: "Projet en cours de création",
    },
  ];

  return (
    <div className="rg-grid">
      <div className="rg-col-full">
        <label className="rg-label">
          {t("haveCompany")} <span className="rg-required">*</span>
        </label>
        <div className="rg-status-cards">
          {statuses.map((s) => (
            <label
              key={s.value}
              className={`rg-status-card ${formData.companyStatus === s.value ? "is-selected" : ""}`}
            >
              <input
                type="radio"
                name="companyStatus"
                value={s.value}
                checked={formData.companyStatus === s.value}
                onChange={(e) =>
                  updateFormData("companyStatus", e.target.value as any)
                }
              />
              <span className="rg-status-card__check">
                <svg
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M1.5 5l2.5 2.5 5-5" strokeLinecap="round" />
                </svg>
              </span>
              {/* <span className="rg-status-card__icon">{s.icon}</span> */}
              <span className="rg-status-card__name">{s.label}</span>
              <span className="rg-status-card__desc">{s.desc}</span>
            </label>
          ))}
        </div>
        {errors.companyStatus && (
          <span className="rg-error-msg">{errors.companyStatus}</span>
        )}
      </div>

      {hasCompany && (
        <>
          <Field label={t("companyName")} error={errors.companyName} required>
            <Inp
              type="text"
              value={formData.companyName}
              onChange={(v) => updateFormData("companyName", v)}
              invalid={!!errors.companyName}
              placeholder={t("companyName")}
              icon="building"
            />
          </Field>

          <Field label={t("nif")} error={errors.nif} required>
            <Inp
              type="text"
              value={formData.nif}
              onChange={(v) => updateFormData("nif", v)}
              invalid={!!errors.nif}
              placeholder={t("nif")}
              icon="id"
            />
          </Field>

          <Field label={t("creationYear")} error={errors.creationYear} required>
            <Inp
              type="number"
              value={String(formData.creationYear)}
              onChange={(v) =>
                updateFormData("creationYear", v ? parseInt(v) : "")
              }
              invalid={!!errors.creationYear}
              placeholder={t("creationYear")}
              icon="calendar"
            />
          </Field>

          <Field label={t("selectSector")} error={errors.sectorId} required>
            <Sel
              value={String(formData.sectorId)}
              onChange={(v) => updateFormData("sectorId", v ? parseInt(v) : "")}
              invalid={!!errors.sectorId}
              placeholder={t("selectSector")}
              options={
                sectors?.map((s) => ({
                  value: String(s.id),
                  label: isKirundi && s.nameRn ? s.nameRn : s.nameFr,
                })) || []
              }
            />
          </Field>

          <div className="rg-col-full">
            <Field
              label={t("activityDescription")}
              error={errors.activityDescription}
              required
            >
              <div
                className={`rg-textarea-wrap ${errors.activityDescription ? "is-invalid" : ""}`}
              >
                <textarea
                  rows={4}
                  value={formData.activityDescription}
                  onChange={(e) =>
                    updateFormData("activityDescription", e.target.value)
                  }
                  placeholder={t("activityDescription")}
                />
              </div>
            </Field>
          </div>

          <Field
            label={t("employeeCount")}
            error={errors.employeeCount}
            required
          >
            <Inp
              type="number"
              value={String(formData.employeeCount)}
              onChange={(v) =>
                updateFormData("employeeCount", v ? parseInt(v) : "")
              }
              invalid={!!errors.employeeCount}
              placeholder={t("employeeCount")}
              icon="users"
            />
          </Field>

          <Field label={t("annualRevenue")}>
            <Inp
              type="number"
              value={String(formData.annualRevenue)}
              onChange={(v) =>
                updateFormData("annualRevenue", v ? parseInt(v) : "")
              }
              placeholder={t("annualRevenue")}
              icon="money"
            />
          </Field>
        </>
      )}
    </div>
  );
};

// ─── Step 3 ───────────────────────────────────────────────────────────────────

const Step3: React.FC<StepProps> = ({ formData, updateFormData, errors }) => {
  const { t } = useTranslation();

  const items = [
    {
      key: "acceptTerms" as keyof FormData,
      label: t("acceptTerms"),
      link: "/terms",
      required: true,
    },
    {
      key: "acceptPrivacy" as keyof FormData,
      label: t("acceptPrivacy"),
      link: "/privacy",
      required: true,
    },
    {
      key: "certifyAccuracy" as keyof FormData,
      label: t("certifyAccuracy"),
      link: null,
      required: true,
    },
    {
      key: "acceptNotifications" as keyof FormData,
      label: t("acceptNotifications"),
      link: null,
      required: false,
    },
  ];

  return (
    <div className="rg-validation">
      <div className="rg-validation__banner">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <strong>Dernière étape</strong>
          <p>
            Veuillez lire et accepter les conditions pour finaliser votre
            inscription.
          </p>
        </div>
      </div>

      <div className="rg-checklist">
        {items.map((item) => (
          <label
            key={item.key}
            className={`rg-check-row ${(errors as any)[item.key] ? "is-invalid" : ""} ${(formData[item.key] as boolean) ? "is-checked" : ""}`}
          >
            <input
              type="checkbox"
              checked={formData[item.key] as boolean}
              onChange={(e) =>
                updateFormData(item.key, e.target.checked as any)
              }
            />
            <span className="rg-check-box">
              <svg
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M1.5 5l2.5 2.5 5-5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="rg-check-text">
              <span className="rg-check-main">
                {item.label}
                {item.required && <span className="rg-required"> *</span>}
              </span>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rg-check-link"
                >
                  Lire la politique →
                </a>
              )}
            </span>
            {(errors as any)[item.key] && (
              <span className="rg-check-error">
                {(errors as any)[item.key]}
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

// ─── Shared UI Primitives ─────────────────────────────────────────────────────

const ICONS: Record<string, React.ReactNode> = {
  user: (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M2 14c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" strokeLinecap="round" />
    </svg>
  ),
  mail: (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="1" y="3" width="14" height="10" rx="2" />
      <path d="M1 5l7 5 7-5" strokeLinecap="round" />
    </svg>
  ),
  phone: (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M3 2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-.71.95L5.5 5.5a9 9 0 004 4l.55-.79A1 1 0 0111 8h2a1 1 0 011 1v2a1 1 0 01-1 1C7.4 12 4 8.6 4 3a1 1 0 01-1-1z"
        strokeLinejoin="round"
      />
    </svg>
  ),
  lock: (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="7" width="10" height="8" rx="1" />
      <path d="M5 7V5a3 3 0 016 0v2" strokeLinecap="round" />
    </svg>
  ),
  calendar: (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="1" y="3" width="14" height="12" rx="2" />
      <path d="M1 7h14M5 1v4M11 1v4" strokeLinecap="round" />
    </svg>
  ),
  building: (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2 14V6l6-4 6 4v8H2z" />
      <path d="M6 14v-4h4v4" />
    </svg>
  ),
  id: (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="1" y="4" width="14" height="8" rx="1" />
      <path d="M5 8h6M5 10h3" strokeLinecap="round" />
    </svg>
  ),
  users: (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="5.5" cy="5" r="2.5" />
      <circle cx="10.5" cy="5" r="2.5" />
      <path d="M0 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5" strokeLinecap="round" />
      <path d="M10.5 9c3 0 5.5 2 5.5 5" strokeLinecap="round" />
    </svg>
  ),
  money: (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="8" cy="8" r="7" />
      <path
        d="M8 4v8M6 6h3a1 1 0 010 2H7a1 1 0 000 2h3"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const Inp: React.FC<{
  type: string;
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  placeholder?: string;
  icon?: string;
  max?: string;
}> = ({ type, value, onChange, invalid, placeholder, icon, max }) => (
  <div className={`rg-input-wrap ${invalid ? "is-invalid" : ""}`}>
    {icon && <span className="rg-input-icon">{ICONS[icon]}</span>}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      max={max}
    />
  </div>
);

const Sel: React.FC<{
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  disabled?: boolean;
  placeholder: string;
  options: { value: string; label: string }[];
}> = ({ value, onChange, invalid, disabled, placeholder, options }) => (
  <div className={`rg-select-wrap ${invalid ? "is-invalid" : ""}`}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6l4 4 4-4" strokeLinecap="round" />
    </svg>
  </div>
);

const Field: React.FC<{
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}> = ({ label, error, hint, required, children }) => (
  <div className="rg-field">
    <label className="rg-label">
      {label}
      {required && <span className="rg-required"> *</span>}
    </label>
    {children}
    {hint && <p className="rg-hint">{hint}</p>}
    {error && <span className="rg-error-msg">{error}</span>}
  </div>
);

const FieldSection: React.FC<{ label: string }> = ({ label }) => (
  <div className="rg-section-label">{label}</div>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const Styles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Lora:wght@600;700&display=swap');

    :root {
      --c-navy:    #1A3A5C;
      --c-navy-dk: #0F2540;
      --c-accent:  #C97B2E;
      --c-green:   #2E7D52;
      --c-red:     #C0392B;
      --c-bg:      #F7F7F7;
      --c-white:   #FFFFFF;
      --c-border:  rgba(0,0,0,.04);
      --c-text:    #1C2B3A;
      --c-muted:   #6B7A90;
      --c-shadow:  0 0 8px 0 rgba(0,0,0,.08);
      --r:         12px;
      --r-sm:      8px;
    }

    .rg-section {
      // font-family: 'DM Sans', sans-serif;
      background: var(--c-bg);
      padding: 100px 0 80px;
      min-height: 70vh;
    }

    // .rg-container { max-width: 780px; margin: 0 auto; padding: 0 20px; }
    .rg-container--narrow { max-width: 540px; }

    /* ── Stepper ── */
    .rg-stepper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32px;
    }

    .rg-step { display: flex; align-items: center; gap: 10px; }

    .rg-step__dot {
      width: 36px; height: 36px;
      border-radius: 50%;
      border: 2px solid var(--c-border);
      background: var(--c-white);
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700;
      color: var(--c-muted);
      transition: all 0.3s;
    }

    .rg-step__dot svg { width: 14px; height: 14px; }

    .rg-step.is-active .rg-step__dot {
      border-color: var(--c-navy);
      background: var(--c-navy);
      color: #fff;
      box-shadow: 0 0 0 4px rgba(26,58,92,0.15);
    }

    .rg-step.is-done .rg-step__dot {
      border-color: var(--c-green);
      background: var(--c-green);
      color: #fff;
    }

    .rg-step__label { font-size: 13px; font-weight: 600; color: var(--c-muted); white-space: nowrap; }
    .rg-step.is-active .rg-step__label { color: var(--c-navy); }
    .rg-step.is-done .rg-step__label { color: var(--c-green); }

    .rg-step__line {
      flex: 1;
      min-width: 40px;
      height: 2px;
      background: var(--c-border);
      margin: 0 12px;
      border-radius: 1px;
      position: relative;
      overflow: hidden;
    }

    .rg-step__line::after {
      content: '';
      position: absolute; inset: 0;
      background: var(--c-green);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s ease;
    }

    .rg-step__line.is-filled::after { transform: scaleX(1); }

    /* ── Card ── */
    .rg-card {
      background: var(--c-white);
      border-radius: 0.25rem;
      box-shadow: var(--c-shadow);
      // border: 1px solid var(--c-border);
      overflow: hidden;
    }

    .rg-card__head { padding: 28px 40px; display: flex; align-items: center; justify-content: space-between; }

    .rg-card__eyebrow {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.1em; color: var(--c-muted); margin: 0 0 6px;
    }

    .rg-card__title {
      // font-family: 'Lora', serif;
      font-size: 22px;
      font-weight: 700; color: var(--c-text); margin: 0;
    }

    .rg-card__progress-ring { width: 44px; height: 44px; }

    .rg-divider { height: 1px; background: var(--c-border); }

    .rg-card__body { padding: 36px 40px; }

    .rg-card__foot {
      padding: 20px 40px;
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      background: #FAFBFC;
    }

    .rg-card__foot-right { display: flex; gap: 10px; }
    .rg-card__login-hint { font-size: 13px; color: var(--c-muted); margin: 0; }
    .rg-link { color: var(--c-navy); font-weight: 600; text-decoration: none; }
    .rg-link:hover { color: var(--c-accent); }

    /* ── Fields Grid ── */
    .rg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 28px; }
    .rg-col-full { grid-column: 1 / -1; }

    .rg-section-label {
      font-size: 10.5px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.12em; color: var(--c-navy);
      padding-bottom: 10px;
      border-bottom: 2px solid var(--c-navy);
      display: inline-block;
    }

    .rg-field { display: flex; flex-direction: column; gap: 6px; }
    .rg-label { font-size: 13px; font-weight: 600; color: var(--c-text); }
    .rg-required { color: var(--c-red); }
    .rg-hint { font-size: 11.5px; color: var(--c-muted); margin: 2px 0 0; }
    .rg-error-msg { font-size: 11.5px; color: var(--c-red); font-weight: 500; margin-top: 2px; }

    /* ── Input ── */
    .rg-input-wrap, .rg-select-wrap { position: relative; display: flex; align-items: center; }

    .rg-input-icon {
      position: absolute; left: 12px;
      width: 15px; height: 15px;
      color: var(--c-muted);
      pointer-events: none;
      display: flex; align-items: center; justify-content: center;
    }
    .rg-input-icon svg { width: 15px; height: 15px; }

    .rg-input-wrap input {
      width: 100%;
      padding: 10px 14px 10px 36px;
      font-size: 14px;
      // font-family: 'DM Sans', sans-serif;
      color: var(--c-text);
      background: var(--c-bg);
      border: 1px solid var(--c-border);
      border-radius: var(--r-sm);
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    }

    .rg-input-wrap.is-invalid input { border-color: var(--c-red); }
    // .rg-input-wrap input:focus { border-color: var(--c-navy); background: #fff; box-shadow: 0 0 0 3px rgba(26,58,92,0.09); }

    /* ── Select ── */
    .rg-select-wrap select {
      width: 100%;
      padding: 10px 36px 10px 14px;
      font-size: 14px;
      // font-family: 'DM Sans', sans-serif;
      color: var(--c-text);
      background: var(--c-bg);
      border: 1px solid var(--c-border);
      border-radius: var(--r-sm);
      outline: none; appearance: none; -webkit-appearance: none; cursor: pointer;
      transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    }

    .rg-select-wrap > svg { position: absolute; right: 12px; width: 14px; height: 14px; color: var(--c-muted); pointer-events: none; }
    .rg-select-wrap.is-invalid select { border-color: var(--c-red); }
    // .rg-select-wrap select:focus { border-color: var(--c-navy); background: #fff; box-shadow: 0 0 0 3px rgba(26,58,92,0.09); }
    .rg-select-wrap select:disabled { opacity: 0.5; cursor: not-allowed; }

    /* ── Textarea ── */
    .rg-textarea-wrap textarea {
      width: 100%;
      padding: 11px 14px;
      font-size: 14px;
      // font-family: 'DM Sans', sans-serif;
      color: var(--c-text);
      background: var(--c-bg);
      border: 1px solid var(--c-border);
      border-radius: var(--r-sm);
      outline: none; resize: vertical; min-height: 100px; line-height: 1.6;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .rg-textarea-wrap.is-invalid textarea { border-color: var(--c-red); }
    // .rg-textarea-wrap textarea:focus { border-color: var(--c-navy); background: #fff; box-shadow: 0 0 0 3px rgba(26,58,92,0.09); }

    /* ── Status Cards ── */
    .rg-status-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 8px; }

    .rg-status-card {
      position: relative;
      border: 1px solid var(--c-border);
      border-radius: var(--r);
      padding: 18px 16px 16px;
      cursor: pointer;
      display: flex; flex-direction: column; gap: 3px;
      background: var(--c-bg);
      transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    }

    .rg-status-card input { position: absolute; opacity: 0; }
    .rg-status-card:hover { border-color: #aab5c4; background: #fff; }
    // .rg-status-card.is-selected { border-color: var(--c-navy); background: #fff; box-shadow: 0 0 0 3px rgba(26,58,92,0.08); }

    .rg-status-card__check {
      position: absolute; top: 10px; right: 10px;
      width: 20px; height: 20px; border-radius: 50%;
      border: 1px solid var(--c-border); background: var(--c-bg);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }

    .rg-status-card__check svg { width: 10px; height: 10px; opacity: 0; color: #fff; transition: opacity 0.15s; }
    .rg-status-card.is-selected .rg-status-card__check { background: var(--c-navy); border-color: var(--c-navy); }
    .rg-status-card.is-selected .rg-status-card__check svg { opacity: 1; }

    .rg-status-card__icon { font-size: 24px; margin-bottom: 6px; }
    .rg-status-card__name { font-size: 13px; font-weight: 700; color: var(--c-text); }
    .rg-status-card__desc { font-size: 11px; color: var(--c-muted); line-height: 1.4; }

    /* ── Validation ── */
    .rg-validation { display: flex; flex-direction: column; gap: 12px; }

    .rg-validation__banner {
      display: flex; gap: 14px; align-items: flex-start;
      padding: 16px 20px;
      background: #EFF3F8;
      border-radius: var(--r-sm);
      border-left: 3px solid var(--c-navy);
      margin-bottom: 8px;
    }

    .rg-validation__banner svg { width: 20px; height: 20px; color: var(--c-navy); flex-shrink: 0; margin-top: 1px; }
    .rg-validation__banner strong { display: block; font-size: 14px; color: var(--c-text); margin-bottom: 2px; }
    .rg-validation__banner p { font-size: 12.5px; color: var(--c-muted); margin: 0; }

    .rg-checklist { display: flex; flex-direction: column; gap: 10px; }

    .rg-check-row {
      display: grid;
      grid-template-columns: 22px 1fr;
      grid-template-rows: auto auto;
      gap: 0 12px;
      align-items: start;
      padding: 14px 18px;
      background: var(--c-bg);
      border: 1px solid var(--c-border);
      border-radius: var(--r-sm);
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
    }

    .rg-check-row:hover { border-color: #aab5c4; }
    .rg-check-row.is-checked { border-color: var(--c-navy); background: #F4F7FB; }
    .rg-check-row.is-invalid { border-color: var(--c-red); }
    .rg-check-row input { position: absolute; opacity: 0; pointer-events: none; }

    .rg-check-box {
      width: 20px; height: 20px;
      border: 2px solid var(--c-border); border-radius: 5px; background: #fff;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s; margin-top: 1px;
    }

    .rg-check-box svg { width: 10px; height: 10px; opacity: 0; transition: opacity 0.15s; color: #fff; stroke-width: 3; }
    .rg-check-row.is-checked .rg-check-box { background: var(--c-navy); border-color: var(--c-navy); }
    .rg-check-row.is-checked .rg-check-box svg { opacity: 1; }

    .rg-check-text { display: flex; flex-direction: column; gap: 3px; }
    .rg-check-main { font-size: 13.5px; color: var(--c-text); font-weight: 500; line-height: 1.4; }
    .rg-check-link { font-size: 12px; color: var(--c-navy); font-weight: 600; text-decoration: none; }
    .rg-check-link:hover { color: var(--c-accent); }
    .rg-check-error { grid-column: 2; font-size: 11.5px; color: var(--c-red); font-weight: 500; margin-top: 4px; }

    /* ── Buttons ── */
    .rg-btn {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 10px 22px;
      border-radius: var(--r-sm);
      font-size: 14px; font-weight: 700;
      // font-family: 'DM Sans', sans-serif;
      cursor: pointer; transition: all 0.18s;
      border: none; text-decoration: none; line-height: 1;
    }

    .rg-btn svg { width: 15px; height: 15px; }

    .rg-btn--primary {
      background: var(--c-navy); color: #fff;
      box-shadow: 0 2px 8px rgba(26,58,92,0.28);
    }

    .rg-btn--primary:hover:not(:disabled) {
      background: var(--c-navy-dk);
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(26,58,92,0.32);
    }

    .rg-btn--primary:disabled { opacity: 0.6; cursor: not-allowed; }

    .rg-btn--ghost {
      background: transparent; color: var(--c-text);
      border: 1px solid var(--c-border);
    }

    .rg-btn--ghost:hover { border-color: var(--c-navy); color: var(--c-navy); }

    .rg-spinner {
      width: 15px; height: 15px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: rg-spin 0.65s linear infinite;
    }

    @keyframes rg-spin { to { transform: rotate(360deg); } }

    /* ── Success ── */
    .rg-success {
      background: var(--c-white); border-radius: 18px;
      box-shadow: var(--c-shadow); border: 1px solid var(--c-border);
      padding: 60px 48px; text-align: center; margin-top: 24px;
    }

    .rg-success__ring {
      width: 68px; height: 68px; border-radius: 50%;
      background: #E8F5EE; border: 3px solid var(--c-green);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 22px; color: var(--c-green);
    }

    .rg-success__ring svg { width: 32px; height: 32px; }
    .rg-success h2 { 
      // font-family: 'Lora', serif;
      font-size: 24px; color: var(--c-text); margin: 0 0 10px; }
    .rg-success p { font-size: 14.5px; color: var(--c-muted); margin: 0 0 28px; line-height: 1.6; }
    .rg-success__actions { display: flex; gap: 10px; justify-content: center; }

    /* ── Responsive ── */
    @media (max-width: 640px) {
      .rg-card__head, .rg-card__body, .rg-card__foot { padding-left: 24px; padding-right: 24px; }
      .rg-grid { grid-template-columns: 1fr; }
      .rg-status-cards { grid-template-columns: 1fr; }
      .rg-step__label { display: none; }
      .rg-step.is-active .rg-step__label { display: block; }
      .rg-success { padding: 40px 24px; }
    }
  `}</style>
);

export default Register;
