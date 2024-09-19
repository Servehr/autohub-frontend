import { NavLink } from "react-router-dom"
import { loginUser, forgotPassword, logOut } from "@/apis/auth";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Brand } from "@/layouts/header";
import { appStore } from "@/state/appState";
import useUser from "@/hooks/useUser";
import { AVATAR } from "@/lib/axios";



export default function Blogger({ sideBarStatus, data })
{
    const advertState = appStore((state) => state)
    // const { data } = useUser();
    const [openSidebar, setOpenSideBar] = useState(advertState.getSideBar())
    // const [openSidebar, setOpenSideBar] = useState(false)
    let sideBarState = (sideBarStatus === true) ? 'block' : 'hidden'
    // <aside className={`transition ease-in-out fixed w-12/12 lg:w-2/12 md:w-2/12 md:visible lg:visible md:block ${sideBarState} z-50 md:w-2/12 w-8/12 drop-shadow-lg scrollbar-thin scrollbar-thumb-indigo-300 overflow-y-auto scrollbar-track-pink h-screen justify-center items-center`} style={{background: "#048749" }}>

    return (    
    <div className={`transition ease-in-out fixed w-12/12 lg:w-2/12 md:w-2/12 md:visible lg:visible md:block z-50 md:w-2/12 w-8/12 drop-shadow-lg scrollbar-thin scrollbar-thumb-indigo-300 overflow-y-auto scrollbar-track-pink h-screen justify-center items-center`} style={{background: "#048749" }}>
        {/* <div className="w-12/12 lg:w-2/12 md:w-2/12 md:visible lg:visible md:block md:visible lg:visible scrollbar-thin scrollbar-thumb-indigo-300 overflow-y-auto scrollbar-track-pink" style={{background: "#048749", zIndex: 999 }}> */}
            <div className='px-5 py-5 -ml-5 flex  bg-white justify-center items-center'>
            <NavLink to="#">
                {/* <span className="sr-only">Workflow</span> */}
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-8 pl-5 justify-left items-left shrink-0 justify-left">
                        <Link to="/home">
                            <img
                            src="/assets/logo.png"
                            alt=""
                            className=""
                            />
                        </Link>
                    </div>
                    {/* <Brand /> */}
                    <div className="col-span-2"></div>
                    <div className="flex justify-right items-right col-span-2 rounded-full bg-blue-900" onClick={() => {
                        setOpenSideBar(!openSidebar)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-4 h-4 text-md text-white md:hidden lg:hidden sm:block w-[50px] h-[50px] p-1">
                            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </NavLink>
            </div>
            <div className='h-2/12 px-5 py-3 d-flex shadow-lg justify-center mx-auto items-center content-evenly space-x-2 bg-green-900 border-3 border-slate-500'>
                
                <div className="mb-2 w-full mx-auto flex justify-center">
                    {
                        <img
                            className="h-28 w-auto sm:h-28 rounded-xl p-1 bg-green-700"
                            src={`${AVATAR}${data?.data?.avatar}`}
                            alt=""
                        />
                    }
                </div>
                <div className='mt-2 pl-1 flex justify-center items-center'>
                    <p className='font-bold w-full text-md mt-2 text-white text-center'>{ data && data?.data?.name}</p>
                </div>
            </div>
            <div className=''>
                <ul className='w-full mt-2 aside text-gray-600 px-2'
                >
                    <li className="border-b-2  shadow-md border-green-800 mgmnt">
                        <NavLink to="/a/blog-post" className="w-5/5 relative justify-center items-end flex p-4 pl-3 text-sm hover:bg-blue-900"> 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4 mr-3">
                                <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
                                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                            </svg>
                            <span className='w-4/5 hover:text-white-500 text-white' style={{fontSize: '13px'}}>Blog</span>             
                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="h-4 -mt-3 w-1/5">
                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                            </svg> */}
                        </NavLink>
                    </li>
                    <li className="border-b-2  shadow-md border-green-800 mgmnt">
                        
                        <NavLink onClick={() => logOut()} className="w-5/5 relative justify-center cursor-pointer items-end flex p-3 pl-3 text-sm hover:bg-AsideHover  hover:text-white hover:font-bold">                            
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-4 h-4 mr-3">
                                <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                            </svg>
                            <span className='w-4/5 hover:text-red-600 text-white'>Logout</span>       
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="p-7"></div>
            {/* <div className='flex inset-x-0 bottom-0 bg-pink-400 sticky h-10 bottomAside'>
                <span className='text-gray-400 text-xs font-bold uppercase text-center mt-2'></span>
            </div> */}
        </div>
    )

}