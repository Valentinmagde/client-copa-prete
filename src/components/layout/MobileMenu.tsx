import React, { useState, useEffect } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBNavbarToggler,
} from "mdbreact";
import { useTranslation } from "react-i18next";
import { setLocale } from "@/utils/storage";
import { Link, useNavigate } from "react-router-dom";
import {
  isAuthenticatedCs,
  getUser,
  clearLocalAuthData,
  getAccessTokenCs,
} from "../../utils/storage";

interface MobileMenuProps {}

const MobileMenu: React.FC<MobileMenuProps> = () => {
  const [collapse1, setCollapse1] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const toggleSingleCollapse = (collapseId: string): void => {
    if (collapseId === "collapse1") {
      setCollapse1(!collapse1);
    }
  };

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setLocale(langCode, { sameSite: "None", secure: true });
    setCollapse1(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    clearLocalAuthData();
    setIsAuthenticated(false);
    setUser(null);
    setCollapse1(false);
    setDropdownOpen(false);
    navigate("/login");
  };

  // Vérifier l'authentification au chargement
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

    // Écouter les changements de stockage
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Fermer le menu quand on clique sur un lien
  const closeMenu = () => {
    setCollapse1(false);
    setDropdownOpen(false);
  };

  return (
    <MDBNavbar>
      <MDBNavbarToggler onClick={() => toggleSingleCollapse("collapse1")} />
      <MDBCollapse isOpen={collapse1} navbar>
        <MDBNavbarNav left>
          {/* Home */}
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav>
                <Link to="/" className="">
                  {t("home")}
                </Link>
              </MDBDropdownToggle>
              <MDBDropdownMenu />
            </MDBDropdown>
          </MDBNavItem>

          {/* About */}
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                {t("about")}
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem href="/prete-presentation" onClick={closeMenu}>
                  {t("pretePresentation")}
                </MDBDropdownItem>
                <MDBDropdownItem href="/copa-presentation" onClick={closeMenu}>
                  {t("copaPresentation")}
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

          {/* News */}
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <Link to="/news">
              {t("news")}
            </Link>
              </MDBDropdownToggle>
              <MDBDropdownMenu />
            </MDBDropdown>
          </MDBNavItem>

          {/* Contact */}
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                {t("contact")}
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem href="/contact-us" onClick={closeMenu}>
                  {t("contactForm")}
                </MDBDropdownItem>
                <MDBDropdownItem href="/submit-complaint" onClick={closeMenu}>
                  {t("submitComplaint")}
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

          <MDBDropdownItem divider />

          {/* Language */}
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-flex align-items-center">
                  <i className="ti ti-world me-2"></i>
                  {i18n.language === "fr" ? "Français" : "Kirundi"}
                </div>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem onClick={() => handleLanguageChange("fr")}>
                  Français
                </MDBDropdownItem>
                <MDBDropdownItem onClick={() => handleLanguageChange("rn")}>
                  Kirundi
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

          {/* Auth */}
          <MDBNavItem>
  <MDBDropdown>
    <MDBDropdownToggle nav caret>
      {!isAuthenticated ? (
        <div className="d-flex align-items-center">
          <i className="ti ti-user me-2"></i>
          {t("account")}
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <i className="ti ti-user me-2"></i>
          {user?.firstName} {user?.lastName}
        </div>
      )}
    </MDBDropdownToggle>

    <MDBDropdownMenu>
      {!isAuthenticated ? (
        <>
          <MDBDropdownItem
            tag={Link}
            to="/eligibility-criteria"
            onClick={closeMenu}
          >
            {t("signup")}
          </MDBDropdownItem>

          <MDBDropdownItem
            tag={Link}
            to="/login"
            onClick={closeMenu}
          >
            {t("login")}
          </MDBDropdownItem>
        </>
      ) : (
        <>
          <MDBDropdownItem
            tag={Link}
            to="/application"
            onClick={closeMenu}
          >
            <i className="ti ti-medall me-2"></i>
            {t("myApplication")}
          </MDBDropdownItem>

          <MDBDropdownItem divider />

          <MDBDropdownItem onClick={handleLogout}>
            <i className="ti ti-power-off me-2"></i>
            {t("logout")}
          </MDBDropdownItem>
        </>
      )}
    </MDBDropdownMenu>
  </MDBDropdown>
</MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default MobileMenu;