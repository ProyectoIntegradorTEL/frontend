import React from "react";
import { useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
    BeakerIcon,
    CogIcon,
    UserIcon,
    AdjustmentsHorizontalIcon
} from "@heroicons/react/24/outline";

// eslint-disable-next-line react/prop-types
export function StepperWithContent({ activeStep, setActiveStep, setIsLastStep, setIsFirstStep }) {


    return (
        <div className="w-full px-24 py-4 my-4">
            <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
            >
                <Step>
                    <BeakerIcon className="h-5 w-5" />
                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 0 ? "blue-gray" : "gray"}
                        >
                            Step 1
                        </Typography>
                        <Typography
                            color={activeStep === 0 ? "blue-gray" : "gray"}
                            className="font-normal"
                        >
                            Choose your motor test
                        </Typography>
                    </div>
                </Step>
                <Step>
                    <UserIcon className="h-5 w-5" />
                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 1 ? "blue-gray" : "gray"}
                        >
                            Step 2
                        </Typography>
                        <Typography
                            color={activeStep === 1 ? "blue-gray" : "gray"}
                            className="font-normal"
                        >
                            Fill up the form
                        </Typography>
                    </div>
                </Step>
                <Step>
                    <AdjustmentsHorizontalIcon className="h-5 w-5" />
                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 2 ? "blue-gray" : "gray"}
                        >
                            Step 3
                        </Typography>
                        <Typography
                            color={activeStep === 2 ? "blue-gray" : "gray"}
                            className="font-normal"
                        >
                            Review guide steps
                        </Typography>
                    </div>
                </Step>
            </Stepper>

        </div>
    );
}