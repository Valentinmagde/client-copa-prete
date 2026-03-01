/**
 * Valide une adresse email
 * @param email - L'email à valider
 * @returns true si l'email est valide
 */
export const validateEmail = (email: string): boolean => {
  if (!email) return false;

  // Regex plus complète pour la validation email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Valide un numéro de téléphone burundais
 * @param phone - Le numéro à valider
 * @returns true si le numéro est valide
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone) return false;

  // Nettoie le numéro (enlève les espaces, tirets, etc.)
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

  // Formats acceptés pour le Burundi:
  // - 7XXXXXXXX (8 chiffres)
  // - 22XXXXXX (8 chiffres)
  // - 6XXXXXXXX (9 chiffres ?)
  // - +257XXXXXXXX (avec indicatif)
  const phoneRegex = /^(?:\+257|0)?[67]\d{7}$|^(?:\+257|0)?22\d{6}$/;

  return phoneRegex.test(cleanPhone);
};

/**
 * Valide un NIF (Numéro d'Identification Fiscale)
 * @param nif - Le NIF à valider
 * @returns true si le NIF est valide
 */
export const validateNif = (nif: string): boolean => {
  if (!nif) return false;

  // Nettoie le NIF
  const cleanNif = nif.replace(/[\s\-]/g, "");

  // Format NIF Burundi: généralement 13 chiffres
  // À adapter selon le format réel utilisé dans votre pays
  const nifRegex = /^\d{9,13}$/;

  return nifRegex.test(cleanNif);
};

/**
 * Valide un mot de passe fort
 * @param password - Le mot de passe à valider
 * @returns true si le mot de passe est assez fort
 */
export const validatePassword = (
  password: string,
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (!password) {
    errors.push("Le mot de passe est requis");
    return { isValid: false, errors };
  }

  if (password.length < 8) {
    errors.push("Le mot de passe doit contenir au moins 8 caractères");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins une majuscule");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins une minuscule");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Le mot de passe doit contenir au moins un chiffre");
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push(
      "Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*)",
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valide une date de naissance (doit avoir au moins 18 ans)
 * @param birthDate - La date de naissance
 * @returns true si la personne a au moins 18 ans
 */
export const validateAge = (birthDate: string | Date): boolean => {
  if (!birthDate) return false;

  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return false;

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age >= 18;
};

/**
 * Valide un numéro d'identification (carte d'identité, passeport, etc.)
 * @param idNumber - Le numéro à valider
 * @param type - Le type de document
 * @returns true si le format est valide
 */
export const validateIdNumber = (
  idNumber: string,
  type: "national_id" | "passport" | "refugee_card",
): boolean => {
  if (!idNumber) return false;

  const cleanId = idNumber.replace(/[\s\-]/g, "").toUpperCase();

  switch (type) {
    case "national_id":
      // Format carte d'identité nationale (à adapter)
      return /^[A-Z0-9]{10,15}$/.test(cleanId);

    case "passport":
      // Format passeport (lettres + chiffres)
      return /^[A-Z]{1,2}[0-9]{6,9}$/.test(cleanId);

    case "refugee_card":
      // Format carte de réfugié (à adapter)
      return /^[A-Z]{2}[0-9]{7,10}$/.test(cleanId);

    default:
      return false;
  }
};

/**
 * Valide un code postal (si applicable)
 * @param postalCode - Le code postal
 * @returns true si valide
 */
export const validatePostalCode = (postalCode: string): boolean => {
  if (!postalCode) return true; // Optionnel

  // Format code postal (à adapter pour le Burundi)
  return /^\d{4,5}$/.test(postalCode);
};

/**
 * Nettoie une chaîne de caractères (supprime les espaces en trop, etc.)
 * @param str - La chaîne à nettoyer
 * @returns La chaîne nettoyée
 */
export const sanitizeString = (str: string): string => {
  if (!str) return "";
  return str.trim().replace(/\s+/g, " ");
};

/**
 * Vérifie si une valeur est un nombre valide
 * @param value - La valeur à vérifier
 * @returns true si c'est un nombre valide
 */
export const isValidNumber = (value: any): boolean => {
  if (value === null || value === undefined || value === "") return false;
  const num = Number(value);
  return !isNaN(num) && isFinite(num) && num >= 0;
};

/**
 * Formate un nombre pour l'affichage
 * @param value - Le nombre à formater
 * @param decimals - Nombre de décimales
 * @returns Le nombre formaté
 */
export const formatNumber = (value: number, decimals: number = 0): string => {
  if (!isValidNumber(value)) return "";
  return new Intl.NumberFormat("fr-BI", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Valide une URL
 * @param url - L'URL à valider
 * @returns true si l'URL est valide
 */
export const validateUrl = (url: string): boolean => {
  if (!url) return true; // Optionnel

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valide qu'un champ requis n'est pas vide
 * @param value - La valeur à vérifier
 * @returns true si non vide
 */
export const isRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return true;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
};

/**
 * Valide une longueur minimale
 * @param value - La chaîne à vérifier
 * @param min - Longueur minimale
 * @returns true si la longueur est suffisante
 */
export const minLength = (value: string, min: number): boolean => {
  if (!value) return false;
  return value.trim().length >= min;
};

/**
 * Valide une longueur maximale
 * @param value - La chaîne à vérifier
 * @param max - Longueur maximale
 * @returns true si la longueur ne dépasse pas le maximum
 */
export const maxLength = (value: string, max: number): boolean => {
  if (!value) return true;
  return value.trim().length <= max;
};
