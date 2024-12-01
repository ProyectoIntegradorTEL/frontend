/* eslint-disable */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Button, Spinner } from "@material-tailwind/react";
import Plot from "react-plotly.js";
import apiClient from "@/services/apiClient";
import axios from 'axios';

export function AnalyticsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stage, setStage] = useState('initial'); // Para saber en qué parte del proceso estamos

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setStage('loading');
        const url = `/evaluation/${id}/analyze`;
        console.log("Calling URL:", url);
        
        const analysisResponse = await apiClient.post(url);
        console.log("Analysis response:", analysisResponse);
        
        setAnalyticsData(analysisResponse.data);
        setStage('complete');
      } catch (error) {
        console.error("Full error object:", error);
        console.error("Error response:", error.response);
        console.error("Error message:", error.message);
        setError(error.response?.data || error.message);
        setStage('error');
      } finally {
        setLoading(false);
      }
    };
  
    fetchAnalytics();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <Spinner className="h-12 w-12" />
        <Typography variant="h6">
          {stage === 'loading' && 'Cargando datos de la evaluación...'}
          {stage === 'parsing' && 'Procesando datos de sensores...'}
          {stage === 'analyzing' && 'Analizando señales...'}
        </Typography>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <Typography variant="h4" color="red" className="mb-4">
          Error al cargar el análisis
        </Typography>
        <Typography color="gray" className="mb-4 text-center">
          {error}
        </Typography>
        <Button color="blue" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>
    );
  }

  // No Data State
  if (!analyticsData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <Typography variant="h4" className="mb-4">
          No hay datos disponibles
        </Typography>
        <Typography color="gray" className="mb-4">
          No se encontraron datos para analizar
        </Typography>
        <Button color="blue" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>
    );
  }

  // Success State with Data
  return (
    <main className="flex flex-col w-full p-4 gap-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
        <Typography variant="h3">Análisis detallado</Typography>
        <Button color="blue" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>

      {/* FFT Analysis */}
      <Card className="p-4">
        <Typography variant="h4" className="mb-4">
          Análisis de frecuencia
        </Typography>
        <Plot
          data={[
            {
              x: analyticsData.fft.frequency,
              y: analyticsData.fft.spectrum,
              type: "scatter",
              mode: "lines",
              name: "FFT Spectrum",
            },
          ]}
          layout={{
            title: "Espectro de Frecuencia",
            xaxis: { title: "Frecuencia (Hz)" },
            yaxis: { title: "Amplitud" },
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "400px" }}
        />
      </Card>

      {/* Autocorrelation Analysis */}
      <Card className="p-4">
        <Typography variant="h4" className="mb-4">
          Análisis de autocorrelación
        </Typography>
        <Plot
          data={[
            {
              x: analyticsData.autocorrelation.lags,
              y: analyticsData.autocorrelation.autocorr_normalized,
              type: "scatter",
              mode: "lines",
              name: "Autocorrelación",
            },
          ]}
          layout={{
            title: "Autocorrelación de la señal",
            xaxis: { title: "Lags" },
            yaxis: { title: "Autocorrelación" },
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "400px" }}
        />
      </Card>

      {/* Clinical Metrics */}
      <Card className="p-4">
        <Typography variant="h4" className="mb-4">
          Métricas clínicas
        </Typography>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg bg-white">
            <Typography variant="h6">Bradicinesia</Typography>
            <Typography>
              {(analyticsData.clinical_metrics.bradykinesia_score * 100).toFixed(2)}%
            </Typography>
          </div>
          <div className="p-4 border rounded-lg bg-white">
            <Typography variant="h6">Temblor</Typography>
            <Typography>
              {(analyticsData.clinical_metrics.tremor_score).toFixed(2)}
            </Typography>
          </div>
          <div className="p-4 border rounded-lg bg-white">
            <Typography variant="h6">Irregularidad</Typography>
            <Typography>
              {(analyticsData.clinical_metrics.irregularity_score).toFixed(2)}
            </Typography>
          </div>
          <div className="p-4 border rounded-lg bg-white">
            <Typography variant="h6">Asimetría</Typography>
            <Typography>
              {(analyticsData.clinical_metrics.asymmetry_score * 100).toFixed(2)}%
            </Typography>
          </div>
        </div>
      </Card>

      {/* Correlations */}
      <Card className="p-4">
        <Typography variant="h4" className="mb-4">
          Correlaciones entre ejes
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(analyticsData.correlations).map(([key, value]) => (
            <div key={key} className="p-4 border rounded-lg bg-white">
              <Typography variant="h6">{`Correlación ${key}`}</Typography>
              <Typography>{`${(value.correlation * 100).toFixed(2)}%`}</Typography>
              <Typography
                color={value.significance === "significant" ? "green" : "red"}
                variant="small"
              >
                {value.significance}
              </Typography>
            </div>
          ))}
        </div>
      </Card>

      {/* Movement Analysis */}
      <Card className="p-4">
        <Typography variant="h4" className="mb-4">
          Análisis de movimiento
        </Typography>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(analyticsData.movement_analysis).map(([key, value]) => (
            <div key={key} className="p-4 border rounded-lg bg-white">
              <Typography variant="h6">
                {key.replace(/_/g, " ").toUpperCase()}
              </Typography>
              <Typography>{value.toFixed(4)}</Typography>
            </div>
          ))}
        </div>
      </Card>

      {/* Original Metrics */}
      <Card className="p-4">
        <Typography variant="h4" className="mb-4">
          Otras métricas
        </Typography>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(analyticsData.original_metrics).map(([key, value]) => (
            <div key={key} className="p-4 border rounded-lg bg-white">
              <Typography variant="h6">
                {key.replace(/_/g, " ").toUpperCase()}
              </Typography>
              <Typography>{value.toFixed(4)}</Typography>
            </div>
          ))}
        </div>
      </Card>

      {/* Wavelet Analysis */}
      <Card className="p-4">
        <Typography variant="h4" className="mb-4">
          Análisis Wavelet
        </Typography>
        <Plot
          data={[
            {
              z: analyticsData.wavelet.coefficients,
              x: analyticsData.wavelet.frequencies,
              y: analyticsData.wavelet.scales,
              type: "heatmap",
              colorscale: "Viridis",
            },
          ]}
          layout={{
            title: "Transformada Wavelet",
            xaxis: { title: "Frecuencia (Hz)" },
            yaxis: { title: "Escala" },
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "400px" }}
        />
      </Card>
    </main>
  );
}