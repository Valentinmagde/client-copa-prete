import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';

interface Formation {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  duration: string;
  hours: number;
  format: 'presential' | 'online' | 'both';
  mandatory: boolean;
  topics: string[];
  description: string;
  colorClass: string;
}

type FormatFilter = 'all' | 'presential' | 'online' | 'both';

const FORMATIONS: Formation[] = [
  {
    id: 1,
    title: "Introduction à l'entrepreneuriat",
    subtitle: 'Module 1 — Fondamentaux',
    icon: '🚀',
    duration: '1 jour',
    hours: 8,
    format: 'both',
    mandatory: true,
    description: "Découvrez l'esprit entrepreneurial, apprenez à identifier les opportunités d'affaires et évaluez vos compétences pour lancer votre projet avec confiance.",
    topics: [
      "Comprendre l'esprit entrepreneurial",
      "Identifier les opportunités d'affaires",
      'Auto-évaluation de ses compétences',
      'Découverte de l\'environnement des affaires au Burundi',
    ],
    colorClass: 'skincolor',
  },
  {
    id: 2,
    title: "Élaboration du plan d'affaires",
    subtitle: 'Module 2 — Stratégie',
    icon: '📋',
    duration: '3 jours',
    hours: 24,
    format: 'both',
    mandatory: true,
    description: "Maîtrisez la structure d'un plan d'affaires professionnel, réalisez une étude de marché pertinente et définissez votre stratégie commerciale et opérationnelle.",
    topics: [
      "Structure complète d'un plan d'affaires",
      'Étude de marché et analyse de la concurrence',
      'Stratégie commerciale et marketing',
      'Plan opérationnel et ressources humaines',
    ],
    colorClass: 'green',
  },
  {
    id: 3,
    title: 'Gestion financière de base',
    subtitle: 'Module 3 — Finance',
    icon: '💰',
    duration: '2 jours',
    hours: 16,
    format: 'both',
    mandatory: true,
    description: 'Acquérez les bases de la gestion financière d\'entreprise : prévisions, gestion des coûts, plan de trésorerie et analyse de la rentabilité de votre projet.',
    topics: [
      'Prévisions financières sur 3 ans',
      'Calcul des coûts et marges',
      'Plan de trésorerie mensuel',
      'Analyse de rentabilité et seuil d\'équilibre',
    ],
    colorClass: 'navy',
  },
  {
    id: 4,
    title: 'Pitch et présentation',
    subtitle: 'Module 4 — Communication',
    icon: '🎤',
    duration: '1 jour',
    hours: 8,
    format: 'presential',
    mandatory: false,
    description: 'Apprenez à présenter votre projet de manière convaincante devant un jury. Maîtrisez les techniques de pitch, gérez le stress et répondez efficacement aux questions.',
    topics: [
      'Techniques de présentation orale',
      'Préparation au pitch de 5 minutes',
      'Gestion du stress et langage corporel',
      'Simulation devant jury avec feedback',
    ],
    colorClass: 'purple',
  },
];

const FORMAT_META = {
  both:        { label:'Présentiel & En ligne', icon:'🖥️',  color:'#2E7D52',  bg:'#E8F5EE' },
  presential:  { label:'Présentiel uniquement', icon:'🏫',  color:'#1A3A5C',  bg:'#EBF3FF' },
  online:      { label:'En ligne uniquement',   icon:'💻',  color:'#7C3AED',  bg:'#F5F0FF' },
};

const COLOR_STYLES: Record<string, { color: string; bg: string }> = {
  skincolor: { color: 'var(--theme-SkinColor,#f07a1a)', bg: 'rgba(240,122,26,.08)' },
  green:     { color: '#2E7D52',                        bg: '#E8F5EE'              },
  navy:      { color: '#1A3A5C',                        bg: '#EBF3FF'              },
  purple:    { color: '#7C3AED',                        bg: '#F5F0FF'              },
};

const Formations_Catalogue: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FormatFilter>('all');
  const [expandedId, setExpandedId]     = useState<number | null>(null);

  const filtered = FORMATIONS.filter(f =>
    activeFilter === 'all' ? true :
    f.format === activeFilter || f.format === 'both'
  );

  const totalHours = FORMATIONS.reduce((s, f) => s + f.hours, 0);

  return (
    <div className="site-main">
      <Header />
      <PageHeader title="Catalogue des formations" breadcrumb="Formations" />

      {/* intro */}
      <section className="ttm-row clearfix">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="section-title">
                <div className="title-header">
                  <h3>Formations <span className="text-theme-SkinColor">gratuites</span></h3>
                  <h2 className="title">Un parcours complet pour réussir votre plan d'affaires</h2>
                </div>
                <div className="title-desc">
                  <p>Le COPA propose <strong>{FORMATIONS.length} formations spécialisées</strong> pour vous aider à développer vos compétences entrepreneuriales et rédiger un plan d'affaires convaincant. Toutes nos formations sont entièrement <strong>gratuites</strong>.</p>
                </div>
              </div>
              <div className="d-flex flex-wrap gap-15 mt-25" style={{ gap: '12px' }}>
                <Link to="/formations/calendrier-sessions" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor">
                  📅 Voir le calendrier des sessions
                </Link>
                <Link to="/inscription" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor">
                  S'inscrire au programme
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row mt-lg-30">
                {[
                  { num: String(FORMATIONS.length), label: 'Formations disponibles', color: 'var(--theme-SkinColor)' },
                  { num: `${totalHours}h`,          label: 'De contenu total',       color: '#2E7D52'               },
                  { num: '100%',                     label: 'Gratuit',                color: '#7C3AED'               },
                  { num: '2',                        label: 'Formats (Pré. / En ligne)', color: '#1A3A5C'            },
                ].map((stat, i) => (
                  <div key={i} className="col-6 mb-20">
                    <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-GreyColor p-25 text-center" style={{ borderRadius: '4px' }}>
                      <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                      <div className="layer-content">
                        <h3 style={{ fontSize: '28px', fontWeight: 800, color: stat.color, margin: '0 0 4px' }}>{stat.num}</h3>
                        <p style={{ fontSize: '12px', color: '#666', margin: 0, lineHeight: 1.3 }}>{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* filter + cards */}
      <section className="ttm-row bg-theme-GreyColor clearfix">
        <div className="container">

          {/* Filter tabs */}
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex flex-wrap justify-content-center mb-35" style={{ gap: '8px' }}>
                {([
                  { key: 'all',        label: 'Toutes les formations' },
                  { key: 'presential', label: 'Présentiel'            },
                  { key: 'online',     label: 'En ligne'              },
                  { key: 'both',       label: 'Présentiel & En ligne' },
                ] as { key: FormatFilter; label: string }[]).map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setActiveFilter(opt.key)}
                    className={`ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ${
                      activeFilter === opt.key
                        ? 'ttm-btn-style-fill ttm-btn-color-skincolor'
                        : 'ttm-btn-style-border ttm-btn-color-skincolor'
                    }`}
                    style={{ background: activeFilter !== opt.key ? '#fff' : undefined }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Formation cards */}
          <div className="row">
            {filtered.map(formation => {
              const fmeta    = FORMAT_META[formation.format];
              const colStyle = COLOR_STYLES[formation.colorClass];
              const isOpen   = expandedId === formation.id;

              return (
                <div key={formation.id} className="col-lg-6 mb-30">
                  <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-WhiteColor h-100"
                    style={{ borderRadius: '4px', boxShadow: '0 2px 14px rgba(0,0,0,.07)', overflow: 'hidden', border: isOpen ? `1.5px solid ${colStyle.color}` : '1.5px solid transparent', transition: 'border .2s' }}>
                    <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                    <div className="layer-content">

                      {/* Header bande */}
                      <div style={{ height: '4px', background: colStyle.color, width: '100%' }} />

                      <div style={{ padding: '28px 30px 24px' }}>
                        {/* Top row */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                          <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: colStyle.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                            {formation.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '.7px', margin: '0 0 4px' }}>
                              {formation.subtitle}
                            </p>
                            <h4 style={{ fontSize: '17px', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>{formation.title}</h4>
                          </div>
                          {formation.mandatory && (
                            <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, color: '#C0392B', background: '#FDECEA', whiteSpace: 'nowrap', flexShrink: 0 }}>
                              Obligatoire
                            </span>
                          )}
                        </div>

                        {/* Meta row */}
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '14px' }}>
                          <span style={{ fontSize: '12px', color: '#555', display: 'flex', alignItems: 'center', gap: 5 }}>
                            <i className="ti ti-time" style={{ color: colStyle.color }} /> {formation.duration} ({formation.hours}h)
                          </span>
                          <span style={{ padding: '2px 10px', borderRadius: 20, fontSize: '11px', fontWeight: 700, color: fmeta.color, background: fmeta.bg }}>
                            {fmeta.icon} {fmeta.label}
                          </span>
                        </div>

                        <p style={{ fontSize: '13.5px', color: '#555', lineHeight: 1.55, margin: '0 0 16px' }}>{formation.description}</p>

                        {/* Expand / collapse */}
                        <button
                          onClick={() => setExpandedId(isOpen ? null : formation.id)}
                          className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
                          style={{ marginRight: '10px' }}>
                          {isOpen ? '▲ Masquer le contenu' : '▼ Voir le contenu'}
                        </button>
                        <Link to="/inscription" className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor">
                          S'inscrire
                        </Link>

                        {/* Topics accordion */}
                        {isOpen && (
                          <div style={{ marginTop: '18px', padding: '16px 20px', background: colStyle.bg, borderRadius: '6px' }}>
                            <p style={{ fontSize: '12px', fontWeight: 700, color: colStyle.color, textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 10px' }}>
                              Contenu de la formation
                            </p>
                            <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor" style={{ margin: 0 }}>
                              {formation.topics.map((topic, i) => (
                                <li key={i} className="pb-5">
                                  <i className="far fa-check-circle" style={{ color: colStyle.color }}></i>
                                  <div className="ttm-list-li-content" style={{ fontSize: '13px' }}>{topic}</div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Note obligatoire */}
      <section className="ttm-row clearfix" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div style={{ padding: '20px 28px', background: 'rgba(240,122,26,.06)', border: '1px solid rgba(240,122,26,.2)', borderRadius: '6px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <i className="ti ti-info-alt" style={{ fontSize: '22px', color: 'var(--theme-SkinColor)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: 'var(--theme-DarkColor)' }}>
                    Formations obligatoires pour accéder au concours
                  </strong>
                  <p style={{ fontSize: '13px', color: '#555', margin: 0 }}>
                    Les modules <strong>1 (Introduction à l'entrepreneuriat)</strong>, <strong>2 (Plan d'affaires)</strong> et <strong>3 (Gestion financière)</strong> sont obligatoires pour soumettre un plan d'affaires au COPA. Le module 4 (Pitch) est fortement recommandé mais optionnel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    <div className="featured-title"><h3>Prêt à commencer votre formation COPA ?</h3></div>
                    <div className="featured-desc"><p>Toutes les formations sont gratuites et accessibles dès votre inscription.</p></div>
                  </div>
                </div>
                <Link to="/formations/calendrier-sessions" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white">
                  Voir les prochaines sessions
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

export default Formations_Catalogue;
