import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import ContactImg from "../assets/img/contact/01.jpg";
import { toast } from "react-toastify";
import NotificationService from "../services/notification/notification.service";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}

interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("contactPage.validation.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contactPage.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contactPage.validation.emailInvalid");
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t("contactPage.validation.subjectRequired");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("contactPage.validation.phoneRequired");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contactPage.validation.messageRequired");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("contactPage.validation.messageTooShort");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(t("contactPage.validation.checkErrors"));
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler un appel API
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      await NotificationService.sendContactMessage(formData);

      toast.success(t("contactPage.success.message"));

      // Réinitialiser le formulaire
      setFormData({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast.error(t("contactPage.error.message"));
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  <form
                    id="contact_form"
                    className="contact_form wrap-form"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="row ttm-boxes-spacing-30px">
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t("contactPage.form.name")}
                            className={errors.name ? "error" : ""}
                            required={true}
                          />
                        </label>
                        {errors.name && (
                          <span className="text-danger" style={{ fontSize: "12px", marginTop: "4px", display: "block" }}>
                            {errors.name}
                          </span>
                        )}
                      </div>
                      <div className="col-md-6 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t("contactPage.form.email")}
                            className={errors.email ? "error" : ""}
                            required={true}
                          />
                        </label>
                        {errors.email && (
                          <span className="text-danger" style={{ fontSize: "12px", marginTop: "4px", display: "block" }}>
                            {errors.email}
                          </span>
                        )}
                      </div>
                      <div className="col-md-6 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="subject"
                            type="text"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder={t("contactPage.form.subject")}
                            className={errors.subject ? "error" : ""}
                            required={true}
                          />
                        </label>
                        {errors.subject && (
                          <span className="text-danger" style={{ fontSize: "12px", marginTop: "4px", display: "block" }}>
                            {errors.subject}
                          </span>
                        )}
                      </div>
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t("contactPage.form.phone")}
                            className={errors.phone ? "error" : ""}
                            required={true}
                          />
                        </label>
                        {errors.phone && (
                          <span className="text-danger" style={{ fontSize: "12px", marginTop: "4px", display: "block" }}>
                            {errors.phone}
                          </span>
                        )}
                      </div>
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <textarea
                            name="message"
                            rows={9}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder={t("contactPage.form.message")}
                            className={errors.message ? "error" : ""}
                            required={true}
                          ></textarea>
                        </label>
                        {errors.message && (
                          <span className="text-danger" style={{ fontSize: "12px", marginTop: "4px", display: "block" }}>
                            {errors.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fa fa-spinner fa-spin mr-5"></i>
                          {t("contactPage.form.sending")}
                        </>
                      ) : (
                        t("contactPage.form.button")
                      )}
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