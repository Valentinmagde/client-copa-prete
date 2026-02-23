import React, { useState } from "react";
import Slider from "react-slick";
// import ProgressBar from "react-animated-progress-bar";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CountUp from "react-countup";
import Video from "../components/layout/Video";

// Define types for Slick slider settings
interface SlickSettings {
  dots?: boolean;
  arrow?: boolean;
  autoplay?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  rows?: number;
  responsive?: Array<{
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll: number;
    };
  }>;
  arrows?: boolean;
}

// Define state interface (though not strictly needed for useState)
interface AboutUsState {
  photoIndex: number;
  isOpen: boolean;
}

const AboutUs: React.FC = () => {
  const [photoIndex] = useState<number>(0);
  const [isOpen] = useState<boolean>(false);

  const slick_slider: SlickSettings = {
    dots: false,
    arrow: false,
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
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
        breakpoint: 778,
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

      {/* PageHeader */}
      <PageHeader title="about us" breadcrumb="about" />
      {/* PageHeader end */}

      {/* about-section */}
      <section className="ttm-row about-section clearfix">
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-6">
              {/* section title */}
              <div className="section-title">
                <div className="title-header">
                  <h3>
                    Great <span className="text-theme-SkinColor">Search! </span>
                  </h3>
                  <h2 className="title">
                    Help Organizations To Match Talent to Opportunity
                  </h2>
                </div>
                <div className="title-desc">
                  <p>
                    We give job searchers and IT experts the chance to track
                    down ideal a profession that guarantees long term
                    development and learning.
                  </p>
                </div>
              </div>
              {/* section title end */}
              <div className="ttm-tabs ttm-tab-style-01">
                <Tabs>
                  <TabList className="tabs">
                    <Tab className="tab">
                      <a className="tab-1" tabIndex={0}>
                        Our Mision
                      </a>
                    </Tab>
                    <Tab className="tab">
                      <a className="tab-2" tabIndex={0}>
                        Our Vision
                      </a>
                    </Tab>
                    <Tab className="tab">
                      <a className="tab-3" tabIndex={0}>
                        Core Values
                      </a>
                    </Tab>
                  </TabList>
                  <div className="content-tab">
                    <TabPanel>
                      <div className="row">
                        <div className="col-lg-4 col-md-3 col-sm-4">
                          <img
                            className="img-fluid alignleft"
                            height="200"
                            width="200"
                            src="https://via.placeholder.com/200x200?text=tab-img01-200x200.jpg"
                            alt="image"
                          />
                        </div>
                        <div className="col-lg-8 col-md-9 col-sm-8">
                          <div className="pt-15">
                            <p>
                              We adapt to the our clients changing needs as well
                              changes into the market to make sure growth of the
                              business, success and happiness
                            </p>
                            <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                              <li>
                                <i className="far fa-check-circle"></i>
                                <div className="ttm-list-li-content">
                                  An ability to attract and retain great talent
                                </div>
                              </li>
                              <li>
                                <i className="far fa-check-circle"></i>
                                <div className="ttm-list-li-content">
                                  A talent need, quickly and cost-effectively
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="row">
                        <div className="col-lg-4 col-md-3 col-sm-4">
                          <img
                            className="img-fluid alignleft"
                            height="200"
                            width="200"
                            src="https://via.placeholder.com/200x200?text=tab-img02-200x200.jpg"
                            alt="image"
                          />
                        </div>
                        <div className="col-lg-8 col-md-9 col-sm-8">
                          <div className="pt-15">
                            <p>
                              We adapt to the our clients changing needs as well
                              changes into the market to make sure growth of the
                              business, success and happiness
                            </p>
                            <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                              <li>
                                <i className="far fa-check-circle"></i>
                                <div className="ttm-list-li-content">
                                  An ability to attract and retain great talent
                                </div>
                              </li>
                              <li>
                                <i className="far fa-check-circle"></i>
                                <div className="ttm-list-li-content">
                                  A talent need, quickly and cost-effectively
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="row">
                        <div className="col-lg-4 col-md-3 col-sm-4">
                          <img
                            className="img-fluid alignleft"
                            height="200"
                            width="200"
                            src="https://via.placeholder.com/200x200?text=tab-img03-200x200.jpg"
                            alt="image"
                          />
                        </div>
                        <div className="col-lg-8 col-md-9 col-sm-8">
                          <div className="pt-15">
                            <p>
                              We adapt to the our clients changing needs as well
                              changes into the market to make sure growth of the
                              business, success and happiness
                            </p>
                            <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                              <li>
                                <i className="far fa-check-circle"></i>
                                <div className="ttm-list-li-content">
                                  An ability to attract and retain great talent
                                </div>
                              </li>
                              <li>
                                <i className="far fa-check-circle"></i>
                                <div className="ttm-list-li-content">
                                  A talent need, quickly and cost-effectively
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </div>
                </Tabs>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mr-30 mt-30 mt-lg-60 mb-lg-30">
                <div className="d-flex">
                  <img
                    src="https://via.placeholder.com/541x420?text=single-img-05-541x420.jpg"
                    className="img-fluid"
                    alt="single_05"
                  />
                  <div className="flex-basis-auto ml_180 mr_30 mt_30 z-index_1">
                    <img
                      src="images/dot-pattern.png"
                      className="img-fluid"
                      alt="dot-pattern"
                    />
                  </div>
                  <div className="d-flex justify-content-end flex-column ml_180 mr_30 mb_35 z-index_1">
                    <img
                      src="images/dot-pattern.png"
                      className="img-fluid"
                      alt="dot-pattern"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row end */}
        </div>
      </section>
      {/* about-section end */}

      {/* team-section */}
      <section className="ttm-row team-section bg-theme-GreyColor clearfix">
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-12">
              {/* section title */}
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>
                    Experts <span className="text-theme-SkinColor">team!</span>
                  </h3>
                  <h2 className="title">Our Talented Recruiters</h2>
                </div>
              </div>
              {/* section title end */}
            </div>
          </div>
          {/* row end */}
          {/* Slider */}
          <Slider
            className="row slick_slider mb_10"
            {...slick_slider}
            slidesToShow={4}
            arrows={false}
            autoplay={false}
          >
            <div className="col-md-12">
              {/* featured-imagebox */}
              <div className="featured-imagebox featured-imagebox-team style1">
                {/* featured-thumbnail */}
                <div className="featured-thumbnail">
                  <img
                    className="img-fluid"
                    src="https://via.placeholder.com/600x800?text=600x600+team-img01-600x800.jpg"
                    alt="team member"
                  />
                </div>
                {/* featured-thumbnail end */}
                <div className="featured-media ttm-media-link">
                  <div className="media-block">
                    <ul className="social-icons list-inline">
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="facebook"
                        >
                          <i className="ti ti-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="twitter"
                        >
                          <i className="ti ti-twitter-alt"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="google"
                        >
                          <i className="ti ti-google"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="linkedin"
                        >
                          <i className="ti ti-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <a href={import.meta.env.PUBLIC_URL + "/"}>Amelia Daniel</a>
                    </h3>
                  </div>
                  <div className="featured-desc">
                    <p>Engineer</p>
                  </div>
                </div>
              </div>
              {/* featured-imagebox end */}
            </div>
            <div className="col-md-12">
              {/* featured-imagebox */}
              <div className="featured-imagebox featured-imagebox-team style1">
                {/* featured-thumbnail */}
                <div className="featured-thumbnail">
                  <img
                    className="img-fluid"
                    src="https://via.placeholder.com/600x800?text=600x600+team-img02-600x800.jpg"
                    alt="team member"
                  />
                </div>
                {/* featured-thumbnail end */}
                <div className="featured-media ttm-media-link">
                  <div className="media-block">
                    <ul className="social-icons list-inline">
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="facebook"
                        >
                          <i className="ti ti-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="twitter"
                        >
                          <i className="ti ti-twitter-alt"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="google"
                        >
                          <i className="ti ti-google"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="linkedin"
                        >
                          <i className="ti ti-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <a href={import.meta.env.PUBLIC_URL + "/"}>Jennifer Garcia</a>
                    </h3>
                  </div>
                  <div className="featured-desc">
                    <p>Engineer</p>
                  </div>
                </div>
              </div>
              {/* featured-imagebox end */}
            </div>
            <div className="col-md-12">
              {/* featured-imagebox */}
              <div className="featured-imagebox featured-imagebox-team style1">
                {/* featured-thumbnail */}
                <div className="featured-thumbnail">
                  <img
                    className="img-fluid"
                    src="https://via.placeholder.com/600x800?text=600x600+team-img03-600x800.jpg"
                    alt="team member"
                  />
                </div>
                {/* featured-thumbnail end */}
                <div className="featured-media ttm-media-link">
                  <div className="media-block">
                    <ul className="social-icons list-inline">
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="facebook"
                        >
                          <i className="ti ti-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="twitter"
                        >
                          <i className="ti ti-twitter-alt"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="google"
                        >
                          <i className="ti ti-google"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="linkedin"
                        >
                          <i className="ti ti-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <a href={import.meta.env.PUBLIC_URL + "/"}>Harly Rayan</a>
                    </h3>
                  </div>
                  <div className="featured-desc">
                    <p>Engineer</p>
                  </div>
                </div>
              </div>
              {/* featured-imagebox end */}
            </div>
            <div className="col-md-12">
              {/* featured-imagebox */}
              <div className="featured-imagebox featured-imagebox-team style1">
                {/* featured-thumbnail */}
                <div className="featured-thumbnail">
                  <img
                    className="img-fluid"
                    src="https://via.placeholder.com/600x800?text=600x600+team-img04-600x800.jpg"
                    alt="team member"
                  />
                </div>
                {/* featured-thumbnail end */}
                <div className="featured-media ttm-media-link">
                  <div className="media-block">
                    <ul className="social-icons list-inline">
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="facebook"
                        >
                          <i className="ti ti-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="twitter"
                        >
                          <i className="ti ti-twitter-alt"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="google"
                        >
                          <i className="ti ti-google"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="linkedin"
                        >
                          <i className="ti ti-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <a href={import.meta.env.PUBLIC_URL + "/"}>Melika Fonals</a>
                    </h3>
                  </div>
                  <div className="featured-desc">
                    <p>Engineer</p>
                  </div>
                </div>
              </div>
              {/* featured-imagebox end */}
            </div>
            <div className="col-md-12">
              {/* featured-imagebox */}
              <div className="featured-imagebox featured-imagebox-team style1">
                {/* featured-thumbnail */}
                <div className="featured-thumbnail">
                  <img
                    className="img-fluid"
                    src="https://via.placeholder.com/600x800?text=600x600+team-img02-600x800.jpg"
                    alt="team member"
                  />
                </div>
                {/* featured-thumbnail end */}
                <div className="featured-media ttm-media-link">
                  <div className="media-block">
                    <ul className="social-icons list-inline">
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="facebook"
                        >
                          <i className="ti ti-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="twitter"
                        >
                          <i className="ti ti-twitter-alt"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="google"
                        >
                          <i className="ti ti-google"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="linkedin"
                        >
                          <i className="ti ti-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <a href={import.meta.env.PUBLIC_URL + "/"}>Jennifer Garcia</a>
                    </h3>
                  </div>
                  <div className="featured-desc">
                    <p>Engineer</p>
                  </div>
                </div>
              </div>
              {/* featured-imagebox end */}
            </div>
            <div className="col-md-12">
              {/* featured-imagebox */}
              <div className="featured-imagebox featured-imagebox-team style1">
                {/* featured-thumbnail */}
                <div className="featured-thumbnail">
                  <img
                    className="img-fluid"
                    src="https://via.placeholder.com/600x800?text=600x600+team-img04-600x800.jpg"
                    alt="team member"
                  />
                </div>
                {/* featured-thumbnail end */}
                <div className="featured-media ttm-media-link">
                  <div className="media-block">
                    <ul className="social-icons list-inline">
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="facebook"
                        >
                          <i className="ti ti-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="twitter"
                        >
                          <i className="ti ti-twitter-alt"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="google"
                        >
                          <i className="ti ti-google"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={import.meta.env.PUBLIC_URL + "/"}
                          rel="noopener noreferrer"
                          aria-label="linkedin"
                        >
                          <i className="ti ti-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <a href={import.meta.env.PUBLIC_URL + "/"}>Melika Fonals</a>
                    </h3>
                  </div>
                  <div className="featured-desc">
                    <p>Engineer</p>
                  </div>
                </div>
              </div>
              {/* featured-imagebox end */}
            </div>
          </Slider>
          {/* Slider end */}
        </div>
      </section>
      {/* team-section end */}

      {/* padding_bottom_zero-section */}
      <section
        className="ttm-row padding_bottom_zero-section bg-img6 bg-theme-DarkColor ttm-bg ttm-bgimage-yes text-theme-WhiteColor clearfix"
        style={{
          backgroundImage:
            'url("https://via.placeholder.com/1920x640?text=1920x640+row-bgimage-6.jpg")',
        }}
      >
        <div className="ttm-row-wrapper-bg-layer ttm-bg-layer bg-theme-DarkColor"></div>
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-12">
              <div className="pt-80 pt-md-30 text-center">
                <div className="ttm-play-icon-btn">
                  <div className="ttm-play-icon-animation">
                    <a href="#">
                      <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-white ttm-icon_element-size-md ttm-icon_element-style-rounded">
                        <Video className="fa fa-play text-theme-SkinColor" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6 col-md-7">
              <div className="d-flex pt-80 pt-md-80">
                <div className="p-15 w-100 bg-theme-SkinColor text-center">
                  {/* fid */}
                  <div className="ttm-fid inside ttm-fid-view-topicon">
                    <div className="ttm-fid-contents">
                      <h4>
                        <CountUp start={0} end={1458} duration={20} delay={2} />
                      </h4>
                      <h3 className="ttm-fid-title">Completed Projects</h3>
                    </div>
                  </div>
                  {/* fid end */}
                </div>
                <div className="p-15 w-100 bg-theme-DarkColor text-center">
                  {/* fid */}
                  <div className="ttm-fid inside ttm-fid-view-topicon">
                    <div className="ttm-fid-contents">
                      <h4>
                        <CountUp start={0} end={256} duration={20} delay={2} />{" "}
                        +
                      </h4>
                      <h3 className="ttm-fid-title">Working Hours!</h3>
                    </div>
                  </div>
                  {/* fid end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* padding_bottom_zero-section end */}

      {/* job-list-section */}
      <section className="ttm-row job-list-section ttm-bg clearfix">
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-12">
              {/* section title */}
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>
                    our <span className="text-theme-SkinColor">Story!</span>
                  </h3>
                  <h2 className="title">Know more about</h2>
                </div>
              </div>
              {/* section title end */}
            </div>
          </div>
          {/* row end */}
          {/* row */}
          <div className="row">
            <div className="col-lg-12">
              <div id="timeline-story" className="timeline-story-wrapper">
                {/* timeline */}
                <div className="timeline">
                  <div className="timeline-panel">
                    <div className="timeline-shape">
                      <span className="shape-circle"></span>
                      <span className="shape-image">
                        <img
                          className="img-fluid"
                          src="images/dotted_shape.png"
                          alt="dotted shape"
                        />
                      </span>
                    </div>
                    <div className="timeline-body">
                      <div className="timeline-date">AUG 15 2016</div>
                      <h3 className="title">An Establishment</h3>
                      <p>
                        We have started from the base in 1991 with the
                        enthusiastic nature as start-up firm...
                      </p>
                    </div>
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-shape">
                      <span className="shape-circle"></span>
                      <span className="shape-image">
                        <img
                          className="img-fluid"
                          src="images/dotted_shape.png"
                          alt="dotted shape"
                        />
                      </span>
                    </div>
                    <div className="timeline-body">
                      <div className="timeline-date">AUG 15 2016</div>
                      <h3 className="title">Team Collaboration</h3>
                      <p>
                        Recruitment process doesn't hinge on just one person, it
                        requires numerous people
                      </p>
                    </div>
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-shape">
                      <span className="shape-circle"></span>
                      <span className="shape-image">
                        <img
                          className="img-fluid"
                          src="images/dotted_shape.png"
                          alt="dotted shape"
                        />
                      </span>
                    </div>
                    <div className="timeline-body">
                      <div className="timeline-date">AUG 15 2016</div>
                      <h3 className="title">An Outsourcing Firm</h3>
                      <p>
                        Global firm was grappling with inability to hire
                        experienced executives great culture
                      </p>
                    </div>
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-shape">
                      <span className="shape-circle"></span>
                      <span className="shape-image">
                        <img
                          className="img-fluid"
                          src="images/dotted_shape.png"
                          alt="dotted shape"
                        />
                      </span>
                    </div>
                    <div className="timeline-body">
                      <div className="timeline-date">AUG 15 2016</div>
                      <h3 className="title">The Leading Group</h3>
                      <p>
                        Become leading the unique forum of exchange experiences
                        innovative solutions...
                      </p>
                    </div>
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-shape">
                      <span className="shape-circle"></span>
                      <span className="shape-image">
                        <img
                          className="img-fluid"
                          src="images/dotted_shape.png"
                          alt="dotted shape"
                        />
                      </span>
                    </div>
                    <div className="timeline-body">
                      <a
                        className="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-darkgrey ttm-icon-btn-right"
                        href={import.meta.env.PUBLIC_URL + "/"}
                      >
                        Read More<i className="ti ti-angle-double-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* timeline end */}
              </div>
            </div>
          </div>
          {/* row end */}
        </div>
      </section>
      {/* job-list end */}

      {/* padding_zero-section */}
      <section className="ttm-row padding_bottom_zero-section bg-layer-equal-height mt_30 mt_lg-60 clearfix">
        <div className="container p-0">
          <div className="row g-0">
            <div className="col-lg-8">
              <div className="ttm-bg ttm-bg ttm-col-bgimage-yes col-bg-img-five ttm-left-span spacing-3">
                <div
                  className="ttm-col-wrapper-bg-layer ttm-bg-layer"
                  style={{
                    backgroundImage: "url(images/bg-image/col-bgimage-5.jpg)",
                  }}
                >
                  <div className="ttm-col-wrapper-bg-layer-inner"></div>
                </div>
                <div className="layer-content">
                  {/* section title  */}
                  <div className="section-title">
                    <div className="title-header">
                      <h3>WHO WE ARE</h3>
                      <h2 className="title">
                        The Best Strategy To Get The Best Candidate...!
                      </h2>
                    </div>
                    <div className="title-desc">
                      <p>
                        We have developed our presence into many of the main
                        business branches in a region since then & today's
                        global professionals.
                      </p>
                    </div>
                  </div>
                  {/* section title end  */}
                  <div className="row g-0 d-inline-flex ttm-vertical_sep">
                    <div className="col">
                      <div className="d-inline-block pt-10 pb-10 pr-60 pr-md-30">
                        <img
                          className="img-fluid"
                          src="https://via.placeholder.com/170x120?text=award1-170x120.png"
                          alt="award1"
                        />
                        <div className="pt-20 text-center">
                          <h6>
                            Best Consulting <br /> Company
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-inline-block pt-10 pb-10 pl-60 pl-md-30">
                        <img
                          className="img-fluid"
                          src="https://via.placeholder.com/170x120?text=award1-170x120.png"
                          alt="award2"
                        />
                        <div className="pt-20 text-center">
                          <h6>
                            Best Consulting <br /> Company
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-20 pb-90 pb-lg-0">
                    <p>
                      We have won 27 more awards in our career.{" "}
                      <a href={import.meta.env.PUBLIC_URL + "/"}>
                        <b>
                          <u>View All Awards</u>
                        </b>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              {/* col-img-img-six */}
              <div className="ttm-bg ttm-col-bgimage-yes col-bg-img-six ttm-right-span z-index-2 ml_120 ml_lg-0">
                <div
                  className="ttm-col-wrapper-bg-layer ttm-bg-layer"
                  style={{
                    backgroundImage:
                      "url(https://via.placeholder.com/902x673?text=902x673+col-bgimage-6.jpg)",
                  }}
                ></div>
                <div className="layer-content"></div>
                <img
                  className="img-fluid col-bg-img-res"
                  src="https://via.placeholder.com/902x673?text=902x673+col-bgimage-6.jpg"
                  alt="bgimage"
                />
              </div>
              {/* col-img-bg-img-six end */}
            </div>
          </div>
          {/* row end */}
        </div>
      </section>
      {/* padding_zero-section end */}

      {/* testimonial-section */}
      <section className="ttm-row testimonial-section clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-11">
              {/* section title */}
              <div className="section-title style2">
                <div className="title-header">
                  <h3>Happy Clients</h3>
                  <h2 className="title">Listen Clients Stories</h2>
                </div>
                <div className="title-desc">
                  <p>
                    We have over{" "}
                    <span className="text-theme-SkinColor"> 30 years</span>{" "}
                    experience of Financial ,Marketing and Busness Solutions
                    expertise, our goal is to maxnci reputation and
                    financial.{" "}
                  </p>
                </div>
              </div>
              {/* section title end */}
            </div>
          </div>
          <Slider
            className="row slick_slider slick-arrows-style2"
            {...slick_slider}
            slidesToShow={3}
            arrows={true}
          >
            <div className="col-lg-12">
              {/* testimonials */}
              <div className="testimonials ttm-testimonial-box-view-style1">
                <div className="testimonial-content">
                  <blockquote className="testimonial-text">
                    It has always been so easy to do work with team member at
                    HireCo. It's an much effortless partnership.
                  </blockquote>
                  <div className="star-ratings">
                    <ul className="rating">
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="testimonial-bottom">
                  <div className="testimonial-avatar">
                    <div className="testimonial-img">
                      <img
                        className="img-fluid"
                        src="https://via.placeholder.com/150x150?text=150x150+01.jpg"
                        alt="testimonial-img"
                      />
                    </div>
                  </div>
                  <div className="testimonial-caption">
                    <label>Manager</label>
                    <h3>Alex Jhon Martin</h3>
                  </div>
                </div>
              </div>{" "}
              {/* testimonials end */}
            </div>
            <div className="col-lg-12">
              {/* testimonials */}
              <div className="testimonials ttm-testimonial-box-view-style1">
                <div className="testimonial-content">
                  <blockquote className="testimonial-text">
                    The national award-winning staffing agency that was built
                    with our trademarked tagline, Expect More, We Do.
                  </blockquote>
                  <div className="star-ratings">
                    <ul className="rating">
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="testimonial-bottom">
                  <div className="testimonial-avatar">
                    <div className="testimonial-img">
                      <img
                        className="img-fluid"
                        src="https://via.placeholder.com/150x150?text=150x150+02.jpg"
                        alt="testimonial-img"
                      />
                    </div>
                  </div>
                  <div className="testimonial-caption">
                    <label>Manager</label>
                    <h3>Michal Wincent</h3>
                  </div>
                </div>
              </div>{" "}
              {/* testimonials end */}
            </div>
            <div className="col-lg-12">
              {/* testimonials */}
              <div className="testimonials ttm-testimonial-box-view-style1">
                <div className="testimonial-content">
                  <blockquote className="testimonial-text">
                    This was my first experience working with a recruiter and it
                    has been amazing. I couldn't have asked for more{" "}
                  </blockquote>
                  <div className="star-ratings">
                    <ul className="rating">
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="testimonial-bottom">
                  <div className="testimonial-avatar">
                    <div className="testimonial-img">
                      <img
                        className="img-fluid"
                        src="https://via.placeholder.com/150x150?text=150x150+03.jpg"
                        alt="testimonial-img"
                      />
                    </div>
                  </div>
                  <div className="testimonial-caption">
                    <label>Manager</label>
                    <h3>Rayan Methew</h3>
                  </div>
                </div>
              </div>{" "}
              {/* testimonials end */}
            </div>
            <div className="col-lg-12">
              {/* testimonials */}
              <div className="testimonials ttm-testimonial-box-view-style1">
                <div className="testimonial-content">
                  <blockquote className="testimonial-text">
                    The national award-winning staffing agency that was built
                    with our trademarked tagline, Expect More, We Do.
                  </blockquote>
                  <div className="star-ratings">
                    <ul className="rating">
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="active">
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="testimonial-bottom">
                  <div className="testimonial-avatar">
                    <div className="testimonial-img">
                      <img
                        className="img-fluid"
                        src="https://via.placeholder.com/150x150?text=150x150+02.jpg"
                        alt="testimonial-img"
                      />
                    </div>
                  </div>
                  <div className="testimonial-caption">
                    <label>Manager</label>
                    <h3>Michal Wincent</h3>
                  </div>
                </div>
              </div>{" "}
              {/* testimonials end */}
            </div>
          </Slider>
        </div>
      </section>
      {/* testimonial-section end */}

      {/* contact-section */}
      <section className="ttm-row contact-section bg-theme-GreyColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* section-title */}
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>Contact us</h3>
                  <h2 className="title">Get In Touch With Us</h2>
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
                    src="https://via.placeholder.com/530x190?text=single-img-06-530x190.jpg"
                    alt="single_06"
                  />
                </div>
                <p className="mb-30">
                  Need help? We exist to serve the user with the purpose of
                  providing them with information. We want you to find what
                  you're looking for. For any query, please contact HireCo
                  experts for the best solution.
                </p>

                <div className="d-flex align-items-center">
                  <div
                    className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-sm 
                                    ttm-icon_element-style-round mb-0"
                  >
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="pl-15">
                    <h6 className="mb-5">Call Anytime</h6>
                    <p className="featured-desc mb-0">+1800 200 12345</p>
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
                    <h6 className="mb-5">Send Email</h6>
                    <p className="featured-desc mb-0">needhelp@company.com</p>
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
                    <h6 className="mb-5">Visit Office</h6>
                    <p className="featured-desc mb-0">
                      85 Sroklyn Random Street USA
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
                    <div className="row ttm-boxes-spacing-15px">
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
                            rows={9}
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
        </div>
      </section>
      {/* contact-section end */}

      {/* google_map */}
      <div id="google_map" className="google_map">
        <div className="map_container clearfix">
          <div id="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31910.482517672368!2d36.809513570685034!3d-1.287957978762343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1127cedf25db%3A0x30058f663edadad0!2sCity%20Square%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2sin!4v1626089823926!5m2!1sen!2sin"
              width="100%"
              height="450"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>
      </div>
      {/* google_map end */}

      {/* action-section */}
      <section className="ttm-row action-section bg-theme-SkinColor text-theme-WhiteColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-md-flex align-items-center justify-content-between">
                {/* featured-icon-box */}
                <div className="featured-icon-box icon-align-before-content style2">
                  <div className="featured-icon">
                    <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-white ttm-icon_element-size-xl">
                      <i className="flaticon flaticon-recruitment-5"></i>
                    </div>
                  </div>
                  <div className="featured-content">
                    <div className="featured-title">
                      <h3>Incredible Recruitment & Staffing Agency</h3>
                    </div>
                    <div className="featured-desc">
                      <p>
                        We have over 30 years experience oft Business porro
                        qusquam dol ipsum quia dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>
                {/* featured-icon-box end */}
                <a
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                  href={import.meta.env.PUBLIC_URL + "/"}
                >
                  Hiring Now!
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* action-section end */}

      <Footer />
    </div>
  );
};

export default AboutUs;
