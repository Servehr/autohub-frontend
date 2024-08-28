import { useEffect, useState } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FormCode } from "@/components/FormCode";
import { AllCourse } from "@/apis/backend/course";
import { useQuery } from "react-query";
import AllCourses from "./allCourses";
import PaymentPage from "./user-type/PaymentPage";
import { isPaidAndStudentSummary } from "@/apis/user";


export default function Courses() 
{
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState("-1")

  return (
    <>
      <Helmet>
        <title>Change Email | Autohub</title>
        <meta name="description" content="Sell Faster, Buy Smarter" />
      </Helmet>

      
      <Course />
    </>
  );
}

function Course() 
{
  const id = (Math.round()*337)
  const { data, isLoading, refetch, isRefetching } = useQuery([`is-paid-and-student-summary`], () => isPaidAndStudentSummary(), { refetchOnWindowFocus: true, cacheTime: 0 })

  const [loading, setIsLoading] = useState(false)

  const [downloadForm, setDownloadForm] = useState(false)
  const [approvalRequest, setApprovalRequest] = useState("")
  
  return (
    <div className="p-3 mb-3 rounded-lg bg-white">
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
                {
                  !isLoading && (data?.length === 0) && (data?.plus === 'open') && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                      <h1 className="font-bold">
                          No course created yet
                      </h1>
                  </div>
                }
                {
                     !isLoading && data?.data && (data?.data?.payment_status === "paid") && (data?.message === 'valid') && (data?.plus === "open") && <>
                          <AllCourses />
                     </>
                }
                    
        </div>
        <div className="p-5"></div>


        {/* <FormCode onClick={() => setDownloadForm(false) } downloadForm={downloadForm} message={''} /> */}
    </div>
  );
}
