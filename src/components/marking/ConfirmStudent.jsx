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
import { UserExamTheoryAnswers, UserTestTheoryAnswers } from '@/apis/backend/course';
import { useQuery } from 'react-query';
import { ConfirmStudentAccess } from '@/apis/user';


export const ConfirmStudent = ({onClick, confirmAccess, student})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();
        const [userId, setUserId] = useState(student.id)
        const [loading, setIsLoading] = useState(false)

        const cancelModal = () => 
        {
                onClick(true)
        }        

        const allowStudent = () => 
        {   
                setIsLoading(true)                
                ConfirmStudentAccess(userId)
                .then((res) => 
                {
                        setIsLoading(false)
                        return onClick(Math.random())
                })
                .catch((err) => 
                {
                        setIsLoading(false)
                })    
        }

        return (
                <Modal onClick={onClick} isOpen={confirmAccess} wrapperWidth={800} margin={'80px auto 0px auto'}
                >        
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'>
                                <h1 className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto'>This action allow user to be able to access student portal without restriction</h1>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2 mt-5">
                                        <button  
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!confirmAccess)
                                                }}
                                                >
                                                        Close
                                        </button>
                                        <button
                                                disabled={loading}
                                                className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={allowStudent}
                                        >
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Confirm Student" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
