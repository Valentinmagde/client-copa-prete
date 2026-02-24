import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';

interface CalendarPhase {
  num: string;
  phase: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'done' | 'active' | 'upcoming';
  icon: string;
  tips?: string;
  cta?: { label: string; to: string };
}

const phases: CalendarPhase[] = [
  {
    num: '1',
    phase: 'Inscriptions',
    description: "Ouverture des inscriptions sur la plateforme COPA. Création de compte et remplissage du profil entrepreneur. Période de sensibilisation et d'information.",
    startDate: '1er mars 2025',
    endDate: '31 mars 2025',
    status: 'done',
    icon: '📝',
    tips: "Profitez de cette période pour rassembler vos documents et préparer les informations sur votre entreprise.",
    cta: { label: 'S\'inscrire', to: '/inscription' },
  },
  {
    num: '2',
    phase: 'Formations',
    description: "Sessions de formation obligatoires sur l'entrepreneuriat et la rédaction du plan d'affaires. Disponibles en présentiel (Bujumbura, Gitega, Ngozi) et en ligne.",
    startDate: '1er avril 2025',
    endDate: '30 avril 2025',
    status: 'active',
    icon: '📚',
    tips: "Assistez à un maximum de sessions pour maximiser la qualité de votre plan d'affaires.",
    cta: { label: 'Voir le catalogue formations', to: '/formations/catalogue' },
  },
  {
    num: '3',
    phase: "Dépôt des plans d'affaires",
    description: "Soumission des plans d'affaires sur la plateforme. Vous pouvez déposer votre plan à tout moment pendant cette période. Une confirmation par email et SMS sera envoyée.",
    startDate: '1er mai 2025',
    endDate: '31 mai 2025',
    status: 'upcoming',
    icon: '📤',
    tips: "Ne laissez pas la soumission à la dernière minute. Préparez votre plan bien à l'avance.",
    cta: { label: "Rédiger mon plan", to: '/espace-mpme/mon-plan-affaires/redaction' },
  },
  {
    num: '4',
    phase: 'Évaluation',
    description: "Analyse et évaluation des plans d'affaires soumis par un comité d'experts indépendants. Utilisation d'une grille de critères transparente.",
    startDate: '1er juin 2025',
    endDate: '30 juin 2025',
    status: 'upcoming',
    icon: '🔍',
    tips: "Les évaluateurs examinent : viabilité économique, innovation, impact social/environnemental, capacité de mise en œuvre.",
  },
  {
    num: '5',
    phase: 'Annonce des résultats',
    description: "Publication de la liste des lauréats. Notification individuelle par email et SMS. Conférence de presse officielle.",
    startDate: '15 juillet 2025',
    endDate: '15 juillet 2025',
    status: 'upcoming',
    icon: '🏆',
    tips: "Inscrivez-vous à notre newsletter pour être alerté dès l'annonce des résultats.",
    cta: { label: 'S\'abonner aux alertes', to: '/newsletter' },
  },
  {
    num: '6',
    phase: 'Signature des conventions',
    description: "Rencontre avec les lauréats pour la signature des conventions de subvention. Présentation du plan de mise en œuvre et du calendrier de versement.",
    startDate: '1er août 2025',
    endDate: '31 août 2025',
    status: 'upcoming',
    icon: '✍️',
    tips: "La convention précise les modalités de versement et les obligations de reporting.",
  },
];

const STATUS_META = {
  done:     { label:'Terminé',   color:'#2E7D52', bg:'#E8F5EE' },
  active:   { label:'En cours',  color:'var(--theme-SkinColor,#f07a1a)', bg:'#FDF3E7' },
  upcoming: { label:'À venir',   color:'#1A3A5C', bg:'#EBF3FF' },
};

const COPA_Calendrier: React.FC = () => (
  <div className="site-main">
    <Header />
    <PageHeader title="Calendrier COPA 2025" breadcrumb="COPA / Calendrier" />

    {/* intro */}
    <section className="ttm-row clearfix">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="section-title title-style-center_text pt-15">
              <div className="title-header">
                <h3>Édition <span className="text-theme-SkinColor">2025</span></h3>
                <h2 className="title">Calendrier de l'édition en cours</h2>
              </div>
              <div className="title-desc">
                <p>Retrouvez toutes les dates clés du COPA 2025. Inscrivez-vous à notre newsletter pour être informé de toute modification.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Visual timeline stepper */}
    <section className="ttm-row bg-theme-GreyColor clearfix" style={{ paddingTop:'30px', paddingBottom:'30px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div style={{ display:'flex', alignItems:'flex-start', overflowX:'auto', paddingBottom:'10px' }}>
              {phases.map((phase, i) => (
                <div key={i} style={{ flex:1, minWidth:'100px', display:'flex', flexDirection:'column', alignItems:'center', position:'relative' }}>
                  {/* Connector */}
                  {i > 0 && (
                    <div style={{ position:'absolute', top:'20px', left:0, width:'50%', height:'2px', background: phase.status === 'upcoming' ? 'rgba(119,119,119,.25)' : 'var(--theme-SkinColor,#f07a1a)', zIndex:0 }} />
                  )}
                  {i < phases.length - 1 && (
                    <div style={{ position:'absolute', top:'20px', right:0, width:'50%', height:'2px', background: phases[i+1].status === 'upcoming' ? 'rgba(119,119,119,.25)' : 'var(--theme-SkinColor,#f07a1a)', zIndex:0 }} />
                  )}
                  {/* Circle */}
                  <div style={{
                    width:'42px', height:'42px', borderRadius:'50%', zIndex:1,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background: phase.status==='done' ? '#2E7D52' : phase.status==='active' ? 'var(--theme-SkinColor,#f07a1a)' : '#e8e8e8',
                    boxShadow: phase.status==='active' ? '0 0 0 4px rgba(240,122,26,.2)' : 'none',
                    fontSize:'18px',
                  }}>
                    {phase.status==='done'
                      ? <svg viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" style={{ width:14,height:14 }}><path d="M2 6l3 3 5-5" strokeLinecap="round"/></svg>
                      : <span style={{ fontSize:'16px' }}>{phase.icon}</span>
                    }
                  </div>
                  <p style={{ fontSize:'10px', fontWeight:700, textAlign:'center', marginTop:'8px', color: phase.status==='done'?'#2E7D52':phase.status==='active'?'var(--theme-SkinColor)':'#888' }}>
                    {phase.phase}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Detail cards */}
    <section className="ttm-row clearfix">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="candidate-timeline">
              {phases.map((phase, i) => {
                const meta = STATUS_META[phase.status];
                return (
                  <div key={i} className="timeline-panel" style={{ background:'#fff', borderRadius:'4px', marginBottom:'20px', padding:'30px', boxShadow:'0 2px 10px rgba(0,0,0,.05)', borderLeft: phase.status==='active' ? '4px solid var(--theme-SkinColor,#f07a1a)' : '4px solid transparent' }}>
                    <div className="timeline-head">
                      <h3 style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                        <span style={{ fontSize:'24px' }}>{phase.icon}</span>
                        Phase {phase.num} : {phase.phase}
                      </h3>
                      <span style={{ padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700, color:meta.color, background:meta.bg, whiteSpace:'nowrap' }}>
                        {meta.label}
                      </span>
                    </div>
                    <div className="timeline-body">
                      <p style={{ marginBottom:'10px' }}>{phase.description}</p>
                      <div style={{ display:'flex', gap:'20px', flexWrap:'wrap', marginBottom:'12px' }}>
                        <span style={{ fontSize:'13px', color:'#555' }}>
                          <i className="ti ti-calendar mr-5 text-theme-SkinColor"></i>
                          <strong>Début :</strong> {phase.startDate}
                        </span>
                        {phase.startDate !== phase.endDate && (
                          <span style={{ fontSize:'13px', color:'#555' }}>
                            <i className="ti ti-calendar mr-5 text-theme-SkinColor"></i>
                            <strong>Fin :</strong> {phase.endDate}
                          </span>
                        )}
                      </div>
                      {phase.tips && (
                        <p style={{ fontSize:'13px', color:'#666', fontStyle:'italic', padding:'8px 14px', background:'rgba(119,119,119,.05)', borderLeft:'3px solid var(--theme-SkinColor)', borderRadius:'0 4px 4px 0', margin:'0 0 12px' }}>
                          💡 {phase.tips}
                        </p>
                      )}
                      {phase.cta && (
                        <Link to={phase.cta.to} className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor">
                          {phase.cta.label}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="row">
          <div className="col-lg-12">
            <div style={{ padding:'16px 20px', background:'rgba(240,122,26,.06)', border:'1px solid rgba(240,122,26,.2)', borderRadius:'4px', marginTop:'10px' }}>
              <p style={{ fontSize:'13px', margin:0, color:'#555' }}>
                <strong className="text-theme-SkinColor">📌 Note :</strong> Les dates peuvent être ajustées en fonction des contraintes opérationnelles. Inscrivez-vous à notre newsletter ou consultez régulièrement cette page pour être informé de toute modification.
              </p>
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
                  <div className="featured-title"><h3>Les inscriptions sont ouvertes !</h3></div>
                  <div className="featured-desc"><p>Ne manquez pas l'édition 2025 du COPA. Inscrivez-vous dès maintenant.</p></div>
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

    <Footer />
  </div>
);

export default COPA_Calendrier;
