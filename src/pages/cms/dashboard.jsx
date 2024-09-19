import * as yup from "yup";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import Pulsate from "@/components/Pulsate";
import { useQuery } from "react-query";
import useUser from "@/hooks/useUser";
import { dashboardOverview } from "@/apis/backend/dashboard";
import Supervisor from "../shared/Supervisor";
import Blogger from "../shared/Blogger";
import Manager from "../shared/Manager";


const pulsates = [
    { title: "Users", figures: 4, icon: "sellers" },
    { title: "Managers", figures: 4, icon: "managers" },
    { title: "Staff", figures: 8, icon: "user" },
    { title: "Dealers", figures: 120, icon: "user" },
    { title: "Transactions", figures: 20000000, icon: "finance" },
    { title: "Ads", figures: 400, icon: "products" },
    { title: "Sold", figures: 43, icon: "requests" },
    { title: "On-Sales", figures: 410, icon: "expenses" },
    { title: "Pending", figures: 3573, icon: "visitors" },
    { title: "Expenses", figures: 573, icon: "ads" },
    { title: "Request", figures: 24, icon: "sellers" },
    { title: "comments", figures: 650, icon: "comment" },
]

export default function Dashboard()
{
    const x = Math.round()
    const { data, isLoading  } = useUser();
    // const { data, isLoading } = useQuery([`${x}/overview`], () => dashboardOverview(), { refetchOnWindowFocus: false, staleTime: Infinity, retry: 2 })

    if(!isLoading)
    {
        console.log(data)
    }
    
    const [sideBarToggle, setSideBarToggle] = useState(true)

    return ( 
        <>
            {
                !isLoading && <div className="h-screen flex item-end justify-end pb-6 relative scrollbar-thin scrollbar-thumb-indigo-300 overflow-y-auto scrollbar-track-pink "
                >                    
                    {/* <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600' style={{ zIndex: 999 }}>  */}
                        <button 
                            className="absolute z-50 lg:hidden peer top-0 mr-28 h-14 w-14 mt-2 rounded-full bg-slate-700 hover:bg-slate-800 focus:bg-slate-700 transition"
                            >
                                <span className="text-white"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-5 h-5 m-auto" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                                    </svg>
        
                                </span>
                        </button>
                        <div className="z-20 w-2/12 lg:w-2/12 lg:visible w-9/12 fixed top-0 -left-96 lg:left-0 bg-white shadow-2xl peer-focus:left-0 peer:transition ease-out delay-150 duration-200"
                            >
                                { 
                                    data?.data?.admin_role === "super-admin" && <>
                                            <Sidebar sideBarState={sideBarToggle} data={data} />
                                    </> 
                                }
                                { 
                                    data?.data?.admin_role === "supervisor" && <>
                                            <Supervisor sideBarState={sideBarToggle} data={data} />
                                    </> 
                                }
                                { 
                                    data?.data?.admin_role === "blogger" && <>
                                            <Blogger sideBarState={sideBarToggle} data={data} />
                                    </> 
                                }
                                { 
                                    data?.data?.admin_role === "manager" && <>
                                            <Manager sideBarState={sideBarToggle} data={data} />
                                    </> 
                                }
                        </div>
                    {/* </div> */}
                    <div className='bg-white md:w-10/12 lg:10/12 w-full lg:flex-row px-5 bg-blue-500'
                    >
                        <div className='grid grid-cols-12 gap-5 py-3 pr-5 bg-green-100 mb-5 rounded-lg justify-center items-center order-5 mt-2'>
                            <AdminHeader  />
                        </div>
                        <Outlet />
                    </div>
                </div>
            }
        </>
  )
}