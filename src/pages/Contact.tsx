import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import ContactImg from "../assets/img/contact/01.jpg";

interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="site-main">
      <Header />

      {/* PageHeader */}
      <PageHeader
        title={t("contactPage.pageTitle")}
        breadcrumb={t("contactPage.breadcrumb")}
      />
      {/* PageHeader end */}

      {/* contact-section */}
      <section className="ttm-row contact-section bg-theme-GreyColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* section-title */}
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>
                    {t("contactPage.form.title")
                      .split(" ")
                      .map((word, index) => (
                        <span
                          key={index}
                          className={index > 0 ? "text-theme-SkinColor" : ""}
                        >
                          {word}{" "}
                        </span>
                      ))}
                  </h3>
                  <h2 className="title">{t("contactPage.form.subtitle")}</h2>
                </div>
              </div>
              {/* section-title end */}
            </div>
          </div>
          {/* row */}
          <div className="row">
            <div className="col-lg-6">
              <div className="pr-30 pr-md-0 mt-15">
                <div className="ttm_single_image-wrapper mb-20">
                  <img
                    className="img-fluid w-100"
                    src={ContactImg}
                    alt="single_06"
                  />
                </div>
                <p className="mb-30">{t("contactPage.form.description")}</p>

                <div className="d-flex align-items-center">
                  <div
                    className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-sm 
                                    ttm-icon_element-style-round mb-0"
                  >
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="pl-15">
                    <h6 className="mb-5">
                      {t("contactPage.offices.phone.title")}
                    </h6>
                    <p className="featured-desc mb-0">
                      {t("contactPage.offices.phone.value")}
                    </p>
                  </div>
                </div>

                <div className="ttm-horizontal_sep width-100 mt-20 mb-20"></div>

                <div className="d-flex align-items-center">
                  <div
                    className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-sm 
                                    ttm-icon_element-style-round mb-0"
                  >
                    <i className="fa fa-globe"></i>
                  </div>
                  <div className="pl-15">
                    <h6 className="mb-5">
                      {t("contactPage.offices.email.title")}
                    </h6>
                    <p className="featured-desc mb-0">
                      {t("contactPage.offices.email.value")}
                    </p>
                  </div>
                </div>

                <div className="ttm-horizontal_sep width-100 mt-20 mb-20"></div>

                <div className="d-flex align-items-center">
                  <div
                    className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-sm 
                                    ttm-icon_element-style-round mb-0"
                  >
                    <i className="ti ti-home"></i>
                  </div>
                  <div className="pl-15">
                    <h6 className="mb-5">
                      {t("contactPage.offices.address.title")}
                    </h6>
                    <p className="featured-desc mb-0">
                      {t("contactPage.offices.address.value")}
                    </p>
                  </div>
                </div>
                <div className="ttm-horizontal_sep width-100 mt-20 mb-20"></div>

                <div className="d-flex align-items-center">
                  <div
                    className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-sm 
                                    ttm-icon_element-style-round mb-0"
                  >
                    <i className="ti ti-alarm-clock"></i>
                  </div>
                  <div className="pl-15">
                    <h6 className="mb-5">
                      {t("contactPage.offices.hours.title")}
                    </h6>
                    <p className="featured-desc mb-0">
                      {t("contactPage.offices.hours.value")}
                    </p>
                  </div>
                </div>
                {/*  featured-icon-box end */}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-WhiteColor z-index-2 p-40 p-lg-30 mt-15 mt-lg-30">
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                <div className="layer-content">
                  <form id="contact_form" className="contact_form wrap-form">
                    <div className="row ttm-boxes-spacing-30px">
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="name"
                            type="text"
                            placeholder={t("contactPage.form.name")}
                            required={true}
                          />
                        </label>
                      </div>
                      <div className="col-md-6 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="email"
                            type="text"
                            placeholder={t("contactPage.form.email")}
                            required={true}
                          />
                        </label>
                      </div>
                      <div className="col-md-6 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="subject"
                            type="text"
                            placeholder={t("contactPage.form.subject")}
                            required={true}
                          />
                        </label>
                      </div>
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="phone"
                            type="text"
                            placeholder={t("contactPage.form.phone")}
                            required={true}
                          />
                        </label>
                      </div>
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <textarea
                            name="message"
                            rows={9}
                            placeholder={t("contactPage.form.message")}
                            required={true}
                          ></textarea>
                        </label>
                      </div>
                    </div>
                    <button
                      className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100"
                      type="submit"
                    >
                      {t("contactPage.form.button")}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* contact-section end */}

      {/* map-section */}
      <section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d510828.4918479198!2d29.27765787173545!3d-3.3614236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c183f3d2d9d4b7%3A0x9b0d7e8b9f1c6a1!2sBujumbura%2C%20Burundi!5e0!3m2!1sen!2sbi!4v1626439456246!5m2!1sen!2sbi"
          width="100%"
          height="550"
          title={t("contactPage.map.title")}
          loading="lazy"
        ></iframe>
      </section>
      {/* map-section end */}

      <Footer />
    </div>
  );
};

export default Contact;
