import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { Modal } from './Modal';
import { useQuery } from 'react-query';
import { BeatLoader } from 'react-spinners';
import { getCourseFaq } from '@/apis/backend/course';
// import { Modal } from "@/components/Modal";


export const CourseFaqQuestion = ({ currentCourse, openQuestion, onClick })  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();
        const [theId, setTheId] = useState(currentCourse.id)

        const { data, isLoading, refetch, isRefetching } = useQuery([`get-course-faq`], () => getCourseFaq(theId), { cacheTime: 0 })

        if(!isLoading)
        {
                console.log(data)
        }

        // const deleteProduct = async (deleteUrl) => 
        // {
        //         let token = localStorage.getItem("token")   
        //         await axios.delete(`${BASE_URL}${deleteUrl}`, {
        //                 headers: {
        //                         'Authorization': token ? `Bearer ${token}` : "",
        //                 }
        //         }).then((response) => 
        //         {  
        //                 console.log(response)
        //                 navigate(returnTo);
        //                 return onClick(false)
        //         }).catch((error) => { 
        //                 console.log(error)                      
        //                 return false
        //         })
        // }

        return (
                <Modal onClick={onClick} isOpen={openQuestion} wrapperWidth={1050} margin={'120px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 h-[500px] overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                <div className='col-span-12 flex justify-between item-center -mt-1'
                                >
                                        <div className="font-bold mb-2 mt-3 flex justify-left text-lg uppercase">frequently Asked Questions Under <span className='text-blue-600 ml-1'>{currentCourse.name}</span></div>
                                </div>
        
                                <div className='py-5'
                                        >
                                                {
                                                        isLoading && <div className="col-span-12 h-[200px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                                                <BeatLoader color="#1c9236" />
                                                        </div>
                                                }
                                                {
                                                        !isLoading && (data?.length === 0) && <div className="col-span-12 flex justify-center items-center pb-5" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                                                <p className='font-bold text-2xl text-green-600 p-5 mb-5'>No question for this course</p>
                                                        </div>
                                                }
                                                {
                                                        !isLoading && (data?.length > 0) && data?.map((question, index) => {
                                                                return (
                                                                        <div className='flex w-full justify-between gap-1 border border-2 mb-2 pr-3 hover:bg-green-100 cursor-pointer'>
                                                                                <div className="md:w-10/12 w-10/12 h-fit flex rounded-md mb-2 justify-left items-left p-3 items-center">{question.question}</div>
                                                                        </div>
                                                                )
                                                        })
                                                }
                                        </div>
                        </div>
                        <div className="items-left mt-2 sm:flex flex justify-between mb-2 mt-5">
                                <button  
                                        className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                        onClick={() =>
                                                onClick(!openQuestion)
                                        }
                                >
                                        Cancel
                                </button>
                        </div>
                </Modal>  
        );
}
