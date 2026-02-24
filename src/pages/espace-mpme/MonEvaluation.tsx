import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import React, { Component } from "react";
import ProgressBar from "react-animated-progress-bar";
import { Link } from "react-router-dom";

// ─── Types & Data ─────────────────────────────────────────────────────────────

type EvalStatus =
  | "not_submitted" // Plan pas encore soumis
  | "pending_review" // En attente d'analyse préliminaire
  | "under_review" // Évaluation en cours
  | "additional_info" // Informations complémentaires demandées
  | "approved" // Approuvé
  | "rejected"; // Refusé

const evaluation = {
  status: "under_review" as EvalStatus,
  submittedAt: "24 fév. 2026",
  expectedDecisionAt: "10 mars 2026",
  referentName: "M. Jean-Baptiste Ndikumana",
  referentEmail: "jb.ndikumana@copa.bi",
  referentPhone: "+257 22 000 001",
  score: null as number | null, // Disponible après approbation
  grantRequested: 8500000,
  grantApproved: null as number | null,
  comments: [] as {
    date: string;
    author: string;
    text: string;
    type: "info" | "request" | "positive" | "warning";
  }[],
};

const STATUS_META: Record<
  EvalStatus,
  { label: string; color: string; bg: string; icon: string; step: number }
> = {
  not_submitted: {
    label: "Non soumis",
    color: "#6B7A90",
    bg: "#F4F5F7",
    icon: "ti-files",
    step: 0,
  },
  pending_review: {
    label: "En attente d'analyse",
    color: "#C97B2E",
    bg: "#FDF3E7",
    icon: "ti-time",
    step: 1,
  },
  under_review: {
    label: "Évaluation en cours",
    color: "#7C3AED",
    bg: "#F5F0FF",
    icon: "ti-search",
    step: 2,
  },
  additional_info: {
    label: "Infos complémentaires",
    color: "#C97B2E",
    bg: "#FDF3E7",
    icon: "ti-info-alt",
    step: 2,
  },
  approved: {
    label: "Dossier approuvé",
    color: "#2E7D52",
    bg: "#E8F5EE",
    icon: "ti-check",
    step: 3,
  },
  rejected: {
    label: "Dossier refusé",
    color: "#C0392B",
    bg: "#FDECEA",
    icon: "ti-close",
    step: 3,
  },
};

// Étapes du processus d'évaluation
const evalSteps = [
  {
    label: "Soumission reçue",
    desc: "Votre plan d'affaires a été reçu et enregistré.",
    date: "24 fév. 2026",
    done: true,
  },
  {
    label: "Analyse préliminaire",
    desc: "Vérification des critères d'éligibilité et complétude du dossier.",
    date: "26 fév. 2026",
    done: true,
  },
  {
    label: "Évaluation experte",
    desc: "Examen approfondi du plan par le comité d'experts sectoriels.",
    date: "En cours",
    done: false,
  },
  {
    label: "Décision finale",
    desc: "Notification de la décision d'approbation ou de refus.",
    date: "Prévu le 10 mars",
    done: false,
  },
];

const meta = STATUS_META[evaluation.status];

// Critères d'évaluation avec scores (simulés si disponibles)
const evalCriteria = [
  {
    label: "Viabilité du modèle économique",
    weight: 25,
    score: null as number | null,
  },
  { label: "Analyse de marché", weight: 20, score: null as number | null },
  { label: "Capacité managériale", weight: 20, score: null as number | null },
  {
    label: "Impact économique et social",
    weight: 20,
    score: null as number | null,
  },
  {
    label: "Plan financier et rentabilité",
    weight: 15,
    score: null as number | null,
  },
];

class MonEvaluation extends Component {
  render() {
    return (
      <div className="site-main">
        <Header />
        <PageHeader title="Mon évaluation" breadcrumb="Évaluation" />

        <div className="ttm-row sidebar job-sidebar clearfix">
          <div className="container">
            <div className="row">
              {/* ══════════ SIDEBAR ══════════ */}
              <div className="col-lg-4 widget-area sidebar-left job_list-widget-area">
                <div className="job_list-widget">
                  {/* Statut */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-search" /> Statut de l'évaluation
                    </h3>
                    <ul>
                      <li className="d-flex align-items-center">
                        <b className="mr-5">État :</b>
                        <span
                          style={{
                            padding: "2px 10px",
                            borderRadius: 20,
                            fontSize: 11,
                            fontWeight: 700,
                            color: meta.color,
                            background: meta.bg,
                          }}
                        >
                          <i
                            className={`ti ${meta.icon} mr-5`}
                            style={{ fontSize: 10 }}
                          />
                          {meta.label}
                        </span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Soumis le :</b>
                        <span>{evaluation.submittedAt}</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Décision prévue :</b>
                        <span>{evaluation.expectedDecisionAt}</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Subvention demandée :</b>
                        <span>
                          {evaluation.grantRequested.toLocaleString("fr-BI")}{" "}
                          BIF
                        </span>
                      </li>
                      {evaluation.score !== null && (
                        <li className="d-flex">
                          <b className="mr-5">Score :</b>
                          <span style={{ color: "#2E7D52", fontWeight: 700 }}>
                            {evaluation.score}/100
                          </span>
                        </li>
                      )}
                      {evaluation.grantApproved !== null && (
                        <li className="d-flex">
                          <b className="mr-5">Subvention accordée :</b>
                          <span style={{ color: "#2E7D52", fontWeight: 700 }}>
                            {evaluation.grantApproved.toLocaleString("fr-BI")}{" "}
                            BIF
                          </span>
                        </li>
                      )}
                    </ul>
                  </aside>

                  {/* Référent */}
                  <aside className="widget form-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-user" /> Votre référent COPA
                    </h3>
                    <ul>
                      <li className="d-flex">
                        <b className="mr-5">Nom :</b>
                        <span>{evaluation.referentName}</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Email :</b>
                        <a
                          href={`mailto:${evaluation.referentEmail}`}
                          className="text-theme-SkinColor"
                          style={{ fontSize: 13 }}
                        >
                          {evaluation.referentEmail}
                        </a>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Tél :</b>
                        <span>{evaluation.referentPhone}</span>
                      </li>
                    </ul>
                    <div style={{ padding: "0 5px 10px" }}>
                      <a
                        href={`mailto:${evaluation.referentEmail}`}
                        className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor w-100"
                      >
                        <i className="ti ti-email mr-5" /> Contacter mon
                        référent
                      </a>
                    </div>
                  </aside>

                  {/* Navigation */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-layout-list-thumb" /> Mon espace MPME
                    </h3>
                    <ul>
                      <li className="d-flex">
                        <i className="ti ti-user mr-5" />
                        <Link to="/espace-mpme/mon-profil/informations">
                          Mon profil
                        </Link>
                      </li>
                      <li className="d-flex">
                        <i className="ti ti-clip mr-5" />
                        <Link to="/espace-mpme/mon-profil/documents">
                          Documents
                        </Link>
                      </li>
                      <li className="d-flex">
                        <i className="ti ti-book mr-5" />
                        <Link to="/espace-mpme/mes-formations/en-cours">
                          Formations
                        </Link>
                      </li>
                      <li className="d-flex">
                        <i className="ti ti-files mr-5" />
                        <Link to="/espace-mpme/mon-plan-affaires/redaction">
                          Plan d'affaires
                        </Link>
                      </li>
                      <li className="d-flex">
                        <i className="ti ti-search mr-5 text-theme-SkinColor" />
                        <Link
                          to="/espace-mpme/mon-evaluation"
                          className="text-theme-SkinColor fw-bold"
                        >
                          Évaluation
                        </Link>
                      </li>
                      <li className="d-flex">
                        <i className="ti ti-dashboard mr-5" />
                        <Link to="/espace-mpme/dashboard">Tableau de bord</Link>
                      </li>
                    </ul>
                  </aside>
                </div>

                {/* Documents joints */}
                <aside className="widget widget-download">
                  <ul className="download">
                    <li>
                      <a href="#">Voir mon plan soumis</a>
                      <i className="ti ti-eye" />
                    </li>
                    <li>
                      <a href="#">Télécharger PDF</a>
                      <i className="ti ti-download" />
                    </li>
                  </ul>
                </aside>
              </div>

              {/* ══════════ CONTENU ══════════ */}
              <div className="col-lg-8 content-area">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    {/* Alerte statut */}
                    {evaluation.status === "under_review" && (
                      <div
                        style={{
                          display: "flex",
                          gap: 12,
                          padding: "14px 18px",
                          background: "#F5F0FF",
                          border: "1px solid rgba(124,58,237,.2)",
                          borderRadius: 6,
                          marginBottom: 24,
                        }}
                      >
                        <i
                          className="ti ti-search"
                          style={{
                            color: "#7C3AED",
                            fontSize: 18,
                            marginTop: 2,
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <strong
                            style={{
                              fontSize: 13,
                              color: "#1A3A5C",
                              display: "block",
                              marginBottom: 4,
                            }}
                          >
                            Votre dossier est en cours d'évaluation
                          </strong>
                          <p style={{ fontSize: 13, color: "#555", margin: 0 }}>
                            Notre comité d'experts analyse actuellement votre
                            plan d'affaires. Décision prévue avant le{" "}
                            <strong>{evaluation.expectedDecisionAt}</strong>.
                          </p>
                        </div>
                      </div>
                    )}

                    {evaluation.status === "approved" && (
                      <div
                        style={{
                          display: "flex",
                          gap: 12,
                          padding: "14px 18px",
                          background: "#E8F5EE",
                          border: "1px solid #2E7D52",
                          borderRadius: 6,
                          marginBottom: 24,
                        }}
                      >
                        <i
                          className="ti ti-check"
                          style={{
                            color: "#2E7D52",
                            fontSize: 18,
                            marginTop: 2,
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <strong
                            style={{
                              fontSize: 13,
                              color: "#2E7D52",
                              display: "block",
                              marginBottom: 4,
                            }}
                          >
                            Félicitations ! Votre dossier a été approuvé.
                          </strong>
                          <p style={{ fontSize: 13, color: "#555", margin: 0 }}>
                            Consultez la section{" "}
                            <Link
                              to="/espace-mpme/ma-subvention"
                              className="text-theme-SkinColor"
                            >
                              Ma Subvention
                            </Link>{" "}
                            pour les prochaines étapes.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Étapes du processus — candidate-timeline */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Suivi du processus d'évaluation</h5>
                      </div>
                      <div className="desc">
                        <div className="candidate-timeline">
                          {evalSteps.map((step, i) => (
                            <div key={i} className="timeline-panel">
                              <div className="timeline-head">
                                <h3
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                  }}
                                >
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      width: 26,
                                      height: 26,
                                      borderRadius: "50%",
                                      background: step.done
                                        ? "#2E7D52"
                                        : i ===
                                            evalSteps.findIndex((s) => !s.done)
                                          ? "var(--theme-SkinColor, #f07a1a)"
                                          : "#f4f5f7",
                                      border:
                                        !step.done &&
                                        i !==
                                          evalSteps.findIndex((s) => !s.done)
                                          ? "2px solid #dde2ea"
                                          : "none",
                                      flexShrink: 0,
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
                                    ) : i ===
                                      evalSteps.findIndex((s) => !s.done) ? (
                                      <span
                                        style={{
                                          width: 8,
                                          height: 8,
                                          borderRadius: "50%",
                                          background: "#fff",
                                        }}
                                      />
                                    ) : (
                                      <span
                                        style={{
                                          fontSize: 10,
                                          fontWeight: 700,
                                          color: "#aaa",
                                        }}
                                      >
                                        {i + 1}
                                      </span>
                                    )}
                                  </span>
                                  {step.label}
                                </h3>
                                <span className="timeline-year">
                                  {step.date}
                                </span>
                              </div>
                              <div className="timeline-body">
                                <p>{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Critères d'évaluation */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Critères d'évaluation</h5>
                      </div>
                      <div className="desc pb-30">
                        {evalCriteria.map((c, i) => (
                          <div key={i} className="ttm-progress-bar clearfix">
                            <h3 className="progressbar-title">
                              {c.label}
                              <span
                                style={{
                                  fontSize: 11,
                                  color: "#999",
                                  fontWeight: 400,
                                  marginLeft: 6,
                                }}
                              >
                                (pondération : {c.weight} %)
                              </span>
                            </h3>
                            {c.score !== null ? (
                              <ProgressBar rect percentage={String(c.score)} />
                            ) : (
                              <div
                                style={{
                                  height: 8,
                                  background: "#f0f0f0",
                                  borderRadius: 4,
                                  position: "relative",
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                      "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                                    backgroundSize: "200% 100%",
                                    animation: "shimmer 1.5s infinite",
                                  }}
                                />
                              </div>
                            )}
                            {c.score === null && (
                              <p
                                style={{
                                  fontSize: 11,
                                  color: "#aaa",
                                  margin: "4px 0 0",
                                  fontStyle: "italic",
                                }}
                              >
                                Score disponible après l'évaluation
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Commentaires du comité */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Messages du comité COPA</h5>
                      </div>
                      <div className="desc">
                        {evaluation.comments.length === 0 ? (
                          <div
                            style={{
                              textAlign: "center",
                              padding: "30px 20px",
                              color: "#aaa",
                            }}
                          >
                            <i
                              className="ti ti-comment"
                              style={{
                                fontSize: 32,
                                display: "block",
                                marginBottom: 10,
                              }}
                            />
                            <p style={{ fontSize: 13, margin: 0 }}>
                              Aucun commentaire pour le moment. Vous serez
                              notifié par email si le comité vous contacte.
                            </p>
                          </div>
                        ) : (
                          <div className="candidate-timeline">
                            {evaluation.comments.map((c, i) => (
                              <div key={i} className="timeline-panel">
                                <div className="timeline-head">
                                  <h3>{c.author}</h3>
                                  <span className="timeline-year">
                                    {c.date}
                                  </span>
                                </div>
                                <div className="timeline-body">
                                  <p>{c.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Que faire pendant l'attente */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>En attendant la décision</h5>
                      </div>
                      <div className="desc">
                        <div className="row">
                          {[
                            {
                              icon: "ti-book",
                              label: "Continuez vos formations",
                              desc: "Terminez les modules COPA pour renforcer votre dossier.",
                              to: "/espace-mpme/mes-formations/en-cours",
                            },
                            {
                              icon: "ti-clip",
                              label: "Vérifiez vos documents",
                              desc: "Assurez-vous que tous vos documents sont à jour et valides.",
                              to: "/espace-mpme/mon-profil/documents",
                            },
                            {
                              icon: "ti-user",
                              label: "Complétez votre profil",
                              desc: "Un profil 100 % complet montre votre sérieux.",
                              to: "/espace-mpme/mon-profil/informations",
                            },
                            {
                              icon: "ti-mobile",
                              label: "Restez joignable",
                              desc: "Le comité peut vous contacter pour des précisions.",
                              to: null,
                            },
                          ].map((a, i) => (
                            <div key={i} className="col-sm-6 mb-20">
                              <div className="featured-icon-box icon-align-before-content icon-ver_align-top style2">
                                <div className="featured-icon">
                                  <div className="ttm-icon ttm-icon_element-fill ttm-icon_element-color-skincolor ttm-icon_element-style-rounded ttm-icon_element-size-sm">
                                    <i className={`ti ${a.icon}`} />
                                  </div>
                                </div>
                                <div className="featured-content">
                                  <div className="featured-title">
                                    <h3 style={{ fontSize: 14 }}>
                                      {a.to ? (
                                        <Link
                                          to={a.to}
                                          style={{
                                            color: "inherit",
                                            textDecoration: "none",
                                          }}
                                        >
                                          {a.label}
                                        </Link>
                                      ) : (
                                        a.label
                                      )}
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
                        <h3>Une question sur votre évaluation ?</h3>
                      </div>
                      <div className="featured-desc">
                        <p>
                          Contactez directement votre référent COPA ou notre
                          équipe d'assistance.
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href={`mailto:${evaluation.referentEmail}`}
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                  >
                    Contacter mon référent
                  </a>
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

export default MonEvaluation;
