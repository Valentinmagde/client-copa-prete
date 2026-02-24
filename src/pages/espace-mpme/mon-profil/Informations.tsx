import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import React, { Component, createRef, type RefObject } from "react";
import ProgressBar from "react-animated-progress-bar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// ─── Mock data ────────────────────────────────────────────────────────────────
const user = {
  firstName: "Valentin",
  lastName: "Nkurunziza",
  gender: "M",
  birthDate: "1990-04-15",
  phone: "+257 79 000 000",
  email: "valentin@example.com",
  province: "Bujumbura Mairie",
  commune: "Ntahangwa",
  entrepreneurType: "burundian",
  companyName: "TechBujumbura SARL",
  nif: "123456789",
  companyStatus: "formal",
  sector: "Technologies de l'information",
  creationYear: "2019",
  employeeCount: "12",
  annualRevenue: "15000000",
  activityDescription:
    "Développement de logiciels et solutions numériques pour les PME burundaises.",
  profileCompletion: 65,
  profilePhotoUrl: null,
};

const completionSteps = [
  { label: "Informations personnelles", done: true, pct: 100, link: null },
  { label: "Informations entreprise", done: true, pct: 100, link: null },
  {
    label: "Documents justificatifs",
    done: false,
    pct: 30,
    link: "/espace-mpme/mon-profil/documents",
  },
  {
    label: "Formations obligatoires",
    done: false,
    pct: 40,
    link: "/espace-mpme/mes-formations/en-cours",
  },
  {
    label: "Plan d'affaires",
    done: false,
    pct: 20,
    link: "/espace-mpme/mon-plan-affaires/redaction",
  },
];

interface MonProfilState {
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  phone: string;
  email: string;
  province: string;
  commune: string;
  companyName: string;
  nif: string;
  companyStatus: string;
  sector: string;
  creationYear: string;
  employeeCount: string;
  annualRevenue: string;
  activityDescription: string;

  saving: boolean;
  saveSuccess: boolean;

  nationality: string;
  idNumber: string;
  address: string;
  gpsLat: string;
  gpsLng: string;

  legalForm: string;
  rcNumber: string;
  secondarySector: string;
  womenEmployees: string;
  tempEmployees: string;
  revenueN1: string;
  revenueN2: string;
  clientsCount: string;
  suppliersCount: string;

  isWomanLed: boolean;
  isYoungEntrepreneur: boolean;
  isRefugeeEntrepreneur: boolean;
  climateImpact: boolean;

  photoPreview: string | null;
  uploading: boolean;
  uploadError: string | null;
}

class MonProfilInformations extends Component {
  private fileInputRef: RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.fileInputRef = createRef<HTMLInputElement>();
    this.state = {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      birthDate: user.birthDate,
      phone: user.phone,
      email: user.email,
      province: user.province,
      commune: user.commune,
      companyName: user.companyName,
      nif: user.nif,
      companyStatus: user.companyStatus,
      sector: user.sector,
      creationYear: user.creationYear,
      employeeCount: user.employeeCount,
      annualRevenue: user.annualRevenue,
      activityDescription: user.activityDescription,
      saving: false,
      saveSuccess: false,
      // Nouveaux champs personnels
      nationality: "Burundaise",
      idNumber: "",
      address: "",
      gpsLat: "",
      gpsLng: "",

      // Nouveaux champs entreprise
      legalForm: "",
      rcNumber: "",
      secondarySector: "",
      womenEmployees: "",
      tempEmployees: "",
      revenueN1: "",
      revenueN2: "",
      clientsCount: "",
      suppliersCount: "",

      // Critères spéciaux
      isWomanLed: false,
      isYoungEntrepreneur: false,
      isRefugeeEntrepreneur: false,
      climateImpact: false,

      // Photo
      photoPreview: user.profilePhotoUrl || null,
      uploading: false,
      uploadError: null,
    };
  }

  handleChange = (e: any) =>
    this.setState({ [e.target.name]: e.target.value, saveSuccess: false });

  handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ saving: true });
    await new Promise((r) => setTimeout(r, 800));
    this.setState({ saving: false, saveSuccess: true });
    setTimeout(() => this.setState({ saveSuccess: false }), 3000);
  };

  captureGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            gpsLat: position.coords.latitude,
            gpsLng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Erreur de récupération du GPS:", error);
          alert("Impossible de récupérer le GPS.");
        },
      );
    }
  };

  // Dans la classe MonProfilInformations, ajoutez ces méthodes :

  validatePhoto = (file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return 'Format non supporté. Utilisez JPG, PNG ou GIF.';
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return 'La photo ne doit pas dépasser 5 Mo.';
    }

    return null;
  };

  handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    const validationError = this.validatePhoto(file);
    if (validationError) {
      this.setState({ uploadError: validationError });
      setTimeout(() => this.setState({ uploadError: null }), 3000);
      return;
    }

    // Preview immédiat
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ 
        photoPreview: reader.result as string,
        uploading: true,
        uploadError: null
      });
    };
    reader.readAsDataURL(file);

    // Upload vers le serveur (simulation)
    try {
      // Simulation d'upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      this.setState({ 
        uploading: false,
      });
      
      toast.success('Photo de profil mise à jour avec succès');
    } catch (error) {
      console.error('Erreur upload:', error);
      this.setState({ 
        uploading: false,
        uploadError: "Échec de l'upload. Veuillez réessayer.",
        photoPreview: user.profilePhotoUrl || null
      });
    }
  };

  removePhoto = async () => {
    // if (!this?.state?.photoPreview) return;

    try {
      this.setState({ uploading: true });
      
      // Simulation de suppression
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.setState({ 
        photoPreview: null,
        uploading: false
      });
      
      toast.success('Photo de profil supprimée');
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast.error('Impossible de supprimer la photo');
      this.setState({ uploading: false });
    }
  };

  triggerFileInput = () => {
    this.fileInputRef.current?.click();
  };

  componentDidMount(): void {
    this.captureGPS();
  }

  render() {
    const s = this.state as any;
    return (
      <div className="site-main">
        <Header />
        <PageHeader title="Mon profil" breadcrumb="Mon profil" />

        <div className="ttm-row sidebar job-sidebar clearfix">
          <div className="container">
            <div className="row">
              {/* ══════════ SIDEBAR ══════════ */}
              <div className="col-lg-4 widget-area sidebar-left job_list-widget-area">
                <div className="job_list-widget">
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-user" /> Complétion du profil
                    </h3>
                    {/* <div className="pt-10 pb-5 px-5">
                      <div className="ttm-progress-bar clearfix">
                        <span className="">Score global ({user.profileCompletion}%)</span>
                        <ProgressBar rect percentage={String(user.profileCompletion)} />
                      </div>
                    </div> */}
                    <div className="featured-desc pb-10">
                      <p className="mb-10">
                        Score global ({user.profileCompletion}%)
                      </p>
                      <div className="ttm-progress-bar clearfix mb-10">
                        <ProgressBar
                          rect
                          percentage={String(user.profileCompletion)}
                        />
                      </div>
                    </div>
                    <ul>
                      {completionSteps.map((step, i) => (
                        <li
                          key={i}
                          className="d-flex align-items-center"
                          style={{ gap: 10 }}
                        >
                          <span
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              flexShrink: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: step.done
                                ? "#2E7D52"
                                : "rgba(119,119,119,.15)",
                            }}
                          >
                            {step.done ? (
                              <svg
                                viewBox="0 0 10 10"
                                fill="none"
                                stroke="#fff"
                                strokeWidth="2.5"
                                style={{ width: 10, height: 10 }}
                              >
                                <path
                                  d="M2 5l2.5 2.5 4-4"
                                  strokeLinecap="round"
                                />
                              </svg>
                            ) : (
                              <span
                                style={{
                                  fontSize: 9,
                                  fontWeight: 700,
                                  color: "#888",
                                }}
                              >
                                {step.pct}%
                              </span>
                            )}
                          </span>
                          <span
                            style={{
                              fontSize: 13,
                              color: step.done ? "#2E7D52" : "#555",
                              fontWeight: step.done ? 600 : 400,
                            }}
                          >
                            {step.link && !step.done ? (
                              <Link
                                to={step.link}
                                className="text-theme-SkinColor"
                              >
                                {step.label}
                              </Link>
                            ) : (
                              step.label
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </aside>

                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-layout-list-thumb" /> Mon espace MPME
                    </h3>
                    <ul>
                      <li className="d-flex align-items-center">
                        <i className="ti ti-user mr-5 text-theme-SkinColor" />
                        <Link
                          to="/espace-mpme/mon-profil/informations"
                          className="text-theme-SkinColor fw-bold"
                        >
                          Informations du profil
                        </Link>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="ti ti-clip mr-5" />
                        <Link to="/espace-mpme/mon-profil/documents">
                          Documents
                        </Link>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="ti ti-book mr-5" />
                        <Link to="/espace-mpme/mes-formations/en-cours">
                          Formations
                        </Link>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="ti ti-files mr-5" />
                        <Link to="/espace-mpme/mon-plan-affaires/redaction">
                          Plan d'affaires
                        </Link>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="ti ti-dashboard mr-5" />
                        <Link to="/espace-mpme/dashboard">Tableau de bord</Link>
                      </li>
                    </ul>
                  </aside>
                </div>

                <aside className="widget widget-download">
                  <ul className="download">
                    <li>
                      <Link to="/espace-mpme/mon-profil/documents">
                        Mes documents
                      </Link>
                      <i className="ti ti-clip" />
                    </li>
                    <li>
                      <Link to="/espace-mpme/mon-plan-affaires/soumission">
                        Soumettre mon plan
                      </Link>
                      <i className="ti ti-files" />
                    </li>
                  </ul>
                </aside>
              </div>
              {/* sidebar end */}

              {/* ══════════ CONTENU ══════════ */}
              <div className="col-lg-8 content-area">
                <div className="row mb-30">
                  <div className="col-md-12">
                    <div className="candidate-data">
                      {/* <div className="candidate-img">
                        <div
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 32,
                            fontWeight: 700,
                            color: "#fff",
                            background: "var(--theme-SkinColor,#1f4e79)",
                          }}
                        >
                          {user.firstName.charAt(0)}
                          {user.lastName.charAt(0)}
                        </div>
                      </div> */}
                       <div className="candidate-img">
                        <div className="profile-avatar-container">
                          {s.photoPreview ? (
                            <img 
                              src={s.photoPreview} 
                              alt="Photo de profil" 
                              className="profile-avatar"
                            />
                          ) : (
                            <div className="avatar-circle">
                              {s.firstName.charAt(0)}
                              {s.lastName.charAt(0)}
                            </div>
                          )}
                          
                          <input
                            ref={this.fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/gif"
                            onChange={this.handlePhotoUpload}
                            style={{ display: 'none' }}
                          />
                          
                          <button 
                            className="avatar-upload-btn"
                            onClick={this.triggerFileInput}
                            title="Changer la photo"
                          >
                            <i className="ti ti-camera" />
                          </button>

                          {s.photoPreview && (
                            <button 
                              className="avatar-remove-btn"
                              onClick={this.removePhoto}
                              title="Supprimer la photo"
                            >
                              <i className="ti ti-close" />
                            </button>
                          )}
                        </div>

                        {s.uploading && (
                          <div className="upload-progress">
                            <div className="progress-spinner" />
                            <span>Upload...</span>
                          </div>
                        )}

                        {s.uploadError && (
                          <div className="upload-error">
                            <i className="ti ti-alert" />
                            <span>{s.uploadError}</span>
                          </div>
                        )}
                      </div>
                      <div className="candidate-caption">
                        <h5>
                          {s.firstName} {s.lastName}
                        </h5>
                        <span>{s.companyName}</span>
                        <div className="meta-line">
                          <span>
                            <i className="ti ti-location-pin" /> {s.province}
                          </span>
                          <span>
                            <i className="ti ti-headphone" /> {s.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {s.saveSuccess && (
                  <div className="row">
                    <div className="col-12">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "12px 18px",
                          background: "#E8F5EE",
                          border: "1px solid #2E7D52",
                          borderRadius: 6,
                          marginBottom: 20,
                        }}
                      >
                        <i
                          className="ti ti-check"
                          style={{ color: "#2E7D52", fontSize: 18 }}
                        />
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#2E7D52",
                          }}
                        >
                          Modifications enregistrées avec succès.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    {/* ── Informations personnelles ──
                        ✅ wrap-form register_form : garde padding-left:50px pour les icônes */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Informations personnelles</h5>
                      </div>
                      <div className="desc">
                        <form
                          className="wrap-form register_form"
                          onSubmit={this.handleSave}
                          noValidate
                        >
                          <div className="row ttm-boxes-spacing-10px">
                            {/* Photo */}
                            {/* <div className="ttm-box-col-wrapper col-lg-12">
                              <label>
                                <i className="ti ti-camera" />
                                <input
                                  type="file"
                                  name="photo"
                                  accept="image/*"
                                  onChange={this.handleChange}
                                />
                              </label>
                            </div> */}

                            {/* Prénom */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-user" />
                                <input
                                  name="firstName"
                                  type="text"
                                  value={s.firstName}
                                  onChange={this.handleChange}
                                  placeholder="Prénom"
                                />
                              </label>
                            </div>

                            {/* Nom de famille */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-user" />
                                <input
                                  name="lastName"
                                  type="text"
                                  value={s.lastName}
                                  onChange={this.handleChange}
                                  placeholder="Nom de famille"
                                />
                              </label>
                            </div>

                            {/* Genre */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-layout-list-thumb" />
                                <select
                                  name="gender"
                                  value={s.gender}
                                  onChange={this.handleChange}
                                >
                                  <option value="">Genre</option>
                                  <option value="M">Masculin</option>
                                  <option value="F">Féminin</option>
                                </select>
                              </label>
                            </div>

                            {/* Date de naissance */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-calendar" />
                                <input
                                  name="birthDate"
                                  type="date"
                                  value={s.birthDate}
                                  onChange={this.handleChange}
                                />
                              </label>
                            </div>

                            {/* Nationalité */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-flag" />
                                <input
                                  name="nationality"
                                  value={s.nationality}
                                  onChange={this.handleChange}
                                  placeholder="Nationalité"
                                />
                              </label>
                            </div>

                            {/* Pièce d'identité */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-id-badge" />
                                <input
                                  name="idNumber"
                                  value={s.idNumber}
                                  onChange={this.handleChange}
                                  placeholder="Numéro pièce d'identité"
                                />
                              </label>
                            </div>

                            {/* Email */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-email" />
                                <input
                                  name="email"
                                  type="email"
                                  value={s.email}
                                  onChange={this.handleChange}
                                  placeholder="Email"
                                />
                              </label>
                            </div>

                            {/* Téléphone */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-mobile" />
                                <input
                                  name="phone"
                                  type="tel"
                                  value={s.phone}
                                  onChange={this.handleChange}
                                  placeholder="Téléphone"
                                />
                              </label>
                            </div>

                            {/* Adresse */}
                            <div className="ttm-box-col-wrapper col-lg-12">
                              <label>
                                <i className="ti ti-home" />
                                <input
                                  name="address"
                                  value={s.address}
                                  onChange={this.handleChange}
                                  placeholder="Adresse complète"
                                />
                              </label>
                            </div>

                            {/* GPS */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-location-pin" />
                                <input
                                  name="gpsLat"
                                  value={s.gpsLat}
                                  onChange={this.handleChange}
                                  placeholder="Latitude"
                                />
                              </label>
                            </div>

                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-location-pin" />
                                <input
                                  name="gpsLng"
                                  value={s.gpsLng}
                                  onChange={this.handleChange}
                                  placeholder="Longitude"
                                />
                              </label>
                            </div>

                            {/* <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-map" />
                                <select
                                  name="province"
                                  value={s.province}
                                  onChange={this.handleChange}
                                >
                                  <option value="Bujumbura Mairie">
                                    Bujumbura Mairie
                                  </option>
                                  <option value="Bujumbura Rural">
                                    Bujumbura Rural
                                  </option>
                                  <option value="Gitega">Gitega</option>
                                  <option value="Ngozi">Ngozi</option>
                                </select>
                              </label>
                            </div>
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-map-alt" />
                                <select
                                  name="commune"
                                  value={s.commune}
                                  onChange={this.handleChange}
                                >
                                  <option value="Ntahangwa">Ntahangwa</option>
                                  <option value="Mukaza">Mukaza</option>
                                  <option value="Muha">Muha</option>
                                </select>
                              </label>
                            </div> */}
                            <div className="ttm-box-col-wrapper col-lg-12">
                              <label>
                                <button
                                  type="submit"
                                  className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                  disabled={s.saving}
                                >
                                  {s.saving
                                    ? "Enregistrement…"
                                    : "Enregistrer les modifications"}
                                </button>
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* ── Informations entreprise ── */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Informations de l'entreprise</h5>
                      </div>
                      <div className="desc">
                        <form
                          className="wrap-form register_form"
                          onSubmit={this.handleSave}
                          noValidate
                        >
                          <div className="row ttm-boxes-spacing-10px">
                            {/* Nom de l'entreprise */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-briefcase" />
                                <input
                                  name="companyName"
                                  type="text"
                                  value={s.companyName}
                                  onChange={this.handleChange}
                                  placeholder="Nom de l'entreprise"
                                />
                              </label>
                            </div>

                            {/* Statut juridique */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-briefcase" />
                                <select
                                  name="legalForm"
                                  onChange={this.handleChange}
                                >
                                  <option value="">Forme juridique</option>
                                  <option value="SARL">SARL</option>
                                  <option value="SA">SA</option>
                                  <option value="Cooperative">
                                    Coopérative
                                  </option>
                                  <option value="Individuelle">
                                    Entreprise individuelle
                                  </option>
                                </select>
                              </label>
                            </div>

                            {/* Numéro NIF */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-id-badge" />
                                <input
                                  name="nif"
                                  type="text"
                                  value={s.nif}
                                  onChange={this.handleChange}
                                  placeholder="Numéro NIF"
                                />
                              </label>
                            </div>

                            {/* Numéro RC */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-id-badge" />
                                <input
                                  name="rcNumber"
                                  value={s.rcNumber}
                                  onChange={this.handleChange}
                                  placeholder="Numéro Registre de Commerce"
                                />
                              </label>
                            </div>

                            {/* Année de création */}
                            <div className="ttm-box-col-wrapper col-lg-12">
                              <label>
                                <i className="ti ti-calendar" />
                                <input
                                  name="creationYear"
                                  type="number"
                                  value={s.creationYear}
                                  onChange={this.handleChange}
                                  placeholder="Année de création"
                                />
                              </label>
                            </div>

                            {/* Secteur d'activité */}
                            {/* Secteur principal */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-layers" />
                                <select
                                  name="sector"
                                  value={s.sector}
                                  onChange={this.handleChange}
                                >
                                  <option value="">Secteur principal</option>
                                  <option value="Technologies de l'information">
                                    Technologies de l'information
                                  </option>
                                  <option value="Agriculture">
                                    Agriculture
                                  </option>
                                  <option value="Commerce">Commerce</option>
                                  <option value="Artisanat">Artisanat</option>
                                  <option value="Services">Services</option>
                                </select>
                              </label>
                            </div>

                            {/* Secteur secondaire */}
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-layers" />
                                <select
                                  name="secondarySector"
                                  value={s.secondarySector}
                                  onChange={this.handleChange}
                                >
                                  <option value="">Secteur secondaire</option>
                                  <option value="Agriculture">
                                    Agriculture
                                  </option>
                                  <option value="Commerce">Commerce</option>
                                  <option value="Artisanat">Artisanat</option>
                                  <option value="Services">Services</option>
                                </select>
                              </label>
                            </div>

                            {/* Description de l'activité */}
                            <div className="ttm-box-col-wrapper col-lg-12">
                              <label>
                                <textarea
                                  name="activityDescription"
                                  rows={4}
                                  value={s.activityDescription}
                                  onChange={this.handleChange}
                                  placeholder="Description de l'activité"
                                />
                              </label>
                            </div>

                            {/* Adresse */}
                            <div className="ttm-box-col-wrapper col-lg-12">
                              <label>
                                <i className="ti ti-home" />
                                <input
                                  name="address"
                                  value={s.address}
                                  onChange={this.handleChange}
                                  placeholder="Adresse complète"
                                />
                              </label>
                            </div>

                            {/* Bouton de sauvegarde */}
                            <div className="ttm-box-col-wrapper col-lg-12">
                              <label>
                                <button
                                  type="submit"
                                  className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                  disabled={s.saving}
                                >
                                  {s.saving
                                    ? "Enregistrement…"
                                    : "Enregistrer les modifications"}
                                </button>
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* ── Données économiques ── */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Données économiques</h5>
                      </div>
                      <div className="desc">
                        <form
                          className="wrap-form register_form"
                          onSubmit={this.handleSave}
                        >
                          <div className="row ttm-boxes-spacing-10px">
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-user" />
                                <input
                                  name="womenEmployees"
                                  type="number"
                                  value={s.womenEmployees}
                                  onChange={this.handleChange}
                                  placeholder="Employées femmes"
                                />
                              </label>
                            </div>

                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-time" />
                                <input
                                  name="tempEmployees"
                                  type="number"
                                  value={s.tempEmployees}
                                  onChange={this.handleChange}
                                  placeholder="Employés temporaires"
                                />
                              </label>
                            </div>

                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-money" />
                                <input
                                  name="revenueN1"
                                  type="number"
                                  value={s.revenueN1}
                                  onChange={this.handleChange}
                                  placeholder="Chiffre d’affaires année précédente"
                                />
                              </label>
                            </div>

                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-money" />
                                <input
                                  name="revenueN2"
                                  type="number"
                                  value={s.revenueN2}
                                  onChange={this.handleChange}
                                  placeholder="Chiffre d’affaires d’il y a 2 ans"
                                />
                              </label>
                            </div>

                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-user" />
                                <input
                                  name="clientsCount"
                                  type="number"
                                  value={s.clientsCount}
                                  onChange={this.handleChange}
                                  placeholder="Clients"
                                />
                              </label>
                            </div>

                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-briefcase" />
                                <input
                                  name="suppliersCount"
                                  type="number"
                                  value={s.suppliersCount}
                                  onChange={this.handleChange}
                                  placeholder="Fournisseurs"
                                />
                              </label>
                            </div>

                            <div className="ttm-box-col-wrapper col-lg-12">
                              <label>
                                <button
                                  type="submit"
                                  className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                  disabled={s.saving}
                                >
                                  {s.saving
                                    ? "Enregistrement…"
                                    : "Enregistrer les modifications"}
                                </button>
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* ── Critères spéciaux ── */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Critères spéciaux (Bonus COPA)</h5>
                      </div>
                      <div className="desc">
                        <form
                          className="wrap-form register_form"
                          onSubmit={this.handleSave}
                        >
                          <div className="row ttm-boxes-spacing-10px">
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <input
                                  type="checkbox"
                                  name="isWomanLed"
                                  checked={s.isWomanLed}
                                  onChange={(e) =>
                                    this.setState({
                                      isWomanLed: e.target.checked,
                                    })
                                  }
                                />
                                Entreprise dirigée par une femme
                              </label>
                            </div>

                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <input
                                  type="checkbox"
                                  name="isYoungEntrepreneur"
                                  checked={s.isYoungEntrepreneur}
                                  onChange={(e) =>
                                    this.setState({
                                      isYoungEntrepreneur: e.target.checked,
                                    })
                                  }
                                />
                                Entrepreneur jeune (18-35 ans)
                              </label>
                            </div>

                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <input
                                  type="checkbox"
                                  name="isRefugeeEntrepreneur"
                                  checked={s.isRefugeeEntrepreneur}
                                  onChange={(e) =>
                                    this.setState({
                                      isRefugeeEntrepreneur: e.target.checked,
                                    })
                                  }
                                />
                                Entrepreneur réfugié
                              </label>
                            </div>

                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <input
                                  type="checkbox"
                                  name="climateImpact"
                                  checked={s.climateImpact}
                                  onChange={(e) =>
                                    this.setState({
                                      climateImpact: e.target.checked,
                                    })
                                  }
                                />
                                Impact climatique positif
                              </label>
                            </div>

                            <div className="ttm-box-col-wrapper col-lg-12">
                              <label>
                                <button
                                  type="submit"
                                  className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                  disabled={s.saving}
                                >
                                  {s.saving
                                    ? "Enregistrement…"
                                    : "Enregistrer les modifications"}
                                </button>
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* ── Sécurité ── */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Sécurité du compte</h5>
                      </div>
                      <div className="desc">
                        <form
                          className="wrap-form register_form"
                          onSubmit={this.handleSave}
                          noValidate
                        >
                          <div className="row ttm-boxes-spacing-10px">
                            <div className="ttm-box-col-wrapper col-lg-12">
                              <label>
                                <i className="ti ti-lock" />
                                <input
                                  type="password"
                                  name="currentPassword"
                                  placeholder="Mot de passe actuel"
                                />
                              </label>
                            </div>
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-lock" />
                                <input
                                  type="password"
                                  name="newPassword"
                                  placeholder="Nouveau mot de passe"
                                />
                              </label>
                            </div>
                            <div className="ttm-box-col-wrapper col-lg-6">
                              <label>
                                <i className="ti ti-lock" />
                                <input
                                  type="password"
                                  name="confirmPassword"
                                  placeholder="Confirmer le nouveau mot de passe"
                                />
                              </label>
                            </div>
                            <div className="ttm-box-col-wrapper col-lg-12">
                              <label>
                                <button
                                  type="submit"
                                  className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                >
                                  Changer le mot de passe
                                </button>
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                        <h3>
                          Complétez votre profil pour accéder aux aides COPA
                        </h3>
                      </div>
                      <div className="featured-desc">
                        <p>
                          Un profil complet augmente vos chances d'obtenir une
                          subvention.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/espace-mpme/mon-profil/documents"
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                  >
                    Ajouter mes documents
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <style>{`
          .profile-avatar-container {
            position: relative;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            // overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          .avatar-circle {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: 700;
            color: #fff;
            background: var(--theme-SkinColor, #1f4e79);
            text-transform: uppercase;
          }

          .profile-avatar {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .avatar-upload-btn {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: var(--theme-SkinColor, #1f4e79);
            border: 2px solid #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 2;
          }

          .avatar-upload-btn:hover {
            background: var(--theme-SkinColor-dark, #0f2540);
            transform: scale(1.1);
          }

          .avatar-upload-btn i {
            color: #fff;
            font-size: 14px;
          }

          .avatar-remove-btn {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #dc3545;
            border: 2px solid #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            opacity: 0;
            transform: scale(0.8);
          }

          .profile-avatar-container:hover .avatar-remove-btn {
            opacity: 1;
            transform: scale(1);
          }

          .avatar-remove-btn:hover {
            background: #bd2130;
          }

          .avatar-remove-btn i {
            color: #fff;
            font-size: 12px;
          }

          // .upload-progress {
          //   position: absolute;
          //   top: 0;
          //   left: 0;
          //   right: 0;
          //   bottom: 0;
          //   background: rgba(255, 255, 255, 0.9);
          //   border-radius: 50%;
          //   display: flex;
          //   flex-direction: column;
          //   align-items: center;
          //   justify-content: center;
          //   z-index: 3;
          // }

          // .progress-spinner {
          //   width: 30px;
          //   height: 30px;
          //   border: 3px solid #f3f3f3;
          //   border-top: 3px solid var(--theme-SkinColor, #1f4e79);
          //   border-radius: 50%;
          //   animation: spin 1s linear infinite;
          //   margin-bottom: 5px;
          // }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .upload-progress span {
            font-size: 10px;
            color: #666;
          }

          .upload-error {
            position: absolute;
            top: 110%;
            left: 0;
            right: 0;
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 4px;
            padding: 5px 10px;
            font-size: 11px;
            color: #721c24;
            display: flex;
            align-items: center;
            gap: 5px;
            white-space: nowrap;
            z-index: 10;
          }

          .upload-error i {
            font-size: 12px;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .upload-error {
            animation: slideDown 0.3s ease;
          }

          .gps-input-group {
            display: flex;
            gap: 10px;
          }

          .gps-btn {
            width: 50px;
            height: 50px;
            border: 1px solid #dee2e6;
            border-radius: 6px;
            background: #f8f9fa;
            color: var(--theme-SkinColor, #1f4e79);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
          }

          .gps-btn:hover {
            background: var(--theme-SkinColor, #1f4e79);
            color: #fff;
          }

          .success-message {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 18px;
            background: #e8f5ee;
            border: 1px solid #2e7d52;
            border-radius: 6px;
            margin-bottom: 20px;
          }

          .success-message i {
            color: #2e7d52;
            font-size: 18px;
          }

          .success-message span {
            font-size: 13px;
            font-weight: 600;
            color: #2e7d52;
          }

          .checkbox-label {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
          }

          .checkbox-label input[type="checkbox"] {
            display: none;
          }

          .checkbox-custom {
            width: 18px;
            height: 18px;
            border: 2px solid #dee2e6;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
          }

          .checkbox-custom i {
            font-size: 12px;
            color: #fff;
            opacity: 0;
          }

          .checkbox-label input:checked + .checkbox-custom {
            background: var(--theme-SkinColor, #1f4e79);
            border-color: var(--theme-SkinColor, #1f4e79);
          }

          .checkbox-label input:checked + .checkbox-custom i {
            opacity: 1;
          }

          .checkbox-text {
            font-size: 13px;
            color: #495057;
          }
        `}</style>
      </div>
    );
  }
}

export default MonProfilInformations;
