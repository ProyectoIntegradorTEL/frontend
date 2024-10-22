import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Checkbox,
    Button,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";
import { Link, useNavigate, } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { project_pic } from "../../data";
import { DateInputLabel, TextInputLabel } from "../../widgets/textInputs";
import { TrialContext } from "../../context";


export function PatientForm() {
    // Context
    const { setUser } = useContext(TrialContext);

    //React hoooks
    const navigate = useNavigate();

    //Info status
    const [error, setError] = useState(null);

    //Form states
    const [isNewPatient, setIsNewPatient] = useState(true);

    // User States
    const [personalId, setPersonalId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isOn, setIsOn] = useState(false);

    // Company States



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
    }, [setUser, personalId, firstName, lastName, gender, birthDate, email, phone, isOn, isNewPatient]);




    const handleSubmit = async (e) => {
        e.preventDefault();
    };


    return (
        <section className={`w-full h-full ${isNewPatient ? "mt-52 mb-32" : ""} flex flex-row py-8 px-8 `}>
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
                                <Tab key={"New"} value={"New"} onClick={() => setIsNewPatient(true)}>
                                    New patient
                                </Tab>
                                <Tab key={"Old"} value={"Old"} onClick={() => setIsNewPatient(false)}>
                                    Registered patient
                                </Tab>
                            </TabsHeader>
                        </Tabs>
                        <TextInputLabel
                            label="Personal ID"
                            placeholder="Personal ID"
                            value={personalId}
                            onValueChange={setPersonalId}
                        />
                        {isNewPatient &&
                            <>
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
                                    <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
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
                                {/* Birth date */}
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
                            </>
                        }

                        <div className="mb-1 flex flex-col gap-4">
                            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                                On/Off
                            </Typography>
                            <Tabs value={isOn ? "On" : "Off"}>
                                <TabsHeader>
                                    <Tab
                                        key={"Off"}
                                        value={"Off"}
                                        onClick={() => setIsOn(false)}
                                    >
                                        Off
                                    </Tab>
                                    <Tab
                                        key={"On"}
                                        value={"On"}
                                        onClick={() => setIsOn(true)}
                                    >
                                        On
                                    </Tab>
                                </TabsHeader>
                            </Tabs>
                        </div>

                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center justify-start font-medium"
                            >
                                I agree the&nbsp;
                                <p
                                    className="font-normal text-black transition-colors hover:text-gray-900 underline"
                                >
                                    Terms and Conditions
                                </p>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    {/* <Button
                        className="mt-6"
                        fullWidth
                        color="blue"
                        type="submit"
                    >
                        Complete
                    </Button> */}
                    {error && (
                        <Typography variant="small" color="red" className="mt-2">
                            {error}
                        </Typography>
                    )}
                </form>
            </div>
        </section>
    );
}

export default PatientForm;
