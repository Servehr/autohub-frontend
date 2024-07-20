import React, { createContext, useState } from "react";

export const RegisterContext = createContext(null);

export const types = ["Buyer", "Affiliate"];

function RegisterProvider({ children }) {
  const [userType, setUserType] = useState(types[0]);

  const [step, setStep] = useState(1);
  const [data, setData] = useState([]);

  const setType = (id) => {
    setUserType(types[id]);
  };

  const decrement = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const increment = () => {
    // alert(step)
    if (step < 6) setStep((prevStep) => prevStep + 1);
  };

  return (
    <RegisterContext.Provider
      value={{ step, userType, setType, data, setData, decrement, increment }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterProvider;
