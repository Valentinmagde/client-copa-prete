import React, { useState, useEffect, useCallback, useMemo } from "react";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import { useTranslation } from "react-i18next";
import type {
  Commune,
  Province,
  Sector,
} from "@/services/reference/reference.type";
import ReferenceService from "@/services/reference/reference.service";
import { toast } from "react-toastify";
import BeneficiaryService from "@/services/beneficiary/beneficiary.service";
import { getUser } from "@/utils/storage";
import { validateEmail, validateNif, validatePhone } from "@/utils/validators";
import { Link } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

type EntrepreneurType = "burundian" | "refugee" | "";
type GenderType = "M" | "F" | "";
type CompanyStatusType = "formal" | "informal" | "project" | "";

interface FormData {
  // Step 1
  entrepreneurType: EntrepreneurType;
  firstName: string;
  lastName: string;
  gender: GenderType;
  birthDate: string;
  email: string;
  phone: string;
  provinceId: number | "";
  communeId: number | "";

  // Step 2
  companyStatus: CompanyStatusType;
  companyName: string;
  nif: string;
  creationYear: number | "";
  sectorId: number | "";
  activityDescription: string;
  employeeCount: number | "";
  annualRevenue: number | "";

  // Step 3
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  certifyAccuracy: boolean;
  acceptNotifications: boolean;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface BeneficiaryData {
  id: number;
  category: string;
  profileCompletionPercentage: number;
  profileCompletionStep: string;
  profileCompletedAt: string | null;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    phoneNumber: string;
    gender: { code: string };
    primaryAddress: {
      provinceId: number;
      communeId: number;
    };
    consents: Array<{
      consentType: { code: string };
      value: boolean;
    }>;
  };
  company?: {
    id: number;
    companyName: string;
    taxIdNumber: string;
    creationDate: string;
    primarySectorId: number;
    activityDescription: string;
    permanentEmployees: number;
    revenueYearN1: number;
    companyType: string;
  };
}

const INITIAL_FORM: FormData = {
  entrepreneurType: "",
  firstName: "",
  lastName: "",
  gender: "",
  birthDate: "",
  email: "",
  phone: "",
  provinceId: "",
  communeId: "",
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

// Configuration des étapes avec leurs poids
const STEPS = [
  { num: 1, labelKey: "basicInformation", weight: 33, stepName: "STEP1" },
  { num: 2, labelKey: "companyInformation", weight: 34, stepName: "STEP2" },
  { num: 3, labelKey: "validationAndSend", weight: 33, stepName: "STEP3" },
] as const;

// Options pour les cartes radio de l'étape 2
const COMPANY_STATUS_OPTIONS = [
  {
    value: "formal" as const,
    icon: "ti-home",
    labelKey: "formalCompany",
    descKey: "formalCompanyDesc",
  },
  {
    value: "informal" as const,
    icon: "ti-bag",
    labelKey: "informalCompany",
    descKey: "informalCompanyDesc",
  },
  {
    value: "project" as const,
    icon: "ti-face-sad",
    labelKey: "projectCompany",
    descKey: "projectCompanyDesc",
  },
];

// Options pour les checkboxes de l'étape 3
const CONSENT_OPTIONS = [
  {
    key: "acceptTerms" as const,
    labelKey: "acceptTerms",
    link: "/conditions-utilisation",
    required: true,
    consentCode: "TERMS_AND_CONDITIONS",
  },
  {
    key: "acceptPrivacy" as const,
    labelKey: "acceptPrivacy",
    link: "/politique-confidentialite",
    required: true,
    consentCode: "PRIVACY_POLICY",
  },
  {
    key: "certifyAccuracy" as const,
    labelKey: "certifyAccuracy",
    link: null,
    required: true,
    consentCode: "CERTIFY_ACCURACY",
  },
  {
    key: "acceptNotifications" as const,
    labelKey: "acceptNotifications",
    link: null,
    required: false,
    consentCode: "COMMUNICATIONS",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const Profile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isKi = lang === "rn";
  const user = getUser();

  // State
  const [beneficiary, setBeneficiary] = useState<BeneficiaryData | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingStep, setSavingStep] = useState<number | null>(null);

  // Reference data
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loadingStates, setLoadingStates] = useState({
    provinces: false,
    communes: false,
    sectors: false,
  });

  // ─── Chargement initial ─────────────────────────────────────────────────

  useEffect(() => {
    loadReferenceData();
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    loadBeneficiaryData();
  }, [user?.id]);

  useEffect(() => {
    if (!form.provinceId) {
      setCommunes([]);
      return;
    }
    loadCommunes();
  }, [form.provinceId]);

  // ─── Fonctions de chargement ────────────────────────────────────────────

  const loadReferenceData = async () => {
    setLoadingStates((prev) => ({ ...prev, provinces: true, sectors: true }));
    try {
      const [provincesData, sectorsData] = await Promise.all([
        ReferenceService.getAllPovinces(lang),
        ReferenceService.getBusinessSectors(true, lang),
      ]);
      setProvinces(provincesData);
      setSectors(sectorsData);
    } catch (error) {
      console.error("Erreur chargement références:", error);
      toast.error(t("errorLoadingReference"));
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        provinces: false,
        sectors: false,
      }));
    }
  };

  const loadBeneficiaryData = async () => {
    setLoading(true);
    try {
      const response: any = await BeneficiaryService.getByUserId(user.id, lang);
      if (response) {
        setBeneficiary(response);
        mapBeneficiaryToForm(response);

        // Déterminer l'étape courante en fonction du pourcentage de complétion
        if (response.profileCompletionPercentage < 33) {
          setCurrentStep(1);
        } else if (response.profileCompletionPercentage < 67) {
          setCurrentStep(2);
        } else if (response.profileCompletionPercentage < 100) {
          setCurrentStep(3);
        } else {
          setCurrentStep(3); // Dernière étape mais tout est complet
        }
      }
    } catch (error) {
      console.error("Erreur chargement bénéficiaire:", error);
      toast.error(t("errorLoadingProfile"));
    } finally {
      setLoading(false);
    }
  };

  const loadCommunes = async () => {
    if (!form.provinceId) return;

    setLoadingStates((prev) => ({ ...prev, communes: true }));
    try {
      const communesData = await ReferenceService.getCommunesByProvince(
        form.provinceId,
        lang,
      );
      setCommunes(communesData);

      if (
        form.communeId &&
        !communesData.some((c) => c.id === form.communeId)
      ) {
        updateField("communeId", "");
      }
    } catch (error) {
      console.error("Erreur chargement communes:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, communes: false }));
    }
  };

  // ─── Mapping des données ────────────────────────────────────────────────

  const mapBeneficiaryToForm = (data: BeneficiaryData) => {
    const consents = data.user.consents || [];
    const consentMap = new Map(
      consents.map((c) => [c.consentType.code, c.value]),
    );

    setForm({
      entrepreneurType:
        (data.category?.toLowerCase() as EntrepreneurType) || "",
      firstName: data.user.firstName || "",
      lastName: data.user.lastName || "",
      email: data.user.email || "",
      phone: data.user.phoneNumber || "",
      gender: (data.user.gender?.code as GenderType) || "",
      birthDate: data.user.birthDate || "",
      provinceId: data.user.primaryAddress?.provinceId || "",
      communeId: data.user.primaryAddress?.communeId || "",
      companyName: data.company?.companyName || "",
      nif: data.company?.taxIdNumber || "",
      creationYear: data.company?.creationDate
        ? new Date(data.company.creationDate).getFullYear()
        : "",
      sectorId: data.company?.primarySectorId || "",
      activityDescription: data.company?.activityDescription || "",
      employeeCount: data.company?.permanentEmployees || "",
      annualRevenue: data.company?.revenueYearN1
        ? Number(data.company.revenueYearN1)
        : "",
      companyStatus:
        (data.company?.companyType as CompanyStatusType) || "project",
      acceptTerms: consentMap.get("TERMS_AND_CONDITIONS") || false,
      acceptPrivacy: consentMap.get("PRIVACY_POLICY") || false,
      certifyAccuracy: consentMap.get("CERTIFY_ACCURACY") || false,
      acceptNotifications: consentMap.get("COMMUNICATIONS") || false,
    });
  };

  // ─── Gestion du formulaire ──────────────────────────────────────────────

  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      if (errors[key as string]) {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    },
    [errors],
  );

  // ─── Validation ─────────────────────────────────────────────────────────

  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: FormErrors = {};

      switch (step) {
        case 1:
          if (!form.entrepreneurType)
            newErrors.entrepreneurType = t("required");
          if (!form.firstName.trim()) newErrors.firstName = t("required");
          if (!form.lastName.trim()) newErrors.lastName = t("required");
          if (!form.gender) newErrors.gender = t("required");

          if (!form.birthDate) {
            newErrors.birthDate = t("required");
          } else {
            const age =
              new Date().getFullYear() - new Date(form.birthDate).getFullYear();
            if (age < 18) newErrors.birthDate = t("birthDateInvalid");
          }

          if (!form.email) {
            newErrors.email = t("required");
          } else if (!validateEmail(form.email)) {
            newErrors.email = t("emailInvalid");
          }

          if (!form.phone) {
            newErrors.phone = t("required");
          }
          // else if (!validatePhone(form.phone)) {
          //   newErrors.phone = t("phoneInvalid");
          // }

          if (!form.provinceId) newErrors.provinceId = t("required");
          if (!form.communeId) newErrors.communeId = t("required");
          break;

        case 2:
          if (!form.companyStatus) {
            newErrors.companyStatus = t("required");
          } else if (
            form.companyStatus === "formal" ||
            form.companyStatus === "informal"
          ) {
            if (!form.companyName.trim()) newErrors.companyName = t("required");

            if (!form.creationYear) {
              newErrors.creationYear = t("required");
            } else {
              const year = Number(form.creationYear);
              const currentYear = new Date().getFullYear();
              if (year < 1900 || year > currentYear) {
                newErrors.creationYear = t("creationYearInvalid");
              }
            }

            if (!form.sectorId) newErrors.sectorId = t("required");

            if (!form.activityDescription.trim()) {
              newErrors.activityDescription = t("required");
            } else if (form.activityDescription.length < 20) {
              newErrors.activityDescription = t("descriptionMinLength");
            }

            if (!form.employeeCount) {
              newErrors.employeeCount = t("required");
            } else if (Number(form.employeeCount) < 0) {
              newErrors.employeeCount = t("employeeCountInvalid");
            }

            if (form.nif && !validateNif(form.nif)) {
              newErrors.nif = t("nifInvalid");
            }
          }
          break;

        case 3:
          if (!form.acceptTerms)
            newErrors.acceptTerms = t("acceptTermsRequired");
          if (!form.acceptPrivacy)
            newErrors.acceptPrivacy = t("acceptPrivacyRequired");
          if (!form.certifyAccuracy)
            newErrors.certifyAccuracy = t("certifyRequired");
          break;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [form, t],
  );

  // ─── Sauvegarde d'une étape ─────────────────────────────────────────────

  const saveCurrentStep = async () => {
    if (!beneficiary?.id) {
      toast.error(t("beneficiaryNotFound"));
      return;
    }

    if (!validateStep(currentStep)) {
      toast.error(t("pleaseFixErrors"));
      return;
    }

    setSavingStep(currentStep);
    try {
      await BeneficiaryService.update(
        beneficiary.id,
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

      // Recharger les données pour avoir le nouveau pourcentage
      await loadBeneficiaryData();

      toast.success(t("stepSaved", { step: currentStep }));
    } catch (error: any) {
      console.error("Erreur sauvegarde:", error);
      toast.error(error.response?.data?.message || t("errorSavingStep"));
    } finally {
      setSavingStep(null);
    }
  };

  // ─── Navigation ─────────────────────────────────────────────────────────

  const goToNextStep = () => {
    if (currentStep < 3 && validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  // ─── Calculs dérivés ────────────────────────────────────────────────────

  const progressPercentage = useMemo(() => {
    return (
      beneficiary?.profileCompletionPercentage ||
      STEPS.reduce((acc, s) => (s.num <= currentStep ? acc + s.weight : acc), 0)
    );
  }, [currentStep, beneficiary]);

  const canShowCompanyFields = useMemo(() => {
    return form.companyStatus === "formal" || form.companyStatus === "informal";
  }, [form.companyStatus]);

  const isStepCompleted = useCallback(
    (step: number) => {
      if (!beneficiary) return false;

      const stepName = STEPS.find((s) => s.num === step)?.stepName;
      const completedStep = beneficiary.profileCompletionStep;

      // Si l'étape actuelle est inférieure ou égale à l'étape complétée
      const stepOrder = { STEP1: 1, STEP2: 2, STEP3: 3 };
      const currentStepOrder =
        stepOrder[stepName as keyof typeof stepOrder] || 0;
      const completedStepOrder =
        stepOrder[completedStep as keyof typeof stepOrder] || 0;

      return currentStepOrder <= completedStepOrder;
    },
    [beneficiary],
  );

  // ─── Rendu ──────────────────────────────────────────────────────────────
  return (
    <div className="site-main">
      <Header />
      <PageHeader title={t("myProfile")} breadcrumb={t("myProfile")} />

      <div className="ttm-row login-section clearfix">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* ── Stepper copa ── */}
              {/* <div className="copa-stepper">
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
              </div> */}

              {/* Carte formulaire */}
              <div className="bg-theme-GreyColor ttm-col-bgcolor-yes ttm-bg rounded p-50 p-lg-20">
                <div className="layer-content">
                  {/* En-tête étape avec progression */}
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
                        {t("step")} {currentStep} {t("of")} 3
                      </p>
                      <h4 style={{ margin: 0 }}>
                        {t(STEPS[currentStep - 1].labelKey)}
                      </h4>
                    </div>
                    <ProgressRing
                      percentage={parseInt(progressPercentage.toString())}
                    />
                  </div>

                  {/* Bannière info pour l'étape 1 */}
                  {currentStep === 1 && progressPercentage < 100 && (
                    <InfoBanner
                      title={t("profileNoteTitle")}
                      description={t("profileNote")}
                    />
                  )}

                  {/* Bannière de validation pour l'étape 3 */}
                  {currentStep === 3 && (
                    <div className="copa-validation-banner mb-30">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <strong>{t("verifyBanner.title")}</strong>
                        <p>{t("verifyBanner.description")}</p>
                      </div>
                    </div>
                  )}

                  <form
                    className="login_form wrap-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveCurrentStep();
                    }}
                    noValidate
                  >
                    <div className="row">
                      {/* Étape 1 */}
                      {currentStep === 1 && (
                        <Step1Fields
                          form={form}
                          errors={errors}
                          provinces={provinces}
                          communes={communes}
                          loadingStates={loadingStates}
                          onUpdateField={updateField}
                          t={t}
                        />
                      )}

                      {/* Étape 2 */}
                      {currentStep === 2 && (
                        <Step2Fields
                          form={form}
                          errors={errors}
                          sectors={sectors}
                          isKi={isKi}
                          loadingStates={loadingStates}
                          canShowCompanyFields={canShowCompanyFields}
                          onUpdateField={updateField}
                          t={t}
                        />
                      )}

                      {/* Étape 3 */}
                      {currentStep === 3 && (
                        <Step3Fields
                          form={form}
                          errors={errors}
                          onUpdateField={updateField}
                          t={t}
                        />
                      )}

                      {/* Actions */}
                      <div className="col-12 mt-25">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            {currentStep > 1 && (
                              <button
                                type="button"
                                onClick={goToPreviousStep}
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
                              >
                                ← {t("previous")}
                              </button>
                            )}
                          </div>

                          <div className="d-flex" style={{ gap: 10 }}>
                            {/* Bouton Sauvegarder l'étape */}
                            <button
                              type="submit"
                              disabled={savingStep === currentStep}
                              className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor
                              d-flex justify-content-center align-items-center"
                            >
                              {savingStep === currentStep ? (
                                <>
                                  <span className="copa-spinner" />
                                  {t("saving")}...
                                </>
                              ) : (
                                <>
                                  <i className="ti ti-save me-2 ml-0" />
                                  {t("saveStep")}
                                </>
                              )}
                            </button>

                            {/* Bouton Suivant (si pas dernière étape) */}
                            {currentStep < 3 && (
                              <button
                                type="button"
                                onClick={goToNextStep}
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                              >
                                {t("next")} →
                              </button>
                            )}

                            {/* Bouton Terminer (si dernière étape) */}
                            {currentStep === 3 && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (validateStep(3)) {
                                    toast.success(t("profileUpdated"));
                                  }
                                }}
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                              >
                                ✓ {t("updateProfile")}
                              </button>
                            )}
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

// ─── Composants sous-composants ──────────────────────────────────────────────

const ProgressRing: React.FC<{ percentage: number }> = ({ percentage }) => (
  <svg
    viewBox="0 0 44 44"
    className="progress-ring"
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
      strokeDasharray={`${(percentage / 100) * 113} 113`}
      strokeLinecap="round"
      transform="rotate(-90 22 22)"
      className={percentage === 100 ? "text-success" : "text-theme-SkinColor"}
      style={{ transition: "stroke-dasharray 0.5s ease" }}
    />
    <text
      x="22"
      y="27"
      textAnchor="middle"
      fontSize="10"
      fontWeight="700"
      fill="currentColor"
      className={percentage === 100 ? "text-success" : "text-theme-SkinColor"}
    >
      {percentage}%
    </text>
  </svg>
);

const InfoBanner: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="copa-note-banner mb-30">
    <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
      <path
        fillRule="evenodd"
        d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
        clipRule="evenodd"
      />
    </svg>
    <div>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  </div>
);

// ─── Composants d'étapes ─────────────────────────────────────────────────────

const Step1Fields: React.FC<any> = ({
  form,
  errors,
  provinces,
  communes,
  loadingStates,
  onUpdateField,
  t,
}) => (
  <>
    <div className="col-12">
      <label className={errors.entrepreneurType ? "copa-input-invalid" : ""}>
        <i className="ti ti-id-badge" />
        <select
          value={form.entrepreneurType}
          onChange={(e) => onUpdateField("entrepreneurType", e.target.value)}
        >
          <option value="">{t("selectYourStatus")}</option>
          <option value="burundian">{t("burundianEntrepreneur")}</option>
          <option value="refugee">{t("refugeeEntrepreneur")}</option>
        </select>
      </label>
      {errors.entrepreneurType && (
        <span className="copa-error-msg">{errors.entrepreneurType}</span>
      )}
    </div>

    <div className="col-lg-6">
      <label className={errors.firstName ? "copa-input-invalid" : ""}>
        <i className="ti ti-user" />
        <input
          type="text"
          value={form.firstName}
          onChange={(e) => onUpdateField("firstName", e.target.value)}
          placeholder={t("firstName")}
        />
      </label>
      {errors.firstName && (
        <span className="copa-error-msg">{errors.firstName}</span>
      )}
    </div>

    <div className="col-lg-6">
      <label className={errors.lastName ? "copa-input-invalid" : ""}>
        <i className="ti ti-user" />
        <input
          type="text"
          value={form.lastName}
          onChange={(e) => onUpdateField("lastName", e.target.value)}
          placeholder={t("lastName")}
        />
      </label>
      {errors.lastName && (
        <span className="copa-error-msg">{errors.lastName}</span>
      )}
    </div>

    <div className="col-lg-6">
      <label className={errors.gender ? "copa-input-invalid" : ""}>
        <i className="ti ti-anchor" />
        <select
          value={form.gender}
          onChange={(e) => onUpdateField("gender", e.target.value)}
        >
          <option value="">{t("selectYourGender")}</option>
          <option value="M">{t("male")}</option>
          <option value="F">{t("female")}</option>
        </select>
      </label>
      {errors.gender && <span className="copa-error-msg">{errors.gender}</span>}
    </div>

    <div className="col-lg-6">
      <label className={errors.birthDate ? "copa-input-invalid" : ""}>
        <i className="ti ti-calendar" />
        <input
          type="date"
          value={form.birthDate}
          onChange={(e) => onUpdateField("birthDate", e.target.value)}
          max={
            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              .toISOString()
              .split("T")[0]
          }
        />
      </label>
      {errors.birthDate && (
        <span className="copa-error-msg">{errors.birthDate}</span>
      )}
    </div>

    <div className="col-lg-6">
      <label className={errors.email ? "copa-input-invalid" : ""}>
        <i className="ti ti-email" />
        <input
          type="email"
          value={form.email}
          onChange={(e) => onUpdateField("email", e.target.value)}
          placeholder={t("email")}
        />
      </label>
      {errors.email && <span className="copa-error-msg">{errors.email}</span>}
    </div>

    <div className="col-lg-6">
      <label className={errors.phone ? "copa-input-invalid" : ""}>
        <i className="ti ti-mobile" />
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => onUpdateField("phone", e.target.value)}
          placeholder={t("phoneNumber")}
        />
      </label>
      {errors.phone && <span className="copa-error-msg">{errors.phone}</span>}
    </div>

    <div className="col-lg-6">
      <label className={errors.provinceId ? "copa-input-invalid" : ""}>
        <i className="ti ti-map" />
        <select
          value={String(form.provinceId)}
          onChange={(e) =>
            onUpdateField("provinceId", e.target.value ? +e.target.value : "")
          }
        >
          <option value="">
            {loadingStates.provinces ? t("loading") : t("selectProvince")}
          </option>
          {provinces.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      {errors.provinceId && (
        <span className="copa-error-msg">{errors.provinceId}</span>
      )}
    </div>

    <div className="col-lg-6">
      <label className={errors.communeId ? "copa-input-invalid" : ""}>
        <i className="ti ti-map-alt" />
        <select
          value={String(form.communeId)}
          onChange={(e) =>
            onUpdateField("communeId", e.target.value ? +e.target.value : "")
          }
          disabled={!form.provinceId}
        >
          <option value="">
            {loadingStates.communes
              ? t("loading")
              : !form.provinceId
                ? t("selectProvinceFirst")
                : t("selectCommune")}
          </option>
          {communes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      {errors.communeId && (
        <span className="copa-error-msg">{errors.communeId}</span>
      )}
    </div>
  </>
);

const Step2Fields: React.FC<any> = ({
  form,
  errors,
  sectors,
  isKi,
  loadingStates,
  canShowCompanyFields,
  onUpdateField,
  t,
}) => (
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
        {t("haveCompany")} <span style={{ color: "#dc3545" }}>*</span>
      </p>
      <div className="copa-radio-cards">
        {COMPANY_STATUS_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`copa-radio-card ${
              form.companyStatus === option.value ? "is-selected" : ""
            }`}
          >
            <input
              type="radio"
              name="companyStatus"
              value={option.value}
              checked={form.companyStatus === option.value}
              onChange={(e) => onUpdateField("companyStatus", e.target.value)}
            />
            <span className="copa-radio-card__check">
              <svg
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                width="10"
                height="10"
              >
                <path
                  d="M1.5 5l2.5 2.5 5-5"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
              </svg>
            </span>
            <span className="copa-radio-card__icon">
              {/* <i className={`ti ${option.icon}`} /> */}
            </span>
            <span className="copa-radio-card__name">{t(option.labelKey)}</span>
            <span className="copa-radio-card__desc">{t(option.descKey)}</span>
          </label>
        ))}
      </div>
      {errors.companyStatus && (
        <span className="copa-error-msg">{errors.companyStatus}</span>
      )}
    </div>

    {canShowCompanyFields && (
      <>
        <div className="col-lg-6">
          <label className={errors.companyName ? "copa-input-invalid" : ""}>
            <i className="ti ti-briefcase" />
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => onUpdateField("companyName", e.target.value)}
              placeholder={t("companyName")}
            />
          </label>
          {errors.companyName && (
            <span className="copa-error-msg">{errors.companyName}</span>
          )}
        </div>

        <div className="col-lg-6">
          <label className={errors.nif ? "copa-input-invalid" : ""}>
            <i className="ti ti-id-badge" />
            <input
              type="text"
              value={form.nif}
              onChange={(e) => onUpdateField("nif", e.target.value)}
              placeholder={t("nif")}
            />
          </label>
          {errors.nif && <span className="copa-error-msg">{errors.nif}</span>}
        </div>

        <div className="col-lg-6">
          <label className={errors.creationYear ? "copa-input-invalid" : ""}>
            <i className="ti ti-calendar" />
            <input
              type="number"
              value={String(form.creationYear)}
              onChange={(e) =>
                onUpdateField(
                  "creationYear",
                  e.target.value ? +e.target.value : "",
                )
              }
              placeholder={t("creationYear")}
              min="1900"
              max={new Date().getFullYear()}
            />
          </label>
          {errors.creationYear && (
            <span className="copa-error-msg">{errors.creationYear}</span>
          )}
        </div>

        <div className="col-lg-6">
          <label className={errors.sectorId ? "copa-input-invalid" : ""}>
            <i className="ti ti-briefcase" />
            <select
              value={String(form.sectorId)}
              onChange={(e) =>
                onUpdateField("sectorId", e.target.value ? +e.target.value : "")
              }
            >
              <option value="">
                {loadingStates.sectors ? t("loading") : t("selectSector")}
              </option>
              {sectors.map((s) => (
                <option key={s.id} value={s.id}>
                  {isKi && s.nameRn ? s.nameRn : s.nameFr}
                </option>
              ))}
            </select>
          </label>
          {errors.sectorId && (
            <span className="copa-error-msg">{errors.sectorId}</span>
          )}
        </div>

        <div className="col-12">
          <label
            className={errors.activityDescription ? "copa-input-invalid" : ""}
          >
            <textarea
              rows={4}
              value={form.activityDescription}
              onChange={(e) =>
                onUpdateField("activityDescription", e.target.value)
              }
              placeholder={t("activityDescription")}
              style={{ paddingLeft: 15, lineHeight: 1.5 }}
            />
          </label>
          {errors.activityDescription && (
            <span className="copa-error-msg">{errors.activityDescription}</span>
          )}
        </div>

        <div className="col-lg-6">
          <label className={errors.employeeCount ? "copa-input-invalid" : ""}>
            <i className="fa fa-users" />
            <input
              type="number"
              value={String(form.employeeCount)}
              onChange={(e) =>
                onUpdateField(
                  "employeeCount",
                  e.target.value ? +e.target.value : "",
                )
              }
              placeholder={t("employeeCount")}
              min="0"
            />
          </label>
          {errors.employeeCount && (
            <span className="copa-error-msg">{errors.employeeCount}</span>
          )}
        </div>

        <div className="col-lg-6">
          <label>
            <i className="ti ti-money" />
            <input
              type="number"
              value={String(form.annualRevenue)}
              onChange={(e) =>
                onUpdateField(
                  "annualRevenue",
                  e.target.value ? +e.target.value : "",
                )
              }
              placeholder={t("annualRevenue")}
              min="0"
            />
          </label>
        </div>
      </>
    )}
  </>
);

const Step3Fields: React.FC<any> = ({ form, errors, onUpdateField, t }) => (
  <div className="col-12">
    <div className="copa-checklist">
      {CONSENT_OPTIONS.map((item) => (
        <label
          key={item.key}
          className={`copa-check-row ${form[item.key] ? "is-checked" : ""} ${
            errors[item.key] ? "is-invalid" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={form[item.key] as boolean}
            onChange={(e) => onUpdateField(item.key, e.target.checked)}
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
                strokeWidth="2.5"
              />
            </svg>
          </span>
          <span className="copa-check-row__text">
            {t(item.labelKey)}
            {item.required && (
              <span className="required-star" style={{ color: "#dc3545" }}>
                {" "}
                *
              </span>
            )}
            {item.link && (
              <Link
                to={"#"}
                target="_blank"
                rel="noopener noreferrer"
                className="copa-check-row__link"
                onClick={(e) => e.stopPropagation()}
              >
                {t("read")} →
              </Link>
            )}
          </span>
          {errors[item.key] && (
            <span className="copa-check-row__error">{errors[item.key]}</span>
          )}
        </label>
      ))}
    </div>
  </div>
);

export default Profile;
