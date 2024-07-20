import CloseBtn from "@/components/close-btn";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import SellYourVehicleProvider, {
  SellYourVehicleContext,
} from "@/context/sell-your-vehicle-context";
import { useContext } from "react";
import { FirstStep, FourthStep, SecondStep, ThirdStep } from "./steps";

export default function SellYourVehicle() {
  return (
    <SellYourVehicleProvider>
      <View />
    </SellYourVehicleProvider>
  );
}

function View() {
  const { step } = useContext(SellYourVehicleContext);

  const StepComponent = () => {
    switch (step) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
      case 4:
        return <FourthStep />;
      default:
        return <FirstStep />;
    }
  };

  return (
    <>
      <div className="min-h-screen w-screen bg-brandGreen/90 justify-center flex px-3 md:px-5">
        <MaxWidthWrapper>
          <CloseBtn />

          <div className="flex justify-center items-center relative">
            <div className="bg-white w-full rounded-xl my-5 pb-10 max-w-[600px] max-h-[600px] md:max-h-[700px] min-h-[500px]  h-[calc(100vh-150px)] px-2 overflow-hidden overflow-y-auto flex items-center flex-col relative">
              
              <div
                className="bg-brandGreen h-2 rounded-md mt-2 mb-5"
                style={{ width: `${step * 25}%` }}
              ></div>
              
              {StepComponent()}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
