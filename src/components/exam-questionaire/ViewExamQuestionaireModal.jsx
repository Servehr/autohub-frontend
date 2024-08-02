import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";


export const ViewExamQuestionaire = ({onClick, viewFaqModal, title, content, isOpened})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();

        const cancelModal = () => 
        {
                onClick(true)
        }
        
        return (
                <Modal onClick={onClick} isOpen={viewFaqModal} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                <h1 className='font-bold text-md mb-2'>Viewing Faq with title : {title}</h1>
                                
                                <div className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 pb-10 item-center'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <div className="w-full d-flex-row md:flex mt-1 gap-5 mb-5">
                                                                <span type="text" id="content" default={content} className="w-full p-5 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                                                        {title}                
                                                                </span>
                                                        </div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <span type="text" id="content" default={content} className="w-full p-5 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                                                        {content}                
                                                                </span>
                                                        </div>  
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <span type="text" id="content" default={content} className="w-full p-5 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                                                        {isOpened}                
                                                                </span>
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
                                </div>
                        </div>
                </Modal>  
        );
}
