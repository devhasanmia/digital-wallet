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
import Profile from "../components/ui/Profile";
import UserDashboard from "../components/layouts/Users/UserDashboard";

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
        path: "/user/dashboard",
        element: <ProtectedRoute role="user">
            <UserLayout />
        </ProtectedRoute>,
        children:[
            {
                path: "",
                element: <UserDashboard/>
            },
            {
                path: "profile",
                element: <Profile/>
            }
        ]
    },
    {
        path: "/agent/dashboard",
        element: <ProtectedRoute role="agent">
            <AgentDashboard />
        </ProtectedRoute>

    },
    {
        path: "/admin",
        element: <AdminDashboard />
    }
]);


export default router;