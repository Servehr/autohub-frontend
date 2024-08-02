import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { Modal } from '../Modal';
import { useQuery } from 'react-query';
import { getCourseFaq } from '@/apis/backend/course';
import { BeatLoader } from 'react-spinners';
import { AddCourseFaqQuestion } from './AddCourseFaqQuestion';
import { EditCourseFaqQuestion } from './EditCourseFaqQuestion';
import { DeleteCourseFaqQuestion } from './DeleteCourseFaqQuestion';
import { Icons } from '@/util/icon';


export const AdminCourseFaqQuestion = ({ courseId, openTheCourseFaq, onClick })  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();
        const [openAddCourseFaqQuestion, setOpenAddCourseFaqQuestion] = useState("")
        const [editAddCourseFaqQuestion, setOpenEditCourseFaqQuestion] = useState("")
        const [deleteAddCourseFaqQuestion, setOpenDeleteCourseFaqQuestion] = useState("")
        const [courseFaq, setCourseFaq] = useState("")
        // alert(courseId.id)

        console.log(courseId)

        const { data, isLoading, refetch, isRefetching } = useQuery([`get-course-faq`], () => getCourseFaq(courseId.id), { cacheTime: 0 })

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
                <>
                        <Modal onClick={onClick} isOpen={openTheCourseFaq} wrapperWidth={1050} margin={'100px auto 0px auto'}>
                
                                <div className='col-span-12 md:flex d-flex justify-between item-center -mt-1 pb-3 border-b-2'
                                >
                                        <div className='order-1 md:order-2 hover:bg-blue-900 bg-blue-600 cursor-pointer rounded-xl p-3 md:px-3 py-3 flex text-sm font-bold text-white items-center w-fit' onClick={() => {
                                                setOpenAddCourseFaqQuestion(true)
                                        }} 
                                        >
                                                Add FAQ
                                        </div>
                                        <span className="sm:order-last font-bold mb-2 mt-3 flex justify-center items-center text-lg uppercase">{courseId.name}</span>
                                </div>
                                <div className='col-span-12 pt-1 h-[550px] pb-5 px-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center -mb-3'>
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
                                                                                <div className="flex justify-center text-sm items-center" onClick={() => {
                                                                                        console.log(question)
                                                                                        setCourseFaq(question)
                                                                                        setOpenEditCourseFaqQuestion(true)
                                                                                }}>
                                                                                        <Icons iconName={'edit'} width={6} height={6} color='blue' />
                                                                                </div>
                                                                                <div className="flex justify-center text-sm items-center" onClick={() => {
                                                                                        setCourseFaq(question)
                                                                                        setOpenDeleteCourseFaqQuestion(true)
                                                                                }}>
                                                                                        <Icons iconName={'delete'} width={6} height={6} color='red' />
                                                                                </div>
                                                                        </div>
                                                                )
                                                        })
                                                }
                                        </div>
                                </div>
                                <div className="items-left mt-2 sm:flex flex justify-left mb-2 mt-5">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={() =>
                                                                   onClick(!openTheCourseFaq)
                                                }
                                        >
                                                Cancel
                                        </button>
                                </div>
                        </Modal> 
                        { openAddCourseFaqQuestion  && <AddCourseFaqQuestion courseFaq={courseId} openAddCourseFaqQuestion={openAddCourseFaqQuestion} onClick={() => {
                                refetch()
                                setOpenAddCourseFaqQuestion(false)
                        }} /> }

                        { editAddCourseFaqQuestion   && <EditCourseFaqQuestion courseFaq={courseFaq} editAddCourseFaqQuestion ={editAddCourseFaqQuestion } onClick={() => {
                                refetch()
                                setOpenEditCourseFaqQuestion(false)
                        }} /> }

                        { deleteAddCourseFaqQuestion   && <DeleteCourseFaqQuestion courseFaq={courseFaq} deleteAddCourseFaqQuestion ={deleteAddCourseFaqQuestion } onClick={() => {
                                refetch()
                                setOpenDeleteCourseFaqQuestion(false)
                        }} /> }

                </> 
        );
}
