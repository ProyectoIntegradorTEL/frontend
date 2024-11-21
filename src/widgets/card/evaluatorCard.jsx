import apiClient from "@/services/apiClient";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";


// evaluator Card Component
export const EvaluatorCard = ({ evaluator }) => {


    return (
        <Card className="w-full">
            <CardHeader className="bg-blue-500 text-white p-4">
                <h3 className="text-xl font-bold">{evaluator.firstName} {evaluator.lastName}</h3>
            </CardHeader>
            <CardBody className="p-4">
                <p>Personal ID: {evaluator.personalId}</p>
                <p>Email: {evaluator.email}</p>
            </CardBody>
        </Card>
    );
};