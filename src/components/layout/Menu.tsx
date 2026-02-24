import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface MenuProps {}

interface MenuState {
  show: boolean;
}

const Menu: React.FC<MenuProps> = () => {
  //const [show, setShow] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <nav className="main-menu">
      <ul className="menu">
        <li className="">
          <Link to="/" className="mega-menu-link">
            {t("home")}
          </Link>
        </li>

        <li className="mega-menu-item">
          <Link
            to="#"
            className="mega-menu-link"
          >
            {t("about")}
          </Link>
          <ul className="mega-submenu">
            <li>
              <Link to="/prete-presentation" className="mega-menu-link">{t("pretePresentation")}</Link>
            </li>
            <li>
              <Link to="/copa-presentation" className="mega-menu-link">{t("copaPresentation")}</Link>
            </li>
            <li>
              <Link to="#" className="mega-menu-link">{t("ourPartners")}</Link>
            </li>
          </ul>
        </li>

        <li className="mega-menu-item">
          <Link
            to="#"
            className="mega-menu-link"
          >
            {t("copa")}
          </Link>
          <ul className="mega-submenu">
            <li>
              <Link to="/how-to-participate">{t("howToParticipate")}</Link>
            </li>
            <li>
              <Link to="/edition-calender">{t("editionCalendar")}</Link>
            </li>
            <li>
              <Link to="/eligibility-criteria">{t("eligibilityCriteria")}</Link>
            </li>
            <li>
              <Link to="#">{t("previousEditions")}</Link>
            </li>
          </ul>
        </li>

        <li className="mega-menu-item">
          <Link
            to="#"
            className="mega-menu-link"
          >
            {t("trainings")}
          </Link>
          <ul className="mega-submenu">
            <li>
              <Link to="/training-catalog">
                {t("trainingsCatalog")}
              </Link>
            </li>
            <li>
              <Link to="/sessions-calendar">
                {t("sessionsCalendar")}
              </Link>
            </li>
            <li>
              <Link to="/session-registration">
                {t("sessionRegistration")}
              </Link>
            </li>
          </ul>
        </li>

        <li className="">
          <Link
            to="/news"
            title="News"
            className="mega-menu-link"
          >
            {t("news")}
          </Link>
        </li>

        {/* <li className="mega-menu-item">
          <Link
            to="#"
            className="mega-menu-link"
          >
            {t("resources")}
          </Link>
          <ul className="mega-submenu">
            <li>
              <Link to="/practical-guides">
                {t("practicalGuides")}
              </Link>
            </li>
            <li>
              <Link to="/downloadable-templates">
                {t("downloadableTemplates")}
              </Link>
            </li>
            <li>
              <Link to="/video-tutorials">
                {t("videoTutorials")}
              </Link>
            </li>
            <li>
              <Link to="/faq">
                {t("frequentlyAskedQuestions")}
              </Link>
            </li>
          </ul>
        </li> */}

        <li className="mega-menu-item">
          <Link
            to="#"
            className="mega-menu-link"
          >
            {t("contact")}
          </Link>
          <ul className="mega-submenu">
            <li>
              <Link to="/contact-us">
                {t("contactForm")}
              </Link>
            </li>
            <li>
              <Link to="/submit-complaint">
                {t("submitComplaint")}
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
