import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { UpdateFaq } from '@/apis/misc';
import { UpdateManufacturerModel } from '@/apis/backend/product';


export const EditProductBrand = ({onClick, openEditProductBrand, model})  =>
{
        const [modelName, setModelName] = useState('')
        
        const [country, setCountry] = useState("")
        const options = ["opened", "closed"]

        const cancelModal = () => 
        {
                onClick(true)
        }

        console.log(model)

        const updateManufacturerModel = () => 
        {
                const data = { id: model?.id, make_id: model?.make_id, code: modelName.toUpperCase(), title: modelName }
                UpdateManufacturerModel(data)
                .then((res) => 
                {
                        onClick()
                })
                .catch((err) => 
                {
                        
                })                 
        }
        
        return (
                <Modal onClick={onClick} isOpen={openEditProductBrand} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <span className='font-bold text-md mb-5'>Change</span>
                                                        <div className="w-full d-flex-row md:flex mt-4 gap-5 mb-5">
                                                                <input onChange={(e) => {
                                                                        setModelName(e.target.value)
                                                                }} 
                                                                type="text" 
                                                                id="title" 
                                                                defaultValue={model?.title}  
                                                                name="title"  
                                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                </div>
                                        </>
                                </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mx-1 -mb-4">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={cancelModal}
                                        >
                                                        Close
                                        </button>
                                        <button
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                onClick={() => updateManufacturerModel() }
                                                >
                                                Update
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
