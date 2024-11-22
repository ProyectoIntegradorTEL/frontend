import apiClient from "@/services/apiClient";
import { useEffect, useState } from "react";
import { EvaluatorCard } from "../card";
import { Spinner } from "@material-tailwind/react";
import { ErrorBlock } from "../blocks";
import { Link } from "react-router-dom";

export const EvaluatorList = () => {
  const [evaluators, setEvaluators] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvaluators = async () => {
    try {
      const response = await apiClient.get(`/evaluator`);
      console.log("obtenidos evaluators")
      setEvaluators(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Error al obtener los datos de los evaluadores");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluators();
  }, []);

  if (loading) return <Spinner className="h-24 w-24" color="blue" />;
  if (error) return <ErrorBlock error={error} />;

  const deleteEvaluator = async (id) => {
    try {
      await apiClient.delete(`/evaluator/${id}`);
      fetchEvaluators();
    } catch (error) {
      console.error("Error al eliminar el evaluador:", error);
    }
  };

  return (
    <>
    <div className="mb-12">
                <Link to={"/evaluator/create"}>
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Create Evaluator
                    </button>
                </Link>
            </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
      
      {evaluators &&
        evaluators.map((evaluator) => (
          <EvaluatorCard
            key={evaluator.id}
            evaluator={evaluator}
            onDelete={deleteEvaluator}
          />
        ))}
    </div>
    </>
    
  );
};

export default EvaluatorList;
