import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBHamburgerToggler,
} from "mdbreact";

// Define props interface (empty but can be extended)
interface MobileMenuProps {}

const MobileMenu: React.FC<MobileMenuProps> = () => {
  const [collapse1, setCollapse1] = useState<boolean>(false);
  const [collapseID, setCollapseID] = useState<string>("");

  const toggleCollapse = (collapseID: string) => () => {
    setCollapseID((prev) => (prev !== collapseID ? collapseID : ""));
  }

  const toggleSingleCollapse = (collapseId: string): void => {
    if (collapseId === "collapse1") {
      setCollapse1(!collapse1);
    }
    // Handle other collapses if needed
  }

  return (
    <MDBNavbar>
      <MDBHamburgerToggler
        id="hamburger1"
        onClick={() => toggleSingleCollapse("collapse1")}
      />
      <MDBCollapse isOpen={collapse1} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                Home
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem href={import.meta.env.PUBLIC_URL + "/"}>
                  Homepage 1
                </MDBDropdownItem>
                <MDBDropdownItem href={import.meta.env.PUBLIC_URL + "/Home2"}>
                  Homepage 2
                </MDBDropdownItem>
                <MDBDropdownItem href={import.meta.env.PUBLIC_URL + "/Home3"}>
                  Homepage 3
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                Pages
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/about_us"}
                >
                  About Us
                </MDBDropdownItem>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/services"}
                >
                  Services
                </MDBDropdownItem>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/services_details"}
                >
                  Services Details
                </MDBDropdownItem>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/carrer_01"}
                >
                  Carrer
                </MDBDropdownItem>
                <MDBDropdownItem href={import.meta.env.PUBLIC_URL + "/login"}>
                  Login
                </MDBDropdownItem>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/register"}
                >
                  Register
                </MDBDropdownItem>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/error_404"}
                >
                  Error 404
                </MDBDropdownItem>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/error_405"}
                >
                  Error 405
                </MDBDropdownItem>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/contact_01"}
                >
                  Contact us 01
                </MDBDropdownItem>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/contact_02"}
                >
                  Contact us 02
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                Jobs
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/job_list"}
                >
                  Job List
                </MDBDropdownItem>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/job_details"}
                >
                  Job Details
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                Employers
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/employers_list"}
                >
                  Employers List
                </MDBDropdownItem>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/employers_details"}
                >
                  Employers Details
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                Candidates
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/candidate_list"}
                >
                  Candidate List
                </MDBDropdownItem>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/candidate_details"}
                >
                  Candidate Details
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>

          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                Blog
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/blog_classic"}
                >
                  Blog Classic
                </MDBDropdownItem>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/blog_grid"}
                >
                  Blog Grid
                </MDBDropdownItem>
                <MDBDropdownItem
                  href={import.meta.env.PUBLIC_URL + "/blog_details"}
                >
                  Blog Details
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default MobileMenu;
