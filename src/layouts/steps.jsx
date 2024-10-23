import routes from "../routes"
import { Route, Routes } from "react-router-dom"
import { NavbarSimple } from "../widgets/layout"
import { StepperWithContent } from "../widgets/stepper"
import { useState } from "react"
import { Button } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { TrialContext } from "../context"

export function StepsLayout() {
    const { user: { personalId, firstName, lastName, gender, birthDate, email, phone, isOn, isNewPatient } } = useContext(TrialContext);
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
            if (isNewPatient) {
                if (personalId && firstName && lastName && gender && birthDate && email && phone) {
                    navigate("/motor-test/report")
                } else {
                    alert("Please fill all the required fields")
                }
            } else {
                navigate("/motor-test/report")
            }
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
            navigate("/")
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
