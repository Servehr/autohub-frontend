import { BounceLoader } from "react-spinners";

export const Loader = ({ full }) => {
  return (
    <div
      className={`${
        full ? "h-screen w-screen" : "h-[calc(100vh-250px)]"
      } min-h-[250px] w-full flex justify-center items-center`}
    >
      <BounceLoader color="#1c9236" />
    </div>
  );
};
