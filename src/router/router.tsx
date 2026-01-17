import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Landing from "../Landing/Landing";
import Layout from "../auth/Layout";
import Login from "../auth/pages/Login";
import Signup from "../auth/pages/Signup";
import OTP from "../auth/pages/Otp";
import ConfirmEmail from "../auth/pages/ConfirmEmail";
import ChangePassword from "../auth/pages/ChangePassword";
import DashboardLayout from "../Dashboard/Layout";
import Chat from "../Dashboard/pages/Chat";
import Profile from "../Dashboard/pages/Profile";
import PricingPlans from "../Dashboard/pages/Priceing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/auth",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Navigate to="/auth/login" replace />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "otp",
            element: <OTP />,
          },
          {
            path: "confirm-email",
            element: <ConfirmEmail />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/chat" replace />,
          },
          {
            path: "chat",
            element: <Chat />,
          },
          {
            path: "profile",
            element: (
              <div className="w-full h-full bg-[#EFF2F6]">
                <Profile />
              </div>
            ),
          },
          {
            path: "plan",
            element: (
              <div>
                <PricingPlans />
              </div>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
