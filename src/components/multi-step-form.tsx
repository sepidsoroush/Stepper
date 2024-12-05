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
    <div className="border p-4 rounded-xl dark:border-secondary/50">
      <StepperIndicator activeStep={activeStep} />
      {getStepContent(activeStep)}
      <div className="flex flex-row gap-4 justify-center items-center">
        <Button
          variant="outline"
          className="w-24 rounded-3xl dark:bg-foreground dark:text-secondary dark:hover:bg-primary/90 dark:hover:text-secondary"
          onClick={handleBack}
          disabled={activeStep === 1}
        >
          Back
        </Button>
        {activeStep === 3 ? (
          <Button
            className="w-24 rounded-3xl dark:bg-secondary dark:text-primary dark:hover:bg-secondary/90"
            onClick={() => console.log("Completed!")}
          >
            Done
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-24 rounded-3xl dark:bg-foreground dark:text-secondary dark:hover:bg-primary/90 dark:hover:text-secondary"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
export default MultiStepForm;
