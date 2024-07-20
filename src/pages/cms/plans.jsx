import * as yup from "yup";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import Pulsate from "@/components/Pulsate";
import '../css/ad.css'


export default function Plans()
{

  return ( 
        <div className='w-full flex'>
            <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600'> 
                <Sidebar />
                {/* <h1>Great</h1> */}
            </div>
            <div className='md:w-10/12 lg:10/12 w-12/12 lg:flex-row px-5'>
                {/* <div className='grid md:grid-cols-12 grid-cols-6 gap-5 py-2 pr-5 mt-2 mb-5 justify-center items-center order-5 mt-5'>
                    <AdminHeader />
                </div> */}

                {/* <div className="grid md:grid-cols-12 grid-cols-12 gap-5 md:p-3 mt-2 mb-5 justify-center items-center">
                    <div className="col-span-12 md:col-span-1 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:fill-current cursor-pointer hover:fill-red-900">
                            <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
                        </svg>                                            
                    </div>
                </div> */}

                <div className="p-5">
                    <div className="w-full bg-blue-200 p-5 -mt-2">
                        <h1 className="font-bold">Choose a plan</h1>
                    </div>
                </div>

                <div className="container mx-auto px-4 my-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        <div className=" text-center">
                            <div className="px-6 py-10 rounded-2xl card bg-white">
                                <i className="fa fa-cog"></i>
                                <h1 className="font-bold mb-2">Free</h1>
                                <div className="flex items-center justify-center"><span className="text-2xl -mt-8">$</span><span className="text-6xl">0</span></div>
                                <ul className="mt-10 pb-5">
                                    <li className="text-lg">30 Days</li>
                                </ul>
                                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-4 border border-blue-500 hover:border-transparent rounded mt-4 w-full">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                        <div className=" text-center">
                            <div className="px-6 py-10 rounded-2xl card bg-white">
                                <i className="fa fa-cog"></i>
                                <h1 className="font-bold mb-2">Silver</h1>
                                <div className="flex items-center justify-center"><span className="text-2xl -mt-8">$</span><span className="text-6xl">200</span></div>
                                <ul className="mt-10 pb-5">
                                    <li className="text-lg">2 Months</li>
                                </ul>
                                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-4 border border-blue-500 hover:border-transparent rounded mt-4 w-full">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                        <div className=" text-center">
                            <div className="px-6 py-10 rounded-2xl card bg-white">
                                <i className="fa fa-cog"></i>
                                <h1 className="font-bold mb-2">Gold</h1>
                                <div className="flex items-center justify-center"><span className="text-2xl -mt-8">$</span><span className="text-6xl">400</span></div>
                                <ul className="mt-10 pb-5">
                                    <li className="text-lg">6 Months</li>
                                </ul>
                                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-4 border border-blue-500 hover:border-transparent rounded mt-4 w-full">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                        <div className=" text-center">
                            <div className="px-6 py-10 rounded-2xl card bg-white">
                                <i className="fa fa-cog"></i>
                                <h1 className="font-bold mb-2">Platinum</h1>
                                <div className="flex items-center justify-center"><span className="text-2xl -mt-8">$</span><span className="text-6xl">1000</span></div>
                                <ul className="mt-10 pb-5">
                                    <li className="text-lg">12 Months</li>
                                </ul>
                                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-4 border border-blue-500 hover:border-transparent rounded mt-4 w-full">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
  )
}