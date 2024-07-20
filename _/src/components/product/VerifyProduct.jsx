import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { useQuery } from "react-query";
import { ActivateProduct, singelProduct, DeActivateProduct } from '@/apis/misc';

export const VerifyProduct = ({onClick, verifyProduct, productId})  =>
{
        // const advertState = appStore((state) => state)
        const { data, isLoading, refetch } = useQuery([`single-product/${productId}`], () => singelProduct(productId), { refetchOnWindowFocus: false, staleTime: Infinity, retry: 2 })

        if(!isLoading)
        {
        }

        // useEffect(() => {
        //     refetch()
        // }, [refresh])

        const activateProduct = async () => 
        {
                ActivateProduct(productId)
                .then((res) => 
                {
                        refetch()
                        return onClick(productId*333)
                })
                .catch((err) => 
                {
                        console.log(err)
                }
           )
        }

        const deActivateProduct = async () => 
        {
                DeActivateProduct(productId)
                .then((res) => 
                {
                        refetch()
                        return onClick(productId*3337)
                })
                .catch((err) => 
                {
                        console.log(err)
                }
           )
        }

        return (
                <Modal onClick={onClick} isOpen={verifyProduct} wrapperWidth={800} margin={'150px auto 0px auto'}>

                        { !isLoading && <>
                                <h1 className='font-bold w-full justify-center items-center flex text-lg mt-5 mb-10'>{data.title} by {data.user.name} - {data.user.phoneno} is currently {data.status}</h1>
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mx-5 mt-5 mb-5">
                                        <button  
                                                className="mt-2 px-4 py-2 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={() =>
                                                onClick(verifyProduct)
                                        }>
                                                CANCEL
                                        </button>
                                        <button
                                                className="mt-2 px-4 py-2 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                onClick={() => deActivateProduct()}
                                        >
                                                UNPUBLISH 
                                        </button>
                                        <button
                                                className="mt-2 px-4 py-2 text-white hover:font-bold text-sm bg-green-900 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                onClick={() => {
                                                        activateProduct()
                                                } }
                                        >
                                                PUBLISH 
                                        </button>
                                </div>
                        </>
                }
                </Modal>  
        );
}
