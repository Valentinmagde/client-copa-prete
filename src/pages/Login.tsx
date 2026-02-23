import React from "react";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import { Tab, Tabs, TabPanel } from "react-tabs";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="site-main">
      <Header />

      <PageHeader title={t("login")} breadcrumb={t("login")} />

      <div className="ttm-row login-section clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bg-theme-GreyColor rounded p-50 p-lg-20">
                <div className="layer-content">
                  <div className="text-center mb-30">
                    <h3>{t("loginTitle")}</h3>
                  </div>

                  <Tabs>
                    <TabPanel>
                      <form
                        className="login_form wrap-form"
                        onSubmit={handleSubmit}
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <label>
                              <input type="email" placeholder={t("email")} />
                            </label>
                          </div>

                          <div className="col-lg-12">
                            <label>
                              <input
                                type="password"
                                placeholder={t("password")}
                              />
                            </label>
                          </div>

                          <div className="col-lg-12">
                            <div className="d-md-flex justify-content-between mt-15">
                              <div>
                                <input type="checkbox" />
                                <span> {t("rememberMe")}</span>
                              </div>

                              <Link
                                to="/forgot-password"
                                className="text-theme-SkinColor"
                              >
                                {t("forgotPassword")}
                              </Link>
                            </div>
                          </div>

                          <div className="col-lg-12 mx-auto"> <label className="mb-0"> <button className="submit w-100 ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor" type="submit" > {t("signin")} </button> </label> </div>
                          
                              <div className="col-lg-12">
                                <label>
                                  <div className="forgot-pwd text-center mt-5">
                                    <p>
                                      {t("noAccount")}{" "}
                                      <Link
                                        to="/register"
                                        className="text-theme-SkinColor"
                                      >
                                        {t("signUp")}
                                      </Link>
                                    </p>
                                  </div>
                                </label>
                              </div>
                        </div>
                      </form>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
