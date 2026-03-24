import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import Slider from "react-slick";
import RowBgImg from "../assets/img/row-bgimage-1.png";
import DottedShapeImg  from "../assets/img/dotted_shape.png";
import about1 from "../assets/img/about/copa/02.jpg";
import about2 from "../assets/img/about/04.png";
import about3 from "../assets/img/about/05.png";

/* ─── composant ─────────────────────────────────────────────────────────── */

const AboutCopa: React.FC = () => {
  const [slidesToShow, setSlidesToShow] = useState(2);

  const { t } = useTranslation();

  const whyList = t("aboutcopa.intro.whyParticipate.list", {
    returnObjects: true,
  }) as string[];

  const copaInfo = t("aboutcopa.copaInfo", {
    returnObjects: true,
  }) as any[];

  const timelinePhases = t("aboutcopa.timeline.phases", {
    returnObjects: true,
  }) as any[];

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
  infinite: true,
  speed: 1000,
  slidesToShow: slidesToShow,
  slidesToScroll: 1,
  rows: slidesToShow === 1 ? 6: 3,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 575,  settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

  return (
    <div className="site-main">
      <Header />
      <PageHeader
        title={t("aboutcopa.pageTitle")}
        breadcrumb={t("aboutcopa.breadcrumb")}
      />

      {/* ── intro-section ── */}
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
                  <p
                    dangerouslySetInnerHTML={{
                      __html: t("aboutcopa.intro.description1"),
                    }}
                  />
                  <p className="mt-15">{t("aboutcopa.intro.description2")}</p>
                </div>
              </div>
              <div className="mt-30">
                <Link
                  to="/eligibility-criteria"
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor mr-15"
                >
                  {t("eligibilityCriteriaPage.buttons.eligibility")}
                </Link>
                {/* <Link
                  to="/eligibility-criteria#section-documents"
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
                >
                  {t("aboutcopa.intro.buttons.prepareDocuments")}
                </Link> */}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mr-30 mt-30 mt-lg-60 mb-lg-30">
                <div className="d-flex">
                  <img src={about1} className="img-fluid" alt="single_05" />
                  <div className="flex-basis-auto ml_180 mr_30 mt_30 z-index_1">
                    <img src={about2} className="img-fluid" alt="dot-pattern" />
                  </div>
                  <div className="d-flex justify-content-end flex-column ml_180 mr_30 mb_35 z-index_1">
                    <img src={about3} className="img-fluid" alt="dot-pattern" />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-6">
              <div className="pl-30 pl-lg-0 mt-lg-30">
                <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-GreyColor p-40">
                  <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                  <div className="layer-content">
                    <h4 className="mb-20">
                      {t("aboutcopa.intro.whyParticipate.title")}
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
            </div> */}
          </div>
        </div>
      </section>
      {/* intro-section end */}

      {/* ── fiche COPA — slider style HowToParticipate ── */}
      <section
        className="ttm-row services-section bg-img1 bg-theme-GreyColor ttm-bg ttm-bgimage-yes clearfix"
        style={{ backgroundImage: `url(${RowBgImg})` }}
      >
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-11">
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>
                    {t("aboutcopa.summary.title")
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
                  <h2 className="title">{t("aboutcopa.summary.subtitle")}</h2>
                </div>
                {/* <div className="title-desc">
                  <p>
                    Le COPA est un concours de plans d'affaires destiné aux
                    MPME et Coopératives du Burundi, financé dans le cadre du
                    projet PRETE.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          {/* row end */}

          {/* Slider */}
          <Slider
            className="row slick_slider slick-arrows-style2 mb_10"
            {...slick_slider}
            // slidesToShow={2}
            // rows={6}
            // arrows={true}
            // autoplay={false}
            // responsive={[
            //   { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            //   { breakpoint: 575,  settings: { slidesToShow: 2, slidesToScroll: 1 } },
            // ]}
          >
            {copaInfo.map((item, i) => (
              <div key={i} className="col-md-12">
                <div className="featured-imagebox featured-imagebox-services style1">
                  <div className="featured-content">
                    <div className="featured-title">
                      <h3>{item.label}</h3>
                    </div>
                    <div className="featured-desc">
                      {Array.isArray(item.value1) ? (
                        <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor mt-10">
                          {item.value1.map(
                            (val, j) => (
                              <li key={j}>
                                <i className="far fa-check-circle"></i>
                                <div className="ttm-list-li-content">
                                  {val}
                                </div>
                              </li>
                            ),
                          )}
                        </ul>
                      ): 
                      <p>{item.value1}</p>
                      }

                      {item?.value2 && Array.isArray(item?.value2) ? (
                        <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor mt-10">
                          {item.value2.map(
                            (val, j) => (
                              <li key={j}>
                                <i className="far fa-check-circle"></i>
                                <div className="ttm-list-li-content">
                                  {val}
                                </div>
                              </li>
                            ),
                          )}
                        </ul>
                      ): item?.value2 && <p>{item.value2}</p>
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          {/* Slider end */}
        </div>
      </section>
      {/* fiche COPA end */}

      {/* ── timeline — processus de mise en œuvre ── */}
      <section className="ttm-row job-list-section ttm-bg clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>
                    {t("aboutcopa.timeline.sectionTitle").split(" ").map((word: string, i: number) => (
                      <span
                        key={i}
                        className={i >= 1 ? "text-theme-SkinColor" : ""}
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </h3>
                  <h2 className="title">
                    {t("aboutcopa.timeline.sectionSubtitle")}
                  </h2>
                  <p>
                    {t("aboutcopa.timeline.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div id="timeline-story" className="timeline-story-wrapper">
                <div className="timeline">
                  {timelinePhases.map((phase, index) => (
                    <div key={index} className="timeline-panel">
                      <div className="timeline-shape">
                        <span className="shape-circle"></span>
                        <span className="shape-image">
                          <img
                            className="img-fluid"
                            src={DottedShapeImg}
                            alt="dotted shape"
                          />
                        </span>
                      </div>
                      <div className="timeline-body">
                        <div className="timeline-date">{phase.tag}</div>
                        <h3 className="title">
                          {phase.num}. {phase.phase}
                        </h3>
                        <p style={{WebkitLineClamp: "none"}} dangerouslySetInnerHTML={{__html: phase.description}} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* timeline end */}

      {/* ── process-section — piliers ── */}
      {/* <section className="ttm-row process-section bg-theme-GreyColor clearfix">
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
                        ))}
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
            <div className="col-lg-12">
              <div className="featuredbox-number bg-theme-WhiteColor box-shadow p-30 mt-15">
                <div className="row">
                  {(
                    t("aboutcopa.pillars.list", { returnObjects: true }) as any[]
                  ).map((p: any, i: number) => (
                    <div key={i} className="col-lg-4 col-md-4 col-sm-12">
                      <div className="featured-icon-box icon-align-top-content style6">
                        <div className="featured-icon">
                          <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-size-lg ttm-icon_element-color-grey ttm-icon_element-style-round">
                            <i className={p.icon}></i>
                            <span className="fea_num">
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
        </div>
      </section> */}
      {/* process-section end */}

      {/* ── services-section — cibles ── */}
      {/* <section
        className="ttm-row services-section bg-img1 bg-theme-WhiteColor ttm-bg ttm-bgimage-yes clearfix"
        style={{ backgroundImage: `url(${RowBgImg})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-11">
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
                      ))}
                  </h3>
                  <h2 className="title">
                    {t("aboutcopa.targets.section.subtitle")}
                  </h2>
                </div>
                <div className="title-desc">
                  <p>{t("aboutcopa.targets.section.description")}</p>
                </div>
              </div>
            </div>
          </div>
          <Slider
            className="row slick_slider slick-arrows-style2 pt-20 mb_10"
            {...slick_slider}
            slidesToShow={2}
            rows={2}
            arrows={true}
            autoplay={false}
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
              { breakpoint: 575,  settings: { slidesToShow: 1, slidesToScroll: 1 } },
            ]}
          >
            {(t("aboutcopa.targets.list", { returnObjects: true }) as any[]).map(
              (item: any, i: number) => (
                <div key={i} className="col-md-12">
                  <div className="featured-imagebox featured-imagebox-services style1">
                    <div className="featured-content">
                      <div className="featured-title">
                        <h3>
                          <Link to={"#"}>{item.label}</Link>
                        </h3>
                      </div>
                      <div className="featured-desc">
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </Slider>
        </div>
      </section> */}
      {/* services-section end */}

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
                      <h3>{t("aboutcopa.cta.title")}</h3>
                    </div>
                    <div className="featured-desc">
                      <p>{t("aboutcopa.cta.description")}</p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                >
                  {t("aboutcopa.cta.button")}
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

export default AboutCopa;
