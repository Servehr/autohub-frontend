import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { appStore } from "@/state/appState";
import { Icons } from '@/util/icon';
import '../css/dragAndDrop.css'
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { Modal } from '../Modal';
import { BeatLoader, BounceLoader } from "react-spinners";

export const UploadCourseModal = ({onClick, uploadCourse, courseId})  =>
{
        // console.log(adverProductId)
        const advertState = appStore((state) => state)
        const navigate = useNavigate();        
        const [loading, setIsLoading] = useState(false)
        const [imageToUpload, setImageToUpload] = useState(false)
        const [error, setError] = useState(false)
        const [imgeUrl, setUrl] = useState(false)
        const [course, setCourseId] = useState(courseId)
        const [courseFile, setCourseFile] = useState("")
        
        const uploadCourseFile = async () =>
        {
                setIsLoading(true)
                let token = localStorage.getItem("token")           
                let fileDocument = new FormData();
                fileDocument.append('id', courseId.id)
                fileDocument.append('material', courseFile)
                // console.log(courseId.id)
                // console.log(fileDocument)
                // return false
                await axios.post(`${BASE_URL}upload-course-document`, fileDocument, {
                        headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': token ? `Bearer ${token}` : "",
                        }
                }).then((response) => 
                {  
                        // setUrl("")
                        if(response.data.success === true)
                        {
                                return onClick(true)
                        } else {
                                // alert("Error")
                                setIsLoading(false)
                        }
                }).catch((error) => { 
                        setIsLoading(false)
                        console.log(error)                      
                        return false
                })
        }

        const uploadDocument = (file) => 
        {
                const course = file[0]
                console.log(course)
                setCourseFile(course)
        }

        const closeIt = () => 
        {
                setUrl("")
                return onClick(true)                
        }

        return (
                <>
                        <Modal onClick={onClick} isOpen={uploadCourse} wrapperWidth={500} margin={'90px auto 0px auto'} color='green'>
                                <div className={`transition duration-300 w-full ${!error && "hidden"}`}>
                                        <div className={`bg-red-500/10 border-red-500/80 border w-full flex justify-center p-2`}>
                                                <p className=" w-max text-center text-xs text-[#D10000]">{error}</p>
                                        </div>
                                </div>
                                <div 
                                        className="grid grid:col-12 gap-5 mt-5 mb-5 justify-center items-center"
                                >                                         
                                         <div className="drag-area p-3 items-center text-center mx-auto">
                                                <span className="flex select justify-center items-center text-xs block" role="button">
                                                        <b class="px-10 py-5">Browse</b>
                                                        <input type="file" id="product" name="product" className="file" onChange={
                                                                (e) => {
                                                                        uploadDocument(e.target.files)
                                                                }
                                                         } />
                                                </span>
                                        </div>
                                </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-left mb-2 mx-5 mt-1 -ml-1 justify-center flexx">       
                                        <button  
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!uploadCourse)
                                                }}
                                        >
                                                        Cancel
                                        </button>
                                        <button
                                                disabled={loading}
                                                className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={uploadCourseFile}
                                                >                                                
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Upload Document" )          }
                                        </button>
                                </div>
                        </Modal>
                </> 
        );
}
