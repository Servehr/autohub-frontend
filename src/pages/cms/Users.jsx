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
import { AddStaffModal } from "@/components/staffs/AddStaffModal";
import { staffs } from "@/apis/auth";


export default function Users()
{
  const [openStaff, setAddStaff] = useState(false)
  const [clickTable, setClickTable] = useState(false)

  const { data, isLoading, refetch, isRefetching  } = useQuery([`all-staffs`], () => staffs())

  const columns = [
    { field: 'name' },
    { field: 'lastname' },
    { field: 'email' },
    { field: 'status' },
    { field: 'admin_role' },
  ]

  return ( 
        <>
            <div className="w-full justify-between p-3 flex space-x-10 -mt-14 items-center mt-5">                        
                <div className="bg-white mt-5">
                    <h1 className="font-bold text-2xl">Staffs</h1>
                </div>
                <div className="font-bold px-3 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-800" onClick={() => setAddStaff(true)}>Add User</div>
            </div>
                    
            <div className="w-full p-3 mb-10" style={{ marginBottom: '100px' }}>

                        {isLoading && !isRefetching && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                                <BounceLoader color="#1c9236" />
                            </div>
                        )}
                        {
                            !isLoading && (data?.length > 0) &&  <DynamicTable 
                                                                                header={['Firstname', 'Surname',  'Email', 'Status', 'permission', 'Actions']} 
                                                                                columns={columns}
                                                                                data={data}
                                                                                onClick={(e) =>  {
                                                                                    refetch()
                                                                                } } 
                                                                                page={'users'}
                                                                            />
                        }
            </div>

            { 
                openStaff  &&  <AddStaffModal openStaff={openStaff} onClick={() => {
                    refetch()
                    setAddStaff(false)
                }} /> 
            }

        </>
  )
}