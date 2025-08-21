import { createBrowserRouter } from "react-router";
import PublicLayout from "../components/layouts/PublicLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MFSDashboard from "../components/layouts/UserLayout";
import UserLay from "../components/layouts/UserLay";

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
    }
    
]);


export default router;