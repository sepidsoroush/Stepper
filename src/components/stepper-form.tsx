import { AnimatePresence, motion } from "framer-motion";
import { useStepper } from "@/hooks/useStepper";
import { Button } from "./ui/button";
import Confetti from "./ui/confetti";
import StepperIndicator from "./stepper-indicator";
import DummyContent from "./dummy-content";
import StepperButtons from "./stepper-buttons";
import { RotateCcw } from "lucide-react";

const StepperForm = () => {
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
    <div className="border p-6 rounded-xl dark:border-secondary/50 overflow-hidden mx-4 min-w-80 md:min-w-96 min-h-[270px] flex flex-col justify-between">
      {isCompleted ? (
        <CompletionView onRestart={handleRestart} />
      ) : (
        <>
          <StepperIndicator activeStep={activeStep} totalSteps={totalSteps} />

          <div className="relative h-[200px] my-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStep}
                initial={{ x: direction === "left" ? 300 : -300, opacity: 0, position: "absolute", width: "100%" }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === "left" ? -300 : 300, opacity: 0 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.3,
                }}
                className="z-0"
              >
                {getStepContent(activeStep, totalSteps)}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10">
            <StepperButtons
              activeStep={activeStep}
              maxSteps={totalSteps}
              onNext={handleNext}
              onBack={handleBack}
              onDone={handleDone}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default StepperForm;

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
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="relative flex flex-col justify-between items-center h-full"
  >
    <Confetti style={{ width: 350, height: 200 }} />
    <div className="absolute mt-4 dark:text-secondary text-center">
      <p className="text-xl pb-4 font-semibold">Congratulations 🎉</p>
      <span className="text-md">
        I hope you have fun using this component. Please feel free to
      </span>{" "}
      <a
      target="_blank"
        className="hover:text-emerald-500"
        href="https://sepidev.vercel.app/"
      >
        reach me
      </a>
      <span className="text-md"> if you have any questions.</span>
    </div>
    <Button
      variant="outline"
      className="absolute z-10 w-10 bottom-0 p-4 rounded-full dark:bg-foreground dark:text-secondary dark:hover:bg-primary/90 dark:hover:text-secondary"
      onClick={onRestart}
    >
      <RotateCcw />
    </Button>
  </motion.div>
);
