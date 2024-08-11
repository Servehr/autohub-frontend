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
import { Icons } from "@/util/icon";
import { CourseFaqQuestion } from "@/components/CourseFaqQuestion";
import CourseFaqs from "./course-faqs";
import PaymentPage from "./user-type/PaymentPage";


export default function CourseFaq() 
{
  const id = (Math.round()*337)
  const { data, isLoading, refetch, isRefetching } = useQuery([`${id}get-courses`], () => AllCourse(), { cacheTime: 0 })

  if(!isLoading)
  {
      console.log(data)
  }

  const [loading, setIsLoading] = useState(false)

  const [openQuestion, setOpenQuestion] = useState(false)
  const [currentCourse, setCurrentCourse] = useState("")
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
                    !isLoading && (data?.plus === "not-paid") && <>
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
                  !isLoading && (data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                      <h1 className="font-bold">
                          No course created yet
                      </h1>
                  </div>
                }
                {
                     !isLoading && (data?.plus === "paid") && <>
                          <CourseFaqs data={data?.data} />
                     </>
                }
                    
        </div>
        <div className="p-5"></div>

    </div>
  );
}
