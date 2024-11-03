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
import { useContext, useEffect, useState } from "react";
import { project_pic } from "../../data";
import { DateInputLabel, TextInputLabel } from "../../widgets/textInputs";
import { TrialContext } from "../../context";
import axios from "axios";
import Cookies from "js-cookie"; 

export function PatientForm() {
  const { setUser } = useContext(TrialContext);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState(""); // ID a buscar
  const [patientFound, setPatientFound] = useState(null); // Datos del paciente encontrado
  const [showForm, setShowForm] = useState(false); // Mostrar formulario si no se encuentra el paciente

  // Estados para el formulario de creación
  const [personalId, setPersonalId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Buscar paciente por ID
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/patient/${searchId}`);
      setPatientFound(response.data);
    } catch (error) {
      console.error("Patient not found:", error);
      setPatientFound(null);
      setShowForm(true); // Muestra el formulario si no se encuentra
    }
  };

  const handleCreatePatient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/patient", {
        personalId,
        firstName,
        lastName,
        gender,
        birthDate,
        email,
        phone,
      });
      alert("Patient created successfully!");
      setUser({ personalId }); // Guarda el ID en el contexto
    } catch (error) {
      console.error("Error creating patient:", error);
      setError("Failed to create patient. Please try again.");
    }
  };

  const handleSelectPatient = () => {
    setUser({ personalId: patientFound.personalId }); // Guarda el ID del paciente encontrado
  };

  return (
    <section className="w-full h-full flex flex-row py-8 px-8">
      <div className="w-2/5 h-screen hidden lg:block lg:ml-24">
        <img src={project_pic} className="h-full w-full object-cover rounded-3xl" />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <Typography variant="h2" color="blue" className="font-bold">
          Search or Register Patient
        </Typography>
        <div className="mt-8 mb-4 w-80">
          <TextInputLabel
            label="Search by Personal ID"
            placeholder="Enter Personal ID"
            value={searchId}
            onValueChange={setSearchId}
          />
          <Button onClick={handleSearch} fullWidth color="blue" className="mt-4">
            Search
          </Button>
        </div>

        {patientFound ? (
          <div className="mt-4">
            <Typography variant="h5" color="green">
              Patient Found: {patientFound.firstName} {patientFound.lastName}
            </Typography>
            <Button onClick={handleSelectPatient} fullWidth color="green" className="mt-4">
              Select Patient
            </Button>
          </div>
        ) : (
          showForm && (
            <form onSubmit={handleCreatePatient} className="mt-8 w-80">
              <TextInputLabel label="Personal ID" value={personalId} onValueChange={setPersonalId} />
              <TextInputLabel label="First Name" value={firstName} onValueChange={setFirstName} />
              <TextInputLabel label="Last Name" value={lastName} onValueChange={setLastName} />
              <Select label="Gender" value={gender} onChange={(value) => setGender(value)}>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
              <DateInputLabel label="Birth Date" value={birthDate} onValueChange={setBirthDate} />
              <TextInputLabel label="Email" value={email} onValueChange={setEmail} />
              <TextInputLabel label="Phone" value={phone} onValueChange={setPhone} />
              <Button type="submit" fullWidth color="blue" className="mt-6">
                Create Patient
              </Button>
            </form>
          )
        )}
        {error && (
          <Typography variant="small" color="red" className="mt-2">
            {error}
          </Typography>
        )}
      </div>
    </section>
  );
}

export default PatientForm;