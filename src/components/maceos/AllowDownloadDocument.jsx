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
import { CourseAssessment } from '@/apis/backend/course';


export const AllowDownloadDocument  = ({theDocument, onClick, allowDcument})  =>
{
        const [loading, setIsLoading] = useState(false)
        const [courseName, setQuestion] = useState(theDocument.name)
        const [courseId, setCourseFaqId] = useState(theDocument.id)
        const [errMsg, setErrMsg] = useState("")


        const cancelModal = () => 
        {
                onClick(true)
        }        

        const DocumentDownload = async () => 
        {            
                setIsLoading(true)
                CourseAssessment(courseId)
                .then((res) => 
                {
                        return onClick(Math.random())
                })
                .catch((err) => 
                {
                        setIsLoading(false)
                })    
        }

        return (
                <Modal onClick={onClick} isOpen={allowDcument} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>

                                
                                <h4 className='font-bold text-lg mb-5 flex items-center text-red-500 p-3 rounded-md justify-center uppercase'
                                >
                                        On setting assessment, course test and exam will be open for student
                                </h4>
                                <h1 className='font-bold text-lg mb-10 flex items-center bg-blue-100 p-3 rounded-md justify-center'>{''}</h1>   
                                                             
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 mt-5">
                                        <button  
                                                className="py-3 px-4 bg-gray-600 hover:bg-gray-900 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!allowDcument)
                                                }}
                                        >
                                                        Cancel
                                        </button>
                                        <button
                                                disabled={loading}
                                                className="mt-2 py-3 px-4 bg-red-600 hover:bg-red-900 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={DocumentDownload}
                                                >                                                
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Allow Download" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
