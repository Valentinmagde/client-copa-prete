import React from "react";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";

// Define props interface (empty but can be extended)
interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  return (
    <div className="site-main">
      <Header />

      {/* PageHeader */}
      <PageHeader title="Contact us" breadcrumb="Contact 02" />
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
                    Our <span className="text-theme-SkinColor">Offices!</span>
                  </h3>
                  <h2 className="title">How Can We Help?</h2>
                </div>
              </div>
              {/* section title end */}
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="featured-icon-box bg-theme-GreyColor">
                <div className="featured-content p-30">
                  <div className="featured-title">
                    <h3>United States</h3>
                  </div>
                  <div className="featured-desc">
                    <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                      <li className="pb-0">
                        <i className="fas fa-map-marker-alt"></i>
                        <div className="ttm-list-li-content">
                          123 King Street,Melbourne Victoria 5000,New York.
                        </div>
                      </li>
                      <div className="ttm-horizontal_sep width-100 mt-15 mb-15"></div>
                      <li className="pb-0">
                        <i className="fas fa-phone-alt"></i>
                        <div className="ttm-list-li-content">+123 456 7890</div>
                      </li>
                      <div className="ttm-horizontal_sep width-100 mt-15 mb-15"></div>
                      <li>
                        <i className="fa fa-envelope"></i>
                        <div className="ttm-list-li-content">
                          <a href="mailto:info@example.com">
                            Email:info@example.com
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
                    <h3>Australia</h3>
                  </div>
                  <div className="featured-desc">
                    <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                      <li className="pb-0">
                        <i className="fas fa-map-marker-alt"></i>
                        <div className="ttm-list-li-content">
                          123 King Street,Melbourne Victoria 5000,New York.
                        </div>
                      </li>
                      <div className="ttm-horizontal_sep width-100 mt-15 mb-15"></div>
                      <li className="pb-0">
                        <i className="fas fa-phone-alt"></i>
                        <div className="ttm-list-li-content">+123 456 7890</div>
                      </li>
                      <div className="ttm-horizontal_sep width-100 mt-15 mb-15"></div>
                      <li>
                        <i className="fa fa-envelope"></i>
                        <div className="ttm-list-li-content">
                          <a href="mailto:info@example.com">
                            Email:info@example.com
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
                    <h3>Canada</h3>
                  </div>
                  <div className="featured-desc">
                    <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                      <li className="pb-0">
                        <i className="fas fa-map-marker-alt"></i>
                        <div className="ttm-list-li-content">
                          123 King Street,Melbourne Victoria 5000,New York.
                        </div>
                      </li>
                      <div className="ttm-horizontal_sep width-100 mt-15 mb-15"></div>
                      <li className="pb-0">
                        <i className="fas fa-phone-alt"></i>
                        <div className="ttm-list-li-content">+123 456 7890</div>
                      </li>
                      <div className="ttm-horizontal_sep width-100 mt-15 mb-15"></div>
                      <li>
                        <i className="fa fa-envelope"></i>
                        <div className="ttm-list-li-content">
                          <a href="mailto:info@example.com">
                            Email:info@example.com
                          </a>
                        </div>
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
                    backgroundImage:
                      "url(https://via.placeholder.com/875x583?text=875x583+col-bgimage-7.jpg)",
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
                        Let's Get{" "}
                        <span className="text-theme-SkinColor">in Touch</span>
                      </h3>
                      <h2 className="title">Request a Callback</h2>
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
                            placeholder="Your Name"
                            required={true}
                          />
                        </label>
                      </div>
                      <div className="col-md-6 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="email"
                            type="text"
                            placeholder="Your Email"
                            required={true}
                          />
                        </label>
                      </div>
                      <div className="col-md-6 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="subject"
                            type="text"
                            placeholder="Subject"
                            required={true}
                          />
                        </label>
                      </div>
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="phone"
                            type="text"
                            placeholder="Phone Number"
                            required={true}
                          />
                        </label>
                      </div>
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <textarea
                            name="message"
                            rows={5}
                            placeholder="Message"
                            required={true}
                          ></textarea>
                        </label>
                      </div>
                    </div>
                    <button
                      className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100"
                      type="submit"
                    >
                      send a message!
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5344649.376490554!2d-105.18790339813212!3d39.4391730825603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sin!4v1626439456246!5m2!1sen!2sin"
          width="100%"
          height="550"
          title="United States Map"
          loading="lazy"
        ></iframe>
      </section>
      {/* map-section end */}

      <Footer />
    </div>
  );
};

export default Contact;
