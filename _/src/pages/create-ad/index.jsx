import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FifthStep,
  FirstStep,
  FourthStep,
  SecondStep,
  ThirdStep,
} from "./steps";
import PostAdProvider, { PostAdContext } from "@/context/post-ad-context";
import { appStore } from "@/state/appState";

export function CreateAd() {
  const navigate = useNavigate();
  const advertState = appStore((state) => state)
  const { step } = useContext(PostAdContext);

  useEffect(() => {
      console.log(advertState.getStates())
  }, [])

  const render = () => {
    switch (step) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      case 4:
        return <FourthStep />;
      case 5:
        return <FifthStep />;
      default:
        return <FirstStep />;
    }
  };

  return (
    <div className="min-h-screen w-screen bg-brandGreen/90 justify-center flex">
      <div className="my-10 px-4 max-w-[600px] w-full flex flex-col gap-4">
        {/* close menu */}
        <div className="w-full h-10 flex justify-end mb-10">
          {/* menu */}
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <div className="h-[50px] sm:h-[58px] aspect-square rounded-full bg-[#1B5B29] text-3xl text-white flex justify-center items-center">
              <img src="/assets/close.svg" alt="" className="h-[30px] w-auto" />
            </div>
          </div>
        </div>

        {/* container */}
        <div className="bg-white w-full rounded-xl pr-4 pb-10 h-max px-2 overflow-hidden overflow-y-auto">
          <div
            className="bg-brandGreen h-2 rounded-md mt-2 mb-8"
            style={{ width: `${step * 20}%` }}
          ></div>
          {/*
           * Render based on the step
           * */}
          {render()}
        </div>
      </div>
    </div>
  );
}

export default function CreateAdPage() {
  return (
    <PostAdProvider>
      <CreateAd />
    </PostAdProvider>
  );
}
