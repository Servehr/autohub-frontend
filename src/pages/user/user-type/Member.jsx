
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


export default function Member() 
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
  
  return (
    <>
      <Helmet>
        <title>Dashboard | Autohub</title>
        <meta name="description" content="Sell Faster, Buy Smarter" />
      </Helmet>

            {
                (theService === "1") && info.map((x) => {
                    return (
                      <>
                        <div className="md:col-span-4 col-span-6 gap-1 mb-5 mx-2 flex bg-white ring-2 ring-blue-100 hover:bg-green-100 rounded-lg space-between border border-solid border-blue-400">
                            <div className="p-4 w-9/12 text-black font-bold text-sm">{x.name}</div>
                            <div className="p-4 w-3/12 text-black font-bold">
                                <span className="w-[40px] h-[40px] rounded-full bg-white p-2">
                                  {x.nos}
                                </span>
                            </div>
                        </div>
                      </>
                    )
                })
              
            }
    </>
  )
}    
