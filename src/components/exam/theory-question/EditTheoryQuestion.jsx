import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';
import { UpdateExamQuestionTheory, UpdateTestQuestion, UpdateTestQuestionTheory } from '@/apis/backend/questions';
import { BeatLoader } from "react-spinners";
import { Modal } from '@/components/Modal';


export const EditTheoryQuestion = ({onClick, data, editQuestion})  =>
{

        const [question, setQuestion] = useState(data['question'])
        const [id, setId] = useState(data['id'])
        const [loading, setIsLoading] = useState(false)

        console.log(data)
        

        const updateQuestion = async () => 
        {       
                // const theId = data['id']            
                const data = { id: Number(id), question: question }
                console.log(data)
                setIsLoading(true)
                UpdateExamQuestionTheory(data)
                .then((res) => 
                {
                        console.log(res)
                        return onClick(Math.random())
                })
                .catch((err) => 
                {
                        console.log(err)
                        setIsLoading(false)
                })    
        }

        return (
                <Modal onClick={onClick} isOpen={editQuestion} wrapperWidth={1000} margin={'80px auto 0px auto'}>
                        <div className='col-span-12 pt-1 justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 justify-center h-fit py-2 item-center -mt-5'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <h1 className='font-bold text-lg mb-5 p-3 bg-blue-100 rounded-lg'>Edit Question</h1>
                                                        <div className="flex flex-wrap -m-2 mt-2 mb-2 px-2">
                                                                <span className="w-full font-bold text-sm mb-2">Question</span>
                                                                <textarea onChange={(e) => { 
                                                                                setQuestion(e.target.value)
                                                                } } defaultValue={question} 
                                                                className="shadow form-textarea mb-2 block w-full border rounded w-full 
                                                                        py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                                rows="10" 
                                                                placeholder="Enter Question Here"
                                                                >
                                                                </textarea>
                                                        </div>
                                                </div>
                                        </>
                                </div>
                                
                                <div className="items-center gap-5 sm:flex flex justify-between mb-2 mx-1">
                                        <button  
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!editQuestion)
                                                }}
                                                >
                                                        Close
                                        </button>
                                        <button
                                                disabled={loading}
                                                className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => updateQuestion() }
                                        >
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Update" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
