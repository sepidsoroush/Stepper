import { Fragment, ComponentProps } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
export default StepperIndicator;

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
