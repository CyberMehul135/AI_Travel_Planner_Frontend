import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { ProtectedLayoutLoading } from "./ProtectedLayoutLoading";

export default function ProtectedLayout() {
  const location = useLocation();
  const { user, loading } = useAuthContext();

  if (loading) return <ProtectedLayoutLoading />;

  if (!user) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return <Outlet />;
}
