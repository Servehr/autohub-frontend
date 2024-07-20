import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Sidebar  from "../../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import '../../css/ad.css'
import '../../css/dragAndDrop.css'
import { appStore } from "@/state/appState";
import DynamicTable from "@/components/table"
import { GetSearchedProduct, allProduct, getPost } from "@/apis/ads";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Compressor from 'compressorjs'
import { Icons } from "@/util/icon";

export default function EditBlog()
{
    // const advertState = appStore((state) => state)
    const { id } = useParams();    
    const { data, isLoading, refetch } = useQuery([`get-post/${id}`, id], () => getPost(id), { refetchOnWindowFocus: true, staleTime: Infinity, retry: 2 })
    const [dataTable, setDatable] = useState("")
    const [refresh, setRefresh] = useState(0)
    const [isLoadingData, setIsLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [value, setValue] = useState("<a href='' style='color:red;'>Greateness</a>")
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
        setUrl(imgeUrl)
    }, [imgeUrl])

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
        <div className="pb-5 bg-white">
            <div className='w-full flex'>
                <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600'> 
                    <Sidebar />
                </div>
                <div className='bg-white md:flex-row px-5 md:w-10/12 w-full md:ml-5 mb-40'>
                    <div className="bg-white p-3 mt-1 text-xl font-bold flex">
                        <span className="font-bold md:w-2/12 text-md sm:w-full items-center">Edit Post</span>
                    </div>

                    <div className="mt-3 grid grid-cols-12 gap-5">

                        {
                            isLoading && <div className="h-[200px] flex justify-center items-center col-span-12" style={{ marginTop: '50px', paddingTop: '100px' }}>
                                <BeatLoader color="#1c9236" />
                            </div>
                        }
                    
                    { 
                        !isLoading && <>                        
                            <div className="md:col-span-4 col-span-12 p-3 border border-2 rounded-xl">
                                {/* <Icons width={100} height={50} iconName={'image'} color="#f9f7f7" /> */}
                                {/* {imgeUrl} */}
                                                            

                                <div className="drag-area p-3 items-center text-center justify-center">
                                    {
                                        (imgeUrl != "") && <img src={imgeUrl} alt="Product image" className="h-80 rounded-xl w-fit mb-10 object-fit mx-auto p-2 bg-green-200" />
                                    }

                                    {
                                        (imgeUrl === "") && <img src={data.photos} alt="Product image" className="h-80 rounded-xl w-fit mb-10 object-fit mx-auto p-2 bg-green-200" />
                                    }
                                    {/* {
                                        (imgeUrl != "" || imgeUrl != "undefined") ? 
                                        (
                                            <>
                                                <img src={data.photos} alt="Product image" className="h-80 rounded-xl w-fit mb-10 object-fit mx-auto p-2 bg-green-200" />
                                            </>
                                        )
                                        : (
                                            <>
                                                { <img src={data.photos} alt="Product image" className="h-80 rounded-xl w-fit mb-10 object-fit mx-auto p-2 bg-green-200" /> }
                                            </>
                                        )
                                    } */}
                                    
                                <span className="flex justify-center items-center text-sm block w-full" role="button">
                                    <b class="py-5 w-4/12">Change Image</b>
                                    <input type="file" name="file" className="text-md w-8/12 text-stone-500 file:mr-5 file:rounded-lg file:border-[2px] file:text-xs 
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
                                    name="password"
                                    type=""
                                    value={data.title}
                                    placeholder="Enter Title"
                                    className="border w-full md:w-11/12 outline-none focus:border-brandGreen text-xs mb-10 sm:text-base rounded-[10px] p-4"
                                />
                                
                                <ReactQuill theme="snow" value={data.content} onChange={setValue} className="w-full md:w-11/12 h-[450px]" modules={modules} />

                                <div className="bg-green-800 px-2 py-4 w-[150px] rounded-md mt-20 text-sm text-white font-semibold hover:font-bold text-center cursor-pointer hover:bg-green-500 hover:text-black hover:text-sm" 
                                    onClick={uploadImage}>
                                    Publish Post
                                </div>
                            </div>
                        </>
                    }

                    </div>

                </div>
            </div>

        </div>
  )
}