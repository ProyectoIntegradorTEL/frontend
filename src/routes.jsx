import { SignIn, SignUp } from "./pages/auth";
import { Dashboard } from "./pages/dashboard";
import { Homepage } from "./pages/home";
import { MotorTest, Report } from "./pages/motor-test";

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        name: "dashboard main",
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
  {
    layout: "auth",
    pages: [
      {
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    layout: "homepage",
    pages: [
      {
        name: "homepage",
        path: "/",
        element: <Homepage />,
      },
    ],
  },
  {
    layout: "motor-test",
    pages: [
      {
        name: "main",
        path: "/",
        element: <MotorTest/>,
      },

      {
        name: "report",
        path: "/report",
        element: <Report/>,
      },
    ],
  },
];

export default routes;
