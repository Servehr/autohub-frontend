import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { Modal } from '@/components/Modal';


export const DeleteBlogPost = ({onClick, openDeleteBlog, blogs})  =>
{
        const [isLoading, setIsLoading] = useState(blogs?.id)
        const [blogId, setBlogId] = useState(blogs?.id)
        console.log(blogs)

        const deletePost = () => 
        {
                // setIsLoading(true)
                let token = localStorage.getItem("token") 
                axios.delete(`${BASE_URL}delete-blog/${blogId}`, {
                        headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': token ? `Bearer ${token}` : "",
                        }
                }).then((response) => 
                {
                //     setIsLoading(false)
                    onClick()
                }).catch((error) => {
                //     setIsLoading(false)
                })     
        }
        
        return (
                <Modal onClick={onClick} isOpen={openDeleteBlog} wrapperWidth={800} margin={'100px auto 0px auto'}>
                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll d-flex justify-center item-center'>
                                <h1 className='flex w-full justify-center items-center font-bold text-lg mb-10 mx-auto'>You are about to delete post: {blogs?.title}</h1>
                                
                                <div className="items-center gap-5 mt-2 sm:flex flex justify-between mb-2 mx-2 mt-5">
                                        <button  
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                onClick={() => {
                                                        onClick(!openDeleteBlog)
                                                }}
                                                >
                                                        Close
                                        </button>
                                        <button
                                                className="mt-2 p-4 text-white hover:font-bold text-sm bg-blue-600 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 justify-end"
                                                onClick={deletePost}
                                        >
                                        Delete 
                                        </button>
                                </div>
                        </div>
                </Modal>  
        );
}
