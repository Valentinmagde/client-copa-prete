import React from 'react';
import Header from '../components/layout/Header';
import PageHeader from "../components/layout/PageHeader";
import Footer from '../components/layout/Footer';

// Define props interface (empty but can be extended)
interface BlogProps {}

const Blog: React.FC<BlogProps> = () => {
  return (
    <div className="site-main">
      <Header />

      {/* PageHeader */}
      <PageHeader
        title="blog classic"
        breadcrumb="blog"
      />
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
                    <img className="img-fluid" src="https://via.placeholder.com/1200x800?text=1200x800+blog-01-1200x800.jpg" alt="blog-img" />
                    <div className="ttm-box-post-date">
                      <span className="ttm-entry-date">
                        <time className="entry-date">18 Mar 2020</time>
                      </span>
                    </div>
                  </div>
                </div>{/* post-featured-wrapper end */}
                {/* ttm-blog-classic-content */}
                <div className="ttm-blog-classic-content">
                  <div className="ttm-post-entry-header">
                    <div className="post-meta">
                      <span className="ttm-meta-line category"><i className="ti ti-folder"></i>business</span>
                      <span className="ttm-meta-line byline"><i className="ti ti-user"></i>John Doe</span>
                      <span className="ttm-meta-line tags-links"><i className="far fa-comments"></i>0 Comments</span>
                    </div>
                    <header className="entry-header">
                      <h2 className="entry-title"><a href={import.meta.env.PUBLIC_URL + '/blog_details'}>How Sources Utilize Their Sleuthing Skills Beyond Work</a></h2>
                    </header>
                  </div>
                  <div className="entry-content">
                    <div className="ttm-box-desc-text">
                      <p>If you are curious how else you could help yourself or others with sourcing abilities outside of the normal 
                        requisition- and pipelining-related works, your colleagues have recently been provided an ingenious inspiration. 
                        It used to be the third person who was able to ask him a question out!</p>
                    </div>
                    <div className="ttm-blogbox-footer-readmore">
                      <a className="ttm-btn ttm-btn-size-md btn-inline ttm-btn-color-dark" 
                        href={import.meta.env.PUBLIC_URL + '/blog_details'}>Read More<i className="fa fa-angle-double-right"></i></a>
                    </div>
                  </div>
                </div>{/* ttm-blog-classic-content end */}
              </article>{/* post end */}
              
              {/* post */}
              <article className="post ttm-blog-classic clearfix">
                {/* post-featured-wrapper */}
                <div className="ttm-post-featured-wrapper ttm-featured-wrapper">
                  <div className="ttm-post-featured">
                    <img className="img-fluid" src="https://via.placeholder.com/1200x800?text=1200x800+blog-02-1200x800.jpg" alt="blog-img" />
                    <div className="ttm-box-post-date">
                      <span className="ttm-entry-date">
                        <time className="entry-date">18 Mar 2020</time>
                      </span>
                    </div>
                  </div>
                </div>{/* post-featured-wrapper end */}
                {/* ttm-blog-classic-content */}
                <div className="ttm-blog-classic-content">
                  <div className="ttm-post-entry-header">
                    <div className="post-meta">
                      <span className="ttm-meta-line category"><i className="ti ti-folder"></i>business</span>
                      <span className="ttm-meta-line byline"><i className="ti ti-user"></i>John Doe</span>
                      <span className="ttm-meta-line tags-links"><i className="far fa-comments"></i>0 Comments</span>
                    </div>
                    <header className="entry-header">
                      <h2 className="entry-title"><a href={import.meta.env.PUBLIC_URL + '/blog_details'}>Let's Create Your Own Competitive News Feeder For Free</a></h2>
                    </header>
                  </div>
                  <div className="entry-content">
                    <div className="ttm-box-desc-text">
                      <p>The Microsoft Outlook and various dedicated feed reader apps exist, and there's even paid competitive intelligence 
                        software, but what if you wanted a free central repository built up over time that could be shared with certain 
                        colleagues? Personnel changes worthwhile for talent sourcing</p>
                    </div>
                    <div className="ttm-blogbox-footer-readmore">
                      <a className="ttm-btn ttm-btn-size-md btn-inline ttm-btn-color-dark" 
                        href={import.meta.env.PUBLIC_URL + '/blog_details'}>Read More<i className="fa fa-angle-double-right"></i></a>
                    </div>
                  </div>
                </div>{/* ttm-blog-classic-content end */}
              </article>{/* post end */}
              
              {/* post */}
              <article className="post ttm-blog-classic clearfix">
                {/* post-featured-wrapper */}
                <div className="ttm-post-featured-wrapper ttm-featured-wrapper">
                  <div className="ttm-post-featured">
                    <img className="img-fluid" src="https://via.placeholder.com/1200x800?text=1200x800+blog-04-1200x800.jpg" alt="blog-img" />
                    <div className="ttm-box-post-date">
                      <span className="ttm-entry-date">
                        <time className="entry-date">18 Mar 2020</time>
                      </span>
                    </div>
                  </div>
                </div>{/* post-featured-wrapper end */}
                {/* ttm-blog-classic-content */}
                <div className="ttm-blog-classic-content">
                  <div className="ttm-post-entry-header">
                    <div className="post-meta">
                      <span className="ttm-meta-line category"><i className="ti ti-folder"></i>business</span>
                      <span className="ttm-meta-line byline"><i className="ti ti-user"></i>John Doe</span>
                      <span className="ttm-meta-line tags-links"><i className="far fa-comments"></i>0 Comments</span>
                    </div>
                    <header className="entry-header">
                      <h2 className="entry-title"><a href={import.meta.env.PUBLIC_URL + '/blog_details'}>Remote Hiring Trends Report 2021: Review Hire Process</a></h2>
                    </header>
                  </div>
                  <div className="entry-content">
                    <div className="ttm-box-desc-text">
                      <p>80% of global HR leaders reveal that their interviewing and hiring process is now fully remote.
                        Find more trends and actionable insights in this report to learn how you can invest in a better
                        remote hiring process today. The world and receive over 140 million unique visitors per month.</p>
                    </div>
                    <div className="ttm-blogbox-footer-readmore">
                      <a className="ttm-btn ttm-btn-size-md btn-inline ttm-btn-color-dark" 
                        href={import.meta.env.PUBLIC_URL + '/blog_details'}>Read More<i className="fa fa-angle-double-right"></i></a>
                    </div>
                  </div>
                </div>{/* ttm-blog-classic-content end */}
              </article>{/* post end */}
              
              <div className="pagination-block">
                <span className="page-numbers current">1</span>
                <a className="page-numbers" href="#">2</a>
                <a className="next page-numbers" href="#"><i className="ti ti-arrow-right"></i></a>
              </div>
            </div>
            
            <div className="col-lg-4 widget-area">
              <div className="sidebar-right">
                <aside className="widget widget-search">
                  <form role="search" className="search-form">
                    <label>
                      <span className="screen-reader-text">Search for:</span>
                      <input type="search" className="input-text" placeholder="Your Keyword...." value="" onChange={() => {}} />
                    </label>
                    <button className="btn" type="submit"><i className="fa fa-search"></i> </button>
                  </form>
                </aside>
                
                <aside className="widget widget-Categories with-title">
                  <h3 className="widget-title">Categories</h3>
                  <ul>
                    <li><a href={import.meta.env.PUBLIC_URL + '/blog_details'}>Digital Marketing</a></li>
                    <li><a href={import.meta.env.PUBLIC_URL + '/blog_details'}>Search Engine Optimization</a></li>
                    <li><a href={import.meta.env.PUBLIC_URL + '/blog_details'}>UI/UX Design Task</a></li>
                    <li><a href={import.meta.env.PUBLIC_URL + '/blog_details'}>Web development</a></li>
                    <li><a href={import.meta.env.PUBLIC_URL + '/blog_details'}>Digital Marketing</a></li>
                    <li><a href={import.meta.env.PUBLIC_URL + '/blog_details'}>Investment</a></li>
                  </ul>
                </aside>
                
                <aside className="widget widget-recent-post with-title">
                  <h3 className="widget-title">Recent Posts</h3>
                  <ul>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + '/blog_details'}>
                        <img className="img-fluid" src="https://via.placeholder.com/150x150?text=150x150+b_thumbb-01.jpg" alt="post-img" />
                      </a>
                      <div className="post-detail">
                        <a href={import.meta.env.PUBLIC_URL + '/blog_details'}>How Sources Utilize Sleuth Skill Beyond Work</a>
                        <span className="post-date">October 10, 2020</span>
                      </div>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + '/blog_details'}>
                        <img className="img-fluid" src="https://via.placeholder.com/150x150?text=150x150+b_thumbb-02.jpg" alt="post-img" />
                      </a>
                      <div className="post-detail">
                        <a href={import.meta.env.PUBLIC_URL + '/blog_details'}>Let's Create Your Own Competitive News Feeder For Free</a>
                        <span className="post-date">October 10, 2020</span>
                      </div>
                    </li>
                    <li>
                      <a href={import.meta.env.PUBLIC_URL + '/blog_details'}>
                        <img className="img-fluid" src="https://via.placeholder.com/150x150?text=150x150+b_thumbb-03.jpg" alt="post-img" />
                      </a>
                      <div className="post-detail">
                        <a href={import.meta.env.PUBLIC_URL + '/blog_details'}>Remote Hiring Trends Report 2021: Review Hire Process</a>
                        <span className="post-date">October 10, 2020</span>
                      </div>
                    </li>
                  </ul>
                </aside>
                
                <aside className="widget widget-banner">
                  <div className="ttm-col-bgcolor-yes bg-theme-DarkColor text-theme-WhitColor col-bg-img-seven ttm-col-bgimage-yes p-30 pb-50 pt-45">
                    <div className="ttm-col-wrapper-bg-layer ttm-bg-layer bg-theme-DarkColor" style={{ backgroundImage: 'url(https://via.placeholder.com/875x583?text=875x583+col-bgimage-7.jpg)' }}>
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
                      <a className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor" href={import.meta.env.PUBLIC_URL + '/'}>appoinments!</a>
                    </div>
                  </div>
                </aside>
                
                <aside className="widget tagcloud-widget with-title">
                  <h3 className="widget-title">Popular Tags</h3>
                  <div className="tagcloud">
                    <a href={import.meta.env.PUBLIC_URL + '/blog_details'} className="tag-cloud-link">Agency</a>
                    <a href={import.meta.env.PUBLIC_URL + '/blog_details'} className="tag-cloud-link">Business</a>
                    <a href={import.meta.env.PUBLIC_URL + '/blog_details'} className="tag-cloud-link">Corporate</a>
                    <a href={import.meta.env.PUBLIC_URL + '/blog_details'} className="tag-cloud-link">Creative</a>
                    <a href={import.meta.env.PUBLIC_URL + '/blog_details'} className="tag-cloud-link">Design</a>
                    <a href={import.meta.env.PUBLIC_URL + '/blog_details'} className="tag-cloud-link">inspiration</a>
                    <a href={import.meta.env.PUBLIC_URL + '/blog_details'} className="tag-cloud-link">Marketing</a>
                    <a href={import.meta.env.PUBLIC_URL + '/blog_details'} className="tag-cloud-link">Startup</a>
                  </div>
                </aside>
              </div>
            </div>
          </div>{/* row end */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;