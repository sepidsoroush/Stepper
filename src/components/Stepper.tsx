import { AnimatePresence, motion } from "framer-motion";
import { Fragment, ComponentProps, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Confetti from "@/components/ui/confetti";
import { RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    </div>
  );
};

export default StepperDemo;

interface StepperIndicatorProps {
  activeStep: number;
  totalSteps: number;
}

const stepTitles = ["Personal", "Contact", "Account"];

function getStepContent(step: number, totalSteps: number) {
  if (step > 0 && step <= totalSteps) {
    return <DummyContent step={step} />;
  }
  return "Unknown step";
}

const StepperIndicator = ({
  activeStep,
  totalSteps,
}: StepperIndicatorProps) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <AnimatePresence initial={false}>
      <div className="flex justify-center items-start">
        {steps.map((step) => (
          <Fragment key={step}>
            <div className="flex flex-col items-center">
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
              <motion.span
                animate={{
                  scale: step === activeStep ? 1.1 : 1,
                  opacity: step <= activeStep ? 1 : 0.5,
                }}
                className="text-xs mt-1 font-medium text-primary/80 dark:text-secondary/80"
              >
                {stepTitles[step - 1]}
              </motion.span>
            </div>
            {step !== totalSteps && (
              <div className="relative w-24 h-[2px] mt-6">
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
      className="absolute z-10 bottom-0 rounded-full dark:bg-foreground dark:text-secondary dark:hover:bg-primary/90 dark:hover:text-secondary"
      onClick={onRestart}
    >
      <RotateCcw size={14} />
    </Button>
  </motion.div>
);

interface DummyContentProps {
  step: number;
}

const DummyContent = ({ step }: DummyContentProps) => {
  switch (step) {
    case 1:
      return (
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-primary dark:text-secondary">First Name</Label>
            <Input 
              id="firstName" 
              placeholder="Enter your first name" 
              className="bg-background dark:bg-foreground dark:text-secondary placeholder:text-muted-foreground dark:placeholder:text-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-primary dark:text-secondary">Last Name</Label>
            <Input 
              id="lastName" 
              placeholder="Enter your last name" 
              className="bg-background dark:bg-foreground dark:text-secondary placeholder:text-muted-foreground dark:placeholder:text-secondary/50"
            />
          </div>
        </div>
      );
    case 2:
      return (
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-primary dark:text-secondary">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              className="bg-background dark:bg-foreground dark:text-secondary placeholder:text-muted-foreground dark:placeholder:text-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-primary dark:text-secondary">Phone</Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="Enter your phone number" 
              className="bg-background dark:bg-foreground dark:text-secondary placeholder:text-muted-foreground dark:placeholder:text-secondary/50"
            />
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-primary dark:text-secondary">Username</Label>
            <Input 
              id="username" 
              placeholder="Choose a username" 
              className="bg-background dark:bg-foreground dark:text-secondary placeholder:text-muted-foreground dark:placeholder:text-secondary/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-primary dark:text-secondary">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Choose a password" 
              className="bg-background dark:bg-foreground dark:text-secondary placeholder:text-muted-foreground dark:placeholder:text-secondary/50"
            />
          </div>
        </div>
      );
    default:
      return <div>Unknown step</div>;
  }
};

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

function useStepper(maxSteps: number) {
  const [activeStep, setActiveStep] = useState(1);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (activeStep < maxSteps) {
      setDirection("left");
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setDirection("right");
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleDone = () => {
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setIsCompleted(false);
    setActiveStep(1);
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
}
