import { SellYourVehicleContext } from "@/context/sell-your-vehicle-context";
import { useContext } from "react";

export { FirstStep, SecondStep, ThirdStep, FourthStep };

function Nav({ disabled }) {
  const { step, updateStep } = useContext(SellYourVehicleContext);
  return (
    <div className="grid grid-cols-2 w-full bg-white py-2 ABSOLUTE bottom-2 px-2">
      {step > 1 ? (
        <div
          onClick={() => updateStep("prev")}
          className="cursor-pointer text-brandDarkGray font-semibold px-4 py-3 rounded"
        >
          Back
        </div>
      ) : (
        <div></div>
      )}
      <div className="flex justify-end">
        <button
          onClick={() => updateStep("next")}
          disabled={disabled}
          className={`bg-brandGreen w-max text-white font-semibold px-4 py-3 rounded disabled:bg-brandDarkGray ${
            step === 1 && "order-2"
          }`}
        >
          {step === 3 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}

function Input({ placeholder }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="bg-brandGray w-full rounded-lg h-12 focus:border-2 focus:border-brandGreen outline-none transition duration-150 px-3 text-sm"
    />
  );
}

function FirstStep() {
  return (
    <>
      {/* <div>FirstStep</div> */}
      <header className="text-center text-brandGreen flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Vehicle Information</h1>
        <p className="text-sm">
          Please provide information about your vehicle below
        </p>
      </header>

      <div className="bg-lime-100/50 p-2 text-sm rounded-lg mt-6 mb-2 w-full">
        <h4 className="text-brandGreen font-semibold text-xs">Featured:</h4>
        <p className="text-brandDarkGray font-semibold text-xs">
          Location, Vehicle Description, Rating, Next of Kin, Important Info,
          Vehicle Photos
        </p>
      </div>

      <form className="w-full flex flex-col gap-8">
        <Input placeholder={"Model"} />
        <Input placeholder={"Vehicle Brand"} />
        <Input placeholder={"Year"} />
        <Input placeholder={"Condition"} />
        <Input placeholder={"Chasis Number"} />
        <Input placeholder={"Color"} />
        <Input placeholder={"Paint"} />
      </form>

      {/* <input type="text" placeholder="Vehic"/> */}
      <Nav />
    </>
  );
}

function SecondStep() {
  return (
    <>
      <div>SecondStep</div>
      <Nav />
    </>
  );
}
function ThirdStep() {
  return (
    <>
      <div>ThirdStep</div>
      <Nav />
    </>
  );
}
function FourthStep() {
  return (
    <>
      <div>FourthStep</div>
    </>
  );
}
