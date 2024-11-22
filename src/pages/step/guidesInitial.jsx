import React, { useState } from "react";
import { Typography, Card } from "@material-tailwind/react";

export function GuideInitial() {
  const [selected, setSelected] = useState(null);

  const handleSelection = (type) => {
    const value = type === "Zapateo" ? "1" : "2";
    localStorage.setItem("evaluation_type", value);
    setSelected(type); // Establecer el botón seleccionado
  };

  return (
    <>
      <div className="w-full h-full flex flex-col py-8 items-center">
        <Typography variant="h1">Guides</Typography>
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => handleSelection("Taconeo")}
            className={`px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none ${selected === "Taconeo"
              ? "bg-blue-600 text-white"
              : "bg-blue-200 text-white hover:bg-blue-300"
              }`}
          >
            Taconeo
          </button>
          <button
            onClick={() => handleSelection("Zapateo")}
            className={`px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none ${selected === "Zapateo"
              ? "bg-blue-600 text-white"
              : "bg-blue-200 text-white hover:bg-blue-300"
              }`}
          >
            Zapateo
          </button>
        </div>
      </div>


      <div className="w-full h-auto bg-gray-50 py-16 flex flex-col items-center">
        <Typography variant="h2" className="text-center mb-12">
          Advanced Motor Testing
        </Typography>

        <div className="flex justify-between w-4/5 gap-8">
          {/* Card 1 */}
          <Card className="w-1/2 bg-white shadow-lg">
            <img
              // src="https://i.pinimg.com/564x/31/f1/26/31f1265f51476155099b957c6124c3b7.jpg"
              src="https://stanfordmedicine25.stanford.edu/the25/parkinsondisease/_jcr_content/main/panel_builder_0/panel_0/panel_builder/panel_0/panel_builder_945245608/panel_0/panel_builder/panel_0/image.img.476.high.png/6..png"
              alt="Motor Test 1"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <Typography variant="h5" className="font-bo
                        ld mb-2">
                Test 1: Toe Tapping
              </Typography>
              <Typography className="text-gray-600">
                A repetitive movement where the patient alternates striking the floor with the toes, assessing foot agility and speed. This test helps quantify deficits in motor function, particularly related to slowness of movement and decreased amplitude commonly seen in Parkinsonian gait disorders.
              </Typography>
            </div>
          </Card>

          {/* Card 2 */}
          <Card className="w-1/2 bg-white shadow-lg">
            <img
              src="https://www.physio-pedia.com/images/thumb/3/37/Foot_tapping.png/300px-Foot_tapping.png"
              alt="Motor Test 2"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <Typography variant="h5" className="font-bold mb-2">
                Test 2: Foot Tapping
              </Typography>
              <Typography className="text-gray-600">
                A clinical assessment where the patient taps the ground repeatedly with the toes, while maintaining the heel in place. This evaluates bradykinesia, coordination, and fine motor control in the lower extremities, providing insight into motor impairment progression in Parkinson's disease.
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    </>

  );
}

export default GuideInitial;
