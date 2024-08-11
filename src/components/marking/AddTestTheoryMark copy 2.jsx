import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';
import { BeatLoader } from "react-spinners";
import { AddTest } from '@/apis/backend/questions';
import { UserTestTheoryAnswers } from '@/apis/backend/course';
import { useQuery } from 'react-query';


export const AddTestTheoryMark = ({onClick, openAddTestTheoryMark, userId})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();

        const { data, isLoading, refetch, isRefetching } = useQuery([`get-courses`], () => UserTestTheoryAnswers(userId), { staleTime: Infinity })
      
        if(!isLoading)
        {
            console.log(data)
        }

        const cancelModal = () => 
        {
                onClick(true)
        }        

        // const addQuestion = () => 
        // {   
        //         const data = { test_questionaire_id: Number(id), course_id: course, question: question, option_a: optionA, option_b: optionB, option_c: optionC, option_d: optionD, answer: answer}
        //         console.log(data)
        //         setIsLoading(true)
        //         AddTest(data)
        //         .then((res) => 
        //         {
        //                 console.log(res)
        //                 setIsLoading(false)
        //                 return onClick(Math.random())
        //         })
        //         .catch((err) => 
        //         {
        //                 setIsLoading(false)
        //                 console.log(err)
        //         })    
        // }

        return (
                <Modal onClick={onClick} isOpen={openAddTestTheoryMark} wrapperWidth={800} margin={'80px auto 0px auto'}
                >                        
                        {
                                // isLoading && <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                //         <BeatLoader color="#1c9236" />
                                // </div>
                        }
                        { 
                                !isLoading && data  && (data?.length > 0) &&
                                <div className='col-span-12 pt-1 justify-center item-center h-[100px]'>
                                        <h1>{student.name} {student.lastname}</h1>
                                             
                                </div>
                        } 
                </Modal>  
        );
}
