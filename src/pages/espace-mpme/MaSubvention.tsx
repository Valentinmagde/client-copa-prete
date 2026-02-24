import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import React, { Component } from "react";
import ProgressBar from "react-animated-progress-bar";
import { Link } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────

type GrantStatus =
  | "locked"
  | "pending_approval"
  | "approved"
  | "agreement_pending"
  | "disbursed"
  | "closed";

const grant = {
  status: "locked" as GrantStatus,
  amountRequested: 8_500_000,
  amountApproved: null as number | null,
  amountDisbursed: null as number | null,
  approvedAt: null as string | null,
  disbursedAt: null as string | null,
  accountBank: "",
  accountNumber: "",
  conditions: [] as string[],
  disbursements: [] as {
    date: string;
    amount: number;
    label: string;
    status: "done" | "pending";
  }[],
};

// Ce qui débloque la subvention
const unlockSteps = [
  {
    label: "Plan d'affaires soumis",
    met: false,
    link: "/espace-mpme/mon-plan-affaires/soumission",
  },
  {
    label: "Évaluation passée avec succès",
    met: false,
    link: "/espace-mpme/mon-evaluation",
  },
  { label: "Convention COPA signée", met: false, link: null },
  { label: "Compte bancaire enregistré", met: false, link: null },
];

const STATUS_META: Record<
  GrantStatus,
  { label: string; color: string; bg: string; icon: string; step: number }
> = {
  locked: {
    label: "Non disponible",
    color: "#6B7A90",
    bg: "#F4F5F7",
    icon: "ti-lock",
    step: 0,
  },
  pending_approval: {
    label: "En attente d'approbation",
    color: "#C97B2E",
    bg: "#FDF3E7",
    icon: "ti-time",
    step: 1,
  },
  approved: {
    label: "Subvention approuvée",
    color: "#2E7D52",
    bg: "#E8F5EE",
    icon: "ti-check",
    step: 2,
  },
  agreement_pending: {
    label: "Convention à signer",
    color: "#7C3AED",
    bg: "#F5F0FF",
    icon: "ti-pencil",
    step: 2,
  },
  disbursed: {
    label: "Versée",
    color: "#2E7D52",
    bg: "#E8F5EE",
    icon: "ti-money",
    step: 3,
  },
  closed: {
    label: "Clôturée",
    color: "#1A3A5C",
    bg: "#EBF3FF",
    icon: "ti-archive",
    step: 4,
  },
};

// Utilisation prévue de la subvention (mock)
const grantUsePlan = [
  { label: "Équipements informatiques", amount: 3_000_000, pct: 35 },
  { label: "Recrutement (2 développeurs)", amount: 2_500_000, pct: 29 },
  { label: "Formation équipe", amount: 1_500_000, pct: 18 },
  { label: "Marketing & communication", amount: 1_000_000, pct: 12 },
  { label: "Fonds de roulement", amount: 500_000, pct: 6 },
];

const meta = STATUS_META[grant.status];
const fmtBIF = (n: number) => n.toLocaleString("fr-BI") + " BIF";

class MaSubvention extends Component {
  state = {
    bankName: "",
    bankAccount: "",
    bankConfirm: "",
    saving: false,
    saved: false,
  };

  handleSaveBank = async (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ saving: true });
    await new Promise((r) => setTimeout(r, 800));
    this.setState({ saving: false, saved: true });
    setTimeout(() => this.setState({ saved: false }), 3000);
  };

  render() {
    const s = this.state;

    return (
      <div className="site-main">
        <Header />
        <PageHeader title="Ma subvention" breadcrumb="Subvention" />

        <div className="ttm-row sidebar job-sidebar clearfix">
          <div className="container">
            <div className="row">
              {/* ══════════ SIDEBAR ══════════ */}
              <div className="col-lg-4 widget-area sidebar-left job_list-widget-area">
                <div className="job_list-widget">
                  {/* Résumé subvention */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-money" /> Ma subvention COPA
                    </h3>
                    <ul>
                      <li className="d-flex align-items-center">
                        <b className="mr-5">Statut :</b>
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
                            className={`ti ${meta.icon}`}
                            style={{ marginRight: 4, fontSize: 10 }}
                          />
                          {meta.label}
                        </span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Demandée :</b>
                        <span>{fmtBIF(grant.amountRequested)}</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Approuvée :</b>
                        <span
                          style={{
                            color: grant.amountApproved ? "#2E7D52" : "#aaa",
                            fontWeight: grant.amountApproved ? 700 : 400,
                          }}
                        >
                          {grant.amountApproved
                            ? fmtBIF(grant.amountApproved)
                            : "—"}
                        </span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Versée :</b>
                        <span
                          style={{
                            color: grant.amountDisbursed ? "#2E7D52" : "#aaa",
                            fontWeight: grant.amountDisbursed ? 700 : 400,
                          }}
                        >
                          {grant.amountDisbursed
                            ? fmtBIF(grant.amountDisbursed)
                            : "—"}
                        </span>
                      </li>
                      {grant.approvedAt && (
                        <li className="d-flex">
                          <b className="mr-5">Approuvée le :</b>
                          <span>{grant.approvedAt}</span>
                        </li>
                      )}
                      {grant.disbursedAt && (
                        <li className="d-flex">
                          <b className="mr-5">Versée le :</b>
                          <span>{grant.disbursedAt}</span>
                        </li>
                      )}
                    </ul>
                  </aside>

                  {/* Conditions de déblocage */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-check-box" /> Conditions de déblocage
                    </h3>
                    <ul>
                      {unlockSteps.map((step, i) => (
                        <li
                          key={i}
                          className="d-flex align-items-center"
                          style={{ gap: 8 }}
                        >
                          <span
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              flexShrink: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: step.met
                                ? "#2E7D52"
                                : "rgba(119,119,119,.12)",
                            }}
                          >
                            {step.met ? (
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
                                  fontSize: 8,
                                  fontWeight: 700,
                                  color: "#aaa",
                                }}
                              >
                                ✗
                              </span>
                            )}
                          </span>
                          <span
                            style={{
                              fontSize: 12,
                              color: step.met ? "#2E7D52" : "#777",
                              fontWeight: step.met ? 600 : 400,
                            }}
                          >
                            {step.link && !step.met ? (
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
                        <i className="ti ti-search mr-5" />
                        <Link to="/espace-mpme/mon-evaluation">Évaluation</Link>
                      </li>
                      <li className="d-flex">
                        <i className="ti ti-money mr-5 text-theme-SkinColor" />
                        <Link
                          to="/espace-mpme/ma-subvention"
                          className="text-theme-SkinColor fw-bold"
                        >
                          Subvention
                        </Link>
                      </li>
                      <li className="d-flex">
                        <i className="ti ti-dashboard mr-5" />
                        <Link to="/espace-mpme/dashboard">Tableau de bord</Link>
                      </li>
                    </ul>
                  </aside>
                </div>

                <div className="overview-box">
                  <div className="title">
                    <p className="mb-10 fw-bold">À savoir :</p>
                  </div>
                  <ul
                    style={{
                      paddingLeft: 18,
                      fontSize: 12.5,
                      color: "#555",
                      lineHeight: 2,
                    }}
                  >
                    <li>La subvention est non remboursable</li>
                    <li>Elle est conditionnée à l'approbation du plan</li>
                    <li>Un rapport d'utilisation sera demandé</li>
                    <li>Toute fraude entraîne le remboursement intégral</li>
                  </ul>
                </div>
              </div>

              {/* ══════════ CONTENU ══════════ */}
              <div className="col-lg-8 content-area">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    {/* Bandeau verrouillé */}
                    {grant.status === "locked" && (
                      <div className="overview-box">
                        <div className="title">
                          <h5>Subvention non encore disponible</h5>
                        </div>
                        <div className="desc">
                          <div
                            style={{
                              textAlign: "center",
                              padding: "30px 20px",
                            }}
                          >
                            <i
                              className="ti ti-lock"
                              style={{
                                fontSize: 48,
                                color: "#dde2ea",
                                display: "block",
                                marginBottom: 14,
                              }}
                            />
                            <h6 style={{ fontSize: 16, marginBottom: 10 }}>
                              Votre subvention n'est pas encore débloquée
                            </h6>
                            <p
                              style={{
                                fontSize: 13,
                                color: "#777",
                                marginBottom: 20,
                                maxWidth: 400,
                                margin: "0 auto 20px",
                              }}
                            >
                              Pour accéder à la subvention COPA, vous devez
                              d'abord soumettre votre plan d'affaires et obtenir
                              une évaluation favorable.
                            </p>
                            <Link
                              to="/espace-mpme/mon-plan-affaires/soumission"
                              className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                            >
                              Soumettre mon plan d'affaires
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Processus de versement — candidate-timeline */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Processus d'obtention de la subvention</h5>
                      </div>
                      <div className="desc">
                        <div className="candidate-timeline">
                          {[
                            {
                              label: "Soumission du plan",
                              year: "Étape 1",
                              desc: "Soumettez votre plan d'affaires complet via la plateforme COPA.",
                            },
                            {
                              label: "Évaluation du dossier",
                              year: "Étape 2",
                              desc: "Le comité d'experts analyse votre dossier sous 10–15 jours.",
                            },
                            {
                              label: "Approbation & convention",
                              year: "Étape 3",
                              desc: "En cas d'approbation, signez la convention COPA pour formaliser l'engagement.",
                            },
                            {
                              label: "Enregistrement bancaire",
                              year: "Étape 4",
                              desc: "Renseignez votre compte bancaire pour le versement de la subvention.",
                            },
                            {
                              label: "Versement",
                              year: "Étape 5",
                              desc: "La subvention est virée sur votre compte bancaire dans un délai de 5 à 7 jours ouvrables.",
                            },
                            {
                              label: "Rapport d'utilisation",
                              year: "Étape 6",
                              desc: "Dans les 6 mois, soumettez un rapport détaillant l'utilisation des fonds.",
                            },
                          ].map((step, i) => {
                            const done = i < meta.step;
                            const active = i === meta.step;
                            return (
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
                                        background: done
                                          ? "#2E7D52"
                                          : active
                                            ? "var(--theme-SkinColor,#f07a1a)"
                                            : "#f4f5f7",
                                        border:
                                          !done && !active
                                            ? "2px solid #dde2ea"
                                            : "none",
                                        flexShrink: 0,
                                      }}
                                    >
                                      {done ? (
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
                                      ) : active ? (
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
                                            fontSize: 11,
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
                                    {step.year}
                                  </span>
                                </div>
                                <div className="timeline-body">
                                  <p>{step.desc}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Utilisation prévue */}
                    <div className="overview-box">
                      <div className="title">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">
                            Plan d'utilisation de la subvention
                          </h5>
                          <span style={{ fontSize: 12, color: "#888" }}>
                            Total demandé : {fmtBIF(grant.amountRequested)}
                          </span>
                        </div>
                      </div>
                      <div className="desc pb-30">
                        {grantUsePlan.map((item, i) => (
                          <div key={i} className="ttm-progress-bar clearfix">
                            <h3 className="progressbar-title">
                              {item.label}
                              <span
                                style={{
                                  fontSize: 11,
                                  color: "#777",
                                  fontWeight: 400,
                                  marginLeft: 8,
                                }}
                              >
                                {fmtBIF(item.amount)} ({item.pct} %)
                              </span>
                            </h3>
                            <ProgressBar rect percentage={String(item.pct)} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Formulaire compte bancaire */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Coordonnées bancaires pour le versement</h5>
                      </div>
                      <div className="desc">
                        {grant.status === "locked" ? (
                          <div
                            style={{
                              display: "flex",
                              gap: 10,
                              padding: "12px 16px",
                              background: "#f8f9fa",
                              border: "1px solid #e8e8e8",
                              borderRadius: 6,
                            }}
                          >
                            <i
                              className="ti ti-lock"
                              style={{ color: "#aaa", marginTop: 2 }}
                            />
                            <p
                              style={{ fontSize: 13, color: "#aaa", margin: 0 }}
                            >
                              Disponible après l'approbation de votre dossier.
                            </p>
                          </div>
                        ) : (
                          <>
                            {s.saved && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 10,
                                  padding: "10px 16px",
                                  background: "#E8F5EE",
                                  border: "1px solid #2E7D52",
                                  borderRadius: 6,
                                  marginBottom: 16,
                                }}
                              >
                                <i
                                  className="ti ti-check"
                                  style={{ color: "#2E7D52" }}
                                />
                                <span
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: "#2E7D52",
                                  }}
                                >
                                  Coordonnées bancaires enregistrées.
                                </span>
                              </div>
                            )}
                            <form
                              className="wrap-form contact_form"
                              onSubmit={this.handleSaveBank}
                              noValidate
                            >
                              <div className="row">
                                <div className="col-lg-12">
                                  <label>
                                    <i className="ti ti-briefcase" />
                                    <select
                                      value={s.bankName}
                                      onChange={(e) =>
                                        this.setState({
                                          bankName: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="">
                                        Sélectionner votre banque
                                      </option>
                                      <option value="BANCOBU">BANCOBU</option>
                                      <option value="BCB">
                                        Banque Commerciale du Burundi (BCB)
                                      </option>
                                      <option value="CRDB">
                                        CRDB Bank Burundi
                                      </option>
                                      <option value="ECOBANK">
                                        Ecobank Burundi
                                      </option>
                                      <option value="KCB">KCB Burundi</option>
                                      <option value="LUMICASH">
                                        Lumicash (mobile)
                                      </option>
                                    </select>
                                  </label>
                                </div>
                                <div className="col-lg-6">
                                  <label>
                                    <i className="ti ti-id-badge-2" />
                                    <input
                                      type="text"
                                      placeholder="Numéro de compte"
                                      value={s.bankAccount}
                                      onChange={(e) =>
                                        this.setState({
                                          bankAccount: e.target.value,
                                        })
                                      }
                                    />
                                  </label>
                                </div>
                                <div className="col-lg-6">
                                  <label>
                                    <i className="ti ti-reload" />
                                    <input
                                      type="text"
                                      placeholder="Confirmer le numéro de compte"
                                      value={s.bankConfirm}
                                      onChange={(e) =>
                                        this.setState({
                                          bankConfirm: e.target.value,
                                        })
                                      }
                                    />
                                  </label>
                                </div>
                                <div className="col-lg-12">
                                  <label className="mb-0">
                                    <button
                                      type="submit"
                                      className="submit ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-fill ttm-btn-color-skincolor"
                                      disabled={s.saving}
                                    >
                                      {s.saving
                                        ? "Enregistrement…"
                                        : "Enregistrer mes coordonnées bancaires"}
                                    </button>
                                  </label>
                                </div>
                              </div>
                            </form>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Historique versements */}
                    {grant.disbursements.length > 0 && (
                      <div className="overview-box">
                        <div className="title">
                          <h5>Historique des versements</h5>
                        </div>
                        <div className="desc">
                          <div className="candidate-timeline">
                            {grant.disbursements.map((d, i) => (
                              <div key={i} className="timeline-panel">
                                <div className="timeline-head">
                                  <h3>{d.label}</h3>
                                  <span className="timeline-year">
                                    {d.date}
                                  </span>
                                </div>
                                <div className="timeline-body">
                                  <h5
                                    style={{
                                      color:
                                        d.status === "done"
                                          ? "#2E7D52"
                                          : "#C97B2E",
                                    }}
                                  >
                                    {fmtBIF(d.amount)}
                                  </h5>
                                  <p style={{ margin: 0 }}>
                                    Statut :{" "}
                                    <strong
                                      style={{
                                        color:
                                          d.status === "done"
                                            ? "#2E7D52"
                                            : "#C97B2E",
                                      }}
                                    >
                                      {d.status === "done"
                                        ? "Versé"
                                        : "En cours"}
                                    </strong>
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
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
                        <h3>Commencez maintenant votre parcours COPA</h3>
                      </div>
                      <div className="featured-desc">
                        <p>
                          Soumettez votre plan d'affaires pour débloquer votre
                          subvention.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/espace-mpme/mon-plan-affaires/soumission"
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
                  >
                    Soumettre mon plan
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

export default MaSubvention;
