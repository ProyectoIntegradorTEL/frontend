import { Route, Routes } from "react-router-dom";
import { NavbarSimple } from "../widgets/layout";
import routes from "../routes";
import { PatientList } from "@/widgets/list";
import { Typography } from "@material-tailwind/react";



export function PatientLayout() {
    return (
        <div className="container h-full mx-auto pb-8">
            <NavbarSimple />

            <div className="mt-8 mb-12">
                <Typography variant="h1" className="text-3xl font-bold mb-4">Patient Management</Typography>
            </div>

            <div className="">
                <Routes>
                    {routes.map(
                        ({ layout, pages }) =>
                            layout === "patient" &&
                            pages.map(({ element, path }) => (
                                <Route key={path} path={path} element={element} />
                            ))
                    )}
                </Routes>
            </div>

        </div>
    )
}


export default PatientLayout
