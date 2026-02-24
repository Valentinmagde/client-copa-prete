import React, { Component } from 'react';
import Header from '../components/layout/Header';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';
import ProgressBar from 'react-animated-progress-bar';
import { Link } from 'react-router-dom';

// ─── Mock data (remplacer par vos appels API) ─────────────────────────────────

const user = {
  firstName:         'Valentin',
  lastName:          'Nkurunziza',
  entrepreneurType:  'Entrepreneur burundais',
  companyName:       'TechBujumbura SARL',
  companyStatus:     'Entreprise formelle',
  sector:            'Technologies de l\'information',
  province:          'Bujumbura Mairie',
  commune:           'Ntahangwa',
  phone:             '+257 79 000 000',
  email:             'valentin@example.com',
  profileCompletion:  65,
  trainings:         { done: 2, total: 5 },
  planStatus:        'En cours' as 'Brouillon' | 'En cours' | 'Soumis' | 'En évaluation' | 'Accepté' | 'Refusé',
  grantStatus:       null as string | null,
};

const notifications = [
  { id: 1, text: 'Votre profil est complété à 65 %. Ajoutez vos documents pour progresser.', date: "Aujourd'hui, 09:14", unread: true  },
  { id: 2, text: 'Module 3 du plan d\'affaires maintenant disponible.',                       date: 'Hier, 14:32',        unread: true  },
  { id: 3, text: 'Session présentielle le 15 mars 2026 à Bujumbura.',                        date: '22 fév. 2026',       unread: false },
  { id: 4, text: 'Votre inscription a été validée avec succès.',                              date: '20 fév. 2026',       unread: false },
  { id: 5, text: 'Bienvenue sur la plateforme COPA !',                                        date: '20 fév. 2026',       unread: false },
];

const parcours = [
  {
    label:  'Inscription',
    year:   'Fév. 2026',
    status: 'done',
    sub:    'Compte créé',
    desc:   'Compte créé et email vérifié avec succès.',
    link:   null,
  },
  {
    label:  'Profil complet',
    year:   'En cours',
    status: 'active',
    sub:    `${user.profileCompletion} % complété`,
    desc:   'Renseignez vos informations personnelles et les détails de votre entreprise pour débloquer les formations.',
    link:   '/espace-mpme/mon-profil/informations',
  },
  {
    label:  'Formations',
    year:   'À venir',
    status: 'pending',
    sub:    `${user.trainings.done}/${user.trainings.total} modules`,
    desc:   'Suivez les modules de formation obligatoires pour valider cette étape.',
    link:   '/espace-mpme/mes-formations/en-cours',
  },
  {
    label:  "Plan d'affaires",
    year:   'À venir',
    status: 'pending',
    sub:    user.planStatus,
    desc:   "Rédigez et soumettez votre plan d'affaires complet.",
    link:   '/espace-mpme/mon-plan-affaires/redaction',
  },
  {
    label:  'Évaluation',
    year:   'En attente',
    status: 'locked',
    sub:    'Non démarré',
    desc:   'Évaluation de votre dossier par le comité d\'experts COPA.',
    link:   null,
  },
  {
    label:  'Subvention',
    year:   'En attente',
    status: 'locked',
    sub:    'Non disponible',
    desc:   'Attribution de la subvention selon les résultats de l\'évaluation.',
    link:   null,
  },
];

const PLAN_BADGE: Record<string, { color: string; bg: string }> = {
  'Brouillon':     { color: '#6B7A90', bg: '#F4F5F7' },
  'En cours':      { color: '#C97B2E', bg: '#FDF3E7' },
  'Soumis':        { color: '#1A3A5C', bg: '#EBF3FF' },
  'En évaluation': { color: '#7C3AED', bg: '#F5F0FF' },
  'Accepté':       { color: '#2E7D52', bg: '#E8F5EE' },
  'Refusé':        { color: '#C0392B', bg: '#FDECEA' },
};

const planBadge = PLAN_BADGE[user.planStatus] ?? PLAN_BADGE['Brouillon'];
const unread    = notifications.filter(n => n.unread).length;
const trainPct  = Math.round((user.trainings.done / user.trainings.total) * 100);

// ─── Icône de statut du parcours (réutilisée dans candidate-timeline) ─────────

const StepIcon: React.FC<{ status: string }> = ({ status }) => {
  if (status === 'done') return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 22, height: 22, borderRadius: '50%', background: '#2E7D52', flexShrink: 0,
    }}>
      <svg viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" style={{ width: 12, height: 12 }}>
        <path d="M2 6l3 3 5-5" strokeLinecap="round" />
      </svg>
    </span>
  );
  if (status === 'active') return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
      background: 'var(--theme-SkinColor, #f07a1a)',
    }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
    </span>
  );
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 22, height: 22, borderRadius: '50%',
      background: '#f4f5f7', border: '2px solid #dde2ea',
      flexShrink: 0,
    }}>
      <svg viewBox="0 0 12 12" fill="none" stroke="#aaa" strokeWidth="2">
        <rect x="2.5" y="5" width="7" height="5.5" rx="0.8" />
        <path d="M4 5V3.5a2 2 0 014 0V5" strokeLinecap="round" />
      </svg>
    </span>
  );
};


// ─── Component ────────────────────────────────────────────────────────────────

class Dashboard extends Component {

  render() {
    return (
      <div className="site-main">
        <Header />

        {/* PageHeader — même composant que Candidate_details */}
        <PageHeader
          title="Mon tableau de bord"
          breadcrumb="Espace MPME"
        />


        {/* ══════════════════════════════════════════════════════════════════
            MAIN — structure 100 % identique à Candidate_details
        ════════════════════════════════════════════════════════════════════ */}
        <div className="ttm-row sidebar job-sidebar clearfix">
          <div className="container">
            <div className="row">


              {/* ═══════════ SIDEBAR GAUCHE ═══════════ */}
              <div className="col-lg-4 widget-area sidebar-left job_list-widget-area">
                <div className="job_list-widget">

                  {/* Widget — Informations MPME (= "Candidate Informations") */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-briefcase" /> Informations MPME
                    </h3>
                    <ul>
                      <li className="d-flex">
                        <b className="mr-5">Statut :</b>
                        <span>{user.entrepreneurType}</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Entreprise :</b>
                        <span>{user.companyName}</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Forme :</b>
                        <span>{user.companyStatus}</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Secteur :</b>
                        <span>{user.sector}</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Province :</b>
                        <span>{user.province}</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Commune :</b>
                        <span>{user.commune}</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Téléphone :</b>
                        <span>{user.phone}</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Email :</b>
                        <span style={{ wordBreak: 'break-all' }}>{user.email}</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <b className="mr-5">Plan :</b>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center',
                          padding: '2px 10px', borderRadius: 20,
                          fontSize: 11, fontWeight: 700,
                          color: planBadge.color, background: planBadge.bg,
                        }}>
                          {user.planStatus}
                        </span>
                      </li>
                    </ul>
                  </aside>

                  {/* Widget — Notifications (= "Contact Candidate") */}
                  <aside className="widget form-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-bell" /> Notifications
                      {unread > 0 && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 20, height: 20, borderRadius: '50%',
                          background: '#dc3545', color: '#fff',
                          fontSize: 10, fontWeight: 700, marginLeft: 8,
                        }}>
                          {unread}
                        </span>
                      )}
                    </h3>
                    <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                      {notifications.map(n => (
                        <li key={n.id} style={{
                          display: 'flex', gap: 10, padding: '10px 0',
                          borderBottom: '1px solid rgba(119,119,119,0.1)',
                          alignItems: 'flex-start',
                        }}>
                          {n.unread && (
                            <span style={{
                              width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                              marginTop: 5, background: 'var(--theme-SkinColor, #f07a1a)',
                            }} />
                          )}
                          <div style={{ flex: 1 }}>
                            <p style={{
                              fontSize: 12.5, margin: '0 0 2px',
                              fontWeight: n.unread ? 700 : 400, lineHeight: 1.4,
                            }}>
                              {n.text}
                            </p>
                            <time style={{ fontSize: 11, color: '#777' }}>{n.date}</time>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </aside>

                </div>
                {/* job_list-widget end */}

                {/* Liens rapides — widget-download (= "View/Download CV") */}
                <aside className="widget widget-download">
                  <ul className="download">
                    <li>
                      <Link to="/espace-mpme/mon-profil/informations">Compléter mon profil</Link>
                      <i className="ti ti-user" />
                    </li>
                    <li>
                      <Link to="/espace-mpme/mon-profil/documents">Mes documents</Link>
                      <i className="ti ti-clip" />
                    </li>
                    <li>
                      <Link to="/espace-mpme/mon-plan-affaires/soumission">Soumettre mon plan</Link>
                      <i className="ti ti-files" />
                    </li>
                  </ul>
                </aside>

                {/* Liens assistance — overview-box + social-icons (= "Social Links") */}
                <div className="overview-box">
                  <div className="title">
                    <div className="d-sm-flex justify-content-between align-items-center mb_10">
                      <p className="mb-10 fw-bold">Assistance COPA :</p>
                      <div className="social-icons circle mb-10">
                        <ul className="list-inline">
                          <li>
                            <a href="mailto:support@copa.bi" rel="noopener" aria-label="Email">
                              <i className="ti ti-email" />
                            </a>
                          </li>
                          <li>
                            <a href="tel:+25722000000" rel="noopener" aria-label="Téléphone">
                              <i className="ti ti-headphone" />
                            </a>
                          </li>
                          <li>
                            <a href="#whatsapp" rel="noopener" aria-label="WhatsApp">
                              <i className="ti ti-mobile" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              {/* sidebar end */}


              {/* ═══════════ CONTENU PRINCIPAL ═══════════ */}
              <div className="col-lg-8 content-area">

                {/* — Identité MPME — candidate-data (= photo + nom) */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="candidate-data">

                      {/* Initiales à la place de la photo */}
                      <div className="candidate-img">
                        <div style={{
                          width: 100, height: 100, borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 32, fontWeight: 700, color: '#fff', flexShrink: 0,
                          background: 'var(--theme-SkinColor, #f07a1a)',
                        }}>
                          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </div>
                      </div>

                      <div className="candidate-caption">
                        <h5>{user.firstName} {user.lastName}</h5>
                        <span>{user.companyName}</span>
                        <div className="meta-line">
                          <span><i className="ti ti-briefcase" /> {user.sector}</span>
                          <span><i className="ti ti-location-pin" /> {user.province}</span>
                          <span><i className="ti ti-headphone" /> {user.phone}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                {/* row end */}

                <div className="row">
                  <div className="col-lg-12 col-md-12">


                    {/* ── Résumé de progression (= "Skills") ── */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Progression du parcours</h5>
                      </div>
                      <div className="desc pb-30">

                        <div className="ttm-progress-bar clearfix">
                          <h3 className="progressbar-title">
                            Profil complété ({user.profileCompletion} %)
                          </h3>
                          <ProgressBar rect percentage={String(user.profileCompletion)} />
                        </div>

                        <div className="ttm-progress-bar clearfix">
                          <h3 className="progressbar-title">
                            Formations ({user.trainings.done}/{user.trainings.total} modules — {trainPct} %)
                          </h3>
                          <ProgressBar rect percentage={String(trainPct)} />
                        </div>

                        <div className="ttm-progress-bar clearfix">
                          <h3 className="progressbar-title">
                            Documents justificatifs (30 %)
                          </h3>
                          <ProgressBar rect percentage="30" />
                        </div>

                      </div>
                    </div>


                    {/* ── Mon parcours COPA (= "Education Details" / candidate-timeline) ── */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Mon parcours COPA</h5>
                      </div>
                      <div className="desc">
                        <div className="candidate-timeline">
                          {parcours.map((step, i) => (
                            <div className="timeline-panel" key={i}>

                              <div className="timeline-head">
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <StepIcon status={step.status} />
                                  {step.label}
                                </h3>
                                <span className="timeline-year">{step.year}</span>
                              </div>

                              <div className="timeline-body">
                                <h5>{step.sub}</h5>
                                <p>{step.desc}</p>
                                {step.link && step.status !== 'locked' && (
                                  <Link
                                    to={step.link}
                                    className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                  >
                                    {step.status === 'active' ? 'Continuer →' : 'Voir →'}
                                  </Link>
                                )}
                              </div>

                            </div>
                          ))}
                        </div>
                      </div>
                    </div>


                    {/* ── Actions rapides (= "Work Experience" / overview-box) ── */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Actions rapides</h5>
                      </div>
                      <div className="desc">
                        <div className="row">
                          {[
                            { to: '/espace-mpme/mon-profil/informations',     icon: 'ti-user',  label: 'Compléter mon profil',        desc: 'Renseignez vos informations personnelles et d\'entreprise.' },
                            { to: '/espace-mpme/mes-formations/en-cours',     icon: 'ti-book',  label: 'Mes formations',              desc: `${user.trainings.done}/${user.trainings.total} modules terminés.` },
                            { to: '/espace-mpme/mon-plan-affaires/redaction', icon: 'ti-files', label: "Plan d'affaires",            desc: `Statut actuel : ${user.planStatus}.` },
                            { to: '/espace-mpme/mon-profil/documents',        icon: 'ti-clip',  label: 'Mes documents',               desc: 'Téléversez vos pièces justificatives.' },
                          ].map(a => (
                            <div className="col-sm-6 mb-20" key={a.to}>
                              {/* featured-icon-box — même structure que dans le template */}
                              <div className="featured-icon-box icon-align-before-content icon-ver_align-top style2">
                                <div className="featured-icon">
                                  <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-style-rounded ttm-icon_element-size-sm">
                                    <i className={`ti ${a.icon}`} />
                                  </div>
                                </div>
                                <div className="featured-content">
                                  <div className="featured-title">
                                    <h3>
                                      <Link to={a.to} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {a.label}
                                      </Link>
                                    </h3>
                                  </div>
                                  <div className="featured-desc">
                                    <p>{a.desc}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>


                    {/* ── Formation en cours (= "About me" / overview-box) ── */}
                    <div className="overview-box">
                      <div className="title">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">Formation en cours</h5>
                          <Link
                            to="/espace-mpme/mes-formations/en-cours"
                            className="text-theme-SkinColor"
                            style={{ fontSize: 13, fontWeight: 600 }}
                          >
                            Voir tout →
                          </Link>
                        </div>
                      </div>
                      <div className="desc">

                        <div className="featured-icon-box icon-align-before-content style2">
                          <div className="featured-icon">
                            <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-style-rounded ttm-icon_element-size-sm">
                              <i className="ti ti-book" />
                            </div>
                          </div>
                          <div className="featured-content">
                            <div className="featured-title">
                              <h3>Élaboration du plan d'affaires</h3>
                            </div>
                            <div className="featured-desc">
                              <p className="mb-10">Module 3 sur 5 — Progression : 60 %</p>
                              <div className="ttm-progress-bar clearfix mb-10">
                                <ProgressBar rect percentage="60" />
                              </div>
                              <Link
                                to="/espace-mpme/mes-formations/en-cours"
                                className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
                              >
                                Continuer la formation
                              </Link>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>


                  </div>
                </div>
                {/* row end */}

              </div>
              {/* content-area end */}


            </div>
            {/* row end */}
          </div>
        </div>
        {/* ttm-row end */}


        {/* action-section — identique à Candidate_details */}
        {/* <section className="ttm-row action-section bg-theme-SkinColor text-theme-WhiteColor clearfix">
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
                        <h3>Besoin d'aide dans votre parcours COPA ?</h3>
                      </div>
                      <div className="featured-desc">
                        <p>Notre équipe d'accompagnement est disponible pour vous guider à chaque étape.</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                  >
                    Contacter l'assistance
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
  }
}

export default Dashboard;
