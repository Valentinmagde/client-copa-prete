import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { setLocale } from "../../utils/storage";

// Types
export type Language = "fr" | "rn";

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

interface LanguageSwitcherProps {
  currentLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
  position?: "left" | "right";
  showFlags?: boolean;
  showNames?: boolean;
  variant?: "default" | "minimal" | "rounded";
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  position = "right",
  showNames = true,
  variant = "default",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { i18n } = useTranslation();

  // Language options
  const languages: LanguageOption[] = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "rn", name: "Kirundi", flag: "🇧🇮" },
  ];

  // Find current language details
  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle language change
  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setLocale(langCode, { sameSite: "None", secure: true });
    setIsOpen(false);
  };

  // Variant classes
  const variantClass = `language-switcher--${variant}`;
  const positionClass = `language-switcher--dropdown-${position}`;

  return (
    <div
      className={`header_btn language-switcher ${variantClass} ${className}`}
      ref={dropdownRef}
    >
      {/* Bouton principal */}
      <button
        className="language-switcher__trigger ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-icon-btn-left ttm-btn-color-grey text-theme-DarkColor d-flex align-items-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Changer de langue / Guhindura ururimi"
      >
        <i className="ti ti-world fa-sm text-theme-DarkColor"></i>
        <a href="#">{showNames ? currentLanguage.name : ""}</a>
        <span className="language-switcher__arrow">
          <i className={`ti ti-chevron-${isOpen ? "up" : "down"}`}></i>
        </span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`mega-submenu language-switcher__dropdown ${positionClass}`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`language-switcher__option ${
              i18n.language === lang.code
                ? "language-switcher__option--active"
                : ""
            }`}
            onClick={() => handleLanguageChange(lang.code)}
            aria-label={`${lang.name} - ${lang.code === "fr" ? "Français" : "Kirundi"}`}
          >
            {/* {showFlags && (
              <span className="language-switcher__option-flag">
                {lang.flag}
              </span>
            )} */}
            {showNames && (
              <span className="language-switcher__option-name">
                {lang.name}
              </span>
            )}
            {currentLanguage.code === lang.code && (
              <span className="language-switcher__check">
                <i className="ti ti-check"></i>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
