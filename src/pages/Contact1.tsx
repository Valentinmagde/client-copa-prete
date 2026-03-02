import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import blog1 from "../assets/img/slider/03.png";

interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="site-main">
      <Header />

      {/* PageHeader */}
      <PageHeader title={t('contactPage.pageTitle')} breadcrumb={t('contactPage.breadcrumb')} />
      {/* PageHeader end */}

      {/* grid-section */}
      <section className="ttm-row grid-section clearfix">
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-12">
              {/* section title */}
              <div className="section-title title-style-center_text pt-15">
                <div className="title-header">
                  <h3>
                    {t('contactPage.offices.title').split(' ')[0]}{' '}
                    <span className="text-theme-SkinColor">
                      {t('contactPage.offices.title').split(' ')[1] || ''}
                    </span>
                  </h3>
                  <h2 className="title">{t('contactPage.offices.subtitle')}</h2>
                </div>
              </div>
              {/* section title end */}
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="featured-icon-box bg-theme-GreyColor">
                <div className="featured-content p-30">
                  <div className="featured-title">
                    <h3>{t('contactPage.offices.address.title')}</h3>
                  </div>
                  <div className="featured-desc">
                    <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                      <li className="pb-0">
                        <i className="fas fa-map-marker-alt"></i>
                        <div className="ttm-list-li-content">
                          {t('contactPage.offices.address.value')}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="featured-icon-box bg-theme-GreyColor">
                <div className="featured-content p-30">
                  <div className="featured-title">
                    <h3>{t('contactPage.offices.email.title')}</h3>
                  </div>
                  <div className="featured-desc">
                    <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                      <li>
                        <i className="fa fa-envelope"></i>
                        <div className="ttm-list-li-content">
                          <a href={`mailto:${t('contactPage.offices.email.value')}`}>
                            {t('contactPage.offices.email.title')}:{t('contactPage.offices.email.value')}
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="featured-icon-box bg-theme-GreyColor">
                <div className="featured-content p-30">
                  <div className="featured-title">
                    <h3>{t('contactPage.offices.phone.title')}</h3>
                  </div>
                  <div className="featured-desc">
                    <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                      <li className="pb-0">
                        <i className="fas fa-phone-alt"></i>
                        <div className="ttm-list-li-content">{t('contactPage.offices.phone.value')}</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row end */}
        </div>
      </section>
      {/* grid-section end */}

      {/* padding_zero-section */}
      <section className="ttm-row padding_zero-section bg-layer-equal-height clearfix">
        <div className="container">
          {/* row */}
          <div className="row g-0">
            <div className="col-lg-5">
              {/* col-img-img-six */}
              <div className="ttm-bg ttm-col-bgimage-yes col-bg-img-seven ttm-left-span">
                <div
                  className="ttm-col-wrapper-bg-layer ttm-bg-layer"
                  style={{
                    backgroundImage: `url(${blog1})`,
                  }}
                ></div>
                <div className="layer-content"></div>
                <img
                  className="img-fluid col-bg-img-res"
                  src="https://via.placeholder.com/875x583?text=875x583+col-bgimage-7.jpg"
                  alt="bgimage"
                />
              </div>
              {/* col-img-bg-img-six end */}
            </div>
            <div className="col-lg-7">
              <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-GreyColor h-auto p-40 p-lg-30 mt-lg-30 mt-50 mb-50">
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                <div className="layer-content">
                  {/* section title */}
                  <div className="section-title title-style-center_text">
                    <div className="title-header">
                      <h3>
                        {t('contactPage.form.title').split(' ')[0]}{' '}
                        <span className="text-theme-SkinColor">
                          {t('contactPage.form.title').split(' ').slice(1).join(' ')}
                        </span>
                      </h3>
                      <h2 className="title">{t('contactPage.form.subtitle')}</h2>
                    </div>
                  </div>
                  {/* section title end */}
                  <form id="contact_form" className="contact_form wrap-form">
                    <div className="row ttm-boxes-spacing-10px">
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="name"
                            type="text"
                            placeholder={t('contactPage.form.name')}
                            required={true}
                          />
                        </label>
                      </div>
                      <div className="col-md-6 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="email"
                            type="text"
                            placeholder={t('contactPage.form.email')}
                            required={true}
                          />
                        </label>
                      </div>
                      <div className="col-md-6 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="subject"
                            type="text"
                            placeholder={t('contactPage.form.subject')}
                            required={true}
                          />
                        </label>
                      </div>
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="phone"
                            type="text"
                            placeholder={t('contactPage.form.phone')}
                            required={true}
                          />
                        </label>
                      </div>
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <textarea
                            name="message"
                            rows={5}
                            placeholder={t('contactPage.form.message')}
                            required={true}
                          ></textarea>
                        </label>
                      </div>
                    </div>
                    <button
                      className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100"
                      type="submit"
                    >
                      {t('contactPage.form.button')}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* row end */}
        </div>
      </section>
      {/* padding_zero-section end */}

      {/* map-section */}
      <section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d510828.4918479198!2d29.27765787173545!3d-3.3614236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c183f3d2d9d4b7%3A0x9b0d7e8b9f1c6a1!2sBujumbura%2C%20Burundi!5e0!3m2!1sen!2sbi!4v1626439456246!5m2!1sen!2sbi"
          width="100%"
          height="550"
          title={t('contactPage.map.title')}
          loading="lazy"
        ></iframe>
      </section>
      {/* map-section end */}

      <Footer />
    </div>
  );
};

export default Contact;