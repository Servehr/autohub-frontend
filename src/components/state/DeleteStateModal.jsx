import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { DeleteFaq } from '@/apis/misc';


export const DeleteStateModal = ({onClick, deleteStateModal, stateId})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();

        const cancelModal = () => 
        {
                onClick(true)
        }

        const deleteFaq = () => 
        {
                DeleteFaq(stateId)
                .then((res) => 
                {
                        onClick(Math.random())
                })
                .catch((err) => 
                {
                        console.log(err)
                })       
        }
        
        return (
                <Modal onClick={onClick} isOpen={deleteStateModal} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'>
                                <h1 className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto'>You are about to delete {'title'}</h1>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2 mt-5">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={() => {
                                                        onClick(!deleteStateModal)
                                                }}
                                                >
                                                        Close
                                        </button>
                                        <button
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                onClick={() => deleteFaq() }
                                        >
                                        Delete 
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
