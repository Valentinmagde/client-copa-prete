import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import PageHeader from '../components/layout/PageHeader';
import Footer from '../components/layout/Footer';

interface ContactForm {
  name: string; email: string; phone: string; subject: string; message: string;
}

const SUBJECTS = [
  'Question générale',
  'Problème technique',
  'Formations',
  "Plan d'affaires",
  'Subvention',
  'Éligibilité',
  'Autre',
];

const contactInfos = [
  {
    icon: 'fa fa-map-marker-alt',
    title: 'Notre adresse',
    lines: ['COPA-PRETE', 'Bujumbura, Burundi'],
    bg: '#EBF3FF', color: '#1A3A5C',
  },
  {
    icon: 'fa fa-phone-alt',
    title: 'Appelez-nous',
    lines: ['+257 XX XXX XXX', 'Lun–Ven, 8h00–17h00'],
    bg: 'rgba(240,122,26,.08)', color: 'var(--theme-SkinColor,#f07a1a)',
  },
  {
    icon: 'fa fa-envelope',
    title: 'Email',
    lines: ['copa@prete.gov.bi'],
    bg: '#E8F5EE', color: '#2E7D52',
  },
  {
    icon: 'fa fa-clock',
    title: 'Horaires',
    lines: ['Lundi – Vendredi', '8h00 – 17h00'],
    bg: '#F5F0FF', color: '#7C3AED',
  },
];

const Contact: React.FC = () => {
  const [form, setForm]       = useState<ContactForm>({ name:'', email:'', phone:'', subject:'', message:'' });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    setSending(false);
    setSent(true);
  };

  return (
    <div className="site-main">
      <Header />
      <PageHeader title="Contactez-nous" breadcrumb="Contact" />

      {/* contact info cards */}
      <section className="ttm-row grid-section clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text pt-15">
                <div className="title-header">
                  <h3>Notre <span className="text-theme-SkinColor">équipe</span></h3>
                  <h2 className="title">Nous sommes à votre écoute</h2>
                </div>
                <div className="title-desc">
                  <p>Vous avez une question sur le COPA ? Notre équipe est disponible pour vous accompagner à chaque étape de votre parcours entrepreneurial.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {contactInfos.map((info, i) => (
              <div key={i} className="col-lg-3 col-md-6 mb-30">
                <div className="featured-icon-box icon-align-top-content style3 text-center p-30 bg-theme-WhiteColor"
                  style={{ borderRadius:'4px', height:'100%', boxShadow:'0 2px 12px rgba(0,0,0,.07)', border:'1px solid rgba(119,119,119,.08)' }}>
                  <div className="featured-icon mb-15">
                    <div style={{ width:'52px', height:'52px', borderRadius:'50%', background:info.bg, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto' }}>
                      <i className={info.icon} style={{ fontSize:'20px', color:info.color }} />
                    </div>
                  </div>
                  <div className="featured-content">
                    <div className="featured-title"><h5 style={{ fontSize:'15px', marginBottom:'8px' }}>{info.title}</h5></div>
                    <div className="featured-desc">
                      {info.lines.map((line, j) => (
                        <p key={j} style={{ margin:j===0?'0 0 2px':'0', fontSize:'13px', color:'#555', fontWeight: j===0?600:400 }}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* map + form */}
      <section className="ttm-row map-section bg-theme-GreyColor clearfix">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title title-style-center_text pb-15">
                <div className="title-header">
                  <h3>Écrivez-<span className="text-theme-SkinColor">nous</span></h3>
                  <h2 className="title">Envoyez-nous un message</h2>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="col-lg-6">
              <iframe
                title="Localisation COPA Bujumbura"
                height="530"
                width="100%"
                style={{ border:0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63917.7168744!2d29.3306!3d-3.3839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c182539aef41d9%3A0x5578dc36de6e46f1!2sBujumbura%2C%20Burundi!5e0!3m2!1sfr!2sbi!4v1624000000000!5m2!1sfr!2sbi"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Form */}
            <div className="col-lg-6">
              <div className="ttm-col-bgcolor-yes ttm-bg bg-theme-WhiteColor z-index-2 p-40 p-lg-30 mt-lg-30">
                <div className="ttm-col-wrapper-bg-layer ttm-bg-layer"></div>
                <div className="layer-content">

                  {sent ? (
                    <div style={{ textAlign:'center', padding:'30px 10px' }}>
                      <div style={{ fontSize:'52px', marginBottom:'16px' }}>✅</div>
                      <h4 style={{ marginBottom:'10px' }}>Message envoyé avec succès !</h4>
                      <p style={{ fontSize:'14px', color:'#666', marginBottom:'24px' }}>
                        Notre équipe vous répondra dans les <strong>2 jours ouvrables</strong>.
                      </p>
                      <button
                        className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
                        onClick={() => { setSent(false); setForm({ name:'', email:'', phone:'', subject:'', message:'' }); }}>
                        Envoyer un autre message
                      </button>
                    </div>
                  ) : (
                    <form className="contact_form wrap-form" onSubmit={handleSubmit} noValidate>
                      {error && (
                        <div style={{ padding:'10px 14px', background:'#FDECEA', border:'1px solid rgba(192,57,43,.2)', borderRadius:'4px', marginBottom:'16px', fontSize:'13px', color:'#C0392B' }}>
                          ⚠️ {error}
                        </div>
                      )}
                      <div className="row ttm-boxes-spacing-10px">
                        <div className="col-md-12 ttm-box-col-wrapper">
                          <label>
                            <input name="name" type="text" value={form.name} onChange={handleChange}
                              placeholder="Nom complet *" required />
                          </label>
                        </div>
                        <div className="col-md-6 ttm-box-col-wrapper">
                          <label>
                            <input name="email" type="email" value={form.email} onChange={handleChange}
                              placeholder="Adresse email *" required />
                          </label>
                        </div>
                        <div className="col-md-6 ttm-box-col-wrapper">
                          <label>
                            <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                              placeholder="Téléphone (optionnel)" />
                          </label>
                        </div>
                        <div className="col-md-12 ttm-box-col-wrapper">
                          <label>
                            <select name="subject" value={form.subject} onChange={handleChange} required>
                              <option value="">Sujet *</option>
                              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </label>
                        </div>
                        <div className="col-md-12 ttm-box-col-wrapper">
                          <label>
                            <textarea name="message" rows={7} value={form.message} onChange={handleChange}
                              placeholder="Votre message *" required />
                          </label>
                        </div>
                      </div>
                      <button
                        className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100"
                        type="submit" disabled={sending}>
                        {sending ? 'Envoi en cours…' : '✉️ Envoyer le message'}
                      </button>
                    </form>
                  )}

                  {/* Lien plainte */}
                  <div style={{ marginTop:'20px', paddingTop:'16px', borderTop:'1px solid rgba(119,119,119,.1)', textAlign:'center' }}>
                    <p style={{ fontSize:'12px', color:'#888', margin:'0 0 6px' }}>
                      Vous souhaitez signaler une irrégularité ?
                    </p>
                    <Link to="/submit-complaint" style={{ fontSize:'13px', fontWeight:600, color:'#C0392B' }}>
                      ⚠️ Déposer une plainte
                    </Link>
                  </div>
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
                    <div className="featured-title"><h3>Prêt à rejoindre le COPA ?</h3></div>
                    <div className="featured-desc"><p>Inscrivez-vous gratuitement et commencez votre parcours entrepreneurial.</p></div>
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

export default Contact;
