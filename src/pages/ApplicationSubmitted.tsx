import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import { getUser } from "@/utils/storage"; // ✅ Déjà importé
import BeneficiaryService from "@/services/beneficiary/beneficiary.service";

interface CandidateData {
  name: string;
  dossierNumber: string;
  beneficiaryNumber: string;
  submittedAt: string;
}

const ApplicationSubmitted: React.FC = () => {
  const { t, i18n } = useTranslation();
  const user = getUser(); // ✅ Utilisation directe
  const location = useLocation();

  const [candidateData, setCandidateData] = useState<CandidateData>({
    name: user?.firstName + " " + user?.lastName,
    dossierNumber: "COPA-2026-00001",
    beneficiaryNumber: "",
    submittedAt: new Date().toLocaleDateString(
      i18n.language === "fr" ? "fr-FR" : "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
    ),
  });

  useEffect(() => {
    const fetchBeneficiaryNumber = async () => {
      // Si on a déjà le code via location.state, l'utiliser
      if (location.state?.beneficiaryNumber) {
        setCandidateData((prev) => ({
          ...prev,
          beneficiaryNumber: location.state.beneficiaryNumber,
          dossierNumber: location.state.dossierNumber || prev.dossierNumber,
        }));
        return;
      }

      // Sinon, le récupérer depuis l'API
      if (!user?.id) return;

      try {
        const response: any = await BeneficiaryService.getByUserId(
          user.id,
          i18n.language,
        );
        if (response?.applicationCode) {
          setCandidateData((prev) => ({
            ...prev,
            beneficiaryNumber: response.applicationCode,
            dossierNumber: response.applicationCode,
          }));
        }
      } catch (error) {
        console.error("Erreur lors du chargement du code:", error);
      }
    };

    fetchBeneficiaryNumber();
  }, [user?.id, i18n.language, location.state]);

  return (
    <div className="site-main">
      <Header />
      <PageHeader
        title={t("applicationSubmitted.title")}
        breadcrumb={t("applicationSubmitted.breadcrumb")}
      />

      <section className="ttm-row process-section bg-theme-GreyColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="featuredbox-number bg-theme-WhiteColor box-shadow p-30 mt-15">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="featured-icon-box icon-align-top-content style6">
                      <div className="featured-icon no-after">
                        <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-size-lg ttm-icon_element-color-grey ttm-icon_element-style-round">
                          <i className="fa fa-check text-success"></i>
                        </div>
                      </div>
                      <div className="featured-content">
                        <div className="featured-title">
                          <h3>
                            {t("applicationSubmitted.congratulations", {
                              name: candidateData.name,
                            })}
                          </h3>
                        </div>
                        <div className="featured-desc">
                          <p>{t("applicationSubmitted.message")}</p>

                          {/* ✅ AFFICHAGE DU CODE - juste le texte */}
                          <p>
                            <strong>
                              {t("applicationSubmitted.yourCode")}{" "}
                              {candidateData.beneficiaryNumber}
                            </strong>
                          </p>

                          <p>{t("applicationSubmitted.notification")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-center flex-wrap pt-30 pb-20"
                    style={{ gap: 12 }}
                  >
                    <button
                      type="button"
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                      onClick={() => window.print()}
                    >
                      <i className="fas fa-print mr-5"></i>{" "}
                      {t("applicationSubmitted.downloadButton")}
                    </button>
                  </div>
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

export default ApplicationSubmitted;
