import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';


export const EditStaffModal = ({onClick, editStaff})  =>
{
        // const advertState = appStore((state) => state)
        // const navigate = useNavigate();
        // const [userProductId, setUserProductId] = useState(advertState.getProductId())
        // const [theTitle, setTitle] = useState("")
        // const [theContent, setTheContent] = useState("")
        // const [theIsOpened, setTheIsOpened] = useState(-1)
        // const options = [
        //         { key: -1, value: "- Select whether you want it published immediately or not -" },
        //         { key: "opened", value: "Yes" },
        //         { key: "closed", value: "No" },
        // ]

        // const cancelModal = () => 
        // {
        //         onClick(true)
        // }
        

        // const addFaq = async () => 
        // {
            
        //         const data = { title: theTitle, content: theContent, isOpened: theIsOpened }
        //         console.log(data)
        //         if(theIsOpened === -1)
        //         {
        //              alert("Select whether you want it published immediately or not")   
        //         }
        //         CreateFaq(data)
        //         .then((res) => 
        //         {
        //                 console.log(res)
        //                 return onClick(Math.random())
        //         })
        //         .catch((err) => 
        //         {
        //                 console.log(err)
        //         })    
        // }

        return (
                <Modal onClick={onClick} isOpen={editStaff} wrapperWidth={800} margin={'80px auto 0px auto'}>
                        <div className='col-span-12 pt-1 justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 justify-center h-fit py-2 item-center -mt-5'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <h1 className='font-bold text-lg mb-5 p-3 bg-blue-100 rounded-lg'>Edit Staff</h1>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <input onChange={(e) => {
                                                                        // advertState.setChasisNumber(e.target.value)
                                                                        // setTheChasisNo(e.target.value)
                                                                        setTitle(e.target.value)
                                                                }} type="text" id="firstName" defaultValue={''}  name="firstName" placeholder="Enter FirstName" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <input onChange={(e) => {
                                                                        // advertState.setChasisNumber(e.target.value)
                                                                        // setTheChasisNo(e.target.value)
                                                                        setTitle(e.target.value)
                                                                }} type="text" id="surName" defaultValue={''}  name="surName" placeholder="Enter SurName" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <input onChange={(e) => {
                                                                        // advertState.setChasisNumber(e.target.value)
                                                                        // setTheChasisNo(e.target.value)
                                                                        setTitle(e.target.value)
                                                                }} type="text" id="optionC" defaultValue={''}  name="optionC" placeholder="Enter Email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <input onChange={(e) => {
                                                                        // advertState.setChasisNumber(e.target.value)
                                                                        // setTheChasisNo(e.target.value)
                                                                        setTitle(e.target.value)
                                                                }} type="text" id="optionD" defaultValue={''}  name="optionD" placeholder="Enter Phone Number" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                <input onChange={(e) => {
                                                                        // advertState.setChasisNumber(e.target.value)
                                                                        // setTheChasisNo(e.target.value)
                                                                        setTitle(e.target.value)
                                                                }} type="text" id="optionD" defaultValue={''}  name="optionD" placeholder="Enter Phone Number" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>

                                                        <div className="relative w-full mb-3">
                                                                <select onChange={(e) => 
                                                                   {  
                                                                   } 
                                                                } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                        <option value={-1}> - Select Role -  </option> 
                                                                        <option value={'writer'}> - Writer -  </option> 
                                                                        <option value={'manager'}> - Manager -  </option> 
                                                                        <option value={'secretary'}> - Secretary -  </option>
                                                                        <option value={'marketr'}> - Marketer -  </option>
                                                                </select>
                                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-0">
                                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                                        </svg>
                                                                </div>
                                                                <div className="text-red-500 font-bold text-sm">{ "" }</div>
                                                        </div>
                                                        
                                                </div>
                                        </>
                                </div>
                                
                                <div className="items-center gap-5 sm:flex flex justify-between mb-2 mx-1">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={() => {
                                                        onClick(!editStaff)
                                                }}
                                        >
                                                        Cancel
                                        </button>
                                        <button
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                onClick={() => {} }
                                                >
                                                Update
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
