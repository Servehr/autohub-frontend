import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Sidebar  from "../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import '../css/ad.css'
import '../css/dragAndDrop.css'
import DynamicTable from "@/components/table"
import { AddCourseModal } from "@/components/course/AddCourseModal";
import { BeatLoader, BounceLoader } from "react-spinners";
import { AllCourse, GetAllCourse } from "@/apis/backend/course";
import { ExamStatus } from "@/components/course/exam/ExamStatus";
import { ExamDuration } from "@/components/course/exam/ExamDuration";
import { ExamTheoryDuration } from "@/components/course/exam/ExamTheoryDuration";
import { ExamTheoryStatus } from "@/components/course/exam/ExamTheoryStatus";

export default function Courses()
{
    const { data, isLoading, refetch, isRefetching } = useQuery([`get-all-courses`], () => GetAllCourse())

    const [openCourseModal, setOpenCourseModal] = useState(false)
    const [loading, setIsLoading] = useState(false)

    const [examStatusObj, setExamStatusObj] = useState('')
    const [examStatus, setExamStatus] = useState(false)
    const [examDuration, setExamDuration] = useState(false)

    const [examTheoryStatus, setExamTheorytatus] = useState(false)
    const [examTheoryDuration, setExamTheoryDuration] = useState(false)

    const columns = [
        { field: 'name' },
        { field: 'objective_duration' },
        // { field: 'theory_duration' },
        { field: 'description' }
    ]
    


        

  return ( 
        <>

                    <div className="w-full justify-between p-3 flex space-x-10 -mb-3 -mt-5 items-center">                        
                        <div className="bg-white p-3">
                            <h1 className="font-bold">Courses</h1>
                        </div>
                        <div className="font-bold px-3 py-2 bg-green-900 text-white rounded-md cursor-pointer" onClick={() => setOpenCourseModal(true)}>Add Course</div>
                    </div>
                    
                    <div className="w-full p-3" style={{ marginBottom: '10px' }}>
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
                            !isLoading && (data?.data?.length > 0) && <>  
                                                        <DynamicTable 
                                                                header={['Course', 'Objective Duration', 'Description', 'Actions']} 
                                                                columns={columns}
                                                                data={data?.data}
                                                                onClick={(e) =>  {
                                                                    refetch()
                                                                    setOpenCourseModal(e) 
                                                                } 
                                                        } 
                                                                page={'course'}
                                            />
                        
                            <div className="w-full p-3"
                            >
                                <div className="flex gap-5 justify-between items-left transition-shadow border rounded-lg shadow-sm hover:shadow-lg p-5"
                                >
                                    <span className="p-3 font-bold">Exam Obj</span>
                                    <span className="p-3 bg-green-400 hover:bg-green-600 hover:font-bold hover:text-white rounded-md cursor-pointer"
                                        onClick={() => {
                                            setExamStatusObj(data?.plus)
                                            setExamStatus(true)
                                        }}
                                    >
                                        Status - {data?.plus?.objective}
                                    </span>
                                    <span className="p-3 bg-blue-400 hover:bg-blue-600 hover:font-bold hover:text-white rounded-md cursor-pointer"
                                        onClick={() => {
                                            setExamStatusObj(data?.plus)
                                            setExamDuration(true)
                                        }}
                                    >
                                        Duration - {data?.plus?.objective_duration}
                                    </span>
                                </div>
                            </div>

                            <div className="w-full p-3"
                            >
                                <div className="flex gap-5 justify-between items-left transition-shadow border rounded-lg shadow-sm hover:shadow-lg p-5"
                                >
                                    <span className="p-3 font-bold">Exam Theory</span>
                                    <span className="p-3 bg-green-400 hover:bg-green-600 hover:font-bold hover:text-white rounded-md cursor-pointer"
                                        onClick={() => {
                                            setExamStatusObj(data?.plus)
                                            setExamTheorytatus(true)
                                        }}
                                    >
                                        Status - {data?.plus?.theory}
                                    </span>
                                    <span className="p-3 bg-blue-400 hover:bg-blue-600 hover:font-bold hover:text-white rounded-md cursor-pointer"
                                        onClick={() => {
                                            setExamStatusObj(data?.plus)
                                            setExamTheoryDuration(true)
                                        }}
                                    >
                                        Duration - {data?.plus?.theory_duration}
                                    </span>
                                </div>
                            </div>
                            </>
                        }
                    </div>

                    
                    { openCourseModal && <AddCourseModal onClick={(e) => {
                                                        refetch()
                                                        setOpenCourseModal(false) 
                                                    }
                                                } openCourseModal={openCourseModal}  
                                        /> }

                    { examStatus && <ExamStatus openExamStatus={examStatus} exam={examStatusObj} onClick={() => {
                            refetch()
                            setExamStatus(false)
                    }} /> }


                    { examDuration && <ExamDuration openExamStatus={examDuration} exam={examStatusObj} onClick={() => {
                            refetch()
                            setExamDuration(false)
                    }} /> }


                    { examTheoryDuration && <ExamTheoryDuration openExamStatus={examTheoryDuration} exam={examStatusObj} onClick={() => {
                            refetch()
                            setExamTheoryDuration(false)
                    }} /> }


                    { examTheoryStatus && <ExamTheoryStatus openExamStatus={examTheoryStatus} exam={examStatusObj} onClick={() => {
                            refetch()
                            setExamTheorytatus(false)
                    }} /> }


        </>
  )
}