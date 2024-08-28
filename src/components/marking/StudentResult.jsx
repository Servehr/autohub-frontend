import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { useQuery } from 'react-query';
import { GetUserResult } from '@/apis/user';


export const StudentResult = ({onClick, studentResult, student})  =>
{
        const [userId, setUserId] = useState(student?.id)
        const [loading, setIsLoading] = useState(false)

        const { data, isLoading } = useQuery(['get-student-result'], () => GetUserResult(userId), { cacheTime: 0 })

        const cancelModal = () => 
        {
                onClick(true)
        }     

        return (
                <Modal onClick={onClick} isOpen={studentResult} wrapperWidth={1300} margin={'60px auto 0px auto'}
                >        
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'>
                                <span className='flex w-full justify-center items-center font-bold text-lg mb-1 mx-auto text-2xl uppercase'>{student?.name} {student?.middename} {student?.lastname}</span>

                                {
                                       !isLoading && < div className='overflow-auto p-5 overflow-y-scroll justify-center h-[650px] item-center'> 
                                        
                                        <div className="grid grid-cols-12 gap-3 border border-solid border-green-900 col-span-12 p-3 rounded-lg"
                                        >                    
                                        {
                                                !isLoading && data && <>
                                                <div className="flex justify-between text-lg font-bold bg-blue-500 p-2 md:col-span-4 col-span-12 text-white font-bold ring-2 ring-blue-100 rounded-lg space-between px-4 border border-4 border-solid border-blue-600">
                                                        <span>Total Course:</span>
                                                        <span>{data?.courses}</span>
                                                </div>
                                                <div className="flex justify-between text-lg font-bold bg-green-500 p-2 md:col-span-4 col-span-12 text-white font-bold ring-2 ring-green-100 rounded-lg space-between px-4 border border-4 border-solid border-green-600">
                                                        <span>Completed:</span>
                                                        <span>{data?.attempted}</span>
                                                </div>
                                                <div className="flex justify-between text-lg font-bold bg-red-500 p-2 md:col-span-4 col-span-12 text-white font-bold ring-2 ring-red-100 rounded-lg space-between px-4 border border-4 border-solid border-red-600">
                                                        <span>Remaining:</span>
                                                        <span>{Math.abs((data?.courses - data?.attempted))}</span>
                                                </div>
                                                </>
                                        }
                                        </div>

                                        
                                        <div className="font-bold text-md -mb-3 md:col-span-12 col-span-12 text-green-900 mt-5 p-5 mb-2 bg-gray-400 text-white rounded-md">Test Results</div> 
                                                <div className="font-bold col-span-12 -mb-2 mt-1 uppercase text-blue-600 mb-5">Objective</div>
                                                {
                                                !isLoading && data?.objective && (data?.objective?.length > 0) && data?.objective?.map((result, index) =>
                                                {                                  
                                                        return (
                                                        <div className="flex justify-between p-2 mb-5 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900">
                                                                <span className="px-3 text-md">{result.name}</span>
                                                                <span className="hidden md:block px-3"> -- </span>
                                                                <span className={`${(result.taken === "yes" ? 'text-lg block' : 'hidden')} px-3`}>{ result.score }</span>
                                                                <span className={`${(result.taken != "yes" ? 'text-xs text- block' : 'hidden')} px-3`}>{ "Not Taken" }</span>
                                                        </div>
                                                        )
                                                })  
                                                }

                                                
                                                <div className="font-bold col-span-12 -mb-2 mt-5 uppercase mb-5 text-green-700">Theory</div>
                                                {
                                                        !isLoading && data?.theory && (data?.theory?.length > 0) && data?.theory?.map((result, index) =>
                                                        {                                  
                                                        return (
                                                                <div className="flex justify-between mb-5 p-2 bg-white md:col-span-4 col-span-12 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-blue-900">
                                                                <span className="px-3 text-md">{result.name}</span>
                                                                <span className="hidden md:block px-3"> -- </span>
                                                                <span className={`${(result.taken === "yes" ? 'text-lg block' : 'hidden')} px-3`}>{ result.score }</span>
                                                                <span className={`${(result.taken === "marking" ? 'text-xs text- block' : 'hidden')} px-3`}>{ "Not Yet Marked" }</span>
                                                                <span className={`${(((result.taken != "yes") && (result.taken != "marking")) ? 'text-xs text- block text-orange-700' : 'hidden')} px-3`}>{ "Not Taken" }</span>
                                                                </div>
                                                        )
                                                        })  
                                                }


                                                <div className="font-bold text-md -mb-3 md:col-span-12 col-span-12 text-green-900 mt-5 p-5 bg-gray-400 text-white rounded-md mb-2">Exam Results</div>
                                                        {/* objective  */}
                                                        {
                                                        !isLoading && (Number(data?.exam_objective) === 0) && 
                                                        <div className="flex justify-between p-2 bg-white md:col-span-6 mb-5 col-span-6 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-green-900">
                                                                <span className="px-3 text-md uppercase text-blue-800">Objective</span>
                                                                <span className="hidden md:block px-3"> {data?.exam_objective} </span>
                                                        </div> 
                                                        }
                                                        {
                                                        !isLoading && (data?.exam_objective === "not-taken") && 
                                                        <div className="flex justify-between p-2 bg-white md:col-span-6 mb-5 col-span-6 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-green-900">
                                                                <span className="px-3 text-md uppercase text-blue-800">Objective</span>
                                                                <span className="hidden md:block px-3"> NOT YET TAKEN </span>
                                                        </div> 
                                                        }
                                                        {
                                                        !isLoading && (Number(data?.exam_objective) > 0) &&
                                                        <div className="flex justify-between p-2 bg-white md:col-span-6 mb-5 col-span-6 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-green-900">
                                                                <span className="px-3 text-md uppercase text-blue-800">Objective</span>
                                                                <span className="hidden md:block px-3"> {data?.exam_objective} </span>
                                                        </div> 
                                                        }
                                                        {
                                                        !isLoading && (Number(data?.exam_objective) > 0) && (data?.exam_objective != "not-taken") && 
                                                        <div className="flex justify-between p-2 bg-white md:col-span-6 mb-5 col-span-6 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-green-900">
                                                                <span className="px-3 text-md uppercase text-blue-800">Objective</span>
                                                                <span className="hidden md:block px-3"> { data?.exam_objective } </span>
                                                        </div> 
                                                        }
                                                        {/* theory  */}
                                                        {
                                                        !isLoading && (Number(data?.exam_theory) === 0) && 
                                                        <div className="flex justify-between p-2 bg-white md:col-span-6 mb-5 col-span-6 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-green-900">
                                                                <span className="px-3 text-md uppercase text-blue-800">Objective</span>
                                                                <span className="hidden md:block px-3"> {data?.exam_objective} </span>
                                                        </div> 
                                                        }
                                                        {
                                                        !isLoading && (data?.exam_theory === "not-taken") && 
                                                        <div className="flex justify-between p-2 bg-white md:col-span-6 mb-5 col-span-6 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900">
                                                                <span className="px-3 text-md uppercase text-green-800">Theory</span>
                                                                <span className="hidden md:block px-3"> NOT YET TAKEN </span>
                                                        </div> 
                                                        }
                                                        {
                                                        !isLoading && (Number(data?.exam_theory) > 0) && (data?.exam_theory === "not-taken") &&
                                                        <div className="flex justify-between p-2 bg-white md:col-span-6 mb-5 col-span-6 text-black font-bold text-sm ring-2 ring-green-100 rounded-lg space-between px-3 border border-solid border-green-900">
                                                                <span className="px-3 text-md uppercase text-green-800">Theory</span>
                                                                <span className="hidden md:block px-3"> {data?.exam_objective} </span>
                                                        </div> 
                                                        }
                                                        {
                                                        !isLoading && (Number(data?.exam_theory) > 0)  && (data?.exam_theory != "not-taken") && 
                                                        <div className="flex justify-between p-2 bg-white md:col-span-6 col-span-6 text-black font-bold text-sm ring-2 ring-blue-100 rounded-lg space-between px-3 border border-solid border-blue-900">
                                                                <span className="px-3 text-md uppercase text-green-800">Theory</span>
                                                                <span className="hidden md:block px-3"> { data?.exam_theory } </span>
                                                        </div> 
                                                        }
                                                </div>
                                        
                                }
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2">
                                        <button  
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!studentResult)
                                                }}
                                                >
                                                        Close
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
