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
      console.log("fetchin ev types")
      try {
        const response = await axios.get("http://localhost:8080/evaluation-types")
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
      console.log("entra a tirar post")
      const response = await axios.post(
        "http://localhost:8080/evaluation", 
        {
          date,
          duration,
          jsonData: JSON.stringify(processedData), // Enviamos los datos procesados
          note,
          evaluationTypeId: selectedEvaluationTypeId,
          patientId: selectedPatientId,
        }
      );

      if (response.status === 201) {
        alert("Motor test data submitted successfully!");
        // navigate("/"); // Redirige al home o a donde prefieras
      }
    } catch (error) {
      console.log(error.message)
      console.error("Failed to submit motor test data:", error);
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
          <form
            className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <div className="mb-4">
                <Typography variant="small" color="blue-gray" className="font-medium mb-2">
                  Select Patient
                </Typography>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  required
                >
                  <option value="">Select a patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.personalId}>
                      {patient.personalId}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="font-medium mb-2 block">Date:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="font-medium mb-2 block">Duration (s):</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="font-medium mb-2 block">Note:</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="font-medium mb-2 block">Select a evaluation type:</label>
                <select
                  value={selectedEvaluationTypeId}
                  onChange={(e) => setSelectedEvaluationTypeId(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  required
                  >
                  <option value=""></option>
                  {evaluationTypeId.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button type="submit" className="mt-4 w-full" color="green">
              Submit
            </Button>
          </form>
        </div>
      </Card>
    </main>
  );
}
