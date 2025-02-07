// import StepperDemo from "./components/Stepper";
import StepperForm from "./components/stepper-form";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {/* Well-Structured Approach (Reusable & Maintainable) */}
      <StepperForm />

      {/* Single-file (Easy to Copy & Paste) */}
      {/* <StepperDemo /> */}
    </div>
  );
}

export default App;
