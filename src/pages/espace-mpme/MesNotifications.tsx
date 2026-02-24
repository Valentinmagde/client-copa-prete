import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageHeader from "@/components/layout/PageHeader";
import React, { Component } from "react";
import { Link } from "react-router-dom";

// ─── Types & Data ─────────────────────────────────────────────────────────────

type NotifType = "info" | "success" | "warning" | "action";

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  body: string;
  date: string;
  unread: boolean;
  link?: string;
  linkLabel?: string;
  category:
    | "profil"
    | "formation"
    | "plan"
    | "evaluation"
    | "subvention"
    | "systeme";
}

const TYPE_META: Record<
  NotifType,
  { color: string; bg: string; icon: string }
> = {
  info: { color: "#1A3A5C", bg: "#EBF3FF", icon: "ti-info-alt" },
  success: { color: "#2E7D52", bg: "#E8F5EE", icon: "ti-check" },
  warning: { color: "#C97B2E", bg: "#FDF3E7", icon: "ti-alert" },
  action: { color: "#7C3AED", bg: "#F5F0FF", icon: "ti-control-play" },
};

const CAT_LABEL: Record<string, string> = {
  profil: "Profil",
  formation: "Formations",
  plan: "Plan d'affaires",
  evaluation: "Évaluation",
  subvention: "Subvention",
  systeme: "Système",
};

const ALL_NOTIFS: Notification[] = [
  {
    id: 1,
    type: "warning",
    category: "profil",
    unread: true,
    title: "Profil incomplet",
    body: "Votre profil est complété à 65 %. Ajoutez vos documents justificatifs pour atteindre 80 % et débloquer les étapes suivantes.",
    date: "Aujourd'hui, 09:14",
    link: "/espace-mpme/mon-profil/documents",
    linkLabel: "Ajouter mes documents",
  },
  {
    id: 2,
    type: "action",
    category: "formation",
    unread: true,
    title: "Nouveau module disponible",
    body: "Le Module 4 « Marketing et développement commercial » est maintenant disponible. Continuez votre parcours de formation COPA.",
    date: "Hier, 14:32",
    link: "/espace-mpme/mes-formations/en-cours",
    linkLabel: "Accéder au module",
  },
  {
    id: 3,
    type: "info",
    category: "systeme",
    unread: false,
    title: "Session présentielle COPA",
    body: "Une session présentielle est programmée le 15 mars 2026 à 09h00 au siège de la BRB, Bujumbura. Votre présence est fortement recommandée.",
    date: "22 fév. 2026",
  },
  {
    id: 4,
    type: "success",
    category: "profil",
    unread: false,
    title: "Inscription validée",
    body: "Votre inscription sur la plateforme COPA a été validée avec succès. Bienvenue dans le programme d'appui aux MPME !",
    date: "20 fév. 2026",
  },
  {
    id: 5,
    type: "success",
    category: "systeme",
    unread: false,
    title: "Bienvenue sur COPA",
    body: "Votre compte a été créé. Commencez par compléter votre profil et démarrer les modules de formation obligatoires.",
    date: "20 fév. 2026",
    link: "/espace-mpme/mon-profil/informations",
    linkLabel: "Compléter mon profil",
  },
  {
    id: 6,
    type: "warning",
    category: "profil",
    unread: false,
    title: "Document rejeté",
    body: "Votre Certificat NIF a été rejeté car le document est illisible. Veuillez soumettre une version de meilleure qualité (minimum 300 dpi).",
    date: "19 fév. 2026",
    link: "/espace-mpme/mon-profil/documents",
    linkLabel: "Corriger le document",
  },
  {
    id: 7,
    type: "info",
    category: "formation",
    unread: false,
    title: "Rappel de formation",
    body: "Vous n'avez pas progressé dans vos formations depuis 3 jours. Reprenez le Module 3 pour rester dans les délais du programme.",
    date: "18 fév. 2026",
    link: "/espace-mpme/mes-formations/en-cours",
    linkLabel: "Reprendre les formations",
  },
];

const unreadCount = ALL_NOTIFS.filter((n) => n.unread).length;

class MesNotifications extends Component {
  state = {
    filter: "all" as
      | "all"
      | "unread"
      | "profil"
      | "formation"
      | "plan"
      | "evaluation"
      | "subvention"
      | "systeme",
    notifications: ALL_NOTIFS.map((n) => ({ ...n })),
  };

  markAllRead = () => {
    this.setState((prev: any) => ({
      notifications: prev.notifications.map((n: any) => ({
        ...n,
        unread: false,
      })),
    }));
  };

  markRead = (id: number) => {
    this.setState((prev: any) => ({
      notifications: prev.notifications.map((n: any) =>
        n.id === id ? { ...n, unread: false } : n,
      ),
    }));
  };

  render() {
    const { filter, notifications } = this.state as any;

    const filtered = notifications.filter((n: Notification) => {
      if (filter === "all") return true;
      if (filter === "unread") return n.unread;
      return n.category === filter;
    });

    const currentUnread = notifications.filter((n: any) => n.unread).length;

    return (
      <div className="site-main">
        <Header />
        <PageHeader title="Mes notifications" breadcrumb="Notifications" />

        <div className="ttm-row sidebar job-sidebar clearfix">
          <div className="container">
            <div className="row">
              {/* ══════════ SIDEBAR ══════════ */}
              <div className="col-lg-4 widget-area sidebar-left job_list-widget-area">
                <div className="job_list-widget">
                  {/* Résumé */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-bell" /> Mes notifications
                      {currentUnread > 0 && (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: "#dc3545",
                            color: "#fff",
                            fontSize: 10,
                            fontWeight: 700,
                            marginLeft: 8,
                          }}
                        >
                          {currentUnread}
                        </span>
                      )}
                    </h3>
                    <ul>
                      <li className="d-flex">
                        <b className="mr-5">Total :</b>
                        <span>{notifications.length}</span>
                      </li>
                      <li className="d-flex">
                        <b className="mr-5">Non lues :</b>
                        <span
                          style={{
                            color: currentUnread > 0 ? "#dc3545" : "#2E7D52",
                            fontWeight: 700,
                          }}
                        >
                          {currentUnread}
                        </span>
                      </li>
                    </ul>
                    {currentUnread > 0 && (
                      <div style={{ padding: "0 5px 10px" }}>
                        <button
                          className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor w-100"
                          onClick={this.markAllRead}
                        >
                          <i className="ti ti-check mr-5" /> Tout marquer comme
                          lu
                        </button>
                      </div>
                    )}
                  </aside>

                  {/* Filtres */}
                  <aside className="widget candidate-widget">
                    <h3 className="widget-title">
                      <i className="ti ti-filter" /> Filtrer par catégorie
                    </h3>
                    <ul>
                      {(
                        [
                          ["all", "Toutes", notifications.length],
                          ["unread", "Non lues", currentUnread],
                          [
                            "profil",
                            "Profil",
                            notifications.filter(
                              (n: any) => n.category === "profil",
                            ).length,
                          ],
                          [
                            "formation",
                            "Formations",
                            notifications.filter(
                              (n: any) => n.category === "formation",
                            ).length,
                          ],
                          [
                            "plan",
                            "Plan d'affaires",
                            notifications.filter(
                              (n: any) => n.category === "plan",
                            ).length,
                          ],
                          [
                            "evaluation",
                            "Évaluation",
                            notifications.filter(
                              (n: any) => n.category === "evaluation",
                            ).length,
                          ],
                          [
                            "subvention",
                            "Subvention",
                            notifications.filter(
                              (n: any) => n.category === "subvention",
                            ).length,
                          ],
                          [
                            "systeme",
                            "Système",
                            notifications.filter(
                              (n: any) => n.category === "systeme",
                            ).length,
                          ],
                        ] as [string, string, number][]
                      ).map(([val, label, count]) => (
                        <li
                          key={val}
                          onClick={() => this.setState({ filter: val })}
                          style={{ cursor: "pointer" }}
                          className="d-flex align-items-center"
                        >
                          <span
                            style={{
                              flex: 1,
                              fontWeight: filter === val ? 700 : 400,
                              color:
                                filter === val
                                  ? "var(--theme-SkinColor)"
                                  : "inherit",
                              fontSize: 13,
                            }}
                          >
                            {filter === val && (
                              <i
                                className="ti ti-angle-right mr-5 text-theme-SkinColor"
                                style={{ fontSize: 10 }}
                              />
                            )}
                            {label}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              padding: "1px 8px",
                              borderRadius: 20,
                              background:
                                filter === val
                                  ? "var(--theme-SkinColor)"
                                  : "#f0f0f0",
                              color: filter === val ? "#fff" : "#777",
                              fontWeight: 600,
                            }}
                          >
                            {count}
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
                        <i className="ti ti-bell mr-5 text-theme-SkinColor" />
                        <Link
                          to="/espace-mpme/mes-notifications"
                          className="text-theme-SkinColor fw-bold"
                        >
                          Notifications
                        </Link>
                      </li>
                      <li className="d-flex">
                        <i className="ti ti-dashboard mr-5" />
                        <Link to="/espace-mpme/dashboard">Tableau de bord</Link>
                      </li>
                    </ul>
                  </aside>
                </div>
              </div>

              {/* ══════════ CONTENU ══════════ */}
              <div className="col-lg-8 content-area">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    {/* Liste notifications — candidate-timeline */}
                    <div className="overview-box">
                      <div className="title">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="mb-0">
                            {filter === "all"
                              ? "Toutes les notifications"
                              : filter === "unread"
                                ? "Notifications non lues"
                                : `Notifications — ${CAT_LABEL[filter] ?? filter}`}
                          </h5>
                          <span style={{ fontSize: 13, color: "#888" }}>
                            {filtered.length} notification
                            {filtered.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                      <div className="desc">
                        {filtered.length === 0 ? (
                          <div
                            style={{
                              textAlign: "center",
                              padding: "40px 20px",
                            }}
                          >
                            <i
                              className="ti ti-bell"
                              style={{
                                fontSize: 40,
                                color: "#dde2ea",
                                display: "block",
                                marginBottom: 12,
                              }}
                            />
                            <p style={{ color: "#aaa", fontSize: 14 }}>
                              {filter === "unread"
                                ? "Aucune notification non lue. 🎉"
                                : "Aucune notification dans cette catégorie."}
                            </p>
                          </div>
                        ) : (
                          <div className="candidate-timeline">
                            {filtered.map((notif: Notification) => {
                              const meta = TYPE_META[notif.type];
                              return (
                                <div
                                  key={notif.id}
                                  className="timeline-panel"
                                  style={{
                                    opacity: notif.unread ? 1 : 0.8,
                                    cursor: notif.unread
                                      ? "pointer"
                                      : "default",
                                  }}
                                  onClick={() =>
                                    notif.unread && this.markRead(notif.id)
                                  }
                                >
                                  <div className="timeline-head">
                                    <h3
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                      }}
                                    >
                                      {/* Icône type */}
                                      <span
                                        style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          width: 28,
                                          height: 28,
                                          borderRadius: "50%",
                                          background: meta.bg,
                                          flexShrink: 0,
                                        }}
                                      >
                                        <i
                                          className={`ti ${meta.icon}`}
                                          style={{
                                            fontSize: 13,
                                            color: meta.color,
                                          }}
                                        />
                                      </span>
                                      {notif.title}
                                      {/* Badge non lu */}
                                      {notif.unread && (
                                        <span
                                          style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            background: "#dc3545",
                                            flexShrink: 0,
                                          }}
                                        />
                                      )}
                                    </h3>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        flexShrink: 0,
                                      }}
                                    >
                                      <span
                                        style={{
                                          padding: "1px 8px",
                                          borderRadius: 20,
                                          fontSize: 10,
                                          fontWeight: 700,
                                          color: "#888",
                                          background: "#f4f5f7",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {CAT_LABEL[notif.category]}
                                      </span>
                                      <span
                                        className="timeline-year"
                                        style={{
                                          whiteSpace: "nowrap",
                                          fontSize: 12,
                                        }}
                                      >
                                        {notif.date}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="timeline-body">
                                    <p
                                      style={{
                                        fontWeight: notif.unread ? 500 : 400,
                                      }}
                                    >
                                      {notif.body}
                                    </p>
                                    {notif.link && (
                                      <Link
                                        to={notif.link}
                                        className="ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-skincolor"
                                      >
                                        {notif.linkLabel || "Voir →"}
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Paramètres notifications */}
                    <div className="overview-box">
                      <div className="title">
                        <h5>Préférences de notification</h5>
                      </div>
                      <div className="desc">
                        <div className="row">
                          {[
                            {
                              icon: "ti-email",
                              label: "Notifications par email",
                              active: true,
                              desc: "Recevez les alertes importantes par email.",
                            },
                            {
                              icon: "ti-mobile",
                              label: "Notifications SMS",
                              active: false,
                              desc: "Activez les alertes SMS pour les actions urgentes.",
                            },
                          ].map((pref, i) => (
                            <div key={i} className="col-sm-6 mb-20">
                              <div className="featured-icon-box icon-align-before-content icon-ver_align-top style2">
                                <div className="featured-icon">
                                  <div
                                    className={`ttm-icon ttm-icon_element-fill ${pref.active ? "ttm-icon_element-color-skincolor" : "ttm-icon_element-color-grey"} ttm-icon_element-style-rounded ttm-icon_element-size-sm`}
                                  >
                                    <i className={`ti ${pref.icon}`} />
                                  </div>
                                </div>
                                <div className="featured-content">
                                  <div className="featured-title">
                                    <h3 style={{ fontSize: 14 }}>
                                      {pref.label}
                                    </h3>
                                  </div>
                                  <div className="featured-desc">
                                    <p>{pref.desc}</p>
                                    <button
                                      className={`ttm-btn ttm-btn-size-sm ttm-btn-shape-rounded ${pref.active ? "ttm-btn-style-border ttm-btn-color-skincolor" : "ttm-btn-style-fill ttm-btn-color-skincolor"}`}
                                    >
                                      {pref.active ? "Désactiver" : "Activer"}
                                    </button>
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
                        <h3>Restez à jour dans votre parcours COPA</h3>
                      </div>
                      <div className="featured-desc">
                        <p>
                          Consultez régulièrement vos notifications pour ne
                          manquer aucune action importante.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/espace-mpme/dashboard"
                    className="ttm-btn ttm-btn-size-md ttm-btn-shape-rounded ttm-btn-style-border ttm-btn-color-white"
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
  }
}

export default MesNotifications;
