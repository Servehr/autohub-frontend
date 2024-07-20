import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import { BeatLoader } from "react-spinners";
import axios from 'axios';
import { BASE_URL, PRODUCT_FACE } from "@/lib/axios";

  
export const DeleteWishList = ({onClick, deleteWisListModal, deleteUrl, returnTo, message, imaegUrl, imageProductUrl=''})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();
        const [userProductId, setUserProductId] = useState(advertState.getProductId())
        const [loading, setIsLoading] = useState(false)
        console.log(imageProductUrl)

        const deleteProduct = async (deleteUrl) => 
        {
                setIsLoading(true)
                let token = localStorage.getItem("token")   
                await axios.delete(`${BASE_URL}${deleteUrl}`, {
                        headers: {
                                'Authorization': token ? `Bearer ${token}` : "",
                        }
                }).then((response) => 
                {  
                        setIsLoading(false)
                        console.log(response)
                        // navigate(returnTo);
                        return onClick(false)
                }).catch((error) => { 
                        console.log(error)                      
                        return false
                })
        //     const response = await deleteAdProduct(deleteUrl)
        //     if(response.success === 1)
        //     {
                // window.location.href = returnTo                
                // navigate(returnTo);
                // advertState.setRefresh(advertState.getRefresh()+1)
                // return true
                // delete
        //         window.location.reload()
        //     }
        }

        return (
                <Modal onClick={onClick} isOpen={deleteWisListModal} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                <h1 className='mb-5 font-bold mt-3'>{message}</h1>                               
                                {
                                        imageProductUrl && imageProductUrl !="" && <div className="max-w-sm rounded overflow-hidden shadow-lg m-auto">
                                                <img className="w-full" src={`${PRODUCT_FACE}${imageProductUrl}`} alt="Sunset in the mountains" />
                                        </div>
                                }
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-5 mt-5">
                                <button  
                                        className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                        onClick={() =>
                                                onClick(deleteWisListModal)
                                        }
                                        >
                                        Cancel
                                        </button>
                                        {
                                               <button 
                                                        className="py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                                        onClick={() => deleteProduct(deleteUrl)}
                                                                >
                                                        {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Remove From Wish List" )          }
                                              </button>
                                        }
                                </div>
                        </div>
                </Modal>  
        );
}
