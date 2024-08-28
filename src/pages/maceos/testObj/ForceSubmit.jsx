import { useEffect, useState } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FormCode } from "@/components/FormCode";
import { AllCourse, SubmitTestObjective } from "@/apis/backend/course";
import { useQuery } from "react-query";
import { appStore } from "@/state/appState";


export default function ForceSubmit() 
{
    const advertState = appStore((state) => state)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)
    const [emptyAnswer, setEmptyAnswer] = useState([])
    const [toBeSubmitted, setToBeSubmitted] = useState([])
    const navigate = useNavigate()

    useEffect(() => 
    {
        if(advertState.getSelectedOption().length === 0)
        {
            const courseId = localStorage.getItem("text-courze")
            const optionId = localStorage.getItem("text-option")            
            const answers = { user_id: Number(localStorage.getItem("authenticatedId")), course_id: courseId, selected: 'e', option_id: optionId, position: -1 }
            const systemAnswer = { userSubmitted : 'no', answers: answers }
            advertState.setDefaultTestObjectiveAnswer(systemAnswer)
        } else {
            const systemAnswer = { userSubmitted : 'yes', answers: advertState.getSelectedOption() }
            advertState.setDefaultTestObjectiveAnswer(systemAnswer)
        }
    }, [])

    const SubmitObjectiveTest = () => 
    {
      setIsSubmitting(true)
      SubmitTestObjective(advertState.getDefaultTestObjectiveAnswer())
         .then((res) => {
             if(res === "submitted")
             {
                 advertState.setForce("no")
                 navigate('/dashboard/summary', { replace: true })
             } else {
                 setErrorMsg("Submitting Result Failed")
                //  setIsSubmitting(false)
                 setTimeout(() => {
                     setErrorMsg("")
                 }, 3000)
             }
         })
         .catch((err) => {
             console.log(err)
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
                {/* <button type="sumbit" 
                disabled={isSubmitting}
                className={`p-3 text-white text-md font-bold rounded-md  ${(isSubmitting === true) ? 'bg-gray-600' : 'cursor-pointer bg-green-600 hover:text-red-300 hover:bg-red-900'}`}
                onClick={SubmitObjectiveTest}
                >
                    Submit
                </button> */}

                <button type="sumbit" 
                onClick={() => {
                    SubmitObjectiveTest()
                }}
                className={`md:p-3 p-5 hover:text-xs text-white text-sm font-bold rounded-md cursor-pointer bg-green-600 hover:text-gray-300 hover:bg-green-700`}
                >
                    Submit Answers
                </button>
            </div>
      </div>
      <div className="p-5"></div>
    </>
  );
}
