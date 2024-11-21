import { Typography } from "@material-tailwind/react";
import { SignIn, SignUp } from "./pages/auth";
import { Dashboard } from "./pages/dashboard";
import { Homepage } from "./pages/home";
import { Report } from "./pages/motor-test";
import { GuideSteps, PatientForm } from "./pages/step";
import { PatientList } from "./widgets/list";
import { Patient, PatientEvaluation } from "./pages/patient";

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
        path: "/report",
        element: <Report />,
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
    layout: "step",
    pages: [
      {
        name: "guides",
        path: "/guides",
        element:
          <div className="w-full h-full flex flex-col py-8 items-center">
            <Typography variant="h1">Guides</Typography>
          </div>,
      },
      {
        name: "guide",
        path: "/guideSteps",
        element: <GuideSteps />,
      },
      {
        name: "form",
        path: "/form",
        element:
          <PatientForm />,
      },

    ],
  },
  {
    layout: "patient",
    pages: [
      {
        name: "patientList",
        path: "/",
        element: <PatientList />,
      },
      {
        name: "patient",
        path: "/:id",
        element: <Patient />,
      },
      {
        name: "patient",
        path: "/evaluation/:id",
        element: <PatientEvaluation />,
      },
    ],
  },
];

export default routes;
