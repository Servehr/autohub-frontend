import * as yup from "yup";
import { useState } from "react";
import '../css/ad.css'
import { useQuery } from "react-query";
import DynamicTable from "@/components/table";
import { AllAcademicSession } from "@/apis/backend/academic";
import { BounceLoader } from "react-spinners";
import { AddSessionModal } from "@/components/acadamic_session/AddSessionModal";


export default function AcademicSession()
{
    const [createSession, setCreateSession] = useState(false)
    
    const { data, isLoading, refetch, isRefetching } = useQuery(['get-all-academic-session'], () => AllAcademicSession(), { refetchOnMount: true, cacheTime: 0 })

    const columns = [
        { field: 'name' },
        { field: 'status' },
        { field: 'created_at' }
    ]

  return ( 
            <div className="bg-white">
                <div className="grid grid-cols-12 justify-between gap-5"
                >
                    <h1 className="col-span-10 font-bold py-5 px-2 bg-blue-200 -mt-3">Academic Session</h1>
                    <div className="col-span-2 flex items-center justify-center"
                    >
                        <span className="p-3 bg-green-400 hover:bg-green-800 rounded-lg right-0 sm:text-sm cursor-pointer hover:text-white font-bold text-center" 
                            onClick={() => {
                                setCreateSession(true)
                            }}
                        >Create Session</span>
                    </div>
                </div>
                <div className="w-full p-3 mb-3 mt-3 pb-5"
                >
                    {
                        isLoading && !isRefetching && (
                        <div className="col-span-12 min-h-[400px] mt-20 flex justify-center items-center text-brandGreen">                            
                            <BounceLoader color="#1c9236" />    
                        </div>
                        )
                    }

                    {/* {!isLoading && isRefetching && (
                        <div className="min-h-[320px] flex justify-center items-center text-brandGreen">                            
                            <BounceLoader color="#1c9236" />
                        </div>
                    )} */}

                    {
                        !isLoading && (data?.length > 0) &&  <DynamicTable 
                                                                    header={['Name', 'Status', 'Created', 'Actions']} 
                                                                    columns={columns}
                                                                    data={data}
                                                                    onClick={(e) =>  {
                                                                        refetch()
                                                                    } }
                                                                    page={'academic'}
                                                                />
                    }
                </div>

                { createSession && <AddSessionModal isSessionOpen={data} openAddSession={createSession} onClick={() => {
                        refetch()
                        setCreateSession(false)
                }} /> }
            </div> 
  )
}