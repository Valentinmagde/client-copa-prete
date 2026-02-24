import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';

interface FaqItem { q: string; a: React.ReactNode }
interface FaqCategory { id: string; label: string; icon: string; items: FaqItem[] }

const FAQ_DATA: FaqCategory[] = [
  {
    id: 'eligibility',
    label: 'Inscription et éligibilité',
    icon: '📋',
    items: [
      {
        q: 'Qui peut participer au COPA ?',
        a: 'Le COPA est ouvert à toutes les micro, petites et moyennes entreprises (MPME) formelles ou en voie de formalisation, opérant au Burundi. Les entrepreneurs burundais et les réfugiés enregistrés au Burundi peuvent participer.',
      },
      {
        q: "Mon entreprise n'est pas encore formalisée, puis-je m'inscrire ?",
        a: "Oui, vous pouvez vous inscrire si vous vous engagez à formaliser votre entreprise en cas de sélection. La formalisation devra être effectuée avant la signature de la convention de subvention.",
      },
      {
        q: "L'inscription est-elle payante ?",
        a: (<>Non, l'inscription au COPA est entièrement <strong>gratuite</strong>. Méfiez-vous de toute personne vous demandant de l'argent pour participer. Si cela se produit, <Link to="/contact/deposer-plainte" className="text-theme-SkinColor">signalez-le immédiatement</Link>.</>),
      },
      {
        q: 'Peut-on participer si on a déjà bénéficié d\'une subvention COPA lors d\'une édition précédente ?',
        a: "Non, le COPA est réservé aux personnes n'ayant pas encore bénéficié d'une subvention COPA. Chaque entrepreneur ne peut recevoir qu'une subvention dans le cadre de ce programme.",
      },
      {
        q: "Quelle est la limite d'âge pour participer ?",
        a: "Il n'y a pas de limite d'âge supérieure. Le promoteur doit simplement avoir au moins 18 ans. Les jeunes de 18 à 35 ans bénéficient d'un bonus de 5 points lors de l'évaluation.",
      },
    ],
  },
  {
    id: 'formations',
    label: 'Formations',
    icon: '📚',
    items: [
      {
        q: 'Les formations sont-elles obligatoires ?',
        a: "Oui, les modules de formation de base (Introduction à l'entrepreneuriat, Plan d'affaires, Gestion financière) sont obligatoires pour soumettre un plan d'affaires au COPA. Ils vous donnent tous les outils nécessaires pour rédiger un dossier de qualité.",
      },
      {
        q: 'Puis-je suivre les formations en ligne ?',
        a: "Oui, la plupart des formations sont disponibles en présentiel et en ligne. Vous pouvez choisir le format qui vous convient le mieux. Seul le module « Pitch et présentation » est disponible uniquement en présentiel.",
      },
      {
        q: 'Les formations sont-elles payantes ?',
        a: "Non, toutes les formations proposées dans le cadre du COPA sont entièrement gratuites. Elles sont financées par le programme PRETE / Banque mondiale.",
      },
      {
        q: 'Combien de temps durent les formations ?',
        a: (
          <ul style={{ margin: '6px 0 0', paddingLeft: '18px', lineHeight: 2 }}>
            <li><strong>Module 1</strong> – Introduction à l'entrepreneuriat : 1 jour (8h)</li>
            <li><strong>Module 2</strong> – Élaboration du plan d'affaires : 3 jours (24h)</li>
            <li><strong>Module 3</strong> – Gestion financière : 2 jours (16h)</li>
            <li><strong>Module 4</strong> – Pitch et présentation : 1 jour (8h)</li>
          </ul>
        ),
      },
    ],
  },
  {
    id: 'plan',
    label: "Plan d'affaires et évaluation",
    icon: '🔍',
    items: [
      {
        q: "Comment mon plan d'affaires sera-t-il évalué ?",
        a: (
          <>
            <p>Votre plan sera évalué par un comité d'experts indépendants selon une grille de critères transparente :</p>
            <ul style={{ margin: '8px 0 0', paddingLeft: '18px', lineHeight: 2 }}>
              <li>Viabilité et faisabilité économique</li>
              <li>Innovation et originalité du projet</li>
              <li>Impact social et environnemental</li>
              <li>Qualité et complétude du dossier</li>
              <li>Capacité de mise en œuvre du promoteur</li>
            </ul>
          </>
        ),
      },
      {
        q: "Puis-je modifier mon plan d'affaires après la soumission ?",
        a: "Non. Une fois soumis définitivement, le plan d'affaires ne peut plus être modifié. Vous pouvez cependant sauvegarder un brouillon et le modifier autant que nécessaire avant la date limite de soumission.",
      },
      {
        q: "Quelle est la langue requise pour rédiger le plan d'affaires ?",
        a: "Le plan d'affaires peut être rédigé en français ou en kirundi. La plateforme supporte les deux langues.",
      },
      {
        q: "Combien de temps dure l'évaluation ?",
        a: "L'évaluation dure environ 10 à 15 jours ouvrables après la clôture de la période de soumission. Vous serez notifié des résultats par email et SMS.",
      },
    ],
  },
  {
    id: 'grants',
    label: 'Subventions',
    icon: '💰',
    items: [
      {
        q: 'Quel est le montant de la subvention ?',
        a: "Le montant varie selon la catégorie de votre entreprise et le plan d'affaires approuvé. Il s'agit d'une subvention de contrepartie (matching grant) : vous devez apporter une contribution propre (en nature ou en espèces). Les montants exacts sont précisés dans le Manuel du COPA.",
      },
      {
        q: "Qu'est-ce qu'un matching grant (subvention de contrepartie) ?",
        a: "Un matching grant est une subvention qui exige que le bénéficiaire apporte une contribution propre équivalente à une partie du montant reçu. Par exemple, si vous recevez 1 000 000 BIF, vous devez également investir un montant minimum de votre côté (en argent ou en biens).",
      },
      {
        q: 'La subvention est-elle remboursable ?',
        a: "Non, la subvention COPA est non remboursable si vous respectez les conditions d'utilisation prévues dans la convention. En cas de fraude ou de non-respect des conditions, vous serez tenu de rembourser les montants reçus.",
      },
      {
        q: "Comment et quand la subvention est-elle versée ?",
        a: "La subvention est versée en tranches après la signature de la convention de subvention et selon un calendrier défini. Les versements sont conditionnés à l'atteinte des jalons convenus dans le plan de mise en œuvre.",
      },
    ],
  },
  {
    id: 'platform',
    label: 'Plateforme et technique',
    icon: '💻',
    items: [
      {
        q: "J'ai oublié mon mot de passe, que faire ?",
        a: (<>Cliquez sur « Mot de passe oublié » sur la page de connexion. Un lien de réinitialisation vous sera envoyé par email ou SMS. Si vous rencontrez des difficultés, <Link to="/contact" className="text-theme-SkinColor">contactez notre support technique</Link>.</>),
      },
      {
        q: "Je ne reçois pas les emails de la plateforme, que faire ?",
        a: "Vérifiez votre dossier de courriers indésirables (spam). Si vous n'y trouvez pas nos emails, assurez-vous que l'adresse email enregistrée est correcte dans votre profil. Vous pouvez aussi opter pour les notifications par SMS.",
      },
      {
        q: "Quels sont les navigateurs compatibles avec la plateforme ?",
        a: "La plateforme fonctionne avec les navigateurs modernes : Google Chrome, Mozilla Firefox, Microsoft Edge et Safari (version récente). Elle est aussi accessible depuis un smartphone.",
      },
      {
        q: "La plateforme est-elle accessible en dehors de Bujumbura ?",
        a: "Oui, la plateforme est accessible depuis tout le Burundi et même depuis l'étranger. Des sessions de formation en ligne sont également disponibles pour les entrepreneurs des provinces.",
      },
    ],
  },
];

const Ressources_FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('eligibility');
  const [openItems, setOpenItems]           = useState<Set<string>>(new Set());
  const [search, setSearch]                 = useState('');

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const activeData  = FAQ_DATA.find(c => c.id === activeCategory)!;
  const searchLower = search.toLowerCase().trim();

  const displayItems = searchLower
    ? FAQ_DATA.flatMap(cat => cat.items.filter(item => item.q.toLowerCase().includes(searchLower)))
    : activeData.items;

  const totalCount = FAQ_DATA.reduce((s, c) => s + c.items.length, 0);

  return (
    <div className="site-main">
      <Header />
      <PageHeader title="Foire Aux Questions" breadcrumb="Ressources / FAQ" />

      {/* intro + search */}
      <section className="ttm-row bg-theme-GreyColor clearfix" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center">
              <h3 className="mb-10">Vous avez une <span className="text-theme-SkinColor">question ?</span></h3>
              <p className="mb-25" style={{ color: '#666' }}>
                Retrouvez les réponses aux {totalCount} questions les plus fréquentes sur le COPA.
              </p>
              {/* Search */}
              <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto' }}>
                <i className="ti ti-search" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '16px' }} />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher une question…"
                  style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: '30px', border: '1.5px solid rgba(119,119,119,.2)', fontSize: '14px', outline: 'none' }}
                />
                {search && (
                  <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: '16px' }}>
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ body */}
      <section className="ttm-row clearfix">
        <div className="container">
          <div className="row">

            {/* Category nav */}
            {!searchLower && (
              <div className="col-lg-4 widget-area">
                <div className="job_list-widget">
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title"><i className="ti ti-layout-list-thumb" /> Catégories</h3>
                    <ul>
                      {FAQ_DATA.map(cat => (
                        <li key={cat.id} className="d-flex align-items-center" style={{ cursor: 'pointer', gap: '8px', padding: '6px 0' }}
                          onClick={() => setActiveCategory(cat.id)}>
                          <span style={{ fontSize: '18px' }}>{cat.icon}</span>
                          <span style={{ flex: 1, fontSize: '13px', fontWeight: activeCategory === cat.id ? 700 : 400, color: activeCategory === cat.id ? 'var(--theme-SkinColor)' : 'inherit' }}>
                            {cat.label}
                          </span>
                          <span style={{ padding: '1px 9px', borderRadius: 20, fontSize: '11px', fontWeight: 600, background: activeCategory === cat.id ? 'var(--theme-SkinColor)' : '#f0f0f0', color: activeCategory === cat.id ? '#fff' : '#888' }}>
                            {cat.items.length}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </aside>

                  <aside className="widget form-widget">
                    <h3 className="widget-title"><i className="ti ti-help" /> Vous ne trouvez pas ?</h3>
                    <p style={{ fontSize: '13px', color: '#666', padding: '0 5px 10px' }}>
                      Si vous n'avez pas trouvé la réponse à votre question, notre équipe est là pour vous aider.
                    </p>
                    <div style={{ padding: '0 5px 10px' }}>
                      <Link to="/contact" className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100">
                        Nous contacter
                      </Link>
                    </div>
                  </aside>
                </div>
              </div>
            )}

            {/* FAQ items */}
            <div className={searchLower ? 'col-lg-12' : 'col-lg-8'}>

              {searchLower && (
                <div style={{ marginBottom: '20px', padding: '10px 16px', background: 'rgba(240,122,26,.06)', borderRadius: '6px', fontSize: '13px', color: '#666' }}>
                  <strong className="text-theme-SkinColor">{displayItems.length}</strong> résultat{displayItems.length !== 1 ? 's' : ''} pour « {search} »
                </div>
              )}

              {!searchLower && (
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '22px' }}>{activeData.icon}</span>
                    {activeData.label}
                  </h4>
                  <div style={{ height: '3px', width: '50px', background: 'var(--theme-SkinColor)', borderRadius: '2px' }} />
                </div>
              )}

              {displayItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#aaa' }}>
                  <i className="ti ti-search" style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }} />
                  <p>Aucune question ne correspond à votre recherche.</p>
                </div>
              ) : (
                <div>
                  {displayItems.map((item, idx) => {
                    const itemId  = `${activeCategory}-${idx}`;
                    const isOpen  = openItems.has(itemId);
                    return (
                      <div key={idx}
                        style={{ border: '1px solid rgba(119,119,119,.12)', borderRadius: '6px', marginBottom: '12px', overflow: 'hidden', boxShadow: isOpen ? '0 2px 12px rgba(0,0,0,.06)' : 'none', transition: 'box-shadow .2s' }}>
                        {/* Question */}
                        <button
                          onClick={() => toggleItem(itemId)}
                          style={{ width: '100%', background: isOpen ? 'rgba(240,122,26,.04)' : '#fff', border: 'none', padding: '18px 20px', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: isOpen ? 'var(--theme-SkinColor)' : 'var(--theme-DarkColor)', lineHeight: 1.4 }}>
                            {item.q}
                          </span>
                          <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: isOpen ? 'var(--theme-SkinColor)' : 'rgba(119,119,119,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background .2s' }}>
                            <i className={`ti ti-angle-${isOpen ? 'up' : 'down'}`} style={{ fontSize: '11px', color: isOpen ? '#fff' : '#888' }} />
                          </span>
                        </button>
                        {/* Answer */}
                        {isOpen && (
                          <div style={{ padding: '0 20px 20px', fontSize: '13.5px', color: '#555', lineHeight: 1.65, borderTop: '1px solid rgba(119,119,119,.08)' }}>
                            <div style={{ paddingTop: '16px' }}>{item.a}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Lien contact */}
              {!searchLower && (
                <div style={{ marginTop: '30px', padding: '20px 24px', background: 'rgba(26,58,92,.04)', border: '1px solid rgba(26,58,92,.1)', borderRadius: '6px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ fontSize: '14px', color: '#1A3A5C', display: 'block', marginBottom: '4px' }}>
                      Vous avez d'autres questions ?
                    </strong>
                    <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Notre équipe est disponible du lundi au vendredi, de 8h à 17h.</p>
                  </div>
                  <Link to="/contact" className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor" style={{ flexShrink: 0 }}>
                    Nous contacter
                  </Link>
                </div>
              )}
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
                    <div className="featured-title"><h3>Prêt à rejoindre le COPA ?</h3></div>
                    <div className="featured-desc"><p>L'inscription est gratuite et ne prend que quelques minutes.</p></div>
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
};

export default Ressources_FAQ;
