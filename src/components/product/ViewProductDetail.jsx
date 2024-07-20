import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { SellablePrice, deleteAdProduct, setProductSliderAdvert } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { useQuery } from "react-query";
import { singelProduct } from '@/apis/misc';
import toast from "react-hot-toast";

export const ViewProductDetail = ({onClick, viewAdvert, productId})  =>
{
        // const advertState = appStore((state) => state)
        const [minimumPrice, setMinimumPrice] = useState(0)
        const [maximumPrice, setMaximumPrice] = useState(0)

        const { data, isLoading, refetch } = useQuery([`single-product/${productId}`], () => singelProduct(productId), { refetchOnWindowFocus: false, staleTime: Infinity, retry: 2 })

        if(!isLoading)
        {
                data.images.map((img, index) => {
                        console.log(img.image_url)
                })
        }

        const placeAdvert = async (img) => 
        {
                const imageAdvert = { imageId: img.id, productId: img.product_id }  
                await setProductSliderAdvert(imageAdvert)
                .then((res) => {
                        refetch()
                })
                .catch((err) => {
                        console.log(err)
                }
                )
        }

        const setSellablePrice = async () => 
        {
                const prices = { id: data.id, minimumPrice: minimumPrice, maximumPrice: maximumPrice }  
                await SellablePrice(prices)
                .then((res) => {
                        refetch()
                        console.log(res)
                        toast.success("Selling Price Successfully Set", { position: "top-center" });
                })
                .catch((err) => {
                        alert("Price Setting Failed")
                        console.log(err)
                }
                )
        }

        return (
                <Modal onClick={onClick} isOpen={viewAdvert} wrapperWidth={900} margin={'20px auto 0px auto'}>

                        {/* { !isLoading && <h1 className='font-bold text-lg'>{data.title} by {data.user.name} - {data.user.phoneno}</h1> } */}
                        <div className="items-center gap-5 sm:flex flex justify-between mx-5 mb-10">
                                { !isLoading && <h1 className='font-bold text-lg'>{data.title} by {data.user.name} - {data.user.phoneno}</h1> }
                                <button  
                                        className="mt-2 px-4 py-2 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                        onClick={() =>
                                        onClick(false)
                                }>
                                        Close
                                </button>
                        </div>
                        <div className='col-span-12 pb-2 overflow-auto overflow-y-scroll justify-center h-[620px] item-center'>
                                { !isLoading && 
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <div className="w-full d-flex md:flex mt-1 gap-5">
                                                                <div className='md:w-6/12 w-full p-3 rounded-md border border-2 mt-2'>{data.user.name}</div>
                                                                <div className='md:w-6/12 p-3 w-full rounded-md border border-2 mt-2'>{data.title}</div>
                                                        </div>
                                                </div>
                                                <div className="p-1 mt-1">
                                                        <div className="w-full d-flex md:flex mt-1 gap-5">
                                                                <div className='md:w-6/12 w-full p-3 rounded-md border border-2 mt-2'>{data.state_id}</div>
                                                                <div className='md:w-6/12 p-3 w-full rounded-md border border-2 mt-2'>{data.price}</div>
                                                        </div>
                                                </div>
                                                <div className="p-1 mt-1">
                                                        <div className="w-full d-flex md:flex mt-1 gap-5">
                                                                <div className='md:w-6/12 w-full p-3 rounded-md border border-2 mt-2'>{data.chasis_no}</div>
                                                                <div className='md:w-6/12 p-3 w-full rounded-md border border-2 mt-2'>{data.colour}</div>
                                                        </div>
                                                </div>
                                                <div className="p-1 mt-1">
                                                        <div className="w-full d-flex md:flex mt-1 gap-5">
                                                                <div className='md:w-6/12 w-full p-3 rounded-md border border-2 mt-2'>{data.condition_id}</div>
                                                                <div className='md:w-6/12 p-3 w-full rounded-md border border-2 mt-2'>{data.seat}</div>
                                                        </div>
                                                </div>
                                                <div className="p-1 mt-1 mb-3">
                                                        <div className="w-full d-flex md:flex mt-1 gap-5">
                                                                <div className='md:w-6/12 w-full p-3 rounded-md border border-2 mt-2'>{data.views}</div>
                                                                <div className='md:w-6/12 p-3 w-full rounded-md border border-2 mt-2'>{data.year_of_production}</div>
                                                        </div>
                                                </div>
                                                <div className="p-1 mt-1 mb-10">
                                                        <span className='font-bold text-red-500 -mb-1'>Sellable at Price Range</span>
                                                        <div className="w-full d-flex md:flex gap-5">
                                                                <div className='md:w-6/12 w-full p-3 mt-2'>
                                                                        <span>Minimum Price</span>
                                                                        <div className="flex flex-col w-full">
                                                                        <input
                                                                                type="number"
                                                                                name="message"
                                                                                defaultValue={data?.min_price}
                                                                                onChange={(e) => setMinimumPrice(Number(e.target.value)) }
                                                                                className="outline-none px-4 py-3 bg-transparent rounded-xl border  focus:border-brandGreen w-full transition duration-150"
                                                                                placeholder="0.00"
                                                                        />
                                                                        <p className="text-sm text-brandRed"></p>
                                                                        </div>
                                                                </div>
                                                                <div className='md:w-6/12 w-full p-3 mt-2'>
                                                                        <span>Maximum Price</span>
                                                                        <div className="flex flex-col w-full">
                                                                        <input
                                                                                type="number"
                                                                                name="message"
                                                                                defaultValue={data?.max_price}
                                                                                onChange={(e) => setMaximumPrice(Number(e.target.value)) }
                                                                                className="outline-none px-4 py-3 bg-transparent rounded-xl border  focus:border-brandGreen w-full transition duration-150"
                                                                                placeholder="0.00"
                                                                        />
                                                                        <p className="text-sm text-brandRed"></p>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                        <div className="w-full d-flex md:flex gap-5">
                                                                <div className='md:w-6/12 w-full p-3 mt-2'>
                                                                        <div className='flex justify-center cursor-pointer p-3 -ml-3 bg-blue-700 text-white font-bold hover:bg-green-700 
                                                                                        hover:text-gray-300 rounded-md'
                                                                                onClick={() => { setSellablePrice() }}
                                                                        >Set Sellable Price</div>
                                                                </div>
                                                        </div>
                                                </div>
                                                { 
                                                        data?.images && (data?.images.length > 0) && data.images.map((img, index) => {
                                                                let cssStyle = (img.as_advert === 1) ? "col-span-3 md:col-span-3 border border-2 mb-5 relative border border-2 border-green-700" : "col-span-3 md:col-span-3 border border-2 mb-5 relative"
                                                                return (
                                                                        <div className={cssStyle} key={index}>
                                                                                {/* <div className='top-20 right-10 px-5 py-2 text-white absolute'>
                                                                                        <div className='w-full text-xs font-bold text-red-700'>AutoHub</div>
                                                                                        <div className='text-xs font-bold text-green-800 -mt-15'>www.autohub.ng</div>
                                                                                </div> */}
                                                                                <img src={img.image_url} alt="product images" />
                                                                                <button 
                                                                                        onClick={() => {
                                                                                                console.log(img)
                                                                                                placeAdvert(img)
                                                                                        }} 
                                                                                        className='hover:bg-green-800 rounded-full text-sm p-3 px-5 bg-blue-700 text-white font-bold absolute bottom-11 right-11'>
                                                                                                place as advert - {img.as_advert}
                                                                                        </button>
                                                                        </div> 
                                                                )                                                       
                                                        }) 
                                                }
                                        </>
                                }
                        </div>
                </Modal>  
        );
}
