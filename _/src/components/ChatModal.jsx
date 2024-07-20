import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import { AVATAR } from '@/lib/axios';
import { useQuery } from 'react-query';
import { ChatList } from '@/apis/misc';
import Conversation from '@/pages/user/conversation';


export const ChatModal = ({onClick, chatModal, message, vendorName, imageUrl, userLiveStatus, toAdvertiser, toAdvertiserProduct})  =>
{
        const advertState = appStore((state) => state)
        const navigate = useNavigate();

        return (
                <Modal onClick={onClick} isOpen={chatModal} wrapperWidth={800} margin={'90px auto 0px auto'}>
                        <div className='col-span-12 pt-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                <div className='flex justify-between space-x-5 items-center bg-blue-100 p-3 mb-4 rounded-md'> 
                                        <div className='flex justify-center items-center space-x-2 font-bold text-md'>
                                                <img src={`${AVATAR}${imageUrl}`} className='w-10 h-10 rounded-full border border-3 shadow-border' />       
                                                <h1>{vendorName}</h1>                   
                                                { (userLiveStatus === 0) && <div className="font-bold text-sm flex"><div className='h-[10px] bg-red-600 p-2 rounded-full'></div><span className="text-red-600"></span></div> }
                                                { (userLiveStatus === 1) && <div className="font-bold text-sm flex"><div className='h-[10px] bg-green-600 p-2 rrounded-full'></div><span className="text-red-600"></span></div> }
                                        </div>                     
                                </div>
                                <Conversation theUserId={toAdvertiser} advertiserProductId={toAdvertiserProduct} /> 
                        </div>
                </Modal>  
        );
}
