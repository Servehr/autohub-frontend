import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { UpdateFaq } from '@/apis/misc';


export const EditQuestionaireModal = ({onClick, editFolder, courseId})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();

        const [theProductId, setTheProductId] = useState(courseId)
        const [theTitle, setTheTitle] = useState('')
        const [theContent, setTheContent] = useState('')
        const [theIsOpened, setTheIsOpened] = useState('')
        const options = ["opened", "closed"]

        const cancelModal = () => 
        {
                onClick(true)
        }

        const updateFaqData = () => 
        {
                const data = {courseId: courseId }
                console.log(data)
                UpdateFaq(data)
                .then((res) => 
                {
                        // return onClick(courseId*Math.random())
                })
                .catch((err) => 
                {
                        console.log(err)
                })                 
        }

        const whenOptionChanged = () => 
        {

        }
        
        return (
                <Modal onClick={onClick} isOpen={editFolder} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <h1 className='font-bold text-lg mb-10'>Rename Folder</h1>
                                                        <div className="w-full d-flex-row md:flex mt-1 gap-5 mb-5">
                                                                {/* <span className="font-bold text-sm">Title</span> */}
                                                                <input onBlur={(e) => {
                                                                        
                                                                }} type="text" id="folder" defaultValue={'folder name'}  name="folder" 
                                                                placeholder='foler name' 
                                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                </div>
                                        </>
                                </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mx-1 -mb-4">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={() => {
                                                        onClick(!editFolder)
                                                }}
                                        >
                                                        Close
                                        </button>
                                        <button
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                onClick={() => console.log('') }
                                                >
                                                Rename
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
