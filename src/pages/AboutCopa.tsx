import React from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
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

const AboutCopa: React.FC = () => {
  const { t } = useTranslation();

  // Récupérer les données traduites
  const pillars = t("aboutcopa.pillars.list", { returnObjects: true }) as any[];
  const targets = t("aboutcopa.targets.list", { returnObjects: true }) as any[];
  const whyList = t("aboutcopa.intro.whyParticipate.list", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="site-main">
      <Header />
      <PageHeader
        title={t("aboutcopa.pageTitle")}
        breadcrumb={t("aboutcopa.breadcrumb")}
      />

      {/* intro-section */}
      <section className="ttm-row about-section clearfix">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-title">
                <div className="title-header">
                  <h3>
                    {t("aboutcopa.intro.title").split(" ")[0]}{" "}
                    <span className="text-theme-SkinColor">
                      {t("aboutcopa.intro.title").split(" ")[1] ||
                        t("aboutcopa.intro.title")}
                    </span>
                  </h3>
                  <h2 className="title">{t("aboutcopa.intro.subtitle")}</h2>
                </div>
                <div className="title-desc">
                  <p dangerouslySetInnerHTML={{ __html: t("aboutcopa.intro.description1")}}>
                  </p>
                  <p className="mt-15">{t("aboutcopa.intro.description2")}</p>
                </div>
              </div>
              <div className="mt-30">
                <Link
                  to="/eligibility-criteria"
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor mr-15"
                >
                  {t("aboutcopa.intro.buttons.eligibility")}
                </Link>
                <Link
                  to="/how-to-participate"
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
                >
                  {t("aboutcopa.intro.buttons.howTo")}
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="pl-30 pl-lg-0 mt-lg-30">
                <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-GreyColor p-40">
                  <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                  <div className="layer-content">
                    <h4 className="mb-20">
                      {t("aboutcopa.intro.whyParticipate.title")}{" "}
                      {/* <span className="text-theme-SkinColor">?</span> */}
                    </h4>
                    <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                      {whyList.map((item: string, i: number) => (
                        <li key={i} className="pb-8">
                          <i className="far fa-check-circle"></i>
                          <div className="ttm-list-li-content">{item}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* intro-section end */}

      {/* process-section */}
      <section className="ttm-row process-section bg-theme-GreyColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>
                    <span>
                      {t("aboutcopa.pillars.section.title")
                        .split(" ")
                        .map((word: string, i: number) => (
                          <span
                            key={i}
                            className={i >= 1 ? "text-theme-SkinColor" : ""}
                          >
                            {word}{" "}
                          </span>
                        )) || ""}
                    </span>
                  </h3>
                  <h2 className="title">
                    {t("aboutcopa.pillars.section.subtitle")}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          {/* row */}
          <div className="row">
            <div className="col-lg-12">
              <div className="featuredbox-number bg-theme-WhiteColor box-shadow p-30 mt-15">
                <div className="row">
                  {pillars.map((p: any, i: number) => (
                    <div key={i} className="col-lg-4 col-md-4 col-sm-12">
                      <div className="featured-icon-box icon-align-top-content style6">
                        <div className="featured-icon">
                          <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-size-lg ttm-icon_element-color-grey ttm-icon_element-style-round">
                            <i className={p.icon}></i>
                            <span className="fea_num">
                              {/* {p.num} */}
                              <i className="ttm-num ti-info"></i>
                            </span>
                          </div>
                        </div>
                        <div className="featured-content">
                          <div className="featured-title">
                            <h3>{p.title}</h3>
                          </div>
                          <div className="featured-desc">
                            <p>{p.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* row end */}
        </div>
      </section>
      {/* process-section end */}

      {/* pillars-section */}
      {/* <section className="ttm-row team-section bg-theme-GreyColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>
                    {t("aboutcopa.pillars.section.title").split(" ")[0]}{" "}
                    <span className="text-theme-SkinColor">
                      {t("aboutcopa.pillars.section.title").split(" ")[1] || ""}
                    </span>
                  </h3>
                  <h2 className="title">
                    {t("aboutcopa.pillars.section.subtitle")}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {pillars.map((p: any, i: number) => (
              <div key={i} className="col-lg-4 col-md-6 mb-30">
                <div
                  className="featured-icon-box icon-align-top-content style3 text-center p-30"
                  style={{
                    background: "#fff",
                    borderRadius: "4px",
                    height: "100%",
                    boxShadow: "0 2px 12px rgba(0,0,0,.06)",
                  }}
                >
                  <div className="featured-icon mb-20">
                    <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-size-lg ttm-icon_element-style-rounded ttm-icon_element-color-skincolor">
                      <span
                        style={{
                          fontSize: "22px",
                          fontWeight: 900,
                          color: "var(--theme-SkinColor)",
                        }}
                      >
                        {p.num}
                      </span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <div className="featured-title">
                      <h3>{p.title}</h3>
                    </div>
                    <div className="featured-desc">
                      <p>{p.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      {/* pillars-section end */}

      {/* services-section */}
      <section
        className="ttm-row services-section bg-img1 bg-theme-WhiteColor ttm-bg ttm-bgimage-yes clearfix"
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
                    {t("aboutcopa.targets.section.title")
                      .split(" ")
                      .map((word: string, i: number) => (
                        <span
                          key={i}
                          className={i >= 1 ? "text-theme-SkinColor" : ""}
                        >
                          {word}{" "}
                        </span>
                      )) || ""}
                  </h3>
                  <h2 className="title">
                    {t("aboutcopa.targets.section.subtitle")}
                  </h2>
                </div>
                <div className="title-desc">
                  <p>{t("aboutcopa.targets.section.description")}</p>
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
            {targets.map((t: any, i: number) => (
              <div key={i} className="col-md-12">
                <div className="featured-imagebox featured-imagebox-services style1">
                  {/* featured-thumbnail */}
                  {/* <div className="featured-thumbnail">
                    <img
                      className="img-fluid"
                      src="https://via.placeholder.com/600x600?text=600x600+services-02.jpg"
                      alt="image"
                    />
                  </div> */}
                  <div className="featured-content">
                    <div className="featured-title">
                      <h3>
                        <Link to={"#"}>{t.label}</Link>
                      </h3>
                    </div>
                    <div className="featured-desc">
                      <p>{t.desc}</p>
                    </div>
                    {/* <a
                      className="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-darkgrey"
                      href={"/services_details"}
                    >
                      read more!
                    </a> */}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          {/* Slider end */}
        </div>
      </section>
      {/* services-section end */}

      {/* action-section - à décommenter si nécessaire */}
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
                    <div className="featured-title"><h3>{t('aboutcopa.cta.title')}</h3></div>
                    <div className="featured-desc"><p>{t('aboutcopa.cta.description')}</p></div>
                  </div>
                </div>
                <Link to="/register" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white">
                  {t('aboutcopa.cta.button')}
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

export default AboutCopa;
