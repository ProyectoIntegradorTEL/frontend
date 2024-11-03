import routes from "../routes";
import { Route, Routes, useNavigate } from "react-router-dom";
import { NavbarSimple } from "../widgets/layout";
import { StepperWithContent } from "../widgets/stepper";
import { useState, useContext, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { TrialContext } from "../context";

export function StepsLayout() {
    const {
        user: { personalId, firstName, lastName, gender, birthDate, email, phone, isOn, isNewPatient },
        setUser,  // Asegúrate que TrialContext tenga un setter para actualizar el usuario
    } = useContext(TrialContext);

    const [activeStep, setActiveStep] = useState(0);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const [isLastStep, setIsLastStep] = useState(false);
    const navigate = useNavigate();

    const handleNext = () => {
        // Avanzar al siguiente paso si no es el último
        if (!isLastStep) {
            setActiveStep((cur) => cur + 1);
            navigateToStep(activeStep + 1);
        } else {
            // Validar datos y redirigir si es el último paso
            if (isNewPatient) {
                if (personalId && firstName && lastName && gender && birthDate && email && phone) {
                    navigate("/motor-test/report");
                } else {
                    alert("Please fill all the required fields");
                }
            } else {
                navigate("/motor-test/report");
            }
        }

        // Si viene de la sección de paciente, actualizar el contexto con personalId
        if (isNewPatient && personalId) {
            console.log("context user: " + personalId)
            setUser(personalId);
        }
    };

    const handlePrev = () => {
        // Retroceder al paso anterior si no es el primero
        if (!isFirstStep) {
            setActiveStep((cur) => cur - 1);
            navigateToStep(activeStep - 1);
        } else {
            navigate("/");
        }
    };

    const navigateToStep = (stepIndex) => {
        routes
            .filter(({ layout }) => layout === "step")
            .forEach(({ pages }) =>
                pages.forEach(({ path }, index) => {
                    if (index === stepIndex) {
                        navigate(`/step${path}`);
                    }
                })
            );
    };

    return (
        <div className="max-w-screen h-screen flex flex-col items-center">
            <NavbarSimple />
            <div className="w-4/5 py-4 my-4">
                <StepperWithContent
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    setIsFirstStep={setIsFirstStep}
                    setIsLastStep={setIsLastStep}
                />
            </div>

            <Routes>
                {routes.map(({ layout, pages }) =>
                    layout === "step" &&
                    pages.map(({ element, path }) => (
                        <Route key={path} path={path} element={element} />
                    ))
                )}
            </Routes>

            <div className="w-4/5 py-8 my-16 flex flex-row justify-between items-center">
                <Button onClick={handlePrev} size="lg">
                    Prev
                </Button>
                <Button onClick={handleNext} size="lg">
                    Next
                </Button>
            </div>
        </div>
    );
}

export default StepsLayout;
