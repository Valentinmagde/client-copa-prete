import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import Slider from "react-slick";
import RowBgImg from "../assets/img/row-bgimage-1.png";

const EligibilityCriteria: React.FC = () => {
  const [slidesToShow, setSlidesToShow] = useState(2);
  const { t } = useTranslation();

  const recevabiliteItems = t(
    "eligibilityCriteriaPage.criteria.recevabilityItems",
    { returnObjects: true },
  ) as string[];

  const eligibiliteItems = t(
    "eligibilityCriteriaPage.criteria.eligibilityItems",
    { returnObjects: true },
  ) as { label: string; desc: string }[];

  const documentsOptions = t("eligibilityCriteriaPage.documents.options", {
    returnObjects: true,
  }) as { title: string; items: any[] }[];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 575) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slick_slider = {
  dots: false,
  arrow: false,
  autoplay: false,
  infinite: false,
  speed: 1000,
  slidesToShow: slidesToShow,
  slidesToScroll: 1,
  rows: slidesToShow === 1 ? 2: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 575, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

  return (
    <div className="site-main">
      <Header />
      <PageHeader
        title={t("eligibilityCriteriaPage.pageTitle")}
        breadcrumb={t("eligibilityCriteriaPage.breadcrumb")}
      />

      {/* ── criteria-section ── */}
      <section
        className="ttm-row services-section bg-img1 bg-theme-WhiteColor ttm-bg ttm-bgimage-yes clearfix"
        style={{ backgroundImage: `url(${RowBgImg})` }}
      >
        <div className="container">
          {/* section title */}
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
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
            </div>
          </div>
          {/* section title end */}

          <div className="row slick_slider slick-arrows-style5 mb_10">
            <div className="ttm-row sidebar job-sidebar clearfix pt-20 pb-0">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 offset-lg-1 content-area">
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
                            <ul className="ttm-list ttm-list-style-icon">
                              {recevabiliteItems.map((item, i) => (
                                <li key={i} className="pb-10">
                                  <i className="ti ti-check-box"></i>
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
                            <ul className="ttm-list ttm-list-style-icon ttm-textcolor-darkgrey text-justify">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* criteria-section end */}

      {/* ── documents-section ── */}
      <section
        className="ttm-row services-section bg-img1 bg-theme-GreyColor ttm-bg ttm-bgimage-yes clearfix"
        style={{ backgroundImage: `url(${RowBgImg})` }}
        id="section-documents"
      >
        <div className="container">
          {/* section title */}
          <div className="row">
            <div className="col-lg-11">
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>
                    {t("eligibilityCriteriaPage.documents.title")
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
                    {t("eligibilityCriteriaPage.documents.subtitle")}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          {/* section title end */}

          {/* Slider */}
          <Slider
            className="row slick_slider slick-arrows-style2 mb_10"
            {...slick_slider}
          >
            {documentsOptions.map((option, i) => (
              <div key={i} className="col-md-12">
                <div className="featured-imagebox featured-imagebox-services style1" style={{minHeight: 590}}>
                  <div className="featured-content" style={{justifyContent: "flex-start"}}>
                    <div className="featured-title">
                      <h3 style={{WebkitLineClamp: "none"}}>{option.title}</h3>
                    </div>
                    <div className="featured-desc">
                      <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor mt-10">
                        {option.items.map((item, j) => (
                          <li key={j} className="pb-5">
                            <i className="far fa-check-circle"></i>
                            <div className="ttm-list-li-content">{item}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          {/* Slider end */}

          {/* CTA */}
          <div className="row">
            <div className="col-lg-12">
              {/* <div className="pt-20 pb-10 text-center">
                <a
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                  href="/register"
                >
                  {t("apply")}
                </a>
              </div> */}
              <div
                data-animation="animate__fadeInUp"
                data-delay="1.4"
                className="mt-80 text-center d-md-flex justify-content-center"
                style={{gap: 10, display: 'grid'}}
              >
                <Link
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                  to="/register"
                  style={{minWidth: 250}}
                >
                  {t("apply")}
                </Link>
                <Link
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
                  to="#"
                >
                  {t("eligibilityCriteriaPage.buttons.callForInterest")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* documents-section end */}

      {/* ── action-section ── */}
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
      {/* action-section end */}

      <Footer />
    </div>
  );
};

export default EligibilityCriteria;
