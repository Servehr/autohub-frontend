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
import { UpdateCourseFaq } from '@/apis/backend/course';


export const EditCourseFaqQuestion  = ({courseFaq, onClick, editAddCourseFaqQuestion})  =>
{
        const [loading, setIsLoading] = useState(false)
        const [courseFaqQuestion, setQuestion] = useState(courseFaq.question)
        const [courseFaqId, setCourseFaqId] = useState(courseFaq.id)
        const [errMsg, setErrMsg] = useState("")


        const cancelModal = () => 
        {
                onClick(true)
        }        

        const addCourseFaq = async () => 
        {            
                setIsLoading(true)
                const data = { id: courseFaqId, question: courseFaqQuestion }
                console.log(data)
                UpdateCourseFaq(data)
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
                <Modal onClick={onClick} isOpen={editAddCourseFaqQuestion} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center -mt-5'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <h1 className='font-bold text-lg mb-5'>Edit Question To Course That Could Be Asked {courseFaqId}</h1>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5">
                                                                <textarea onBlur={(e) => {
                                                                        setQuestion(e.target.value)
                                                                }} type="text" id="description" defaultValue={courseFaqQuestion}  
                                                                   name="description" 
                                                                   placeholder="Enter Description" 
                                                                   rows={4}
                                                                   className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-lg py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                                >
                                                                </textarea>
                                                        </div>
                                                </div>
                                        </>
                                </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 mt-3">
                                        <button  
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!editAddCourseFaqQuestion)
                                                }}
                                        >
                                                        Cancel
                                        </button>
                                        <button
                                                disabled={loading}
                                                className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={addCourseFaq}
                                                >                                                
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Update" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
