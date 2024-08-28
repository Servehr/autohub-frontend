
import { useEffect, useReducer, useState } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { appStore } from "@/state/appState";
import PaymentPage from "@/pages/user/user-type/PaymentPage";
import StartExamTheoryPage from "./StartExamTheoryPage";
import { isPaidAndStudentSummary } from "@/apis/user";


export default function StartTheoryExam() 
{

  const advertState = appStore((state) => state)
  const { data, isLoading, refetch, isRefetching} = useQuery([`check-if-user-has-paid`], () => isPaidAndStudentSummary('exam-theory'), { refetchOnWindowFocus: true, cacheTime: 0 })

  const [approvalRequest, setApprovalRequest] = useState("")

  return (
    <div className="px-3 mb-3 md:p-1 p-3">
        <div
          className="grid md:grid-cols-12 grid-cols-12 gap-5"
          >

                { approvalRequest && <p className={`font-bold text-lg text-white rounded-md col-span-12 ${(approvalRequest === "") ? " " : "p-3 bg-blue-600"}`}>{approvalRequest}</p> }
                {/* <span className="col-span-12 font-bold text-green-800 mb-3">MACEOS ACADEMY COURSES: </span> */}
                {/* <p className="mb-4 col-span-12 ">Below are the courses we offer. Browse through for your kind perusal; from the main courses to sub-courses and modules.</p> */}
                {
                  isLoading && <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                      <BeatLoader color="#1c9236" />
                  </div>
                }
                {       
                  !isLoading && (data?.plus === 'closed') && <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                      <p className="font-bold text-2xl"
                      >
                            Academic Session is currently closed
                      </p>
                  </div>
                }
                {       
                  !isLoading && (data?.message === 'invalid') && (data?.plus === 'open') && <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                      <p className="font-bold text-2xl"
                      >
                           You Are Not Enrolled For Current Session
                      </p>
                  </div>
                }

                {
                    !isLoading && (data?.data?.payment_status === "not-paid") && (data?.message === 'valid') && (data?.plus === 'open') && <>
                        <PaymentPage onClick={(e) => {
                            if(e === true)
                            {          
                              setApprovalRequest("")
                            } else {            
                              setApprovalRequest(e)      
                            }
                        }} />
                    </>
                }

                {  !isLoading && data?.data && (data?.data?.payment_status === "paid") && (data?.message === 'valid') && (data?.plus === "open") && <>
                          <StartExamTheoryPage /> 
                     </>
                }
                    
        </div>
        <div className="p-5"></div>

    </div>
  );
}