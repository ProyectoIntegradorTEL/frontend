import { Route, Routes } from "react-router-dom";
import { NavbarSimple } from "../widgets/layout";
import routes from "@/routes";

export function MotorTestLayout() {
    return (
        <main className="flex flex-col min-h-screen h-screen px-8 pb-8">
            <NavbarSimple />

            <Routes>
                {routes.map(
                    ({ layout, pages }) =>
                        layout === "motor-test" &&
                        pages.map(({ element, path }) => (
                            <Route key={path} path={path} element={element} />
                        ))
                )}
            </Routes>
        </main>
    )
}


