import HttpService from "../httpService";
import {
  clearLocalAuthData,
  setAccessToken,
  setRefreshToken,
} from "@/utils/storage";

const httpService = new HttpService();

/**
 * The AuthService object provides methods for authenticating users and managing their access tokens.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2024-07-12
 */
const AuthService = {
  /**
   * The singin() method is responsible for authenticating a user and returning an access token.
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-07-12
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @param {string} lang - The selected user language.
   * @returns {Promise<any>} That emits the access token if the sign in is successful, or an error if the
   * sign in fails.
   */
  signin: async (
    email: string,
    password: string,
    lang: string = "en",
  ): Promise<any> => {
    return await httpService.service().post(`/auth/login?lang=${lang}`, {
      email,
      password,
    });
  },

  signup: async (data: any, lang: string = "rn") => {
    return httpService.service().post(`auth/register?lang=${lang}`, data);
  },

  registerMpme: async (data: any, lang: string = "rn") => {
    return httpService.service().post(`auth/register-mpme?lang=${lang}`, data);
  },

  resendVerificationEmail: async (email: string, lang: string = "rn") => {
    return httpService
      .service()
      .post(`auth/resend-verification?lang=${lang}`, { email });
  },

  verifyEmail: async (data: any, lang: string = "rn") => {
    return httpService.service().post(`auth/verify-email?lang=${lang}`, data);
  },

  /**
   * Logout
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-07-12
   *
   * @param {string} lang - The selected language.
   * @returns {Promise<any>} the eventual completion or failure
   */
  signout: async (lang: string = "en"): Promise<any> => {
    return httpService
      .service()
      .get(`/v1/${lang}/auth/logout`)
      .then(() => {
        clearLocalAuthData();
      });
  },

  /**
   * Refresh token
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-07-12
   *
   * @param {string} refreshToken The refreshtoken data
   * @param {string} lang The selected language.
   * @returns {Promise<any>} the eventual completion or failure
   */
  refreshToken: async (
    refreshToken: string,
    lang: string = "en",
  ): Promise<any> => {
    return await httpService
      .service()
      .post(`/v1/${lang}/auth/refresh`, { refreshToken })
      .then((response: any) => {
        const data = response.data;

        // Store access token
        setAccessToken(data.accessToken);

        // Store refresh token
        setRefreshToken(data.refreshToken);
      });
  },
};

export default AuthService;
