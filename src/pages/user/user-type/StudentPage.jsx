
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
import { GetStudentOverview } from "@/apis/backend/dashboard";


export default function StudentPage() 
{
  const advertState = appStore((state) => state)
  const { data, isLoading } = useQuery(['get-student-overview'], () => GetStudentOverview(), { cacheTime: 0 })

  if(!isLoading)
  {
      console.log(data?.attempted)
      console.log(data?.objective[0]?.name)
  }

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
  }, [])
  
  return (
    <>               
            {
                (theService === "2" ||theService === "4") && 
                <>
                  <div className="grid grid-cols-12 gap-3 border border-solid border-green-900 col-span-12 p-3 rounded-lg"
                  >                    
                      {
                          !isLoading && data && <>
                              <div className="flex justify-between text-lg font-bold bg-blue-500 p-2 md:col-span-4 col-span-12 text-white font-bold ring-2 ring-blue-100 rounded-lg space-between px-4 border border-4 border-solid border-blue-600">
                                <span>Total Course:</span>
                                <span>{data?.courses}</span>
                              </div>
                              <div className="flex justify-between text-lg font-bold bg-green-500 p-2 md:col-span-4 col-span-12 text-white font-bold ring-2 ring-green-100 rounded-lg space-between px-4 border border-4 border-solid border-green-600">
                                <span>Completed:</span>
                                <span>{data?.attempted}</span>
                              </div>
                              <div className="flex justify-between text-lg font-bold bg-red-500 p-2 md:col-span-4 col-span-12 text-white font-bold ring-2 ring-red-100 rounded-lg space-between px-4 border border-4 border-solid border-red-600">
                                <span>Remaining:</span>
                                <span>{Math.abs((data?.courses - data?.attempted))}</span>
                              </div>
                          </>
                      }
                  </div>

                  {/* <div className="md:p-10 px-5 py-5 rounded-xl shadow-xl bg-green-100"> */}
                      
                  <div className="font-bold text-md -mb-3 md:col-span-12 col-span-12 text-green-900 mt-5 p-5 bg-gray-400 text-white rounded-md">Test Results</div> 
                        <div className="font-bold col-span-12 -mb-2 mt-1 uppercase text-blue-600">Objective</div>
                        {
                            !isLoading && data?.objective && (data?.objective?.length > 0) && data?.objective?.map((result, index) =>
                            {                                  
                                return (
                                  <div className="flex justify-between p-2 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900">
                                      <span className="px-3 text-md">{result.name}</span>
                                      <span className="hidden md:block px-3"> -- </span>
                                      <span className={`${(result.taken === "yes" ? 'text-lg block' : 'hidden')} px-3`}>{ result.score }</span>
                                      <span className={`${(result.taken != "yes" ? 'text-xs text- block' : 'hidden')} px-3`}>{ "Not Taken" }</span>
                                  </div>
                                )
                            })  
                        }

                        
                      <div className="font-bold col-span-12 -mb-2 mt-5 uppercase text-green-700">Theory</div>
                      {
                          !isLoading && data?.theory && (data?.theory?.length > 0) && data?.theory?.map((result, index) =>
                          {                                  
                              return (
                                <div className="flex justify-between p-2 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-blue-900">
                                    <span className="px-3 text-md">{result.name}</span>
                                    <span className="hidden md:block px-3"> -- </span>
                                    <span className={`${(result.taken === "yes" ? 'text-lg block' : 'hidden')} px-3`}>{ result.score }</span>
                                    <span className={`${(result.taken != "yes" ? 'text-xs text- block' : 'hidden')} px-3`}>{ "Not Taken" }</span>
                                </div>
                              )
                          })  
                      }


                    <div className="font-bold text-md -mb-3 md:col-span-12 col-span-12 text-green-900 mt-5 p-5 bg-gray-400 text-white rounded-md mb-2">Exam Results</div>
                        {
                            !isLoading && data?.exam_objective && (data?.exam_objective === "not-taken") && 
                              <div className="flex justify-between p-2 bg-white md:col-span-6 col-span-6 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-green-900">
                                  <span className="px-3 text-md uppercase text-blue-800">Objective</span>
                                  <span className="hidden md:block px-3"> NOT YET TAKEN </span>
                              </div> 
                        }
                        {
                            !isLoading && data?.exam_objective && (data?.exam_objective != "not-taken") && 
                              <div className="flex justify-between p-2 bg-white md:col-span-6 col-span-6 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-green-900">
                                  <span className="px-3 text-md uppercase text-blue-800">Objective</span>
                                  <span className="hidden md:block px-3"> { data?.exam_objective } </span>
                              </div> 
                        }
                        {
                            !isLoading && data?.exam_theory && (data?.exam_theory === "not-taken") && 
                              <div className="flex justify-between p-2 bg-white md:col-span-6 col-span-6 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900">
                                  <span className="px-3 text-md uppercase text-green-800">Theory</span>
                                  <span className="hidden md:block px-3"> NOT YET TAKEN </span>
                              </div> 
                        }
                        {
                            !isLoading && data?.exam_theory && (data?.exam_theory != "not-taken") && 
                              <div className="flex justify-between p-2 bg-white md:col-span-6 col-span-6 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-blue-900">
                                  <span className="px-3 text-md uppercase text-green-800">Theory</span>
                                  <span className="hidden md:block px-3"> { data?.exam_theory } </span>
                              </div> 
                        }
                  <div className="p-5"></div>
                </>
            }
    </>
  );
}
