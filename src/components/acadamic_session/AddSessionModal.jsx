import React, { useEffect, useState } from 'react';
import { AddAcademicSession } from '@/apis/backend/academic';
import { Modal } from '../Modal';


export const AddSessionModal = ({onClick, openAddSession, isSessionOpen})  =>
{
        const [ academik, setAcademicSession] = useState("")

        const isOpen = isSessionOpen.filter((x) => x.status === 'open').length

        const AddStaete = async () => 
        {            
                const data = { name: academik,  first_time: academik }
                AddAcademicSession(data)
                .then((res) => 
                {
                        onClick()
                })
                .catch((err) => 
                {
        
                })    
        }

        return (
                <Modal onClick={onClick} isOpen={openAddSession} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        { (isOpen > 0) && <h1 className='text-red-600 font-bold text-white rounded-xl px-4 py-2 mb-3 bg-red-600 text-lg'> To have a new session began, all current session must be closed </h1> }
                                                        <h1 className='font-bold text-lg mb-5 text-blue-800 px-3'>Create Academic Session</h1>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 w-2/2 p-2">
                                                                <input onChange={(e) => {
                                                                        setAcademicSession(e.target.value)
                                                                }} type="text" id="academicSession" 
                                                                defaultValue={''}  
                                                                name="academicSession" 
                                                                placeholder="Enter Academic Session Name" 
                                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                </div>
                                        </>
                                </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 px-1">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={() => {
                                                        onClick(!openAddSession)
                                                }}
                                        >
                                                        Cancel
                                        </button>
                                        {
                                                (isOpen === 0) && 
                                                <button
                                                        className="mt-2 p-4 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                        onClick={AddStaete}
                                                        >
                                                        Create
                                                </button>
                                        }
                                </div>
                        </div>
                </Modal>  
        );
}
