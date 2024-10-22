import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { FeatureCard } from "../../widgets/card";
import { useNavigate } from "react-router-dom";

export function Homepage() {
    const navigate = useNavigate();
    const backgroundImage = "https://i.pinimg.com/564x/ae/f6/17/aef6170679bdead47b720fd69615d286.jpg";
    return (
        <div className="w-screen h-full bg-gray-50">
            {/* Hero Section */}
            <div className="mt-2 relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-center">
                <div
                    className="bg-cover bg-gradient-to-r from-green-200 via-blue-200 to-green-200 w-full h-full absolute top-0 left-0"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                <div className="z-10 max-w-3xl text-white">
                    <Typography variant="h1" className="text-5xl font-bold mb-6">
                        Health Sentinel
                    </Typography>
                    <Typography variant="lead" className="text-xl mb-8">
                        Collecting data through advanced motor testing to contribute PD research.
                    </Typography>
                    <Button
                        size="lg"
                        color="blue"
                        onClick={() => navigate("/step/guides")} // Reemplazar con la ruta de la prueba
                    >
                        Get Started
                    </Button>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <Typography variant="h2" className="text-3xl font-bold mb-10">
                        Why trust Health Sentinel?
                    </Typography>
                    <div className="flex flex-wrap justify-center gap-8">
                        <FeatureCard
                            title="Precise Motor Testing"
                            description="We follow the MDS-UPDRS protocols to ensure precise and reliable results."
                            icon="🧠"
                        />
                        <FeatureCard
                            title="Contribute to Research"
                            description="Our technology helps characterize PD motor signs ."
                            icon="⌛"
                        />
                        <FeatureCard
                            title="Data-Driven Insights"
                            description="We show your results to give you the insights you need to make informed decisions."
                            icon="📊"
                        />
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto text-center">
                    <Typography variant="h2" className="text-3xl font-bold mb-10">
                        How it Works
                    </Typography>
                    <div className="flex flex-wrap justify-around gap-6">
                        <div className="w-1/3 p-4">
                            <Typography variant="h4" className="font-bold mb-4">
                                Step 1: Register
                            </Typography>
                            <Typography className="text-gray-600">
                                Create an account to access the motor tests.
                            </Typography>
                        </div>
                        <div className="w-1/3 p-4">
                            <Typography variant="h4" className="font-bold mb-4">
                                Step 2: Perform Tests
                            </Typography>
                            <Typography className="text-gray-600">
                                Use our guided system to complete the motor skill tests.
                            </Typography>
                        </div>
                        <div className="w-1/3 p-4">
                            <Typography variant="h4" className="font-bold mb-4">
                                Step 3: Get Results
                            </Typography>
                            <Typography className="text-gray-600">
                                Review your personalized insights and recommendations.
                            </Typography>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-gray-800 text-white text-center">
                <div className="max-w-6xl mx-auto">
                    <Typography variant="h6" className="mb-4">
                        Health Sentinel © 2024
                    </Typography>
                    <div className="flex justify-center gap-4">
                        <a href="#" className="text-white">Contact Us</a>
                        <a href="#" className="text-white">Privacy Policy</a>
                        <a href="#" className="text-white">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Homepage;
