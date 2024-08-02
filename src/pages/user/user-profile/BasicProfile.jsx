import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';
import { BeatLoader } from "react-spinners";
import { AddTest } from '@/apis/backend/questions';
import { Modal } from '@/components/Modal';
import { UpdateUserProfile } from '@/apis/user';


export const BasicProfile = ({onClick, data, openBasicInfo})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();
        const { id } = useParams()

        const [theId, setTheId] = useState(data?.id)
        const [firstName, setFirstName] = useState(data?.name)
        const [surname, setSurname] = useState(data?.lastname)
        const [email, setEmail] = useState(data?.email)
        const [phoneno, setPhoneno] = useState(data?.phoneno)
        const [loading, setIsLoading] = useState(false)

        const cancelModal = () => 
        {
                onClick(true)
        }        

        const addQuestion = () => 
        {   
                const data = { id: Number(theId), name: firstName, lastname: surname, email: email, phoneno: phoneno }
                console.log(data)
                setIsLoading(true)
                UpdateUserProfile(data)
                .then((res) => 
                {
                        console.log(res)
                        setIsLoading(false)
                        return onClick(Math.random())
                })
                .catch((err) => 
                {
                        setIsLoading(false)
                        console.log(err)
                })    
        }

        return (
                <Modal onClick={onClick} isOpen={openBasicInfo} wrapperWidth={900} margin={'80px auto 0px auto'}>
                        <div className='col-span-12 pt-1 justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 justify-center h-fit py-2 item-center -mt-5'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <h1 className='font-bold text-lg mb-5 p-3 bg-blue-100 rounded-lg'>Edit user profile</h1>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <div className='d-flex w-full'>
                                                                        <input onChange={(e) => {
                                                                                setFirstName(e.target.value)
                                                                        }} type="text" id="firstname" defaultValue={firstName}  name="firstname" 
                                                                        className="w-full mb-5 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />                                                                        
                                                                </div>
                                                               <div className='d-flex w-full'>
                                                                        <input onChange={(e) => {
                                                                                        setSurname(e.target.value)
                                                                                }} type="text" id="surname" defaultValue={surname}  name="surname" className="w-full mb-5 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                               </div>
                                                        </div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <div className='d-flex w-full'>
                                                                        <input onChange={(e) => {
                                                                                setEmail(e.target.value)
                                                                        }} type="email" id="email" defaultValue={email}  
                                                                        name="email" 
                                                                        className="w-full mb-5 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                                </div>
                                                               <div className='d-flex w-full'>
                                                                        <input onChange={(e) => {
                                                                                setPhoneno(e.target.value)
                                                                        }} type="number" id="phoneno" defaultValue={phoneno}  name="phoneono" className="w-full mb-5 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                               </div>
                                                        </div>
                                                </div>
                                        </>
                                </div>
                                
                                <div className="items-center gap-5 sm:flex flex justify-between mb-2 mx-1">
                                        <button  
                                                className="py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => {
                                                        onClick(!openBasicInfo)
                                                }}
                                                >
                                                        Close
                                        </button>
                                        <button
                                                disabled={loading}
                                                className="mt-2 py-3 px-4 bg-brandGreen text-white font-semibold text-sm rounded-xl w-max"
                                                onClick={() => addQuestion() }
                                        >
                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Add" )          }
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
