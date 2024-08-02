import React, { useEffect, useState } from 'react';
import { Modal } from '../../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { UpdateFaq } from '@/apis/misc';
import { UpdateTestQuestionaires, UpdateTestQuestionairesTheory } from '@/apis/backend/questionaires';
import { BeatLoader } from "react-spinners";
import { UpdateTestQuestionTheory } from '@/apis/backend/questions';


export const EditTestQuestionaireTheoryModal = ({onClick, editFolder, description, courseId, id, name})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();
        const [loading, setIsLoading] = useState(false)
        const [theProductId, setTheProductId] = useState(courseId)
        const [theTitle, setTitle] = useState(name)
        const [theContent, setTheContent] = useState(description)
        const [theIsOpened, setTheIsOpened] = useState('')
        const options = ["opened", "closed"]

        const cancelModal = () => 
        {
                onClick(true)
        }

        const updateFolder = () => 
        {
                setIsLoading(true)
                const data = { id: id, name: theTitle, description: theContent }
                console.log(data)
                UpdateTestQuestionairesTheory(data)
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
                <Modal onClick={onClick} isOpen={editFolder} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <h1 className='font-bold text-lg mb-5'>Rename Folder</h1>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <input onChange={(e) => {
                                                                        setTitle(e.target.value)
                                                                }} type="text" id="title" defaultValue={name}  
                                                                name="title" 
                                                                placeholder="Enter Questionaire Name" 
                                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5">
                                                                <textarea onBlur={(e) => {
                                                                        setTheContent(e.target.value)
                                                                }} type="text" id="description" defaultValue={description}  
                                                                   name="description" 
                                                                   placeholder="Enter Description" 
                                                                   rows={5}
                                                                   className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                                >
                                                                </textarea>
                                                        </div>
                                                </div>
                                        </>
                                </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mx-1 -mb-4"
                                >
                                        <button  
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!editFolder)
                                                }}
                                        >
                                                        Cancel
                                        </button>
                                        <button
                                                disabled={loading}
                                                className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={updateFolder}
                                                >                                                
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Rename" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
