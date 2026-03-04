import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

// Types pour les données du candidat
interface CandidateData {
  name: string;
  dossierNumber: string;
  submittedAt: string;
  secteur: string;
  province: string;
  statutMPME: string;
}

// Types pour les statistiques
interface Stat {
  id: string;
  value: number;
  suffix: string;
  title: string;
  icon: string;
  duration?: number;
}

// Types pour les étapes du parcours
interface JourneyStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: 'completed' | 'locked' | 'current' | 'upcoming';
  lockMessage?: string;
  action?: {
    type: 'link' | 'text';
    content: string;
    url?: string;
  };
}

// Types pour les notifications
interface Notification {
  id: string;
  title: string;
  description: string;
  status: 'sent' | 'pending' | 'scheduled';
}

const ApplicationSubmitted1: React.FC = () => {
  // État pour les données du candidat (à remplacer par appel API)
  const [candidateData, setCandidateData] = useState<CandidateData>({
    name: 'Amina Niyonkuru',
    dossierNumber: 'COPA-2026-08472',
    submittedAt: '03 mars 2026 à 14h37',
    secteur: 'Agro-alimentaire',
    province: 'Bujumbura Mairie',
    statutMPME: 'MPME formelle'
  });

  // État pour le chargement des données
  const [loading, setLoading] = useState<boolean>(false);

  // Simulation de chargement des données (à remplacer par appel API réel)
  useEffect(() => {
    const fetchCandidateData = async () => {
      setLoading(true);
      try {
        // Appel API à implémenter
        // const response = await api.get('/candidate/profile');
        // setCandidateData(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    // fetchCandidateData();
  }, []);

  // Données des étapes du parcours
  const journeySteps: JourneyStep[] = [
    {
      id: 1,
      title: 'Inscrivez-vous',
      description: 'Créez votre compte et complétez votre profil d\'entrepreneur en quelques minutes.',
      icon: 'flaticon-recruitment-4',
      status: 'completed',
      action: {
        type: 'link',
        content: 'Complété ✓',
        url: '#'
      }
    },
    {
      id: 2,
      title: 'Formez-vous',
      description: 'Suivez nos formations gratuites pour acquérir les compétences nécessaires à la rédaction d\'un plan d\'affaires solide.',
      icon: 'flaticon-job-1',
      status: 'locked',
      lockMessage: '🔒 Après présélection'
    },
    {
      id: 3,
      title: 'Soumettez votre plan',
      description: 'Rédigez et déposez votre plan d\'affaires avant la date limite. Nos experts l\'évalueront de manière transparente.',
      icon: 'flaticon-file',
      status: 'locked',
      lockMessage: '🔒 Après les formations'
    },
    {
      id: 4,
      title: 'Recevez votre subvention',
      description: 'Si vous êtes sélectionné, bénéficiez d\'une subvention de contrepartie et d\'un accompagnement personnalisé pour lancer votre projet.',
      icon: 'flaticon-money',
      status: 'locked',
      lockMessage: '🔒 Réservé aux lauréats'
    }
  ];

  // Données des prochaines étapes
  const nextSteps = [
    {
      id: 'verification',
      title: 'Vérification du dossier',
      period: 'Sem. 1–2',
      description: 'L\'équipe COPA vérifie la conformité de votre profil : complétude, éligibilité et pièces justificatives.',
      icon: 'flaticon-search',
      status: 'current'
    },
    {
      id: 'preselection',
      title: 'Présélection',
      period: 'Sem. 3–4',
      description: 'Les dossiers éligibles sont présélectionnés. Notification par email et SMS avec votre résultat.',
      icon: 'flaticon-star',
      status: 'upcoming'
    },
    {
      id: 'formations',
      title: 'Accès aux formations',
      period: 'Dès présélection',
      description: 'Si présélectionné(e), votre espace formations est débloqué pour suivre les modules obligatoires et gratuits.',
      icon: 'flaticon-job-1',
      status: 'upcoming'
    },
    {
      id: 'business-plan',
      title: 'Soumission du plan d\'affaires',
      period: 'Après formations',
      description: 'À l\'issue des formations obligatoires, vous rédigez et soumettez votre plan d\'affaires pour évaluation par nos experts indépendants.',
      icon: 'flaticon-file',
      status: 'upcoming'
    }
  ];

  // Statistiques
  const stats: Stat[] = [
    {
      id: 'dossiers',
      value: 847,
      suffix: '+',
      title: 'Dossiers reçus cette édition',
      icon: 'flaticon-recruitment',
      duration: 8
    },
    {
      id: 'delai',
      value: 4,
      suffix: ' sem.',
      title: 'Pour les résultats de présélection',
      icon: 'flaticon-clock',
      duration: 5
    },
    {
      id: 'notification',
      value: 100,
      suffix: '%',
      title: 'Des candidats notifiés du résultat',
      icon: 'flaticon-recruitment-3',
      duration: 8
    },
    {
      id: 'formations',
      value: 7,
      suffix: '',
      title: 'Formations disponibles après présélection',
      icon: 'flaticon-headhunting',
      duration: 5
    }
  ];

  // Notifications automatiques
  const notifications: Notification[] = [
    {
      id: 'accuse',
      title: 'Accusé de réception',
      description: 'Email + SMS de confirmation avec votre numéro de dossier.',
      status: 'sent'
    },
    {
      id: 'verification',
      title: 'Vérification du profil',
      description: 'Confirmation de la recevabilité administrative de votre dossier.',
      status: 'pending'
    },
    {
      id: 'preselection',
      title: 'Résultats de présélection',
      description: 'Email personnalisé : présélectionné(e) ou non retenu(e) avec feedback.',
      status: 'pending'
    },
    {
      id: 'formations',
      title: 'Accès aux formations (si retenu)',
      description: 'Lien d\'accès à l\'espace formations avec les instructions de démarrage.',
      status: 'pending'
    }
  ];

  // Cartes d'actions en attendant
  const waitingActions = [
    {
      id: 'documents',
      title: 'Vérifiez vos documents',
      description: 'Assurez-vous que tous vos justificatifs (CNI/passeport, NIF, RC) sont valides et correctement téléchargés.',
      icon: 'flaticon-recruitment-5',
      link: '/espace-mpme/mon-profil/documents',
      buttonText: 'Mes documents!'
    },
    {
      id: 'formations',
      title: 'Découvrez les formations',
      description: 'Consultez dès maintenant le catalogue des formations pour vous préparer avant votre présélection.',
      icon: 'flaticon-job-1',
      link: '/formations/catalogue',
      buttonText: 'Voir le catalogue!'
    },
    {
      id: 'contact',
      title: 'Des questions ?',
      description: 'Notre équipe répond à vos questions sur la présélection, les délais et les critères d\'éligibilité du programme COPA.',
      icon: 'flaticon-technical-support',
      link: '/contact',
      buttonText: 'Nous contacter!'
    }
  ];

  const getStatusBadge = (status: Notification['status']) => {
    switch (status) {
      case 'sent':
        return <span className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor">✓ Envoyé</span>;
      default:
        return null;
    }
  };

  const getJourneyStepButton = (step: JourneyStep) => {
    if (step.status === 'completed' && step.action) {
      return (
        <a 
          className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor mt-10" 
          href={step.action.url}
        >
          <i className="far fa-check-circle"></i> {step.action.content}
        </a>
      );
    }
    
    if (step.status === 'locked') {
      return (
        <span className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-darkgrey mt-10" style={{ cursor: 'default' }}>
          {step.lockMessage}
        </span>
      );
    }

    return null;
  };

  const getStepIconColor = (status: JourneyStep['status']) => {
    return status === 'completed' || status === 'current' 
      ? 'ttm-icon_element-color-skincolor' 
      : 'ttm-icon_element-color-grey';
  };

  if (loading) {
    return (
      <div className="site-main">
        <Header />
        <PageHeader title="Inscription réussie" breadcrumb="Inscription" />
        <div className="ttm-row text-center p-50">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="site-main">
      <Header />

      {/* PageHeader */}
      <PageHeader
        title="Inscription réussie"
        breadcrumb="Inscription"
      />

      {/* 1. BANDEAU SUCCÈS */}
      <section className="ttm-row action-section bg-theme-SkinColor text-theme-WhiteColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-md-flex align-items-center justify-content-between">
                <div className="featured-icon-box icon-align-before-content style2">
                  <div className="featured-icon">
                    <div className="ttm-icon ttm-icon_element-onlytxt ttm-icon_element-color-white ttm-icon_element-size-xl">
                      <i className="flaticon flaticon-recruitment-4"></i>
                    </div>
                  </div>
                  <div className="featured-content">
                    <div className="featured-title">
                      <h3>Félicitations {candidateData.name} — Inscription réussie !</h3>
                    </div>
                    <div className="featured-desc">
                      <p>
                        Votre profil d'entrepreneur a bien été enregistré sous le numéro <strong>{candidateData.dossierNumber}</strong> le {candidateData.submittedAt}.
                        Vous serez notifié(e) par <strong>email et SMS</strong> dès la publication des résultats de présélection.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-WhiteColor p-15 ml-20" style={{ borderRadius: 8, minWidth: 230, textAlign: 'center', flexShrink: 0 }}>
                  <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                  <div className="layer-content">
                    <p className="text-theme-SkinColor mb-5" style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700 }}>
                      Numéro de dossier
                    </p>
                    <h3 className="text-theme-DarkColor mb-0" style={{ fontFamily: 'monospace', letterSpacing: 2, fontSize: 18 }}>
                      {candidateData.dossierNumber}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ALERTE — profil en attente */}
      <section className="ttm-row grid-section clearfix" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="featured-icon-box bg-theme-GreyColor">
                <div className="featured-content p-30">
                  <div className="d-md-flex align-items-center">
                    <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-style-round ttm-icon_element-color-skincolor ttm-icon_element-size-md mr-20" style={{ flexShrink: 0 }}>
                      <i className="flaticon flaticon-clock"></i>
                    </div>
                    <div>
                      <div className="featured-title">
                        <h3 className="mb-5">Votre profil est en attente de présélection</h3>
                      </div>
                      <div className="featured-desc">
                        <p className="mb-0">
                          Les formations et la soumission du plan d'affaires seront accessibles <strong>uniquement après présélection</strong>.
                          L'équipe COPA examine votre dossier et vous contactera dans les <strong>3 à 4 semaines</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LES 4 ÉTAPES DU PARCOURS COPA */}
      <section className="ttm-row features-section clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>Votre <span className="text-theme-SkinColor">parcours</span></h3>
                  <h2 className="title">Vous avez franchi la première étape !</h2>
                </div>
                <div className="title-desc">
                  <p>Votre compte est créé et votre profil est complet. Voici les 4 grandes étapes du programme COPA jusqu'à l'obtention de votre subvention.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row row-equal-height mb_10">
            {journeySteps.map((step) => (
              <div key={step.id} className="col-lg-3 col-md-6 col-sm-6">
                <div className={`featured-icon-box icon-align-top-content style1 ${step.status === 'completed' ? 'active' : ''}`}>
                  <div className="featured-icon">
                    <div className={`ttm-icon ttm-icon_element-fill ttm-icon_element-style-round ${getStepIconColor(step.status)} ttm-icon_element-size-lg`}>
                      <i className={`flaticon ${step.icon}`}></i>
                    </div>
                  </div>
                  <div className="featured-content">
                    <div className="featured-title">
                      <h3>
                        {step.status === 'completed' && <span className="text-theme-SkinColor">0{step.id}.</span>}
                        {step.status !== 'completed' && `0${step.id}.`} {step.title}
                      </h3>
                    </div>
                    <div className="featured-desc">
                      <p>{step.description}</p>
                    </div>
                    {getJourneyStepButton(step)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RÉCAPITULATIF + CE QUI SE PASSE ENSUITE */}
      <section className="ttm-row about-section bg-layer-equal-height clearfix">
        <div className="container">
          <div className="row g-0">
            {/* Colonne gauche — Récapitulatif */}
            <div className="col-lg-5 col-md-12">
              <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-GreyColor z-index-2 pb-70 pb-md-50 pr-60 pr-md-0 pt-60 pl-60 pl-md-0">
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                <div className="layer-content">
                  <div className="section-title">
                    <div className="title-header">
                      <h3>Votre <span className="text-theme-SkinColor">dossier</span></h3>
                      <h2 className="title">Récapitulatif du profil</h2>
                    </div>
                  </div>

                  <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor text-theme-DarkColor mb-30">
                    <li>
                      <i className="fas fa-user"></i>
                      <div className="ttm-list-li-content"><strong>Candidat(e) :</strong> {candidateData.name}</div>
                    </li>
                    <div className="ttm-horizontal_sep width-100 mt-15 mb-15"></div>
                    <li>
                      <i className="fas fa-hashtag"></i>
                      <div className="ttm-list-li-content">
                        <strong>N° dossier :</strong>{' '}
                        <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{candidateData.dossierNumber}</span>
                      </div>
                    </li>
                    <div className="ttm-horizontal_sep width-100 mt-15 mb-15"></div>
                    <li>
                      <i className="fas fa-briefcase"></i>
                      <div className="ttm-list-li-content"><strong>Secteur :</strong> {candidateData.secteur}</div>
                    </li>
                    <div className="ttm-horizontal_sep width-100 mt-15 mb-15"></div>
                    <li>
                      <i className="fas fa-map-marker-alt"></i>
                      <div className="ttm-list-li-content"><strong>Province :</strong> {candidateData.province}</div>
                    </li>
                    <div className="ttm-horizontal_sep width-100 mt-15 mb-15"></div>
                    <li>
                      <i className="fas fa-building"></i>
                      <div className="ttm-list-li-content"><strong>Statut MPME :</strong> {candidateData.statutMPME}</div>
                    </li>
                    <div className="ttm-horizontal_sep width-100 mt-15 mb-15"></div>
                    <li>
                      <i className="fas fa-clock"></i>
                      <div className="ttm-list-li-content">
                        <strong>Statut :</strong>{' '}
                        <span className="text-theme-SkinColor" style={{ fontWeight: 700 }}>
                          ⏳ En attente de présélection
                        </span>
                      </div>
                    </li>
                  </ul>

                  <a href="#" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor mr-10">
                    <i className="fas fa-download"></i> Accusé de réception
                  </a>
                  <Link to="/espace-mpme/mon-profil" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor mt-10">
                    <i className="fas fa-edit"></i> Modifier mon profil
                  </Link>
                </div>
              </div>
            </div>

            {/* Colonne droite — Prochaines étapes */}
            <div className="col-lg-7 col-md-12">
              <div className="pt-60 pb-60 pl-60 pl-md-0 pr-30 pr-md-0">
                <div className="section-title style2">
                  <div className="title-header">
                    <h3>Prochaines <span className="text-theme-SkinColor">étapes</span></h3>
                    <h2 className="title">Ce qui se passe après votre inscription</h2>
                  </div>
                  <div className="title-desc">
                    <p>Votre profil est en cours d'examen. Voici le processus complet jusqu'à la soumission du plan d'affaires.</p>
                  </div>
                </div>

                {nextSteps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="featured-icon-box icon-align-before-content style2 mb-20">
                      <div className="featured-icon">
                        <div className={`ttm-icon ttm-icon_element-fill ttm-icon_element-style-round ${step.status === 'current' ? 'ttm-icon_element-color-skincolor' : 'ttm-icon_element-color-grey'} ttm-icon_element-size-md`}>
                          <i className={`flaticon ${step.icon}`}></i>
                        </div>
                      </div>
                      <div className="featured-content">
                        <div className="featured-title">
                          <h3>
                            {step.title}{' '}
                            {step.status === 'current' && (
                              <span className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor ml-10" style={{ fontSize: 10 }}>
                                EN COURS — {step.period}
                              </span>
                            )}
                            {step.status !== 'current' && (
                              <small style={{ fontWeight: 400 }}> — {step.period}</small>
                            )}
                          </h3>
                        </div>
                        <div className="featured-desc">
                          <p>{step.description}</p>
                        </div>
                      </div>
                    </div>
                    {index < nextSteps.length - 1 && (
                      <div className="ttm-horizontal_sep width-100 mt-0 mb-20"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CHIFFRES CLÉS */}
      <section className="ttm-row padding_zero-section clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bg-theme-DarkColor text-theme-WhiteColor">
                <div className="row g-0 ttm-vertical_sep">
                  {stats.map((stat) => (
                    <div key={stat.id} className="col-lg-3 col-md-6 col-sm-6">
                      <div className="ttm-fid inside ttm-fid-view-topicon style2">
                        <div className="ttm-fid-icon-wrapper">
                          <i className={`flaticon ${stat.icon}`}></i>
                        </div>
                        <div className="ttm-fid-contents">
                          <h4>
                            <CountUp 
                              start={0} 
                              end={stat.value} 
                              duration={stat.duration || 5} 
                              delay={1} 
                            />
                            {stat.suffix}
                          </h4>
                          <h3 className="ttm-fid-title">{stat.title}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EN ATTENDANT — 3 CARTES */}
      <section className="ttm-row features-section bg-theme-GreyColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text">
                <div className="title-header">
                  <h3>En <span className="text-theme-SkinColor">attendant</span></h3>
                  <h2 className="title">Ce que vous pouvez faire dès maintenant</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="row row-equal-height mb_10">
            {waitingActions.map((action) => (
              <div key={action.id} className="col-lg-4 col-md-6 col-sm-6">
                <div className="featured-icon-box icon-align-top-content style1 bg-theme-WhiteColor">
                  <div className="featured-icon">
                    <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-style-round ttm-icon_element-color-skincolor ttm-icon_element-size-lg">
                      <i className={`flaticon ${action.icon}`}></i>
                    </div>
                  </div>
                  <div className="featured-content">
                    <div className="featured-title"><h3>{action.title}</h3></div>
                    <div className="featured-desc">
                      <p>{action.description}</p>
                    </div>
                    <Link to={action.link} className="ttm-btn btn-inline ttm-btn-size-md ttm-btn-color-skincolor mt-10">
                      {action.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NOTIFICATIONS + DÉLAI & CONTACTS */}
      <section className="ttm-row map-section bg-theme-GreyColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text pb-15">
                <div className="title-header">
                  <h3>Notifications <span className="text-theme-SkinColor">automatiques</span></h3>
                  <h2 className="title">Vous serez notifié(e) à chaque étape</h2>
                </div>
              </div>
            </div>

            {/* Liste des notifications */}
            <div className="col-lg-6">
              <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor text-theme-DarkColor">
                {notifications.map((notif, index) => (
                  <React.Fragment key={notif.id}>
                    <li>
                      <i className={`${notif.status === 'sent' ? 'far fa-check-circle text-theme-SkinColor' : 'fas fa-clock'}`}></i>
                      <div className="ttm-list-li-content">
                        <strong>{notif.title}</strong> — {notif.description}{' '}
                        {getStatusBadge(notif.status)}
                      </div>
                    </li>
                    {index < notifications.length - 1 && (
                      <div className="ttm-horizontal_sep width-100 mt-15 mb-15"></div>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>

            {/* Délai + contact */}
            <div className="col-lg-6">
              <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-WhiteColor z-index-2 p-40 p-lg-30 mt-lg-30">
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                <div className="layer-content">
                  <div className="section-title style2">
                    <div className="title-header">
                      <h3>Délai <span className="text-theme-SkinColor">estimé</span></h3>
                      <h2 className="title">Résultats dans 3 à 4 semaines</h2>
                    </div>
                  </div>

                  <div className="featured-icon-box icon-align-before-content style2 mb-20">
                    <div className="featured-icon">
                      <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-style-round ttm-icon_element-color-skincolor ttm-icon_element-size-md">
                        <i className="flaticon flaticon-clock"></i>
                      </div>
                    </div>
                    <div className="featured-content">
                      <div className="featured-title"><h3>Tous les candidats sont notifiés</h3></div>
                      <div className="featured-desc">
                        <p>Qu'ils soient présélectionnés ou non, tous les candidats reçoivent un email avec leur résultat et un retour constructif.</p>
                      </div>
                    </div>
                  </div>

                  <div className="ttm-horizontal_sep width-100 mt-0 mb-20"></div>

                  {/* Contact info */}
                  <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor">
                    <li className="pb-0">
                      <i className="fa fa-envelope"></i>
                      <div className="ttm-list-li-content">
                        <a href="mailto:copa@prete.gov.bi">copa@prete.gov.bi</a>
                      </div>
                    </li>
                    <div className="ttm-horizontal_sep width-100 mt-15 mb-15"></div>
                    <li className="pb-0">
                      <i className="fas fa-phone-alt"></i>
                      <div className="ttm-list-li-content">+257 22 XX XX XX</div>
                    </li>
                    <div className="ttm-horizontal_sep width-100 mt-15 mb-15"></div>
                    <li>
                      <i className="fas fa-map-marker-alt"></i>
                      <div className="ttm-list-li-content">Bujumbura, Burundi</div>
                    </li>
                  </ul>

                  <Link to="/copa/criteres-eligibilite"
                    className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100 text-center mt-20">
                    Consulter les critères d'éligibilité
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
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
                    <div className="featured-title">
                      <h3>Suivez votre dossier depuis votre espace personnel</h3>
                    </div>
                    <div className="featured-desc">
                      <p>Votre tableau de bord affiche le statut en temps réel et vous alerte dès la publication des résultats de présélection.</p>
                    </div>
                  </div>
                </div>
                <Link
                  className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                  to="/espace-mpme/tableau-de-bord"
                >
                  Mon tableau de bord
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

export default ApplicationSubmitted1;