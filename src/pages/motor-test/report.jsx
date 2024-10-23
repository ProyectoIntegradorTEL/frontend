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
import {  ImagePlacehoderSkeleton } from "@/widgets/skeleton";

export function Report() {

  /*--------------------------------------------------------------------*/

  //MQTT configuration

  const topicReceiver = "sender/Device082621";

  const topicTrigger = "trigger/Device082621";

  const { client, messages, setMessages } = useMQTT(topicReceiver);

  const { client: trigger, publishMessage: triggerPublishMessage } =useMQTT(topicTrigger);

  /*--------------------------------------------------------------------*/

  //Manage graph data

  const [processedData, setProcessedData] = useState(null); // Storages the processed data to plot

  const [plotData, setPlotData] = useState(null); // Storages the specific data to plot

  /*--------------------------------------------------------------------*/

  //Manage fetching process status

  const [status, setStatus] = useState("idle");


  /*--------------------------------------------------------------------*/

  // Effect to process the data received

  useEffect(() => {

    // Check if the last message is a '.', indicating the end of the JSON object storage on a string

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


  /*--------------------------------------------------------------------*/

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

      setStatus("success");
    }
  }, [processedData]);

  /*--------------------------------------------------------------------*/


  return (
    <main className="flex flex-row w-full h-full mt-8 justify-center items-start">
      {/*Initial report to consider motor test status*/}
      <Card className="flex flex-col justify-start items-center h-full w-2/3 p-2 ">
        <header className=" flex flex-row w-full  ">
          <Button
            size="sm"
            
             // Posiciona el botón a la izquierda
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

              // Acelerometer data

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
            style={{ width: "100%", height: "100%" }}
          />
        ) : (


            <div className="flex flex-col h-full w-full ">

              {/*Loading component*/}

              <ImagePlacehoderSkeleton/>


            </div>


        )}
      </Card>

      <Card className="flex flex-col justify-start items-center h-full w-1/3 ml-4 ">
        {/*Summary section */}

        <section className="flex flex-col justify-start items-center w-full h-1/4 ">
          <Typography variant="h4" color="black">
            Summary 
          </Typography>

          <Button
            size="lg"
            color={ status === "idle" ? "gray" : status === "success" ? "green" : status === "fetching" ? "blue" : "red"}
            loading={status === "fetching" ? true : false}
            className="w-2/3 m-auto"
          >
            {`Status: ${status}`}
          </Button>
        </section>
        {/* */}

        <section className="flex flex-col justify-evenly items-center w-full h-2/4 px-2">
          <EditableTextField label="Name" text="Kevin Steven" onSave={{}} />
          <EditableTextField label="Lastname" text="Nieto Curaca" onSave={{}} />
          <EditableTextField label="Age" text="19" onSave={{}} />
          <EditableTextField
            label="User ID"
            text="1114540734"
            onSave={{}}
          />
          <Select variant="outlined" label="Sex" clas>
            <Option>Male</Option>
            <Option>Female</Option>
          </Select>
          
          <Select variant="outlined" label="User state" clas>
            <Option>On</Option>
            <Option>Off</Option>
          </Select>
          <Select variant="outlined" label="Motor test" clas>
            <Option>Taconeo</Option>
            <Option>Zapateo</Option>
          </Select>
        </section>


        {/*Actions buttons */}

        <section className="w-full h-1/4 ">
          <div className="flex flex-row justify-evenly items-center w-full h-full">
            <Button variant="outlined" className="w-24 flex flex-col justify-center items-center">
              Retry
            </Button>
            <Button className="w-24 flex flex-col justify-center items-center " variant="outlined">
              Accept
            </Button>
            <Button variant="outlined" className="w-24 flex flex-col justify-center items-center">
              Cancel
            </Button>
          </div>
        </section>
      </Card>
    </main>
  );
}
