import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { UpdateFaq } from '@/apis/misc';


export const EditFaqModal = ({onClick, editFaqModal, productId, title, content, isOpened})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();

        const [theProductId, setTheProductId] = useState(productId)
        const [theTitle, setTheTitle] = useState(title)
        const [theContent, setTheContent] = useState(content)
        const [theIsOpened, setTheIsOpened] = useState(isOpened)
        const options = ["opened", "closed"]

        const cancelModal = () => 
        {
                onClick(true)
        }

        const updateFaqData = () => 
        {
                const data = {faqId: theProductId, title: theTitle, content: theContent, isOpened: theIsOpened }
                console.log(data)
                UpdateFaq(data)
                .then((res) => 
                {
                        return onClick(productId*Math.random())
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
                <Modal onClick={onClick} isOpen={editFaqModal} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center'>
                                        <>                                                
                                                <div className="p-1 mt-1">
                                                        <h1 className='font-bold text-lg mb-10'>Edit Faq</h1>
                                                        <div className="w-full d-flex-row md:flex mt-1 gap-5 mb-5">
                                                                {/* <span className="font-bold text-sm">Title</span> */}
                                                                <input onBlur={(e) => {
                                                                        // advertState.setChasisNumber(e.target.value)
                                                                        // setTheChasisNo(e.target.value)
                                                                        setTheTitle(e.target.value)
                                                                        // alert(e.target.value)
                                                                }} type="text" id="title" defaultValue={title}  name="title"  
                                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5">
                                                                {/* <span className="font-bold text-sm">Content</span> */}
                                                                <textarea onBlur={(e) => {
                                                                        // advertState.setChasisNumber(e.target.value)
                                                                        // setTheChasisNo(e.target.value)
                                                                        setTheContent(e.target.value)
                                                                        // alert(e.target.value)
                                                                }} type="text" id="content" defaultValue={content}  name="content" rows={4} 
                                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                                >
                                                                </textarea>
                                                        </div>
                                                        
                                                    
                                                    <div className="flex flex-wrap -mt-2">
                                                        <div className="py-2 w-full">
                                                                <div className="mb-4">
                                                                        <div className="relative">
                                                                        {/* <span className="w-full font-bold text-sm">Published or Not</span> */}
                                                                        <select onChange={(e) => { 
                                                                                // advertState.setCateg(e.target.value)
                                                                                // setTheCategory(Number(e.target.value))
                                                                                setTheIsOpened(e.target.value)
                                                                                // alert(e.target.value)
                                                                        }
                                                                        } className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                        {       
                                                                                options &&
                                                                                options?.length != 0 &&
                                                                                options.map((opt, index) => (
                                                                                <option key={index} value={opt} selected={opt === isOpened} className='p-2'>
                                                                                        {opt}
                                                                                </option>
                                                                                ))
                                                                        }
                                                                        </select>
                                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                                        </div>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </>
                                </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mx-1 -mb-4">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={cancelModal}
                                        >
                                                        Close
                                        </button>
                                        <button
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                onClick={() => updateFaqData() }
                                                >
                                                Update
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
