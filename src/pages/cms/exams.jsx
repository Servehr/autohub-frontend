import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { EditQuestionaireModal } from "@/components/questionaire/EditQuestionaireModal";
import { Icons } from "@/util/icon";
import { AddQuestionModal } from "@/components/questions/AddQuestionModal";
import { EditQuestionModal } from "@/components/questions/EditQuestionModal";
import { DeleteQuestionModal } from "@/components/questions/DeleteQuestionModal";
import { AllExam } from "@/apis/backend/questions";
import { AddExamTheoryQuestionModal } from "@/components/exam/theory/AddExamTheoryQuestionModal";
import { EditExamQuestionModal } from "@/components/exam/EditExamQuestionModal";
import { DeleteExamQuestionModal } from "@/components/exam/DeleteExamQuestionModal";
import { AddExamQuestionModal } from "@/components/exam/AddExamQuestionModal";

export default function Exams()
{
    const { id } = useParams()
    const { data, isLoading, isRefetching, refetch } = useQuery([`all-test`, id], () => AllExam(id), { cacheTime: 0 })

    if(!isLoading)
    { 
        console.log(data) 
    }

    const [openExamQuestionaire, setOpenExamQuestion] = useState(false)
    const [editExamQuestion, setEditExamQuestion] = useState(false)
    const [deleteExamQuestion, setDeleteExamQuestion] = useState(false)
    const [dataToEdit, setQuestionToEdit] = useState("")
    const [dataToDelete, setQuestionToDelete] = useState("")


  return ( 
        <>
            <div className='w-full flex h-full bg-blue-500'>
                <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600'> 
                    <Sidebar />
                </div>
                <div className='bg-white md:w-10/12 lg:10/12 w-12/12 lg:flex-row px-5 bg-blue-500'>

                    <div className="w-full justify-between p-3 mt-2 flex bg-green-100 -mb-3 items-center rounded-lg">                        
                        <div className="p-3 mt-5">
                            <h1 className="font-bold">Repair And Maintenance Questions</h1>
                        </div>
                        <div className="font-bold px-3 py-2 bg-green-900 text-white rounded-md cursor-pointer" onClick={() => setOpenExamQuestion(true)}>Add Question</div>
                    </div>
                    
                    <div className="w-full p-1 mb-10 rounded-lg" style={{ marginBottom: '100px' }}>
                        {
                            isLoading && <div className="col-span-12 h-[500px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                <BeatLoader color="#1c9236" />
                            </div>
                        }
                        {
                            !isLoading && (data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                <h1 className="font-bold">
                                    No question created yet
                                </h1>
                            </div>
                        }
                        <div className='grid grid-cols-12 gap-5 py-2 mt-5 mb-40'>
                            {/* <div className="d-flex col-span-12 p-3"> */}
                                {
                                   !isLoading && (data?.length > 0) && data?.map((question, index) => {
                                        return (
                                            <>
                                                <div className="d-flex -mb-3 col-span-12 py-1">
                                                    <h1 className="font-bold -mb-1 ml-1">Question: {((data?.length) - index)}</h1>
                                                    <div className="p-3 shadow-md bg-white border border-2 border-green-200 my-2">

                                                        <h1 className="w-full font-bold text-blue-900 mb-2">{question['question']}</h1>
                                                        <div className="flex mt-2">
                                                            <div className="p-1 font-bold text-blue-300">(a)</div>
                                                            <div className="p-1">{question['option_a']}</div>
                                                        </div>
                                                        <div className="flex mt-2">
                                                            <div className="p-1 font-bold text-blue-300">(b)</div>
                                                            <div className="p-1">{question['option_b']}</div>
                                                        </div>
                                                        <div className="flex mt-2">
                                                            <div className="p-1 font-bold text-blue-300">(c)</div>
                                                            <div className="p-1">{question['option_c']}</div>
                                                        </div>
                                                        <div className="flex mt-2 mb-5">
                                                            <div className="p-1 font-bold text-blue-300">(d)</div>
                                                            <div className="p-1">{question['option_d']}</div>
                                                        </div>
                                                        <div className="flex border border-2 p-1 mt-2 justify-between">
                                                            <div className="p-2 text-red-700 font-bold">Answer</div>
                                                            <div className="p-2 font-bold text-lg text-blue-700">{question['answer']}</div>
                                                            <div className="flex space-x-5">
                                                                <span onClick={() => {
                                                                    setQuestionToEdit(data[index])
                                                                    console.log(data[index])
                                                                    setEditExamQuestion(true)
                                                                }}>
                                                                    <Icons iconName={'edit'} width={6} height={6} />
                                                                </span>
                                                                <span onClick={() => {
                                                                    setQuestionToDelete(data[index])
                                                                    setDeleteExamQuestion(true)                                                                    
                                                                }}>
                                                                    <Icons iconName={'delete'} color="red" width={6} height={6} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            {/* </div> */}
                            {/* <div className="col-span-3 p-3 bg-blue-100"></div> */}
                        </div>
                    </div>

                </div>
            </div>

                    { openExamQuestionaire && <AddExamQuestionModal onClick={(e) => {
                                                        refetch()
                                                        setOpenExamQuestion(false) 
                                                    }
                                                } openExamQuestionaire={openExamQuestionaire}  
                                        /> }

                    { editExamQuestion && <EditExamQuestionModal data={dataToEdit} onClick={(e) => {
                                                        refetch()
                                                        setEditExamQuestion(false) 
                                                    }
                                                } editExamQuestion={editExamQuestion}  
                                        /> }


                    { deleteExamQuestion && <DeleteExamQuestionModal data={dataToDelete} onClick={(e) => {
                                                        refetch()
                                                        setDeleteExamQuestion(false) 
                                                        // setClickTable(e) 
                                                    }
                                                } deleteExamQuestion={deleteExamQuestion}  
                                        /> }                                        
        </>
  )
}