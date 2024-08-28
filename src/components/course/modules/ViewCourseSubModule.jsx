import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import DynamicTable from "@/components/table"
import { useQuery } from "react-query";
import { BeatLoader, BounceLoader } from "react-spinners";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CountryStates } from '@/apis/backend/location';
import { viewCourseSubModule } from '@/apis/backend/course';
import { Modal } from '@/components/Modal';
import { AddSubModule } from '../submodule/AddSubModule';


export const ViewCourseSubModule = ({onClick, oopenCourseModule, subModulez })  =>
{
        const [moduleNamee, setModuleName] = useState(subModulez?.name)
        const [moduleId, setModuleId] = useState(subModulez?.id)
        const [subModule, setAddSubModule] = useState("") 

        const { data, isLoading, refetch, isRefetching  } = useQuery([`all-course-sub-module`], () => viewCourseSubModule(moduleId), { cacheTime: 0 })
       
        if(!isLoading)
        {
                console.log(data)
        }
      
        const columns = [
                { field: 'name' }
        ]

        const cancelModal = () => 
        {
                onClick(true)
        }
        
        return (
                <>
                        <Modal onClick={onClick} isOpen={oopenCourseModule} wrapperWidth={800} margin={'60px auto 0px auto'}>
                                <div className="w-full justify-between p-3 flex space-x-10 -mt-14 items-center mt-5">                        
                                        <div className="bg-white mt-5">
                                                <h1 className="font-bold text-2xl">All Sub-Course Module Under {moduleNamee}</h1>
                                        </div>
                                        <div className="font-bold px-3 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-800" onClick={() => setAddSubModule(true)}>Add Sub Module</div>
                                </div>
                                <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                                >                                
                                        <div className='col-span-12 pb-2 overflow-auto justify-center h-[600px] py-2 pb-10 item-center'
                                        >

                                        {
                                                isLoading && !isRefetching && (
                                                <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                                                        <BounceLoader color="#1c9236" />
                                                </div>
                                                )
                                        }
                                        
                                        {
                                                !isLoading && (data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                                <h1 className="font-bold">
                                                        No Sub-Module Created Yet
                                                </h1>
                                                </div>
                                        }
                                        {
                                        !isLoading && (data?.length > 0) &&  <DynamicTable 
                                                                                                header={['Name', 'Actions']} 
                                                                                                columns={columns}
                                                                                                data={data}
                                                                                                onClick={(e) =>  {
                                                                                                        refetch()
                                                                                                } } 
                                                                                                page={'sub'}
                                                                                        />
                                        }
                                        </div>
                                        
                                        <div className="items-center gap-5 mt-2 sm:flex flex justify-between mx-1 -mb-4">
                                                <button  
                                                        className="mt-2 p-4 text-white hover:font-bold text-sm bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2 justify-start"
                                                        onClick={cancelModal}
                                                >
                                                                Close
                                                </button>
                                        </div>
                                </div>
                        </Modal>  
                        { 
                             subModule && <AddSubModule openAddSubModule={subModule} modulez={moduleId} onClick={() => {
                                        refetch()
                                        setAddSubModule(false)
                             }} /> 
                        }
                </>
        );
}
