import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Sidebar  from "../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import '../css/ad.css'
import '../css/dragAndDrop.css'
import { appStore } from "@/state/appState";
import { BeatLoader, BounceLoader } from "react-spinners";
import { browserType } from "@/store";
import DynamicTable from "@/components/table"
import { allProduct } from "@/apis/ads";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { fetchAllFaqs } from "@/apis/misc";
import { AddFaqModal } from "@/components/faq/AddFaqModal";

export default function Expenses()
{
    
    const { isMobile } = browserType();
    // const advertState = appStore((state) => state)    
    const  data  = [
        { by: 'Emmanuel Austin', item: 'Grace', amount: 'Kelechi', date: 'grace2349@gmail.com' },
        { by: 'Musa Bayero', item: 'Ibrahim', amount: 'Sanusi', date: 'sanusi0987@gmail.com' },
        { by: 'Kazeem Afolayan', item: 'Peter', amount: 'Ederson', date: 'peterson@yahoo.com' },
        { by: 'Temitope Rebecca', item: 'Michael', amount: 'John', date: 'michaeljohnson@mail.com' },
        { by: 'Ngozi Adamma', item: 'Bernald', amount: 'Festus', date: 'festuswre@gmail.com' }
    ]
    const [dataTable, setDatable] = useState("")
    const columns = [
        { field: 'by' },
        { field: 'item' },
        { field: 'amount' },
        { field: 'date' },
    ]
    const [openFaqModal, setOpenFaqModal] = useState(false)
    const [clickTable, setClickTable] = useState(false)

    // if(!isLoading)
    // {
    //     console.log(data)
    // }

    useEffect(() => {
        console.log("Giving")
        // refetch()
    }, [clickTable])


    // const [isLoading, setIsLoading] = useState(false)
    // useEffect(() => {
    //     getProducts()
    // }, [isLoading])

    // const getProducts = async () => 
    // {
    //     let token = localStorage.getItem("token")  
    //     await axios.get(`${BASE_URL}ad/all-product`, {
    //             headers: { 'Authorization': token ? `Bearer ${token}` : ""}
    //             }).then((response) => 
    //             {  
    //                 if(response.data.data)
    //                 {
    //                     setIsLoading(true)
    //                     setDatable(response.data.data)
    //                 }
    //             }).catch((error) => {                        
    //                     console.log(error)
    //             })
    // }


  return ( 
        <>
            <div className='w-full flex'>
                <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600'> 
                    <Sidebar />
                </div>
                <div className='bg-white md:w-10/12 lg:10/12 w-12/12 lg:flex-row px-5'>

                    <div className="w-full justify-between p-3 flex space-x-10 -mb-3 items-center">                        
                        <div className="bg-white py-3 mt-5">
                            <h1 className="font-bold text-2xl">Expenses</h1>
                        </div>
                        {/* <div className="font-bold px-3 py-2 bg-green-900 text-white rounded-md cursor-pointer" onClick={() => setOpenFaqModal(true)}>Add Faq</div> */}
                    </div>

                    <div className="grid grid-cols-12 justify-between mb-3">
                        <div className="col-span-2 relative px-2">
                            <span className="w-full font-bold text-sm"></span>
                            <select onChange={(e) => {    
                                                                            
                                }
                            } 
                                name="state"
                                id="state"
                                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-4 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option value={20}> 20  </option>
                                    <option value={20}> 30  </option>
                                    <option value={20}> 40  </option>
                                    <option value={20}> 50  </option>
                                    <option value={20}> 100  </option>
                                    <option value={20}> 200  </option>
                            </select>
                            <div className="pointer-events-none absolute mr-3 inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                        <div className="col-span-9 px-2">
                            <input onBlur={(e) => {
                                                        
                                    }} type="text" id="city" defaultValue={''}  name="city" placeholder="Enter Your City" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 text-sm py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="col-span-1">
                            <div
                                    onClick={() => {} }
                                    className="peer relative appearance-none w-fit text-white p-3 cursor-pointer bg-green-800 hover:bg-green-600 hover:font-bold rounded-md">Submit</div>
                        </div>
                    </div>
                    
                    <div className="w-full p-3 mb-10" style={{ marginBottom: '100px' }}>
                        {/* {isLoading && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                            {isMobile ? (
                                <BeatLoader color="#1c9236" />
                            ) : (
                                <BounceLoader color="#1c9236" />
                            )}
                            </div>
                        )} */}

                        {/* {!isLoading && isRefetching && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                            {isMobile ? (
                                <BeatLoader color="#1c9236" />
                            ) : (
                                <BounceLoader color="#1c9236" />
                            )}
                            </div>
                        )} */}
                        {
                            // !isLoading && !isRefetching && (data.length > 0) &&  <DynamicTable 
                            (data.length > 0) &&  <DynamicTable 
                                                                                header={['By', 'Item', 'Amount', 'Date', '']} 
                                                                                columns={columns}
                                                                                data={data}
                                                                                onClick={(e) =>  {
                                                                                    console.log(e)
                                                                                    setClickTable(e) 
                                                                                } } 
                                                                                page={'expenses'}
                                                                            />
                        }
                    </div>

                </div>
            </div>
        </>
  )
}