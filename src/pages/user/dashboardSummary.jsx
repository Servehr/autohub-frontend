
import { useEffect, useState } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// import useUser from "@/hooks/useUser";
import DashSidebar from "@/layouts/sidebar";
import { appStore } from "@/state/appState";
import Students from "./user-type/Students";
import Member from "./user-type/Member";
import UploadReciept from "../maceos/UploadReciept";


export default function DashboardSummary() 
{
  const advertState = appStore((state) => state)
  
  // advertState.setLoggedInUser(convert)
  // const userType = advertState.getLoggedInUser()

  const [loggedInUserType, setLoggedInUserType] = useState('')
  const [theService, setTheService] = useState(-1)
  const [isUser, setIsUser] = useState("-1")
  const navigate = useNavigate();

  useEffect(() => 
  {
      const loggedInUser = localStorage.getItem('users')
      const convert = JSON.parse(loggedInUser)
      advertState.setLoggedInUserType(localStorage.getItem("userTypes"))
      advertState.setUserServices(localStorage.getItem("services"))
      setLoggedInUserType(localStorage.getItem("userTypes"))
      setTheService((localStorage.getItem("services")))
      // alert(localStorage.getItem("userTypes"))
      // alert(localStorage.getItem("services"))
  }, [])

  return (
    <>
      <Helmet>
        <title>Dashboard | Autohub</title>
        <meta name="description" content="Sell Faster, Buy Smarter" />
      </Helmet>
      <div className="px-1">
          
          <div className="grid grid-cols-12 gap-5">
            {/* <div className="bg-blue-500 py-5"></div> */}
            <div className="font-bold text-md mt-28 md:mt-0 col-span-12 pl-3">Dashboard</div>  
                  
              {
                  (theService === "2" ||theService === "4") && 
                  <>
                      <Students />
                  </>
              }

              {
                  (theService === "1") && <>
                    <Member />
                  </>                  
              }
          </div>

      </div>
    </>
  );
}
