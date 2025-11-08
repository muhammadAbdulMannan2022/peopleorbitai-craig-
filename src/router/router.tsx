import { createBrowserRouter } from "react-router";
import App from "../App";
import Landing from "../Landing/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
    ],
  },
]);

export default router;
