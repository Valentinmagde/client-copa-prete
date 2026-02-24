import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/layout/Header";
import PageHeader from "../../components/layout/PageHeader";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../hooks/useAuth";
import ApiService from "../../services/api.service";
import { formatDate } from "../../utils/formatters";
import TimelineParcours from "../../components/espace-mpme/TimelineParcours";
import CarteStatut from "../../components/espace-mpme/CarteStatut";

interface DashboardData {
  user: { firstName: string; lastName: string };
  profil: { completionPercentage: number; statut: string };
  formations: { completed: number; total: number };
  planAffaires: { statut: string; completionPercentage?: number };
  subvention?: { statut: string; montant?: number };
  notifications: Array<{ id: number; titre: string; date: string; lu: boolean; lien?: string }>;
}

const TableauDeBord: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await ApiService.get('/mpme/tableau-de-bord');
        setData(response.data);
      } catch (error) {
        console.error("Erreur chargement tableau de bord:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const getStatutPlan = (statut: string) => {
    const statuts: Record<string, { label: string; color: string }> = {
      BROUILLON: { label: t("plan.brouillon"), color: "#6B7A90" },
      SOUMIS: { label: t("plan.soumis"), color: "#C97B2E" },
      EN_EVALUATION: { label: t("plan.enEvaluation"), color: "#1F4E79" },
      ACCEPTE: { label: t("plan.accepte"), color: "#28a745" },
      REFUSE: { label: t("plan.refuse"), color: "#dc3545" },
    };
    return statuts[statut] || { label: statut, color: "#6B7A90" };
  };

  if (loading) {
    return (
      <div className="site-main">
        <Header />
        <PageHeader title={t("dashboard")} breadcrumb={t("dashboard")} />
        <div className="ttm-row sidebar">
          <div className="container">
            <div className="text-center">
              <div className="ttm-spinner" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="site-main">
      <Header />
      <PageHeader title={t("dashboard")} breadcrumb={t("dashboard")} />

      {/* Messages de bienvenue */}
      <section className="ttm-row dashboard-welcome-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="dashboard-welcome-box">
                <h2 className="welcome-title">
                  {t("welcome")}, {data?.user.firstName} !
                </h2>
                <p className="welcome-subtitle">{t("dashboard.welcomeMessage")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cartes de statut */}
      <section className="ttm-row dashboard-stats-section">
        <div className="container">
          <div className="row ttm-vertical_sep">
            <div className="col-lg-3 col-md-6">
              <CarteStatut
                title={t("profil")}
                value={`${data?.profil.completionPercentage}%`}
                status={data?.profil.statut}
                link="/espace-mpme/mon-profil/informations"
                linkText={t("completeProfile")}
                icon="fa-user"
                color="primary"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <CarteStatut
                title={t("formations")}
                value={`${data?.formations.completed}/${data?.formations.total}`}
                status={t("completed")}
                link="/espace-mpme/mes-formations/en-cours"
                linkText={t("viewFormations")}
                icon="fa-graduation-cap"
                color="success"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <CarteStatut
                title={t("planAffaires")}
                value={getStatutPlan(data?.planAffaires.statut || "").label}
                status={data?.planAffaires.completionPercentage ? `${data?.planAffaires.completionPercentage}%` : ""}
                link="/espace-mpme/mon-plan-affaires/redaction"
                linkText={t("editPlan")}
                icon="fa-file-text"
                color="warning"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <CarteStatut
                title={t("subvention")}
                value={data?.subvention?.statut || t("notAvailable")}
                status={data?.subvention?.montant ? `${data.subvention.montant} BIF` : ""}
                link="/espace-mpme/subvention"
                linkText={t("viewDetails")}
                icon="fa-money"
                color="info"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline du parcours */}
      <section className="ttm-row timeline-section bg-theme-GreyColor">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <div className="title-header">
                  <h3>{t("yourJourney")}</h3>
                  <h2 className="title">{t("parcoursTimeline")}</h2>
                </div>
              </div>
            </div>
          </div>
          <TimelineParcours />
        </div>
      </section>

      <div className="container">
        <div className="row">
          {/* Notifications récentes */}
          <div className="col-lg-6">
            <div className="widget-area">
              <div className="widget widget-recent-post">
                <h3 className="widget-title">{t("recentNotifications")}</h3>
                <ul>
                  {data?.notifications.slice(0, 5).map((notif) => (
                    <li key={notif.id}>
                      <div className="post-detail">
                        <Link to={notif.lien || "#"}>{notif.titre}</Link>
                        <span className="post-date">{formatDate(notif.date)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="col-lg-6">
            <div className="widget-area">
              <div className="widget widget-download">
                <h3 className="widget-title">{t("quickActions")}</h3>
                <ul>
                  <li>
                    <Link to="/espace-mpme/mon-profil/informations" className="ttm-btn ttm-btn-size-sm ttm-btn-style-fill ttm-btn-color-skincolor">
                      <i className="fa fa-user-plus" /> {t("completeProfile")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/espace-mpme/mes-formations/en-cours" className="ttm-btn ttm-btn-size-sm ttm-btn-style-fill ttm-btn-color-skincolor">
                      <i className="fa fa-graduation-cap" /> {t("accessFormations")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/espace-mpme/mon-plan-affaires/redaction" className="ttm-btn ttm-btn-size-sm ttm-btn-style-fill ttm-btn-color-skincolor">
                      <i className="fa fa-pencil-square" /> {t("workOnPlan")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="ttm-btn ttm-btn-size-sm ttm-btn-style-fill ttm-btn-color-skincolor">
                      <i className="fa fa-headset" /> {t("contactSupport")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <style jsx>{`
        .dashboard-welcome-section { padding: 60px 0 30px; }
        .dashboard-welcome-box { 
          background: linear-gradient(135deg, var(--c-navy) 0%, var(--c-navy-dk) 100%);
          padding: 40px; border-radius: 10px; color: white;
        }
        .welcome-title { color: white; font-size: 32px; margin-bottom: 10px; }
        .welcome-subtitle { color: rgba(255,255,255,0.9); font-size: 16px; }
        .dashboard-stats-section { padding: 30px 0; }
      `}</style>
    </div>
  );
};

export default TableauDeBord;