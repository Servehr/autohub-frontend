import PropTypes from "prop-types";
import useUser from "@/hooks/useUser";
import { BeatLoader, BounceLoader } from "react-spinners";
import Unauthenticated from "./unauthenticated";
import { browserType } from "@/store";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const AdminRoute = () => {
  const { data, isLoading, isError } = useUser();
  const { isMobile } = browserType();
  const navigate = useNavigate()

  const userType = localStorage.getItem("typeOfUser")
  // return userType === 'admin' ? <Outlet /> : <Navigate to={'/not-allowed'} />
  if(userType === 'admin')
  {
      navigate('/overview')
  } else {
     navigate('/home')
      // return <Outlet />
  }

}

export default AdminRoute
