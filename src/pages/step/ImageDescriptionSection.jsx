import { Typography, Card } from "@material-tailwind/react";

export function ImageDescriptionSection() {
    return (
        <div className="w-full h-auto bg-gray-50 py-16 flex flex-col items-center">
            <Typography variant="h2" className="text-center mb-12">
                Advanced Motor Testing
            </Typography>

            <div className="flex justify-between w-4/5 gap-8">
                {/* Card 1 */}
                <Card className="w-1/2 bg-white shadow-lg">
                    <img
                        // src="https://i.pinimg.com/564x/31/f1/26/31f1265f51476155099b957c6124c3b7.jpg"
                        src="/img/LegsAbility.jpeg"
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
                        src="/img/ToeTapping.jpeg"
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
    );
}

export default ImageDescriptionSection;
