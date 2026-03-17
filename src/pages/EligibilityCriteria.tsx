import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import RowBgImg from "../assets/img/row-bgimage-1.png";
import about1 from "../assets/img/about/06.png";
import about2 from "../assets/img/about/04.png";
import about3 from "../assets/img/about/05.png";

const EligibilityCriteria: React.FC = () => {
  const { t } = useTranslation();

  // Get translated arrays
  const recevabiliteItems = t(
    "eligibilityCriteriaPage.criteria.recevabilityItems",
    { returnObjects: true },
  ) as string[];
  const eligibiliteItems = t(
    "eligibilityCriteriaPage.criteria.eligibilityItems",
    { returnObjects: true },
  ) as { label: string; desc: string }[];

  return (
    <div className="site-main">
      <Header />
      <PageHeader
        title={t("eligibilityCriteriaPage.pageTitle")}
        breadcrumb={t("eligibilityCriteriaPage.breadcrumb")}
      />

      {/* criteria-section */}
      <section
        className="ttm-row services-section bg-img1 bg-theme-WhiteColor ttm-bg ttm-bgimage-yes clearfix"
        style={{ backgroundImage: `url(${RowBgImg})` }}
      >
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-10 offset-1">
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
          <div className="row slick_slider slick-arrows-style5 mb_10">
            <div className="ttm-row sidebar job-sidebar clearfix pt-20 pb-0">
              <div className="container">
                {/* row */}
                <div className="row">
                  <div className="col-lg-10 offset-1 content-area">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        {/* ── Recevabilité ── */}
                        <div className="overview-box">
                          <div className="title">
                            <h5>
                              {t(
                                "eligibilityCriteriaPage.criteria.recevability",
                              )}
                            </h5>
                          </div>
                          <div className="desc">
                            <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                              {recevabiliteItems.map((item, i) => (
                                <li key={i} className="pb-10">
                                  <i className="far fa-check-circle"></i>
                                  <div className="ttm-list-li-content">
                                    {item}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* ── Éligibilité ── */}
                        <div className="overview-box">
                          <div className="title">
                            <h5>
                              {t(
                                "eligibilityCriteriaPage.criteria.eligibility",
                              )}
                            </h5>
                          </div>
                          <div className="desc">
                            <ul className="ttm-list ttm-list-style-icon ttm-textcolor-darkgrey">
                              {eligibiliteItems.map((item, i) => (
                                <li key={i} className="pb-10">
                                  <i className="ti ti-check-box"></i>
                                  <div className="ttm-list-li-content">
                                    <strong>{item.label} :</strong> {item.desc}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

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
                    </div>
                  </div>
                </div>
                {/* row end */}
              </div>
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
