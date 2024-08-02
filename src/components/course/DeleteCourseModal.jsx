import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { DeleteFaq } from '@/apis/misc';
import { DeleteCourse } from '@/apis/backend/course';
import { BeatLoader, BounceLoader } from "react-spinners";


export const DeleteCourseModal = ({onClick, deleteCourseModal, deleteCourse, courseId})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();
        const [loading, setIsLoading] = useState(false)
        const [id, setId] = useState(Number(deleteCourse.id))

        const cancelModal = () => 
        {
                onClick(true)
        }
        // alert(id)
        const deleteCourses = () => 
        {
                setIsLoading(true)
                DeleteCourse(id)
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
                <Modal onClick={onClick} isOpen={deleteCourseModal} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'>
                                <h1 className='flex w-full justify-center items-center font-bold text-lg uppercase text-red-600 mx-auto'><span className='text-black mr-1'>You are about to delete Course </span> ({deleteCourse.name})</h1>
                                <span className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto text-blue-600'>Material Under<span className='text-red-600 mr-1 ml-1'> ({deleteCourse.name})</span> will also be deleted</span>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2 mt-5">
                                        <button  
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!deleteCourseModal)
                                                }}
                                        >
                                                        Cancel
                                        </button>
                                        <button
                                                disabled={loading}
                                                className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={deleteCourses}
                                                >                                                
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Delete" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
