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
import { AddQuestionaireModal } from "@/components/questionaire/AddQuestionaireModal";
import Folder from "@/components/Folder";

export default function Questionaire()
{
    
    // const { data, isLoading } = useQuery([`${x}/test-questionaires`], () => dashboardOverview(), { refetchOnWindowFocus: false, staleTime: Infinity, retry: 2 })

    const { isMobile } = browserType();
    // const advertState = appStore((state) => state) 
    const  data  = [
        {id: 1, title: 'Artificial Intelligence', figures: 3573, icon: "visitors" },
        {id: 2, title: 'Repairs and Maintenance', figures: 3573, icon: "visitors" },
        {id: 3, title: 'Car Dealings (Sales And Purchase)', figures: 3573, icon: "visitors" },
        {id: 4, title: 'Automobile', figures: 3573, icon: "visitors" },
        {id: 5, title: 'Auctioning', figures: 3573, icon: "visitors"},
        {id: 6, title: 'General Knowledge on Automobile', figures: 3573, icon: "visitors" },
        {id: 7, title: 'General Knowledge on Automobile', figures: 3573, icon: "visitors" },
        {id: 8, title: 'Auctioning', figures: 3573, icon: "visitors"},
    ]    

    const [dataTable, setDatable] = useState("")
    const columns = [
        { field: 'id' },
        { field: 'title' }
    ]
    const [openQuestionaire, setOpenQuestionaire] = useState(false)
    const [clickTable, setClickTable] = useState(false)

    // if(!isLoading)
    // {
    //     console.log(!isLoading)
    //     console.log(data)
    // }

    // if(isRefetching)
    // {
    //     console.log(isRefetching)
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
            <div className='w-full flex h-full bg-blue-500'>
                <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600'> 
                    <Sidebar />
                </div>
                <div className='bg-white md:w-10/12 lg:10/12 w-12/12 lg:flex-row px-5 bg-blue-500'>

                    <div className="w-full justify-between p-3 mt-2 flex bg-green-100 -mb-3 items-center rounded-lg">                        
                        <div className="p-3 mt-5">
                            <h1 className="font-bold">Test Questionaires</h1>
                        </div>
                        <div className="font-bold px-3 py-2 bg-green-900 text-white rounded-md cursor-pointer" onClick={() => setOpenQuestionaire(true)}>Add Questionaire</div>
                    </div>
                    
                    <div className="w-full p-1 mb-10 rounded-lg" style={{ marginBottom: '100px' }}>
                        {/* {isLoading && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                            {isMobile ? (
                                <BeatLoader color="#1c9236" />
                            ) : (
                                <BounceLoader color="#1c9236" />
                            )}
                            </div>
                        )} */}

                        {/* {isLoading && !isRefetching && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                            {isMobile ? (
                                <BeatLoader color="#1c9236" />
                            ) : (
                                <BounceLoader color="#1c9236" />
                            )}
                            </div>
                        )} */}
                        <div className='grid grid-cols-12 gap-5 py-2 px-3 mt-5 mb-40'>
                        {
                            // !isLoading && (data.length > 0) &&  <DynamicTable 
                            // (data.length > 0) &&  <DynamicTable 
                            //                                                     header={['S/N', 'Course', 'Actions']} 
                            //                                                     columns={columns}
                            //                                                     data={data}
                            //                                                     onClick={(e) =>  {
                            //                                                         console.log(e)
                            //                                                         setClickTable(e) 
                            //                                                     } } 
                            //                                                     page={'questions'}
                            //  />
                            data.map((data, index) => <Folder titles={data.title} figures={data.figures} icons={data.icon} />)
                        }
                        </div>
                    </div>

                </div>
            </div>

            { openQuestionaire && <AddQuestionaireModal onClick={(e) => {
                                                // refetch()
                                                setOpenQuestionaire(false) 
                                                // setClickTable(e) 
                                            }
                                        } openQuestionaire={openQuestionaire}  
                                /> }
        </>
  )
}