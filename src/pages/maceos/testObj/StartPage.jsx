import { useEffect, useState } from "react";
import { setUserNewEmail } from "@/apis/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BeatLoader } from "react-spinners";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FormCode } from "@/components/FormCode";
import { AllCourse } from "@/apis/backend/course";
import { useQuery } from "react-query";
import { appStore } from "@/state/appState";


export default function StartPage({ course, option }) 
{ 
  // localStorage.setItem("text-courze", course)
  // localStorage.setItem("text-option", option)

  const navigate = useNavigate();

  const goTo = () => 
  {
      // navigate('/dashboard/test-user-obj', { replace: true })
      navigate('/dashboard/resolve')
  }

  return (
    <>
      <div className="col-span-12 h-[500px] d-flex justify-center items-center pt-52" 
            style={{ marginTop: '30px', paddingTop: '20px' }}
      >
            <p className="font-bold text-green-700 text-lg col-span-12 text-center uppercase">You are about to take a objective test </p>
            
            <div className="flex justify-center items-center mt-5"
            >                
                <buton className="p-3 bg-green-600 hover:bg-green-900 text-white col-span-12 mx-auto rounded-lg cursor-pointer w-fit"
                  onClick={goTo}
                >
                    Start Test
                </buton>
            </div>
      </div>
      <div className="p-5"></div>
    </>
  );
}
