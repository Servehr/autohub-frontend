import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import '../css/ad.css'
import '../css/dragAndDrop.css'
import { appStore } from "@/state/appState";
import { BeatLoader, BounceLoader } from "react-spinners";
import { browserType } from "@/store";
import Folder from "@/components/Folder";
import { AllTestQuestionaires, AllTestQuestionairesTheory } from "@/apis/backend/questionaires";
import { AddTestQuestionaireTheoryModal } from "@/components/questionaire/theory/AddTestQuestionaireTheoryModal";
import { AddTheoryQuestionModal } from "@/components/questions/theory/AddTheoryQuestionModal";

export default function TestQuestionaireTheory()
{
    const { data, isLoading, isRefetching, refetch } = useQuery([`test-questionaires`], () => AllTestQuestionairesTheory(), { cacheTime: 0 })

    if(!isLoading)
    { 
        console.log(data) 
    }
    
    const [openTestQuestionaireTheory, setOpenQuestionaireTheory] = useState(false)


  return ( 
        <>

            {
                !isLoading && <div className="w-full justify-between p-3 flex bg-green-100 -mb-3 items-center rounded-lg">                        
                    <div className="p-3 mt-5">
                        <h1 className="font-bold text-xl">Test Theory Questionaires (Theory)</h1>
                    </div>
                    <div className="font-bold px-3 py-2 bg-green-900 text-white rounded-md cursor-pointer" onClick={() => setOpenQuestionaireTheory(true)}>Add Theory Question</div>
                </div>
            }
            
            <div className="w-full p-1 mb-10 rounded-lg" style={{ marginBottom: '100px' }}> 
                {
                    isLoading && <div className="col-span-12 h-[200px] flex justify-center items-center" style={{ marginTop: '30px', paddingTop: '20px' }}>
                        <BeatLoader color="#1c9236" />
                    </div>
                }
                {
                    !isLoading && (data?.length === 0) && <div className="col-span-12 h-[500px] flex justify-center items-center border border-3 border-shadow border-green-200 bg-[#f5fbf7]" style={{ marginTop: '30px', paddingTop: '20px' }}>
                        <h1 className="font-bold">
                            No questionaire created yet
                        </h1>
                    </div>
                }
                <div className='grid grid-cols-12 gap-5 py-2 px-3 mt-5 mb-2'>
                {
                    
                    !isLoading && (data?.length > 0) && data?.map((data, index) => <Folder type={"test-theory"} toEdit={"editTestTheory"} toDelete={"deleteTestTheory"} id={data?.id} titles={data?.name} description={data?.description} figures={100} icons={'comment'} onClick={(e) => {
                            refetch()
                        }
                    } />)
                }
                </div>
            </div>

            { openTestQuestionaireTheory && <AddTestQuestionaireTheoryModal onClick={(e) => {
                                                refetch()
                                                setOpenQuestionaireTheory(false) 
                                                // setClickTable(e) 
                                            }
                                        } openTestQuestionaireTheory={openTestQuestionaireTheory}  
                                /> }
        </>
  )
}