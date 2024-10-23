import React from "react";
import { Typography } from "@material-tailwind/react";

// eslint-disable-next-line react/prop-types
export function StepContent({ step }) {
    return (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <Typography variant="h4" className="mb-4">
                {step.title}
            </Typography>
            <Typography variant="paragraph" className="text-gray-600">
                {step.description}
            </Typography>
        </div>
    );
}

export default StepContent;
