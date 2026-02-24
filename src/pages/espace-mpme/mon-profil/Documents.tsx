import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import PageHeader from '@/components/layout/PageHeader';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// ─── Types & data ─────────────────────────────────────────────────────────────

type DocStatus = 'validated' | 'pending' | 'rejected' | 'missing';

interface DocumentItem {
  id: string;
  label: string;
  description: string;
  required: boolean;
  status: DocStatus;
  filename?: string;
  uploadedAt?: string;
  rejectionReason?: string;
}

const STATUS_META: Record<DocStatus, { label: string; color: string; bg: string; icon: string }> = {
  validated: { label: 'Validé',    color: '#2E7D52', bg: '#E8F5EE', icon: 'ti-check'        },
  pending:   { label: 'En cours',  color: '#C97B2E', bg: '#FDF3E7', icon: 'ti-time'          },
  rejected:  { label: 'Rejeté',   color: '#C0392B', bg: '#FDECEA', icon: 'ti-close'         },
  missing:   { label: 'Manquant', color: '#6B7A90', bg: '#F4F5F7', icon: 'ti-upload'        },
};

const DOCUMENTS: DocumentItem[] = [
  {
    id: 'cin',
    label: "Carte nationale d'identité",
    description: "Recto-verso de votre CIN en cours de validité.",
    required: true,
    status: 'validated',
    filename: 'cin_nkurunziza.pdf',
    uploadedAt: '20 fév. 2026',
  },
  {
    id: 'reg_commerce',
    label: "Registre de commerce",
    description: "Document officiel d'enregistrement de votre entreprise.",
    required: true,
    status: 'pending',
    filename: 'registre_techbujumbura.pdf',
    uploadedAt: '22 fév. 2026',
  },
  {
    id: 'nif_doc',
    label: "Certificat NIF",
    description: "Certificat d'immatriculation fiscale délivré par l'OBR.",
    required: true,
    status: 'rejected',
    filename: 'nif_old.pdf',
    uploadedAt: '20 fév. 2026',
    rejectionReason: 'Le document est illisible. Veuillez soumettre une version de meilleure qualité.',
  },
  {
    id: 'patente',
    label: "Patente / Autorisation d'exercice",
    description: "Document autorisant l'exercice de votre activité.",
    required: true,
    status: 'missing',
  },
  {
    id: 'releve_bancaire',
    label: "Relevé bancaire (3 derniers mois)",
    description: "Extrait bancaire de vos 3 derniers mois d'activité.",
    required: false,
    status: 'missing',
  },
  {
    id: 'cv',
    label: "CV du dirigeant",
    description: "Curriculum vitæ à jour du dirigeant principal.",
    required: false,
    status: 'validated',
    filename: 'cv_valentin.pdf',
    uploadedAt: '20 fév. 2026',
  },
];

const validated = DOCUMENTS.filter(d => d.status === 'validated').length;
const total      = DOCUMENTS.length;
const required   = DOCUMENTS.filter(d => d.required);
const reqDone    = required.filter(d => d.status === 'validated').length;

class MonProfilDocuments extends Component {

  render() {
    return (
      <div className="site-main">
        <Header />
        <PageHeader title="Mes documents" breadcrumb="Documents" />

        <div className="ttm-row sidebar job-sidebar clearfix">
          <div className="container">
            <div className="row">


              {/* ══════════ SIDEBAR ══════════ */}
              <div className="col-lg-4 widget-area sidebar-left job_list-widget-area">
                <div className="job_list-widget">

                  {/* Résumé */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-files" /> Résumé des documents
                    </h3>
                    <ul>
                      <li className="d-flex"><b className="mr-5">Total :</b><span>{total} documents</span></li>
                      <li className="d-flex"><b className="mr-5">Fournis :</b><span style={{ color: '#2E7D52', fontWeight: 600 }}>{validated} validés</span></li>
                      <li className="d-flex"><b className="mr-5">Obligatoires :</b><span>{reqDone}/{required.length} validés</span></li>
                      <li className="d-flex">
                        <b className="mr-5">État :</b>
                        {reqDone === required.length
                          ? <span style={{ color: '#2E7D52', fontWeight: 700 }}>✓ Complet</span>
                          : <span style={{ color: '#C97B2E', fontWeight: 600 }}>En cours</span>
                        }
                      </li>
                    </ul>
                  </aside>

                  {/* Légende statuts */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-info-alt" /> Légende des statuts
                    </h3>
                    <ul>
                      {(Object.entries(STATUS_META) as [DocStatus, typeof STATUS_META[DocStatus]][]).map(([key, meta]) => (
                        <li key={key} className="d-flex align-items-center" style={{ gap: 8 }}>
                          <span style={{
                            display: 'inline-flex', padding: '2px 10px', borderRadius: 20,
                            fontSize: 11, fontWeight: 700, color: meta.color, background: meta.bg,
                          }}>
                            {meta.label}
                          </span>
                          <span style={{ fontSize: 12, color: '#777' }}>
                            {key === 'validated' && 'Document accepté par COPA'}
                            {key === 'pending'   && 'En cours de vérification'}
                            {key === 'rejected'  && 'Refusé — à remplacer'}
                            {key === 'missing'   && 'Pas encore soumis'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </aside>

                  {/* Navigation */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-layout-list-thumb" /> Mon espace MPME
                    </h3>
                    <ul>
                      <li className="d-flex align-items-center"><i className="ti ti-user mr-5" /><Link to="/espace-mpme/mon-profil/informations">Mon profil</Link></li>
                      <li className="d-flex align-items-center"><i className="ti ti-clip mr-5 text-theme-SkinColor" /><Link to="/espace-mpme/mon-profil/documents" className="text-theme-SkinColor fw-bold">Documents</Link></li>
                      <li className="d-flex align-items-center"><i className="ti ti-book mr-5" /><Link to="/espace-mpme/mes-formations/en-cours">Formations</Link></li>
                      <li className="d-flex align-items-center"><i className="ti ti-files mr-5" /><Link to="/espace-mpme/mon-plan-affaires/redaction">Plan d'affaires</Link></li>
                      <li className="d-flex align-items-center"><i className="ti ti-dashboard mr-5" /><Link to="/espace-mpme/dashboard">Tableau de bord</Link></li>
                    </ul>
                  </aside>

                </div>

                {/* Formats acceptés */}
                <div className="overview-box">
                  <div className="title">
                    <p className="mb-10 fw-bold">Formats acceptés :</p>
                  </div>
                  <ul style={{ paddingLeft: 18, fontSize: 13, color: '#555', lineHeight: 1.8 }}>
                    <li>PDF, JPG, PNG</li>
                    <li>Taille max : 5 Mo par fichier</li>
                    <li>Documents lisibles et à jour</li>
                    <li>Langue : français ou kirundi</li>
                  </ul>
                </div>

              </div>
              {/* sidebar end */}


              {/* ══════════ CONTENU ══════════ */}
              <div className="col-lg-8 content-area">
                <div className="row">
                  <div className="col-lg-12 col-md-12">


                    {/* Liste des documents — candidate-timeline */}
                    {DOCUMENTS.map((doc) => {
                      const meta = STATUS_META[doc.status];
                      return (
                        <div key={doc.id} className="overview-box">
                          <div className="title">
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 className="mb-0" style={{ fontSize: 15 }}>
                                {doc.required && (
                                  <span style={{ color: '#dc3545', marginRight: 4, fontSize: 13 }}>*</span>
                                )}
                                {doc.label}
                              </h5>
                              <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: 5,
                                padding: '3px 12px', borderRadius: 20,
                                fontSize: 11, fontWeight: 700,
                                color: meta.color, background: meta.bg,
                              }}>
                                <i className={`ti ${meta.icon}`} style={{ fontSize: 10 }} />
                                {meta.label}
                              </span>
                            </div>
                          </div>
                          <div className="desc">
                            <p style={{ fontSize: 13, color: '#777', marginBottom: 12 }}>
                              {doc.description}
                            </p>

                            {/* Rejet */}
                            {doc.status === 'rejected' && doc.rejectionReason && (
                              <div style={{
                                display: 'flex', gap: 10, padding: '10px 14px',
                                background: '#FDECEA', borderRadius: 6,
                                borderLeft: '3px solid #dc3545', marginBottom: 12,
                              }}>
                                <i className="ti ti-info-alt" style={{ color: '#dc3545', marginTop: 2 }} />
                                <p style={{ fontSize: 12, color: '#555', margin: 0, lineHeight: 1.5 }}>
                                  <strong style={{ color: '#C0392B' }}>Raison du rejet : </strong>
                                  {doc.rejectionReason}
                                </p>
                              </div>
                            )}

                            {/* Fichier existant */}
                            {doc.filename && (
                              <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '8px 14px', background: '#f8f9fa',
                                border: '1px solid rgba(119,119,119,.15)', borderRadius: 6, marginBottom: 12,
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                  <i className="ti ti-files" style={{ color: 'var(--theme-SkinColor)', fontSize: 18 }} />
                                  <div>
                                    <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{doc.filename}</p>
                                    {doc.uploadedAt && <p style={{ fontSize: 11, color: '#888', margin: 0 }}>Soumis le {doc.uploadedAt}</p>}
                                  </div>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                  <button className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor" type="button">
                                    <i className="ti ti-eye" /> Voir
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Upload */}
                            {(doc.status === 'missing' || doc.status === 'rejected') && (
                              <div className="wrap-form">
                                <label style={{ cursor: 'pointer' }}>
                                  <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    style={{ display: 'none' }}
                                    onChange={() => {}} // Connecter à votre service
                                  />
                                  <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    gap: 10, padding: '14px 20px',
                                    border: '2px dashed rgba(119,119,119,.25)', borderRadius: 6,
                                    cursor: 'pointer', transition: 'border-color .2s',
                                  }}>
                                    <i className="ti ti-cloud-up" style={{ fontSize: 20, color: 'var(--theme-SkinColor)' }} />
                                    <span style={{ fontSize: 13, color: '#555' }}>
                                      Cliquez pour sélectionner un fichier (PDF, JPG, PNG — max 5 Mo)
                                    </span>
                                  </div>
                                </label>
                              </div>
                            )}

                            {doc.status === 'pending' && (
                              <p style={{
                                fontSize: 12, color: '#C97B2E', fontWeight: 600, margin: 0,
                                display: 'flex', alignItems: 'center', gap: 6,
                              }}>
                                <i className="ti ti-time" /> Votre document est en cours de vérification par l'équipe COPA.
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}


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
                        <h3>Tous vos documents validés ? Rédigez votre plan !</h3>
                      </div>
                      <div className="featured-desc">
                        <p>Un dossier complet vous permet de soumettre votre plan d'affaires.</p>
                      </div>
                    </div>
                  </div>
                  <Link to="/espace-mpme/mon-plan-affaires/redaction"
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white">
                    Mon plan d'affaires
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

export default MonProfilDocuments;
