import { useState } from "react";
import apiClient from "@/services/apiClient";
import { Spinner } from "@material-tailwind/react";
import { ErrorBlock } from "../blocks";

const CreateEvaluator = () => {
  const [personalId, setPersonalId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const evaluatorDTO = {
      personalId,
      firstName,
      lastName,
      email,
    };

    setLoading(true);
    try {
      const response = await apiClient.post("/evaluator", evaluatorDTO);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Error al crear el evaluador");
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col py-8 items-center">
      <h1 className="text-3xl font-semibold mb-4">Crear Evaluador</h1>
      {error && <ErrorBlock error={error} />}
      <form
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="personalId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            ID Personal
          </label>
          <input
            type="text"
            id="personalId"
            value={personalId}
            onChange={(e) => setPersonalId(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nombre
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Apellido
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
            disabled={loading}
          >
            {loading ? (
              <Spinner className="h-6 w-6" color="white" />
            ) : (
              "Crear Evaluador"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvaluator;
