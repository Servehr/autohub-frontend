import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import Pulsate from "@/components/Pulsate";
import '../css/ad.css'
import '../css/dragAndDrop.css'
import { appStore } from "@/state/appState";


const pulsates = [
    { title: "Transactions", figures: "240,000,000", icon: "finance" },
    { title: "Users", figures: 4, icon: "sellers" },
    { title: "Managers", figures: 4, icon: "managers" },
    { title: "Staff", figures: 8, icon: "user" },
    { title: "Marketers", figures: 24, icon: "sellers" },
    { title: "Dealers", figures: 120, icon: "user" },
    { title: "Sellers", figures: 650, icon: "sellers" },
    { title: "Products", figures: 400, icon: "products" },
    { title: "Requests", figures: 43, icon: "requests" },
    { title: "Expenses", figures: 410, icon: "expenses" },
    { title: "Visitors", figures: 3573, icon: "visitors" },
    { title: "Ads", figures: 573, icon: "ads" },
]

export default function Ads()
{
    const advertState = appStore((state) => state)

    const [theUserState, setTheUserStates] = useState("")
    const [thumbnail, setImages] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef(null)

    useEffect(() => {
        setTheUserStates(advertState.getStates())
        console.log(advertState.getStates())
    }, [])

    console.log(theUserState)
    const selectFiles = () => 
    {
        // fileInputRef.current.click()
    }
    
    const selectMultipleFiles = (event) => 
    {
        const selectedFiles = event.target.files;
        console.log(selectedFiles)
        const selectedFilesArray = Array.from(selectedFiles)

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file)
        })
        // setImages((previousImages) => previousImages.concat(imagesArray))

        // console.log(thumbnail)
        
        imagesArray.forEach((image, index) => {
            setImages((previousImages) => previousImages.concat(image))
        })
        // setImages((prevImages) => [
        //                 ...prevImages, {
        //                     img: files[index].name,
        //                 }
        //         ])

        // console.log("I came here")
        // const files = event.target.files;
        // console.log(files.length)
        // if(files.length === 0) return;
        // for (let index = 0; index < files.length; index++) 
        // {
        //     if(files[index].type.split('/')[0] !== 'image') continue;
        //     if(!images.some((e) => e.name === files[index].name))
        //     {
        //         setImages((prevImages) => [
        //             ...prevImages, {
        //                 name: files[index].name,
        //                 url: URL.createObjectURL(files[index])
        //             }
        //         ])
        //     }
        // }
    }

    const deleteImage = (image) => 
    {
        setImages(thumbnail.filter((e) => e !== (image)))
        // setImages((prevImages) => {
        //     prevImages.filter((i) => i != index)
        // })
    }

  return ( 
        <div className='w-full flex'>
            <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600'> 
                <Sidebar />
                {/* <h1>Great</h1> */}
            </div>
            <div className='md:w-10/12 lg:10/12 w-12/12 lg:flex-row px-5'>
                {/* <div className='grid md:grid-cols-12 grid-cols-6 gap-5 py-2 pr-5 mt-2 mb-5 justify-center items-center order-5 mt-5'>
                    <AdminHeader />
                </div> */}

                {/* <div className="grid md:grid-cols-12 grid-cols-12 gap-5 md:p-3 mt-2 mb-5 justify-center items-center">
                    <div className="col-span-12 md:col-span-1 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:fill-current cursor-pointer hover:fill-red-900">
                            <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
                        </svg>                                            
                    </div>
                </div> */}

                <div className="p-5">
                    <div className="w-full bg-blue-200 px-5 py-3 -mt-2">
                        <h1 className="font-bold">Create Advert</h1>
                        <h1>- {advertState.getStates()}</h1>
                    </div>
                </div>

                <div className="p-5 -mt-5">
                    <div className="grid md:grid-cols-12 grid-cols-12 gap-5 mt-1 mb-5 justify-center">
                        
                        <div className="col-span-8 bg-white p-10 rounded-lg shadow-lg">

                            {/* <div className="p-1 rounded w-full bg-green-200 mb-5 -mt-5">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2" for="grid-state">
                                    Car Details
                                </label>
                            </div> */}

                            <h1 className="w-full text-blue-900 font-bold -mt-5 mb-4">Car Details</h1>

                            <div className="mb-4">
                                {/* <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                    Categories
                                </label> */}
                                <div className="relative">
                                <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option>- Select State -</option>
                                    <option>With options</option>
                                    </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                                </div>
                            </div>

                            {/* <div className="bg-white p-5 rounded-2xl flex justify-center items-center">
                                <div className="border-2 rounded-md p-8 border-dotted">
                                    <p className="font-medium mb-1">Drop document here</p>
                                    <p className="font-medium text-sm mb-4 text-gray-600">or upload it manualy</p>
                                    <button className="bg-primary text-white font-medium text-sm py-2.5  px-6 rounded-3xl flex items-center gap-2 hover:bg-blue-700">
                                        Upload manualy
                                        <span>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 1V6M6 11V6M6 6H1M6 6H11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div> */}
                            
                            <div className="flex flex-wrap -m-2 mt-2">
                                <div className="p-2 w-1/2">
                                    <div className="mb-4">
                                        <div className="relative">
                                        <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option>- Select Category -</option>
                                            <option>With options</option>
                                            </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-1/2">
                                    <div className="mb-4">
                                        <div className="relative">
                                        <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option>- Select Maker -</option>
                                            <option>With options</option>
                                            </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* <div className="flex flex-wrap -m-2 mt-2">
                                <div className="p-2 w-1/2">
                                    <div className="mb-4">
                                        <div className="relative">
                                        <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option>- Select -</option>
                                            <option>With options</option>
                                            </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-1/2">
                                    <div className="mb-4">
                                        <div className="relative">
                                        <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option>- Select Year -</option>
                                            <option>With options</option>
                                            </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            

                            {/* <div className="p-1 rounded w-full bg-blue-200 mt-5">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2" for="grid-state">
                                    Car Description
                                </label>
                            </div> */}
                            
                            <div className="flex flex-wrap -m-2 mt-2">
                                <div className="p-2 w-1/2">
                                    <div className="mb-4">
                                        <div className="relative">
                                        <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option>- Select Model -</option>
                                            <option>With options</option>
                                            </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-1/2">
                                    <div className="mb-4">
                                        <div className="relative">
                                        <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option>- Year of Production -</option>
                                            <option>With options</option>
                                            </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap -m-2 mt-2">
                                <div className="p-2 w-1/2">
                                    <div className="mb-4">
                                        <div className="relative">
                                        <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option>- Select Colour -</option>
                                            <option>With options</option>
                                            </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-1/2">
                                    <div className="mb-4">
                                        <div className="relative">
                                        <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option>- Select Transmission -</option>
                                            <option>With options</option>
                                            </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap -m-2 mt-2">
                                <div className="p-2 w-1/2">
                                    <div className="mb-4">
                                        <div className="relative">
                                        <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option>- Select Condition -</option>
                                            <option>With options</option>
                                            </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 w-1/2">
                                    <div className="mb-4">
                                        <div className="relative">
                                        <select className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option>- Select Trim (Optional) -</option>
                                            <option>With options</option>
                                            </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap -m-2 mt-1 p-2">
                                <textarea className="shadow form-textarea mb-2 block w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="2" placeholder="Enter Description"></textarea>
                            </div>

                            <div className="flex flex-wrap -m-2 mt-2 mb-5">
                                <div className="p-2 w-1/2">
                                    <input type="text" id="vin" value={theUserState} name="vin" placeholder="VIN chasis number (Optional)" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <div className="p-2 w-1/2">
                                    <input type="text" id="price" name="price" placeholder="Price (₦)" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>

                            {/* <div className="flex flex-wrap -m-2 mt-2">
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label for="name" className="leading-7 text-sm text-gray-600">Name</label>
                                        <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
                                        <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                </div>
                            </div> */}


                            <div className="grid md:grid-cols-12 grid-cols-12 gap-5 md:p-3 mb-5 justify-center items-center border border-2 rounded-lg">
                                <div className="col-span-6">
                                    <button className="bg-green-600 border border-4 border-blue-200 border-dotted text-white font-medium text-sm py-4 w-full px-6 rounded-md gap-2 hover:bg-blue-700">
                                        Free (₦) 0.00
                                    </button>
                                </div>
                                <div className="col-span-6">
                                    <button className="bg-green-600 border border-4 border-blue-200 border-dotted text-white font-medium text-sm py-4 w-full px-6 rounded-md gap-2 hover:bg-blue-700">
                                        Premium (₦) 35, 000.00
                                    </button>
                                </div>
                            </div>
                            <div className="px-1 py-2 -mt-2">
                                <button className="bg-primary text-white font-medium text-sm py-2.5  px-6 rounded-md flex items-center gap-2 hover:bg-blue-700" style={{backgroundColor: "#1e3a8a"}}>
                                    Submit
                                </button>
                            </div>

                        </div>

                        <div className="col-span-4 bg-white p-4 rounded-lg shadow-lg">
                            {/* <div className="bg-white p-5 rounded-2xl flex justify-center items-center">
                                <div className="border-2 rounded-md p-8 border-dotted">
                                    <p className="font-medium mb-1">Drop document here</p>
                                    <p className="font-medium text-sm mb-4 text-gray-600">or upload it manualy</p>
                                    <button className="bg-primary text-white font-medium text-sm py-2.5  px-6 rounded-3xl flex items-center gap-2 hover:bg-blue-700" style={{backgroundColor: "#1e3a8a"}}>
                                        Upload manualy
                                        <span>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 1V6M6 11V6M6 6H1M6 6H11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div> */}
                            <div className="card">
                                <div className="top">
                                    <p>Upload Vehicle Images</p>
                                </div>
                                <div className="drag-area p-3 items-center text-center flex justify-center">
                                    {
                                        isDragging ? (
                                            <span className="select">Drop Image Here</span>
                                        ) : (
                                            <>
                                                
                                                <span className="flex select justify-center items-center text-xs block" role="button">
                                                    <b class="px-10 py-5">Browse</b>
                                                    <input type="file" name="file" className="file" multiple onChange={selectMultipleFiles} />
                                                </span>
                                            </>
                                        )                                        
                                    }
                                </div>
                                <div className="grid md:grid-cols-12 gap-5 pt-3">
                                    {/* {
                                        images.map((image, index) => 
                                        {
                                            <div className="image" key={index}>
                                            {index}
                                                <span className="delete" onClick={() => deleteImage(index)}>&times;</span>
                                                <img src={image.url} alt={image.name} />
                                            </div>
                                        })
                                    } */}
                                    {
                                        thumbnail && thumbnail.map((image, index) => {
                                            return (
                                                <div className="col-span-6 border border-2 h-23" key={index}>
                                                    <img src={image} alt="upload" />
                                                    {/* <span className="delete cursor-pointer pt-2 pl-3" onClick={() => setImages((e) => e !== image)}> */}
                                                    <span className="delete cursor-pointer pt-2 pl-3" onClick={() => deleteImage(image)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-5 h-5 right-0 bottom-0 m-2">
                                                            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                                        </svg>
                                                    </span>
                                                </div> 
                                            )
                                        })
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
  )
}