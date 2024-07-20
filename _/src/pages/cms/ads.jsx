import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { BeatLoader } from "react-spinners";
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

export default function Ads()
{
    // const advertState = appStore((state) => state)
    const [currentPage, setCurrentPage] = useState(1)  
    const [perPage, setPerPage] = useState(11)  
    const [searchQuery, setSearchQuery] = useState("")
    
    const { data: advertData, isLoading, refetch } = useQuery(["get-all-product"], () => getAdverts(currentPage, perPage, searchQuery), { refetchOnWindowFocus: true, staleTime: Infinity, retry: 2 })
    const [dataTable, setDatable] = useState("")
    const [refresh, setRefresh] = useState(0)
      
    const [totalRow, setTotalRow] = useState(0)  
    const [pages, setPages] = useState(0)    
    const [theData, setData] = useState([]) 
    const [dataState, setDataState] = useState(false)
    const [hasNextPage, setHasNextPage] = useState() 
    const [hasPreviousPage, setHasPreviousPage] = useState() 
    const [isLoadingData, setIsLoading] = useState(false)


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

    // useEffect(() => 
    // {
        // setadvertData(roleadvertData(currentPage, perPage))
    // }, [])

    // const [isLoading, setIsLoading] = useState(false)
    // useEffect(() => {
    //     getProducts()
    // }, [isLoading])

    // const getProducts = async () => 
    // {
    //     let token = localStorage.getItem("token")  
    //     await axios.get(`${BASE_URL}ad/all-product`, {
    //             headers: { 'Authorization': token ? `Bearer ${token}` : ""}
    //             }).then((response) => 
    //             {  
    //                 if(response.data.data)
    //                 {
    //                     setIsLoading(true)
    //                     setDatable(response.data.data)
    //                 }
    //             }).catch((error) => {                        
    //                     console.log(error)
    //             })
    // }

    const fetchRoles = (theCurrentPage, thePerPage) =>
    {
        setCurrentPage(theCurrentPage)
        setPerPage(thePerPage)
        // refetch()
        roleData(theCurrentPage, thePerPage)
    }

    const roleData = async (theCurrentPage, thePerPage) => 
    {
        // setIsLoading(true)
        // setDataState(false)
        getAdverts(theCurrentPage, thePerPage)
            .then((res) => 
            {
                // refetch()
                // setIsLoading(true)
                console.log(res)
                // setTimeout(() => {
                    setCurrentPage(res?.product_advert?.currentPage)
                    setTotalRow(res?.product_advert?.totalPage)
                    setPages(res?.product_advert?.noOfPages)
                    setHasPreviousPage(res?.product_advert?.hasPreviousPage)
                    setHasNextPage(res?.product_advert?.hasNextPage)
                    // localStorage.setItem('noOfPages', res?.product_advert?.noOfPages)
                    // localStorage.setItem('totalPage', res?.product_advert?.totalPages)
                    // localStorage.setItem('currentPage', res?.product_advert?.currentPage)
                    setData(res?.product_advert?.roles)
                    setIsLoading(false)
                    refetch()
                // }, 2000)
            })
            .catch((err) => 
            {
                console.log(err)
                alert('No data found')
                 setDataState(true)
            })
    }
    let decrease = [];
    let increase = [];
    // const totaly = localStorage.getItem('currentPage')
    const totaly = currentPage
    // const showOnlySomeLinks: number = parseInt(totaly) - (parseInt(totaly) - 6)
    const showOnlySomeLinks = 2
    const y = parseInt(totaly)
  
    for (let index = 1; index <= showOnlySomeLinks; index++) 
    {
        if((y-index) >= 1)
        {
          decrease.push(y-index) 
        }
    }
  
    for (let index = 1; index <= showOnlySomeLinks; index++) 
    {
        if((y+index) > y)
        {
          increase.push(y+index) 
        }
    }
  
    const sorting = decrease.reverse()
    const before= sorting.map((num, index) => 
    {
          if(num !== y && y >= 1)
          {
              return <button className="rounded-lg border border-teal-500 px-3 py-1 hover:border-5 hover:border-green-500 text-white cursor-pointer bg-brandDarkGray hover:bg-brandGreen" onClick={() => fetchRoles(num, perPage)}>{(num)}</button> 
          }
    })
  
    // const total = localStorage.getItem('noOfPages')
    const total = pages
    const viewingPage = currentPage //localStorage.getItem('currentPage')
    const after= increase.map((num, index) => 
    {
          if(num !== y && y >= 1)
          {
              if(parseInt(total) >= num)
              {
                  return <button className="rounded-lg border border-teal-500 px-3 py-1 hover:border-5 hover:border-green-500 text-white cursor-pointer bg-brandDarkGray hover:bg-brandGreen" onClick={() => fetchRoles(num, perPage)}>{(num)}</button> 
              }
          }
    })

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

    const callTheSearch = (e) => 
    {        
        setCurrentPage(1)
        setPerPage(11)
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
                            onChange ={(e) => {
                                setSearchQuery(e.target.value)
                                console.log(searchQuery)
                                callTheSearch(e)
                            }}
                        />
                    </div>
                    
                    <div className="w-full p-3 mb-3 mt-3">
                        {
                            // !isLoading &&  <DynamicTable 
                            //                             header={['Title', 'Manufacturer', 'Model', 'Price', 'State', 'Condition', 'Actions']} 
                            //                             data={data} 
                            //                         />
                            !isLoading && (advertData?.product_advert?.product?.length > 0) &&  <DynamicTable 
                                                                        header={['Sender', 'Products', 'Price', 'State', 'Condition', 'Views', 'Status', 'Actions']} 
                                                                        columns={columns}
                                                                        data={advertData?.product_advert?.product}
                                                                        onClick={(e) =>  {
                                                                            console.log(e)
                                                                            setRefresh(e)
                                                                        } }
                                                                        page={'advert'}
                                                                    />
                        }
                    </div>
                </div>
            </div>
            { !isLoading && 
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
                        // (currentPage > 1) && 
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
            }
        </div>
  )
}