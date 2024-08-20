import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/Modal';
import { Link, useNavigate } from "react-router-dom";
import { deleteAdProduct } from '@/apis/ads';
import { appStore } from "@/state/appState";
import DynamicTable from "@/components/table"
import { useQuery } from "react-query";
import { BeatLoader, BounceLoader } from "react-spinners";
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { Trims } from '@/apis/backend/location';
import { AddTrim } from '../Trim/AddTrim';


export const ViewTims = ({onClick, openTrim, trimId })  =>
{
        const [addTrim, setAddTrim] = useState(false)
        const [trimName, setTrimName] = useState(0)

        const { data, isLoading, refetch, isRefetching  } = useQuery([`all-manufacturer-models`], () => Trims(trimId?.id), { cacheTime: 0 })
 
        const columns = [
                { field: 'id' },
                { field: 'name' },
                { field: 'rate' }
        ]

        const cancelModal = () => 
        {
                onClick(true)
        }
        
        return (
                <>
                        <Modal onClick={onClick} isOpen={openTrim} wrapperWidth={950} margin={'60px auto 0px auto'}
                        >
                                <div className='bg-blue-100 px-3 py-2'>                                
                                        <div className="w-full justify-between p-3 flex space-x-10 -mt-14 items-center mt-5">                        
                                                <div className="mt-5">
                                                        <div className="font-bold text-2xl">All Trims Under <span className='font-bold text-green-700'>{trimId?.title}</span></div>
                                                </div>
                                                <div className="font-bold px-3 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-800" onClick={() => setAddTrim(true)}>Add Trim</div>
                                        </div>
                                        <div className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                                        >                                
                                                <div className='col-span-12 pb-2 overflow-auto justify-center h-[450px] py-2 pb-10 item-center'
                                                >

                                                {
                                                        isLoading && !isRefetching && (
                                                        <div className="min-h-[220px] flex justify-center items-center text-brandGreen">
                                                                <BounceLoader color="#1c9236" />
                                                        </div>
                                                        )
                                                }
                                                {
                                                        !isLoading && (data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                                                <h1 className='font-bold text-red-600 text-2xl -mt-20'>No Trim Available</h1>
                                                        </div>
                                                }
                                                {
                                                !isLoading && (data?.length > 0) &&  <DynamicTable 
                                                                                                        header={['S/N', 'Name', 'Level', 'Actions']} 
                                                                                                        columns={columns}
                                                                                                        data={data}
                                                                                                        onClick={(e) =>  {
                                                                                                                refetch()
                                                                                                        } } 
                                                                                                        page={'trims'}
                                                                                                />
                                                }
                                                </div>
                                        </div>
                                </div>
                        </Modal>                            

                        { addTrim && <AddTrim openAddTrim={addTrim} modelId={trimId?.id} manufacturerId={trimId?.make_id} onClick={() => {
                                refetch()
                                setAddTrim(false)    
                        }} /> }  
                </>
        );
}
