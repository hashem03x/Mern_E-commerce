import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "..//context/Authentication/Authcontext";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
