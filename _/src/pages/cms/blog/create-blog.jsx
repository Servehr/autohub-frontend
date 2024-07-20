import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Sidebar  from "../../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import '../../css/ad.css'
import '../../css/dragAndDrop.css'
import { appStore } from "@/state/appState";
import DynamicTable from "@/components/table"
import { GetSearchedProduct, allProduct, viewPosts } from "@/apis/ads";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Compressor from 'compressorjs'
import { Icons } from "@/util/icon";

export default function CreateBlog()
{
    // const advertState = appStore((state) => state)
    
    // const { data: blogPost, isLoading, refetch } = useQuery(["get-all-product"], () => viewPosts(currentPage, perPage), { refetchOnWindowFocus: true, staleTime: Infinity, retry: 2 })
    const [dataTable, setDatable] = useState("")
    const [refresh, setRefresh] = useState(0)
    const [isLoadingData, setIsLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [value, setValue] = useState("")
    const [point, setPoint] = useState("")
    const [imageToUpload, setImageToUpload] = useState(false)
    const [error, setError] = useState(false)
    const [imgeUrl, setUrl] = useState("")
    const navigate = useNavigate();

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: [] }],
            [ "bold", "italic", "underline", "strike", "blockquote" ],
            [ 
                { list: "ordered" },
                { list: "bullet" },
                { list: "-1" },
                { list: "+1" },
            ],
            [ "link"]
            // [ "link", "image", "video" ]
        ],
        // handlers: {
        //     'image': () => this.quillImageCallBack()
        // }
    }

    // if(!isLoading)
    // {
    //     console.log(blogPost?.blog_post?.posts)
    // }

    useEffect(() => {
        
    }, [])

    const publishPost = () => 
    {
        console.log({theValue: value})
    }

    const uploadImage = async () =>
        {
                // addProductAds(imageToUpload) 
                console.log({ title, value })
                let token = localStorage.getItem("token")           
                let blogPost = new FormData();
                blogPost.append('title', title)
                blogPost.append('keypoint', point)
                blogPost.append('content', value)
                blogPost.append('postImage', imageToUpload[0])
                await axios.post(`${BASE_URL}post-blog`, blogPost, {
                        headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': token ? `Bearer ${token}` : "",
                        }
                }).then((response) => 
                {  
                        setUrl("")
                        navigate('/blog-post')
                }).catch((error) => { 
                        console.log(error)                      
                        return false
                })
        }

        const imageUrlToDisplay = (file) => 
        {
                const img = file[0]
                const displayedImage = URL.createObjectURL(img)
                setUrl(displayedImage)
                setImageToUpload(file)
        }

    // quillImageCallBack = () => 
    // {

    // }
         


  return ( 
        <div className="bg-white">
            <div className='w-full flex'>
                <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600'> 
                    <Sidebar />
                </div>
                <div className='bg-white md:flex-row px-5 md:w-10/12 w-full md:ml-5 mb-20'>
                    <div className="bg-white p-3 mt-1 text-xl font-bold flex">
                        <span className="font-bold md:w-2/12 text-md sm:w-full items-center">Create Post</span>
                    </div>

                    <div className="mt-3 grid grid-cols-12 gap-5">
                        
                        <div className="md:col-span-4 col-span-12 p-3 border border-2 rounded-xl">
                            {/* <Icons width={100} height={50} iconName={'image'} color="#f9f7f7" /> */}
                                                        

                            <div className="drag-area p-3 items-center text-center justify-center">
                                {
                                    (imgeUrl == "") ? 
                                    (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[400px] h-[400px]" style={{ color: "#f9f7f7" }}>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                        </svg>
                                    )
                                    : (
                                        <>
                                            { imgeUrl && <img src={imgeUrl} alt="Product image" className="h-80 rounded-xl w-fit mb-10 object-fit mx-auto p-2 bg-green-200" /> }
                                                <span className={""} onClick={() => { 
                                                                                        // console.log(image)
                                                                                        setUrl("")
                                                                                        // setDeleteModal(true)
                                                                            }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-5 h-5 md:w-5 md:h-5 my-2 cursor-pointer">
                                                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                                    </svg>
                                                </span>
                                        </>
                                    )
                                }
                                
                            <span className="flex justify-center items-center text-xs block" role="button">
                                <b class="px-10 py-5">Browse</b>
                                <input type="file" name="file" className="text-sm text-stone-500 file:mr-5 file:rounded-lg file:border-[2px] file:text-xs 
                                                                            file:font-medium file:bg-blue-900 file:text-white hover:file:cursor-pointer 
                                                                            hover:file:bg-blue-200 hover:file:text-black file:p-3" 
                                                                        onChange={
                                                                            (e) => {
                                                                                        imageUrlToDisplay(e.target.files)
                                                                                    }
                                                                        }                                                                                         
                                                />
                                            </span>
                            </div>

                        </div>
                        <div className="md:col-span-8 col-span-12 p-3">
                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                name="title"
                                type="text"
                                placeholder="Enter Title"
                                className="border w-full md:w-11/12 outline-none focus:border-brandGreen text-xs mb-10 sm:text-base rounded-[10px] p-4"
                            />

                            <textarea
                                onChange={(e) => setPoint(e.target.value)}
                                name="point"
                                type="text"
                                placeholder="Eye Point"
                                className="border w-full md:w-11/12 outline-none focus:border-brandGreen text-xs mb-10 sm:text-base rounded-[10px] p-4"
                                rows={3}
                            >
                            </textarea>
                            
                            <ReactQuill theme="snow" value={value} onChange={setValue} className="w-full md:w-11/12 h-[350px]" modules={modules} />

                            <div className="bg-green-800 px-2 py-4 w-[150px] rounded-md mt-20 text-sm text-white font-semibold hover:font-bold text-center cursor-pointer hover:bg-green-500 hover:text-black hover:text-sm" 
                                onClick={uploadImage}>
                                Publish Post
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
  )
}