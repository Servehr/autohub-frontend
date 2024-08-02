
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


export default function StudentPage() 
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

  const info = [
    { name: 'Ads', nos: 34 },
    { name: 'WishList', nos: 13 },
    { name: 'Draft', nos: 20 },
    { name: 'Active', nos: 5 },
    { name: 'Enrollment', nos: 2 },
    { name: 'Advert', nos: 5 },
    { name: 'Product Views', nos: 20 },
    { name: 'Profile Views', nos: 5 },
  ]

  const supervisor = [
    { name: 'Ads', nos: 34 },
    { name: 'WishList', nos: 13 },
    { name: 'Draft', nos: 20 },
    { name: 'Active', nos: 5 },
    { name: 'Enrollment', nos: 2 },
    { name: 'Advert', nos: 5 },
    { name: 'Product Views', nos: 20 },
    { name: 'Profile Views', nos: 5 },
  ]
  
  return (
    <>               
            {
                (theService === "2" ||theService === "4") && 
                <>
                  <div className="grid grid-cols-12 gap-3 border border-solid border-green-900 col-span-12 p-3 rounded-lg"
                  >                    
                      <div className="flex justify-between bg-blue-500 p-4 md:col-span-4 col-span-12 text-white font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-4 border border-4 border-solid border-blue-600">
                        <span>Total Course:</span>
                        <span>3</span>
                      </div>
                      <div className="flex justify-between bg-green-500 p-4 md:col-span-4 col-span-12 text-white font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-4 border border-4 border-solid border-green-600">
                        <span>Completed:</span>
                        <span>2</span>
                      </div>
                      <div className="flex justify-between bg-red-500 p-4 md:col-span-4 col-span-12 text-white font-bold text-sm ring-2 ring-red-100 rounded-lg space-between px-4 border border-4 border-solid border-red-600">
                        <span>Remaining:</span>
                        <span>1</span>
                      </div>
                  </div>

                  {/* <div className="md:p-10 px-5 py-5 rounded-xl shadow-xl bg-green-100"> */}
                      
                  <div className="font-bold text-md -mb-3 md:col-span-12 col-span-12 text-green-900 mt-5 p-5 bg-gray-400 text-white rounded-md">Test Results</div> 
                    {/* <div
                      className="grid md:grid-cols-12 grid-cols-12 justify-center items-center gap-5"
                    > */}
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900">
                          <span>Course 1</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>300</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900">
                          <span>Course 2</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>230</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900">
                          <span>Course 3</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>150</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900">
                          <span>Course 4</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>280</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900">
                          <span>Course 5</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>320</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900">
                          <span>Course 6</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>285</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900">
                          <span>Course 7</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>170</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900">
                          <span>Course 8</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>120</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900">
                          <span>Course 9</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>340</span>
                        </div>
                  {/* </div> */}

                  {/* <div className="md:p-10 px-5 py-5 rounded-xl shadow-xl bg-blue-100 mt-10">
                    <div
                      className="grid md:grid-cols-12 grid-cols-12 justify-center items-center gap-5"
                    > */}
                    <div className="font-bold text-md -mb-3 md:col-span-12 col-span-12 text-green-900 mt-5 p-5 bg-gray-400 text-white rounded-md">Exam Results</div>
                    {/* </div> */}
                    {/* <div
                      className="grid md:grid-cols-12 grid-cols-12 justify-center items-center gap-5"
                    > */}
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-blue-400">
                          <span>Course 9</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>90</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-blue-400">
                          <span>Course 9</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>76</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-blue-400">
                          <span>Course 9</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>80</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-blue-400">
                          <span>Course 9</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>40</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-blue-400">
                          <span>Course 9</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>55</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-blue-400">
                          <span>Course 9</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>65</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-blue-400">
                          <span>Course 9</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>60</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-blue-400">
                          <span>Course 9</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>78</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-blue-400">
                          <span>Course 9</span>
                          <span className="hidden md:block"> - - - </span>
                          <span>50</span>
                        </div>
                    {/* </div> */}
                  {/* </div> */}
                  <div className="p-5"></div>
                </>
            }
    </>
  );
}
