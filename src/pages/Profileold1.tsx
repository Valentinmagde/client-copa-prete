import React, { useState, useEffect, useCallback, useMemo } from "react";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import { useTranslation } from "react-i18next";
import type { Commune, Province, Sector } from "@/services/reference/reference.type";
import ReferenceService from "@/services/reference/reference.service";
import { toast } from "react-toastify";
import BeneficiaryService from "@/services/beneficiary/beneficiary.service";
import { getUser } from "@/utils/storage";
import { validateEmail, validateNif, validatePhone } from "@/utils/validators";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { French } from "flatpickr/dist/l10n/fr";

const KirundiLocale = {
  weekdays: {
    shorthand: ["cu", "mbe", "kab", "gtu", "kan", "gnu", "gnd"],
    longhand: ["Ku cyumweru", "Kuwa mbere", "Kuwa kabiri", "Kuwa gatatu", "Kuwa kane", "Kuwa gatanu", "Kuwa gatandatu"],
  },
  months: {
    shorthand: ["Nzero", "Ruhuhuma", "Ntwarante", "Ndamukiza", "Rusama", "Ruheshi", "Mukakaro", "Myandagaro", "Nyakanga", "Gitugutu", "Munyonyo", "Kigarama"],
    longhand:  ["Nzero", "Ruhuhuma", "Ntwarante", "Ndamukiza", "Rusama", "Ruheshi", "Mukakaro", "Myandagaro", "Nyakanga", "Gitugutu", "Munyonyo", "Kigarama"],
  },
  firstDayOfWeek: 1,
};

// ─── Types ────────────────────────────────────────────────────────────────────

type EntrepreneurType   = "burundian" | "refugee" | "";
type GenderType         = "M" | "F" | "";
type CompanyStatusType  = "formal" | "informal" | "project" | "";
type MaritalStatusType  = "single" | "married" | "divorced" | "widowed" | "";
type EducationLevelType = "none" | "primary" | "secondary" | "university" | "";
type LegalStatusType    = "snc" | "scs" | "sprl" | "su" | "sa" | "coop" | "other" | "";
type AssociatesCountType = "solo" | "2" | "3" | "other" | "";
type ClientScopeType    = "local" | "national" | "eastAfrica" | "international";

interface FormData {
  // ── Step 1 : Informations personnelles ──────────────────────────────────
  entrepreneurType: EntrepreneurType;
  firstName: string;
  lastName: string;
  role: string;                         // Fonction au sein de l'entreprise
  gender: GenderType;
  birthDate: string;
  maritalStatus: MaritalStatusType;     // État civil
  educationLevel: EducationLevelType;   // Niveau d'étude
  neighborhood: string;                 // Colline/Quartier
  zone: string;                         // Zone
  provinceId: number | "";
  communeId: number | "";
  phone: string;
  email: string;

  // Eligibility questions (Q11–Q20)
  isPublicServant: boolean | null;
  isRelativeOfPublicServant: boolean | null;
  isPublicIntern: boolean | null;
  isRelativeOfPublicIntern: boolean | null;
  wasHighOfficer: boolean | null;
  isRelativeOfHighOfficer: boolean | null;
  hasProjectLink: boolean | null;
  isDirectSupplierToProject: boolean | null;
  hasPreviousGrant: boolean | null;
  previousGrantDetails: string;

  // ── Step 2 : Informations sur l'entreprise ───────────────────────────────
  companyStatus: CompanyStatusType;
  companyName: string;
  // Company address (if different)
  companyNeighborhood: string;
  companyZone: string;
  companyProvinceId: number | "";
  companyCommuneId: number | "";
  companyPhone: string;
  companyEmail: string;
  // Legal info
  legalStatus: LegalStatusType;
  legalStatusOther: string;
  nif: string;                          // N° enregistrement / NIF
  affiliatedToCGA: boolean | null;      // Affiliée à un CGA ?
  // Employees breakdown
  femaleEmployees: number | "";
  maleEmployees: number | "";
  refugeeEmployees: number | "";
  batwaEmployees: number | "";
  disabledEmployees: number | "";
  employeeCount: number | "";           // Permanent employees
  // Associates
  associatesCount: AssociatesCountType;
  associatesCountOther: string;
  femalePartners: number | "";
  malePartners: number | "";
  refugeePartners: number | "";
  batwaPartners: number | "";
  disabledPartners: number | "";
  // Financials
  annualRevenue: number | "";
  creationYear: number | "";
  sectorId: number | "";
  activityDescription: string;
  hasBankAccount: boolean | null;
  hasBankCredit: boolean | null;
  bankCreditAmount: number | "";

  // ── Step 3 : Présentation du projet ─────────────────────────────────────
  projectTitle: string;
  projectObjective: string;
  projectSectors: string[];             // multi-select
  otherSector: string;
  mainActivities: string;
  productsServices: string;
  businessIdea: string;
  targetClients: string;
  clientScope: ClientScopeType[];
  hasCompetitors: boolean | null;
  competitorNames: string;
  plannedEmployeesFemale: number | "";
  plannedEmployeesMale: number | "";
  plannedPermanentEmployees: number | "";
  isNewIdea: boolean | null;
  climateActions: string;
  inclusionActions: string;
  hasEstimatedCost: boolean | null;
  totalProjectCost: number | "";
  requestedSubsidyAmount: number | "";
  mainExpenses: string;

  // ── Step 4 : Validation & Envoi ─────────────────────────────────────────
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  certifyAccuracy: boolean;
  acceptNotifications: boolean;
}

interface FormErrors { [key: string]: string | undefined }

interface BeneficiaryData {
  id: number;
  category: string;
  profileCompletionPercentage: number;
  profileCompletionStep: string;
  profileCompletedAt: string | null;
  companyType: string;
  isProfileComplete?: boolean;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    phoneNumber: string;
    gender: { code: string };
    primaryAddress: { provinceId: number; communeId: number };
    consents: Array<{ consentType: { code: string }; value: boolean }>;
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
  // Step 1
  entrepreneurType: "",
  firstName: "",
  lastName: "",
  role: "",
  gender: "",
  birthDate: "",
  maritalStatus: "",
  educationLevel: "",
  neighborhood: "",
  zone: "",
  provinceId: "",
  communeId: "",
  phone: "",
  email: "",
  isPublicServant: null,
  isRelativeOfPublicServant: null,
  isPublicIntern: null,
  isRelativeOfPublicIntern: null,
  wasHighOfficer: null,
  isRelativeOfHighOfficer: null,
  hasProjectLink: null,
  isDirectSupplierToProject: null,
  hasPreviousGrant: null,
  previousGrantDetails: "",
  // Step 2
  companyStatus: "",
  companyName: "",
  companyNeighborhood: "",
  companyZone: "",
  companyProvinceId: "",
  companyCommuneId: "",
  companyPhone: "",
  companyEmail: "",
  legalStatus: "",
  legalStatusOther: "",
  nif: "",
  affiliatedToCGA: null,
  femaleEmployees: "",
  maleEmployees: "",
  refugeeEmployees: "",
  batwaEmployees: "",
  disabledEmployees: "",
  employeeCount: "",
  associatesCount: "",
  associatesCountOther: "",
  femalePartners: "",
  malePartners: "",
  refugeePartners: "",
  batwaPartners: "",
  disabledPartners: "",
  annualRevenue: "",
  creationYear: "",
  sectorId: "",
  activityDescription: "",
  hasBankAccount: null,
  hasBankCredit: null,
  bankCreditAmount: "",
  // Step 3
  projectTitle: "",
  projectObjective: "",
  projectSectors: [],
  otherSector: "",
  mainActivities: "",
  productsServices: "",
  businessIdea: "",
  targetClients: "",
  clientScope: [],
  hasCompetitors: null,
  competitorNames: "",
  plannedEmployeesFemale: "",
  plannedEmployeesMale: "",
  plannedPermanentEmployees: "",
  isNewIdea: null,
  climateActions: "",
  inclusionActions: "",
  hasEstimatedCost: null,
  totalProjectCost: "",
  requestedSubsidyAmount: "",
  mainExpenses: "",
  // Step 4
  acceptTerms: true,
  acceptPrivacy: true,
  certifyAccuracy: true,
  acceptNotifications: false,
};

const STEPS = [
  { num: 1, labelKey: "basicInformation",    weight: 25, stepName: "STEP1" },
  { num: 2, labelKey: "companyInformation",  weight: 25, stepName: "STEP2" },
  { num: 3, labelKey: "projectPresentation", weight: 25, stepName: "STEP3" },
  { num: 4, labelKey: "validationAndSend",   weight: 25, stepName: "STEP4" },
] as const;

const COMPANY_STATUS_OPTIONS = [
  { value: "formal"   as const, icon: "ti-home",     labelKey: "formalCompany",   descKey: "formalCompanyDesc"   },
  { value: "informal" as const, icon: "ti-bag",      labelKey: "informalCompany", descKey: "informalCompanyDesc" },
  { value: "project"  as const, icon: "ti-face-sad", labelKey: "projectCompany",  descKey: "projectCompanyDesc"  },
];

const LEGAL_STATUS_OPTIONS: { value: LegalStatusType; label: string }[] = [
  { value: "snc",   label: "Société en Non Collectif (SNC)"                         },
  { value: "scs",   label: "Société en Commandite Simple (SCS)"                     },
  { value: "sprl",  label: "Société de Personnes à Responsabilité Limitée (SPRL)"   },
  { value: "su",    label: "Société Unipersonnelle (SU)"                             },
  { value: "sa",    label: "Société Anonyme (SA)"                                   },
  { value: "coop",  label: "Société Coopérative"                                    },
  { value: "other", label: "Autre"                                                  },
];

const PROJECT_SECTORS = [
  { value: "milk",         labelKey: "sectorMilk"        },
  { value: "poultry",      labelKey: "sectorPoultry"     },
  { value: "fish",         labelKey: "sectorFish"        },
  { value: "tropicalFruit",labelKey: "sectorFruit"       },
  { value: "mining",       labelKey: "sectorMining"      },
  { value: "tourism",      labelKey: "sectorTourism"     },
  { value: "digital",      labelKey: "sectorDigital"     },
  { value: "other",        labelKey: "sectorOther"       },
];

const CONSENT_OPTIONS = [
  { key: "acceptTerms"       as const, labelKey: "acceptTerms",    link: "/conditions-utilisation",      required: true,  consentCode: "TERMS_AND_CONDITIONS" },
  { key: "acceptPrivacy"     as const, labelKey: "acceptPrivacy",  link: "/politique-confidentialite",   required: true,  consentCode: "PRIVACY_POLICY"       },
  { key: "certifyAccuracy"   as const, labelKey: "certifyAccuracy",link: null,                           required: true,  consentCode: "CERTIFY_ACCURACY"     },
  { key: "acceptNotifications" as const, labelKey: "acceptNotifications", link: null,                   required: false, consentCode: "COMMUNICATIONS"       },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const YesNoField: React.FC<{
  labelKey: string;
  fieldKey: string;
  value: boolean | null;
  error?: string;
  onChange: (val: boolean) => void;
  t: any;
}> = ({ labelKey, fieldKey, value, error, onChange, t }) => (
  <div className="col-12 mb-15">
    <p style={{ fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 8 }}>
      {t(labelKey)} <span style={{ color: "#dc3545" }}>*</span>
    </p>
    <div className="d-flex" style={{ gap: 12 }}>
      {[true, false].map((v) => (
        <label
          key={String(v)}
          className={`copa-radio-card copa-radio-card--sm ${value === v ? "is-selected" : ""}`}
          style={{ flexDirection: "row", gap: 8, padding: "10px 20px", minWidth: 90 }}
        >
          <input
            type="radio"
            name={fieldKey}
            checked={value === v}
            onChange={() => onChange(v)}
          />
          <span className="copa-radio-card__check">
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" width="10" height="10">
              <path d="M1.5 5l2.5 2.5 5-5" strokeLinecap="round" strokeWidth="2.5" />
            </svg>
          </span>
          <span className="copa-radio-card__name">{v ? t("yes") : t("no")}</span>
        </label>
      ))}
    </div>
    {error && <span className="copa-error-msg">{error}</span>}
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const Profile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isKi = lang === "rn";
  const user = getUser();
  const navigate = useNavigate();

  const [beneficiary, setBeneficiary]   = useState<BeneficiaryData | null>(null);
  const [currentStep, setCurrentStep]   = useState(1);
  const [form, setForm]                 = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors]             = useState<FormErrors>({});
  const [submitting, setSubmitting]     = useState(false);
  const [loading, setLoading]           = useState(true);
  const [savingStep, setSavingStep]     = useState<number | null>(null);

  const [provinces, setProvinces]             = useState<Province[]>([]);
  const [communes, setCommunes]               = useState<Commune[]>([]);
  const [companyCommunes, setCompanyCommunes] = useState<Commune[]>([]);
  const [sectors, setSectors]                 = useState<Sector[]>([]);
  const [loadingStates, setLoadingStates]     = useState({ provinces: false, communes: false, sectors: false });

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  // ─── Effects ────────────────────────────────────────────────────────────

  useEffect(() => { loadReferenceData(); }, []);
  useEffect(() => { if (user?.id) loadBeneficiaryData(); }, [user?.id]);

  useEffect(() => {
    if (!form.provinceId) { setCommunes([]); return; }
    loadCommunes(form.provinceId, setCommunes);
  }, [form.provinceId]);

  useEffect(() => {
    if (!form.companyProvinceId) { setCompanyCommunes([]); return; }
    loadCommunes(form.companyProvinceId, setCompanyCommunes);
  }, [form.companyProvinceId]);

  // ─── Load helpers ────────────────────────────────────────────────────────

  const loadReferenceData = async () => {
    setLoadingStates((p) => ({ ...p, provinces: true, sectors: true }));
    try {
      const [provincesData, sectorsData] = await Promise.all([
        ReferenceService.getAllPovinces(lang),
        ReferenceService.getBusinessSectors(true, lang),
      ]);
      setProvinces(provincesData);
      setSectors(sectorsData);
    } catch (e) {
      toast.error(t("errorLoadingReference"));
    } finally {
      setLoadingStates((p) => ({ ...p, provinces: false, sectors: false }));
    }
  };

  const loadBeneficiaryData = async () => {
    setLoading(true);
    try {
      const response: any = await BeneficiaryService.getByUserId(user.id, lang);
      if (response) {
        setBeneficiary(response);
        mapBeneficiaryToForm(response);
        if (response.isProfileComplete) navigate("/application-submitted", { replace: true });
      }
    } catch (e) {
      toast.error(t("errorLoadingProfile"));
    } finally {
      setLoading(false);
    }
  };

  const loadCommunes = async (provinceId: number | "", setter: React.Dispatch<React.SetStateAction<Commune[]>>) => {
    if (!provinceId) return;
    setLoadingStates((p) => ({ ...p, communes: true }));
    try {
      const data = await ReferenceService.getCommunesByProvince(provinceId, lang);
      setter(data);
    } catch (e) {
      console.error("Erreur chargement communes:", e);
    } finally {
      setLoadingStates((p) => ({ ...p, communes: false }));
    }
  };

  // ─── Mapping ────────────────────────────────────────────────────────────

  const mapBeneficiaryToForm = (data: BeneficiaryData) => {
    const consents = data.user.consents || [];
    const consentMap = new Map(consents.map((c) => [c.consentType.code, c.value]));
    setForm((prev) => ({
      ...prev,
      entrepreneurType: (data.category?.toLowerCase() as EntrepreneurType) || "",
      firstName:        data.user.firstName || "",
      lastName:         data.user.lastName || "",
      email:            data.user.email || "",
      phone:            data.user.phoneNumber || "",
      gender:           (data.user.gender?.code as GenderType) || "",
      birthDate:        data.user.birthDate || "",
      provinceId:       data.user.primaryAddress?.provinceId || "",
      communeId:        data.user.primaryAddress?.communeId || "",
      companyName:      data.company?.companyName || "",
      nif:              data.company?.taxIdNumber || "",
      creationYear:     data.company?.creationDate ? new Date(data.company.creationDate).getFullYear() : "",
      sectorId:         data.company?.primarySectorId || "",
      activityDescription: data.company?.activityDescription || "",
      employeeCount:    data.company?.permanentEmployees || "",
      annualRevenue:    data.company?.revenueYearN1 ? Number(data.company.revenueYearN1) : "",
      companyStatus:    (data.companyType as CompanyStatusType) || "",
      acceptTerms:      consentMap.get("TERMS_AND_CONDITIONS") || false,
      acceptPrivacy:    consentMap.get("PRIVACY_POLICY") || false,
      certifyAccuracy:  consentMap.get("CERTIFY_ACCURACY") || false,
      acceptNotifications: consentMap.get("COMMUNICATIONS") || false,
    }));
  };

  // ─── Field update ────────────────────────────────────────────────────────

  const updateField = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as string]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }, [errors]);

  const toggleArrayField = useCallback(<K extends keyof FormData>(key: K, val: string) => {
    setForm((prev) => {
      const arr = (prev[key] as string[]) || [];
      return { ...prev, [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] };
    });
  }, []);

  // ─── Validation ─────────────────────────────────────────────────────────

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!form.entrepreneurType) newErrors.entrepreneurType = t("required");
      if (!form.firstName.trim()) newErrors.firstName = t("required");
      if (!form.lastName.trim())  newErrors.lastName  = t("required");
      if (!form.gender)           newErrors.gender    = t("required");
      if (!form.maritalStatus)    newErrors.maritalStatus = t("required");
      if (!form.educationLevel)   newErrors.educationLevel = t("required");
      if (!form.birthDate) {
        newErrors.birthDate = t("required");
      } else {
        const age = new Date().getFullYear() - new Date(form.birthDate).getFullYear();
        if (age < 18) newErrors.birthDate = t("birthDateInvalid");
      }
      if (!form.email) newErrors.email = t("required");
      else if (!validateEmail(form.email)) newErrors.email = t("emailInvalid");
      if (!form.phone)      newErrors.phone     = t("required");
      if (!form.provinceId) newErrors.provinceId = t("required");
      if (!form.communeId)  newErrors.communeId  = t("required");

      // Eligibility
      const boolFields: (keyof FormData)[] = [
        "isPublicServant","isRelativeOfPublicServant","isPublicIntern","isRelativeOfPublicIntern",
        "wasHighOfficer","isRelativeOfHighOfficer","hasProjectLink","isDirectSupplierToProject","hasPreviousGrant",
      ];
      boolFields.forEach((f) => {
        if (form[f] === null) newErrors[f as string] = t("required");
      });
    }

    if (step === 2) {
      if (!form.companyStatus) {
        newErrors.companyStatus = t("required");
      } else if (form.companyStatus === "formal" || form.companyStatus === "informal") {
        if (!form.companyName.trim()) newErrors.companyName = t("required");
        if (!form.creationYear) {
          newErrors.creationYear = t("required");
        } else {
          const y = Number(form.creationYear);
          if (y < 1900 || y > new Date().getFullYear()) newErrors.creationYear = t("creationYearInvalid");
        }
        if (!form.sectorId) newErrors.sectorId = t("required");
        if (!form.activityDescription.trim()) newErrors.activityDescription = t("required");
        else if (form.activityDescription.length < 20) newErrors.activityDescription = t("descriptionMinLength");
        if (!form.employeeCount) newErrors.employeeCount = t("required");
        else if (Number(form.employeeCount) < 0) newErrors.employeeCount = t("employeeCountInvalid");
        if (form.nif && !validateNif(form.nif)) newErrors.nif = t("nifInvalid");
        if (form.companyStatus === "formal" && !form.legalStatus) newErrors.legalStatus = t("required");
        if (!form.associatesCount) newErrors.associatesCount = t("required");
      }
    }

    if (step === 3) {
      if (!form.projectTitle.trim())     newErrors.projectTitle     = t("required");
      if (!form.projectObjective.trim()) newErrors.projectObjective = t("required");
      if (form.projectSectors.length === 0) newErrors.projectSectors = t("required");
      if (!form.mainActivities.trim())   newErrors.mainActivities   = t("required");
      if (!form.productsServices.trim()) newErrors.productsServices = t("required");
      if (!form.targetClients.trim())    newErrors.targetClients    = t("required");
      if (form.clientScope.length === 0) newErrors.clientScope      = t("required");
      if (form.hasCompetitors === null)  newErrors.hasCompetitors   = t("required");
      if (!form.climateActions.trim())   newErrors.climateActions   = t("required");
      if (!form.inclusionActions.trim()) newErrors.inclusionActions = t("required");
      if (form.hasEstimatedCost === null) newErrors.hasEstimatedCost = t("required");
      if (form.hasEstimatedCost && !form.totalProjectCost) newErrors.totalProjectCost = t("required");
      if (form.hasEstimatedCost && !form.requestedSubsidyAmount) newErrors.requestedSubsidyAmount = t("required");
      if (!form.mainExpenses.trim())     newErrors.mainExpenses     = t("required");
    }

    if (step === 4) {
      if (!form.acceptTerms)      newErrors.acceptTerms      = t("acceptTermsRequired");
      if (!form.acceptPrivacy)    newErrors.acceptPrivacy    = t("acceptPrivacyRequired");
      if (!form.certifyAccuracy)  newErrors.certifyAccuracy  = t("certifyRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form, t]);

  // ─── Save step ───────────────────────────────────────────────────────────

  const saveCurrentStep = async (isFinish: boolean = false) => {
    if (!beneficiary?.id) { toast.error(t("beneficiaryNotFound")); return; }
    if (!validateStep(currentStep)) return;

    setSavingStep(currentStep);
    try {
      await BeneficiaryService.update(
        beneficiary.id,
        {
          step1: {
            entrepreneurType: form.entrepreneurType,
            firstName:        form.firstName,
            lastName:         form.lastName,
            role:             form.role,
            gender:           form.gender,
            birthDate:        form.birthDate,
            maritalStatus:    form.maritalStatus,
            educationLevel:   form.educationLevel,
            neighborhood:     form.neighborhood,
            zone:             form.zone,
            email:            form.email,
            phone:            form.phone,
            provinceId:       form.provinceId,
            communeId:        form.communeId,
            // Eligibility
            isPublicServant:             form.isPublicServant,
            isRelativeOfPublicServant:   form.isRelativeOfPublicServant,
            isPublicIntern:              form.isPublicIntern,
            isRelativeOfPublicIntern:    form.isRelativeOfPublicIntern,
            wasHighOfficer:              form.wasHighOfficer,
            isRelativeOfHighOfficer:     form.isRelativeOfHighOfficer,
            hasProjectLink:              form.hasProjectLink,
            isDirectSupplierToProject:   form.isDirectSupplierToProject,
            hasPreviousGrant:            form.hasPreviousGrant,
            previousGrantDetails:        form.previousGrantDetails,
          },
          step2: {
            companyStatus:       form.companyStatus,
            companyExists:       form.companyStatus && form.companyStatus !== "project" ? "yes" : "no",
            companyName:         form.companyName,
            companyNeighborhood: form.companyNeighborhood,
            companyZone:         form.companyZone,
            companyProvinceId:   form.companyProvinceId,
            companyCommuneId:    form.companyCommuneId,
            companyPhone:        form.companyPhone,
            companyEmail:        form.companyEmail,
            legalStatus:         form.legalStatus,
            legalStatusOther:    form.legalStatusOther,
            nif:                 form.nif,
            affiliatedToCGA:     form.affiliatedToCGA,
            femaleEmployees:     form.femaleEmployees,
            maleEmployees:       form.maleEmployees,
            refugeeEmployees:    form.refugeeEmployees,
            batwaEmployees:      form.batwaEmployees,
            disabledEmployees:   form.disabledEmployees,
            employeeCount:       form.employeeCount,
            associatesCount:     form.associatesCount,
            femalePartners:      form.femalePartners,
            malePartners:        form.malePartners,
            refugeePartners:     form.refugeePartners,
            batwaPartners:       form.batwaPartners,
            disabledPartners:    form.disabledPartners,
            creationYear:        form.creationYear,
            sectorId:            form.sectorId,
            activityDescription: form.activityDescription,
            annualRevenue:       form.annualRevenue,
            hasBankAccount:      form.hasBankAccount,
            hasBankCredit:       form.hasBankCredit,
            bankCreditAmount:    form.bankCreditAmount,
          },
          step3: {
            // Project presentation
            projectTitle:               form.projectTitle,
            projectObjective:           form.projectObjective,
            projectSectors:             form.projectSectors,
            otherSector:                form.otherSector,
            mainActivities:             form.mainActivities,
            productsServices:           form.productsServices,
            businessIdea:               form.businessIdea,
            targetClients:              form.targetClients,
            clientScope:                form.clientScope,
            hasCompetitors:             form.hasCompetitors,
            competitorNames:            form.competitorNames,
            plannedEmployeesFemale:     form.plannedEmployeesFemale,
            plannedEmployeesMale:       form.plannedEmployeesMale,
            plannedPermanentEmployees:  form.plannedPermanentEmployees,
            isNewIdea:                  form.isNewIdea,
            climateActions:             form.climateActions,
            inclusionActions:           form.inclusionActions,
            hasEstimatedCost:           form.hasEstimatedCost,
            totalProjectCost:           form.totalProjectCost,
            requestedSubsidyAmount:     form.requestedSubsidyAmount,
            mainExpenses:               form.mainExpenses,
            // Consents
            acceptCGU:              form.acceptTerms,
            acceptPrivacyPolicy:    form.acceptPrivacy,
            certifyAccuracy:        form.certifyAccuracy,
            optInNotifications:     form.acceptNotifications,
            isProfileCompleted:     isFinish,
          },
        },
        lang,
      );

      await loadBeneficiaryData();
      if (currentStep === 4) toast.success(t("profileUpdated"));
      else toast.success(t("stepSaved", { step: currentStep }));
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("errorSavingStep"));
    } finally {
      setSavingStep(null);
    }
  };

  // ─── Navigation ──────────────────────────────────────────────────────────

  const goToNextStep = () => {
    if (currentStep < 4 && validateStep(currentStep)) {
      setCurrentStep((p) => p + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) { setCurrentStep((p) => p - 1); window.scrollTo(0, 0); }
  };

  // ─── Derived ─────────────────────────────────────────────────────────────

  const progressPercentage = useMemo(() => {
    return beneficiary?.profileCompletionPercentage ||
      STEPS.reduce((acc, s) => (s.num <= currentStep ? acc + s.weight : acc), 0);
  }, [currentStep, beneficiary]);

  const canShowCompanyFields = useMemo(() =>
    form.companyStatus === "formal" || form.companyStatus === "informal",
  [form.companyStatus]);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="site-main">
      <Header />
      <PageHeader title={t("myProfile")} breadcrumb={t("myProfile")} />

      <div className="ttm-row login-section clearfix">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="bg-theme-GreyColor ttm-col-bgcolor-yes ttm-bg rounded p-50 p-lg-20">
                <div className="layer-content">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-center mb-30">
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#999", margin: "0 0 4px" }}>
                        {t("step")} {currentStep} {t("of")} 4
                      </p>
                      <h4 style={{ margin: 0 }}>{t(STEPS[currentStep - 1].labelKey)}</h4>
                    </div>
                    <ProgressRing percentage={parseInt(progressPercentage.toString())} />
                  </div>

                  {/* Banners */}
                  {currentStep === 1 && <InfoBanner title={t("profileNoteTitle")} description={t("profileNote")} />}
                  {currentStep === 4 && <InfoBanner title={t("verifyBanner.title")} description={t("verifyBanner.description")} />}

                  <form className="login_form wrap-form" onSubmit={(e) => { e.preventDefault(); saveCurrentStep(false); }} noValidate>
                    <div className="row">
                      {currentStep === 1 && (
                        <Step1Fields
                          form={form} errors={errors} provinces={provinces} communes={communes}
                          isKi={isKi} maxDate={maxDate} loadingStates={loadingStates}
                          onUpdateField={updateField} t={t}
                        />
                      )}
                      {currentStep === 2 && (
                        <Step2Fields
                          form={form} errors={errors} sectors={sectors} provinces={provinces}
                          communes={communes} companyCommunes={companyCommunes} isKi={isKi}
                          loadingStates={loadingStates} canShowCompanyFields={canShowCompanyFields}
                          onUpdateField={updateField} t={t}
                        />
                      )}
                      {currentStep === 3 && (
                        <Step3Fields form={form} errors={errors} onUpdateField={updateField} toggleArrayField={toggleArrayField} t={t} />
                      )}
                      {currentStep === 4 && (
                        <Step4Fields form={form} errors={errors} onUpdateField={updateField} t={t} />
                      )}

                      {/* Actions */}
                      <div className="col-12 mt-25">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            {currentStep > 1 && (
                              <button type="button" onClick={goToPreviousStep}
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor">
                                ← {t("previous")}
                              </button>
                            )}
                          </div>
                          <div className="d-flex" style={{ gap: 10 }}>
                            <button type="submit" disabled={savingStep === currentStep}
                              className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor d-flex justify-content-center align-items-center">
                              {savingStep === currentStep ? (
                                <><span className="copa-spinner" />{t("saving")}...</>
                              ) : (
                                <><i className="ti ti-save me-2 ml-0" />{t("saveStep")}</>
                              )}
                            </button>
                            {currentStep < 4 && (
                              <button type="button" onClick={goToNextStep}
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor">
                                {t("next")} →
                              </button>
                            )}
                            {currentStep === 4 && (
                              <button type="button" onClick={() => saveCurrentStep(true)}
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor">
                                ✓ {t("submit")}
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

// ─── Sub-components ───────────────────────────────────────────────────────────

const ProgressRing: React.FC<{ percentage: number }> = ({ percentage }) => (
  <svg viewBox="0 0 44 44" className="progress-ring" style={{ width: 44, height: 44, flexShrink: 0 }}>
    <circle cx="22" cy="22" r="18" fill="none" stroke="#dde2ea" strokeWidth="3.5" />
    <circle cx="22" cy="22" r="18" fill="none" stroke="currentColor" strokeWidth="3.5"
      strokeDasharray={`${(percentage / 100) * 113} 113`} strokeLinecap="round"
      transform="rotate(-90 22 22)"
      className={percentage === 100 ? "text-success" : "text-theme-SkinColor"}
      style={{ transition: "stroke-dasharray 0.5s ease" }} />
    <text x="22" y="27" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor"
      className={percentage === 100 ? "text-success" : "text-theme-SkinColor"}>
      {percentage}%
    </text>
  </svg>
);

const InfoBanner: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="copa-validation-banner mb-30">
    <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
      <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
    </svg>
    <div><strong>{title}</strong><p>{description}</p></div>
  </div>
);

// ─── Step 1: Informations personnelles + éligibilité ─────────────────────────

const Step1Fields: React.FC<any> = ({
  form, errors, provinces, communes, loadingStates, onUpdateField, t, isKi, maxDate,
}) => (
  <>
    {/* Statut */}
    <div className="col-12">
      <label className={errors.entrepreneurType ? "copa-input-invalid" : ""}>
        <i className="ti ti-id-badge" />
        <select value={form.entrepreneurType} onChange={(e) => onUpdateField("entrepreneurType", e.target.value)}>
          <option value="">{t("selectYourStatus")}</option>
          <option value="burundian">{t("burundianEntrepreneur")}</option>
          <option value="refugee">{t("refugeeEntrepreneur")}</option>
        </select>
      </label>
      {errors.entrepreneurType && <span className="copa-error-msg">{errors.entrepreneurType}</span>}
    </div>

    {/* Nom / Prénom */}
    <div className="col-lg-6">
      <label className={errors.lastName ? "copa-input-invalid" : ""}>
        <i className="ti ti-user" />
        <input type="text" value={form.lastName} onChange={(e) => onUpdateField("lastName", e.target.value)} placeholder={t("lastName")} />
      </label>
      {errors.lastName && <span className="copa-error-msg">{errors.lastName}</span>}
    </div>
    <div className="col-lg-6">
      <label className={errors.firstName ? "copa-input-invalid" : ""}>
        <i className="ti ti-user" />
        <input type="text" value={form.firstName} onChange={(e) => onUpdateField("firstName", e.target.value)} placeholder={t("firstName")} />
      </label>
      {errors.firstName && <span className="copa-error-msg">{errors.firstName}</span>}
    </div>

    {/* Fonction */}
    <div className="col-lg-6">
      <label>
        <i className="ti ti-briefcase" />
        <input type="text" value={form.role} onChange={(e) => onUpdateField("role", e.target.value)} placeholder={t("roleInCompany")} />
      </label>
    </div>

    {/* Sexe */}
    <div className="col-lg-6">
      <label className={errors.gender ? "copa-input-invalid" : ""}>
        <i className="ti ti-anchor" />
        <select value={form.gender} onChange={(e) => onUpdateField("gender", e.target.value)}>
          <option value="">{t("selectYourGender")}</option>
          <option value="M">{t("male")}</option>
          <option value="F">{t("female")}</option>
        </select>
      </label>
      {errors.gender && <span className="copa-error-msg">{errors.gender}</span>}
    </div>

    {/* Date de naissance */}
    <div className="col-lg-6">
      <label className={errors.birthDate ? "copa-input-invalid" : ""}>
        <i className="ti ti-calendar" />
        <Flatpickr
          value={form.birthDate ? new Date(form.birthDate) : undefined}
          onChange={([date]) => onUpdateField("birthDate", date?.toISOString().split("T")[0] || "")}
          placeholder={t("birthDate")}
          options={{ enableTime: false, dateFormat: "d-m-Y", maxDate, locale: isKi ? KirundiLocale as any : French }}
          style={{ height: "55px" }}
        />
      </label>
      {errors.birthDate && <span className="copa-error-msg">{errors.birthDate}</span>}
    </div>

    {/* État civil */}
    <div className="col-lg-6">
      <label className={errors.maritalStatus ? "copa-input-invalid" : ""}>
        <i className="ti ti-heart" />
        <select value={form.maritalStatus} onChange={(e) => onUpdateField("maritalStatus", e.target.value)}>
          <option value="">{t("selectMaritalStatus")}</option>
          <option value="single">{t("single")}</option>
          <option value="married">{t("married")}</option>
          <option value="divorced">{t("divorced")}</option>
          <option value="widowed">{t("widowed")}</option>
        </select>
      </label>
      {errors.maritalStatus && <span className="copa-error-msg">{errors.maritalStatus}</span>}
    </div>

    {/* Niveau d'étude */}
    <div className="col-lg-6">
      <label className={errors.educationLevel ? "copa-input-invalid" : ""}>
        <i className="ti ti-book" />
        <select value={form.educationLevel} onChange={(e) => onUpdateField("educationLevel", e.target.value)}>
          <option value="">{t("selectEducationLevel")}</option>
          <option value="none">{t("educationNone")}</option>
          <option value="primary">{t("educationPrimary")}</option>
          <option value="secondary">{t("educationSecondary")}</option>
          <option value="university">{t("educationUniversity")}</option>
        </select>
      </label>
      {errors.educationLevel && <span className="copa-error-msg">{errors.educationLevel}</span>}
    </div>

    {/* Adresse */}
    <div className="col-lg-6">
      <label>
        <i className="ti ti-home" />
        <input type="text" value={form.neighborhood} onChange={(e) => onUpdateField("neighborhood", e.target.value)} placeholder={t("neighborhood")} />
      </label>
    </div>
    <div className="col-lg-6">
      <label>
        <i className="ti ti-location-pin" />
        <input type="text" value={form.zone} onChange={(e) => onUpdateField("zone", e.target.value)} placeholder={t("zone")} />
      </label>
    </div>
    <div className="col-lg-6">
      <label className={errors.provinceId ? "copa-input-invalid" : ""}>
        <i className="ti ti-map" />
        <select value={String(form.provinceId)} onChange={(e) => onUpdateField("provinceId", e.target.value ? +e.target.value : "")}>
          <option value="">{loadingStates.provinces ? t("loading") : t("selectProvince")}</option>
          {provinces.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </label>
      {errors.provinceId && <span className="copa-error-msg">{errors.provinceId}</span>}
    </div>
    <div className="col-lg-6">
      <label className={errors.communeId ? "copa-input-invalid" : ""}>
        <i className="ti ti-map-alt" />
        <select value={String(form.communeId)} onChange={(e) => onUpdateField("communeId", e.target.value ? +e.target.value : "")} disabled={!form.provinceId}>
          <option value="">{loadingStates.communes ? t("loading") : !form.provinceId ? t("selectProvinceFirst") : t("selectCommune")}</option>
          {communes.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </label>
      {errors.communeId && <span className="copa-error-msg">{errors.communeId}</span>}
    </div>

    {/* Téléphone / Email */}
    <div className="col-lg-6">
      <label className={errors.phone ? "copa-input-invalid" : ""}>
        <PhoneInput country="bi" value={form.phone} onChange={(phone) => onUpdateField("phone", phone)}
          autoFormat enableSearch countryCodeEditable={false} disableSearchIcon placeholder={t("phoneNumber")} />
      </label>
      {errors.phone && <span className="copa-error-msg">{errors.phone}</span>}
    </div>
    <div className="col-lg-6">
      <label className={errors.email ? "copa-input-invalid" : ""}>
        <i className="ti ti-email" />
        <input type="email" value={form.email} onChange={(e) => onUpdateField("email", e.target.value)} placeholder={t("email")} />
      </label>
      {errors.email && <span className="copa-error-msg">{errors.email}</span>}
    </div>

    {/* ── Questions d'éligibilité ── */}
    <div className="col-12 mt-25 mb-10">
      <h5 style={{ borderBottom: "2px solid #eee", paddingBottom: 10 }}>{t("eligibilityQuestions")}</h5>
    </div>

    <YesNoField labelKey="isPublicServantLabel"           fieldKey="isPublicServant"           value={form.isPublicServant}           error={errors.isPublicServant}           onChange={(v) => onUpdateField("isPublicServant", v)}           t={t} />
    <YesNoField labelKey="isRelativeOfPublicServantLabel" fieldKey="isRelativeOfPublicServant" value={form.isRelativeOfPublicServant} error={errors.isRelativeOfPublicServant} onChange={(v) => onUpdateField("isRelativeOfPublicServant", v)} t={t} />
    <YesNoField labelKey="isPublicInternLabel"            fieldKey="isPublicIntern"            value={form.isPublicIntern}            error={errors.isPublicIntern}            onChange={(v) => onUpdateField("isPublicIntern", v)}            t={t} />
    <YesNoField labelKey="isRelativeOfPublicInternLabel"  fieldKey="isRelativeOfPublicIntern"  value={form.isRelativeOfPublicIntern}  error={errors.isRelativeOfPublicIntern}  onChange={(v) => onUpdateField("isRelativeOfPublicIntern", v)}  t={t} />
    <YesNoField labelKey="wasHighOfficerLabel"            fieldKey="wasHighOfficer"            value={form.wasHighOfficer}            error={errors.wasHighOfficer}            onChange={(v) => onUpdateField("wasHighOfficer", v)}            t={t} />
    <YesNoField labelKey="isRelativeOfHighOfficerLabel"   fieldKey="isRelativeOfHighOfficer"   value={form.isRelativeOfHighOfficer}   error={errors.isRelativeOfHighOfficer}   onChange={(v) => onUpdateField("isRelativeOfHighOfficer", v)}   t={t} />
    <YesNoField labelKey="hasProjectLinkLabel"            fieldKey="hasProjectLink"            value={form.hasProjectLink}            error={errors.hasProjectLink}            onChange={(v) => onUpdateField("hasProjectLink", v)}            t={t} />
    <YesNoField labelKey="isDirectSupplierToProjectLabel" fieldKey="isDirectSupplierToProject" value={form.isDirectSupplierToProject} error={errors.isDirectSupplierToProject} onChange={(v) => onUpdateField("isDirectSupplierToProject", v)} t={t} />
    <YesNoField labelKey="hasPreviousGrantLabel"          fieldKey="hasPreviousGrant"          value={form.hasPreviousGrant}          error={errors.hasPreviousGrant}          onChange={(v) => onUpdateField("hasPreviousGrant", v)}          t={t} />

    {form.hasPreviousGrant && (
      <div className="col-12">
        <label>
          <input type="text" value={form.previousGrantDetails} onChange={(e) => onUpdateField("previousGrantDetails", e.target.value)} placeholder={t("previousGrantDetailsPlaceholder")} />
        </label>
      </div>
    )}
  </>
);

// ─── Step 2: Informations sur l'entreprise ────────────────────────────────────

const Step2Fields: React.FC<any> = ({
  form, errors, sectors, provinces, communes, companyCommunes, isKi,
  loadingStates, canShowCompanyFields, onUpdateField, t,
}) => (
  <>
    {/* Type d'entreprise */}
    <div className="col-12">
      <p style={{ fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 10 }}>
        {t("haveCompany")} <span style={{ color: "#dc3545" }}>*</span>
      </p>
      <div className="copa-radio-cards">
        {COMPANY_STATUS_OPTIONS.map((option) => (
          <label key={option.value} className={`copa-radio-card ${form.companyStatus === option.value ? "is-selected" : ""}`}>
            <input type="radio" name="companyStatus" value={option.value} checked={form.companyStatus === option.value}
              onChange={(e) => onUpdateField("companyStatus", e.target.value)} />
            <span className="copa-radio-card__check">
              <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" width="10" height="10">
                <path d="M1.5 5l2.5 2.5 5-5" strokeLinecap="round" strokeWidth="2.5" />
              </svg>
            </span>
            <span className="copa-radio-card__name">{t(option.labelKey)}</span>
            <span className="copa-radio-card__desc">{t(option.descKey)}</span>
          </label>
        ))}
      </div>
      {errors.companyStatus && <span className="copa-error-msg">{errors.companyStatus}</span>}
    </div>

    {canShowCompanyFields && (
      <>
        {/* Nom entreprise */}
        <div className="col-lg-6">
          <label className={errors.companyName ? "copa-input-invalid" : ""}>
            <i className="ti ti-briefcase" />
            <input type="text" value={form.companyName} onChange={(e) => onUpdateField("companyName", e.target.value)} placeholder={t("companyName")} />
          </label>
          {errors.companyName && <span className="copa-error-msg">{errors.companyName}</span>}
        </div>

        {/* NIF / N° d'enregistrement */}
        <div className="col-lg-6">
          <label className={errors.nif ? "copa-input-invalid" : ""}>
            <i className="ti ti-id-badge" />
            <input type="text" value={form.nif} onChange={(e) => onUpdateField("nif", e.target.value)} placeholder={t("nif")} />
          </label>
          {errors.nif && <span className="copa-error-msg">{errors.nif}</span>}
        </div>

        {/* Statut juridique (formel uniquement) */}
        {form.companyStatus === "formal" && (
          <>
            <div className="col-lg-6">
              <label className={errors.legalStatus ? "copa-input-invalid" : ""}>
                <i className="ti ti-clipboard" />
                <select value={form.legalStatus} onChange={(e) => onUpdateField("legalStatus", e.target.value)}>
                  <option value="">{t("selectLegalStatus")}</option>
                  {LEGAL_STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </label>
              {errors.legalStatus && <span className="copa-error-msg">{errors.legalStatus}</span>}
            </div>
            {form.legalStatus === "other" && (
              <div className="col-lg-6">
                <label>
                  <i className="ti ti-pencil" />
                  <input type="text" value={form.legalStatusOther} onChange={(e) => onUpdateField("legalStatusOther", e.target.value)} placeholder={t("specifyLegalStatus")} />
                </label>
              </div>
            )}
          </>
        )}

        {/* Année de création / Secteur */}
        <div className="col-lg-6">
          <label className={errors.creationYear ? "copa-input-invalid" : ""}>
            <i className="ti ti-calendar" />
            <input type="number" value={String(form.creationYear)}
              onChange={(e) => onUpdateField("creationYear", e.target.value ? +e.target.value : "")}
              placeholder={t("creationYear")} min="1900" max={new Date().getFullYear()} />
          </label>
          {errors.creationYear && <span className="copa-error-msg">{errors.creationYear}</span>}
        </div>
        <div className="col-lg-6">
          <label className={errors.sectorId ? "copa-input-invalid" : ""}>
            <i className="ti ti-briefcase" />
            <select value={String(form.sectorId)} onChange={(e) => onUpdateField("sectorId", e.target.value ? +e.target.value : "")}>
              <option value="">{loadingStates.sectors ? t("loading") : t("selectSector")}</option>
              {sectors.map((s: any) => <option key={s.id} value={s.id}>{isKi && s.nameRn ? s.nameRn : s.nameFr}</option>)}
            </select>
          </label>
          {errors.sectorId && <span className="copa-error-msg">{errors.sectorId}</span>}
        </div>

        {/* Description activité */}
        <div className="col-12">
          <label className={errors.activityDescription ? "copa-input-invalid" : ""}>
            <textarea rows={4} value={form.activityDescription} onChange={(e) => onUpdateField("activityDescription", e.target.value)}
              placeholder={t("activityDescription")} style={{ paddingLeft: 15, lineHeight: 1.5 }} />
          </label>
          {errors.activityDescription && <span className="copa-error-msg">{errors.activityDescription}</span>}
        </div>

        {/* Adresse de l'entreprise */}
        <div className="col-12 mt-20 mb-10">
          <h6 style={{ color: "#666" }}>{t("companyAddressIfDifferent")}</h6>
        </div>
        <div className="col-lg-6">
          <label>
            <i className="ti ti-home" />
            <input type="text" value={form.companyNeighborhood} onChange={(e) => onUpdateField("companyNeighborhood", e.target.value)} placeholder={t("neighborhood")} />
          </label>
        </div>
        <div className="col-lg-6">
          <label>
            <i className="ti ti-location-pin" />
            <input type="text" value={form.companyZone} onChange={(e) => onUpdateField("companyZone", e.target.value)} placeholder={t("zone")} />
          </label>
        </div>
        <div className="col-lg-6">
          <label>
            <i className="ti ti-map" />
            <select value={String(form.companyProvinceId)} onChange={(e) => onUpdateField("companyProvinceId", e.target.value ? +e.target.value : "")}>
              <option value="">{t("selectProvince")}</option>
              {provinces.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </label>
        </div>
        <div className="col-lg-6">
          <label>
            <i className="ti ti-map-alt" />
            <select value={String(form.companyCommuneId)} onChange={(e) => onUpdateField("companyCommuneId", e.target.value ? +e.target.value : "")} disabled={!form.companyProvinceId}>
              <option value="">{!form.companyProvinceId ? t("selectProvinceFirst") : t("selectCommune")}</option>
              {companyCommunes.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
        </div>
        <div className="col-lg-6">
          <label>
            <PhoneInput country="bi" value={form.companyPhone} onChange={(phone) => onUpdateField("companyPhone", phone)}
              autoFormat enableSearch countryCodeEditable={false} disableSearchIcon placeholder={t("phoneNumber")} />
          </label>
        </div>
        <div className="col-lg-6">
          <label>
            <i className="ti ti-email" />
            <input type="email" value={form.companyEmail} onChange={(e) => onUpdateField("companyEmail", e.target.value)} placeholder={t("email")} />
          </label>
        </div>

        {/* Affiliée CGA */}
        <YesNoField labelKey="affiliatedToCGALabel" fieldKey="affiliatedToCGA" value={form.affiliatedToCGA}
          error={errors.affiliatedToCGA} onChange={(v) => onUpdateField("affiliatedToCGA", v)} t={t} />

        {/* Effectifs */}
        <div className="col-12 mt-20 mb-10">
          <h6 style={{ color: "#666" }}>{t("employeesBreakdown")}</h6>
        </div>
        {[
          { key: "femaleEmployees",   icon: "ti-user",    placeholderKey: "femaleEmployees"   },
          { key: "maleEmployees",     icon: "ti-user",    placeholderKey: "maleEmployees"     },
          { key: "refugeeEmployees",  icon: "ti-user",    placeholderKey: "refugeeEmployees"  },
          { key: "batwaEmployees",    icon: "ti-user",    placeholderKey: "batwaEmployees"    },
          { key: "disabledEmployees", icon: "ti-user",    placeholderKey: "disabledEmployees" },
          { key: "employeeCount",     icon: "fa fa-users",placeholderKey: "permanentEmployees"},
        ].map(({ key, icon, placeholderKey }) => (
          <div className="col-lg-4" key={key}>
            <label className={(errors as any)[key] ? "copa-input-invalid" : ""}>
              <i className={icon} />
              <input type="number" min="0"
                value={String((form as any)[key])}
                onChange={(e) => onUpdateField(key as keyof FormData, e.target.value ? +e.target.value : "" as any)}
                placeholder={t(placeholderKey)} />
            </label>
            {(errors as any)[key] && <span className="copa-error-msg">{(errors as any)[key]}</span>}
          </div>
        ))}

        {/* Nombre d'associés */}
        <div className="col-12 mt-20 mb-10">
          <h6 style={{ color: "#666" }}>{t("associatesCount")}</h6>
        </div>
        <div className="col-12">
          <div className="d-flex flex-wrap" style={{ gap: 12 }}>
            {(["solo", "2", "3", "other"] as const).map((val) => (
              <label key={val} className={`copa-radio-card copa-radio-card--sm ${form.associatesCount === val ? "is-selected" : ""}`}
                style={{ padding: "10px 18px", flexDirection: "row", gap: 8 }}>
                <input type="radio" name="associatesCount" value={val} checked={form.associatesCount === val}
                  onChange={(e) => onUpdateField("associatesCount", e.target.value)} />
                <span className="copa-radio-card__check">
                  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" width="10" height="10">
                    <path d="M1.5 5l2.5 2.5 5-5" strokeLinecap="round" strokeWidth="2.5" />
                  </svg>
                </span>
                <span className="copa-radio-card__name">{t(`associates_${val}`)}</span>
              </label>
            ))}
          </div>
          {errors.associatesCount && <span className="copa-error-msg">{errors.associatesCount}</span>}
        </div>
        {form.associatesCount === "other" && (
          <div className="col-lg-6">
            <label>
              <i className="ti ti-pencil" />
              <input type="text" value={form.associatesCountOther} onChange={(e) => onUpdateField("associatesCountOther", e.target.value)} placeholder={t("specifyAssociatesCount")} />
            </label>
          </div>
        )}

        {/* Répartition associés */}
        {form.associatesCount && form.associatesCount !== "solo" && (
          <>
            <div className="col-12 mt-10 mb-5">
              <p style={{ fontSize: 13, color: "#666" }}>{t("partnersBreakdown")}</p>
            </div>
            {[
              { key: "femalePartners",   placeholderKey: "femalePartners"   },
              { key: "malePartners",     placeholderKey: "malePartners"     },
              { key: "refugeePartners",  placeholderKey: "refugeePartners"  },
              { key: "batwaPartners",    placeholderKey: "batwaPartners"    },
              { key: "disabledPartners", placeholderKey: "disabledPartners" },
            ].map(({ key, placeholderKey }) => (
              <div className="col-lg-4" key={key}>
                <label>
                  <i className="ti ti-user" />
                  <input type="number" min="0"
                    value={String((form as any)[key])}
                    onChange={(e) => onUpdateField(key as keyof FormData, e.target.value ? +e.target.value : "" as any)}
                    placeholder={t(placeholderKey)} />
                </label>
              </div>
            ))}
          </>
        )}

        {/* Financials */}
        <div className="col-lg-6">
          <label>
            <i className="ti ti-money" />
            <input type="number" min="0" value={String(form.annualRevenue)}
              onChange={(e) => onUpdateField("annualRevenue", e.target.value ? +e.target.value : "")}
              placeholder={t("annualRevenue")} />
          </label>
        </div>

        {/* Compte bancaire / Crédit */}
        <YesNoField labelKey="hasBankAccountLabel" fieldKey="hasBankAccount" value={form.hasBankAccount}
          error={errors.hasBankAccount} onChange={(v) => onUpdateField("hasBankAccount", v)} t={t} />
        <YesNoField labelKey="hasBankCreditLabel" fieldKey="hasBankCredit" value={form.hasBankCredit}
          error={errors.hasBankCredit} onChange={(v) => onUpdateField("hasBankCredit", v)} t={t} />
        {form.hasBankCredit && (
          <div className="col-lg-6">
            <label>
              <i className="ti ti-money" />
              <input type="number" min="0" value={String(form.bankCreditAmount)}
                onChange={(e) => onUpdateField("bankCreditAmount", e.target.value ? +e.target.value : "")}
                placeholder={t("bankCreditAmount")} />
            </label>
          </div>
        )}
      </>
    )}
  </>
);

// ─── Step 3: Présentation du projet ──────────────────────────────────────────

const Step3Fields: React.FC<any> = ({ form, errors, onUpdateField, toggleArrayField, t }) => (
  <>
    {/* Titre */}
    <div className="col-12">
      <label className={errors.projectTitle ? "copa-input-invalid" : ""}>
        <i className="ti ti-pencil-alt" />
        <input type="text" value={form.projectTitle} onChange={(e) => onUpdateField("projectTitle", e.target.value)} placeholder={t("projectTitle")} />
      </label>
      {errors.projectTitle && <span className="copa-error-msg">{errors.projectTitle}</span>}
    </div>

    {/* Objectif */}
    <div className="col-12">
      <label className={errors.projectObjective ? "copa-input-invalid" : ""}>
        <textarea rows={3} value={form.projectObjective} onChange={(e) => onUpdateField("projectObjective", e.target.value)}
          placeholder={t("projectObjective")} style={{ paddingLeft: 15, lineHeight: 1.5 }} />
      </label>
      {errors.projectObjective && <span className="copa-error-msg">{errors.projectObjective}</span>}
    </div>

    {/* Secteurs d'activité */}
    <div className="col-12">
      <p style={{ fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 8 }}>
        {t("projectSectors")} <span style={{ color: "#dc3545" }}>*</span>
      </p>
      <div className="d-flex flex-wrap" style={{ gap: 10 }}>
        {PROJECT_SECTORS.map((s) => (
          <label key={s.value} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <input type="checkbox" checked={form.projectSectors.includes(s.value)}
              onChange={() => toggleArrayField("projectSectors", s.value)} />
            <span style={{ fontSize: 13 }}>{t(s.labelKey)}</span>
          </label>
        ))}
      </div>
      {errors.projectSectors && <span className="copa-error-msg">{errors.projectSectors}</span>}
      {form.projectSectors.includes("other") && (
        <div className="mt-10">
          <label>
            <i className="ti ti-pencil" />
            <input type="text" value={form.otherSector} onChange={(e) => onUpdateField("otherSector", e.target.value)} placeholder={t("specifyOtherSector")} />
          </label>
        </div>
      )}
    </div>

    {/* Activités principales */}
    <div className="col-12">
      <label className={errors.mainActivities ? "copa-input-invalid" : ""}>
        <textarea rows={3} value={form.mainActivities} onChange={(e) => onUpdateField("mainActivities", e.target.value)}
          placeholder={t("mainActivities")} style={{ paddingLeft: 15, lineHeight: 1.5 }} />
      </label>
      {errors.mainActivities && <span className="copa-error-msg">{errors.mainActivities}</span>}
    </div>

    {/* Produits/services */}
    <div className="col-12">
      <label className={errors.productsServices ? "copa-input-invalid" : ""}>
        <textarea rows={3} value={form.productsServices} onChange={(e) => onUpdateField("productsServices", e.target.value)}
          placeholder={t("productsServices")} style={{ paddingLeft: 15, lineHeight: 1.5 }} />
      </label>
      {errors.productsServices && <span className="copa-error-msg">{errors.productsServices}</span>}
    </div>

    {/* Idée de l'entreprise */}
    <div className="col-12">
      <label>
        <textarea rows={3} value={form.businessIdea} onChange={(e) => onUpdateField("businessIdea", e.target.value)}
          placeholder={t("businessIdeaOrigin")} style={{ paddingLeft: 15, lineHeight: 1.5 }} />
      </label>
    </div>

    {/* Profil clientèle */}
    <div className="col-12">
      <label className={errors.targetClients ? "copa-input-invalid" : ""}>
        <textarea rows={2} value={form.targetClients} onChange={(e) => onUpdateField("targetClients", e.target.value)}
          placeholder={t("targetClientsProfile")} style={{ paddingLeft: 15, lineHeight: 1.5 }} />
      </label>
      {errors.targetClients && <span className="copa-error-msg">{errors.targetClients}</span>}
    </div>

    {/* Périmètre clients */}
    <div className="col-12">
      <p style={{ fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 8 }}>
        {t("clientScope")} <span style={{ color: "#dc3545" }}>*</span>
      </p>
      <div className="d-flex flex-wrap" style={{ gap: 10 }}>
        {(["local","national","eastAfrica","international"] as const).map((val) => (
          <label key={val} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <input type="checkbox" checked={form.clientScope.includes(val)} onChange={() => toggleArrayField("clientScope", val)} />
            <span style={{ fontSize: 13 }}>{t(`scope_${val}`)}</span>
          </label>
        ))}
      </div>
      {errors.clientScope && <span className="copa-error-msg">{errors.clientScope}</span>}
    </div>

    {/* Concurrents */}
    <YesNoField labelKey="hasCompetitorsLabel" fieldKey="hasCompetitors" value={form.hasCompetitors}
      error={errors.hasCompetitors} onChange={(v) => onUpdateField("hasCompetitors", v)} t={t} />
    {form.hasCompetitors && (
      <div className="col-12">
        <label>
          <textarea rows={2} value={form.competitorNames} onChange={(e) => onUpdateField("competitorNames", e.target.value)}
            placeholder={t("competitorNamesPlaceholder")} style={{ paddingLeft: 15, lineHeight: 1.5 }} />
        </label>
      </div>
    )}

    {/* Emplois prévus */}
    <div className="col-12 mt-10 mb-5">
      <p style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>{t("plannedEmployees")}</p>
    </div>
    <div className="col-lg-4">
      <label>
        <i className="ti ti-user" />
        <input type="number" min="0" value={String(form.plannedEmployeesFemale)}
          onChange={(e) => onUpdateField("plannedEmployeesFemale", e.target.value ? +e.target.value : "")}
          placeholder={t("femaleEmployees")} />
      </label>
    </div>
    <div className="col-lg-4">
      <label>
        <i className="ti ti-user" />
        <input type="number" min="0" value={String(form.plannedEmployeesMale)}
          onChange={(e) => onUpdateField("plannedEmployeesMale", e.target.value ? +e.target.value : "")}
          placeholder={t("maleEmployees")} />
      </label>
    </div>
    <div className="col-lg-4">
      <label>
        <i className="fa fa-users" />
        <input type="number" min="0" value={String(form.plannedPermanentEmployees)}
          onChange={(e) => onUpdateField("plannedPermanentEmployees", e.target.value ? +e.target.value : "")}
          placeholder={t("permanentEmployees")} />
      </label>
    </div>

    {/* Idée nouvelle ou améliorée */}
    <YesNoField labelKey="isNewIdeaLabel" fieldKey="isNewIdea" value={form.isNewIdea}
      error={errors.isNewIdea} onChange={(v) => onUpdateField("isNewIdea", v)} t={t} />

    {/* Changement climatique */}
    <div className="col-12">
      <label className={errors.climateActions ? "copa-input-invalid" : ""}>
        <textarea rows={3} value={form.climateActions} onChange={(e) => onUpdateField("climateActions", e.target.value)}
          placeholder={t("climateActionsPlaceholder")} style={{ paddingLeft: 15, lineHeight: 1.5 }} />
      </label>
      {errors.climateActions && <span className="copa-error-msg">{errors.climateActions}</span>}
    </div>

    {/* Inclusion */}
    <div className="col-12">
      <label className={errors.inclusionActions ? "copa-input-invalid" : ""}>
        <textarea rows={3} value={form.inclusionActions} onChange={(e) => onUpdateField("inclusionActions", e.target.value)}
          placeholder={t("inclusionActionsPlaceholder")} style={{ paddingLeft: 15, lineHeight: 1.5 }} />
      </label>
      {errors.inclusionActions && <span className="copa-error-msg">{errors.inclusionActions}</span>}
    </div>

    {/* Coûts */}
    <YesNoField labelKey="hasEstimatedCostLabel" fieldKey="hasEstimatedCost" value={form.hasEstimatedCost}
      error={errors.hasEstimatedCost} onChange={(v) => onUpdateField("hasEstimatedCost", v)} t={t} />
    {form.hasEstimatedCost && (
      <>
        <div className="col-lg-6">
          <label className={errors.totalProjectCost ? "copa-input-invalid" : ""}>
            <i className="ti ti-money" />
            <input type="number" min="0" value={String(form.totalProjectCost)}
              onChange={(e) => onUpdateField("totalProjectCost", e.target.value ? +e.target.value : "")}
              placeholder={t("totalProjectCost")} />
          </label>
          {errors.totalProjectCost && <span className="copa-error-msg">{errors.totalProjectCost}</span>}
        </div>
        <div className="col-lg-6">
          <label className={errors.requestedSubsidyAmount ? "copa-input-invalid" : ""}>
            <i className="ti ti-money" />
            <input type="number" min="0" value={String(form.requestedSubsidyAmount)}
              onChange={(e) => onUpdateField("requestedSubsidyAmount", e.target.value ? +e.target.value : "")}
              placeholder={t("requestedSubsidyAmount")} />
          </label>
          {errors.requestedSubsidyAmount && <span className="copa-error-msg">{errors.requestedSubsidyAmount}</span>}
        </div>
      </>
    )}

    {/* Postes de dépense */}
    <div className="col-12">
      <label className={errors.mainExpenses ? "copa-input-invalid" : ""}>
        <textarea rows={3} value={form.mainExpenses} onChange={(e) => onUpdateField("mainExpenses", e.target.value)}
          placeholder={t("mainExpensesPlaceholder")} style={{ paddingLeft: 15, lineHeight: 1.5 }} />
      </label>
      {errors.mainExpenses && <span className="copa-error-msg">{errors.mainExpenses}</span>}
    </div>
  </>
);

// ─── Step 4: Validation & Envoi ───────────────────────────────────────────────

const Step4Fields: React.FC<any> = ({ form, errors, onUpdateField, t }) => (
  <div className="col-12">
    <div className="copa-checklist">
      {CONSENT_OPTIONS.map((item) => (
        <label key={item.key} className={`copa-check-row ${form[item.key] ? "is-checked" : ""} ${errors[item.key] ? "is-invalid" : ""}`}>
          <input type="checkbox" checked={form[item.key] as boolean} onChange={(e) => onUpdateField(item.key, e.target.checked)} />
          <span className="copa-check-row__box">
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M1.5 5l2.5 2.5 5-5" strokeLinecap="round" strokeWidth="2.5" />
            </svg>
          </span>
          <span className="copa-check-row__text">
            {t(item.labelKey)}
            {item.required && <span className="required-star" style={{ color: "#dc3545" }}> *</span>}
            {item.link && (
              <Link to="#" target="_blank" rel="noopener noreferrer" className="copa-check-row__link" onClick={(e) => e.stopPropagation()}>
                {t("read")} →
              </Link>
            )}
          </span>
          {errors[item.key] && <span className="copa-check-row__error">{errors[item.key]}</span>}
        </label>
      ))}
    </div>
  </div>
);

export default Profile;
