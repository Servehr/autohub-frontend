import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import '../css/ad.css'
import '../css/dragAndDrop.css'
import DynamicTable from "@/components/table"
import { BeatLoader, BounceLoader } from "react-spinners";
import { GetAllCourse } from "@/apis/backend/course";

export default function Modules()
{
    const { data, isLoading, refetch, isRefetching } = useQuery([`get-all-courses`], () => GetAllCourse())

    const [loading, setIsLoading] = useState(false)

    const [dataTable, setDatable] = useState("")
    const columns = [
        { field: 'name' },
        { field: 'description' }
    ]
    const [openCourseModal, setOpenCourseModal] = useState(false)
    const [clickTable, setClickTable] = useState(false)


    useEffect(() => {
        
    }, [])

        

  return ( 
        <>

                    <div className="w-full justify-between p-3 flex space-x-10 -mb-3 -mt-5 items-center">                        
                        <div className="bg-white p-3">
                            <h1 className="font-bold text-2xl">Courses | Modules | Submodules</h1>
                        </div>
                    </div>
                    
                    <div className="w-full p-3 mb-10" style={{ marginBottom: '100px' }}>
                        {
                            isLoading && <div className="col-span-12 h-[300px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                <BeatLoader color="#1c9236" />
                            </div>
                        }
                        {
                            !isLoading && (data?.data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                <h1 className="font-bold">
                                    No course created yet
                                </h1>
                            </div>
                        }
                        {
                            // !isLoading && (data?.data?.length > 0) &&  <DynamicTable 
                            !isLoading && (data?.data?.length > 0) &&  <DynamicTable 
                                                                header={['Course', 'Description', 'Actions']} 
                                                                columns={columns}
                                                                data={data?.data}
                                                                onClick={(e) =>  {
                                                                    refetch()
                                                                    setOpenCourseModal(e) 
                                                                } 
                                                        } 
                                                                page={'modules'}
                                            />
                        }
                    </div>
        </>
  )
}