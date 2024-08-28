import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { useQuery } from "react-query";
import { ActivateProduct, singelProduct, DeActivateProduct, SoldTheProduct } from '@/apis/misc';

export const SoldProducts = ({onClick, viewSoldProduct, data})  =>
{
        const ReverseProduct = () => 
        {
                ActivateProduct(data?.id)
                .then((res) => 
                {
                        onClick()
                })
                .catch((err) => 
                {
                        
                }
           )
        }

        const SoldProduct = async () => 
        {
                SoldTheProduct(data?.id)
                .then((res) => 
                {
                        onClick()
                })
                .catch((err) => 
                {
                        
                }
           )
        }

        return (
                <Modal onClick={onClick} isOpen={viewSoldProduct} wrapperWidth={800} margin={'150px auto 0px auto'}>

                        { 
                                <>
                                        <h1 className='font-bold w-full justify-center items-center flex text-lg mt-5 mb-10 uppercase'>{data?.title} by {data?.user} {data?.user.lastname} {data?.user.phoneno} is currently <span className='text-red-500 ml-1'> {data?.status}</span></h1>
                                        <div 
                                                className="items-center gap-5 mt-2 sm:flex flex justify-center mx-5 mt-5 mb-5"
                                        >
                                                {
                                                        (data?.status === "sold") && 
                                                                <button  
                                                                        className="mt-2 px-4 py-2 text-white hover:font-bold text-sm bg-red-600 hover:bg-red-900 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                                        onClick={ReverseProduct}
                                                                >
                                                                        REVERSE
                                                                </button>
                                                }
                                                {
                                                        (data?.status === "active") && 
                                                                <button
                                                                        className="mt-2 p-5 text-white hover:font-bold text-sm bg-blue-600 hover:bg-blue-900 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                                        onClick={SoldProduct}
                                                                >
                                                                        SOLD 
                                                                </button>
                                                }  
                                                {
                                                        ((data?.status != "active") && (data?.status != "sold")) && 
                                                                <button
                                                                        className="mt-2 p-5 text-white hover:font-bold text-sm bg-green-600 hover:bg-green-900 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                                        onClick={ReverseProduct}
                                                                >
                                                                        First make active 
                                                                </button>
                                                }                                                
                                        </div>
                                </>
                        }
                </Modal>  
        );
}
