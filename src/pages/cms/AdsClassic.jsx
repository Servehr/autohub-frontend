import * as yup from "yup";
import { useState } from "react";
import { BeatLoader, BounceLoader } from "react-spinners";
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
import Pagination from "@/components/Pagination";
import { ViewProductDetail } from "@/components/product/ViewProductDetail";
import { VerifyProduct } from "@/components/product/VerifyProduct";
import { SoldProducts } from "@/components/product/SoldProduct";


export default function AdsClassic()
{
    const pages = [50, 100, 200, 500, 1000]
    const [currentPage, setCurrentPage] = useState(1)  
    const [perPage, setPerPage] = useState(pages[0])  
    const [searchQuery, setSearchQuery] = useState("")
    
    const { data: advertData, isLoading, isRefetching, refetch } = useQuery(["get-all-product"], () => getAdverts(currentPage, perPage, searchQuery), { cacheTime: 0 })
    
    const [viewAdvert, setProductViewDetail] = useState("")    
    const [verifyProduct, setVerifyProduct] = useState(false)
    const [productId, setProductId] = useState("")
    const [theProduct, setTheProduct] = useState("")
    const [viewSoldProduct, setSoldViewProduct] = useState(false)

    const displayByPageNo = (page) => 
    {   
        setPerPage(Number(page)) 
        setTimeout(() => 
        {          
            refetch()
        }, 2000)        
    }

    const tellThePost = (e) => 
    {        
        setSearchQuery(e.target.value)
        setTimeout(() => 
        {            
            callTheSearch(e)
        }, 2000)
    }

    const callTheSearch = (e) => 
    {        
        if (e.target.value != "") 
        {
            refetch()
        } else {
            setSearchQuery("")       
            refetch()                            
        }
    }

    return ( 
            <>
                <div className="grid grid-cols-12 justify-center items-center px-5 gap-3">

                    <div className="col-span-2"
                    >
                        <span className="font-bold md:w-2/12 text-2xl sm:w-full items-center">All Products</span>
                    </div>
                    <div className="col-span-2"
                    >
                    <div className="mb-4 border border-gray-200 mt-4"
                    >
                        <div className="relative"
                        >
                            <select defaultValue={''} onChange={(e) => displayByPageNo(e.target.value)} 
                                className="block appearance-none w-full bg-gray-100 border h-[65px] text-2xl border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                {       
                                    pages.map((page, index) => (
                                        <option key={index} value={page} className='p-2'>
                                            {page}
                                        </option>
                                    ))
                                }
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>   
                    </div>
                    <div className="col-span-8"
                    >
                        <input
                            type="text"
                            required
                            // ref={inputRef}
                            name="search"
                            autoComplete="off"
                            aria-label="Search ..."
                            // value={query}
                            className="md:w-12/12 sm:w-full h-[65px] w-full bg-gray-100 bg-opacity-50 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out"
                            placeholder="Search name, middlename, lastname"
                            onKeyUp={tellThePost}
                        />    
                    </div>
                </div>  

                <div 
                    className='grid grid-cols-12 gap-5 px-3 pb-5 mb-5 mt-5'
                >                        
                            {
                                isLoading && (
                                    <div className="min-h-[320px] col-span-12 flex justify-center items-center text-brandGreen">                            
                                        <BounceLoader color="#1c9236" />    
                                    </div>
                                )
                            }

                            {/* {
                                !isLoading && isRefetching && (
                                    <div className="min-h-[320px] col-span-12 flex justify-center items-center text-brandGreen">                            
                                        <BounceLoader color="#1c9236" />
                                    </div>
                                )
                            } */}

                            {
                                !isLoading && (advertData?.product_advert?.product?.length === 0) && (
                                    <div className="min-h-[320px] col-span-12 flex justify-center items-center text-brandGreen">
                                        <p className="text-2xl font-bold text-green-800">No Product Found</p>
                                    </div>
                                )
                            }
                            {
                                !isLoading && advertData?.product_advert?.product?.map((product, index) => {
                                    return (
                                        <div className="relative d-flex col-span-12 md:col-span-3 border rounded-lg p-2 bg-green-100 shadow-md" key={index}>
                                            <img src={`${PRODUCT_FACE}${product.image}`} 
                                                 alt="product images" 
                                                 className={`border border-solid border-3 mb-2 border-red-600 p-1 h-auto cursor-pointer`}                                                  
                                                 onClick={() => { 
                                                    setProductId(product?.id)
                                                    setProductViewDetail(true)
                                                }
                                            }
                                            />
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
                                            <div className="w-full p-2 flex justify-center item-center space-x-52 md:space-x-24 bg-white mt-1">
                                                <div className="font-bold w-2/2 text-xl text-green-700">{ currencyFormatter(product?.price) }</div>
                                                <div className="flex justify-center space-between items-center center py-1 px-3 rounded-full bg-green-100">
                                                    <Icons iconName={'eye'} color="black" width={6} height={6} strokeWidth={1} />
                                                    <span className="ml-2 mt-1 text-red-600 font-bold">{product?.views}</span>
                                                </div>
                                            </div>
                                            <div className={`flex justify-between p-2 bg-blue-100 mt-1 rounded-lg`}>
                                                <span className="bg-green-600 hover:bg-red-600 cursor-pointer px-3 py-1 rounded-md text-white text-sm font-bold"
                                                        onClick={() => {
                                                            setTheProduct(product)
                                                            setSoldViewProduct(true)
                                                        }}
                                                    >
                                                        Sold
                                                </span>
                                                <span  onClick={() =>
                                                            { 
                                                                setProductId(product.id)
                                                                setVerifyProduct(true) 
                                                            } }
                                                        className="flex justify-center cursor-pointer space-between items-center center py-1 px-3 rounded-full bg-green-100 text-sm font-bold hover:bg-green-600 hover:text-white hover:text-sm"
                                                >
                                                    Verify
                                                </span>
                                                <span className={`${product?.status === 'active' ? 'bg-blue-600' : 'bg-red-600'} hover:bg-blue-900 cursor-pointer px-3 py-1 rounded-md text-white text-sm font-bold`} 
                                                        onClick={() => { 
                                                            setProductId(product?.id)
                                                            setProductViewDetail(true)
                                                        }
                                                    }
                                                >
                                                    {product?.status}
                                                </span>
                                            </div>
                                        </div> 
                                    )
                                }) 
                            }

                </div>
                <div className="p-6 mt-14"></div>
                { 
                    !isLoading && !isRefetching && (advertData?.product_advert?.product.length > 0) && 
                            <Pagination onClick={(data) => 
                                {
                                    setCurrentPage(data)
                                    setTimeout(() => {
                                          refetch()   
                                    }, 1000)
                                } 
                            } 
                            perPageNo={perPage} 
                            currentPageNo={currentPage} 
                            noOfPages={advertData?.product_advert?.noOfPages} 
                            hasNextPage={advertData?.product_advert?.hasNextPage} 
                            hasPreviousPage={advertData?.product_advert?.hasPreviousPage} 
                            from={''}
                    />    
                }

                
                { viewAdvert && <ViewProductDetail onClick={() => setProductViewDetail(false) } viewAdvert={viewAdvert} productId={productId} /> }

                { viewSoldProduct && <SoldProducts viewSoldProduct={viewSoldProduct} data={theProduct}
                    onClick={() => {
                        refetch()
                        setSoldViewProduct(false)
                    } } 
                 /> }

                { verifyProduct && <VerifyProduct onClick={(e) => { 
                                                                setVerifyProduct(false)
                                                                refetch()
                                                            }
                                            } verifyProduct={verifyProduct} productId={productId} /> }
            </>
    )
}