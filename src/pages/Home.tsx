import React, { useState, type JSX } from "react";
import Slider from "react-slick";
import Header from "../components/layout/Header";
import Banner from "../components/banner/Banner";
import Footer from "../components/layout/Footer";
import CountUp from "react-countup";
import about1 from "../assets/img/about/01.png";
import about2 from "../assets/img/about/02.png";
import fourStep from "../assets/img/four-step2.png";
import rowImage from "../assets/img/row-bgimage-4.jpg";
import brandLogo1 from "../assets/img/brand-logo/06.jpg";
import brandLogo2 from "../assets/img/brand-logo/07.jpg";
import brandLogo3 from "../assets/img/brand-logo/08.png";
import brandLogo4 from "../assets/img/brand-logo/09.png";
import testimonial1 from "../assets/img/testimonial/01.png";
import profile1 from "../assets/img/testimonial/p01.png";
import profile2 from "../assets/img/testimonial/p02.png";
import profile3 from "../assets/img/testimonial/p03.png";
import blog1 from "../assets/img/blog/2.png";
import blog2 from "../assets/img/blog/3.png";
import blog3 from "../assets/img/blog/4.png";
import blog4 from "../assets/img/blog/5.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Define types
interface SliderElement {
  id: number;
  description: JSX.Element;
}

interface SlickSettings {
  dots?: boolean;
  arrow?: boolean;
  autoplay?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToScroll?: number;
  slidesToShow?: number;
  rows?: number;
  responsive?: Array<{
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll: number;
    };
  }>;
  beforeChange?: (currentSlide: number, nextSlide: number) => void;
  afterChange?: (currentSlide: number) => void;
  fade?: boolean;
  arrows?: boolean;
}

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const sliderElements: SliderElement[] = [
    {
      id: 1,
      description: (
        <div className="col-lg-12">
          <div
            className="testimonials ttm-testimonial-box-view-style2"
            role="group"
          >
            <div className="testimonial-top">
              <div className="testimonial-avatar">
                <div className="testimonial-img">
                  <img
                    className="img-fluid"
                    src={profile1}
                    alt="testimonial-img"
                  />
                </div>
              </div>
              <div className="testimonial-caption">
                <label>{t("testimonial1Label")}</label>
                <h3>{t("testimonial1Name")}</h3>
              </div>
            </div>
            <div className="testimonial-content">
              <blockquote className="testimonial-text">
                {t("testimonial1Text")}
              </blockquote>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      description: (
        <div className="col-lg-12">
          <div
            className="testimonials ttm-testimonial-box-view-style2"
            role="group"
          >
            <div className="testimonial-top">
              <div className="testimonial-avatar">
                <div className="testimonial-img">
                  <img
                    className="img-fluid"
                    src={profile2}
                    alt="testimonial-img"
                  />
                </div>
              </div>
              <div className="testimonial-caption">
                <label>{t("testimonial2Label")}</label>
                <h3>{t("testimonial2Name")}</h3>
              </div>
            </div>
            <div className="testimonial-content">
              <blockquote className="testimonial-text">
                {t("testimonial2Text")}
              </blockquote>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      description: (
        <div className="col-lg-12">
          <div
            className="testimonials ttm-testimonial-box-view-style2"
            role="group"
          >
            <div className="testimonial-top">
              <div className="testimonial-avatar">
                <div className="testimonial-img">
                  <img
                    className="img-fluid"
                    src={profile3}
                    alt="testimonial-img"
                  />
                </div>
              </div>
              <div className="testimonial-caption">
                <label>{t("testimonial3Label")}</label>
                <h3>{t("testimonial3Name")}</h3>
              </div>
            </div>
            <div className="testimonial-content">
              <blockquote className="testimonial-text">
                {t("testimonial3Text")}
              </blockquote>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleAfterChange = (index: number): void => {
    setCurrentSlide(index);
  };

  const settings: SlickSettings = {
    beforeChange: (currentSlide: number, nextSlide: number): void => {
      console.log("before change", currentSlide, nextSlide);
    },
    afterChange: handleAfterChange,
  };

  const slick_slider: SlickSettings = {
    dots: false,
    arrow: false,
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToScroll: 1,
    slidesToShow: 4,
    rows: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="site-main">
      <Header />

      <Banner />

      <section className="ttm-row about-section clearfix bg-theme-GreyColor">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-title">
                <div className="title-header">
                  <h3>
                    {t("whatIsThe")}{" "}
                    <span className="text-theme-SkinColor">COPA?</span>
                  </h3>
                  <h2 className="title">{t("aboutCopaTitle")}</h2>
                </div>
                <div className="title-desc">
                  <p>{t("aboutCopaDesc1")}</p>
                  <p>{t("aboutCopaDesc2")}</p>
                </div>
              </div>
              <Link
                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-dark"
                to="/"
              >
                {t("learnMore")}
              </Link>
            </div>
            <div className="col-lg-6 col-md-9 col-sm-10 col-12 mx-auto">
              <div className="mr-40 ml-20 pb-60">
                <div
                  className="d-flex justify-content-between"
                  style={{
                    backgroundImage: `url(${about1})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="pt-20 pr-20 bg-theme-WhiteColor ml_20 mb_60 mt-200">
                    <img src={about2} className="img-fluid" alt="bgimage" />
                  </div>
                  <div className="d-flex align-items-start h-100 mr_30 pt-40">
                    <div className="ttm-play-icon-btn p-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ttm-row about-section clearfix">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-8">
              <div className="section-title">
                <div className="title-header">
                  <h3>
                    {t("howDoesIt")}{" "}
                    <span className="text-theme-SkinColor">{t("works")}</span>
                  </h3>
                  <h2 className="title">{t("howItWorksTitle")}</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-4">
              <Link
                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-dark mb-15"
                to={"#"}
              >
                {t("discoverFullProcess")}
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="featuredbox-number pr-30 pr-lg-0 pb-lg-50 pt-md-20">
                <div className="featured-icon-box icon-align-before-content icon-ver_align-top style4">
                  <div className="featured-icon">
                    <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-grey ttm-icon_element-size-md ttm-icon_element-style-rounded">
                      <i className="ttm-num ti-info"></i>
                    </div>
                  </div>
                  <div className="featured-content ttm-bgcolor-grey">
                    <div className="featured-title">
                      <h3>{t("step1Title")}</h3>
                    </div>
                    <div className="featured-desc">
                      <p>{t("step1Desc")}</p>
                    </div>
                  </div>
                </div>

                <div className="featured-icon-box icon-align-before-content icon-ver_align-top style4">
                  <div className="featured-icon">
                    <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-grey ttm-icon_element-size-md ttm-icon_element-style-rounded">
                      <i className="ttm-num ti-info"></i>
                    </div>
                  </div>
                  <div className="featured-content ttm-bgcolor-grey">
                    <div className="featured-title">
                      <h3>{t("step2Title")}</h3>
                    </div>
                    <div className="featured-desc">
                      <p>{t("step2Desc")}</p>
                    </div>
                  </div>
                </div>

                <div className="featured-icon-box icon-align-before-content icon-ver_align-top style4">
                  <div className="featured-icon">
                    <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-grey ttm-icon_element-size-md ttm-icon_element-style-rounded">
                      <i className="ttm-num ti-info"></i>
                    </div>
                  </div>
                  <div className="featured-content ttm-bgcolor-grey">
                    <div className="featured-title">
                      <h3>{t("step3Title")}</h3>
                    </div>
                    <div className="featured-desc">
                      <p>{t("step3Desc")}</p>
                    </div>
                  </div>
                </div>

                <div className="featured-icon-box icon-align-before-content icon-ver_align-top style4">
                  <div className="featured-icon">
                    <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-grey ttm-icon_element-size-md ttm-icon_element-style-rounded">
                      <i className="ttm-num ti-info"></i>
                    </div>
                  </div>
                  <div className="featured-content ttm-bgcolor-grey">
                    <div className="featured-title">
                      <h3>{t("step4Title")}</h3>
                    </div>
                    <div className="featured-desc">
                      <p>{t("step4Desc")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-10 col-11 m-auto">
              <div className="bg-theme-GreyColor ttm-col-bgcolor-yes ttm-bg spacing-2 z-index_1">
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                <div className="layer-content"></div>
              </div>
              <div className="ttm_single_image-wrapper">
                <img className="img-fluid" src={fourStep} alt="single_03" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="ttm-row fid-section bg-img4 bg-theme-DarkColor ttm-bg ttm-bgimage-yes text-theme-WhiteColor clearfix"
        style={{
          backgroundImage: `url(${rowImage})`,
        }}
      >
        <div className="ttm-row-wrapper-bg-layer ttm-bg-layer bg-theme-DarkColor"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-8">
              <div className="section-title">
                <div className="title-header">
                  <h3>
                    {t("impactTitle")}{" "}
                    <span className="text-theme-SkinColor">
                      {t("impactSubtitle")}
                    </span>
                  </h3>
                  <h2 className="title">{t("impactDesc")}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="ttm-horizontal_sep width-100 pt-40 mt-lg-40"></div>
          <div className="row ttm-vertical_sep mt_lg-15">
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="ttm-fid inside ttm-fid-view-lefticon style3">
                <div className="ttm-fid-contents">
                  <h4>
                    <CountUp start={0} end={8705} duration={20} delay={2} />
                  </h4>
                  <h3 className="ttm-fid-title">{t("statsBusinesses")}</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="ttm-fid inside ttm-fid-view-lefticon style3">
                <div className="ttm-fid-contents">
                  <h4>
                    <CountUp start={0} end={480} duration={20} delay={2} />
                  </h4>
                  <h3 className="ttm-fid-title">{t("statsPlans")}</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="ttm-fid inside ttm-fid-view-lefticon style3">
                <div className="ttm-fid-contents">
                  <h4>
                    <CountUp start={0} end={6260} duration={20} delay={2} />
                  </h4>
                  <h3 className="ttm-fid-title">{t("statsGrants")}</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="ttm-fid inside ttm-fid-view-lefticon style3">
                <div className="ttm-fid-contents">
                  <h4>
                    <CountUp start={0} end={9774} duration={20} delay={2} />
                  </h4>
                  <h3 className="ttm-fid-title">{t("statsAmount")}</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="ttm-fid inside ttm-fid-view-lefticon style3">
                <div className="ttm-fid-contents">
                  <h4>
                    <CountUp start={0} end={80} duration={20} delay={2} />%
                  </h4>
                  <h3 className="ttm-fid-title">{t("statsWomen")}</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="ttm-fid inside ttm-fid-view-lefticon style3">
                <div className="ttm-fid-contents">
                  <h4>
                    <CountUp start={0} end={5936} duration={20} delay={2} />
                  </h4>
                  <h3 className="ttm-fid-title">{t("statsJobs")}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ttm-row client-section clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="section-title">
                <div className="title-header">
                  <h3>
                    {t("partnersTitle")}{" "}
                    <span className="text-theme-SkinColor">
                      {t("partnersHighlight")}
                    </span>
                  </h3>
                  <h2 className="title">{t("partnersDesc")}</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row g-0 ttm-vertical_sep mt-lg-50 d-flex align-items-center">
                <div className="col-sm-3">
                  <div className="client-box">
                    <div className="client-thumbnail">
                      <img className="img-fluid" src={brandLogo1} alt="image" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="client-box">
                    <div className="client-thumbnail">
                      <img className="img-fluid" src={brandLogo2} alt="image" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="client-box">
                    <div className="client-thumbnail">
                      <img className="img-fluid" src={brandLogo3} alt="image" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="client-box">
                    <div className="client-thumbnail">
                      <img className="img-fluid" src={brandLogo4} alt="image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ttm-row padding_zero-section bg-theme-DarkColor bg-layer-equal-height mb-100 mb-lg-0 clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="col-bg-img-four ttm-col-bgimage-yes ttm-bg mt-100 mt-lg-60 mr-30 mr-lg-0 border border-15 border-white p-15 h-100">
                <div
                  className="ttm-col-wrapper-bg-layer ttm-bg-layer"
                  style={{
                    backgroundImage: `url(${testimonial1})`,
                  }}
                ></div>
                <div className="layer-content"></div>
                <img
                  src="https://via.placeholder.com/560x505?text=560x505+col-bgimage-4.jpg"
                  className="img-fluid col-bg-img-res"
                  alt="bgimage"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="pt-140 pt-lg-50 pb-100 pb-lg-60">
                <div className="section-title">
                  <div className="title-header">
                    <h3>
                      {t("testimonialsTitle")}{" "}
                      <span className="text-theme-SkinColor">
                        {t("testimonialsHighlight")}
                      </span>
                    </h3>
                    <h2 className="title">{t("testimonialsDesc")}</h2>
                  </div>
                </div>
                <div className="position-relative">
                  <Slider
                    className="slick_slider slick-arrows-style3"
                    {...slick_slider}
                    slidesToShow={1}
                    arrows={true}
                    fade={true}
                    {...settings}
                  >
                    {sliderElements.map((element: SliderElement) => (
                      <div key={element.id}>
                        <p>{element.description}</p>
                      </div>
                    ))}
                  </Slider>
                  <div className="slick_slider_countable">
                    <span className="currentSlide">{currentSlide + 1}</span>
                    <span> / </span>
                    <span className="totalSlide">{sliderElements.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ttm-row blog-section bg-theme-GreyColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>
                    {t("blogTitle")}{" "}
                    <span className="text-theme-SkinColor">
                      {t("blogHighlight")}
                    </span>
                  </h3>
                  <h2 className="title">{t("blogDesc")}</h2>
                </div>
              </div>
            </div>
          </div>
          <Slider
            className="row slick_slider mb_10 slick-arrows-style1"
            {...slick_slider}
            slidesToShow={2}
            arrows={true}
            autoplay={false}
            responsive={[
              {
                breakpoint: 992,
                settings: { slidesToShow: 2, slidesToScroll: 2 },
              },
              {
                breakpoint: 576,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
              },
            ]}
          >
            <div className="col-md-12">
              <div className="featured-imagebox featured-imagebox-post style2">
                <div className="featured-thumbnail">
                  <img className="img-fluid" src={blog1} alt="blog-image" />
                  <div className="ttm-box-post-date">
                    <span className="ttm-entry-date">
                      <time
                        className="entry-date"
                        dateTime="2021-03-18T04:16:25+00:00"
                      >
                        {t("blogDate1")}
                      </time>
                    </span>
                  </div>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <Link to={"/blog_details"}>{t("blogTitle1")}</Link>
                    </h3>
                  </div>
                  <div className="post-meta">
                    <span className="ttm-meta-line byline">{t("admin")}</span>
                    <span className="ttm-meta-line category-link">
                      {t("business")}
                    </span>
                  </div>
                  <div className="featured-desc">
                    <p>{t("blogDesc1")}</p>
                  </div>
                  <Link
                    className="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-darkgrey"
                    to={"/blog_details"}
                  >
                    {t("blogReadMore")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="featured-imagebox featured-imagebox-post style2">
                <div className="featured-thumbnail">
                  <img className="img-fluid" src={blog2} alt="blog-image" />
                  <div className="ttm-box-post-date">
                    <span className="ttm-entry-date">
                      <time
                        className="entry-date"
                        dateTime="2021-04-18T04:16:25+00:00"
                      >
                        {t("blogDate2")}
                      </time>
                    </span>
                  </div>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <Link to={"/blog_details"}>{t("blogTitle2")}</Link>
                    </h3>
                  </div>
                  <div className="post-meta">
                    <span className="ttm-meta-line byline">{t("admin")}</span>
                    <span className="ttm-meta-line category-link">
                      {t("business")}
                    </span>
                  </div>
                  <div className="featured-desc">
                    <p>{t("blogDesc2")}</p>
                  </div>
                  <Link
                    className="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-darkgrey"
                    to={"/blog_details"}
                  >
                    {t("blogReadMore")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="featured-imagebox featured-imagebox-post style2">
                <div className="featured-thumbnail">
                  <img className="img-fluid" src={blog3} alt="blog-image" />
                  <div className="ttm-box-post-date">
                    <span className="ttm-entry-date">
                      <time
                        className="entry-date"
                        dateTime="2021-04-18T04:16:25+00:00"
                      >
                        {t("blogDate3")}
                      </time>
                    </span>
                  </div>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <Link to={"/blog_details"}>{t("blogTitle3")}</Link>
                    </h3>
                  </div>
                  <div className="post-meta">
                    <span className="ttm-meta-line byline">{t("admin")}</span>
                    <span className="ttm-meta-line category-link">
                      {t("business")}
                    </span>
                  </div>
                  <div className="featured-desc">
                    <p>{t("blogDesc3")}</p>
                  </div>
                  <Link
                    className="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-darkgrey"
                    to={"/blog_details"}
                  >
                    {t("blogReadMore")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="featured-imagebox featured-imagebox-post style2">
                <div className="featured-thumbnail">
                  <img className="img-fluid" src={blog4} alt="blog-image" />
                  <div className="ttm-box-post-date">
                    <span className="ttm-entry-date">
                      <time
                        className="entry-date"
                        dateTime="2021-04-18T04:16:25+00:00"
                      >
                        {t("blogDate4")}
                      </time>
                    </span>
                  </div>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <Link to={"/blog_details"}>{t("blogTitle4")}</Link>
                    </h3>
                  </div>
                  <div className="post-meta">
                    <span className="ttm-meta-line byline">{t("admin")}</span>
                    <span className="ttm-meta-line category-link">
                      {t("business")}
                    </span>
                  </div>
                  <div className="featured-desc">
                    <p>{t("blogDesc4")}</p>
                  </div>
                  <Link
                    className="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-darkgrey"
                    to={"/blog_details"}
                  >
                    {t("blogReadMore")}
                  </Link>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
