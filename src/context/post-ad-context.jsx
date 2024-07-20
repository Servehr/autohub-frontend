import { getColor, getMaker, getModel } from "@/utils/misc";
import React, { createContext, useEffect, useState } from "react";
import { appStore } from "@/state/appState";

export const PostAdContext = createContext(null);

function PostAdProvider({ children }) 
{
  const advertState = appStore((state) => state)
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    state: advertState.getStates(),
    category: advertState.getCateg(),
    maker: advertState.getMaker(),
    model: advertState.getModel(),
    colour: advertState.getColour(),
    year_of_production: advertState.getYearOfPoduction(),
    transmission: advertState.getTransmission(),
    condition: advertState.getCondition(),
    chasis_number: advertState.getChasisNumber(),
    trim: advertState.getTrim(),
    description: advertState.getDescription(),
    price: advertState.getPrice(),
    plan_id: advertState.getPlan_id(),
    avatar: '',
    others: '',
    title: ''
  });

  // localStorage.clear('autoHub')
  console.log(data)
  // console.log(advertState.getAvatar())

  const title = {
    title: `${data.year_of_production} ${getColor(data.colour)} ${getMaker(data.maker)} ${getModel(data.model)}`,
  };
  console.log(data.state)

  const [productId, setProductId] = useState(null);

  const [selectedPlan, setSelectedPlan] = useState(1);

  const handleData = (newData) => {
    setData((data) => {
      return { ...data, ...newData };
    });
  };

  useEffect(() => {
    handleData({ plan_id: selectedPlan });
    handleData({ title: title });
  }, [selectedPlan]);

  const nextStep = () => {
    if (step < 5) setStep((prevStep) => prevStep + 1);
  };

  return (
    <PostAdContext.Provider
      value={{
        step,
        data,
        setStep,
        selectedPlan,
        setSelectedPlan,
        setData,
        nextStep,
        title,
        productId,
        setProductId,
      }}
    >
      {children}
    </PostAdContext.Provider>
  );
}

export default PostAdProvider;
