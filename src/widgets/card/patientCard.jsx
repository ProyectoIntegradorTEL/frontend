import apiClient from "@/services/apiClient";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";


// Patient Card Component
export const PatientCard = ({ patient, onDelete }) => {
    const navigate = useNavigate();
    const handleDelete = async () => {
        try {
            await apiClient.delete(`/patient/${patient.id}`);
            onDelete(patient.id);
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader className="bg-blue-500 text-white p-4" onClick={() => navigate(`/patient/${patient.personalId}`)}>
                <h3 className="text-xl font-bold">{patient.firstName} {patient.lastName}</h3>
            </CardHeader>
            <CardBody className="p-4">
                <p>Personal ID: {patient.personalId}</p>
                <p>Gender: {patient.gender}</p>
                <p>Birth Date: {patient.birthDate}</p>
                <p>Email: {patient.email}</p>
                <p>Phone: {patient.phone}</p>
            </CardBody>
            <CardFooter className="flex justify-end p-4">
                <Button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
};