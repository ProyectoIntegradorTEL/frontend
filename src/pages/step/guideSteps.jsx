import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { StepContent } from "../../widgets/stepper";
import { steps } from "../../data";

export function GuideSteps() {
    return (
        <div className="w-full my-4 flex flex-col items-center bg-gray-50">
            <div className="max-w-4xl w-full mt-10 p-6 bg-white shadow-lg rounded-lg">
                <Typography variant="h1" className="text-center mb-6">
                    Guide Steps
                </Typography>
                {
                    steps.map((step, index) => (
                        <StepContent key={index} step={step} />
                    ))
                }
            </div>
        </div>
    );
}

export default GuideSteps;
