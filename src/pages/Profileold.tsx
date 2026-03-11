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
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { French } from "flatpickr/dist/l10n/fr";

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
type YesNoType = "yes" | "no" | "";

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
  email: string;
  phone: string;
  provinceId: number | "";
  communeId: number | "";
  zone?: string;
  colline?: string;
  isPublicServant: YesNoType;
  hasRelativeInPublicService: YesNoType;
  isIntern: YesNoType;
  hasRelativeIntern: YesNoType;
  hasBeenHighOfficial: YesNoType;
  hasRelativeHighOfficial: YesNoType;
  hasLinkWithUGP: YesNoType;
  isSupplierToUGP: YesNoType;
  hasReceivedSimilarGrant: YesNoType;
  previousGrantDetails?: string;

  // Step 2
  companyAddressDifferent: boolean;
  companyColline?: string;
  companyZone?: string;
  companyCommuneId?: number | "";
  companyProvinceId?: number | "";
  companyPhone?: string;
  companyEmail?: string;
  legalStatus?: string;
  legalStatusOther?: string;
  registrationNumber?: string;
  isAffiliatedToCGA: YesNoType;
  companyStatus: CompanyStatusType;
  companyName: string;
  nif: string;
  creationYear: number | "";
  sectorId: number | "";
  activityDescription: string;
  femaleEmployees: number | "";
  maleEmployees: number | "";
  refugeeEmployees: number | "";
  batwaEmployees: number | "";
  disabledEmployees: number | "";
  permanentEmployees: number | "";
  employeeCount: number | "";
  annualRevenue: number | "";
  partnerCount: number | "";
  partnerCountOther?: string;
  femalePartners: number | "";
  malePartners: number | "";
  refugeePartners: number | "";
  batwaPartners: number | "";
  disabledPartners: number | "";
  creationDate: string;
  hasBankAccount: YesNoType;
  hasBankCredit: YesNoType;
  creditAmount?: number | "";

  // Step 3
  projectTitle: string;
  projectObjective: string;

  sectorsActivity: {
    agroIndustry: boolean;
    subSectors?: {
      milk: boolean;
      poultry: boolean;
      fishFarming: boolean;
      tropicalFruits: boolean;
    };
    mining: boolean;
    relatedServices: boolean;
    other: boolean;
    otherSpecify?: string;
  };
  mainActivities: string;
  productsServices: string;
  businessIdeaOrigin: string;
  targetCustomers: string;
  targetPerimeter: "local" | "national" | "eastAfrica" | "international" | "";
  hasCompetitors: YesNoType;
  competitors?: string[];
  plannedEmployees: {
    female: number | "";
    male: number | "";
  };
  plannedPermanentEmployees: number | "";
  ideaType: "new" | "improvement" | "";
  climateActions: string;
  socialInclusionActions: string;
  hasEstimatedCost: YesNoType;
  totalProjectCost?: number | "";
  requestedGrant?: number | "";
  mainExpenses: string;
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
  acceptTerms: true,
  acceptPrivacy: true,
  certifyAccuracy: true,
  acceptNotifications: false,
  position: "",
  maritalStatus: "",
  educationLevel: "",
  zone: "",
  colline: "",
  isPublicServant: "",
  hasRelativeInPublicService: "",
  isIntern: "",
  hasRelativeIntern: "",
  hasBeenHighOfficial: "",
  hasRelativeHighOfficial: "",
  hasLinkWithUGP: "",
  isSupplierToUGP: "",
  hasReceivedSimilarGrant: "",
  previousGrantDetails: "",
  companyAddressDifferent: false,
  companyColline: "",
  companyZone: "",
  companyCommuneId: "",
  companyProvinceId: "",
  companyPhone: "",
  companyEmail: "",
  legalStatus: "",
  legalStatusOther: "",
  registrationNumber: "",
  isAffiliatedToCGA: "",
  femaleEmployees: "",
  maleEmployees: "",
  refugeeEmployees: "",
  batwaEmployees: "",
  disabledEmployees: "",
  permanentEmployees: "",
  partnerCount: "",
  partnerCountOther: "",
  femalePartners: "",
  malePartners: "",
  refugeePartners: "",
  batwaPartners: "",
  disabledPartners: "",
  creationDate: "",
  hasBankAccount: "",
  hasBankCredit: "",
  creditAmount: "",

  // Step 3
  projectTitle: "",
  projectObjective: "",
  sectorsActivity: {
    agroIndustry: false,
    subSectors: {
      milk: false,
      poultry: false,
      fishFarming: false,
      tropicalFruits: false,
    },
    mining: false,
    relatedServices: false,
    other: false,
    otherSpecify: "",
  },
  mainActivities: "",
  productsServices: "",
  businessIdeaOrigin: "",
  targetCustomers: "",
  targetPerimeter: "",
  hasCompetitors: "",
  competitors: [],
  plannedEmployees: {
    female: "",
    male: "",
  },
  plannedPermanentEmployees: "",
  ideaType: "",
  climateActions: "",
  socialInclusionActions: "",
  hasEstimatedCost: "",
  totalProjectCost: "",
  requestedGrant: "",
  mainExpenses: "",
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
  const navigate = useNavigate();

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
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
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

        if (response.isProfileComplete) {
          navigate("/application-submitted", { replace: true });
        }

        // Déterminer l'étape courante en fonction du pourcentage de complétion
        // if (response.profileCompletionPercentage <= 33) {
        //   setCurrentStep(1);
        // } else if (response.profileCompletionPercentage <= 67) {
        //   setCurrentStep(2);
        // } else if (response.profileCompletionPercentage <= 100) {
        //   setCurrentStep(3);
        // } else {
        //   setCurrentStep(3); // Dernière étape mais tout est complet
        // }
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
      companyStatus: data.companyType as CompanyStatusType,
      acceptTerms: consentMap.get("TERMS_AND_CONDITIONS") || false,
      acceptPrivacy: consentMap.get("PRIVACY_POLICY") || false,
      certifyAccuracy: consentMap.get("CERTIFY_ACCURACY") || false,
      acceptNotifications: consentMap.get("COMMUNICATIONS") || false,
      position: data.user.position || "",
      // age: data.user.age || "",
      maritalStatus: data.user.maritalStatus || "",
      educationLevel: data.user.educationLevel || "",
      zone: data.user.primaryAddress?.zone || "",
      colline: data.user.primaryAddress?.colline || "",
      isPublicServant: data.user.isPublicServant || "",
      hasRelativeInPublicService: data.user.hasRelativeInPublicService || "",
      isIntern: data.user.isIntern || "",
      hasRelativeIntern: data.user.hasRelativeIntern || "",
      hasBeenHighOfficial: data.user.hasBeenHighOfficial || "",
      hasRelativeHighOfficial: data.user.hasRelativeHighOfficial || "",
      hasLinkWithUGP: data.user.hasLinkWithUGP || "",
      isSupplierToUGP: data.user.isSupplierToUGP || "",
      hasReceivedSimilarGrant: data.user.hasReceivedSimilarGrant || "",
      previousGrantDetails: data.user.previousGrantDetails || "",
      companyAddressDifferent: data.company?.addressDifferent || false,
      companyColline: data.company?.colline || "",
      companyZone: data.company?.zone || "",
      companyCommuneId: data.company?.communeId || "",
      companyProvinceId: data.company?.provinceId || "",
      companyPhone: data.company?.phone || "",
      companyEmail: data.company?.email || "",
      legalStatus: data.company?.legalStatus || "",
      legalStatusOther: data.company?.legalStatusOther || "",
      registrationNumber: data.company?.registrationNumber || "",
      isAffiliatedToCGA: data.company?.isAffiliatedToCGA || "",
      femaleEmployees: data.company?.femaleEmployees || "",
      maleEmployees: data.company?.maleEmployees || "",
      refugeeEmployees: data.company?.refugeeEmployees || "",
      batwaEmployees: data.company?.batwaEmployees || "",
      disabledEmployees: data.company?.disabledEmployees || "",
      partnerCount: data.company?.partnerCount || "",
      partnerCountOther: data.company?.partnerCountOther || "",
      femalePartners: data.company?.femalePartners || "",
      malePartners: data.company?.malePartners || "",
      refugeePartners: data.company?.refugeePartners || "",
      batwaPartners: data.company?.batwaPartners || "",
      disabledPartners: data.company?.disabledPartners || "",
      creationDate: data.company?.creationDate || "",
      hasBankAccount: data.company?.hasBankAccount || "",
      hasBankCredit: data.company?.hasBankCredit || "",
      creditAmount: data.company?.creditAmount || "",
      projectTitle: data.project?.title || "",
      projectObjective: data.project?.objective || "",
      sectorsActivity: data.project?.sectorsActivity || INITIAL_FORM.sectorsActivity,
      mainActivities: data.project?.mainActivities || "",
      productsServices: data.project?.productsServices || "",
      businessIdeaOrigin: data.project?.businessIdeaOrigin || "",
      targetCustomers: data.project?.targetCustomers || "",
      targetPerimeter: data.project?.targetPerimeter || "",
      hasCompetitors: data.project?.hasCompetitors || "",
      competitors: data.project?.competitors || [],
      plannedEmployees: data.project?.plannedEmployees || { female: "", male: "" },
      plannedPermanentEmployees: data.project?.plannedPermanentEmployees || "",
      ideaType: data.project?.ideaType || "",
      climateActions: data.project?.climateActions || "",
      socialInclusionActions: data.project?.socialInclusionActions || "",
      hasEstimatedCost: data.project?.hasEstimatedCost || "",
      totalProjectCost: data.project?.totalProjectCost || "",
      requestedGrant: data.project?.requestedGrant || "",
      mainExpenses: data.project?.mainExpenses || "",
      permanentEmployees: data?.company?.permanentEmployees
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
          if (!form.position.trim()) newErrors.position = t("required");
          // if (!form.age) newErrors.age = t("required");
          // else if (form.age < 18) newErrors.age = t("ageInvalid");
          
          if (!form.maritalStatus) newErrors.maritalStatus = t("required");
          if (!form.educationLevel) newErrors.educationLevel = t("required");
          
          // Conflits d'intérêts (tous requis car déclaration sur l'honneur)
          if (!form.isPublicServant) newErrors.isPublicServant = t("required");
          if (!form.hasRelativeInPublicService) newErrors.hasRelativeInPublicService = t("required");
          if (!form.isIntern) newErrors.isIntern = t("required");
          if (!form.hasRelativeIntern) newErrors.hasRelativeIntern = t("required");
          if (!form.hasBeenHighOfficial) newErrors.hasBeenHighOfficial = t("required");
          if (!form.hasRelativeHighOfficial) newErrors.hasRelativeHighOfficial = t("required");
          if (!form.hasLinkWithUGP) newErrors.hasLinkWithUGP = t("required");
          if (!form.isSupplierToUGP) newErrors.isSupplierToUGP = t("required");
          if (!form.hasReceivedSimilarGrant) newErrors.hasReceivedSimilarGrant = t("required");
          
          // Si a reçu une subvention, demander les détails
          if (form.hasReceivedSimilarGrant === "yes" && !form.previousGrantDetails?.trim()) {
            newErrors.previousGrantDetails = t("required");
          }
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

             // Nouveaux champs entreprise
              if (form.companyAddressDifferent) {
                if (!form.companyProvinceId) newErrors.companyProvinceId = t("required");
                if (!form.companyCommuneId) newErrors.companyCommuneId = t("required");
              }
        
            if (form.companyStatus === "formal") {
              if (!form.legalStatus) newErrors.legalStatus = t("required");
              if (form.legalStatus === "other" && !form.legalStatusOther?.trim()) {
                newErrors.legalStatusOther = t("required");
              }
              if (!form.registrationNumber) newErrors.registrationNumber = t("required");
            }
            
            if (!form.isAffiliatedToCGA) newErrors.isAffiliatedToCGA = t("required");
        
            // Validation des employés
            if (form.femaleEmployees === "") newErrors.femaleEmployees = t("required");
            if (form.maleEmployees === "") newErrors.maleEmployees = t("required");
            
            const totalEmployees = (Number(form.femaleEmployees) || 0) + 
                                  (Number(form.maleEmployees) || 0);
            if (totalEmployees !== (Number(form.employeeCount) || 0)) {
              newErrors.employeeCount = t("employeeCountMismatch");
            }
            
            // Validation des associés
            if (!form.partnerCount) newErrors.partnerCount = t("required");
            
            if (form.hasBankCredit === "yes" && !form.creditAmount) {
              newErrors.creditAmount = t("required");
            }
          }
          break;

        case 3:
          // Nouveaux champs projet
          if (!form.projectTitle.trim()) newErrors.projectTitle = t("required");
          if (!form.projectObjective.trim()) newErrors.projectObjective = t("required");
          
          // Au moins un secteur sélectionné
          const hasSector = form.sectorsActivity.agroIndustry || 
                          form.sectorsActivity.mining || 
                          form.sectorsActivity.relatedServices ||
                          form.sectorsActivity.other;
          if (!hasSector) newErrors.sectorsActivity = t("required");
          
          if (!form.mainActivities.trim()) newErrors.mainActivities = t("required");
          if (!form.productsServices.trim()) newErrors.productsServices = t("required");
          if (!form.businessIdeaOrigin.trim()) newErrors.businessIdeaOrigin = t("required");
          if (!form.targetCustomers.trim()) newErrors.targetCustomers = t("required");
          if (!form.targetPerimeter) newErrors.targetPerimeter = t("required");
          if (!form.hasCompetitors) newErrors.hasCompetitors = t("required");
          
          if (form.hasCompetitors === "yes") {
            if (!form.competitors || form.competitors.length === 0) {
              newErrors.competitors = t("required");
            }
          }
          
          if (form.plannedEmployees.female === "") newErrors.plannedEmployeesFemale = t("required");
          if (form.plannedEmployees.male === "") newErrors.plannedEmployeesMale = t("required");
          if (!form.plannedPermanentEmployees) newErrors.plannedPermanentEmployees = t("required");
          
          if (!form.ideaType) newErrors.ideaType = t("required");
          if (!form.climateActions.trim()) newErrors.climateActions = t("required");
          if (!form.socialInclusionActions.trim()) newErrors.socialInclusionActions = t("required");
          if (!form.hasEstimatedCost) newErrors.hasEstimatedCost = t("required");
          
          if (form.hasEstimatedCost === "yes") {
            if (!form.totalProjectCost) newErrors.totalProjectCost = t("required");
            if (!form.requestedGrant) newErrors.requestedGrant = t("required");
            if (!form.mainExpenses.trim()) newErrors.mainExpenses = t("required");
          }
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

  const saveCurrentStep = async (isFinish: boolean = false) => {
    if (!beneficiary?.id) {
      toast.error(t("beneficiaryNotFound"));
      return;
    }

    if (!validateStep(currentStep)) {
      // toast.error(t("pleaseFixErrors"));
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
            position: form.position,
            // age: form.age,
            maritalStatus: form.maritalStatus,
            educationLevel: form.educationLevel,
            zone: form.zone,
            colline: form.colline,
            isPublicServant: form.isPublicServant,
            hasRelativeInPublicService: form.hasRelativeInPublicService,
            isIntern: form.isIntern,
            hasRelativeIntern: form.hasRelativeIntern,
            hasBeenHighOfficial: form.hasBeenHighOfficial,
            hasRelativeHighOfficial: form.hasRelativeHighOfficial,
            hasLinkWithUGP: form.hasLinkWithUGP,
            isSupplierToUGP: form.isSupplierToUGP,
            hasReceivedSimilarGrant: form.hasReceivedSimilarGrant,
            previousGrantDetails: form.previousGrantDetails,
          },
          step2: {
            companyStatus: form.companyStatus,
            companyExists:
              form.companyStatus && form.companyStatus !== "project"
                ? "yes"
                : "no",
            companyName: form.companyName,
            nif: form.nif,
            creationYear: form.creationYear,
            sectorId: form.sectorId,
            activityDescription: form.activityDescription,
            employeeCount: form.employeeCount,
            annualRevenue: form.annualRevenue,
            companyAddressDifferent: form.companyAddressDifferent,
            companyColline: form.companyColline,
            companyZone: form.companyZone,
            companyCommuneId: form.companyCommuneId,
            companyProvinceId: form.companyProvinceId,
            companyPhone: form.companyPhone,
            companyEmail: form.companyEmail,
            legalStatus: form.legalStatus,
            legalStatusOther: form.legalStatusOther,
            registrationNumber: form.registrationNumber,
            isAffiliatedToCGA: form.isAffiliatedToCGA,
            femaleEmployees: form.femaleEmployees,
            maleEmployees: form.maleEmployees,
            refugeeEmployees: form.refugeeEmployees,
            batwaEmployees: form.batwaEmployees,
            disabledEmployees: form.disabledEmployees,
            partnerCount: form.partnerCount,
            partnerCountOther: form.partnerCountOther,
            femalePartners: form.femalePartners,
            malePartners: form.malePartners,
            refugeePartners: form.refugeePartners,
            batwaPartners: form.batwaPartners,
            disabledPartners: form.disabledPartners,
            creationDate: form.creationDate,
            hasBankAccount: form.hasBankAccount,
            hasBankCredit: form.hasBankCredit,
            creditAmount: form.creditAmount,
          },
          step3: {
            projectTitle: form.projectTitle,
            projectObjective: form.projectObjective,
            sectorsActivity: form.sectorsActivity,
            mainActivities: form.mainActivities,
            productsServices: form.productsServices,
            businessIdeaOrigin: form.businessIdeaOrigin,
            targetCustomers: form.targetCustomers,
            targetPerimeter: form.targetPerimeter,
            hasCompetitors: form.hasCompetitors,
            competitors: form.competitors,
            plannedEmployees: form.plannedEmployees,
            plannedPermanentEmployees: form.plannedPermanentEmployees,
            ideaType: form.ideaType,
            climateActions: form.climateActions,
            socialInclusionActions: form.socialInclusionActions,
            hasEstimatedCost: form.hasEstimatedCost,
            totalProjectCost: form.totalProjectCost,
            requestedGrant: form.requestedGrant,
            mainExpenses: form.mainExpenses,
            acceptCGU: form.acceptTerms,
            acceptPrivacyPolicy: form.acceptPrivacy,
            certifyAccuracy: form.certifyAccuracy,
            optInNotifications: form.acceptNotifications,
            isProfileCompleted: isFinish,
          },
        },
        lang,
      );

      // Recharger les données pour avoir le nouveau pourcentage
      await loadBeneficiaryData();

      if (currentStep === 3) {
        toast.success(t("profileUpdated"));
      } else {
        toast.success(t("stepSaved", { step: currentStep }));
      }
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
                  {currentStep === 1 && (
                    <InfoBanner
                      title={t("profileNoteTitle")}
                      description={t("profileNote")}
                    />
                  )}

                  {/* Bannière de validation pour l'étape 3 */}
                  {currentStep === 3 && (
                    <InfoBanner
                      title={t("verifyBanner.title")}
                      description={t("verifyBanner.description")}
                    />
                    // <div className="copa-validation-banner mb-30">
                    //   <svg viewBox="0 0 20 20" fill="currentColor">
                    //     <path
                    //       fillRule="evenodd"
                    //       d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                    //       clipRule="evenodd"
                    //     />
                    //   </svg>
                    //   <div>
                    //     <strong>{t("verifyBanner.title")}</strong>
                    //     <p>{t("verifyBanner.description")}</p>
                    //   </div>
                    // </div>
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
                      {/* Étape 1 */}
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

// ─── Composants d'étapes ─────────────────────────────────────────────────────

// const Step1Fields: React.FC<any> = ({
//   form,
//   errors,
//   provinces,
//   communes,
//   loadingStates,
//   onUpdateField,
//   t,
//   isKi,
//   maxDate,
// }) => (
//   <>
//     <div className="col-12">
//       <label className={errors.entrepreneurType ? "copa-input-invalid" : ""}>
//         <i className="ti ti-id-badge" />
//         <select
//           value={form.entrepreneurType}
//           onChange={(e) => onUpdateField("entrepreneurType", e.target.value)}
//         >
//           <option value="">{t("selectYourStatus")}</option>
//           <option value="burundian">{t("burundianEntrepreneur")}</option>
//           <option value="refugee">{t("refugeeEntrepreneur")}</option>
//         </select>
//       </label>
//       {errors.entrepreneurType && (
//         <span className="copa-error-msg">{errors.entrepreneurType}</span>
//       )}
//     </div>

//     <div className="col-lg-6">
//       <label className={errors.firstName ? "copa-input-invalid" : ""}>
//         <i className="ti ti-user" />
//         <input
//           type="text"
//           value={form.firstName}
//           onChange={(e) => onUpdateField("firstName", e.target.value)}
//           placeholder={t("firstName")}
//         />
//       </label>
//       {errors.firstName && (
//         <span className="copa-error-msg">{errors.firstName}</span>
//       )}
//     </div>

//     <div className="col-lg-6">
//       <label className={errors.lastName ? "copa-input-invalid" : ""}>
//         <i className="ti ti-user" />
//         <input
//           type="text"
//           value={form.lastName}
//           onChange={(e) => onUpdateField("lastName", e.target.value)}
//           placeholder={t("lastName")}
//         />
//       </label>
//       {errors.lastName && (
//         <span className="copa-error-msg">{errors.lastName}</span>
//       )}
//     </div>

//     <div className="col-lg-6">
//       <label className={errors.gender ? "copa-input-invalid" : ""}>
//         <i className="ti ti-anchor" />
//         <select
//           value={form.gender}
//           onChange={(e) => onUpdateField("gender", e.target.value)}
//         >
//           <option value="">{t("selectYourGender")}</option>
//           <option value="M">{t("male")}</option>
//           <option value="F">{t("female")}</option>
//         </select>
//       </label>
//       {errors.gender && <span className="copa-error-msg">{errors.gender}</span>}
//     </div>

//     <div className="col-lg-6">
//       <label className={errors.birthDate ? "copa-input-invalid" : ""}>
//         <i className="ti ti-calendar" />
//         <Flatpickr
//           data-enable-time
//           value={new Date(form.birthDate)}
//           onChange={([date]) => {
//             onUpdateField("birthDate", date.toISOString().split("T")[0]);
//           }}
//           placeholder={t("birthDate")}
//           options={{
//             enableTime: false,
//             dateFormat: "d-m-Y",
//             maxDate: maxDate,
//             locale: isKi ? (KirundiLocale as any) : French,
//             altFormat: "j F Y",
//           }}
//           style={{ height: "55px" }}
//         />
//         {/* <input
//           type="date"
//           value={form.birthDate}
//           onChange={(e) => onUpdateField("birthDate", e.target.value)}
//           max={
//             new Date(new Date().setFullYear(new Date().getFullYear() - 18))
//               .toISOString()
//               .split("T")[0]
//           }
//         /> */}
//       </label>
//       {errors.birthDate && (
//         <span className="copa-error-msg">{errors.birthDate}</span>
//       )}
//     </div>

//     <div className="col-lg-6">
//       <label className={errors.email ? "copa-input-invalid" : ""}>
//         <i className="ti ti-email" />
//         <input
//           type="email"
//           value={form.email}
//           onChange={(e) => onUpdateField("email", e.target.value)}
//           placeholder={t("email")}
//         />
//       </label>
//       {errors.email && <span className="copa-error-msg">{errors.email}</span>}
//     </div>

//     <div className="col-lg-6">
//       <label className={errors.phone ? "copa-input-invalid" : ""}>
//         <PhoneInput
//           country={"bi"}
//           // onlyCountries={['bi']}
//           value={form.phone}
//           onChange={(phone) => onUpdateField("phone", phone)}
//           autoFormat={true}
//           placeholder={t("phoneNumber")}
//           // disableDropdown={true}
//           enableSearch={true}
//           countryCodeEditable={false}
//           disableSearchIcon={true}
//         />
//       </label>
//       {/* <label className={errors.phone ? "copa-input-invalid" : ""}>
//         <i className="ti ti-mobile" />
//         <input
//           type="tel"
//           value={form.phone}
//           onChange={(e) => onUpdateField("phone", e.target.value)}
//           placeholder={t("phoneNumber")}
//         />
//       </label> */}
//       {errors.phone && <span className="copa-error-msg">{errors.phone}</span>}
//     </div>

//     <div className="col-lg-6">
//       <label className={errors.provinceId ? "copa-input-invalid" : ""}>
//         <i className="ti ti-map" />
//         <select
//           value={String(form.provinceId)}
//           onChange={(e) =>
//             onUpdateField("provinceId", e.target.value ? +e.target.value : "")
//           }
//         >
//           <option value="">
//             {loadingStates.provinces ? t("loading") : t("selectProvince")}
//           </option>
//           {provinces.map((p) => (
//             <option key={p.id} value={p.id}>
//               {p.name}
//             </option>
//           ))}
//         </select>
//       </label>
//       {errors.provinceId && (
//         <span className="copa-error-msg">{errors.provinceId}</span>
//       )}
//     </div>

//     <div className="col-lg-6">
//       <label className={errors.communeId ? "copa-input-invalid" : ""}>
//         <i className="ti ti-map-alt" />
//         <select
//           value={String(form.communeId)}
//           onChange={(e) =>
//             onUpdateField("communeId", e.target.value ? +e.target.value : "")
//           }
//           disabled={!form.provinceId}
//         >
//           <option value="">
//             {loadingStates.communes
//               ? t("loading")
//               : !form.provinceId
//                 ? t("selectProvinceFirst")
//                 : t("selectCommune")}
//           </option>
//           {communes.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//       </label>
//       {errors.communeId && (
//         <span className="copa-error-msg">{errors.communeId}</span>
//       )}
//     </div>
//   </>
// );
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
    {/* ===== SECTION 1: STATUT DU CANDIDAT ===== */}
    <div className="col-12">
      <h4 className="mt-10 mb-15" style={{ color: "#1F4E79", borderBottom: "2px solid #1F4E79", paddingBottom: 8 }}>
        <i className="ti ti-user mr-5"></i>
        {t("candidateStatus")}
      </h4>
    </div>

    {/* Question 1: Type d'entrepreneur */}
    <div className="col-12">
      <label className={errors.entrepreneurType ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q1")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <select
          value={form.entrepreneurType}
          onChange={(e) => onUpdateField("entrepreneurType", e.target.value)}
        >
          <option value="">{t("selectYourStatus")}</option>
          <option value="burundian">{t("burundianEntrepreneur")}</option>
          <option value="refugee">{t("refugeeEntrepreneur")}</option>
          <option value="other">{t("other")}</option>
        </select>
      </label>
      {errors.entrepreneurType && (
        <span className="copa-error-msg">{errors.entrepreneurType}</span>
      )}
    </div>

    {/* Question 1bis: Précision si "Autre" */}
    {form.entrepreneurType === "other" && (
      <div className="col-12">
        <label className={errors.entrepreneurTypeOther ? "copa-input-invalid" : ""}>
          <span className="question-text">{t("specify")}</span>
          <input
            type="text"
            value={form.entrepreneurTypeOther || ""}
            onChange={(e) => onUpdateField("entrepreneurTypeOther", e.target.value)}
            placeholder={t("specifyStatus")}
          />
        </label>
        {errors.entrepreneurTypeOther && (
          <span className="copa-error-msg">{errors.entrepreneurTypeOther}</span>
        )}
      </div>
    )}

    {/* ===== SECTION 2: IDENTITÉ ===== */}
    <div className="col-12">
      <h4 className="mt-20 mb-15" style={{ color: "#1F4E79", borderBottom: "2px solid #1F4E79", paddingBottom: 8 }}>
        <i className="ti ti-id-badge mr-5"></i>
        {t("identity")}
      </h4>
    </div>

    {/* Question 3: Prénom */}
    <div className="col-lg-6">
      <label className={errors.firstName ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q3")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
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

    {/* Question 1: Nom (du document) */}
    <div className="col-lg-6">
      <label className={errors.lastName ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q1_name")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
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

    {/* Question 4: Fonction */}
    <div className="col-lg-6">
      <label className={errors.position ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q4")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <i className="ti ti-briefcase" />
        <input
          type="text"
          value={form.position}
          onChange={(e) => onUpdateField("position", e.target.value)}
          placeholder={t("function")}
        />
      </label>
      {errors.position && (
        <span className="copa-error-msg">{errors.position}</span>
      )}
    </div>

    {/* Question 5: Âge */}
    {/* <div className="col-lg-6">
      <label className={errors.age ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q5")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <i className="ti ti-calendar" />
        <input
          type="number"
          value={String(form.age)}
          onChange={(e) => onUpdateField("age", e.target.value ? +e.target.value : "")}
          placeholder={t("age")}
          min="18"
          max="100"
        />
      </label>
      {errors.age && (
        <span className="copa-error-msg">{errors.age}</span>
      )}
    </div> */}

    {/* Question 6: Sexe */}
    <div className="col-lg-6">
      <label className={errors.gender ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q6")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
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

    {/* Question 7: État civil */}
    <div className="col-lg-6">
      <label className={errors.maritalStatus ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q7")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
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

    {/* Question 8: Niveau d'étude */}
    <div className="col-lg-6">
      <label className={errors.educationLevel ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q8")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <i className="ti ti-education" />
        <select
          value={form.educationLevel}
          onChange={(e) => onUpdateField("educationLevel", e.target.value)}
        >
          <option value="">{t("selectEducationLevel")}</option>
          <option value="none">{t("noSchooling")}</option>
          <option value="primary">{t("primary")}</option>
          <option value="secondary">{t("secondary")}</option>
          <option value="university">{t("university")}</option>
        </select>
      </label>
      {errors.educationLevel && (
        <span className="copa-error-msg">{errors.educationLevel}</span>
      )}
    </div>

    {/* Date de naissance (complément) */}
    <div className="col-lg-6">
      <label className={errors.birthDate ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("birthDate")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <i className="ti ti-calendar" />
        <Flatpickr
          value={form.birthDate ? new Date(form.birthDate) : null}
          onChange={([date]) => {
            if (date) onUpdateField("birthDate", date.toISOString().split("T")[0]);
          }}
          placeholder={t("birthDate")}
          options={{
            enableTime: false,
            dateFormat: "d-m-Y",
            maxDate: maxDate,
            locale: isKi ? KirundiLocale as any : French,
            altFormat: "j F Y"
          }}
          style={{ height: '55px' }}
        />
      </label>
      {errors.birthDate && (
        <span className="copa-error-msg">{errors.birthDate}</span>
      )}
    </div>

    {/* ===== SECTION 3: CONTACT ===== */}
    <div className="col-12">
      <h4 className="mt-20 mb-15" style={{ color: "#1F4E79", borderBottom: "2px solid #1F4E79", paddingBottom: 8 }}>
        <i className="ti ti-address-book mr-5"></i>
        {t("contact")}
      </h4>
    </div>

    {/* Email */}
    <div className="col-lg-6">
      <label className={errors.email ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("email")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
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

    {/* Téléphone */}
    <div className="col-lg-6">
      <label className={errors.phone ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("phoneNumber")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <PhoneInput
          country={'bi'}
          value={form.phone}
          onChange={phone => onUpdateField("phone", phone)}
          autoFormat={true}
          placeholder={t("phoneNumber")}
          enableSearch={true}
          countryCodeEditable={false}
          disableSearchIcon={true}
          inputStyle={{ width: '100%', height: '55px', paddingLeft: '48px' }}
        />
      </label>
      {errors.phone && <span className="copa-error-msg">{errors.phone}</span>}
    </div>

    {/* ===== SECTION 4: ADRESSE ===== */}
    <div className="col-12">
      <h4 className="mt-20 mb-15" style={{ color: "#1F4E79", borderBottom: "2px solid #1F4E79", paddingBottom: 8 }}>
        <i className="ti ti-map mr-5"></i>
        {t("address")}
      </h4>
    </div>

    {/* Province */}
    <div className="col-lg-6">
      <label className={errors.provinceId ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("province")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
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

    {/* Commune */}
    <div className="col-lg-6">
      <label className={errors.communeId ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("commune")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
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

    {/* Zone */}
    <div className="col-lg-6">
      <label>
        <span className="question-text">{t("zone")}</span>
        <i className="ti ti-location" />
        <input
          type="text"
          value={form.zone || ""}
          onChange={(e) => onUpdateField("zone", e.target.value)}
          placeholder={t("zone")}
        />
      </label>
    </div>

    {/* Colline/Quartier */}
    <div className="col-lg-6">
      <label>
        <span className="question-text">{t("colline")}</span>
        <i className="ti ti-location" />
        <input
          type="text"
          value={form.colline || ""}
          onChange={(e) => onUpdateField("colline", e.target.value)}
          placeholder={t("colline")}
        />
      </label>
    </div>

     <div className="col-12">
      <h4 className="mt-30 mb-15" style={{ color: "#1F4E79", borderBottom: "2px solid #1F4E79", paddingBottom: 8 }}>
        <i className="ti ti-shield mr-5"></i>
        {t("conflictOfInterest")}
      </h4>
      <p className="mb-20" style={{ fontSize: 13, color: "#666", fontStyle: "italic" }}>
        {t("conflictOfInterestDesc")}
      </p>
    </div>

    {/* Question 11: Fonction publique - Remplacé par select */}
    <div className="col-lg-6 mb-15">
      <label className={errors.isPublicServant ? "copa-input-invalid" : ""}>
        <span className="question-text">{t("q11")} <span style={{ color: "#dc3545" }}>*</span></span>
        <select
          value={form.isPublicServant}
          onChange={(e) => onUpdateField("isPublicServant", e.target.value)}
        >
          <option value="">{t("selectOption")}</option>
          <option value="yes">{t("yes")}</option>
          <option value="no">{t("no")}</option>
        </select>
      </label>
      {errors.isPublicServant && (
        <span className="copa-error-msg">{errors.isPublicServant}</span>
      )}
    </div>

    {/* Question 12: Parent dans fonction publique - Remplacé par select */}
    <div className="col-lg-6 mb-15">
      <label className={errors.hasRelativeInPublicService ? "copa-input-invalid" : ""}>
        <span className="question-text">{t("q12")} <span style={{ color: "#dc3545" }}>*</span></span>
        <select
          value={form.hasRelativeInPublicService}
          onChange={(e) => onUpdateField("hasRelativeInPublicService", e.target.value)}
        >
          <option value="">{t("selectOption")}</option>
          <option value="yes">{t("yes")}</option>
          <option value="no">{t("no")}</option>
        </select>
      </label>
      {errors.hasRelativeInPublicService && (
        <span className="copa-error-msg">{errors.hasRelativeInPublicService}</span>
      )}
    </div>

    {/* Question 13: Stagiaire - Remplacé par select */}
    <div className="col-lg-6 mb-15">
      <label className={errors.isIntern ? "copa-input-invalid" : ""}>
        <span className="question-text">{t("q13")} <span style={{ color: "#dc3545" }}>*</span></span>
        <select
          value={form.isIntern}
          onChange={(e) => onUpdateField("isIntern", e.target.value)}
        >
          <option value="">{t("selectOption")}</option>
          <option value="yes">{t("yes")}</option>
          <option value="no">{t("no")}</option>
        </select>
      </label>
      {errors.isIntern && (
        <span className="copa-error-msg">{errors.isIntern}</span>
      )}
    </div>

    {/* Question 14: Parent stagiaire - Remplacé par select */}
    <div className="col-lg-6 mb-15">
      <label className={errors.hasRelativeIntern ? "copa-input-invalid" : ""}>
        <span className="question-text">{t("q14")} <span style={{ color: "#dc3545" }}>*</span></span>
        <select
          value={form.hasRelativeIntern}
          onChange={(e) => onUpdateField("hasRelativeIntern", e.target.value)}
        >
          <option value="">{t("selectOption")}</option>
          <option value="yes">{t("yes")}</option>
          <option value="no">{t("no")}</option>
        </select>
      </label>
      {errors.hasRelativeIntern && (
        <span className="copa-error-msg">{errors.hasRelativeIntern}</span>
      )}
    </div>

    {/* Question 15: Haut responsable - Remplacé par select */}
    <div className="col-lg-6 mb-15">
      <label className={errors.hasBeenHighOfficial ? "copa-input-invalid" : ""}>
        <span className="question-text">{t("q15")} <span style={{ color: "#dc3545" }}>*</span></span>
        <select
          value={form.hasBeenHighOfficial}
          onChange={(e) => onUpdateField("hasBeenHighOfficial", e.target.value)}
        >
          <option value="">{t("selectOption")}</option>
          <option value="yes">{t("yes")}</option>
          <option value="no">{t("no")}</option>
        </select>
      </label>
      {errors.hasBeenHighOfficial && (
        <span className="copa-error-msg">{errors.hasBeenHighOfficial}</span>
      )}
    </div>

    {/* Question 16: Parent haut responsable - Remplacé par select */}
    <div className="col-lg-6 mb-15">
      <label className={errors.hasRelativeHighOfficial ? "copa-input-invalid" : ""}>
        <span className="question-text">{t("q16")} <span style={{ color: "#dc3545" }}>*</span></span>
        <select
          value={form.hasRelativeHighOfficial}
          onChange={(e) => onUpdateField("hasRelativeHighOfficial", e.target.value)}
        >
          <option value="">{t("selectOption")}</option>
          <option value="yes">{t("yes")}</option>
          <option value="no">{t("no")}</option>
        </select>
      </label>
      {errors.hasRelativeHighOfficial && (
        <span className="copa-error-msg">{errors.hasRelativeHighOfficial}</span>
      )}
    </div>

    {/* Question 17: Lien avec UGP - Remplacé par select */}
    <div className="col-lg-6 mb-15">
      <label className={errors.hasLinkWithUGP ? "copa-input-invalid" : ""}>
        <span className="question-text">{t("q17")} <span style={{ color: "#dc3545" }}>*</span></span>
        <select
          value={form.hasLinkWithUGP}
          onChange={(e) => onUpdateField("hasLinkWithUGP", e.target.value)}
        >
          <option value="">{t("selectOption")}</option>
          <option value="yes">{t("yes")}</option>
          <option value="no">{t("no")}</option>
        </select>
      </label>
      {errors.hasLinkWithUGP && (
        <span className="copa-error-msg">{errors.hasLinkWithUGP}</span>
      )}
    </div>

    {/* Question 18: Fournisseur UGP - Remplacé par select */}
    <div className="col-lg-6 mb-15">
      <label className={errors.isSupplierToUGP ? "copa-input-invalid" : ""}>
        <span className="question-text">{t("q18")} <span style={{ color: "#dc3545" }}>*</span></span>
        <select
          value={form.isSupplierToUGP}
          onChange={(e) => onUpdateField("isSupplierToUGP", e.target.value)}
        >
          <option value="">{t("selectOption")}</option>
          <option value="yes">{t("yes")}</option>
          <option value="no">{t("no")}</option>
        </select>
      </label>
      {errors.isSupplierToUGP && (
        <span className="copa-error-msg">{errors.isSupplierToUGP}</span>
      )}
    </div>

    {/* Question 19: Subvention similaire - Remplacé par select */}
    <div className="col-lg-6 mb-15">
      <label className={errors.hasReceivedSimilarGrant ? "copa-input-invalid" : ""}>
        <span className="question-text">{t("q19")} <span style={{ color: "#dc3545" }}>*</span></span>
        <select
          value={form.hasReceivedSimilarGrant}
          onChange={(e) => onUpdateField("hasReceivedSimilarGrant", e.target.value)}
        >
          <option value="">{t("selectOption")}</option>
          <option value="yes">{t("yes")}</option>
          <option value="no">{t("no")}</option>
        </select>
      </label>
      {errors.hasReceivedSimilarGrant && (
        <span className="copa-error-msg">{errors.hasReceivedSimilarGrant}</span>
      )}
    </div>

    {/* Question 20: Détails subvention antérieure */}
    {form.hasReceivedSimilarGrant === "yes" && (
      <div className="col-lg-6">
        <label className={errors.previousGrantDetails ? "copa-input-invalid" : ""}>
          <span className="question-text">{t("q20")} <span style={{ color: "#dc3545" }}>*</span></span>
          <textarea
            rows={3}
            value={form.previousGrantDetails || ""}
            onChange={(e) => onUpdateField("previousGrantDetails", e.target.value)}
            placeholder={t("previousGrantDetailsPlaceholder")}
            style={{ padding: 12, lineHeight: 1.5 }}
          />
        </label>
        {errors.previousGrantDetails && (
          <span className="copa-error-msg">{errors.previousGrantDetails}</span>
        )}
      </div>
    )}
  </>
);

// const Step2Fields: React.FC<any> = ({
//   form,
//   errors,
//   sectors,
//   isKi,
//   loadingStates,
//   canShowCompanyFields,
//   onUpdateField,
//   t,
// }) => (
//   <>
//     <div className="col-12">
//       <p
//         style={{
//           fontSize: 13,
//           fontWeight: 600,
//           color: "#444",
//           marginBottom: 10,
//         }}
//       >
//         {t("haveCompany")} <span style={{ color: "#dc3545" }}>*</span>
//       </p>
//       <div className="copa-radio-cards">
//         {COMPANY_STATUS_OPTIONS.map((option) => (
//           <label
//             key={option.value}
//             className={`copa-radio-card ${
//               form.companyStatus === option.value ? "is-selected" : ""
//             }`}
//           >
//             <input
//               type="radio"
//               name="companyStatus"
//               value={option.value}
//               checked={form.companyStatus === option.value}
//               onChange={(e) => onUpdateField("companyStatus", e.target.value)}
//             />
//             <span className="copa-radio-card__check">
//               <svg
//                 viewBox="0 0 10 10"
//                 fill="none"
//                 stroke="currentColor"
//                 width="10"
//                 height="10"
//               >
//                 <path
//                   d="M1.5 5l2.5 2.5 5-5"
//                   strokeLinecap="round"
//                   strokeWidth="2.5"
//                 />
//               </svg>
//             </span>
//             <span className="copa-radio-card__icon">
//               {/* <i className={`ti ${option.icon}`} /> */}
//             </span>
//             <span className="copa-radio-card__name">{t(option.labelKey)}</span>
//             <span className="copa-radio-card__desc">{t(option.descKey)}</span>
//           </label>
//         ))}
//       </div>
//       {errors.companyStatus && (
//         <span className="copa-error-msg">{errors.companyStatus}</span>
//       )}
//     </div>

//     {canShowCompanyFields && (
//       <>
//         <div className="col-lg-6">
//           <label className={errors.companyName ? "copa-input-invalid" : ""}>
//             <i className="ti ti-briefcase" />
//             <input
//               type="text"
//               value={form.companyName}
//               onChange={(e) => onUpdateField("companyName", e.target.value)}
//               placeholder={t("companyName")}
//             />
//           </label>
//           {errors.companyName && (
//             <span className="copa-error-msg">{errors.companyName}</span>
//           )}
//         </div>

//         <div className="col-lg-6">
//           <label className={errors.nif ? "copa-input-invalid" : ""}>
//             <i className="ti ti-id-badge" />
//             <input
//               type="text"
//               value={form.nif}
//               onChange={(e) => onUpdateField("nif", e.target.value)}
//               placeholder={t("nif")}
//             />
//           </label>
//           {errors.nif && <span className="copa-error-msg">{errors.nif}</span>}
//         </div>

//         <div className="col-lg-6">
//           <label className={errors.creationYear ? "copa-input-invalid" : ""}>
//             <i className="ti ti-calendar" />
//             <input
//               type="number"
//               value={String(form.creationYear)}
//               onChange={(e) =>
//                 onUpdateField(
//                   "creationYear",
//                   e.target.value ? +e.target.value : "",
//                 )
//               }
//               placeholder={t("creationYear")}
//               min="1900"
//               max={new Date().getFullYear()}
//             />
//           </label>
//           {errors.creationYear && (
//             <span className="copa-error-msg">{errors.creationYear}</span>
//           )}
//         </div>

//         <div className="col-lg-6">
//           <label className={errors.sectorId ? "copa-input-invalid" : ""}>
//             <i className="ti ti-briefcase" />
//             <select
//               value={String(form.sectorId)}
//               onChange={(e) =>
//                 onUpdateField("sectorId", e.target.value ? +e.target.value : "")
//               }
//             >
//               <option value="">
//                 {loadingStates.sectors ? t("loading") : t("selectSector")}
//               </option>
//               {sectors.map((s) => (
//                 <option key={s.id} value={s.id}>
//                   {isKi && s.nameRn ? s.nameRn : s.nameFr}
//                 </option>
//               ))}
//             </select>
//           </label>
//           {errors.sectorId && (
//             <span className="copa-error-msg">{errors.sectorId}</span>
//           )}
//         </div>

//         <div className="col-12">
//           <label
//             className={errors.activityDescription ? "copa-input-invalid" : ""}
//           >
//             <textarea
//               rows={4}
//               value={form.activityDescription}
//               onChange={(e) =>
//                 onUpdateField("activityDescription", e.target.value)
//               }
//               placeholder={t("activityDescription")}
//               style={{ paddingLeft: 15, lineHeight: 1.5 }}
//             />
//           </label>
//           {errors.activityDescription && (
//             <span className="copa-error-msg">{errors.activityDescription}</span>
//           )}
//         </div>

//         <div className="col-lg-6">
//           <label className={errors.employeeCount ? "copa-input-invalid" : ""}>
//             <i className="fa fa-users" />
//             <input
//               type="number"
//               value={String(form.employeeCount)}
//               onChange={(e) =>
//                 onUpdateField(
//                   "employeeCount",
//                   e.target.value ? +e.target.value : "",
//                 )
//               }
//               placeholder={t("employeeCount")}
//               min="0"
//             />
//           </label>
//           {errors.employeeCount && (
//             <span className="copa-error-msg">{errors.employeeCount}</span>
//           )}
//         </div>

//         <div className="col-lg-6">
//           <label>
//             <i className="ti ti-money" />
//             <input
//               type="number"
//               value={String(form.annualRevenue)}
//               onChange={(e) =>
//                 onUpdateField(
//                   "annualRevenue",
//                   e.target.value ? +e.target.value : "",
//                 )
//               }
//               placeholder={t("annualRevenue")}
//               min="0"
//             />
//           </label>
//         </div>
//       </>
//     )}
//   </>
// );

const Step2Fields: React.FC<any> = ({
  form,
  errors,
  sectors,
  provinces,
  communes,
  isKi,
  loadingStates,
  canShowCompanyFields,
  onUpdateField,
  t,
}) => {
  // Calcul du total des employés pour validation
  const totalEmployees = (Number(form.femaleEmployees) || 0) + 
                         (Number(form.maleEmployees) || 0) + 
                         (Number(form.refugeeEmployees) || 0) + 
                         (Number(form.batwaEmployees) || 0) + 
                         (Number(form.disabledEmployees) || 0);

  return (
  <>
    {/* ===== SECTION 1: STATUT DE L'ENTREPRISE ===== */}
    <div className="col-12">
      <h4 className="mt-10 mb-15" style={{ color: "#1F4E79", borderBottom: "2px solid #1F4E79", paddingBottom: 8 }}>
        <i className="ti ti-briefcase mr-5"></i>
        {t("companyStatus")}
      </h4>
    </div>

    {/* Question 2: Type d'entreprise (formelle/informelle) */}
    <div className="col-12">
      <p className="mb-10" style={{ fontWeight: 600 }}>
        {t("q2")} <span style={{ color: "#dc3545" }}>*</span>
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
              <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" width="10" height="10">
                <path d="M1.5 5l2.5 2.5 5-5" strokeLinecap="round" strokeWidth="2.5" />
              </svg>
            </span>
            <span className="copa-radio-card__icon">
              <i className={`ti ${option.icon}`} />
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

    {/* ===== SECTION 2: ADRESSE DE L'ENTREPRISE (si différente) ===== */}
    {canShowCompanyFields && (
      <>
        <div className="col-12 mt-20">
          <h5 style={{ color: "#1F4E79", marginBottom: 15 }}>
            {t("companyAddress")}
          </h5>
          
          <label className="copa-checkbox mb-15">
            <input
              type="checkbox"
              checked={form.companyAddressDifferent}
              onChange={(e) => onUpdateField("companyAddressDifferent", e.target.checked)}
            />
            <span className="copa-checkbox__text">{t("companyAddressDifferent")}</span>
          </label>
        </div>

        {form.companyAddressDifferent && (
          <>
            {/* Province entreprise */}
            <div className="col-lg-6">
              <label className={errors.companyProvinceId ? "copa-input-invalid" : ""}>
                <span className="question-text">{t("province")}</span>
                <i className="ti ti-map" />
                <select
                  value={String(form.companyProvinceId)}
                  onChange={(e) =>
                    onUpdateField("companyProvinceId", e.target.value ? +e.target.value : "")
                  }
                >
                  <option value="">{t("selectProvince")}</option>
                  {provinces.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </label>
              {errors.companyProvinceId && (
                <span className="copa-error-msg">{errors.companyProvinceId}</span>
              )}
            </div>

            {/* Commune entreprise */}
            <div className="col-lg-6">
              <label className={errors.companyCommuneId ? "copa-input-invalid" : ""}>
                <span className="question-text">{t("commune")}</span>
                <i className="ti ti-map-alt" />
                <select
                  value={String(form.companyCommuneId)}
                  onChange={(e) =>
                    onUpdateField("companyCommuneId", e.target.value ? +e.target.value : "")
                  }
                  disabled={!form.companyProvinceId}
                >
                  <option value="">
                    {!form.companyProvinceId ? t("selectProvinceFirst") : t("selectCommune")}
                  </option>
                  {communes.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </label>
              {errors.companyCommuneId && (
                <span className="copa-error-msg">{errors.companyCommuneId}</span>
              )}
            </div>

            {/* Zone entreprise */}
            <div className="col-lg-6">
              <label>
                <span className="question-text">{t("zone")}</span>
                <i className="ti ti-location" />
                <input
                  type="text"
                  value={form.companyZone || ""}
                  onChange={(e) => onUpdateField("companyZone", e.target.value)}
                  placeholder={t("zone")}
                />
              </label>
            </div>

            {/* Colline/Quartier entreprise */}
            <div className="col-lg-6">
              <label>
                <span className="question-text">{t("colline")}</span>
                <i className="ti ti-location" />
                <input
                  type="text"
                  value={form.companyColline || ""}
                  onChange={(e) => onUpdateField("companyColline", e.target.value)}
                  placeholder={t("colline")}
                />
              </label>
            </div>

            {/* Téléphone entreprise */}
            <div className="col-lg-6">
              <label>
                <span className="question-text">{t("companyPhone")}</span>
                <i className="ti ti-mobile" />
                <input
                  type="tel"
                  value={form.companyPhone || ""}
                  onChange={(e) => onUpdateField("companyPhone", e.target.value)}
                  placeholder={t("companyPhone")}
                />
              </label>
            </div>

            {/* Email entreprise */}
            <div className="col-lg-6">
              <label>
                <span className="question-text">{t("companyEmail")}</span>
                <i className="ti ti-email" />
                <input
                  type="email"
                  value={form.companyEmail || ""}
                  onChange={(e) => onUpdateField("companyEmail", e.target.value)}
                  placeholder={t("companyEmail")}
                />
              </label>
            </div>
          </>
        )}

        {/* ===== SECTION 3: INFORMATIONS JURIDIQUES ===== */}
        <div className="col-12 mt-20">
          <h5 style={{ color: "#1F4E79", marginBottom: 15 }}>
            {t("legalInformation")}
          </h5>
        </div>

        {/* Nom de l'entreprise */}
        <div className="col-lg-6">
          <label className={errors.companyName ? "copa-input-invalid" : ""}>
            <span className="question-text">
              {t("companyName")} <span style={{ color: "#dc3545" }}>*</span>
            </span>
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

        {/* NIF (pour formelles) */}
        {form.companyStatus === "formal" && (
          <div className="col-lg-6">
            <label className={errors.nif ? "copa-input-invalid" : ""}>
              <span className="question-text">{t("nif")}</span>
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
        )}

        {/* Statut juridique (pour formelles) */}
        {form.companyStatus === "formal" && (
          <>
            <div className="col-lg-6">
              <label className={errors.legalStatus ? "copa-input-invalid" : ""}>
                <span className="question-text">
                  {t("q3_legalStatus")} <span style={{ color: "#dc3545" }}>*</span>
                </span>
                <i className="ti ti-briefcase" />
                <select
                  value={form.legalStatus}
                  onChange={(e) => onUpdateField("legalStatus", e.target.value)}
                >
                  <option value="">{t("selectLegalStatus")}</option>
                  <option value="SNC">{t("snc")}</option>
                  <option value="SCS">{t("scs")}</option>
                  <option value="SPRL">{t("sprl")}</option>
                  <option value="SU">{t("su")}</option>
                  <option value="SA">{t("sa")}</option>
                  <option value="COOPERATIVE">{t("cooperative")}</option>
                  <option value="other">{t("other")}</option>
                </select>
              </label>
              {errors.legalStatus && (
                <span className="copa-error-msg">{errors.legalStatus}</span>
              )}
            </div>

            {form.legalStatus === "other" && (
              <div className="col-lg-6">
                <label className={errors.legalStatusOther ? "copa-input-invalid" : ""}>
                  <span className="question-text">{t("specify")}</span>
                  <input
                    type="text"
                    value={form.legalStatusOther || ""}
                    onChange={(e) => onUpdateField("legalStatusOther", e.target.value)}
                    placeholder={t("specifyLegalStatus")}
                  />
                </label>
                {errors.legalStatusOther && (
                  <span className="copa-error-msg">{errors.legalStatusOther}</span>
                )}
              </div>
            )}

            {/* N° d'enregistrement */}
            <div className="col-lg-6">
              <label className={errors.registrationNumber ? "copa-input-invalid" : ""}>
                <span className="question-text">
                  {t("q4_registrationNumber")} <span style={{ color: "#dc3545" }}>*</span>
                </span>
                <i className="ti ti-file" />
                <input
                  type="text"
                  value={form.registrationNumber || ""}
                  onChange={(e) => onUpdateField("registrationNumber", e.target.value)}
                  placeholder={t("registrationNumber")}
                />
              </label>
              {errors.registrationNumber && (
                <span className="copa-error-msg">{errors.registrationNumber}</span>
              )}
            </div>
          </>
        )}

        {/* Question 5: Affiliation CGA */}
        <div className="col-12 mb-15">
          <label className={errors.isAffiliatedToCGA ? "copa-input-invalid" : ""}>
            <span className="question-text">{t("q5")} <span style={{ color: "#dc3545" }}>*</span></span>
            <div className="copa-yesno-group" style={{ display: 'flex', gap: 20, marginTop: 8 }}>
              <label className="copa-radio-inline">
                <input
                  type="radio"
                  name="isAffiliatedToCGA"
                  value="yes"
                  checked={form.isAffiliatedToCGA === "yes"}
                  onChange={(e) => onUpdateField("isAffiliatedToCGA", e.target.value)}
                />
                <span>{t("yes")}</span>
              </label>
              <label className="copa-radio-inline">
                <input
                  type="radio"
                  name="isAffiliatedToCGA"
                  value="no"
                  checked={form.isAffiliatedToCGA === "no"}
                  onChange={(e) => onUpdateField("isAffiliatedToCGA", e.target.value)}
                />
                <span>{t("no")}</span>
              </label>
            </div>
          </label>
          {errors.isAffiliatedToCGA && (
            <span className="copa-error-msg">{errors.isAffiliatedToCGA}</span>
          )}
        </div>

        {/* ===== SECTION 4: EMPLOYÉS ===== */}
        <div className="col-12 mt-20">
          <h5 style={{ color: "#1F4E79", marginBottom: 15 }}>
            {t("employees")}
          </h5>
        </div>

        {/* Question 6: Répartition des employés */}
        <div className="col-lg-4">
          <label className={errors.femaleEmployees ? "copa-input-invalid" : ""}>
            <span className="question-text">
              {t("q6_female")} <span style={{ color: "#dc3545" }}>*</span>
            </span>
            <i className="ti ti-woman" />
            <input
              type="number"
              value={String(form.femaleEmployees)}
              onChange={(e) => onUpdateField("femaleEmployees", e.target.value ? +e.target.value : "")}
              placeholder={t("femaleEmployees")}
              min="0"
            />
          </label>
          {errors.femaleEmployees && (
            <span className="copa-error-msg">{errors.femaleEmployees}</span>
          )}
        </div>

        <div className="col-lg-4">
          <label className={errors.maleEmployees ? "copa-input-invalid" : ""}>
            <span className="question-text">
              {t("q6_male")} <span style={{ color: "#dc3545" }}>*</span>
            </span>
            <i className="ti ti-man" />
            <input
              type="number"
              value={String(form.maleEmployees)}
              onChange={(e) => onUpdateField("maleEmployees", e.target.value ? +e.target.value : "")}
              placeholder={t("maleEmployees")}
              min="0"
            />
          </label>
          {errors.maleEmployees && (
            <span className="copa-error-msg">{errors.maleEmployees}</span>
          )}
        </div>

        <div className="col-lg-4">
          <label>
            <span className="question-text">{t("q6_refugee")}</span>
            <i className="ti ti-world" />
            <input
              type="number"
              value={String(form.refugeeEmployees)}
              onChange={(e) => onUpdateField("refugeeEmployees", e.target.value ? +e.target.value : "")}
              placeholder={t("refugeeEmployees")}
              min="0"
            />
          </label>
        </div>

        <div className="col-lg-4">
          <label>
            <span className="question-text">{t("q6_batwa")}</span>
            <i className="ti ti-users" />
            <input
              type="number"
              value={String(form.batwaEmployees)}
              onChange={(e) => onUpdateField("batwaEmployees", e.target.value ? +e.target.value : "")}
              placeholder={t("batwaEmployees")}
              min="0"
            />
          </label>
        </div>

        <div className="col-lg-4">
          <label>
            <span className="question-text">{t("q6_disabled")}</span>
            <i className="ti ti-wheelchair" />
            <input
              type="number"
              value={String(form.disabledEmployees)}
              onChange={(e) => onUpdateField("disabledEmployees", e.target.value ? +e.target.value : "")}
              placeholder={t("disabledEmployees")}
              min="0"
            />
          </label>
        </div>

        {/* Question 7: Employés permanents */}
        <div className="col-lg-4">
          <label className={errors.permanentEmployees ? "copa-input-invalid" : ""}>
            <span className="question-text">
              {t("q7")} <span style={{ color: "#dc3545" }}>*</span>
            </span>
            <i className="ti ti-users" />
            <input
              type="number"
              value={String(form.permanentEmployees)}
              onChange={(e) => onUpdateField("permanentEmployees", e.target.value ? +e.target.value : "")}
              placeholder={t("permanentEmployees")}
              min="0"
            />
          </label>
          {errors.permanentEmployees && (
            <span className="copa-error-msg">{errors.permanentEmployees}</span>
          )}
        </div>

        {/* Validation du total */}
        {totalEmployees > 0 && totalEmployees !== (Number(form.employeeCount) || 0) && (
          <div className="col-12">
            <span className="copa-warning-msg">
              ⚠️ {t("employeeCountMismatch")}
            </span>
          </div>
        )}

        {/* ===== SECTION 5: ASSOCIÉS ===== */}
        <div className="col-12 mt-20">
          <h5 style={{ color: "#1F4E79", marginBottom: 15 }}>
            {t("partners")}
          </h5>
        </div>

        {/* Question 8: Nombre d'associés */}
        <div className="col-lg-6">
          <label className={errors.partnerCount ? "copa-input-invalid" : ""}>
            <span className="question-text">
              {t("q8")} <span style={{ color: "#dc3545" }}>*</span>
            </span>
            <i className="ti ti-users" />
            <select
              value={String(form.partnerCount)}
              onChange={(e) => onUpdateField("partnerCount", e.target.value)}
            >
              <option value="">{t("selectPartnerCount")}</option>
              <option value="1">{t("alone")}</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="other">{t("other")}</option>
            </select>
          </label>
          {errors.partnerCount && (
            <span className="copa-error-msg">{errors.partnerCount}</span>
          )}
        </div>

        {form.partnerCount === "other" && (
          <div className="col-lg-6">
            <label className={errors.partnerCountOther ? "copa-input-invalid" : ""}>
              <span className="question-text">{t("specify")}</span>
              <input
                type="number"
                value={form.partnerCountOther || ""}
                onChange={(e) => onUpdateField("partnerCountOther", e.target.value)}
                placeholder={t("specifyPartnerCount")}
                min="1"
              />
            </label>
            {errors.partnerCountOther && (
              <span className="copa-error-msg">{errors.partnerCountOther}</span>
            )}
          </div>
        )}

        {/* Question 9: Répartition des associés */}
        <div className="col-12">
          <p className="mb-10" style={{ fontWeight: 600 }}>{t("q9")}</p>
        </div>

        <div className="col-lg-4">
          <label>
            <span className="question-text">{t("femalePartners")}</span>
            <i className="ti ti-woman" />
            <input
              type="number"
              value={String(form.femalePartners)}
              onChange={(e) => onUpdateField("femalePartners", e.target.value ? +e.target.value : "")}
              placeholder={t("femalePartners")}
              min="0"
            />
          </label>
        </div>

        <div className="col-lg-4">
          <label>
            <span className="question-text">{t("malePartners")}</span>
            <i className="ti ti-man" />
            <input
              type="number"
              value={String(form.malePartners)}
              onChange={(e) => onUpdateField("malePartners", e.target.value ? +e.target.value : "")}
              placeholder={t("malePartners")}
              min="0"
            />
          </label>
        </div>

        <div className="col-lg-4">
          <label>
            <span className="question-text">{t("refugeePartners")}</span>
            <i className="ti ti-world" />
            <input
              type="number"
              value={String(form.refugeePartners)}
              onChange={(e) => onUpdateField("refugeePartners", e.target.value ? +e.target.value : "")}
              placeholder={t("refugeePartners")}
              min="0"
            />
          </label>
        </div>

        <div className="col-lg-4">
          <label>
            <span className="question-text">{t("batwaPartners")}</span>
            <i className="ti ti-users" />
            <input
              type="number"
              value={String(form.batwaPartners)}
              onChange={(e) => onUpdateField("batwaPartners", e.target.value ? +e.target.value : "")}
              placeholder={t("batwaPartners")}
              min="0"
            />
          </label>
        </div>

        <div className="col-lg-4">
          <label>
            <span className="question-text">{t("disabledPartners")}</span>
            <i className="ti ti-wheelchair" />
            <input
              type="number"
              value={String(form.disabledPartners)}
              onChange={(e) => onUpdateField("disabledPartners", e.target.value ? +e.target.value : "")}
              placeholder={t("disabledPartners")}
              min="0"
            />
          </label>
        </div>

        {/* ===== SECTION 6: INFORMATIONS FINANCIÈRES ===== */}
        <div className="col-12 mt-20">
          <h5 style={{ color: "#1F4E79", marginBottom: 15 }}>
            {t("financialInformation")}
          </h5>
        </div>

        {/* Question 10: Chiffre d'affaires */}
        <div className="col-lg-6">
          <label>
            <span className="question-text">{t("q10")}</span>
            <i className="ti ti-money" />
            <input
              type="number"
              value={String(form.annualRevenue)}
              onChange={(e) => onUpdateField("annualRevenue", e.target.value ? +e.target.value : "")}
              placeholder={t("annualRevenue")}
              min="0"
            />
          </label>
        </div>

        {/* Question 11: Date de création */}
        <div className="col-lg-6">
          <label>
            <span className="question-text">{t("q11")}</span>
            <i className="ti ti-calendar" />
            <input
              type="date"
              value={form.creationDate}
              onChange={(e) => onUpdateField("creationDate", e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </label>
        </div>

        {/* Question 12: Compte bancaire */}
        <div className="col-12 mb-15">
          <label className={errors.hasBankAccount ? "copa-input-invalid" : ""}>
            <span className="question-text">{t("q12")} <span style={{ color: "#dc3545" }}>*</span></span>
            <div className="copa-yesno-group" style={{ display: 'flex', gap: 20, marginTop: 8 }}>
              <label className="copa-radio-inline">
                <input
                  type="radio"
                  name="hasBankAccount"
                  value="yes"
                  checked={form.hasBankAccount === "yes"}
                  onChange={(e) => onUpdateField("hasBankAccount", e.target.value)}
                />
                <span>{t("yes")}</span>
              </label>
              <label className="copa-radio-inline">
                <input
                  type="radio"
                  name="hasBankAccount"
                  value="no"
                  checked={form.hasBankAccount === "no"}
                  onChange={(e) => onUpdateField("hasBankAccount", e.target.value)}
                />
                <span>{t("no")}</span>
              </label>
            </div>
          </label>
          {errors.hasBankAccount && (
            <span className="copa-error-msg">{errors.hasBankAccount}</span>
          )}
        </div>

        {/* Question 13: Crédit bancaire */}
        <div className="col-12 mb-15">
          <label className={errors.hasBankCredit ? "copa-input-invalid" : ""}>
            <span className="question-text">{t("q13")} <span style={{ color: "#dc3545" }}>*</span></span>
            <div className="copa-yesno-group" style={{ display: 'flex', gap: 20, marginTop: 8 }}>
              <label className="copa-radio-inline">
                <input
                  type="radio"
                  name="hasBankCredit"
                  value="yes"
                  checked={form.hasBankCredit === "yes"}
                  onChange={(e) => onUpdateField("hasBankCredit", e.target.value)}
                />
                <span>{t("yes")}</span>
              </label>
              <label className="copa-radio-inline">
                <input
                  type="radio"
                  name="hasBankCredit"
                  value="no"
                  checked={form.hasBankCredit === "no"}
                  onChange={(e) => onUpdateField("hasBankCredit", e.target.value)}
                />
                <span>{t("no")}</span>
              </label>
            </div>
          </label>
          {errors.hasBankCredit && (
            <span className="copa-error-msg">{errors.hasBankCredit}</span>
          )}
        </div>

        {/* Montant du crédit */}
        {form.hasBankCredit === "yes" && (
          <div className="col-lg-6">
            <label className={errors.creditAmount ? "copa-input-invalid" : ""}>
              <span className="question-text">{t("creditAmount")} <span style={{ color: "#dc3545" }}>*</span></span>
              <i className="ti ti-money" />
              <input
                type="number"
                value={String(form.creditAmount || "")}
                onChange={(e) => onUpdateField("creditAmount", e.target.value ? +e.target.value : "")}
                placeholder={t("creditAmount")}
                min="0"
              />
            </label>
            {errors.creditAmount && (
              <span className="copa-error-msg">{errors.creditAmount}</span>
            )}
          </div>
        )}
      </>
    )}
  </>
)};

// const Step3Fields: React.FC<any> = ({ form, errors, onUpdateField, t }) => (
//   <div className="col-12">
//     <div className="copa-checklist">
//       {CONSENT_OPTIONS.map((item) => (
//         <label
//           key={item.key}
//           className={`copa-check-row ${form[item.key] ? "is-checked" : ""} ${
//             errors[item.key] ? "is-invalid" : ""
//           }`}
//         >
//           <input
//             type="checkbox"
//             checked={form[item.key] as boolean}
//             onChange={(e) => onUpdateField(item.key, e.target.checked)}
//           />
//           <span className="copa-check-row__box">
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
//           </span>
//           <span className="copa-check-row__text">
//             {t(item.labelKey)}
//             {item.required && (
//               <span className="required-star" style={{ color: "#dc3545" }}>
//                 {" "}
//                 *
//               </span>
//             )}
//             {item.link && (
//               <Link
//                 to={"#"}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="copa-check-row__link"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {t("read")} →
//               </Link>
//             )}
//           </span>
//           {errors[item.key] && (
//             <span className="copa-check-row__error">{errors[item.key]}</span>
//           )}
//         </label>
//       ))}
//     </div>
//   </div>
// );

const Step3Fields: React.FC<any> = ({ form, errors, onUpdateField, t }) => (
  <>
    {/* ===== SECTION 1: PRÉSENTATION DU PROJET ===== */}
    <div className="col-12">
      <h4 className="mt-10 mb-15" style={{ color: "#1F4E79", borderBottom: "2px solid #1F4E79", paddingBottom: 8 }}>
        <i className="ti ti-file mr-5"></i>
        {t("projectPresentation")}
      </h4>
    </div>

    {/* Question 1: Titre du projet */}
    <div className="col-12">
      <label className={errors.projectTitle ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q1_project")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <i className="ti ti-header" />
        <input
          type="text"
          value={form.projectTitle}
          onChange={(e) => onUpdateField("projectTitle", e.target.value)}
          placeholder={t("projectTitlePlaceholder")}
        />
      </label>
      {errors.projectTitle && (
        <span className="copa-error-msg">{errors.projectTitle}</span>
      )}
    </div>

    {/* Question 2: Objectif du projet */}
    <div className="col-12">
      <label className={errors.projectObjective ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q2_project")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <textarea
          rows={3}
          value={form.projectObjective}
          onChange={(e) => onUpdateField("projectObjective", e.target.value)}
          placeholder={t("projectObjectivePlaceholder")}
          style={{ padding: 12, lineHeight: 1.5 }}
        />
      </label>
      {errors.projectObjective && (
        <span className="copa-error-msg">{errors.projectObjective}</span>
      )}
    </div>

    {/* Question 3: Secteurs d'activité */}
    <div className="col-12">
      <label className={errors.sectorsActivity ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q3_sectors")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        
        {/* Agro-industrie */}
        <div style={{ marginBottom: 10 }}>
          <label className="copa-checkbox" style={{ display: 'block', marginBottom: 5 }}>
            <input
              type="checkbox"
              checked={form.sectorsActivity.agroIndustry}
              onChange={(e) => onUpdateField("sectorsActivity", {
                ...form.sectorsActivity,
                agroIndustry: e.target.checked
              })}
            />
            <span className="copa-checkbox__text">{t("agroIndustry")}</span>
          </label>
          
          {form.sectorsActivity.agroIndustry && (
            <div style={{ marginLeft: 25, marginTop: 5 }}>
              <label className="copa-checkbox" style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  checked={form.sectorsActivity.subSectors?.milk}
                  onChange={(e) => onUpdateField("sectorsActivity", {
                    ...form.sectorsActivity,
                    subSectors: { ...form.sectorsActivity.subSectors, milk: e.target.checked }
                  })}
                />
                <span className="copa-checkbox__text">{t("milk")}</span>
              </label>
              <label className="copa-checkbox" style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  checked={form.sectorsActivity.subSectors?.poultry}
                  onChange={(e) => onUpdateField("sectorsActivity", {
                    ...form.sectorsActivity,
                    subSectors: { ...form.sectorsActivity.subSectors, poultry: e.target.checked }
                  })}
                />
                <span className="copa-checkbox__text">{t("poultry")}</span>
              </label>
              <label className="copa-checkbox" style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  checked={form.sectorsActivity.subSectors?.fishFarming}
                  onChange={(e) => onUpdateField("sectorsActivity", {
                    ...form.sectorsActivity,
                    subSectors: { ...form.sectorsActivity.subSectors, fishFarming: e.target.checked }
                  })}
                />
                <span className="copa-checkbox__text">{t("fishFarming")}</span>
              </label>
              <label className="copa-checkbox" style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  checked={form.sectorsActivity.subSectors?.tropicalFruits}
                  onChange={(e) => onUpdateField("sectorsActivity", {
                    ...form.sectorsActivity,
                    subSectors: { ...form.sectorsActivity.subSectors, tropicalFruits: e.target.checked }
                  })}
                />
                <span className="copa-checkbox__text">{t("tropicalFruits")}</span>
              </label>
            </div>
          )}
        </div>

        {/* Industrie minière */}
        <div style={{ marginBottom: 10 }}>
          <label className="copa-checkbox">
            <input
              type="checkbox"
              checked={form.sectorsActivity.mining}
              onChange={(e) => onUpdateField("sectorsActivity", {
                ...form.sectorsActivity,
                mining: e.target.checked
              })}
            />
            <span className="copa-checkbox__text">{t("mining")}</span>
          </label>
        </div>

        {/* Services connexes */}
        <div style={{ marginBottom: 10 }}>
          <label className="copa-checkbox">
            <input
              type="checkbox"
              checked={form.sectorsActivity.relatedServices}
              onChange={(e) => onUpdateField("sectorsActivity", {
                ...form.sectorsActivity,
                relatedServices: e.target.checked
              })}
            />
            <span className="copa-checkbox__text">{t("relatedServices")}</span>
          </label>
        </div>

        {/* Autre */}
        <div style={{ marginBottom: 10 }}>
          <label className="copa-checkbox">
            <input
              type="checkbox"
              checked={form.sectorsActivity.other}
              onChange={(e) => onUpdateField("sectorsActivity", {
                ...form.sectorsActivity,
                other: e.target.checked
              })}
            />
            <span className="copa-checkbox__text">{t("other")}</span>
          </label>
        </div>

        {form.sectorsActivity.other && (
          <div style={{ marginTop: 10 }}>
            <input
              type="text"
              value={form.sectorsActivity.otherSpecify || ""}
              onChange={(e) => onUpdateField("sectorsActivity", {
                ...form.sectorsActivity,
                otherSpecify: e.target.value
              })}
              placeholder={t("specifyOtherSector")}
              style={{ width: '100%', padding: 10 }}
            />
          </div>
        )}
      </label>
      {errors.sectorsActivity && (
        <span className="copa-error-msg">{errors.sectorsActivity}</span>
      )}
    </div>

    {/* Question 4 (optionnel) - déjà couvert par "Autre" */}

    {/* Question 5: Activités principales */}
    <div className="col-12">
      <label className={errors.mainActivities ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q5_activities")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <textarea
          rows={3}
          value={form.mainActivities}
          onChange={(e) => onUpdateField("mainActivities", e.target.value)}
          placeholder={t("mainActivitiesPlaceholder")}
          style={{ padding: 12, lineHeight: 1.5 }}
        />
      </label>
      {errors.mainActivities && (
        <span className="copa-error-msg">{errors.mainActivities}</span>
      )}
    </div>

    {/* Question 6: Produits/services */}
    <div className="col-12">
      <label className={errors.productsServices ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q6_products")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <textarea
          rows={3}
          value={form.productsServices}
          onChange={(e) => onUpdateField("productsServices", e.target.value)}
          placeholder={t("productsServicesPlaceholder")}
          style={{ padding: 12, lineHeight: 1.5 }}
        />
      </label>
      {errors.productsServices && (
        <span className="copa-error-msg">{errors.productsServices}</span>
      )}
    </div>

    {/* Question 7: Origine de l'idée */}
    <div className="col-12">
      <label className={errors.businessIdeaOrigin ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q7_origin")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <textarea
          rows={2}
          value={form.businessIdeaOrigin}
          onChange={(e) => onUpdateField("businessIdeaOrigin", e.target.value)}
          placeholder={t("businessIdeaOriginPlaceholder")}
          style={{ padding: 12, lineHeight: 1.5 }}
        />
      </label>
      {errors.businessIdeaOrigin && (
        <span className="copa-error-msg">{errors.businessIdeaOrigin}</span>
      )}
    </div>

    {/* Question 8: Clientèle cible */}
    <div className="col-12">
      <label className={errors.targetCustomers ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q8_customers")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <textarea
          rows={2}
          value={form.targetCustomers}
          onChange={(e) => onUpdateField("targetCustomers", e.target.value)}
          placeholder={t("targetCustomersPlaceholder")}
          style={{ padding: 12, lineHeight: 1.5 }}
        />
      </label>
      {errors.targetCustomers && (
        <span className="copa-error-msg">{errors.targetCustomers}</span>
      )}
    </div>

    {/* Question 9: Périmètre */}
    <div className="col-12">
      <label className={errors.targetPerimeter ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q9_perimeter")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <div className="copa-radio-group" style={{ display: 'flex', flexWrap: 'wrap', gap: 15, marginTop: 8 }}>
          <label className="copa-radio-inline">
            <input
              type="radio"
              name="targetPerimeter"
              value="local"
              checked={form.targetPerimeter === "local"}
              onChange={(e) => onUpdateField("targetPerimeter", e.target.value)}
            />
            <span>{t("local")}</span>
          </label>
          <label className="copa-radio-inline">
            <input
              type="radio"
              name="targetPerimeter"
              value="national"
              checked={form.targetPerimeter === "national"}
              onChange={(e) => onUpdateField("targetPerimeter", e.target.value)}
            />
            <span>{t("national")}</span>
          </label>
          <label className="copa-radio-inline">
            <input
              type="radio"
              name="targetPerimeter"
              value="eastAfrica"
              checked={form.targetPerimeter === "eastAfrica"}
              onChange={(e) => onUpdateField("targetPerimeter", e.target.value)}
            />
            <span>{t("eastAfrica")}</span>
          </label>
          <label className="copa-radio-inline">
            <input
              type="radio"
              name="targetPerimeter"
              value="international"
              checked={form.targetPerimeter === "international"}
              onChange={(e) => onUpdateField("targetPerimeter", e.target.value)}
            />
            <span>{t("international")}</span>
          </label>
        </div>
      </label>
      {errors.targetPerimeter && (
        <span className="copa-error-msg">{errors.targetPerimeter}</span>
      )}
    </div>

    {/* Question 10: Concurrents */}
    <div className="col-12 mb-15">
      <label className={errors.hasCompetitors ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q10_competitors")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <div className="copa-yesno-group" style={{ display: 'flex', gap: 20, marginTop: 8 }}>
          <label className="copa-radio-inline">
            <input
              type="radio"
              name="hasCompetitors"
              value="yes"
              checked={form.hasCompetitors === "yes"}
              onChange={(e) => onUpdateField("hasCompetitors", e.target.value)}
            />
            <span>{t("yes")}</span>
          </label>
          <label className="copa-radio-inline">
            <input
              type="radio"
              name="hasCompetitors"
              value="no"
              checked={form.hasCompetitors === "no"}
              onChange={(e) => onUpdateField("hasCompetitors", e.target.value)}
            />
            <span>{t("no")}</span>
          </label>
        </div>
      </label>
      {errors.hasCompetitors && (
        <span className="copa-error-msg">{errors.hasCompetitors}</span>
      )}
    </div>

    {/* Question 11: Noms des concurrents */}
    {form.hasCompetitors === "yes" && (
      <div className="col-12">
        <label className={errors.competitors ? "copa-input-invalid" : ""}>
          <span className="question-text">
            {t("q11_competitors")} <span style={{ color: "#dc3545" }}>*</span>
          </span>
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              type="text"
              value={form.competitors?.[index] || ""}
              onChange={(e) => {
                const newCompetitors = [...(form.competitors || [])];
                newCompetitors[index] = e.target.value;
                onUpdateField("competitors", newCompetitors);
              }}
              placeholder={t(`competitorPlaceholder`, { number: index + 1 })}
              style={{ marginBottom: 8, width: '100%', padding: 10 }}
            />
          ))}
        </label>
        {errors.competitors && (
          <span className="copa-error-msg">{errors.competitors}</span>
        )}
      </div>
    )}

    {/* Question 12: Employés prévus */}
    <div className="col-12">
      <p className="mb-10" style={{ fontWeight: 600 }}>{t("q12_employees")}</p>
    </div>

    <div className="col-lg-6">
      <label className={errors.plannedEmployeesFemale ? "copa-input-invalid" : ""}>
        <span className="question-text">{t("female")}</span>
        <i className="ti ti-woman" />
        <input
          type="number"
          value={String(form.plannedEmployees.female)}
          onChange={(e) => onUpdateField("plannedEmployees", {
            ...form.plannedEmployees,
            female: e.target.value ? +e.target.value : ""
          })}
          placeholder={t("femaleEmployees")}
          min="0"
        />
      </label>
      {errors.plannedEmployeesFemale && (
        <span className="copa-error-msg">{errors.plannedEmployeesFemale}</span>
      )}
    </div>

    <div className="col-lg-6">
      <label className={errors.plannedEmployeesMale ? "copa-input-invalid" : ""}>
        <span className="question-text">{t("male")}</span>
        <i className="ti ti-man" />
        <input
          type="number"
          value={String(form.plannedEmployees.male)}
          onChange={(e) => onUpdateField("plannedEmployees", {
            ...form.plannedEmployees,
            male: e.target.value ? +e.target.value : ""
          })}
          placeholder={t("maleEmployees")}
          min="0"
        />
      </label>
      {errors.plannedEmployeesMale && (
        <span className="copa-error-msg">{errors.plannedEmployeesMale}</span>
      )}
    </div>

    {/* Question 13: Employés permanents prévus */}
    <div className="col-lg-6">
      <label className={errors.plannedPermanentEmployees ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q13_permanent")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <i className="ti ti-users" />
        <input
          type="number"
          value={String(form.plannedPermanentEmployees)}
          onChange={(e) => onUpdateField("plannedPermanentEmployees", e.target.value ? +e.target.value : "")}
          placeholder={t("plannedPermanentEmployees")}
          min="0"
        />
      </label>
      {errors.plannedPermanentEmployees && (
        <span className="copa-error-msg">{errors.plannedPermanentEmployees}</span>
      )}
    </div>

    {/* Question 14: Type d'idée */}
    <div className="col-12">
      <label className={errors.ideaType ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q14_ideaType")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <div className="copa-radio-group" style={{ display: 'flex', flexWrap: 'wrap', gap: 15, marginTop: 8 }}>
          <label className="copa-radio-inline">
            <input
              type="radio"
              name="ideaType"
              value="new"
              checked={form.ideaType === "new"}
              onChange={(e) => onUpdateField("ideaType", e.target.value)}
            />
            <span>{t("newIdea")}</span>
          </label>
          <label className="copa-radio-inline">
            <input
              type="radio"
              name="ideaType"
              value="improvement"
              checked={form.ideaType === "improvement"}
              onChange={(e) => onUpdateField("ideaType", e.target.value)}
            />
            <span>{t("improvementIdea")}</span>
          </label>
        </div>
      </label>
      {errors.ideaType && (
        <span className="copa-error-msg">{errors.ideaType}</span>
      )}
    </div>

    {/* Question 15: Actions climatiques */}
    <div className="col-12">
      <label className={errors.climateActions ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q15_climate")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <textarea
          rows={3}
          value={form.climateActions}
          onChange={(e) => onUpdateField("climateActions", e.target.value)}
          placeholder={t("climateActionsPlaceholder")}
          style={{ padding: 12, lineHeight: 1.5 }}
        />
      </label>
      {errors.climateActions && (
        <span className="copa-error-msg">{errors.climateActions}</span>
      )}
    </div>

    {/* Question 16: Actions d'inclusion sociale */}
    <div className="col-12">
      <label className={errors.socialInclusionActions ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q16_inclusion")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <textarea
          rows={3}
          value={form.socialInclusionActions}
          onChange={(e) => onUpdateField("socialInclusionActions", e.target.value)}
          placeholder={t("socialInclusionActionsPlaceholder")}
          style={{ padding: 12, lineHeight: 1.5 }}
        />
      </label>
      {errors.socialInclusionActions && (
        <span className="copa-error-msg">{errors.socialInclusionActions}</span>
      )}
    </div>

    {/* Question 17: Coût estimé */}
    <div className="col-12 mb-15">
      <label className={errors.hasEstimatedCost ? "copa-input-invalid" : ""}>
        <span className="question-text">
          {t("q17_estimatedCost")} <span style={{ color: "#dc3545" }}>*</span>
        </span>
        <div className="copa-yesno-group" style={{ display: 'flex', gap: 20, marginTop: 8 }}>
          <label className="copa-radio-inline">
            <input
              type="radio"
              name="hasEstimatedCost"
              value="yes"
              checked={form.hasEstimatedCost === "yes"}
              onChange={(e) => onUpdateField("hasEstimatedCost", e.target.value)}
            />
            <span>{t("yes")}</span>
          </label>
          <label className="copa-radio-inline">
            <input
              type="radio"
              name="hasEstimatedCost"
              value="no"
              checked={form.hasEstimatedCost === "no"}
              onChange={(e) => onUpdateField("hasEstimatedCost", e.target.value)}
            />
            <span>{t("no")}</span>
          </label>
        </div>
      </label>
      {errors.hasEstimatedCost && (
        <span className="copa-error-msg">{errors.hasEstimatedCost}</span>
      )}
    </div>

    {/* Questions 18-20: Détails du budget */}
    {form.hasEstimatedCost === "yes" && (
      <>
        {/* Question 18: Coût global */}
        <div className="col-lg-6">
          <label className={errors.totalProjectCost ? "copa-input-invalid" : ""}>
            <span className="question-text">
              {t("q18_totalCost")} <span style={{ color: "#dc3545" }}>*</span>
            </span>
            <i className="ti ti-money" />
            <input
              type="number"
              value={String(form.totalProjectCost || "")}
              onChange={(e) => onUpdateField("totalProjectCost", e.target.value ? +e.target.value : "")}
              placeholder={t("totalProjectCost")}
              min="0"
            />
          </label>
          {errors.totalProjectCost && (
            <span className="copa-error-msg">{errors.totalProjectCost}</span>
          )}
        </div>

        {/* Question 19: Subvention demandée */}
        <div className="col-lg-6">
          <label className={errors.requestedGrant ? "copa-input-invalid" : ""}>
            <span className="question-text">
              {t("q19_grant")} <span style={{ color: "#dc3545" }}>*</span>
            </span>
            <i className="ti ti-money" />
            <input
              type="number"
              value={String(form.requestedGrant || "")}
              onChange={(e) => onUpdateField("requestedGrant", e.target.value ? +e.target.value : "")}
              placeholder={t("requestedGrant")}
              min="0"
            />
          </label>
          {errors.requestedGrant && (
            <span className="copa-error-msg">{errors.requestedGrant}</span>
          )}
        </div>

        {/* Question 20: Principaux postes de dépense */}
        <div className="col-12">
          <label className={errors.mainExpenses ? "copa-input-invalid" : ""}>
            <span className="question-text">
              {t("q20_expenses")} <span style={{ color: "#dc3545" }}>*</span>
            </span>
            <textarea
              rows={3}
              value={form.mainExpenses}
              onChange={(e) => onUpdateField("mainExpenses", e.target.value)}
              placeholder={t("mainExpensesPlaceholder")}
              style={{ padding: 12, lineHeight: 1.5 }}
            />
          </label>
          {errors.mainExpenses && (
            <span className="copa-error-msg">{errors.mainExpenses}</span>
          )}
        </div>
      </>
    )}

    {/* ===== SECTION 2: CONSENTEMENTS ===== */}
    <div className="col-12">
      <h4 className="mt-30 mb-15" style={{ color: "#1F4E79", borderBottom: "2px solid #1F4E79", paddingBottom: 8 }}>
        <i className="ti ti-check-box mr-5"></i>
        {t("consents")}
      </h4>
    </div>

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
                />
              </svg>
            </span>
            <span className="copa-check-row__text">
              {t(item.labelKey)}
              {item.required && (
                <span className="required-star" style={{ color: "#dc3545" }}> *</span>
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
  </>
);

export default Profile;
