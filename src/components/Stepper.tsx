import { AnimatePresence, motion } from "framer-motion";
import { Fragment, ComponentProps, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Confetti from "@/components/ui/confetti";
import { RotateCcw } from "lucide-react";

const StepperDemo = () => {
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
    <div className="w-full h-[50vh] flex justify-center items-center">
      <div className="border p-4 rounded-xl dark:border-secondary/50 overflow-hidden mx-4 min-w-80 md:min-w-96 h-[270px] flex flex-col justify-between">
        {isCompleted ? (
          <CompletionView onRestart={handleRestart} />
        ) : (
          <>
            <StepperIndicator activeStep={activeStep} totalSteps={totalSteps} />

            <AnimatePresence initial={false}>
              <motion.div
                key={activeStep}
                initial={{ x: direction === "left" ? 300 : -300 }}
                animate={{ x: 0 }}
                transition={{
                  ease: "easeOut",
                  duration: 0.3,
                }}
              >
                {getStepContent(activeStep, totalSteps)}
              </motion.div>
            </AnimatePresence>

            <StepperButtons
              activeStep={activeStep}
              maxSteps={totalSteps}
              onNext={handleNext}
              onBack={handleBack}
              onDone={handleDone}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default StepperDemo;

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
        className="hover:text-emerald-500"
        href="mailto:s.soroush2012@gmail.com"
      >
        reach me
      </a>
      <span className="text-md"> if you have any questions.</span>
    </div>
    <Button
      variant="outline"
      className="absolute z-10 bottom-0 rounded-full dark:bg-foreground dark:text-secondary dark:hover:bg-primary/90 dark:hover:text-secondary"
      onClick={onRestart}
    >
      <RotateCcw size={14} />
    </Button>
  </motion.div>
);

// StepperButtons
interface StepperButtonsProps {
  activeStep: number;
  maxSteps: number;
  onNext: () => void;
  onBack: () => void;
  onDone: () => void;
}

const StepperButtons = ({
  activeStep,
  maxSteps,
  onNext,
  onBack,
  onDone,
}: StepperButtonsProps) => (
  <div className="flex flex-row gap-4 justify-center items-center">
    <Button
      variant="outline"
      className="w-24 rounded-3xl dark:bg-foreground dark:text-secondary dark:hover:bg-primary/90 dark:hover:text-secondary"
      onClick={onBack}
      disabled={activeStep === 1}
    >
      Back
    </Button>
    {activeStep === maxSteps ? (
      <Button
        className="w-24 rounded-3xl dark:bg-secondary dark:text-primary dark:hover:bg-secondary/90"
        onClick={onDone}
      >
        Done
      </Button>
    ) : (
      <Button
        variant="outline"
        className="w-24 rounded-3xl dark:bg-foreground dark:text-secondary dark:hover:bg-primary/90 dark:hover:text-secondary"
        onClick={onNext}
      >
        Next
      </Button>
    )}
  </div>
);

// StepperIndicator

interface StepperIndicatorProps {
  activeStep: number;
  totalSteps: number;
}

const StepperIndicator = ({
  activeStep,
  totalSteps,
}: StepperIndicatorProps) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <AnimatePresence initial={false}>
      <div className="flex justify-center items-center">
        {steps.map((step) => (
          <Fragment key={step}>
            <motion.div
              animate={{
                scale: step === activeStep ? 1.1 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className={cn(
                "w-8 h-8 md:w-10 md:h-10 flex justify-center items-center m-[5px] border-2 rounded-full dark:border-secondary/50 text-primary/50 dark:text-secondary/50",
                step < activeStep &&
                  "border-primary bg-primary dark:bg-secondary text-primary-foreground dark:text-primary",
                step === activeStep &&
                  "border-primary dark:border-secondary text-primary dark:text-secondary transition delay-300 ease-in-out duration-300"
              )}
            >
              {step >= activeStep ? step : <CheckIcon className="h-5 w-5" />}
            </motion.div>
            {step !== totalSteps && (
              <div className="relative w-24 h-[2px]">
                <div
                  className={cn(
                    "absolute inset-0 bg-border dark:bg-secondary dark:opacity-50"
                  )}
                />
                <motion.div
                  animate={{ width: step <= activeStep - 1 ? "100%" : "0%" }}
                  transition={{
                    type: "tween",
                    ease: "easeOut",
                    duration: 0.3,
                  }}
                  className={cn(
                    "absolute inset-0 bg-primary dark:bg-secondary"
                  )}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </AnimatePresence>
  );
};

function CheckIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.2,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

//DummyContent

const DummyContent = ({ step }: { step: number }) => {
  const divs = [
    { id: 1, width: "w-full" },
    { id: 2, width: "w-5/6" },
    { id: 3, width: "w-4/6" },
  ];

  const orderedDivs = [...divs];
  const startIndex = step - 1;
  const rotatedDivs = [
    ...orderedDivs.slice(startIndex),
    ...orderedDivs.slice(0, startIndex),
  ];

  return (
    <div className="my-8 space-y-4">
      {rotatedDivs.map((div) => (
        <div key={div.id} className={`rounded-md bg-muted h-4 ${div.width}`} />
      ))}
    </div>
  );
};

// useStepper hook
const useStepper = (maxSteps: number) => {
  const [activeStep, setActiveStep] = useState(1);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    setDirection("left");
    if (activeStep < maxSteps) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setDirection("right");
    if (activeStep > 1) setActiveStep((prev) => prev - 1);
  };

  const handleDone = () => setIsCompleted(true);

  const handleRestart = () => {
    setActiveStep(1);
    setIsCompleted(false);
  };

  return {
    activeStep,
    direction,
    isCompleted,
    handleNext,
    handleBack,
    handleDone,
    handleRestart,
  };
};
