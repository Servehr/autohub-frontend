import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';


export const ProductComments = ({ onClick, closeCommentDialog, messages, productName })  =>
{
        console.log(messages)
        return (
                <>
                        <Modal onClick={onClick} isOpen={closeCommentDialog} wrapperWidth={900} margin={'90px auto 0px auto'} color='green'>
                                <div className="flex gap-5 mt-3 w-full items-justify items-center">
                                        <h1 className='font-bold text-lg mb-2 col-span-10'>All comments on {productName}</h1>
                                </div>
                                
                                        <div className="mt-5">
                                                {
                                                        messages &&
                                                        messages.length > 0 &&
                                                        messages.map((msg, index) => {
                                                                return (
                                                                        <>
                                                                           <div className="w-full border border-1 h-23 p-2 my-3" key={index}>
                                                                                {msg.message}
                                                                           </div> 
                                                                        </> 
                                                                       )
                                                                })        
                                                }
                                        </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-left mb-2 mx-5 mt-8 -ml-1">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-green-900 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={() =>
                                                        onClick(false)
                                                }
                                                >
                                                Close
                                        </button>
                                </div>
                        </Modal>
                </> 
        );
}
