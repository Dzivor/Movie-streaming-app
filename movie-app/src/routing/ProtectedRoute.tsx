import { Navigate } from "react-router";
import { useAuth } from "../hooks/Queries/useAuth";

export function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const { data, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!data?.user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && data.user.role !== requiredRole) {
    return <Navigate to="/Movies" replace />;
  }

  return <>{children}</>;
}
