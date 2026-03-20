import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import PageHeader from "../components/layout/PageHeader";
import Footer from "../components/layout/Footer";
import BlogImg1 from "../assets/img/blog/01.png";
import BlogImg2 from "../assets/img/blog/02.png";
import BlogImg3 from "../assets/img/blog/03.png";
import BlogImg4 from "../assets/img/blog/04.png";

interface BlogProps {}

const Blog: React.FC<BlogProps> = () => {
  const { t } = useTranslation();

  // Récupérer les données traduites
  // const posts = t("blog.posts", { returnObjects: true }) as any[];
  const posts = [];
  const categories = t("blog.sidebar.categories.list", {
    returnObjects: true,
  }) as string[];
  const recentPosts = t("blog.sidebar.recentPosts.list", {
    returnObjects: true,
  }) as any[];
  const popularTags = t("blog.sidebar.popularTags.list", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="site-main">
      <Header />

      {/* PageHeader */}
      <PageHeader
        title={t("blog.pageTitle")}
        breadcrumb={t("blog.breadcrumb")}
      />
      {/* PageHeader end */}

      <div className="ttm-row sidebar ttm-sidebar clearfix">
        <div className="container">
          {/* row */}
          {posts.length ? (
            <div className="row">
              <div className="col-lg-8 content-area">
                {/* Posts */}
                {posts.map((post, index) => (
                  <article
                    key={index}
                    className="post ttm-blog-classic clearfix"
                  >
                    {/* post-featured-wrapper */}
                    <div className="ttm-post-featured-wrapper ttm-featured-wrapper">
                      <div className="ttm-post-featured">
                        <img
                          className="img-fluid"
                          src={post.image}
                          alt="image-blog"
                        />
                        <div className="ttm-box-post-date">
                          <span className="ttm-entry-date">
                            <time className="entry-date">{post.date}</time>
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
                            <i className="ti ti-folder"></i>
                            {post.category}
                          </span>
                          <span className="ttm-meta-line byline">
                            <i className="ti ti-user"></i>
                            {post.author}
                          </span>
                          <span className="ttm-meta-line tags-links">
                            <i className="far fa-comments"></i>
                            {post.comments}
                          </span>
                        </div>
                        <header className="entry-header">
                          <h2 className="entry-title">
                            <a href={post.link}>{post.title}</a>
                          </h2>
                        </header>
                      </div>
                      <div className="entry-content">
                        <div className="ttm-box-desc-text">
                          <p>{post.excerpt}</p>
                        </div>
                        <div className="ttm-blogbox-footer-readmore">
                          <a
                            className="ttm-btn ttm-btn-size-md btn-inline ttm-btn-color-dark"
                            href={post.link}
                          >
                            {t("blog.buttons.readMore")}
                            <i className="fa fa-angle-double-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* ttm-blog-classic-content end */}
                  </article>
                ))}

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
                        <span className="screen-reader-text">
                          {t("blog.sidebar.search.title")} :
                        </span>
                        <input
                          type="search"
                          className="input-text"
                          placeholder={t("blog.sidebar.search.placeholder")}
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
                    <h3 className="widget-title">
                      {t("blog.sidebar.categories.title")}
                    </h3>
                    <ul>
                      {categories.map((category, index) => (
                        <li key={index}>
                          <a href={"/blog-details"}>{category}</a>
                        </li>
                      ))}
                    </ul>
                  </aside>

                  <aside className="widget widget-recent-post with-title">
                    <h3 className="widget-title">
                      {t("blog.sidebar.recentPosts.title")}
                    </h3>
                    <ul>
                      {recentPosts.map((post, index) => (
                        <li key={index}>
                          <a href={post.link}>
                            <img
                              className="img-fluid"
                              src={post.image}
                              alt="image-post"
                            />
                          </a>
                          <div className="post-detail">
                            <a href={post.link}>{post.title}</a>
                            <span className="post-date">{post.date}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </aside>

                  <aside className="widget tagcloud-widget with-title">
                    <h3 className="widget-title">
                      {t("blog.sidebar.popularTags.title")}
                    </h3>
                    <div className="tagcloud">
                      {popularTags.map((tag, index) => (
                        <a
                          key={index}
                          href={"/blog-details"}
                          className="tag-cloud-link"
                        >
                          {tag}
                        </a>
                      ))}
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          ) : (
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center py-60">
                {/* <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-size-xl ttm-icon_element-color-grey ttm-icon_element-style-round mx-auto mb-20">
                  <i className="far fa-newspaper"></i>
                </div> */}
                <h3 className="mb-15">
                  {t("blog.empty.title", "Aucun article disponible")}
                </h3>
                <p className="mb-30" style={{ color: "#777" }}>
                  {t(
                    "blog.empty.description",
                    "Aucun article n'a encore été publié. Revenez bientôt pour découvrir nos actualités.",
                  )}
                </p>
                <a
                  href="/"
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                >
                  {t("blog.empty.cta", "Retour à l'accueil")}
                </a>
              </div>
            </div>
          )}
          {/* row end */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
