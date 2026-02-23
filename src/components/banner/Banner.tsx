import React from "react";
import Slider from "react-slick";
import slide1 from "../../assets/img/slider/04.png";
import { Link } from "react-router-dom";

// Define props interface (empty but can be extended)
interface BannerProps {}

// Define Slick slider settings interface
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
}

const Banner: React.FC<BannerProps> = () => {
  const slick_slider: SlickSettings = {
    dots: false,
    arrow: false,
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,

    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
    <Slider
      className="slick_slider banner_slider banner_slider_2"
      {...slick_slider}
      slidesToShow={1}
      autoplay={false}
    >
      <div className="slide">
        <div
          className="slide_img"
          style={{
            backgroundImage: `url(${slide1})`,
          }}
        ></div>
        <div className="slide__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="slide__content--headings ttm-textcolor-white text-center">
                  {/* <h3 data-animation="animate__fadeInDown">
                    Empowering, Inspiring, Rising.
                  </h3> */}
                  <div className="d-flex align-items-center justify-content-center">
                    <h2 data-animation="animate__fadeInDown">
                      COPA – Concours de Plans d'Affaires
                    </h2>
                  </div>
                  <div className="mt-20 mb-40 mb-md-15">
                    <div className="row">
                      <div className="col-xl-7 col-lg-8 col-md-10 mx-auto">
                        <p
                          data-animation="animate__fadeInDown"
                          className="d-none d-md-block"
                        >
                          Transformez votre idée en entreprise prospère. Le COPA
                          accompagne les MPME burundaises avec des formations,
                          un accompagnement personnalisé et des subventions pour
                          concrétiser vos ambitions.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div data-animation="animate__fadeInUp" data-delay="1.4">
                    <Link
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor me-3"
                      to="/register"
                    >
                      Participez au COPA
                    </Link>
                    <Link
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                      to="/contact_01"
                    >
                      En savoir plus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="slide">
        <div
          className="slide_img"
          style={{
            backgroundImage: `url(${slide1})`,
          }}
        ></div>
        <div className="slide__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="slide__content--headings ttm-textcolor-white text-center">
                  {/* <h3 data-animation="animate__fadeInDown">
                    Empowering, Inspiring, Rising.
                  </h3> */}
                  <div className="d-flex align-items-center justify-content-center">
                    <h2 data-animation="animate__fadeInDown">
                      COPA – Concours de Plans d'Affaires
                    </h2>
                  </div>
                  <div className="mt-20 mb-40 mb-md-15">
                    <div className="row">
                      <div className="col-xl-7 col-lg-8 col-md-10 mx-auto">
                        <p
                          data-animation="animate__fadeInDown"
                          className="d-none d-md-block"
                        >
                          Transformez votre idée en entreprise prospère. Le COPA
                          accompagne les MPME burundaises avec des formations,
                          un accompagnement personnalisé et des subventions pour
                          concrétiser vos ambitions.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div data-animation="animate__fadeInUp" data-delay="1.4">
                    <Link
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor me-3"
                      to="/register"
                    >
                      Participez au COPA
                    </Link>
                    <Link
                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                      to="/contact_01"
                    >
                      En savoir plus
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Banner;
