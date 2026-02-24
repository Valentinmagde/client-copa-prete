import React from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import Header from '../components/layout/Header';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';

const objectives = [
  { icon: 'flaticon-recruiting', text: 'Renforcer les capacités des micro, petites et moyennes entreprises (MPME)' },
  { icon: 'flaticon-job-1',      text: "Améliorer l'environnement des affaires au Burundi" },
  { icon: 'flaticon-money',      text: "Faciliter l'accès au financement pour les entrepreneurs" },
  { icon: 'flaticon-research',   text: "Promouvoir l'inclusion économique des femmes et des réfugiés" },
  { icon: 'flaticon-leaves',     text: 'Soutenir les investissements respectueux du climat' },
];

const components = [
  {
    num: '01',
    title: 'Développement des MPME',
    desc: "Renforcement des capacités des petites et moyennes entreprises burundaises à travers la sous-composante 1.2 « Amélioration des capacités des MPME » qui porte le programme COPA.",
    highlight: true,
  },
  {
    num: '02',
    title: "Amélioration de l'environnement des affaires",
    desc: "Réformes structurelles pour simplifier les procédures administratives, réduire les coûts d'entrée sur le marché et renforcer la protection des investisseurs.",
    highlight: false,
  },
  {
    num: '03',
    title: 'Accès au financement',
    desc: "Développement des mécanismes de financement pour les MPME, notamment via des garanties partielles de crédit et des subventions de contrepartie (matching grants).",
    highlight: false,
  },
  {
    num: '04',
    title: 'Inclusion économique',
    desc: "Programmes ciblés pour intégrer les femmes, les jeunes et les réfugiés dans le tissu économique burundais à travers des formations et un accompagnement adapté.",
    highlight: false,
  },
];

const stats = [
  { end: 100, suffix: 'M$',  label: 'Budget total du projet' },
  { end: 5,   suffix: 'ans', label: 'Durée du programme (2024–2028)' },
  { end: 10000, suffix: '+', label: 'Bénéficiaires attendus' },
  { end: 18,  suffix: '%',   label: 'Croissance PIB ciblée' },
];

const AboutPrete: React.FC = () => (
  <div className="site-main">
    <Header />
    <PageHeader title="Présentation du PRETE" breadcrumb="À propos" />

    {/* intro-section */}
    <section className="ttm-row about-section clearfix">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="section-title">
              <div className="title-header">
                <h3>Le <span className="text-theme-SkinColor">Projet</span></h3>
                <h2 className="title">Le Projet pour l'Emploi et la Transformation Économique</h2>
              </div>
              <div className="title-desc">
                <p>Le PRETE est un projet du Gouvernement du Burundi, financé par la Banque mondiale, qui vise à stimuler la croissance économique inclusive et la création d'emplois dans le pays.</p>
                <p className="mt-15">D'un montant de <strong>100 millions USD</strong>, le projet s'étend sur une période de <strong>5 ans (2024–2028)</strong> et cible en priorité les micro, petites et moyennes entreprises burundaises.</p>
              </div>
            </div>
            <div className="d-flex align-items-center mt-30">
              <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-sm ttm-icon_element-style-round mb-0">
                <i className="fa fa-university"></i>
              </div>
              <div className="pl-15">
                <h6 className="mb-5">Financé par</h6>
                <p className="featured-desc mb-0 fw-bold">Banque mondiale — Gouvernement du Burundi</p>
              </div>
            </div>
            <div className="ttm-horizontal_sep width-100 mt-20 mb-20"></div>
            <div className="d-flex align-items-center">
              <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-sm ttm-icon_element-style-round mb-0">
                <i className="fa fa-calendar"></i>
              </div>
              <div className="pl-15">
                <h6 className="mb-5">Durée du projet</h6>
                <p className="featured-desc mb-0">2024 – 2028 (5 ans)</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-GreyColor z-index-2 p-40 ml-30 ml-lg-0 mt-lg-30">
              <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
              <div className="layer-content">
                <h4 className="mb-25" style={{ color:'var(--theme-DarkColor)' }}>Nos <span className="text-theme-SkinColor">objectifs</span></h4>
                <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                  {objectives.map((obj, i) => (
                    <li key={i} className="pb-10">
                      <i className="far fa-check-circle"></i>
                      <div className="ttm-list-li-content">{obj.text}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* intro-section end */}

    {/* stats-section */}
    <section className="ttm-row bg-theme-DarkColor text-theme-WhiteColor clearfix" style={{ padding:'50px 0' }}>
      <div className="container">
        <div className="row text-center">
          {stats.map((s, i) => (
            <div key={i} className="col-lg-3 col-md-6 mb-30 mb-lg-0">
              <div className="ttm-fid inside ttm-fid-view-topicon">
                <div className="ttm-fid-contents">
                  <h4 className="text-theme-SkinColor">
                    <CountUp start={0} end={s.end} duration={3} delay={0.5} />
                    {s.suffix}
                  </h4>
                  <h3 className="ttm-fid-title">{s.label}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    {/* stats-section end */}

    {/* components-section */}
    <section className="ttm-row team-section bg-theme-GreyColor clearfix">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title title-style-center_text">
              <div className="title-header">
                <h3>Structure du <span className="text-theme-SkinColor">projet</span></h3>
                <h2 className="title">Les composantes du PRETE</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {components.map((comp, i) => (
            <div key={i} className="col-lg-6 col-md-6 mb-30">
              <div className={`featured-icon-box icon-align-before-content ${comp.highlight ? 'bg-theme-SkinColor text-theme-WhiteColor' : 'bg-theme-WhiteColor'}`}
                style={{ padding: '30px', borderRadius: '4px', height: '100%', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
                <div className="featured-icon">
                  <div className={`ttm-icon ttm-icon_element-fill ttm-icon_element-size-md ttm-icon_element-style-rounded ${comp.highlight ? 'ttm-icon_element-color-white' : 'ttm-icon_element-color-skincolor'}`}>
                    <span style={{ fontSize: '20px', fontWeight: 900 }}>{comp.num}</span>
                  </div>
                </div>
                <div className="featured-content">
                  <div className="featured-title">
                    <h3 style={{ color: comp.highlight ? '#fff' : 'inherit' }}>Composante {comp.num}</h3>
                    <h5 className={comp.highlight ? 'text-white' : 'text-theme-SkinColor'} style={{ fontSize: '14px', marginTop: '5px' }}>{comp.title}</h5>
                  </div>
                  <div className="featured-desc">
                    <p style={{ color: comp.highlight ? 'rgba(255,255,255,.85)' : 'inherit' }}>{comp.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    {/* components-section end */}

    {/* copa-highlight */}
    <section className="ttm-row clearfix">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="section-title">
              <div className="title-header">
                <h3>Sous-composante <span className="text-theme-SkinColor">1.2</span></h3>
                <h2 className="title">Le COPA : mécanisme phare du PRETE</h2>
              </div>
              <div className="title-desc">
                <p>La sous-composante 1.2 « Amélioration des capacités des MPME » porte le <strong>Concours de Plans d'Affaires (COPA)</strong>, le mécanisme central d'appui aux entrepreneurs burundais.</p>
                <p className="mt-15">Le COPA combine formation, mentorat et financement pour offrir un accompagnement complet aux porteurs de projets viables et innovants.</p>
              </div>
            </div>
            <div className="mt-30">
              <Link to="/copa/presentation" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor mr-15">
                Découvrir le COPA
              </Link>
              <Link to="/copa/comment-participer" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor">
                Comment participer ?
              </Link>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-SkinColor text-theme-WhiteColor p-40 ml-30 ml-lg-0 mt-lg-30" style={{ borderRadius: '4px' }}>
              <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
              <div className="layer-content">
                <h4 className="text-white mb-20">Le COPA en chiffres</h4>
                <ul className="ttm-list ttm-list-style-icon" style={{ '--list-icon-color': '#fff' } as React.CSSProperties}>
                  {[
                    ['🎯', 'Programme de 5 ans (2024–2028)'],
                    ['💰', 'Subventions de contrepartie (matching grants)'],
                    ['📚', 'Formations gratuites en présentiel et en ligne'],
                    ['👥', 'Accompagnement personnalisé par des experts'],
                    ['🌱', 'Priorité femmes, jeunes, réfugiés, climat'],
                  ].map(([icon, text], i) => (
                    <li key={i} className="pb-10">
                      <span style={{ marginRight: '10px', fontSize: '16px' }}>{icon}</span>
                      <div className="ttm-list-li-content" style={{ color: 'rgba(255,255,255,.9)' }}>{text}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* copa-highlight end */}

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
                  <div className="featured-title"><h3>Prêt à rejoindre le programme COPA ?</h3></div>
                  <div className="featured-desc"><p>Inscrivez-vous dès maintenant et bénéficiez d'un accompagnement complet pour développer votre entreprise.</p></div>
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

export default AboutPrete;
