import { motion } from "framer-motion";
import { useStepper } from "@/hooks/useStepper";
import { Button } from "./ui/button";
import Confetti from "./ui/confetti";
import StepperIndicator from "./stepper-indicator";
import DummyContent from "./dummy-content";
import StepperButtons from "./stepper-buttons";
import { RotateCcw } from "lucide-react";

const MultiStepForm = () => {
  const totalSteps = 3;

  const {
    activeStep,
    direction,
    isCompleted,
    handleNext,
    handleBack,
    handleDone,
    handleRestart,
  } = useStepper(totalSteps);

  return (
    <div className="border p-4 rounded-xl dark:border-secondary/50 overflow-hidden">
      {isCompleted ? (
        <CompletionView onRestart={handleRestart} />
      ) : (
        <div>
          <StepperIndicator activeStep={activeStep} totalSteps={totalSteps} />
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
            {getStepContent(activeStep, totalSteps)}
          </motion.div>
          <StepperButtons
            activeStep={activeStep}
            maxSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            onDone={handleDone}
          />
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;

function getStepContent(step: number, totalSteps: number) {
  if (step > 0 && step <= totalSteps) {
    return <DummyContent step={step} />;
  }
  return "Unknown step";
}

const CompletionView = ({ onRestart }: { onRestart: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="relative flex flex-col justify-center items-center p-4"
  >
    <Confetti />
    <div className="absolute top-0 mt-4 text-md dark:text-secondary text-center">
      I hope you have fun using this component. Please feel free to reach me at{" "}
      <a
        className="hover:text-emerald-500"
        href="mailto:s.soroush2012@gmail.com"
      >
        s.soroush2012@gmail.com
      </a>
    </div>
    <Button
      variant="outline"
      className="z-10 w-10 p-4 rounded-full dark:bg-foreground dark:text-secondary dark:hover:bg-primary/90 dark:hover:text-secondary"
      onClick={onRestart}
    >
      <RotateCcw />
    </Button>
  </motion.div>
);
