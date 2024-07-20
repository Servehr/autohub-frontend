import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";


export const SuccessModal = ({onClick, successModal, returnTo, message})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();

        const isSuccessful = () => 
        {
                return onClick(true)
        //     console.log(returnTo)
        //     window.location.href = returnTo  
        //     setTimeout(() => {
        //         navigate(returnTo)
        //     }, 2000)
        }

        return (
                <Modal onClick={onClick} isOpen={successModal} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                <div className='mb-5 font-bold mt-3'>
                                        <h1 className='w-full'>
                                                {message}
                                        </h1>
                                </div>
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-5 mt-5">
                                <button  
                                        className="mt-2 w-full p-4 text-white hover:font-bold text-sm bg-green-600 rounded-md outline-none ring-offset-2 focus:ring-2 justify-start"
                                        onClick={isSuccessful}
                                        >
                                        Ok
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
