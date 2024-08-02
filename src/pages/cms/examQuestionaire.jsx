import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Sidebar  from "../shared/sidebar";
import AdminHeader from "@/layouts/AdminHeader";
import '../css/ad.css'
import '../css/dragAndDrop.css'
import ExamQuestionaireObjective from "./examQuestionaireObjective";
import ExamQuestionaireTheory from "./examQuestionaireTheory";

export default function ExamQuestionaire()
{
  return ( 
        <>
            <div className='w-full flex h-full bg-blue-500'>
                <div className='w-2/12 lg:w-2/12 lg:visible md:block hidden h-full bg-pink-600'> 
                    <Sidebar />
                </div>
                <div className='bg-white md:w-10/12 lg:10/12 w-12/12 lg:flex-row px-5 h-fit'>
                    
                        <ExamQuestionaireObjective />

                        <ExamQuestionaireTheory />

                </div>
            </div>
        </>
  )
}