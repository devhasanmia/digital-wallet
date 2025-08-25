import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useLogoutMutation, useProfileQuery } from "../../redux/features/auth/authApi";
import { useEffect } from "react";

type TProtectedRoute = {
    children: ReactNode;
    role?: string;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
    const { data: user, isLoading } = useProfileQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [logout] = useLogoutMutation();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logout({}).unwrap();
            } catch (err) {
                console.error("Logout failed", err);
            }
        };

        if (user?.data?.isBlocked) {
            handleLogout();
        }
    }, [user?.data?.isBlocked]);

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
