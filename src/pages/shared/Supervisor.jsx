import { NavLink } from "react-router-dom"
import { loginUser, forgotPassword, logOut } from "@/apis/auth";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Brand } from "@/layouts/header";
import { appStore } from "@/state/appState";
import useUser from "@/hooks/useUser";
import { AVATAR } from "@/lib/axios";



export default function Supervisor({ sideBarStatus, data })
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
                <ul className='w-full mt-2 aside text-gray-600 px-2'>
                    <li className="border-b-2  shadow-md border-green-800 mgmnt">
                        <NavLink to="/a/overview" className="w-5/5 relative justify-center items-end flex p-4 pl-3 text-sm hover:bg-blue-900" activeStyle={{
          color: "red",
          fontWeight: "bold",
          backgroundColor: "pink"
        }}>                             
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4 mr-3">
                                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                            </svg>
                            <span className='w-4/5 hover:text-white-500 text-white' style={{fontSize: '13px'}}>Dashboard</span>             
                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-4 -mt-3 w-1/5 hover:fill-black">
                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                            </svg> */}
                        </NavLink>
                    </li>
                    {/* #f3f2ff */}
                    <li className="border-b-2  shadow-md border-green-800 mgmnt pl-2">
                        <NavLink to="/a/test-courses" className="w-5/5 relative justify-center items-end flex p-4 pl-1 text-sm hover:bg-blue-900">                             
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-4 h-4 mr-2">
                                <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
                            </svg>
                            <span className='w-4/5 hover:text-white-500 text-white' style={{fontSize: '13px'}}>Test Questionaire</span>             
                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-4 -mt-3 w-1/5">
                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                            </svg> */}
                        </NavLink>
                    </li>
                    <li className="border-b-2  shadow-md border-green-800 mgmnt pl-2">
                        <NavLink to="/a/exam-questionaires" className="w-5/5 relative justify-center items-end flex p-4 pl-1 text-sm hover:bg-blue-900">                             
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-4 h-4 mr-2">
                                <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 0 5.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 0 0 .659-.663 47.703 47.703 0 0 0-.31-4.82.75.75 0 0 1 .83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 0 0 .657-.642Z" />
                            </svg>
                            <span className='w-4/5 hover:text-white-500 text-white' style={{fontSize: '13px'}}>Exam Questionaire</span>             
                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-4 -mt-3 w-1/5">
                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                            </svg> */}
                        </NavLink>
                    </li>
                    <li className="border-b-2  shadow-md border-green-800 mgmnt">
                        <NavLink to="/a/markings" className="w-5/5 relative justify-center items-end flex p-4 pl-3 text-sm hover:bg-blue-900"> 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4 mr-3">
                                <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
                                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                            </svg>
                            <span className='w-4/5 hover:text-white-500 text-white' style={{fontSize: '13px'}}>Markings</span>             
                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="h-4 -mt-3 w-1/5">
                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                            </svg> */}
                        </NavLink>
                    </li>
                    <li className="border-b-2  shadow-md border-green-800 mgmnt">
                        <NavLink to="/a/students" className="w-5/5 relative justify-center items-end flex p-4 pl-3 text-sm hover:bg-blue-900">                            
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-4 h-4 mr-3">
                                <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                            </svg> 
                            <span className='w-4/5 hover:text-white-500 text-white' style={{fontSize: '13px'}}>Students</span>             
                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="h-4 -mt-3 w-1/5">
                                <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                            </svg> */}
                        </NavLink>
                    </li>
                    {/* report  */}
                    <li className="border-b-2  shadow-md border-green-800 mgmnt">
                        <NavLink to="/a/courses" className="w-5/5 relative justify-center items-end flex p-4 pl-3 text-sm hover:bg-blue-900">                            
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4 mr-3">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                        <span className='w-4/5 hover:text-white-500 text-white' style={{fontSize: '13px'}}>Courses</span>             
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-4 -mt-3 w-1/5">
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