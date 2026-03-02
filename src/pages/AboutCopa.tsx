import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import Header from '../components/layout/Header';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';

const AboutCopa: React.FC = () => {
  const { t } = useTranslation();

  // Récupérer les données traduites
  const pillars = t('aboutcopa.pillars.list', { returnObjects: true }) as any[];
  const targets = t('aboutcopa.targets.list', { returnObjects: true }) as any[];
  const whyList = t('aboutcopa.intro.whyParticipate.list', { returnObjects: true }) as string[];
  const steps = t('aboutcopa.steps.list', { returnObjects: true }) as any[];

  return (
    <div className="site-main">
      <Header />
      <PageHeader title={t('aboutcopa.pageTitle')} breadcrumb={t('aboutcopa.breadcrumb')} />

      {/* intro-section */}
      <section className="ttm-row about-section clearfix">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-title">
                <div className="title-header">
                  <h3>
                    {t('aboutcopa.intro.title').split(' ')[0]}{' '}
                    <span className="text-theme-SkinColor">
                      {t('aboutcopa.intro.title').split(' ')[1] || t('aboutcopa.intro.title')}
                    </span>
                  </h3>
                  <h2 className="title">{t('aboutcopa.intro.subtitle')}</h2>
                </div>
                <div className="title-desc">
                  <p>
                    <Trans i18nKey="aboutcopa.intro.description1">
                      Le COPA (Concours de Plans d'Affaires) est le mécanisme phare de la sous-composante 1.2 du PRETE. Il s'agit d'un programme complet d'accompagnement des entrepreneurs burundais, combinant <strong>formation, mentorat et financement</strong>.
                    </Trans>
                  </p>
                  <p className="mt-15">{t('aboutcopa.intro.description2')}</p>
                </div>
              </div>
              <div className="mt-30">
                <Link to="/copa/criteres-eligibilite" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor mr-15">
                  {t('aboutcopa.intro.buttons.eligibility')}
                </Link>
                <Link to="/copa/comment-participer" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor">
                  {t('aboutcopa.intro.buttons.howTo')}
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="pl-30 pl-lg-0 mt-lg-30">
                <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-GreyColor p-40">
                  <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                  <div className="layer-content">
                    <h4 className="mb-20">
                      {t('aboutcopa.intro.whyParticipate.title')}{' '}
                      <span className="text-theme-SkinColor">?</span>
                    </h4>
                    <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                      {whyList.map((item: string, i: number) => (
                        <li key={i} className="pb-8">
                          <i className="far fa-check-circle"></i>
                          <div className="ttm-list-li-content">{item}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* intro-section end */}

      {/* pillars-section */}
      <section className="ttm-row team-section bg-theme-GreyColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>
                    {t('aboutcopa.pillars.section.title').split(' ')[0]}{' '}
                    <span className="text-theme-SkinColor">
                      {t('aboutcopa.pillars.section.title').split(' ')[1] || ''}
                    </span>
                  </h3>
                  <h2 className="title">{t('aboutcopa.pillars.section.subtitle')}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {pillars.map((p: any, i: number) => (
              <div key={i} className="col-lg-4 col-md-6 mb-30">
                <div className="featured-icon-box icon-align-top-content style3 text-center p-30"
                  style={{ background: '#fff', borderRadius: '4px', height: '100%', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
                  <div className="featured-icon mb-20">
                    <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-size-lg ttm-icon_element-style-rounded ttm-icon_element-color-skincolor">
                      <span style={{ fontSize: '22px', fontWeight: 900, color: 'var(--theme-SkinColor)' }}>{p.num}</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <div className="featured-title">
                      <h3>{p.title}</h3>
                    </div>
                    <div className="featured-desc">
                      <p>{p.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* pillars-section end */}

      {/* targets-section */}
      <section className="ttm-row clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>
                    {t('aboutcopa.targets.section.title').split(' ')[0]}{' '}
                    <span className="text-theme-SkinColor">
                      {t('aboutcopa.targets.section.title').split(' ')[1] || ''}
                    </span>
                  </h3>
                  <h2 className="title">{t('aboutcopa.targets.section.subtitle')}</h2>
                </div>
                <div className="title-desc text-center">
                  <p>{t('aboutcopa.targets.section.description')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {targets.map((t: any, i: number) => (
              <div key={i} className="col-lg-3 col-md-6 mb-30">
                <div className="featured-icon-box icon-align-top-content style3 bg-theme-GreyColor text-center p-30"
                  style={{ borderRadius: '4px', height: '100%' }}>
                  <div className="featured-icon mb-15">
                    <span style={{ fontSize: '40px' }}>{t.icon}</span>
                  </div>
                  <div className="featured-content">
                    <div className="featured-title">
                      <h3 style={{ fontSize: '16px' }}>{t.label}</h3>
                    </div>
                    <div className="featured-desc">
                      <p style={{ fontSize: '13px' }}>{t.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12 text-center mt-10">
              <Link to="/copa/criteres-eligibilite" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor">
                {t('aboutcopa.targets.button')}
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* targets-section end */}

      {/* parcours-section - à décommenter si nécessaire */}
      {/* <section className="ttm-row job-list-section bg-theme-GreyColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>
                    {t('aboutcopa.steps.section.title').split(' ')[0]}{' '}
                    <span className="text-theme-SkinColor">
                      {t('aboutcopa.steps.section.title').split(' ')[1] || ''}
                    </span>
                  </h3>
                  <h2 className="title">{t('aboutcopa.steps.section.subtitle')}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div id="timeline-story" className="timeline-story-wrapper">
                <div className="timeline">
                  {steps.map((s: any, i: number) => (
                    <div key={i} className="timeline-panel">
                      <div className="timeline-shape">
                        <span className="shape-circle"></span>
                        <span className="shape-image"><img className="img-fluid" src="images/dotted_shape.png" alt="shape" /></span>
                      </div>
                      <div className="timeline-body">
                        <div className="timeline-date">{t('aboutcopa.steps.step')} {s.step}</div>
                        <h3 className="title">{s.label}</h3>
                        {s.link && (
                          <Link className="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-darkgrey ttm-icon-btn-right"
                            to={s.link}>
                            {t('aboutcopa.steps.access')} <i className="ti ti-angle-double-right"></i>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* action-section - à décommenter si nécessaire */}
      {/* <section className="ttm-row action-section bg-theme-SkinColor text-theme-WhiteColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-md-flex align-items-center justify-content-between">
                <div className="featured-icon-box icon-align-before-content style2">
                  <div className="featured-icon">
                    <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-white ttm-icon_element-size-xl">
                      <i className="flaticon flaticon-recruitment-5"></i>
                    </div>
                  </div>
                  <div className="featured-content">
                    <div className="featured-title"><h3>{t('aboutcopa.cta.title')}</h3></div>
                    <div className="featured-desc"><p>{t('aboutcopa.cta.description')}</p></div>
                  </div>
                </div>
                <Link to="/inscription" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white">
                  {t('aboutcopa.cta.button')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
};

export default AboutCopa;