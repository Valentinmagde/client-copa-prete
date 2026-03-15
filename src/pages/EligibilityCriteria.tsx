import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import RowBgImg from "../assets/img/row-bgimage-1.png";

const EligibilityCriteria: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"eligible" | "excluded">(
    "eligible",
  );

  const eligibleSectors = t("eligibilityCriteriaPage.sectors.eligibleList", {
    returnObjects: true,
  }) as Array<{ label: string; desc: string }>;

  const excludedSectors = t("eligibilityCriteriaPage.sectors.excludedList", {
    returnObjects: true,
  }) as Array<{ label: string; desc: string }>;

  return (
    <div className="site-main">
      <Header />
      <PageHeader
        title={t("eligibilityCriteriaPage.pageTitle")}
        breadcrumb={t("eligibilityCriteriaPage.breadcrumb")}
      />

      {/* criteria-section */}
      <section
        className="ttm-row services-section bg-img1 bg-theme-GreyColor ttm-bg ttm-bgimage-yes clearfix"
        style={{ backgroundImage: `url(${RowBgImg})` }}
      >
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-11">
              {/* section title */}
              <div className="section-title style2 mb-0">
                <div className="title-header">
                  <h3>
                    {t("eligibilityCriteriaPage.intro.highlight")
                      .split(" ")
                      .map((word: string, i: number) => (
                        <span
                          key={i}
                          className={i >= 1 ? "text-theme-SkinColor" : ""}
                        >
                          {word}{" "}
                        </span>
                      ))}
                  </h3>
                  <h2 className="title">
                    {t("eligibilityCriteriaPage.intro.title")}
                  </h2>
                </div>
                <div className="title-desc">
                  <p>{t("eligibilityCriteriaPage.intro.description")}</p>
                </div>
              </div>
              {/* section title end */}
            </div>
          </div>
          {/* row end */}
          <div className="row slick_slider slick-arrows-style2 pt-20 mb_10">
            {/* Entreprise */}
            <div className="col-lg-6 mb-30">
              <div className="featured-imagebox featured-imagebox-services style1 h-100">
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <Link to={"#"}>
                        {t("eligibilityCriteriaPage.sections.enterprise.title")}
                      </Link>
                    </h3>
                  </div>
                  <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                    {(
                      t("eligibilityCriteriaPage.sections.enterprise.items", {
                        returnObjects: true,
                      }) as string[]
                    ).map((c, i) => (
                      <li key={i} className="pb-10">
                        <i className="far fa-check-circle"></i>
                        <div className="ttm-list-li-content">{c}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Promoteur */}
            <div className="col-lg-6 mb-30">
              <div className="featured-imagebox featured-imagebox-services style1 h-100">
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <Link to={"#"}>
                        {t("eligibilityCriteriaPage.sections.promoter.title")}
                      </Link>
                    </h3>
                  </div>
                  <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                    {(
                      t("eligibilityCriteriaPage.sections.promoter.items", {
                        returnObjects: true,
                      }) as string[]
                    ).map((c, i) => (
                      <li key={i} className="pb-10">
                        <i className="far fa-check-circle"></i>
                        <div className="ttm-list-li-content">{c}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* sectors */}
      <section className="ttm-row clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>
                    {t("eligibilityCriteriaPage.sectors.title")
                      .split(" ")
                      .map((word: string, i: number) => (
                        <span
                          key={i}
                          className={i >= 1 ? "text-theme-SkinColor" : ""}
                        >
                          {word}{" "}
                        </span>
                      ))}
                  </h3>
                  <h2 className="title">
                    {t("eligibilityCriteriaPage.sectors.subtitle")}
                  </h2>
                </div>
              </div>
              {/* Tab buttons */}
              <div
                className="d-flex justify-content-center mb-30"
                style={{ gap: "10px" }}
              >
                <button
                  className={`ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ${activeTab === "eligible" ? "ttm-btn-style-fill ttm-btn-color-skincolor" : "ttm-btn-style-border ttm-btn-color-skincolor"}`}
                  onClick={() => setActiveTab("eligible")}
                >
                  ✓ {t("eligibilityCriteriaPage.sectors.tabs.eligible")} (
                  {eligibleSectors.length})
                </button>
                <button
                  className={`ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ${activeTab === "excluded" ? "ttm-btn-style-fill ttm-btn-color-skincolor" : "ttm-btn-style-border ttm-btn-color-skincolor"}`}
                  onClick={() => setActiveTab("excluded")}
                >
                  ✗ {t("eligibilityCriteriaPage.sectors.tabs.excluded")} (
                  {excludedSectors.length})
                </button>
              </div>
            </div>
          </div>

          {activeTab === "eligible" && (
            <div className="row row-equal-height mb_10">
              {eligibleSectors.map((s, i) => (
                <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                  {/* featured-icon-box */}
                  <div
                    className="featured-icon-box icon-align-before-title style3"
                    style={{ background: "#f7f7f7" }}
                  >
                    <div className="featured-title">
                      <h3>{s.label}</h3>
                    </div>
                    <div className="featured-content">
                      <div className="featured-desc">
                        <p>{s.desc}</p>
                      </div>
                    </div>
                  </div>
                  {/* featured-icon-box end */}
                </div>
              ))}
            </div>
          )}

          {activeTab === "excluded" && (
            <div className="row justify-content-center">
              {excludedSectors.map((s, i) => (
                <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                  {/* featured-icon-box */}
                  <div
                    className="featured-icon-box icon-align-before-title style3"
                    style={{ background: "#f7f7f7" }}
                  >
                    <div className="featured-title">
                      <h3>{s.label}</h3>
                    </div>
                    <div className="featured-content">
                      <div className="featured-desc">
                        <p>{s.desc}</p>
                      </div>
                    </div>
                  </div>
                  {/* featured-icon-box end */}
                </div>
              ))}
            </div>
          )}

          <div className="col-lg-12">
            <div className="pt-30 m-auto text-center">
              <a
                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                href={"/register"}
              >
                {t("apply")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* action-section */}
      <section className="ttm-row action-section bg-theme-SkinColor text-theme-WhiteColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-md-flex align-items-center justify-content-between">
                <div className="featured-icon-box icon-align-before-content style2">
                  <div className="featured-icon">
                    <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-white ttm-icon_element-size-xl">
                      <i className="flaticon flaticon-recruitment-5"></i>
                    </div>
                  </div>
                  <div className="featured-content">
                    <div className="featured-title">
                      <h3>{t("eligibilityCriteriaPage.cta.title")}</h3>
                    </div>
                    <div className="featured-desc">
                      <p>{t("eligibilityCriteriaPage.cta.description")}</p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/contact-us"
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                >
                  {t("eligibilityCriteriaPage.cta.button")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EligibilityCriteria;
