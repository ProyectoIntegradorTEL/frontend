import { Routes, Route } from "react-router-dom";
import routes from "../routes";

export function AuthLayout() {

    return (
        <div className="flex flex-col min-h-screen h-screen px-8">
            <Routes>
                {routes.map(
                    ({ layout, pages }) =>
                        layout === "auth" &&
                        pages.map(({ path, element }) => (
                            <Route key={path} exact path={path} element={element} />
                        ))
                )}
            </Routes>
        </div>
    );
}

export default AuthLayout;
