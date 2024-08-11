import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';
import { BeatLoader } from "react-spinners";
import { ScoreStudentScoreExam, UserExamTheoryAnswers } from '@/apis/backend/course';
import { useQuery } from 'react-query';
import toast from "react-hot-toast";


export const AddExamTheoryMark = ({onClick, openAddExamTheoryMark, student})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();
        const [userId, setScore] = useState(student.id)
        const [studentScore, setStudentScore] = useState(student.id)
        const [loading, setIsLoading] = useState(false)
        const [questionId, setQuestionId] = useState(-1)
        const [currentQuestion, setCurrentQuestion] = useState(-1)
        console.log(student)

        const { data, isLoading, refetch, isRefetching } = useQuery([`use-test-answers`], () => UserExamTheoryAnswers(userId), { cacheTime: 0 })
      
        if(!isLoading)
        {
            console.log(data)
        }

        const cancelModal = () => 
        {
                onClick(true)
        }        

        const ScoreQuestion = () => 
        {   
                setIsLoading(true)
                const data = { score: studentScore, questionId: questionId, userId: userId }
                ScoreStudentScoreExam(data)
                .then((res) => 
                {
                        console.log(res)                                   
                        toast.success(`Marked`, {
                            position: "top-center",
                        });
                        setIsLoading(false)
                        // return onClick(Math.random())
                })
                .catch((err) => 
                {
                        setIsLoading(false)
                        console.log(err)
                })    
        }

        return (
                <Modal onClick={onClick} isOpen={openAddExamTheoryMark} wrapperWidth={1200} margin={'60px auto 0px auto'}
                >                        
                        {
                            isLoading && !isRefetching && <div className="col-span-12 h-[100px] flex justify-center items-center">
                                <BeatLoader color="#1c9236" />
                            </div>
                        }
                        {
                                isRefetching && <div className="col-span-12 h-[400px] flex justify-center items-center">
                                    <BeatLoader color="#1c9236" />
                                </div>
                        }
                        {
                                !isLoading && !isRefetching && data && <div className='flex justify-between'>
                                        <span className='font-bold text-xl p-4'>{student.name} {student.lastname} Answers</span>
                                        <span className='font-bold text-xl p-4 text-blue-600'>Total Question: {data.length}</span>
                                </div>
                        }
                        <div className='col-span-12 p-4 overflow-auto overflow-y-scroll justify-center h-[700px] item-center'>
                        { 
                                !isLoading && !isRefetching && data && data.map((question, index) => {      
                                        let x = (question?.score) ? "Update Score" : "Score Student"     
                                        let y = (question?.score) ? "bg-blue-500" : "bg-green-600"

                                        return (
                                                <div className='p-3 mb-5 shadow-md bg-green-100'>
                                                        <div className='d-flex'
                                                        >
                                                                <span className='font-bold text-sm text-gray-700 ml-1'>Question {index+1} </span>                                                                
                                                                <div className='flex'>                                                                
                                                                        <span className="w-11/12 d-flex md:flex p-3 mt-1 gap-5 mb-3 text-lg bg-blue-100 border border-solid border-gray-300">{question.question}</span>
                                                                        <span className="w-1/12 d-flex md:flex p-3 mt-1 gap-5 mb-3 text-lg bg-white border border-solid border-gray-300">{question.mark}</span>
                                                                </div>
                                                        </div>
                                                        <div className='d-flex'
                                                        >            
                                                                <span className='font-bold text-sm text-gray-700 ml-1'>Answer</span>
                                                                <span className="w-12/12 d-flex bg-white md:flex p-3 gap-5 mb-3 text-lg border border-solid border-gray-300">{question.answer}</span>
                                                        </div>
                                                        <div className="w-full flex md:flex mt-1 gap-5">
                                                                <input onChange={(e) => {
                                                                                setCurrentQuestion(question.id)
                                                                                setStudentScore(e.target.value)
                                                                                setQuestionId(question.exam_theory_id)
                                                                        }} type='number' id="optionA"  defaultValue={question?.score}
                                                                                        name="optionA" 
                                                                                        placeholder="Enter Score" 
                                                                                        className="w-10/12 bg-white rounded border border-gray-300 
                                                                                        focus:border-indigo-500 focus:bg-white focus:ring-2 text-xl focus:ring-indigo-200 
                                                                                        outline-none text-gray-700 text-base py-2 px-3 leading-8 transition-colors 
                                                                                        duration-200 ease-in-out" 
                                                                        />                                                      
                                                                <button
                                                                        // disabled={loading}
                                                                        className={`w-2/12 mt-2 py-3 px-4 ${y} hover:bg-green-800 text-white font-semibold text-sm rounded-xl w-max`}
                                                                        onClick={ScoreQuestion}
                                                                >
                                                                                {   (currentQuestion === question.id) && loading ? ( <BeatLoader size={9} color="#fff" />) : ( x ) }
                                                                        </button>
                                                        </div>    
                                                        <span className='p-3'></span>
                                                </div>                                             
                                        )
                                })
                        } 
                        </div>
                </Modal>  
        );

}
