import routes from "../routes"
import { Route, Routes } from "react-router-dom"
import { NavbarSimple } from "../widgets/layout"
import { StepperWithContent } from "../widgets/stepper"
import { useState } from "react"
import { Button } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"

export function StepsLayout() {
    const [activeStep, setActiveStep] = useState(0);
    const [isFirstStep, setIsFirstStep] = useState(false);
    const [isLastStep, setIsLastStep] = useState(false);
    const navigate = useNavigate()


    const handleNext = () => {
        !isLastStep && setActiveStep((cur) => cur + 1);
        routes.filter(({ layout }) => layout === "step").map(({ pages }) => pages.map(({ path }, index) => {
            if (index === activeStep + 1) {
                navigate(`/step${path}`)
            }
        }))
        if (isLastStep) {
            navigate("/") //Reemplazar con la ruta de la prueba
        }

    };
    const handlePrev = () => {
        !isFirstStep && setActiveStep((cur) => cur - 1);
        routes.filter(({ layout }) => layout === "step").map(({ pages }) => pages.map(({ path }, index) => {
            if (index === activeStep - 1) {
                navigate(`/step${path}`)
            }
        }))
        if (isFirstStep) {
            navigate("/") //Reemplazar con la ruta de la prueba
        }

    };

    return (
        <div className="max-w-screen h-screen flex flex-col items-center">
            <NavbarSimple />
            <div className="w-4/5 py-4 my-4">
                <StepperWithContent activeStep={activeStep} setActiveStep={setActiveStep} setIsFirstStep={setIsFirstStep} setIsLastStep={setIsLastStep} />
            </div>

            <Routes>
                {routes.map(
                    ({ layout, pages }) =>
                        layout === "step" &&
                        pages.map(({ element, path }) => (
                            <Route key={path} path={path} element={element} />
                        ))
                )}
            </Routes>
            <div className="w-4/5 py-8 my-16 flex  flex-row justify-between items-center">
                <Button
                    onClick={handlePrev}
                    // disabled={isFirstStep}
                    size="lg"
                >
                    Prev
                </Button>
                <Button
                    onClick={handleNext}
                    // disabled={isLastStep}
                    size="lg"
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default StepsLayout
