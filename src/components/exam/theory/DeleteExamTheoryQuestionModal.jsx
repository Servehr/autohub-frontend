import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { BeatLoader } from "react-spinners";
import { DeleteTestQuestionTheory } from '@/apis/backend/questions';
import { Modal } from '@/components/Modal';


export const DeleteExamTheoryQuestionModal = ({onClick, data, deleteQuestion})  =>
{
        const [loading, setIsLoading] = useState(false)
        const [theId, setTheId] = useState(data.id)
        const advertState = appStore((state) => state)
        const navigate = useNavigate();
        console.log(data)

        const cancelModal = () => 
        {
                onClick(true)
        }

        const deleteQuestionn = () => 
        {
                setIsLoading(true)
                const data = { id: theId }
                console.log(data.id)
                DeleteTestQuestionTheory(Number(data.id))
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
                <Modal onClick={onClick} isOpen={deleteQuestion} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'>
                                <h1 className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto'>You are about to delete Question {data.question}</h1>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2 mt-5">
                                        <button  
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!deleteQuestion)
                                                }}
                                                >
                                                        Close
                                        </button>
                                        <button
                                                disabled={loading}
                                                className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={deleteQuestionn}
                                        >
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Delete Question" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
