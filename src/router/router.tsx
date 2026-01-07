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
            element: <div>Chat</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
