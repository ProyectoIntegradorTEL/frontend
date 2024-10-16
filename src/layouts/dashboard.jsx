
import { Route, Routes } from "react-router-dom";
import { NavbarSimple } from "../widgets/layout";
import routes from "../routes";

export function DashboardLayout() {
    return (
        <div className="flex flex-col min-h-screen h-screen md:h-screen  overflow">
            <NavbarSimple />

            <Routes>
                {routes.map(
                    ({ layout, pages }) =>
                        layout === "dashboard" &&
                        pages.map(({ element, path }) => (
                            <Route key={path} path={path} element={element} />
                        ))
                )}
            </Routes>
        </div>
    )
}

export default DashboardLayout
