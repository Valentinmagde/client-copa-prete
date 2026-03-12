import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
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
import { validateEmail, validateNif } from "@/utils/validators";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { French } from "flatpickr/dist/l10n/fr";
import DocumentService from "@/services/document/document.service";

const KirundiLocale = {
  weekdays: {
    shorthand: ["cu", "mbe", "kab", "gtu", "kan", "gnu", "gnd"],
    longhand: [
      "Ku cyumweru",
      "Kuwa mbere",
      "Kuwa kabiri",
      "Kuwa gatatu",
      "Kuwa kane",
      "Kuwa gatanu",
      "Kuwa gatandatu",
    ],
  },
  months: {
    shorthand: [
      "Nzero",
      "Ruhuhuma",
      "Ntwarante",
      "Ndamukiza",
      "Rusama",
      "Ruheshi",
      "Mukakaro",
      "Myandagaro",
      "Nyakanga",
      "Gitugutu",
      "Munyonyo",
      "Kigarama",
    ],
    longhand: [
      "Nzero",
      "Ruhuhuma",
      "Ntwarante",
      "Ndamukiza",
      "Rusama",
      "Ruheshi",
      "Mukakaro",
      "Myandagaro",
      "Nyakanga",
      "Gitugutu",
      "Munyonyo",
      "Kigarama",
    ],
  },
  firstDayOfWeek: 1,
};

// ─── Types ────────────────────────────────────────────────────────────────────

type EntrepreneurType = "burundian" | "refugee" | "";
type GenderType = "M" | "F" | "";
type CompanyStatusType = "formal" | "informal" | "project" | "";
type MaritalStatusType = "single" | "married" | "divorced" | "widowed" | "";
type EducationLevelType = "none" | "primary" | "secondary" | "university" | "";
type LegalStatusType =
  | "snc"
  | "scs"
  | "sprl"
  | "su"
  | "sa"
  | "coop"
  | "other"
  | "";
type AssociatesCountType = "solo" | "2" | "3" | "other" | "";
type ClientScopeType = "local" | "national" | "eastAfrica" | "international";
type TriBool = "yes" | "no" | "";
// type DocumentFiles = Record<string, File | null>;
type DocumentFiles = Record<
  string,
  {
    file?: File | null;
    existing?: {
      id: number;
      name: string;
      size: number;
      type: string;
      url: string;
      validationStatus: string;
    };
  } | null
>;

interface FormData {
  // Step 1
  entrepreneurType: EntrepreneurType;
  firstName: string;
  lastName: string;
  position: string;
  gender: GenderType;
  birthDate: string;
  maritalStatus: MaritalStatusType;
  educationLevel: EducationLevelType;
  neighborhood: string;
  zone: string;
  provinceId: number | "";
  communeId: number | "";
  phone: string;
  email: string;
  isPublicServant: TriBool;
  isRelativeOfPublicServant: TriBool;
  isPublicIntern: TriBool;
  isRelativeOfPublicIntern: TriBool;
  wasHighOfficer: TriBool;
  isRelativeOfHighOfficer: TriBool;
  hasProjectLink: TriBool;
  isDirectSupplierToProject: TriBool;
  hasPreviousGrant: TriBool;
  previousGrantDetails: string;
  isWomanLed: boolean;
  isRefugeeLed: boolean;
  hasClimateImpact: boolean;

  // Step 2
  companyStatus: CompanyStatusType;
  companyName: string;
  companyNeighborhood: string;
  companyZone: string;
  companyProvinceId: number | "";
  companyCommuneId: number | "";
  companyPhone: string;
  companyEmail: string;
  legalStatus: LegalStatusType;
  legalStatusOther: string;
  nif: string;
  affiliatedToCGA: TriBool;
  femaleEmployees: number | "";
  maleEmployees: number | "";
  refugeeEmployees: number | "";
  batwaEmployees: number | "";
  disabledEmployees: number | "";
  employeeCount: number | "";
  associatesCount: AssociatesCountType;
  associatesCountOther: string;
  femalePartners: number | "";
  malePartners: number | "";
  refugeePartners: number | "";
  batwaPartners: number | "";
  disabledPartners: number | "";
  annualRevenue: number | "";
  creationYear: number | "";
  sectorId: number | "";
  activityDescription: string;
  hasBankAccount: TriBool;
  hasBankCredit: TriBool;
  bankCreditAmount: number | "";
  // Step 3
  projectTitle: string;
  projectObjective: string;
  projectSectors: string[];
  otherSector: string;
  mainActivities: string;
  productsServices: string;
  businessIdea: string;
  targetClients: string;
  clientScope: ClientScopeType[];
  hasCompetitors: TriBool;
  competitorNames: string;
  plannedEmployeesFemale: number | "";
  plannedEmployeesMale: number | "";
  plannedPermanentEmployees: number | "";
  isNewIdea: TriBool;
  climateActions: string;
  inclusionActions: string;
  hasEstimatedCost: TriBool;
  totalProjectCost: number | "";
  requestedSubsidyAmount: number | "";
  mainExpenses: string;
  // Step 4
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
  companyType: string;
  isProfileComplete?: boolean;
  beneficiaryNumber?: string; // Numéro de bénéficiaire (00001, etc.)
  documentsByKey?: Record<string, any>; // Documents organisés par clé

  // ✅ Champs directement dans beneficiary (hors user)
  position?: string;
  maritalStatus?: string;
  educationLevel?: string;

  // ✅ Questions d'éligibilité
  isPublicServant?: boolean;
  isRelativeOfPublicServant?: boolean;
  isPublicIntern?: boolean;
  isRelativeOfPublicIntern?: boolean;
  wasHighOfficer?: boolean;
  isRelativeOfHighOfficer?: boolean;
  hasProjectLink?: boolean;
  isDirectSupplierToProject?: boolean;
  hasPreviousGrant?: boolean;
  previousGrantDetails?: string;

  // ✅ Champs projet
  projectTitle?: string;
  projectObjective?: string;
  projectSectors?: string[];
  otherSector?: string;
  mainActivities?: string;
  productsServices?: string;
  businessIdea?: string;
  targetClients?: string;
  clientScope?: string[];
  hasCompetitors?: boolean;
  competitorNames?: string;
  plannedEmployeesFemale?: number;
  plannedEmployeesMale?: number;
  plannedPermanentEmployees?: number;
  isNewIdea?: boolean;
  climateActions?: string;
  inclusionActions?: string;
  hasEstimatedCost?: boolean;
  totalProjectCost?: number;
  requestedSubsidyAmount?: number;
  mainExpenses?: string;

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
      zone?: string;
      colline?: string;
      neighborhood?: string;
      street?: string;
    };
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

    // ✅ Adresse de l'entreprise (si différente)
    address?: {
      neighborhood?: string;
      street?: string;
      provinceId?: number;
      communeId?: number;
      zone?: string;
      colline?: string;
    };

    // ✅ Contacts
    companyPhone?: string;
    companyEmail?: string;

    // ✅ Informations juridiques
    legalStatus?: string;
    legalStatusOther?: string;
    registrationNumber?: string;
    affiliatedToCGA?: boolean;

    // ✅ Effectifs détaillés
    femaleEmployees?: number;
    maleEmployees?: number;
    refugeeEmployees?: number;
    batwaEmployees?: number;
    disabledEmployees?: number;

    // ✅ Associés
    associatesCount?: string;
    associatesCountOther?: string;
    femalePartners?: number;
    malePartners?: number;
    refugeePartners?: number;
    batwaPartners?: number;
    disabledPartners?: number;

    // ✅ Informations bancaires
    hasBankAccount?: boolean;
    hasBankCredit?: boolean;
    bankCreditAmount?: number;

    // ✅ Indicateurs
    isLedByWoman?: boolean;
    isLedByRefugee?: boolean;
    hasPositiveClimateImpact?: boolean;

    // ✅ Pour compatibilité (anciens champs)
    addressDifferent?: boolean;
    phone?: string;
    email?: string;
    partnerCount?: string;
    partnerCountOther?: string;
    creditAmount?: number;
  };
}

const INITIAL_FORM: FormData = {
  entrepreneurType: "",
  firstName: "",
  lastName: "",
  position: "",
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
  isPublicServant: "",
  isRelativeOfPublicServant: "",
  isPublicIntern: "",
  isRelativeOfPublicIntern: "",
  wasHighOfficer: "",
  isRelativeOfHighOfficer: "",
  hasProjectLink: "",
  isDirectSupplierToProject: "",
  hasPreviousGrant: "",
  previousGrantDetails: "",
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
  affiliatedToCGA: "",
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
  hasBankAccount: "",
  hasBankCredit: "",
  bankCreditAmount: "",
  projectTitle: "",
  projectObjective: "",
  projectSectors: [],
  otherSector: "",
  mainActivities: "",
  productsServices: "",
  businessIdea: "",
  targetClients: "",
  clientScope: [],
  hasCompetitors: "",
  competitorNames: "",
  plannedEmployeesFemale: "",
  plannedEmployeesMale: "",
  plannedPermanentEmployees: "",
  isNewIdea: "",
  climateActions: "",
  inclusionActions: "",
  hasEstimatedCost: "",
  totalProjectCost: "",
  requestedSubsidyAmount: "",
  mainExpenses: "",
  acceptTerms: true,
  acceptPrivacy: true,
  certifyAccuracy: true,
  acceptNotifications: false,
  isRefugeeLed: false,
  isWomanLed: false,
  hasClimateImpact: false,
};

const STEPS = [
  { num: 1, labelKey: "basicInformation", weight: 25, stepName: "STEP1" },
  { num: 2, labelKey: "companyInformation", weight: 25, stepName: "STEP2" },
  { num: 3, labelKey: "projectPresentation", weight: 25, stepName: "STEP3" },
  { num: 4, labelKey: "validationAndSend", weight: 25, stepName: "STEP4" },
] as const;

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

const CONSENT_OPTIONS = [
  {
    key: "acceptTerms" as const,
    labelKey: "acceptTerms",
    link: "/conditions-utilisation",
    required: true,
  },
  {
    key: "acceptPrivacy" as const,
    labelKey: "acceptPrivacy",
    link: "/politique-confidentialite",
    required: true,
  },
  {
    key: "certifyAccuracy" as const,
    labelKey: "certifyAccuracy",
    link: null,
    required: true,
  },
  {
    key: "acceptNotifications" as const,
    labelKey: "acceptNotifications",
    link: null,
    required: false,
  },
];

export const FORMAL_DOCS = [
  { key: "idCard", labelKey: "doc_idCard", required: true, typeId: 1 },
  {
    key: "criminalRecord",
    labelKey: "doc_criminalRecord",
    required: true,
    typeId: 2,
  },
  { key: "managerAct", labelKey: "doc_managerAct", required: false, typeId: 3 },
  {
    key: "commerceRegister",
    labelKey: "doc_commerceRegister",
    required: true,
    typeId: 4,
  },
  {
    key: "bankStatements",
    labelKey: "doc_bankStatements",
    required: true,
    typeId: 6,
  },
];

export const INFORMAL_DOCS = [
  {
    key: "communalAttestation",
    labelKey: "doc_communalAttestation",
    required: true,
    typeId: 7,
  },
  { key: "idCard", labelKey: "doc_idCard", required: true, typeId: 1 },
  {
    key: "criminalRecord",
    labelKey: "doc_criminalRecord",
    required: true,
    typeId: 2,
  },
  {
    key: "bankStatements",
    labelKey: "doc_bankStatements",
    required: true,
    typeId: 6,
  },
];

const PROJECT_SECTORS_LIST = [
  { value: "milk", labelKey: "sectorMilk" },
  { value: "poultry", labelKey: "sectorPoultry" },
  { value: "fish", labelKey: "sectorFish" },
  { value: "tropicalFruit", labelKey: "sectorFruit" },
  { value: "mining", labelKey: "sectorMining" },
  { value: "tourism", labelKey: "sectorTourism" },
  { value: "digital", labelKey: "sectorDigital" },
  { value: "other", labelKey: "sectorOther" },
];

const ELIGIBILITY_QUESTIONS: { key: keyof FormData; labelKey: string }[] = [
  { key: "isPublicServant", labelKey: "isPublicServantLabel" },
  {
    key: "isRelativeOfPublicServant",
    labelKey: "isRelativeOfPublicServantLabel",
  },
  { key: "isPublicIntern", labelKey: "isPublicInternLabel" },
  {
    key: "isRelativeOfPublicIntern",
    labelKey: "isRelativeOfPublicInternLabel",
  },
  { key: "wasHighOfficer", labelKey: "wasHighOfficerLabel" },
  { key: "isRelativeOfHighOfficer", labelKey: "isRelativeOfHighOfficerLabel" },
  { key: "hasProjectLink", labelKey: "hasProjectLinkLabel" },
  {
    key: "isDirectSupplierToProject",
    labelKey: "isDirectSupplierToProjectLabel",
  },
  { key: "hasPreviousGrant", labelKey: "hasPreviousGrantLabel" },
];

// ─── Shared UI atoms ──────────────────────────────────────────────────────────

/** Thin section separator — same style as rest of the form */
const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="col-12 mt-20 mb-5">
    <p
      style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#999",
        margin: 0,
        borderBottom: "1px solid #e5e5e5",
        paddingBottom: 8,
      }}
    >
      {title}
    </p>
  </div>
);

/**
 * Yes/No toggle rendered as two copa-check-row items.
 * Identical look to the consent checkboxes — only one can be active at a time.
 */
const CheckboxToggle: React.FC<{
  fieldKey: string;
  labelKey: string;
  value: TriBool;
  error?: string;
  onChange: (v: TriBool) => void;
  t: any;
}> = ({ fieldKey, labelKey, value, error, onChange, t }) => (
  <div className="col-12">
    <div className="copa-checklist" style={{ marginBottom: 4 }}>
      <label
        className={`copa-check-row ${value === "yes" ? "is-checked" : ""} ${error ? "is-invalid" : ""}`}
        style={{ marginBottom: 4 }}
      >
        <input
          type="checkbox"
          checked={value === "yes"}
          onChange={() => onChange(value === "yes" ? "" : "yes")}
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
          {t(labelKey)}&nbsp;—&nbsp;<strong>{t("yes")}</strong>
          <span style={{ color: "#dc3545" }}> *</span>
        </span>
      </label>

      <label
        className={`copa-check-row ${value === "no" ? "is-checked" : ""} ${error ? "is-invalid" : ""}`}
      >
        <input
          type="checkbox"
          checked={value === "no"}
          onChange={() => onChange(value === "no" ? "" : "no")}
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
          {t(labelKey)}&nbsp;—&nbsp;<strong>{t("no")}</strong>
        </span>
      </label>
    </div>
    {error && <span className="copa-error-msg">{error}</span>}
  </div>
);

/** Multi-select checklist — same copa-check-row design */
const CheckboxGroup: React.FC<{
  items: { value: string; labelKey: string }[];
  selected: string[];
  errorKey?: string;
  errors: FormErrors;
  onToggle: (v: string) => void;
  t: any;
}> = ({ items, selected, errorKey, errors, onToggle, t }) => (
  <div className="col-12">
    <div className="copa-checklist">
      {items.map(({ value, labelKey }) => (
        <label
          key={value}
          className={`copa-check-row ${selected.includes(value) ? "is-checked" : ""}`}
        >
          <input
            type="checkbox"
            checked={selected.includes(value)}
            onChange={() => onToggle(value)}
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
          <span className="copa-check-row__text">{t(labelKey)}</span>
        </label>
      ))}
    </div>
    {errorKey && errors[errorKey] && (
      <span className="copa-error-msg">{errors[errorKey]}</span>
    )}
  </div>
);

/** File upload row — styled as copa-check-row, no native file input visible */
// const FileUploadRow: React.FC<{
//   docKey: string;
//   labelKey: string;
//   required: boolean;
//   file: File | null;
//   error?: string;
//   onChange: (key: string, file: File | null) => void;
//   t: any;
// }> = ({ docKey, labelKey, required, file, error, onChange, t }) => {
//   const ref = useRef<HTMLInputElement>(null);
//   return (
//     <div className="col-12">
//       <label
//         className={`copa-check-row ${file ? "is-checked" : ""} ${error ? "is-invalid" : ""}`}
//         style={{ cursor: "pointer" }}
//         // onClick={() => ref.current?.click()}
//       >
//         <span className="copa-check-row__box" style={{ flexShrink: 0 }}>
//           {file ? (
//             <svg
//               viewBox="0 0 10 10"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2.5"
//             >
//               <path
//                 d="M1.5 5l2.5 2.5 5-5"
//                 strokeLinecap="round"
//                 strokeWidth="2.5"
//               />
//             </svg>
//           ) : (
//             <svg
//               viewBox="0 0 16 16"
//               fill="currentColor"
//               width="12"
//               height="12"
//               style={{ opacity: 0.35 }}
//             >
//               <path d="M8 1a.5.5 0 0 1 .5.5V7h5.5a.5.5 0 0 1 0 1H8.5v5.5a.5.5 0 0 1-1 0V8H2a.5.5 0 0 1 0-1h5.5V1.5A.5.5 0 0 1 8 1z" />
//             </svg>
//           )}
//         </span>

//         <span className="copa-check-row__text" style={{ flex: 1 }}>
//           {t(labelKey)}
//           {required && <span style={{ color: "#dc3545" }}> *</span>}
//         </span>

//         <span
//           style={{
//             fontSize: 11,
//             fontWeight: 600,
//             padding: "3px 14px",
//             borderRadius: 20,
//             flexShrink: 0,
//             whiteSpace: "nowrap",
//             background: file
//               ? "rgba(var(--skin-color-rgb, 76,175,80), 0.1)"
//               : "#f0f0f0",
//             color: file ? "var(--skin-color, #4caf50)" : "#888",
//           }}
//         >
//           {file
//             ? file.name.length > 24
//               ? file.name.slice(0, 22) + "…"
//               : file.name
//             : t("chooseFile")}
//         </span>

//         {file && (
//           <button
//             type="button"
//             style={{
//               border: "none",
//               background: "none",
//               color: "#dc3545",
//               padding: "0 8px",
//               fontSize: 18,
//               lineHeight: 1,
//               cursor: "pointer",
//             }}
//             onClick={(e) => {
//               e.stopPropagation();
//               e.preventDefault();
//               onChange(docKey, null);
//             }}
//           >
//             ×
//           </button>
//         )}

//         <input
//           ref={ref}
//           type="file"
//           accept=".pdf,.jpg,.jpeg,.png"
//           style={{ display: "none" }}
//           onChange={(e) => {
//             console.log(JSON.stringify(e.target.files?.[0]));
//             onChange(docKey, e.target.files?.[0] ?? null);
//             e.target.value = "";
//           }}
//         />
//       </label>
//       {error && <span className="copa-error-msg">{error}</span>}
//     </div>
//   );
// };

// ─── Main component ───────────────────────────────────────────────────────────

const FileUploadRow: React.FC<{
  docKey: string;
  labelKey: string;
  required: boolean;
  file: File | null;
  error?: string;
  onChange: (key: string, file: File | null) => void;
  t: any;
}> = ({ docKey, labelKey, required, file, error, onChange, t }) => {
  const [drag, setDrag] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState(false);

  // useEffect(() => {
  //   if (!file) { setPreviewUrl(null); return; }
  //   const url = URL.createObjectURL(file);
  //   setPreviewUrl(url);
  //   return () => URL.revokeObjectURL(url);
  // }, [file]);

  const isImage = file?.type.startsWith("image/") ?? false;
  const isPdf = file?.type === "application/pdf";

  const pick = (f?: File | null) => {
    if (f) onChange(docKey, f);
  };

  return (
    <>
      <div className="col-12" style={{ marginBottom: 30 }}>
        {file ? (
          /* ── Uploaded state ─────────────────────────────── */
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 14px",
              background: "#fff",
              border: "1px solid rgba(119,119,119,.18)",
              borderRadius: 6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {isImage && previewUrl ? (
                <button
                  type="button"
                  onClick={() => setLightbox(true)}
                  style={{
                    width: 34,
                    height: 34,
                    padding: 0,
                    border: "1px solid #ddd",
                    borderRadius: 4,
                    overflow: "hidden",
                    cursor: "zoom-in",
                    background: "none",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={previewUrl}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </button>
              ) : (
                <i
                  className="ti ti-files"
                  style={{ fontSize: 18, flexShrink: 0 }}
                />
              )}
              <div>
                <p style={{ color: "#999", margin: 0 }}>{t(labelKey)}</p>
                <p style={{ fontSize: 12, fontWeight: 400, margin: 0 }}>
                  {file.name.length > 64
                    ? file.name.slice(0, 60) + "…"
                    : file.name}{" "}
                  ·{" "}
                  {file.size < 1_048_576
                    ? `${(file.size / 1024).toFixed(0)} Ko`
                    : `${(file.size / 1_048_576).toFixed(1)} Mo`}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {isPdf && previewUrl && (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 12,
                    color: "var(--skin-color, #4caf50)",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="ti ti-eye" /> Voir
                </a>
              )}
              <button
                type="button"
                onClick={() => onChange(docKey, null)}
                style={{
                  border: "none",
                  background: "none",
                  padding: "2px 4px",
                  cursor: "pointer",
                  color: "#bbb",
                  fontSize: 16,
                  lineHeight: 1,
                  transition: "color .15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#dc3545")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#bbb")}
                title="Supprimer"
              >
                ×
              </button>
            </div>
          </div>
        ) : (
          /* ── Empty state ────────────────────────────────── */
          <label
            style={{ cursor: "pointer", display: "block", margin: 0 }}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              pick(e.dataTransfer.files?.[0]);
            }}
          >
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => {
                pick(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                border: `1.5px dashed ${drag ? "var(--skin-color, #4caf50)" : "rgba(119,119,119,.25)"}`,
                borderRadius: 6,
                background: "#fff",
                transition: "border-color .2s, background .2s",
              }}
            >
              <i
                className="ti ti-cloud-up"
                style={{ fontSize: 17, flexShrink: 0 }}
              />
              <span style={{ fontSize: 14, color: "#777" }}>
                {t(labelKey)}
                {/* {required && <span style={{ color: "#dc3545" }}> *</span>} */}
                <span
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#aaa",
                    marginTop: 5,
                  }}
                >
                  {t("dragAndDropOrClick")}{" "} (PDF,
                  DOCX, JPG, PNG — max 5 Mo)
                </span>
              </span>
            </div>
          </label>
        )}

        {error && <span className="copa-error-msg mt-5">{error}</span>}
      </div>

      {/* Lightbox */}
      {lightbox && isImage && previewUrl && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setLightbox(false)}
        >
          <div
            style={{
              position: "relative",
              background: "#fff",
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,.3)",
              maxWidth: "88vw",
              maxHeight: "88vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightbox(false)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "rgba(0,0,0,.45)",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontSize: 14,
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="ti ti-close" style={{ fontSize: 11 }} />
            </button>
            <img
              src={previewUrl}
              alt={file?.name}
              style={{
                maxWidth: "80vw",
                maxHeight: "80vh",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

const Profile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isKi = lang === "rn";
  const user = getUser();
  const navigate = useNavigate();

  const [beneficiary, setBeneficiary] = useState<BeneficiaryData | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(true);
  const [savingStep, setSavingStep] = useState<number | null>(null);
  const [documents, setDocuments] = useState<DocumentFiles>({});
  const [docErrors, setDocErrors] = useState<FormErrors>({});

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [companyCommunes, setCompanyCommunes] = useState<Commune[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loadingStates, setLoadingStates] = useState({
    provinces: false,
    communes: false,
    sectors: false,
  });

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  useEffect(() => {
    loadReferenceData();
  }, []);
  useEffect(() => {
    if (user?.id) loadBeneficiaryData();
  }, [user?.id]);
  useEffect(() => {
    if (!form.provinceId) {
      setCommunes([]);
      return;
    }
    loadCommunes(form.provinceId, setCommunes);
  }, [form.provinceId]);
  useEffect(() => {
    if (!form.companyProvinceId) {
      setCompanyCommunes([]);
      return;
    }
    loadCommunes(form.companyProvinceId, setCompanyCommunes);
  }, [form.companyProvinceId]);

  const loadReferenceData = async () => {
    setLoadingStates((p) => ({ ...p, provinces: true, sectors: true }));
    try {
      const [p, s] = await Promise.all([
        ReferenceService.getAllPovinces(lang),
        ReferenceService.getBusinessSectors(true, lang),
      ]);
      setProvinces(p);
      setSectors(s);
    } catch {
      toast.error(t("errorLoadingReference"));
    } finally {
      setLoadingStates((p) => ({ ...p, provinces: false, sectors: false }));
    }
  };

  const loadBeneficiaryData = async () => {
    setLoading(true);
    try {
      const res: any = await BeneficiaryService.getByUserId(user.id, lang);
      if (res) {
        setBeneficiary(res);
        mapToForm(res);

        if (res.documentsByKey) {
          const existingDocs: DocumentFiles = {};

          // Pour chaque document existant, on crée un placeholder
          Object.keys(res.documentsByKey).forEach((key) => {
            const doc = res.documentsByKey[key];

            // Créer un objet File-like avec les métadonnées
            // Note: On ne peut pas recréer le fichier original, mais on peut stocker les infos
            existingDocs[key] = {
              name: doc.originalFilename,
              size: doc.fileSizeBytes,
              type: doc.mimeType,
              // On peut aussi stocker l'URL pour prévisualisation
              preview: doc.filePath,
              validationStatus: doc.validationStatus,
              id: doc.id,
              uploadedAt: doc.uploadedAt,
              existing: {
                id: doc.id,
                name: doc.originalFilename,
                size: doc.fileSizeBytes,
                type: doc.mimeType,
                url: doc.filePath,
                validationStatus: doc.validationStatus,
              },
            } as any;
          });

          setDocuments((prev) => ({ ...prev, ...existingDocs }));
        }

        // if (res.isProfileComplete)
        //   navigate("/application-submitted", { replace: true });
      }
    } catch {
      toast.error(t("errorLoadingProfile"));
    } finally {
      setLoading(false);
    }
  };

  const loadCommunes = async (
    provinceId: number | "",
    setter: React.Dispatch<React.SetStateAction<Commune[]>>,
  ) => {
    if (!provinceId) return;
    setLoadingStates((p) => ({ ...p, communes: true }));
    try {
      setter(await ReferenceService.getCommunesByProvince(provinceId, lang));
    } catch {
      /* silent */
    } finally {
      setLoadingStates((p) => ({ ...p, communes: false }));
    }
  };

  // const mapToForm = (d: BeneficiaryData) => {
  //   const cm = new Map(
  //     (d.user.consents || []).map((c) => [c.consentType.code, c.value]),
  //   );
  //   setForm((prev) => ({
  //     ...prev,
  //     entrepreneurType: (d.category?.toLowerCase() as EntrepreneurType) || "",
  //     firstName: d.user.firstName || "",
  //     lastName: d.user.lastName || "",
  //     email: d.user.email || "",
  //     phone: d.user.phoneNumber || "",
  //     gender: (d.user.gender?.code as GenderType) || "",
  //     birthDate: d.user.birthDate || "",
  //     provinceId: d.user.primaryAddress?.provinceId || "",
  //     communeId: d.user.primaryAddress?.communeId || "",
  //     companyName: d.company?.companyName || "",
  //     nif: d.company?.taxIdNumber || "",
  //     creationYear: d.company?.creationDate
  //       ? new Date(d.company.creationDate).getFullYear()
  //       : "",
  //     sectorId: d.company?.primarySectorId || "",
  //     activityDescription: d.company?.activityDescription || "",
  //     employeeCount: d.company?.permanentEmployees || "",
  //     annualRevenue: d.company?.revenueYearN1
  //       ? Number(d.company.revenueYearN1)
  //       : "",
  //     companyStatus: (d.companyType as CompanyStatusType) || "",
  //     acceptTerms: cm.get("TERMS_AND_CONDITIONS") || false,
  //     acceptPrivacy: cm.get("PRIVACY_POLICY") || false,
  //     certifyAccuracy: cm.get("CERTIFY_ACCURACY") || false,
  //     acceptNotifications: cm.get("COMMUNICATIONS") || false,
  //   }));
  // };

  const mapToForm = (d: BeneficiaryData) => {
    const cm = new Map(
      (d.user.consents || []).map((c) => [c.consentType.code, c.value]),
    );

    setForm(
      (prev) =>
        ({
          ...prev,
          // ===== STEP 1 =====
          entrepreneurType:
            (d.category?.toLowerCase() as EntrepreneurType) || "",
          firstName: d.user.firstName || "",
          lastName: d.user.lastName || "",
          position: d.position || "",
          gender: (d.user.gender?.code as GenderType) || "",
          birthDate: d.user.birthDate || "",
          maritalStatus: (d.maritalStatus as MaritalStatusType) || "",
          educationLevel: (d.educationLevel as EducationLevelType) || "",
          neighborhood: d.user.primaryAddress?.neighborhood || "",
          zone: d.user.primaryAddress?.street || "",
          provinceId: d.user.primaryAddress?.provinceId || "",
          communeId: d.user.primaryAddress?.communeId || "",
          phone: d.user.phoneNumber || "",
          email: d.user.email || "",

          // Questions d'éligibilité (nouveaux champs)
          isPublicServant: d.isPublicServant
            ? "yes"
            : d.isPublicServant === false
              ? "no"
              : "",
          isRelativeOfPublicServant: d.isRelativeOfPublicServant
            ? "yes"
            : d.isRelativeOfPublicServant === false
              ? "no"
              : "",
          isPublicIntern: d.isPublicIntern
            ? "yes"
            : d.isPublicIntern === false
              ? "no"
              : "",
          isRelativeOfPublicIntern: d.isRelativeOfPublicIntern
            ? "yes"
            : d.isRelativeOfPublicIntern === false
              ? "no"
              : "",
          wasHighOfficer: d.wasHighOfficer
            ? "yes"
            : d.wasHighOfficer === false
              ? "no"
              : "",
          isRelativeOfHighOfficer: d.isRelativeOfHighOfficer
            ? "yes"
            : d.isRelativeOfHighOfficer === false
              ? "no"
              : "",
          hasProjectLink: d.hasProjectLink
            ? "yes"
            : d.hasProjectLink === false
              ? "no"
              : "",
          isDirectSupplierToProject: d.isDirectSupplierToProject
            ? "yes"
            : d.isDirectSupplierToProject === false
              ? "no"
              : "",
          hasPreviousGrant: d.hasPreviousGrant
            ? "yes"
            : d.hasPreviousGrant === false
              ? "no"
              : "",
          previousGrantDetails: d.previousGrantDetails || "",

          // ===== STEP 2 =====
          companyStatus: (d.companyType as CompanyStatusType) || "",
          companyName: d.company?.companyName || "",
          companyNeighborhood: d.company?.address?.neighborhood || "",
          companyZone: d.company?.address?.street || "",
          companyProvinceId: d.company?.address?.provinceId || "",
          companyCommuneId: d.company?.address?.communeId || "",
          companyPhone: d.company?.companyPhone || "",
          companyEmail: d.company?.companyEmail || "",
          legalStatus: (d.company?.legalStatus as LegalStatusType) || "",
          legalStatusOther: d.company?.legalStatusOther || "",
          nif: d.company?.taxIdNumber || "",
          affiliatedToCGA: d.company?.affiliatedToCGA
            ? "yes"
            : d.company?.affiliatedToCGA === false
              ? "no"
              : "", // Nouveau champ
          femaleEmployees: d.company?.femaleEmployees ?? "", // Nouveau champ
          maleEmployees: d.company?.maleEmployees ?? "", // Nouveau champ
          refugeeEmployees: d.company?.refugeeEmployees ?? "", // Nouveau champ
          batwaEmployees: d.company?.batwaEmployees ?? "", // Nouveau champ
          disabledEmployees: d.company?.disabledEmployees ?? "", // Nouveau champ
          employeeCount: d.company?.permanentEmployees ?? "",
          associatesCount:
            (d.company?.associatesCount as AssociatesCountType) || "", // Nouveau champ
          associatesCountOther: d.company?.associatesCountOther || "", // Nouveau champ
          femalePartners: d.company?.femalePartners ?? "", // Nouveau champ
          malePartners: d.company?.malePartners ?? "", // Nouveau champ
          refugeePartners: d.company?.refugeePartners ?? "", // Nouveau champ
          batwaPartners: d.company?.batwaPartners ?? "", // Nouveau champ
          disabledPartners: d.company?.disabledPartners ?? "", // Nouveau champ
          annualRevenue: d.company?.revenueYearN1
            ? Number(d.company.revenueYearN1)
            : "",
          creationYear: d.company?.creationDate
            ? new Date(d.company.creationDate).getFullYear()
            : "",
          sectorId: d.company?.primarySectorId || "",
          activityDescription: d.company?.activityDescription || "",
          hasBankAccount: d.company?.hasBankAccount
            ? "yes"
            : d.company?.hasBankAccount === false
              ? "no"
              : "", // Nouveau champ
          hasBankCredit: d.company?.hasBankCredit
            ? "yes"
            : d.company?.hasBankCredit === false
              ? "no"
              : "", // Nouveau champ
          bankCreditAmount: d.company?.bankCreditAmount ?? "", // Nouveau champ
          isWomanLed: d.company?.isLedByWoman || false,
          isRefugeeLed: d.company?.isLedByRefugee || false,
          hasClimateImpact: d.company?.hasPositiveClimateImpact || false,

          // ===== STEP 3 =====
          projectTitle: d.projectTitle || "", // Nouveau champ
          projectObjective: d.projectObjective || "", // Nouveau champ
          projectSectors: d.projectSectors || [], // Nouveau champ
          otherSector: d.otherSector || "", // Nouveau champ
          mainActivities: d.mainActivities || "", // Nouveau champ
          productsServices: d.productsServices || "", // Nouveau champ
          businessIdea: d.businessIdea || "", // Nouveau champ
          targetClients: d.targetClients || "", // Nouveau champ
          clientScope: d.clientScope || [], // Nouveau champ
          hasCompetitors: d.hasCompetitors
            ? "yes"
            : d.hasCompetitors === false
              ? "no"
              : "", // Nouveau champ
          competitorNames: d.competitorNames || "", // Nouveau champ
          plannedEmployeesFemale: d.plannedEmployeesFemale ?? "", // Nouveau champ
          plannedEmployeesMale: d.plannedEmployeesMale ?? "", // Nouveau champ
          plannedPermanentEmployees: d.plannedPermanentEmployees ?? "", // Nouveau champ
          isNewIdea: d.isNewIdea ? "yes" : d.isNewIdea === false ? "no" : "", // Nouveau champ
          climateActions: d.climateActions || "", // Nouveau champ
          inclusionActions: d.inclusionActions || "", // Nouveau champ
          hasEstimatedCost: d.hasEstimatedCost
            ? "yes"
            : d.hasEstimatedCost === false
              ? "no"
              : "", // Nouveau champ
          totalProjectCost: d.totalProjectCost ?? "", // Nouveau champ
          requestedSubsidyAmount: d.requestedSubsidyAmount ?? "", // Nouveau champ
          mainExpenses: d.mainExpenses || "", // Nouveau champ

          // ===== STEP 4 =====
          acceptTerms: cm.get("TERMS_AND_CONDITIONS") || false,
          acceptPrivacy: cm.get("PRIVACY_POLICY") || false,
          certifyAccuracy: cm.get("CERTIFY_ACCURACY") || false,
          acceptNotifications: cm.get("COMMUNICATIONS") || false,
        }) as any,
    );
  };
  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      if (errors[key as string])
        setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [errors],
  );

  const toggleArray = useCallback(
    <K extends keyof FormData>(key: K, val: string) => {
      setForm((prev) => {
        const arr = (prev[key] as string[]) || [];
        return {
          ...prev,
          [key]: arr.includes(val)
            ? arr.filter((v) => v !== val)
            : [...arr, val],
        };
      });
    },
    [],
  );

  const updateDocument = useCallback(
    (key: string, file: File | null) => {
      setDocuments((prev: any) => ({ ...prev, [key]: file }));
      if (docErrors[key])
        setDocErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [docErrors],
  );

  // Validation
  const validateStep = useCallback(
    (step: number): boolean => {
      const e: FormErrors = {};

      if (step === 1) {
        if (!form.entrepreneurType) e.entrepreneurType = t("required");
        if (!form.lastName.trim()) e.lastName = t("required");
        if (!form.firstName.trim()) e.firstName = t("required");
        if (!form.gender) e.gender = t("required");
        if (!form.maritalStatus) e.maritalStatus = t("required");
        if (!form.educationLevel) e.educationLevel = t("required");
        if (!form.birthDate) {
          e.birthDate = t("required");
        } else if (
          new Date().getFullYear() - new Date(form.birthDate).getFullYear() <
          18
        ) {
          e.birthDate = t("birthDateInvalid");
        }
        if (!form.email) e.email = t("required");
        else if (!validateEmail(form.email)) e.email = t("emailInvalid");
        if (!form.phone) e.phone = t("required");
        if (!form.provinceId) e.provinceId = t("required");
        if (!form.communeId) e.communeId = t("required");
        ELIGIBILITY_QUESTIONS.forEach(({ key }) => {
          if (!form[key]) e[key as string] = t("required");
        });
      }

      if (step === 2) {
        if (!form.companyStatus) {
          e.companyStatus = t("required");
        } else if (form.companyStatus !== "project") {
          if (!form.companyName.trim()) e.companyName = t("required");
          if (!form.creationYear) {
            e.creationYear = t("required");
          } else {
            const y = Number(form.creationYear);
            if (y < 1900 || y > new Date().getFullYear())
              e.creationYear = t("creationYearInvalid");
          }
          if (!form.sectorId) e.sectorId = t("required");
          if (!form.activityDescription.trim())
            e.activityDescription = t("required");
          else if (form.activityDescription.length < 20)
            e.activityDescription = t("descriptionMinLength");
          if (!form.employeeCount) e.employeeCount = t("required");
          // if (form.nif && !validateNif(form.nif)) e.nif = t("nifInvalid");
          if (form.companyStatus === "formal" && !form.legalStatus)
            e.legalStatus = t("required");
          if (!form.associatesCount) e.associatesCount = t("required");

          // Required documents
          const docList =
            form.companyStatus === "formal"
              ? FORMAL_DOCS
              : form.companyStatus === "informal"
                ? INFORMAL_DOCS
                : [];
          const de: FormErrors = {};
          docList
            .filter((d) => d.required)
            .forEach((d) => {
              if (!documents[d.key]) de[d.key] = t("required");
            });
          setDocErrors(de);
          if (Object.keys(de).length > 0) {
            setErrors(e);
            return false;
          }
        }
      }

      if (step === 3) {
        if (!form.projectTitle.trim()) e.projectTitle = t("required");
        if (!form.projectObjective.trim()) e.projectObjective = t("required");
        if (!form.projectSectors.length) e.projectSectors = t("required");
        if (!form.mainActivities.trim()) e.mainActivities = t("required");
        if (!form.productsServices.trim()) e.productsServices = t("required");
        if (!form.targetClients.trim()) e.targetClients = t("required");
        if (!form.clientScope.length) e.clientScope = t("required");
        if (!form.hasCompetitors) e.hasCompetitors = t("required");
        if (!form.climateActions.trim()) e.climateActions = t("required");
        if (!form.inclusionActions.trim()) e.inclusionActions = t("required");
        if (!form.hasEstimatedCost) e.hasEstimatedCost = t("required");
        if (form.hasEstimatedCost === "yes" && !form.totalProjectCost)
          e.totalProjectCost = t("required");
        if (form.hasEstimatedCost === "yes" && !form.requestedSubsidyAmount)
          e.requestedSubsidyAmount = t("required");
        if (!form.mainExpenses.trim()) e.mainExpenses = t("required");
      }

      if (step === 4) {
        if (!form.acceptTerms) e.acceptTerms = t("acceptTermsRequired");
        if (!form.acceptPrivacy) e.acceptPrivacy = t("acceptPrivacyRequired");
        if (!form.certifyAccuracy) e.certifyAccuracy = t("certifyRequired");
      }

      setErrors(e);
      return Object.keys(e).length === 0;
    },
    [form, documents, t],
  );

  const saveCurrentStep = async (isFinish = false) => {
    if (!beneficiary?.id) {
      toast.error(t("beneficiaryNotFound"));
      return;
    }
    if (!validateStep(currentStep)) return;
    setSavingStep(currentStep);
    try {
      const cleanNumber = (value: any): number | undefined => {
        if (value === "" || value === null || value === undefined)
          return undefined;
        const num = Number(value);
        return isNaN(num) ? undefined : num;
      };

      const cleanBoolean = (value: any): boolean | undefined => {
        if (value === "" || value === null || value === undefined)
          return undefined;
        if (value === "yes") return true;
        if (value === "no") return false;
        return Boolean(value);
      };

      const cleanString = (value: any): string | undefined => {
        if (value === "" || value === null || value === undefined)
          return undefined;
        return String(value).trim();
      };

      const step1Data =
        currentStep === 1 || isFinish
          ? {
              status:
                form.entrepreneurType === "burundian" ? "burundais" : "refugie",
              firstName: cleanString(form.firstName),
              lastName: cleanString(form.lastName),
              position: cleanString(form.position),
              gender: form.gender || undefined,
              birthDate: form.birthDate || undefined,
              maritalStatus: form.maritalStatus || undefined,
              educationLevel: form.educationLevel || undefined,
              email: cleanString(form.email),
              phone: cleanString(form.phone),
              provinceId: cleanNumber(form.provinceId),
              communeId: cleanNumber(form.communeId),
              neighborhood: cleanString(form.neighborhood),
              zone: cleanString(form.zone),
              isPublicServant: cleanBoolean(form.isPublicServant),
              isRelativeOfPublicServant: cleanBoolean(
                form.isRelativeOfPublicServant,
              ),
              isPublicIntern: cleanBoolean(form.isPublicIntern),
              isRelativeOfPublicIntern: cleanBoolean(
                form.isRelativeOfPublicIntern,
              ),
              wasHighOfficer: cleanBoolean(form.wasHighOfficer),
              isRelativeOfHighOfficer: cleanBoolean(
                form.isRelativeOfHighOfficer,
              ),
              hasProjectLink: cleanBoolean(form.hasProjectLink),
              isDirectSupplierToProject: cleanBoolean(
                form.isDirectSupplierToProject,
              ),
              hasPreviousGrant: cleanBoolean(form.hasPreviousGrant),
              previousGrantDetails: cleanString(form.previousGrantDetails),
            }
          : undefined;

      const step2Data =
        currentStep === 2 || isFinish
          ? {
              companyStatus: form.companyStatus || undefined,
              companyExists: form.companyStatus !== "project" ? "yes" : "no",
              companyName: cleanString(form.companyName),
              companyNeighborhood: cleanString(form.companyNeighborhood),
              companyZone: cleanString(form.companyZone),
              companyProvinceId: cleanNumber(form.companyProvinceId),
              companyCommuneId: cleanNumber(form.companyCommuneId),
              companyPhone: cleanString(form.companyPhone),
              companyEmail: cleanString(form.companyEmail),
              legalStatus: form.legalStatus || undefined,
              legalStatusOther: cleanString(form.legalStatusOther),
              nif: cleanString(form.nif),
              affiliatedToCGA: cleanBoolean(form.affiliatedToCGA),
              femaleEmployees: cleanNumber(form.femaleEmployees),
              maleEmployees: cleanNumber(form.maleEmployees),
              refugeeEmployees: cleanNumber(form.refugeeEmployees),
              batwaEmployees: cleanNumber(form.batwaEmployees),
              disabledEmployees: cleanNumber(form.disabledEmployees),
              employeeCount: cleanNumber(form.employeeCount),
              associatesCount: form.associatesCount || undefined,
              associatesCountOther: cleanString(form.associatesCountOther),
              femalePartners: cleanNumber(form.femalePartners),
              malePartners: cleanNumber(form.malePartners),
              refugeePartners: cleanNumber(form.refugeePartners),
              batwaPartners: cleanNumber(form.batwaPartners),
              disabledPartners: cleanNumber(form.disabledPartners),
              annualRevenue: cleanNumber(form.annualRevenue),
              creationYear: cleanNumber(form.creationYear),
              sectorId: cleanNumber(form.sectorId),
              activityDescription: cleanString(form.activityDescription),
              hasBankAccount: cleanBoolean(form.hasBankAccount),
              hasBankCredit: cleanBoolean(form.hasBankCredit),
              bankCreditAmount: cleanNumber(form.bankCreditAmount),
              isWomanLed: form.isWomanLed || false,
              isRefugeeLed: form.isRefugeeLed || false,
              hasClimateImpact: form.hasClimateImpact || false,
            }
          : undefined;

      const step3Data =
        currentStep === 3 || isFinish
          ? {
              projectTitle: cleanString(form.projectTitle),
              projectObjective: cleanString(form.projectObjective),
              projectSectors: form.projectSectors?.length
                ? form.projectSectors
                : undefined,
              otherSector: cleanString(form.otherSector),
              mainActivities: cleanString(form.mainActivities),
              productsServices: cleanString(form.productsServices),
              businessIdea: cleanString(form.businessIdea),
              targetClients: cleanString(form.targetClients),
              clientScope: form.clientScope?.length
                ? form.clientScope
                : undefined,
              hasCompetitors: cleanBoolean(form.hasCompetitors),
              competitorNames: cleanString(form.competitorNames),
              plannedEmployeesFemale: cleanNumber(form.plannedEmployeesFemale),
              plannedEmployeesMale: cleanNumber(form.plannedEmployeesMale),
              plannedPermanentEmployees: cleanNumber(
                form.plannedPermanentEmployees,
              ),
              isNewIdea: cleanBoolean(form.isNewIdea),
              climateActions: cleanString(form.climateActions),
              inclusionActions: cleanString(form.inclusionActions),
              hasEstimatedCost: cleanBoolean(form.hasEstimatedCost),
              totalProjectCost: cleanNumber(form.totalProjectCost),
              requestedSubsidyAmount: cleanNumber(form.requestedSubsidyAmount),
              mainExpenses: cleanString(form.mainExpenses),
              acceptCGU: form.acceptTerms,
              acceptPrivacyPolicy: form.acceptPrivacy,
              certifyAccuracy: form.certifyAccuracy,
              optInNotifications: form.acceptNotifications,
              isProfileCompleted: isFinish,
            }
          : undefined;

      await BeneficiaryService.update(
        beneficiary.id,
        {
          step1: step1Data,
          step2: step2Data,
          step3: step3Data,
        },
        lang,
      );

      if (currentStep === 2) {
        const docList =
          form.companyStatus === "formal"
            ? FORMAL_DOCS
            : form.companyStatus === "informal"
              ? INFORMAL_DOCS
              : [];
        console.log(documents[docList[0].key]);
        // Uploader chaque document
        const uploadPromises = docList
          .filter((doc) => documents[doc.key])
          .map(async (doc) => {
            if (documents[doc.key] instanceof File) {
              try {
                const result = await DocumentService.uploadFormDocument(
                  documents[doc.key] as any,
                  {
                    entityId: beneficiary.id,
                    entityType: "beneficiary",
                    documentKey: doc.key,
                    documentTypeId: doc.typeId,
                    formStep: "STEP4",
                  },
                );

                console.log(`Document ${doc.key} uploaded:`, result);
                return result;
              } catch (error) {
                console.error(`Error uploading ${doc.key}:`, error);
                throw error;
              }
            }
          });

        if (uploadPromises.length > 0) {
          await Promise.all(uploadPromises);
          // toast.success(t("documentsUploadedSuccess"));
        }
      }

      await loadBeneficiaryData();
      toast.success(
        currentStep === 4
          ? t("profileUpdated")
          : t("stepSaved", { step: currentStep }),
      );
    } catch (err: any) {
      toast.error(err.response?.data?.message || t("errorSavingStep"));
    } finally {
      setSavingStep(null);
    }
  };

  const goToNextStep = () => {
    if (currentStep < 4 && validateStep(currentStep)) {
      setCurrentStep((p) => p + 1);
      window.scrollTo(0, 0);
    }
  };
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((p) => p - 1);
      window.scrollTo(0, 0);
    }
  };

  const progressPercentage = useMemo(
    () =>
      beneficiary?.profileCompletionPercentage ||
      STEPS.reduce(
        (acc, s) => (s.num <= currentStep ? acc + s.weight : acc),
        0,
      ),
    [currentStep, beneficiary],
  );

  const canShowCompanyFields =
    form.companyStatus === "formal" || form.companyStatus === "informal";

  if (loading) {
    return <ProfileLoader/>;
  } else if (beneficiary?.isProfileComplete) {
    navigate("/application-submitted", { replace: true });
  } else {
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
                          {t("step")} {currentStep} {t("of")} 4
                        </p>
                        <h4 style={{ margin: 0 }}>
                          {t(STEPS[currentStep - 1].labelKey)}
                        </h4>
                      </div>
                      <ProgressRing
                        percentage={parseInt(progressPercentage.toString())}
                      />
                    </div>

                    {currentStep === 1 && (
                      <InfoBanner
                        title={t("profileNoteTitle")}
                        description={t("profileNote")}
                      />
                    )}
                    {currentStep === 4 && (
                      <InfoBanner
                        title={t("verifyBanner.title")}
                        description={t("verifyBanner.description")}
                      />
                    )}

                    <form
                      className="login_form wrap-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        saveCurrentStep(false);
                      }}
                      noValidate
                    >
                      <div className="row">
                        {currentStep === 1 && (
                          <Step1Fields
                            form={form}
                            errors={errors}
                            provinces={provinces}
                            communes={communes}
                            isKi={isKi}
                            maxDate={maxDate}
                            loadingStates={loadingStates}
                            onUpdateField={updateField}
                            t={t}
                          />
                        )}
                        {currentStep === 2 && (
                          <Step2Fields
                            form={form}
                            errors={errors}
                            sectors={sectors}
                            provinces={provinces}
                            companyCommunes={companyCommunes}
                            isKi={isKi}
                            loadingStates={loadingStates}
                            canShowCompanyFields={canShowCompanyFields}
                            onUpdateField={updateField}
                            toggleArray={toggleArray}
                            documents={documents}
                            docErrors={docErrors}
                            onUpdateDocument={updateDocument}
                            t={t}
                          />
                        )}
                        {currentStep === 3 && (
                          <Step3Fields
                            form={form}
                            errors={errors}
                            onUpdateField={updateField}
                            toggleArray={toggleArray}
                            t={t}
                          />
                        )}
                        {currentStep === 4 && (
                          <Step4Fields
                            form={form}
                            errors={errors}
                            onUpdateField={updateField}
                            t={t}
                          />
                        )}

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
                              <button
                                type="submit"
                                disabled={savingStep === currentStep}
                                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor d-flex justify-content-center align-items-center"
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
                              {currentStep < 4 && (
                                <button
                                  type="button"
                                  onClick={goToNextStep}
                                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                >
                                  {t("next")} →
                                </button>
                              )}
                              {currentStep === 4 && (
                                <button
                                  type="button"
                                  onClick={() => saveCurrentStep(true)}
                                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                >
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
  }
};

// ─── ProgressRing & InfoBanner ────────────────────────────────────────────────

const ProgressRing: React.FC<{ percentage: number }> = ({ percentage }) => (
  <svg viewBox="0 0 44 44" style={{ width: 44, height: 44, flexShrink: 0 }}>
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
  <div className="copa-validation-banner mb-30">
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

// ─── Step 1 ───────────────────────────────────────────────────────────────────

const Step1Fields: React.FC<any> = ({
  form,
  errors,
  provinces,
  communes,
  loadingStates,
  onUpdateField,
  t,
  isKi,
  maxDate,
}) => (
  <>
    {/* Statut */}
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

    {/* Identité */}
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
      <label>
        <i className="ti ti-briefcase" />
        <input
          type="text"
          value={form.position}
          onChange={(e) => onUpdateField("position", e.target.value)}
          placeholder={t("roleInCompany")}
        />
      </label>
    </div>
    <div className="col-lg-6">
      <label className={errors.birthDate ? "copa-input-invalid" : ""}>
        <i className="ti ti-calendar" />
        <Flatpickr
          value={form.birthDate ? new Date(form.birthDate) : undefined}
          onChange={([date]: Date[]) =>
            onUpdateField("birthDate", date?.toISOString().split("T")[0] || "")
          }
          placeholder={t("birthDate")}
          options={{
            enableTime: false,
            dateFormat: "d-m-Y",
            maxDate,
            locale: isKi ? (KirundiLocale as any) : French,
          }}
          style={{ height: "55px" }}
        />
      </label>
      {errors.birthDate && (
        <span className="copa-error-msg">{errors.birthDate}</span>
      )}
    </div>

    <div className="col-lg-4">
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
    <div className="col-lg-4">
      <label className={errors.maritalStatus ? "copa-input-invalid" : ""}>
        <i className="ti ti-heart" />
        <select
          value={form.maritalStatus}
          onChange={(e) => onUpdateField("maritalStatus", e.target.value)}
        >
          <option value="">{t("selectMaritalStatus")}</option>
          <option value="single">{t("single")}</option>
          <option value="married">{t("married")}</option>
          <option value="divorced">{t("divorced")}</option>
          <option value="widowed">{t("widowed")}</option>
        </select>
      </label>
      {errors.maritalStatus && (
        <span className="copa-error-msg">{errors.maritalStatus}</span>
      )}
    </div>
    <div className="col-lg-4">
      <label className={errors.educationLevel ? "copa-input-invalid" : ""}>
        <i className="ti ti-book" />
        <select
          value={form.educationLevel}
          onChange={(e) => onUpdateField("educationLevel", e.target.value)}
        >
          <option value="">{t("selectEducationLevel")}</option>
          <option value="none">{t("educationNone")}</option>
          <option value="primary">{t("educationPrimary")}</option>
          <option value="secondary">{t("educationSecondary")}</option>
          <option value="university">{t("educationUniversity")}</option>
        </select>
      </label>
      {errors.educationLevel && (
        <span className="copa-error-msg">{errors.educationLevel}</span>
      )}
    </div>

    {/* Adresse */}
    <SectionTitle title={t("addressSection")} />
    <div className="col-lg-6">
      <label>
        <i className="ti ti-home" />
        <input
          type="text"
          value={form.neighborhood}
          onChange={(e) => onUpdateField("neighborhood", e.target.value)}
          placeholder={t("neighborhood")}
        />
      </label>
    </div>
    <div className="col-lg-6">
      <label>
        <i className="ti ti-location-pin" />
        <input
          type="text"
          value={form.zone}
          onChange={(e) => onUpdateField("zone", e.target.value)}
          placeholder={t("zone")}
        />
      </label>
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
          {provinces.map((p: any) => (
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
          {communes.map((c: any) => (
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
    <div className="col-lg-6">
      <label className={errors.phone ? "copa-input-invalid" : ""}>
        <PhoneInput
          country="bi"
          value={form.phone}
          onChange={(p: string) => onUpdateField("phone", p)}
          autoFormat
          enableSearch
          countryCodeEditable={false}
          disableSearchIcon
          placeholder={t("phoneNumber")}
        />
      </label>
      {errors.phone && <span className="copa-error-msg">{errors.phone}</span>}
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

    {/* Éligibilité */}
    <SectionTitle title={t("eligibilitySection")} />
    {ELIGIBILITY_QUESTIONS.map(({ key, labelKey }) => (
      <div className="col-12" key={key as string}>
        <label
          className={(errors as any)[key as string] ? "copa-input-invalid" : ""}
        >
          <i className="ti ti-shield" />
          <select
            value={form[key] as string}
            onChange={(e) => onUpdateField(key, e.target.value as TriBool)}
          >
            <option value="">{t(labelKey)}</option>
            <option value="yes">{t("yes")}</option>
            <option value="no">{t("no")}</option>
          </select>
        </label>
        {(errors as any)[key as string] && (
          <span className="copa-error-msg">
            {(errors as any)[key as string]}
          </span>
        )}
      </div>
    ))}
    {form.hasPreviousGrant === "yes" && (
      <div className="col-12">
        <label>
          <i className="ti ti-pencil" />
          <input
            type="text"
            value={form.previousGrantDetails}
            onChange={(e) =>
              onUpdateField("previousGrantDetails", e.target.value)
            }
            placeholder={t("previousGrantDetailsPlaceholder")}
          />
        </label>
      </div>
    )}
  </>
);

// ─── Step 2 ───────────────────────────────────────────────────────────────────

const Step2Fields: React.FC<any> = ({
  form,
  errors,
  sectors,
  provinces,
  companyCommunes,
  isKi,
  loadingStates,
  canShowCompanyFields,
  onUpdateField,
  toggleArray,
  documents,
  docErrors,
  onUpdateDocument,
  t,
}) => {
  const docList =
    form.companyStatus === "formal"
      ? FORMAL_DOCS
      : form.companyStatus === "informal"
        ? INFORMAL_DOCS
        : null;
  return (
    <>
      <SectionTitle title={t("selectCompanyStatus")} />
      <div className="col-12">
        <label className={errors.companyStatus ? "copa-input-invalid" : ""}>
          <i className="ti ti-briefcase" />
          <select
            value={form.companyStatus}
            onChange={(e) => onUpdateField("companyStatus", e.target.value)}
          >
            <option value="">{t("selectCompanyStatus")}</option>
            <option value="formal">{t("formalCompany")}</option>
            <option value="informal">{t("informalCompany")}</option>
            {/* <option value="project">{t("projectCompany")}</option> */}
          </select>
        </label>
        {errors.companyStatus && (
          <span className="copa-error-msg">{errors.companyStatus}</span>
        )}
      </div>
      {/* <div className="col-12">
      <p style={{ fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 0 }}>
        {t("selectCompanyStatus")}
        <span style={{ color: "#dc3545" }}>*</span>
      </p>
      <div className="copa-radio-cards mt-0 mb-5">
        {COMPANY_STATUS_OPTIONS.map((option) => (
          <label key={option.value} className={`copa-radio-card ${form.companyStatus === option.value ? "is-selected" : ""}`}>
            <input type="radio" name="companyStatus" value={option.value} checked={form.companyStatus === option.value}
              onChange={(e) => onUpdateField("companyStatus", e.target.value)} />
            <span className="copa-radio-card__check">
              <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" width="10" height="10">
                <path d="M1.5 5l2.5 2.5 5-5" strokeLinecap="round" strokeWidth="2.5" />
              </svg>
            </span>
            <span className="copa-radio-card__name" style={{color: '#919191'}}>{t(option.labelKey)}</span>
            <span className="copa-radio-card__desc">{t(option.descKey)}</span>
          </label>
        ))}
      </div>
      {errors.companyStatus && <span className="copa-error-msg">{errors.companyStatus}</span>}
    </div> */}

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

          {form.companyStatus === "formal" && (
            <>
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
                <label
                  className={errors.legalStatus ? "copa-input-invalid" : ""}
                >
                  <i className="ti ti-clipboard" />
                  <select
                    value={form.legalStatus}
                    onChange={(e) =>
                      onUpdateField("legalStatus", e.target.value)
                    }
                  >
                    <option value="">{t("selectLegalStatus")}</option>
                    <option value="snc">Société en Non Collectif (SNC)</option>
                    <option value="scs">
                      Société en Commandite Simple (SCS)
                    </option>
                    <option value="sprl">SPRL</option>
                    <option value="su">Société Unipersonnelle (SU)</option>
                    <option value="sa">Société Anonyme (SA)</option>
                    <option value="coop">Société Coopérative</option>
                    <option value="other">{t("other")}</option>
                  </select>
                </label>
                {errors.legalStatus && (
                  <span className="copa-error-msg">{errors.legalStatus}</span>
                )}
              </div>
              {form.legalStatus === "other" && (
                <div className="col-lg-6">
                  <label>
                    <i className="ti ti-pencil" />
                    <input
                      type="text"
                      value={form.legalStatusOther}
                      onChange={(e) =>
                        onUpdateField("legalStatusOther", e.target.value)
                      }
                      placeholder={t("specifyLegalStatus")}
                    />
                  </label>
                </div>
              )}
            </>
          )}

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
                  onUpdateField(
                    "sectorId",
                    e.target.value ? +e.target.value : "",
                  )
                }
              >
                <option value="">
                  {loadingStates.sectors ? t("loading") : t("selectSector")}
                </option>
                {sectors.map((s: any) => (
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
              <span className="copa-error-msg">
                {errors.activityDescription}
              </span>
            )}
          </div>

          {/* Adresse entreprise */}
          <SectionTitle title={t("companyAddressIfDifferent")} />
          <div className="col-lg-6">
            <label>
              <i className="ti ti-home" />
              <input
                type="text"
                value={form.companyNeighborhood}
                onChange={(e) =>
                  onUpdateField("companyNeighborhood", e.target.value)
                }
                placeholder={t("neighborhood")}
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label>
              <i className="ti ti-location-pin" />
              <input
                type="text"
                value={form.companyZone}
                onChange={(e) => onUpdateField("companyZone", e.target.value)}
                placeholder={t("zone")}
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label>
              <i className="ti ti-map" />
              <select
                value={String(form.companyProvinceId)}
                onChange={(e) =>
                  onUpdateField(
                    "companyProvinceId",
                    e.target.value ? +e.target.value : "",
                  )
                }
              >
                <option value="">{t("selectProvince")}</option>
                {provinces.map((p: any) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="col-lg-6">
            <label>
              <i className="ti ti-map-alt" />
              <select
                value={String(form.companyCommuneId)}
                onChange={(e) =>
                  onUpdateField(
                    "companyCommuneId",
                    e.target.value ? +e.target.value : "",
                  )
                }
                disabled={!form.companyProvinceId}
              >
                <option value="">
                  {!form.companyProvinceId
                    ? t("selectProvinceFirst")
                    : t("selectCommune")}
                </option>
                {companyCommunes.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="col-lg-6">
            <label>
              <PhoneInput
                country="bi"
                value={form.companyPhone}
                onChange={(p: string) => onUpdateField("companyPhone", p)}
                autoFormat
                enableSearch
                countryCodeEditable={false}
                disableSearchIcon
                placeholder={t("phoneNumber")}
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label>
              <i className="ti ti-email" />
              <input
                type="email"
                value={form.companyEmail}
                onChange={(e) => onUpdateField("companyEmail", e.target.value)}
                placeholder={t("email")}
              />
            </label>
          </div>

          <div className="col-lg-6">
            <label
              className={errors.affiliatedToCGA ? "copa-input-invalid" : ""}
            >
              <i className="ti ti-check-box" />
              <select
                value={form.affiliatedToCGA}
                onChange={(e) =>
                  onUpdateField("affiliatedToCGA", e.target.value as TriBool)
                }
              >
                <option value="">{t("affiliatedToCGALabel")}</option>
                <option value="yes">{t("yes")}</option>
                <option value="no">{t("no")}</option>
              </select>
            </label>
            {errors.affiliatedToCGA && (
              <span className="copa-error-msg">{errors.affiliatedToCGA}</span>
            )}
          </div>

          {/* Effectifs */}
          <SectionTitle title={t("employeesBreakdown")} />
          {[
            { k: "femaleEmployees", ph: "femaleEmployees", ic: "ti-user" },
            { k: "maleEmployees", ph: "maleEmployees", ic: "ti-user" },
            { k: "refugeeEmployees", ph: "refugeeEmployees", ic: "ti-user" },
            { k: "batwaEmployees", ph: "batwaEmployees", ic: "ti-user" },
            { k: "disabledEmployees", ph: "disabledEmployees", ic: "ti-user" },
            { k: "employeeCount", ph: "permanentEmployees", ic: "fa fa-users" },
          ].map(({ k, ph, ic }) => (
            <div className="col-lg-6" key={k}>
              <label className={(errors as any)[k] ? "copa-input-invalid" : ""}>
                <i className={ic} />
                <input
                  type="number"
                  min="0"
                  value={String((form as any)[k])}
                  onChange={(e) =>
                    onUpdateField(
                      k as keyof FormData,
                      e.target.value ? +e.target.value : ("" as any),
                    )
                  }
                  placeholder={t(ph)}
                />
              </label>
              {(errors as any)[k] && (
                <span className="copa-error-msg">{(errors as any)[k]}</span>
              )}
            </div>
          ))}

          {/* Associés */}
          <SectionTitle title={t("associatesSection")} />
          <div className="col-12">
            <label
              className={errors.associatesCount ? "copa-input-invalid" : ""}
            >
              <i className="fa fa-users" />
              <select
                value={form.associatesCount}
                onChange={(e) =>
                  onUpdateField("associatesCount", e.target.value)
                }
              >
                <option value="">{t("selectAssociatesCount")}</option>
                <option value="solo">{t("associates_solo")}</option>
                <option value="2">{t("associates_2")}</option>
                <option value="3">{t("associates_3")}</option>
                <option value="other">{t("associates_other")}</option>
              </select>
            </label>
            {errors.associatesCount && (
              <span className="copa-error-msg">{errors.associatesCount}</span>
            )}
          </div>
          {form.associatesCount === "other" && (
            <div className="col-lg-6">
              <label>
                <i className="ti ti-pencil" />
                <input
                  type="text"
                  value={form.associatesCountOther}
                  onChange={(e) =>
                    onUpdateField("associatesCountOther", e.target.value)
                  }
                  placeholder={t("specifyAssociatesCount")}
                />
              </label>
            </div>
          )}
          {form.associatesCount && form.associatesCount !== "solo" && (
            <>
              <SectionTitle title={t("partnersBreakdown")} />
              {[
                { k: "femalePartners", ph: "femalePartners" },
                { k: "malePartners", ph: "malePartners" },
                { k: "refugeePartners", ph: "refugeePartners" },
                { k: "batwaPartners", ph: "batwaPartners" },
                { k: "disabledPartners", ph: "disabledPartners" },
              ].map(({ k, ph }) => (
                <div className="col-lg-6" key={k}>
                  <label>
                    <i className="ti ti-user" />
                    <input
                      type="number"
                      min="0"
                      value={String((form as any)[k])}
                      onChange={(e) =>
                        onUpdateField(
                          k as keyof FormData,
                          e.target.value ? +e.target.value : ("" as any),
                        )
                      }
                      placeholder={t(ph)}
                    />
                  </label>
                </div>
              ))}
            </>
          )}

          {/* Financier */}
          <SectionTitle title={t("financialSection")} />
          <div className="col-lg-6">
            <label className="d-flex align-items-center">
              <i className="ti ti-fbu">FBu</i>
              <input
                type="number"
                min="0"
                value={String(form.annualRevenue)}
                className="pl-60 pb-15"
                onChange={(e) =>
                  onUpdateField(
                    "annualRevenue",
                    e.target.value ? +e.target.value : "",
                  )
                }
                placeholder={t("annualRevenue")}
              />
            </label>
          </div>
          <div className="col-lg-6">
            <label
              className={errors.hasBankAccount ? "copa-input-invalid" : ""}
            >
              <i className="ti ti-credit-card" />
              <select
                value={form.hasBankAccount}
                onChange={(e) =>
                  onUpdateField("hasBankAccount", e.target.value as TriBool)
                }
              >
                <option value="">{t("hasBankAccountLabel")}</option>
                <option value="yes">{t("yes")}</option>
                <option value="no">{t("no")}</option>
              </select>
            </label>
            {errors.hasBankAccount && (
              <span className="copa-error-msg">{errors.hasBankAccount}</span>
            )}
          </div>
          <div className="col-lg-6">
            <label className={errors.hasBankCredit ? "copa-input-invalid" : ""}>
              {/* <i className="ti ti-money" /> */}
              <i className="fa fa-credit-card"></i>
              <select
                value={form.hasBankCredit}
                onChange={(e) =>
                  onUpdateField("hasBankCredit", e.target.value as TriBool)
                }
                className="pl-30"
              >
                <option value="">{t("hasBankCreditLabel")}</option>
                <option value="yes">{t("yes")}</option>
                <option value="no">{t("no")}</option>
              </select>
            </label>
            {errors.hasBankCredit && (
              <span className="copa-error-msg">{errors.hasBankCredit}</span>
            )}
          </div>
          {form.hasBankCredit === "yes" && (
            <div className="col-lg-6">
              <label>
                {/* <i className="ti ti-money" /> */}
                <i className="fa ti-fbu">FBu</i>
                <input
                  type="number"
                  min="0"
                  value={String(form.bankCreditAmount)}
                  className="pl-60 pb-15"
                  onChange={(e) =>
                    onUpdateField(
                      "bankCreditAmount",
                      e.target.value ? +e.target.value : "",
                    )
                  }
                  placeholder={t("bankCreditAmount")}
                />
              </label>
            </div>
          )}
        </>
      )}

      {/* Documents */}
      {docList && (
        <>
          <SectionTitle
            title={t(
              form.companyStatus === "formal"
                ? "documentsForFormal"
                : "documentsForInformal",
            )}
          />
          {/* <div className="col-12 mb-15">
            <InfoBanner
              title={t("documentsInfoTitle")}
              description={t(
                form.companyStatus === "formal"
                  ? "documentsInfoFormal"
                  : "documentsInfoInformal",
              )}
            />
          </div> */}
          <div className="mt-15">
            {docList.map((doc) => (
              <FileUploadRow
                key={doc.key}
                docKey={doc.key}
                labelKey={doc.labelKey}
                required={doc.required}
                file={documents[doc.key] || null}
                error={docErrors[doc.key]}
                onChange={onUpdateDocument}
                t={t}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

// ─── Step 3 ───────────────────────────────────────────────────────────────────

const Step3Fields: React.FC<any> = ({
  form,
  errors,
  onUpdateField,
  toggleArray,
  t,
}) => (
  <>
    <div className="col-12">
      <label className={errors.projectTitle ? "copa-input-invalid" : ""}>
        <i className="ti ti-pencil-alt" />
        <input
          type="text"
          value={form.projectTitle}
          onChange={(e) => onUpdateField("projectTitle", e.target.value)}
          placeholder={t("projectTitle")}
        />
      </label>
      {errors.projectTitle && (
        <span className="copa-error-msg">{errors.projectTitle}</span>
      )}
    </div>
    <div className="col-12">
      <label className={errors.projectObjective ? "copa-input-invalid" : ""}>
        <textarea
          rows={3}
          value={form.projectObjective}
          onChange={(e) => onUpdateField("projectObjective", e.target.value)}
          placeholder={t("projectObjective")}
          style={{ paddingLeft: 15, lineHeight: 1.5 }}
        />
      </label>
      {errors.projectObjective && (
        <span className="copa-error-msg">{errors.projectObjective}</span>
      )}
    </div>

    <SectionTitle title={`${t("projectSectors")} *`} />
    <CheckboxGroup
      items={PROJECT_SECTORS_LIST}
      selected={form.projectSectors}
      errorKey="projectSectors"
      errors={errors}
      onToggle={(v: string) => toggleArray("projectSectors", v)}
      t={t}
    />
    {form.projectSectors.includes("other") && (
      <div className="col-12">
        <label>
          <i className="ti ti-pencil" />
          <input
            type="text"
            value={form.otherSector}
            onChange={(e) => onUpdateField("otherSector", e.target.value)}
            placeholder={t("specifyOtherSector")}
          />
        </label>
      </div>
    )}

    <div className="col-12">
      <label className={errors.mainActivities ? "copa-input-invalid" : ""}>
        <textarea
          rows={3}
          value={form.mainActivities}
          onChange={(e) => onUpdateField("mainActivities", e.target.value)}
          placeholder={t("mainActivities")}
          style={{ paddingLeft: 15, lineHeight: 1.5 }}
        />
      </label>
      {errors.mainActivities && (
        <span className="copa-error-msg">{errors.mainActivities}</span>
      )}
    </div>
    <div className="col-12">
      <label className={errors.productsServices ? "copa-input-invalid" : ""}>
        <textarea
          rows={3}
          value={form.productsServices}
          onChange={(e) => onUpdateField("productsServices", e.target.value)}
          placeholder={t("productsServices")}
          style={{ paddingLeft: 15, lineHeight: 1.5 }}
        />
      </label>
      {errors.productsServices && (
        <span className="copa-error-msg">{errors.productsServices}</span>
      )}
    </div>
    <div className="col-12">
      <label>
        <textarea
          rows={3}
          value={form.businessIdea}
          onChange={(e) => onUpdateField("businessIdea", e.target.value)}
          placeholder={t("businessIdeaOrigin")}
          style={{ paddingLeft: 15, lineHeight: 1.5 }}
        />
      </label>
    </div>
    <div className="col-12">
      <label className={errors.targetClients ? "copa-input-invalid" : ""}>
        <textarea
          rows={2}
          value={form.targetClients}
          onChange={(e) => onUpdateField("targetClients", e.target.value)}
          placeholder={t("targetClientsProfile")}
          style={{ paddingLeft: 15, lineHeight: 1.5 }}
        />
      </label>
      {errors.targetClients && (
        <span className="copa-error-msg">{errors.targetClients}</span>
      )}
    </div>

    <SectionTitle title={`${t("clientScope")} *`} />
    <CheckboxGroup
      items={[
        { value: "local", labelKey: "scope_local" },
        { value: "national", labelKey: "scope_national" },
        { value: "eastAfrica", labelKey: "scope_eastAfrica" },
        { value: "international", labelKey: "scope_international" },
      ]}
      selected={form.clientScope}
      errorKey="clientScope"
      errors={errors}
      onToggle={(v: string) => toggleArray("clientScope", v)}
      t={t}
    />

    {/* <CheckboxToggle
      fieldKey="hasCompetitors"
      labelKey="hasCompetitorsLabel"
      value={form.hasCompetitors}
      error={errors.hasCompetitors}
      onChange={(v: TriBool) => onUpdateField("hasCompetitors", v)}
      t={t}
    /> */}
    <div className="col-12">
      <label className={errors.hasCompetitors ? "copa-input-invalid" : ""}>
        <i className="ti ti-flag" />
        <select
          value={form.hasCompetitors}
          onChange={(e) =>
            onUpdateField("hasCompetitors", e.target.value as TriBool)
          }
        >
          <option value="">{t("hasCompetitorsLabel")}</option>
          <option value="yes">{t("yes")}</option>
          <option value="no">{t("no")}</option>
        </select>
      </label>
      {errors.hasCompetitors && (
        <span className="copa-error-msg">{errors.hasCompetitors}</span>
      )}
    </div>
    {form.hasCompetitors === "yes" && (
      <div className="col-12">
        <label>
          <textarea
            rows={2}
            value={form.competitorNames}
            onChange={(e) => onUpdateField("competitorNames", e.target.value)}
            placeholder={t("competitorNamesPlaceholder")}
            style={{ paddingLeft: 15, lineHeight: 1.5 }}
          />
        </label>
      </div>
    )}

    <SectionTitle title={t("plannedEmployees")} />
    <div className="col-lg-4">
      <label>
        <i className="ti ti-user" />
        <input
          type="number"
          min="0"
          value={String(form.plannedEmployeesFemale)}
          onChange={(e) =>
            onUpdateField(
              "plannedEmployeesFemale",
              e.target.value ? +e.target.value : "",
            )
          }
          placeholder={t("femaleEmployees")}
        />
      </label>
    </div>
    <div className="col-lg-4">
      <label>
        <i className="ti ti-user" />
        <input
          type="number"
          min="0"
          value={String(form.plannedEmployeesMale)}
          onChange={(e) =>
            onUpdateField(
              "plannedEmployeesMale",
              e.target.value ? +e.target.value : "",
            )
          }
          placeholder={t("maleEmployees")}
        />
      </label>
    </div>
    <div className="col-lg-4">
      <label>
        <i className="fa fa-users" />
        <input
          type="number"
          min="0"
          value={String(form.plannedPermanentEmployees)}
          onChange={(e) =>
            onUpdateField(
              "plannedPermanentEmployees",
              e.target.value ? +e.target.value : "",
            )
          }
          placeholder={t("permanentEmployees")}
        />
      </label>
    </div>

    {/* <CheckboxToggle
      fieldKey="isNewIdea"
      labelKey="isNewIdeaLabel"
      value={form.isNewIdea}
      error={errors.isNewIdea}
      onChange={(v: TriBool) => onUpdateField("isNewIdea", v)}
      t={t}
    /> */}
    <div className="col-12">
      <label className={errors.isNewIdea ? "copa-input-invalid" : ""}>
        <i className="ti ti-light-bulb" />
        <select
          value={form.isNewIdea}
          onChange={(e) =>
            onUpdateField("isNewIdea", e.target.value as TriBool)
          }
        >
          <option value="">{t("isNewIdeaLabel")}</option>
          <option value="yes">{t("yes")}</option>
          <option value="no">{t("no")}</option>
        </select>
      </label>
      {errors.isNewIdea && (
        <span className="copa-error-msg">{errors.isNewIdea}</span>
      )}
    </div>

    <div className="col-12">
      <label className={errors.climateActions ? "copa-input-invalid" : ""}>
        <textarea
          rows={3}
          value={form.climateActions}
          onChange={(e) => onUpdateField("climateActions", e.target.value)}
          placeholder={t("climateActionsPlaceholder")}
          style={{ paddingLeft: 15, lineHeight: 1.5 }}
        />
      </label>
      {errors.climateActions && (
        <span className="copa-error-msg">{errors.climateActions}</span>
      )}
    </div>
    <div className="col-12">
      <label className={errors.inclusionActions ? "copa-input-invalid" : ""}>
        <textarea
          rows={3}
          value={form.inclusionActions}
          onChange={(e) => onUpdateField("inclusionActions", e.target.value)}
          placeholder={t("inclusionActionsPlaceholder")}
          style={{ paddingLeft: 15, lineHeight: 1.5 }}
        />
      </label>
      {errors.inclusionActions && (
        <span className="copa-error-msg">{errors.inclusionActions}</span>
      )}
    </div>

    <div className="col-12">
      <label className={errors.hasEstimatedCost ? "copa-input-invalid" : ""}>
        <i className="ti ti-fbu">FBu</i>
        <select
          value={form.hasEstimatedCost}
          className="pl-40"
          onChange={(e) =>
            onUpdateField("hasEstimatedCost", e.target.value as TriBool)
          }
        >
          <option value="">{t("hasEstimatedCostLabel")}</option>
          <option value="yes">{t("yes")}</option>
          <option value="no">{t("no")}</option>
        </select>
      </label>
      {errors.hasEstimatedCost && (
        <span className="copa-error-msg">{errors.hasEstimatedCost}</span>
      )}
    </div>
    {form.hasEstimatedCost === "yes" && (
      <>
        <div className="col-lg-6">
          <label
            className={errors.totalProjectCost ? "copa-input-invalid" : ""}
          >
            <i className="ti ti-fbu">FBu</i>
            <input
              type="number"
              min="0"
              value={String(form.totalProjectCost)}
              className="pl-60 pb-15"
              onChange={(e) =>
                onUpdateField(
                  "totalProjectCost",
                  e.target.value ? +e.target.value : "",
                )
              }
              placeholder={t("totalProjectCost")}
            />
          </label>
          {errors.totalProjectCost && (
            <span className="copa-error-msg">{errors.totalProjectCost}</span>
          )}
        </div>
        <div className="col-lg-6">
          <label
            className={
              errors.requestedSubsidyAmount ? "copa-input-invalid" : ""
            }
          >
            <i className="ti ti-fbu">FBu</i>
            <input
              type="number"
              min="0"
              value={String(form.requestedSubsidyAmount)}
              className="pl-60 pb-15"
              onChange={(e) =>
                onUpdateField(
                  "requestedSubsidyAmount",
                  e.target.value ? +e.target.value : "",
                )
              }
              placeholder={t("requestedSubsidyAmount")}
            />
          </label>
          {errors.requestedSubsidyAmount && (
            <span className="copa-error-msg">
              {errors.requestedSubsidyAmount}
            </span>
          )}
        </div>
      </>
    )}
    <div className="col-12">
      <label className={errors.mainExpenses ? "copa-input-invalid" : ""}>
        <textarea
          rows={3}
          value={form.mainExpenses}
          onChange={(e) => onUpdateField("mainExpenses", e.target.value)}
          placeholder={t("mainExpensesPlaceholder")}
          style={{ paddingLeft: 15, lineHeight: 1.5 }}
        />
      </label>
      {errors.mainExpenses && (
        <span className="copa-error-msg">{errors.mainExpenses}</span>
      )}
    </div>
  </>
);

// ─── Step 4 ───────────────────────────────────────────────────────────────────

const Step4Fields: React.FC<any> = ({ form, errors, onUpdateField, t }) => {
  // const docList =
  //   form.companyStatus === "formal"
  //     ? FORMAL_DOCS
  //     : form.companyStatus === "informal"
  //       ? INFORMAL_DOCS
  //       : null;

  return (
    <>
      {/* Consentements */}
      <div className="col-12">
        <div className="copa-checklist">
          {CONSENT_OPTIONS.map((item) => (
            <label
              key={item.key}
              className={`copa-check-row ${form[item.key] ? "is-checked" : ""} ${errors[item.key] ? "is-invalid" : ""}`}
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
                {item.required && <span style={{ color: "#dc3545" }}> *</span>}
                {item.link && (
                  <Link
                    to="#"
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
                <span className="copa-check-row__error">
                  {errors[item.key]}
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Documents */}
      {/* {docList && (
        <>
          <SectionTitle
            title={t(
              form.companyStatus === "formal"
                ? "documentsForFormal"
                : "documentsForInformal",
            )}
          />
          <div className="col-12 mb-15">
            <InfoBanner
              title={t("documentsInfoTitle")}
              description={t(
                form.companyStatus === "formal"
                  ? "documentsInfoFormal"
                  : "documentsInfoInformal",
              )}
            />
          </div>
          {docList.map((doc) => (
            <FileUploadRow
              key={doc.key}
              docKey={doc.key}
              labelKey={doc.labelKey}
              required={doc.required}
              file={documents[doc.key] || null}
              error={docErrors[doc.key]}
              onChange={onUpdateDocument}
              t={t}
            />
          ))}
        </>
      )} */}
    </>
  );
};

const ProfileLoader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="site-main">
      <Header />
      <PageHeader title={t("myProfile")} breadcrumb={t("myProfile")} />

      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          padding: "60px 24px",
        }}
      >
        {/* Anneau animé */}
        <div style={{ position: "relative", width: 72, height: 72 }}>
          <svg
            viewBox="0 0 72 72"
            style={{
              width: 72,
              height: 72,
              animation: "copa-spin 1.1s linear infinite",
            }}
          >
            <circle
              cx="36" cy="36" r="28"
              fill="none"
              stroke="#e8e8e8"
              strokeWidth="5"
            />
            <circle
              cx="36" cy="36" r="28"
              fill="none"
              stroke="var(--skin-color, #1F4E79)"
              strokeWidth="5"
              strokeDasharray="60 116"
              strokeLinecap="round"
              transform="rotate(-90 36 36)"
            />
          </svg>
          {/* Icône centrée */}
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i
              className="ti ti-user"
              style={{
                fontSize: 22,
                color: "var(--skin-color, #1F4E79)",
                opacity: 0.8,
              }}
            />
          </span>
        </div>
      </div>

      {/* Keyframes — injectés une seule fois dans le <head> */}
      <style>{`
        @keyframes copa-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes copa-pulse {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1;   }
        }
        @keyframes copa-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default Profile;
