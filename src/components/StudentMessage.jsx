import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";


export const StudentMessage = ({onClick, studentMessage, message, path})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();

        // const deleteProduct = async (deleteUrl) => 
        // {
        //         let token = localStorage.getItem("token")   
        //         await axios.delete(`${BASE_URL}${deleteUrl}`, {
        //                 headers: {
        //                         'Authorization': token ? `Bearer ${token}` : "",
        //                 }
        //         }).then((response) => 
        //         {  
        //                 console.log(response)
        //                 navigate(returnTo);
        //                 return onClick(false)
        //         }).catch((error) => { 
        //                 console.log(error)                      
        //                 return false
        //         })
        // }

        return (
                <Modal onClick={onClick} isOpen={studentMessage} wrapperWidth={800} margin={'150px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                <h1 className='mb-5 font-bold mt-3'>{message}</h1>                               
                                
                                { (path === 'result') &&
                                        <>
                                                <div className="flex flex-wrap -m-2 mt-2 mb-1 mx-2">
                                                        <div className="p-2 w-full">
                                                        <div className="w-full font-bold text-sm mb-2 flex justify-center">Send Message To Student</div>
                                                        
                                                        <div className="flex flex-wrap -m-2 mt-2 mb-2 px-1">
                                                                <span className="w-full font-bold text-sm">Message</span>
                                                                <textarea onChange={(e) => { 
                                                                                
                                                                } } defaultValue={''} 
                                                                className="shadow form-textarea mb-2 block w-full border rounded w-full 
                                                                        py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                                rows="5" 
                                                                placeholder="Enter Message"
                                                                >
                                                                </textarea>
                                                        </div>
                                                        </div>
                                                </div>
                                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-5 mt-5">
                                                        <button  
                                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                                onClick={() =>
                                                                        onClick(!studentMessage)
                                                                }
                                                        >
                                                                Cancel
                                                        </button>
                                                        <button
                                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                                onClick={() =>
                                                                        onClick(!studentMessage)
                                                                }
                                                        >
                                                                Send 
                                                        </button>
                                                </div>
                                        </>
                                }
                                 { (path === 'change') &&
                                        <>
                                                <div className="flex flex-wrap -m-2 mt-2 mb-1 mx-2">
                                                        <div className="p-2 w-full">
                                                        <div className="w-full font-bold text-sm mb-2 flex justify-center">Change Student Score</div>
                                                        
                                                        <input onBlur={(e) => {
                                                        
                                                }} type="text" id="accessCode" defaultValue={''}  name="accessCode" placeholder="Enter Score" className="w-full h-[60px] text-xl bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                </div>
                                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-5 mt-5">
                                                        <button  
                                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                                onClick={() =>
                                                                        onClick(!studentMessage)
                                                                }
                                                        >
                                                                Cancel
                                                        </button>
                                                        <button
                                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                                onClick={() =>
                                                                        onClick(!studentMessage)
                                                                }
                                                        >
                                                                Send 
                                                        </button>
                                                </div>
                                        </>
                                }
                        </div>
                </Modal>  
        );
}
