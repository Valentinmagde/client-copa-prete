import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import LanguageSwitcher from "../common/LanguageSwitcher";
import { useLanguage } from "../../hooks/useLanguage";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import {
  isAuthenticatedCs,
  getUser,
  clearLocalAuthData,
  getAccessTokenCs,
} from "../../utils/storage";
import { toast } from "react-toastify";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { language, changeLanguage } = useLanguage("fr");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // Vérifier l'authentification au chargement et après chaque action
  const checkAuth = () => {
    const auth = isAuthenticatedCs();
    setIsAuthenticated(auth);

    if (auth) {
      const userData = getUser();
      setUser(userData);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();

    // Écouter les changements de stockage (pour la déconnexion dans d'autres onglets)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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

  const handleLogout = async () => {
    try {
      // Optionnel : Appeler l'API de déconnexion
      // await AuthService.signout();

      clearLocalAuthData();
      toast.success(t("logoutSuccess"));
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(t("logoutError"));
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".user-dropdown");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                    <span>(+257) 62 44 72 55</span>
                  </div>
                  <div className="top_bar_contact_item">
                    <div className="top_bar_icon">
                      <i className="flaticon flaticon-email"></i>
                    </div>
                    <span>
                      <a href={`mailto:info@example.com`}>contact@copa-prete.bi</a>
                    </span>
                  </div>
                  <div className="top_bar_contact_item">
                    <div className="top_bar_icon">
                      <i className="flaticon flaticon-placeholder"></i>
                    </div>
                    <span>Chaussée d'Uvira, Bujumbura.</span>
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

                  {/* Auth Buttons - Conditional Rendering */}
                  <div className="header_btn membership_btn">
                    {!isAuthenticated ? (
                      // Non connecté - Afficher Signup/Login
                      <div className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-icon-btn-left ttm-btn-color-grey text-theme-DarkColor d-flex align-items-center">
                        <i className="ti ti-user text-theme-DarkColor"></i>
                        <Link to="/register">{t("signup")}</Link>
                        <span className="ml-10 mr-10 alert-heading">/</span>
                        <i className="ti ti-lock fa-sm text-theme-DarkColor"></i>
                        <Link to="/login">{t("login")}</Link>
                      </div>
                    ) : (
                      // Connecté - Afficher le menu utilisateur
                      <div className="user-menu-container">
                        <div
                          className="user-dropdown-trigger d-flex align-items-center"
                          onClick={handleDropdownToggle}
                        >
                          <div className="user-avatar">
                            {user?.firstName?.charAt(0)}
                            {user?.lastName?.charAt(0)}
                          </div>
                          <span className="user-name ms-2">
                            {user?.firstName || t("user")}
                          </span>
                          <i
                            className={`ti ti-chevron-${dropdownOpen ? "up" : "down"} ms-2`}
                          ></i>
                        </div>

                        {dropdownOpen && (
                          <div className="user-dropdown">
                            <div className="dropdown-header">
                              <strong>
                                {user?.firstName} {user?.lastName}
                              </strong>
                              <small>{user?.email}</small>
                            </div>
                            <div className="dropdown-divider"></div>
                            {/* <Link
                              to="/espace-mpme/dashboard"
                              className="dropdown-item"
                            >
                              <i className="ti ti-dashboard"></i>
                              {t("dashboard")}
                            </Link> */}
                            <Link
                              to="/profile"
                              className="dropdown-item"
                            >
                              <i className="ti ti-user"></i>
                              {t("myProfile")}
                            </Link>
                            {/* <Link
                              to="#"
                              className="dropdown-item"
                            >
                              <i className="ti ti-bell"></i>
                              {t("notifications")}
                            </Link> */}
                            <div className="dropdown-divider"></div>
                            <button
                              onClick={handleLogout}
                              className="dropdown-item logout-btn"
                            >
                              <i className="ti ti-power-off"></i>
                              {t("logout")}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* site-navigation end */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* site-header-menu end */}

      <style>{`
        .user-menu-container {
          position: relative;
        }

        .user-dropdown-trigger {
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 30px;
          background: #f8f9fa;
          transition: all 0.3s;
          display: flex;
          align-items: center;
        }

        .user-dropdown-trigger:hover {
          background: #e9ecef;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--theme-SkinColor, #1f4e79) 0%, #0f2540 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
        }

        .user-name {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .user-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 240px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          border: 1px solid #e9ecef;
          z-index: 1000;
          animation: dropdownFade 0.2s ease;
        }

        @keyframes dropdownFade {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-header {
          padding: 15px 16px;
          background: #f8f9fa;
          border-radius: 8px 8px 0 0;
        }

        .dropdown-header strong {
          display: block;
          font-size: 14px;
          color: #333;
        }

        .dropdown-header small {
          display: block;
          font-size: 12px;
          color: #666;
          margin-top: 3px;
        }

        .dropdown-divider {
          height: 1px;
          background: #e9ecef;
          margin: 5px 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          color: #333;
          text-decoration: none;
          transition: all 0.2s;
          font-size: 13px;
          width: 100%;
          border: none;
          background: none;
          cursor: pointer;
          text-align: left;
        }

        .dropdown-item i {
          width: 18px;
          font-size: 14px;
          color: #666;
        }

        .dropdown-item:hover {
          background: #f1f3f4;
          color: var(--theme-SkinColor, #1f4e79);
        }

        .dropdown-item:hover i {
          color: var(--theme-SkinColor, #1f4e79);
        }

        .logout-btn {
          color: #dc3545;
        }

        .logout-btn i {
          color: #dc3545;
        }

        .logout-btn:hover {
          background: #fee;
          color: #dc3545;
        }

        .logout-btn:hover i {
          color: #dc3545;
        }
      `}</style>
    </header>
  );
};

export default Header;
