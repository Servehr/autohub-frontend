import PropTypes from "prop-types";
import useUser from "@/hooks/useUser";
import { BeatLoader, BounceLoader } from "react-spinners";
import Unauthenticated from "./unauthenticated";
import { browserType } from "@/store";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import NotAllowed from "./notAllowed";

const AdminRoute = ({ children }) => 
{

    const { data, isLoading, isError } = useUser();
    const { isMobile } = browserType();

    function HandleUnauthenticated() {

      return (
        <>
          <NotAllowed />
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
    let userTheType = localStorage.getItem("typeOfUser")
    if(userTheType === "admin")
    {
        return children
    } else {
        return <HandleUnauthenticated />;
    }
  };

  AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default AdminRoute
