import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Confetti from "./ui/confetti";
import DummyContent from "./dummy-content";
import StepperIndicator from "./stepper-indicator";
import { RotateCcw } from "lucide-react";

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
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = async () => {
    setDirection("left");
    if (activeStep < 3) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setDirection("right");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDone = () => {
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setActiveStep(1);
    setIsCompleted(false);
  };

  return (
    <div className="border p-4 rounded-xl dark:border-secondary/50 overflow-hidden">
      {isCompleted ? (
        <div className="relative flex flex-col flex-wrap justify-center items-center">
          <Confetti />
          <div className="absolute top-0 mt-4 text-md dark:text-secondary text-center">
            I hope you have fun using this component. Please feel free to reach
            me at s.soroush2012@gmail.com
          </div>
          <Button
            variant="outline"
            className="z-10 w-10 p-4 rounded-full dark:bg-foreground dark:text-secondary dark:hover:bg-primary/90 dark:hover:text-secondary"
            onClick={handleRestart}
          >
            <RotateCcw />
          </Button>
        </div>
      ) : (
        <div>
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
                onClick={handleDone}
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
      )}
    </div>
  );
};
export default MultiStepForm;
