import { createBrowserRouter } from "react-router";
import PublicLayout from "../components/layouts/PublicLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/layouts/ProtecctedRoute";
import AccessDenied from "../pages/AccessDenied";
import Profile from "../components/ui/Profile";
import UserDashboard from "../components/layouts/Users/UserDashboard";
import AgentLayout from "../components/layouts/Agent/AgentLayout";
import AgentDashboard from "../components/layouts/Agent/AgentDashboard";
import UserLayout from "../components/layouts/Users/UserLayout";
import AdminDashboard from "../components/layouts/Admin/AdminLayout";
import Dashboard from "../components/layouts/Admin/Dashboard";
import Users from "../components/layouts/Admin/Users";
import Agents from "../components/layouts/Admin/Agents";
import AllTransaction from "../components/layouts/Admin/AllTransaction";

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
        path: "/user/dashboard",
        element: <ProtectedRoute role="user">
            <UserLayout />
        </ProtectedRoute>,
        children: [
            {
                path: "",
                element: <UserDashboard />
            },
            {
                path: "profile",
                element: <Profile />
            }
        ]
    },
    {
        path: "/agent/dashboard",
        element: <ProtectedRoute role="agent">
            <AgentLayout />
        </ProtectedRoute>,
        children: [
            {
                path: "",
                element: <AgentDashboard />
            },
            {
                path: "profile",
                element: <Profile />
            }
        ]
    },
    {
        path: "/admin/dashboard",
        element: <ProtectedRoute role="admin">
            <AdminDashboard />
        </ProtectedRoute>,
        children: [
            {
                path: "",
                element: <Dashboard />
            },
            {
                path: "users",
                element: <Users />
            },
            {
                path: "agents",
                element: <Agents />
            },
            {
                path: "transactions",
                element: <AllTransaction/>
            }
        ]
    }
]);


export default router;