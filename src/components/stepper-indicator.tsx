import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperIndicatorProps {
  activeStep: number;
}

const StepperIndicator = ({ activeStep }: StepperIndicatorProps) => {
  return (
    <div className="flex justify-center items-center">
      {[1, 2, 3].map((step) => (
        <Fragment key={step}>
          <div
            className={cn(
              "w-[40px] h-[40px] flex justify-center items-center m-[5px] border-2 rounded-full dark:border-secondary/50 text-primary/50 dark:text-secondary/50",
              step < activeStep &&
                "border-primary bg-primary dark:bg-secondary text-primary-foreground dark:text-primary",
              step === activeStep &&
                "border-primary dark:border-secondary text-primary dark:text-secondary"
            )}
          >
            {step >= activeStep ? step : <Check className="h-5 w-5" />}
          </div>
          {step !== 3 && (
            <Separator
              orientation="horizontal"
              className={cn(
                "w-[100px] h-[2px] dark:bg-secondary dark:opacity-50",
                step <= activeStep - 1 &&
                  "bg-primary dark:bg-secondary dark:opacity-100"
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};
export default StepperIndicator;
