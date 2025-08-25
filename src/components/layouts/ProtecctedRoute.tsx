import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useProfileQuery } from "../../redux/features/auth/authApi";

type TProtectedRoute = {
  children: ReactNode;
  role?: string;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const { data: user, isLoading } = useProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.data?.role !== role) {
    return <Navigate to="/access-denied" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
