import type { ReactNode } from "react";
import { Navigate } from "react-router";
import Cookies from "js-cookie";
import { tokenVerify } from "../../utils/tokenVerify";

type TProtectedRoute = {
    children: ReactNode;
    role?: string;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
    const token = Cookies.get("accessToken");
    console.log(token)
    const user = token ? tokenVerify(token) : null;
    // যদি token নাই বা role mismatch হয়
    if (!token || (role && user?.role !== role)) {
        if (token && role && user?.role !== role) {
            return <Navigate to="/access-denied" replace />;
        }
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
