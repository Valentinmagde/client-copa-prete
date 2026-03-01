import React, { useState } from "react";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import "react-tabs/style/react-tabs.css";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "@/services/auth/auth.service";
import { toast } from "react-toastify";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  certifyAccuracy: boolean;
  acceptNotifications: boolean;
}

const INITIAL: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
  acceptPrivacy: false,
  certifyAccuracy: false,
  acceptNotifications: false,
};

const Register: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [form, setForm] = useState<FormData>(INITIAL);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const from = "/profile";

  const upd = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  // ── Validation ──
  const validate = () => {
    const e: typeof errors = {};
    if (!form.firstName.trim()) e.firstName = t("required");
    if (!form.lastName.trim()) e.lastName = t("required");
    if (!form.email) e.email = t("required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = t("emailInvalid");
    if (!form.phone) e.phone = t("required");
    if (!form.password) e.password = t("required");
    else if (form.password.length < 8) e.password = t("passwordMinLength");
    else if (!/[A-Z]/.test(form.password)) e.password = t("passwordUppercase");
    else if (!/\d/.test(form.password)) e.password = t("passwordNumber");
    if (form.password !== form.confirmPassword)
      e.confirmPassword = t("passwordMismatch");
    if (!form.acceptTerms) e.acceptTerms = t("youMustAcceptTermsAndConditions");
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      await AuthService.registerMpme(
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          passwordConfirmation: form.confirmPassword,
          acceptCGU: form.acceptTerms,
          acceptPrivacyPolicy: form.acceptTerms,
          certifyAccuracy: form.acceptTerms,
        },
        lang,
      );
      toast.success(t("registrationSuccessMessage", { email: form.email }));
      setForm(INITIAL);
      setErrors({});
      setInterval(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      toast.error(err);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSubmit = async () => {
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
                    setApiError(t("googleRegistrationError"));
                    toast.error(t("googleRegistrationError"));
                  }
                }
                setIsGoogleSubmitting(false);
              },
            });
    
            client.requestAccessToken();
          } else {
            // Fallback: redirection vers OAuth classique
            // window.location.href = `${import.meta.env.VITE_API_URL}/v1/${i18n.language}/auth/google`;
            toast.error(t("googleRegistrationError"));
          }
        } catch (err) {
          console.error("Google login error:", err);
          setApiError(t("googleRegistrationError"));
          toast.error(t("googleRegistrationError"));
          setIsGoogleSubmitting(false);
        }
  };

  return (
    <div className="site-main">
      <Header />

      {/* PageHeader */}
      <PageHeader title={t("registration")} breadcrumb={t("register")} />
      {/* PageHeader end */}

      {/* register */}
      <div className="ttm-row register-section clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bg-theme-GreyColor ttm-col-bgcolor-yes ttm-bg rounded p-50 p-lg-20">
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                <div className="layer-content">
                  <div className="text-center mb-20">
                    <h3>{t("createCopaAccount")}</h3>
                  </div>
                  <div className="ttm-tabs ttm-tab-style-02">
                    <form id="login_form" className="login_form wrap-form">
                      <div className="row">
                        <div className="col-lg-6">
                          <label
                            className={
                              errors.firstName ? "copa-input-invalid" : ""
                            }
                          >
                            <i className="ti ti-user" />
                            <input
                              type="text"
                              value={form.firstName}
                              onChange={(e) => upd("firstName", e.target.value)}
                              placeholder={t("firstName")}
                            />
                          </label>
                          {errors.firstName && (
                            <span className="copa-error-msg">
                              {errors.firstName}
                            </span>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <label
                            className={
                              errors.lastName ? "copa-input-invalid" : ""
                            }
                          >
                            <i className="ti ti-user" />
                            <input
                              type="text"
                              value={form.lastName}
                              onChange={(e) => upd("lastName", e.target.value)}
                              placeholder={t("lastName")}
                            />
                          </label>
                          {errors.lastName && (
                            <span className="copa-error-msg">
                              {errors.lastName}
                            </span>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <label
                            className={errors.email ? "copa-input-invalid" : ""}
                          >
                            <i className="ti ti-email" />
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => upd("email", e.target.value)}
                              placeholder={t("email")}
                            />
                          </label>
                          {errors.email && (
                            <span className="copa-error-msg">
                              {errors.email}
                            </span>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <label
                            className={errors.phone ? "copa-input-invalid" : ""}
                          >
                            <i className="ti ti-mobile" />
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={(e) => upd("phone", e.target.value)}
                              placeholder={t("phoneNumber")}
                            />
                          </label>
                          {errors.phone && (
                            <span className="copa-error-msg">
                              {errors.phone}
                            </span>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <label
                            className={
                              errors.password ? "copa-input-invalid" : ""
                            }
                          >
                            <i className="ti ti-lock" />
                            <input
                              type="password"
                              value={form.password}
                              onChange={(e) => upd("password", e.target.value)}
                              placeholder={t("password")}
                            />
                          </label>
                          {errors.password && (
                            <span className="copa-error-msg">
                              {errors.password}
                            </span>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <label
                            className={
                              errors.confirmPassword ? "copa-input-invalid" : ""
                            }
                          >
                            <i className="ti ti-lock" />
                            <input
                              type="password"
                              value={form.confirmPassword}
                              onChange={(e) =>
                                upd("confirmPassword", e.target.value)
                              }
                              placeholder={t("confirmPassword")}
                            />
                          </label>
                          {errors.confirmPassword && (
                            <span className="copa-error-msg">
                              {errors.confirmPassword}
                            </span>
                          )}
                        </div>

                        <div className="col-lg-12">
                          <label className="mt-0">
                            <div className="d-md-flex align-items-center justify-content-between">
                              <div className="cookies-checkbox mt-15">
                                <div className="d-flex flex-row justify-content-start align-items-center">
                                  <input
                                    className="w-auto mr-10"
                                    id="cookies-consent"
                                    name="cookies-consent"
                                    type="checkbox"
                                    value="yes"
                                    onChange={(e) =>
                                      upd(
                                        "acceptTerms",
                                        e.target.checked as any,
                                      )
                                    }
                                  />
                                  <span>
                                    {t("youAcceptOur")}{" "}
                                    <Link to="#">
                                      {t("termsAndConditions")}
                                    </Link>{" "}
                                    {t("and")}{" "}
                                    <Link to="#">{t("privacyPolicy")}</Link>
                                  </span>
                                </div>
                              </div>
                              <div className="mt-15">
                                <p>
                                  {t("alreadyHaveAccount")}
                                  <Link
                                    to={`/login`}
                                    className="text-theme-SkinColor"
                                  >
                                    {" "}
                                    {t("signInHere")}
                                  </Link>
                                </p>
                              </div>
                            </div>
                            {errors.acceptTerms && (
                              <span className="copa-error-msg mt-10">
                                {errors.acceptTerms}
                              </span>
                            )}
                          </label>
                        </div>

                        <div className="col-lg-12">
                          <label className="mb-0">
                            <button
                              className="submit w-100 ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                              type="submit"
                              onClick={handleSubmit}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <span className="copa-spinner" />
                                  Envoi en cours…
                                </>
                              ) : (
                                `${t("register")}`
                              )}
                            </button>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* ── ou ── */}
                  <div className="col-12">
                    <div className="copa-separator">
                      <span>{t("verifyEmail.or")}</span>
                    </div>
                  </div>

                  <div className="login-social-buttons">
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          id="login-with-google"
                          className="social-account-button w-100 google-button d-flex align-items-center justify-content-center"
                          onClick={handleGoogleSubmit}
                          disabled={googleLoading}
                        >
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
                          <span className="ml-10">
                            {t("registerWithGoogle")}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* login end */}

      <Footer />
    </div>
  );
};

export default Register;
