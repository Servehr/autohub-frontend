import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';
import { Modal } from '@/components/Modal';
import { UpdateTrimLevel } from '@/apis/backend/product';


export const PlaceTrimLevel = ({onClick, openTrimLevel, trim})  =>
{
        const [trimRate, setTrimRate] = useState(trim?.rate)
        
        const cancelModal = () => 
        {
                onClick(true)
        }

        console.log(trim)
        

        const TrimLevelUpdate = async () => 
        {   
                const data = { id: trim?.id, rate: trimRate }
                UpdateTrimLevel(data)
                .then((res) => 
                {
                        return onClick(Math.random())
                })
                .catch((err) => 
                {
                        
                })    
        }

        return (
                <Modal onClick={onClick} isOpen={openTrimLevel} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <h1 className='font-bold text-lg mb-5'>Increase Trim Visibility</h1>
                                                        <div className="w-full d-flex md:flex mt-1">
                                                                <input onBlur={(e) => {
                                                                        setTrimRate(e.target.value)
                                                                }} type="number" id="trimLevel" 
                                                                defaultValue={trimRate}  
                                                                name="trimLevel" 
                                                                placeholder="Enter Product Level" 
                                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                                                />
                                                        </div>
                                                </div>
                                        </>
                                </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 mt-3">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={cancelModal}
                                        >
                                                        Cancel
                                        </button>
                                        <button
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                onClick={TrimLevelUpdate}
                                                >
                                                Place Trim
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
