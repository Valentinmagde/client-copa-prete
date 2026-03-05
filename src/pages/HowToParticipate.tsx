import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import Slider from "react-slick";
import RowBgImg from "../assets/img/row-bgimage-1.png";

const slick_slider = {
  dots: false,
  arrow: false,
  autoplay: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 1,
  rows: 1,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 778,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const HowToParticipate: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="site-main">
      <Header />
      <PageHeader
        title={t("howToParticipatePage.pageTitle")}
        breadcrumb={t("howToParticipatePage.breadcrumb")}
      />

      {/* services-section */}
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
                  <h3>{t("howToParticipatePage.sectionTitle.highlight")}</h3>
                  <h2 className="title">
                    {t("howToParticipatePage.sectionTitle.title")}
                  </h2>
                </div>
                <div className="title-desc">
                  <p>{t("howToParticipatePage.sectionTitle.description")}</p>
                </div>
              </div>
              {/* section title end */}
            </div>
          </div>
          {/* row end */}
          {/* Slider */}
          <Slider
            className="row slick_slider slick-arrows-style2 pt-20 mb_10"
            {...slick_slider}
            slidesToShow={2}
            rows={2}
            arrows={true}
            autoplay={false}
            responsive={[
              {
                breakpoint: 1024,
                settings: { slidesToShow: 2, slidesToScroll: 2 },
              },
              {
                breakpoint: 575,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
              },
            ]}
          >
            {[...Array(7)].map((_, i) => {
              const stepIndex = i;
              return (
                <div key={i} className="col-md-12">
                  <div className="featured-imagebox featured-imagebox-services style1">
                    <div className="featured-content">
                      <div className="featured-title">
                        <h3>
                          <Link to={"#"}>
                            {t("howToParticipatePage.step.prefix")}{" "}
                            {t(`howToParticipatePage.steps.${stepIndex}.num`)} :{" "}
                            {t(`howToParticipatePage.steps.${stepIndex}.title`)}
                          </Link>
                        </h3>
                      </div>
                      <div className="featured-desc">
                        {stepIndex === 0 ||
                        stepIndex === 1 ||
                        stepIndex === 6 ? (
                          <>
                            <p>
                              {t(
                                `howToParticipatePage.steps.${stepIndex}.desc.intro`,
                              )}
                            </p>
                            <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor mt-10">
                              {[...Array(stepIndex === 6 ? 4 : 3)].map(
                                (_, j) => (
                                  <li key={j}>
                                    <i className="far fa-check-circle"></i>
                                    <div className="ttm-list-li-content">
                                      {t(
                                        `howToParticipatePage.steps.${stepIndex}.desc.criteria.${j}`,
                                      )}
                                    </div>
                                  </li>
                                ),
                              )}
                            </ul>
                          </>
                        ) : (
                          <p>{t(`howToParticipatePage.steps.${stepIndex}.desc`)}</p>
                        )}
                        {t(`howToParticipatePage.steps.${stepIndex}.note`, "") && (
                          <p className="mt-10 text-theme-SkinColor">
                            <i className="fa fa-info-circle mr-5"></i>
                            {t(`howToParticipatePage.steps.${stepIndex}.note`)}
                          </p>
                        )}
                      </div>
                      {t(`howToParticipatePage.steps.${stepIndex}.cta`, "") && (
                        <Link
                          className="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-darkgrey"
                          to={
                            stepIndex === 0
                              ? "/copa/criteres-eligibilite"
                              : stepIndex === 1
                                ? "/inscription"
                                : stepIndex === 3
                                  ? "/formations/catalogue"
                                  : stepIndex === 4
                                    ? "/copa/calendrier"
                                    : "#"
                          }
                        >
                          {t(`howToParticipatePage.steps.${stepIndex}.cta`)}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
          {/* Slider end */}
        </div>
      </section>
      {/* services-section end */}

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
                      <h3>{t("howToParticipatePage.cta.title")}</h3>
                    </div>
                    <div className="featured-desc">
                      <p>{t("howToParticipatePage.cta.description")}</p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                >
                  {t("howToParticipatePage.cta.button")}
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

export default HowToParticipate;
