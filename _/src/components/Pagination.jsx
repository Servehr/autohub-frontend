import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { BeatLoader, BounceLoader } from "react-spinners";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";   
import { useQuery } from "react-query";
import { Icons } from '@/util/icon'
import AdminHeader from "@/layouts/AdminHeader";
import { fetchData } from "@/apis/ads";


export default function Pagination({onClick, perPageNo, currentPageNo, noOfPages, hasNextPage, hasPreviousPage, from})
{      
    const [currentPage, setCurrentPage] = useState(currentPageNo)  
    const [perPage, setPerPage] = useState(perPageNo)  
    const [pages, setPages] = useState(noOfPages)    

    console.log(currentPageNo)
    // console.log(perPage)
    
    const fetchRoles = async (theCurrentPage, thePerPage) => 
    {
        // alert(theCurrentPage)
        setCurrentPage(parseInt(theCurrentPage))
        onClick(theCurrentPage)
        // fetchData(theCurrentPage, thePerPage, from)
        //     .then((res) => 
        //     {
        //         onClick(res.data)
        //     })
        //     .catch((err) => 
        //     {
        //         console.log(err)
        //         alert('No data found')
        //     })
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
        if((currentPage-index) >= 1)
        {
          decrease.push(currentPage-index) 
        }
    }
  
    for (let index = 1; index <= showOnlySomeLinks; index++) 
    {
        if((currentPage+index) > currentPage)
        {
          increase.push(currentPage+index) 
        }
    }
  
    const sorting = decrease.reverse()
    const before= sorting.map((num, index) => 
    {
          if(num !== currentPage && currentPage >= 1)
          {
              return <button className="rounded-lg border border-teal-500 px-3 py-1 hover:border-5 hover:border-green-500 text-white cursor-pointer bg-brandDarkGray hover:bg-brandGreen" onClick={() => fetchRoles(num, perPage)}>{(num)}</button> 
          }
    })
  
    // const total = localStorage.getItem('noOfPages')
    const total = pages
    const viewingPage = currentPage //localStorage.getItem('currentPage')
    console.log(increase)
    const after= increase.map((num, index) => 
    {
          if(num !== currentPage && currentPage >= 1)
          {
              if(parseInt(pages) >= num)
              {
                  return <button className="rounded-lg border border-teal-500 px-3 py-1 hover:border-5 hover:border-green-500 text-white cursor-pointer bg-brandDarkGray hover:bg-brandGreen" onClick={() => fetchRoles(num, perPage)}>{(num)}</button> 
              }
          }
    })
    
    return (
                <nav className="w-full items-center mb-2 flex justify-center space-x-1 -mt-14 py-4 px-1" aria-label="Pagination"> {/* bg-brandDarkGray border border-1 border-green-900 */}                    
                    { 
                        hasPreviousPage && 
                            <button onClick={() => fetchRoles(parseInt(currentPage)-1, perPage)} className="rounded-lg border bg-green-800 px-3 py-1 hover:bg-red-700" disabled={!hasPreviousPage}>
                            
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
                        hasNextPage &&
                            <button onClick={() => fetchRoles(parseInt(currentPage)+1, perPage)} className="rounded-lg border bg-green-800 px-3 py-1 hover:bg-red-700"  disabled={!hasNextPage}>
                                <span className="sr-only">Next</span>
                                <svg className="mt-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd">
                                </path>
                                </svg>
                            </button>
                    }
                </nav>
  )

}