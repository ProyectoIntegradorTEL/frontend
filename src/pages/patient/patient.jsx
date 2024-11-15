import React, { useState, useEffect } from "react";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import apiClient from "@/services/apiClient";
import { ErrorBlock } from "@/widgets/blocks";

export function Patient() {
    const { id } = useParams();

    const [patient, setPatient] = useState(null);
    const [evaluations, setEvaluations] = useState([]);
    const [patientLoading, setPatientLoading] = useState(true);
    const [evaluationsLoading, setEvaluationsLoading] = useState(true);
    const [patientError, setPatientError] = useState(null);
    const [evaluationsError, setEvaluationsError] = useState(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await apiClient.get(`/patient/${id}`);
                setPatient(response.data);
                setPatientLoading(false);
            } catch (err) {
                setPatientError(err.message || "Error al obtener los datos del paciente");
                setPatientLoading(false);
            }
        };

        fetchPatient();
    }, [id]);

    useEffect(() => {
        const fetchEvaluations = async () => {
            try {
                if (patient && patient?.id) {
                    const response = await apiClient.get(`/evaluation?patientId=${patient.id}`);
                    setEvaluations(response.data);
                    setEvaluationsLoading(false);
                }
            } catch (err) {
                setEvaluationsError(err.message || "Error al obtener las evaluaciones");
                setEvaluationsLoading(false);
            }
        };

        fetchEvaluations();
    }, [patient]);

    if (patientLoading || evaluationsLoading)
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <Spinner className="h-16 w-16" color="blue" />
            </div>
        );

    if (evaluationsError || patientError)
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <ErrorBlock error={patientError} />
            </div>
        );

    return (
        <div className="w-auto h-auto">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
                {/* Encabezado */}
                <div className="text-center">
                    <Typography variant="h2" className="text-3xl font-bold text-blue-600">
                        {patient.firstName} {patient.lastName}
                    </Typography>
                    <Typography className="text-gray-600 mt-1">Patient Profile</Typography>
                </div>

                {/* Sección de información personal */}
                <section>
                    <Typography
                        variant="h5"
                        className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4"
                    >
                        Personal Information
                    </Typography>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <p className="text-gray-700">
                            <span className="font-semibold">Personal ID:</span>{" "}
                            {patient.personalId}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Gender:</span> {patient.gender}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Birth Date:</span>{" "}
                            {patient.birthDate}
                        </p>
                    </div>
                </section>

                {/* Sección de contacto */}
                <section>
                    <Typography
                        variant="h5"
                        className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4"
                    >
                        Contact Information
                    </Typography>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <p className="text-gray-700">
                            <span className="font-semibold">Email:</span> {patient.email}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Phone:</span> {patient.phone}
                        </p>
                    </div>
                </section>

                <div className="text-center">
                    <Typography variant="h2" className="text-3xl font-bold text-blue-600">
                        Evaluations
                    </Typography>
                    <Typography className="text-gray-600 mt-1">
                        Overview of patient evaluations
                    </Typography>
                </div>

                {/* Listado de evaluaciones */}
                <section>
                    <Typography
                        variant="h5"
                        className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4"
                    >
                        Evaluation List
                    </Typography>
                    <div className="space-y-4">
                        {evaluations && evaluations.map((evaluation, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
                            >
                                <div className="mb-2">
                                    <Typography
                                        variant="h6"
                                        className="font-semibold text-gray-800"
                                    >
                                        {evaluation.evaluationType.name}
                                    </Typography>
                                    <Typography className="text-sm text-gray-500">
                                        {new Date(evaluation.date).toLocaleDateString()}
                                    </Typography>
                                </div>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Duration:</span>{" "}
                                    {evaluation.duration} seconds
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Evaluator name:</span>{" "}
                                    {evaluation.evaluator.firstName} {evaluation.evaluator.lastName}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Evaluator email:</span>{" "}
                                    {evaluation.evaluator.email}
                                </p>
                                <Button className="my-2">
                                    View Evaluation
                                </Button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Patient;
