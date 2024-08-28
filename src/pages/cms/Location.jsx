import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { appStore } from "@/state/appState";
import { BeatLoader, BounceLoader } from "react-spinners";
import { browserType } from "@/store";
import DynamicTable from "@/components/table"
import axios from 'axios';
import { BASE_URL } from "@/lib/axios";
import { AddCountry } from "@/components/location/AddCountry";
import { Countries } from "@/apis/backend/location";

export default function Location()
{
  const [openAddCountry, setOpenAddCountry] = useState(false)
  const [clickTable, setClickTable] = useState(false)

  const { data, isLoading, refetch, isRefetching  } = useQuery([`all-countries`], () => Countries())

  const columns = [
    { field: 'name' },
    { field: 'states_count' }
  ]

  return ( 
        <>
            <div className="w-full justify-between p-3 flex space-x-10 -mt-14 items-center mt-5">                        
                <div className="bg-white mt-5">
                    <h1 className="font-bold text-2xl">Location</h1>
                </div>
                <div className="font-bold px-3 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-800" onClick={() => setOpenAddCountry(true)}>Add Country</div>
            </div>
                    
            <div className="w-full p-3 mb-10" style={{ marginBottom: '100px' }}>

                        {isLoading && !isRefetching && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                                <BounceLoader color="#1c9236" />
                            </div>
                        )}
                        {
                            !isLoading && (data?.length > 0) &&  <DynamicTable 
                                                                                header={['Country', 'States', 'Actions']} 
                                                                                columns={columns}
                                                                                data={data}
                                                                                onClick={(e) =>  {
                                                                                    refetch()
                                                                                } } 
                                                                                page={'countries'}
                                                                            />
                        }
            </div>

            { 
                openAddCountry &&  <AddCountry openAddCountry ={openAddCountry } onClick={() => {
                    refetch()
                    setOpenAddCountry(false)
                }} /> 
            }

        </>
  )
}