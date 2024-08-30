import * as yup from "yup";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Link, Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import { useQuery } from "react-query";
import { getAdverts } from "@/apis/ads";
import { AllStudent } from "@/apis/backend/course";
import { AVATAR } from "@/lib/axios";
import toast from "react-hot-toast";
import { ConfirmStudent } from "@/components/marking/ConfirmStudent";
import Pagination from "@/components/Pagination";
import { StudentResult } from "@/components/marking/StudentResult";
import { StudentReceipt } from "@/components/marking/StudentReceipt";

export default function Students()
{
    const navigate = useNavigate();
    const pages = [10, 20, 50, 100, 200]
    const [currentPage, setCurrentPage] = useState(1)  
    const [perPage, setPerPage] = useState(pages[0])  
    const [searchQuery, setSearchQuery] = useState("")
    
    const [student, setStudent] = useState(-1)
    const [confirmAccess, setConfirmAccess] = useState(false)
    const [studentResult, setStudentResult] = useState(false)
    const [studentReceipt, setStudentReceipt] = useState(false)
    const [academicSession, setAcademicSession] = useState('xxx')
    
    const { data: allStudent, isLoading, isRefetching, refetch } = useQuery(["all-student"], () => AllStudent(currentPage, perPage, searchQuery, academicSession), { refetchOnWindowFocus: true,  cacheTime: 0 })
    if(!isLoading)
    {
        console.log(allStudent)
    }
    const displayByPageNo = (page) => 
    {   
        setPerPage(Number(page)) 
        setTimeout(() => 
        {          
            refetch()
        }, 1000)        
    }

    const tellThePost = (e) => 
    {        
        setSearchQuery(e.target.value)
        setTimeout(() => 
        {            
            callTheSearch(e)
        }, 1000)
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
    
    const AcademicSession = (x) => 
    {
        console.log(x)
        setAcademicSession(x)
        setTimeout(() => {
            refetch()
        }, 1000)
    }

    return ( 
                <div className="pb-5 bg-white"
                >
                        <div className="grid grid-cols-12 justify-center items-center px-5 gap-3">

                            <div className="col-span-1"
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
                                {/* <span className="font-bold md:w-2/12 text-2xl sm:w-full items-center">Enrolled Students</span> */}
                            </div>
                            <div className="col-span-4"
                            >
                            <div className="mb-4 border border-gray-200 mt-4"
                            >
                                <div className="relative"
                                >
                                    <select defaultValue={''} onChange={(e) => AcademicSession(e.target.value)} 
                                        className="block appearance-none w-full bg-gray-100 border h-[65px] text-2xl border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                        {       
                                            allStudent?.data?.academic_session?.map((academicSession, index) => (
                                                <option key={index} value={academicSession.identifier} className='p-2'>
                                                    {academicSession.name}
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
                                    aria-label="Search ..."
                                    // value={query}
                                    className="md:w-12/12 sm:w-full h-[65px] w-full bg-gray-100 bg-opacity-50 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 text-sm leading-8 transition-colors duration-200 ease-in-out"
                                    placeholder="Search name, middlename, lastname"
                                    onKeyUp={tellThePost}
                                />    
                            </div>
                        </div>
                        
                        <div className='grid grid-cols-12 gap-3 pb-5 mt-1'>                                
                            {
                                isLoading && <div className="col-span-12 h-[500px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                    <BeatLoader color="#1c9236" />
                                </div>
                            }
                            {
                                !isLoading && isRefetching && <div className="col-span-12 h-[50px] flex justify-center items-center" style={{ marginTop: '3px', paddingTop: '2px' }}>
                                    <BeatLoader color="#1c9236" />
                                </div>
                            }
                            {
                                !!isLoading && (allStudent?.data?.students.length === 0) && <div className="col-span-12 h-[50px] flex justify-center items-center" style={{ marginTop: '3px', paddingTop: '2px' }}>
                                    <span className="p-10 mt-20 font-bold text-green-600">No Record Found</span>
                                </div>
                            }
                            {
                                !isLoading && !isRefetching && (allStudent?.data?.students.length > 0) && allStudent?.data?.students?.map((student, index) => {
                                    return (
                                            <div className="relative d-flex col-span-6 md:col-span-3 border rounded-lg p-4 bg-green-100 shadow-md mt-7" key={index}>   
                                                <img src={`${AVATAR}${student.avatar}`} className="col-span-2 rounded-sm w-fit h-[200px] mb-2 p-1 bg-green-300 flex justify-center m-auto items-center" />
                                                <div className="w-full p-2 flex bg-white shadow-md">
                                                    <p className="font-bold w-2/2 text-lg text-green-600 text-center mx-auto">{ student?.name } { student?.middlename } { student?.lastname }</p>
                                                </div>
                                                <div className="w-full flex bg-white shadow-md"
                                                >
                                                    <span className={`${student?.student === undefined ? 'block' : 'hidden'} font-bold w-2/2 text-sm mb-1 text-blue-600 text-center mx-auto`}>{ student?.payment_status }</span>
                                                    <span className={`${student?.student != undefined ? 'block' : 'hidden'} font-bold w-2/2 text-sm mb-1 text-blue-600 text-center mx-auto`}>{ student?.student?.payment_status }</span>
                                                </div>
                                                <div className="w-full p-3 flex justify-between mt-1 items-center gap-1 bg-white shadow-md border-green-300">
                                                    <span className="font-bold w-fit p-2 cursor-pointer md:col-span-6 col-span-12 right-0 text-white bg-violet-500 hover:bg-violet-800 rounded-md text-xs"
                                                        onClick={() => {
                                                            setStudent(student)
                                                            setConfirmAccess(true)
                                                        }}
                                                    >Cofirm Access
                                                    </span>
                                                    <button 
                                                        className="font-bold w-fit p-2  md:col-span-6 col-span-12 right-0 text-white bg-blue-500 hover:bg-blue-800 rounded-md text-xs"
                                                        onClick={() => {
                                                            setStudent(student)
                                                            setStudentResult(true)
                                                        }}
                                                    >   View Result
                                                    </button>
                                                    <button 
                                                        disabled={(!student?.student?.receipt) ? true : false}
                                                        className="font-bold w-fit p-2  md:col-span-6 col-span-12 right-0 text-white bg-orange-500 hover:bg-orange-800 rounded-md text-xs"
                                                        onClick={() => {
                                                            setStudent(student)
                                                            setStudentReceipt(true)
                                                        }}
                                                    >   View Receipt
                                                    </button>
                                                </div>
                                                {/* { 
                                                    (student?.student?.academic_code === student?.student?.session_code) ? (
                                                            <></>
                                                    ) : (
                                                        <span className={`col-span-12 flex justify-center items-center font-bold text-sm mb-1 mt-2 p-3 bg-green-700 rounded-md mt-1 text-white cursor-pointer hover:bg-green-600 text-center mx-auto`}>
                                                            Enrol
                                                        </span>
                                                    )
                                                } */}
                                            </div> 
                                        )
                                    }) 
                            }
                        </div>
                    
                        <div className="p-6 mt-20"></div>
                            <div className="col-span-12"
                            >
                                { 
                                        !isLoading && !isRefetching && (allStudent?.data?.students?.length > 0) && 
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
                                                    noOfPages={allStudent?.data?.noOfPages} 
                                                    hasNextPage={allStudent?.data?.hasNextPage} 
                                                    hasPreviousPage={allStudent?.data?.hasPreviousPage} 
                                                    from={''}
                                                />    
                                }
                            </div>

                        {
                            confirmAccess && <ConfirmStudent confirmAccess={confirmAccess} student={student} onClick={(e) => {
                                    if(e === "yes")
                                    {                                                                          
                                        toast.success(`${student.name} successfully granted access`, {
                                            position: "top-center",
                                        });
                                    }
                                    refetch()  
                                    setConfirmAccess(false)
                            }} />
                        }
                        {
                            studentResult && <StudentResult studentResult={studentResult} student={student} onClick={(e) => {
                                    refetch()  
                                    if(e === "yes")
                                    {                                                                          
                                        toast.success(`${student.name} successfully granted access`, {
                                            position: "top-center",
                                        });
                                    }
                                    setStudentResult(false)
                            }} />
                        }
                        {
                            studentReceipt && <StudentReceipt studentReceipt={studentReceipt} student={student} onClick={(e) => {
                                    setStudentReceipt(false)
                            }} />
                        }
            </div>
    )
}