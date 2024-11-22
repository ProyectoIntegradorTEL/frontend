/* eslint-disable */
import { useContext, useEffect, useState } from "react";
import { TrialContext } from "../../context";
import {
  Button,
  Card,
  Typography,
} from "@material-tailwind/react";
import Plot from "react-plotly.js";
import { useMQTT } from "@/hooks";
import { ImagePlacehoderSkeleton } from "@/widgets/skeleton";
import axios from "axios"; // Asegúrate de tener axios instalado
import Cookies from "js-cookie"; // Asegúrate de instalar 'js-cookie'
import apiClient from "@/services/apiClient";

export function Report() {
  //MQTT configuration
  const topicReceiver = "sender/Device082621";
  const topicTrigger = "trigger/Device082621";
  const { client, messages, setMessages } = useMQTT(topicReceiver);
  const { client: trigger, publishMessage: triggerPublishMessage } = useMQTT(topicTrigger);

  //Manage graph data
  const [processedData, setProcessedData] = useState(null);
  const [plotData, setPlotData] = useState(null);

  //Manage fetching process status
  const [status, setStatus] = useState("idle");

  // Patient Form states
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedEvaluationTypeId, setSelectedEvaluationTypeId] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(0);
  const [note, setNote] = useState("");
  const [evaluationTypeId, setEvaluationTypeId] = useState([]);
  const [evaluatorPersonalId, setEvaluatorPersonalId] = useState(""); // Nuevo campo para evaluator ID
  const [evaluationCreated, setEvaluationCreated] = useState(false);


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await apiClient.get("/patient");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    const fetchEvaluationTypes = async () => {
      console.log("fetchin ev types")
      try {
        const response = await apiClient.get("/evaluation-types")
        console.log("response from evaluation types: " + response.data)
        setEvaluationTypeId(response.data)
      } catch (error) {
        console.error("Error fetching evaluation types:", error);
      }
    }

    fetchPatients();
    fetchEvaluationTypes();
  }, []);

  // Effect to process the data received
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1] === ".") {
      const dataMessages = messages.slice(0, messages.length - 1);
      const dataString = dataMessages.join("");
      // Convert to JSON the string recolected
      try {
        const jsonData = JSON.parse(dataString);
        console.log("JSON completo:", jsonData);
        setProcessedData(jsonData);
      } catch (error) {
        console.error("Error al parsear el JSON:", error);
        console.log("Cadena recibida:", dataString);
        setStatus("error");
      }
      // Clean the messages array to avoid reprocessing the same data
      setMessages((prevMessages) => prevMessages.slice(messages.length));
    }
  }, [messages]);

  // Effect to prepare data for plotting
  useEffect(() => {
    if (processedData) {
      const accelerometerData = processedData.readings.accelerometer;
      const gyroscopeData = processedData.readings.gyroscope;

      const timestampsAcc = accelerometerData.map((point) => point.timestamp);
      const xAcc = accelerometerData.map((point) => point.x);
      const yAcc = accelerometerData.map((point) => point.y);
      const zAcc = accelerometerData.map((point) => point.z);

      const timestampsGyro = gyroscopeData.map((point) => point.timestamp);
      const xGyro = gyroscopeData.map((point) => point.x);
      const yGyro = gyroscopeData.map((point) => point.y);
      const zGyro = gyroscopeData.map((point) => point.z);

      setPlotData({
        accelerometer: {
          timestamps: timestampsAcc,
          x: xAcc,
          y: yAcc,
          z: zAcc,
        },
        gyroscope: {
          timestamps: timestampsGyro,
          x: xGyro,
          y: yGyro,
          z: zGyro,
        },
      });
      setStatus("success");
    }
  }, [processedData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crear evaluación
      console.log("Creando evaluación...");
      const response = await apiClient.post("/evaluation", {
        date,
        duration,
        jsonData: "json_test", // Simulación de datos procesados
        note,
        evaluationTypeId: localStorage.getItem("evaluation_type"),
        patientId: selectedPatientId,
        evaluatorId: evaluatorPersonalId
      });

      if (response.status === 201) {
        const evaluationId = response.data.id; // Suponiendo que el ID está en 'id'
        localStorage.setItem("evaluationId", evaluationId); // Guardar en localStorage
        alert("Evaluación creada con éxito!");

        setEvaluationCreated(true); // Permitir que se muestren las notas
        console.log("Evaluación creada con ID:", evaluationId);
      }
    } catch (error) {
      console.error("Error al crear la evaluación:", error);
    }
  };

  const handleAddNote = async () => {
    const evaluationId = localStorage.getItem("evaluationId");
    if (!evaluationId) {
      alert("No se encontró el ID de la evaluación. Por favor, crea una evaluación primero.");
      return;
    }

    try {
      // Crear nota
      const noteResponse = await apiClient.post("/notes", {
        note, // La nota ingresada
        evaluationId, // ID de la evaluación creada
        patientId: selectedPatientId,
        evaluatorId: evaluatorPersonalId, // ID del evaluador
      });

      if (noteResponse.status === 201) {
        alert("Nota agregada con éxito!");
        setNote(""); // Limpiar la nota después de enviarla
      }
    } catch (error) {
      console.error("Error al agregar la nota:", error);
    }
  };

  return (
    <main className="flex flex-row w-full h-full mt-8 justify-center items-start">
      <Card className="flex flex-col justify-start items-center h-full w-2/3 p-2 overflow-auto">
        <header className="flex flex-row w-full mb-4">
          <Button
            size="sm"
            onClick={() => {
              triggerPublishMessage("start");
              setMessages([]);
              setStatus("fetching");
              setPlotData(null);
              console.log("Mensaje enviado: start");
            }}
          >
            Start motor test
          </Button>

          <Typography variant="h4" color="black" className="mx-auto">
            MDS-UPDRS Motor test
          </Typography>
        </header>

        {/* Plot data if it is available */}
        {plotData ? (
          <Plot
            data={[
              {
                x: plotData.accelerometer.timestamps,
                y: plotData.accelerometer.x,
                type: "scatter",
                mode: "lines",
                name: "Acelerómetro X",
              },
              {
                x: plotData.accelerometer.timestamps,
                y: plotData.accelerometer.y,
                type: "scatter",
                mode: "lines",
                name: "Acelerómetro Y",
              },
              {
                x: plotData.accelerometer.timestamps,
                y: plotData.accelerometer.z,
                type: "scatter",
                mode: "lines",
                name: "Acelerómetro Z",
              },
              {
                x: plotData.gyroscope.timestamps,
                y: plotData.gyroscope.x,
                type: "scatter",
                mode: "lines",
                name: "Giroscopio X",
                yaxis: "y2",
              },
              {
                x: plotData.gyroscope.timestamps,
                y: plotData.gyroscope.y,
                type: "scatter",
                mode: "lines",
                name: "Giroscopio Y",
                yaxis: "y2",
              },
              {
                x: plotData.gyroscope.timestamps,
                y: plotData.gyroscope.z,
                type: "scatter",
                mode: "lines",
                name: "Giroscopio Z",
                yaxis: "y2",
              },
            ]}
            layout={{
              title: "Acelerometer and Gyroscope data",
              xaxis: {
                title: "Time (s)",
              },
              yaxis: {
                title: "Aceleration (m/s²)",
              },
              yaxis2: {
                title: "Angular velocity (grades/s)",
                overlaying: "y",
                side: "right",
              },
              legend: {
                orientation: "h",
                y: -0.2,
              },
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "300px" }} // Ajuste la altura del gráfico
          />
        ) : (
          <div className="flex flex-col h-full w-full ">
            {/*Loading component*/}
            <ImagePlacehoderSkeleton />
          </div>
        )}
      </Card>

      <Card className="flex flex-col justify-start items-center h-full w-1/3 ml-4 overflow-auto">
        {/*Summary section */}
        <section className="flex flex-col justify-start items-center w-full h-1/4 mb-4">
          <Typography variant="h4" color="black">
            Summary
          </Typography>

          <Button
            size="lg"
            color={status === "idle" ? "gray" : status === "success" ? "green" : status === "fetching" ? "blue" : "red"}
            loading={status === "fetching"}
            className="w-2/3 m-auto"
          >
            {`Status: ${status}`}
          </Button>
        </section>

        {/* Patient Form Section */}
        <div className="w-full p-2">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label className="block font-medium mb-2">Evaluator Personal ID</label>
            <input
              type="text"
              value={evaluatorPersonalId}
              onChange={(e) => setEvaluatorPersonalId(e.target.value)}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Select Patient</label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="border rounded-lg p-2 w-full"
              required
            >
              <option value="">Selecciona un paciente</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.personalId}>
                  {patient.personalId}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Duration (s)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>

          <Button type="submit" className="w-full" color="green">
            Crear Evaluación
          </Button>
        </form>
        </div>
      </Card>
      {/* Formulario para agregar notas */}
      {evaluationCreated && (
        <Card className="flex flex-col justify-start items-center h-full w-1/3 ml-4 p-4">
          <Typography variant="h5" color="black" className="mb-4">
            Agregar Nota
          </Typography>
          <div className="mb-4 w-full">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border rounded-lg p-2 w-full"
              placeholder="Escribe una nota"
              rows={4}
              required
            />
          </div>
          <Button onClick={handleAddNote} className="w-full" color="blue">
            Agregar Nota
          </Button>
        </Card>
      )}
    </main>
  );
}
