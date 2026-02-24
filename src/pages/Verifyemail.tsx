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
  const [params]   = useSearchParams();
  const token      = params.get("token");
  const email      = params.get("email");

  const [state, setState]         = useState<State>(token && email ? "loading" : "invalid");
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown]   = useState(0);

  // Vérification auto au montage
  useEffect(() => {
    if (state !== "loading") return;
    AuthService.verifyEmail({token: token!, email: email!})
      .then(() => setState("success"))
      .catch(() => setState("error"));
  }, []);

  // Compte à rebours après renvoi
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown(c => c - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const handleResend = async () => {
    if (!email || cooldown > 0) return;
    setResending(true);
    try {
      await AuthService.resendVerificationEmail(email);
      setCooldown(60);
    } catch (err) { console.error(err); }
    finally { setResending(false); }
  };

  // ─── Contenu selon l'état ─────────────────────────────────────────────────

  const renderContent = () => {
    switch (state) {

      case "loading":
        return <>
          <div className="copa-verify-icon copa-verify-icon--loading mx-auto">
            <div className="copa-ring-spinner" />
          </div>
          <h3 className="mb-10">{t("verifyEmail.verifying")}</h3>
          <p style={{ color: "#777" }}>{t("verifyEmail.verifyingDesc")}</p>
          <div className="copa-loading-dots">
            <span /><span /><span />
          </div>
        </>;

      case "success":
        return <>
          <div className="copa-verify-icon copa-verify-icon--success mx-auto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="mb-10">{t("verifyEmail.successTitle")}</h3>
          <p style={{ color: "#777", marginBottom: 24 }}>
            {t("verifyEmail.successDesc")}{" "}
            {email && <strong className="text-theme-DarkColor">{email}</strong>}{" "}
            {t("verifyEmail.successDesc2")}
          </p>
          <Link
            to="/login"
            className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
          >
            {t("verifyEmail.goToLogin")}
          </Link>
        </>;

      case "error":
        return <>
          <div className="copa-verify-icon copa-verify-icon--error mx-auto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="mb-10">{t("verifyEmail.errorTitle")}</h3>
          <p style={{ color: "#777", marginBottom: 20 }}>{t("verifyEmail.errorDesc")}</p>

          {/* Bloc renvoi */}
          <div className="featured-icon-box style1 p-20 text-left mb-20">
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
                {resending
                  ? <><span className="copa-spinner" />{t("verifyEmail.resending")}</>
                  : cooldown > 0
                  ? `${t("verifyEmail.resendIn")} ${cooldown}s`
                  : t("verifyEmail.resendEmail")
                }
              </button>
            </div>
          </div>

          <div className="copa-separator"><span>{t("verifyEmail.or")}</span></div>
          <Link to="/inscription" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor">
            Nouvelle inscription
          </Link>
        </>;

      case "invalid":
        return <>
          <div className="copa-verify-icon copa-verify-icon--invalid mx-auto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="mb-10">{t("verifyEmail.invalidTitle")}</h3>
          <p style={{ color: "#777", marginBottom: 24 }}>{t("verifyEmail.invalidDesc")}</p>
          <Link to="/inscription" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor me-2">
            {t("verifyEmail.backToRegister")}
          </Link>
          <Link to="/login" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor">
            {t("verifyEmail.goToLogin")}
          </Link>
        </>;
    }
  };

  return (
    <div className="site-main">
      <Header />
      <PageHeader title="Vérification de l'email" breadcrumb="Vérification" />

      <div className="ttm-row clearfix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6 col-md-8">

              <div className="bg-theme-GreyColor p-50 p-lg-20 box-shadow text-center">
                <div className="layer-content">

                  {renderContent()}

                  {/* Pied — note spam */}
                  <div className="copa-verify-footer mt-20">
                    {/* <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg> */}
                    <span>{t("verifyEmail.footerNote")}</span>
                  </div>

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

export default VerifyEmail;
