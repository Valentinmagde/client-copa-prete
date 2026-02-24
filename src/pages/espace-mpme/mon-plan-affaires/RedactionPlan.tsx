import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import PageHeader from '@/components/layout/PageHeader';
import React, { Component } from 'react';
import ProgressBar from 'react-animated-progress-bar';
import { Link } from 'react-router-dom';

// ─── Types & data ─────────────────────────────────────────────────────────────

type SectionStatus = 'completed' | 'in_progress' | 'not_started';

interface PlanSection {
  id: string;
  num: number;
  title: string;
  description: string;
  status: SectionStatus;
  wordCount?: number;
  minWords: number;
  fields: { name: string; label: string; type: 'text' | 'textarea' | 'number'; placeholder: string; value: string }[];
}

const STATUS_META: Record<SectionStatus, { label: string; color: string; bg: string }> = {
  completed:   { label: 'Complété',     color: '#2E7D52', bg: '#E8F5EE' },
  in_progress: { label: 'En cours',     color: '#C97B2E', bg: '#FDF3E7' },
  not_started: { label: 'Non démarré',  color: '#6B7A90', bg: '#F4F5F7' },
};

const SECTIONS: PlanSection[] = [
  {
    id: 'executive_summary', num: 1,
    title: 'Résumé exécutif',
    description: 'Présentez en quelques paragraphes votre projet, votre vision et vos objectifs principaux. Ce résumé sera lu en premier par les évaluateurs.',
    status: 'completed', wordCount: 312, minWords: 200,
    fields: [
      { name: 'vision',      label: 'Vision de l\'entreprise', type: 'textarea', placeholder: 'Décrivez votre vision à long terme…', value: 'TechBujumbura SARL vise à devenir le leader du développement logiciel au Burundi…' },
      { name: 'mission',     label: 'Mission',                  type: 'textarea', placeholder: 'Quelle est votre mission principale ?', value: 'Fournir des solutions numériques accessibles et adaptées aux PME burundaises.' },
      { name: 'objectifs',   label: 'Objectifs à 3 ans',        type: 'textarea', placeholder: 'Listez vos objectifs mesurables…', value: '1. Atteindre 50 clients PME\n2. Embaucher 20 développeurs locaux\n3. Lancer 3 produits SaaS.' },
    ],
  },
  {
    id: 'market_analysis', num: 2,
    title: 'Analyse du marché',
    description: 'Étudiez votre marché cible, la demande, les tendances et les opportunités. Appuyez-vous sur des données chiffrées.',
    status: 'in_progress', wordCount: 120, minWords: 300,
    fields: [
      { name: 'market_size',    label: 'Taille du marché',         type: 'textarea', placeholder: 'Estimez la taille de votre marché…', value: 'Le marché des PME burundaises compte environ 50 000 entreprises dont seulement 12% utilisent des outils numériques.' },
      { name: 'target_clients', label: 'Clients cibles',           type: 'textarea', placeholder: 'Décrivez votre clientèle idéale…', value: '' },
      { name: 'competitors',    label: 'Concurrence',              type: 'textarea', placeholder: 'Qui sont vos principaux concurrents ?', value: '' },
      { name: 'opportunity',    label: 'Opportunité identifiée',   type: 'textarea', placeholder: 'Quelle opportunité de marché exploitez-vous ?', value: '' },
    ],
  },
  {
    id: 'products_services', num: 3,
    title: 'Produits & services',
    description: 'Décrivez en détail vos offres, leur valeur ajoutée et ce qui les différencie de la concurrence.',
    status: 'not_started', minWords: 250,
    fields: [
      { name: 'offer_desc',     label: 'Description de l\'offre',   type: 'textarea', placeholder: 'Décrivez vos produits ou services…', value: '' },
      { name: 'value_prop',     label: 'Proposition de valeur',     type: 'textarea', placeholder: 'Quelle valeur unique apportez-vous ?', value: '' },
      { name: 'pricing',        label: 'Politique tarifaire',       type: 'textarea', placeholder: 'Comment fixez-vous vos prix ?', value: '' },
    ],
  },
  {
    id: 'operations', num: 4,
    title: 'Plan opérationnel',
    description: 'Décrivez comment vous allez produire et livrer vos produits/services : équipe, processus, ressources, infrastructure.',
    status: 'not_started', minWords: 300,
    fields: [
      { name: 'team',        label: 'Équipe dirigeante',      type: 'textarea', placeholder: 'Présentez les membres clés de votre équipe…', value: '' },
      { name: 'process',     label: 'Processus opérationnel', type: 'textarea', placeholder: 'Comment produisez-vous vos services ?', value: '' },
      { name: 'resources',   label: 'Ressources nécessaires', type: 'textarea', placeholder: 'Locaux, équipements, partenaires…', value: '' },
    ],
  },
  {
    id: 'financials', num: 5,
    title: 'Projections financières',
    description: 'Présentez vos prévisions de chiffre d\'affaires, de charges et de bénéfice sur 3 ans. Justifiez vos hypothèses.',
    status: 'not_started', minWords: 200,
    fields: [
      { name: 'revenue_y1',  label: 'CA prévu an 1 (BIF)',   type: 'number', placeholder: 'Ex : 15000000', value: '' },
      { name: 'revenue_y2',  label: 'CA prévu an 2 (BIF)',   type: 'number', placeholder: 'Ex : 25000000', value: '' },
      { name: 'revenue_y3',  label: 'CA prévu an 3 (BIF)',   type: 'number', placeholder: 'Ex : 40000000', value: '' },
      { name: 'charges',     label: 'Charges annuelles',      type: 'textarea', placeholder: 'Listez vos principales charges…', value: '' },
      { name: 'break_even',  label: 'Seuil de rentabilité',   type: 'textarea', placeholder: 'Quand atteindrez-vous l\'équilibre ?', value: '' },
    ],
  },
  {
    id: 'grant_use', num: 6,
    title: 'Utilisation de la subvention',
    description: 'Expliquez précisément comment vous utiliserez la subvention COPA et l\'impact attendu sur votre activité.',
    status: 'not_started', minWords: 150,
    fields: [
      { name: 'grant_amount',  label: 'Montant demandé (BIF)', type: 'number', placeholder: 'Montant de la subvention sollicitée', value: '' },
      { name: 'grant_use',     label: 'Utilisation prévue',    type: 'textarea', placeholder: 'À quoi servira la subvention ?', value: '' },
      { name: 'expected_impact', label: 'Impact attendu',      type: 'textarea', placeholder: 'Quels résultats concrets attendez-vous ?', value: '' },
    ],
  },
];

const completedSections  = SECTIONS.filter(s => s.status === 'completed').length;
const inProgressSections = SECTIONS.filter(s => s.status === 'in_progress').length;
const globalPct          = Math.round((completedSections / SECTIONS.length) * 100);

class MonPlanAffairesRedaction extends Component {
  state: any = {
    activeSection: 'market_analysis', // section ouverte
    saving: false,
    saveSuccess: false,
    sections: SECTIONS.map(s => ({
      ...s,
      fields: s.fields.map(f => ({ ...f })),
    })),
  };

  toggleSection = (id: string) => {
    this.setState((prev: any) => ({
      activeSection: prev.activeSection === id ? null : id,
    }));
  };

  handleFieldChange = (sectionId: string, fieldName: string, value: string) => {
    this.setState((prev: any) => ({
      sections: prev.sections.map((s: any) =>
        s.id === sectionId
          ? { ...s, fields: s.fields.map((f: any) => f.name === fieldName ? { ...f, value } : f), status: 'in_progress' }
          : s
      ),
    }));
  };

  handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ saving: true });
    await new Promise(r => setTimeout(r, 900));
    this.setState({ saving: false, saveSuccess: true });
    setTimeout(() => this.setState({ saveSuccess: false }), 3000);
  };

  render() {
    const s = this.state;

    return (
      <div className="site-main">
        <Header />
        <PageHeader title="Mon plan d'affaires" breadcrumb="Plan d'affaires" />

        <div className="ttm-row sidebar job-sidebar clearfix">
          <div className="container">
            <div className="row">


              {/* ══════════ SIDEBAR ══════════ */}
              <div className="col-lg-4 widget-area sidebar-left job_list-widget-area">
                <div className="job_list-widget">

                  {/* Progression */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-files" /> Avancement du plan
                    </h3>
                    {/* <div className="pt-10 pb-5 px-5">
                      <div className="ttm-progress-bar clearfix">
                        <h3 className="progressbar-title">Sections complétées ({completedSections}/{SECTIONS.length})</h3>
                        <ProgressBar rect percentage={String(globalPct)} />
                      </div>
                    </div> */}
                    <div className="featured-desc pb-10">
                                          <p className="mb-10">
                                            Sections complétées ({completedSections}/{SECTIONS.length})
                                          </p>
                                          <div className="ttm-progress-bar clearfix mb-10">
                                            <ProgressBar
                                              rect
                                              percentage={String(globalPct)}
                                            />
                                          </div>
                                        </div>
                    <ul>
                      {s.sections.map((sec: any) => {
                        const meta = STATUS_META[sec.status as SectionStatus];
                        return (
                          <li key={sec.id} className="d-flex align-items-center" style={{ gap: 8, cursor: 'pointer' }}
                            onClick={() => this.toggleSection(sec.id)}>
                            <span style={{ fontWeight: 600, minWidth: 18, fontSize: 12, color: 'var(--theme-SkinColor)' }}>
                              {sec.num}.
                            </span>
                            <span style={{ flex: 1, fontSize: 13 }}>{sec.title}</span>
                            <span style={{ padding: '1px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700, color: meta.color, background: meta.bg, whiteSpace: 'nowrap' }}>
                              {meta.label}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </aside>

                  {/* Statut global */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-info-alt" /> Statut du plan
                    </h3>
                    <ul>
                      <li className="d-flex"><b className="mr-5">Statut :</b>
                        <span style={{ color: '#C97B2E', fontWeight: 600, background: '#FDF3E7', padding: '1px 10px', borderRadius: 20, fontSize: 12 }}>
                          En cours de rédaction
                        </span>
                      </li>
                      <li className="d-flex"><b className="mr-5">Complété :</b><span>{globalPct} %</span></li>
                      <li className="d-flex"><b className="mr-5">Sections :</b><span>{completedSections}/{SECTIONS.length} terminées</span></li>
                      <li className="d-flex"><b className="mr-5">Soumission :</b>
                        <span style={{ color: globalPct < 80 ? '#999' : '#2E7D52', fontSize: 12 }}>
                          {globalPct < 80 ? 'Complétez au moins 80 %' : '✓ Possible'}
                        </span>
                      </li>
                    </ul>
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
                      <li className="d-flex align-items-center"><i className="ti ti-files mr-5 text-theme-SkinColor" /><Link to="/espace-mpme/mon-plan-affaires/redaction" className="text-theme-SkinColor fw-bold">Plan d'affaires</Link></li>
                      <li className="d-flex align-items-center"><i className="ti ti-dashboard mr-5" /><Link to="/espace-mpme/dashboard">Tableau de bord</Link></li>
                    </ul>
                  </aside>

                </div>

                {/* Conseils */}
                <div className="overview-box">
                  <div className="title">
                    <p className="mb-10 fw-bold">💡 Conseils de rédaction :</p>
                  </div>
                  <ul style={{ paddingLeft: 18, fontSize: 12, color: '#555', lineHeight: 2 }}>
                    <li>Soyez précis et factuel</li>
                    <li>Appuyez-vous sur des chiffres réels</li>
                    <li>Chaque section requiert un minimum de mots</li>
                    <li>Enregistrez régulièrement</li>
                    <li>Vous pouvez modifier jusqu'à la soumission</li>
                  </ul>
                </div>

              </div>
              {/* sidebar end */}


              {/* ══════════ CONTENU ══════════ */}
              <div className="col-lg-8 content-area">
                <div className="row">
                  <div className="col-lg-12 col-md-12">

                    {/* Message succès */}
                    {s.saveSuccess && (
                      <div style={{ display:'flex',alignItems:'center',gap:10,padding:'12px 18px',background:'#E8F5EE',border:'1px solid #2E7D52',borderRadius:6,marginBottom:20 }}>
                        <i className="ti ti-check" style={{ color:'#2E7D52',fontSize:18 }} />
                        <span style={{ fontSize:13,fontWeight:600,color:'#2E7D52' }}>Brouillon enregistré avec succès.</span>
                      </div>
                    )}

                    {/* Sections du plan — candidate-timeline */}
                    <div className="overview-box">
                      <div className="title">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">Sections du plan d'affaires</h5>
                          <Link to="/espace-mpme/mon-plan-affaires/soumission"
                            className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                            style={{ opacity: globalPct < 80 ? 0.4 : 1, pointerEvents: globalPct < 80 ? 'none' : 'auto' }}>
                            Soumettre →
                          </Link>
                        </div>
                      </div>
                      <div className="desc">
                        <div className="candidate-timeline">
                          {s.sections.map((sec: any) => {
                            const meta    = STATUS_META[sec.status as SectionStatus];
                            const isOpen  = s.activeSection === sec.id;
                            return (
                              <div key={sec.id} className="timeline-panel">

                                <div className="timeline-head"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => this.toggleSection(sec.id)}>
                                  <h3 style={{ display:'flex',alignItems:'center',gap:10 }}>
                                    <span style={{ display:'inline-flex',alignItems:'center',justifyContent:'center',width:26,height:26,borderRadius:'50%',background: sec.status==='completed'?'#2E7D52':sec.status==='in_progress'?'var(--theme-SkinColor,#f07a1a)':'#f4f5f7',border:sec.status==='not_started'?'2px solid #dde2ea':'none',fontSize:11,fontWeight:700,color:sec.status==='not_started'?'#aaa':'#fff',flexShrink:0 }}>
                                      {sec.status === 'completed' ? '✓' : sec.num}
                                    </span>
                                    {sec.title}
                                  </h3>
                                  <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                                    <span style={{ padding:'2px 10px',borderRadius:20,fontSize:11,fontWeight:700,color:meta.color,background:meta.bg }}>
                                      {meta.label}
                                    </span>
                                    <i className={`ti ti-angle-${isOpen ? 'up' : 'down'}`} style={{ fontSize:12,color:'#aaa' }} />
                                  </div>
                                </div>

                                {isOpen && (
                                  <div className="timeline-body">
                                    <p style={{ fontSize:13,color:'#666',marginBottom:14,fontStyle:'italic' }}>
                                      {sec.description}
                                    </p>
                                    {sec.wordCount !== undefined && (
                                      <p style={{ fontSize:12,color: sec.wordCount>=sec.minWords?'#2E7D52':'#C97B2E',fontWeight:600,margin:'0 0 12px' }}>
                                        {sec.wordCount}/{sec.minWords} mots minimum
                                      </p>
                                    )}
                                    <form className="wrap-form contact_form" onSubmit={this.handleSave} noValidate>
                                      <div className="row">
                                        {sec.fields.map((field: any) => (
                                          <div key={field.name} className={field.type === 'textarea' ? 'col-12' : 'col-lg-6'}>
                                            <p style={{ fontSize:12,fontWeight:600,color:'#555',marginBottom:4 }}>
                                              {field.label}
                                            </p>
                                            <label>
                                              {field.type === 'textarea'
                                                ? <textarea rows={4} value={field.value} placeholder={field.placeholder}
                                                    onChange={e => this.handleFieldChange(sec.id, field.name, e.target.value)}
                                                    style={{ paddingLeft:15 }} />
                                                : <input type={field.type} value={field.value} placeholder={field.placeholder}
                                                    onChange={e => this.handleFieldChange(sec.id, field.name, e.target.value)} />
                                              }
                                            </label>
                                          </div>
                                        ))}
                                        <div className="col-12">
                                          <label className="mb-0">
                                            <button type="submit"
                                              className="submit ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                              disabled={s.saving}>
                                              {s.saving ? 'Enregistrement…' : '💾 Enregistrer la section'}
                                            </button>
                                          </label>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                )}

                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>


                    {/* Bouton soumission */}
                    <div className="overview-box">
                      <div className="title"><h5>Prêt à soumettre ?</h5></div>
                      <div className="desc">
                        <div className="featured-icon-box icon-align-before-content style2">
                          <div className="featured-icon">
                            <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-style-rounded ttm-icon_element-size-sm">
                              <i className="ti ti-files" />
                            </div>
                          </div>
                          <div className="featured-content">
                            <div className="featured-title">
                              <h3>Soumission du plan d'affaires</h3>
                            </div>
                            <div className="featured-desc">
                              <p className="mb-10">Complétez au moins 80 % des sections avant de soumettre. Votre plan sera évalué par un comité d'experts COPA.</p>
                              {globalPct >= 80
                                ? <Link to="/espace-mpme/mon-plan-affaires/soumission"
                                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor">
                                    Soumettre le plan →
                                  </Link>
                                : <p style={{ fontSize:13,color:'#C97B2E',fontWeight:600,margin:0 }}>
                                    <i className="ti ti-info-alt mr-5" />
                                    Progression actuelle : {globalPct} % — complétez encore {80 - globalPct} % pour soumettre.
                                  </p>
                              }
                            </div>
                          </div>
                        </div>
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
                        <h3>Besoin d'aide pour rédiger votre plan ?</h3>
                      </div>
                      <div className="featured-desc">
                        <p>Nos conseillers COPA peuvent vous accompagner dans la rédaction de votre plan d'affaires.</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/contact"
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white">
                    Contacter un conseiller
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

export default MonPlanAffairesRedaction;
