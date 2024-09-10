import PropTypes from "prop-types";
import useUser from "@/hooks/useUser";
import { BeatLoader, BounceLoader } from "react-spinners";
import Unauthenticated from "./unauthenticated";
import { browserType } from "@/store";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import NotAllowed from "./notAllowed";

const AdminRoutee = ({ children }) => 
{
  // const { data, isLoading, isError } = useUser();
  // const { isMobile } = browserType();
  // const navigate = useNavigate()

  // const userType = localStorage.getItem("typeOfUser")
  // if(userType === 'admin')
  // {
  //     navigate('/overview')
  // } else {
  //    navigate('/home')
  // }

    const { data, isLoading, isError } = useUser();
    const { isMobile } = browserType();

    function HandleUnauthenticated() {
      // localStorage.clear();

      return (
        <>
          <NotAllowed />
        </>
      );
    }

    if (!isLoading) {
        console.log(data)
      if (!data) {
        return <HandleUnauthenticated />;
      }
      if (isError) {
        return <HandleUnauthenticated />;
      }
    }
    // alert(localStorage.getItem("typeOfUser"))
    let userTheType = localStorage.getItem("typeOfUser")
    if(userTheType === "admin")
    {
        return children
    } else {
        return <HandleUnauthenticated />;
    }

    // return data ? (
    //   <>{children}</>
    // ) : (
    //   <div className="top-0 left-0 absolute z-[100] bg-white h-screen w-screen flex justify-center items-center text-brandGreen">
    //     {isMobile ? (
    //       <BeatLoader color="#1c9236" />
    //     ) : (
    //       <BounceLoader color="#1c9236" />
    //     )}
    //   </div>
    // );
  };

  AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default AdminRoutee
