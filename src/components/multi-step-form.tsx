import { useState } from "react";
import { Button } from "./ui/button";
import DummyForm from "./dummy-form";
import StepperIndicator from "./stepper-indicator";

function getStepContent(step: number) {
  switch (step) {
    case 1:
      return <DummyForm />;
    case 2:
      return <DummyForm />;
    case 3:
      return <DummyForm />;
    default:
      return "Unknown step";
  }
}
const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const handleNext = async () => {
    if (activeStep < 3) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <div className="border p-4 rounded-xl">
      <StepperIndicator activeStep={activeStep} />
      {getStepContent(activeStep)}
      <div className="flex justify-center space-x-[20px]">
        <Button
          type="button"
          className="w-[100px]"
          variant="secondary"
          onClick={handleBack}
          disabled={activeStep === 1}
        >
          Back
        </Button>
        {activeStep === 3 ? (
          <Button
            className="w-[100px]"
            type="button"
            onClick={() => console.log("Completed!")}
          >
            Done
          </Button>
        ) : (
          <Button type="button" className="w-[100px]" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
export default MultiStepForm;
