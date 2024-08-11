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


export default function ForceSubmitTheory() 
{
  const [isUser, setIsUser] = useState("-1")

  return (
    <>
      <Helmet>
        <title>Force Submit | Autohub</title>
        <meta name="description" content="Sell Faster, Buy Smarter" />
      </Helmet>

      
      <SubmitTest />
    </>
  );
}

function SubmitTest() 
{  
    const advertState = appStore((state) => state)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMsg, setErrorMsg] = useState(false)
    const navigate = useNavigate()

    const SubmitObjectiveTest = () => 
    {
      setIsSubmitting(true)
      const userAnswers = advertState.getSelectedOption()
      // if(userAnswers.length === 0)
      // {
      //     setErrorMsg("Answer at least one question")
      //     setTimeout(() => {
      //         setIsSubmitting(false)
      //         setErrorMsg("")
      //     }, 2000)
      // } else {
         SubmitTestObjective(userAnswers)
        .then((res) => {
            if(res === "submitted")
            {
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
                onClick={SubmitObjectiveTest}
                >
                    Submit
                </button>
            </div>
      </div>
      <div className="p-5"></div>
    </>
  );
}
