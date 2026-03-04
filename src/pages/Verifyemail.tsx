import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import AuthService from "@/services/auth/auth.service";

type State = "loading" | "success" | "error" | "invalid";

const VerifyEmail: React.FC = () => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");

  const [state, setState] = useState<State>(
    token && email ? "loading" : "invalid",
  );
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Vérification auto au montage
  useEffect(() => {
    if (state !== "loading") return;
    AuthService.verifyEmail({ token: token!, email: email! })
      .then(() => setState("success"))
      .catch(() => setState("error"));
  }, []);

  // Compte à rebours après renvoi
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const handleResend = async () => {
    if (!email || cooldown > 0) return;
    setResending(true);
    try {
      await AuthService.resendVerificationEmail(email);
      setCooldown(60);
    } catch (err) {
      console.error(err);
    } finally {
      setResending(false);
    }
  };

  // ─── Contenu selon l'état ─────────────────────────────────────────────────

  const renderContent = () => {
    switch (state) {
      case "loading":
        return (
          <>
            {/* <div className="copa-verify-icon copa-verify-icon--loading mx-auto">
              <div className="copa-ring-spinner" />
            </div> */}
            <h3 className="mb-10">{t("verifyEmail.verifying")}</h3>
            <p style={{ color: "#777" }}>{t("verifyEmail.verifyingDesc")}</p>
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
            {/* <div className="copa-verify-icon copa-verify-icon--success mx-auto">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div> */}
            <h3 className="mb-10">{t("verifyEmail.successTitle")}</h3>
            <p style={{ color: "#777", marginBottom: 24 }}>
              {t("verifyEmail.successDesc")} {email && email}{" "}
              {t("verifyEmail.successDesc2")}
            </p>
            <Link
              to={`/login?email=${encodeURIComponent(email)}`}
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
            >
              {t("verifyEmail.goToLogin")}
            </Link>
          </>
        );

      case "error":
        return (
          <>
            {/* <div className="copa-verify-icon copa-verify-icon--error mx-auto">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
              </svg>
            </div> */}
            <h3 className="mb-10">{t("verifyEmail.errorTitle")}</h3>
            <p style={{ color: "#777", marginBottom: 20 }}>
              {t("verifyEmail.errorDesc")}
            </p>

            {/* Bloc renvoi */}
            {/* <div className="featured-icon-box style1 p-20 text-left mb-20"> */}
              <div className="featured-content">
                <p style={{ fontSize: 13, color: "#777", marginBottom: 14 }}>
                  {t("verifyEmail.resendHint")}
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
                      {t("verifyEmail.resending")}
                    </>
                  ) : cooldown > 0 ? (
                    `${t("verifyEmail.resendIn")} ${cooldown}s`
                  ) : (
                    t("verifyEmail.resendEmail")
                  )}
                </button>
              </div>
            {/* </div> */}

            <div className="copa-separator">
              <span>{t("verifyEmail.or")}</span>
            </div>
            <Link
              to="/register"
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
            >
              {t("verifyEmail.backToRegister")}
            </Link>
          </>
        );

      case "invalid":
        return (
          <>
            {/* <div className="copa-verify-icon copa-verify-icon--invalid mx-auto">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
              </svg>
            </div> */}
            <h3 className="mb-10">{t("verifyEmail.invalidTitle")}</h3>
            <p style={{ color: "#777", marginBottom: 24 }}>
              {t("verifyEmail.invalidDesc")}
            </p>
            <Link
              to="/inscription"
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor me-2"
            >
              {t("verifyEmail.backToRegister")}
            </Link>
            <Link
              to={`/login?email=${encodeURIComponent(email)}`}
              className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
            >
              {t("verifyEmail.goToLogin")}
            </Link>
          </>
        );
    }
  };

  return (
    <div className="site-main">
      <Header />
      <PageHeader title="Vérification de l'email" breadcrumb="Vérification" />

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
                          {state === "success" && (
                            <i className="fa fa-check text-success"></i>
                          )}

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
                      <div className="featured-content">{renderContent()}</div>
                    </div>
                  </div>
                </div>

                <div className="copa-verify-footer mt-30">
                  <span>{t("verifyEmail.footerNote")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VerifyEmail;
