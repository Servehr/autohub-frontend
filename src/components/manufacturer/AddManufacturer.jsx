import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';
import { AddMaker } from '@/apis/backend/product';


export const AddManufacturer = ({onClick, openAddManfuacturer})  =>
{
        const [manufacturerName, setManufacturerName] = useState("")
        
        const cancelModal = () => 
        {
                onClick(true)
        }
        

        const addManufacturer = async () => 
        {   
                const data = { code: manufacturerName.toUpperCase(), title: manufacturerName }
                AddMaker(data)
                .then((res) => 
                {
                        return onClick(Math.random())
                })
                .catch((err) => 
                {
                        
                })    
        }

        return (
                <Modal onClick={onClick} isOpen={openAddManfuacturer} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <h1 className='font-bold text-lg mb-5'>Add Manufacturer</h1>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <input onBlur={(e) => {
                                                                        setManufacturerName(e.target.value)
                                                                }} type="text" id="addBrand" 
                                                                defaultValue={manufacturerName}  
                                                                name="addBrand" 
                                                                placeholder="Enter BrandName Name" 
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
                                                onClick={() => addManufacturer() }
                                                >
                                                Add
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
