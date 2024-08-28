import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';
import { AddExamQuestionaire } from '@/apis/backend/questionaires';
import { BeatLoader } from "react-spinners";


export const AddExamQuestionaireModal = ({onClick, openQuestionaire, AllSessions})  =>
{
        const advertState = appStore((state) => state)
        const [loading, setIsLoading] = useState(false)
        const [theTitle, setTitle] = useState("")
        const [theContent, setTheContent] = useState("")
        const [currentAcademic, setCurrentAcademic] = useState(AllSessions)
        const [errMsg, setErrMsg] = useState("")
        const navigate = useNavigate();
        const [userProductId, setUserProductId] = useState(advertState.getProductId())
        const [theIsOpened, setTheIsOpened] = useState(-1)
        
        const options = [
                { key: -1, value: "- Select whether you want it published immediately or not -" },
                { key: "opened", value: "Yes" },
                { key: "closed", value: "No" },
        ]

        const cancelModal = () => 
        {
                onClick(true)
        }
        

        const addQuestion = async () => 
        {            
                setIsLoading(true)
                const data = { name: theTitle, description: theContent, current_session: currentAcademic }
                AddExamQuestionaire(data)
                .then((res) => 
                {
                        onClick()
                })
                .catch((err) => 
                {
                        setIsLoading(false)
                })    
        }

        return (
                <Modal onClick={onClick} isOpen={openQuestionaire} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center -mt-5'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <h1 className='font-bold text-lg mb-5'>Create Questionaire</h1>
                                                        {/* <div className="relative w-full mb-3">
                                                                <select onChange={(e) => 
                                                                   {  
                                                                        setCurrentAcademic(e.target.value)
                                                                   } 
                                                                }
                                                                defaultValue={''} 
                                                                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                        <option value={-1}> - Select Session -  </option> 
                                                                        {       
                                                                                AllSessions.map((academic, index) => (
                                                                                        <option key={index} value={academic?.identifier} className='p-2'>
                                                                                        {academic?.name} - {academic?.identifier}
                                                                                        </option>
                                                                                ))
                                                                        }
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-0">
                                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                                        </svg>
                                                                </div>
                                                                <div className="text-red-500 font-bold text-sm">{ "" }</div>
                                                        </div>  */}
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <input onChange={(e) => {
                                                                        setTitle(e.target.value)
                                                                }} type="text" id="title" defaultValue={''}  
                                                                name="title" 
                                                                placeholder="Enter Questionaire Name" 
                                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5">
                                                                <textarea onBlur={(e) => {
                                                                        setTheContent(e.target.value)
                                                                }} type="text" id="description" defaultValue={theContent}  
                                                                   name="description" 
                                                                   placeholder="Enter Description" 
                                                                   rows={5}
                                                                   className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                                                        onClick(!openQuestionaire)
                                                }}
                                        >
                                                        Cancel
                                        </button>
                                        <button
                                                disabled={loading}
                                                className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={addQuestion}
                                                >                                                
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Add" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
