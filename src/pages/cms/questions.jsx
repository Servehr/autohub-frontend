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
import { AllTest } from "@/apis/backend/questions";

export default function Questions()
{
    
    const { isMobile } = browserType();
    let x = Math.round()
    const { id } = useParams()
    // alert(id)
    const { data, isLoading, isRefetching, refetch } = useQuery([`${x}/all-test`, id], () => AllTest(id), { refetchOnWindowFocus: false, cacheTime: 0, retry: 2 })

    if(!isLoading)
    { 
        console.log(data) 
    }

    // const advertState = appStore((state) => state) 
    const Questions = [
        { id: 1, question: "Artificial Intelligence is about_____", options: [ 'Playing a game on Computer', 'Making a machine Intelligent', 'Programming on Machine with your Own Intelligence',
                                                                                'Putting your intelligence in Machine',
                                                                            ] 
        },
        { id: 1, question: "Who is known as the -Father of AI?", options: [ 'Fisher Ada', 'Alan Turing', 'John McCarthy', 'Allen Newell' ]  },
        { id: 3, question: "Select the most appropriate situation for that a blind search can be used", options: [ 'Real-life situation', 'Small Search Space', 'Complex game', 'All of the above' ]  },
        { id: 4, question: "If a robot is able to change its own trajectory as per the external conditions, then the robot is considered as the__", options: [ 'Mobile', 'Non-Servo', 'Open Loop', 'Intelligent' ]  },
        { id: 5, question: "Which algorithm is used in the Game tree to make decisions of Win/Lose?", options: [ 'Heuristic Search Algorithm', 'DFS/BFS algorithm', 'Greedy Search Algorithm', 'Min/Max algorithm' ]  },
    ]

    const [openQuestionaire, setOpenQuestion] = useState(false)
    const [editQuestion, setEditQuestion] = useState(false)
    const [deleteQuestion, setDeleteQuestion] = useState(false)
    const [dataToEdit, setQuestionToEdit] = useState("")
    const [dataToDelete, setQuestionToDelete] = useState("")

    const [clickTable, setClickTable] = useState(false)

    useEffect(() => {
        console.log("Giving")
        // refetch()
    }, [clickTable])

  return ( 
        <>
            <div className='w-full flex h-full bg-blue-500'>
                <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600'> 
                    <Sidebar />
                </div>
                <div className='bg-white md:w-10/12 lg:10/12 w-full lg:flex-row px-5 bg-blue-500'>

                    <div className="w-full justify-between p-3 mt-2 flex bg-green-100 -mb-3 items-center rounded-lg">                        
                        <div className="p-3 mt-5">
                            <h1 className="font-bold">Repair And Maintenance Questions</h1>
                        </div>
                        <div className="font-bold px-3 py-2 bg-green-900 text-white rounded-md cursor-pointer" onClick={() => setOpenQuestion(true)}>Add Question</div>
                    </div>
                    
                    <div className="w-full p-1 mb-10 rounded-lg" style={{ marginBottom: '100px' }}>
                        {
                            isLoading && <div className="col-span-12 h-[500px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                                <BeatLoader color="#1c9236" />
                            </div>
                        }
                        {
                            !isLoading && (data.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
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
                                                    <p className="font-bold -mb-1 ml-1 p-3 bg-blue-100">Question: {((data?.length) - index)}</p>
                                                    <div className="p-3 shadow-md grid grid-cols-12 bg-white border border-2 border-green-200 my-2 pb-5">

                                                        <p className="w-full col-span-12 font-bold text-blue-900 text-lg mb-2 py-3">{question['question']}</p>
                                                        <div className="flex mt-2 md:col-span-12 col-span-12">
                                                            <div className="p-1 font-bold text-blue-300">(a)</div>
                                                            <div className="p-1 text-lg">{question['option_a']}</div>
                                                        </div>
                                                        <div className="flex mt-2 md:col-span-12 col-span-12">
                                                            <div className="p-1 font-bold text-blue-300">(b)</div>
                                                            <div className="p-1 text-lg">{question['option_b']}</div>
                                                        </div>
                                                        <div className="flex mt-2 md:col-span-12 col-span-12">
                                                            <div className="p-1 font-bold text-blue-300">(c)</div>
                                                            <div className="p-1 text-lg">{question['option_c']}</div>
                                                        </div>
                                                        <div className="flex mt-2 mb- md:col-span-12 col-span-12">
                                                            <div className="p-1 font-bold text-blue-300">(d)</div>
                                                            <div className="p-1 text-lg">{question['option_d']}</div>
                                                        </div>
                                                    </div>                                                
                                                    <div className="flex border border-2 p-1 mt-2 justify-between">
                                                            <div className="p-2 text-red-700 font-bold">Answer</div>
                                                            <div className="p-2 font-bold text-lg text-blue-700">{question['answer']}</div>
                                                            <div className="flex space-x-5">
                                                                <span onClick={() => {
                                                                    setQuestionToEdit(data[index])
                                                                    console.log(data[index])
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

                </div>
            </div>

                    { openQuestionaire && <AddQuestionModal onClick={(e) => {
                                                        refetch()
                                                        setOpenQuestion(false) 
                                                    }
                                                } openQuestionaire={openQuestionaire}  
                                        /> }

                    { editQuestion && <EditQuestionModal datax={dataToEdit} onClick={(e) => {
                                                        refetch()
                                                        setEditQuestion(false) 
                                                    }
                                                } editQuestion={editQuestion}  
                                        /> }


                    { deleteQuestion && <DeleteQuestionModal data={dataToDelete} onClick={(e) => {
                                                        refetch()
                                                        setDeleteQuestion(false) 
                                                        // setClickTable(e) 
                                                    }
                                                } deleteQuestion={deleteQuestion}  
                                        /> }                                        
        </>
  )
}