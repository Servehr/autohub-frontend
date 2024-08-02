import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';
import { BeatLoader } from "react-spinners";
import { AddCourse } from '@/apis/backend/course';


export const AddCourseModal = ({onClick, openCourseModal})  =>
{
        const advertState = appStore((state) => state)
        const [loading, setIsLoading] = useState(false)
        const [theTitle, setTitle] = useState("")
        const [theContent, setTheContent] = useState("")
        const [errMsg, setErrMsg] = useState("")
        const navigate = useNavigate();
        const [userProductId, setUserProductId] = useState(advertState.getProductId())
        const [theIsOpened, setTheIsOpened] = useState(-1)

        const options = [
                { key: -1, value: "- Select whether you want it published immediately or not -" },
                { key: "opened", value: "Yes" },
                { key: "closed", value: "No" },
        ]

        const cancelModal = () => 
        {
                onClick(true)
        }
        

        const addCourse = async () => 
        {
            
                const data = { name: theTitle, description: theContent }
                console.log(data)
                setIsLoading(true)
                AddCourse(data)
                .then((res) => 
                {
                        console.log(res)
                        return onClick(Math.random())
                })
                .catch((err) => 
                {
                        setIsLoading(false)
                        console.log(err)
                })    
        }

        return (
                <Modal onClick={onClick} isOpen={openCourseModal} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center -mt-5'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <h1 className='font-bold text-lg mb-5'>Create Course</h1>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <input onChange={(e) => {
                                                                        setTitle(e.target.value)
                                                                }} type="text" id="title" defaultValue={theTitle}  
                                                                name="title" 
                                                                placeholder="Enter Course Name" 
                                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5">
                                                                <textarea onBlur={(e) => {
                                                                        setTheContent(e.target.value)
                                                                }} type="text" id="description" defaultValue={theContent}  
                                                                   name="description" 
                                                                   placeholder="Enter Course Description" 
                                                                   rows={5}
                                                                   className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                                >
                                                                </textarea>
                                                        </div>
                                                </div>
                                        </>
                                </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 mt-3">
                                        <button  
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!openCourseModal)
                                                }}
                                        >
                                                        Cancel
                                        </button>
                                        <button
                                                disabled={loading}
                                                className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={addCourse}
                                                >                                                
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Add" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
