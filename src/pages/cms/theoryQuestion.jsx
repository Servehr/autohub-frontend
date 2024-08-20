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
import Folder from "@/components/Folder";
import { Icons } from "@/util/icon";
import { AddQuestionModal } from "@/components/questions/AddQuestionModal";
import { EditQuestionModal } from "@/components/questions/EditQuestionModal";
import { DeleteQuestionModal } from "@/components/questions/DeleteQuestionModal";
import { AllTest, AllTestTheory } from "@/apis/backend/questions";
import { AddTheoryQuestionModal } from "@/components/questions/theory/AddTheoryQuestionModal";
import { EditTheoryQuestionModal } from "@/components/questions/theory/EditTheoryQuestionModal";
import { DeleteTheoryQuestionModal } from "@/components/questions/theory/DeleteTheoryQuestionModal";

export default function TheoryQuestion()
{
    const { id } = useParams()
    // alert(id)
    const { data, isLoading, isRefetching, refetch } = useQuery([`all-test`, id], () => AllTestTheory(id), { cacheTime: 0 })

    const [openTheoryQuestion, setOpenTheoryQuestion] = useState(false)
    const [editQuestion, setEditQuestion] = useState(false)
    const [deleteQuestion, setDeleteQuestion] = useState(false)
    const [dataToEdit, setQuestionToEdit] = useState("")
    const [dataToDelete, setQuestionToDelete] = useState("")

    const [clickTable, setClickTable] = useState(false)

    useEffect(() => {
        // refetch()
    }, [clickTable])

  return ( 
        <>

                    <div className="w-full justify-between p-3 mt-2 flex bg-green-100 -mb-3 items-center rounded-lg">                        
                        <div className="p-3 mt-5">
                            <h1 className="font-bold">Repair And Maintenance Questions</h1>
                        </div>
                        <div className="font-bold px-3 py-2 bg-green-900 text-white rounded-md cursor-pointer" onClick={() => setOpenTheoryQuestion(true)}>Add Question</div>
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
                                                <div className="d-flex -mb-3 col-span-12 py-1 border border-2 border-green-200 mb-2">
                                                    <p className="font-bold -mb-1 ml-1 p-3 bg-blue-100">Question: {((data?.length) - index)}</p>
                                                        <div className="p-3 grid grid-cols-12 bg-white my-2 pb-5">

                                                            <p className="w-full col-span-12 font-bold text-blue-900 text-lg mb-2 py-3">{question['question']}</p>
                                                            <p className="w-full col-span-12 font-bold text-blue-900 text-lg mb-2 py-1 -mt-3">
                                                                <span className="text-sm text-red-600">Mark Assigned Question:</span> {question['mark']}
                                                            </p>
                                                        </div>                                                                 
                                                    <div className="flex px-3 justify-left pb-3 -mt-5">
                                                            <div className="flex space-x-5">
                                                                <span onClick={() => {
                                                                    setQuestionToEdit(data[index])
                                                                    setEditQuestion(true)
                                                                }}>
                                                                    <Icons iconName={'edit'} width={6} height={6} />
                                                                </span>
                                                                <span onClick={() => {
                                                                    setQuestionToDelete(data[index])
                                                                    setDeleteQuestion(true)                                                                    
                                                                }}>
                                                                    <Icons iconName={'delete'} color="red" width={6} height={6} />
                                                                </span>
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


            {
                openTheoryQuestion && <AddTheoryQuestionModal folderName={''} openTheoryQuestion={openTheoryQuestion} onClick={() => {
                        refetch()
                        setOpenTheoryQuestion(false)
                }} />
            }

            {
                editQuestion && <EditTheoryQuestionModal data={dataToEdit} editQuestion={editQuestion} onClick={() => {
                        refetch()
                        setEditQuestion(false)
                }} />
            }

            {
                deleteQuestion && <DeleteTheoryQuestionModal data={dataToDelete} deleteQuestion={deleteQuestion} onClick={() => {
                        refetch()
                        setDeleteQuestion(false)
                }} />
            }

                                                    
        </>
  )
}