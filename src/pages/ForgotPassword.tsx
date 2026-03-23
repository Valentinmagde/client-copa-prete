import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import AuthService from "@/services/auth/auth.service";
import { toast } from "react-toastify";

const ForgotPassword: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier.trim()) {
      setError(t("required"));
      return;
    }

    if (!isEmail(identifier)) {
      setError(t("emailInvalid"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await AuthService.forgotPassword(identifier, i18n.language);

      toast.success(t("forgotPasswordPage.success"));
      setIdentifier("");
    } catch (err: any) {
      console.error(err);
      toast.error(err || t("forgotPasswordPage.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-main">
      <Header />
      <PageHeader
        title={t("forgotPasswordPage.title")}
        breadcrumb={t("forgotPasswordPage.title")}
      />

      <div className="ttm-row login-section clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bg-theme-GreyColor ttm-col-bgcolor-yes ttm-bg rounded p-50 p-lg-20">
                <div className="layer-content">
                  <div className="text-center mb-20">
                    <h3>{t("forgotPasswordPage.title")}</h3>
                    <p>{t("forgotPasswordPage.description")}</p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="login_form wrap-form"
                  >
                    <div className="row">
                      <div className="col-12">
                        <label className={error ? "copa-input-invalid" : ""}>
                          <i className="ti ti-user" />
                          <input
                            type="text"
                            value={identifier}
                            onChange={(e) => {
                              setIdentifier(e.target.value);
                              setError(null);
                            }}
                            placeholder={t("email")}
                          />
                        </label>

                        {error && (
                          <span className="copa-error-msg">{error}</span>
                        )}
                      </div>

                      <div className="col-12 mt-20">
                        <button
                          type="submit"
                          className="submit w-100 ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="copa-spinner" />
                              {t("sending")}
                            </>
                          ) : (
                            t("forgotPasswordPage.button")
                          )}
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="text-center mt-20">
                    <a href="/login" className="text-theme-SkinColor">
                      {t("forgotPasswordPage.backToLogin")}
                    </a>
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

export default ForgotPassword;
