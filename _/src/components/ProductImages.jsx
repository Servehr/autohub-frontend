import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";


export const ProductImages = ({onClick, deleteModal, productId, imaegUrl})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();

        const deleteProduct = async (deleteUrl) => {
            const response = await deleteAdProduct(deleteUrl)
            if(response.success === 1)
            {
                // window.location.href = returnTo                
                // navigate(returnTo);
                // advertState.setRefresh(advertState.getRefresh()+1)
                // return true
                // window.location.reload()
            }
        }

        return (
                <Modal onClick={onClick} isOpen={deleteModal} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                <h1 className='ml-20 mb-5 font-bold mt-3'>{message}</h1>                                
                        {
                                imaegUrl && imaegUrl !="" && <div className="max-w-sm rounded overflow-hidden shadow-lg m-auto pb-10">
                                        <img className="w-full" src={imaegUrl} alt="Sunset in the mountains" />
                                </div>
                        }
                        <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-5 mt-5">
                                <button  
                                        className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                        onClick={() =>
                                                onClick(deleteModal)
                                        }
                                        >
                                        Cancel
                                        </button>
                                        <button
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                onClick={() => deleteProduct(deleteUrl)}
                                        >
                                        Delete 
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
