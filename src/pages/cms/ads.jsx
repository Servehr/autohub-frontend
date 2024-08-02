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
    const [perPage, setPerPage] = useState(5)  
    const [searchQuery, setSearchQuery] = useState("")
    
    const { data: advertData, isLoading, isRefetching, refetch } = useQuery(["get-all-product"], () => getAdverts(currentPage, perPage, searchQuery), { cacheTime: 0 })
    const [dataTable, setDatable] = useState("")
    const [refresh, setRefresh] = useState(0)
      
    if(!isLoading)
    {
        // console.log(advertData)
    }

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
        // console.log("Great")
        // console.log(refresh)
        // console.log("Great")
    }, [refresh])

    useEffect(() => {
        // setSearchQuery(searchQuery)
    }, [searchQuery])

    const searchedProduct = (queryParameter) => 
    {
        console.log(queryParameter)
        GetSearchedProduct(queryParameter)
        .then((res) => {
            // setError(false)
            // setLoading(false);
            console.log(res)
            refetch()
            // setIsSuccess(res.message)
            // setSuccessModal(true)
        })
        .catch((err) => {
            // setIsSuccess("")
            console.log(err)
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
            console.log(e.target.value)
            // setShowSuggestions(false)
            refetch()
        } else {
            setSearchQuery("")     
            console.log(e.target.value)   
            refetch()                            
        }
    }

  return ( 
        <div className="pb-5 bg-white">
            <div className='w-full flex'>
                <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600'> 
                    <Sidebar />
                </div>
                <div className='bg-white md:w-10/12 lg:10/12 w-12/12 lg:flex-row px-5'>
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
                    
                    <div className="w-full p-3 mb-3 mt-3"
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
                                                                            console.log(e)
                                                                            setRefresh(e)
                                                                        } }
                                                                        page={''}
                                                                    />
                        }
                    </div>
                </div>
            </div>
            { 
                    !isLoading && !isRefetching && (advertData?.product_advert?.product.length > 0) && 
                            <Pagination onClick={(data) => {
                                      setCurrentPage(data)
                                      console.log(data)
                                      console.log(currentPage)
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

            {/* { !isLoading && 
                <nav className="w-full items-center mb-2 flex justify-center bg-brandDarkGray space-x-1 -mt-10" aria-label="Pagination">
                    { 
                        advertData?.product_advert?.hasPreviousPage && 
                            <button onClick={() => fetchRoles(parseInt(viewingPage)-1, perPage)} className="rounded-lg border bg-green-800 px-3 py-1 hover:bg-red-700" disabled={!advertData?.product_advert?.hasPreviousPage}>
                            
                                <span className="sr-only">Previous</span>
                                <svg className="mt-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd">
                                    </path>
                                </svg>
                            </button>
                    }
                    { 
                        before
                    }
                    {
                        <button className="rounded-lg border border-blue-900 bg-blue-900 px-3 py-1 text-white cursor-default">{currentPage} </button> 
                    }
                    { 
                        after
                    }
                    {
                        advertData?.product_advert?.hasNextPage &&
                            <button onClick={() => fetchRoles(parseInt(viewingPage)+1, perPage)} className="rounded-lg border bg-green-800 px-3 py-1 hover:bg-red-700"  disabled={!advertData?.product_advert?.hasNextPage}>
                                <span className="sr-only">Next</span>
                                <svg className="mt-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd">
                                </path>
                                </svg>
                            </button>
                    }
                </nav>
            } */}
        </div>
  )
}