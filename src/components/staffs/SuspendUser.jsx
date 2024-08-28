import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';
import { SuspendStaff } from '@/apis/user';


export const SuspendUser = ({onClick, openSuspend, user})  =>
{
        const userStatus = ['suspend', 'active'];
        const [theStatus, setTheStatus] = useState(user.status)
        const [userId, setUserId] = useState(user.id)

        const suspendStaff = () => 
        {
                const data = { id: userId, status: theStatus}
                SuspendStaff(data)
                .then((res) => 
                {
                        return onClick(Math.random())
                })
                .catch((err) => 
                {
        
                })    
        }

        return (
                <Modal onClick={onClick} isOpen={openSuspend} wrapperWidth={800} margin={'80px auto 0px auto'}>
                <div className='col-span-12 pt-1 justify-center item-center'
                >
                        <h1 className='font-bold text-lg mb-5 p-3 text-blue-600 rounded-lg'>Change Status On : {user.name} {user.lastname}</h1>
                        <h1 className='font-bold text-lg mb-5 p-3 text-red-600 rounded-lg -mt-10'>Current Status : {user.status}</h1>


                        <div className="relative w-full mb-3">
                                <select onChange={(e) => 
                                        {  
                                                setTheStatus(e.target.value)
                                        } 
                                }
                                defaultValue={theStatus} 
                                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                        <option value={-1}> - Select Status -  </option> 
                                                {
                                                        userStatus.map((stx, index) => {
                                                                return (                                                                                                
                                                                                <option key={index} value={stx} selected={stx === theStatus ? stx : ""}>{stx.toUpperCase()}</option> 
                                                                        )
                                                                })
                                                }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-0">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                        </svg>
                                </div>
                                <div className="text-red-500 font-bold text-sm">{ "" }</div>
                        </div>                        
                        
                        <div className="items-center gap-5 sm:flex flex justify-between mb-2 mx-1">
                                <button  
                                        className="mt-2 p-4 text-white hover:font-bold text-sm bg-black rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                        onClick={() => {
                                                onClick(!openSuspend)
                                        }}
                                >
                                                Close
                                </button>
                                <button
                                        className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                        onClick={suspendStaff}
                                >
                                   Act 
                                </button>
                        </div>
                </div>
                </Modal>  
        );
}
