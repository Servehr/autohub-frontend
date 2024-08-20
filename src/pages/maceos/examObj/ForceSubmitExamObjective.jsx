import { useEffect, useState } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FormCode } from "@/components/FormCode";
import { useQuery } from "react-query";
import { appStore } from "@/state/appState";
import { SubmitExamObjective } from "@/apis/backend/course";


export default function ForceSubmitExamObjective() 
{ 
    const advertState = appStore((state) => state)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)
    const [emptyAnswer, setEmptyAnswer] = useState([])
    const [toBeSubmitted, setToBeSubmitted] = useState([])
    const navigate = useNavigate()

    useEffect(() => 
    {
        if(advertState.getSelectedExamObjectiveOption().length === 0)
        {
            const optionId = localStorage.getItem("text-exam-theory-option")  
            // alert(optionId)          
            const answers = { user_id: Number(localStorage.getItem("authenticatedId")), selected: 'e', option_id: optionId, position: -1 }
            const systemAnswer = { userSubmitted : 'no', answers: answers }
            advertState.setDefaultExamObjectiveAnswer(systemAnswer)
        } else {
            const systemAnswer = { userSubmitted : 'yes', answers: advertState.getSelectedExamObjectiveOption() }
            advertState.setDefaultExamObjectiveAnswer(systemAnswer)
        }
    }, [])
  
    const SubmitExamObjectivee = () => 
    {
       setIsSubmitting(true)
       SubmitExamObjective(advertState.getDefaultExamObjectiveAnswer())
       .then((res) => {
             if(res === "submitted")
             {
                advertState.setForceExamObj('no')
                navigate('/dashboard/summary', { replace: true })
             } else {
                setErrorMsg("Submitting Result Failed")
                //  setIsSubmitting(false)
                setTimeout(() => {
                    setErrorMsg("")
                }, 3000)
            }
        })
          .catch(() => {
              setTimeout(() => {
                  setIsSubmitting(false)
            }, 2000)
        })
    }
      
  
    return (
      <>
        <div className="col-span-12 h-[500px] d-flex justify-center items-center pt-52" 
              style={{ marginTop: '30px', paddingTop: '20px' }}
        >
              {/* { isSubmitting && <p className="font-bold text-green-700 text-lg col-span-12 text-center text-red-700">Exam Ended</p> } */}
  
              <p className="font-bold text-green-700 text-lg col-span-12 text-center text-red-700">Exam Ended, Submit to have your result</p>
  
  
              <div className="flex justify-center items-center mt-5"
              >          
  
                  <div
                    onClick={SubmitExamObjectivee}
                  className={`md:p-3 p-5 hover:text-xs text-white text-sm font-bold rounded-md cursor-pointer bg-green-600 hover:text-gray-300 hover:bg-green-700`}
                  >
                      Submit Answers
                  </div>
              </div>
        </div>
        <div className="p-5"></div>
      </>
    );
}
