import {
    Tabs,
    Tab,
    TabsHeader,
    Checkbox,
    Button,
    Typography,
    Select,
    Option,
  } from "@material-tailwind/react";
  import { Link, useNavigate } from "react-router-dom";
  import { useContext, useEffect, useState } from "react";
  import { project_pic } from "../../data";
  import { DateInputLabel, TextInputLabel } from "../../widgets/textInputs";
  import { TrialContext } from "../../context";
  import axios from "axios";
  import Cookies from "js-cookie"; // Asegúrate de instalar 'js-cookie'
  
  export function PatientForm() {
    const { setUser } = useContext(TrialContext);
    const navigate = useNavigate();
  
    const [error, setError] = useState(null);
    const [isNewPatient, setIsNewPatient] = useState(true);
  
    const [personalId, setPersonalId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isOn, setIsOn] = useState(false);
    const [registeredMessage, setRegisteredMessage] = useState("");
  
    useEffect(() => {
      const userData = {
        personalId,
        firstName,
        lastName,
        gender,
        birthDate,
        email,
        phone,
        isOn,
        isNewPatient,
      };
      setUser(userData);
    }, [
      setUser,
      personalId,
      firstName,
      lastName,
      gender,
      birthDate,
      email,
      phone,
      isOn,
      isNewPatient,
    ]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = Cookies.get("authToken"); // Obtén el token de las cookies
  
        const response = await axios.post(
          "http://localhost:8080/patient",
          {
            personalId,
            firstName,
            lastName,
            gender,
            birthDate,
            email,
            phone,
          }
        );
  
        if (response.status === 201) {
          alert("Patient data submitted successfully!");
          // navigate("/"); // Redirige al home o a donde prefieras
        }
      } catch (error) {
        console.error("Failed to submit patient data:", error);
        setError("Failed to submit data. Please try again.");
      }
    };
  
    const handleTabChange = (tab) => {
      setIsNewPatient(tab === "New");
      if (tab === "Old") {
        setRegisteredMessage("You can continue");
      } else {
        setRegisteredMessage("");
      }
    };
  
    return (
      <section
        className={`w-full h-full ${isNewPatient ? "mt-52 mb-32" : ""} flex flex-row py-8 px-8`}
      >
        <div className="w-2/5 h-screen hidden lg:block lg:ml-24">
          <img
            src={project_pic}
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center m-4">
            <Typography variant="h2" color="blue" className="font-bold">
              Fill up the form
            </Typography>
          </div>
          <div className="flex flex-col items-center mt-4">
            <Typography variant="h5" color="blue-gray">
              Fill the following fields to complete the patient data.
            </Typography>
          </div>
          <form
            className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Tabs value={isNewPatient ? "New" : "Old"}>
                <TabsHeader>
                  <Tab
                    key={"New"}
                    value={"New"}
                    onClick={() => handleTabChange("New")}
                  >
                    New patient
                  </Tab>
                  <Tab
                    key={"Old"}
                    value={"Old"}
                    onClick={() => handleTabChange("Old")}
                  >
                    Registered patient
                  </Tab>
                </TabsHeader>
              </Tabs>
              {isNewPatient && (
                <>
                <TextInputLabel
                label="Personal ID"
                placeholder="Personal ID"
                value={personalId}
                onValueChange={setPersonalId}
              />
                  <TextInputLabel
                    label="First name"
                    placeholder="First name"
                    value={firstName}
                    onValueChange={setFirstName}
                  />
                  <TextInputLabel
                    label="Last name"
                    placeholder="Last name"
                    value={lastName}
                    onValueChange={setLastName}
                  />
                  <div className="mb-1 flex flex-col gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="-mb-3 font-medium"
                    >
                      Gender
                    </Typography>
                    <Select
                      label="Pick your gender"
                      value={gender}
                      onChange={(value) => setGender(value)}
                    >
                      <Option key={"Male"} value={"Male"}>
                        Hombre
                      </Option>
                      <Option key={"Female"} value={"Female"}>
                        Mujer
                      </Option>
                    </Select>
                  </div>
                  <DateInputLabel
                    label="Birth date"
                    placeholder="Birth date"
                    value={birthDate}
                    onValueChange={setBirthDate}
                  />
                  <TextInputLabel
                    label="Email"
                    placeholder="email@example.com"
                    value={email}
                    onValueChange={setEmail}
                  />
                  <TextInputLabel
                    label="Phone number"
                    placeholder="Phone number"
                    value={phone}
                    onValueChange={setPhone}
                  />
                  <div className="mb-1 flex flex-col gap-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  On/Off
                </Typography>
                <Tabs value={isOn ? "On" : "Off"}>
                  <TabsHeader>
                    <Tab key={"Off"} value={"Off"} onClick={() => setIsOn(false)}>
                      Off
                    </Tab>
                    <Tab key={"On"} value={"On"} onClick={() => setIsOn(true)}>
                      On
                    </Tab>
                  </TabsHeader>
                </Tabs>
                <Button className="mt-6" fullWidth color="blue" type="submit">
              Submit Patient Data
            </Button>
            {error && (
              <Typography variant="small" color="red" className="mt-2">
                {error}
              </Typography>
            )}
            </div>
                </>
              )}
              {registeredMessage && (
                <Typography variant="small" color="green" className="mt-2">
                  {registeredMessage}
                </Typography>
              )}
              
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center justify-start font-medium"
                >
                  I agree to the&nbsp;
                  <p className="font-normal text-black hover:underline">
                    Terms and Conditions
                  </p>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
          </form>
        </div>
      </section>
    );
  }
  
  export default PatientForm;
  