import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import AuthService from "@/services/auth/auth.service";
import { setAccessToken, setRefreshToken, setUser } from "@/utils/storage";
import { toast } from "react-toastify";

declare global {
  interface Window {
    google?: any;
  }
}

const Login: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<{
    identifier?: string;
    password?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const location = useLocation();

const from = (location.state as any)?.from?.pathname || "/espace-mpme/dashboard";

  // Initialiser Google Sign-In
  React.useEffect(() => {
    // Charger le script Google si nécessaire
    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const validate = () => {
    const e: typeof errors = {};
    if (!identifier.trim()) e.identifier = t("required");
    if (!password) e.password = t("required");
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      // Utiliser votre AuthService.signin
      const response = await AuthService.signin(
        identifier,
        password,
        i18n.language,
      );

      // La réponse devrait contenir accessToken et refreshToken
      const { accessToken, refreshToken, user } = response;

      // Stocker les tokens avec vos utilitaires
      setAccessToken(accessToken);

      // Si "remember" est coché, stocker le refresh token
      // if (remember) {
        setRefreshToken(refreshToken);
      // }

      // Stocker les informations utilisateur
      if (user) {
        setUser(user);
      }

      toast.success(t("loginSuccess"));

      // Rediriger vers la page précédente ou dashboard
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error("Login error:", err);

      // Gestion des erreurs selon la structure de votre API
      const errorMessage = err;

      // if (err.response?.status === 401) {
      //   setApiError(t("invalidCredentials"));
      // } else if (err.response?.status === 403) {
      //   if (errorMessage?.includes("blocked")) {
      //     setApiError(t("accountBlocked"));
      //   } else if (
      //     errorMessage?.includes("inactive") ||
      //     errorMessage?.includes("verify")
      //   ) {
      //     setApiError(t("accountInactive"));
      //   } else {
      //     setApiError(t("accessDenied"));
      //   }
      // } else if (err.response?.status === 429) {
      //   setApiError(t("tooManyAttempts"));
      // } else {
      //   setApiError(err || t("loginError"));
      // }

      toast.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleSubmitting(true);

    try {
      if (window.google) {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: "email profile",
          callback: async (response: any) => {
            if (response.access_token) {
              try {
                // À implémenter dans votre AuthService
                // const loginResponse = await AuthService.loginWithGoogle(response.access_token, i18n.language);

                toast.success(t("loginSuccess"));
                navigate(from, { replace: true });
              } catch (err: any) {
                console.error("Google login error:", err);
                setApiError(t("googleLoginError"));
                toast.error(t("googleLoginError"));
              }
            }
            setIsGoogleSubmitting(false);
          },
        });

        client.requestAccessToken();
      } else {
        // Fallback: redirection vers OAuth classique
        window.location.href = `${import.meta.env.VITE_API_URL}/v1/${i18n.language}/auth/google`;
      }
    } catch (err) {
      console.error("Google login error:", err);
      setApiError(t("googleLoginError"));
      toast.error(t("googleLoginError"));
      setIsGoogleSubmitting(false);
    }
  };

  // Déterminer si l'identifiant est un email ou un téléphone
  const isEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const getIdentifierType = (): string => {
    if (!identifier) return "";
    return isEmail(identifier) ? "email" : "phone";
  };

  return (
    <div className="site-main">
      <Header />
      <PageHeader title={t("login")} breadcrumb={t("login")} />

      {/* Section — classes framework */}
      <div className="ttm-row clearfix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-12">
              {/* Carte — p-50 + box-shadow du framework */}
              <div className="bg-theme-GreyColor p-50 p-lg-20 box-shadow">
                <div className="layer-content">
                  {/* En-tête */}
                  <div className="text-center mb-30">
                    {/* ttm-icon framework */}
                    {/* <span className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-style-rounded ttm-icon_element-size-md mx-auto mb-20">
                      <i className="ti ti-user" />
                    </span> */}
                    <h4 className="mb-0">{t("loginTitle")}</h4>
                  </div>

                  <div className="sep_holder text-center mb-25">
                    <span className="sep_line" />
                  </div>

                  {/* Formulaire — wrap-form login_form (framework) */}
                  <form
                    className="wrap-form login_form"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="row">
                      {/* Identifiant */}
                      <div className="col-12">
                        <label
                          className={
                            errors.identifier ? "copa-input-invalid" : ""
                          }
                        >
                          <i className="ti ti-user" />
                          <input
                            type="text"
                            value={identifier}
                            onChange={(e) => {
                              setIdentifier(e.target.value);
                              setErrors((p) => ({
                                ...p,
                                identifier: undefined,
                              }));
                            }}
                            placeholder={t("identifierPlaceholder")}
                            autoComplete="username"
                          />
                        </label>
                        {errors.identifier && (
                          <span className="copa-error-msg">
                            {errors.identifier}
                          </span>
                        )}
                      </div>

                      {/* Mot de passe */}
                      <div className="col-12">
                        {/* <div className="copa-label-row">
                          <span>
                            Mot de passe{" "}
                            <span style={{ color: "#dc3545" }}>*</span>
                          </span>
                          <Link
                            to="/mot-de-passe-oublie"
                            className="text-theme-SkinColor"
                            style={{ fontSize: 12, fontWeight: 600 }}
                          >
                            Mot de passe oublié ?
                          </Link>
                        </div> */}
                        <label
                          className={
                            errors.password ? "copa-input-invalid" : ""
                          }
                        >
                          <i className="ti ti-lock" />
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setErrors((p) => ({ ...p, password: undefined }));
                            }}
                            placeholder={t("passwordPlaceholder")}
                            autoComplete="current-password"
                          />
                        </label>
                        {errors.password && (
                          <span className="copa-error-msg">
                            {errors.password}
                          </span>
                        )}
                      </div>

                      {/* Se souvenir de moi */}
                      {/* <div className="col-12">
                        <div className="copa-remember-row">
                          <label>
                            <input
                              type="checkbox"
                              checked={remember}
                              onChange={(e) => setRemember(e.target.checked)}
                            />
                            <span>Se souvenir de moi</span>
                          </label>
                        </div>
                      </div> */}
                      <div className="col-lg-12">
                        <label className="mt-0">
                          <div className="d-md-flex align-items-center justify-content-between">
                            <div className="cookies-checkbox mt-15">
                              <div className="d-flex flex-row justify-content-start">
                                <input
                                  className="w-auto mr-10 mt-5"
                                  id="cookies-consent"
                                  name="cookies-consent"
                                  type="checkbox"
                                  value="yes"
                                />
                                <span>{t("rememberMe")}</span>
                              </div>
                            </div>
                            <div className="mt-15">
                              <p>
                                <a href="#" className="text-theme-SkinColor">
                                  {t("forgotPassword")}
                                </a>
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>

                      {/* Bouton principal — ttm-btn framework */}
                      <div className="col-12">
                        <label className="mb-0">
                          <button
                            type="submit"
                            className="submit w-100 ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="copa-spinner" />
                                {t("loggingIn")}
                              </>
                            ) : (
                              t("loginButton")
                            )}
                          </button>
                        </label>
                      </div>

                      {/* ── ou ── */}
                      <div className="col-12">
                        <div className="copa-separator">
                          <span>{t("or")}</span>
                        </div>
                      </div>

                      {/* Bouton Google — style copa (fond blanc, bordure) */}
                      <div className="col-12">
                        <button
                          type="button"
                          className="copa-google-btn"
                          onClick={handleGoogleLogin}
                          disabled={googleLoading}
                        >
                          {googleLoading ? (
                            <>
                              <span className="copa-spinner copa-spinner--dark" />
                              {t("redirecting")}
                            </>
                          ) : (
                            <>
                              {/* Logo Google SVG officiel */}
                              <svg
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                aria-hidden="true"
                              >
                                <path
                                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                  fill="#4285F4"
                                />
                                <path
                                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                  fill="#34A853"
                                />
                                <path
                                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                  fill="#FBBC05"
                                />
                                <path
                                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                  fill="#EA4335"
                                />
                              </svg>
                              {t("loginWithGoogle")}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Pied */}
                  <div className="sep_holder text-center mt-25 mb-20">
                    <span className="sep_line" />
                  </div>
                  <p className="text-center mb-0" style={{ fontSize: 13 }}>
                    {t("noAccount")}{" "}
                    <Link
                      to="/inscription"
                      className="text-theme-SkinColor fw-bold"
                    >
                      {t("registerFree")}
                    </Link>
                  </p>
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

export default Login;
