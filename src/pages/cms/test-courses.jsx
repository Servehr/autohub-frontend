import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Sidebar  from "../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import '../css/ad.css'
import '../css/dragAndDrop.css'
import { appStore } from "@/state/appState";
import { browserType } from "@/store";
import DynamicTable from "@/components/table"
import { allProduct } from "@/apis/ads";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { fetchAllFaqs } from "@/apis/misc";
import { AddFaqModal } from "@/components/faq/AddFaqModal";
import { AddCourseModal } from "@/components/course/AddCourseModal";
import { BeatLoader, BounceLoader } from "react-spinners";
import { AllCourse } from "@/apis/backend/course";
import Pulsate from "@/components/Pulsate";

export default function TestCourses()
{
    const navigate = useNavigate()
    const { isMobile } = browserType();
    const { data, isLoading, refetch, isRefetching } = useQuery([`get-courses`], () => AllCourse(), { cacheTime: 0 })

    if(!isLoading)
    {
        console.log(data)
    }

    const [loading, setIsLoading] = useState(false)

    // const advertState = appStore((state) => state) 
    // const  data  = [
    //     {id: 1, question: 'Artificial Intelligence' },
    //     {id: 2, question: 'Repairs and Maintenance' },
    //     {id: 3, question: 'Car Dealings (Sales And Purchase)' },
    //     {id: 4, question: 'General Knowledge on Automobile' },
    //     {id: 5, question: 'Auctioning'}
    // ]    
    const [dataTable, setDatable] = useState("")
    const columns = [
        { field: 'name' },
        { field: 'description' }
    ]
    const [openCourseModal, setOpenCourseModal] = useState(false)
    const [clickTable, setClickTable] = useState(false)


    useEffect(() => {
        console.log("Giving")
        // refetch()
    }, [clickTable])

        

  return ( 
        <>
            <div className='w-full flex bg-white'>
                <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600'> 
                    <Sidebar />
                </div>
                <div className='bg-white md:w-10/12 lg:10/12 w-full lg:flex-row md:px-1 bg-white'>

                    <div className="w-full justify-between p-3 flex space-x-10 -mb-3 items-center bg-green-200 mb-5">                        
                        <div className="p-3 mt-5">
                            <h1 className="font-bold">Courses</h1>
                        </div>
                    </div>
                    
                    <div className="w-full p-5 mb-10 grid grid-cols-12 gap-5 bg-white" style={{ marginBottom: '100px' }}>
                        {
                            isLoading && <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                <BeatLoader color="#1c9236" />
                            </div>
                        }
                        {
                            !isLoading && (data.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                <h1 className="font-bold">
                                    No course created yet
                                </h1>
                            </div>
                        }

                        {
                            data?.map((x) => {
                                    return (
                                            <div onClick={() => {
                                                localStorage.setItem('editPost', x.id)
                                                navigate(`/test-questionaires/${x.id}`)
                                            }}
                                            className="text-md text-center md:col-span-4 col-span-12 px-2 py-7 justify-center w-full font-bold cursor-pointer 
                                                        text-black gap-2 bg-white items-center
                                                        ring-2 ring-blue-100 hover:bg-green-100 rounded-lg px-1 border border-solid 
                                                        border-blue-400 flex px-5"
                                            >
                                                {x.name}
                                            </div>
                                        )
                                })
                        }
                    </div>
                    <div className="h-[200px]"></div>

                </div>
            </div>
        </>
  )
}