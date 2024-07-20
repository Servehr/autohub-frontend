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

export default function Students()
{
    
    const { isMobile } = browserType();
    // const advertState = appStore((state) => state)    
    const  data  = [
        { firstname: 'Grace', surname: 'Kelechi', email: 'grace2349@gmail.com', phoneNumber: '09083847543' },
        { firstname: 'Ibrahim', surname: 'Sanusi', email: 'sanusi0987@gmail.com', phoneNumber: '07023541276' },
        { firstname: 'Peter', surname: 'Ederson', email: 'peterson@yahoo.com', phoneNumber: '09023765432' },
        { firstname: 'Michael', surname: 'John', email: 'michaeljohnson@mail.com', phoneNumber: '07023541276' },
        { firstname: 'Bernald', surname: 'Festus', email: 'festuswre@gmail.com', phoneNumber: '08078654231' }
    ]
    const [dataTable, setDatable] = useState("")
    const columns = [
        { field: 'firstname' },
        { field: 'surname' },
        { field: 'email' },
        { field: 'phoneNumber' },
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
                        <div className="bg-white p-3 mt-5">
                            <h1 className="font-bold">All Student</h1>
                        </div>
                        {/* <div className="font-bold px-3 py-2 bg-green-900 text-white rounded-md cursor-pointer" onClick={() => setOpenFaqModal(true)}>Add Faq</div> */}
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
                                                                                header={['FirstName', 'Surname', 'Email', 'Phone Number', 'Actions']} 
                                                                                columns={columns}
                                                                                data={data}
                                                                                onClick={(e) =>  {
                                                                                    console.log(e)
                                                                                    setClickTable(e) 
                                                                                } } 
                                                                                page={'student'}
                                                                            />
                        }
                    </div>

                </div>
            </div>

            { openFaqModal && <AddFaqModal onClick={(e) => {
                                                setOpenFaqModal(false) 
                                                setClickTable(e) 
                                            }
                                        } openFaqModal={openFaqModal}  
                                /> }
        </>
  )
}