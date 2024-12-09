import { Button } from "./ui/button";

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

export default StepperButtons;
