import { createBrowserRouter } from "react-router";
import PublicLayout from "../components/layouts/PublicLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MFSDashboard from "../components/layouts/UserLayout";
import UserLay from "../components/layouts/UserLay";
import AgentDashboard from "../components/layouts/AgentDashboard";
import AdminDashboard from "../components/layouts/AdminLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            }
        ]
    },
    {
        path: "/user",
        element: <MFSDashboard/>,
    },
    {
        path: "/users",
        element: <UserLay/>,
    },
    {
        path: "/agent",
        element: <AgentDashboard/>
    },
    {
        path: "/admin",
        element: <AdminDashboard/>
    }
    
]);


export default router;