import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { DeleteFaq } from '@/apis/misc';
import { BeatLoader, BounceLoader } from "react-spinners";
import { RemoveCourse } from '@/apis/backend/course';


export const RemoveCourseModal = ({onClick, removeUploadCourse, removeCourse, courseId})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();
        const [loading, setIsLoading] = useState(false)
        const [id, setId] = useState(Number(removeCourse.id))

        const cancelModal = () => 
        {
                onClick(true)
        }

        // console.log(removeCourse.id)
        
        const RemoveCoursesMaterial = () => 
        {
                setIsLoading(true)
                const data = { id: removeCourse.id }
                RemoveCourse(data)
                .then((res) => 
                {
                        onClick(Math.random())
                })
                .catch((err) => 
                {
                        setIsLoading(false)
                        console.log(err)
                })       
        }
        
        return (
                <Modal onClick={onClick} isOpen={removeUploadCourse} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'>
                                <div className='flex w-full justify-center items-center font-bold text-md uppercase text-red-600 mx-auto in-line'><span className='text-black mr-1'>You are about to remove the course material for </span> ({removeCourse.name})</div>
                                {/* <span className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto text-blue-600'>Material Under<span className='text-red-600 mr-1 ml-1'> ({removeCourse.name})</span> will also be deleted</span> */}
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2 mt-5">
                                        <button  
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!removeUploadCourse)
                                                }}
                                        >
                                                        Cancel
                                        </button>
                                        <button
                                                disabled={loading}
                                                className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={RemoveCoursesMaterial}
                                                >                                                
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Remove Course Material" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
