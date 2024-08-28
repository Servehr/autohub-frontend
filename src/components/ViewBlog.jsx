import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/Modal';
import { BLOG_POST } from '@/lib/axios';


export const ViewBlog = ({onClick, openViewBlog, blogs})  =>
{
        const [title, setTitle] = useState(blogs?.title)
        const [point, setPoint] = useState(blogs?.keypoint)
        const [views, setViews] = useState(blogs?.views)
        const [comment, setComments] = useState(blogs?.comment_count)
        const [fullname, setFullname] = useState(blogs?.user_firstname + " " + blogs?.user_lastname)
        const [author, setAuthor] = useState(blogs?.author)
        const [dated, setDated] = useState(blogs?.created_at)
        const [photos, setPhotos] = useState(blogs?.photos)
        
        const cancelModal = () => 
        {
                onClick(true)
        }

        return (
                <Modal onClick={onClick} isOpen={openViewBlog} wrapperWidth={1000} margin={'65px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'>
                                
                                <div className='col-span-12 pb-2 overflow-auto justify-center h-fit py-2 item-center'>
                                        <>                                                
                                                <div className="p-1 mt-1 pb-2 overflow-auto overflow-y-scroll h-[700px]">
                                                        <h1 className='font-bold text-lg mb-5'>{title} Detail</h1>
                                                        <div className="w-full d-flex justify-center items-center md:flex mt-1 gap-5 mb-5 border p-3">
                                                                <img src={`${BLOG_POST}/${photos}`} />        
                                                        </div>  
                                                        <div className='w-full d-flex md:flex mt-1 gap-5 mb-5 border p-3'><span className='font-bold text-green-800 text-xl'>{point}</span></div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5 border p-3">Views:  <span className='font-bold text-green-800 text-xl'>{views}</span></div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5 border p-3">Comments:  <span className='font-bold text-green-800 text-xl'>{comment}</span></div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5 border p-3">Author:  <span className='font-bold text-green-800 text-xl'>{fullname}</span></div>
                                                        <div className="w-full d-flex md:flex mt-1 gap-5 mb-5 border p-3">Dated:  <span className='font-bold text-green-800 text-xl'>{dated}</span></div>
                                                </div>
                                        </>
                                </div>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-1 mt-3">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={cancelModal}
                                        >
                                                        Close
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
