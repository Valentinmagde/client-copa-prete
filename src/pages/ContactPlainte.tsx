import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';

type ComplaintType =
  | 'tech'
  | 'selection'
  | 'behavior'
  | 'corruption'
  | 'vbg'
  | 'other';

interface ComplaintForm {
  anonymous: boolean;
  name: string;
  contact: string;
  type: ComplaintType | '';
  date: string;
  location: string;
  description: string;
  consent: boolean;
}

const COMPLAINT_TYPES: { value: ComplaintType; label: string; icon: string }[] = [
  { value: 'tech',       label: 'Problème technique avec la plateforme',         icon: '💻' },
  { value: 'selection',  label: 'Irrégularité dans le processus de sélection',   icon: '⚖️' },
  { value: 'behavior',   label: "Comportement inapproprié d'un agent/partenaire", icon: '👤' },
  { value: 'corruption', label: 'Demande de pots-de-vin ou corruption',           icon: '🚫' },
  { value: 'vbg',        label: 'Violence, harcèlement ou abus (VBG/EAS-HS)',    icon: '🆘' },
  { value: 'other',      label: 'Autre préoccupation',                            icon: '📝' },
];

const COMPLAINT_META: Record<ComplaintType, { color: string; bg: string; priority: string }> = {
  tech:       { color: '#1A3A5C', bg: '#EBF3FF', priority: 'Standard'    },
  selection:  { color: '#C97B2E', bg: '#FDF3E7', priority: 'Élevée'      },
  behavior:   { color: '#C97B2E', bg: '#FDF3E7', priority: 'Élevée'      },
  corruption: { color: '#C0392B', bg: '#FDECEA', priority: 'Urgente'     },
  vbg:        { color: '#C0392B', bg: '#FDECEA', priority: '🆘 Prioritaire' },
  other:      { color: '#6B7A90', bg: '#F4F5F7', priority: 'Standard'    },
};

const generateRef = () => 'COPA-' + Date.now().toString(36).toUpperCase().slice(-6);

const Contact_Plainte: React.FC = () => {
  const [form, setForm] = useState<ComplaintForm>({
    anonymous: false,
    name: '', contact: '', type: '',
    date: '', location: '', description: '',
    consent: false,
  });
  const [files, setFiles]     = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [refNumber,  setRefNumber]  = useState('');
  const [fieldError, setFieldError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setFieldError('');
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const filtered = selected.filter(f => f.size <= 10 * 1024 * 1024);
    setFiles(prev => [...prev, ...filtered].slice(0, 5));
  };

  const removeFile = (idx: number) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type) { setFieldError('Veuillez sélectionner le type de plainte.'); return; }
    if (!form.description.trim()) { setFieldError('Veuillez décrire les faits en détail.'); return; }
    if (!form.consent) { setFieldError('Vous devez accepter les conditions de traitement.'); return; }

    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setRefNumber(generateRef());
    setSubmitted(true);
  };

  const selectedTypeMeta = form.type ? COMPLAINT_META[form.type] : null;

  if (submitted) return (
    <div className="site-main">
      <Header />
      <PageHeader title="Plainte enregistrée" breadcrumb="Contact / Plainte" />
      <section className="ttm-row bg-theme-GreyColor clearfix" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-WhiteColor p-50 text-center" style={{ borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,.08)' }}>
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                <div className="layer-content">
                  <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
                  <h3 style={{ marginBottom: '10px' }}>Votre plainte a été enregistrée</h3>
                  <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px' }}>
                    Merci d'avoir signalé ce problème. Nous traitons chaque plainte avec sérieux et confidentialité.
                  </p>
                  <div style={{ display: 'inline-block', padding: '12px 24px', background: 'rgba(240,122,26,.08)', borderRadius: '8px', marginBottom: '24px' }}>
                    <p style={{ fontSize: '12px', color: '#888', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.6px' }}>Numéro de référence</p>
                    <p style={{ fontSize: '22px', fontWeight: 800, color: 'var(--theme-SkinColor)', margin: 0, fontFamily: 'monospace', letterSpacing: '2px' }}>
                      {refNumber}
                    </p>
                  </div>
                  <div className="ttm-list ttm-list-style-icon ttm-list-icon-color-skincolor text-left mb-25">
                    <ul>
                      {[
                        'Vous recevrez une réponse dans un délai de 15 jours ouvrables.',
                        'Votre plainte est traitée en toute confidentialité.',
                        form.type === 'vbg' ? '🆘 Les cas de VBG/EAS-HS bénéficient d\'un traitement prioritaire.' : null,
                        'Conservez votre numéro de référence pour suivre l\'état de votre plainte.',
                      ].filter(Boolean).map((item, i) => (
                        <li key={i} className="pb-8">
                          <i className="far fa-check-circle"></i>
                          <div className="ttm-list-li-content" style={{ fontSize: '13px' }}>{item as string}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to="/" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor mr-15">
                    Retour à l'accueil
                  </Link>
                  <Link to="/contact" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor">
                    Nous contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );

  return (
    <div className="site-main">
      <Header />
      <PageHeader title="Déposer une plainte" breadcrumb="Contact / Plainte" />

      {/* intro */}
      <section className="ttm-row clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div style={{ padding: '20px 28px', background: 'rgba(192,57,43,.05)', border: '1px solid rgba(192,57,43,.15)', borderRadius: '6px', marginBottom: '10px' }}>
                <p style={{ fontSize: '14px', color: '#555', margin: 0 }}>
                  <strong className="text-theme-SkinColor">Le COPA s'engage</strong> à traiter vos préoccupations avec sérieux et confidentialité. Si vous constatez un problème, une irrégularité, ou êtes victime de comportements inappropriés, n'hésitez pas à nous en faire part.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* form */}
      <section className="ttm-row padding_zero-section bg-layer-equal-height clearfix">
        <div className="container">
          <div className="row g-0">

            {/* Image panel */}
            <div className="col-lg-5">
              <div className="ttm-bg ttm-col-bgimage-yes col-bg-img-seven ttm-left-span">
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"
                  style={{ backgroundImage: 'url(https://via.placeholder.com/875x900?text=+)' }}></div>
                <div className="layer-content">
                  <div style={{ padding: '40px', color: '#fff', background: 'rgba(26,58,92,.85)', height: '100%' }}>
                    <h4 style={{ color: '#fff', marginBottom: '20px' }}>Types de plaintes acceptées</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px' }}>
                      {COMPLAINT_TYPES.map(t => (
                        <li key={t.value} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,.1)', fontSize: '13px' }}>
                          <span style={{ fontSize: '18px' }}>{t.icon}</span>
                          <span style={{ color: 'rgba(255,255,255,.85)' }}>{t.label}</span>
                          {(t.value === 'vbg' || t.value === 'corruption') && (
                            <span style={{ marginLeft: 'auto', padding: '1px 8px', background: 'rgba(192,57,43,.35)', borderRadius: 20, fontSize: '10px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>
                              Prioritaire
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                    <div style={{ padding: '14px 16px', background: 'rgba(255,255,255,.08)', borderRadius: '6px', borderLeft: '3px solid var(--theme-SkinColor,#f07a1a)' }}>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,.75)', margin: 0, lineHeight: 1.6 }}>
                        📌 Toutes les plaintes sont traitées de manière <strong style={{ color: '#fff' }}>confidentielle</strong>. Les cas de VBG/EAS-HS bénéficient d'un traitement <strong style={{ color: '#fff' }}>prioritaire</strong> et peuvent être orientés vers des services spécialisés.
                      </p>
                    </div>
                  </div>
                </div>
                <img className="img-fluid col-bg-img-res" src="https://via.placeholder.com/875x900?text=+" alt="" />
              </div>
            </div>

            {/* Form panel */}
            <div className="col-lg-7">
              <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-GreyColor h-auto p-50 p-lg-30 mt-50 mb-50">
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                <div className="layer-content">
                  <div className="section-title title-style-center_text mb-30">
                    <div className="title-header">
                      <h3>Formulaire de <span className="text-theme-SkinColor">plainte</span></h3>
                      <h2 className="title" style={{ fontSize: '22px' }}>Décrivez votre situation</h2>
                    </div>
                  </div>

                  {fieldError && (
                    <div style={{ padding: '10px 14px', background: '#FDECEA', border: '1px solid rgba(192,57,43,.2)', borderRadius: '4px', marginBottom: '16px', fontSize: '13px', color: '#C0392B' }}>
                      ⚠️ {fieldError}
                    </div>
                  )}

                  <form className="contact_form wrap-form" onSubmit={handleSubmit} noValidate>
                    <div className="row ttm-boxes-spacing-10px">

                      {/* Anonymat */}
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label style={{ flexDirection: 'row', alignItems: 'center', gap: '12px', padding: '14px 16px', background: '#fff', border: '1.5px solid rgba(119,119,119,.15)', borderRadius: '6px', cursor: 'pointer' }}>
                          <input
                            type="checkbox" name="anonymous" checked={form.anonymous} onChange={handleChange}
                            style={{ width: 'auto', height: 'auto', padding: 0, margin: 0, flexShrink: 0 }}
                          />
                          <span style={{ fontSize: '13.5px', fontWeight: 600 }}>
                            Je souhaite rester <strong>anonyme</strong>
                          </span>
                          {form.anonymous && (
                            <span style={{ marginLeft: 'auto', padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, color: '#2E7D52', background: '#E8F5EE', whiteSpace: 'nowrap' }}>
                              Anonyme activé
                            </span>
                          )}
                        </label>
                      </div>

                      {/* Identité conditionnelle */}
                      {!form.anonymous && (
                        <>
                          <div className="col-md-6 ttm-box-col-wrapper">
                            <label>
                              <input name="name" type="text" value={form.name} onChange={handleChange}
                                placeholder="Nom complet (optionnel)" />
                            </label>
                          </div>
                          <div className="col-md-6 ttm-box-col-wrapper">
                            <label>
                              <input name="contact" type="text" value={form.contact} onChange={handleChange}
                                placeholder="Téléphone ou email (optionnel)" />
                            </label>
                          </div>
                        </>
                      )}

                      {/* Type de plainte */}
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <select name="type" value={form.type} onChange={handleChange} required>
                            <option value="">Type de plainte *</option>
                            {COMPLAINT_TYPES.map(t => (
                              <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
                            ))}
                          </select>
                        </label>
                        {form.type && selectedTypeMeta && (
                          <div style={{ marginTop: '6px', padding: '6px 12px', borderRadius: '4px', background: selectedTypeMeta.bg, fontSize: '12px', color: selectedTypeMeta.color, fontWeight: 600 }}>
                            Priorité de traitement : {selectedTypeMeta.priority}
                            {form.type === 'vbg' && ' — Ce type de plainte sera orienté vers des services spécialisés.'}
                          </div>
                        )}
                      </div>

                      {/* Date et lieu */}
                      <div className="col-md-6 ttm-box-col-wrapper">
                        <label>
                          <input name="date" type="date" value={form.date} onChange={handleChange}
                            placeholder="Date des faits (optionnel)" max={new Date().toISOString().split('T')[0]} />
                        </label>
                      </div>
                      <div className="col-md-6 ttm-box-col-wrapper">
                        <label>
                          <input name="location" type="text" value={form.location} onChange={handleChange}
                            placeholder="Lieu des faits (optionnel)" />
                        </label>
                      </div>

                      {/* Description */}
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label>
                          <textarea name="description" rows={6} value={form.description} onChange={handleChange}
                            placeholder="Description détaillée des faits *&#10;Décrivez précisément ce qui s'est passé, quand, comment et qui était impliqué..." required />
                        </label>
                        <p style={{ fontSize: '11px', color: form.description.length < 30 ? '#C97B2E' : '#2E7D52', margin: '4px 0 0', paddingLeft: '4px' }}>
                          {form.description.length} caractères {form.description.length < 30 ? '(minimum recommandé : 100)' : '✓'}
                        </p>
                      </div>

                      {/* Pièces jointes */}
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <input type="file" ref={fileRef} onChange={handleFiles} multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          style={{ display: 'none' }} />
                        <div
                          onClick={() => fileRef.current?.click()}
                          style={{ border: '2px dashed rgba(119,119,119,.25)', borderRadius: '6px', padding: '20px', textAlign: 'center', cursor: 'pointer', background: '#fff', transition: 'border .2s' }}>
                          <i className="ti ti-upload" style={{ fontSize: '24px', color: '#bbb', display: 'block', marginBottom: '6px' }} />
                          <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>
                            Cliquez pour ajouter des pièces jointes
                          </p>
                          <p style={{ fontSize: '11px', color: '#bbb', margin: '4px 0 0' }}>
                            Documents, photos, captures d'écran — max 5 fichiers, 10 Mo chacun
                          </p>
                        </div>
                        {files.length > 0 && (
                          <div style={{ marginTop: '10px' }}>
                            {files.map((f, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 12px', background: '#fff', borderRadius: '4px', border: '1px solid rgba(119,119,119,.12)', marginBottom: '6px' }}>
                                <i className="ti ti-files" style={{ color: '#777' }} />
                                <span style={{ flex: 1, fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                                <span style={{ fontSize: '11px', color: '#aaa' }}>{(f.size / 1024).toFixed(0)} Ko</span>
                                <button type="button" onClick={() => removeFile(i)} style={{ background: 'none', border: 'none', color: '#C0392B', cursor: 'pointer', padding: '0 4px', fontSize: '16px' }}>×</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Consentement */}
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <label style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', border: '1.5px solid rgba(119,119,119,.15)', borderRadius: '6px', cursor: 'pointer', background: form.consent ? 'rgba(46,125,82,.04)' : '#fff', borderColor: form.consent ? 'rgba(46,125,82,.3)' : 'rgba(119,119,119,.15)' }}>
                          <input
                            type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required
                            style={{ width: 'auto', height: 'auto', padding: 0, margin: '3px 0 0', flexShrink: 0 }}
                          />
                          <span style={{ fontSize: '13px', color: '#555', lineHeight: 1.5 }}>
                            J'accepte que mes informations soient traitées de manière confidentielle par l'équipe COPA conformément à la politique de protection des données. <span style={{ color: '#dc3545' }}>*</span>
                          </span>
                        </label>
                      </div>

                      {/* Submit */}
                      <div className="col-md-12 ttm-box-col-wrapper">
                        <button
                          className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100"
                          type="submit" disabled={submitting}>
                          {submitting ? '⏳ Soumission en cours…' : '📨 Soumettre ma plainte'}
                        </button>
                      </div>

                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Aide urgente */}
      <section className="ttm-row clearfix" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div style={{ padding: '20px 28px', background: '#FDECEA', border: '1px solid rgba(192,57,43,.2)', borderRadius: '6px', display: 'flex', gap: '14px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '28px', flexShrink: 0 }}>🆘</div>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '14px', color: '#C0392B', display: 'block', marginBottom: '6px' }}>
                    Situations d'urgence — Violence, harcèlement, abus (VBG/EAS-HS)
                  </strong>
                  <p style={{ fontSize: '13px', color: '#555', margin: '0 0 10px' }}>
                    Si vous êtes victime ou témoin de violence basée sur le genre, de harcèlement sexuel ou d'abus, votre plainte sera traitée en priorité et vous pourrez être orienté(e) vers des services d'aide spécialisés.
                  </p>
                  <p style={{ fontSize: '13px', color: '#555', margin: 0 }}>
                    <strong>Ligne d'aide urgente :</strong> <a href="tel:+257XXXXXXXX" className="text-theme-SkinColor fw-bold">+257 XX XXX XXX</a>
                    <span style={{ marginLeft: '20px', color: '#888' }}>ou écrivez à </span>
                    <a href="mailto:urgence@prete.gov.bi" className="text-theme-SkinColor fw-bold">urgence@prete.gov.bi</a>
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
                    <div className="featured-title"><h3>Une autre question ? Contactez notre équipe.</h3></div>
                    <div className="featured-desc"><p>Notre équipe est disponible du lundi au vendredi, de 8h à 17h.</p></div>
                  </div>
                </div>
                <Link to="/contact" className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white">
                  Contactez-nous
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

export default Contact_Plainte;
