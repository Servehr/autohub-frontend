import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { AddQuestionModal } from "@/components/questions/AddQuestionaireModal";
import { EditQuestionModal } from "@/components/questions/EditQuestionaireModal";
import { DeleteQuestionModal } from "@/components/questions/DeleteQuestionaireModal";

export default function Questions()
{
    
    const { isMobile } = browserType();
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

    const [clickTable, setClickTable] = useState(false)

    // if(!isLoading)
    // {
    //     console.log(!isLoading)
    //     console.log(data)
    // }

    // if(isRefetching)
    // {
    //     console.log(isRefetching)
    // }

    useEffect(() => {
        console.log("Giving")
        // refetch()
    }, [clickTable])


    // const [isLoading, setIsLoading] = useState(false)
    // useEffect(() => {
    //     getProducts()
    // }, [isLoading])

    // const getProducts = async () => 
    // {
    //     let token = localStorage.getItem("token")  
    //     await axios.get(`${BASE_URL}ad/all-product`, {
    //             headers: { 'Authorization': token ? `Bearer ${token}` : ""}
    //             }).then((response) => 
    //             {  
    //                 if(response.data.data)
    //                 {
    //                     setIsLoading(true)
    //                     setDatable(response.data.data)
    //                 }
    //             }).catch((error) => {                        
    //                     console.log(error)
    //             })
    // }


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
                        <div className="font-bold px-3 py-2 bg-green-900 text-white rounded-md cursor-pointer" onClick={() => setOpenQuestion(true)}>Add Question</div>
                    </div>
                    
                    <div className="w-full p-1 mb-10 rounded-lg" style={{ marginBottom: '100px' }}>
                        {/* {isLoading && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                            {isMobile ? (
                                <BeatLoader color="#1c9236" />
                            ) : (
                                <BounceLoader color="#1c9236" />
                            )}
                            </div>
                        )} */}

                        {/* {isLoading && !isRefetching && (
                            <div className="min-h-[320px] flex justify-center items-center text-brandGreen">
                            {isMobile ? (
                                <BeatLoader color="#1c9236" />
                            ) : (
                                <BounceLoader color="#1c9236" />
                            )}
                            </div>
                        )} */}
                        <div className='grid grid-cols-12 gap-5 py-2 mt-5 mb-40'>
                            {/* <div className="d-flex col-span-12 p-3"> */}
                                {
                                    Questions?.map((question, index) => {
                                        return (
                                            <>
                                                <div className="d-flex -mb-3 col-span-12 py-1">
                                                    <h1 className="font-bold -mb-1 ml-1">Question: {index+1}</h1>
                                                    <div className="p-3 shadow-md bg-white border border-2 border-green-200 my-2">
                                                        <h1 className="w-full font-bold text-blue-900 mb-2">{question.question}</h1>
                                                        <div className="">
                                                            <ul className="">
                                                                {                                                                
                                                                    question.options.map((option, index) => {
                                                                        return <div className="flex">
                                                                                <div className="p-1">{index+1}</div>
                                                                                <div className="p-1"><li>{option}</li></div>
                                                                        </div>
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div className="flex border border-2 p-1 mt-2 justify-between">
                                                            <div className="p-2 text-red-700 font-bold">Answer</div>
                                                            <div className="p-2 font-bold text-lg text-blue-700">{3}</div>
                                                            <div className="flex space-x-5">
                                                                <span onClick={() => {
                                                                    setEditQuestion(true)
                                                                }}>
                                                                    <Icons iconName={'edit'} width={6} height={6} />
                                                                </span>
                                                                <span onClick={() => {
                                                                    setDeleteQuestion(true)                                                                    
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

                    { openQuestionaire && <AddQuestionModal onClick={(e) => {
                                                        setOpenQuestion(false) 
                                                        // setClickTable(e) 
                                                    }
                                                } openQuestionaire={openQuestionaire}  
                                        /> }

                    { editQuestion && <EditQuestionModal onClick={(e) => {
                                                        setEditQuestion(false) 
                                                        // setClickTable(e) 
                                                    }
                                                } editQuestion={editQuestion}  
                                        /> }


                    { deleteQuestion && <DeleteQuestionModal onClick={(e) => {
                                                        setDeleteQuestion(false) 
                                                        // setClickTable(e) 
                                                    }
                                                } deleteQuestion={deleteQuestion}  
                                        /> }                                        
        </>
  )
}