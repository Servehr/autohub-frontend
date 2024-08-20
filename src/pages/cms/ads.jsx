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
    // const advertState = appStore((state) => state)
    const [currentPage, setCurrentPage] = useState(1)  
    const [perPage, setPerPage] = useState(20)  
    const [searchQuery, setSearchQuery] = useState("")
    
    const { data: advertData, isLoading, isRefetching, refetch } = useQuery(["get-all-product"], () => getAdverts(currentPage, perPage, searchQuery), { cacheTime: 0 })
    const [dataTable, setDatable] = useState("")
    const [refresh, setRefresh] = useState(0)
 
    const columns = [
        { field: 'user' },
        { field: 'title' },
        { field: 'price' },
        { field: 'state' },
        { field: 'condition' },
        { field: 'views' },
        { field: 'status' },
    ]

    useEffect(() => {
        refetch()
    }, [refresh])

    useEffect(() => {
        // setSearchQuery(searchQuery)
    }, [searchQuery])

    const searchedProduct = (queryParameter) => 
    {
        GetSearchedProduct(queryParameter)
        .then((res) => {
            // setError(false)
            // setLoading(false);
            refetch()
            // setIsSuccess(res.message)
            // setSuccessModal(true)
        })
        .catch((err) => {
            // setIsSuccess("")
            // setLoading(false);
            // setError(`${err}`);
        }
      )
    }

    const tellThePost = (e) => 
    {        
        setSearchQuery(e.target.value)
        callTheSearch(e)
    }

    const callTheSearch = (e) => 
    {        
        if (e.target.value != "") 
        {
            // searchedProduct(value)
            // setShowSuggestions(false)
            refetch()
        } else {
            setSearchQuery("")       
            refetch()                            
        }
    }

  return ( 
            <>
                    <div className="bg-white p-3 mt-5 -mb-2 text-xl font-bold flex">
                        <span className="font-bold md:w-2/12 text-md sm:w-full items-center">All Adverts - {searchQuery} </span>
                        <input
                            type="text"
                            required
                            // ref={inputRef}
                            name="search"
                            autoComplete="off"
                            aria-label="Search name, brand or year"
                            // value={query}
                            className="md:w-10/12 sm:w-full w-full bg-gray-100 bg-opacity-50 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out"
                            placeholder="Search sender, product, price, state, condition, status    "
                            onChange ={tellThePost}
                        />
                    </div>
                    
                    <div className="w-full p-3 mb-3 mt-3 pb-5"
                    >
                        {isLoading && !isRefetching && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">                            
                                <BounceLoader color="#1c9236" />    
                            </div>
                        )}

                        {!isLoading && isRefetching && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">                            
                                <BounceLoader color="#1c9236" />
                            </div>
                        )}

                        {
                            !isLoading && !isRefetching && (advertData?.product_advert?.product?.length > 0) &&  <DynamicTable 
                                                                        header={['Sender', 'Products', 'Price', 'State', 'Condition', 'Views', 'Status', 'Actions']} 
                                                                        columns={columns}
                                                                        data={advertData?.product_advert?.product}
                                                                        onClick={(e) =>  {
                                                                            setRefresh(e)
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