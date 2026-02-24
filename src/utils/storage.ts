import Cookies from "js-cookie";

/**
 * Set access token to cookie.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-21
 *
 * @param {string} accessToken - The user's access token.
 * @returns {void}
 */
export function setAccessToken(accessToken: string): void {
  Cookies.set("accessToken", accessToken);
}

/**
 * Get client access token from cookie.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-21
 *
 * @returns {string} of the user's access token.
 */
export function getAccessTokenCs(): string {
  return Cookies.get("accessToken") || "";
}

/**
 * Remove access token from cookie.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-21
 *
 * @returns {void}
 */
export function removeAccessToken(): void {
  Cookies.remove("accessToken");
}

/**
 * Set refresh token to cookie.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-21
 *
 * @param {string} refreshToken - The user's refresh token.
 * @returns {void}
 */
export function setRefreshToken(refreshToken: string): void {
  Cookies.set("refreshToken", refreshToken);
}

/**
 * Get client side refresh token from cookie.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-21
 *
 * @returns {string} of the user's refresh token
 */
export function getRefreshTokenCs(): string {
  return Cookies.get("refreshToken") || "";
}

/**
 * Remove refresh token from cookie.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-21
 *
 * @returns {void}
 */
export function removeRefreshToken(): void {
  Cookies.remove("refreshToken");
}

/**
 * Set user's login credentials to cookie.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-21
 *
 * @param {any} userLogin The user's login credentials.
 *
 * @returns {void}
 */
export function setUserLogin(userLogin: any): void {
  Cookies.set("userLogin", btoa(JSON.stringify(userLogin)));
}

/**
 * Get client side user's login credentials from cookie.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-21
 *
 * @returns {any} Of user's credentials.
 */
export function getUserLoginCs(): any {
  return JSON.parse(Cookies.get("userLogin") || "");
}

/**
 * Remove user login credentials from cookie.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-21
 *
 * @returns {void}
 */
export function removeUserLogin(): void {
  Cookies.remove("userLogin");
}

/**
 * Set user informations in localstorage.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-21
 *
 * @param {any} adminInfo The user's informations.
 *
 * @returns {void}
 */
export function setUser(adminInfo: any): void {
  Cookies.set("adminInfo", JSON.stringify(adminInfo));
}

/**
 * Get user's informations from localstorage.
 */
export function getUser(): any {
  return JSON.parse(Cookies.get("adminInfo") || "{}");
}

/**
 * Remove user's informations from localstorage.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-21
 *
 * @returns {void}
 */
export function removeAdminInfo(): void {
  Cookies.remove("adminInfo");
}

/**
 * Get the user's roles from localstorage.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-21
 *
 * @returns {string[]} The user's roles.
 */
export function getUserRoles(): string[] {
  return JSON.parse(localStorage.getItem("adminInfo") || "").roles;
}

/**
 * Check if user is logged in client side.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-21
 *
 * @returns {boolean} true|false.
 */
export function isAuthenticatedCs(): boolean {
  return !!getAccessTokenCs() && !!getRefreshTokenCs() && !!getUser();
}

/**
 * Clear local auth data from storage.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2023-07-08
 *
 * @returns {void}
 */
export function clearLocalAuthData(): void {
  removeAccessToken();
  removeRefreshToken();
  removeAdminInfo();

  window.dispatchEvent(new Event("storage"));
  window.location.replace(`/login`);
}

/**
 * that sets the locale in a cookie.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-30
 *
 * @param {string} locale - The language or region that the user is using.
 *
 * @return {void}
 */
export function setLocale(locale: string, options: any): void {
  Cookies.set("i18next", locale, options);
}

/**
 * That gets the locale from a cookie.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-01-30
 *
 * @returns {string} - A locale or an empty string.
 */
export function getLocale(): string {
  return Cookies.get("i18next") || "";
}
