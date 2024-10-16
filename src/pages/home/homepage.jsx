import { useContext } from "react";
import { TrialContext } from "../../context";
import { Typography } from "@material-tailwind/react";
import { trials } from "../../data";

export function Homepage() {
    const { trial, setTrial } = useContext(TrialContext);

    setTrial(trials.taconeo);

    return (
        <div className="flex flex-col w-full h-full items-start justify-center">
            <Typography variant="h1">
                Homepage
            </Typography>

            <Typography variant="h3">
                This is the clinical trial: {trial}
            </Typography>
        </div>
    )
}

export default Homepage
