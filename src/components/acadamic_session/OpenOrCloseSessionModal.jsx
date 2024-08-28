import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/Modal';
import { CloseAcademicSession, OpenAcademicSession } from '@/apis/backend/academic';


export const OpenOrCloseSessionModal = ({onClick, openOrCloseAcademicSession, sessionId})  =>
{
        const [id, setSessionId] = useState(sessionId?.id)
        const [sessionStatus, setSessionStaus] = useState(sessionId?.status)
       
        const OpenAcademicSessionStatus = async () => 
        {   
                OpenAcademicSession(id)
                .then((res) => 
                {
                        onClick(res)
                })
                .catch((err) => 
                {
                        
                })    
        }

        const CloseAcademicSessionStatus = async () => 
        {   
                CloseAcademicSession(id)
                .then((res) => 
                {
                        onClick(res)
                })
                .catch((err) => 
                {
                        
                })    
        }

        return (
                <Modal onClick={onClick} isOpen={openOrCloseAcademicSession} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 d-flex justify-center h-fit py-2 items-center'>
                                        {/* <div className='d-flex'>                   */}
                                                <div className='w-full font-bold text-lg mb-1 text-center'>Change Academic Session Status</div>
                                                <div className='w-full font-bold text-lg mb-1 text-blue-600 text-center text-md'>Curent Academic Session Status <span className='text-red-600 text-xl uppercase'>{sessionStatus}</span></div>
                                        {/* </div> */}
                                </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 mt-3">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={!openOrCloseAcademicSession}
                                        >
                                                        Cancel
                                        </button>
                                        {
                                                (sessionStatus === 'open') && 
                                                <button
                                                        className="mt-2 p-4 text-white hover:font-bold text-sm bg-green-600 hover:bg-green-800 hover:text-gray-200 font-bold rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                        onClick={() => {
                                                                CloseAcademicSessionStatus()
                                                        }}
                                                        >
                                                        Close
                                                </button>
                                        }
                                        {
                                                (sessionStatus === 'closed') && 
                                                <button
                                                        className="mt-2 p-4 text-white hover:font-bold text-sm bg-green-600 hover:bg-green-800 hover:text-gray-200 font-bold rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                        onClick={() => {
                                                                OpenAcademicSessionStatus()
                                                        }}
                                                        >
                                                        Open
                                                </button>
                                        }
                                </div>
                        </div>
                </Modal>  
        );
}
