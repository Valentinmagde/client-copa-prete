import React from "react";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import BlogImg from "../assets/img/blog/01.jpg";

// Define props interface (empty but can be extended)
interface BlogProps {}

const Blog: React.FC<BlogProps> = () => {
  return (
    <div className="site-main">
      <Header />

      {/* PageHeader */}
      <PageHeader title="Actualités" breadcrumb="Actualités" />
      {/* PageHeader end */}

      <div className="ttm-row sidebar ttm-sidebar clearfix">
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-8 content-area">
              {/* post */}
              <article className="post ttm-blog-classic clearfix">
                {/* post-featured-wrapper */}
                <div className="ttm-post-featured-wrapper ttm-featured-wrapper">
                  <div className="ttm-post-featured">
                    <img
                      className="img-fluid"
                      src={BlogImg}
                      alt="image-blog"
                    />
                    <div className="ttm-box-post-date">
                      <span className="ttm-entry-date">
                        <time className="entry-date">18 Mars 2020</time>
                      </span>
                    </div>
                  </div>
                </div>
                {/* post-featured-wrapper end */}
                {/* ttm-blog-classic-content */}
                <div className="ttm-blog-classic-content">
                  <div className="ttm-post-entry-header">
                    <div className="post-meta">
                      <span className="ttm-meta-line category">
                        <i className="ti ti-folder"></i>Affaires
                      </span>
                      <span className="ttm-meta-line byline">
                        <i className="ti ti-user"></i>Jean Dupont
                      </span>
                      <span className="ttm-meta-line tags-links">
                        <i className="far fa-comments"></i>0 Commentaires
                      </span>
                    </div>
                    <header className="entry-header">
                      <h2 className="entry-title">
                        <a href={"/blog-details"}>
                          Comment les enquêteurs utilisent leurs compétences
                          au-delà du travail
                        </a>
                      </h2>
                    </header>
                  </div>
                  <div className="entry-content">
                    <div className="ttm-box-desc-text">
                      <p>
                        Si vous êtes curieux de savoir comment vous pourriez
                        autrement vous aider ou aider les autres avec des
                        compétences de recherche en dehors des travaux normaux
                        liés aux besoins et aux pipelines, vos collègues ont
                        récemment reçu une inspiration ingénieuse. C'était la
                        troisième personne qui a pu lui poser une question !
                      </p>
                    </div>
                    <div className="ttm-blogbox-footer-readmore">
                      <a
                        className="ttm-btn ttm-btn-size-md btn-inline ttm-btn-color-dark"
                        href={"/blog-details"}
                      >
                        Lire la suite
                        <i className="fa fa-angle-double-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* ttm-blog-classic-content end */}
              </article>
              {/* post end */}

              {/* post */}
              <article className="post ttm-blog-classic clearfix">
                {/* post-featured-wrapper */}
                <div className="ttm-post-featured-wrapper ttm-featured-wrapper">
                  <div className="ttm-post-featured">
                    <img
                      className="img-fluid"
                      src={BlogImg}
                      alt="image-blog"
                    />
                    <div className="ttm-box-post-date">
                      <span className="ttm-entry-date">
                        <time className="entry-date">18 Mars 2020</time>
                      </span>
                    </div>
                  </div>
                </div>
                {/* post-featured-wrapper end */}
                {/* ttm-blog-classic-content */}
                <div className="ttm-blog-classic-content">
                  <div className="ttm-post-entry-header">
                    <div className="post-meta">
                      <span className="ttm-meta-line category">
                        <i className="ti ti-folder"></i>Affaires
                      </span>
                      <span className="ttm-meta-line byline">
                        <i className="ti ti-user"></i>Jean Dupont
                      </span>
                      <span className="ttm-meta-line tags-links">
                        <i className="far fa-comments"></i>0 Commentaires
                      </span>
                    </div>
                    <header className="entry-header">
                      <h2 className="entry-title">
                        <a href={"/blog-details"}>
                          Créez votre propre fil d'actualités compétitif
                          gratuitement
                        </a>
                      </h2>
                    </header>
                  </div>
                  <div className="entry-content">
                    <div className="ttm-box-desc-text">
                      <p>
                        Microsoft Outlook et diverses applications de lecture de
                        flux dédiées existent, et il existe même des logiciels
                        d'intelligence concurrentielle payants, mais que faire
                        si vous vouliez un référentiel central gratuit construit
                        au fil du temps et pouvant être partagé avec certains
                        collègues ? Les changements de personnel valent la peine
                        pour la recherche de talents.
                      </p>
                    </div>
                    <div className="ttm-blogbox-footer-readmore">
                      <a
                        className="ttm-btn ttm-btn-size-md btn-inline ttm-btn-color-dark"
                        href={"/blog-details"}
                      >
                        Lire la suite
                        <i className="fa fa-angle-double-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* ttm-blog-classic-content end */}
              </article>
              {/* post end */}

              {/* post */}
              <article className="post ttm-blog-classic clearfix">
                {/* post-featured-wrapper */}
                <div className="ttm-post-featured-wrapper ttm-featured-wrapper">
                  <div className="ttm-post-featured">
                    <img
                      className="img-fluid"
                      src={BlogImg}
                      alt="image-blog"
                    />
                    <div className="ttm-box-post-date">
                      <span className="ttm-entry-date">
                        <time className="entry-date">18 Mars 2020</time>
                      </span>
                    </div>
                  </div>
                </div>
                {/* post-featured-wrapper end */}
                {/* ttm-blog-classic-content */}
                <div className="ttm-blog-classic-content">
                  <div className="ttm-post-entry-header">
                    <div className="post-meta">
                      <span className="ttm-meta-line category">
                        <i className="ti ti-folder"></i>Affaires
                      </span>
                      <span className="ttm-meta-line byline">
                        <i className="ti ti-user"></i>Jean Dupont
                      </span>
                      <span className="ttm-meta-line tags-links">
                        <i className="far fa-comments"></i>0 Commentaires
                      </span>
                    </div>
                    <header className="entry-header">
                      <h2 className="entry-title">
                        <a href={"/blog-details"}>
                          Rapport 2021 sur les tendances du recrutement à
                          distance
                        </a>
                      </h2>
                    </header>
                  </div>
                  <div className="entry-content">
                    <div className="ttm-box-desc-text">
                      <p>
                        80 % des responsables RH mondiaux révèlent que leur
                        processus d'entretien et d'embauche est désormais
                        entièrement à distance. Découvrez plus de tendances et
                        d'informations exploitables dans ce rapport pour
                        apprendre comment investir dans un meilleur processus de
                        recrutement à distance aujourd'hui. Le monde reçoit plus
                        de 140 millions de visiteurs uniques par mois.
                      </p>
                    </div>
                    <div className="ttm-blogbox-footer-readmore">
                      <a
                        className="ttm-btn ttm-btn-size-md btn-inline ttm-btn-color-dark"
                        href={"/blog-details"}
                      >
                        Lire la suite
                        <i className="fa fa-angle-double-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* ttm-blog-classic-content end */}
              </article>
              {/* post end */}

              <div className="pagination-block">
                <span className="page-numbers current">1</span>
                <a className="page-numbers" href="#">
                  2
                </a>
                <a className="next page-numbers" href="#">
                  <i className="ti ti-arrow-right"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-4 widget-area">
              <div className="sidebar-right">
                <aside className="widget widget-search">
                  <form role="search" className="search-form">
                    <label>
                      <span className="screen-reader-text">Rechercher :</span>
                      <input
                        type="search"
                        className="input-text"
                        placeholder="Votre mot-clé...."
                        value=""
                        onChange={() => {}}
                      />
                    </label>
                    <button className="btn" type="submit">
                      <i className="fa fa-search"></i>{" "}
                    </button>
                  </form>
                </aside>

                <aside className="widget widget-Categories with-title">
                  <h3 className="widget-title">Catégories</h3>
                  <ul>
                    <li>
                      <a href={"/blog-details"}>Marketing Digital</a>
                    </li>
                    <li>
                      <a href={"/blog-details"}>
                        Optimisation pour les moteurs de recherche
                      </a>
                    </li>
                    <li>
                      <a href={"/blog-details"}>Conception UI/UX</a>
                    </li>
                    <li>
                      <a href={"/blog-details"}>Développement Web</a>
                    </li>
                    <li>
                      <a href={"/blog-details"}>Marketing Digital</a>
                    </li>
                    <li>
                      <a href={"/blog-details"}>Investissement</a>
                    </li>
                  </ul>
                </aside>

                <aside className="widget widget-recent-post with-title">
                  <h3 className="widget-title">Articles Récents</h3>
                  <ul>
                    <li>
                      <a href={"/blog-details"}>
                        <img
                          className="img-fluid"
                          src={BlogImg}
                          alt="image-post"
                        />
                      </a>
                      <div className="post-detail">
                        <a href={"/blog-details"}>
                          Comment les enquêteurs utilisent leurs compétences
                        </a>
                        <span className="post-date">10 Octobre 2020</span>
                      </div>
                    </li>
                    <li>
                      <a href={"/blog-details"}>
                        <img
                          className="img-fluid"
                          src={BlogImg}
                          alt="image-post"
                        />
                      </a>
                      <div className="post-detail">
                        <a href={"/blog-details"}>
                          Créez votre propre fil d'actualités compétitif
                        </a>
                        <span className="post-date">10 Octobre 2020</span>
                      </div>
                    </li>
                    <li>
                      <a href={"/blog-details"}>
                        <img
                          className="img-fluid"
                          src={BlogImg}
                          alt="image-post"
                        />
                      </a>
                      <div className="post-detail">
                        <a href={"/blog-details"}>
                          Tendances du recrutement à distance 2021
                        </a>
                        <span className="post-date">10 Octobre 2020</span>
                      </div>
                    </li>
                  </ul>
                </aside>

                <aside className="widget widget-banner">
                  <div className="ttm-col-bgcolor-yes bg-theme-DarkColor text-theme-WhiteColor col-bg-img-seven ttm-col-bgimage-yes p-30 pb-50 pt-45">
                    <div
                      className="ttm-col-wrapper-bg-layer ttm-bg-layer bg-theme-DarkColor"
                      style={{
                        backgroundImage:
                          `url(${BlogImg})`,
                      }}
                    >
                      <div className="ttm-col-wrapper-bg-layer-inner bg-theme-DarkColor"></div>
                    </div>
                    <div className="layer-content text-center text-theme-WhiteColor">
                      <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-style-round ttm-icon_element-color-skincolor ttm-icon_element-size-xl">
                        <i className="far fa-comments"></i>
                      </div>
                      <h3>Besoin d'aide ?</h3>
                      <div className="ttm-horizontal_sep width-100 mt-25 mb-25"></div>
                      <ul>
                        <li>+1 800 556 77 894</li>
                        <li>info@votreemail.com</li>
                      </ul>
                      <a
                        className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                        href={"/"}
                      >
                        Prendre rendez-vous !
                      </a>
                    </div>
                  </div>
                </aside>

                <aside className="widget tagcloud-widget with-title">
                  <h3 className="widget-title">Tags Populaires</h3>
                  <div className="tagcloud">
                    <a href={"/blog-details"} className="tag-cloud-link">
                      Agence
                    </a>
                    <a href={"/blog-details"} className="tag-cloud-link">
                      Affaires
                    </a>
                    <a href={"/blog-details"} className="tag-cloud-link">
                      Entreprise
                    </a>
                    <a href={"/blog-details"} className="tag-cloud-link">
                      Créatif
                    </a>
                    <a href={"/blog-details"} className="tag-cloud-link">
                      Design
                    </a>
                    <a href={"/blog-details"} className="tag-cloud-link">
                      Inspiration
                    </a>
                    <a href={"/blog-details"} className="tag-cloud-link">
                      Marketing
                    </a>
                    <a href={"/blog-details"} className="tag-cloud-link">
                      Startup
                    </a>
                  </div>
                </aside>
              </div>
            </div>
          </div>
          {/* row end */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
