import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import PageHeader from '@/components/layout/PageHeader';
import React, { Component } from 'react';
import ProgressBar from 'react-animated-progress-bar';
import { Link } from 'react-router-dom';

// ─── Data ─────────────────────────────────────────────────────────────────────

const user = {
  firstName: 'Valentin', lastName: 'Nkurunziza',
  companyName: 'TechBujumbura SARL',
  sector: 'Technologies de l\'information',
  province: 'Bujumbura Mairie',
  phone: '+257 79 000 000',
  email: 'valentin@example.com',
};

const planSummary = {
  status: 'ready' as 'draft' | 'ready' | 'submitted' | 'under_review' | 'approved' | 'rejected',
  completionPct: 83,
  grantRequested: 8500000,
  submittedAt: null as string | null,
  sections: [
    { title: 'Résumé exécutif',            status: 'completed',   words: 312 },
    { title: 'Analyse du marché',          status: 'completed',   words: 380 },
    { title: 'Produits & services',        status: 'completed',   words: 290 },
    { title: 'Plan opérationnel',          status: 'in_progress', words: 90  },
    { title: 'Projections financières',    status: 'completed',   words: 220 },
    { title: 'Utilisation de la subvention', status: 'completed', words: 165 },
  ],
  documents: [
    { label: "CIN",                      status: 'ok'      },
    { label: "Registre de commerce",     status: 'ok'      },
    { label: "Certificat NIF",           status: 'missing' },
    { label: "Patente",                  status: 'missing' },
    { label: "CV du dirigeant",          status: 'ok'      },
  ],
  trainings: { done: 2, total: 5, certified: false },
};

const STATUS_PLAN: Record<string, { label: string; color: string; bg: string }> = {
  draft:        { label: 'Brouillon',         color: '#6B7A90', bg: '#F4F5F7' },
  ready:        { label: 'Prêt à soumettre',  color: '#2E7D52', bg: '#E8F5EE' },
  submitted:    { label: 'Soumis',            color: '#1A3A5C', bg: '#EBF3FF' },
  under_review: { label: 'En évaluation',     color: '#7C3AED', bg: '#F5F0FF' },
  approved:     { label: 'Approuvé',          color: '#2E7D52', bg: '#E8F5EE' },
  rejected:     { label: 'Refusé',           color: '#C0392B', bg: '#FDECEA' },
};

const sectionsDone = planSummary.sections.filter(s => s.status === 'completed').length;
const docsDone     = planSummary.documents.filter(d => d.status === 'ok').length;

// Pré-requis avant soumission
const requirements = [
  { label: 'Profil complété à 80 % minimum',        met: true  },
  { label: `${sectionsDone}/6 sections du plan complétées`, met: sectionsDone >= 5 },
  { label: 'Documents obligatoires soumis',          met: docsDone >= 3 },
  { label: 'Formations COPA en cours',               met: planSummary.trainings.done >= 1 },
  { label: 'Plan complété à 80 % minimum',           met: planSummary.completionPct >= 80 },
];
const allMet = requirements.every(r => r.met);

class MonPlanAffairesSoumission extends Component {
  state = {
    agreed: false,
    certify: false,
    submitting: false,
    submitted: false,
    confirmOpen: false,
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!this.state.agreed || !this.state.certify) return;
    this.setState({ submitting: true });
    await new Promise(r => setTimeout(r, 1500));
    this.setState({ submitting: false, submitted: true, confirmOpen: false });
  };

  render() {
    const s   = this.state;
    const stP = STATUS_PLAN[planSummary.status];

    // Écran succès
    if (s.submitted) {
      return (
        <div className="site-main">
          <Header />
          <PageHeader title="Plan soumis !" breadcrumb="Soumission" />
          <div className="ttm-row bg-theme-GreyColor clearfix">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7 col-md-9">
                  <div className="overview-box text-center p-50">
                    <div className="title">
                      <span style={{ fontSize: 56, display: 'block', marginBottom: 16 }}>🎉</span>
                      <h3>Votre plan d'affaires a été soumis avec succès !</h3>
                    </div>
                    <div className="desc">
                      <p style={{ fontSize: 15, color: '#555', marginBottom: 24 }}>
                        Notre comité d'experts va examiner votre dossier dans un délai de <strong>10 à 15 jours ouvrables</strong>.
                        Vous recevrez une notification par email à <strong>{user.email}</strong>.
                      </p>
                      <div className="candidate-timeline">
                        {[
                          { label: 'Plan soumis',          year: "Aujourd'hui",  desc: 'Votre dossier a été transmis à l\'équipe COPA.' },
                          { label: 'Analyse préliminaire', year: '2–5 jours',    desc: 'Vérification des critères d\'éligibilité.' },
                          { label: 'Évaluation complète',  year: '5–15 jours',  desc: 'Examen approfondi par le comité d\'experts.' },
                          { label: 'Décision finale',      year: 'J+15',         desc: 'Notification de la décision par email.' },
                        ].map((step, i) => (
                          <div key={i} className="timeline-panel">
                            <div className="timeline-head">
                              <h3>{step.label}</h3>
                              <span className="timeline-year">{step.year}</span>
                            </div>
                            <div className="timeline-body"><p>{step.desc}</p></div>
                          </div>
                        ))}
                      </div>
                      <Link to="/espace-mpme/dashboard"
                        className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor">
                        Retour au tableau de bord
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="site-main">
        <Header />
        <PageHeader title="Soumettre mon plan" breadcrumb="Soumission" />

        <div className="ttm-row sidebar job-sidebar clearfix">
          <div className="container">
            <div className="row">


              {/* ══════════ SIDEBAR ══════════ */}
              <div className="col-lg-4 widget-area sidebar-left job_list-widget-area">
                <div className="job_list-widget">

                  {/* Statut */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-files" /> Statut du plan
                    </h3>
                    <ul>
                      <li className="d-flex align-items-center">
                        <b className="mr-5">État :</b>
                        <span style={{ padding:'2px 10px',borderRadius:20,fontSize:11,fontWeight:700,color:stP.color,background:stP.bg }}>
                          {stP.label}
                        </span>
                      </li>
                      <li className="d-flex"><b className="mr-5">Complétion :</b><span>{planSummary.completionPct} %</span></li>
                      <li className="d-flex"><b className="mr-5">Sections :</b><span>{sectionsDone}/6 terminées</span></li>
                      <li className="d-flex"><b className="mr-5">Documents :</b><span>{docsDone}/{planSummary.documents.length} soumis</span></li>
                      <li className="d-flex"><b className="mr-5">Subvention :</b><span>{planSummary.grantRequested.toLocaleString('fr-BI')} BIF</span></li>
                    </ul>
                  </aside>

                  {/* Conditions */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-check-box" /> Pré-requis de soumission
                    </h3>
                    <ul>
                      {requirements.map((req, i) => (
                        <li key={i} className="d-flex align-items-center" style={{ gap: 8 }}>
                          <span style={{ width:18,height:18,borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background: req.met?'#2E7D52':'rgba(119,119,119,.15)' }}>
                            {req.met
                              ? <svg viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="2.5" style={{ width:10,height:10 }}><path d="M2 5l2.5 2.5 4-4" strokeLinecap="round" /></svg>
                              : <span style={{ fontSize:8,fontWeight:700,color:'#aaa' }}>✗</span>
                            }
                          </span>
                          <span style={{ fontSize:12,color: req.met?'#2E7D52':'#999',fontWeight: req.met?600:400 }}>
                            {req.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {!allMet && (
                      <div style={{ padding:'10px 14px',background:'#FDF3E7',borderLeft:'3px solid #C97B2E',borderRadius:4,margin:'10px 0 5px',fontSize:12,color:'#555' }}>
                        <strong style={{ color:'#C97B2E' }}>⚠ Attention :</strong> Certains pré-requis ne sont pas remplis. Vous pouvez tout de même soumettre mais votre dossier risque d'être incomplet.
                      </div>
                    )}
                  </aside>

                  {/* Navigation */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-layout-list-thumb" /> Mon espace MPME
                    </h3>
                    <ul>
                      <li className="d-flex align-items-center"><i className="ti ti-user mr-5" /><Link to="/espace-mpme/mon-profil/informations">Mon profil</Link></li>
                      <li className="d-flex align-items-center"><i className="ti ti-clip mr-5" /><Link to="/espace-mpme/mon-profil/documents">Documents</Link></li>
                      <li className="d-flex align-items-center"><i className="ti ti-book mr-5" /><Link to="/espace-mpme/mes-formations/en-cours">Formations</Link></li>
                      <li className="d-flex align-items-center"><i className="ti ti-files mr-5" /><Link to="/espace-mpme/mon-plan-affaires/redaction">Rédiger le plan</Link></li>
                      <li className="d-flex align-items-center"><i className="ti ti-upload mr-5 text-theme-SkinColor" /><Link to="/espace-mpme/mon-plan-affaires/soumission" className="text-theme-SkinColor fw-bold">Soumission</Link></li>
                      <li className="d-flex align-items-center"><i className="ti ti-dashboard mr-5" /><Link to="/espace-mpme/dashboard">Tableau de bord</Link></li>
                    </ul>
                  </aside>

                </div>

                <aside className="widget widget-download">
                  <ul className="download">
                    <li>
                      <Link to="/espace-mpme/mon-plan-affaires/redaction">Modifier le plan</Link>
                      <i className="ti ti-pencil" />
                    </li>
                    <li>
                      <a href="#">Télécharger PDF</a>
                      <i className="ti ti-download" />
                    </li>
                  </ul>
                </aside>

              </div>
              {/* sidebar end */}


              {/* ══════════ CONTENU ══════════ */}
              <div className="col-lg-8 content-area">
                <div className="row">
                  <div className="col-md-12">

                    {/* En-tête identité */}
                    <div className="candidate-data">
                      <div className="candidate-img">
                        <div style={{ width:100,height:100,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:700,color:'#fff',background:'var(--theme-SkinColor,#f07a1a)' }}>
                          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </div>
                      </div>
                      <div className="candidate-caption">
                        <h5>{user.firstName} {user.lastName}</h5>
                        <span>{user.companyName}</span>
                        <div className="meta-line">
                          <span><i className="ti ti-briefcase" /> {user.sector}</span>
                          <span><i className="ti ti-location-pin" /> {user.province}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">


                    {/* Récap progression */}
                    <div className="overview-box">
                      <div className="title"><h5>Récapitulatif du plan d'affaires</h5></div>
                      <div className="desc pb-30">
                        <div className="ttm-progress-bar clearfix">
                          <h3 className="progressbar-title">Complétion globale ({planSummary.completionPct} %)</h3>
                          <ProgressBar rect percentage={String(planSummary.completionPct)} />
                        </div>
                        <div className="ttm-progress-bar clearfix">
                          <h3 className="progressbar-title">Sections complétées ({sectionsDone}/6)</h3>
                          <ProgressBar rect percentage={String(Math.round(sectionsDone / 6 * 100))} />
                        </div>
                        <div className="ttm-progress-bar clearfix">
                          <h3 className="progressbar-title">Documents soumis ({docsDone}/{planSummary.documents.length})</h3>
                          <ProgressBar rect percentage={String(Math.round(docsDone / planSummary.documents.length * 100))} />
                        </div>
                      </div>
                    </div>


                    {/* Détail sections — candidate-timeline */}
                    <div className="overview-box">
                      <div className="title"><h5>Sections du plan</h5></div>
                      <div className="desc">
                        <div className="candidate-timeline">
                          {planSummary.sections.map((sec, i) => (
                            <div key={i} className="timeline-panel">
                              <div className="timeline-head">
                                <h3 style={{ display:'flex',alignItems:'center',gap:8 }}>
                                  <span style={{ display:'inline-flex',alignItems:'center',justifyContent:'center',width:22,height:22,borderRadius:'50%',background: sec.status==='completed'?'#2E7D52':'rgba(201,123,46,0.15)',flexShrink:0 }}>
                                    {sec.status === 'completed'
                                      ? <svg viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="2.5" style={{ width:10,height:10 }}><path d="M2 5l2.5 2.5 4-4" strokeLinecap="round" /></svg>
                                      : <span style={{ fontSize:8,fontWeight:700,color:'#C97B2E' }}>{i+1}</span>
                                    }
                                  </span>
                                  {sec.title}
                                </h3>
                                <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                                  <span style={{ fontSize:12,color:'#888' }}>{sec.words} mots</span>
                                  <span style={{ padding:'2px 10px',borderRadius:20,fontSize:11,fontWeight:700,color:sec.status==='completed'?'#2E7D52':'#C97B2E',background:sec.status==='completed'?'#E8F5EE':'#FDF3E7' }}>
                                    {sec.status === 'completed' ? 'Complété' : 'En cours'}
                                  </span>
                                </div>
                              </div>
                              {sec.status !== 'completed' && (
                                <div className="timeline-body">
                                  <Link to="/espace-mpme/mon-plan-affaires/redaction"
                                    className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor">
                                    Compléter →
                                  </Link>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>


                    {/* Documents */}
                    <div className="overview-box">
                      <div className="title"><h5>Documents joints</h5></div>
                      <div className="desc">
                        <div className="candidate-timeline">
                          {planSummary.documents.map((doc, i) => (
                            <div key={i} className="timeline-panel">
                              <div className="timeline-head">
                                <h3 style={{ display:'flex',alignItems:'center',gap:8 }}>
                                  <i className={`ti ${doc.status==='ok'?'ti-check':'ti-close'}`} style={{ fontSize:13,color:doc.status==='ok'?'#2E7D52':'#dc3545' }} />
                                  {doc.label}
                                </h3>
                                <span style={{ padding:'2px 10px',borderRadius:20,fontSize:11,fontWeight:700,color:doc.status==='ok'?'#2E7D52':'#dc3545',background:doc.status==='ok'?'#E8F5EE':'#FDECEA' }}>
                                  {doc.status === 'ok' ? 'Soumis' : 'Manquant'}
                                </span>
                              </div>
                              {doc.status !== 'ok' && (
                                <div className="timeline-body">
                                  <Link to="/espace-mpme/mon-profil/documents"
                                    className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor">
                                    Ajouter →
                                  </Link>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>


                    {/* Formulaire de soumission finale */}
                    <div className="overview-box">
                      <div className="title"><h5>Soumettre le plan d'affaires</h5></div>
                      <div className="desc">
                        <form className="wrap-form contact_form" onSubmit={this.handleSubmit} noValidate>
                          <div className="row">

                            <div className="col-12">
                              <div style={{ padding:'14px 18px',background:'rgba(245,243,255,.6)',border:'1.5px solid rgba(124,58,237,.2)',borderRadius:6,marginBottom:16 }}>
                                <p style={{ fontSize:13,fontWeight:700,color:'#1A3A5C',margin:'0 0 6px' }}>
                                  ℹ Ce que signifie la soumission :
                                </p>
                                <ul style={{ paddingLeft:18,fontSize:12.5,color:'#555',lineHeight:2,margin:0 }}>
                                  <li>Votre plan sera transmis au comité d'évaluation COPA.</li>
                                  <li>Vous ne pourrez plus modifier le plan après soumission.</li>
                                  <li>La décision vous sera communiquée sous 10–15 jours ouvrables.</li>
                                  <li>En cas de rejet, vous pourrez soumettre une version amendée.</li>
                                </ul>
                              </div>
                            </div>

                            {/* Checkboxes wrap-form */}
                            <div className="col-12">
                              <label style={{ display:'flex',gap:12,alignItems:'flex-start',cursor:'pointer',padding:'12px 16px',border:'1.5px solid rgba(119,119,119,.18)',borderRadius:6,marginBottom:10,background: s.agreed?'rgba(var(--skin-rgb),.04)':'#fff' }}>
                                <input type="checkbox" checked={s.agreed} onChange={e => this.setState({ agreed: e.target.checked })} style={{ marginTop:3,flexShrink:0 }} />
                                <span style={{ fontSize:13,color:'#444',lineHeight:1.5 }}>
                                  J'accepte les <a href="/conditions-utilisation" target="_blank" className="text-theme-SkinColor">conditions d'utilisation de la plateforme COPA</a> et la <a href="/politique-confidentialite" target="_blank" className="text-theme-SkinColor">politique de confidentialité</a>.
                                  <span style={{ color:'#dc3545' }}> *</span>
                                </span>
                              </label>
                              <label style={{ display:'flex',gap:12,alignItems:'flex-start',cursor:'pointer',padding:'12px 16px',border:'1.5px solid rgba(119,119,119,.18)',borderRadius:6,marginBottom:16,background: s.certify?'rgba(var(--skin-rgb),.04)':'#fff' }}>
                                <input type="checkbox" checked={s.certify} onChange={e => this.setState({ certify: e.target.checked })} style={{ marginTop:3,flexShrink:0 }} />
                                <span style={{ fontSize:13,color:'#444',lineHeight:1.5 }}>
                                  Je certifie que toutes les informations fournies dans ce plan d'affaires sont exactes et véridiques à ma connaissance.
                                  <span style={{ color:'#dc3545' }}> *</span>
                                </span>
                              </label>
                            </div>

                            <div className="col-12">
                              <label className="mb-0">
                                <button
                                  type="submit"
                                  className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100"
                                  disabled={!s.agreed || !s.certify || s.submitting}
                                  style={{ opacity: (!s.agreed || !s.certify) ? 0.5 : 1 }}
                                >
                                  {s.submitting ? '⏳ Soumission en cours…' : '✓ Soumettre définitivement le plan d\'affaires'}
                                </button>
                              </label>
                              <p style={{ fontSize:11,color:'#999',textAlign:'center',marginTop:8 }}>
                                Cette action est irréversible. Votre plan sera verrouillé après soumission.
                              </p>
                            </div>

                          </div>
                        </form>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
              {/* content-area end */}


            </div>
          </div>
        </div>


        {/* action-section */}
        <section className="ttm-row action-section bg-theme-SkinColor text-theme-WhiteColor clearfix">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="d-md-flex align-items-center justify-content-between">
                  <div className="featured-icon-box icon-align-before-content style2">
                    <div className="featured-icon">
                      <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-white ttm-icon_element-size-xl">
                        <i className="flaticon flaticon-recruitment-5" />
                      </div>
                    </div>
                    <div className="featured-content">
                      <div className="featured-title">
                        <h3>Des questions avant de soumettre ?</h3>
                      </div>
                      <div className="featured-desc">
                        <p>Notre équipe est disponible pour vous accompagner jusqu'à la soumission finale.</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/contact"
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white">
                    Contacter l'assistance
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default MonPlanAffairesSoumission;
