import React from "react";
import { Typography } from "@material-tailwind/react";

// eslint-disable-next-line react/prop-types
export function FeatureCard({ title, description, icon }) {
    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="text-5xl mb-4">{icon}</div>
            <Typography variant="h5" className="font-bold mb-2">
                {title}
            </Typography>
            <Typography className="text-gray-600">
                {description}
            </Typography>
        </div>
    );
}

export default FeatureCard;
