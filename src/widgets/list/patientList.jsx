import apiClient from "@/services/apiClient";
import { useEffect, useState } from "react";
import { PatientCard } from "../card";
import { Spinner } from "@material-tailwind/react";
import { ErrorBlock } from "../blocks";




export const PatientList = () => {
    const [patients, setPatients] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPatients = async () => {
        try {
            const response = await apiClient.get(`/patient`);
            setPatients(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Error al obtener los datos del paciente');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    if (loading) return <Spinner className="h-24 w-24" color='blue' />;
    if (error) return <ErrorBlock error={error} />;

    const deletePatient = async (id) => {

        try {
            await apiClient.delete(`/patient/${id}`);
            fetchPatients();
        }
        catch (error) {
            console.error('Error deleting patient:', error);
        }

    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {patients && patients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} onDelete={deletePatient} />
            ))}
        </div>
    );
};