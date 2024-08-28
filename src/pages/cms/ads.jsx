import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { BeatLoader, BounceLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Sidebar  from "../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import '../css/ad.css'
import '../css/dragAndDrop.css'
import { appStore } from "@/state/appState";
import DynamicTable from "@/components/table"
import { GetSearchedProduct, allProduct, getAdverts } from "@/apis/ads";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import Pagination from "@/components/Pagination";

export default function Ads()
{
    const pages = [20, 25, 30, 50, 100, 200]
    const [currentPage, setCurrentPage] = useState(1)  
    const [perPage, setPerPage] = useState(pages[0])  
    const [searchQuery, setSearchQuery] = useState("")
    
    const { data: advertData, isLoading, isRefetching, refetch } = useQuery(["get-all-product"], () => getAdverts(currentPage, perPage, searchQuery), { cacheTime: 0 })
 
    const columns = [
        { field: 'user' },
        { field: 'title' },
        { field: 'price' },
        { field: 'state' },
        { field: 'condition' },
        { field: 'views' },
        { field: 'status' },
    ]

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
                            <span className="font-bold md:w-2/12 text-2xl sm:w-full items-center">All Student</span>
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
                    
                    <div className="w-full p-3 mb-3 mt-3 pb-5"
                    >
                        {isLoading && !isRefetching && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">                            
                                <BounceLoader color="#1c9236" />    
                            </div>
                        )}

                        {/* {!isLoading && isRefetching && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">                            
                                <BounceLoader color="#1c9236" />
                            </div>
                        )} */}

                        {
                            !isLoading && (advertData?.product_advert?.product?.length > 0) &&  <DynamicTable 
                                                                        header={['Sender', 'Products', 'Price', 'State', 'Condition', 'Views', 'Status', 'Actions']} 
                                                                        columns={columns}
                                                                        data={advertData?.product_advert?.product}
                                                                        onClick={(e) =>  {
                                                                            refetch()
                                                                        } }
                                                                        page={'advert'}
                                                                    />
                        }
                    </div>
                    { 
                        !isLoading && !isRefetching && (advertData?.product_advert?.product.length > 0) && 
                                <Pagination onClick={(data) => {
                                        setCurrentPage(data)
                                        // setRefresh(data)
                                        // setPerPage(data.perPage)
                                        setTimeout(() => {
                                            refetch()   
                                        }, 1000)
                                        // do all the setting here and then refresh for new set of data rows
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
                    <span className="p-20"></span>
            </>
  )
}