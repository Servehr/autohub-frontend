import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';
import { UpdateTestQuestion } from '@/apis/backend/questions';
import { BeatLoader } from "react-spinners";


export const EditQuestionModal = ({onClick, data, editQuestion})  =>
{

        const [question, setQuestion] = useState(data['question'])
        const [optionA, setOptionA] = useState(data['option_a'])
        const [optionB, setOptionB] = useState(data['option_b'])
        const [optionC, setOptionC] = useState(data['option_c'])
        const [optionD, setOptionD] = useState(data['option_d'])
        const [answer, setAnswer] = useState(data['answer'])
        const [id, setId] = useState(data['id'])
        const [loading, setIsLoading] = useState(false)

        console.log({ question, optionA, optionB, optionC, optionD, answer })

        // const advertState = appStore((state) => state)
        // const navigate = useNavigate();
        // const [userProductId, setUserProductId] = useState(advertState.getProductId())
        // const [theTitle, setTitle] = useState("")
        // const [theContent, setTheContent] = useState("")
        // const [theIsOpened, setTheIsOpened] = useState(-1)
        // const options = [
        //         { key: -1, value: "- Select whether you want it published immediately or not -" },
        //         { key: "opened", value: "Yes" },
        //         { key: "closed", value: "No" },
        // ]

        // const cancelModal = () => 
        // {
        //         onClick(true)
        // }

        console.log(data)
        

        const updateQuestion = async () => 
        {       
                // const theId = data['id']            
                const data = { id: Number(id), question: question, option_a: optionA, option_b: optionB, option_c: optionC, option_d: optionD, answer: answer}
                console.log(data)
                setIsLoading(true)
                UpdateTestQuestion(data)
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
                <Modal onClick={onClick} isOpen={editQuestion} wrapperWidth={800} margin={'80px auto 0px auto'}>
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
                                                                rows="4" 
                                                                placeholder="Enter Question Here"
                                                                >
                                                                </textarea>
                                                        </div>
                                                
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <div className='d-flex w-full'>
                                                                        <span className='w-full p-3 -ml-2 font-bold'>A</span>
                                                                        <input onChange={(e) => {
                                                                                setOptionA(e.target.value)
                                                                        }} type="text" id="optionA" defaultValue={optionA}  name="optionA" placeholder="Enter Option A" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />                                                                        
                                                                </div>
                                                               <div className='d-flex w-full'>
                                                                        <span className='w-full p-3 -ml-2 font-bold'>B</span>
                                                                        <input onChange={(e) => {
                                                                                        setOptionB(e.target.value)
                                                                                }} type="text" id="optionB" defaultValue={optionB}  name="optionB" placeholder="Enter Option B" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                               </div>
                                                        </div>
                                                        
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <div className='d-flex w-full'>
                                                                        <span className='w-full p-3 -ml-2 font-bold'>C</span>
                                                                        <input onChange={(e) => {
                                                                                setOptionC(e.target.value)
                                                                        }} type="text" id="optionA" defaultValue={optionC}  name="optionA" placeholder="Enter Option A" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />                                                                        
                                                                </div>
                                                               <div className='d-flex w-full'>
                                                                        <span className='w-full p-3 -ml-2 font-bold'>D</span>
                                                                        <input onChange={(e) => {
                                                                                        setOptionD(e.target.value)
                                                                                }} type="text" id="optionB" defaultValue={optionD}  name="optionB" placeholder="Enter Option B" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                               </div>
                                                        </div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                               <div className='d-flex w-full'>
                                                                        <span className='w-full p-3 -ml-2 font-bold text-blue-600'>Answer</span>
                                                                        <input onChange={(e) => {
                                                                                setAnswer(e.target.value)
                                                                        }} type="text" id="answer" defaultValue={answer}  name="answer" placeholder="Enter Answer" className="font-bold text-xl w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                               </div>
                                                                
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
