import React, { useEffect, useState } from 'react';
import { BeatLoader, BounceLoader } from "react-spinners";
import { Modal } from '@/components/Modal';
import { TestTheoryDurration } from '@/apis/backend/course';


export const TestTheoryDuration = ({onClick, openExamStatus, exam})  =>
{
        const [loading, setIsLoading] = useState(false)
        const [testTheoryDuration, setTestTheoryDuration] = useState(exam?.theory_duration)

        const EnterExamTheoryDuration = () => 
        {
                setIsLoading(true)
                const data = { id: exam?.id, test_theory_duration: testTheoryDuration }
                TestTheoryDurration(data)
                .then((res) => 
                {
                        setIsLoading(false)
                        onClick()
                })
                .catch((err) => 
                {
                        setIsLoading(false)
                })        
        }
        
        return (
                <Modal onClick={onClick} isOpen={openExamStatus} wrapperWidth={900} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'>
                                <div className='flex w-full justify-center items-center font-bold text-md uppercase text-blue-900 text-xl mx-auto in-line'
                                >
                                        Enter Exam Duration For Theory Questions
                                </div>
                                {/* <span className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto text-blue-600'>Material Under<span className='text-red-600 mr-1 ml-1'> ({removeCourse.name})</span> will also be deleted</span> */}
                                
                                <div className="w-full items-center mt-10 sm:flex flex justify-center gap-5 item-center"
                                >
                                        
                                        <div className="w-1/2 md:flex gap-5 mb-5">
                                                <input onChange={(e) => {
                                                                   setTestTheoryDuration(e.target.value)
                                                        }} 
                                                        type="number" id="objDuration" defaultValue={testTheoryDuration}  name="objDuration" 
                                                        placeholder="Enter Exam Duration" 
                                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" 
                                                />
                                        </div>
                                        <button
                                                disabled={loading}
                                                className="w-1/2 py-3 px-4 -mt-5 bg-brandGreen hover:bg-green-900 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={EnterExamTheoryDuration}
                                                >                                                
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Set Time For Theory Exam" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
