import { Typography } from "@material-tailwind/react";
import { SignIn, SignUp } from "./pages/auth";
import { Dashboard } from "./pages/dashboard";
import { Homepage } from "./pages/home";
import { GuideSteps } from "./pages/step";

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
                name: "form",
                path: "/form",
                element:
                    <div className="w-full h-full flex flex-col py-8 items-center">
                        <Typography variant="h1">Test subject form</Typography>
                    </div>,
            },
            {
                name: "guide",
                path: "/guideSteps",
                element: <GuideSteps />,
            }
        ],
    }
];

export default routes;
