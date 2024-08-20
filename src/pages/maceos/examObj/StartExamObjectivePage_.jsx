import { useEffect, useState } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FormCode } from "@/components/FormCode";
import { AllCourse } from "@/apis/backend/course";
import { useQuery } from "react-query";


export default function StartExamObjectivePage({ option })
{
  localStorage.setItem("text-exam-theory-option", option)

  return (
    <>
      <Helmet>
        <title>Change Email | Autohub</title>
        <meta name="description" content="Sell Faster, Buy Smarter" />
      </Helmet>

      
      <StartExam />
    </>
  );
}

function StartExam() 
{  
  const navigate = useNavigate();

  return (
    <>
      <div className="col-span-12 h-[500px] d-flex justify-center items-center pt-52" 
            style={{ marginTop: '30px', paddingTop: '20px' }}
      >
            <p className="font-bold text-green-700 text-lg col-span-12 text-center uppercase">You are about to take a exam objective question </p>
            
            <div className="flex justify-center items-center mt-5"
            >                
                <a className="p-3 bg-green-600 hover:bg-green-900 text-white col-span-12 mx-auto rounded-lg cursor-pointer w-fit"
                  onClick={() => {
                      navigate('/dashboard/take-exam')
                  }}
                >
                    Start Exam Objective
                </a>
            </div>
      </div>
      <div className="p-5"></div>
    </>
  );
}
