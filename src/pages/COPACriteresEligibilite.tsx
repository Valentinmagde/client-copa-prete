import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';

const enterpriseCriteria = [
  'Être une micro, petite ou moyenne entreprise selon la définition nationale',
  'Être formellement enregistrée au Burundi OU s\'engager à se formaliser en cas de sélection',
  'Opérer dans un secteur éligible (voir liste ci-dessous)',
  "Ne pas avoir de dette impayée envers l'État ou des institutions financières (OBR/INSS/etc.)",
];

const promoterCriteria = [
  'Être âgé de 18 ans minimum',
  'Être de nationalité burundaise OU réfugié enregistré au Burundi',
  "N'avoir pas bénéficié d'une subvention COPA lors d'une édition précédente",
  'S\'engager à suivre les formations obligatoires',
];

const eligibleSectors = [
  { icon: '🌾', label: 'Agriculture et agroalimentaire',    desc: 'Production, transformation, conservation et commercialisation des produits agricoles' },
  { icon: '🏭', label: 'Transformation industrielle',       desc: "Transformation de matières premières locales, production manufacturière à valeur ajoutée" },
  { icon: '🛍️', label: 'Commerce et distribution',          desc: 'Commerce de détail et de gros, distribution de biens de consommation courante' },
  { icon: '🎨', label: 'Artisanat et artisanat d\'art',      desc: "Fabrication artisanale, objets d'art, textile traditionnel et cuir" },
  { icon: '💻', label: 'Technologies et numérique',         desc: "Développement logiciel, e-commerce, services numériques, fintech" },
  { icon: '🏥', label: 'Santé et bien-être',                desc: 'Services de santé de proximité, pharmacies, produits para-médicaux' },
  { icon: '🎓', label: 'Éducation et formation',            desc: "Centres de formation professionnelle, crèches, soutien scolaire" },
  { icon: '🌿', label: 'Environnement et énergie',          desc: "Énergies renouvelables, gestion des déchets, agriculture durable" },
  { icon: '🚗', label: 'Transport et logistique',           desc: "Transport de marchandises et de personnes, services logistiques" },
  { icon: '🍽️', label: 'Hôtellerie et restauration',        desc: "Restaurants, traiteurs, hébergement, tourisme local" },
];

const excludedSectors = [
  'Activités illicites ou contraires à la législation burundaise',
  'Production, commerce ou distribution de tabac, alcool ou drogues',
  'Activités nuisibles à l\'environnement (non conformes aux normes EIES)',
  'Jeux de hasard et paris',
  'Activités militaires ou para-militaires',
  'Prêt d\'argent à intérêt (activités de type usure)',
];

const bonusGroups = [
  { icon: '👩‍💼', label: 'Entreprises dirigées par des femmes',  bonus: '+10 pts', color: '#7C3AED', bg: '#F5F0FF' },
  { icon: '🌍', label: 'Entrepreneurs réfugiés',                  bonus: '+10 pts', color: '#1A3A5C', bg: '#EBF3FF' },
  { icon: '🎓', label: 'Jeunes entrepreneurs (18–35 ans)',         bonus: '+5 pts',  color: '#2E7D52', bg: '#E8F5EE' },
  { icon: '🌿', label: 'Impact climatique positif',               bonus: '+5 pts',  color: '#C97B2E', bg: '#FDF3E7' },
];

const COPA_Criteres_Eligibilite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'eligible'|'excluded'>('eligible');

  return (
    <div className="site-main">
      <Header />
      <PageHeader title="Critères d'éligibilité" breadcrumb="COPA / Éligibilité" />

      {/* intro */}
      <section className="ttm-row clearfix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="section-title title-style-center_text pt-15">
                <div className="title-header">
                  <h3>Qui peut <span className="text-theme-SkinColor">participer ?</span></h3>
                  <h2 className="title">Vérifiez votre éligibilité au COPA</h2>
                </div>
                <div className="title-desc">
                  <p>Le COPA est ouvert aux MPME répondant aux critères suivants. Vérifiez votre éligibilité avant de vous inscrire.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* criteria-section */}
      <section className="ttm-row bg-theme-GreyColor clearfix">
        <div className="container">
          <div className="row">

            {/* Entreprise */}
            <div className="col-lg-6 mb-30">
              <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-WhiteColor p-40 h-100" style={{ borderRadius:'4px', boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                <div className="layer-content">
                  <div className="d-flex align-items-center mb-20">
                    <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-sm ttm-icon_element-style-round mb-0">
                      <i className="ti ti-briefcase"></i>
                    </div>
                    <h4 className="ml-15 mb-0">Critères relatifs à l'entreprise</h4>
                  </div>
                  <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                    {enterpriseCriteria.map((c, i) => (
                      <li key={i} className="pb-10">
                        <i className="far fa-check-circle"></i>
                        <div className="ttm-list-li-content">{c}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Promoteur */}
            <div className="col-lg-6 mb-30">
              <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-WhiteColor p-40 h-100" style={{ borderRadius:'4px', boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                <div className="layer-content">
                  <div className="d-flex align-items-center mb-20">
                    <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-size-sm ttm-icon_element-style-round mb-0">
                      <i className="ti ti-user"></i>
                    </div>
                    <h4 className="ml-15 mb-0">Critères relatifs au promoteur</h4>
                  </div>
                  <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                    {promoterCriteria.map((c, i) => (
                      <li key={i} className="pb-10">
                        <i className="far fa-check-circle"></i>
                        <div className="ttm-list-li-content">{c}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* sectors */}
      <section className="ttm-row clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>Secteurs <span className="text-theme-SkinColor">éligibles</span></h3>
                  <h2 className="title">Votre secteur est-il concerné ?</h2>
                </div>
              </div>
              {/* Tab buttons */}
              <div className="d-flex justify-content-center mb-30" style={{ gap:'10px' }}>
                <button
                  className={`ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ${activeTab==='eligible' ? 'ttm-btn-style-fill ttm-btn-color-skincolor' : 'ttm-btn-style-border ttm-btn-color-skincolor'}`}
                  onClick={() => setActiveTab('eligible')}>
                  ✓ Secteurs éligibles ({eligibleSectors.length})
                </button>
                <button
                  className={`ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ${activeTab==='excluded' ? 'ttm-btn-style-fill ttm-btn-color-skincolor' : 'ttm-btn-style-border ttm-btn-color-skincolor'}`}
                  onClick={() => setActiveTab('excluded')}>
                  ✗ Secteurs exclus ({excludedSectors.length})
                </button>
              </div>
            </div>
          </div>

          {activeTab === 'eligible' && (
            <div className="row">
              {eligibleSectors.map((s, i) => (
                <div key={i} className="col-lg-4 col-md-6 mb-20">
                  <div className="featured-icon-box icon-align-before-content bg-theme-GreyColor p-20" style={{ borderRadius:'4px', height:'100%' }}>
                    <div className="featured-icon">
                      <span style={{ fontSize:'28px', display:'block', lineHeight:1 }}>{s.icon}</span>
                    </div>
                    <div className="featured-content">
                      <div className="featured-title"><h3 style={{ fontSize:'14px', marginBottom:'4px' }}>{s.label}</h3></div>
                      <div className="featured-desc"><p style={{ fontSize:'12px', margin:0, color:'#666' }}>{s.desc}</p></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'excluded' && (
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="ttm-col-bgcolor-yes ttm-bg p-30" style={{ background:'#FEF2F2', border:'1px solid rgba(192,57,43,.15)', borderRadius:'4px' }}>
                  <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                  <div className="layer-content">
                    <p className="mb-20" style={{ fontSize:'14px', color:'#C0392B', fontWeight:600 }}>
                      ⚠️ Les activités suivantes sont exclues du programme COPA :
                    </p>
                    <ul className="ttm-list ttm-list-style-icon" style={{ '--list-icon-color':'#C0392B' } as React.CSSProperties}>
                      {excludedSectors.map((s, i) => (
                        <li key={i} className="pb-10">
                          <i className="fas fa-times-circle" style={{ color:'#C0392B' }}></i>
                          <div className="ttm-list-li-content" style={{ color:'#555' }}>{s}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* bonus */}
      <section className="ttm-row bg-theme-GreyColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>Points <span className="text-theme-SkinColor">bonus</span></h3>
                  <h2 className="title">Groupes prioritaires</h2>
                </div>
                <div className="title-desc text-center">
                  <p>📌 Ces groupes bénéficient de points supplémentaires lors de l'évaluation pour favoriser l'inclusion économique.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {bonusGroups.map((g, i) => (
              <div key={i} className="col-lg-3 col-md-6 mb-20">
                <div className="text-center p-25 bg-theme-WhiteColor" style={{ borderRadius:'4px', boxShadow:'0 2px 10px rgba(0,0,0,.06)', height:'100%' }}>
                  <span style={{ fontSize:'36px', display:'block', marginBottom:'10px' }}>{g.icon}</span>
                  <span style={{ display:'inline-block', padding:'4px 14px', borderRadius:20, fontSize:13, fontWeight:800, color:g.color, background:g.bg, marginBottom:'10px' }}>
                    {g.bonus}
                  </span>
                  <h6 style={{ fontSize:'13px', fontWeight:600 }}>{g.label}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="ttm-row clearfix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h3 className="mb-15">Vous remplissez les critères ?</h3>
              <p className="mb-25">Inscrivez-vous gratuitement et commencez votre parcours COPA.</p>
              <Link to="/inscription" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor mr-15">
                S'inscrire maintenant
              </Link>
              <Link to="/copa/comment-participer" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor">
                Comment participer ?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* action-section */}
      <section className="ttm-row action-section bg-theme-SkinColor text-theme-WhiteColor clearfix">
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
                    <div className="featured-title"><h3>Une question sur votre éligibilité ?</h3></div>
                    <div className="featured-desc"><p>Notre équipe est disponible pour vous aider à clarifier votre situation.</p></div>
                  </div>
                </div>
                <Link to="/contact" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white">
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default COPA_Criteres_Eligibilite;
