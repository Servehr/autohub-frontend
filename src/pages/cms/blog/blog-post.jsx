import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { BeatLoader, BounceLoader } from "react-spinners";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";   
import { useQuery } from "react-query";
import '../../css/ad.css'
import '../../css/dragAndDrop.css'
import DynamicTable from "@/components/table"
import { viewPosts } from "@/apis/ads";
import Pagination from "@/components/Pagination";


export default function BlogPost()
{
    const navigate = useNavigate();
    const pages = [10, 20, 50, 100, 200]
    const [currentPage, setCurrentPage] = useState(1)  
    const [perPage, setPerPage] = useState(pages[0])  
    const [searchQuery, setSearchQuery] = useState("")
    
    const { data: blogPost, isLoading, isRefetching, refetch } = useQuery(["get-all-product"], () => viewPosts(currentPage, perPage, searchQuery), { refetchOnWindowFocus: true, cacheTime: 0 })

    if(!isLoading)
    {
        console.log(blogPost)
    }
    
    const columns = [
        { field: 'title' },
        { field: 'user' },
        { field: 'point' },
        { field: 'views' },
        { field: 'comment_count' },
        { field: 'created_at' },
        { field: 'updated_at' },
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

    const goTo = () => 
    {
        navigate('/a/create-post')
    }
    
  return ( 
        <div className="pb-5 bg-white"
        >
            <div className="grid grid-cols-12 justify-center items-center px-5 gap-3">
                <div className="col-span-1"
                >
                    <span className="font-bold md:w-2/12 text-2xl sm:w-full items-center">All Post</span>
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
                <div className="col-span-7"
                >
                    <input
                        type="text"
                        required
                        // ref={inputRef}
                        name="search"
                        autoComplete="off"
                        aria-label="Search name, brand or year"
                        // value={query}
                        className="md:w-12/12 sm:w-full h-[65px] w-full bg-gray-100 bg-opacity-50 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out"
                        placeholder="Search by title"
                        onKeyUp={tellThePost}
                    />    
                </div>
                <div className="col-span-2"
                >                           
                    <div onClick={goTo} className="font-bold h-[65px] text-md w-full text-sm rounded-md text-white bg-green-800 py-4 mx-4 text-center hover:text-black hover:bg-green-600 px-2 cursor-pointer">
                        Create Post
                    </div> 
                </div>
            </div>

            <div className="w-full p-3 mb-3 mt-3 flex justify-center items-center">
                {
                    isLoading && <div className="h-[300px]" style={{ marginTop: '50px', paddingTop: '100px' }}>
                        <BeatLoader color="#1c9236" />
                    </div>
                }
            </div>
            
            <div className="w-full p-3 mb-3 mt-3 flex items-center"
            >                
                {
                    !isLoading && (blogPost?.data?.posts.length > 0) &&  <DynamicTable 
                                                                header={['Title', 'Author', 'Point', 'Views', 'Comment', 'Created', 'Updated', 'Actions']} 
                                                                columns={columns}
                                                                data={blogPost?.data?.posts}
                                                                onClick={() =>  {
                                                                    refetch()
                                                                } }
                                                                page={'blog'}
                                                            />
                }
            </div>    
            { 
                    !isLoading && !isRefetching && (blogPost?.data?.posts?.length > 0) && 
                                <Pagination onClick={(data) => {
                                        setCurrentPage(data)
                                        // setPerPage(data.perPage)
                                        setTimeout(() => {
                                            refetch()   
                                        }, 1000)
                                    } 
                                } 
                                perPageNo={perPage} 
                                currentPageNo={currentPage} 
                                noOfPages={blogPost?.data?.noOfPages} 
                                hasNextPage={blogPost?.data?.hasNextPage} 
                                hasPreviousPage={blogPost?.data?.hasPreviousPage} 
                                from={''}
                            />    
            }
            <span className="p-20"></span>
        </div>
  )
}