import { useTranslation } from "react-i18next";
import Header from "../layout/Header";
import PageHeader from "../layout/PageHeader";
import Footer from "../layout/Footer";

const ProfileLoader: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="site-main">
      <Header />
      <PageHeader title={t("applicationForm")} breadcrumb={t("application")} />
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          padding: "60px 24px",
        }}
      >
        <div style={{ position: "relative", width: 72, height: 72 }}>
          <svg
            viewBox="0 0 72 72"
            style={{
              width: 72,
              height: 72,
              animation: "copa-spin 1.1s linear infinite",
            }}
          >
            <circle
              cx="36"
              cy="36"
              r="28"
              fill="none"
              stroke="#e8e8e8"
              strokeWidth="5"
            />
            <circle
              cx="36"
              cy="36"
              r="28"
              fill="none"
              stroke="var(--skin-color,#1F4E79)"
              strokeWidth="5"
              strokeDasharray="60 116"
              strokeLinecap="round"
              transform="rotate(-90 36 36)"
            />
          </svg>
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i
              className="ti ti-user"
              style={{
                fontSize: 22,
                color: "var(--skin-color,#1F4E79)",
                opacity: 0.8,
              }}
            />
          </span>
        </div>
      </div>
      <style>{`@keyframes copa-spin { to { transform: rotate(360deg); } }`}</style>
      <Footer />
    </div>
  );
};

export default ProfileLoader;