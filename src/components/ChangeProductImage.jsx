import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useQuery } from "react-query";
import { AVATAR, BASE_URL, PRODUCT_FACE } from "@/lib/axios";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import { DeleteImageModal } from "@/components/DeleteImageModal";
import { DeleteModal } from './DeleteModal';
import { Icons } from '@/util/icon';
import { AddProductImage } from './AddProductImage';
import { UserProductAdverts, setProductAdvert } from '@/apis/ads';


export const ChangeProductImage = ({onClick, imageModal, imageId, imageUrl, mode='view', productId, refetch})  =>
{
        const pId = localStorage.getItem("theProductId")
        const nos = Number(pId)

        const advertState = appStore((state) => state)
        const navigate = useNavigate()        
        const [deleteOpenModal, setDeleteModal] = useState(false)
        const [deleteUrl, setDeleteUrl] = useState("") 
        const [productToDeleteMessage, setProductToDeleteMessage] = useState("")
        const [imageToDisplay, setImageToDisplay] = useState(advertState.getImageOnEdit())
        const [userProductId, setUserProductId] = useState(productId)
        const [imageProductUrl, setImageProductUrl] = useState(imageUrl)
        
        const [ imageOpenModal, setImageOpenModal] = useState(false)   
        let token = localStorage.getItem("token") 

        useEffect(() => {
            if(imageOpenModal === false)
            {
                getImages()
            }
        }, [imageOpenModal, deleteOpenModal])

        const getImages = async (x = 0) => 
        {
                await axios.get(`${BASE_URL}ad/user-product-ads/${userProductId}`, {
                        headers: {
                                'Authorization': token ? `Bearer ${token}` : "",
                        }
                }).then((response) => 
                {  
                        advertState.setProductId("")
                        setImageToDisplay(response?.data?.data)
                        if(x === 3)
                        {  
                                onClick(Math.random()) 
                        }
                }).catch((error) => {      
                        
                })
        }

        const setImageFaceAdvert = async (image) => 
        {         
                await setProductAdvert({imageId: image.id, productId: image.product_id,})
                .then((res) => {
                        
                        getImages(Math.random())
                        onClick(true)
                })
                .catch((err) => {

                }
                )      
        }

        return (
                <>
                        <Modal onClick={onClick} isOpen={imageModal} wrapperWidth={900} margin={'20px auto 0px auto'} color='green'>
                                <div className="grid md:grid-cols-12 grid-cols-12 gap-5 mt-5 mb-5 flex">
                                        <h1 className='font-bold text-xl md:mb-5 mb-2 md:col-span-10 col-span-12'>{imageId}</h1>
                                        {
                                                (mode != 'view') && 
                                                <button className='md:col-span-2 col-span-12 cursor-pointer rounded-lg text-sm p-3 bg-green-800 hover:bg-blue-900 text-white' onClick={() => { 
                                                        setImageOpenModal(true)
                                                }}>Add Image</button>
                                        }
                                </div>
                             
                                        <div className="grid md:grid-cols-12 grid-cols-12 gap-5 mt-5 overflow-auto overflow-y-scroll justify-center item-center h-[550px]">
                                                {
                                                        imageToDisplay &&
                                                        imageToDisplay.length > 0 &&
                                                        imageToDisplay.map((image, index) => {
                                                                let selected = (image.cover_page === 0) ?  `` : `border border-10 border-green-800 p-1 h-auto`
                                                                let faceAdvert = (image.cover_page === 0) ?  `p-3 flex justify-between` : `p-3 flex justify-between`
                                                                return (
                                                                        <>
                                                                           <div className="relative d-flex col-span-12 md:col-span-3 border border-2" key={index}>
                                                                                <img src={`${PRODUCT_FACE}${image.image_url}`} alt="product images" className={selected} />
                                                                                <div className={`${faceAdvert}`}>
                                                                                        {
                                                                                                (mode != 'view') && 
                                                                                                <span className={""} onClick={() => { 
                                                                                                                setDeleteUrl(`ad/remove-user-product-ads/${image.id}/${image.product_id}`)
                                                                                                                setProductToDeleteMessage(`You are about to delete an image associated to product: ${imageId}`)
                                                                                                               setImageProductUrl(image.image_url)
                                                                                                                setDeleteModal(true)
                                                                                                        }}
                                                                                                >
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-5 h-5 md:w-5 md:h-5 my-2 cursor-pointer">
                                                                                                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                                                                                        </svg>
                                                                                                </span>
                                                                                        }
                                                                                        {
                                                                                                (mode != 'view') && 
                                                                                                <span className="rounded-sm border border-1 right-0 border-green-900 p-1 bg-blue-200 delete cursor-pointer hover:bg-orange-200" onClick={() => { 
                                                                                                                setImageFaceAdvert(image)
                                                                                                        }}
                                                                                                >
                                                                                                        <div 
                                                                                                        className="p-1 bg-blue-700 hover:bg-blue-900 text-white hover:font-bold" 
                                                                                                        style={{ fontSize: "9px" }}
                                                                                                        >
                                                                                                               Make as Main Image
                                                                                                        </div>
                                                                                                </span>
                                                                                        }
                                                                                </div>
                                                                           </div> 
                                                                        </> 
                                                                       )
                                                                })        
                                                }
                                        </div>
                                {/* } */}
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-left mb-2 mx-5 mt-8 -ml-1">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={() =>
                                                        onClick(imageModal)
                                                }
                                                >
                                                Close
                                        </button>
                                </div>
                        </Modal>
                        
                        
                        {
                                deleteOpenModal && (userProductId != "") && <DeleteModal onClick={() => setDeleteModal(false) } deleteModal={deleteOpenModal} deleteUrl={deleteUrl} imageProductUrl={imageProductUrl} returnTo={''} message={productToDeleteMessage} />
                        }

                        {
                                imageOpenModal && (userProductId != "") && <AddProductImage onClick={() => setImageOpenModal(false) } imageModal={imageOpenModal} imageId={imageId} adverProductId={userProductId} />
                        }
                </> 
        );
}
