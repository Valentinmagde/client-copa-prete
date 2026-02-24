import React from "react";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";

// Define props interface (empty but can be extended)
interface BlogDetailsProps {}

const BlogDetails: React.FC<BlogDetailsProps> = () => {
  return (
    <div className="site-main">
      <Header />

      {/* PageHeader */}
      <PageHeader title="Détails de l'article" breadcrumb="Détails-article" />
      {/* PageHeader end */}

      <div className="ttm-row sidebar ttm-sidebar clearfix">
        <div className="container">
          {/* row */}
          <div className="row">
            <div className="col-lg-8 content-area">
              {/* post */}
              <article className="post ttm-blog-single clearfix">
                {/* post-featured-wrapper */}
                <div className="ttm-post-featured-wrapper ttm-featured-wrapper">
                  <div className="ttm-post-featured">
                    <img
                      className="img-fluid"
                      src="https://via.placeholder.com/1200x800?text=1200x800+blog-01-1200x800.jpg"
                      alt="image-blog"
                    />
                  </div>
                </div>
                {/* post-featured-wrapper end */}
                {/* ttm-blog-classic-content */}
                <div className="ttm-blog-single-content">
                  <div className="ttm-post-entry-header">
                    <div className="post-meta">
                      <span className="ttm-meta-line author">
                        <img
                          src="https://via.placeholder.com/294x190?text=author-img-294x190.jpg"
                          className="img-fluid"
                          height="80"
                          width="80"
                          alt="auteur"
                        />
                        Par: Édouard Samuel
                      </span>
                      <span className="ttm-meta-line comment-links">
                        <i className="fa fa-comments"></i>03 Commentaires
                      </span>
                      <span className="ttm-meta-line date">
                        <i className="fa fa-calendar"></i>17 Avr 2021
                      </span>
                    </div>
                  </div>
                  <div className="entry-content">
                    <div className="ttm-box-desc-text">
                      <p>
                        Lorem Ipsum est simplement un texte factice de
                        l'industrie de l'impression et de la composition. Lorem
                        Ipsum est le texte factice standard de l'industrie
                        depuis les années 1500, quand un imprimeur inconnu a
                        pris une galère de caractères et l'a brouillé pour en
                        faire un spécimen de livre.
                      </p>

                      <p>
                        L'industrie de la composition typographique. Lorem Ipsum
                        est le texte factice standard de l'industrie depuis les
                        années 1500, quand un imprimeur inconnu a pris une
                        galère de caractères et l'a brouillé.
                      </p>

                      <blockquote>
                        <div className="qoute-text">
                          Mpsum est simplement un texte factice de l'impression
                          et de la composition typographique. Lorem Ipsum est le
                          texte factice standard de l'industrie.
                        </div>
                        <cite>Alex Sam Martin</cite>
                      </blockquote>

                      <p>
                        L'industrie de l'impression et de la composition
                        typographique. Lorem Ipsum est le texte factice standard
                        de l'industrie depuis les années 1500, quand un
                        imprimeur inconnu a pris une galère de caractères et l'a
                        brouillé pour en faire un spécimen de livre.
                      </p>

                      <div className="d-md-flex align-items-center mb-20">
                        <img
                          className="img-fluid alignleft"
                          src="https://via.placeholder.com/332x324?text=single-img-07-332x324.jpg"
                          alt="image-07"
                        />
                        <div className="pt-10 pb-15">
                          <h3>Données Compatibles</h3>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                          </p>
                          <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                            <li>
                              <i className="fas fa-long-arrow-alt-right"></i>
                              <div className="ttm-list-li-content">
                                Quisque aliquet nibh sit amet lectus auctor.
                              </div>
                            </li>
                            <li>
                              <i className="fas fa-long-arrow-alt-right"></i>
                              <div className="ttm-list-li-content">
                                Nulla at metus ultricies, placerat augue sed.
                              </div>
                            </li>
                            <li>
                              <i className="fas fa-long-arrow-alt-right"></i>
                              <div className="ttm-list-li-content">
                                Curabitur mollis ex vestibulum, ullamcorper.
                              </div>
                            </li>
                            <li>
                              <i className="fas fa-long-arrow-alt-right"></i>
                              <div className="ttm-list-li-content">
                                Nulla at metus ultricies, placerat augue sed.
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <h3>
                        La technologie d'entreprise est-elle accessible à tous
                        les employés ?
                      </h3>
                      <p>
                        Nous offrons le plus haut niveau de confort et de
                        détente. Un large choix de chambres et d'appartements
                        pour tous les goûts et pour tous les besoins. Personnel
                        qualifié, délicieux dîners, bar, boissons, espace
                        détente et parking souterrain.
                      </p>
                      <div className="social-media-block">
                        <div className="d-sm-flex justify-content-between">
                          <div className="ttm_tag_lists mt-15">
                            <span className="ttm-tags-links-title">
                              <i className="fa fa-tags"></i>Tags :
                            </span>
                            <span className="ttm-tags-links">
                              Dommages, Entretien, Toiture
                            </span>
                          </div>
                          <div className="ttm-social-share-wrapper mt-15">
                            <h6 className="pr-10">Partager : </h6>
                            <ul className="social-icons">
                              <li>
                                <a
                                  href="#"
                                  rel="noopener noreferrer"
                                  aria-label="facebook"
                                >
                                  <i className="ti ti-facebook"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  rel="noopener noreferrer"
                                  aria-label="twitter"
                                >
                                  <i className="ti ti-twitter-alt"></i>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  rel="noopener noreferrer"
                                  aria-label="linkedin"
                                >
                                  <i className="ti ti-linkedin"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="ttm-blog-classic-box-comment clearfix">
                        <div id="comments" className="comments-area">
                          <div className="comment-respond">
                            <h3 className="comment-reply-title">
                              Laisser un commentaire
                            </h3>
                            <form
                              id="comment_form"
                              className="comment_form wrap-form"
                            >
                              <div className="row ttm-boxes-spacing-15px">
                                <div className="col-lg-6">
                                  <label>
                                    <input
                                      type="text"
                                      name="first_name"
                                      placeholder="Prénom"
                                    />
                                  </label>
                                </div>
                                <div className="col-lg-6">
                                  <label>
                                    <input
                                      type="text"
                                      name="last_name"
                                      placeholder="Nom"
                                    />
                                  </label>
                                </div>
                                <div className="col-lg-6">
                                  <label>
                                    <input
                                      type="email"
                                      name="email_id"
                                      placeholder="Email"
                                    />
                                  </label>
                                </div>
                                <div className="col-lg-6">
                                  <label>
                                    <input
                                      type="tel"
                                      name="phone_number"
                                      placeholder="Téléphone"
                                    />
                                  </label>
                                </div>
                                <div className="col-lg-12">
                                  <label>
                                    <input
                                      type="text"
                                      name="address"
                                      placeholder="Adresse"
                                    />
                                  </label>
                                </div>
                                <div className="col-lg-12">
                                  <label>
                                    <textarea
                                      name="message"
                                      rows={6}
                                      placeholder="Message"
                                      required={true}
                                    ></textarea>
                                  </label>
                                </div>
                                <div className="col-lg-12">
                                  <label>
                                    <button
                                      type="submit"
                                      className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                    >
                                      Envoyer le message
                                    </button>
                                  </label>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ttm-blog-classic-content end */}
              </article>
              {/* post end */}
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
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        Marketing Digital
                      </a>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        Optimisation SEO
                      </a>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        Conception UI/UX
                      </a>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        Développement Web
                      </a>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        Marketing Digital
                      </a>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        Investissement
                      </a>
                    </li>
                  </ul>
                </aside>

                <aside className="widget widget-recent-post with-title">
                  <h3 className="widget-title">Articles Récents</h3>
                  <ul>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        <img
                          className="img-fluid"
                          src="https://via.placeholder.com/150x150?text=150x150+b_thumbb-01.jpg"
                          alt="image-post"
                        />
                      </a>
                      <div className="post-detail">
                        <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                          Comment les enquêteurs utilisent leurs compétences
                        </a>
                        <span className="post-date">10 Octobre 2020</span>
                      </div>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        <img
                          className="img-fluid"
                          src="https://via.placeholder.com/150x150?text=150x150+b_thumbb-02.jpg"
                          alt="image-post"
                        />
                      </a>
                      <div className="post-detail">
                        <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                          Créez votre propre fil d'actualités compétitif
                        </a>
                        <span className="post-date">10 Octobre 2020</span>
                      </div>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        <img
                          className="img-fluid"
                          src="https://via.placeholder.com/150x150?text=150x150+b_thumbb-03.jpg"
                          alt="image-post"
                        />
                      </a>
                      <div className="post-detail">
                        <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                          Tendances du recrutement à distance 2021
                        </a>
                        <span className="post-date">10 Octobre 2020</span>
                      </div>
                    </li>
                  </ul>
                </aside>

                <aside className="widget widget-banner">
                  <div className="ttm-col-bgcolor-yes bg-theme-DarkColor col-bg-img-seven ttm-col-bgimage-yes ttm-bg p-30 pb-50 pt-45">
                    <div
                      className="ttm-col-wrapper-bg-layer ttm-bg-layer bg-theme-DarkColor"
                      style={{
                        backgroundImage:
                          "url(https://via.placeholder.com/875x583?text=875x583+col-bgimage-7.jpg)",
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
                        href={import.meta.env.PUBLIC_URL + "/"}
                      >
                        Prendre rendez-vous !
                      </a>
                    </div>
                  </div>
                </aside>

                <aside className="widget tagcloud-widget with-title">
                  <h3 className="widget-title">Tags Populaires</h3>
                  <div className="tagcloud">
                    <a
                      href={import.meta.env.PUBLIC_URL + "/blog_details"}
                      className="tag-cloud-link"
                    >
                      Agence
                    </a>
                    <a
                      href={import.meta.env.PUBLIC_URL + "/blog_details"}
                      className="tag-cloud-link"
                    >
                      Affaires
                    </a>
                    <a
                      href={import.meta.env.PUBLIC_URL + "/blog_details"}
                      className="tag-cloud-link"
                    >
                      Entreprise
                    </a>
                    <a
                      href={import.meta.env.PUBLIC_URL + "/blog_details"}
                      className="tag-cloud-link"
                    >
                      Créatif
                    </a>
                    <a
                      href={import.meta.env.PUBLIC_URL + "/blog_details"}
                      className="tag-cloud-link"
                    >
                      Design
                    </a>
                    <a
                      href={import.meta.env.PUBLIC_URL + "/blog_details"}
                      className="tag-cloud-link"
                    >
                      Inspiration
                    </a>
                    <a
                      href={import.meta.env.PUBLIC_URL + "/blog_details"}
                      className="tag-cloud-link"
                    >
                      Marketing
                    </a>
                    <a
                      href={import.meta.env.PUBLIC_URL + "/blog_details"}
                      className="tag-cloud-link"
                    >
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

export default BlogDetails;
