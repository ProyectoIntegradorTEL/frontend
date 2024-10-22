/* eslint-disable */
import { useContext, useEffect, useState } from "react";
import { TrialContext } from "../../context";
import {
  Button,
  Card,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import Plot from "react-plotly.js";
import EditableTextField from "@/widgets/textfields/customTextField";
import { useMQTT } from "@/hooks";

export function Report() {
  const [processedData, setProcessedData] = useState(null);
  const [plotData, setPlotData] = useState(null);

  const topic = "medition/Device082621";
  const { client, messages, publishMessage, setMessages } = useMQTT(topic);

  useEffect(() => {
    // Verificar si el último mensaje es "finished"
    if (messages.length > 0 && messages[messages.length - 1] === "finished") {
      // Encontrar el índice del último "start" antes de "finished"
      const startIndex = messages.lastIndexOf("start");

      if (startIndex !== -1) {
        // Obtener los mensajes entre "start" y "finished", excluyendo ambos
        const dataMessages = messages.slice(
          startIndex + 1,
          messages.length - 1
        );

        // Concatenar los mensajes para formar una cadena
        const dataString = dataMessages.join("");

        // Procesar la cadena (por ejemplo, parsear como JSON)
        try {
          const jsonData = JSON.parse(dataString);
          console.log("JSON completo:", jsonData);
          setProcessedData(jsonData);
        } catch (error) {
          console.error("Error al parsear el JSON:", error);
          console.log("Cadena recibida:", dataString);
        }

        // Limpiar los mensajes procesados para evitar reprocesarlos
        setMessages((prevMessages) => prevMessages.slice(messages.length));
      } else {
        console.warn("No se encontró 'start' antes de 'finished'.");
      }
    }
  }, [messages]);

  // Effect to prepare data for plotting
  useEffect(() => {
    if (processedData) {
      // Extract accelerometer and gyroscope data
      const accelerometerData = processedData.readings.accelerometer;
      const gyroscopeData = processedData.readings.gyroscope;

      // Prepaer data for accelerometer plot
      const timestampsAcc = accelerometerData.map((point) => point.timestamp);
      const xAcc = accelerometerData.map((point) => point.x);
      const yAcc = accelerometerData.map((point) => point.y);
      const zAcc = accelerometerData.map((point) => point.z);

      // Prepare data for gyroscope plot
      const timestampsGyro = gyroscopeData.map((point) => point.timestamp);
      const xGyro = gyroscopeData.map((point) => point.x);
      const yGyro = gyroscopeData.map((point) => point.y);
      const zGyro = gyroscopeData.map((point) => point.z);

      // Actualizar el estado con los datos preparados
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
    }
  }, [processedData]);

  return (
    <main className="flex flex-row w-full h-full mt-8 justify-center items-start">
      {/*Initial report to consider motor test status*/}
      <Card className="flex flex-col justify-start items-center h-full w-2/3 p-2 ">
        <header className="flex flex-row justify-start  items-center  w-full ">
          <Button
            size="sm"
            className="mr-40"
            onClick={() => publishMessage("start")}
          >
            Iniciar prueba
          </Button>

          <Typography variant="h4" color="black">
            MDS-UPDRS Motor test
          </Typography>
        </header>

        {/* Mostrar la gráfica si plotData está disponible */}
        {plotData ? (
          <Plot
            data={[
              // Datos del acelerómetro
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
              // Datos del giroscopio
              {
                x: plotData.gyroscope.timestamps,
                y: plotData.gyroscope.x,
                type: "scatter",
                mode: "lines",
                name: "Giroscopio X",
                yaxis: "y2", // Usar eje Y secundario
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
              title: "Datos del Acelerómetro y Giroscopio",
              xaxis: {
                title: "Tiempo (s)",
              },
              yaxis: {
                title: "Aceleración (m/s²)",
              },
              yaxis2: {
                title: "Velocidad Angular (rad/s)",
                overlaying: "y",
                side: "right",
              },
              legend: {
                orientation: "h",
                y: -0.2,
              },
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <p>Esperando datos...</p>
        )}
      </Card>

      <Card className="flex flex-col justify-start items-center h-full w-1/3 ml-4 ">
        {/* */}

        <section className="flex flex-col justify-start items-center w-full h-1/4 ">
          <Typography variant="h4" color="black">
            Resumen
          </Typography>

          <Button
            size="lg"
            color="green"
            loading={false}
            className="w-2/3 m-auto"
          >
            Cargando
          </Button>
        </section>
        {/* */}

        <section className="flex flex-col justify-evenly items-center w-full h-2/4 px-2">
          <EditableTextField
            label="Nombre"
            text="Kevin Steven"
            onSave={{}}
          />
          <EditableTextField
            label="Apellido"
            text="Nieto Curaca"
            onSave={{}}
          />
          <EditableTextField label="Edad" text="19" onSave={{}} />
          <EditableTextField label="ID de Usuario" text="1114540734" onSave={{}} />
          <Select variant="outlined" label="Sexo" clas>
            <Option>Masculino</Option>
            <Option>Femenino</Option>
          </Select>{" "}
          <Select variant="outlined" label="Estado" clas>
            <Option>On</Option>
            <Option>Off</Option>
          </Select>
        </section>
        {/* */}

        <section className="w-full h-1/4 ">
          <div className="flex flex-row justify-evenly items-center w-full h-full">
            <Button variant="outlined" className="w-24">
              Reintentar
            </Button>
            <Button className="w-24 " variant="outlined">
              Aceptar
            </Button>
            <Button variant="outlined" className="w-24">
              Descartar
            </Button>
          </div>
        </section>
      </Card>
    </main>
  );
}
