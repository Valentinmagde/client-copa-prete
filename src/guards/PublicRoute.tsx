import { isAuthenticatedCs } from "@/utils/storage";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = isAuthenticatedCs();

  return isAuthenticated ? <Navigate to="/profile" /> : <Outlet />;
};

export default PublicRoute;