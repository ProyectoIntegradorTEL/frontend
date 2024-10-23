import { Route, Routes } from "react-router-dom";
import { NavbarSimple } from "../widgets/layout";
import routes from "../routes";


export function HomepageLayout() {
    return (
        <div className="w-full h-full">
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