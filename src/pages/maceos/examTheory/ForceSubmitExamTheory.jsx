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
import { SubmitExamTheory } from "@/apis/backend/course";


export default function ForceSubmitExamTheory() 
{  
    const advertState = appStore((state) => state)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)
    const navigate = useNavigate()

    useEffect(() => 
    {
        if(advertState.getSelectedExamTheoryOption().length === 0)
        {
            const optionId = localStorage.getItem("text-exam-thoeory-ques") 
            const examCode = localStorage.setItem("exam-theory-code", code)         
            const answers = { user_id: Number(localStorage.getItem("authenticatedId")), exam_code: examCode, marker_id: -1, answer: 'xxx', exam_theory_id: optionId, position: -1 }
            const systemAnswer = { userSubmitted : 'no', answers: answers }
            advertState.setDefaultExamTheoryAnswer(systemAnswer)
        } else {
            const systemAnswer = { userSubmitted : 'yes', answers: advertState.getSelectedExamTheoryOption() }
            advertState.setDefaultExamTheoryAnswer(systemAnswer)
        }
    }, [])

    const SubmitExamTheoryQuestion = () => 
    {
        setIsSubmitting(true)
        SubmitExamTheory(advertState.getDefaultExamTheoryAnswer())
        .then((res) => {
            if(res === "submitted")
            {
                advertState.setForceExamTheory('no')
                navigate('/dashboard/summary')
                // return false
            } else {
                setErrorMsg("Submitting Result Failed")
                setIsSubmitting(false)
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
      // }
  }

  return (
    <>
      <div className="col-span-12 h-[500px] d-flex justify-center items-center pt-52" 
            style={{ marginTop: '30px', paddingTop: '20px' }}
      >
            <p className="font-bold text-green-700 text-lg col-span-12 text-center text-red-700">Test Time is up, do submit to have your result</p>
            
            <div className="flex justify-center items-center mt-5"
            >                
                <button type="sumbit" 
                disabled={isSubmitting}
                className={`p-3 text-white text-md font-bold rounded-md  ${(isSubmitting === true) ? 'bg-gray-600' : 'cursor-pointer bg-green-600 hover:text-red-300 hover:bg-red-900'}`}
                onClick={SubmitExamTheoryQuestion}
                >
                    Submit
                </button>
            </div>
      </div>
      <div className="p-5"></div>
    </>
  );
}
