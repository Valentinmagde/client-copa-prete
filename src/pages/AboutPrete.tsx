import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import about1 from "../assets/img/about/06.png";
import about2 from "../assets/img/about/04.png";
import about3 from "../assets/img/about/05.png";

const AboutPrete: React.FC = () => {
  const { t } = useTranslation();

  const objectives = t("aboutprete.objectives.list", {
    returnObjects: true,
  }) as string[];
  const components = t("aboutprete.components.list", {
    returnObjects: true,
  }) as any[];

  return (
    <div className="site-main">
      <Header />
      <PageHeader
        title={t("aboutprete.pageTitle")}
        breadcrumb={t("aboutprete.breadcrumb")}
      />

      {/* about-section */}
      <section className="ttm-row about-section clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-title">
                <div className="title-header">
                  <h3>
                    {t("aboutprete.tabs.objectives").split(" ")[0]}{" "}
                    <span className="text-theme-SkinColor">
                      {t("aboutprete.tabs.objectives").split(" ")[1]}
                    </span>
                  </h3>
                  <h2 className="title">{t("aboutprete.project.title")}</h2>
                </div>
                <div className="title-desc">
                  <p>{t("aboutprete.project.description")}</p>
                </div>
              </div>

              <div className="ttm-tabs ttm-tab-style-01">
                <Tabs>
                  <TabList className="tabs">
                    <Tab className="tab">
                      <a className="tab-1" tabIndex={0}>
                        {t("aboutprete.tabs.objectives")}
                      </a>
                    </Tab>
                    <Tab className="tab">
                      <a className="tab-2" tabIndex={0}>
                        {t("aboutprete.tabs.components")}
                      </a>
                    </Tab>
                  </TabList>

                  <div className="content-tab">
                    <TabPanel>
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="pt-15">
                            <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                              {objectives.map((objective, index) => (
                                <li key={index}>
                                  <i className="far fa-check-circle"></i>
                                  <div className="ttm-list-li-content">
                                    {objective}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="pt-15">
                            <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                              {components.map((comp, index) => (
                                <li key={index}>
                                  <i className="far fa-check-circle"></i>
                                  <div className="ttm-list-li-content">
                                    {comp.title}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </div>
                </Tabs>
              </div>

              <div className="d-flex align-items-center mt-30">
                <Link
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-dark"
                  to="https://prete.bi/mission/"
                  target="_blank"
                >
                  {t("aboutprete.buttons.learnMoreAboutPrete")}
                </Link>
                {/* <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-sm ttm-icon_element-style-round mb-0">
                  <i className="fa fa-university"></i>
                </div>
                <div className="pl-15">
                  <h6 className="mb-5">{t("aboutprete.project.fundedBy")}</h6>
                  <p className="featured-desc mb-0 fw-bold">
                    {t("aboutprete.project.fundedByValue")}
                  </p>
                </div> */}
              </div>

              {/* <div className="ttm-horizontal_sep width-100 mt-20 mb-20"></div> */}

              {/* <div className="d-flex align-items-center">
                <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-sm ttm-icon_element-style-round mb-0">
                  <i className="fa fa-calendar"></i>
                </div>
                <div className="pl-15">
                  <h6 className="mb-5">{t("aboutprete.project.duration")}</h6>
                  <p className="featured-desc mb-0">
                    {t("aboutprete.project.durationValue")}
                  </p>
                </div>
              </div> */}
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                      <h3>{t("aboutprete.cta.title")}</h3>
                    </div>
                    <div className="featured-desc">
                      <p>{t("aboutprete.cta.description")}</p>
                    </div>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                >
                  {t("aboutprete.cta.button")}
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

export default AboutPrete;
