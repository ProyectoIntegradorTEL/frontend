/* eslint-disable */
import { useContext, useEffect, useState } from "react";
import { TrialContext } from "../../context";
import { Button, Card, Textarea, Typography } from "@material-tailwind/react";
import Plot from "react-plotly.js";
import { useMQTT } from "@/hooks";
import { ImagePlacehoderSkeleton } from "@/widgets/skeleton";
import axios from "axios"; // Asegúrate de tener axios instalado
import Cookies from "js-cookie"; // Asegúrate de instalar 'js-cookie'
import apiClient from "@/services/apiClient";
import { exampleTestData } from "@/data/placeholder/test-data-placeholder";
import { useParams } from "react-router-dom";
import { EvaluatorCard, PatientCard } from "@/widgets/card";

export function PatientEvaluation() {
  const { id } = useParams();

  //Manage graph data
  const [processedData, setProcessedData] = useState(null);
  const [plotData, setPlotData] = useState(null);

  //Manage evaluation data
  const [evaluation, setEvaluation] = useState(null);
  const [evaluationError, setEvaluationError] = useState(null);

  //Manage fetching process status
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        setStatus("fetching");
        const response = await apiClient.get(`/evaluation/${id}`);
        console.log("Evaluation response:", response.data);
        setEvaluation(response.data);
        if (response.data?.jsonData) {
          setProcessedData(JSON.parse(response.data.jsonData));
        }
        setStatus("success");
      } catch (err) {
        console.log("Error fetching evaluation:", err);
        setEvaluationError(
          err.message || "Error al obtener los datos del paciente"
        );
        setStatus("error");
      }
    };

    fetchEvaluation();
  }, [id]);

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
  };

  console.log("Evaluation:", evaluation);

  return (
    <main className="flex flex-row w-full h-full mt-8 justify-center items-start">
      <Card className="flex flex-col justify-start items-center h-full w-2/3 p-2 overflow-auto">
        <header className="flex flex-row w-full mb-4">
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
            color={
              status === "idle"
                ? "gray"
                : status === "success"
                  ? "green"
                  : status === "fetching"
                    ? "blue"
                    : "red"
            }
            loading={status === "fetching"}
            className="w-2/3 m-auto mt-4"
          >
            {`Status: ${status}`}
          </Button>

          <div className="mt-8 space-y-8 w-full px-4">
            <Typography variant="h5" color="black">
              Patient
            </Typography>
            {evaluation && (
              <PatientCard
                key={evaluation.patient.id}
                patient={evaluation.patient}
                onDelete={null}
              />
            )}
          </div>
          <div className="mt-8 space-y-8 w-full px-4">
            <Typography variant="h5" color="black">
              Evaluator
            </Typography>
            {evaluation && (
              <EvaluatorCard
                key={evaluation.evaluator.id}
                evaluator={evaluation.evaluator}
              />
            )}
          </div>
          <div className="mt-8 space-y-8 w-full px-4">
            <Typography variant="h5" color="black">
              Date
            </Typography>
            <Typography>{evaluation?.date}</Typography>
          </div>
          <div className="mt-8 space-y-8 w-full px-4">
            <Typography variant="h5" color="black">
              Notes
            </Typography>
            {evaluation?.notes.map((note, index) => (
              <Textarea key={index} value={note.comment} disabled />
            ))}
          </div>
        </section>
      </Card>
    </main>
  );
}
