import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import DynamicTable from "@/components/table"
import { useQuery } from "react-query";
import { BeatLoader, BounceLoader } from "react-spinners";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { CountryStates, ManufacturerModels } from '@/apis/backend/location';
import { AddBrand } from './Brand/AddBrand';


export const ViewBrands = ({onClick, openViewBrand, manufacturerId })  =>
{
        const [openBrand, setOpenBrand] = useState(false)

        const { data, isLoading, refetch, isRefetching  } = useQuery([`all-manufacturer-odels`], () => ManufacturerModels(manufacturerId?.id), { cacheTime: 0 })

        const columns = [
                { field: 'id' },
                { field: 'title' },
                { field: 'trims_count' },
                { field: 'rate' }
        ]

        const advertState = appStore((state) => state)
        const navigate = useNavigate();

        const cancelModal = () => 
        {
                onClick(true)
        }
        
        return (
                <>
                        <Modal onClick={onClick} isOpen={openViewBrand} wrapperWidth={1200} margin={'60px auto 0px auto'}>
                                <div className="w-full justify-between p-3 flex space-x-10 -mt-14 items-center mt-5">                        
                                        <div className="bg-white mt-5">
                                                <div className="font-bold text-2xl">All <span className='font-bold text-blue-500'>{manufacturerId?.title}</span> Models</div>
                                        </div>
                                        <div className="font-bold px-3 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-800" onClick={() => setOpenBrand(true)}>Add Brand</div>
                                </div>
                                <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                                >                                
                                        <div 
                                                className='col-span-12 pb-2 overflow-auto justify-center h-[600px] py-2 pb-10 item-center'
                                        >
                                        {
                                                isLoading && !isRefetching && (
                                                <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                                                        <BounceLoader color="#1c9236" />
                                                </div>
                                                )
                                        }
                                        {
                                                !isLoading && (data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                                        <h1 className='font-bold text-red-600 text-2xl'>No Brand Available</h1>
                                                </div>
                                        }
                                        {
                                                !isLoading && (data?.length > 0) &&  <DynamicTable 
                                                                                                header={['S/N', 'Name', 'Trim', 'Level', 'Actions']} 
                                                                                                columns={columns}
                                                                                                data={data}
                                                                                                onClick={(e) =>  {
                                                                                                        refetch()
                                                                                                } } 
                                                                                                page={'brands'}
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
                        { openBrand  && <AddBrand openBrand={openBrand} manufacId={manufacturerId?.id} onClick={() => {
                                refetch()
                                setOpenBrand(false)
                        }} /> }
                        
                </>
        );
}
