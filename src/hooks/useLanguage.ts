import { useState, useEffect } from "react";
import type { Language } from "../components/common/language-switcher";

export const useLanguage = (initialLanguage: Language = "fr") => {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    // Load from localStorage on mount
    const savedLang = localStorage.getItem(
      "preferred-language",
    ) as Language | null;
    if (savedLang && (savedLang === "fr" || savedLang === "rn")) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem("preferred-language", newLang);
    // Here you would integrate with i18n library
    // i18n.changeLanguage(newLang);
  };

  return {
    language,
    changeLanguage,
    isFrench: language === "fr",
    isKirundi: language === "rn",
  };
};
