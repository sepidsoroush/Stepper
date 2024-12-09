import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import DummyContent from "./dummy-content";
import StepperIndicator from "./stepper-indicator";

function getStepContent(step: number) {
  switch (step) {
    case 1:
      return <DummyContent step={1} />;
    case 2:
      return <DummyContent step={2} />;
    case 3:
      return <DummyContent step={3} />;
    default:
      return "Unknown step";
  }
}

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [direction, setDirection] = useState<"left" | "right">("left"); // Track direction

  const handleNext = async () => {
    setDirection("left");
    if (activeStep < 3) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setDirection("right");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="border p-4 rounded-xl dark:border-secondary/50 overflow-hidden">
      <StepperIndicator activeStep={activeStep} />
      <motion.div
        key={activeStep}
        initial={{ x: direction === "left" ? 300 : -300 }}
        animate={{ x: 0 }}
        exit={{ x: direction === "left" ? -300 : 300 }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
      >
        {getStepContent(activeStep)}
      </motion.div>
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
