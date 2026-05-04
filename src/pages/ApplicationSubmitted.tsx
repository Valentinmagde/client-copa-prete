import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import { getUser } from "@/utils/storage"; // ✅ Déjà importé
import BeneficiaryService from "@/services/beneficiary/beneficiary.service";

interface CandidateData {
  name: string;
  dossierNumber: string;
  beneficiaryNumber: string;
  user: any;
  submittedAt: string;
}

const ApplicationSubmitted: React.FC = () => {
  const { t, i18n } = useTranslation();
  const user = getUser();
  const location = useLocation();
  const navigate = useNavigate();

  const [candidateData, setCandidateData] = useState<CandidateData>({
    name: user?.firstName + " " + user?.lastName,
    dossierNumber: "COPA-2026-00001",
    beneficiaryNumber: "",
    user: null,
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
    if (!user?.id) return;

    const fetchBeneficiary = async () => {
      try {
        const response: any = await BeneficiaryService.getByUserId(
          user.id,
          i18n.language,
        );
        if (response?.documentCorrectionAllowed) {
          navigate("/correction-documents", { replace: true });
          return;
        }
        const beneficiaryNumber =
          location.state?.beneficiaryNumber ?? response?.applicationCode;
        const dossierNumber =
          location.state?.dossierNumber ?? response?.applicationCode;
        if (beneficiaryNumber) {
          setCandidateData((prev) => ({
            ...prev,
            beneficiaryNumber,
            dossierNumber: dossierNumber || prev.dossierNumber,
            user: response.user,
          }));
        }
      } catch (error) {
        console.error("Erreur lors du chargement du bénéficiaire:", error);
      }
    };

    fetchBeneficiary();
  }, [user?.id, i18n.language, location.state, navigate]);

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
                            {candidateData?.user?.gender?.code === "M" ? t("civility.mister"): t("civility.madam")}{" "}
                            {candidateData.name}
                          </h3>
                        </div>
                        <div className="featured-desc">
                          <div className="col-lg-8 offset-lg-2">
                            <p style={{textAlign: "justify"}}>{t("applicationSubmitted.confirmation")}</p>
                            <p style={{textAlign: "justify"}}>{t("applicationSubmitted.review")}</p>
                          
                            {/* ✅ AFFICHAGE DU CODE - juste le texte */}
                            <p>
                              <strong>
                                {t("applicationSubmitted.yourCode")}{" "}
                                {candidateData.beneficiaryNumber}
                              </strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-center flex-wrap pt-15"
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
            <div className="copa-verify-footer mt-30">
                  <span>{t("applicationSubmitted.contact")}</span>
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
