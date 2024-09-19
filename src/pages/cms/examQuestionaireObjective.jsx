import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import '../css/ad.css'
import '../css/dragAndDrop.css'
import { BeatLoader, BounceLoader } from "react-spinners";
import { browserType } from "@/store";
import Folder from "@/components/Folder";
import { AllExamQuestionaires } from "@/apis/backend/questionaires";
import { AddExamQuestionaireModal } from "@/components/exam-questionaire/AddExamQuestionaireModal";


const courseYear = () => 
{
    const years = [];
    const currentYear = new Date().getFullYear()
    for (let year = 2023; year <= currentYear; year++) 
    {
        years.push(year);
    }
    return years.toReversed();
}

export default function ExamQuestionaireObjective({ academicSession })
{
    let x = Math.round()
    const [openQuestionaire, setOpenQuestionaire] = useState(false)
    const [theYear, setTheYear] = useState('')   
    const currentYear = new Date().getFullYear()
    const [selectedYear, setSelectedYear] = useState(currentYear)
    const years = courseYear()

    const reversedSession = academicSession.toReversed()
    const [currentSession, setCurrentSession] = useState(academicSession[academicSession.length-1]['identifier'])
    const [currentSessionName, setCurrentSessionName] = useState('') 

    const { data, isLoading, isRefetching, refetch } = useQuery([`${x}/test-questionaires`], () => AllExamQuestionaires(currentSession), { cacheTime: 0, retry: 2 })

    const byYear = (year) => 
    {
        setCurrentSession(year)
        setTimeout(() => {            
            refetch()
        }, 1000)
    }


  return ( 
        <>
            
            <div className='bg-white md:w-12/12 lg:12/12 w-full lg:flex-row px-2 bg-blue-500'>

                { !isLoading &&
                    <div className="w-full justify-between p-3 mt-2 flex -mb-3 items-center rounded-lg">                        
                        <div className="p-3 mt-5">
                            <h1 className="font-bold text-blue-500">Exam Questionaires (Objective)</h1>
                        </div>
                        {  (data?.length < 1) && <div className="font-bold px-3 py-2 bg-green-900 text-white rounded-md cursor-pointer" onClick={() => setOpenQuestionaire(true)}>Add Objective Questionaire</div> }
                    </div>
                }
        
                {/* <div className="flex flex-wrap mt-1 px-5">
                    <div className="py-2 w-full"
                    >
                        <div className="mb-4 border border-gray-200">
                            <div className="relative"
                            >
                                <select defaultValue={''} onChange={(e) => byYear(e.target.value)}
                                    className="block appearance-none w-full bg-gray-100 border h-[65px] text-2xl border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    {       
                                        reversedSession.map((academic, index) => (
                                            <option key={index} value={academic?.identifier} className='p-2'>
                                                {academic?.name} - {academic?.identifier}
                                            </option>
                                        ))
                                    }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="w-full p-1 mb-10 rounded-lg" style={{ marginBottom: '100px' }}>
                    {
                        isLoading && <div className="col-span-12 h-[200px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                            <BeatLoader color="#1c9236" />
                        </div>
                    }
                    {
                        isRefetching && <div className="col-span-12 h-[200px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                            <BeatLoader color="#1c9236" />
                        </div>
                    }
                    {
                        !isLoading && !isRefetching && (data?.length === 0) && <div className="col-span-12 h-[300px] flex justify-center -mt-3 items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                            <h1 className="font-bold -mt-10">
                                No questionaire created yet
                            </h1>
                        </div>
                    }
                    <div className='grid grid-cols-12 gap-5 py-2 px-3 mb-2'>
                    {
                        !isLoading && !isRefetching && (data?.length > 0) && data?.map((data, index) => <Folder type={"exam"} id={data.id} titles={data.name}  toEdit={"editExamFolder"} toDelete={"deleteExamFolder"} description={data.description} figures={100} icons={'comment'} onClick={(e) => {
                                refetch()
                            }
                        } />)
                    }
                    </div>
                </div>

            </div>

            { 
                openQuestionaire && <AddExamQuestionaireModal onClick={(e) => {
                                                refetch()
                                                setOpenQuestionaire(false) 
                                                // setClickTable(e) 
                                            }
                                        } openQuestionaire={openQuestionaire} AllSessions={currentSession} 
                                /> 
            }
        </>
  )
}