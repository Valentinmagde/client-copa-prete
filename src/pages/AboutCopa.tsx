import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';

const pillars = [
  {
    icon: 'flaticon-book',
    num: '01',
    title: 'Formation',
    desc: "Renforcement des compétences entrepreneuriales et de gestion à travers des modules adaptés, disponibles en présentiel ou en ligne.",
    color: 'bg-theme-SkinColor',
  },
  {
    icon: 'flaticon-trophy',
    num: '02',
    title: 'Compétition',
    desc: "Évaluation transparente et équitable des plans d'affaires par des experts indépendants, selon une grille de critères objective.",
    color: '',
  },
  {
    icon: 'flaticon-money',
    num: '03',
    title: 'Financement',
    desc: "Attribution de subventions de contrepartie (matching grants) aux lauréats pour concrétiser leurs projets d'entreprise.",
    color: '',
  },
];

const targets = [
  { icon: '👩‍💼', label: 'Femmes entrepreneurs',  desc: 'Entreprises dirigées par des femmes avec points bonus à l\'évaluation' },
  { icon: '🌍', label: 'Entrepreneurs réfugiés',  desc: 'Réfugiés enregistrés au Burundi éligibles au programme' },
  { icon: '🎓', label: 'Jeunes (18–35 ans)',       desc: 'Jeunes porteurs de projets innovants et viables' },
  { icon: '🌿', label: 'Impact environnemental',   desc: 'Projets à impact positif sur le climat et l\'environnement' },
];

const steps = [
  { step:'1', label:'Inscription',            link:'/inscription' },
  { step:'2', label:'Profil complet',          link:'/espace-mpme/mon-profil' },
  { step:'3', label:'Formations',              link:'/formations/catalogue' },
  { step:'4', label:"Plan d'affaires",         link:'/espace-mpme/mon-plan-affaires/redaction' },
  { step:'5', label:'Évaluation',              link:null },
  { step:'6', label:'Subvention',              link:null },
];

const AboutCopa: React.FC = () => (
  <div className="site-main">
    <Header />
    <PageHeader title="Présentation du COPA" breadcrumb="À propos / COPA" />

    {/* intro-section */}
    <section className="ttm-row about-section clearfix">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="section-title">
              <div className="title-header">
                <h3>Le <span className="text-theme-SkinColor">COPA</span></h3>
                <h2 className="title">Le Concours de Plans d'Affaires</h2>
              </div>
              <div className="title-desc">
                <p>Le COPA (Concours de Plans d'Affaires) est le mécanisme phare de la sous-composante 1.2 du PRETE. Il s'agit d'un programme complet d'accompagnement des entrepreneurs burundais, combinant <strong>formation, mentorat et financement</strong>.</p>
                <p className="mt-15">Le COPA offre aux porteurs de projets viables une opportunité unique de développer leurs compétences et d'accéder à un financement non remboursable pour concrétiser leur vision entrepreneuriale.</p>
              </div>
            </div>
            <div className="mt-30">
              <Link to="/copa/criteres-eligibilite" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor mr-15">
                Vérifier mon éligibilité
              </Link>
              <Link to="/copa/comment-participer" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor">
                Comment participer ?
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="pl-30 pl-lg-0 mt-lg-30">
              <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-GreyColor p-40">
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                <div className="layer-content">
                  <h4 className="mb-20">Pourquoi <span className="text-theme-SkinColor">participer ?</span></h4>
                  <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                    {[
                      'Formations gratuites en entrepreneuriat',
                      'Subvention non remboursable (matching grant)',
                      'Accompagnement personnalisé par des experts',
                      'Visibilité et reconnaissance nationale',
                      'Accès à un réseau d\'entrepreneurs',
                      "Renforcement de votre dossier d'entreprise",
                    ].map((item, i) => (
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
                <h3>Notre <span className="text-theme-SkinColor">approche</span></h3>
                <h2 className="title">Le COPA repose sur trois piliers</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {pillars.map((p, i) => (
            <div key={i} className="col-lg-4 col-md-6 mb-30">
              <div className={`featured-icon-box icon-align-top-content style3 text-center p-30 ${p.color}`}
                style={{ background: p.color ? undefined : '#fff', borderRadius: '4px', height: '100%', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
                <div className="featured-icon mb-20">
                  <div className={`ttm-icon ttm-icon_element-fill ttm-icon_element-size-lg ttm-icon_element-style-rounded ${p.color ? 'ttm-icon_element-color-white' : 'ttm-icon_element-color-skincolor'}`}>
                    <span style={{ fontSize: '22px', fontWeight: 900, color: p.color ? '#fff' : 'var(--theme-SkinColor)' }}>{p.num}</span>
                  </div>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h3 style={{ color: p.color ? '#fff' : 'inherit' }}>{p.title}</h3>
                  </div>
                  <div className="featured-desc">
                    <p style={{ color: p.color ? 'rgba(255,255,255,.85)' : 'inherit' }}>{p.desc}</p>
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
                <h3>Qui peut <span className="text-theme-SkinColor">participer ?</span></h3>
                <h2 className="title">Le COPA est ouvert à tous</h2>
              </div>
              <div className="title-desc text-center">
                <p>Le COPA est ouvert à toutes les MPME formelles ou en voie de formalisation, avec une attention particulière pour les groupes prioritaires suivants :</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {targets.map((t, i) => (
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
            <p className="mb-20" style={{ fontSize: '14px', color: '#666' }}>
              📌 Les entreprises dirigées par des femmes, les entrepreneurs réfugiés et les projets à impact climatique positif bénéficient de <strong>points bonus</strong> lors de l'évaluation.
            </p>
            <Link to="/copa/criteres-eligibilite" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor">
              Consulter tous les critères d'éligibilité
            </Link>
          </div>
        </div>
      </div>
    </section>
    {/* targets-section end */}

    {/* parcours-section */}
    <section className="ttm-row job-list-section bg-theme-GreyColor clearfix">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title title-style-center_text">
              <div className="title-header">
                <h3>Le <span className="text-theme-SkinColor">parcours</span></h3>
                <h2 className="title">Les étapes du programme COPA</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div id="timeline-story" className="timeline-story-wrapper">
              <div className="timeline">
                {steps.map((s, i) => (
                  <div key={i} className="timeline-panel">
                    <div className="timeline-shape">
                      <span className="shape-circle"></span>
                      <span className="shape-image"><img className="img-fluid" src="images/dotted_shape.png" alt="shape" /></span>
                    </div>
                    <div className="timeline-body">
                      <div className="timeline-date">Étape {s.step}</div>
                      <h3 className="title">{s.label}</h3>
                      {s.link && (
                        <Link className="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-darkgrey ttm-icon-btn-right"
                          to={s.link}>Accéder <i className="ti ti-angle-double-right"></i></Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* parcours-section end */}

    {/* action-section */}
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
                  <div className="featured-title"><h3>Prêt à participer au Concours de Plans d'Affaires ?</h3></div>
                  <div className="featured-desc"><p>Créez votre compte et commencez votre parcours COPA dès aujourd'hui.</p></div>
                </div>
              </div>
              <Link to="/inscription" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white">
                S'inscrire maintenant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section> */}
    {/* action-section end */}

    <Footer />
  </div>
);

export default AboutCopa;
