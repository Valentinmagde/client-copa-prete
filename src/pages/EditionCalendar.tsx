import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import DottedShapeImg from "../assets/img/dotted_shape.png";

interface CalendarPhase {
  num: string;
  phase: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "done" | "active" | "upcoming";
  icon: string;
  tips?: string;
  cta?: { label: string; to: string };
}

const STATUS_META = {
  done: { label: "done", color: "#2E7D52", bg: "#E8F5EE" },
  active: {
    label: "active",
    color: "var(--theme-SkinColor,#f07a1a)",
    bg: "#FDF3E7",
  },
  upcoming: { label: "upcoming", color: "#1A3A5C", bg: "#EBF3FF" },
};

const EditionCalendar: React.FC = () => {
  const { t } = useTranslation();

  const phases = t("editionCalendarPage.phases", {
    returnObjects: true,
  }) as CalendarPhase[];

  const getStatusLabel = (status: string) => {
    return t(`editionCalendarPage.status.${status}`);
  };

  return (
    <div className="site-main">
      <Header />
      <PageHeader
        title={t("editionCalendarPage.pageTitle")}
        breadcrumb={t("editionCalendarPage.breadcrumb")}
      />

      <section className="ttm-row job-list-section ttm-bg clearfix">
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-12">
              {/* section title */}
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>{t("editionCalendarPage.sectionTitle.highlight").split(" ").map((word, i) => (
                    <span key={i} className={i >= 1 ? "text-theme-SkinColor" : ""}>{word} </span>
                  ))}
                  </h3>
                  <h2 className="title">
                    {t("editionCalendarPage.sectionTitle.title")}
                  </h2>
                </div>
              </div>
              {/* section title end */}
            </div>
          </div>
          {/* row end */}
          {/* row */}
          <div className="row">
            <div className="col-lg-12">
              <div id="timeline-story" className="timeline-story-wrapper">
                {/* timeline */}
                <div className="timeline">
                  {phases.map((phase, index) => (
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
                        <div className="timeline-date">
                          {phase.startDate === phase.endDate
                            ? t("editionCalendarPage.timeline.singleDate", {
                                date: phase.startDate,
                              })
                            : t("editionCalendarPage.timeline.dateRange", {
                                startDate: phase.startDate,
                                endDate: phase.endDate,
                              })}
                        </div>
                        <h3 className="title">
                          {t(`editionCalendarPage.phases.${index}.phase`)}
                        </h3>
                        <p>
                          {t(`editionCalendarPage.phases.${index}.description`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* timeline end */}
              </div>
            </div>
          </div>
          {/* row end */}
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
                      <h3>{t("editionCalendarPage.cta.title")}</h3>
                    </div>
                    <div className="featured-desc">
                      <p>{t("editionCalendarPage.cta.description")}</p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                >
                  {t("editionCalendarPage.cta.button")}
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

export default EditionCalendar;
