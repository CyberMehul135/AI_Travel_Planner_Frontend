import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedLayout() {
  const location = useLocation();
  const { user, loading } = useAuthContext();

  if (loading) return <div>Checking auth...</div>;

  if (!user) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return <Outlet />;
}
