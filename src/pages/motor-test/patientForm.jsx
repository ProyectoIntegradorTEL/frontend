import {
    Tabs,
    Tab,
    TabsHeader,
    Button,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { TrialContext } from "../../context";
import axios from "axios";
import Cookies from "js-cookie"; // Asegúrate de instalar 'js-cookie'

export function PatientForm() {
    const { setUser } = useContext(TrialContext);
    const [patients, setPatients] = useState([]);
    const [evaluationTypes, setEvaluationTypes] = useState([]);
    
    // Nuevos estados para los campos requeridos
    const [selectedPatientId, setSelectedPatientId] = useState("");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState(0);
    const [note, setNote] = useState("");
    const [evaluationTypeId, setEvaluationTypeId] = useState("");

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:8080/patient");
                setPatients(response.data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        const fetchEvaluationTypes = async () => {
            try {
                const response = await axios.get("http://localhost:8080/evaluation-types"); // Asegúrate de que esta URL sea correcta
                setEvaluationTypes(response.data);
            } catch (error) {
                console.error("Error fetching evaluation types:", error);
            }
        };

        fetchPatients();
        fetchEvaluationTypes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get("authToken"); // Obtén el token de las cookies

            const response = await axios.post(
                "http://localhost:8080/evaluation", // Cambia la URL según tu API
                {
                    date,
                    duration,
                    note,
                    evaluationTypeId,
                    patientId: selectedPatientId,
                }
            );

            if (response.status === 201) {
                alert("Motor test data submitted successfully!");
                // navigate("/"); // Redirige al home o a donde prefieras
            }
        } catch (error) {
            console.error("Failed to submit motor test data:", error);
        }
    };

    return (
        <section className="w-full h-full flex flex-row py-8 px-8">
            <div className="w-full flex flex-col items-center justify-center">
                <form
                    className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-1 flex flex-col gap-6">
                        <div className="mb-4">
                            <Typography variant="small" color="blue-gray" className="font-medium mb-2">
                                Select Patient
                            </Typography>
                            <Select
                                label="Select a patient"
                                value={selectedPatientId}
                                onChange={(value) => setSelectedPatientId(value)}
                            >
                                {patients.map((patient) => (
                                    <Option key={patient.personalId} value={patient.personalId}>
                                        {`${patient.personalId} - ${patient.name}`}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        
                        <div className="mb-4">
                            <Typography variant="small" color="blue-gray" className="font-medium mb-2">
                                Date
                            </Typography>
                            <input
                                type="datetime-local"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="border rounded p-2 w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <Typography variant="small" color="blue-gray" className="font-medium mb-2">
                                Duration
                            </Typography>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="Duration (in minutes)"
                                className="border rounded p-2 w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <Typography variant="small" color="blue-gray" className="font-medium mb-2">
                                Note
                            </Typography>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Notes about the test"
                                className="border rounded p-2 w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <Typography variant="small" color="blue-gray" className="font-medium mb-2">
                                Select Evaluation Type
                            </Typography>
                            <Select
                                label="Select evaluation type"
                                value={evaluationTypeId}
                                onChange={(value) => setEvaluationTypeId(value)}
                            >
                                {evaluationTypes.map((type) => (
                                    <Option key={type.id} value={type.id}>
                                        {type.name} {/* Asegúrate de que la propiedad sea correcta */}
                                    </Option>
                                ))}
                            </Select>
                        </div>

                        <Button className="mt-6" fullWidth color="blue" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default PatientForm;
