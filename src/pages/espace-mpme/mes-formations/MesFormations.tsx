import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import React, { Component } from "react";
import ProgressBar from "react-animated-progress-bar";
import { Link } from "react-router-dom";

// ─── Types & data ─────────────────────────────────────────────────────────────

type ModuleStatus = "completed" | "in_progress" | "available" | "locked";

interface TrainingModule {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  lessons: number;
  status: ModuleStatus;
  progress: number;
  completedAt?: string;
  startedAt?: string;
  badge?: string;
}

const STATUS_META: Record<
  ModuleStatus,
  { label: string; color: string; bg: string; icon: string }
> = {
  completed: {
    label: "Terminé",
    color: "#2E7D52",
    bg: "#E8F5EE",
    icon: "ti-check",
  },
  in_progress: {
    label: "En cours",
    color: "#C97B2E",
    bg: "#FDF3E7",
    icon: "ti-time",
  },
  available: {
    label: "Disponible",
    color: "#1A3A5C",
    bg: "#EBF3FF",
    icon: "ti-book",
  },
  locked: {
    label: "Verrouillé",
    color: "#6B7A90",
    bg: "#F4F5F7",
    icon: "ti-lock",
  },
};

const MODULES: TrainingModule[] = [
  {
    id: 1,
    title: "Introduction à l'entrepreneuriat COPA",
    subtitle: "Module 1 — Fondamentaux",
    description:
      "Découvrez le programme COPA, ses objectifs, les critères d'éligibilité et les étapes du parcours de soutien aux MPME.",
    duration: "2h 30min",
    lessons: 6,
    status: "completed",
    progress: 100,
    completedAt: "21 fév. 2026",
    badge: "🏅",
  },
  {
    id: 2,
    title: "Gestion financière de base",
    subtitle: "Module 2 — Finance",
    description:
      "Apprenez les notions essentielles de comptabilité, gestion de trésorerie et lecture de bilans pour votre MPME.",
    duration: "3h 00min",
    lessons: 8,
    status: "completed",
    progress: 100,
    completedAt: "23 fév. 2026",
    badge: "🏅",
  },
  {
    id: 3,
    title: "Élaboration d'un plan d'affaires",
    subtitle: "Module 3 — Stratégie",
    description:
      "Maîtrisez les outils pour rédiger un plan d'affaires professionnel : étude de marché, modèle économique, prévisions financières.",
    duration: "4h 00min",
    lessons: 10,
    status: "in_progress",
    progress: 60,
    startedAt: "24 fév. 2026",
  },
  {
    id: 4,
    title: "Marketing et développement commercial",
    subtitle: "Module 4 — Commercial",
    description:
      "Stratégies marketing adaptées aux PME burundaises : positionnement, canaux de vente, fidélisation client.",
    duration: "3h 30min",
    lessons: 9,
    status: "available",
    progress: 0,
  },
  {
    id: 5,
    title: "Formalisation et cadre juridique",
    subtitle: "Module 5 — Juridique",
    description:
      "Comprenez le cadre légal des entreprises au Burundi, les obligations fiscales, le droit du travail et les démarches de formalisation.",
    duration: "2h 00min",
    lessons: 5,
    status: "locked",
    progress: 0,
  },
];

const completedCount = MODULES.filter((m) => m.status === "completed").length;
const totalCount = MODULES.length;
const globalPct = Math.round((completedCount / totalCount) * 100);
const currentModule = MODULES.find((m) => m.status === "in_progress");

class MesFormations extends Component {
  render() {
    return (
      <div className="site-main">
        <Header />
        <PageHeader title="Mes formations" breadcrumb="Formations" />

        <div className="ttm-row sidebar job-sidebar clearfix">
          <div className="container">
            <div className="row">
              {/* ══════════ SIDEBAR ══════════ */}
              <div className="col-lg-4 widget-area sidebar-left job_list-widget-area">
                <div className="job_list-widget">
                  {/* Résumé formations */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-book" /> Ma progression
                    </h3>
                    {/* <div className="pt-10 pb-5 px-5">
                      <div className="ttm-progress-bar clearfix">
                        <h3 className="progressbar-title">
                          Progression globale ({completedCount}/{totalCount} modules)
                        </h3>
                        <ProgressBar rect percentage={String(globalPct)} />
                      </div>
                    </div> */}
                    <div className="featured-desc pb-10">
                      <p className="mb-10">
                        Progression globale ({completedCount}/{totalCount})
                      </p>
                      <div className="ttm-progress-bar clearfix mb-10">
                        <ProgressBar rect percentage={String(globalPct)} />
                      </div>
                    </div>
                    <ul>
                      <li className="d-flex">
                        <b className="mr-5">Modules terminés :</b>
                        <span style={{ color: "#2E7D52", fontWeight: 600 }}>
                          {completedCount}
                        </span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">En cours :</b>
                        <span>1 module</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Restants :</b>
                        <span>{totalCount - completedCount - 1}</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Total heures :</b>
                        <span>~15h de formation</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Certificat :</b>
                        <span
                          style={{
                            color:
                              completedCount === totalCount
                                ? "#2E7D52"
                                : "#C97B2E",
                            fontWeight: 600,
                          }}
                        >
                          {completedCount === totalCount
                            ? "✓ Obtenu"
                            : "En attente"}
                        </span>
                      </li>
                    </ul>
                  </aside>

                  {/* Module en cours */}
                  {currentModule && (
                    <aside className="widget form-widget">
                      <h3 className="widget-title">
                        <i className="ti ti-time" /> Module en cours
                      </h3>
                      <div style={{ padding: "10px 5px" }}>
                        <h6
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            marginBottom: 6,
                          }}
                        >
                          {currentModule.title}
                        </h6>
                        <p
                          style={{
                            fontSize: 12,
                            color: "#777",
                            marginBottom: 10,
                          }}
                        >
                          {currentModule.subtitle}
                        </p>
                        <div className="ttm-progress-bar clearfix">
                          <h3 className="progressbar-title">
                            Progression ({currentModule.progress} %)
                          </h3>
                          <ProgressBar
                            rect
                            percentage={String(currentModule.progress)}
                          />
                        </div>
                        <button className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor w-100 mt-10">
                          Continuer →
                        </button>
                      </div>
                    </aside>
                  )}

                  {/* Navigation */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-layout-list-thumb" /> Mon espace MPME
                    </h3>
                    <ul>
                      <li className="d-flex align-items-center">
                        <i className="ti ti-user mr-5" />
                        <Link to="/espace-mpme/mon-profil/informations">
                          Mon profil
                        </Link>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="ti ti-clip mr-5" />
                        <Link to="/espace-mpme/mon-profil/documents">
                          Documents
                        </Link>
                      </li>
                      <li className="d-flex align-items-center">
                        <i className="ti ti-book mr-5 text-theme-SkinColor" />
                        <Link
                          to="/espace-mpme/mes-formations/en-cours"
                          className="text-theme-SkinColor fw-bold"
                        >
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

                {/* Infos certificat */}
                <div className="overview-box">
                  <div className="title">
                    <p className="mb-10 fw-bold">Certificat de formation :</p>
                  </div>
                  <ul
                    style={{
                      paddingLeft: 18,
                      fontSize: 13,
                      color: "#555",
                      lineHeight: 1.9,
                    }}
                  >
                    <li>Terminez tous les modules</li>
                    <li>Obtenez votre certificat COPA</li>
                    <li>Débloquez l'accès au plan d'affaires</li>
                    <li>Renforcez votre dossier de subvention</li>
                  </ul>
                </div>
              </div>
              {/* sidebar end */}

              {/* ══════════ CONTENU ══════════ */}
              <div className="col-lg-8 content-area">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    {/* ── Modules — candidate-timeline ── */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Programme de formation COPA</h5>
                      </div>
                      <div className="desc">
                        <div className="candidate-timeline">
                          {MODULES.map((mod) => {
                            const meta = STATUS_META[mod.status];
                            return (
                              <div key={mod.id} className="timeline-panel">
                                <div className="timeline-head">
                                  <h3
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 10,
                                    }}
                                  >
                                    {/* Icône */}
                                    {mod.status === "completed" && (
                                      <span
                                        style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          width: 28,
                                          height: 28,
                                          borderRadius: "50%",
                                          background: "#2E7D52",
                                          flexShrink: 0,
                                          fontSize: 14,
                                        }}
                                      >
                                        {mod.badge}
                                      </span>
                                    )}
                                    {mod.status === "in_progress" && (
                                      <span
                                        style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          width: 28,
                                          height: 28,
                                          borderRadius: "50%",
                                          background:
                                            "var(--theme-SkinColor, #f07a1a)",
                                          flexShrink: 0,
                                        }}
                                      >
                                        <span
                                          style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: "50%",
                                            background: "#fff",
                                          }}
                                        />
                                      </span>
                                    )}
                                    {(mod.status === "available" ||
                                      mod.status === "locked") && (
                                      <span
                                        style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          width: 28,
                                          height: 28,
                                          borderRadius: "50%",
                                          background: "#f4f5f7",
                                          border: "2px solid #dde2ea",
                                          fontSize: 12,
                                          fontWeight: 700,
                                          color: "#aaa",
                                          flexShrink: 0,
                                        }}
                                      >
                                        {mod.id}
                                      </span>
                                    )}
                                    {mod.title}
                                  </h3>
                                  <span
                                    className="timeline-year"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 6,
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    <span
                                      style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 4,
                                        padding: "2px 10px",
                                        borderRadius: 20,
                                        fontSize: 11,
                                        fontWeight: 700,
                                        color: meta.color,
                                        background: meta.bg,
                                      }}
                                    >
                                      <i
                                        className={`ti ${meta.icon}`}
                                        style={{ fontSize: 10 }}
                                      />
                                      {meta.label}
                                    </span>
                                  </span>
                                </div>

                                <div className="timeline-body">
                                  <h5 style={{ fontSize: 13, color: "#666" }}>
                                    {mod.subtitle} &nbsp;·&nbsp; {mod.duration}{" "}
                                    &nbsp;·&nbsp; {mod.lessons} leçons
                                  </h5>
                                  <p>{mod.description}</p>

                                  {/* Barre progression */}
                                  {mod.status === "in_progress" && (
                                    <div className="ttm-progress-bar clearfix mb-15">
                                      <h3 className="progressbar-title">
                                        Progression ({mod.progress} %)
                                      </h3>
                                      <ProgressBar
                                        rect
                                        percentage={String(mod.progress)}
                                      />
                                    </div>
                                  )}

                                  {/* Dates */}
                                  {mod.completedAt && (
                                    <p
                                      style={{
                                        fontSize: 12,
                                        color: "#2E7D52",
                                        fontWeight: 600,
                                        margin: "0 0 10px",
                                      }}
                                    >
                                      <i className="ti ti-check mr-5" /> Terminé
                                      le {mod.completedAt}
                                    </p>
                                  )}
                                  {mod.startedAt && (
                                    <p
                                      style={{
                                        fontSize: 12,
                                        color: "#C97B2E",
                                        fontWeight: 600,
                                        margin: "0 0 10px",
                                      }}
                                    >
                                      <i className="ti ti-time mr-5" /> Commencé
                                      le {mod.startedAt}
                                    </p>
                                  )}

                                  {/* Bouton */}
                                  {mod.status === "completed" && (
                                    <button
                                      className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
                                      type="button"
                                    >
                                      <i className="ti ti-reload mr-5" /> Revoir
                                      le module
                                    </button>
                                  )}
                                  {mod.status === "in_progress" && (
                                    <button
                                      className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                      type="button"
                                    >
                                      Continuer →
                                    </button>
                                  )}
                                  {mod.status === "available" && (
                                    <button
                                      className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                      type="button"
                                    >
                                      Commencer le module
                                    </button>
                                  )}
                                  {mod.status === "locked" && (
                                    <p
                                      style={{
                                        fontSize: 12,
                                        color: "#999",
                                        margin: 0,
                                      }}
                                    >
                                      <i className="ti ti-lock mr-5" /> Terminez
                                      les modules précédents pour débloquer.
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Certificat bloc */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Certificat de formation COPA</h5>
                      </div>
                      <div className="desc">
                        <div className="featured-icon-box icon-align-before-content style2">
                          <div className="featured-icon">
                            <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-style-rounded ttm-icon_element-size-sm">
                              <i className="ti ti-files" />
                            </div>
                          </div>
                          <div className="featured-content">
                            <div className="featured-title">
                              <h3>
                                Certificat de compétences entrepreneuriales
                              </h3>
                            </div>
                            <div className="featured-desc">
                              <p>
                                Terminez les {totalCount} modules pour obtenir
                                votre certificat officiel COPA. Ce document est
                                requis pour soumettre votre plan d'affaires.
                              </p>
                              {completedCount < totalCount ? (
                                <p
                                  style={{
                                    fontSize: 12,
                                    color: "#C97B2E",
                                    fontWeight: 600,
                                    margin: 0,
                                  }}
                                >
                                  <i className="ti ti-time mr-5" />
                                  {totalCount - completedCount} module(s)
                                  restant(s) avant l'obtention.
                                </p>
                              ) : (
                                <button
                                  className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                  type="button"
                                >
                                  <i className="ti ti-download mr-5" />{" "}
                                  Télécharger le certificat
                                </button>
                              )}
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
                        <h3>
                          Après les formations, rédigez votre plan d'affaires !
                        </h3>
                      </div>
                      <div className="featured-desc">
                        <p>
                          Le plan d'affaires est l'étape clé pour l'obtention de
                          la subvention COPA.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/espace-mpme/mon-plan-affaires/redaction"
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                  >
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

export default MesFormations;
