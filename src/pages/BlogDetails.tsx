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
      <PageHeader title="blog details" breadcrumb="blog" />
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
                      alt="blog-img"
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
                          alt="author"
                        />
                        By: Edward Samuel
                      </span>
                      <span className="ttm-meta-line comment-links">
                        <i className="fa fa-comments"></i>03 Comments
                      </span>
                      <span className="ttm-meta-line date">
                        <i className="fa fa-calendar"></i>17 Apr 2021
                      </span>
                    </div>
                  </div>
                  <div className="entry-content">
                    <div className="ttm-box-desc-text">
                      <p>
                        Lorem Ipsum is simply dummy text of the printting and
                        typesetting industry. Lorem Ipsum contary io on hasbeen
                        the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </p>

                      <p>
                        Contary typesetting industry. Lorem Ipsum on hasbeen the
                        industry's standard live youmgdummy text ever the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled.
                      </p>

                      <blockquote>
                        <div className="qoute-text">
                          Mpsum is simply dummy text of the printing and
                          conatary typesg industy. Lorem Ipsum on hasbeen the
                          industry's standard dummy te
                        </div>
                        <cite>Alex Sam Martin</cite>
                      </blockquote>

                      <p>
                        Contary is simply dummy text of the printting and
                        contary to popular typesetti dustry. Lorem Ipsum on has
                        been the industry's standard dummy text ever since the
                        1500s, when loream an unknown printer took a galley of
                        type and scrambled it to make a type specimen book.
                      </p>

                      <div className="d-md-flex align-items-center mb-20">
                        <img
                          className="img-fluid alignleft"
                          src="https://via.placeholder.com/332x324?text=single-img-07-332x324.jpg"
                          alt="single-07"
                        />
                        <div className="pt-10 pb-15">
                          <h3>Compatible Data</h3>
                          <p>
                            Lorem ipsum dolor sit contary amet, consectetur
                            adipiscing elit, sed do loream eiusmod tempor
                            incididu labore et dolore magna aliqua.{" "}
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
                      <h3>Is Business Tech Accessible To All Employees?</h3>
                      <p>
                        We offers the highest level of comfort and relaxation.
                        Large selection of rooms loram and apartments for every
                        taste and for every need. Qualified staff, delicious
                        dinners, bar, drinks, relaxation area and underground
                        loream ipsum parking.
                      </p>
                      <div className="social-media-block">
                        <div className="d-sm-flex justify-content-between">
                          <div className="ttm_tag_lists mt-15">
                            <span className="ttm-tags-links-title">
                              <i className="fa fa-tags"></i>Tags:
                            </span>
                            <span className="ttm-tags-links">
                              Damage, Maintenance, Roof
                            </span>
                          </div>
                          <div className="ttm-social-share-wrapper mt-15">
                            <h6 className="pr-10">Share : </h6>
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
                              Leave a Reply
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
                                      placeholder="First Name"
                                    />
                                  </label>
                                </div>
                                <div className="col-lg-6">
                                  <label>
                                    <input
                                      type="text"
                                      name="last_name"
                                      placeholder="Last Name"
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
                                      placeholder="Phone"
                                    />
                                  </label>
                                </div>
                                <div className="col-lg-12">
                                  <label>
                                    <input
                                      type="text"
                                      name="address"
                                      placeholder="Address"
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
                                      send a message
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
                      <span className="screen-reader-text">Search for:</span>
                      <input
                        type="search"
                        className="input-text"
                        placeholder="Your Keyword...."
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
                  <h3 className="widget-title">Categories</h3>
                  <ul>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        Digital Marketing
                      </a>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        Search Engine Optimization
                      </a>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        UI/UX Design Task
                      </a>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        Web development
                      </a>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        Digital Marketing
                      </a>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        Investment
                      </a>
                    </li>
                  </ul>
                </aside>

                <aside className="widget widget-recent-post with-title">
                  <h3 className="widget-title">Recent Posts</h3>
                  <ul>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        <img
                          className="img-fluid"
                          src="https://via.placeholder.com/150x150?text=150x150+b_thumbb-01.jpg"
                          alt="post-img"
                        />
                      </a>
                      <div className="post-detail">
                        <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                          How Sources Utilize Sleuth Skill Beyond Work
                        </a>
                        <span className="post-date">October 10, 2020</span>
                      </div>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        <img
                          className="img-fluid"
                          src="https://via.placeholder.com/150x150?text=150x150+b_thumbb-02.jpg"
                          alt="post-img"
                        />
                      </a>
                      <div className="post-detail">
                        <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                          Let's Create Your Own Competitive News Feeder For Free
                        </a>
                        <span className="post-date">October 10, 2020</span>
                      </div>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                        <img
                          className="img-fluid"
                          src="https://via.placeholder.com/150x150?text=150x150+b_thumbb-03.jpg"
                          alt="post-img"
                        />
                      </a>
                      <div className="post-detail">
                        <a href={import.meta.env.PUBLIC_URL + "/blog_details"}>
                          Remote Hiring Trends Report 2021: Review Hire Process
                        </a>
                        <span className="post-date">October 10, 2020</span>
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
                      <h3>Do You Need Any Help?</h3>
                      <div className="ttm-horizontal_sep width-100 mt-25 mb-25"></div>
                      <ul>
                        <li>+1 800 556 77 894</li>
                        <li>info@yourmailexample.com</li>
                      </ul>
                      <a
                        className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                        href={import.meta.env.PUBLIC_URL + "/"}
                      >
                        appoinments!
                      </a>
                    </div>
                  </div>
                </aside>

                <aside className="widget tagcloud-widget with-title">
                  <h3 className="widget-title">Popular Tags</h3>
                  <div className="tagcloud">
                    <a
                      href={import.meta.env.PUBLIC_URL + "/blog_details"}
                      className="tag-cloud-link"
                    >
                      Agency
                    </a>
                    <a
                      href={import.meta.env.PUBLIC_URL + "/blog_details"}
                      className="tag-cloud-link"
                    >
                      Business
                    </a>
                    <a
                      href={import.meta.env.PUBLIC_URL + "/blog_details"}
                      className="tag-cloud-link"
                    >
                      Corporate
                    </a>
                    <a
                      href={import.meta.env.PUBLIC_URL + "/blog_details"}
                      className="tag-cloud-link"
                    >
                      Creative
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
                      inspiration
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
