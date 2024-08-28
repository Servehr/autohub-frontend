import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL, RECEIPT } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';
import { BeatLoader } from "react-spinners";
import { AddTest } from '@/apis/backend/questions';
import { UserExamTheoryAnswers, UserTestTheoryAnswers } from '@/apis/backend/course';
import { useQuery } from 'react-query';
import { ConfirmStudentAccess } from '@/apis/user';


export const StudentReceipt = ({onClick, studentReceipt, student})  =>
{

        return (
                <Modal onClick={onClick} isOpen={studentReceipt} wrapperWidth={800} margin={'80px auto 0px auto'}
                >        
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'>
                                
                                <img src={`${RECEIPT}${student?.student?.receipt}`} />
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2 mt-5">
                                        <button  
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!studentReceipt)
                                                }}
                                                >
                                                        Close
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
