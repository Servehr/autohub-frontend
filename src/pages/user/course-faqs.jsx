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


export default function CourseFaqs({ data }) 
{

  const [openQuestion, setOpenQuestion] = useState(false)
  const [currentCourse, setCurrentCourse] = useState("")

  return (
    <>
              {
                  (data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                      <h1 className="font-bold">
                          No course created yet
                      </h1>
                  </div>
                }
                {
                    (data?.length > 0) && < div className="col-span-12">                      
                      <div className="font-bold text-xl mb-5 text-blue-700 mt-28 md:mt-0">MACEOS ACADEMY COURSES</div> 
                      <span className="col-span-12 font-bold text-red-800 text-sm -mt-3 mb-3">Download Course</span>
                    </div>
                }
                {
                    (data.length > 0) && data?.map((x) => {
                                return (
                                        <div
                                          onClick={() => {
                                              setCurrentCourse(x)
                                              setOpenQuestion(true)
                                          }}
                                          className="text-md text-left col-span-12 px-2 py-2 mb-1 justify-center w-full font-bold cursor-pointer 
                                                    text-black gap-2 bg-white 
                                                    ring-2 ring-blue-100 hover:bg-green-100 rounded-lg px-1 border border-solid 
                                                    border-blue-400 flex justify-between px-5"
                                        >
                                            {x.name}
                                            <Icons iconName={'eye'} width={5} height={5} />
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-4 h-4">
                                              <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                                            </svg> */}
                                        </div>
                                      )
                              })
                }
        <div className="p-5"></div>

        { openQuestion && <CourseFaqQuestion currentCourse={currentCourse} openQuestion={openQuestion} onClick={() => {
             setOpenQuestion(false)
        }} /> }
    </>
  );
}
