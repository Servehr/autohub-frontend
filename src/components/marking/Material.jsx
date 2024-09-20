import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { useQuery } from 'react-query';
import { CourseMaterial, GetUserResult } from '@/apis/user';
import { BeatLoader } from 'react-spinners';
import './marking.css'


export const Material = ({onClick, studentMaterial, student})  =>
{
        const [userId, setUserId] = useState(student?.id)
        const [loading, setIsLoading] = useState(false)

        const { data, isLoading, refetch, isRefetching } = useQuery(['student-course-material'], () => CourseMaterial(userId), { cacheTime: 0 })

        if(!isLoading)
        {
                console.log(data)
        }

        const cancelModal = () => 
        {
                onClick(true)
        }     

        return (
                <Modal onClick={onClick} isOpen={studentMaterial} wrapperWidth={1300} margin={'60px auto 0px auto'}
                >        
                        {
                                (data?.data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                <h1 className="font-bold">
                                        No course created yet
                                </h1>
                                </div>
                        }
                        <div 
                                className="relative d-flex col-span-6 md:col-span-3 border rounded-lg p-4 bg-gray-200 shadow-sm mt-7 mb-5">   
                                {/* <img src={`${AVATAR}${student.avatar}`} className="col-span-2 rounded-sm w-fit h-[200px] mb-2 p-1 bg-green-300 flex justify-center m-auto items-center" /> */}
                                <div className="w-full p-2 flex bg-white shadow-md text-black"
                                >
                                        <p className="font-bold w-2/2 text-xl text-black mb-1 text-black text-center mx-auto">Course Material For:- { data?.plus?.name } { data?.plus?.middlename } { data?.plus?.lastname }</p>
                                </div>
                        </div>
                        <div 
                                className='w-12/12 d-flex'
                        >
                        {
                                (data?.data?.length > 0) && data?.data?.map((x) => {
                                                let hasFile = (x.file_name != null) ? "cursor-pointer" : ""
                                                return (
                                                        <>
                                                                <div className='flex justify-center items-center text-left hover:border-3 hover:border-green-300 hover:bg-green-800 hover:rounded-xl hover:p-2 hover:text-white hover:font-bold'
                                                                >
                                                                        <div 
                                                                                className="w-6/12 p-3 rounded-xl"
                                                                        >
                                                                                        {x.name}

                                                                        </div>
                                                                        <div 
                                                                                className="w-2/12 p-3 flex justify-center"
                                                                        >
                                                                                <input type="radio" name="group" className='p-3' />
                                                                        </div>
                                                                        <div 
                                                                                className="w-2/12 p-1 flex justify-centent items-center"
                                                                        >
                                                                                <span className='text-xs font-bold text-gray-600 mr-3 text-green-600'>Start</span>
                                                                                <input type='date' className='p-2 rounded-lg border border-3 border-gray-200 w-full text-black'
                                                                                />
                                                                        </div>
                                                                        <div 
                                                                                className="w-2/12 p-1 flex justify-centent items-center"
                                                                        >
                                                                                <span className='text-xs font-bold text-gray-600 mr-3 text-green-600'>End</span>
                                                                                <input type='date' className='p-2 rounded-lg border border-3 border-gray-200 w-full text-black'
                                                                        />        
                                                                        </div>
                                                                </div>
                                                        </>
                                                )
                                        })
                        }
                        </div>
                        <div className="p-1"></div>
                                
                        <div className="items-center gap-5 mt-5 sm:flex flex justify-between mb-2 mx-2">
                                <button  
                                        className="py-3 px-4 bg-red-600 hover:bg-red-800 text-white font-semibold text-sm rounded-xl w-max"
                                        onClick={() => {
                                                      onClick(!studentMaterial)
                                        }}
                                >
                                        Close
                                </button>
                                <button  
                                        className="py-3 px-4 bg-green-600 hover:bg-green-800 text-white font-semibold text-sm rounded-xl w-max"
                                        onClick={() => {
                                                      onClick(!studentMaterial)
                                        }}
                                >
                                        Set
                                </button>
                        </div>
                </Modal>  
        );
}
