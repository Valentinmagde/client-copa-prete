import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Define props interface (empty but can be extended)
interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const { t } = useTranslation();

  // Form submission handler (prevent default for demo)
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log("Newsletter subscription submitted");
  };

  return (
    <footer className="footer widget-footer bg-theme-DarkColor text-theme-WhiteColor clearfix">
      <div className="second-footer">
        <div className="container">
          <div className="row">
            {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 widget-area">
              <div className="widget widget_text clearfix">
                <div className="footer-logo">
                  <img
                    id="footer-logo-img"
                    className="img-fluid auto_size"
                    height="40"
                    width="162"
                    src="images/footer-logo.svg"
                    alt="footer-logo"
                  />
                </div>
                <p>
                  HireCo is multi award-winning executive search, management
                  recruiter and employer branding organization. Our customized
                  recruiting process delivers fast & accurate results
                </p>
                <div className="d-flex align-items-center pt-15 pb-25">
                  <h6 className="fw-normal">Social Share: </h6>
                  <div className="social-icons">
                    <ul className="social-icons list-inline">
                      <li>
                        <a
                          href="#facebook"
                          rel="noopener noreferrer"
                          aria-label="facebook"
                        >
                          <i className="ti ti-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#twitter"
                          rel="noopener noreferrer"
                          aria-label="twitter"
                        >
                          <i className="ti ti-twitter-alt"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#instagram"
                          rel="noopener noreferrer"
                          aria-label="instagram"
                        >
                          <i className="ti ti-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#pinterest"
                          rel="noopener noreferrer"
                          aria-label="pinterest"
                        >
                          <i className="ti ti-pinterest"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <a
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                  href={import.meta.env.PUBLIC_URL + "/contact_01"}
                >
                  Request A Free Quotes
                </a>
              </div>
            </div> */}

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 widget-area">
              <div className="widget widget-recent-post clearfix">
                <h3 className="widget-title">{t("about")} </h3>
                <ul className="widget-post ttm-recent-post-list">
                  <li className="pb-0 border-bottom-0">
                    <div className="post-detail">
                      <Link to="/prete-presentation">
                        {t("pretePresentation")}
                      </Link>
                    </div>
                  </li>
                  <li className="pb-0 border-bottom-0">
                    <div className="post-detail">
                      <Link to="/copa-presentation">
                        {t("copaPresentation")}
                      </Link>
                    </div>
                  </li>
                  <li className="pb-0 border-bottom-0">
                    <div className="post-detail">
                      <Link to="#">
                        {t("ourPartners")}
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 widget-area">
              <div className="widget widget-recent-post clearfix">
                <h3 className="widget-title">{t("participate")}</h3>
                <ul className="widget-post ttm-recent-post-list">
                  <li className="pb-0 border-bottom-0">
                    <div className="post-detail">
                      <Link to="/how-to-participate">
                        {t("howToParticipate")}
                      </Link>
                    </div>
                  </li>
                  <li className="pb-0 border-bottom-0">
                    <div className="post-detail">
                      <Link to="/edition-calendar">
                        {t("editionCalendar")}
                      </Link>
                    </div>
                  </li>
                  <li className="pb-0 border-bottom-0">
                    <div className="post-detail">
                      <Link to="/eligibility-criteria">
                        {t("eligibilityCriteria")}
                      </Link>
                    </div>
                  </li>
                  <li className="pb-0 border-bottom-0">
                    <div className="post-detail">
                      <Link to="#">
                        {t("previousEditions")}
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 widget-area">
              <div className="widget widget-recent-post clearfix">
                <h3 className="widget-title">{t("resources")}</h3>
                <ul className="widget-post ttm-recent-post-list">
                  <li className="pb-0 border-bottom-0">
                    <div className="post-detail">
                      <Link to="/faq">
                        {t("frequentlyAskedQuestions")}
                      </Link>
                    </div>
                  </li>
                  <li className="pb-0 border-bottom-0">
                    <div className="post-detail">
                      <Link to="#">
                        {t("practicalGuides")}
                      </Link>
                    </div>
                  </li>
                  <li className="pb-0 border-bottom-0">
                    <div className="post-detail">
                      <Link to="#">
                        {t("downloadableTemplates")}
                      </Link>
                    </div>
                  </li>
                  <li className="pb-0 border-bottom-0">
                    <div className="post-detail">
                      <Link to="#">
                        {t("videoTutorials")}
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 widget-area">
              <div className="widget widget-recent-post clearfix">
                <h3 className="widget-title">{t("contact")}</h3>
                <ul className="widget-post ttm-recent-post-list">
                  <li className="pb-0 border-bottom-0">
                    <div className="post-detail">
                      <Link to="/contact-from">
                        {t("contactForm")}
                      </Link>
                    </div>
                  </li>
                  <li className="pb-0 border-bottom-0">
                    <div className="post-detail">
                      <Link to="/submit-complaint">
                        {t("submitComplaint")}
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-footer-text">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <span className="copyright">
                Copyright : © 2026 PRETE – Tous droits réservés | Financé par la Banque mondiale
                {/* Copyright © 2021{" "}
                <a href={import.meta.env.PUBLIC_URL + "/"}>HireCo </a>All rights
                reserved. */}
              </span>
              {/* <ul className="footer-nav-menu">
                <li>
                  <a href={import.meta.env.PUBLIC_URL + "/"}>Privacy & Policy</a>
                </li>
                <li>
                  <a href={import.meta.env.PUBLIC_URL + "/"}>Terms & Conditions</a>
                </li>
              </ul> */}
            </div>

            {/* <div className="col-lg-4 col-md-6 d-lg-flex align-items-center justify-content-between">
              <form
                id="subscribe-form"
                className="subscribe-form"
                onSubmit={handleSubscribe}
              >
                <div
                  className="mailchimp-inputbox clearfix"
                  id="subscribe-content"
                >
                  <input
                    type="email"
                    name="EMAIL"
                    id="txtemail"
                    placeholder="Enter Your Email Address..."
                    required={true}
                  />
                  <button
                    className="submit ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-skincolor"
                    type="submit"
                  >
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                  </button>
                </div>
              </form>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
