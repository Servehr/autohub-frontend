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
            <>
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

            </>
  )
}