import ReferenceService from "@/services/reference/reference.service";
import { useEffect, useMemo, useState } from "react";

const useCopaPhases = (lang: string) => {
  const [phases, setPhases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPhases = async () => {
      setLoading(true);
      try {
        const response = await ReferenceService.getCurrentCopaPhases(lang);
        setPhases(response || []);
      } catch (err) {
        console.error("Error loading COP phases:", err);
        setError("errorLoadingPhases");
      } finally {
        setLoading(false);
      }
    };

    loadPhases();
  }, [lang]);

  const isRegistrationOpen = useMemo(() => {
    return phases.some((phase) => phase.phaseCode === "REGISTRATION");
  }, [phases]);

  const isCandidatureSubmissionOpen = useMemo(() => {
    return phases.some((phase) => phase.phaseCode === "CANDIDATURE_SUBMISSION");
  }, [phases]);

  // True if the candidate can still access the application form (registration OR candidature submission)
  const isApplicationFormOpen = useMemo(() => {
    return isRegistrationOpen || isCandidatureSubmissionOpen;
  }, [isRegistrationOpen, isCandidatureSubmissionOpen]);

  const registrationPhase = useMemo(() => {
    return phases.find((phase) => phase.phaseCode === "REGISTRATION");
  }, [phases]);

  const candidatureSubmissionPhase = useMemo(() => {
    return phases.find((phase) => phase.phaseCode === "CANDIDATURE_SUBMISSION");
  }, [phases]);

  return {
    phases,
    loading,
    error,
    isRegistrationOpen,
    isCandidatureSubmissionOpen,
    isApplicationFormOpen,
    registrationPhase,
    candidatureSubmissionPhase,
  };
};
export default useCopaPhases;
