import React, { useEffect } from "react";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import LanguageSwitcher from "../common/LanguageSwitcher";
import { useLanguage } from "../../hooks/useLanguage";
import { useTranslation } from "react-i18next";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { language, changeLanguage } = useLanguage("fr");
  const { t } = useTranslation();

  // Sticky header function
  const handleSticky = (): void => {
    const header = document.querySelector("header");
    const scrollTop = window.scrollY;
    if (header) {
      scrollTop >= 250
        ? header.classList.add("is-Sticky")
        : header.classList.remove("is-Sticky");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleSticky);
    return () => {
      window.removeEventListener("scroll", handleSticky);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Job search submitted");
  };

  return (
    <header id="masthead" className="header ttm-header-style-03">
      {/* topbar */}
      <div className="top_bar bg-theme-GreyColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <div className="top_bar_contact_item">
                    <div className="top_bar_icon">
                      <i className="flaticon flaticon-phone-call"></i>
                    </div>
                    <span>(+01)123 456 789</span>
                  </div>
                  <div className="top_bar_contact_item">
                    <div className="top_bar_icon">
                      <i className="flaticon flaticon-email"></i>
                    </div>
                    <span>
                      <a href={`mailto:info@example.com`}>info@example.com</a>
                    </span>
                  </div>
                  <div className="top_bar_contact_item">
                    <div className="top_bar_icon">
                      <i className="flaticon flaticon-placeholder"></i>
                    </div>
                    <span>Suite 20 Golden Street USA</span>
                  </div>
                </div>

                <div className="ttm-bg ttm-col-bgcolor-yes ttm-right-span bg-theme-GreyColor pl-20 ms-auto">
                  <ul className="list-unstyled d-flex mb-0 gap-3">
                    <li>
                      <a
                        href="/"
                        className="text-decoration-none"
                        aria-label="Facebook"
                      >
                        <i className="ti ti-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-decoration-none"
                        aria-label="Twitter"
                      >
                        <i className="ti ti-twitter-alt"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-decoration-none"
                        aria-label="Google"
                      >
                        <i className="ti ti-google"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/"
                        className="text-decoration-none"
                        aria-label="LinkedIn"
                      >
                        <i className="ti ti-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* topbar end */}

      {/* site-header-menu */}
      <div id="site-header-menu" className="site-header-menu border-top">
        <div className="site-header-menu-inner ttm-stickable-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* site-navigation */}
                <div className="site-navigation d-flex align-items-center justify-content-between">
                  {/* site-branding */}
                  <div className="site-branding">
                    <Logo />
                  </div>

                  <div className="border-box-block ms-auto mr-20">
                    <div className="d-flex align-items-center justify-content-between">
                      <Menu />
                      <div className="mobile-menu">
                        <MobileMenu />
                      </div>
                    </div>
                  </div>

                  {/* Language Switcher */}
                  <div className="ms-3 me-3">
                    <LanguageSwitcher
                      currentLanguage={language}
                      onLanguageChange={changeLanguage}
                      position="right"
                      variant="minimal"
                      showFlags={true}
                      showNames={true}
                    />
                  </div>

                  <div className="header_btn membership_btn">
                    <div className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-icon-btn-left ttm-btn-color-grey text-theme-DarkColor d-flex align-items-center">
                      <i className="far fa-user fa-sm text-theme-DarkColor"></i>
                      <a href={import.meta.env.PUBLIC_URL + "/register"}>
                        {t("signup")}
                      </a>
                      <span className="ml-10 mr-10 alert-heading">/</span>
                      <i className="ti ti-lock fa-sm text-theme-DarkColor"></i>
                      <a href={import.meta.env.PUBLIC_URL + "/login"}>
                        {t("login")}
                      </a>
                    </div>
                  </div>
                </div>
                {/* site-navigation end */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* site-header-menu end */}

      {/* <div className="serach_bar bg-theme-SkinColor pt-20">
        <div className="container">
          <form
            id="b_search_Form"
            className="b_search_Form wrap-form d-block"
            method="post"
            action="#"
            data-mailchimp="true"
            onSubmit={handleSearchSubmit}
          >
            <div className="row row-equal-height ttm-boxes-spacing-20px">
              <div className="col-md">
                <label>
                  <input type="text" id="keywords" placeholder="Keywords (e.g. Job Title)" />
                </label>
              </div>
              <div className="col-md">
                <label>
                  <input type="text" id="locations" placeholder="Locations (e.g. City, Counter)" />
                </label>
              </div>
              <div className="col-md">
                <label>
                  <input type="text" id="industry" placeholder="Industry (e.g. Design, Art)" />
                </label>
              </div>
              <div className="col-lg-2">
                <label>
                  <button
                    className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-grey"
                    type="submit"
                  >
                    Find Job
                  </button>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div> */}
    </header>
  );
};

export default Header;
