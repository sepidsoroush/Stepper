import { useState } from "react";

export const useStepper = (maxSteps: number) => {
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
