import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { DeleteFaq } from '@/apis/misc';
import { DeleteExamQuestionaires } from '@/apis/backend/questionaires';
import { BeatLoader } from "react-spinners";
import { Modal } from '@/components/Modal';


export const DeleteExamTheoryQuestionaireModal = ({onClick, id, name, deleteFolder, courseId})  =>
{
        const [loading, setIsLoading] = useState(false)
        const advertState = appStore((state) => state)
        const navigate = useNavigate();

        const cancelModal = () => 
        {
                onClick(true)
        }

        const deleteQuestionaire = () => 
        {
                setIsLoading(true)
                const data = { id: id }
                console.log(data)
                DeleteExamQuestionaires(id)
                .then((res) => 
                {
                        return onClick(courseId*Math.random())
                })
                .catch((err) => 
                {
                        setIsLoading(false)
                        console.log(err)
                })       
        }
        
        return (
                <Modal onClick={onClick} isOpen={deleteFolder} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'>
                                <h1 className='flex w-full justify-center items-center font-bold text-lg uppercase text-red-600 mx-auto'>You are about to delete Course {name}</h1>
                                <span className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto text-blue-600'>Every question under it will also be deleted</span>
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2 mt-5">
                                        <button  
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!deleteFolder)
                                                }}
                                                >
                                                        Close
                                        </button>
                                        <button
                                                disabled={loading}
                                                className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => deleteQuestionaire() }
                                        >
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Delete" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
