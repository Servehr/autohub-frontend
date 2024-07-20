import React, { createContext, useState } from "react";

export const SellYourVehicleContext = createContext(null);

function SellYourVehicleProvider({ children }) {
  const max_step = 4;

  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    brand_id: "",
    model_id: "",
    condition_id: "",
    colour_id: "",
    sale_type: "",
    chasis_number: "",
    name: "",
    fault: "",
    rate: "",
    description: "",
    price: "",
    leave_vehicle_time: "",
    images: "",
  });

  const updateData = (newData) => {
    setData((data) => {
      return { ...data, ...newData };
    });
  };

  const updateStep = (action) => {
    switch (action) {
      case "next":
        if (step < max_step) {
          setStep((prevStep) => prevStep + 1);
        }
        break;
      case "prev":
        if (step > 1) {
          setStep((prevStep) => prevStep - 1);
        }
      default:
        return;
    }
  };

  return (
    <SellYourVehicleContext.Provider
      value={{
        step,
        data,
        setData,
        updateData,
        updateStep,
        max_step,
      }}
    >
      {children}
    </SellYourVehicleContext.Provider>
  );
}

export default SellYourVehicleProvider;
