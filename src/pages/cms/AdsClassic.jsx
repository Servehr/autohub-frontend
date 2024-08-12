import * as yup from "yup";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import Pulsate from "@/components/Pulsate";
import { useQuery } from "react-query";
import { dashboardOverview } from "@/apis/backend/dashboard";
import { getAdverts } from "@/apis/ads";
import { PRODUCT_FACE } from "@/lib/axios";
import { Icons } from "@/util/icon";
import currencyFormatter from "@/utils/currency-formatter";


export default function AdsClassic()
{
    const [currentPage, setCurrentPage] = useState(1)  
    const [perPage, setPerPage] = useState(20)  
    const [searchQuery, setSearchQuery] = useState("")
    const [refresh, setRefresh] = useState(0)
    
    const { data: advertData, isLoading, isRefetching, refetch } = useQuery(["get-all-product"], () => getAdverts(currentPage, perPage, searchQuery), { cacheTime: 0 })
    
    if(!isLoading)
    {
        console.log(advertData)
    }

    return ( 
            <>
                <div className='grid grid-cols-12 gap-5 px-3 pb-5 mb-5 mt-5'
                        >                        
                            {
                                isLoading && <div className="col-span-12 h-[500px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                    <BeatLoader color="#1c9236" />
                                </div>
                            }
                            {
                                !isLoading && advertData?.product_advert?.product?.map((product, index) => {
                                    return (
                                        <div className="relative d-flex col-span-12 md:col-span-3 border rounded-lg p-2 bg-green-100 shadow-md" key={index}>
                                            <img src={`${PRODUCT_FACE}${product.image}`} alt="product images" className={`border border-solid border-3 mb-2 border-red-600 p-1 h-auto cursor-pointer`} />
                                            <div className="w-full p-2 flex bg-white">
                                                <p className="font-bold w-2/2 text-lg text-green-600">{ product?.title }</p>
                                            </div>
                                            <div className="w-full p-2 flex justify-between mt-1 items-center bg-white">
                                                <span className="font-bold w-1/2 text-lg uppercase text-blue-500">{ product?.country }</span>
                                                <span className="font-bold w-1/2 right-0 text-blue-500"> { product?.state } </span>
                                            </div>
                                            <div className="w-full p-2 flex justify-between mt-1 items-center bg-white">
                                                <span className="font-bold w-1/2 text-sm uppercase text-red-900">{ product?.user }</span>
                                                <span className="font-bold w-1/2 text-sm right-0 text-red-900"> { product?.condition } </span>
                                            </div>
                                            <div className="w-full p-2 flex bg-white mt-1">
                                                <p className="font-bold w-2/2 text-xl text-green-400">{ currencyFormatter(product?.price) }</p>
                                            </div>
                                            <div className={`flex justify-between p-1 bg-blue-100 mt-1 rounded-lg`}>
                                                <span className={"cursor-pointer"} onClick={() => { 
                                                            setDeleteUrl(`ad/remove-user-product-ads/${image.id}/${image.product_id}`)
                                                            setProductToDeleteMessage(`You are about to delete an image associated to product: ${imageId}`)
                                                            setImageProductUrl(image.image_url)
                                                            setDeleteModal(true)
                                                            console.log("")
                                                        }}
                                                        >
                                                        <Icons iconName={'delete'} color="red" width={5} height={5}  />
                                                </span>
                                                
                                                <span className="rounded-sm border border-1 right-0 delete cursor-pointer hover:bg-orange-200 hover:rounded-full hover:p-1" onClick={() => { 
                                                    // setImageFaceAdvert(image)
                                                        console.log("")
                                                        }
                                                    }
                                                >
                                                    <Icons iconName={'eye'} color="black" width={6} height={6} strokeWidth={1} />
                                                </span>
                                            </div>
                                        </div> 
                                    )
                                }) 
                            }

                        </div>
            </>
    )
}