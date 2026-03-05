import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact1";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScrollToTop from "./components/layout/Gotop";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "./pages/Verifyemail";
import MesFormations from "./pages/espace-mpme/mes-formations/MesFormations";
import MonProfilInformations from "./pages/espace-mpme/mon-profil/Informations";
import MonProfilDocuments from "./pages/espace-mpme/mon-profil/Documents";
import MonPlanAffairesRedaction from "./pages/espace-mpme/mon-plan-affaires/RedactionPlan";
import MonPlanAffairesSoumission from "./pages/espace-mpme/mon-plan-affaires/SoumissionPlan";
import Dashboard from "./pages/espace-mpme/Dashboard";
import AboutCopa from "./pages/AboutCopa";
import Formations_Catalogue from "./pages/FormationsCatalogue";
import Contact_Plainte from "./pages/ContactPlainte";
import Ressources_FAQ from "./pages/FAQ";
import AboutPrete from "./pages/AboutPrete";
import Profile from "./pages/Profile";
import ApplicationSubmitted from "./pages/ApplicationSubmitted";
import ProtectedRoute from "./guards/ProtectedRoute";
import PublicRoute from "./guards/PublicRoute";
import HowToParticipate from "./pages/HowToParticipate";
import EditionCalender from "./pages/EditionCalendar";
import EligibilityCriteria from "./pages/EligibilityCriteria";

const App: React.FC = () => {
  return (
    <div className="page">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
        hideProgressBar={false}
        />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/prete-presentation" element={<AboutPrete />} /> 
        <Route path="/copa-presentation" element={<AboutCopa />} /> 
        <Route path="/how-to-participate" element={<HowToParticipate />} />
        <Route path="/edition-calender" element={<EditionCalender />} />
        <Route path="/eligibility-criteria" element={<EligibilityCriteria />} />
        {/* <Route path="/previous-editions" element={<COPA_Calendrier />} /> */}
        <Route path="/training-catalog" element={<Formations_Catalogue />} />
        <Route path="/sessions-calendar" element={<EditionCalender />} />
        <Route path="/session-registration" element={<EditionCalender />} />
        <Route path="/news" element={<Blog />} />
        <Route path="/practical-guides" element={<Blog />} />
        <Route path="/downloadable-templates" element={<Blog />} />
        <Route path="/video-tutorials" element={<Blog />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/faq" element={<Ressources_FAQ />} />
        <Route path="/submit-complaint" element={<Contact_Plainte />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        {/* Routes protégées */}
        <Route element={<ProtectedRoute />}>
          <Route path="/espace-mpme/dashboard" element={<Dashboard />} />
          <Route path="/espace-mpme/mes-formations/en-cours" element={<MesFormations />} />
          <Route path="/espace-mpme/mon-profil/informations" element={<MonProfilInformations />} />
          <Route path="/espace-mpme/mon-profil/documents" element={<MonProfilDocuments />} />
          <Route path="/espace-mpme/mon-plan-affaires/redaction" element={<MonPlanAffairesRedaction />} />
          <Route path="/espace-mpme/mon-plan-affaires/soumission" element={<MonPlanAffairesSoumission />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/application-submitted" element={<ApplicationSubmitted />} />
        </Route>
        {/* Routes publiques */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
