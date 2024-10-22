import { Route, Routes } from "react-router-dom";
import { NavbarSimple } from "../widgets/layout";
import routes from "../routes";


export function HomepageLayout() {
    return (
        <div className="flex flex-col min-h-screen h-screen px-8">
            <NavbarSimple />

            <Routes>
                {routes.map(
                    ({ layout, pages }) =>
                        layout === "homepage" &&
                        pages.map(({ element, path }) => (
                            <Route key={path} path={path} element={element} />
                        ))
                )}
            </Routes>
        </div>
    )
}

export default HomepageLayout
