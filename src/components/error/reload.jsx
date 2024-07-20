import { IoReload } from "react-icons/io5";

export default function ReloadError({ refetch }) {
  const handleRetry = () => {
    refetch();
  };
  return (
    <>
      <div className="w-full min-h-[500px] flex flex-col gap-3 justify-center items-center text-brandDarkGray">
        {/* <IoReload  size={32} /> */}
        <p>Something went wrong!</p>
        <p
          onClick={handleRetry}
          className="font-bold text-brandGreen inderline cursor-pointer"
        >
          Click to retry!
        </p>
      </div>
    </>
  );
}

export function ReloadError2({ refetch }) {
  const handleRetry = () => {
    refetch();
  };
  return (
    <>
      <div className="w-full py-2 flex flex-col gap-3 justify-center items-center text-brandDarkGray">
        <IoReload size={32} />
        <p>Something went wrong!</p>
        <p
          onClick={handleRetry}
          className="font-bold text-brandGreen inderline cursor-pointer"
        >
          Click to retry!
        </p>
      </div>
    </>
  );
}
