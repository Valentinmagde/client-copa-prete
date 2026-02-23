import React, { useState, type JSX } from "react";
import Slider from "react-slick";
// import ProgressBar from "react-animated-progress-bar";
import Header from "../components/layout/Header";
import Banner from "../components/banner/Banner";
import Footer from "../components/layout/Footer";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CountUp from "react-countup";
// import Video from "../components/layout/Video";
// import blog1 from "../assets/img/blog/1.jpg";
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

const sliderElements: SliderElement[] = [
  {
    id: 1,
    description: (
      <div className="col-lg-12">
        {/* testimonials */}
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
              <label>Lauréate COPA 2026</label>
              <h3>Kaneza., Kayanza</h3>
            </div>
          </div>
          <div className="testimonial-content">
            <blockquote className="testimonial-text">
              Grâce au COPA, j'ai pu transformer mon petit commerce en une entreprise
              florissante. Les formations m'ont donné confiance et la subvention m'a
              permis d'acheter du matériel moderne. Aujourd'hui, j'emploie 5 personnes !"
            </blockquote>
          </div>
        </div>
        {/* testimonials end */}
      </div>
    ),
  },
  {
    id: 2,
    description: (
      <div className="col-lg-12">
        {/* testimonials */}
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
              <label>Lauréate COPA 2026</label>
              <h3>Jean Bosco Ndayishimiye</h3>
            </div>
          </div>
          <div className="testimonial-content">
            <blockquote className="testimonial-text">
              Avec l’appui du COPA, mon projet est passé d’une simple idée à une
              entreprise bien organisée. Les conseils reçus m’ont permis d’améliorer
              ma gestion et la subvention a facilité l’achat de matériel essentiel.
              Aujourd’hui, je fournis plusieurs clients réguliers et j’ai créé 4 emplois !
            </blockquote>
          </div>
        </div>
        {/* testimonials end */}
      </div>
    ),
  },
  {
    id: 3,
    description: (
      <div className="col-lg-12">
        {/* testimonials */}
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
              <label>Lauréate COPA 2026</label>
              <h3>Pacifique Ntahuga</h3>
            </div>
          </div>
          <div className="testimonial-content">
            <blockquote className="testimonial-text">
              Le soutien du COPA a été un véritable tournant pour mon entreprise.
              L’accompagnement m’a aidé à structurer ma gestion financière et la
              subvention m’a permis d’augmenter ma capacité de production.
              Aujourd’hui, mes ventes ont augmenté et j’ai créé 4 nouveaux emplois !
            </blockquote>
          </div>
        </div>
        {/* testimonials end */}
      </div>
    ),
  },
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [photoIndex] = useState<number>(0);
  const [isOpen] = useState<boolean>(false);

  const handleAfterChange = (index: number): void => {
    console.log("after change", index);
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

      {/* Banner */}
      <Banner />
      {/* Banner end */}

      {/* about-copa-section */}
      <section className="ttm-row about-section clearfix bg-theme-GreyColor">
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-6">
              {/* section title */}
              <div className="section-title">
                <div className="title-header">
                  <h3>
                    Qu'est-ce que
                    <span className="text-theme-SkinColor">le COPA?</span>
                  </h3>
                  <h2 className="title">
                    Un tremplin pour les entrepreneurs burundais
                  </h2>
                </div>
                <div className="title-desc">
                  <p>
                    Le Concours de Plans d'Affaires (COPA) est une initiative du
                    Projet pour l'Emploi et la Transformation Économique
                    (PRETE), financé par la Banque mondiale. Notre mission :
                    identifier, former et financer les micro, petites et
                    moyennes entreprises (MPME) les plus prometteuses du
                    Burundi.
                  </p>
                  <p>
                    Le COPA s'adresse à tous les entrepreneurs, avec une
                    attention particulière portée aux femmes entrepreneures et
                    aux réfugiés souhaitant développer une activité économique
                    au Burundi.
                  </p>
                </div>
              </div>
              {/* section title end */}
              {/* <div className="mb-35">
                <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor text-theme-DarkColor">
                  <li>
                    <i className="far fa-check-circle"></i>
                    <div className="ttm-list-li-content">
                      The most progressive and expert staffing arrangement
                      worldwide
                    </div>
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i>
                    <div className="ttm-list-li-content">
                      With over 2,000 offices & thousands of recruiters through
                      overseas
                    </div>
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i>
                    <div className="ttm-list-li-content">
                      Create personalized connections through the branded
                      experience
                    </div>
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i>
                    <div className="ttm-list-li-content">
                      We have 90% best strategies that get the best suitable
                      candidates
                    </div>
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i>
                    <div className="ttm-list-li-content">
                      All your recruitment process outsourcing with extreme
                      truthfulness
                    </div>
                  </li>
                  <li>
                    <i className="far fa-check-circle"></i>
                    <div className="ttm-list-li-content">
                      We have 90% best strategies that get the best suitable
                      candidates
                    </div>
                  </li>
                </ul>
              </div> */}
              <a
                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-dark"
                href={import.meta.env.PUBLIC_URL + "/"}
              >
                En savoir plus
              </a>
            </div>
            <div className="col-lg-6 col-md-9 col-sm-10 col-12 mx-auto">
              <div className="mr-40 ml-20 pb-60">
                <div
                  className="d-flex justify-content-between"
                  style={{
                    backgroundImage:
                      `url(${about1})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="pt-20 pr-20 bg-theme-WhiteColor ml_20 mb_60 mt-200">
                    <img
                      src={about2}
                      // height={200}
                      className="img-fluid"
                      alt="bgimage"
                    />
                  </div>
                  <div className="d-flex align-items-start h-100 mr_30 pt-40">
                    <div className="ttm-play-icon-btn p-20">
                      {/* <Video className="flaticon-play-button text-theme-WhiteColor" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* row end */}
        </div>
      </section>
      {/* about-copa-section end */}

      {/* four-step-section */}
      <section className="ttm-row about-section clearfix">
        <div className="container">
          {/* row */}
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-8">
              {/* section title */}
              <div className="section-title">
                <div className="title-header">
                  <h3>
                    Comment{" "}
                    <span className="text-theme-SkinColor"> ça marche?</span>
                  </h3>
                  <h2 className="title">4 étapes vers le succès</h2>
                </div>
              </div>
              {/* section title end */}
            </div>
            <div className="col-lg-6 col-md-4">
              <a
                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-dark mb-15"
                href={import.meta.env.PUBLIC_URL + "/"}
              >
                Découvrir le processus complet
              </a>
            </div>
            <div className="col-lg-6">
              <div className="featuredbox-number pr-30 pr-lg-0 pb-lg-50 pt-md-20">
                {/* featured-icon-box */}
                <div className="featured-icon-box icon-align-before-content icon-ver_align-top style4">
                  <div className="featured-icon">
                    <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-grey ttm-icon_element-size-md ttm-icon_element-style-rounded">
                      <i className="ttm-num ti-info"></i>
                    </div>
                  </div>
                  <div className="featured-content ttm-bgcolor-grey">
                    <div className="featured-title">
                      <h3>Inscrivez-vous</h3>
                    </div>
                    <div className="featured-desc">
                      <p>
                        Créez votre compte et complétez votre profil
                        d'entrepreneur en quelques minutes.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                {/* featured-icon-box end */}
                {/* featured-icon-box */}
                <div className="featured-icon-box icon-align-before-content icon-ver_align-top style4">
                  <div className="featured-icon">
                    <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-grey ttm-icon_element-size-md ttm-icon_element-style-rounded">
                      <i className="ttm-num ti-info"></i>
                    </div>
                  </div>
                  <div className="featured-content ttm-bgcolor-grey">
                    <div className="featured-title">
                      <h3>Formez-vous </h3>
                    </div>
                    <div className="featured-desc">
                      <p>
                        Suivez nos formations gratuites pour acquérir les
                        compétences nécessaires à la rédaction d'un plan
                        d'affaires solide.
                      </p>
                    </div>
                  </div>
                </div>
                {/* featured-icon-box end */}
                {/* featured-icon-box */}
                <div className="featured-icon-box icon-align-before-content icon-ver_align-top style4">
                  <div className="featured-icon">
                    <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-grey ttm-icon_element-size-md ttm-icon_element-style-rounded">
                      <i className="ttm-num ti-info"></i>
                    </div>
                  </div>
                  <div className="featured-content ttm-bgcolor-grey">
                    <div className="featured-title">
                      <h3>Soumettez votre plan</h3>
                    </div>
                    <div className="featured-desc">
                      <p>
                        Rédigez et déposez votre plan d'affaires avant la date
                        limite. Nos experts l'évalueront de manière
                        transparente.
                      </p>
                    </div>
                  </div>
                </div>
                {/* featured-icon-box end */}
                {/* featured-icon-box */}
                <div className="featured-icon-box icon-align-before-content icon-ver_align-top style4">
                  <div className="featured-icon">
                    <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-grey ttm-icon_element-size-md ttm-icon_element-style-rounded">
                      <i className="ttm-num ti-info"></i>
                    </div>
                  </div>
                  <div className="featured-content ttm-bgcolor-grey">
                    <div className="featured-title">
                      <h3>Recevez votre subvention </h3>
                    </div>
                    <div className="featured-desc">
                      <p>
                        Si vous êtes sélectionné, bénéficiez d'une subvention de
                        contrepartie et d'un accompagnement personnalisé pour
                        lancer votre projet.
                      </p>
                    </div>
                  </div>
                </div>
                {/* featured-icon-box end */}
              </div>
            </div>
            <div className="col-lg-6 col-md-10 col-11 m-auto">
              <div className="bg-theme-GreyColor ttm-col-bgcolor-yes ttm-bg spacing-2 z-index_1">
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                <div className="layer-content"></div>
              </div>
              {/* ttm_single_image-wrapper */}
              <div className="ttm_single_image-wrapper">
                <img
                  className="img-fluid"
                  src={fourStep}
                  alt="single_03"
                />
              </div>
              {/* ttm_single_image-wrapper */}
            </div>
          </div>
          {/* row end */}
        </div>
      </section>
      {/* four-step-section end */}

      {/* fid-section */}
      <section
        className="ttm-row fid-section bg-img4 bg-theme-DarkColor ttm-bg ttm-bgimage-yes text-theme-WhiteColor clearfix"
        style={{
          backgroundImage:
            `url(${rowImage})`,
        }}
      >
        <div className="ttm-row-wrapper-bg-layer ttm-bg-layer bg-theme-DarkColor"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-8">
              {/* section title */}
              <div className="section-title">
                <div className="title-header">
                  <h3>
                    L’impact du COPA{" "}
                    <span className="text-theme-SkinColor">en chiffres</span>
                  </h3>
                  <h2 className="title">
                    MPME soutenues, financements accordés et emplois créés.
                  </h2>
                </div>
              </div>
              {/* section title end */}
            </div>
            {/* <div className="col-lg-4 col-md-4">
              <div className="d-flex align-items-center justify-content-md-end">
                <h6 className="font-weight-bold mb-0 mr-15">Watch Video!</h6>
                <a className=" d-flex" href="#">
                  <span className="mb-0 p-10 ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-xs ttm-icon_element-style-rounded margin_right10 margin_bottom0">
                    <Video className="fa fa-play" />
                  </span>
                </a>
              </div>
            </div> */}
          </div>
          <div className="ttm-horizontal_sep width-100 pt-40 mt-lg-40"></div>
          {/* row */}
          <div className="row ttm-vertical_sep mt_lg-15">
            <div className="col-lg-2 col-md-6 col-sm-6">
              {/* fid */}
              <div className="ttm-fid inside ttm-fid-view-lefticon style3">
                {/* <div className="ttm-fid-icon-wrapper">
                  <i className="flaticon flaticon-headhunting"></i>
                </div> */}
                <div className="ttm-fid-contents">
                  <h4>
                    <CountUp start={0} end={8705} duration={20} delay={2} />
                  </h4>
                  <h3 className="ttm-fid-title">MPME inscrites</h3>
                </div>
              </div>
              {/* fid end */}
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              {/* fid */}
              <div className="ttm-fid inside ttm-fid-view-lefticon style3">
                {/* <div className="ttm-fid-icon-wrapper">
                  <i className="flaticon flaticon-technical-support"></i>
                </div> */}
                <div className="ttm-fid-contents">
                  <h4>
                    <CountUp start={0} end={480} duration={20} delay={2} />
                  </h4>
                  <h3 className="ttm-fid-title">Plans d'affaires soumis</h3>
                </div>
              </div>
              {/* fid end */}
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              {/* fid */}
              <div className="ttm-fid inside ttm-fid-view-lefticon style3">
                {/* <div className="ttm-fid-icon-wrapper">
                  <i className="flaticon flaticon-recruitment-4"></i>
                </div> */}
                <div className="ttm-fid-contents">
                  <h4>
                    <CountUp start={0} end={6260} duration={20} delay={2} />
                  </h4>
                  <h3 className="ttm-fid-title">Subventions accordées</h3>
                </div>
              </div>
              {/* fid end */}
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              {/* fid */}
              <div className="ttm-fid inside ttm-fid-view-lefticon style3">
                {/* <div className="ttm-fid-icon-wrapper">
                  <i className="flaticon flaticon-recruitment-3"></i>
                </div> */}
                <div className="ttm-fid-contents">
                  <h4>
                    <CountUp start={0} end={9774} duration={20} delay={2} />
                  </h4>
                  <h3 className="ttm-fid-title">BIF de subventions décaissées</h3>
                </div>
              </div>
              {/* fid end */}
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              {/* fid */}
              <div className="ttm-fid inside ttm-fid-view-lefticon style3">
                {/* <div className="ttm-fid-icon-wrapper">
                  <i className="flaticon flaticon-recruitment-3"></i>
                </div> */}
                <div className="ttm-fid-contents">
                  <h4>
                    <CountUp start={0} end={80} duration={20} delay={2} />%
                  </h4>
                  <h3 className="ttm-fid-title">de femmes entrepreneures</h3>
                </div>
              </div>
              {/* fid end */}
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              {/* fid */}
              <div className="ttm-fid inside ttm-fid-view-lefticon style3">
                {/* <div className="ttm-fid-icon-wrapper">
                  <i className="flaticon flaticon-recruitment-3"></i>
                </div> */}
                <div className="ttm-fid-contents">
                  <h4>
                    <CountUp start={0} end={5936} duration={20} delay={2} />
                  </h4>
                  <h3 className="ttm-fid-title">emplois créés</h3>
                </div>
              </div>
              {/* fid end */}
            </div>
          </div>
          {/* row end */}
        </div>
      </section>
      {/* fid-section end */}

{/* client-section */}
      <section className="ttm-row client-section clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              {/* section-title */}
              <div className="section-title">
                <div className="title-header">
                  <h3>
                    Nos <span className="text-theme-SkinColor">Partenaires</span>
                  </h3>
                  <h2 className="title">Partenariats avec des donateurs</h2>
                </div>
              </div>
              {/* section-title end */}
              {/* <a
                className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-dark"
                href={import.meta.env.PUBLIC_URL + "/"}
              >
                Explore More Companies
              </a> */}
            </div>
            <div className="col-lg-8">
              <div className="row g-0 ttm-vertical_sep mt-lg-50 d-flex align-items-center">
                <div className="col-sm-3">
                  <div className="client-box">
                    <div className="client-thumbnail">
                      <img
                        className="img-fluid"
                        src={brandLogo1}
                        alt="image"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="client-box">
                    <div className="client-thumbnail">
                      <img
                        className="img-fluid"
                        src={brandLogo2}
                        alt="image"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="client-box">
                    <div className="client-thumbnail">
                      <img
                        className="img-fluid"
                        src={brandLogo3}
                        alt="image"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="client-box">
                    <div className="client-thumbnail">
                      <img
                        className="img-fluid"
                        src={brandLogo4}
                        alt="image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* client-section end */}

      {/* padding_zero-section */}
      <section className="ttm-row padding_zero-section bg-theme-DarkColor bg-layer-equal-height mb-100 mb-lg-0 clearfix">
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-6">
              {/* col-img-img-four */}
              <div
                className="col-bg-img-four ttm-col-bgimage-yes ttm-bg mt-100 mt-lg-60 mr-30 mr-lg-0 border border-15
                            border-white p-15 h-100"
              >
                <div
                  className="ttm-col-wrapper-bg-layer ttm-bg-layer"
                  style={{
                    backgroundImage:
                      `url(${testimonial1})`,
                  }}
                ></div>
                <div className="layer-content"></div>
                <img
                  src="https://via.placeholder.com/560x505?text=560x505+col-bgimage-4.jpg"
                  className="img-fluid col-bg-img-res"
                  alt="bgimage"
                />
              </div>
              {/* col-img-bg-img-four end */}
            </div>
            <div className="col-lg-6">
              <div className="pt-140 pt-lg-50 pb-100 pb-lg-60">
                {/* section title */}
                <div className="section-title">
                  <div className="title-header">
                    <h3>
                      MPME{" "}
                      <span className="text-theme-SkinColor">Satisfaits</span>
                    </h3>
                    <h2 className="title">Ils ont réussi avec le COPA</h2>
                  </div>
                </div>
                {/* section title end */}
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
      {/* padding_zero-section end */}

      {/* blog-section */}
      <section className="ttm-row blog-section bg-theme-GreyColor clearfix">
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-12">
              {/* section title */}
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>
                    Approfondir{" "}
                    <span className="text-theme-SkinColor">ses connaissances</span>
                  </h3>
                  <h2 className="title">Dernières nouvelles </h2>
                </div>
              </div>
              {/* section title end */}
            </div>
          </div>
          {/* row end */}
          {/* Slider */}
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
              {/* featured-imagebox-post */}
              <div className="featured-imagebox featured-imagebox-post style2">
                {/* featured-thumbnail */}
                <div className="featured-thumbnail">
                  <img
                    className="img-fluid"
                    src={blog1}
                    alt="blog-image"
                  />
                  <div className="ttm-box-post-date">
                    <span className="ttm-entry-date">
                      <time
                        className="entry-date"
                        dateTime="2021-03-18T04:16:25+00:00"
                      >
                        18 Mar 2020
                      </time>
                    </span>
                  </div>
                </div>
                {/* featured-thumbnail end */}
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        Vos réunions sont-elles ennuyeuses ? Essayez ces 10 conseils
                      </a>
                    </h3>
                  </div>
                  <div className="post-meta">
                    <span className="ttm-meta-line byline">Admin</span>
                    <span className="ttm-meta-line category-link">
                      business
                    </span>
                  </div>
                  <div className="featured-desc">
                    <p>
                      Quoi que vous fassiez en matière de planification ou d'animation, l'objectif doit être axé sur le soutien.
                    </p>
                  </div>
                  <a
                    className="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-darkgrey"
                    href={import.meta.env.PUBLIC_URL + "/blog_details"}
                  >
                    Lire la suite!
                  </a>
                </div>
              </div>
              {/* featured-imagebox-post end */}
            </div>
            <div className="col-md-12">
              {/* featured-imagebox-post */}
              <div className="featured-imagebox featured-imagebox-post style2">
                {/* featured-thumbnail */}
                <div className="featured-thumbnail">
                  <img
                    className="img-fluid"
                    src={blog2}
                    alt="blog-image"
                  />
                  <div className="ttm-box-post-date">
                    <span className="ttm-entry-date">
                      <time
                        className="entry-date"
                        dateTime="2021-04-18T04:16:25+00:00"
                      >
                        18 Apr 2020
                      </time>
                    </span>
                  </div>
                </div>
                {/* featured-thumbnail end */}
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        Vous déménagez votre entreprise dans un autre État ?
                      </a>
                    </h3>
                  </div>
                  <div className="post-meta">
                    <span className="ttm-meta-line byline">Admin</span>
                    <span className="ttm-meta-line category-link">
                      business
                    </span>
                  </div>
                  <div className="featured-desc">
                    <p>
                      Un chef d'entreprise doit prendre en compte des questions qui vont au-delà du simple choix d'un déménagement !
                    </p>
                  </div>
                  <a
                    className="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-darkgrey"
                    href={import.meta.env.PUBLIC_URL + "/blog_details"}
                  >
                    Lire la suite!
                  </a>
                </div>
              </div>
              {/* featured-imagebox-post end */}
            </div>
            <div className="col-md-12">
              {/* featured-imagebox-post */}
              <div className="featured-imagebox featured-imagebox-post style2">
                {/* featured-thumbnail */}
                <div className="featured-thumbnail">
                  <img
                    className="img-fluid"
                    src={blog3}
                    alt="blog-image"
                  />
                  <div className="ttm-box-post-date">
                    <span className="ttm-entry-date">
                      <time
                        className="entry-date"
                        dateTime="2021-04-18T04:16:25+00:00"
                      >
                        18 Apr 2020
                      </time>
                    </span>
                  </div>
                </div>
                {/* featured-thumbnail end */}
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        La honte : a-t-elle sa place au travail ?
                      </a>
                    </h3>
                  </div>
                  <div className="post-meta">
                    <span className="ttm-meta-line byline">Admin</span>
                    <span className="ttm-meta-line category-link">
                      business
                    </span>
                  </div>
                  <div className="featured-desc">
                    <p>
                      Cela peut être inné ou externe, et les résultats peuvent être toute fois surprenants...
                    </p>
                  </div>
                  <a
                    className="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-darkgrey"
                    href={import.meta.env.PUBLIC_URL + "/blog_details"}
                  >
                    Lire la suite!
                  </a>
                </div>
              </div>
              {/* featured-imagebox-post end */}
            </div>
            <div className="col-md-12">
              {/* featured-imagebox-post */}
              <div className="featured-imagebox featured-imagebox-post style2">
                {/* featured-thumbnail */}
                <div className="featured-thumbnail">
                  <img
                    className="img-fluid"
                    src={blog4}
                    alt="blog-image"
                  />
                  <div className="ttm-box-post-date">
                    <span className="ttm-entry-date">
                      <time
                        className="entry-date"
                        dateTime="2021-04-18T04:16:25+00:00"
                      >
                        18 Apr 2020
                      </time>
                    </span>
                  </div>
                </div>
                {/* featured-thumbnail end */}
                <div className="featured-content">
                  <div className="featured-title">
                    <h3>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        Comment gérer la négativité chez les anciens ?
                      </a>
                    </h3>
                  </div>
                  <div className="post-meta">
                    <span className="ttm-meta-line byline">Admin</span>
                    <span className="ttm-meta-line category-link">
                      business
                    </span>
                  </div>
                  <div className="featured-desc">
                    <p>
                      Quoi que vous fassiez en matière de planification ou d'animation, l'objectif doit être axé sur le soutien.
                    </p>
                  </div>
                  <a
                    className="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-darkgrey"
                    href={import.meta.env.PUBLIC_URL + "/blog_details"}
                  >
                    Lire la suite!
                  </a>
                </div>
              </div>
              {/* featured-imagebox-post end */}
            </div>
          </Slider>
          {/* Slider end */}
        </div>
      </section>
      {/* blog-section end */}

      <Footer />
    </div>
  );
};

export default Home;
