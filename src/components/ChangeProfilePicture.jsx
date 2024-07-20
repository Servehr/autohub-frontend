import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Link, useNavigate } from "react-router-dom";
import { appStore } from "@/state/appState";
import { Icons } from '@/util/icon';
import './css/dragAndDrop.css'
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { BeatLoader } from "react-spinners";

export const ChangeProfilePicture = ({onClick, imageModal, imageId, adverProductId})  =>
{
        console.log(adverProductId)
        const advertState = appStore((state) => state)
        const navigate = useNavigate();        
        const [imageToUpload, setImageToUpload] = useState(false)
        const [error, setError] = useState(false)
        const [imgeUrl, setUrl] = useState(false)
        const [productId, setProductId] = useState(adverProductId)
        const [loading, setIsLoading] = useState(false)
        
        // const [deleteOpenModal, setDeleteModal] = useState(false)
        // const [ deleteUrl, setDeleteUrl] = useState("") 
        // const [ productToDeleteMessage, setProductToDeleteMessage] = useState("") 
        const uploadImage = async () =>
        {
                // addProductAds(imageToUpload) 
                setIsLoading(true)
                let token = localStorage.getItem("token")           
                let imgTo = new FormData();
                imgTo.append('product', imageToUpload[0])
                await axios.post(`${BASE_URL}ad/change-profile-picture`, imgTo, {
                        headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': token ? `Bearer ${token}` : "",
                        }
                }).then((response) => 
                {  
                        setIsLoading(false)
                        setUrl("")
                        console.log(response.data.data[0])
                        onClick(response.data.data[0])
                }).catch((error) => { 
                        setIsLoading(false)
                        console.log(error)                      
                        return false
                })
        }

        const imageUrlToDisplay = (file) => 
        {
                const img = file[0]
                const displayedImage = URL.createObjectURL(img)
                setUrl(displayedImage)
                setImageToUpload(file)
        }

        const closeIt = () => 
        {
                return onClick(true)                
        }

        return (
                <>
                        <Modal onClick={onClick} isOpen={imageModal} wrapperWidth={500} margin={'90px auto 0px auto'} color='green'>
                                <div className={`transition duration-300 w-full ${!error && "hidden"}`}>
                                        <div className={`bg-red-500/10 border-red-500/80 border w-full flex justify-center p-2`}>
                                                <p className=" w-max text-center text-xs text-[#D10000]">{error}</p>
                                        </div>
                                </div>
                                <div className="grid grid:col-12 gap-5 mt-5 mb-5 justify-center items-center">
                                        <div className="bg-white shadow-md w-fit mx-auto">
                                                {/* <img src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTgzODM0NDU&ixlib=rb-1.2.1&q=80" alt="Product image" className="h-80 w-72 object-cover" /> */}
                                               { imgeUrl && 
                                                        <img src={imgeUrl} alt="Product image" className="h-80 w-72 object-cover" />
                                                }
                                         </div>
                                         
                                         <div className="drag-area p-3 items-center text-center mx-auto">
                                                <span className="flex select justify-center items-center text-xs block" role="button">
                                                        <b class="px-10 py-5">Browse</b>
                                                        <input type="file" id="product" name="product" className="file" onChange={
                                                                (e) => {
                                                                        imageUrlToDisplay(e.target.files)
                                                                }
                                                         } />
                                                </span>
                                        </div>
                                </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-left mb-2 mx-5 mt-1 -ml-1 justify-center flexx">                                        
                                        <button 
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={closeIt}
                                        >
                                                Close
                                        </button>
                                        {
                                                (imgeUrl != "") && <button  
                                                        className="py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                                        onClick={uploadImage}
                                                        >
                                                        {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Change Profile Picture" )          }

                                                </button>
                                        }
                                </div>
                        </Modal>
                </> 
        );
}
