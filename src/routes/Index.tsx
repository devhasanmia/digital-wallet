import { createBrowserRouter } from "react-router";
import PublicLayout from "../components/layouts/PublicLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MFSDashboard from "../components/layouts/UserLayout";
import AgentDashboard from "../components/layouts/AgentDashboard";
import AdminDashboard from "../components/layouts/AdminLayout";
import ProtectedRoute from "../components/layouts/ProtecctedRoute";
import AccessDenied from "../pages/AccessDenied";
import UserLayout from "../components/layouts/UserLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "access-denied",
                element: <AccessDenied />
            }
        ]
    },
    {
        path: "/user",
        element: <MFSDashboard />,
    },
    {
        path: "/users",
        element: <ProtectedRoute role="user">
            <UserLayout />
        </ProtectedRoute>

    },
    {
        path: "/agent",
        element: <AgentDashboard />
    },
    {
        path: "/admin",
        element: <AdminDashboard />
    }

]);


export default router;