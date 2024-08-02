
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
import { useQuery } from "react-query";
import { isPaidAndStudentSummary } from "@/apis/user";
import UploadReciept from "@/pages/maceos/UploadReciept";
import PaymentPage from "./PaymentPage";
import DashboardSummary from "../dashboardSummary";
import StudentPage from "./StudentPage";


export default function Students() 
{
    const advertState = appStore((state) => state)
    const { data, isLoading, refetch, isRefetching } = useQuery([`is-paid-and-student-summary`], () => isPaidAndStudentSummary(), { cacheTime: 0 })
    if(!isLoading)
    {
      console.log(data)
      console.log(data?.payment_status)
    }

    const [loggedInUserType, setLoggedInUserType] = useState('')
    const [theService, setTheService] = useState(-1)
    const [isUser, setIsUser] = useState("-1")
    const [approvalRequest, setApprovalRequest] = useState("")
    const navigate = useNavigate();

    useEffect(() => 
    {
        const loggedInUser = localStorage.getItem('users')
        const convert = JSON.parse(loggedInUser)
        advertState.setLoggedInUserType(localStorage.getItem("userTypes"))
        advertState.setUserServices(localStorage.getItem("services"))
        setLoggedInUserType(localStorage.getItem("userTypes"))
        setTheService((localStorage.getItem("services")))
    }, [])
    
    return (
      <>
              { approvalRequest && <p className={`font-bold text-lg text-white rounded-md col-span-12 ${(approvalRequest === "") ? " " : "p-3 bg-blue-600"}`}>{approvalRequest}</p> }

              {
                  isLoading && <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                      <BeatLoader color="#1c9236" />
                  </div>
              }
              {
                  !isLoading && (data?.payment === "not-paid") && <>
                      <PaymentPage onClick={(e) => {
                          if(e === true)
                          {          
                            setApprovalRequest("")
                          } else {            
                            setApprovalRequest(e)      
                          }
                          refetch()
                      }} />
                  </>
              }
              {
                  !isLoading && (data?.payment === "paid") && <>
                      <StudentPage />
                  </>
              }
                  
             
      </>
    );
}
