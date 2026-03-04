import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import { getUser } from "@/utils/storage";

interface CandidateData {
  name: string;
  dossierNumber: string;
  submittedAt: string;
}

const ApplicationSubmitted: React.FC = () => {
  const { t, i18n } = useTranslation();
  const user = getUser();
  const [candidateData] = useState<CandidateData>({
    name: user?.firstName + " " + user?.lastName,
    dossierNumber: "COPA-2026-08472",
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

  return (
    <div className="site-main">
      <Header />
      <PageHeader
        title={t("applicationSubmitted.title")}
        breadcrumb={t("applicationSubmitted.breadcrumb")}
      />

      {/* process-section */}
      <section className="ttm-row process-section bg-theme-GreyColor clearfix">
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-12">
              <div className="featuredbox-number bg-theme-WhiteColor box-shadow p-30 mt-15">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    {/* featured-icon-box */}
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
                          <p>{t("applicationSubmitted.message")} {" "} </p>
                          <p>{t("applicationSubmitted.notification")}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* featured-icon-box end */}
                  </div>
                  <div
                    className="d-flex justify-content-center flex-wrap pt-30 pb-20"
                    style={{ gap: 12 }}
                  >
                    {/* <Link
                      to="/espace-mpme/tableau-de-bord"
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                    >
                      <i className="fas fa-th-large mr-5"></i>{" "}
                      {t("applicationSubmitted.dashboardLink")}
                    </Link> */}
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
          {/* row end */}
        </div>
      </section>
      {/* process-section end */}

      <Footer />
    </div>
  );
};

export default ApplicationSubmitted;
