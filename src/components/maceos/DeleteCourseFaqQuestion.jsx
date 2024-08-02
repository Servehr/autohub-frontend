import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';
import { AddExamQuestionaire, AddExamQuestionaireTheory } from '@/apis/backend/questionaires';
import { BeatLoader } from "react-spinners";
import { Modal } from '@/components/Modal';
import { RemoveCourseFaq } from '@/apis/backend/course';


export const DeleteCourseFaqQuestion  = ({courseFaq, onClick, deleteAddCourseFaqQuestion})  =>
{
        const [loading, setIsLoading] = useState(false)
        const [courseFaqQuestion, setQuestion] = useState(courseFaq.question)
        const [courseFaqId, setCourseFaqId] = useState(courseFaq.id)
        const [errMsg, setErrMsg] = useState("")


        const cancelModal = () => 
        {
                onClick(true)
        }        

        const deleteCourseFaq = async () => 
        {            
                setIsLoading(true)
                RemoveCourseFaq(courseFaqId)
                .then((res) => 
                {
                        console.log(res)
                        return onClick(Math.random())
                })
                .catch((err) => 
                {
                        setIsLoading(false)
                        console.log(err)
                })    
        }

        return (
                <Modal onClick={onClick} isOpen={deleteAddCourseFaqQuestion} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>

                                
                                <h4 className='font-bold text-lg mb-5 flex items-center text-red-500 p-3 rounded-md justify-center uppercase'>You are about to delete</h4>
                                <h1 className='font-bold text-lg mb-5 flex items-center bg-blue-100 p-3 rounded-md justify-center'>{courseFaqQuestion}</h1>   
                                                             
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 mt-3">
                                        <button  
                                                className="py-3 px-4 bg-gray-600 hover:bg-gray-900 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!deleteAddCourseFaqQuestion)
                                                }}
                                        >
                                                        Cancel
                                        </button>
                                        <button
                                                disabled={loading}
                                                className="mt-2 py-3 px-4 bg-red-600 hover:bg-red-900 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={deleteCourseFaq}
                                                >                                                
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Delete" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
