import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import axios from 'axios';
import { AVATAR, BASE_URL } from "@/lib/axios";
import { CreateFaq } from '@/apis/misc';


export const UserDetail = ({onClick, openUserDetail, user})  =>
{

        return (
                <Modal onClick={onClick} isOpen={openUserDetail} wrapperWidth={800} margin={'80px auto 0px auto'}>
                <div className='col-span-12 pt-1 justify-center item-center'>
                        
                        <div className='col-span-12 pb-2 justify-center h-fit py-2 item-center -mt-5'>
                                <>                                                
                                        <div className="p-1 mt-1">
                                                <div className="w-full d-flex justify-center items-center md:flex mt-1 gap-5 mb-5 border p-3">
                                                        <img src={`${AVATAR}/${user.avatar}`} width={100} />        
                                                </div>                                               
                                                <div className='w-full d-flex md:flex mt-1 gap-5 mb-1 border p-3'>Firstname: <span className='font-bold text-green-800 text-xl'>{user.name}</span></div>
                                                <div className="w-full d-flex md:flex mt-1 gap-5 mb-1 border p-3">Middlename:  <span className='font-bold text-green-800 text-xl'>{user.middlename}</span></div>
                                                <div className="w-full d-flex md:flex mt-1 gap-5 mb-1 border p-3">Surname:  <span className='font-bold text-green-800 text-xl'>{user.lastname}</span></div>
                                                <div className="w-full d-flex md:flex mt-1 gap-5 mb-1 border p-3">Email:  <span className='font-bold text-green-800 text-xl'>{user.email}</span></div>
                                                <div className="w-full d-flex md:flex mt-1 gap-5 mb-1 border p-3">Phone Number:  <span className='font-bold text-green-800 text-xl'>{user.email}</span></div>
                                                <div className="w-full d-flex md:flex mt-1 gap-5 mb-1 border p-3">Status:  <span className='font-bold text-green-800 text-xl'>{user.status}</span></div>
                                                {
                                                        (user?.company) && <>
                                                                <div className="w-full d-flex md:flex mt-1 gap-5 mb-1 border p-3 bg-green-700 text-white font-bold">Company Info</div>
                                                                <div className="w-full d-flex md:flex mt-1 gap-5 mb-1 border p-3">Company:  <span className='font-bold text-green-800 text-xl'>{user.company?.name}</span></div>  
                                                                <div className="w-full d-flex md:flex mt-1 gap-5 mb-1 border p-3">CAC:  <span className='font-bold text-green-800 text-xl'>{user.company?.cac_number}</span></div>  
                                                                <div className="w-full d-flex md:flex mt-1 gap-5 mb-1 border p-3">Address:  <span className='font-bold text-green-800 text-xl'>{user.company?.address}</span></div>                                                                
                                                        </>
                                                }
                                        </div>
                                </>
                        </div>
                        
                        
                        <div className="items-center gap-5 sm:flex flex justify-between mb-2 mx-1">
                                <button  
                                        className="mt-2 p-4 text-white hover:font-bold text-sm bg-black rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                        onClick={() => {
                                                onClick(!openUserDetail)
                                        }}
                                >
                                                Close
                                </button>
                                <button
                                        className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                >
                                   Update 
                                </button>
                        </div>
                </div>
                </Modal>  
        );
}
