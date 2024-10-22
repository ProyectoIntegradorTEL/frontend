import { useContext } from "react";
import { TrialContext } from "../../context";
import { trials } from "../../data";
export function MotorTest() {
  const { trial, setTrial } = useContext(TrialContext);

  setTrial(trials.taconeo);

  return (
    <div className="flex flex-col w-full h-full items-start justify-center">
      <div className="w-full h-full bg-black ">
      
      </div>
    </div>
  );
}
