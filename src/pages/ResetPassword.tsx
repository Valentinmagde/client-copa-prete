import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import "react-tabs/style/react-tabs.css";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import AuthService from "@/services/auth/auth.service";
import { toast } from "react-toastify";

interface FormData {
  password: string;
  confirmPassword: string;
}

const INITIAL: FormData = {
  password: "",
  confirmPassword: "",
};

type State = "loading" | "form" | "success" | "error" | "invalid";

const ResetPassword: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [state, setState] = useState<State>("loading");
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [form, setForm] = useState<FormData>(INITIAL);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  // Vérification du token au montage
  useEffect(() => {
    if (!token || !email) {
      setState("invalid");
      return;
    }

    const validateToken = async () => {
      try {
        const res = await AuthService.validateResetToken(
          { token, email },
          lang,
        );
        console.log(res);
        if (res.valid) {
          setState("form");
        } else {
          setState("error");
        }
      } catch (err) {
        console.error(err);
        setState("invalid");
      }
    };

    validateToken();
  }, [token, email, lang]);

  // Compte à rebours pour renvoi
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const upd = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  // Validation de la force du mot de passe
  const getPasswordStrength = () => {
    let strength = 0;
    if (form.password.length >= 8) strength++;
    if (/[A-Z]/.test(form.password)) strength++;
    if (/[a-z]/.test(form.password)) strength++;
    if (/[0-9]/.test(form.password)) strength++;
    if (/[!@#$%^&*]/.test(form.password)) strength++;
    return strength;
  };

  const strength = getPasswordStrength();
  const strengthPercentage = (strength / 5) * 100;

  const getStrengthLabel = () => {
    if (strength <= 2) return t("resetPassword.strength.weak");
    if (strength <= 3) return t("resetPassword.strength.medium");
    if (strength <= 4) return t("resetPassword.strength.good");
    return t("resetPassword.strength.strong");
  };

  const getStrengthColor = () => {
    if (strength <= 2) return "#dc3545";
    if (strength <= 3) return "#ffc107";
    if (strength <= 4) return "#17a2b8";
    return "#28a745";
  };

  // ── Validation ──
  const validate = () => {
    const e: typeof errors = {};

    if (!form.password) {
      e.password = t("required");
    } else {
      if (form.password.length < 8) {
        e.password = t("resetPassword.errors.minLength");
      } else if (!/[A-Z]/.test(form.password)) {
        e.password = t("resetPassword.errors.uppercase");
      } else if (!/[a-z]/.test(form.password)) {
        e.password = t("resetPassword.errors.lowercase");
      } else if (!/[0-9]/.test(form.password)) {
        e.password = t("resetPassword.errors.number");
      } else if (!/[!@#$%^&*]/.test(form.password)) {
        e.password = t("resetPassword.errors.special");
      }
    }

    if (form.password !== form.confirmPassword) {
      e.confirmPassword = t("resetPassword.errors.passwordMismatch");
    }

    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!token || !email) {
      setApiError(t("resetPassword.invalidDesc"));
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      await AuthService.resetPassword(
        {
          token,
          email,
          newPassword: form.password,
        },
        lang,
      );

      setState("success");
      toast.success(t("resetPassword.successTitle"));

      // Redirection après 3 secondes
      setTimeout(() => {
        navigate(`/login?email=${encodeURIComponent(email)}`);
      }, 3000);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || t("resetPassword.errorDesc");
      setApiError(errorMsg);
      toast.error(errorMsg);
      setState("error");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email || cooldown > 0 || resending) return;

    setResending(true);
    try {
      await AuthService.forgotPassword(email, lang);
      setCooldown(60);
      toast.info(t("resetPassword.resendSuccess"));
    } catch (err) {
      console.error(err);
      toast.error(t("resetPassword.resendError"));
    } finally {
      setResending(false);
    }
  };

  const renderContent = () => {
    switch (state) {
      case "loading":
        return (
          <>
            {/* <div className="copa-verify-icon copa-verify-icon--loading mx-auto">
                <div className="copa-ring-spinner" />
              </div> */}
            <h3 className="mb-10">{t("resetPassword.verifying")}</h3>
            <p style={{ color: "#777" }}>{t("resetPassword.verifyingDesc")}</p>
            <div className="copa-loading-dots">
              <span />
              <span />
              <span />
            </div>
          </>
        );

      case "success":
        return (
          <>
            <h3 className="mb-10">{t("resetPassword.successTitle")}</h3>
            <p style={{ color: "#777", marginBottom: 24 }}>
              {t("resetPassword.successDesc")} {email && email}{" "}
              {t("resetPassword.redirectNotice")}
            </p>
            <Link
              to={`/login?email=${encodeURIComponent(email)}`}
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
            >
              {t("resetPassword.goToLogin")}
            </Link>
          </>
        );

      case "error":
        return (
          <>
            <h3 className="mb-10">{t("resetPassword.errorTitle")}</h3>
            <p style={{ color: "#777", marginBottom: 20 }}>
              {apiError || t("resetPassword.errorDesc")}
            </p>

            {/* Bloc renvoi */}
            {/* <div className="featured-icon-box style1 p-20 text-left mb-20"> */}
            <div className="featured-content">
              <p style={{ fontSize: 13, color: "#777", marginBottom: 14 }}>
                {t("resetPassword.resendHint")}
              </p>
              <button
                type="button"
                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                onClick={handleResend}
                disabled={resending || cooldown > 0 || !email}
              >
                {resending ? (
                  <>
                    <span className="copa-spinner" />
                    {t("resetPassword.resending")}
                  </>
                ) : cooldown > 0 ? (
                  `${t("resetPassword.resendIn")} ${cooldown}s`
                ) : (
                  t("resetPassword.resendEmail")
                )}
              </button>
            </div>
            {/* </div> */}

            <div className="copa-separator">
              <span>{t("verifyEmail.or")}</span>
            </div>
            <Link
              to="/login"
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
            >
              {t("resetPassword.backToLogin")}
            </Link>
          </>
        );

      case "invalid":
        return (
          <>
            <h3 className="mb-10">{t("resetPassword.invalidTitle")}</h3>
            <p style={{ color: "#777", marginBottom: 24 }}>
              {t("resetPassword.invalidDesc")}
            </p>
            <Link
              to="/forgot-password"
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor me-2"
            >
              {t("resetPassword.requestNew")}
            </Link>
            <Link
              to={`/login?email=${encodeURIComponent(email)}`}
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
            >
              {t("resetPassword.backToLogin")}
            </Link>
          </>
        );
    }
  };

  return (
    <div className="site-main">
      <Header />

      {/* PageHeader */}
      <PageHeader
        title={t("resetPassword.pageTitle")}
        breadcrumb={t("resetPassword.breadcrumb")}
      />
      {/* PageHeader end */}

      {state === "loading" ||
      state === "error" ||
      state === "invalid" ||
      state === "success" ? (
        <section className="ttm-row process-section bg-theme-GreyColor clearfix">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12 col-md-12">
                <div className="featuredbox-number bg-theme-WhiteColor box-shadow p-40 mt-15 text-center rounded">
                  <div className="row">
                    <div className="col-12">
                      <div className="featured-icon-box icon-align-top-content style6">
                        {/* ICON */}
                        <div className="featured-icon no-after d-flex align-items-center justify-content-center">
                          <div
                            className="ttm-icon ttm-icon_element-fill 
                                  ttm-icon_element-size-lg 
                                  ttm-icon_element-style-round 
                                  ttm-icon_element-color-grey d-flex align-items-center justify-content-center"
                          >
                            {state === "error" && (
                              <i className="fa fa-exclamation text-danger"></i>
                            )}

                            {state === "invalid" && (
                              <i className="fa fa-times text-warning"></i>
                            )}

                            {state === "loading" && (
                              <div className="copa-ring-spinner" />
                            )}
                          </div>
                        </div>

                        {/* CONTENT */}
                        <div className="featured-content">
                          {renderContent()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="copa-verify-footer mt-30">
                    <span>{t("resetPassword.footerNote")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* reset password */}
          <div className="ttm-row register-section clearfix">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="bg-theme-GreyColor ttm-col-bgcolor-yes ttm-bg rounded p-50 p-lg-20">
                    <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                    <div className="layer-content">
                      {/* ========== ÉTAT LOADING ========== */}
                      {state === "loading" && (
                        <>
                          <div className="text-center mb-20">
                            <h3>{t("resetPassword.verifying")}</h3>
                          </div>

                          <div className="ttm-tabs ttm-tab-style-02">
                            <div className="row">
                              <div className="col-12 text-center py-5">
                                <div className="copa-ring-spinner mx-auto mb-4" />
                                <p style={{ color: "#777" }}>
                                  {t("resetPassword.verifyingDesc")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* ========== ÉTAT FORMULAIRE ========== */}
                      {state === "form" && (
                        <>
                          <div className="text-center mb-20">
                            <h3>{t("resetPassword.formTitle")}</h3>
                            {/* <p style={{ color: "#777" }}>
                          {t("resetPassword.formDesc")} <strong>{email}</strong>
                        </p> */}
                          </div>

                          {apiError && (
                            <div className="row mb-20">
                              <div className="col-12">
                                <div
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  <i className="fa fa-exclamation-circle mr-10" />
                                  {apiError}
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="ttm-tabs ttm-tab-style-02">
                            <form
                              id="reset_form"
                              className="login_form wrap-form"
                            >
                              <div className="row">
                                {/* Nouveau mot de passe */}
                                <div className="col-lg-12">
                                  <label
                                    className={
                                      errors.password
                                        ? "copa-input-invalid"
                                        : ""
                                    }
                                  >
                                    <i className="ti ti-lock" />
                                    <input
                                      type="password"
                                      value={form.password}
                                      onChange={(e) =>
                                        upd("password", e.target.value)
                                      }
                                      placeholder={t(
                                        "resetPassword.newPassword",
                                      )}
                                    />
                                  </label>
                                  {errors.password && (
                                    <span className="copa-error-msg">
                                      {errors.password}
                                    </span>
                                  )}
                                </div>

                                {/* Barre de force du mot de passe */}
                                {form.password && (
                                  <div className="col-lg-12 mt-10">
                                    <div
                                      className="progress"
                                      style={{
                                        height: "5px",
                                        marginBottom: "5px",
                                      }}
                                    >
                                      <div
                                        className="progress-bar"
                                        style={{
                                          width: `${strengthPercentage}%`,
                                          backgroundColor: getStrengthColor(),
                                        }}
                                      />
                                    </div>
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "#666",
                                      }}
                                    >
                                      {t("resetPassword.strength.label")}:{" "}
                                      {getStrengthLabel()}
                                    </span>
                                  </div>
                                )}

                                {/* Confirmation */}
                                <div className="col-lg-12">
                                  <label
                                    className={
                                      errors.confirmPassword
                                        ? "copa-input-invalid"
                                        : ""
                                    }
                                  >
                                    <i className="ti ti-lock" />
                                    <input
                                      type="password"
                                      value={form.confirmPassword}
                                      onChange={(e) =>
                                        upd("confirmPassword", e.target.value)
                                      }
                                      placeholder={t(
                                        "resetPassword.confirmPassword",
                                      )}
                                    />
                                  </label>
                                  {errors.confirmPassword && (
                                    <span className="copa-error-msg">
                                      {errors.confirmPassword}
                                    </span>
                                  )}
                                </div>

                                {/* Bouton submit */}
                                <div className="col-lg-12">
                                  <label className="mb-0">
                                    <button
                                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100"
                                      type="submit"
                                      onClick={handleSubmit}
                                      // disabled={
                                      //   isSubmitting ||
                                      //   !form.password ||
                                      //   !form.confirmPassword ||
                                      //   form.password !== form.confirmPassword ||
                                      //   strength < 3
                                      // }
                                    >
                                      {isSubmitting ? (
                                        <>
                                          <span className="copa-spinner" />
                                          {t("resetPassword.submitting")}
                                        </>
                                      ) : (
                                        t("resetPassword.submit")
                                      )}
                                    </button>
                                  </label>
                                </div>
                              </div>
                            </form>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* reset password end */}
        </>
      )}

      <Footer />
    </div>
  );
};

export default ResetPassword;
