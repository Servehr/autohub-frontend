import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';


export const SuspendUser = ({onClick, openSuspend, userId})  =>
{
        // const advertState = appStore((state) => state)
        // const navigate = useNavigate();
        // const [userProductId, setUserProductId] = useState(advertState.getProductId())
        // const [theTitle, setTitle] = useState("")
        // const [theContent, setTheContent] = useState("")
        // const [theIsOpened, setTheIsOpened] = useState(-1)
        // const options = [
        //         { key: -1, value: "- Select whether you want it published immediately or not -" },
        //         { key: "opened", value: "Yes" },
        //         { key: "closed", value: "No" },
        // ]

        // const cancelModal = () => 
        // {
        //         onClick(true)
        // }
        

        // const addFaq = async () => 
        // {
            
        //         const data = { title: theTitle, content: theContent, isOpened: theIsOpened }
        //         console.log(data)
        //         if(theIsOpened === -1)
        //         {
        //              alert("Select whether you want it published immediately or not")   
        //         }
        //         CreateFaq(data)
        //         .then((res) => 
        //         {
        //                 console.log(res)
        //                 return onClick(Math.random())
        //         })
        //         .catch((err) => 
        //         {
        //                 console.log(err)
        //         })    
        // }

        return (
                <Modal onClick={onClick} isOpen={openSuspend} wrapperWidth={800} margin={'80px auto 0px auto'}>
                <div className='col-span-12 pt-1 justify-center item-center'>
                        
                        <div className='col-span-12 pb-2 justify-center h-fit py-2 item-center -mt-5'>
                                <>                                                
                                        <div className="p-1 mt-1">
                                                <h1 className='font-bold text-lg mb-5 p-3 bg-blue-100 rounded-lg'>Suspend User</h1>
                                                {/* <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                        <input onChange={(e) => {
                                                                advertState.setChasisNumber(e.target.value)
                                                                setTheChasisNo(e.target.value)
                                                                setTitle(e.target.value)
                                                        }} type="text" id="name" defaultValue={''}  name="name" placeholder="Enter user name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div> */}
                                                
                                        </div>
                                </>
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
                                        onClick={() => console.log('') }
                                >
                                   Suspend 
                                </button>
                        </div>
                </div>
                </Modal>  
        );
}
