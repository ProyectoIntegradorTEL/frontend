import React from "react";
import { Typography } from "@material-tailwind/react";

// eslint-disable-next-line react/prop-types
export function TestimonialCard({ quote, name, position }) {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-sm text-center">
            <Typography variant="lead" className="italic mb-4">
                &quot;{quote}&quot;
            </Typography>
            <Typography variant="h6" className="font-bold">
                {name}
            </Typography>
            <Typography className="text-gray-500">
                {position}
            </Typography>
        </div>
    );
}

export default TestimonialCard;
