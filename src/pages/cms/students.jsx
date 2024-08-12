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

export default function Students()
{
    const [currentPage, setCurrentPage] = useState(1)  
    const [perPage, setPerPage] = useState(20)  
    const [searchQuery, setSearchQuery] = useState("")
    const [refresh, setRefresh] = useState(0)
    const [student, setStudent] = useState(-1)
    const [confirmAccess, setConfirmAccess] = useState("")

    
    const { data, isLoading, isRefetching, refetch } = useQuery(["all-student"], () => AllStudent(), { cacheTime: 0 })
    
    if(!isLoading)
    {
        console.log(data)
    }

    return ( 
            <>
            <span className="font-bold text-xl col-span-12 text-green-600 ml-3 mb-20 font-bold uppercase">Students</span>
                        
                        <div className='grid grid-cols-12 gap-3 pb-5 mb-5 mt-10'>                                
                            {
                                isLoading && <div className="col-span-12 h-[500px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                    <BeatLoader color="#1c9236" />
                                </div>
                            }
                            {
                                !isLoading && data?.map((student, index) => {
                                    return (
                                            <div className="relative d-flex col-span-12 md:col-span-3 border rounded-lg p-4 bg-green-100 shadow-md" key={index}>   
                                                <img src={`${AVATAR}${student.avatar}`} className="col-span-2 rounded-sm w-fit h-[200px] mb-2 p-1 bg-green-300 flex justify-center m-auto items-center" />
                                                <div className="w-full p-2 flex bg-white">
                                                    <p className="font-bold w-2/2 text-lg text-green-600 text-center mx-auto">{ student?.name } { student?.middlename } { student?.lastname }</p>
                                                </div>
                                                <div className="w-full flex bg-white">
                                                    <p className="font-bold w-2/2 text-sm mb-1 text-blue-600 text-center mx-auto">{ student?.payment_status }</p>
                                                </div>
                                                <div className="w-full p-5 flex justify-between mt-1 items-center bg-white">
                                                    <span className="font-bold w-fit px-5 py-3 cursor-pointer md:col-span-6 col-span-12 right-0 text-white bg-violet-500 hover:bg-violet-800 rounded-md text-xs"
                                                        onClick={() => {
                                                            setStudent(student)
                                                            setConfirmAccess(true)
                                                        }}
                                                    >Cofirm Access
                                                    </span>
                                                    <span className="font-bold w-fit px-5 py-3 cursor-pointer md:col-span-6 col-span-12 right-0 text-white bg-orange-500 hover:bg-orange-800 rounded-md text-xs"
                                                        onClick={() => {
                                                            setStudent(student)
                                                            setConfirmAccess(true)
                                                        }}
                                                    >View Receipt
                                                    </span>
                                                </div>
                                            </div> 
                                        )
                                    }) 
                            }
                        </div>

                        {
                            confirmAccess && <ConfirmStudent confirmAccess={confirmAccess} student={student} onClick={() => {
                                    refetch()                                    
                                    toast.success(`${student.name} successfully granted access`, {
                                        position: "top-right",
                                    });
                                    setConfirmAccess(false)
                            }} />
                        }
            </>
    )
}