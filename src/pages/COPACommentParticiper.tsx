import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';

interface Step {
  num: string;
  title: string;
  desc: React.ReactNode;
  cta?: { label: string; to: string; primary?: boolean };
  note?: string;
}

const steps: Step[] = [
  {
    num: '01',
    title: 'Vérifiez votre éligibilité',
    desc: (
      <>
        <p>Avant de vous inscrire, assurez-vous que vous remplissez les critères d'éligibilité du COPA. Les conditions principales sont :</p>
        <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor mt-10">
          <li><i className="far fa-check-circle"></i><div className="ttm-list-li-content">Être une MPME formelle ou en cours de formalisation au Burundi</div></li>
          <li><i className="far fa-check-circle"></i><div className="ttm-list-li-content">Avoir un projet d'entreprise viable et innovant</div></li>
          <li><i className="far fa-check-circle"></i><div className="ttm-list-li-content">Pouvoir apporter une contribution propre (matching)</div></li>
        </ul>
      </>
    ),
    cta: { label: "Consulter tous les critères d'éligibilité", to: '/copa/criteres-eligibilite' },
  },
  {
    num: '02',
    title: 'Inscrivez-vous sur la plateforme',
    desc: (
      <>
        <p>Créez votre compte en quelques minutes. Vous aurez besoin de :</p>
        <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor mt-10">
          <li><i className="far fa-check-circle"></i><div className="ttm-list-li-content">Une adresse email valide ou un numéro de téléphone</div></li>
          <li><i className="far fa-check-circle"></i><div className="ttm-list-li-content">Une pièce d'identité (CNI, passeport ou carte de réfugié)</div></li>
          <li><i className="far fa-check-circle"></i><div className="ttm-list-li-content">Les informations de base sur votre entreprise</div></li>
        </ul>
      </>
    ),
    cta: { label: 'M\'inscrire maintenant', to: '/inscription', primary: true },
  },
  {
    num: '03',
    title: 'Complétez votre profil',
    desc: (
      <p>Une fois inscrit, complétez votre profil d'entrepreneur avec toutes les informations requises : données personnelles, informations sur l'entreprise, documents justificatifs. <strong>Un profil complet augmente vos chances de sélection.</strong></p>
    ),
  },
  {
    num: '04',
    title: 'Suivez les formations',
    desc: (
      <p>Participez aux formations <strong>obligatoires</strong> sur la rédaction de plan d'affaires. Ces formations sont gratuites et disponibles en présentiel ou en ligne. Elles vous donneront toutes les clés pour rédiger un plan d'affaires convaincant.</p>
    ),
    cta: { label: 'Voir le catalogue des formations', to: '/formations/catalogue' },
  },
  {
    num: '05',
    title: 'Rédigez et soumettez votre plan d\'affaires',
    desc: (
      <p>Utilisez les outils de la plateforme pour rédiger votre plan d'affaires. Vous pouvez sauvegarder votre travail et y revenir autant que nécessaire avant la date limite de soumission.</p>
    ),
    cta: { label: "Consulter le calendrier", to: '/copa/calendrier' },
    note: "Consultez les dates de soumission dans le calendrier COPA.",
  },
  {
    num: '06',
    title: 'Attendez les résultats',
    desc: (
      <p>Votre plan sera évalué par un comité d'experts indépendants selon des critères transparents. Vous serez informé des résultats par <strong>email et SMS</strong>.</p>
    ),
    note: "L'évaluation dure environ 10 à 15 jours ouvrables après la clôture des dépôts.",
  },
  {
    num: '07',
    title: 'Si vous êtes lauréat',
    desc: (
      <>
        <p>Félicitations ! En tant que lauréat, vous bénéficierez de :</p>
        <ul className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor mt-10">
          <li><i className="far fa-check-circle"></i><div className="ttm-list-li-content">Signature d'une convention de subvention avec le PRETE</div></li>
          <li><i className="far fa-check-circle"></i><div className="ttm-list-li-content">Accompagnement personnalisé pour la mise en œuvre</div></li>
          <li><i className="far fa-check-circle"></i><div className="ttm-list-li-content">Versement de la subvention de contrepartie</div></li>
          <li><i className="far fa-check-circle"></i><div className="ttm-list-li-content">Suivi post-projet par des mentors experts</div></li>
        </ul>
      </>
    ),
  },
];

const COPA_Comment_Participer: React.FC = () => (
  <div className="site-main">
    <Header />
    <PageHeader title="Comment participer au COPA ?" breadcrumb="COPA" />

    {/* intro */}
    <section className="ttm-row clearfix">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="section-title title-style-center_text pt-15">
              <div className="title-header">
                <h3>C'est <span className="text-theme-SkinColor">simple !</span></h3>
                <h2 className="title">Suivez ces étapes pour maximiser vos chances</h2>
              </div>
              <div className="title-desc">
                <p>Participer au COPA, c'est simple ! Suivez ces 7 étapes pour maximiser vos chances de succès et accéder à une subvention pour développer votre entreprise.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* steps */}
    <section className="ttm-row job-list-section bg-theme-GreyColor clearfix">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="candidate-timeline">
              {steps.map((step, i) => (
                <div key={i} className="timeline-panel" style={{ background: '#fff', borderRadius: '4px', marginBottom: '20px', padding: '30px', boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
                  <div className="timeline-head">
                    <h3 style={{ display:'flex', alignItems:'center', gap: '12px' }}>
                      <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'36px', height:'36px', borderRadius:'50%', background:'var(--theme-SkinColor,#f07a1a)', color:'#fff', fontSize:'14px', fontWeight:800, flexShrink:0 }}>
                        {step.num}
                      </span>
                      Étape {step.num} : {step.title}
                    </h3>
                    <span className="timeline-year"
                      style={{ padding:'3px 12px', borderRadius:20, fontSize:11, fontWeight:700, color: i===6?'#2E7D52':'#1A3A5C', background: i===6?'#E8F5EE':'#EBF3FF' }}>
                      {i===0?'À faire d\'abord': i===6?'Lauréat 🎉':'Étape obligatoire'}
                    </span>
                  </div>
                  <div className="timeline-body">
                    {step.desc}
                    {step.note && (
                      <p style={{ fontSize:'13px', color:'#777', fontStyle:'italic', marginTop:'10px', padding:'8px 12px', background:'rgba(119,119,119,.06)', borderLeft:'3px solid var(--theme-SkinColor)', borderRadius:'0 4px 4px 0' }}>
                        📌 {step.note}
                      </p>
                    )}
                    {step.cta && (
                      <div className="mt-15">
                        <Link
                          to={step.cta.to}
                          className={`ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ${step.cta.primary ? 'ttm-btn-style-fill ttm-btn-color-skincolor' : 'ttm-btn-style-border ttm-btn-color-skincolor'}`}>
                          {step.cta.label}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* faq-teaser */}
    <section className="ttm-row clearfix">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-GreyColor p-40" style={{ borderRadius:'4px' }}>
              <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
              <div className="layer-content">
                <h4 className="mb-15">Vous avez encore des questions ?</h4>
                <p className="mb-25">Consultez notre Foire Aux Questions pour trouver des réponses aux questions les plus fréquentes sur le COPA.</p>
                <Link to="/ressources/faq" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor mr-15">
                  Consulter la FAQ
                </Link>
                <Link to="/contact" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor">
                  Nous contacter
                </Link>
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
                  <div className="featured-title"><h3>Commencez votre parcours COPA aujourd'hui !</h3></div>
                  <div className="featured-desc"><p>L'inscription est gratuite et ne prend que quelques minutes.</p></div>
                </div>
              </div>
              <Link to="/inscription" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white">
                S'inscrire gratuitement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section> */}

    <Footer />
  </div>
);

export default COPA_Comment_Participer;
