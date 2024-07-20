import PropTypes from "prop-types";
import useUser from "@/hooks/useUser";
import { BeatLoader, BounceLoader } from "react-spinners";
import Unauthenticated from "./unauthenticated";
import { browserType } from "@/store";

const Protected = ({ children }) => {
  const { data, isLoading, isError } = useUser();
  const { isMobile } = browserType();

  function HandleUnauthenticated() {
    // localStorage.clear();

    return (
      <>
        <Unauthenticated />
      </>
    );
  }

  if (!isLoading) {
    if (!data) {
      return <HandleUnauthenticated />;
    }
    if (isError) {
      return <HandleUnauthenticated />;
    }
  }

  return data ? (
    <>{children}</>
  ) : (
    <div className="top-0 left-0 absolute z-[100] bg-white h-screen w-screen flex justify-center items-center text-brandGreen">
      {isMobile ? (
        <BeatLoader color="#1c9236" />
      ) : (
        <BounceLoader color="#1c9236" />
      )}
    </div>
  );
};

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Protected;
